import { SearchQuery } from '../../src/common/interfaces'
import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getAssetRewards, getMetadata } from '../utils'
import { Nevermined, Account, MetaData, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import { generateId } from '../../src/utils'
import { sleep } from '../utils/utils'
import { DIDResolvePolicy, PublishMetadata } from '../../src/nevermined/Assets'

let nevermined: Nevermined
let publisher: Account
let metadata: MetaData
let assetRewards: AssetRewards
let payload: JWTPayload
let ddo: DDO

describe('Assets', () => {
    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        // Accounts
        ;[publisher] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )

        await nevermined.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
        assetRewards = getAssetRewards(publisher.getId())

        metadata = getMetadata()
        metadata.userId = payload.sub
        await nevermined.assets.create(metadata, publisher, assetRewards)
    })

    describe('#register()', () => {

        it('create with immutable data', async () => {
            const nonce = Math.random()
            const immutableMetadata = getMetadata(nonce, `Immutable Test ${nonce}`)
            ddo = await nevermined.assets.create(
                immutableMetadata, 
                publisher, 
                assetRewards,
                ['access'],
                [],
                'PSK-RSA',
                [],
                nevermined.keeper.token.address,
                '',
                PublishMetadata.IPFS
            )
            
            assert.isDefined(ddo)
            assert.equal(ddo._nvm.versions.length, 1)
            assert.isTrue(ddo._nvm.versions[0].immutableUrl.startsWith('cid://'))
            assert.isTrue(ddo._nvm.versions[0].immutableUrl.length > 10)
            assert.equal(ddo._nvm.versions[0].immutableBackend, 'ipfs')
        })

    })

    describe('#resolve()', () => {        
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
            const updatedMetadata = getMetadata(nonce, name)

            await nevermined.assets.update(ddo.shortId(), updatedMetadata, publisher, PublishMetadata.IPFS)

            // Waiting to metadata to be updated and propagated
            await sleep(3000)

            const resolvedDDO = await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.ImmutableFirst)
            assert.isDefined(resolvedDDO)
            assert.equal(updatedMetadata.main.name, resolvedDDO.findServiceByType('metadata').attributes.main.name)

            const metaApiDDO = await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.OnlyMetadataAPI)
            assert.isDefined(metaApiDDO)
            assert.equal(updatedMetadata.main.name, metaApiDDO.findServiceByType('metadata').attributes.main.name)

        })     
    })

    describe('#query()', () => {
        it('should search for assets', async () => {
            const query: SearchQuery = {
                offset: 100,
                page: 1,
                text: 'Office',
                sort: {
                    created: 'desc'
                }
            }

            const assets = await nevermined.assets.query(query)

            assert.isDefined(assets)
        })
    })

    describe('#search()', () => {
        it('should search for assets', async () => {
            const text = 'office'
            const assets = await nevermined.assets.search(text)

            assert.isDefined(assets)
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
            await neverminedApp1.assets.create(
                metadata1,
                publisher,
                assetRewards,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                appId1
            )

            // Create 2 assets with appId-test2
            await neverminedApp2.assets.create(
                metadata2,
                publisher,
                assetRewards,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                appId2
            )
            await neverminedApp2.assets.create(
                metadata22,
                publisher,
                assetRewards,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                appId2
            )

            // wait for elasticsearch
            await sleep(2000)
        })

        it('should query by appId1', async () => {
            const queryApp: SearchQuery = {
                offset: 100,
                page: 1,
                sort: {
                    created: 'desc'
                },
                appId: appId1
            }

            const assets = await nevermined.assets.query(queryApp)

            assert.equal(assets.totalResults.value, 1)
        })

        it('should query by appId2', async () => {
            const queryApp: SearchQuery = {
                offset: 100,
                page: 1,
                sort: {
                    created: 'desc'
                },
                appId: appId2
            }

            const assets = await nevermined.assets.query(queryApp)

            assert.equal(assets.totalResults.value, 2)
        })

        it('appId1 should text search by appId1', async () => {
            const assets = await nevermined.assets.search(
                'App1',
                undefined,
                undefined,
                undefined,
                appId1
            )

            assert.equal(assets.totalResults.value, 1)
        })

        it('appId1 should not text search appId2 ddos', async () => {
            const assets = await nevermined.assets.search(
                'App2',
                undefined,
                undefined,
                undefined,
                appId1
            )

            assert.equal(assets.totalResults.value, 0)
        })

        it('appId2 should text search by appId2', async () => {
            const assets = await nevermined.assets.search(
                'App2',
                undefined,
                undefined,
                undefined,
                appId2
            )

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
                                            fields: ['service.attributes.main.name']
                                        }
                                    }
                                }
                            },
                            {
                                bool: {
                                    should: [
                                        { match: { '_nvm.appId': appId1 } },
                                        { match: { '_nvm.appId': appId2 } }
                                    ]
                                }
                            }
                        ],
                        must_not: [
                            {
                                nested: {
                                    path: ['service'],
                                    query: {
                                        match: {
                                            'service.attributes.main.name': {
                                                query: 'App1'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            }

            const assets = await nevermined.assets.query(query)

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
                                    fields: ['service.attributes.main.name']
                                }
                            },
                            {
                                bool: {
                                    should: [
                                        { match: { '_nvm.appId': appId1 } },
                                        { match: { '_nvm.appId': appId2 } }
                                    ]
                                }
                            }
                        ],
                        must_not: [{ match: { 'service.attributes.main.name': 'App1' } }]
                    }
                },
                appId: appId1
            }

            const assets = await nevermined.assets.query(query)

            assert.equal(assets.totalResults.value, 0)
        })
    })
})
