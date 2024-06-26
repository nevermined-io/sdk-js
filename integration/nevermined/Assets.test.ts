// @ts-nocheck
import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { rejects } from 'assert'
import * as fs from 'fs'
import config from '../../test/config'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { MetaData } from '../../src/types/DDOTypes'
import { DDO } from '../../src/ddo/DDO'
import { NvmAccount } from '../../src/models/NvmAccount'
import { AssetPrice } from '../../src/models/AssetPrice'
import { generateId } from '../../src/common/helpers'
import { getAssetPrice, getMetadata } from '../utils/ddo-metadata-generator'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import {
  DIDResolvePolicy,
  PublishMetadataOptions,
  PublishOnChainOptions,
  SearchQuery,
} from '../../src/types/MetadataTypes'
import { ProvenanceMethod } from '../../src/keeper/contracts/Provenance'

let nevermined: Nevermined
let publisher: NvmAccount
let metadata: MetaData
let createdMetadata: MetaData
let assetPrice: AssetPrice
let payload: JWTPayload
let ddo: DDO
let ddoBefore: DDO

describe('Assets', () => {
  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    // Accounts
    ;[publisher] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)

    payload = decodeJwt(config.marketplaceAuthToken)
    assetPrice = getAssetPrice(publisher.getId())

    metadata = getMetadata()
    metadata.userId = payload.sub
    const assetAttributes = AssetAttributes.getInstance({
      metadata,
      services: [
        {
          serviceType: 'access',
          price: assetPrice,
        },
      ],
    })
    ddoBefore = await nevermined.assets.create(assetAttributes, publisher)
  })

  describe('#register()', () => {
    it('create with immutable data', async () => {
      const nonce = Math.random()
      createdMetadata = getMetadata(nonce, `Immutable Test ${nonce}`)

      createdMetadata.main.ercType = 721
      createdMetadata.additionalInformation.tags = ['test']

      const assetAttributes = AssetAttributes.getInstance({
        metadata: createdMetadata,
        services: [
          {
            serviceType: 'access',
            price: assetPrice,
          },
        ],
      })
      ddo = await nevermined.assets.create(assetAttributes, publisher, {
        metadata: PublishMetadataOptions.IPFS,
      })

      assert.isDefined(ddo)
      assert.equal(ddo._nvm.versions.length, 1)
      assert.isTrue(ddo._nvm.versions[0].immutableUrl.startsWith('cid://'))
      assert.isTrue(ddo._nvm.versions[0].immutableUrl.length > 10)
      assert.equal(ddo._nvm.versions[0].immutableBackend, 'ipfs')

      assert.equal(Object.keys(ddo._nvm.networks).length, 1)
      assert.equal(ddo._nvm.networks[await nevermined.keeper.getNetworkId()], true)

      const metadata = ddo.findServiceByType('metadata')
      assert.equal(metadata.attributes.main.ercType, 721)
      assert.equal(metadata.attributes.additionalInformation.tags[0], 'test')
    })
  })

  describe('#resolve()', () => {
    it('resolve with immutable metadata first for a ddo without immutable url', async () => {
      const resolvedDDO = await nevermined.assets.resolve(
        ddoBefore.id,
        DIDResolvePolicy.ImmutableFirst,
      )
      assert.isDefined(resolvedDDO)
      assert.equal(resolvedDDO._nvm.versions.length, 1)
    })

    it('resolve with immutable metadata', async () => {
      const resolvedDDO = await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.OnlyImmutable)
      assert.isDefined(resolvedDDO)
      assert.equal(resolvedDDO._nvm.versions.length, 1)
    })

    it('resolve without immutable metadata', async () => {
      const resolvedDDO = await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.MetadataAPIFirst)
      assert.isDefined(resolvedDDO)
      assert.equal(resolvedDDO._nvm.versions.length, 1)
    })

    it('resolve immutable first metadata', async () => {
      const resolvedDDO = await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.ImmutableFirst)
      assert.isDefined(resolvedDDO)
      assert.equal(resolvedDDO._nvm.versions.length, 1)
    })
  })

  describe('#update()', () => {
    it('update an existing asset', async () => {
      const nonce = Math.random()
      const name = `Updated Metadata Test ${nonce}`
      const updatedMetadata = {
        ...createdMetadata,
        main: {
          ...createdMetadata.main,
          name,
        },
      }

      await nevermined.assets.update(
        ddo.shortId(),
        updatedMetadata,
        publisher,
        PublishMetadataOptions.IPFS,
      )

      const resolvedDDO = await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.ImmutableFirst)
      assert.isDefined(resolvedDDO)

      const metadata = resolvedDDO.findServiceByType('metadata')
      assert.equal(metadata.attributes.main.ercType, 721)
      assert.equal(metadata.attributes.additionalInformation.tags[0], 'test')

      assert.equal(updatedMetadata.main.name, metadata.attributes.main.name)

      const metaApiDDO = await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.OnlyMetadataAPI)
      assert.isDefined(metaApiDDO)
      assert.equal(
        updatedMetadata.main.name,
        metaApiDDO.findServiceByType('metadata').attributes.main.name,
      )
      assert.equal(metaApiDDO._nvm.versions.length, 2)
    })

    it('the checksum was updated on-chain', async () => {
      const { checksum } = await nevermined.keeper.didRegistry.getAttributesByDid(ddo.id)
      const resolvedDDO = await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.OnlyMetadataAPI)

      const _version = resolvedDDO._nvm.versions.at(-1)
      assert.equal(_version.checksum, checksum)
    })

    it('an update provenance event was created', async () => {
      const events = await nevermined.provenance.getDIDProvenanceEvents(ddo.shortId())
      const lastEvent = events.at(-1)
      assert.equal(lastEvent.method, ProvenanceMethod.USED)
    })

    it('update the asset files', async () => {
      const nonce = Math.random()
      const name = `Updated Files Test ${nonce}`
      const updatedMetadata = {
        ...createdMetadata,
        main: {
          ...createdMetadata.main,
          name,
        },
      }
      updatedMetadata.main.files = [
        {
          index: 0,
          contentType: 'text/plain',
          url: 'https://raw.githubusercontent.com/nevermined-io/sdk-js/main/LICENSE',
        },
      ]

      await nevermined.assets.update(ddo.shortId(), updatedMetadata, publisher)

      const resolvedDDO = await nevermined.assets.resolve(ddo.id)
      assert.isDefined(resolvedDDO)

      const previousMetadata = ddo.findServiceByType('metadata')
      const metadata = resolvedDDO.findServiceByType('metadata')

      assert.equal(updatedMetadata.main.name, metadata.attributes.main.name)

      assert.equal(metadata.attributes.main.files.length, 1)
      assert.notEqual(
        previousMetadata.attributes.main.files.length,
        metadata.attributes.main.files.length,
      )
      assert.notEqual(
        previousMetadata.attributes.encryptedFiles,
        metadata.attributes.encryptedFiles,
      )
    })

    it('should be able to download the updated files', async () => {
      const folder = '/tmp/sdk-js/updated-files'

      const path = (await nevermined.assets.download(ddo.id, publisher, folder, -1)) as string
      assert.include(path, folder, 'The storage path is not correct.')
      const files = await new Promise<string[]>((resolve) => {
        fs.readdir(path, (_e, fileList) => {
          resolve(fileList)
        })
      })

      assert.deepEqual(files, ['LICENSE'], 'Stored files are not correct.')
    })

    it('update the asset files', async () => {
      const nonce = Math.random()
      const name = `Updated Files Test ${nonce}`
      const updatedMetadata = {
        ...createdMetadata,
        main: {
          ...createdMetadata.main,
          name,
        },
      }
      updatedMetadata.main.files = [
        {
          index: 0,
          contentType: 'text/plain',
          url: 'https://raw.githubusercontent.com/nevermined-io/sdk-js/main/LICENSE',
        },
      ]

      await nevermined.assets.update(ddo.shortId(), updatedMetadata, publisher)

      const resolvedDDO = await nevermined.assets.resolve(ddo.id)
      assert.isDefined(resolvedDDO)

      const previousMetadata = ddo.findServiceByType('metadata')
      const metadata = resolvedDDO.findServiceByType('metadata')

      assert.equal(updatedMetadata.main.name, metadata.attributes.main.name)

      assert.equal(metadata.attributes.main.files.length, 1)
      assert.notEqual(
        previousMetadata.attributes.main.files.length,
        metadata.attributes.main.files.length,
      )
      assert.notEqual(
        previousMetadata.attributes.encryptedFiles,
        metadata.attributes.encryptedFiles,
      )
    })

    it('should be able to download the updated files', async () => {
      const folder = '/tmp/sdk-js/updated-files'
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })

      const path = (await nevermined.assets.download(ddo.id, publisher, folder, -1)) as string
      assert.include(path, folder, 'The storage path is not correct.')
      const files = await new Promise<string[]>((resolve) => {
        fs.readdir(path, (_e, fileList) => {
          resolve(fileList)
        })
      })

      assert.deepEqual(files, ['LICENSE'], 'Stored files are not correct.')
    })

    it('unlist and list an asset', async () => {
      // Unlisting Asset
      await nevermined.assets.list(ddo.shortId(), false, publisher)

      let resolvedDDO = await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.MetadataAPIFirst)
      assert.isDefined(resolvedDDO)
      let metadata = resolvedDDO.findServiceByType('metadata')
      assert.equal(metadata.attributes.curation.isListed, false)

      // Listing Asset back
      await nevermined.assets.list(ddo.shortId(), true, publisher)

      resolvedDDO = await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.MetadataAPIFirst)
      assert.isDefined(resolvedDDO)
      metadata = resolvedDDO.findServiceByType('metadata')
      assert.equal(metadata.attributes.curation.isListed, true)
    })

    it('add a vote', async () => {
      // Adding some votes
      await nevermined.assets.addRating(ddo.shortId(), 0.5, 1, publisher)

      let resolvedDDO = await nevermined.assets.resolve(ddo.id)
      assert.isDefined(resolvedDDO)
      let metadata = resolvedDDO.findServiceByType('metadata')

      assert.equal(metadata.attributes.curation.rating, 0.5)
      assert.equal(metadata.attributes.curation.numVotes, 1)

      // More votes
      await nevermined.assets.addRating(ddo.shortId(), 0.4, 2, publisher)

      resolvedDDO = await nevermined.assets.resolve(ddo.id)
      assert.isDefined(resolvedDDO)
      metadata = resolvedDDO.findServiceByType('metadata')
      assert.equal(metadata.attributes.curation.rating, 0.4)
      assert.equal(metadata.attributes.curation.numVotes, 1 + 2)
    })

    it('new rating must be between 0 and 1', async () => {
      // Trying to add a vote with a rating out of range

      nevermined.assets
        .addRating(ddo.shortId(), 2, 1, publisher)
        .then((res) => {
          assert.fail(`It should not be here because rating is wrong: ${res}`)
        })
        .catch((err) => {
          console.debug(`It should fail with error: ${err}`)
          assert.isDefined(err)
        })
    })
  })

  describe('#query()', () => {
    it('should search for assets', async () => {
      const query: SearchQuery = {
        offset: 100,
        page: 1,
        text: 'Office',
        sort: {
          created: 'desc',
        },
      }

      const assets = await nevermined.search.query(query)

      assert.isDefined(assets)
    })
  })

  describe('#search()', () => {
    it('should search for assets', async () => {
      const text = 'office'
      const assets = await nevermined.search.byText(text)

      assert.isDefined(assets)
    })
  })

  describe('#retire()', () => {
    it('retire an existing asset', async () => {
      const deleted = await nevermined.assets.retire(ddo.id)
      assert.strictEqual(deleted.status, 200)
    })
  })

  describe('query with appId', () => {
    let appId1: string
    let appId2: string

    before(async () => {
      appId1 = generateId()
      appId2 = generateId()

      const config1 = { ...config, appId: appId1 }
      const config2 = { ...config, appId: appId2 }

      const metadata1 = getMetadata(undefined, 'App1')
      metadata1.userId = payload.sub
      const metadata2 = getMetadata(undefined, 'App2')
      metadata2.userId = payload.sub
      const metadata22 = getMetadata(undefined, 'App2')
      metadata22.userId = payload.sub

      const neverminedApp1 = await Nevermined.getInstance(config1)
      const neverminedApp2 = await Nevermined.getInstance(config2)

      // Create 1 asset with appId-test1
      const assetAttributes = AssetAttributes.getInstance({
        metadata: metadata1,
        services: [
          {
            serviceType: 'access',
            price: assetPrice,
          },
        ],
        appId: appId1,
      })
      ddoBefore = await neverminedApp1.assets.create(assetAttributes, publisher)

      // Create 2 assets with appId-test2
      const assetAttributes2 = AssetAttributes.getInstance({
        metadata: metadata2,
        services: [
          {
            serviceType: 'access',
            price: assetPrice,
          },
        ],
        appId: appId2,
      })
      ddoBefore = await neverminedApp2.assets.create(assetAttributes2, publisher)

      const assetAttributes22 = AssetAttributes.getInstance({
        metadata: metadata22,
        services: [
          {
            serviceType: 'access',
            price: assetPrice,
          },
        ],
        appId: appId2,
      })
      ddoBefore = await neverminedApp2.assets.create(assetAttributes22, publisher)
    })

    it('should query by appId1', async () => {
      const queryApp: SearchQuery = {
        offset: 100,
        page: 1,
        sort: {
          created: 'desc',
        },
        appId: appId1,
      }

      const assets = await nevermined.search.query(queryApp)

      assert.equal(assets.totalResults.value, 1)
    })

    it('should query by appId2', async () => {
      const queryApp: SearchQuery = {
        offset: 100,
        page: 1,
        sort: {
          created: 'desc',
        },
        appId: appId2,
      }

      const assets = await nevermined.search.query(queryApp)

      assert.equal(assets.totalResults.value, 2)
    })

    it('appId1 should text search by appId1', async () => {
      const assets = await nevermined.search.byText('App1', undefined, undefined, undefined, appId1)

      assert.equal(assets.totalResults.value, 1)
    })

    it('appId1 should not text search appId2 ddos', async () => {
      const assets = await nevermined.search.byText('App2', undefined, undefined, undefined, appId1)

      assert.equal(assets.totalResults.value, 0)
    })

    it('appId2 should text search by appId2', async () => {
      const assets = await nevermined.search.byText('App2', undefined, undefined, undefined, appId2)

      assert.equal(assets.totalResults.value, 2)
    })

    it('should query using a complex query and no appId', async () => {
      /**
       * All documents:
       * - name starts with 'App'
       * - belongs to either appId1 OR appId2
       * - name is not App1
       *
       * This will return the 2 DDOs named App2
       */
      const query: SearchQuery = {
        query: {
          bool: {
            must: [
              {
                nested: {
                  path: ['service'],
                  query: {
                    query_string: {
                      query: 'App*',
                      fields: ['service.attributes.main.name'],
                    },
                  },
                },
              },
              {
                bool: {
                  should: [
                    { match: { '_nvm.appId': appId1 } },
                    { match: { '_nvm.appId': appId2 } },
                  ],
                },
              },
            ],
            must_not: [
              {
                nested: {
                  path: ['service'],
                  query: {
                    match: {
                      'service.attributes.main.name': {
                        query: 'App1',
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      }

      const assets = await nevermined.search.query(query)

      assert.equal(assets.totalResults.value, 2)
    })

    it('should query using a complex query and appId', async () => {
      // Same as previous test but using appId1
      // should return no results although we try to match appId2
      const query: SearchQuery = {
        query: {
          bool: {
            must: [
              {
                query_string: {
                  query: 'App*',
                  fields: ['service.attributes.main.name'],
                },
              },
              {
                bool: {
                  should: [
                    { match: { '_nvm.appId': appId1 } },
                    { match: { '_nvm.appId': appId2 } },
                  ],
                },
              },
            ],
            must_not: [{ match: { 'service.attributes.main.name': 'App1' } }],
          },
        },
        appId: appId1,
      }

      const assets = await nevermined.search.query(query)

      assert.equal(assets.totalResults.value, 0)
    })
  })

  describe('#register() and #resolve() totally off-chain', () => {
    let offchainDID

    it('register an asset but just off-chain', async () => {
      const nonce = Math.random()
      createdMetadata = getMetadata(nonce, `Off-Chain Test ${nonce}`)

      createdMetadata.main.ercType = 721
      createdMetadata.additionalInformation.tags = ['offchain']

      const assetAttributes = AssetAttributes.getInstance({
        metadata: createdMetadata,
        services: [
          {
            serviceType: 'access',
            price: assetPrice,
          },
        ],
      })
      const offchainDDO = await nevermined.assets.create(assetAttributes, publisher, {
        metadata: PublishMetadataOptions.OnlyMetadataAPI,
        did: PublishOnChainOptions.OnlyOffchain,
      })

      assert.isDefined(offchainDDO)
      assert.equal(offchainDDO._nvm.versions.length, 1)

      const metadata = offchainDDO.findServiceByType('metadata')
      assert.equal(metadata.attributes.main.ercType, 721)
      assert.equal(metadata.attributes.additionalInformation.tags[0], 'offchain')
      offchainDID = offchainDDO.id
    })

    it('resolve from the metadata api', async () => {
      const resolvedDDO = await nevermined.assets.resolve(offchainDID, DIDResolvePolicy.NoRegistry)
      assert.isDefined(resolvedDDO)
      assert.equal(resolvedDDO._nvm.versions.length, 1)
    })

    it('dont resolve from the DIDRegistry', async () => {
      rejects(nevermined.assets.resolve(offchainDID, DIDResolvePolicy.MetadataAPIFirst))
    })
  })
})
