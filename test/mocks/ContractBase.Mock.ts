import { TxParameters, ContractBase } from '../../src/keeper'

export default class ContractBaseMock extends ContractBase {
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
