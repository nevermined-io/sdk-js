import { assert } from 'chai'
import { config } from '../config'
import { Nevermined, utils, Account, Keeper, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import Token from '../../src/keeper/contracts/Token'
import { getMetadata } from '../utils'
import { EscrowComputeExecutionTemplate } from '../../src/keeper/contracts/templates'
import {
    ComputeExecutionCondition,
    EscrowPaymentCondition,
    LockPaymentCondition
} from '../../src/keeper/contracts/conditions'

describe('Register Escrow Compute Execution Template', () => {
    let nevermined: Nevermined
    let keeper: Keeper

    let escrowComputeExecutionTemplate: EscrowComputeExecutionTemplate

    const url = 'https://example.com/did/nevermined/test-attr-example.txt'
    const checksum = 'b'.repeat(32)

    const totalAmount = 12
    const amounts = [10, 2]

    let templateManagerOwner: Account
    let publisher: Account
    let consumer: Account
    let provider: Account
    let receivers: string[]

    let computeExecutionCondition: ComputeExecutionCondition
    let lockPaymentCondition: LockPaymentCondition
    let escrowPaymentCondition: EscrowPaymentCondition
    let token: Token

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;({ keeper } = nevermined)
        ;({ escrowComputeExecutionTemplate } = keeper.templates)
        ;({ token } = keeper)

        // Accounts
        ;[
            templateManagerOwner,
            publisher,
            consumer,
            provider
        ] = await nevermined.accounts.list()

        receivers = [publisher.getId(), provider.getId()]

        // Conditions
        ;({
            computeExecutionCondition,
            computeExecutionCondition,
            escrowPaymentCondition
        } = keeper.conditions)
    })

    describe('Propose and approve template', () => {
        it('should propose the template', async () => {
            await keeper.templateStoreManager.proposeTemplate(
                escrowComputeExecutionTemplate.getAddress(),
                consumer,
                true
            )
            // TODO: Use a event to detect template mined
            await new Promise(resolve => setTimeout(resolve, 2 * 1000))
        })

        it('should approve the template', async () => {
            await keeper.templateStoreManager.approveTemplate(
                escrowComputeExecutionTemplate.getAddress(),
                templateManagerOwner,
                true
            )
            // TODO: Use a event to detect template mined
            await new Promise(resolve => setTimeout(resolve, 2 * 1000))
        })
    })

    describe('Full flow', () => {
        let agreementId: string
        let didSeed: string
        let did: string

        let conditionIdCompute: string
        let conditionIdLock: string
        let conditionIdEscrow: string

        before(async () => {
            agreementId = utils.generateId()
            didSeed = utils.generateId()
            did = await keeper.didRegistry.hashDID(didSeed, publisher.getId())
        })

        it('should register a DID', async () => {
            await keeper.didRegistry.registerAttribute(
                didSeed,
                checksum,
                [],
                url,
                publisher.getId()
            )
        })

        it('should generate the condition IDs', async () => {
            conditionIdCompute = await computeExecutionCondition.generateIdHash(
                agreementId,
                did,
                consumer.getId()
            )
            conditionIdLock = await lockPaymentCondition.generateIdHash(
                agreementId,
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                amounts,
                receivers
            )
            conditionIdEscrow = await escrowPaymentCondition.generateIdHash(
                agreementId,
                did,
                amounts,
                receivers,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                conditionIdLock,
                conditionIdCompute
            )
        })

        it('should have conditions types', async () => {
            const conditionTypes = await escrowComputeExecutionTemplate.getConditionTypes()

            assert.equal(conditionTypes.length, 3, 'Expected 3 conditions.')
            assert.deepEqual(
                [...conditionTypes].sort(),
                [
                    computeExecutionCondition.getAddress(),
                    escrowPaymentCondition.getAddress(),
                    lockPaymentCondition.getAddress()
                ].sort(),
                "The conditions doesn't match"
            )
        })

        it('should have condition instances associated', async () => {
            const conditionInstances = await escrowComputeExecutionTemplate.getConditions()

            assert.equal(conditionInstances.length, 3, 'Expected 3 conditions.')

            const conditionClasses = [
                ComputeExecutionCondition,
                EscrowPaymentCondition,
                LockPaymentCondition
            ]

            conditionClasses.forEach(conditionClass => {
                if (
                    !conditionInstances.find(
                        condition => condition instanceof conditionClass
                    )
                ) {
                    throw new Error(
                        `${conditionClass.name} is not part of the conditions.`
                    )
                }
            })
        })

        it('should create a new agreement', async () => {
            const agreement = await escrowComputeExecutionTemplate.createAgreement(
                agreementId,
                did,
                [conditionIdCompute, conditionIdLock, conditionIdEscrow],
                [0, 0, 0],
                [0, 0, 0],
                consumer.getId(),
                publisher
            )

            assert.isTrue(agreement.status)
        })

        it('should not trigger the compute', async () => {
            const computeTriggered = await computeExecutionCondition.wasComputeTriggered(
                did,
                consumer.getId()
            )

            assert.isFalse(computeTriggered, 'Compute has been triggered.')
        })

        it('should fulfill LockPaymentCondition', async () => {
            try {
                await consumer.requestTokens(totalAmount)
            } catch {}

            await keeper.token.approve(
                lockPaymentCondition.getAddress(),
                totalAmount,
                consumer
            )

            const fulfill = await lockPaymentCondition.fulfill(
                agreementId,
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                amounts,
                receivers,
                consumer
            )

            assert.isDefined(fulfill.events.Fulfilled, 'Not Fulfilled event.')
        })

        it('should fulfill ComputeExecutionCondition', async () => {
            const fulfill = await computeExecutionCondition.fulfill(
                agreementId,
                did,
                consumer.getId(),
                publisher
            )

            assert.isDefined(fulfill.events.Fulfilled, 'Not Fulfilled event.')
        })

        it('should fulfill EscrowPaymentCondition', async () => {
            const fulfill = await escrowPaymentCondition.fulfill(
                agreementId,
                did,
                amounts,
                receivers,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                conditionIdLock,
                conditionIdCompute,
                consumer
            )

            assert.isDefined(fulfill.events.Fulfilled, 'Not Fulfilled event.')
        })

        it('should grant the access to the consumer', async () => {
            const computeTriggered = await computeExecutionCondition.wasComputeTriggered(
                did,
                consumer.getId()
            )

            assert.isTrue(computeTriggered, 'Compute has not been triggered.')
        })
    })

    describe('Short flow', () => {
        let agreementId: string
        let ddo: DDO

        before(async () => {
            ddo = await nevermined.assets.create(
                getMetadata(),
                publisher,
                undefined,
                ['access', 'compute'],
                undefined,
                undefined,
                undefined,
                token.getAddress()
            )
        })

        it('should create a new agreement (short way)', async () => {
            agreementId = await escrowComputeExecutionTemplate.createFullAgreement(
                ddo,
                new AssetRewards(
                    new Map([
                        [receivers[0], amounts[0]],
                        [receivers[1], amounts[1]]
                    ])
                ),
                consumer.getId(),
                undefined,
                publisher
            )

            assert.match(agreementId, /^0x[a-f0-9]{64}$/i)
        })

        it('should not grant the access to the consumer', async () => {
            const computeTriggered = await computeExecutionCondition.wasComputeTriggered(
                ddo.shortId(),
                consumer.getId()
            )

            assert.isFalse(computeTriggered, 'Compute has been triggered.')
        })

        it('should fulfill the conditions from consumer side', async () => {
            try {
                await consumer.requestTokens(totalAmount)
            } catch {}

            await nevermined.agreements.conditions.lockPayment(
                agreementId,
                ddo.shortId(),
                amounts,
                receivers,
                token.getAddress(),
                consumer
            )
        })

        it('should fulfill the conditions from computing side', async () => {
            await nevermined.agreements.conditions.grantServiceExecution(
                agreementId,
                ddo.shortId(),
                consumer.getId(),
                publisher
            )

            await nevermined.agreements.conditions.releaseReward(
                agreementId,
                amounts,
                receivers,
                ddo.shortId(),
                consumer.getId(),
                publisher.getId(),
                token.getAddress(),
                publisher
            )
        })

        it('should grant the access to the consumer', async () => {
            const computeTriggered = await computeExecutionCondition.wasComputeTriggered(
                ddo.shortId(),
                consumer.getId()
            )

            assert.isTrue(computeTriggered, 'Compute has not been triggered.')
        })
    })
})
