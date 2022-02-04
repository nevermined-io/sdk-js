import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import ContractBase from '../keeper/contracts/ContractBase'
import { EventHandler } from '../keeper/EventHandler'
import { Config } from '../sdk'

// export interface EventOptionsSubgraph {
//     methodName: string
//     filterSubgraph: {}
//     result: {}
// }

// export interface EventOptionsJsonRpc {
//     eventName: string
//     filterJsonRpc: { [key: string]: any }
//     fromBlock?: number | string
//     toBlock?: number | string
// }

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

// export type EventOptions = EventOptionsSubgraph | EventOptionsJsonRpc | EventOptionsBoth

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
        const onEvent = async (blockNumber: number) => {
            const events = await this.getEventData(options)
            if (events.length) {
                callback(events)
            }
        }
        // TODO: Change this
        this.eventEmitter.subscribe(onEvent, () => this.getBlockNumber())
        return {
            unsubscribe: () => this.eventEmitter.unsubscribe(onEvent)
        }
    }

    public once(callback?: (events: EventResult[]) => void, options?: EventOptions) {
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
