import BigNumber from 'bignumber.js'
import chai, { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import chaiAsPromised from 'chai-as-promised'
import Web3 from 'web3'
import { Account, DDO, Nevermined } from '../../src'
import {
    EscrowPaymentCondition,
    TransferNFTCondition
} from '../../src/keeper/contracts/conditions'
import Token from '../../src/keeper/contracts/Token'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'
import { RoyaltyKind } from '../../src/nevermined/Assets'

chai.use(chaiAsPromised)

describe('NFTs Api End-to-End', () => {
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account

    let nevermined: Nevermined
    let token: Token
    let escrowPaymentCondition: EscrowPaymentCondition
    let transferNftCondition: TransferNFTCondition
    let ddo: DDO

    const metadata = getMetadata()
    const royalties1 = 1000000 // 10% of royalties in the secondary market
    const royalties = 10 // 10% of royalties in the secondary market
    const cappedAmount = 5
    let agreementId: string
    let agreementId2: string

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberNFTs = 1
    let nftPrice = new BigNumber(100)
    let amounts = [new BigNumber(75), new BigNumber(25)]
    let receivers: string[]
    let assetRewards1: AssetRewards

    let initialBalances: any
    let scale: BigNumber
    let payload: JWTPayload

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[, artist, collector1, collector2, , gallery] = await nevermined.accounts.list()
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        await nevermined.marketplace.login(clientAssertion)

        payload = decodeJwt(config.marketplaceAuthToken)

        metadata.userId = payload.sub

        // conditions
        ;({ escrowPaymentCondition, transferNftCondition } = nevermined.keeper.conditions)

        // components
        ;({ token } = nevermined.keeper)

        scale = new BigNumber(10).exponentiatedBy(await token.decimals())

        nftPrice = nftPrice.multipliedBy(scale)
        amounts = amounts.map(v => v.multipliedBy(scale))
        receivers = [artist.getId(), gallery.getId()]
        assetRewards1 = new AssetRewards(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        )
        await collector1.requestTokens(nftPrice.div(scale))

        initialBalances = {
            artist: await token.balanceOf(artist.getId()),
            collector1: await token.balanceOf(collector1.getId()),
            collector2: await token.balanceOf(collector2.getId()),
            gallery: await token.balanceOf(gallery.getId()),
            escrowPaymentCondition: await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )
        }
    })

    describe('As an artist I want to register a new artwork', () => {
        it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
            ddo = await nevermined.nfts.createWithRoyalties(
                metadata,
                artist,
                cappedAmount,
                RoyaltyKind.Standard,
                royalties1,
                assetRewards1
            )
            assert.isDefined(ddo)

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
            const collector1BalanceBefore = await token.balanceOf(collector1.getId())

            assert.isTrue(collector1BalanceBefore.isGreaterThanOrEqualTo(nftPrice))
            const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )
            agreementId = await nevermined.nfts.order(ddo.id, numberNFTs, collector1)
            assert.isDefined(agreementId)

            const collector1BalanceAfter = await token.balanceOf(collector1.getId())
            const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )

            assert.isTrue(
                collector1BalanceBefore.minus(nftPrice).isEqualTo(collector1BalanceAfter)
            )
            assert.isTrue(
                escrowPaymentConditionBalanceBefore
                    .plus(nftPrice)
                    .isEqualTo(escrowPaymentConditionBalanceAfter)
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
            const escrowPaymentConditionBefore = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )
            const receipt = await nevermined.nfts.releaseRewards(
                agreementId,
                ddo.id,
                numberNFTs,
                collector1,
                artist
            )
            assert.isTrue(receipt)

            const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )
            const receiver0Balance = await token.balanceOf(
                assetRewards1.getReceivers()[0]
            )
            const receiver1Balance = await token.balanceOf(
                assetRewards1.getReceivers()[1]
            )
            const collectorBalance = await token.balanceOf(collector1.getId())

            assert.isTrue(
                receiver0Balance.isEqualTo(
                    initialBalances.artist.plus(assetRewards1.getAmounts()[0])
                )
            )
            assert.isTrue(
                receiver1Balance.isEqualTo(
                    initialBalances.gallery.plus(assetRewards1.getAmounts()[1])
                )
            )
            assert.isTrue(
                initialBalances.collector1.minus(nftPrice).isEqualTo(collectorBalance)
            )
            assert.isTrue(
                escrowPaymentConditionBefore
                    .minus(nftPrice)
                    .isEqualTo(escrowPaymentConditionBalanceAfter)
            )
        })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
        it('The collector access the files', async () => {
            const result = await nevermined.nfts.access(ddo.id, collector1, '/tmp/')
            assert.isTrue(result)
        })
    })

    describe('As a collector I want to order and access the NFT wihout the intervention of the artist', () => {
        it('The artist gives the Gateway permissions to transfer his nfts', async () => {
            let result = await nevermined.nfts.setApprovalForAll(
                transferNftCondition.address,
                true,
                artist
            )
            assert.isDefined(result)

            result = await nevermined.nfts.setApprovalForAll(
                config.gatewayAddress,
                true,
                artist
            )
            assert.isDefined(result)
        })
        it('The artist creates and mints the nfts', async () => {
            const newMetadata = getMetadata()
            newMetadata.userId = payload.sub
            ddo = await nevermined.nfts.create(
                newMetadata,
                artist,
                cappedAmount,
                royalties,
                assetRewards1
            )
            assert.isDefined(ddo)

            const balance = await nevermined.nfts.balance(ddo.id, artist)
            assert.equal(balance, 5)
        })

        it('The collector orders the nft', async () => {
            await collector1.requestTokens(nftPrice.div(scale))

            agreementId = await nevermined.nfts.order(ddo.id, numberNFTs, collector1)
            assert.isDefined(agreementId)
        })

        it('Ask the Gateway to transfer the nft and release the rewards', async () => {
            const result = await nevermined.nfts.transferForDelegate(
                agreementId,
                artist.getId(),
                collector1.getId(),
                numberNFTs
            )
            assert.isTrue(result)
        })

        it('The gateway should fulfill the NFTHolder and NFTAccess conditions', async () => {
            const result = await nevermined.nfts.access(
                ddo.id,
                collector1,
                '/tmp/',
                undefined
            )
            assert.isTrue(result)
        })
    })

    describe('As a collector I should not be able to buy a sold out nft', () => {
        it('The artist gives the Gateway permissions to transfer his nfts', async () => {
            let result = await nevermined.nfts.setApprovalForAll(
                transferNftCondition.address,
                true,
                artist
            )
            assert.isDefined(result)

            result = await nevermined.nfts.setApprovalForAll(
                config.gatewayAddress,
                true,
                artist
            )
            assert.isDefined(result)
        })
        it('The artist creates and mints one nft', async () => {
            const newMetadata = getMetadata()
            newMetadata.userId = payload.sub
            ddo = await nevermined.nfts.create(
                newMetadata,
                artist,
                1,
                royalties,
                assetRewards1
            )
            assert.isDefined(ddo)

            const balance = await nevermined.nfts.balance(ddo.id, artist)
            assert.equal(balance, 1)
        })

        it('Collector1 orders the nft', async () => {
            await collector1.requestTokens(nftPrice.div(scale))

            agreementId = await nevermined.nfts.order(ddo.id, numberNFTs, collector1)
            assert.isDefined(agreementId)
        })

        it('Ask the Gateway to transfer the nft and release the rewards', async () => {
            const result = await nevermined.nfts.transferForDelegate(
                agreementId,
                artist.getId(),
                collector1.getId(),
                1
            )
            assert.isTrue(result)
        })

        it('The gateway should fulfill the NFTHolder and NFTAccess conditions', async () => {
            const result = await nevermined.nfts.access(
                ddo.id,
                collector1,
                '/tmp/',
                undefined
            )
            assert.isTrue(result)
        })

        it('The artist nft balance should be zero', async () => {
            const balance = await nevermined.nfts.balance(ddo.id, artist)
            assert.equal(balance, 0)
        })

        it('Collector 2 setups a service agreement to buy the nft', async () => {
            await collector2.requestTokens(nftPrice.div(scale))

            agreementId2 = await nevermined.nfts.order(ddo.id, numberNFTs, collector2)
            assert.isDefined(agreementId2)
        })

        it('The gateway should not be able to transfer the nft', async () => {
            await assert.isRejected(
                nevermined.nfts.transferForDelegate(
                    agreementId2,
                    artist.getId(),
                    collector2.getId(),
                    1
                )
            )
        })
    })
})
