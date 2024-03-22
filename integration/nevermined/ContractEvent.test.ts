import { NvmAccount, Nevermined, generateId, getChecksumAddress } from '../../src'
import { config } from '../config'
import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ContractEvent } from '../../src/events'
import { mineBlocks, awaitTimeout } from '../utils/utils'

chai.use(chaiAsPromised)

describe('ContractEvent', () => {
  let account: NvmAccount
  let account2: NvmAccount
  let account3: NvmAccount
  let account4: NvmAccount
  let account5: NvmAccount
  let account6: NvmAccount
  let nevermined: Nevermined

  before(async () => {
    nevermined = await Nevermined.getInstance({ ...config, graphHttpUri: undefined })
    ;[account, account2, account3, account4, account5, account6] = await nevermined.accounts.list()

    await nevermined.accounts.requestTokens(account, 1n)    
  })

  it('should get a ContractEvent instance', async () => {
    assert.instanceOf(nevermined.keeper.token.events, ContractEvent)
  })

  it('should query for the event', async () => {
    const response = await nevermined.keeper.token.events.getEventData({
      filterJsonRpc: {
        to: account.getId(),
      },
      result: {
        to: true,
        value: true,
      },
      eventName: 'Transfer',
    })
    assert.strictEqual(getChecksumAddress(response.pop().args.to), getChecksumAddress(account.getId()))
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
          filterJsonRpc: { to: account.getId() },
          fromBlock: 0n,
          toBlock: 'latest',
        },
      )
    })

    // await Promise.all([executeTransaction()])

    await nevermined.accounts.requestTokens(account2, 1n)    


    validResolve = true

    await nevermined.accounts.requestTokens(account3, 1n)    
    // await Promise.all([executeTransaction()])

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
            to,
          },
        },
      )
    })

    await nevermined.accounts.requestTokens(account4, 1n)    
    canBeRejected = true

    await nevermined.accounts.requestTokens(account5, 1n)    

    await waitUntilEvent
  })

  it('should get the event like a promise', async () => {
    const to = account.getId()
    const event = nevermined.keeper.token.events

    const waitUntilEvent = event.once((events) => events, {
      eventName: 'Transfer',
      filterJsonRpc: { to },
    })
    await nevermined.accounts.requestTokens(account6, 1n)    
    // await executeTransaction()

    await waitUntilEvent
  })

  it('once should not return unless there is an event', async () => {
    // non-existent provId
    const provId = `0x${generateId()}`

    const resultPromise = nevermined.keeper.didRegistry.events.once((e) => e, {
      eventName: 'ProvenanceAttributeRegistered',
      filterJsonRpc: { provId },
    })

    await mineBlocks(nevermined, account, 1)
    await assert.isRejected(Promise.race([resultPromise, awaitTimeout(2000)]), /Timeout/)
  })
})
