import { assert, spy, use } from 'chai'
import spies from 'chai-spies'

import { AccountsApi } from '@/nevermined/api/AccountsApi'
import { Nevermined } from '@/nevermined/Nevermined'
import { NvmAccount } from '@/models/NvmAccount'
import TestContractHandler from '../keeper/TestContractHandler'

use(spies)

describe('Accounts', () => {
  let accounts: AccountsApi
  let nevermined: Nevermined

  before(async () => {
    const prepare = await TestContractHandler.prepareContracts()
    nevermined = prepare.nevermined
    accounts = nevermined.accounts
  })

  afterEach(() => {
    spy.restore()
  })

  describe('#list()', () => {
    it('should return the list of accounts', async () => {
      const accountsList = await accounts.list()

      accountsList.map((account) => assert.instanceOf(account, NvmAccount))
    })
  })

  describe('#balance()', () => {
    it('should return the balance of an account', async () => {
      const [account] = await accounts.list()

      const balance = await accounts.getBalance(account)
      assert.isTrue(balance.eth > 0n)
    })
  })

  describe('#requestTokens()', () => {
    it('should return the balance of an account', async () => {
      const [account] = await accounts.list()
      spy.on(account, 'requestTokens', () => 10)
      const success = await accounts.requestTokens(account, 10n)

      assert.isTrue(success)
    })
  })
})
