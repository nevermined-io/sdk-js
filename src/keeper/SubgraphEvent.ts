import {
    EventEmitter,
    EventOptionsBoth,
    NeverminedEvent
} from '../events/NeverminedEvent'
import { InstantiableConfig } from '../Instantiable.abstract'
import { Config } from '../sdk'
import ContractBase from './contracts/ContractBase'
import { EventHandler } from './EventHandler'

export class SubgraphEvent extends NeverminedEvent {
    private graphHttpUri: string
    public static getInstance(
        contract: ContractBase,
        eventEmitter: EventEmitter,
        graphHttpUri: string
    ): SubgraphEvent {
        const instance = new SubgraphEvent(contract, eventEmitter)
        instance.graphHttpUri = graphHttpUri

        return instance
    }

    public async getEventData(options: EventOptionsBoth) {
        if (!this.contract.events[options.methodName]) {
            throw new Error(
                `Method "${options.methodName}" not found on subgraph "neverminedio/${this.contract.contractName}"`
            )
        }
        return this.contract.events[options.methodName](
            `${this.graphHttpUri}/${this.contract.contractName}`,
            options.filter,
            options.result
        )
    }

    public async getPastEvents(options: EventOptionsBoth) {
        return this.getEventData(options)
    }
}
