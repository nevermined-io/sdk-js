import { assert } from 'chai'
import { Account, Nevermined, utils } from '../../src'
import {
    ConditionState,
    EscrowPaymentCondition,
    LockPaymentCondition,
    TransferNFTCondition
} from '../../src/keeper/contracts/conditions'
import DIDRegistry from '../../src/keeper/contracts/DIDRegistry'
import { ConditionStoreManager } from '../../src/keeper/contracts/managers'
import { NFTSalesTemplate } from '../../src/keeper/contracts/templates'
import Token from '../../src/keeper/contracts/Token'
import { config } from '../config'

describe('NFTTemplates E2E', () => {
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account
    let deployer: Account
    let owner: Account

    let token: Token
    let didRegistry: DIDRegistry
    let conditionStoreManager: ConditionStoreManager
    let transferNftCondition: TransferNFTCondition
    let lockPaymentCondition: LockPaymentCondition
    let escrowPaymentCondition: EscrowPaymentCondition
    let nftSalesTemplate: NFTSalesTemplate

    let conditionIdLockPayment: string
    let conditionIdTransferNFT: string
    let conditionIdEscrow: string

    const royalties = 10 // 10% of royalties in the secondary market
    const cappedAmount = 5
    const did = utils.generateId()
    const agreementId = utils.generateId()
    const agreementAccessId = utils.generateId()
    const agreementId2 = utils.generateId()
    const checksum = utils.generateId()
    const activityId = utils.generateId()
    const url =
        'https://raw.githubusercontent.com/nevermined-io/assets/main/images/logo/banner_logo.png'

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberNFTs = 1
    const nftPrice = 20
    const amounts = [15, 5]
    let receivers: string[]

    // Configuration of Sale in secondary market:
    // Collector1 -> Collector2, the artist get 10% royalties
    const numberNFTs2 = 1
    const nftPrice2 = 100
    const amounts2 = [90, 10]
    let receivers2: string[]

    before(async () => {
        const nevermined = await Nevermined.getInstance(config)
        ;[
            artist,
            collector1,
            collector2,
            gallery,
            deployer,
            owner
        ] = await nevermined.accounts.list()

        receivers = [artist.getId(), gallery.getId()]
        receivers2 = [collector1.getId(), artist.getId()]

        // components
        ;({ didRegistry, conditionStoreManager, token } = nevermined.keeper)

        // conditions
        ;({
            transferNftCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = nevermined.keeper.conditions)

        // templates
        ;({ nftSalesTemplate } = nevermined.keeper.templates)
    })

    describe('Full flow', () => {
        describe('As an artist I want to register a new artwork', () => {
            it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
                await didRegistry.registerMintableDID(
                    did,
                    checksum,
                    [],
                    url,
                    activityId,
                    '',
                    cappedAmount,
                    royalties,
                    artist.getId()
                )

                await didRegistry.mint(did, 5, artist.getId())
                await didRegistry.setApprovalForAll(
                    transferNftCondition.getAddress(),
                    true,
                    artist.getId()
                )

                const balance = await didRegistry.balance(artist.getId(), did)
                assert.equal(balance, 5)
            })
        })

        describe('As a collector I want to buy some art', () => {
            it('I am setting an agreement for buying a NFT', async () => {
                conditionIdLockPayment = await lockPaymentCondition.generateId(
                    agreementId,
                    await lockPaymentCondition.hashValues(
                        did,
                        escrowPaymentCondition.address,
                        amounts,
                        receivers
                    )
                )
                conditionIdTransferNFT = await transferNftCondition.generateId(
                    agreementId,
                    await transferNftCondition.hashValues(
                        did,
                        collector1.getId(),
                        numberNFTs,
                        conditionIdLockPayment
                    )
                )
                conditionIdEscrow = await escrowPaymentCondition.generateId(
                    agreementId,
                    await escrowPaymentCondition.hashValues(
                        did,
                        amounts,
                        receivers,
                        escrowPaymentCondition.getAddress(),
                        conditionIdLockPayment,
                        conditionIdTransferNFT
                    )
                )

                const result = await nftSalesTemplate.createAgreement(
                    agreementId,
                    did,
                    [conditionIdLockPayment, conditionIdTransferNFT, conditionIdEscrow],
                    [0, 0, 0],
                    [0, 0, 0],
                    collector1.getId()
                )
                assert.isTrue(result.status)
                assert.nestedProperty(result, 'events.AgreementCreated')
            })

            it('I am locking the payment', async () => {
                const initialCollector1Balance = await collector1.getNeverminedBalance()

                await collector1.requestTokens(nftPrice)
                await token.approve(
                    lockPaymentCondition.getAddress(),
                    nftPrice,
                    collector1.getId()
                )
                await lockPaymentCondition.fulfill(
                    agreementId,
                    did,
                    escrowPaymentCondition.getAddress(),
                    amounts,
                    receivers,
                    collector1.getId()
                )

                const { state } = await conditionStoreManager.getCondition(
                    conditionIdLockPayment
                )
                assert.equal(state, ConditionState.Fulfilled)

                const collector1Balance = await collector1.getNeverminedBalance()
                assert.equal(collector1Balance - initialCollector1Balance, 0)
            })
        })
    })

    describe('Short flow', () => {
        it('true', async () => {
            assert.isTrue(true)
        })
    })
})
