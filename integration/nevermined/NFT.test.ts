import { assert } from 'chai'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import { Token } from '../../src/nevermined/Token'
import { ZeroAddress } from '../../src/utils'
import utils from 'web3-utils'

describe('Nfts operations', () => {
    let nevermined: Nevermined

    let artist: Account
    let collector: Account
    let ddo: DDO

    let token: Token

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;({ token } = nevermined)

        // Accounts
        ;[artist, collector] = await nevermined.accounts.list()
    })

    describe('with default token', async () => {
        before(async () => {
            ddo = await nevermined.nfts.create(
                getMetadata(),
                artist,
                10,
                0,
                new AssetRewards()
            )
        })

        it('should mint 10 nft tokens', async () => {
            await nevermined.nfts.mint(ddo.id, 10, artist)
            assert.equal(10, await nevermined.nfts.balance(ddo.id, artist))
        })

        it('should transfer 2 nft tokens with default token', async () => {
            const agreementId = await nevermined.nfts.order(ddo.id, 2, collector)
            await nevermined.nfts.transfer(agreementId, ddo.id, 2, collector, artist)

            assert.equal(8, await nevermined.nfts.balance(ddo.id, artist))
            assert.equal(2, await nevermined.nfts.balance(ddo.id, collector))
        })

        it('should burn nft tokens', async () => {
            await nevermined.nfts.burn(ddo.id, 6, artist)
            assert.equal(2, await nevermined.nfts.balance(ddo.id, artist))
        })
    })

    describe('with custom token', async () => {
        before(async () => {
            ddo = await nevermined.nfts.create(
                getMetadata(),
                artist,
                10,
                0,
                new AssetRewards(),
                undefined,
                token.getAddress()
            )
        })

        it('should mint 10 nft tokens', async () => {
            await nevermined.nfts.mint(ddo.id, 10, artist)
            assert.equal(10, await nevermined.nfts.balance(ddo.id, artist))
        })

        it('should transfer 2 nft tokens with custom token', async () => {
            const agreementId = await nevermined.nfts.order(ddo.id, 2, collector)
            await nevermined.nfts.transfer(agreementId, ddo.id, 2, collector, artist)

            assert.equal(8, await nevermined.nfts.balance(ddo.id, artist))
            assert.equal(2, await nevermined.nfts.balance(ddo.id, collector))
        })

        it('should burn nft tokens', async () => {
            await nevermined.nfts.burn(ddo.id, 6, artist)
            assert.equal(2, await nevermined.nfts.balance(ddo.id, artist))
        })
    })

    describe('with ether', async () => {
        before(async () => {
            ddo = await nevermined.nfts.create(
                getMetadata(),
                artist,
                10,
                0,
                new AssetRewards(artist.getId(), Number(utils.toWei('0.1', 'ether'))),
                undefined,
                ZeroAddress
            )
        })

        it('should mint 10 nft tokens', async () => {
            await nevermined.nfts.mint(ddo.id, 10, artist)
            assert.equal(10, await nevermined.nfts.balance(ddo.id, artist))
        })

        xit('should transfer 2 nft tokens with ether', async () => {
            const agreementId = await nevermined.nfts.order(ddo.id, 2, collector)
            await nevermined.nfts.transfer(agreementId, ddo.id, 2, collector, artist)

            assert.equal(8, await nevermined.nfts.balance(ddo.id, artist))
            assert.equal(2, await nevermined.nfts.balance(ddo.id, collector))
        })

        xit('should burn nft tokens', async () => {
            await nevermined.nfts.burn(ddo.id, 6, artist)

            assert.equal(2, await nevermined.nfts.balance(ddo.id, artist))
        })
    })
})
