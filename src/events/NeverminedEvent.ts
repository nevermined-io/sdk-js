import ContractBase from '../keeper/contracts/ContractBase'

export interface EventOptions {
    methodName?: string
    eventName?: string
    filterJsonRpc?: {}
    filterSubgraph?: {}
    result?: {}
    fromBlock?: number | string
    toBlock?: number | string
}

export interface EventEmitter {
    subscribe: Function
    unsubscribe: Function
}

export interface ContractEventSubscription {
    unsubscribe: () => void
}

export type EventResult = Promise<Array<any>>

export abstract class NeverminedEvent {
    protected eventEmitter: EventEmitter
    protected contract: ContractBase = null
    public abstract getEventData(options: EventOptions): EventResult
    public abstract getPastEvents(options: EventOptions): EventResult
    public abstract getBlockNumber(...args: any[]): Promise<number>

    protected constructor(contract: ContractBase, eventEmitter: EventEmitter) {
        this.contract = contract
        this.eventEmitter = eventEmitter
    }

    public subscribe(
        callback: (events: EventResult[]) => void,
        options: EventOptions
    ): ContractEventSubscription {
        const onEvent = async () => {
            const events = await this.getEventData(options)
            if (events.length) {
                callback(events)
            }
        }
        this.eventEmitter.subscribe(onEvent, () => this.getBlockNumber())
        return {
            unsubscribe: () => this.eventEmitter.unsubscribe(onEvent)
        }
    }

    public async once(
        callback?: (events: EventResult[]) => void,
        options?: EventOptions
    ) {
        // Check if the event already happened and return that instead
        // before subscribing
        const events = await this.getPastEvents(options)
        if (events.length) {
            callback(events)
            return new Promise(resolve => resolve(events))
        }

        return new Promise(resolve => {
            const subscription = this.subscribe(events => {
                subscription.unsubscribe()
                if (callback) {
                    callback(events)
                }
                resolve(events)
            }, options)
        })
    }
}
