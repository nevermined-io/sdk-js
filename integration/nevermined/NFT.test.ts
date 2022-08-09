import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import { Token } from '../../src/nevermined/Token'
import { ZeroAddress } from '../../src/utils'
import BigNumber from '../../src/utils/BigNumber'

describe('Nfts operations', () => {
    let nevermined: Nevermined

    let artist: Account
    let collector: Account
    let ddo: DDO

    let token: Token
    let payload: JWTPayload

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;({ token } = nevermined)

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
            ddo = await nevermined.nfts.create(
                metadata,
                artist,
                10,
                0,
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
            const agreementId = await nevermined.nfts.order(ddo.id, 2, collector)
            await nevermined.nfts.transfer(agreementId, ddo.id, 2, artist)

            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(8)
            )
            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, collector),
                BigNumber.from(2)
            )
        })

        it('should burn nft tokens', async () => {
            await nevermined.nfts.burn(ddo.id, 6, artist)
            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(2)
            )
        })
    })

    describe('with custom token', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub
            ddo = await nevermined.nfts.create(
                metadata,
                artist,
                10,
                0,
                new AssetRewards(),
                undefined,
                token.getAddress()
            )
        })

        it('should mint 10 nft tokens', async () => {
            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(10)
            )
        })

        it('should transfer 2 nft tokens with custom token', async () => {
            const agreementId = await nevermined.nfts.order(ddo.id, 2, collector)
            await nevermined.nfts.transfer(agreementId, ddo.id, 2, artist)

            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(8)
            )
            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, collector),
                BigNumber.from(2)
            )
        })

        it('should burn nft tokens', async () => {
            await nevermined.nfts.burn(ddo.id, 6, artist)
            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(2)
            )
        })
    })

    describe('with ether', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub
            ddo = await nevermined.nfts.create(
                metadata,
                artist,
                10,
                0,
                new AssetRewards(artist.getId(), BigNumber.parseEther('0.1')),
                undefined,
                ZeroAddress
            )
        })

        it('should mint 10 nft tokens', async () => {
            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(10)
            )
        })

        it('should transfer 2 nft tokens with ether', async () => {
            const agreementId = await nevermined.nfts.order(ddo.id, 2, collector)
            await nevermined.nfts.transfer(agreementId, ddo.id, 2, artist)

            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(8)
            )
            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, collector),
                BigNumber.from(8)
            )
        })

        it('should burn nft tokens', async () => {
            await nevermined.nfts.burn(ddo.id, 6, artist)

            assert.deepEqual(
                await nevermined.nfts.balance(ddo.id, artist),
                BigNumber.from(2)
            )
        })
    })
})
