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
    private networkName: string
    public static getInstance(
        contract: ContractBase,
        eventEmitter: EventEmitter,
        graphHttpUri: string,
        networkName: string
    ): SubgraphEvent {
        const instance = new SubgraphEvent(contract, eventEmitter)
        instance.graphHttpUri = graphHttpUri
        instance.subgraph = subgraphs[contract.contractName]
        instance.networkName = networkName.toLowerCase()

        return instance
    }

    public async getEventData(options: EventOptions): EventResult {
        if (process.env.GRAPH_DELAY) {
            await new Promise((resolve) => setTimeout(resolve, 3000))
        }
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
            await this.subgraphUrl(),
            options.filterSubgraph,
            options.result
        )
    }

    public async getPastEvents(options: EventOptions): EventResult {
        return this.getEventData(options)
    }

    public async getBlockNumber(): Promise<number> {
        const result = await axios.post(await this.subgraphUrl(), {
            query: generateGql('_meta', {}, { block: { number: true } })
        })
        return result.data.data._meta.block.number
    }

    private async subgraphUrl(): Promise<string> {
        const [majorVersion] = this.contract.version.split('.')
        const contractName = this.contract.contractName.toLowerCase()
        return `${this.graphHttpUri}${this.networkName}${majorVersion}${contractName}`
    }
}
