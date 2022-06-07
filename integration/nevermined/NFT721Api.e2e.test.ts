import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, Nevermined } from '../../src'
import { EscrowPaymentCondition } from '../../src/keeper/contracts/conditions'
import Token from '../../src/keeper/contracts/Token'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { Contract } from 'web3-eth-contract'
import ERC721 from '../../src/artifacts/ERC721.json'
import { zeroX } from '../../src/utils'
import BigNumber from 'bignumber.js'

describe('NFTs721 Api End-to-End', () => {
    let artist: Account
    let collector1: Account
    let gallery: Account

    let nevermined: Nevermined
    let token: Token
    let escrowPaymentCondition: EscrowPaymentCondition
    let ddo: DDO

    const metadata = getMetadata()
    let agreementId: string

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    let nftPrice = 20
    let amounts = [new BigNumber(15), new BigNumber(5)]
    let receivers: string[]
    let assetRewards1: AssetRewards

    let initialBalances: any
    let scale: number

    let nftContract: Contract

    let payload: JWTPayload

    before(async () => {
        TestContractHandler.setConfig(config)

        nftContract = await TestContractHandler.deployArtifact(ERC721)

        nevermined = await Nevermined.getInstance(config)
        ;[, artist, collector1, , gallery] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        await nevermined.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
        metadata.userId = payload.sub

        // conditions
        ;({ escrowPaymentCondition } = nevermined.keeper.conditions)

        // components
        ;({ token } = nevermined.keeper)

        scale = 10 ** (await token.decimals())

        nftPrice = nftPrice * scale
        amounts = amounts.map(v => v.multipliedBy(scale))
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
            gallery: await token.balanceOf(gallery.getId()),
            escrowPaymentCondition: Number(
                await token.balanceOf(escrowPaymentCondition.getAddress())
            )
        }
    })

    describe('As an artist I want to register a new artwork', () => {
        it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
            ddo = await nevermined.nfts.create721(
                metadata,
                artist,
                assetRewards1,
                nftContract.options.address
            )
            assert.isDefined(ddo)

            await nftContract.methods
                .mint(zeroX(ddo.shortId()))
                .send({ from: artist.getId() })

            const owner = await nevermined.nfts.ownerOf(
                ddo.id,
                nftContract.options.address
            )
            assert.equal(owner, artist.getId())
        })
    })

    describe('As a collector I want to buy some art', () => {
        it('I check the details of the NFT', async () => {
            const details = await nevermined.nfts.details(ddo.id)
            assert.equal(details.owner, artist.getId())
        })

        it('I am ordering the NFT', async () => {
            await collector1.requestTokens(nftPrice / scale)

            const collector1BalanceBefore = await token.balanceOf(collector1.getId())
            assert.isTrue(
                collector1BalanceBefore.isEqualTo(
                    initialBalances.collector1.plus(nftPrice)
                )
            )

            agreementId = await nevermined.nfts.order721(ddo.id, collector1)

            assert.isDefined(agreementId)

            const collector1BalanceAfter = await token.balanceOf(collector1.getId())

            assert.isTrue(
                collector1BalanceAfter.minus(initialBalances.collector1).isEqualTo(0)
            )
        })

        it('The artist can check the payment and transfer the NFT to the collector', async () => {
            assert.equal(
                await nevermined.nfts.ownerOf(ddo.id, nftContract.options.address),
                artist.getId()
            )

            const receipt = await nevermined.nfts.transfer721(agreementId, ddo.id, artist)
            assert.isTrue(receipt)

            assert.equal(
                await nevermined.nfts.ownerOf(ddo.id, nftContract.options.address),
                collector1.getId()
            )
        })

        it('the artist asks and receives the payment', async () => {
            const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )

            const receipt = await nevermined.nfts.release721Rewards(
                agreementId,
                ddo.id,
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

            assert.isTrue(collectorBalance.minus(initialBalances.collector1).isEqualTo(0))
            assert.isTrue(
                escrowPaymentConditionBalanceBefore
                    .minus(assetRewards1.getTotalPrice())
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
})
