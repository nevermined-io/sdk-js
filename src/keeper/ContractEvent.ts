import { Instantiable } from '../Instantiable.abstract'
import ContractBase from './contracts/ContractBase'

interface EventEmitter {
    subscribe: Function
    unsubscribe: Function
}

export interface ContractEventSubscription {
    unsubscribe: () => void
}

export class ContractEvent extends Instantiable {
    constructor(
        private contract: ContractBase,
        private eventEmitter?: EventEmitter,
        private eventName?: string,
        private filter?: { [key: string]: any }
    ) {
        super()
    }

    public subscribe(callback: (events: any[]) => void): ContractEventSubscription {
        const onEvent = async (blockNumber: number) => {
            const events = await this.getEventData(this.eventName, {
                filter: this.filter,
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

    public once(callback?: (events: any[]) => void) {
        return new Promise(resolve => {
            const subscription = this.subscribe(events => {
                subscription.unsubscribe()
                if (callback) {
                    callback(events)
                }
                resolve(events)
            })
        })
    }

    public async getEventData(eventName: string, options: any) {
        if (!this.contract.contract.events[eventName]) {
            throw new Error(
                `Event "${eventName}" not found on contract "${this.contract.contractName}"`
            )
        }
        return this.contract.contract.getPastEvents(eventName, options)
    }

    public async getPastEvents(eventName: string, filter: { [key: string]: any }) {
        const chainId = await this.web3.eth.net.getId()

        let fromBlock = 0
        const toBlock = 'latest'

        // Temporary workaround to work with mumbai
        // Infura as a 1000 blokcs limit on their api
        if (chainId === 80001) {
            const latestBlock = await this.web3.eth.getBlockNumber()
            fromBlock = latestBlock - 990
        }

        return this.getEventData(eventName, {
            filter,
            fromBlock,
            toBlock
        })
    }
}
