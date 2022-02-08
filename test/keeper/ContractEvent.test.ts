import { assert } from 'chai'
import { EventHandler } from '../../src/keeper/EventHandler'
import { ContractEvent } from '../../src/keeper/ContractEvent'
import { Nevermined } from '../../src/nevermined/Nevermined'
import config from '../config'
import TestContractHandler from './TestContractHandler'
import { ContractEventSubscription } from '../../src/events/NeverminedEvent'
import Web3Provider from '../../src/keeper/Web3Provider'
import Web3 from 'web3'

describe('ContractEvent', () => {
    let nevermined: Nevermined
    let account: string
    let eventHandler: EventHandler
    let web3: Web3
    let executeTransaction: () => Promise<any>

    beforeEach(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        web3 = Web3Provider.getWeb3(config)
        eventHandler = new EventHandler((nevermined as any).instanceConfig)
        account = (await nevermined.accounts.list())[0].getId()

        executeTransaction = () => nevermined.keeper.dispenser.requestTokens(1, account)
    })

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 50))
    })

    describe('#subscribe()', () => {
        it('should be able to listen to events', async () => {
            const event = ContractEvent.getInstance(
                nevermined.keeper.token,
                eventHandler,
                web3
            )
            let validResolve = false
            let subscription: ContractEventSubscription

            const waitUntilEvent = new Promise(resolve => {
                subscription = event.subscribe(
                    events => {
                        assert.isDefined(events)
                        assert.isAtLeast(events.length, 1)
                        if (validResolve) {
                            resolve(0)
                        }
                    },
                    {
                        eventName: 'Transfer',
                        filterJsonRpc: { to: account },
                        fromBlock: 0,
                        toBlock: 'latest'
                    }
                )
            })

            await Promise.all([executeTransaction(), executeTransaction()])

            await new Promise(resolve => setTimeout(resolve, 2000))
            validResolve = true

            await Promise.all([executeTransaction(), executeTransaction()])

            await waitUntilEvent

            subscription.unsubscribe()
        })
    })

    // See https://github.com/nevermined-io/sdk-js/issues/141
    describe.skip('#once()', () => {
        it('should listen to event only once', async () => {
            const to = account
            const event = nevermined.keeper.token.events
            let canBeRejected = false

            const waitUntilEvent = new Promise((resolve, reject) => {
                event.once(
                    () => {
                        if (canBeRejected) {
                            reject(new Error(''))
                        }
                        setTimeout(resolve, 600)
                    },
                    {
                        eventName: 'Transfer',
                        filterJsonRpc: {
                            to
                        }
                    }
                )
            })

            await executeTransaction()

            await new Promise(resolve => setTimeout(resolve, 2000))
            canBeRejected = true

            await executeTransaction()

            await waitUntilEvent
        })

        it('should get the event like a promise', async () => {
            const to = account
            const event = nevermined.keeper.token.events

            const waitUntilEvent = event.once(undefined, {
                eventName: 'Transfer',
                filterJsonRpc: { to }
            })

            await new Promise(resolve => setTimeout(resolve, 400))

            await executeTransaction()

            await waitUntilEvent
        })
    })
})
