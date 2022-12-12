import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import { sleep } from '../utils/utils'
import { generateId } from '../../src/utils'
import { AssetAttributes } from '../../src/models/AssetAttributes'

describe('Search Asset', () => {
    let nevermined: Nevermined
    let account: Account
    let appId: string
    let userId: string

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[account] = await nevermined.accounts.list()
        appId = generateId()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            account
        )
        await nevermined.services.marketplace.login(clientAssertion)
        const payload = decodeJwt(config.marketplaceAuthToken)
        userId = payload.sub
    })

    it('should register the assets', async () => {
        let metadata = getMetadata(undefined, 'Test1')
        metadata.userId = userId
        await nevermined.assets.create(
            AssetAttributes.getInstance({ metadata, appId }),
            account
        )

        metadata = getMetadata(undefined, 'Test2')
        metadata.userId = userId

        await nevermined.assets.create(
            AssetAttributes.getInstance({ metadata, appId }),
            account
        )

        metadata = getMetadata(undefined, 'Test2')
        metadata.userId = userId
        await nevermined.assets.create(
            AssetAttributes.getInstance({ metadata, appId }),
            account
        )

        metadata = getMetadata(undefined, 'Test3')
        metadata.userId = userId
        await nevermined.assets.create(
            AssetAttributes.getInstance({ metadata, appId }),
            account
        )

        // wait for elasticsearch
        await sleep(2000)
    })

    it('should search by text', async () => {
        let result = await nevermined.search.byText(
            'Test',
            undefined,
            undefined,
            undefined,
            appId
        )
        assert.equal(result.totalResults.value, 4)

        result = await nevermined.search.byText(
            'Test1',
            undefined,
            undefined,
            undefined,
            appId
        )
        assert.equal(result.totalResults.value, 1)

        result = await nevermined.search.byText(
            'Test2',
            undefined,
            undefined,
            undefined,
            appId
        )
        assert.equal(result.totalResults.value, 2)

        result = await nevermined.search.byText(
            'Test3',
            undefined,
            undefined,
            undefined,
            appId
        )
        assert.equal(result.totalResults.value, 1)
    })

    it('should return a list of DDOs', async () => {
        const { results: ddos } = await nevermined.search.byText(
            'Test1',
            undefined,
            undefined,
            undefined,
            appId
        )

        assert.equal(ddos.length, 1)
        ddos.map(ddo => assert.instanceOf(ddo, DDO))
    })

    it('should be able to do a query to get a list of DDOs', async () => {
        const { results: ddos } = await nevermined.search.byText(
            'Test2',
            undefined,
            undefined,
            undefined,
            appId
        )

        assert.equal(ddos.length, 2)
        ddos.map(ddo => assert.instanceOf(ddo, DDO))
    })
})
