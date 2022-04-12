import BigNumber from 'bignumber.js'
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
    let agreementId: string
    let agreementAccessId: string
    let agreementId2: string

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberNFTs = 1
    let nftPrice = new BigNumber(20)
    let amounts = [new BigNumber(15), new BigNumber(5)]
    let receivers: string[]
    let assetRewards1: AssetRewards

    // Configuration of Sale in secondary market:
    // Collector1 -> Collector2, the artist get 10% royalties
    const numberNFTs2 = 1
    let nftPrice2 = new BigNumber(100)
    let amounts2 = [new BigNumber(90), new BigNumber(10)]
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

        nftPrice = nftPrice.multipliedBy(scale)
        amounts = amounts.map(v => v.multipliedBy(scale))
        nftPrice2 = nftPrice2.multipliedBy(scale)
        amounts2 = amounts2.map(v => v.multipliedBy(scale))

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

            agreementId = utils.generateId()
            agreementAccessId = utils.generateId()
            agreementId2 = utils.generateId()

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
                conditionIdLockPayment = await lockPaymentCondition.generateId(
                    agreementId,
                    await lockPaymentCondition.hashValues(
                        ddo.id,
                        escrowPaymentCondition.address,
                        token.getAddress(),
                        amounts,
                        receivers
                    )
                )
                conditionIdTransferNFT = await transferNftCondition.generateId(
                    agreementId,
                    await transferNftCondition.hashValues(
                        ddo.id,
                        artist.getId(),
                        collector1.getId(),
                        numberNFTs,
                        conditionIdLockPayment
                    )
                )
                conditionIdEscrow = await escrowPaymentCondition.generateId(
                    agreementId,
                    await escrowPaymentCondition.hashValues(
                        ddo.id,
                        amounts,
                        receivers,
                        escrowPaymentCondition.getAddress(),
                        token.getAddress(),
                        conditionIdLockPayment,
                        conditionIdTransferNFT
                    )
                )

                const result = await nftSalesTemplate.createAgreement(
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
                await collector1.requestTokens(nftPrice.dividedBy(scale))
                const collector1BalanceBefore = await token.balanceOf(collector1.getId())
                assert.isTrue(
                    collector1BalanceBefore.isEqualTo(
                        initialBalances.collector1.plus(nftPrice)
                    )
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
                    conditionIdLockPayment
                )
                assert.equal(state, ConditionState.Fulfilled)

                const collector1BalanceAfter = await token.balanceOf(collector1.getId())
                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.equal(
                    collector1BalanceAfter.minus(initialBalances.collector1).toNumber(),
                    0
                )
                assert.isTrue(
                    escrowPaymentConditionBalance
                        .minus(initialBalances.escrowPaymentCondition).isEqualTo(nftPrice)
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
                    conditionIdLockPayment,
                    artist
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT
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
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )

                await escrowPaymentCondition.fulfill(
                    agreementId,
                    ddo.id,
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

                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers[0])
                const receiver1Balance = await token.balanceOf(receivers[1])
                const collectorBalance = await token.balanceOf(collector1.getId())

                assert.isTrue(
                    receiver0Balance.isEqualTo(initialBalances.artist.plus(amounts[0]))
                )
                assert.isTrue(
                    receiver1Balance.isEqualTo(initialBalances.gallery.plus(amounts[1]))
                )
                assert.isTrue(
                    collectorBalance
                        .minus(initialBalances.collector1)
                        .isEqualTo(new BigNumber(0))
                )
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .minus(AssetRewards.sumAmounts(amounts))
                        .isEqualTo(escrowPaymentConditionBalanceAfter)
                )
            })
        })

        describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
            it('The collector sets up the NFT access agreement', async () => {
                // Collector1: Create NFT access agreement
                conditionIdNFTHolder = await nftHolderCondition.generateId(
                    agreementAccessId,
                    await nftHolderCondition.hashValues(
                        ddo.id,
                        collector1.getId(),
                        numberNFTs
                    )
                )
                conditionIdNFTAccess = await nftAccessCondition.generateId(
                    agreementAccessId,
                    await nftAccessCondition.hashValues(ddo.id, collector1.getId())
                )

                const result = await nftAccessTemplate.createAgreement(
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
                    (await conditionStoreManager.getCondition(conditionIdNFTHolder))
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
                        ddo.id,
                        escrowPaymentCondition.address,
                        token.getAddress(),
                        amounts2,
                        receivers2
                    )
                )
                conditionIdTransferNFT2 = await transferNftCondition.generateId(
                    agreementId2,
                    await transferNftCondition.hashValues(
                        ddo.id,
                        collector1.getId(),
                        collector2.getId(),
                        numberNFTs2,
                        conditionIdLockPayment2
                    )
                )
                conditionIdEscrow2 = await escrowPaymentCondition.generateId(
                    agreementId2,
                    await escrowPaymentCondition.hashValues(
                        ddo.id,
                        amounts2,
                        receivers2,
                        escrowPaymentCondition.getAddress(),
                        token.getAddress(),
                        conditionIdLockPayment2,
                        conditionIdTransferNFT2
                    )
                )

                const result = await nftSalesTemplate.createAgreement(
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
                await collector2.requestTokens(nftPrice2.dividedBy(scale))
                const collector2BalanceBefore = await token.balanceOf(collector2.getId())
                assert.isTrue(
                    collector2BalanceBefore.isEqualTo(
                        initialBalances.collector2.plus(nftPrice2)
                    )
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
                    conditionIdLockPayment2
                )
                assert.equal(state, ConditionState.Fulfilled)

                const collector2BalanceAfter = await token.balanceOf(collector2.getId())
                const escrowPaymentConditionBalance = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.equal(
                    collector2BalanceAfter.minus(initialBalances.collector2).toNumber(),
                    0
                )
                assert.isTrue(
                    escrowPaymentConditionBalance
                        .minus(initialBalances.escrowPaymentCondition)
                        .isEqualTo(nftPrice2)
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
                    conditionIdLockPayment2,
                    collector1
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT2
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
                const escrowPaymentConditionBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )

                await escrowPaymentCondition.fulfill(
                    agreementId2,
                    ddo.id,
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

                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers2[0])
                const receiver1Balance = await token.balanceOf(receivers2[1])
                const collectorBalance = await token.balanceOf(collector2.getId())

                assert.isTrue(
                    receiver0Balance.isEqualTo(
                        initialBalances.collector1.plus(amounts2[0])
                    )
                )
                assert.isTrue(
                    receiver1Balance.isEqualTo(initialBalances.artist.plus(amounts2[1]))
                )
                assert.isTrue(
                    collectorBalance
                        .minus(initialBalances.collector2)
                        .isEqualTo(new BigNumber(0))
                )
                assert.isTrue(
                    escrowPaymentConditionBefore
                        .minus(AssetRewards.sumAmounts(amounts2))
                        .isEqualTo(escrowPaymentConditionBalanceAfter)
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
            await collector1.requestTokens(nftPrice.dividedBy(scale))
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
                assert.isTrue(
                    collector1BalanceBefore.isEqualTo(
                        initialBalances.collector1.plus(nftPrice)
                    )
                )
                const result = await nftSalesTemplate.createAgreementWithPaymentFromDDO(
                    agreementId,
                    ddo,
                    assetRewards1,
                    collector1,
                    numberNFTs,
                    undefined,
                    collector1
                )
                assert.isTrue(result)

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
                assert.equal(
                    collector1BalanceAfter.minus(initialBalances.collector1).toNumber(),
                    0
                )
                assert.isTrue(
                    escrowPaymentConditionBalance
                        .minus(initialBalances.escrowPaymentCondition)
                        .isEqualTo(nftPrice)
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
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receipt = await nevermined.agreements.conditions.releaseNftReward(
                    agreementId,
                    ddo,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    numberNFTs,
                    artist
                )
                assert.isTrue(receipt)

                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers[0])
                const receiver1Balance = await token.balanceOf(receivers[1])
                const collectorBalance = await token.balanceOf(collector1.getId())

                assert.isTrue(
                    receiver0Balance.isEqualTo(initialBalances.artist.plus(amounts[0]))
                )
                assert.isTrue(
                    receiver1Balance.isEqualTo(initialBalances.gallery.plus(amounts[1]))
                )
                assert.isTrue(
                    collectorBalance
                        .minus(initialBalances.collector1)
                        .isEqualTo(new BigNumber(0))
                )
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .minus(assetRewards1.getTotalPrice())
                        .isEqualTo(escrowPaymentConditionBalanceAfter)
                )
            })
        })

        describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
            it('The collector sets up the NFT access agreement', async () => {
                // Collector1: Create NFT access agreement
                const result = await nftAccessTemplate.createAgreementFromDDO(
                    agreementAccessId,
                    ddo,
                    new AssetRewards(),
                    collector1,
                    numberNFTs,
                    collector1
                )
                assert.isTrue(result)

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
                    agreementId2,
                    ddo,
                    assetRewards2,
                    collector2,
                    numberNFTs2,
                    collector1
                )
                assert.isTrue(result)

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
                await collector2.requestTokens(nftPrice2.dividedBy(scale))

                const collector2BalanceBefore = await token.balanceOf(collector2.getId())
                assert.isTrue(
                    collector2BalanceBefore.isEqualTo(
                        initialBalances.collector2.plus(nftPrice2)
                    )
                )

                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
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
                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.isTrue(
                    collector2BalanceAfter
                        .minus(initialBalances.collector2)
                        .isEqualTo(new BigNumber(0))
                )
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .plus(assetRewards2.getTotalPrice())
                        .isEqualTo(escrowPaymentConditionBalanceAfter)
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
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receipt = await nevermined.agreements.conditions.releaseNftReward(
                    agreementId2,
                    ddo,
                    assetRewards2.getAmounts(),
                    assetRewards2.getReceivers(),
                    numberNFTs2,
                    collector1
                )
                assert.isTrue(receipt)

                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers2[0])
                const receiver1Balance = await token.balanceOf(receivers2[1])
                const collectorBalance = await token.balanceOf(collector2.getId())

                assert.isTrue(
                    receiver0Balance.isEqualTo(
                        initialBalances.collector1.plus(amounts2[0])
                    )
                )
                assert.isTrue(
                    receiver1Balance.isEqualTo(initialBalances.artist.plus(amounts2[1]))
                )
                assert.isTrue(
                    collectorBalance
                        .minus(initialBalances.collector2)
                        .isEqualTo(new BigNumber(0))
                )
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .minus(assetRewards2.getTotalPrice())
                        .isEqualTo(escrowPaymentConditionBalanceAfter)
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
            agreementId = utils.generateId()
            agreementAccessId = utils.generateId()
            agreementId2 = utils.generateId()

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
                    agreementId,
                    ddo,
                    assetRewards1,
                    collector1,
                    numberNFTs
                )
                assert.isTrue(result)

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
                await collector1.requestTokens(nftPrice.dividedBy(scale))

                const collector1BalanceBefore = await token.balanceOf(collector1.getId())
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.isTrue(
                    collector1BalanceBefore.isEqualTo(
                        initialBalances.collector1.plus(nftPrice)
                    )
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
                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                assert.equal(
                    collector1BalanceAfter.minus(initialBalances.collector1).toNumber(),
                    0
                )
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .plus(assetRewards1.getTotalPrice())
                        .isEqualTo(escrowPaymentConditionBalanceAfter)
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
                const escrowPaymentConditionBalanceBefore = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receipt = await nevermined.agreements.conditions.releaseNftReward(
                    agreementId,
                    ddo,
                    assetRewards1.getAmounts(),
                    assetRewards1.getReceivers(),
                    numberNFTs,
                    artist,
                    gallery
                )
                assert.isTrue(receipt)

                const escrowPaymentConditionBalanceAfter = await token.balanceOf(
                    escrowPaymentCondition.getAddress()
                )
                const receiver0Balance = await token.balanceOf(receivers[0])
                const receiver1Balance = await token.balanceOf(receivers[1])
                const collectorBalance = await token.balanceOf(collector1.getId())

                assert.isTrue(
                    receiver0Balance.isEqualTo(initialBalances.artist.plus(amounts[0]))
                )
                assert.isTrue(
                    receiver1Balance.isEqualTo(initialBalances.gallery.plus(amounts[1]))
                )
                assert.isTrue(
                    collectorBalance
                        .minus(initialBalances.collector1)
                        .isEqualTo(new BigNumber(0))
                )
                assert.isTrue(
                    escrowPaymentConditionBalanceBefore
                        .minus(assetRewards1.getTotalPrice())
                        .isEqualTo(escrowPaymentConditionBalanceAfter)
                )
            })
        })
    })
})
