export class EventHandler {
    get count(): number {
        return this.events.size
    }

    private events = new Set<(blockNumber) => void>()

    private lastBlock: number

    private interval = 200

    private polling: boolean = false

    private lastTimeout: NodeJS.Timeout

    private getBlockNumber: () => Promise<number>
    constructor() {}
    public subscribe(
        callback: (blockNumber: number) => void,
        getBlockNumber: () => Promise<number>
    ) {
        console.log('--- EventHandler subscribe')
        this.getBlockNumber = getBlockNumber
        this.events.add(callback)
        console.log('---- EventHandler brefore calling checkBlock')
        this.checkBlock()
        console.log('---- EventHandler after calling checkBlock')

        return {
            unsubscribe: () => this.unsubscribe(callback)
        }
    }

    public unsubscribe(callback: (blockNumber: number) => void) {
        console.log('---- EventHandler calling unsubscribe')
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
