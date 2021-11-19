import { assert } from 'chai'
import Web3 from 'web3'
import { Account, DDO, Nevermined } from '../../src'
import { EscrowPaymentCondition } from '../../src/keeper/contracts/conditions'
import Token from '../../src/keeper/contracts/Token'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'

describe('NFTs Api End-to-End', () => {
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account

    let nevermined: Nevermined
    let token: Token
    let escrowPaymentCondition: EscrowPaymentCondition
    let ddo: DDO

    const metadata = getMetadata()
    const royalties = 10 // 10% of royalties in the secondary market
    const cappedAmount = 5
    let agreementId: string

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberNFTs = 1
    let nftPrice = 20
    let amounts = [15, 5]
    let receivers: string[]
    let assetRewards1: AssetRewards

    let initialBalances: any
    let scale: number

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[, artist, collector1, collector2, , gallery] = await nevermined.accounts.list()

        // conditions
        ;({ escrowPaymentCondition } = nevermined.keeper.conditions)

        // components
        ;({ token } = nevermined.keeper)

        scale = 10 ** (await token.decimals())

        nftPrice = nftPrice * scale
        amounts = amounts.map(v => v * scale)
        receivers = [artist.getId(), gallery.getId()]
        assetRewards1 = new AssetRewards(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        )

        initialBalances = {
            artist: await token.balanceOf(artist.getId()),
            collector1: await token.balanceOf(collector1.getId()),
            collector2: await token.balanceOf(collector2.getId()),
            gallery: await token.balanceOf(gallery.getId()),
            escrowPaymentCondition: Number(
                await token.balanceOf(escrowPaymentCondition.getAddress())
            )
        }
    })

    describe('As an artist I want to register a new artwork', () => {
        it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
            ddo = await nevermined.nfts.create(
                metadata,
                artist,
                cappedAmount,
                royalties,
                assetRewards1
            )
            assert.isDefined(ddo)

            await nevermined.nfts.mint(ddo.id, 5, artist)

            const balance = await nevermined.nfts.balance(ddo.id, artist)
            assert.equal(balance, 5)
        })

        it('Should set the gateway as a provider by default', async () => {
            const providers = await nevermined.provider.list(ddo.id)
            assert.deepEqual(providers, [
                Web3.utils.toChecksumAddress(config.gatewayAddress)
            ])
        })
    })

    describe('As a collector I want to buy some art', () => {
        it('I check the details of the NFT', async () => {
            const details = await nevermined.nfts.details(ddo.id)
            assert.equal(details.mintCap, 5)
            assert.equal(details.nftSupply, 5)
            assert.equal(details.royalties, 10)
            assert.equal(details.owner, artist.getId())
        })

        it('I am ordering the NFT', async () => {
            await collector1.requestTokens(nftPrice / scale)

            const collector1BalanceBefore = await token.balanceOf(collector1.getId())
            assert.equal(collector1BalanceBefore, initialBalances.collector1 + nftPrice)

            agreementId = await nevermined.nfts.order(ddo.id, numberNFTs, collector1)
            assert.isDefined(agreementId)

            const collector1BalanceAfter = await token.balanceOf(collector1.getId())
            const escrowPaymentConditionBalance = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )
            assert.equal(collector1BalanceAfter - initialBalances.collector1, 0)
            assert.equal(
                escrowPaymentConditionBalance - initialBalances.escrowPaymentCondition,
                nftPrice
            )
        })

        it('The artist can check the payment and transfer the NFT to the collector', async () => {
            const nftBalanceArtistBefore = await nevermined.nfts.balance(ddo.id, artist)
            const nftBalanceCollectorBefore = await nevermined.nfts.balance(
                ddo.id,
                collector1
            )

            const receipt = await nevermined.nfts.transfer(
                agreementId,
                ddo.id,
                numberNFTs,
                artist
            )
            assert.isTrue(receipt)

            const nftBalanceArtistAfter = await nevermined.nfts.balance(ddo.id, artist)
            const nftBalanceCollectorAfter = await nevermined.nfts.balance(
                ddo.id,
                collector1
            )
            assert.equal(
                Number(nftBalanceArtistAfter),
                Number(nftBalanceArtistBefore) - numberNFTs
            )
            assert.equal(
                Number(nftBalanceCollectorAfter),
                Number(nftBalanceCollectorBefore) + numberNFTs
            )
        })

        it('the artist asks and receives the payment', async () => {
            const receipt = await nevermined.nfts.releaseRewards(
                agreementId,
                ddo.id,
                numberNFTs,
                collector1,
                artist
            )
            assert.isTrue(receipt)

            const escrowPaymentConditionBalance = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )
            const receiver0Balance = await token.balanceOf(
                assetRewards1.getReceivers()[0]
            )
            const receiver1Balance = await token.balanceOf(
                assetRewards1.getReceivers()[1]
            )
            const collectorBalance = await token.balanceOf(collector1.getId())

            assert.equal(
                receiver0Balance,
                initialBalances.artist + assetRewards1.getAmounts()[0]
            )
            assert.equal(
                receiver1Balance,
                initialBalances.gallery + assetRewards1.getAmounts()[1]
            )
            assert.equal(collectorBalance - initialBalances.collector1, 0)
            assert.equal(
                escrowPaymentConditionBalance - initialBalances.escrowPaymentCondition,
                0
            )
        })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
        it('The collector access the files', async () => {
            const result = await nevermined.nfts.access(ddo.id, collector1, '/tmp/')
            assert.isTrue(result)
        })
    })
})
