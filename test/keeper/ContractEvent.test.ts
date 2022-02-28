import { assert } from 'chai'
import { Nevermined } from '../../src/nevermined/Nevermined'
import config from '../config'
import TestContractHandler from './TestContractHandler'
import { ContractEventSubscription } from '../../src/events/NeverminedEvent'
import { Account } from '../../src'

describe('ContractEvent', () => {
    let nevermined: Nevermined
    let account1: Account
    let account2: Account
    let account3: Account

    beforeEach(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        ;[account1, account2, account3] = await nevermined.accounts.list()
    })

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 50))
    })

    describe('#subscribe()', () => {
        it('should be able to listen to events', async () => {
            let subscription: ContractEventSubscription
            const waitForEvents = new Promise(resolve => {
                subscription = nevermined.keeper.token.events.subscribe(
                    events => {
                        assert.isDefined(events)
                        assert.isAtLeast(events.length, 1)

                        // we expect 3 events
                        if (events.length == 3) {
                            resolve(0)
                        }
                    },
                    {
                        eventName: 'Transfer',
                        filterJsonRpc: {},
                        fromBlock: 0,
                        toBlock: 'latest'
                    }
                )
            })
            await nevermined.keeper.dispenser.requestTokens(1, account1.getId())
            await nevermined.keeper.dispenser.requestTokens(2, account2.getId())
            await nevermined.keeper.dispenser.requestTokens(3, account3.getId())

            await waitForEvents
            subscription.unsubscribe()
        })
    })

    describe('#once()', () => {
        it('should listen to event only once', async () => {
            const eventsPromise = nevermined.keeper.token.events.once(e => e, {
                eventName: 'Transfer',
                filterJsonRpc: { to: account1.getId() },
                fromBlock: 0,
                toBlock: 'latest'
            })
            await nevermined.keeper.dispenser.requestTokens(1, account1.getId())

            const events: any = await eventsPromise
            assert.equal(events.length, 1)
        })
    })
})
