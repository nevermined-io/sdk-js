import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import {
    Account,
    DDO,
    Nevermined,
    NFTAttributes,
    AssetAttributes,
    AssetPrice
} from '../../src'
import { CustomToken } from '../../src/keeper'
import { getRoyaltyAttributes, RoyaltyKind } from '../../src/nevermined'
import { generateId } from '../../src/utils'
import { BigNumber } from '../../src/utils'
import { config } from '../config'
import { getMetadata } from '../utils'
import { sleep } from '../utils/utils'

describe('Assets Query by Price', () => {
    let nevermined: Nevermined
    let price1: BigNumber
    let price2: BigNumber
    let royalties: BigNumber
    let payload: JWTPayload
    let account: Account
    let account2: Account
    let appId: string
    let token: CustomToken
    let ddoAccess: DDO
    let ddoNftSales: DDO

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        token = await nevermined.contracts.loadErc20(nevermined.utils.token.getAddress())

        price1 = BigNumber.parseUnits('2', await token.decimals())
        price2 = BigNumber.parseUnits('17.86', await token.decimals())
        royalties = BigNumber.parseUnits('2', await token.decimals())
        appId = generateId()
        ;[account, account2] = await nevermined.accounts.list()
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            account
        )
        await nevermined.services.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
    })

    it('Should create tests assets', async () => {
        // publish asset with priced service `access`
        let metadata = getMetadata()
        metadata.userId = payload.sub
        let assetPrice = new AssetPrice(account.getId(), price1).setTokenAddress(
            token.getAddress()
        )

        const _attributes = AssetAttributes.getInstance({
            metadata,
            price: assetPrice,
            appId
        })
        ddoAccess = await nevermined.assets.create(_attributes, account)

        // publish asset with priced service `nft-sales`
        metadata = getMetadata()
        metadata.userId = payload.sub
        assetPrice = new AssetPrice(
            new Map([
                [account.getId(), price2.sub(royalties)],
                [account2.getId(), royalties]
            ])
        )
        const royaltyAttributes = getRoyaltyAttributes(
            nevermined,
            RoyaltyKind.Standard,
            0
        )

        const assetAttributes = AssetAttributes.getInstance({
            metadata,
            price: assetPrice,
            serviceTypes: ['nft-sales', 'nft-access'],
            appId
        })
        const nftAttributes = NFTAttributes.getNFT1155Instance({
            ...assetAttributes,
            nftContractAddress: nevermined.nfts1155.nftContract.address,
            cap: BigNumber.from(1),
            royaltyAttributes
        })
        ddoNftSales = await nevermined.nfts1155.create(nftAttributes, account)

        // wait for elasticsearch
        await sleep(2000)
    })

    it('Should query all services by default', async () => {
        const results = await nevermined.search.byPrice(
            1,
            20,
            undefined,
            undefined,
            undefined,
            undefined,
            appId
        )
        assert.equal(results.totalResults.value, 2)
    })

    it('Should query by service', async () => {
        let results = await nevermined.search.byPrice(
            1,
            20,
            'access',
            undefined,
            undefined,
            undefined,
            appId
        )
        assert.equal(results.totalResults.value, 1)
        assert.equal(results.results.pop().id, ddoAccess.id)

        results = await nevermined.search.byPrice(
            1,
            20,
            'nft-sales',
            undefined,
            undefined,
            undefined,
            appId
        )
        assert.equal(results.totalResults.value, 1)
        assert.equal(results.results.pop().id, ddoNftSales.id)
    })

    it('Should query with decimal values', async () => {
        let results = await nevermined.search.byPrice(
            2,
            17.86,
            undefined,
            undefined,
            undefined,
            undefined,
            appId
        )
        assert.equal(results.totalResults.value, 2)

        results = await nevermined.search.byPrice(
            2.001,
            17.86,
            undefined,
            undefined,
            undefined,
            undefined,
            appId
        )
        assert.equal(results.totalResults.value, 1)
        assert.equal(results.results.pop().id, ddoNftSales.id)

        results = await nevermined.search.byPrice(
            2.0,
            17.859999,
            undefined,
            undefined,
            undefined,
            undefined,
            appId
        )
        assert.equal(results.totalResults.value, 1)
        assert.equal(results.results.pop().id, ddoAccess.id)
    })
})
