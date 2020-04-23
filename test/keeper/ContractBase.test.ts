import { assert } from 'chai'
import Account from '../../src/ocean/Account'
import { Ocean } from '../../src/ocean/Ocean'
import config from '../config'
import ContractBaseMock from '../mocks/ContractBase.Mock'
import TestContractHandler from './TestContractHandler'

const wrappedContract = new ContractBaseMock('OceanToken')
let accounts: Account[]

describe('ContractWrapperBase', () => {
    before(async () => {
        await TestContractHandler.prepareContracts()
        const ocean: Ocean = await Ocean.getInstance(config)
        accounts = await ocean.accounts.list()
        await wrappedContract.initMock((ocean as any).instanceConfig)
    })

    describe('#call()', () => {
        it('should fail to call on an unknown contract function', done => {
            wrappedContract.callMock('balanceOfxxx', []).catch(() => {
                done()
            })
        })

        it('should fail to call on an contract function with wrong set of parameters', done => {
            wrappedContract.callMock('balanceOf', []).catch(() => {
                done()
            })
        })

        it('should fail to call on an unknown contract function', done => {
            wrappedContract.sendMock('balanceOfxxx', '0x00', ['0x00']).catch(() => {
                done()
            })
        })

        it('should fail to call on an contract function with wrong set of parameters', done => {
            wrappedContract.sendMock('approve', '0x000', []).catch(() => {
                done()
            })
        })
    })

    describe('#send()', () => {
        it('should fail to call on an unknown contract function', done => {
            wrappedContract.sendMock('transferxxx', accounts[0].getId(), []).catch(() => {
                done()
            })
        })
    })

    describe('#getSignatureOfMethod()', () => {
        it('should a signature of the function', async () => {
            const sig = wrappedContract.getSignatureOfMethod('name')
            assert(sig)
            assert(typeof sig === 'string')
            assert(sig.startsWith('0x'))
        })
    })

    describe('#getEventData()', () => {
        it('should fail on unknown event', done => {
            wrappedContract.getEventData('crazyevent', {}).catch(() => {
                done()
            })
        })
    })
})
