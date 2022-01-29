import { Instantiable } from '../Instantiable.abstract'
import { ContractEventSubscription } from './ContractEvent'
import ContractBase from './contracts/ContractBase'

export class SubgraphEvent extends Instantiable {
    constructor(private contract: ContractBase) {
        super()
    }

    public async getEventData(methodName: string, filter: {}, result: {}) {
        if (!this.contract.events[methodName]) {
            throw new Error(
                `Method "${methodName}" not found on subgraph "neverminedio/${this.contract.contractName}"`
            )
        }
        return this.contract.events[methodName](
            `${this.config.graphHttpUri}/${this.contract.contractName}`,
            filter,
            result
        )
    }

    public async getPastEvents(methodName: string, filter: {}, result: {}) {
        return this.getEventData(methodName, filter, result)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public subscribe(_callback: (events: any[]) => void): ContractEventSubscription {
        throw new Error('not implemented when using subgraphs')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public once(_callback?: (events: any[]) => void) {
        throw new Error('not implemented when using subgraphs')
    }
}
