import { assert } from 'chai'
import { NvmAccount } from '../../src/models'
import { getSignatureOfFunction } from '../../src/nevermined/utils/BlockchainViemUtils'
import { ContractBaseMock } from '../mocks/ContractBase.Mock'
import TestContractHandler from './TestContractHandler'

let wrappedContract: ContractBaseMock
let accounts: NvmAccount[]

describe('ContractWrapperBase', () => {
  before(async () => {
    const deployer = await TestContractHandler.prepareContracts()
    const nevermined = deployer.nevermined

    wrappedContract = new ContractBaseMock('NeverminedToken')
    accounts = nevermined.accounts.list()
    wrappedContract = new ContractBaseMock('NeverminedToken')
    await wrappedContract.initMock((nevermined as any).instanceConfig)
  })

  describe('#call()', () => {
    it('should fail to call on an unknown contract function', (done) => {
      wrappedContract.callMock('balanceOfxxx', []).catch(() => {
        done()
      })
    })

    it('should fail to call on an contract function with wrong set of parameters', (done) => {
      wrappedContract.callMock('balanceOf', []).catch(() => {
        done()
      })
    })

    it('should fail to call on an unknown contract function', (done) => {
      wrappedContract
        .sendMock('balanceOfxxx', NvmAccount.fromAddress('0x00'), ['0x00'])
        .catch(() => {
          done()
        })
    })

    it('should fail to call on an contract function with wrong set of parameters', (done) => {
      wrappedContract.sendMock('approve', NvmAccount.fromAddress('0x00'), []).catch(() => {
        done()
      })
    })
  })

  describe('#send()', () => {
    it('should fail to call on an unknown contract function', (done) => {
      wrappedContract
        .sendMock('transferxxx', NvmAccount.fromAddress(accounts[0].getId()), [])
        .catch(() => {
          done()
        })
    })
  })

  describe('#getSignatureOfFunction()', () => {
    it('should a signature of the function', async () => {
      const sig = getSignatureOfFunction(wrappedContract.interface, 'name')
      assert(sig)
      assert(sig.type === 'function')
    })
  })

  describe('#getEventData()', () => {
    it('should fail on unknown event', (done) => {
      wrappedContract.events
        .getEventData({ eventName: 'crazyevent', filterJsonRpc: {} })
        .catch(() => {
          done()
        })
    })
  })
})
