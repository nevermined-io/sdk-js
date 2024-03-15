import { Account, Nevermined, generateId, getAddress } from '../../src'
import { config } from '../config'
import { assert } from 'chai'
import { awaitTimeout, mineBlocks, sleep } from '../utils/utils'

describe('SubgraphEvent', () => {
  let account: Account
  let nevermined: Nevermined
  let executeTransaction: () => Promise<any>

  before(async function () {
    if (!config.graphHttpUri) {
      this.skip()
    }
    nevermined = await Nevermined.getInstance(config)
    ;[account] = await nevermined.accounts.list()

    await nevermined.keeper.dispenser.requestTokens(1, account.getId())

    executeTransaction = () => nevermined.keeper.dispenser.requestTokens(1, account.getId())
  })

  it('should query for the event', async () => {
    const response = await nevermined.keeper.token.events.getEventData({
      eventName: 'Transfer',
      filterSubgraph: {
        where: {
          to: account.getId(),
        },
        orderBy: 'blockNumber',
        orderDirection: 'desc',
      },
      result: {
        to: true,
        value: true,
        blockNumber: true,
        blockTimestamp: true,
        transactionHash: true,
      },
    })

    const event = response[0]
    assert.strictEqual(getAddress(event.to), getAddress(account.getId()))
  })

  it('should be able to listen to events', async () => {
    let validResolve = false
    let subscription

    const waitUntilEvent = new Promise((resolve) => {
      subscription = nevermined.keeper.token.events.subscribe(
        (events) => {
          assert.isDefined(events)
          assert.isAtLeast(events.length, 1)
          if (validResolve) {
            resolve(0)
          }
        },
        {
          eventName: 'Transfer',
          filterSubgraph: {
            where: {
              to: account.getId(),
            },
          },
          result: {
            to: true,
            value: true,
          },
        },
      )
    })

    await Promise.all([executeTransaction()])

    // TODO: See if we can remove this
    await sleep(2000)
    validResolve = true

    await Promise.all([executeTransaction()])

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
          canBeRejected = true
          setTimeout(resolve, 600)
        },
        {
          eventName: 'Transfer',
          filterSubgraph: {
            where: {
              to: account.getId(),
            },
          },
          result: {
            to: true,
            value: true,
          },
        },
      )
    })

    await executeTransaction()

    // TODO: See if we can remove this
    await sleep(2000)
    await executeTransaction()
    await waitUntilEvent

    // TODO: See if we can remove this
    await sleep(2000)
  })

  it('should get the event like a promise', async () => {
    const event = nevermined.keeper.token.events

    const waitUntilEvent = event.once((events) => events, {
      eventName: 'Transfer',
      filterSubgraph: {
        where: {
          to: account.getId(),
        },
      },
      result: {
        to: true,
        value: true,
      },
    })

    // TODO: See if we can remove this
    await sleep(400)

    await executeTransaction()

    await waitUntilEvent
  })

  it('once should not return unless there is an event', async () => {
    // non-existent provId
    const provId = `0x${generateId()}`

    const resultPromise = nevermined.keeper.didRegistry.events.once((e) => e, {
      eventName: 'ProvenanceAttributeRegistered',
      filterSubgraph: { where: { provId: provId } },
      result: {
        id: true,
        provId: true,
        _did: true,
        _agentId: true,
        _activityId: true,
        _relatedDid: true,
        _agentInvolvedId: true,
        _method: true,
        _attributes: true,
        _blockNumberUpdated: true,
      },
    })

    await mineBlocks(nevermined, account, 1)
    await assert.isRejected(Promise.race([resultPromise, awaitTimeout(2000)]), /Timeout/)
  })
})
