import { assert } from 'chai'
import { EscrowPaymentCondition } from '../../../src/keeper/contracts/conditions'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

let condition: EscrowPaymentCondition

describe('EscrowPaymentCondition', () => {
    const agreementId = `0x${'a'.repeat(64)}`
    const did = `0x${'a'.repeat(64)}`
    const amounts = [15, 3]
    const totalAmount = amounts[0] + amounts[1]
    const publisher = `0x${'a'.repeat(40)}`
    const consumer = `0x${'b'.repeat(40)}`
    const provider = `0x${'b'.repeat(40)}`
    const receivers = [publisher, provider]
    let lockCondition
    let releaseCondition

    before(async () => {
        const { keeper } = await Nevermined.getInstance(config)

        await TestContractHandler.prepareContracts()
        condition = keeper.conditions.escrowPaymentCondition

        lockCondition = await keeper.conditions.lockPaymentCondition.generateIdHash(
            agreementId,
            publisher,
            totalAmount
        )
        releaseCondition = await keeper.conditions.accessCondition.generateIdHash(
            agreementId,
            did,
            consumer
        )
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const hash = await condition.hashValues(
                did,
                amounts,
                receivers,
                publisher,
                lockCondition,
                releaseCondition
            )

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('#generateId()', () => {
        it('should generate an ID', async () => {
            const hash = await condition.hashValues(
                did,
                amounts,
                receivers,
                publisher,
                lockCondition,
                releaseCondition
            )
            const id = await condition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })
})
