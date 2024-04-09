import { Instantiable } from '../Instantiable.abstract'
import { ContractBase } from '../keeper/contracts/ContractBase'
import {
  EventEmitter,
  EventOptions,
  EventResult,
  ContractEventSubscription,
} from '../types/EventTypes'

export abstract class NeverminedEvent extends Instantiable {
  protected eventEmitter: EventEmitter
  protected contract: ContractBase = null
  public abstract getEventData(options: EventOptions): EventResult
  public abstract getPastEvents(options: EventOptions): EventResult
  public abstract getBlockNumber(...args: any[]): Promise<bigint>

  protected constructor(contract: ContractBase, eventEmitter: EventEmitter) {
    super()
    this.contract = contract
    this.eventEmitter = eventEmitter
  }

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

  public async once(
    callback?: (events: EventResult[]) => void,
    options?: EventOptions,
  ): Promise<EventResult> {
    // Check if the event already happened and return that instead
    // before subscribing
    const events = await this.getPastEvents(options)
    if (events.length) {
      callback(events)
      return new Promise((resolve) => resolve(events))
    }
    return new Promise((resolve) => {
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
