import {
    EventEmitter,
    EventOptions,
    EventResult,
    NeverminedEvent
} from '../events/NeverminedEvent'
import * as subgraphs from '@nevermined-io/subgraphs'
import axios from 'codegen-graph-ts/build/src/lib/axios'
import generateGql from 'codegen-graph-ts/build/src/lib/gql'
import ContractBase from '../keeper/contracts/ContractBase'
import { GraphError } from '../errors'

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
        if (!this.subgraph) {
            throw new GraphError(
                `Subgraph client for ${this.contract.contractName} is not implemented!`
            )
        }
        if (!this.subgraph[options.methodName]) {
            throw new GraphError(
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

    public async getBlockNumber(): Promise<number> {
        const result = await axios.post(
            `${this.graphHttpUri}/${this.contract.contractName}`,
            {
                query: generateGql('_meta', {}, { block: { number: true } })
            }
        )
        return result.data.data._meta.block.number
    }
}
