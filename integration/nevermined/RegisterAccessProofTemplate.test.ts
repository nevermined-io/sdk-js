import { assert } from 'chai'

import { config } from '../config'

import { Nevermined, utils, Account, Keeper, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import Token from '../../src/keeper/contracts/Token'
import { getMetadata } from '../utils'
import {
    AccessProofCondition,
    EscrowPaymentCondition,
    LockPaymentCondition
} from '../../src/keeper/contracts/conditions'
import { AccessProofTemplate } from '../../src/keeper/contracts/templates'
import { BabyjubPublicKey } from '../../src/models/KeyTransfer'
import KeyTransfer from '../../src/utils/KeyTransfer'

describe('Register Escrow Access Proof Template', () => {
    let nevermined: Nevermined
    let keeper: Keeper

    let accessProofTemplate: AccessProofTemplate

    const url = 'https://example.com/did/nevermined/test-attr-example.txt'
    const checksum = 'b'.repeat(32)
    const totalAmount = 12
    const amounts = [10, 2]

    let templateManagerOwner: Account
    let publisher: Account
    let consumer: Account
    let provider: Account
    let receivers: string[]

    let accessProofCondition: AccessProofCondition
    let lockPaymentCondition: LockPaymentCondition
    let escrowPaymentCondition: EscrowPaymentCondition
    let token: Token

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;({ keeper } = nevermined)
        ;({ accessProofTemplate } = keeper.templates)
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
            accessProofCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = keeper.conditions)
    })

    describe('Propose and approve template', () => {
        it('should propose the template', async () => {
            await keeper.templateStoreManager.proposeTemplate(
                accessProofTemplate.getAddress(),
                consumer,
                true
            )
            // TODO: Use a event to detect template mined
            await new Promise(resolve => setTimeout(resolve, 2 * 1000))
        })

        it('should approve the template', async () => {
            await keeper.templateStoreManager.approveTemplate(
                accessProofTemplate.getAddress(),
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

        let conditionIdAccess: string
        let conditionIdLock: string
        let conditionIdEscrow: string

        let buyerK: string
        let providerK: string
        let buyerPub: BabyjubPublicKey
        let providerPub: BabyjubPublicKey
        let keyTransfer: KeyTransfer

        const data = Buffer.from(
            '4e657665726d696e65640a436f707972696768742032303230204b65796b6f20476d62482e0a0a546869732070726f6475637420696e636c75646573',
            'hex'
        )
        let hash: string

        before(async () => {
            agreementId = utils.generateId()
            didSeed = utils.generateId()
            did = await keeper.didRegistry.hashDID(didSeed, publisher.getId())

            keyTransfer = new KeyTransfer()

            buyerK = keyTransfer.makeKey('abd')
            providerK = keyTransfer.makeKey('abc')
            buyerPub = keyTransfer.secretToPublic(buyerK)
            providerPub = keyTransfer.secretToPublic(providerK)

            hash = keyTransfer.hashKey(data)
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
            conditionIdAccess = await accessProofCondition.generateIdHash(
                agreementId,
                hash,
                buyerPub,
                providerPub
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
            const conditionTypes = await accessProofTemplate.getConditionTypes()

            assert.equal(conditionTypes.length, 3, 'Expected 3 conditions.')
            assert.deepEqual(
                [...conditionTypes].sort(),
                [
                    accessProofCondition.getAddress(),
                    escrowPaymentCondition.getAddress(),
                    lockPaymentCondition.getAddress()
                ].sort(),
                "The conditions doesn't match"
            )
        })

        it('should have condition instances associated', async () => {
            const conditionInstances = await accessProofTemplate.getConditions()

            assert.equal(conditionInstances.length, 3, 'Expected 3 conditions.')

            const conditionClasses = [
                AccessProofCondition,
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
            const agreement = await accessProofTemplate.createAgreement(
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
            const cipher = keyTransfer.encryptKey(
                data,
                keyTransfer.ecdh(providerK, buyerPub)
            )
            const proof = await keyTransfer.prove(buyerPub, providerPub, providerK, data)
            const fulfill = await accessProofCondition.fulfill(
                agreementId,
                hash,
                buyerPub,
                providerPub,
                cipher,
                proof
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
    })

    describe('Short flow', () => {
        let agreementId: string
        let ddo: DDO

        let buyerK: string
        let providerK: string
        let buyerPub: BabyjubPublicKey
        let providerPub: BabyjubPublicKey
        let keyTransfer: KeyTransfer

        const data = Buffer.from('12345678901234567890123456789012')
        let hash: string

        before(async () => {
            ddo = await nevermined.assets.create(getMetadata(), publisher)
            keyTransfer = new KeyTransfer()
            buyerK = keyTransfer.makeKey('a b c')
            providerK = keyTransfer.makeKey('e f g')
            buyerPub = keyTransfer.secretToPublic(buyerK)
            providerPub = keyTransfer.secretToPublic(providerK)

            hash = keyTransfer.hashKey(data)
        })

        it('should create a new agreement (short way)', async () => {
            agreementId = await accessProofTemplate.createFullAgreement(
                ddo,
                new AssetRewards(
                    new Map([
                        [receivers[0], amounts[0]],
                        [receivers[1], amounts[1]]
                    ])
                ),
                consumer.getId(),
                hash,
                buyerPub,
                providerPub,
                undefined,
                publisher
            )

            assert.match(agreementId, /^0x[a-f0-9]{64}$/i)
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
            await nevermined.agreements.conditions.transferKey(
                agreementId,
                data,
                providerK,
                buyerPub,
                providerPub,
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

        it('buyer should have the key', async () => {
            const key = await nevermined.agreements.conditions.readKey(
                agreementId,
                buyerK,
                providerPub
            )
            assert.equal(key.toString(), data.toString())
        })
    })
})
