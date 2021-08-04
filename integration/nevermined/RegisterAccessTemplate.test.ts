import { assert } from 'chai'

import { config } from '../config'

import { Nevermined, templates, conditions, utils, Account, Keeper, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import Token from '../../src/keeper/contracts/Token'
import { getMetadata } from '../utils'

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
    let token: Token

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;({ keeper } = nevermined)

        template = keeper.templates.accessTemplate
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
            accessCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = keeper.conditions)

        if (!nevermined.keeper.dispenser) {
            totalAmount = 0
        }
    })

    describe('Propose and approve template', () => {
        it('should propose the template', async () => {
            await keeper.templateStoreManager.proposeTemplate(
                template.getAddress(),
                consumer,
                true
            )
            // TODO: Use a event to detect template mined
            await new Promise(resolve => setTimeout(resolve, 2 * 1000))
        })

        it('should approve the template', async () => {
            await keeper.templateStoreManager.approveTemplate(
                template.getAddress(),
                templateManagerOwner,
                true
            )
            // TODO: Use a event to detect template mined
            await new Promise(resolve => setTimeout(resolve, 2 * 1000))
        })
    })

    xdescribe('Full flow', () => {
        let agreementId: string
        let didSeed: string
        let did: string

        let conditionIdAccess: string
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
            conditionIdAccess = await accessCondition.generateIdHash(
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
                publisher
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

        it('should fulfill AccessCondition', async () => {
            const fulfill = await accessCondition.fulfill(
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
                conditionIdAccess,
                consumer
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
        let agreementId: string
        let ddo: DDO

        before(async () => {
            ddo = await nevermined.assets.create(getMetadata(), publisher)
        })

        it('should create a new agreement (short way)', async () => {
            agreementId = await template.createFullAgreement(
                ddo,
                new AssetRewards(),
                consumer.getId(),
                undefined,
                publisher
            )

            assert.match(agreementId, /^0x[a-f0-9]{64}$/i)
        })

        it('should not grant the access to the consumer', async () => {
            const accessGranted = await accessCondition.checkPermissions(
                consumer.getId(),
                ddo.shortId()
            )

            assert.isFalse(accessGranted, 'Consumer has been granted.')
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

        it('should fulfill the conditions from publisher side', async () => {
            await nevermined.agreements.conditions.grantAccess(
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
            const accessGranted = await accessCondition.checkPermissions(
                consumer.getId(),
                ddo.shortId()
            )

            assert.isTrue(accessGranted, 'Consumer has not been granted.')
        })
    })
})
