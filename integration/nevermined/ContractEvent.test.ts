import { Account, Nevermined } from '../../src'
import { config } from '../config'
import { assert } from 'chai'
import { ContractEvent } from '../../src/events'
import { sleep } from '../utils/utils'
import { ethers } from 'ethers'

describe('ContractEvent', () => {
    let account: Account
    let nevermined: Nevermined
    let executeTransaction: () => Promise<any>

    before(async () => {
        nevermined = await Nevermined.getInstance({ ...config, graphHttpUri: undefined })
        ;[account] = await nevermined.accounts.list()

        await nevermined.keeper.dispenser.requestTokens(1, account.getId())

        executeTransaction = () =>
            nevermined.keeper.dispenser.requestTokens(1, account.getId())
    })

    it('should get a ContractEvent instance', async () => {
        assert.instanceOf(nevermined.keeper.token.events, ContractEvent)
    })

    it('should query for the event', async () => {
        const response = await nevermined.keeper.token.events.getEventData({
            filterJsonRpc: {
                to: account.getId()
            },
            result: {
                to: true,
                value: true
            },
            eventName: 'Transfer'
        })
        assert.strictEqual(
            ethers.utils.getAddress(response.pop().args.to),
            ethers.utils.getAddress(account.getId())
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
                    eventName: 'Transfer',
                    filterJsonRpc: { to: account.getId() },
                    fromBlock: 0,
                    toBlock: 'latest'
                }
            )
        })

        await Promise.all([executeTransaction()])

        await sleep(2000)
        validResolve = true

        await Promise.all([executeTransaction()])

        await waitUntilEvent

        subscription.unsubscribe()
    })

    it('should listen to event only once', async () => {
        const to = account.getId()
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

        await sleep(2000)
        canBeRejected = true

        await executeTransaction()

        await waitUntilEvent
    })

    it('should get the event like a promise', async () => {
        const to = account.getId()
        const event = nevermined.keeper.token.events

        const waitUntilEvent = event.once(events => events, {
            eventName: 'Transfer',
            filterJsonRpc: { to }
        })

        await sleep(400)

        await executeTransaction()

        await waitUntilEvent
    })
})
