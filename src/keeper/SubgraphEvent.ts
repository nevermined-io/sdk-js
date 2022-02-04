import {
    EventEmitter,
    EventOptions,
    EventResult,
    NeverminedEvent
} from '../events/NeverminedEvent'
import { InstantiableConfig } from '../Instantiable.abstract'
import { Config } from '../sdk'
import ContractBase from './contracts/ContractBase'
import { EventHandler } from './EventHandler'
import * as subgraphs from '@nevermined-io/subgraphs'

export class SubgraphEvent extends NeverminedEvent {
    private graphHttpUri: string
    public subgraph
    public static getInstance(
        contract: ContractBase,
        eventEmitter: EventEmitter,
        graphHttpUri: string
    ): SubgraphEvent {
        const instance = new SubgraphEvent(contract, eventEmitter)
        instance.graphHttpUri = graphHttpUri
        instance.subgraph = subgraphs[contract.contractName]

        return instance
    }

    public async getEventData(options: EventOptions): EventResult {
        console.log(
            options.methodName,
            options.filterSubgraph,
            this.contract.contractName
        )
        if (!this.subgraph[options.methodName]) {
            throw new Error(
                `Method "${options.methodName}" not found on subgraph "neverminedio/${this.contract.contractName}"`
            )
        }
        return this.subgraph[options.methodName](
            `${this.graphHttpUri}/${this.contract.contractName}`,
            options.filterSubgraph,
            options.result
        )
    }

    public async getPastEvents(options: EventOptions): EventResult {
        return this.getEventData(options)
    }
}
