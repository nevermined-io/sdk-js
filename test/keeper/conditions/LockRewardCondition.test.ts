import { assert } from 'chai'
import { LockRewardCondition } from '../../../src/keeper/contracts/conditions'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

let condition: LockRewardCondition

describe('LockRewardCondition', () => {
    const agreementId = `0x${'a'.repeat(64)}`
    const address = `0x${'a'.repeat(40)}`
    const amount = 15

    before(async () => {
        await TestContractHandler.prepareContracts()
        condition = (await Nevermined.getInstance(config)).keeper.conditions
            .lockRewardCondition
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const hash = await condition.hashValues(address, amount)

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
            assert.equal(
                hash,
                '0x2543c2ea4b9403bb3e5df1145c70731454748e72a37acc80d025f85e03267973',
                'The hash is not the expected.'
            )
        })
    })

    describe('#generateId()', () => {
        it('should generate an ID', async () => {
            const hash = await condition.hashValues(address, amount)
            const id = await condition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })
})
