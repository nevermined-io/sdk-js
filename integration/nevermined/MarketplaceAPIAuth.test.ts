import { assert } from 'chai'
import config from '../../test/config'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import Logger from '../../src/models/Logger'

describe('Marketplace api auth', () => {
  let nevermined: Nevermined
  let account1: NvmAccount
  let account2: NvmAccount
  let testConfig

  before(async () => {
    try {
      localStorage.clear()
    } catch (error) {
      Logger.debug(error)
    }

    const numAccounts = config.accounts.length
    testConfig = { ...config }
    testConfig.accounts = [config.accounts[numAccounts - 1], config.accounts[numAccounts - 2]]
    // testConfig.accounts = makeRandomAccounts(3)
    testConfig.marketplaceAuthToken = undefined

    nevermined = await Nevermined.getInstance(testConfig)

    // Accounts
    ;[account1, account2] = nevermined.accounts.list()
  })

  it('should login in marketplace API', async () => {
    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account1)

    try {
      await nevermined.services.marketplace.login(clientAssertion)
      assert.equal(Boolean(testConfig.marketplaceAuthToken), true)
    } catch (error) {
      assert.fail('should not fail')
    }
  })

  it('should login using a message', async () => {
    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
      account1,
      'Nevermined',
    )
    const accessToken = await nevermined.services.marketplace.login(clientAssertion)
    assert.isDefined(accessToken)
  })

  it('should add new address to the account', async () => {
    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account2)

    await nevermined.services.marketplace.addNewAddress(clientAssertion)
    assert.equal(Boolean(testConfig.marketplaceAuthToken), true)
  })
})
