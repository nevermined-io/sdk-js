import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, Nevermined } from '../../src'
import { EscrowPaymentCondition, TransferNFT721Condition } from '../../src/keeper/contracts/conditions'
import Token from '../../src/keeper/contracts/Token'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import ERC721 from '../../src/artifacts/ERC721.json'
import { zeroX } from '../../src/utils'
import { ethers } from 'ethers'
import Nft721Contract from '../../src/keeper/contracts/Nft721Contract'
import BigNumber from '../../src/utils/BigNumber'
import '../globals'
import { WebApiFile } from '../../src/nevermined/utils/WebServiceConnector'

describe('NFTs721 Api End-to-End', () => {
    let nftContractOwner: Account
    let artist: Account
    let collector1: Account
    let gallery: Account

    let nevermined: Nevermined
    let token: Token
    let escrowPaymentCondition: EscrowPaymentCondition
    let transferNft721Condition: TransferNFT721Condition
    let ddo: DDO

    const metadata = getMetadata()
    let agreementId: string

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    let nftPrice = BigNumber.from(20)
    let amounts = [BigNumber.from(15), BigNumber.from(5)]
    let receivers: string[]
    let assetRewards1: AssetRewards

    let initialBalances: any
    let scale: BigNumber

    let nft: ethers.Contract
    let nftContract: Nft721Contract

    let payload: JWTPayload

    before(async () => {
        TestContractHandler.setConfig(config)

        nft = await TestContractHandler.deployArtifact(ERC721)

        nevermined = await Nevermined.getInstance(config)
        nftContract = await Nft721Contract.getInstance(
            (nevermined.keeper as any).instanceConfig,
            nft.address
        )

        await nevermined.contracts.loadNft721(nftContract.address)

        nftContractOwner = new Account(await nftContract.owner() as string)
        ;[, artist, collector1, , gallery] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        await nevermined.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
        metadata.userId = payload.sub

        // conditions
        ;({ escrowPaymentCondition, transferNft721Condition } = nevermined.keeper.conditions)

        // components
        ;({ token } = nevermined.keeper)

        scale = BigNumber.from(10).pow(await token.decimals())

        nftPrice = nftPrice.mul(scale)
        amounts = amounts.map(v => v.mul(scale))
        receivers = [artist.getId(), gallery.getId()]
        assetRewards1 = new AssetRewards(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        )

        await nftContract.setProxyApproval(transferNft721Condition.address, true, nftContractOwner)

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
            ddo = await nevermined.nfts721.create(
                metadata,
                artist,
                assetRewards1,
                nftContract.address
            )
            assert.isDefined(ddo)
            await nftContract.addMinter(artist.getId(), nftContractOwner)

            await nftContract.mint(zeroX(ddo.shortId()), artist.getId())

            const owner = await nevermined.nfts721.ownerOfAsset(ddo.id, nftContract.address)
            assert.equal(owner, artist.getId())
        })
    })

    describe('As a collector I want to buy some art', () => {
        it('I check the details of the NFT', async () => {
            const details = await nevermined.nfts.details(ddo.id)
            assert.equal(details.owner, artist.getId())
        })

        it('I am ordering the NFT', async () => {
            await collector1.requestTokens(nftPrice.div(scale))

            const collector1BalanceBefore = await token.balanceOf(collector1.getId())
            assert.isTrue(
                collector1BalanceBefore.eq(initialBalances.collector1.add(nftPrice))
            )

            agreementId = await nevermined.nfts721.order(ddo.id, collector1)

            assert.isDefined(agreementId)

            const collector1BalanceAfter = await token.balanceOf(collector1.getId())

            assert.isTrue(collector1BalanceAfter.sub(initialBalances.collector1).eq(0))
        })

        it('The artist can check the payment and transfer the NFT to the collector', async () => {
            assert.equal(
                await nevermined.nfts721.ownerOfAsset(ddo.id, nftContract.address),
                artist.getId()
            )

            const receipt = await nevermined.nfts721.transfer721(agreementId, ddo.id, artist)
            assert.isTrue(receipt)

            assert.equal(
                await nevermined.nfts721.ownerOfAsset(ddo.id, nftContract.address),
                collector1.getId()
            )
        })

        it('the artist asks and receives the payment', async () => {
            const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )

            const receipt = await nevermined.nfts721.release721Rewards(
                agreementId,
                ddo.id,
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
                receiver0Balance.eq(
                    initialBalances.artist.add(assetRewards1.getAmounts()[0])
                )
            )

            assert.isTrue(
                receiver1Balance.eq(
                    initialBalances.gallery.add(assetRewards1.getAmounts()[1])
                )
            )

            assert.isTrue(collectorBalance.sub(initialBalances.collector1).eq(0))
            assert.isTrue(
                escrowPaymentConditionBalanceBefore
                    .sub(assetRewards1.getTotalPrice())
                    .eq(escrowPaymentConditionBalanceAfter)
            )
        })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
        it('The collector access the files to download', async () => {
            const result = await nevermined.nfts.access(ddo.id, collector1, '/tmp/')
            assert.isTrue(result)
        })

        it('The collector access the files object', async () => {
            const result = (await nevermined.nfts.access(
                ddo.id,
                collector1,
                undefined,
                undefined,
                undefined,
                false
            )) as WebApiFile[]

            assert.equal(result[0].name, 'ddo-example.json')
        })
    })
})
