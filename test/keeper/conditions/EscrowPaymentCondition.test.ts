import { assert } from 'chai'
import { EscrowPaymentCondition } from '../../../src/keeper/contracts/conditions'
import Token from '../../../src/keeper/contracts/Token'
import { Nevermined } from '../../../src/nevermined'
import { BigNumber } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

let condition: EscrowPaymentCondition
let token: Token

describe('EscrowPaymentCondition', () => {
    const agreementId = `0x${'a'.repeat(64)}`
    const did = `0x${'a'.repeat(64)}`
    const amounts = [BigNumber.from(15), BigNumber.from(3)]
    const publisher = `0x${'a'.repeat(40)}`
    const consumer = `0x${'b'.repeat(40)}`
    const provider = `0x${'b'.repeat(40)}`
    const receivers = [publisher, provider]
    let lockCondition
    let releaseCondition: string

    before(async () => {
        const { keeper } = await Nevermined.getInstance(config)

        await TestContractHandler.prepareContracts()
        condition = keeper.conditions.escrowPaymentCondition
        ;({ token } = keeper)

        lockCondition = await keeper.conditions.lockPaymentCondition
            .generateIdHash(
                agreementId,
                did,
                condition.getAddress(),
                token.getAddress(),
                amounts,
                receivers
            )
            .catch(e => {
                console.log(e)
                throw e
            })
            .then(v => {
                return v
            })
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
                consumer,
                publisher,
                token.getAddress(),
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
                consumer,
                publisher,
                token.getAddress(),
                lockCondition,
                releaseCondition
            )
            const id = await condition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })
})
