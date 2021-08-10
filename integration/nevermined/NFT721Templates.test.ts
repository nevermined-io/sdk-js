import { assert } from 'chai'
import { Account, DDO, Nevermined, utils } from '../../src'
import {
    ConditionState,
    EscrowPaymentCondition,
    LockPaymentCondition,
    NFT721HolderCondition,
    NFTAccessCondition,
    TransferNFT721Condition
} from '../../src/keeper/contracts/conditions'
import { ConditionStoreManager } from '../../src/keeper/contracts/managers'
import {
    NFT721AccessTemplate,
    NFT721SalesTemplate
} from '../../src/keeper/contracts/templates'
import Token from '../../src/keeper/contracts/Token'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { Nft721 } from '../../src'
import ERC721 from '../../src/artifacts/ERC721.json'
import { getMetadata } from '../utils'

describe('NFT721Templates E2E', () => {
    let owner: Account
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account

    let nevermined: Nevermined
    let token: Token
    let nft: Nft721
    let conditionStoreManager: ConditionStoreManager
    let lockPaymentCondition: LockPaymentCondition
    let escrowPaymentCondition: EscrowPaymentCondition

    let nftAccessCondition: NFTAccessCondition

    let transferNft721Condition: TransferNFT721Condition
    let nft721HolderCondition: NFT721HolderCondition
    let nft721SalesTemplate: NFT721SalesTemplate
    let nft721AccessTemplate: NFT721AccessTemplate

    let conditionIdLockPayment: string
    let conditionIdTransferNFT: string
    let conditionIdEscrow: string
    let conditionIdNFTHolder: string
    let conditionIdNFTAccess: string
    let conditionIdLockPayment2: string
    let conditionIdTransferNFT2: string
    let conditionIdEscrow2: string
    let ddo: DDO

    const royalties = 10 // 10% of royalties in the secondary market
    let agreementId: string
    let agreementAccessId: string
    let agreementId2: string

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    let nftPrice = 20
    let amounts = [15, 5]
    let receivers: string[]
    let assetRewards1: AssetRewards

    // Configuration of Sale in secondary market:
    // Collector1 -> Collector2, the artist get 10% royalties
    let nftPrice2 = 100
    let amounts2 = [90, 10]
    let receivers2: string[]
    let assetRewards2: AssetRewards

    let initialBalances: any
    let scale: number

    before(async () => {
        TestContractHandler.setConfig(config)

        // deploy a nft contract we can use
        const nftContract = await TestContractHandler.deployArtifact(ERC721)

        nevermined = await Nevermined.getInstance(config)
        ;[
            owner,
            artist,
            collector1,
            collector2,
            gallery
        ] = await nevermined.accounts.list()

        receivers = [artist.getId(), gallery.getId()]
        receivers2 = [collector1.getId(), artist.getId()]

        // load the nft contract at given address
        nft = await nevermined.contracts.loadNft721(nftContract.options.address)

        // components
        ;({ conditionStoreManager, token } = nevermined.keeper)

        // conditions
        ;({
            transferNft721Condition,
            lockPaymentCondition,
            escrowPaymentCondition,
            nft721HolderCondition,
            nftAccessCondition
        } = nevermined.keeper.conditions)

        // templates
        ;({ nft721SalesTemplate, nft721AccessTemplate } = nevermined.keeper.templates)

        scale = 10 ** (await token.decimals())

        nftPrice = nftPrice * scale
        amounts = amounts.map(v => v * scale)
        nftPrice2 = nftPrice2 * scale
        amounts2 = amounts2.map(v => v * scale)

        assetRewards1 = new AssetRewards(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        )

        assetRewards2 = new AssetRewards(
            new Map([
                [receivers2[0], amounts2[0]],
                [receivers2[1], amounts2[1]]
            ])
        )
    })

    describe('Full flow', () => {
        before(async () => {
            // initial balances
            initialBalances = {
                artist: await token.balanceOf(artist.getId()),
                collector1: await token.balanceOf(collector1.getId()),
                collector2: await token.balanceOf(collector2.getId()),
                gallery: await token.balanceOf(gallery.getId()),
                escrowPaymentCondition: Number(
                    await token.balanceOf(escrowPaymentCondition.getAddress())
                )
            }
            agreementId = utils.generateId()
            agreementAccessId = utils.generateId()
            agreementId2 = utils.generateId()

            ddo = await nevermined.assets.createNft721(
                getMetadata(),
                artist,
                assetRewards1,
                'PSK-RSA',
                nft.address,
                token.getAddress(),
                [],
                royalties
            )
        })

        describe('As an artist I want to register a new artwork', () => {
            it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
                await nft.mint(ddo.shortId(), artist)

                const balance = await nft.balanceOf(artist)
                assert.equal(balance, 1)
            })
        })

        describe('As a collector I want to buy some art', () => {
            it('I am setting an agreement for buying a NFT', async () => {
                conditionIdLockPayment = await lockPaymentCondition.generateId(
                    agreementId,
                    await lockPaymentCondition.hashValues(
                        ddo.shortId(),
                        escrowPaymentCondition.address,
                        token.getAddress(),
                        amounts,
                        receivers
                    )
                )
                conditionIdTransferNFT = await transferNft721Condition.generateId(
                    agreementId,
                    await transferNft721Condition.hashValues(
                        ddo.shortId(),
                        artist.getId(),
                        collector1.getId(),
                        conditionIdLockPayment,
                        nft.address
                    )
                )
                conditionIdEscrow = await escrowPaymentCondition.generateId(
                    agreementId,
                    await escrowPaymentCondition.hashValues(
                        ddo.shortId(),
                        amounts,
                        receivers,
                        escrowPaymentCondition.getAddress(),
                        token.getAddress(),
                        conditionIdLockPayment,
                        conditionIdTransferNFT
                    )
                )

                const result = await nft721SalesTemplate.createAgreement(
                    agreementId,
                    ddo.shortId(),
                    [conditionIdLockPayment, conditionIdTransferNFT, conditionIdEscrow],
                    [0, 0, 0],
                    [0, 0, 0],
                    collector1.getId()
                )
                assert.isTrue(result.status)
                assert.nestedProperty(result, 'events.AgreementCreated')

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdLockPayment))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdEscrow)).state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdTransferNFT))
                        .state,
                    ConditionState.Unfulfilled
                )
            })

            it('I am locking the payment', async () => {
                await collector1.requestTokens(nftPrice / scale)
                const collector1BalanceBefore = await token.balanceOf(collector1.getId())
                assert.equal(
                    collector1BalanceBefore,
                    initialBalances.collector1 + nftPrice
                )

                await token.approve(
                    lockPaymentCondition.getAddress(),
                    nftPrice,
                    collector1
                )
                await token.approve(
                    escrowPaymentCondition.getAddress(),
                    nftPrice,
                    collector1
                )
                await lockPaymentCondition.fulfill(
                    agreementId,
                    ddo.shortId(),
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    amounts,
                    receivers,
                    collector1
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdLockPayment
                )
                assert.equal(state, ConditionState.Fulfilled)

                const collector1BalanceAfter = await token.balanceOf(collector1.getId())
                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.equal(collector1BalanceAfter - initialBalances.collector1, 0)
                assert.equal(
                    escrowPaymentConditionBalance -
                        initialBalances.escrowPaymentCondition,
                    nftPrice
                )
            })

            it('The artist can check the payment and transfer the NFT to the collector', async () => {
                const ownerBefore = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerBefore, artist.getId())

                await nft.setApprovalForAll(transferNft721Condition.address, true, artist)

                await transferNft721Condition.fulfill(
                    agreementId,
                    ddo.shortId(),
                    collector1.getId(),
                    conditionIdLockPayment,
                    nft.address,
                    artist
                )
                await nft.setApprovalForAll(
                    transferNft721Condition.address,
                    false,
                    artist
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT
                )
                assert.equal(state, ConditionState.Fulfilled)

                const ownerAfter = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerAfter, collector1.getId())
            })

            it('the artist asks and receives the payment', async () => {
                await escrowPaymentCondition.fulfill(
                    agreementId,
                    ddo.shortId(),
                    amounts,
                    receivers,
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    conditionIdLockPayment,
                    conditionIdTransferNFT,
                    artist
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdEscrow
                )
                assert.equal(state, ConditionState.Fulfilled)

                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers[0])
                const receiver1Balance = await token.balanceOf(receivers[1])
                const collectorBalance = await token.balanceOf(collector1.getId())

                assert.equal(receiver0Balance, initialBalances.artist + amounts[0])
                assert.equal(receiver1Balance, initialBalances.gallery + amounts[1])
                assert.equal(collectorBalance - initialBalances.collector1, 0)
                assert.equal(
                    escrowPaymentConditionBalance -
                        initialBalances.escrowPaymentCondition,
                    0
                )
            })
        })

        describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
            it('The collector sets up the NFT access agreement', async () => {
                // Collector1: Create NFT access agreement
                conditionIdNFTHolder = await nft721HolderCondition.generateId(
                    agreementAccessId,
                    await nft721HolderCondition.hashValues(
                        ddo.shortId(),
                        collector1.getId(),
                        nft.address
                    )
                )
                conditionIdNFTAccess = await nftAccessCondition.generateId(
                    agreementAccessId,
                    await nftAccessCondition.hashValues(ddo.shortId(), collector1.getId())
                )

                const result = await nft721AccessTemplate.createAgreement(
                    agreementAccessId,
                    ddo.shortId(),
                    [conditionIdNFTHolder, conditionIdNFTAccess],
                    [0, 0],
                    [0, 0],
                    collector1.getId()
                )
                assert.isTrue(result.status)
                assert.nestedProperty(result, 'events.AgreementCreated')

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTAccess))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTHolder))
                        .state,
                    ConditionState.Unfulfilled
                )
            })

            it('The collector demonstrates it onws the NFT', async () => {
                // TODO: Not sure why we need to wait here but without this the
                // the fulfillment will fail
                await new Promise(r => setTimeout(r, 10000))
                await nft721HolderCondition.fulfill(
                    agreementAccessId,
                    ddo.shortId(),
                    collector1.getId(),
                    nft.address,
                    collector1
                )

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTHolder))
                        .state,
                    ConditionState.Fulfilled
                )
            })

            it(' The artist gives access to the collector to the content', async () => {
                await nftAccessCondition.fulfill(
                    agreementAccessId,
                    ddo.shortId(),
                    collector1.getId(),
                    artist
                )

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTAccess))
                        .state,
                    ConditionState.Fulfilled
                )
            })
        })

        describe('As collector1 I want to sell my NFT to collector2 for a higher price', () => {
            before(async () => {
                // initial balances
                initialBalances = {
                    artist: await token.balanceOf(artist.getId()),
                    collector1: await token.balanceOf(collector1.getId()),
                    collector2: await token.balanceOf(collector2.getId()),
                    gallery: await token.balanceOf(gallery.getId()),
                    owner: await token.balanceOf(owner.getId()),
                    lockPaymentCondition: Number(
                        await token.balanceOf(lockPaymentCondition.getAddress())
                    ),
                    escrowPaymentCondition: Number(
                        await token.balanceOf(escrowPaymentCondition.getAddress())
                    )
                }
            })
            it('As collector2 I setup an agreement for buying an NFT from collector1', async () => {
                conditionIdLockPayment2 = await lockPaymentCondition.generateId(
                    agreementId2,
                    await lockPaymentCondition.hashValues(
                        ddo.shortId(),
                        escrowPaymentCondition.address,
                        token.getAddress(),
                        amounts2,
                        receivers2
                    )
                )
                conditionIdTransferNFT2 = await transferNft721Condition.generateId(
                    agreementId2,
                    await transferNft721Condition.hashValues(
                        ddo.shortId(),
                        collector1.getId(),
                        collector2.getId(),
                        conditionIdLockPayment2,
                        nft.address
                    )
                )
                conditionIdEscrow2 = await escrowPaymentCondition.generateId(
                    agreementId2,
                    await escrowPaymentCondition.hashValues(
                        ddo.shortId(),
                        amounts2,
                        receivers2,
                        escrowPaymentCondition.getAddress(),
                        token.getAddress(),
                        conditionIdLockPayment2,
                        conditionIdTransferNFT2
                    )
                )

                const result = await nft721SalesTemplate.createAgreement(
                    agreementId2,
                    ddo.shortId(),
                    [
                        conditionIdLockPayment2,
                        conditionIdTransferNFT2,
                        conditionIdEscrow2
                    ],
                    [0, 0, 0],
                    [0, 0, 0],
                    collector2.getId()
                )
                assert.isTrue(result.status)
                assert.nestedProperty(result, 'events.AgreementCreated')

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdLockPayment2))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdEscrow2)).state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdTransferNFT2))
                        .state,
                    ConditionState.Unfulfilled
                )
            })

            it('As collector2 I am locking the payment', async () => {
                await collector2.requestTokens(nftPrice2 / scale)
                const collector2BalanceBefore = await token.balanceOf(collector2.getId())
                assert.equal(
                    collector2BalanceBefore,
                    initialBalances.collector2 + nftPrice2
                )

                await token.approve(
                    lockPaymentCondition.getAddress(),
                    nftPrice2,
                    collector2
                )
                await lockPaymentCondition.fulfill(
                    agreementId2,
                    ddo.shortId(),
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    amounts2,
                    receivers2,
                    collector2
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdLockPayment2
                )
                assert.equal(state, ConditionState.Fulfilled)

                const collector2BalanceAfter = await token.balanceOf(collector2.getId())
                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.equal(collector2BalanceAfter - initialBalances.collector2, 0)
                assert.equal(
                    escrowPaymentConditionBalance -
                        initialBalances.escrowPaymentCondition,
                    nftPrice2
                )
            })

            it('As collector1 I can check the payment and transfer the NFT to collector2', async () => {
                const ownerBefore = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerBefore, collector1.getId())

                await nft.setApprovalForAll(
                    transferNft721Condition.address,
                    true,
                    collector1
                )

                await transferNft721Condition.fulfill(
                    agreementId2,
                    ddo.shortId(),
                    collector2.getId(),
                    conditionIdLockPayment2,
                    nft.address,
                    collector1
                )

                await nft.setApprovalForAll(
                    transferNft721Condition.address,
                    false,
                    collector1
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT2
                )
                assert.equal(state, ConditionState.Fulfilled)

                const ownerAfter = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerAfter, collector2.getId())
            })

            it('Collector1 and Artist get the payment', async () => {
                await escrowPaymentCondition.fulfill(
                    agreementId2,
                    ddo.shortId(),
                    amounts2,
                    receivers2,
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    conditionIdLockPayment2,
                    conditionIdTransferNFT2,
                    collector1
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdEscrow2
                )
                assert.equal(state, ConditionState.Fulfilled)

                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers2[0])
                const receiver1Balance = await token.balanceOf(receivers2[1])
                const collectorBalance = await token.balanceOf(collector2.getId())

                assert.equal(receiver0Balance, initialBalances.collector1 + amounts2[0])
                assert.equal(receiver1Balance, initialBalances.artist + amounts2[1])
                assert.equal(collectorBalance - initialBalances.collector2, 0)
                assert.equal(
                    escrowPaymentConditionBalance -
                        initialBalances.escrowPaymentCondition,
                    0
                )
            })
        })
    })

    describe('Short flow', () => {
        before(async () => {
            // initial balances
            initialBalances = {
                artist: await token.balanceOf(artist.getId()),
                collector1: await token.balanceOf(collector1.getId()),
                collector2: await token.balanceOf(collector2.getId()),
                gallery: await token.balanceOf(gallery.getId()),
                escrowPaymentCondition: Number(
                    await token.balanceOf(escrowPaymentCondition.getAddress())
                )
            }
            agreementId = utils.generateId()
            agreementAccessId = utils.generateId()
            agreementId2 = utils.generateId()

            ddo = await nevermined.assets.createNft721(
                getMetadata(),
                artist,
                assetRewards2,
                'PSK-RSA',
                nft.address,
                token.getAddress(),
                [],
                royalties
            )
        })

        describe('As an artist I want to register a new artwork', () => {
            it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
                await nft.mint(ddo.shortId(), artist)

                const balance = await nft.balanceOf(artist)
                assert.equal(balance, 1)
            })
        })

        describe('As a collector I want to buy some art', () => {
            it('I am setting an agreement for buying a NFT', async () => {
                const result = await nft721SalesTemplate.createAgreementFromDDO(
                    agreementId,
                    ddo,
                    assetRewards1,
                    collector1.getId(),
                    collector1
                )
                assert.isTrue(result)

                const status = await nft721SalesTemplate.getAgreementStatus(agreementId)
                assert.equal(
                    status && status.lockPayment.state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    status && status.transferNFT.state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    status && status.escrowPayment.state,
                    ConditionState.Unfulfilled
                )
            })

            it('I am locking the payment', async () => {
                await collector1.requestTokens(nftPrice / scale)

                const collector1BalanceBefore = await token.balanceOf(collector1.getId())
                assert.equal(
                    collector1BalanceBefore,
                    initialBalances.collector1 + nftPrice
                )

                const receipt = await nevermined.agreements.conditions.lockPayment(
                    agreementId,
                    ddo.shortId(),
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    token.getAddress(),
                    collector1
                )
                assert.isTrue(receipt)

                const collector1BalanceAfter = await token.balanceOf(collector1.getId())
                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.equal(collector1BalanceAfter - initialBalances.collector1, 0)
                assert.equal(
                    escrowPaymentConditionBalance -
                        initialBalances.escrowPaymentCondition,
                    nftPrice
                )
            })

            it('The artist can check the payment and transfer the NFT to the collector', async () => {
                const ownerBefore = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerBefore, artist.getId())

                const receipt = await nevermined.agreements.conditions.transferNft721(
                    agreementId,
                    ddo,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    artist
                )
                assert.isTrue(receipt)

                const ownerAfter = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerAfter, collector1.getId())
            })

            it('the artist asks and receives the payment', async () => {
                const receipt = await nevermined.agreements.conditions.releaseNft721Reward(
                    agreementId,
                    ddo,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    artist
                )
                assert.isTrue(receipt)

                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers[0])
                const receiver1Balance = await token.balanceOf(receivers[1])
                const collectorBalance = await token.balanceOf(collector1.getId())

                assert.equal(receiver0Balance, initialBalances.artist + amounts[0])
                assert.equal(receiver1Balance, initialBalances.gallery + amounts[1])
                assert.equal(collectorBalance - initialBalances.collector1, 0)
                assert.equal(
                    escrowPaymentConditionBalance -
                        initialBalances.escrowPaymentCondition,
                    0
                )
            })
        })

        describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
            it('The collector sets up the NFT access agreement', async () => {
                // Collector1: Create NFT access agreement
                const result = await nft721AccessTemplate.createAgreementFromDDO(
                    agreementAccessId,
                    ddo,
                    new AssetRewards(),
                    collector1.getId(),
                    collector1
                )
                assert.isTrue(result)

                const status = await nft721AccessTemplate.getAgreementStatus(
                    agreementAccessId
                )
                assert.equal(status && status.nftHolder.state, ConditionState.Unfulfilled)
                assert.equal(status && status.nftAccess.state, ConditionState.Unfulfilled)
            })

            it('The collector demonstrates it onws the NFT', async () => {
                // TODO: Not sure why we need to wait here but without this the
                // the fulfillment will fail
                await new Promise(r => setTimeout(r, 10000))
                const result = await nevermined.agreements.conditions.holderNft721(
                    agreementAccessId,
                    ddo,
                    collector1.getId(),
                    collector1
                )
                assert.isTrue(result)
            })

            it(' The artist gives access to the collector to the content', async () => {
                const result = await nevermined.agreements.conditions.grantNftAccess(
                    agreementAccessId,
                    ddo.shortId(),
                    collector1.getId(),
                    artist
                )
                assert.isTrue(result)
            })
        })

        describe('As collector1 I want to sell my NFT to collector2 for a higher price', () => {
            before(async () => {
                // initial balances
                initialBalances = {
                    artist: await token.balanceOf(artist.getId()),
                    collector1: await token.balanceOf(collector1.getId()),
                    collector2: await token.balanceOf(collector2.getId()),
                    gallery: await token.balanceOf(gallery.getId()),
                    owner: await token.balanceOf(owner.getId()),
                    lockPaymentCondition: Number(
                        await token.balanceOf(lockPaymentCondition.getAddress())
                    ),
                    escrowPaymentCondition: Number(
                        await token.balanceOf(escrowPaymentCondition.getAddress())
                    )
                }
            })
            it('As collector2 I setup an agreement for buying an NFT from collector1', async () => {
                const result = await nft721SalesTemplate.createAgreementFromDDO(
                    agreementId2,
                    ddo,
                    assetRewards2,
                    collector2.getId(),
                    collector2
                )
                assert.isTrue(result)

                const status = await nft721SalesTemplate.getAgreementStatus(agreementId2)
                assert.equal(
                    status && status.lockPayment.state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    status && status.transferNFT.state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    status && status.escrowPayment.state,
                    ConditionState.Unfulfilled
                )
            })

            it('As collector2 I am locking the payment', async () => {
                await collector2.requestTokens(nftPrice2 / scale)

                const collector2BalanceBefore = await token.balanceOf(collector2.getId())
                assert.equal(
                    collector2BalanceBefore,
                    initialBalances.collector2 + nftPrice2
                )

                const receipt = await nevermined.agreements.conditions.lockPayment(
                    agreementId2,
                    ddo.shortId(),
                    assetRewards2.getAmounts(),
                    assetRewards2.getReceivers(),
                    token.getAddress(),
                    collector2
                )
                assert.isTrue(receipt)

                const collector2BalanceAfter = await token.balanceOf(collector2.getId())
                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.equal(collector2BalanceAfter - initialBalances.collector2, 0)
                assert.equal(
                    escrowPaymentConditionBalance -
                        initialBalances.escrowPaymentCondition,
                    nftPrice2
                )
            })

            it('As collector1 I can check the payment and transfer the NFT to collector2', async () => {
                const ownerBefore = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerBefore, collector1.getId())

                const receipt = await nevermined.agreements.conditions.transferNft721(
                    agreementId2,
                    ddo,
                    assetRewards2.getAmounts(),
                    assetRewards2.getReceivers(),
                    collector1
                )
                assert.isTrue(receipt)

                const ownerAfter = await nft.ownerOf(ddo.shortId())
                assert.equal(ownerAfter, collector2.getId())
            })

            it('Collector1 and Artist get the payment', async () => {
                const receipt = await nevermined.agreements.conditions.releaseNft721Reward(
                    agreementId2,
                    ddo,
                    assetRewards2.getAmounts(),
                    assetRewards2.getReceivers(),
                    collector1
                )
                assert.isTrue(receipt)

                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers2[0])
                const receiver1Balance = await token.balanceOf(receivers2[1])
                const collectorBalance = await token.balanceOf(collector2.getId())

                assert.equal(receiver0Balance, initialBalances.collector1 + amounts2[0])
                assert.equal(receiver1Balance, initialBalances.artist + amounts2[1])
                assert.equal(collectorBalance - initialBalances.collector2, 0)
                assert.equal(
                    escrowPaymentConditionBalance -
                        initialBalances.escrowPaymentCondition,
                    0
                )
            })
        })
    })
})
