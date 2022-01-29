import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import ContractBase from '../keeper/contracts/ContractBase'
import { EventHandler } from '../keeper/EventHandler'

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

export type EventOptions = EventOptionsSubgraph | EventOptionsJsonRpc | EventOptionsBoth

export abstract class NeverminedEvent extends Instantiable {
    protected eventEmitter?: EventEmitter = null
    constructor(config: InstantiableConfig, protected contract: ContractBase) {
        super()
        this.setInstanceConfig(config)
    }

    // public static getInstance(config: InstantiableConfig, contract: ContractBase): any {
    //     throw new Error('Should only be implemented in the childs class')
    // }

    public abstract getEventData(options: EventOptions)
    public abstract getPastEvents(options: EventOptions)
    public abstract subscribe(callback: (events: any[]) => void, options: EventOptions)
}
