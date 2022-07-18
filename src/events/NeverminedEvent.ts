import ContractBase from '../keeper/contracts/ContractBase'
import { Instantiable } from '../Instantiable.abstract'

export interface Filter {
    [key: string]: number | string | string[] | number[]
}
export interface EventOptions {
    methodName?: string
    eventName?: string
    filterJsonRpc?: Filter
    filterSubgraph?: Record<string, unknown>
    result?: Record<string, unknown>
    fromBlock?: number | string
    toBlock?: number | string
}

export interface EventEmitter {
    subscribe: (callback: () => Promise<void>, arg1: () => Promise<number>) => void
    unsubscribe: (arg0: () => Promise<void>) => void
}

export interface ContractEventSubscription {
    unsubscribe: () => void
}

export type EventResult = Promise<Array<any>>

export abstract class NeverminedEvent extends Instantiable {
    protected eventEmitter: EventEmitter
    protected contract: ContractBase = null
    public abstract getEventData(options: EventOptions): EventResult
    public abstract getPastEvents(options: EventOptions): EventResult
    public abstract getBlockNumber(...args: any[]): Promise<number>

    protected constructor(contract: ContractBase, eventEmitter: EventEmitter) {
        super()
        this.contract = contract
        this.eventEmitter = eventEmitter
    }

    public subscribe(
        callback: (events: EventResult[]) => void,
        options: EventOptions
    ): ContractEventSubscription {
        console.log('---- caling subscribe')
        const onEvent = async () => {
            console.log('>>>>>>> inside onEvent')
            const events = await this.getEventData(options)
            callback(events)
        }
        console.log('--- calling subscribe on the eventEmitter')
        this.eventEmitter.subscribe(onEvent, () => this.getBlockNumber())
        return {
            unsubscribe: () => this.eventEmitter.unsubscribe(onEvent)
        }
    }

    public async once(
        callback?: (events: EventResult[]) => void,
        options?: EventOptions
    ): Promise<EventResult> {
        // Check if the event already happened and return that instead
        // before subscribing
        console.log('----- calling once')
        const events = await this.getPastEvents(options)
        if (events.length) {
            callback(events)
            return new Promise(resolve => resolve(events))
        }
        console.log('------ calling once returning promise')
        return new Promise(resolve => {
            const subscription = this.subscribe(events => {
                if (events.length) {
                    subscription.unsubscribe()
                }

                if (callback) {
                    callback(events)
                }
                resolve(events)
            }, options)
        })
    }
}
