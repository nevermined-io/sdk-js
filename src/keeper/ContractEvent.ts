import {
    EventOptionsBoth,
    EventOptionsJsonRpc,
    NeverminedEvent
} from '../events/NeverminedEvent'
import { InstantiableConfig } from '../Instantiable.abstract'
import ContractBase from './contracts/ContractBase'
import { EventHandler } from './EventHandler'

export interface EventEmitter {
    subscribe: Function
    unsubscribe: Function
}

export interface ContractEventSubscription {
    unsubscribe: () => void
}

export class ContractEvent extends NeverminedEvent {
    constructor(
        config: InstantiableConfig,
        contract: ContractBase,
        eventEmitter: EventEmitter
    ) {
        super(config, contract)
        this.eventEmitter = eventEmitter
    }

    public getInstance(
        config: InstantiableConfig,
        contract: ContractBase
    ): ContractEvent {
        const eventEmitter = new EventHandler(config)
        return new ContractEvent(config, contract, eventEmitter)
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
