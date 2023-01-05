import { SearchQuery } from '../../src/common'
import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getAssetPrice, getMetadata } from '../utils'
import {
    Nevermined,
    Account,
    MetaData,
    DDO,
    AssetPrice,
    AssetAttributes
} from '../../src'
import { generateId } from '../../src/utils'
import { sleep } from '../utils/utils'
import { PublishMetadata, DIDResolvePolicy } from '../../src/nevermined'

let nevermined: Nevermined
let publisher: Account
let metadata: MetaData
let assetPrice: AssetPrice
let payload: JWTPayload
let ddo: DDO
let ddoBefore: DDO

describe('Assets', () => {
    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        // Accounts
        ;[publisher] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )

        await nevermined.services.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
        assetPrice = getAssetPrice(publisher.getId())

        metadata = getMetadata()
        metadata.userId = payload.sub
        const assetAttributes = AssetAttributes.getInstance({
            metadata,
            price: assetPrice
        })
        ddoBefore = await nevermined.assets.create(assetAttributes, publisher)
    })

    describe('#register()', () => {
        it('create with immutable data', async () => {
            const nonce = Math.random()
            const immutableMetadata = getMetadata(nonce, `Immutable Test ${nonce}`)

            const assetAttributes = AssetAttributes.getInstance({
                metadata: immutableMetadata,
                price: assetPrice
            })
            ddo = await nevermined.assets.create(
                assetAttributes,
                publisher,
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
        it('resolve with immutable metadata first for a ddo without immutable url', async () => {
            const resolvedDDO = await nevermined.assets.resolve(
                ddoBefore.id,
                DIDResolvePolicy.ImmutableFirst
            )
            assert.isDefined(resolvedDDO)
            assert.equal(resolvedDDO._nvm.versions.length, 1)
        })

        it('resolve with immutable metadata', async () => {
            const resolvedDDO = await nevermined.assets.resolve(
                ddo.id,
                DIDResolvePolicy.OnlyImmutable
            )
            assert.isDefined(resolvedDDO)
            assert.equal(resolvedDDO._nvm.versions.length, 1)
        })

        it('resolve without immutable metadata', async () => {
            const resolvedDDO = await nevermined.assets.resolve(
                ddo.id,
                DIDResolvePolicy.MetadataAPIFirst
            )
            assert.isDefined(resolvedDDO)
            assert.equal(resolvedDDO._nvm.versions.length, 1)
        })

        it('resolve immutable first metadata', async () => {
            const resolvedDDO = await nevermined.assets.resolve(
                ddo.id,
                DIDResolvePolicy.ImmutableFirst
            )
            assert.isDefined(resolvedDDO)
            assert.equal(resolvedDDO._nvm.versions.length, 1)
        })
    })

    describe('#update()', () => {
        it('update an existing asset', async () => {
            const nonce = Math.random()
            const name = `Updated Metadata Test ${nonce}`
            const updatedMetadata = getMetadata(nonce, name)

            await nevermined.assets.update(
                ddo.shortId(),
                updatedMetadata,
                publisher,
                PublishMetadata.IPFS
            )

            // Waiting to metadata to be updated and propagated
            await sleep(3000)

            const resolvedDDO = await nevermined.assets.resolve(
                ddo.id,
                DIDResolvePolicy.ImmutableFirst
            )
            assert.isDefined(resolvedDDO)
            assert.equal(
                updatedMetadata.main.name,
                resolvedDDO.findServiceByType('metadata').attributes.main.name
            )

            const metaApiDDO = await nevermined.assets.resolve(
                ddo.id,
                DIDResolvePolicy.OnlyMetadataAPI
            )
            assert.isDefined(metaApiDDO)
            assert.equal(
                updatedMetadata.main.name,
                metaApiDDO.findServiceByType('metadata').attributes.main.name
            )
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
                price: assetPrice,
                appId: appId1
            })
            ddoBefore = await neverminedApp1.assets.create(assetAttributes, publisher)

            // Create 2 assets with appId-test2
            const assetAttributes2 = AssetAttributes.getInstance({
                metadata: metadata2,
                price: assetPrice,
                appId: appId2
            })
            ddoBefore = await neverminedApp2.assets.create(assetAttributes2, publisher)

            const assetAttributes22 = AssetAttributes.getInstance({
                metadata: metadata22,
                price: assetPrice,
                appId: appId2
            })
            ddoBefore = await neverminedApp2.assets.create(assetAttributes22, publisher)

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

            const assets = await nevermined.search.query(queryApp)

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

            const assets = await nevermined.search.query(queryApp)

            assert.equal(assets.totalResults.value, 2)
        })

        it('appId1 should text search by appId1', async () => {
            const assets = await nevermined.search.byText(
                'App1',
                undefined,
                undefined,
                undefined,
                appId1
            )

            assert.equal(assets.totalResults.value, 1)
        })

        it('appId1 should not text search appId2 ddos', async () => {
            const assets = await nevermined.search.byText(
                'App2',
                undefined,
                undefined,
                undefined,
                appId1
            )

            assert.equal(assets.totalResults.value, 0)
        })

        it('appId2 should text search by appId2', async () => {
            const assets = await nevermined.search.byText(
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

            const assets = await nevermined.search.query(query)

            assert.equal(assets.totalResults.value, 0)
        })
    })
})
