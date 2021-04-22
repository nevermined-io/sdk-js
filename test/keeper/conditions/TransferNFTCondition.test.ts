import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Account, ConditionState, Nevermined, utils } from '../../../src'
import {
    EscrowPaymentCondition,
    LockPaymentCondition,
    TransferNFTCondition
} from '../../../src/keeper/contracts/conditions'
import DIDRegistry from '../../../src/keeper/contracts/DIDRegistry'
import { ConditionStoreManager } from '../../../src/keeper/contracts/managers'
import Token from '../../../src/keeper/contracts/Token'
import { didZeroX, zeroX } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

chai.use(chaiAsPromised)

describe('TransferNFTCondition', () => {
    let nevermined: Nevermined
    let transferNftCondition: TransferNFTCondition
    let lockPaymentCondition: LockPaymentCondition
    let escrowPaymentCondition: EscrowPaymentCondition
    let conditionStoreManager: ConditionStoreManager
    let didRegistry: DIDRegistry
    let token: Token
    let nftReceiver: Account
    let owner: Account
    let other: Account

    let agreementId: string
    let checksum: string
    let did: string
    let receivers: string[]
    const activityId = utils.generateId()
    const value = 'https://nevermined.io/did/nevermined/test-attr-example.txt'
    const nftAmount = 2
    const amounts = [10]

    before(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        ;({
            transferNftCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = nevermined.keeper.conditions)
        ;({ conditionStoreManager, didRegistry, token } = nevermined.keeper)
        ;[owner, nftReceiver, other] = await nevermined.accounts.list()
        receivers = [nftReceiver.getId()]
    })

    beforeEach(async () => {
        agreementId = utils.generateId()
        checksum = utils.generateId()
        did = `did:nv:${utils.generateId()}`
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const conditionId = utils.generateId()
            const hash = await transferNftCondition.hashValues(
                did,
                nftReceiver.getId(),
                nftAmount,
                zeroX(conditionId)
            )

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('#generateId()', () => {
        it('should generate an ID', async () => {
            const conditionId = utils.generateId()
            const hash = await transferNftCondition.hashValues(
                did,
                nftReceiver.getId(),
                nftAmount,
                zeroX(conditionId)
            )
            const id = await transferNftCondition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('fulfill correctly', () => {
        it('should fulfill if condition exist', async () => {
            const hashValuesPayment = await lockPaymentCondition.hashValues(
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                amounts,
                receivers
            )
            const conditionIdPayment = await lockPaymentCondition.generateId(
                agreementId,
                hashValuesPayment
            )

            await conditionStoreManager.createCondition(
                conditionIdPayment,
                lockPaymentCondition.address,
                owner.getId()
            )

            await didRegistry.registerMintableDID(
                did,
                checksum,
                [],
                value,
                activityId,
                '',
                nftAmount,
                0,
                owner.getId()
            )
            await didRegistry.mint(did, nftAmount, owner.getId())

            await nftReceiver.requestTokens(10)
            await nevermined.keeper.token.approve(
                lockPaymentCondition.getAddress(),
                10,
                nftReceiver.getId()
            )

            await lockPaymentCondition.fulfill(
                agreementId,
                did,
                escrowPaymentCondition.address,
                token.getAddress(),
                amounts,
                receivers,
                nftReceiver.getId()
            )

            let { state } = await conditionStoreManager.getCondition(conditionIdPayment)
            assert.equal(state, ConditionState.Fulfilled)

            const hashValues = await transferNftCondition.hashValues(
                did,
                nftReceiver.getId(),
                nftAmount,
                conditionIdPayment
            )
            const conditionId = await transferNftCondition.generateId(
                agreementId,
                hashValues
            )

            await conditionStoreManager.createCondition(
                conditionId,
                transferNftCondition.address,
                owner.getId()
            )

            const result = await transferNftCondition.fulfill(
                agreementId,
                did,
                nftReceiver.getId(),
                nftAmount,
                conditionIdPayment
            )
            ;({ state } = await conditionStoreManager.getCondition(conditionId))
            assert.equal(state, ConditionState.Fulfilled)

            const {
                _agreementId,
                _did,
                _receiver,
                _conditionId,
                _amount
            } = result.events.Fulfilled.returnValues

            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_did, didZeroX(did))
            assert.equal(_conditionId, conditionId)
            assert.equal(_receiver, nftReceiver.getId())
            assert.equal(Number(_amount), nftAmount)
        })
    })

    describe('trying to fulfill invalid conditions', () => {
        it('should not fulfill if condition does not exist or account is invalid', async () => {
            const hashValuesPayment = await lockPaymentCondition.hashValues(
                did,
                lockPaymentCondition.address,
                token.getAddress(),
                amounts,
                receivers
            )
            const conditionIdPayment = await lockPaymentCondition.generateId(
                agreementId,
                hashValuesPayment
            )

            await conditionStoreManager.createCondition(
                conditionIdPayment,
                lockPaymentCondition.address,
                owner.getId()
            )

            await didRegistry.registerMintableDID(
                did,
                checksum,
                [],
                value,
                activityId,
                '',
                nftAmount,
                0,
                owner.getId()
            )
            await didRegistry.mint(did, nftAmount, owner.getId())

            await nftReceiver.requestTokens(10)
            await nevermined.keeper.token.approve(
                lockPaymentCondition.getAddress(),
                10,
                nftReceiver.getId()
            )

            await lockPaymentCondition.fulfill(
                agreementId,
                did,
                lockPaymentCondition.address,
                token.getAddress(),
                amounts,
                receivers,
                nftReceiver.getId()
            )
            const { state } = await conditionStoreManager.getCondition(conditionIdPayment)
            assert.equal(state, ConditionState.Fulfilled)

            const hashValues = await transferNftCondition.hashValues(
                did,
                nftReceiver.getId(),
                nftAmount,
                conditionIdPayment
            )
            const conditionId = await transferNftCondition.generateId(
                agreementId,
                hashValues
            )

            await conditionStoreManager.createCondition(
                conditionId,
                transferNftCondition.address,
                owner.getId()
            )

            // Invalid user executing the fulfill
            await assert.isRejected(
                transferNftCondition.fulfill(
                    agreementId,
                    did,
                    nftReceiver.getId(),
                    nftAmount,
                    conditionIdPayment,
                    other.getId()
                )
            )

            // Invalid reward address
            await assert.isRejected(
                transferNftCondition.fulfill(
                    agreementId,
                    did,
                    other.getId(),
                    nftAmount,
                    conditionIdPayment
                )
            )

            // Invalid conditionId
            const invalidConditionId = zeroX(utils.generateId())
            await assert.isRejected(
                transferNftCondition.fulfill(
                    agreementId,
                    did,
                    nftReceiver.getId(),
                    nftAmount,
                    invalidConditionId
                )
            )

            // Invalid agreementID
            const invalidAgreementId = zeroX(utils.generateId())
            await assert.isRejected(
                transferNftCondition.fulfill(
                    invalidAgreementId,
                    did,
                    nftReceiver.getId(),
                    nftAmount,
                    conditionIdPayment
                )
            )
        })
    })
})
