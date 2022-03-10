import { assert, expect, spy, use } from 'chai'
import spies from 'chai-spies'
import { EventHandler } from '../../src/events'
import { Nevermined } from '../../src/nevermined/Nevermined'
import config from '../config'

use(spies)

describe('EventHandler', () => {
    let nevermined: Nevermined
    let eventHandler: EventHandler

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        eventHandler = new EventHandler((nevermined as any).web3)
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#subscribe()', () => {
        it('should subscribe to an event', async () => {
            const countBefore = eventHandler.count

            const subscription = eventHandler.subscribe(
                () => null,
                (nevermined as any).web3.eth.getBlockNumber
            )
            assert.isDefined(subscription)

            const countAfter = eventHandler.count
            assert.equal(countBefore + 1, countAfter, 'The event seems not added.')

            subscription.unsubscribe()
        })

        it('should unsubscribe using the subscription', async () => {
            const countBefore = eventHandler.count

            const subscription = eventHandler.subscribe(
                () => null,
                (nevermined as any).web3.eth.getBlockNumber
            )
            assert.isDefined(subscription)

            subscription.unsubscribe()

            const countAfter = eventHandler.count
            assert.equal(countBefore, countAfter, 'The event seems not added.')
        })
    })

    describe('#unsubscribe()', () => {
        it('should unsubscribe from an event', async () => {
            const countBefore = eventHandler.count
            const callback = () => null

            eventHandler.subscribe(callback, (nevermined as any).web3.eth.getBlockNumber)
            eventHandler.unsubscribe(callback)

            const countAfter = eventHandler.count
            assert.equal(countBefore, countAfter, 'The event seems not removed.')
        })
    })

    describe('#checkBlock()', () => {
        it('should call the callback on each new block', async () => {
            let blockNumber = 100000000000
            const callbackSpy = spy()

            spy.on((nevermined as any).web3.eth, 'getBlockNumber', () => blockNumber)

            const subscription = eventHandler.subscribe(
                callbackSpy,
                (nevermined as any).web3.eth.getBlockNumber
            )

            await new Promise(resolve => setTimeout(resolve, 300))

            expect(callbackSpy).not.to.has.been.called()
            blockNumber++

            await new Promise(resolve => setTimeout(resolve, 300))

            expect(callbackSpy).to.has.been.called.with(blockNumber)

            subscription.unsubscribe()
        })
    })
})
