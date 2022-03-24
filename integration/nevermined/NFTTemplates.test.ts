import { assert } from 'chai'
import { Account, DDO, Nevermined, utils } from '../../src'
import {
    ConditionState,
    EscrowPaymentCondition,
    LockPaymentCondition,
    NFTAccessCondition,
    NFTHolderCondition,
    TransferNFTCondition
} from '../../src/keeper/contracts/conditions'
import { NFTUpgradeable } from '../../src/keeper/contracts/conditions/NFTs/NFTUpgradable'
import { ConditionStoreManager } from '../../src/keeper/contracts/managers'
import { NFTAccessTemplate, NFTSalesTemplate } from '../../src/keeper/contracts/templates'
import Token from '../../src/keeper/contracts/Token'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'

describe('NFTTemplates E2E', () => {
    let owner: Account
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account

    let nevermined: Nevermined
    let token: Token
    let nftUpgradeable: NFTUpgradeable
    let conditionStoreManager: ConditionStoreManager
    let transferNftCondition: TransferNFTCondition
    let lockPaymentCondition: LockPaymentCondition
    let escrowPaymentCondition: EscrowPaymentCondition
    let nftHolderCondition: NFTHolderCondition
    let nftAccessCondition: NFTAccessCondition
    let nftSalesTemplate: NFTSalesTemplate
    let nftAccessTemplate: NFTAccessTemplate

    let conditionIdLockPayment: [string, string]
    let conditionIdTransferNFT: [string, string]
    let conditionIdEscrow: [string, string]
    let conditionIdNFTHolder: [string, string]
    let conditionIdNFTAccess: [string, string]
    let conditionIdLockPayment2: [string, string]
    let conditionIdTransferNFT2: [string, string]
    let conditionIdEscrow2: [string, string]
    let ddo: DDO

    const royalties = 10 // 10% of royalties in the secondary market
    const cappedAmount = 5
    let agreementId: string
    let agreementAccessId: string
    let agreementId2: string
    let agreementIdSeed: string
    let agreementAccessIdSeed: string
    let agreementId2Seed: string

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
    let networkName: string

    before(async () => {
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
        ;({ conditionStoreManager, token, nftUpgradeable } = nevermined.keeper)

        // conditions
        ;({
            transferNftCondition,
            lockPaymentCondition,
            escrowPaymentCondition,
            nftHolderCondition,
            nftAccessCondition
        } = nevermined.keeper.conditions)

        // templates
        ;({ nftSalesTemplate, nftAccessTemplate } = nevermined.keeper.templates)

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

        networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
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

            agreementIdSeed = utils.generateId()
            agreementAccessIdSeed = utils.generateId()
            agreementId2Seed = utils.generateId()

            agreementId = await nevermined.keeper.agreementStoreManager.agreementId(agreementIdSeed, collector1.getId())
            agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(agreementAccessIdSeed, collector1.getId())
            agreementId2 = await nevermined.keeper.agreementStoreManager.agreementId(agreementId2Seed, collector2.getId())

            ddo = await nevermined.assets.createNft(
                getMetadata(),
                artist,
                assetRewards1,
                undefined,
                cappedAmount,
                undefined,
                numberNFTs,
                royalties,
                token.getAddress()
            )
        })

        describe('As an artist I want to register a new artwork', () => {
            it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
                await nftUpgradeable.setApprovalForAll(
                    transferNftCondition.getAddress(),
                    true,
                    artist
                )

                const balance = await nftUpgradeable.balance(artist.getId(), ddo.id)
                assert.equal(balance, 5)
            })
        })

        describe('As a collector I want to buy some art', () => {
            it('I am setting an agreement for buying a NFT', async () => {
                conditionIdLockPayment = await lockPaymentCondition.generateId2(
                    agreementId,
                    await lockPaymentCondition.hashValues(
                        ddo.id,
                        escrowPaymentCondition.address,
                        token.getAddress(),
                        amounts,
                        receivers
                    )
                )
                conditionIdTransferNFT = await transferNftCondition.generateId2(
                    agreementId,
                    await transferNftCondition.hashValues(
                        ddo.id,
                        artist.getId(),
                        collector1.getId(),
                        numberNFTs,
                        conditionIdLockPayment[1]
                    )
                )
                conditionIdEscrow = await escrowPaymentCondition.generateId2(
                    agreementId,
                    await escrowPaymentCondition.hashValues(
                        ddo.id,
                        amounts,
                        receivers,
                        collector1.getId(),
                        escrowPaymentCondition.getAddress(),
                        token.getAddress(),
                        conditionIdLockPayment[1],
                        conditionIdTransferNFT[1]
                    )
                )

                const result = await nftSalesTemplate.createAgreement(
                    agreementIdSeed,
                    ddo.shortId(),
                    [conditionIdLockPayment[0], conditionIdTransferNFT[0], conditionIdEscrow[0]],
                    [0, 0, 0],
                    [0, 0, 0],
                    collector1.getId(),
                    collector1
                )
                assert.isTrue(result.status)
                assert.nestedProperty(result, 'events.AgreementCreated')

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdLockPayment[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdEscrow[1])).state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdTransferNFT[1]))
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
                    ddo.id,
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    amounts,
                    receivers,
                    collector1
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdLockPayment[1]
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
                const nftBalanceArtistBefore = await nftUpgradeable.balance(
                    artist.getId(),
                    ddo.id
                )
                const nftBalanceCollectorBefore = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.id
                )

                await transferNftCondition.fulfill(
                    agreementId,
                    ddo.id,
                    collector1.getId(),
                    numberNFTs,
                    conditionIdLockPayment[1],
                    artist
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT[1]
                )
                assert.equal(state, ConditionState.Fulfilled)

                const nftBalanceArtistAfter = await nftUpgradeable.balance(
                    artist.getId(),
                    ddo.id
                )
                const nftBalanceCollectorAfter = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.id
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
                await escrowPaymentCondition.fulfill(
                    agreementId,
                    ddo.id,
                    amounts,
                    receivers,
                    collector1.getId(),
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    conditionIdLockPayment[1],
                    conditionIdTransferNFT[1],
                    artist
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdEscrow[1]
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
                conditionIdNFTHolder = await nftHolderCondition.generateId2(
                    agreementAccessId,
                    await nftHolderCondition.hashValues(
                        ddo.id,
                        collector1.getId(),
                        numberNFTs
                    )
                )
                conditionIdNFTAccess = await nftAccessCondition.generateId2(
                    agreementAccessId,
                    await nftAccessCondition.hashValues(ddo.id, collector1.getId())
                )

                const result = await nftAccessTemplate.createAgreement(
                    agreementAccessIdSeed,
                    ddo.shortId(),
                    [conditionIdNFTHolder[0], conditionIdNFTAccess[0]],
                    [0, 0],
                    [0, 0],
                    collector1.getId(),
                    collector1
                )
                assert.isTrue(result.status)
                assert.nestedProperty(result, 'events.AgreementCreated')

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTAccess[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTHolder[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
            })

            it('The collector demonstrates it onws the NFT', async function() {
                // See https://github.com/nevermined-io/sdk-js/issues/137
                if (networkName === 'polygon-localnet') {
                    this.skip()
                }
                // TODO: Not sure why we need to wait here but without this the
                // the fulfillment will fail
                await new Promise(r => setTimeout(r, 10000))
                await nftHolderCondition.fulfill(
                    agreementAccessId,
                    ddo.id,
                    collector1.getId(),
                    numberNFTs
                )

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTHolder[1]))
                        .state,
                    ConditionState.Fulfilled
                )
            })

            it(' The artist gives access to the collector to the content', async function() {
                // See https://github.com/nevermined-io/sdk-js/issues/137
                if (networkName === 'polygon-localnet') {
                    this.skip()
                }

                await nftAccessCondition.fulfill(
                    agreementAccessId,
                    ddo.id,
                    collector1.getId(),
                    artist
                )

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdNFTAccess[1]))
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
                conditionIdLockPayment2 = await lockPaymentCondition.generateId2(
                    agreementId2,
                    await lockPaymentCondition.hashValues(
                        ddo.id,
                        escrowPaymentCondition.address,
                        token.getAddress(),
                        amounts2,
                        receivers2
                    )
                )
                conditionIdTransferNFT2 = await transferNftCondition.generateId2(
                    agreementId2,
                    await transferNftCondition.hashValues(
                        ddo.id,
                        collector1.getId(),
                        collector2.getId(),
                        numberNFTs2,
                        conditionIdLockPayment2[1]
                    )
                )
                conditionIdEscrow2 = await escrowPaymentCondition.generateId2(
                    agreementId2,
                    await escrowPaymentCondition.hashValues(
                        ddo.id,
                        amounts2,
                        receivers2,
                        collector2.getId(),
                        escrowPaymentCondition.getAddress(),
                        token.getAddress(),
                        conditionIdLockPayment2[1],
                        conditionIdTransferNFT2[1]
                    )
                )

                const result = await nftSalesTemplate.createAgreement(
                    agreementId2Seed,
                    ddo.shortId(),
                    [
                        conditionIdLockPayment2[0],
                        conditionIdTransferNFT2[0],
                        conditionIdEscrow2[0]
                    ],
                    [0, 0, 0],
                    [0, 0, 0],
                    collector2.getId(),
                    collector2
                )
                assert.isTrue(result.status)
                assert.nestedProperty(result, 'events.AgreementCreated')

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdLockPayment2[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdEscrow2[1])).state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdTransferNFT2[1]))
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
                    ddo.id,
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    amounts2,
                    receivers2,
                    collector2
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdLockPayment2[1]
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
                const nftBalanceCollector1Before = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.id
                )
                const nftBalanceCollector2Before = await nftUpgradeable.balance(
                    collector2.getId(),
                    ddo.id
                )

                await transferNftCondition.fulfill(
                    agreementId2,
                    ddo.id,
                    collector2.getId(),
                    numberNFTs2,
                    conditionIdLockPayment2[1],
                    collector1
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT2[1]
                )
                assert.equal(state, ConditionState.Fulfilled)

                const nftBalanceCollector1After = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.id
                )
                const nftBalanceCollector2After = await nftUpgradeable.balance(
                    collector2.getId(),
                    ddo.id
                )

                assert.equal(
                    Number(nftBalanceCollector1After),
                    Number(nftBalanceCollector1Before) - numberNFTs2
                )
                assert.equal(
                    Number(nftBalanceCollector2After),
                    Number(nftBalanceCollector2Before) + numberNFTs
                )
            })

            it('Collector1 and Artist get the payment', async () => {
                await escrowPaymentCondition.fulfill(
                    agreementId2,
                    ddo.id,
                    amounts2,
                    receivers2,
                    collector2.getId(),
                    escrowPaymentCondition.getAddress(),
                    token.getAddress(),
                    conditionIdLockPayment2[1],
                    conditionIdTransferNFT2[1],
                    collector1
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdEscrow2[1]
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
            agreementIdSeed = utils.generateId()
            agreementAccessIdSeed = utils.generateId()
            agreementId2Seed = utils.generateId()

            agreementId = await nevermined.keeper.agreementStoreManager.agreementId(agreementIdSeed, collector1.getId())
            agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(agreementAccessIdSeed, collector1.getId())
            agreementId2 = await nevermined.keeper.agreementStoreManager.agreementId(agreementId2Seed, collector2.getId())

            ddo = await nevermined.assets.createNft(
                getMetadata(),
                artist,
                assetRewards1,
                undefined,
                cappedAmount,
                undefined,
                numberNFTs,
                royalties,
                token.getAddress()
            )
            await collector1.requestTokens(nftPrice / scale)
        })

        describe('As an artist I want to register a new artwork', () => {
            it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
                await nftUpgradeable.setApprovalForAll(
                    transferNftCondition.getAddress(),
                    true,
                    artist
                )

                const balance = await nftUpgradeable.balance(artist.getId(), ddo.id)
                assert.equal(balance, 5)
            })
        })

        describe('As a collector I want to buy some art', () => {
            it('I am setting an agreement for buying a NFT', async () => {
                const collector1BalanceBefore = await token.balanceOf(collector1.getId())
                assert.equal(
                    collector1BalanceBefore,
                    initialBalances.collector1 + nftPrice
                )
                const result = await nftSalesTemplate.createAgreementWithPaymentFromDDO(
                    agreementIdSeed,
                    ddo,
                    assetRewards1,
                    collector1.getId(),
                    collector1,
                    numberNFTs,
                    undefined,
                    collector1
                )
                assert.isDefined(result)

                const status = await nftSalesTemplate.getAgreementStatus(agreementId)
                assert.equal(status && status.lockPayment.state, ConditionState.Fulfilled)
                assert.equal(
                    status && status.transferNFT.state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    status && status.escrowPayment.state,
                    ConditionState.Unfulfilled
                )

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
                const nftBalanceArtistBefore = await nftUpgradeable.balance(
                    artist.getId(),
                    ddo.id
                )
                const nftBalanceCollectorBefore = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.id
                )

                const receipt = await nevermined.agreements.conditions.transferNft(
                    agreementId,
                    ddo,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    numberNFTs,
                    artist
                )
                assert.isTrue(receipt)

                const nftBalanceArtistAfter = await nftUpgradeable.balance(
                    artist.getId(),
                    ddo.id
                )
                const nftBalanceCollectorAfter = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.id
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
                const receipt = await nevermined.agreements.conditions.releaseNftReward(
                    agreementId,
                    ddo,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    collector1.getId(),
                    numberNFTs,
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
                const result = await nftAccessTemplate.createAgreementFromDDO(
                    agreementAccessIdSeed,
                    ddo,
                    new AssetRewards(),
                    collector1,
                    numberNFTs,
                    collector1
                )
                assert.isDefined(result)

                const status = await nftAccessTemplate.getAgreementStatus(
                    agreementAccessId
                )
                assert.equal(status && status.nftHolder.state, ConditionState.Unfulfilled)
                assert.equal(status && status.nftAccess.state, ConditionState.Unfulfilled)
            })

            it('The collector demonstrates it onws the NFT', async function() {
                // See https://github.com/nevermined-io/sdk-js/issues/137
                if (networkName === 'polygon-localnet') {
                    this.skip()
                }

                // TODO: Not sure why we need to wait here but without this the
                // the fulfillment will fail
                await new Promise(r => setTimeout(r, 10000))
                const result = await nevermined.agreements.conditions.holderNft(
                    agreementAccessId,
                    ddo.id,
                    collector1.getId(),
                    numberNFTs
                )
                assert.isTrue(result)
            })

            it(' The artist gives access to the collector to the content', async function() {
                // See https://github.com/nevermined-io/sdk-js/issues/137
                if (networkName === 'polygon-localnet') {
                    this.skip()
                }

                const result = await nevermined.agreements.conditions.grantNftAccess(
                    agreementAccessId,
                    ddo.id,
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
                const result = await nftSalesTemplate.createAgreementFromDDO(
                    agreementId2Seed,
                    ddo,
                    assetRewards2,
                    collector2.getId(),
                    collector2,
                    numberNFTs2,
                    collector1,
                    collector2
                )
                assert.isDefined(result)

                const status = await nftSalesTemplate.getAgreementStatus(agreementId2)
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
                    ddo.id,
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
                const nftBalanceCollector1Before = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.id
                )
                const nftBalanceCollector2Before = await nftUpgradeable.balance(
                    collector2.getId(),
                    ddo.id
                )

                const receipt = await nevermined.agreements.conditions.transferNft(
                    agreementId2,
                    ddo,
                    assetRewards2.getAmounts(),
                    assetRewards2.getReceivers(),
                    numberNFTs2,
                    collector1
                )

                assert.isTrue(receipt)

                const nftBalanceCollector1After = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.id
                )
                const nftBalanceCollector2After = await nftUpgradeable.balance(
                    collector2.getId(),
                    ddo.id
                )

                assert.equal(
                    Number(nftBalanceCollector1After),
                    Number(nftBalanceCollector1Before) - numberNFTs2
                )
                assert.equal(
                    Number(nftBalanceCollector2After),
                    Number(nftBalanceCollector2Before) + numberNFTs
                )
            })

            it('Collector1 and Artist get the payment', async () => {
                const receipt = await nevermined.agreements.conditions.releaseNftReward(
                    agreementId2,
                    ddo,
                    assetRewards2.getAmounts(),
                    assetRewards2.getReceivers(),
                    collector2.getId(),
                    numberNFTs2,
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

    describe('Market flow', () => {
        before(async () => {
            // initial balances
            initialBalances = {
                artist: await token.balanceOf(artist.getId()),
                collector1: await token.balanceOf(collector1.getId()),
                gallery: await token.balanceOf(gallery.getId()),
                escrowPaymentCondition: Number(
                    await token.balanceOf(escrowPaymentCondition.getAddress())
                )
            }
            agreementIdSeed = utils.generateId()
            agreementAccessIdSeed = utils.generateId()
            agreementId2Seed = utils.generateId()

            agreementId = await nevermined.keeper.agreementStoreManager.agreementId(agreementIdSeed, collector1.getId())
            agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(agreementAccessIdSeed, collector1.getId())
            agreementId2 = await nevermined.keeper.agreementStoreManager.agreementId(agreementId2Seed, collector2.getId())

            ddo = await nevermined.assets.createNft(
                getMetadata(),
                artist,
                assetRewards1,
                undefined,
                cappedAmount,
                undefined,
                numberNFTs,
                royalties,
                token.getAddress()
            )
        })

        describe('As an artist I want to register a new artwork', () => {
            it('I want to register a new artwork and give a Marketplace permissions to transfer it', async () => {
                await nftUpgradeable.setApprovalForAll(
                    transferNftCondition.getAddress(),
                    true,
                    artist
                )

                const balance = await nftUpgradeable.balance(artist.getId(), ddo.id)
                assert.equal(balance, 5)

                await nevermined.nfts.setApprovalForAll(gallery.getId(), true, artist)
            })
        })

        describe('As a collector I want to buy some art on a Marketplace', () => {
            it('I am setting an agreement for buying a NFT', async () => {
                const result = await nftSalesTemplate.createAgreementFromDDO(
                    agreementIdSeed,
                    ddo,
                    assetRewards1,
                    collector1.getId(),
                    collector1,
                    numberNFTs,
                    undefined,
                    collector1
                )
                assert.isDefined(result)

                const status = await nftSalesTemplate.getAgreementStatus(agreementId)
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
                    ddo.id,
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

            it('The Market can check the payment and transfer the NFT to the collector', async () => {
                const nftBalanceArtistBefore = await nftUpgradeable.balance(
                    artist.getId(),
                    ddo.id
                )
                const nftBalanceCollectorBefore = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.id
                )

                const receipt = await nevermined.agreements.conditions.transferNftForDelegate(
                    agreementId,
                    ddo,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    numberNFTs,
                    gallery
                )
                assert.isTrue(receipt)

                const nftBalanceArtistAfter = await nftUpgradeable.balance(
                    artist.getId(),
                    ddo.id
                )
                const nftBalanceCollectorAfter = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.id
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

            it('The Market releases the rewards to the artist', async () => {
                const receipt = await nevermined.agreements.conditions.releaseNftReward(
                    agreementId,
                    ddo,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    collector1.getId(),
                    numberNFTs,
                    artist,
                    gallery
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
    })
})
