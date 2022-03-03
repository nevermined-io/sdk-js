import { ContractEvent, EventHandler } from '../../src/events'
import ContractBase, { TxParameters } from '../../src/keeper/contracts/ContractBase'

export default class ContractBaseMock extends ContractBase {
    public async initMock(config: any) {
        await this.init()
        const eventEmitter = new EventHandler(config)
        this.events = ContractEvent.getInstance(this, eventEmitter, this.web3)
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
