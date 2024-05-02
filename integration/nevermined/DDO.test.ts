import { decodeJwt } from 'jose'
import config from '../../test/config'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { MetaData } from '../../src/types/DDOTypes'
import { DDO } from '../../src/ddo/DDO'
import { NvmAccount } from '../../src/models/NvmAccount'
import { AssetPrice } from '../../src/models/AssetPrice'
import { getRoyaltyAttributes } from '../../src/nevermined/api/AssetsApi'
import { RoyaltyKind } from '../../src/types/MetadataTypes'
import { NFTAttributes } from '../../src/models/NFTAttributes'
import { assert } from 'chai'
import * as chai from 'chai'
import chaiExclude from 'chai-exclude'

import metadataDataset from '../resources/metadata-dataset.json'
import metadataNft from '../resources/metadata-nft.json'
import metadataAlgorithm from '../resources/metadata-algorithm.json'
import metadataWorkflow from '../resources/metadata-workflow.json'
import metadataCompute from '../resources/metadata-compute.json'
import ddoDataset from '../resources/ddo-dataset.json'
import ddoNft from '../resources/ddo-nft.json'
import ddoAlgorithm from '../resources/ddo-algorithm.json'
import ddoWorkflow from '../resources/ddo-workflow.json'
import ddoCompute from '../resources/ddo-compute.json'
import { generateId } from '../../src/common/helpers'
import { AssetAttributes } from '../../src/models/AssetAttributes'

chai.use(chaiExclude)

