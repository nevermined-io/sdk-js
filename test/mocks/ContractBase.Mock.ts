import { ContractEvent, EventHandler } from '../../src/events'
import { TxParameters, ContractBase } from '../../src/keeper'

export default class ContractBaseMock extends ContractBase {
    public async initMock(config: any) {
        await this.init(config)
        const eventEmitter = new EventHandler()
        this.events = ContractEvent.getInstance(
            this,
            eventEmitter,
            this.nevermined,
            this.web3
        )
    }

    public async callMock(name: string, args: any[], from?: string) {
        return this.call(name, args, from)
    }

    public async sendMock(
        name: string,
        from: string,
        args: any[],
        txParams?: TxParameters
    ) {
        return this.send(name, from, args, txParams)
    }
}
