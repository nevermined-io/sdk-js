import { assert } from 'chai'

import { config } from '../config'

import { Ocean, templates, conditions, utils, Account, Keeper } from '../../src' // @oceanprotocol/squid

const { LockRewardCondition, EscrowReward, ComputeExecutionCondition } = conditions

describe('Register Escrow Compute Execution Template', () => {
    let ocean: Ocean
    let keeper: Keeper

    let template: templates.EscrowComputeExecutionTemplate

    const url = 'https://example.com/did/ocean/test-attr-example.txt'
    const checksum = 'b'.repeat(32)
    let escrowAmount = 12

    let templateManagerOwner: Account
    let publisher: Account
    let consumer: Account

    let computeExecutionCondition: conditions.ComputeExecutionCondition
    let lockRewardCondition: conditions.LockRewardCondition
    let escrowReward: conditions.EscrowReward

    before(async () => {
        ocean = await Ocean.getInstance(config)
        keeper = ocean.keeper

        template = keeper.templates.escrowComputeExecutionTemplate

        // Accounts
        templateManagerOwner = (await ocean.accounts.list())[0]
        publisher = (await ocean.accounts.list())[1]
        consumer = (await ocean.accounts.list())[2]

        // Conditions
        computeExecutionCondition = keeper.conditions.computeExecutionCondition
        lockRewardCondition = keeper.conditions.lockRewardCondition
        escrowReward = keeper.conditions.escrowReward

        if (!ocean.keeper.dispenser) {
            escrowAmount = 0
        }
    })

    describe('Propose and approve template', () => {
        it('should propose the template', async () => {
            await keeper.templateStoreManager.proposeTemplate(
                template.getAddress(),
                consumer.getId(),
                true
            )
            // TODO: Use a event to detect template mined
            await new Promise(resolve => setTimeout(resolve, 2 * 1000))
        })

        it('should approve the template', async () => {
            await keeper.templateStoreManager.approveTemplate(
                template.getAddress(),
                templateManagerOwner.getId(),
                true
            )
            // TODO: Use a event to detect template mined
            await new Promise(resolve => setTimeout(resolve, 2 * 1000))
        })
    })

    describe('Full flow', () => {
        const agreementId = `0x${utils.generateId()}`
        const did = `0x${utils.generateId()}`

        let conditionIdCompute: string
        let conditionIdLock: string
        let conditionIdEscrow: string

        it('should register a DID', async () => {
            await keeper.didRegistry.registerAttribute(
                did,
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
            conditionIdLock = await lockRewardCondition.generateIdHash(
                agreementId,
                await escrowReward.getAddress(),
                escrowAmount
            )
            conditionIdEscrow = await escrowReward.generateIdHash(
                agreementId,
                escrowAmount,
                publisher.getId(),
                consumer.getId(),
                conditionIdLock,
                conditionIdCompute
            )
        })

        it('should have conditions types', async () => {
            const conditionTypes = await template.getConditionTypes()

            assert.equal(conditionTypes.length, 3, 'Expected 3 conditions.')
            assert.deepEqual(
                [...conditionTypes].sort(),
                [
                    computeExecutionCondition.getAddress(),
                    escrowReward.getAddress(),
                    lockRewardCondition.getAddress()
                ].sort(),
                "The conditions doesn't match"
            )
        })

        it('should have condition instances asociated', async () => {
            const conditionInstances = await template.getConditions()

            assert.equal(conditionInstances.length, 3, 'Expected 3 conditions.')

            const conditionClasses = [
                ComputeExecutionCondition,
                EscrowReward,
                LockRewardCondition
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
            const agreement = await template.createAgreement(
                agreementId,
                did,
                [conditionIdCompute, conditionIdLock, conditionIdEscrow],
                [0, 0, 0],
                [0, 0, 0],
                consumer.getId(),
                publisher.getId()
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

        it('should fulfill LockRewardCondition', async () => {
            try {
                await consumer.requestTokens(escrowAmount)
            } catch {}

            await keeper.token.approve(
                lockRewardCondition.getAddress(),
                escrowAmount,
                consumer.getId()
            )

            const fulfill = await lockRewardCondition.fulfill(
                agreementId,
                escrowReward.getAddress(),
                escrowAmount,
                consumer.getId()
            )

            assert.isDefined(fulfill.events.Fulfilled, 'Not Fulfilled event.')
        })

        it('should fulfill ComputeExecutionCondition', async () => {
            const fulfill = await computeExecutionCondition.fulfill(
                agreementId,
                did,
                consumer.getId(),
                publisher.getId()
            )

            assert.isDefined(fulfill.events.Fulfilled, 'Not Fulfilled event.')
        })

        it('should fulfill EscrowReward', async () => {
            const fulfill = await escrowReward.fulfill(
                agreementId,
                escrowAmount,
                publisher.getId(),
                consumer.getId(),
                conditionIdLock,
                conditionIdCompute,
                consumer.getId()
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
        const did = utils.generateId()

        let agreementId

        it('should register a DID', async () => {
            // This part is executed inside Ocean.assets.create()
            await keeper.didRegistry.registerAttribute(
                did,
                checksum,
                [],
                url,
                publisher.getId()
            )
        })

        it('should create a new agreement (short way)', async () => {
            agreementId = await template.createFullAgreement(
                did,
                escrowAmount,
                consumer.getId(),
                publisher.getId()
            )

            assert.match(agreementId, /^0x[a-f0-9]{64}$/i)
        })

        it('should not grant the access to the consumer', async () => {
            const computeTriggered = await computeExecutionCondition.wasComputeTriggered(
                did,
                consumer.getId()
            )

            assert.isFalse(computeTriggered, 'Compute has been triggered.')
        })

        it('should fulfill the conditions from consumer side', async () => {
            try {
                await consumer.requestTokens(escrowAmount)
            } catch {}

            await ocean.agreements.conditions.lockReward(
                agreementId,
                escrowAmount,
                consumer
            )
        })

        it('should fulfill the conditions from computing side', async () => {
            await ocean.agreements.conditions.grantServiceExecution(
                agreementId,
                did,
                consumer.getId(),
                publisher
            )
            await ocean.agreements.conditions.releaseReward(
                agreementId,
                escrowAmount,
                did,
                consumer.getId(),
                publisher.getId(),
                publisher
            )
        })

        it('should grant the access to the consumer', async () => {
            const computeTriggered = await computeExecutionCondition.wasComputeTriggered(
                did,
                consumer.getId()
            )

            assert.isTrue(computeTriggered, 'Compute has not been triggered.')
        })
    })
})
