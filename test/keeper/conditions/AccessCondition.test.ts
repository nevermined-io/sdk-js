import { assert } from 'chai'
import { AccessCondition } from '../../../src/keeper/contracts/conditions'
import { Nevermined } from '../../../src/nevermined'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

let condition: AccessCondition

describe('AccessCondition', () => {
    const agreementId = `0x${'a'.repeat(64)}`
    const did = `did:nv:${'a'.repeat(64)}`
    const address = `0x${'a'.repeat(40)}`

    before(async () => {
        await TestContractHandler.prepareContracts()
        const nevermined = await Nevermined.getInstance(config)
        condition = nevermined.keeper.conditions.accessCondition
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const hash = await condition.hashValues(did, address)

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('#generateId()', () => {
        it('should generate an ID', async () => {
            const hash = await condition.hashValues(did, address)
            const id = await condition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })
})
