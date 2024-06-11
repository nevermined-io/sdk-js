import { Instantiable } from '../Instantiable.abstract'
import { ContractBase } from '../keeper/contracts/ContractBase'
import {
  EventEmitter,
  EventOptions,
  EventResult,
  ContractEventSubscription,
} from '../types/EventTypes'

/**
 * Abstract class to handle Smart Contract events
 */
export abstract class NeverminedEvent extends Instantiable {
  protected eventEmitter: EventEmitter
  protected contract: ContractBase
  public abstract getEventData(options: EventOptions): EventResult
  public abstract getPastEvents(options: EventOptions): EventResult
  public abstract getBlockNumber(...args: any[]): Promise<bigint>

  /**
   * Initializes the NeverminedEvent instance
   * @param contract contract instance
   * @param eventEmitter events emitter implementation
   * @returns the NeverminedEvent instance
   */
  protected constructor(contract: ContractBase, eventEmitter: EventEmitter) {
    super()
    this.contract = contract
    this.eventEmitter = eventEmitter
  }

  /**
   * Subscribes to a contract event
   * @param callback function called when the event is triggered
   * @param options event filter options
   * @returns {@link ContractEventSubscription}
   */
  public subscribe(
    callback: (events: EventResult[]) => void,
    options: EventOptions,
  ): ContractEventSubscription {
    const onEvent = async () => {
      const events = await this.getEventData(options)
      callback(events)
    }

    this.eventEmitter.subscribe(onEvent, () => this.getBlockNumber())
    return {
      unsubscribe: () => this.eventEmitter.unsubscribe(onEvent),
    }
  }

  /**
   * Subscribes to a contract event and waits for the first event to happen
   * @param callback function called when the event is triggered
   * @param options event filter options
   * @param timeout maximum time to wait for the event to happen
   * @returns Promise with the event data
   */
  public async once(
    callback: (events: EventResult[]) => void,
    options: EventOptions,
    timeout = 15_000,
  ): Promise<EventResult> {
    // Check if the event already happened and return that instead
    // before subscribing
    const events = await this.getPastEvents(options)
    if (events.length) {
      callback(events)
      return new Promise((resolve) => resolve(events))
    }
    return new Promise((resolve) => {
      if (timeout > 0) setTimeout(resolve, timeout)
      const subscription = this.subscribe((events) => {
        if (events.length) {
          subscription.unsubscribe()
        }

        if (callback && events.length) {
          callback(events)
          resolve(events)
        }
      }, options)
    })
  }
}
