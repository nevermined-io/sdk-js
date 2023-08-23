import { assert } from 'chai'
import { Nevermined } from '../../src'
import { LockPaymentCondition } from '../../src/keeper'
import { config } from '../config'

describe('Test Encoding', () => {
  let lockPaymentCondition: LockPaymentCondition

  const agreementId = '0x6098b775850142a1bd13ceca600a1dfad5c58aae6cd8499c9f02c0cf1e052a17'
  const tokenAddress = '0x80163Dec819063F87ad4F1b6A24DA551C93c5777'
  const amounts = [10n, 2n]
  const receivers = [
    '0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e',
    '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0',
  ]
  const did = '0x0792cbe4ea0285a2a2db26f262c44b7478e02dc3da380f7c54be1634300b86b7'
  const escrowConditionAddress = '0x602e6AA9Ea3293410B6103283cE109E2073FC160'

  before(async () => {
    const nevermined = await Nevermined.getInstance(config)
    ;({ lockPaymentCondition } = nevermined.keeper.conditions)
  })

  it('Should produce the correct hash', async () => {
    const contractLockHash = await lockPaymentCondition.hashValues(
      did,
      escrowConditionAddress,
      tokenAddress,
      amounts,
      receivers,
    )
    assert.equal(
      contractLockHash,
      '0x20d5d330cad3f7d6769da69ac3f569676c83db2c27e750e0c65c43be359b059c',
    )

    const conditionId = await lockPaymentCondition.generateId(agreementId, contractLockHash)
    assert.notEqual(conditionId, contractLockHash)
  })
})
