import { assert, spy, use } from 'chai'
import spies from 'chai-spies'

import config from '../config'
import { NvmAccount } from '@/models/NvmAccount'
import { Nevermined } from '@/nevermined/Nevermined'
import TestContractHandler from '../keeper/TestContractHandler'

use(spies)

let nevermined: Nevermined

describe('Nevermined', () => {
  before(async () => {
    await TestContractHandler.prepareContracts()
    nevermined = await Nevermined.getInstance(config)
  })

  beforeEach(async () => {
    spy.on(nevermined.utils.signature, 'signText', () => `0x${'a'.repeat(130)}`)
  })
  afterEach(() => {
    spy.restore()
  })

  describe('#getInstance()', () => {
    it('should get an instance of Nevermined', async () => {
      const neverminedInstance: Nevermined = await Nevermined.getInstance(config)

      assert(neverminedInstance)
    })
  })

  describe('#getAccounts()', () => {
    it('should list accounts', async () => {
      const accs: NvmAccount[] = await nevermined.accounts.list()

      assert(accs.length === 10, `Expected 10 but the length is ${accs.length}`)
      const balance = await nevermined.accounts.getBalance(accs[5].getAddress())
      assert.equal(balance.nevermined, 0n)
      assert(typeof accs[0].getId() === 'string')
    })
  })
})
