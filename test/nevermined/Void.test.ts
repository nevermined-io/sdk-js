import { assert } from 'chai'
import { makeRandomWallet } from '@/nevermined/utils/BlockchainViemUtils'
import { getAbiItem, hexToBigInt } from 'viem'

describe('Void', () => {
  console.log(`Empty Test!!!!`)

  describe('getAbiItem', () => {
    it('should get a validation', async () => {
      const name = 'mint'
      const abi = [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'mint',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x1b2ef1ca',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'mint',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x731133e9',
        },
      ]
      const args = [
        '0xc05f51B43e2638Ea288B25AB7Af3BF898b314340',
        hexToBigInt('0x0f6a2f355c104801b4ff70c504877df4081658779f5848a299221486672e31d4'),
        2n,
        '',
      ]
      const func = getAbiItem({ abi, name, args })

      console.log(func)
      // @ts-ignore
      assert.isTrue(args.length === func.inputs.length)
    })
  })

  describe.skip('lets start', () => {
    it('should get a validation', async () => {
      assert.isTrue(true)
    })

    it('create random wallet', async () => {
      const account = makeRandomWallet()
      assert.isDefined(account)
    })
  })
})
