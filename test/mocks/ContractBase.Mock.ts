import { ContractEvent } from '../../src/keeper/ContractEvent'
import { EventEmitter } from '../../src/events/NeverminedEvent'
import ContractBase, { TxParameters } from '../../src/keeper/contracts/ContractBase'
import { EventHandler } from '../../src/keeper/EventHandler'

export default class ContractBaseMock extends ContractBase {
    public async initMock(config: any) {
        await this.init(config)
        const eventEmitter = new EventHandler(config)
        this.events = new ContractEvent(config, this, eventEmitter)
        // this
    }

    public async callMock(name: string, args: any[], from?: string) {
        return this.call(name, args, from)
    }

    public async sendMock(
        name: string,
        from: string,
        args: any[],
        params?: TxParameters
    ) {
        return this.send(name, from, args, params)
    }
}
