import { assert } from 'chai'
import { EventHandler } from '../../src/keeper/EventHandler'
import { ContractEventSubscription } from '../../src/keeper/ContractEvent'
import { Ocean } from '../../src/ocean/Ocean'
import config from '../config'
import TestContractHandler from './TestContractHandler'

describe('ContractEvent', () => {
    let ocean: Ocean
    let account: string
    let eventHandler: EventHandler
    let executeTransaction: () => Promise<any>

    beforeEach(async () => {
        await TestContractHandler.prepareContracts()
        ocean = await Ocean.getInstance(config)
        eventHandler = new EventHandler((ocean as any).instanceConfig)
        account = (await ocean.accounts.list())[0].getId()

        executeTransaction = () => ocean.keeper.dispenser.requestTokens(10, account)
    })

    describe('#subscribe()', () => {
        it('should be able to listen to events', async () => {
            const event = eventHandler.getEvent(ocean.keeper.token, 'Transfer', {
                to: account
            })
            let validResolve = false
            let subscription: ContractEventSubscription

            const waitUntilEvent = new Promise(resolve => {
                subscription = event.subscribe(events => {
                    assert.isDefined(events)
                    assert.lengthOf(events, 2)
                    if (validResolve) {
                        resolve()
                    }
                })
            })

            await Promise.all([executeTransaction(), executeTransaction()])

            await new Promise(resolve => setTimeout(resolve, 2000))
            validResolve = true

            await Promise.all([executeTransaction(), executeTransaction()])

            await waitUntilEvent

            subscription.unsubscribe()
        })
    })

    describe('#once()', () => {
        it('should listen to event only once', async () => {
            const to = account
            const event = eventHandler.getEvent(ocean.keeper.token, 'Transfer', { to })
            let canBeRejected = false

            const waitUntilEvent = new Promise((resolve, reject) => {
                event.once(() => {
                    if (canBeRejected) {
                        reject(new Error(''))
                    }
                    setTimeout(resolve, 600)
                })
            })

            await executeTransaction()

            await new Promise(resolve => setTimeout(resolve, 2000))
            canBeRejected = true

            await executeTransaction()

            await waitUntilEvent
        })

        it('should get the event like a promise', async () => {
            const to = account
            const event = eventHandler.getEvent(ocean.keeper.token, 'Transfer', { to })

            const waitUntilEvent = event.once()

            await new Promise(resolve => setTimeout(resolve, 400))

            await executeTransaction()

            await waitUntilEvent
        })
    })
})
