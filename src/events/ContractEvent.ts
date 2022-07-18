import {
    EventEmitter,
    EventOptions,
    EventResult,
    Filter,
    NeverminedEvent
} from './NeverminedEvent'
import ContractBase from '../keeper/contracts/ContractBase'
import { KeeperError } from '../errors'
import { Nevermined } from '../nevermined/Nevermined'
import { ethers } from 'ethers'

export class ContractEvent extends NeverminedEvent {
    public static getInstance(
        contract: ContractBase,
        eventEmitter: EventEmitter,
        nevermined: Nevermined,
        web3: ethers.providers.JsonRpcProvider
    ): ContractEvent {
        const instance = new ContractEvent(contract, eventEmitter)
        instance.setInstanceConfig({
            nevermined,
            web3
        })

        return instance
    }

    public async getEventData(options: EventOptions): EventResult {
        console.log('----- ContractEvent getEventData')
        if (!this.eventExists(options.eventName)) {
            throw new KeeperError(
                `Event "${options.eventName}" not found on contract "${this.contract.contractName}"`
            )
        }
        const args = this.filterToArgs(options.eventName, options.filterJsonRpc)
        console.log('----- ContractEvent getEventData args', args)
        const eventFilter: ethers.EventFilter = this.contract.contract.filters[
            options.eventName
        ](...args)
        console.log('----- ContractEvent getEventData eventFilter', eventFilter)
        console.log('----- ContractEvent getEventData queryFilter options', options)
        // console.log(
        //     '----- ContractEvent getEventData queryFilter',
        //     await this.contract.contract.queryFilter(
        //         eventFilter,
        //         options.fromBlock,
        //         options.toBlock
        //     )
        // )

        return this.contract.contract
            .queryFilter(eventFilter, options.fromBlock, options.toBlock)
            .catch(e => console.log('////////', e))
            .then()
    }

    public async getPastEvents(options: EventOptions): EventResult {
        try {
            const chainId = await this.nevermined.keeper.getNetworkId()
            options.fromBlock = 0
            options.toBlock = 'latest'

            // Temporary workaround to work with mumbai
            // Infura as a 1000 blokcs limit on their api
            if (chainId === 80001 || chainId === 42) {
                const latestBlock = await this.web3.getBlockNumber()
                console.log('---- ContractEvent latestBlock', latestBlock)
                options.fromBlock = latestBlock - 99
            }
            return await this.getEventData(options)
        } catch (error) {
            console.log('------ ContractEvent error', error)
            return []
        }
    }

    public async getBlockNumber(): Promise<number> {
        return this.web3.getBlockNumber()
    }

    private eventExists(eventName: string): boolean {
        return !!this.contract.contract.interface.getEvent(eventName)
    }

    private filterToArgs(eventName: string, filter: Filter): Array<any> {
        const event = this.contract.contract.interface.getEvent(eventName)
        return event.inputs.map(i => filter[i.name])
    }
}
