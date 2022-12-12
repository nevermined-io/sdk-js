import { assert } from 'chai'
import { Account, DDO, Nevermined, utils } from '../../src'
import { decodeJwt } from 'jose'
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
import { Nft1155Contract } from '../../src/keeper/contracts/Nft1155Contract'
import BigNumber from '../../src/utils/BigNumber'
import {
    getRoyaltyAttributes,
    RoyaltyAttributes,
    RoyaltyKind
} from '../../src/nevermined/api/AssetsApi'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import { NFTAttributes } from '../../src/models/NFTAttributes'

describe('NFTTemplates With Ether E2E', async () => {
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account
    let sender: Account
    let governor: Account

    let nevermined: Nevermined
    let conditionStoreManager: ConditionStoreManager
    let nftUpgradeable: Nft1155Contract
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
    const cappedAmount = BigNumber.from(5)

    let agreementId: string
    let agreementAccessId: string
    let agreementIdSeed: string
    let agreementAccessIdSeed: string

    const networkFee = 200000
    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberNFTs = BigNumber.from(1)
    const amounts = [
        BigNumber.parseEther('0.3'),
        BigNumber.parseEther('0.1'),
        BigNumber.parseEther('0.1')
    ]

    let receivers: string[]
    let assetRewards: AssetRewards
    let royaltyAttributes: RoyaltyAttributes

    let initialBalances: any

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[sender, artist, collector1, collector2, gallery, , , , , governor] =
            await nevermined.accounts.list()

        console.debug(`ACCOUNT GOVERNOR = ${governor.getId()}`)

        await nevermined.keeper.nvmConfig.setNetworkFees(
            networkFee,
            governor.getId(),
            governor
        )
        const feeReceiver = await nevermined.keeper.nvmConfig.getFeeReceiver()
        console.debug(`FEE RECEIVER = ${feeReceiver}`)

        const fee = await nevermined.keeper.nvmConfig.getNetworkFee()
        console.debug(`NETWORK FEE = ${fee}`)

        receivers = [artist.getId(), gallery.getId(), governor.getId()]

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

        // ether
        assetRewards = new AssetRewards(
            new Map([
                [receivers[0], amounts[0]],
                [receivers[1], amounts[1]],
                [receivers[2], amounts[2]]
            ])
        ).setTokenAddress(ZeroAddress)
    })

    after(async () => {
        await nevermined.keeper.nvmConfig.setNetworkFees(0, ZeroAddress, governor)
        console.debug(` --- Resetting Network Fees after the test`)
        const feeReceiver = await nevermined.keeper.nvmConfig.getFeeReceiver()
        console.debug(`FEE RECEIVER = ${feeReceiver}`)

        const fee = await nevermined.keeper.nvmConfig.getNetworkFee()
        console.debug(`NETWORK FEE = ${fee}`)
    })

    describe('Full flow', async () => {
        before(async () => {
            // initial balances
            initialBalances = {
                artist: await artist.getEtherBalance(),
                collector1: await collector1.getEtherBalance(),
                collector2: await collector2.getEtherBalance(),
                gallery: await gallery.getEtherBalance(),
                governor: await governor.getEtherBalance(),
                escrowPaymentCondition: await Web3Provider.getWeb3(config).getBalance(
                    escrowPaymentCondition.getAddress()
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

            const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
                artist
            )

            await nevermined.services.marketplace.login(clientAssertion)

            const payload = decodeJwt(config.marketplaceAuthToken)
            const metadata = getMetadata()
            metadata.userId = payload.sub
            royaltyAttributes = getRoyaltyAttributes(
                nevermined,
                RoyaltyKind.Standard,
                royalties
            )

            const assetAttributes = AssetAttributes.getInstance({
                metadata,
                price: assetRewards,
                serviceTypes: ['nft-sales', 'nft-access']
            })
            const nftAttributes = NFTAttributes.getNFT1155Instance({                
                nftContractAddress: nftUpgradeable.address,
                cap: cappedAmount,
                amount: numberNFTs,
                royaltyAttributes
            })            
            ddo = await nevermined.nfts1155.create(
                assetAttributes,
                nftAttributes,
                artist
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
                assert.deepEqual(balance, BigNumber.from(5))
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
                    [collector1.getId()],
                    sender
                )

                assert.equal(result.status, 1)
                assert.isTrue(result.events.some(e => e.event === 'AgreementCreated'))

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
                    Number(nftBalanceArtistBefore) - Number(numberNFTs)
                )
                assert.equal(
                    Number(nftBalanceCollectorAfter),
                    Number(nftBalanceCollectorBefore) + Number(numberNFTs)
                )
            })

            it('the artist asks and receives the payment', async function () {
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

                const escrowPaymentConditionBalance = await Web3Provider.getWeb3(
                    config
                ).getBalance(escrowPaymentCondition.getAddress())

                const receiver0Balance = await new Account(receivers[0]).getEtherBalance()
                const receiver1Balance = await new Account(receivers[1]).getEtherBalance()
                const receiver2Balance = await new Account(receivers[2]).getEtherBalance()

                // for this assert we use a delta to account for the transaction fees
                // of all the transactions from the artist
                const delta = BigNumber.from(10).pow(16)
                assert.isTrue(
                    receiver0Balance.gte(
                        initialBalances.artist.add(amounts[0]).sub(delta)
                    )
                )

                assert.isTrue(
                    receiver1Balance.eq(initialBalances.gallery.add(amounts[1]))
                )
                assert.isTrue(
                    receiver2Balance.eq(initialBalances.governor.add(amounts[2]))
                )
                assert.isTrue(
                    escrowPaymentConditionBalance
                        .sub(initialBalances.escrowPaymentCondition)
                        .isZero()
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
                    [collector1.getId()]
                )
                assert.equal(result.status, 1)
                assert.isTrue(result.events.some(e => e.event === 'AgreementCreated'))

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

            it('The collector demonstrates it onws the NFT', async function () {
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

            it(' The artist gives access to the collector to the content', async function () {
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
