import { assert } from 'chai'

import { config } from '../config'

import { Nevermined, templates, conditions, utils, Account, Keeper } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'

const { LockPaymentCondition, EscrowPaymentCondition, AccessCondition } = conditions

describe('Register Escrow Access Secret Store Template', () => {
    let nevermined: Nevermined
    let keeper: Keeper

    let template: templates.AccessTemplate

    const url = 'https://example.com/did/nevermined/test-attr-example.txt'
    const checksum = 'b'.repeat(32)
    let totalAmount = 12
    const amounts = [10, 2]

    let templateManagerOwner: Account
    let publisher: Account
    let consumer: Account
    let provider: Account
    let receivers: string[]

    let accessCondition: conditions.AccessCondition
    let lockPaymentCondition: conditions.LockPaymentCondition
    let escrowPaymentCondition: conditions.EscrowPaymentCondition

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        keeper = nevermined.keeper

        template = keeper.templates.accessTemplate

        // Accounts
        templateManagerOwner = (await nevermined.accounts.list())[0]
        publisher = (await nevermined.accounts.list())[1]
        consumer = (await nevermined.accounts.list())[2]
        provider = (await nevermined.accounts.list())[3]
        receivers = [publisher.getId(), provider.getId()]

        // Conditions
        accessCondition = keeper.conditions.accessCondition
        lockPaymentCondition = keeper.conditions.lockPaymentCondition
        escrowPaymentCondition = keeper.conditions.escrowPaymentCondition

        if (!nevermined.keeper.dispenser) {
            totalAmount = 0
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

        let conditionIdAccess: string
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
            conditionIdAccess = await accessCondition.generateIdHash(
                agreementId,
                did,
                consumer.getId()
            )
            conditionIdLock = await lockPaymentCondition.generateIdHash(
                agreementId,
                did,
                escrowPaymentCondition.getAddress(),
                amounts,
                receivers
            )
            conditionIdEscrow = await escrowPaymentCondition.generateIdHash(
                agreementId,
                did,
                amounts,
                receivers,
                publisher.getId(),
                conditionIdLock,
                conditionIdAccess
            )
        })

        it('should have conditions types', async () => {
            const conditionTypes = await template.getConditionTypes()

            assert.equal(conditionTypes.length, 3, 'Expected 3 conditions.')
            assert.deepEqual(
                [...conditionTypes].sort(),
                [
                    accessCondition.getAddress(),
                    escrowPaymentCondition.getAddress(),
                    lockPaymentCondition.getAddress()
                ].sort(),
                "The conditions doesn't match"
            )
        })

        it('should have condition instances asociated', async () => {
            const conditionInstances = await template.getConditions()

            assert.equal(conditionInstances.length, 3, 'Expected 3 conditions.')

            const conditionClasses = [
                AccessCondition,
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
            const agreement = await template.createAgreement(
                agreementId,
                did,
                [conditionIdAccess, conditionIdLock, conditionIdEscrow],
                [0, 0, 0],
                [0, 0, 0],
                consumer.getId(),
                publisher.getId()
            )

            assert.isTrue(agreement.status)
        })

        it('should not grant the access to the consumer', async () => {
            const accessGranted = await accessCondition.checkPermissions(
                consumer.getId(),
                did
            )

            assert.isFalse(accessGranted, 'Consumer has been granted.')
        })

        it('should fulfill LockPaymentCondition', async () => {
            try {
                await consumer.requestTokens(totalAmount)
            } catch {}

            await keeper.token.approve(
                lockPaymentCondition.getAddress(),
                totalAmount,
                consumer.getId()
            )

            const fulfill = await lockPaymentCondition.fulfill(
                agreementId,
                did,
                escrowPaymentCondition.getAddress(),
                amounts,
                receivers,
                consumer.getId(),
            )

            assert.isDefined(fulfill.events.Fulfilled, 'Not Fulfilled event.')
        })

        it('should fulfill AccessCondition', async () => {
            const fulfill = await accessCondition.fulfill(
                agreementId,
                did,
                consumer.getId(),
                publisher.getId()
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
                conditionIdLock,
                conditionIdAccess,
                consumer.getId()
            )

            assert.isDefined(fulfill.events.Fulfilled, 'Not Fulfilled event.')
        })

        it('should grant the access to the consumer', async () => {
            const accessGranted = await accessCondition.checkPermissions(
                consumer.getId(),
                did
            )

            assert.isTrue(accessGranted, 'Consumer has not been granted.')
        })
    })

    describe('Short flow', () => {
        const did = utils.generateId()

        let agreementId

        it('should register a DID', async () => {
            // This part is executed inside Nevermined.assets.create()
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
                new AssetRewards(),
                consumer.getId(),
                publisher.getId()
            )

            assert.match(agreementId, /^0x[a-f0-9]{64}$/i)
        })

        it('should not grant the access to the consumer', async () => {
            const accessGranted = await accessCondition.checkPermissions(
                consumer.getId(),
                did
            )

            assert.isFalse(accessGranted, 'Consumer has been granted.')
        })

        it('should fulfill the conditions from consumer side', async () => {
            try {
                await consumer.requestTokens(totalAmount)
            } catch {}

            await nevermined.agreements.conditions.lockPayment(
                agreementId,
                did,
                amounts,
                receivers,
                consumer
            )
        })

        it('should fulfill the conditions from publisher side', async () => {
            await nevermined.agreements.conditions.grantAccess(
                agreementId,
                did,
                consumer.getId(),
                publisher
            )
            await nevermined.agreements.conditions.releaseReward(
                agreementId,
                amounts,
                receivers,
                did,
                consumer.getId(),
                publisher.getId(),
                publisher
            )
        })

        it('should grant the access to the consumer', async () => {
            const accessGranted = await accessCondition.checkPermissions(
                consumer.getId(),
                did
            )

            assert.isTrue(accessGranted, 'Consumer has not been granted.')
        })
    })
})
