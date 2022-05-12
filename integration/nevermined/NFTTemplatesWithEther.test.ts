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
import { ConditionStoreManager } from '../../src/keeper/contracts/managers'
import { NFTAccessTemplate, NFTSalesTemplate } from '../../src/keeper/contracts/templates'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'
import Web3Provider from '../../src/keeper/Web3Provider'
import { ZeroAddress } from '../../src/utils'
import web3Utils from 'web3-utils'
import { NFTUpgradeable } from '../../src/keeper/contracts/conditions/NFTs/NFTUpgradable'
import BigNumber from 'bignumber.js'

describe('NFTTemplates With Ether E2E', async () => {
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account
    let sender: Account

    let nevermined: Nevermined
    let conditionStoreManager: ConditionStoreManager
    let nftUpgradeable: NFTUpgradeable
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
    let ddo: DDO

    const royalties = 10 // 10% of royalties in the secondary market
    const cappedAmount = 5

    let agreementId: string
    let agreementAccessId: string
    let agreementIdSeed: string
    let agreementAccessIdSeed: string

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberNFTs = 1
    let nftPrice = 0.2
    let amounts = [new BigNumber(0.15), new BigNumber(0.05)]

    let receivers: string[]
    let assetRewards: AssetRewards

    let initialBalances: any
    let networkName: string

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[
            sender,
            artist,
            collector1,
            collector2,
            gallery
        ] = await nevermined.accounts.list()

        receivers = [artist.getId(), gallery.getId()]

        // components
        ;({ conditionStoreManager, nftUpgradeable } = nevermined.keeper)

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

        // eth
        nftPrice = Number(web3Utils.toWei(String(nftPrice), 'ether'))
        amounts = amounts.map(v => new BigNumber(web3Utils.toWei(String(v), 'ether')))

        // ether
        assetRewards = new AssetRewards(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        )

        networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
    })

    describe('Full flow', async () => {
        before(async () => {
            // initial balances
            initialBalances = {
                artist: await artist.getEtherBalance(),
                collector1: await collector1.getEtherBalance(),
                collector2: await collector2.getEtherBalance(),
                gallery: await gallery.getEtherBalance(),
                escrowPaymentCondition: Number(
                    await Web3Provider.getWeb3(config).eth.getBalance(
                        escrowPaymentCondition.getAddress()
                    )
                )
            }

            agreementIdSeed = utils.generateId()
            agreementAccessIdSeed = utils.generateId()

            agreementId = await nevermined.keeper.agreementStoreManager.agreementId(
                agreementIdSeed,
                sender.getId()
            )
            agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(
                agreementAccessIdSeed,
                sender.getId()
            )

            ddo = await nevermined.assets.createNft(
                getMetadata(),
                artist,
                assetRewards,
                undefined,
                cappedAmount,
                undefined,
                numberNFTs,
                royalties,
                ZeroAddress
            )
        })

        describe('As an artist I want to register a new artwork', async () => {
            it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
                await nftUpgradeable.setApprovalForAll(
                    transferNftCondition.getAddress(),
                    true,
                    artist
                )

                const balance = await nftUpgradeable.balance(
                    artist.getId(),
                    ddo.shortId()
                )
                assert.equal(balance, 5)
            })
        })

        describe('As a collector I want to buy some art', async () => {
            it('I am setting an agreement for buying a NFT', async () => {
                conditionIdLockPayment = await lockPaymentCondition.generateIdWithSeed(
                    agreementId,
                    await lockPaymentCondition.hashValues(
                        ddo.shortId(),
                        escrowPaymentCondition.address,
                        ZeroAddress,
                        assetRewards.getAmounts(),
                        assetRewards.getReceivers()
                    )
                )

                conditionIdTransferNFT = await transferNftCondition.generateIdWithSeed(
                    agreementId,
                    await transferNftCondition.hashValues(
                        ddo.shortId(),
                        artist.getId(),
                        collector1.getId(),
                        numberNFTs,
                        conditionIdLockPayment[1]
                    )
                )

                conditionIdEscrow = await escrowPaymentCondition.generateIdWithSeed(
                    agreementId,
                    await escrowPaymentCondition.hashValues(
                        ddo.shortId(),
                        assetRewards.getAmounts(),
                        assetRewards.getReceivers(),
                        collector1.getId(),
                        escrowPaymentCondition.getAddress(),
                        ZeroAddress,
                        conditionIdLockPayment[1],
                        conditionIdTransferNFT[1]
                    )
                )

                const result = await nftSalesTemplate.createAgreement(
                    agreementIdSeed,
                    ddo.shortId(),
                    [
                        conditionIdLockPayment[0],
                        conditionIdTransferNFT[0],
                        conditionIdEscrow[0]
                    ],
                    [0, 0, 0],
                    [0, 0, 0],
                    collector1.getId(),
                    sender
                )

                assert.isTrue(result.status)
                assert.nestedProperty(result, 'events.AgreementCreated')

                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdLockPayment[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdEscrow[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
                assert.equal(
                    (await conditionStoreManager.getCondition(conditionIdTransferNFT[1]))
                        .state,
                    ConditionState.Unfulfilled
                )
            })

            it('I am locking the payment', async () => {
                await lockPaymentCondition.fulfill(
                    agreementId,
                    ddo.shortId(),
                    escrowPaymentCondition.getAddress(),
                    ZeroAddress,
                    assetRewards.getAmounts(),
                    assetRewards.getReceivers(),
                    collector1,
                    { value: assetRewards.getTotalPrice().toString() }
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdLockPayment[1]
                )
                assert.equal(state, ConditionState.Fulfilled)
            })

            it('The artist can check the payment and transfer the NFT to the collector', async () => {
                const nftBalanceArtistBefore = await nftUpgradeable.balance(
                    artist.getId(),
                    ddo.shortId()
                )
                const nftBalanceCollectorBefore = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.shortId()
                )

                await transferNftCondition.fulfill(
                    agreementId,
                    ddo.shortId(),
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
                    ddo.shortId()
                )
                const nftBalanceCollectorAfter = await nftUpgradeable.balance(
                    collector1.getId(),
                    ddo.shortId()
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

            it('the artist asks and receives the payment', async function() {
                // See https://github.com/nevermined-io/sdk-js/issues/137
                if (networkName === 'polygon-localnet') {
                    this.skip()
                }

                await escrowPaymentCondition.fulfill(
                    agreementId,
                    ddo.shortId(),
                    assetRewards.getAmounts(),
                    assetRewards.getReceivers(),
                    collector1.getId(),
                    escrowPaymentCondition.getAddress(),
                    ZeroAddress,
                    conditionIdLockPayment[1],
                    conditionIdTransferNFT[1],
                    artist
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdEscrow[1]
                )
                assert.equal(state, ConditionState.Fulfilled)

                const escrowPaymentConditionBalance = Number(
                    await Web3Provider.getWeb3(config).eth.getBalance(
                        escrowPaymentCondition.getAddress()
                    )
                )
                const receiver0Balance = await new Account(receivers[0]).getEtherBalance()
                const receiver1Balance = await new Account(receivers[1]).getEtherBalance()

                assert.closeTo(
                    receiver0Balance.toNumber(),
                    initialBalances.artist + amounts[0],
                    10 ** 16
                )
                assert.closeTo(
                    receiver1Balance.toNumber(),
                    initialBalances.gallery + amounts[1],
                    10 ** 16
                )
                assert.equal(
                    escrowPaymentConditionBalance -
                        initialBalances.escrowPaymentCondition,
                    0
                )
            })
        })

        describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', async () => {
            it('The collector sets up the NFT access agreement', async () => {
                // Collector1: Create NFT access agreement
                conditionIdNFTHolder = await nftHolderCondition.generateIdWithSeed(
                    agreementAccessId,
                    await nftHolderCondition.hashValues(
                        ddo.shortId(),
                        collector1.getId(),
                        numberNFTs
                    )
                )
                conditionIdNFTAccess = await nftAccessCondition.generateIdWithSeed(
                    agreementAccessId,
                    await nftAccessCondition.hashValues(ddo.shortId(), collector1.getId())
                )

                const result = await nftAccessTemplate.createAgreement(
                    agreementAccessIdSeed,
                    ddo.shortId(),
                    [conditionIdNFTHolder[0], conditionIdNFTAccess[0]],
                    [0, 0],
                    [0, 0],
                    collector1.getId()
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
                    ddo.shortId(),
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
                    ddo.shortId(),
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
    })
})
