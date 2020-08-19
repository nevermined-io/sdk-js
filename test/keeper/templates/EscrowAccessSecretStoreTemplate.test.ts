import { assert } from 'chai'
import { EscrowAccessSecretStoreTemplate } from '../../../src/keeper/contracts/templates'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import { Condition } from "../../../src"

let template: EscrowAccessSecretStoreTemplate
let condition: Condition

describe('EscrowAccessSecretStoreTemplate', () => {
    before(async () => {
        const nevermined: Nevermined = await Nevermined.getInstance(config)
        await TestContractHandler.prepareContracts()
        template = nevermined.keeper.templates.escrowAccessSecretStoreTemplate
        const conditions = await template.getConditions()
        condition = conditions.find(
            (condition) => condition.contractName === 'LockRewardCondition'
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
