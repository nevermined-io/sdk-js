import { Account, Nevermined } from '../../src'
import { config } from '../config'
import { assert } from 'chai'
import Web3 from 'web3'

describe('SubgraphEvent', () => {
    let account: Account
    let nevermined: Nevermined
    let executeTransaction: () => Promise<any>

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
            ;[account] = await nevermined.accounts.list()

        await nevermined.keeper.dispenser.requestTokens(1, account.getId())

        executeTransaction = () =>
            nevermined.keeper.dispenser.requestTokens(1, account.getId())
    })

    it('should query for the event', async () => {
        const response = await nevermined.keeper.token.events.getEventData({
            methodName: 'getTransfers',
            filterSubgraph: {
                where: {
                    to: account.getId()
                }
            },
            result: {
                to: true,
                value: true
            }
        })
        assert.strictEqual(
            Web3.utils.toChecksumAddress(response.pop().to),
            Web3.utils.toChecksumAddress(account.getId())
        )
    })

    it('should be able to listen to events', async () => {
        let validResolve = false
        let subscription

        const waitUntilEvent = new Promise(resolve => {
            subscription = nevermined.keeper.token.events.subscribe(
                events => {
                    assert.isDefined(events)
                    assert.isAtLeast(events.length, 1)
                    if (validResolve) {
                        resolve(0)
                    }
                },
                {
                    methodName: 'getTransfers',
                    filterSubgraph: {
                        where: {
                            to: account.getId()
                        }
                    },
                    result: {
                        to: true,
                        value: true
                    }
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

    it('should listen to event only once', async () => {
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
                    methodName: 'getTransfers',
                    filterSubgraph: {
                        where: {
                            to: account.getId()
                        }
                    },
                    result: {
                        to: true,
                        value: true
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
        const event = nevermined.keeper.token.events

        const waitUntilEvent = event.once(events => events, {
            methodName: 'getTransfers',
            filterSubgraph: {
                where: {
                    to: account.getId()
                }
            },
            result: {
                to: true,
                value: true
            }
        })

        await new Promise(resolve => setTimeout(resolve, 400))

        await executeTransaction()

        await waitUntilEvent
    })
})
