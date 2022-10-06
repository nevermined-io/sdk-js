import { SearchQuery } from '../../src/common/interfaces'
import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getAssetRewards, getMetadata } from '../utils'
import { Nevermined, Account } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import { generateId } from '../../src/utils'
import { sleep } from '../utils/utils'

let nevermined: Nevermined
let publisher: Account
let metadata = getMetadata()
let assetRewards: AssetRewards
let payload: JWTPayload

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

        if (!nevermined.keeper.dispenser) {
            metadata = getMetadata(0)
        }

        metadata.userId = payload.sub
        await nevermined.assets.create(metadata, publisher, assetRewards)
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
            } as SearchQuery

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

            const metadata1 = getMetadata(0, undefined, 'App1')
            metadata1.userId = payload.sub
            const metadata2 = getMetadata(0, undefined, 'App2')
            metadata2.userId = payload.sub
            const metadata22 = getMetadata(0, undefined, 'App2')
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
            } as SearchQuery

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
            } as SearchQuery

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
