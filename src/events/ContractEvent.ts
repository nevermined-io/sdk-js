import Web3 from 'web3'
import {
    EventEmitter,
    EventOptions,
    EventResult,
    NeverminedEvent
} from './NeverminedEvent'
import ContractBase from '../keeper/contracts/ContractBase'
import { KeeperError } from '../errors'
import { Nevermined } from '../nevermined/Nevermined'

export class ContractEvent extends NeverminedEvent {
    public static getInstance(
        contract: ContractBase,
        eventEmitter: EventEmitter,
        nevermined: Nevermined,
        web3: Web3
    ): ContractEvent {
        const instance = new ContractEvent(contract, eventEmitter)
        instance.setInstanceConfig({
            nevermined,
            web3
        })

        return instance
    }

    public async getEventData(options: EventOptions): EventResult {
        if (!this.contract.contract.events[options.eventName]) {
            throw new KeeperError(
                `Event "${options.eventName}" not found on contract "${this.contract.contractName}"`
            )
        }
        return this.contract.contract.getPastEvents(options.eventName, {
            filter: options.filterJsonRpc,
            fromBlock: options.fromBlock,
            toBlock: options.toBlock
        })
    }

    public async getPastEvents(options: EventOptions): EventResult {
        try {
            const chainId = await this.getNetworkId()
            options.fromBlock = 0
            options.toBlock = 'latest'

            // Temporary workaround to work with mumbai
            // Infura as a 1000 blokcs limit on their api
            if (chainId === 80001 || chainId === 42) {
                const latestBlock = await this.web3.eth.getBlockNumber()
                options.fromBlock = latestBlock - 99
            }
            const data = await this.getEventData(options)
            return data
        } catch (error) {
            return []
        }
    }

    public async getBlockNumber(): Promise<number> {
        return this.web3.eth.getBlockNumber()
    }
}
