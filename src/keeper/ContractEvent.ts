import Web3 from 'web3'
import {
    EventEmitter,
    EventOptionsBoth,
    NeverminedEvent
} from '../events/NeverminedEvent'
import { InstantiableConfig } from '../Instantiable.abstract'
import ContractBase from './contracts/ContractBase'
import { EventHandler } from './EventHandler'

export class ContractEvent extends NeverminedEvent {
    private web3: Web3
    public static getInstance(
        contract: ContractBase,
        eventEmitter: EventEmitter,
        web3: Web3
    ): ContractEvent {
        const instance = new ContractEvent(contract, eventEmitter)
        instance.web3 = web3

        return instance
    }

    public async getEventData(options: EventOptionsBoth) {
        if (!this.contract.contract.events[options.eventName]) {
            throw new Error(
                `Event "${options.eventName}" not found on contract "${this.contract.contractName}"`
            )
        }
        return this.contract.contract.getPastEvents(options.eventName, {
            filter: options.filter,
            fromBlock: options.fromBlock,
            toBlock: options.toBlock
        })
    }

    public async getPastEvents(options: EventOptionsBoth) {
        const chainId = await this.web3.eth.net.getId()

        options.fromBlock = 0
        options.toBlock = 'latest'

        // Temporary workaround to work with mumbai
        // Infura as a 1000 blokcs limit on their api
        if (chainId === 80001) {
            const latestBlock = await this.web3.eth.getBlockNumber()
            options.fromBlock = latestBlock - 990
        }

        return this.getEventData(options)
    }
}
