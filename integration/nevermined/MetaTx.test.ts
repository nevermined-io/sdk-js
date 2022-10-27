import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import BigNumber from '../../src/utils/BigNumber'
import {
    getRoyaltyAttributes,
    RoyaltyAttributes,
    RoyaltyKind
} from '../../src/nevermined/Assets'
import { ethers, Wallet } from 'ethers'
import { MetaTxParameters } from '../../src/keeper/contracts/ContractBase'
import fs from 'fs'

describe('MetaTx test with nfts', () => {
    let nevermined: Nevermined

    let artist: Account
    let collector: Account
    let ddo: DDO

    let payload: JWTPayload
    let royaltyAttributes: RoyaltyAttributes
    const paymasterAddress = JSON.parse(fs.readFileSync('artifacts/opengsn.json').toString()).paymasterAddress

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[artist, collector] = await nevermined.accounts.list()
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        await nevermined.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
    })

    describe('with default token', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub
            royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 0)
            ddo = await nevermined.nfts.create(
                metadata,
                artist,
                BigNumber.from(10),
                royaltyAttributes,
                new AssetRewards()
            )
        })

        it('should mint 10 nft tokens', async () => {
            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(10)
            )
        })

        it('should transfer 2 nft tokens with default token', async () => {
            const agreementId = await nevermined.nfts.order(
                ddo.id,
                BigNumber.from(2),
                collector
            )


            await nevermined.nfts.transfer(agreementId, ddo.id, BigNumber.from(2), artist)

            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(8)
            )
            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, collector),
                BigNumber.from(2)
            )
        })

        it('metatransactions should work', async () => {
            const wallet = Wallet.createRandom()

            await nevermined.keeper.nftUpgradeable.transferNft(ddo.id, await wallet.getAddress(), BigNumber.from(2), artist.getId())
            assert.deepEqual(
                BigNumber.from(await nevermined.keeper.nftUpgradeable.balance(await wallet.getAddress(), ddo.id)),
                BigNumber.from(2)
            )

            const meta: MetaTxParameters = {
                wallet,
                paymasterAddress
            }
            await nevermined.keeper.didRegistry.burn(ddo.id, BigNumber.from(2), await wallet.getAddress(), {meta})
            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(6)
            )
            assert.deepEqual(
                BigNumber.from(await nevermined.keeper.nftUpgradeable.balance(await wallet.getAddress(), ddo.id)),
                BigNumber.from(0)
            )
        })
    })

})
