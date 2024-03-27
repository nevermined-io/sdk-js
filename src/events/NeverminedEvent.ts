import { ContractBase, Web3Clients } from '@/sdk'

export abstract class NeverminedEvent {
  // extends Instantiable {
  protected eventEmitter: EventEmitter
  protected contract: ContractBase = null
  public abstract getEventData(options: EventOptions): EventResult
  public abstract getPastEvents(options: EventOptions, client: Web3Clients): EventResult
  public abstract getBlockNumber(...args: any[]): Promise<bigint>

  protected constructor(contract: ContractBase, eventEmitter: EventEmitter) {
    // super()
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
    client: Web3Clients,
    callback?: (events: EventResult[]) => void,
    options?: EventOptions,
  ): Promise<EventResult> {
    // Check if the event already happened and return that instead
    // before subscribing
    const events = await this.getPastEvents(options, client)
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
