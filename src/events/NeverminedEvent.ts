import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import ContractBase from '../keeper/contracts/ContractBase'
import { EventHandler } from '../keeper/EventHandler'
import { Config } from '../sdk'

export interface EventOptionsSubgraph {
    methodName: string
    filter: {}
    result: {}
}

export interface EventOptionsJsonRpc {
    eventName: string
    filter: { [key: string]: any }
    fromBlock?: number | string
    toBlock?: number | string
}

export interface EventOptionsBoth {
    methodName?: string
    eventName?: string
    filter?: {}
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

export type EventOptions = EventOptionsSubgraph | EventOptionsJsonRpc | EventOptionsBoth

export abstract class NeverminedEvent {
    protected eventEmitter: EventEmitter
    protected contract: ContractBase = null
    public abstract getEventData(options: EventOptions)
    public abstract getPastEvents(options: EventOptions)

    protected constructor(contract: ContractBase, eventEmitter: EventEmitter) {
        this.contract = contract
        this.eventEmitter = eventEmitter
    }

    public subscribe(
        callback: (events: any[]) => void,
        options: EventOptionsJsonRpc
    ): ContractEventSubscription {
        const onEvent = async (blockNumber: number) => {
            const events = await this.getEventData({
                eventName: options.eventName,
                filter: options.filter,
                fromBlock: blockNumber,
                toBlock: 'latest'
            })
            if (events.length) {
                callback(events)
            }
        }

        this.eventEmitter.subscribe(onEvent)
        return {
            unsubscribe: () => this.eventEmitter.unsubscribe(onEvent)
        }
    }

    public once(callback?: (events: any[]) => void, options?: EventOptionsJsonRpc) {
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
