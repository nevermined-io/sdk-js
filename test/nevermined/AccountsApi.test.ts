import { assert, spy, use } from 'chai'
import spies from 'chai-spies'

import config from '../config'
import { AccountsApi } from '@/nevermined/api/AccountsApi'
import { Nevermined } from '@/nevermined/Nevermined'
import { NvmAccount } from '@/models/NvmAccount'

use(spies)

describe('Accounts', () => {
  let accounts: AccountsApi
  let nevermined: Nevermined

  before(async () => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    nevermined = await Nevermined.getInstance(config)
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
      spy.on(account, 'getBalance', () => ({
        eth: 1n,
        nevermined: 5n,
      }))
      const balance = await accounts.getBalance(account)

      assert.deepEqual(balance, {
        eth: 1n,
        nevermined: 5n,
      })
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
