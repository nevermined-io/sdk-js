import { assert } from 'chai'
import TestContractHandler from '../TestContractHandler'

import { AccessTemplate } from '../../../src/keeper/contracts/templates'
import { ConditionSmall } from '../../../src/keeper/contracts/conditions/Condition.abstract'
import { Token } from '../../../src/keeper/contracts/Token'

let template: AccessTemplate
let condition: ConditionSmall
let token: Token

describe('Escrow AccessTemplate', () => {
  before(async () => {
    const prepare = await TestContractHandler.prepareContracts()
    const nevermined = prepare.nevermined
    // deployer = prepare.deployerAccount

    template = nevermined.keeper.templates.accessTemplate
    ;({ token } = nevermined.keeper)

    const conditions = await template.getConditions()
    condition = conditions.find((condition) => condition.contractName === 'LockPaymentCondition')
  })

  describe('#hashValues()', () => {
    it('should hash the values', async () => {
      const address = `0x${'a'.repeat(40)}`
      const did = `0x${'a'.repeat(64)}`
      const hash = await condition.hashValues(did, address, token.address, [15], [address])

      assert.match(hash, /^0x[a-f0-9]{64}$/i)
    })
  })
})
