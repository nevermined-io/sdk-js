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
import DIDRegistry from '../../src/keeper/contracts/DIDRegistry'
import { ConditionStoreManager } from '../../src/keeper/contracts/managers'
import { NFTAccessTemplate, NFTSalesTemplate } from '../../src/keeper/contracts/templates'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getMetadata } from '../utils'
import Web3Provider from '../../src/keeper/Web3Provider'
import { ZeroAddress } from '../../src/utils'
import web3Utils from 'web3-utils'

describe('NFTTemplates With Ether E2E', async () => {
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account

    let nevermined: Nevermined
    let didRegistry: DIDRegistry
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
    let ddo: DDO

    const royalties = 10 // 10% of royalties in the secondary market
    const cappedAmount = 5

    let agreementId: string
    let agreementAccessId: string
    let checksum: string
    let activityId: string
    const url =
        'https://raw.githubusercontent.com/nevermined-io/assets/main/images/logo/banner_logo.png'

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberNFTs = 1
    let nftPrice = 0.2
    let amounts = [0.15, 0.05]

    let receivers: string[]
    let assetRewards: AssetRewards

    let initialBalances: any

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[, artist, collector1, collector2, gallery] = await nevermined.accounts.list()

        receivers = [artist.getId(), gallery.getId()]

        // components
        ;({ didRegistry, conditionStoreManager } = nevermined.keeper)

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
        amounts = amounts.map(v => Number(web3Utils.toWei(String(v), 'ether')))

        // ether
        assetRewards = new AssetRewards(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]]
            ])
        )
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

            agreementId = utils.generateId()
            agreementAccessId = utils.generateId()
            checksum = utils.generateId()
            activityId = utils.generateId()

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
                await didRegistry.registerMintableDID(
                    ddo.shortId(),
                    checksum,
                    [],
                    url,
                    activityId,
                    '',
                    cappedAmount,
                    royalties,
                    artist.getId()
                )

                await didRegistry.mint(ddo.shortId(), 5, artist.getId())
                await didRegistry.setApprovalForAll(
                    transferNftCondition.getAddress(),
                    true,
                    artist.getId()
                )

                const balance = await didRegistry.balance(artist.getId(), ddo.shortId())
                assert.equal(balance, 5)
            })
        })

        describe('As a collector I want to buy some art', async () => {
            it('I am setting an agreement for buying a NFT', async () => {
                conditionIdLockPayment = await lockPaymentCondition.generateId(
                    agreementId,
                    await lockPaymentCondition.hashValues(
                        ddo.shortId(),
                        escrowPaymentCondition.address,
                        ZeroAddress,
                        assetRewards.getAmounts(),
                        assetRewards.getReceivers()
                    )
                )

                conditionIdTransferNFT = await transferNftCondition.generateId(
                    agreementId,
                    await transferNftCondition.hashValues(
                        ddo.shortId(),
                        collector1.getId(),
                        numberNFTs,
                        conditionIdLockPayment
                    )
                )

                conditionIdEscrow = await escrowPaymentCondition.generateId(
                    agreementId,
                    await escrowPaymentCondition.hashValues(
                        ddo.shortId(),
                        assetRewards.getAmounts(),
                        assetRewards.getReceivers(),
                        escrowPaymentCondition.getAddress(),
                        ZeroAddress,
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
                await lockPaymentCondition.fulfill(
                    agreementId,
                    ddo.shortId(),
                    escrowPaymentCondition.getAddress(),
                    ZeroAddress,
                    assetRewards.getAmounts(),
                    assetRewards.getReceivers(),
                    collector1,
                    String(assetRewards.getTotalPrice() - 1)
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdLockPayment
                )
                assert.equal(state, ConditionState.Fulfilled)
            })

            it('The artist can check the payment and transfer the NFT to the collector', async () => {
                const nftBalanceArtistBefore = await didRegistry.balance(
                    artist.getId(),
                    ddo.shortId()
                )
                const nftBalanceCollectorBefore = await didRegistry.balance(
                    collector1.getId(),
                    ddo.shortId()
                )

                await transferNftCondition.fulfill(
                    agreementId,
                    ddo.shortId(),
                    collector1.getId(),
                    numberNFTs,
                    conditionIdLockPayment,
                    artist
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdTransferNFT
                )
                assert.equal(state, ConditionState.Fulfilled)

                const nftBalanceArtistAfter = await didRegistry.balance(
                    artist.getId(),
                    ddo.shortId()
                )
                const nftBalanceCollectorAfter = await didRegistry.balance(
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

            it('the artist asks and receives the payment', async () => {
                await escrowPaymentCondition.fulfill(
                    agreementId,
                    ddo.shortId(),
                    assetRewards.getAmounts(),
                    assetRewards.getReceivers(),
                    escrowPaymentCondition.getAddress(),
                    ZeroAddress,
                    conditionIdLockPayment,
                    conditionIdTransferNFT,
                    artist
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdEscrow
                )
                assert.equal(state, ConditionState.Fulfilled)

                const escrowPaymentConditionBalance = Number(
                    await Web3Provider.getWeb3(config).eth.getBalance(
                        escrowPaymentCondition.getAddress()
                    )
                )
                const receiver0Balance = await new Account(receivers[0]).getEtherBalance()
                const receiver1Balance = await new Account(receivers[1]).getEtherBalance()

                assert.equal(receiver0Balance, initialBalances.artist + amounts[0])
                assert.equal(receiver1Balance, initialBalances.gallery + amounts[1])
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
                conditionIdNFTHolder = await nftHolderCondition.generateId(
                    agreementAccessId,
                    await nftHolderCondition.hashValues(
                        ddo.shortId(),
                        collector1.getId(),
                        numberNFTs
                    )
                )
                conditionIdNFTAccess = await nftAccessCondition.generateId(
                    agreementAccessId,
                    await nftAccessCondition.hashValues(ddo.shortId(), collector1.getId())
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

            it('The collector demonstrates it onws the NFT', async () => {
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
    })
})
