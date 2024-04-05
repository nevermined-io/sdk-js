import { assert, spy, use } from 'chai'
import spies from 'chai-spies'
import config from '../config'
import { Nevermined } from '@/nevermined/Nevermined'
import { EventHandler } from '@/events/EventHandler'

use(spies)

describe('EventHandler', () => {
  let nevermined: Nevermined
  let eventHandler: EventHandler

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    eventHandler = new EventHandler()
  })

  afterEach(() => {
    spy.restore()
  })

  describe('#subscribe()', () => {
    it('should subscribe to an event', async () => {
      const countBefore = eventHandler.count

      const subscription = eventHandler.subscribe(
        () => null,
        () => (nevermined as any).client.public.getBlockNumber(),
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
        () => (nevermined as any).client.public.getBlockNumber(),
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

      eventHandler.subscribe(callback, () => (nevermined as any).client.public.getBlockNumber())
      eventHandler.unsubscribe(callback)

      const countAfter = eventHandler.count
      assert.equal(countBefore, countAfter, 'The event seems not removed.')
    })
  })
})
