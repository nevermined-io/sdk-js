import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

export class EventHandler extends Instantiable {
    get count(): number {
        return this.events.size
    }

    private events = new Set<(blockNumber) => void>()

    private lastBlock: number

    private interval = 200

    private polling: boolean = false

    private lastTimeout: NodeJS.Timeout

    private getBlockNumber: () => Promise<number>

    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
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
