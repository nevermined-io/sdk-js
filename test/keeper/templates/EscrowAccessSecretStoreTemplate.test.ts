import { assert } from 'chai'
import { AccessTemplate } from '../../../src/keeper/contracts/templates'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import { Condition } from "../../../src"

let template: AccessTemplate
let condition: Condition

describe('AccessTemplate', () => {
    before(async () => {
        const nevermined: Nevermined = await Nevermined.getInstance(config)
        await TestContractHandler.prepareContracts()
        template = nevermined.keeper.templates.accessTemplate
        const conditions = await template.getConditions()
        condition = conditions.find(
            (condition) => condition.contractName === 'LockPaymentCondition'
        )
    })

    describe("#hashValues()", () => {
        it("should hash the values", async () => {
            const address = `0x${"a".repeat(40)}`
            const hash = await condition.hashValues(address, 15)

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })
    })
})
