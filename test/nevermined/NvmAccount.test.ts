import { assert } from 'chai'
import { makeRandomWallet } from '../../src/nevermined/utils/BlockchainViemUtils'
import { NvmAccount } from '../../src/models/NvmAccount'

// import { Nevermined } from '../../src/nevermined'
// import config from '../config'
// import TestContractHandler from '../keeper/TestContractHandler'

// let nevermined: Nevermined

describe('NvmAccount', () => {
  console.log(`TEST!!!!`)
  before(async () => {
    // await TestContractHandler.prepareContracts()
    // nevermined = await Nevermined.getInstance(config)
    // accounts = nevermined.accounts.list()
  })

  describe('#fromAccount()', () => {
    it('should get initial nevermined balance', async () => {
      const account = makeRandomWallet()
      const nvmAccount = NvmAccount.fromAccount(account)
      assert.isDefined(nvmAccount)
    })
  })
})
