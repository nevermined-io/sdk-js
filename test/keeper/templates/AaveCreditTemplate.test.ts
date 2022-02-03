import { assert } from 'chai'
import { AaveCreditTemplate } from '../../../src/keeper/contracts/templates'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import { Condition } from '../../../src'
import Token from '../../../src/keeper/contracts/Token'

let template: AaveCreditTemplate
let condition: Condition
let token: Token

describe('AaveCreditTemplate', () => {
    before(async () => {
        const nevermined: Nevermined = await Nevermined.getInstance(config)
        await TestContractHandler.prepareContracts()
        template = nevermined.keeper.templates.aaveCreditTemplate
        ;({ token } = nevermined.keeper)

        const conditions = await template.getConditions()
        condition = conditions.find(
            condition => condition.contractName === 'NFT721LockCondition'
        )
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const address = `0x${'a'.repeat(40)}`
            const did = `0x${'a'.repeat(64)}`
            const hash = await condition.hashValues(
                did,
                address,
                token.getAddress(),
                [15],
                [address]
            )

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })
    })
})
