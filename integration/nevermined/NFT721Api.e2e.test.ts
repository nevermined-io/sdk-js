import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, Nevermined, NFTAttributes, AssetPrice } from '../../src'
import {
    EscrowPaymentCondition,
    TransferNFT721Condition,
    Token,
    Nft721Contract
} from '../../src/keeper'
import { config } from '../config'
import { getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { zeroX } from '../../src/utils'
import { ethers } from 'ethers'
import { BigNumber } from '../../src/utils'
import '../globals'

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
    let assetPrice1: AssetPrice

    let initialBalances: any
    let scale: BigNumber

    let nft: ethers.Contract
    let nftContract: Nft721Contract

    let payload: JWTPayload

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[, artist, collector1, , gallery] = await nevermined.accounts.list()

        TestContractHandler.setConfig(config)

        const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
        const erc721ABI = await TestContractHandler.getABI(
            'NFT721Upgradeable',
            config.artifactsFolder,
            networkName
        )

        nft = await TestContractHandler.deployArtifact(
            erc721ABI,
            artist.getId(),
            [ artist.getId(), nevermined.keeper.didRegistry.address, 'NFT721', 'NVM', '', 0 ]
        )

        nftContract = await Nft721Contract.getInstance(
            (nevermined.keeper as any).instanceConfig,
            nft.address
        )

        await nevermined.contracts.loadNft721(nftContract.address)

        nftContractOwner = new Account((await nftContract.owner()) as string)
        

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        await nevermined.services.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
        metadata.userId = payload.sub

        // conditions
        ;({ escrowPaymentCondition, transferNft721Condition } =
            nevermined.keeper.conditions)

        // components
        ;({ token } = nevermined.keeper)

        scale = BigNumber.from(10).pow(await token.decimals())

        nftPrice = nftPrice.mul(scale)
        amounts = amounts.map(v => v.mul(scale))
        receivers = [artist.getId(), gallery.getId()]
        assetPrice1 = new AssetPrice(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        )

        await nftContract.grantOperatorRole(
            transferNft721Condition.address,
            nftContractOwner
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
            const nftAttributes = NFTAttributes.getNFT721Instance({
                metadata,
                price: assetPrice1,
                serviceTypes: ['nft-sales', 'nft-access'],
                nftContractAddress: nftContract.address
            })
            ddo = await nevermined.nfts721.create(nftAttributes, artist)

            assert.isDefined(ddo)

            const owner = await nevermined.nfts721.ownerOfAsset(ddo.id)
            assert.equal(owner, artist.getId())
        })
    })

    describe('As a collector I want to buy some art', () => {
        it('I check the details of the NFT', async () => {
            const details = await nevermined.nfts1155.details(ddo.id)
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
            assert.equal(await nevermined.nfts721.ownerOfAsset(ddo.id), artist.getId())

            const receipt = await nevermined.nfts721.transfer(agreementId, ddo.id, artist)
            assert.isTrue(receipt)

            assert.equal(
                await nevermined.nfts721.ownerOfAsset(ddo.id),
                collector1.getId()
            )
        })

        it('the artist asks and receives the payment', async () => {
            const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )

            const receipt = await nevermined.nfts721.releaseRewards(
                agreementId,
                ddo.id,
                artist
            )

            assert.isTrue(receipt)

            const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )
            const receiver0Balance = await token.balanceOf(assetPrice1.getReceivers()[0])
            const receiver1Balance = await token.balanceOf(assetPrice1.getReceivers()[1])
            const collectorBalance = await token.balanceOf(collector1.getId())

            assert.isTrue(
                receiver0Balance.eq(
                    initialBalances.artist.add(assetPrice1.getAmounts()[0])
                )
            )

            assert.isTrue(
                receiver1Balance.eq(
                    initialBalances.gallery.add(assetPrice1.getAmounts()[1])
                )
            )

            assert.isTrue(collectorBalance.sub(initialBalances.collector1).eq(0))
            assert.isTrue(
                escrowPaymentConditionBalanceBefore
                    .sub(assetPrice1.getTotalPrice())
                    .eq(escrowPaymentConditionBalanceAfter)
            )
        })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
        it('The collector access the files to download', async () => {
            const result = await nevermined.nfts1155.access(ddo.id, collector1, '/tmp/')
            assert.isTrue(result)
        })
    })
})
