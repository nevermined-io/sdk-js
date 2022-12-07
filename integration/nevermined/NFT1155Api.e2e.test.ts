import chai, { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import chaiAsPromised from 'chai-as-promised'
import { Account, DDO, Nevermined } from '../../src'
import { EscrowPaymentCondition, TransferNFTCondition } from '../../src/keeper/contracts/conditions'
import Token from '../../src/keeper/contracts/Token'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'
import { getRoyaltyAttributes, RoyaltyKind } from '../../src/nevermined/Assets'
import { ethers } from 'ethers'
import BigNumber from '../../src/utils/BigNumber'
import '../globals'
import { WebApiFile } from '../../src/nevermined/utils/WebServiceConnector'
import { NFT1155Api } from '../../src/nevermined/nfts/NFT1155Api'

chai.use(chaiAsPromised)

describe('NFTs 1155 Api End-to-End', () => {
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
    const royalties1 = 100000 // 10% of royalties in the secondary market
    const royalties = 10 // 10% of royalties in the secondary market
    const cappedAmount = BigNumber.from(5)
    let agreementId: string
    let agreementId2: string

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberNFTs = BigNumber.from(1)
    let nftPrice = BigNumber.from(100)
    let amounts = [BigNumber.from(75), BigNumber.from(25)]
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
        await collector1.requestTokens(nftPrice.div(scale))
        
        const nftContractOwner = new Account(await nevermined.nfts1155.owner())
        await nevermined.keeper.nftUpgradeable.setProxyApproval(transferNftCondition.address, true, nftContractOwner)

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
            const royaltyAttributes = getRoyaltyAttributes(
                nevermined,
                RoyaltyKind.Standard,
                royalties1
            )
            ddo = await nevermined.nfts1155.createWithRoyalties(
                metadata,
                artist,
                cappedAmount,
                [config.neverminedNodeAddress],
                royaltyAttributes,
                assetRewards1,
                numberNFTs,
                undefined,
                true
            )
            
            assert.isDefined(ddo)

            const balance = await nevermined.nfts1155.balance(ddo.id, artist)
            assert.deepEqual(balance, BigNumber.from(5))
        })

        it('Should set the Node as a provider by default', async () => {
            const providers = await nevermined.provider.list(ddo.id)
            assert.deepEqual(providers, [
                ethers.utils.getAddress(config.neverminedNodeAddress)
            ])
        })
    })

    describe('As a collector I want to buy some art', () => {
        it('I check the details of the NFT', async () => {
            const details = await nevermined.nfts1155.details(ddo.id)
            assert.equal(details.mintCap, 5)
            assert.equal(details.nftSupply, 5)
            assert.equal(details.royaltyScheme, RoyaltyKind.Standard)
            assert.equal(details.royalties, 100000)
            assert.equal(details.owner, artist.getId())
        })

        it('I am ordering the NFT', async () => {
            const collector1BalanceBefore = await token.balanceOf(collector1.getId())

            assert.isTrue(collector1BalanceBefore.gte(nftPrice))
            const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )

            agreementId = await nevermined.nfts1155.order(ddo.id, numberNFTs, collector1)
            assert.isDefined(agreementId)

            const collector1BalanceAfter = await token.balanceOf(collector1.getId())
            const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )

            assert.isTrue(
                collector1BalanceBefore.sub(nftPrice).eq(collector1BalanceAfter)
            )
            assert.isTrue(
                escrowPaymentConditionBalanceBefore
                    .add(nftPrice)
                    .eq(escrowPaymentConditionBalanceAfter)
            )
        })

        it('The artist can check the payment and transfer the NFT to the collector', async () => {
            const nftBalanceArtistBefore = await nevermined.nfts1155.balance(ddo.id, artist)
            const nftBalanceCollectorBefore = await nevermined.nfts1155.balance(
                ddo.id,
                collector1
            )

            const receipt = await nevermined.nfts1155.transfer(
                agreementId,
                ddo.id,
                numberNFTs,
                artist
            )
            assert.isTrue(receipt)

            const nftBalanceArtistAfter = await nevermined.nfts1155.balance(ddo.id, artist)
            const nftBalanceCollectorAfter = await nevermined.nfts1155.balance(
                ddo.id,
                collector1
            )
            assert.equal(
                Number(nftBalanceArtistAfter),
                Number(nftBalanceArtistBefore) - Number(numberNFTs)
            )
            assert.equal(
                Number(nftBalanceCollectorAfter),
                Number(nftBalanceCollectorBefore) + Number(numberNFTs)
            )
        })

        it('the artist asks and receives the payment', async () => {
            const escrowPaymentConditionBefore = await token.balanceOf(
                escrowPaymentCondition.getAddress()
            )
            const receipt = await nevermined.nfts1155.releaseRewards(
                agreementId,
                ddo.id,
                numberNFTs,
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
            assert.isTrue(initialBalances.collector1.sub(nftPrice).eq(collectorBalance))
            assert.isTrue(
                escrowPaymentConditionBefore
                    .sub(nftPrice)
                    .eq(escrowPaymentConditionBalanceAfter)
            )
        })
    })

    describe('As a collector I want to order and access the NFT wihout the intervention of the artist', () => {
        it('The artist gives the Node permissions to transfer his nfts', async () => {
            const message = 'shold throw this error message'

            try {
                await nevermined.nfts1155.setApprovalForAll(
                    transferNftCondition.address,
                    true,
                    artist
                )

                await nevermined.nfts1155.setApprovalForAll(
                    config.neverminedNodeAddress,
                    true,
                    artist
                )

                assert.fail(message)
            } catch (error) {
                assert.equal(error.message, message)
            }
        })
        
        it('The artist creates and mints the nfts', async () => {
            const newMetadata = getMetadata()
            newMetadata.userId = payload.sub
            const royaltyAttributes = getRoyaltyAttributes(
                nevermined,
                RoyaltyKind.Standard,
                royalties
            )
            ddo = await nevermined.nfts1155.create(
                newMetadata,
                artist,
                cappedAmount,
                royaltyAttributes,
                assetRewards1
            )
            assert.isDefined(ddo)

            const balance = await nevermined.nfts1155.balance(ddo.id, artist)
            assert.deepEqual(balance, BigNumber.from(5))

            await nevermined.nfts1155.setApprovalForAll(
                config.neverminedNodeAddress,
                true,
                artist
            )
        })

        it('The collector orders the nft', async () => {
            await collector1.requestTokens(nftPrice.div(scale))

            agreementId = await nevermined.nfts1155.order(ddo.id, numberNFTs, collector1)
            assert.isDefined(agreementId)
        })

        it('Ask the Node to transfer the nft and release the rewards', async () => {

            const result = await nevermined.nfts1155.transferForDelegate(
                agreementId,
                artist.getId(),
                collector1.getId(),
                numberNFTs
            )
            assert.isTrue(result)
        })

        it('The Node should fulfill the NFTHolder and NFTAccess conditions', async () => {
            const result = await nevermined.nfts1155.access(
                ddo.id,
                collector1,
                '/tmp/',
                undefined
            )
            assert.isTrue(result)
        })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
        it('The collector access the files', async () => {
            const result = await nevermined.nfts1155.access(ddo.id, collector1, '/tmp/')
            assert.isTrue(result)
        })

        it('The collector access the files object', async () => {
            const result = (await nevermined.nfts1155.access(
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

    describe('As a collector I should not be able to buy a sold out nft', () => {
        it('The artist gives the Node permissions to transfer his nfts', async () => {
            const message = 'shold throw this error message'

            try {
                await nevermined.nfts1155.setApprovalForAll(
                    config.neverminedNodeAddress,
                    true,
                    artist
                )

                assert.fail(message)
            } catch (error) {
                assert.equal(error.message, message)
            }
        })
        it('The artist creates and mints one nft', async () => {
            const newMetadata = getMetadata()
            newMetadata.userId = payload.sub
            const royaltyAttributes = getRoyaltyAttributes(
                nevermined,
                RoyaltyKind.Standard,
                royalties
            )
            ddo = await nevermined.nfts1155.create(
                newMetadata,
                artist,
                BigNumber.from(1),
                royaltyAttributes,
                assetRewards1
            )
            assert.isDefined(ddo)

            const balance = await nevermined.nfts1155.balance(ddo.id, artist)
            assert.deepEqual(balance, BigNumber.from(1))
        })

        it('Collector1 orders the nft', async () => {
            await collector1.requestTokens(nftPrice.div(scale))

            agreementId = await nevermined.nfts1155.order(ddo.id, numberNFTs, collector1)
            assert.isDefined(agreementId)
        })

        it('Ask the Node to transfer the nft and release the rewards', async () => {
            const result = await nevermined.nfts1155.transferForDelegate(
                agreementId,
                artist.getId(),
                collector1.getId(),
                BigNumber.from(1)
            )
            assert.isTrue(result)
        })

        it('The Node should fulfill the NFTHolder and NFTAccess conditions', async () => {
            const result = await nevermined.nfts1155.access(
                ddo.id,
                collector1,
                '/tmp/',
                undefined
            )
            assert.isTrue(result)
        })

        it('The artist nft balance should be zero', async () => {
            const balance = await nevermined.nfts1155.balance(ddo.id, artist)
            assert.deepEqual(balance, BigNumber.from(0))
        })

        it('Collector 2 setups a service agreement to buy the nft', async () => {
            await collector2.requestTokens(nftPrice.div(scale))

            agreementId2 = await nevermined.nfts1155.order(ddo.id, numberNFTs, collector2)
            assert.isDefined(agreementId2)
        })

        it('The Node should not be able to transfer the nft', async () => {
            await assert.isRejected(
                nevermined.nfts1155.transferForDelegate(
                    agreementId2,
                    artist.getId(),
                    collector2.getId(),
                    BigNumber.from(1)
                )
            )
        })
    })
})
