import { assert } from 'chai'
import { makeRandomWallet } from '../../src/nevermined/utils/BlockchainViemUtils'

describe('Void', () => {
  console.log(`Empty Test!!!!`)

  describe('lets start', () => {
    it('should get a validation', async () => {
      assert.isTrue(true)
    })

    it('create random wallet', async () => {
      const account = makeRandomWallet()
      assert.isDefined(account)
    })
  })
})
