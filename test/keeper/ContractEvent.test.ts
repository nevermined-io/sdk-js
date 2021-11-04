import { assert } from 'chai'
import { EventHandler } from '../../src/keeper/EventHandler'
import { ContractEventSubscription } from '../../src/keeper/ContractEvent'
import { Nevermined } from '../../src/nevermined/Nevermined'
import config from '../config'
import TestContractHandler from './TestContractHandler'

describe('ContractEvent', () => {
    let nevermined: Nevermined
    let account: string
    let eventHandler: EventHandler
    let executeTransaction: () => Promise<any>

    beforeEach(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        eventHandler = new EventHandler((nevermined as any).instanceConfig)
        account = (await nevermined.accounts.list())[0].getId()

        executeTransaction = () => nevermined.keeper.dispenser.requestTokens(1, account)
    })

    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 50))
    })

    describe('#subscribe()', () => {
        it('should be able to listen to events', async () => {
            const event = eventHandler.getEvent(nevermined.keeper.token, 'Transfer', {
                to: account
            })
            let validResolve = false
            let subscription: ContractEventSubscription

            const waitUntilEvent = new Promise(resolve => {
                subscription = event.subscribe(events => {
                    assert.isDefined(events)
                    assert.lengthOf(events, 2)
                    if (validResolve) {
                        resolve(0)
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
            const event = eventHandler.getEvent(nevermined.keeper.token, 'Transfer', {
                to
            })
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
            const event = eventHandler.getEvent(nevermined.keeper.token, 'Transfer', {
                to
            })

            const waitUntilEvent = event.once()

            await new Promise(resolve => setTimeout(resolve, 400))

            await executeTransaction()

            await waitUntilEvent
        })
    })
})
