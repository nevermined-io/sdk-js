import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import Web3 from 'web3'

export class EventHandler {
    get count(): number {
        return this.events.size
    }

    private web3: Web3

    private events = new Set<(blockNumber) => void>()

    private lastBlock: number

    private interval = 200

    private polling: boolean = false

    private lastTimeout: NodeJS.Timeout

    private getBlockNumber: () => Promise<number>

    constructor(web3: Web3) {
        this.web3 = web3
    }

    public subscribe(
        callback: (blockNumber: number) => void,
        getBlockNumber: () => Promise<number>
    ) {
        this.getBlockNumber = getBlockNumber
        this.events.add(callback)
        this.checkBlock()

        return {
            unsubscribe: () => this.unsubscribe(callback)
        }
    }

    public unsubscribe(callback: (blockNumber: number) => void) {
        this.events.delete(callback)
        if (!this.count) {
            clearTimeout(this.lastTimeout)
            delete this.lastBlock
            this.polling = false
        }
    }

    private async checkBlock(isInterval?: boolean, n = 0) {
        const blockNumber = await this.getBlockNumber()

        if ((this.polling && !isInterval) || !this.count) {
            return
        }
        this.polling = true

        if (!this.lastBlock) {
            this.lastBlock = blockNumber
        }

        if (this.lastBlock !== blockNumber) {
            this.events.forEach(fn => fn(this.lastBlock + 1))
            this.lastBlock = blockNumber
        }
        this.lastTimeout = global.setTimeout(
            () => this.checkBlock(true, n++),
            this.interval
        )
    }
}
