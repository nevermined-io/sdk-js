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
import DIDRegistry from '../../src/keeper/contracts/DIDRegistry'
import { ConditionStoreManager } from '../../src/keeper/contracts/managers'
import {
    NFT721AccessTemplate,
    NFT721SalesTemplate
} from '../../src/keeper/contracts/templates'
import Token from '../../src/keeper/contracts/Token'
import AssetRewards from '../../src/models/AssetRewards'
import { noZeroX } from '../../src/utils'
import { config } from '../config'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { Contract } from 'web3-eth-contract'

describe('NFT721Templates E2E', () => {
    let owner: Account
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account

    let nevermined: Nevermined
    let token: Token
    let nft: Contract
    let didRegistry: DIDRegistry
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
    const cappedAmount = 5
    let didSeed: string
    let did: string
    let agreementId: string
    let agreementAccessId: string
    let agreementId2: string
    let checksum: string
    let activityId: string
    const url =
        'https://raw.githubusercontent.com/nevermined-io/assets/main/images/logo/banner_logo.png'

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberNFTs = 1
    let nftPrice = 20
    let amounts = [15, 5]
    let receivers: string[]
    let assetRewards1: AssetRewards

    // Configuration of Sale in secondary market:
    // Collector1 -> Collector2, the artist get 10% royalties
    const numberNFTs2 = 1
    let nftPrice2 = 100
    let amounts2 = [90, 10]
    let receivers2: string[]
    let assetRewards2: AssetRewards

    let initialBalances: any
    let scale: number

    before(async () => {
        TestContractHandler.setConfig(config)
        nft = await TestContractHandler.deployArtifact(require('./NFT721.json'))

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

        // components
        ;({ didRegistry, conditionStoreManager, token } = nevermined.keeper)

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
            didSeed = utils.generateId()
            did = await didRegistry.hashDID(didSeed, artist.getId())
            agreementId = utils.generateId()
            agreementAccessId = utils.generateId()
            agreementId2 = utils.generateId()
            checksum = utils.generateId()
            activityId = utils.generateId()
        })
        describe('As an artist I want to register a new artwork', () => {
            it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
                await didRegistry.registerMintableDID(
                    didSeed,
                    checksum,
                    [],
                    url,
                    activityId,
                    '',
                    cappedAmount,
                    royalties,
                    artist.getId()
                )

                await nft.methods.mint(did).send({ from: artist.getId() })

                const balance = await nft.methods.balanceOf(artist.getId()).call()
                assert.equal(balance, 1)
            })
        })

        describe('As a collector I want to buy some art', () => {
            it('I am setting an agreement for buying a NFT', async () => {
                conditionIdLockPayment = await lockPaymentCondition.generateId(
                    agreementId,
                    await lockPaymentCondition.hashValues(
                        did,
                        escrowPaymentCondition.address,
                        token.getAddress(),
                        amounts,
                        receivers
                    )
                )
                conditionIdTransferNFT = await transferNft721Condition.generateId(
                    agreementId,
                    await transferNft721Condition.hashValues(
                        did,
                        collector1.getId(),
                        numberNFTs,
                        conditionIdLockPayment,
                        nft.options.address
                    )
                )
                conditionIdEscrow = await escrowPaymentCondition.generateId(
                    agreementId,
                    await escrowPaymentCondition.hashValues(
                        did,
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
                    did,
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
                    collector1.getId()
                )
                await token.approve(
                    escrowPaymentCondition.getAddress(),
                    nftPrice,
                    collector1.getId()
                )
                await lockPaymentCondition.fulfill(
                    agreementId,
                    did,
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    amounts,
                    receivers,
                    collector1.getId()
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
                const ownerBefore = await nft.methods.ownerOf(did).call()
                assert.equal(ownerBefore, artist.getId())

                await nft.methods
                    .setApprovalForAll(transferNft721Condition.address, true)
                    .send({ from: artist.getId() })

                await transferNft721Condition.fulfill(
                    agreementId,
                    did,
                    collector1.getId(),
                    numberNFTs,
                    conditionIdLockPayment,
                    nft.options.address,
                    artist.getId()
                )
                await nft.methods
                    .setApprovalForAll(transferNft721Condition.address, false)
                    .send({ from: artist.getId() })

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT
                )
                assert.equal(state, ConditionState.Fulfilled)

                const ownerAfter = await nft.methods.ownerOf(did).call()
                assert.equal(ownerAfter, collector1.getId())
            })

            it('the artist asks and receives the payment', async () => {
                await escrowPaymentCondition.fulfill(
                    agreementId,
                    did,
                    amounts,
                    receivers,
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    conditionIdLockPayment,
                    conditionIdTransferNFT,
                    artist.getId()
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
                        did,
                        collector1.getId(),
                        numberNFTs,
                        nft.options.address
                    )
                )
                conditionIdNFTAccess = await nftAccessCondition.generateId(
                    agreementAccessId,
                    await nftAccessCondition.hashValues(did, collector1.getId())
                )

                const result = await nft721AccessTemplate.createAgreement(
                    agreementAccessId,
                    did,
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
                    did,
                    collector1.getId(),
                    nft.options.address,
                    numberNFTs
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
                    did,
                    collector1.getId(),
                    artist.getId()
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
                        did,
                        escrowPaymentCondition.address,
                        token.getAddress(),
                        amounts2,
                        receivers2
                    )
                )
                conditionIdTransferNFT2 = await transferNft721Condition.generateId(
                    agreementId2,
                    await transferNft721Condition.hashValues(
                        did,
                        collector2.getId(),
                        numberNFTs2,
                        conditionIdLockPayment2,
                        nft.options.address
                    )
                )
                conditionIdEscrow2 = await escrowPaymentCondition.generateId(
                    agreementId2,
                    await escrowPaymentCondition.hashValues(
                        did,
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
                    did,
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
                    collector2.getId()
                )
                await lockPaymentCondition.fulfill(
                    agreementId2,
                    did,
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    amounts2,
                    receivers2,
                    collector2.getId()
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
                const ownerBefore = await nft.methods.ownerOf(did).call()
                assert.equal(ownerBefore, collector1.getId())

                await nft.methods
                    .setApprovalForAll(transferNft721Condition.address, true)
                    .send({ from: collector1.getId() })

                await transferNft721Condition.fulfill(
                    agreementId2,
                    did,
                    collector2.getId(),
                    numberNFTs2,
                    conditionIdLockPayment2,
                    nft.options.address,
                    collector1.getId()
                )

                await nft.methods
                    .setApprovalForAll(transferNft721Condition.address, false)
                    .send({ from: collector1.getId() })

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT2
                )
                assert.equal(state, ConditionState.Fulfilled)

                const ownerAfter = await nft.methods.ownerOf(did).call()
                assert.equal(ownerAfter, collector2.getId())
            })

            it('Collector1 and Artist get the payment', async () => {
                await escrowPaymentCondition.fulfill(
                    agreementId2,
                    did,
                    amounts2,
                    receivers2,
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    conditionIdLockPayment2,
                    conditionIdTransferNFT2,
                    collector1.getId()
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
            didSeed = utils.generateId()
            did = await didRegistry.hashDID(didSeed, artist.getId())
            agreementId = utils.generateId()
            agreementAccessId = utils.generateId()
            agreementId2 = utils.generateId()
            checksum = utils.generateId()
            activityId = utils.generateId()
            ddo = new DDO({ id: `did:nv:${noZeroX(did)}` })
        })

        describe('As an artist I want to register a new artwork', () => {
            it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
                await didRegistry.registerMintableDID(
                    didSeed,
                    checksum,
                    [],
                    url,
                    activityId,
                    '',
                    cappedAmount,
                    royalties,
                    artist.getId()
                )

                await nft.methods.mint(did).send({ from: artist.getId() })
                await nft.methods
                    .setApprovalForAll(transferNft721Condition.address, true)
                    .send({ from: artist.getId() })

                const balance = await nft.methods.balanceOf(artist.getId()).call()
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
                    nft.options.address,
                    undefined,
                    numberNFTs
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
                    did,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
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
                const ownerBefore = await nft.methods.ownerOf(did).call()
                assert.equal(ownerBefore, artist.getId())

                await nft.methods
                    .setApprovalForAll(transferNft721Condition.address, true)
                    .send({ from: artist.getId() })

                const receipt = await nevermined.agreements.conditions.transferNft721(
                    agreementId,
                    did,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    collector1.getId(),
                    numberNFTs,
                    nft.options.address,
                    artist
                )
                assert.isTrue(receipt)

                await nft.methods
                    .setApprovalForAll(transferNft721Condition.address, false)
                    .send({ from: artist.getId() })

                const ownerAfter = await nft.methods.ownerOf(did).call()
                assert.equal(ownerAfter, collector1.getId())
            })

            it('the artist asks and receives the payment', async () => {
                const receipt = await nevermined.agreements.conditions.releaseNft721Reward(
                    agreementId,
                    did,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    collector1.getId(),
                    numberNFTs,
                    nft.options.address,
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
                    nft.options.address,
                    collector1.getId(),
                    numberNFTs
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
                    did,
                    collector1.getId(),
                    nft.options.address,
                    numberNFTs
                )
                assert.isTrue(result)
            })

            it(' The artist gives access to the collector to the content', async () => {
                const result = await nevermined.agreements.conditions.grantNftAccess(
                    agreementAccessId,
                    did,
                    collector1.getId(),
                    artist.getId()
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
                    nft.options.address,
                    undefined,
                    numberNFTs2
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
                    did,
                    assetRewards2.getAmounts(),
                    assetRewards2.getReceivers(),
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
                const ownerBefore = await nft.methods.ownerOf(did).call()
                assert.equal(ownerBefore, collector1.getId())

                await nft.methods
                    .setApprovalForAll(transferNft721Condition.address, true)
                    .send({ from: collector1.getId() })

                const receipt = await nevermined.agreements.conditions.transferNft721(
                    agreementId2,
                    did,
                    assetRewards2.getAmounts(),
                    assetRewards2.getReceivers(),
                    collector2.getId(),
                    numberNFTs2,
                    nft.options.address,
                    collector1
                )
                assert.isTrue(receipt)

                await nft.methods
                    .setApprovalForAll(transferNft721Condition.address, false)
                    .send({ from: collector1.getId() })

                const ownerAfter = await nft.methods.ownerOf(did).call()
                assert.equal(ownerAfter, collector2.getId())
            })

            it('Collector1 and Artist get the payment', async () => {
                const receipt = await nevermined.agreements.conditions.releaseNft721Reward(
                    agreementId2,
                    did,
                    assetRewards2.getAmounts(),
                    assetRewards2.getReceivers(),
                    collector2.getId(),
                    numberNFTs2,
                    nft.options.address,
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
