import { assert } from 'chai'
import { LockPaymentCondition } from '../../../src/keeper/contracts/conditions'
import AssetRewards from '../../../src/models/AssetRewards'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

let condition: LockPaymentCondition
let assetRewards: AssetRewards

describe('LockPaymentCondition', () => {
    const agreementId = `0x${'a'.repeat(64)}`
    const address = `0x${'a'.repeat(40)}`
    const amount = 15
    const did = `did:nv:${'a'.repeat(64)}`

    before(async () => {
        await TestContractHandler.prepareContracts()
        condition = (await Nevermined.getInstance(config)).keeper.conditions
            .lockPaymentCondition
        assetRewards = new AssetRewards(address, amount)
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const hash = await condition.hashValues(
                did, address, assetRewards.getAmounts(), assetRewards.getReceivers())

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
            const hash = await condition.hashValues(
                did, address, assetRewards.getAmounts(), assetRewards.getReceivers())
            const id = await condition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })
})
