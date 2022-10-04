import { SearchQuery } from '../../src/common/interfaces'
import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { getAssetRewards, getMetadata } from '../utils'
import { Nevermined, Account } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'

let nevermined: Nevermined
let publisher: Account
let metadata = getMetadata()
let assetRewards: AssetRewards

describe('Assets', () => {
    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        // Accounts
        ;[publisher] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )

        await nevermined.marketplace.login(clientAssertion)
        const payload = decodeJwt(config.marketplaceAuthToken)

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
})
