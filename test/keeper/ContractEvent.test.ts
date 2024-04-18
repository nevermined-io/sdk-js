import { assert } from 'chai'
import TestContractHandler from './TestContractHandler'
import { NvmAccount } from '../../src/models/NvmAccount'
import { Nevermined } from '../../src/nevermined/Nevermined'

describe('ContractEvent', () => {
  let nevermined: Nevermined
  let account1: NvmAccount
  let account2: NvmAccount
  let account3: NvmAccount
  let account4: NvmAccount

  before(async () => {
    const deployer = await TestContractHandler.prepareContracts()
    nevermined = deployer.nevermined
    ;[account1, account2, account3, account4] = nevermined.accounts.list()
  })

  describe('#subscribe()', () => {
    it('should be able to listen to events', async () => {
      let subscription
      const fromBlock = await nevermined.client.public.getBlockNumber()
      const waitForEvents = new Promise((resolve) => {
        subscription = nevermined.keeper.token.events.subscribe(
          (events) => {
            assert.isDefined(events)
            assert.isAtLeast(events.length, 1)

            // we expect 3 events
            if (events.length == 3) {
              resolve(0)
            }
          },
          {
            eventName: 'Transfer',
            filterJsonRpc: {
              to: [account1.getId(), account2.getId(), account3.getId()],
            },
            fromBlock: fromBlock,
            toBlock: 'latest',
          },
        )
      })
      await nevermined.keeper.dispenser.requestTokens(1, account1)
      await nevermined.keeper.dispenser.requestTokens(2, account2)
      await nevermined.keeper.dispenser.requestTokens(3, account3)

      await waitForEvents
      subscription.unsubscribe()
    })
  })

  describe('#once()', () => {
    it('should listen to event only once', async () => {
      const fromBlock = await nevermined.client.public.getBlockNumber()

      const eventsPromise = nevermined.keeper.token.events.once((e) => e, {
        eventName: 'Transfer',
        filterJsonRpc: { to: account4.getId() },
        fromBlock: fromBlock,
        toBlock: 'latest',
      })
      await nevermined.keeper.dispenser.requestTokens(1, account4)

      const events: any = await eventsPromise
      assert.equal(events.length, 1)
    })
  })
})
