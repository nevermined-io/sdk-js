import { assert } from 'chai'
import { Account, parseUnits } from '../../src'
import { Nevermined } from '../../src/nevermined'
import config from '../config'
import TestContractHandler from '../keeper/TestContractHandler'

let nevermined: Nevermined
let accounts: Account[]

describe('Account', () => {
  before(async () => {
    await TestContractHandler.prepareContracts()
    nevermined = await Nevermined.getInstance(config)
    accounts = await nevermined.accounts.list()
  })

  describe('#getNeverminedBalance()', () => {
    it('should get initial nevermined balance', async () => {
      const balance = await accounts[8].getNeverminedBalance()

      assert.equal(0n, balance, `Expected 0 got ${balance}`)
    })

    it('should get the correct balance', async () => {
      const amount = 100n
      const [account] = accounts
      const initialBalance = await account.getNeverminedBalance()
      await account.requestTokens(amount)
      const balance = await account.getNeverminedBalance()

      const balancePlusAmount = parseUnits('100')
      console.log(`Initial Balance :    ${initialBalance.toString()}`)
      console.log(`Balance         :    ${balance.toString()}`)
      console.log(`Balance + Amount:    ${balancePlusAmount.toString()}`)
      assert.isTrue(balance >= initialBalance + balancePlusAmount)
    })
  })

  describe('#getEthBalance()', () => {
    it('should get initial ether balance', async () => {
      // eslint-disable-next-line prefer-destructuring
      const account: Account = accounts[9]
      const balanceEth = await account.getEtherBalance()

      console.log(`Balance ${balanceEth} should be ${parseUnits('1000')}`)
      assert.equal(balanceEth, parseUnits('1000'))
    })
  })

  describe('#getBalance()', () => {
    it('should get initial balance', async () => {
      // eslint-disable-next-line prefer-destructuring
      const account: Account = accounts[9]
      const balance = await account.getBalance()

      assert.equal(balance.eth, parseUnits('1000'))
      assert.equal(balance.nevermined, 0n)
    })
  })

  describe('#requestTokens()', () => {
    it('should return the amount of tokens granted', async () => {
      const tokens = '5'
      // eslint-disable-next-line prefer-destructuring
      const account: Account = accounts[7]
      const tokensGranted: string = await account.requestTokens(tokens)

      assert.equal(tokensGranted, tokens)
    })
  })
})
