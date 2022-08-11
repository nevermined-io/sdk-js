import { assert } from 'chai'
import Account from '../../src/nevermined/Account'
import { Nevermined } from '../../src/nevermined/Nevermined'
import config from '../config'
import ContractBaseMock from '../mocks/ContractBase.Mock'
import TestContractHandler from './TestContractHandler'

let wrappedContract: ContractBaseMock
let accounts: Account[]

describe('ContractWrapperBase', () => {
    before(async () => {
        await TestContractHandler.prepareContracts()
        const nevermined: Nevermined = await Nevermined.getInstance(config)
        wrappedContract = new ContractBaseMock('NeverminedToken')
        accounts = await nevermined.accounts.list()
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
            wrappedContract.sendMock('balanceOfxxx', '0x00', ['0x00']).catch(() => {
                done()
            })
        })

        it('should fail to call on an contract function with wrong set of parameters', (done) => {
            wrappedContract.sendMock('approve', '0x000', []).catch(() => {
                done()
            })
        })
    })

    describe('#send()', () => {
        it('should fail to call on an unknown contract function', (done) => {
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