describe('DDO Tests', () => {
  let nevermined: Nevermined
  let price: AssetPrice
  let publisher: NvmAccount
  let userId: string

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[publisher] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)
    await nevermined.services.marketplace.login(clientAssertion)
    const payload = decodeJwt(config.marketplaceAuthToken)

    userId = payload.sub as string
    price = new AssetPrice(publisher.getId(), 1n)
  })

  it('should create correct dataset DDO', async () => {
    const metadata: MetaData = {
      userId: userId,
      main: {
        name: 'Nevermined dataset DDO',
        type: 'dataset',
        dateCreated: '2023-01-01T00:00:00Z',
        datePublished: '2023-01-01T00:00:00Z',
        author: 'root@nevermined.io',
        license: 'Apache License 2.0',
        files: [
          {
            index: 0,
            contentType: 'text/markdown',
            url: 'https://raw.githubusercontent.com/nevermined-io/.github/master/profile/README.md',
            checksum: generateId(),
          },
        ],
      },
      additionalInformation: {
        description: 'Nevermined is an ecosystem development platform.',
        customData: {},
      },
      curation: {
        isListed: true,
        numVotes: 0,
        rating: 0,
      },
    }

    const assetAttributes = AssetAttributes.getInstance({
      metadata,
      services: [
        {
          serviceType: 'access',
          price,
        },
      ],
      providers: [config.neverminedNodeAddress],
    })

    const ddo = await nevermined.assets.create(assetAttributes, publisher)

    console.log(ddo.id)
    assert.deepEqualExcludingEvery(
      metadata,
      metadataDataset as MetaData,
      ['userId', 'checksum'] as any,
    )
    assert.deepEqualExcludingEvery(
      ddo,
      ddoDataset as DDO,
      [
        '_nvm',
        'value',
        'serviceEndpoint',
        'checksum',
        'encryptedFiles',
        'id',
        'publicKey',
        'created',
        'didSeed',
        'signatureValue',
        'userId',
        'updated',
        'templateId',
      ] as any,
    )

    assert.isTrue(ddo.serviceExists('metadata'))
    assert.isTrue(ddo.serviceExists('access'))
    assert.isFalse(ddo.serviceExists('compute'))

    assert.isTrue(ddo.serviceIndexExists(0)) // metadata
    assert.isTrue(ddo.serviceIndexExists(2)) // access
    assert.isFalse(ddo.serviceIndexExists(99))
  })

  it('should create correct nft DDO', async () => {
    const metadata: MetaData = {
      userId: userId,
      main: {
        name: 'Nevermined NFT DDO',
        type: 'dataset',
        dateCreated: '2023-01-01T00:00:00Z',
        datePublished: '2023-01-01T00:00:00Z',
        author: 'root@nevermined.io',
        license: 'Apache License 2.0',
        files: [
          {
            index: 0,
            contentType: 'text/markdown',
            url: 'https://raw.githubusercontent.com/nevermined-io/.github/master/profile/README.md',
            checksum: generateId(),
          },
        ],
      },
      additionalInformation: {
        description: 'Nevermined is an ecosystem development platform.',
        customData: {},
      },
    }

    const assetAttributes = AssetAttributes.getInstance({
      metadata,
      services: [
        {
          serviceType: 'nft-sales',
          price,
          nft: { amount: 1n },
        },
        {
          serviceType: 'nft-access',
          nft: { amount: 1n },
        },
      ],
      providers: [config.neverminedNodeAddress],
    })
    const royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 100000)

    const nftAttributes = NFTAttributes.getNFT1155Instance({
      ...assetAttributes,
      nftContractAddress: nevermined.nfts1155.nftContract.address,
      cap: 10n,
      royaltyAttributes,
      preMint: true,
    })

    const ddo = await nevermined.nfts1155.create(nftAttributes, publisher)

    assert.deepEqualExcludingEvery(metadata, metadataNft as MetaData, ['userId', 'checksum'] as any)
    assert.deepEqualExcludingEvery(
      ddo,
      ddoNft as DDO,
      [
        '_nvm',
        'value',
        'serviceEndpoint',
        'checksum',
        'encryptedFiles',
        'id',
        'publicKey',
        'created',
        'updated',
        'didSeed',
        'signatureValue',
        'userId',
        'templateId',
        'nftAttributes',
      ] as any,
    )
  })

  it('should create correct algorithm DDO', async () => {
    const metadata: MetaData = {
      userId: userId,
      main: {
        name: 'Nevermined algorithm DDO',
        type: 'algorithm',
        dateCreated: '2023-01-01T00:00:00Z',
        datePublished: '2023-01-01T00:00:00Z',
        author: 'root@nevermined.io',
        license: 'Apache License 2.0',
        files: [
          {
            index: 0,
            contentType: 'text/markdown',
            url: 'https://example.com/word_count.py',
            checksum: generateId(),
          },
        ],
        algorithm: {
          language: 'python',
          format: 'py',
          version: '0.1.0',
          entrypoint: 'python word_count.py',
          requirements: {
            container: {
              image: 'python',
              tag: '3.8-alpine',
            },
          },
        },
      },
      additionalInformation: {
        description: 'Nevermined is an ecosystem development platform.',
        customData: {},
      },
    }

    const assetAttributes = AssetAttributes.getInstance({
      metadata,
      services: [
        {
          serviceType: 'access',
          price,
        },
      ],
      providers: [config.neverminedNodeAddress],
    })

    const ddo = await nevermined.assets.create(assetAttributes, publisher)

    assert.deepEqualExcludingEvery(
      metadata,
      metadataAlgorithm as MetaData,
      ['userId', 'checksum'] as any,
    )
    assert.deepEqualExcludingEvery(
      ddo,
      ddoAlgorithm as DDO,
      [
        '_nvm',
        'value',
        'serviceEndpoint',
        'checksum',
        'encryptedFiles',
        'id',
        'publicKey',
        'created',
        'updated',
        'didSeed',
        'signatureValue',
        'userId',
        'templateId',
      ] as any,
    )
  })

  it('should create correct workflow DDO', async () => {
    const metadata: MetaData = {
      userId: userId,
      main: {
        name: 'Nevermined workflow DDO',
        type: 'workflow',
        dateCreated: '2023-01-01T00:00:00Z',
        datePublished: '2023-01-01T00:00:00Z',
        author: 'root@nevermined.io',
        license: 'Apache License 2.0',
        files: [
          {
            index: 0,
            contentType: 'text/markdown',
            url: 'https://raw.githubusercontent.com/nevermined-io/.github/master/profile/README.md',
            checksum: generateId(),
          },
        ],
        workflow: {
          coordinationType: 'argo',
          stages: [
            {
              index: 0,
              stageType: 'Compute',
              input: [
                {
                  index: 0,
                  id: 'did:nv:56479438c221a9a49b49b52da0fefdd1de67a7d5be267d02ba92b9b38dfd3ea1',
                },
              ],
              transformation: {
                id: 'did:nv:1a9ce6b48364642a66e8a1d9c2957a582c33d3c1473e0af72aa483e933e2afa5',
              },
              output: {
                metadataUrl: 'https://marketplace-api.mumbai.public.nevermined.network/',
                accessProxyUrl: 'https://node.mumbai.public.nevermined.network/api/v1/gateway/',
                metadata: {} as any,
              },
            },
          ],
        },
      },
      additionalInformation: {
        description: 'Nevermined is an ecosystem development platform.',
        customData: {},
      },
      curation: {
        isListed: true,
        numVotes: 0,
        rating: 0,
      },
    }

    const assetAttributes = AssetAttributes.getInstance({
      metadata,
      services: [
        {
          serviceType: 'access',
          price,
        },
      ],
      providers: [config.neverminedNodeAddress],
    })

    const ddo = await nevermined.assets.create(assetAttributes, publisher)

    assert.deepEqualExcludingEvery(
      metadata,
      metadataWorkflow as MetaData,
      ['userId', 'checksum'] as any,
    )
    assert.deepEqualExcludingEvery(
      ddo,
      ddoWorkflow as DDO,
      [
        '_nvm',
        'value',
        'serviceEndpoint',
        'checksum',
        'encryptedFiles',
        'id',
        'publicKey',
        'created',
        'updated',
        'didSeed',
        'signatureValue',
        'userId',
        'templateId',
      ] as any,
    )
  })

  it('should create correct compute DDO', async () => {
    const metadata: MetaData = {
      userId: userId,
      main: {
        name: 'Nevermined dataset DDO',
        type: 'dataset',
        dateCreated: '2023-01-01T00:00:00Z',
        datePublished: '2023-01-01T00:00:00Z',
        author: 'root@nevermined.io',
        license: 'Apache License 2.0',
        files: [
          {
            index: 0,
            contentType: 'text/markdown',
            url: 'https://raw.githubusercontent.com/nevermined-io/.github/master/profile/README.md',
            checksum: generateId(),
          },
        ],
      },
      additionalInformation: {
        description: 'Nevermined is an ecosystem development platform.',
        customData: {},
      },
    }

    const assetAttributes = AssetAttributes.getInstance({
      metadata,
      services: [
        {
          serviceType: 'compute',
          price: price,
        },
      ],
      providers: [config.neverminedNodeAddress],
    })

    const ddo = await nevermined.assets.create(assetAttributes, publisher)

    assert.deepEqualExcludingEvery(
      metadata,
      metadataCompute as MetaData,
      ['userId', 'checksum'] as any,
    )
    assert.deepEqualExcludingEvery(
      ddo,
      ddoCompute as DDO,
      [
        '_nvm',
        'value',
        'serviceEndpoint',
        'checksum',
        'encryptedFiles',
        'id',
        'publicKey',
        'created',
        'updated',
        'didSeed',
        'signatureValue',
        'userId',
        'templateId',
      ] as any,
    )
  })
})
