import { assert } from 'chai'
import { EscrowAccessSecretStoreTemplate } from '../../../src/keeper/contracts/templates'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import { Nevermined } from '../../../src/nevermined/Nevermined'

let condition: EscrowAccessSecretStoreTemplate

describe('EscrowAccessSecretStoreTemplate', () => {
    before(async () => {
        const nevermined: Nevermined = await Nevermined.getInstance(config)
        await TestContractHandler.prepareContracts()
        condition = nevermined.keeper.templates.escrowAccessSecretStoreTemplate
    })

    // describe("#hashValues()", () => {
    //     it("should hash the values", async () => {
    //         const address = `0x${"a".repeat(40)}`
    //         const hash = await condition.hashValues(address, 15)

    //         assert.match(hash, /^0x[a-f0-9]{64}$/i)
    //     })
    // })
})
