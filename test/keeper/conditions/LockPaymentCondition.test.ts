import { assert } from 'chai'
import { LockPaymentCondition } from '../../../src/keeper/contracts/conditions'
import Token from '../../../src/keeper/contracts/Token'
import AssetRewards from '../../../src/models/AssetRewards'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

let condition: LockPaymentCondition
let assetRewards: AssetRewards
let token: Token

describe('LockPaymentCondition', () => {
    const agreementId = `0x${'a'.repeat(64)}`
    const address = `0x${'a'.repeat(40)}`
    const amount = 15
    const did = `did:nv:${'a'.repeat(64)}`

    before(async () => {
        await TestContractHandler.prepareContracts()

        const nevermined = await Nevermined.getInstance(config)
        condition = nevermined.keeper.conditions.lockPaymentCondition
        ;({ token } = nevermined.keeper)
        assetRewards = new AssetRewards(address, amount)
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const hash = await condition.hashValues(
                did,
                address,
                token.getAddress(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('#generateId()', () => {
        it('should generate an ID', async () => {
            const hash = await condition.hashValues(
                did,
                address,
                token.getAddress(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
            const id = await condition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })
})
