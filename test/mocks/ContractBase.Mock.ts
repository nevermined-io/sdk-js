import { ContractEvent, EventHandler } from '../../src/events'
import { TxParameters, ContractBase } from '../../src/keeper'
import { parseAbi } from 'viem'

export default class ContractBaseMock extends ContractBase {
    public interface
    public async initMock(config: any) {
        await this.init(config)
        const eventEmitter = new EventHandler()
        this.events = ContractEvent.getInstance(
            this,
            eventEmitter,
            this.nevermined,
            this.nevermined.client            
        )
        this.interface = parseAbi(['function name() view returns (string)'])
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
