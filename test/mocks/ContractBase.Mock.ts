import { ContractBase } from '../../src/keeper/contracts/ContractBase'
import { ContractEvent, EventHandler } from '../../src/events'
import { parseAbi } from 'viem'
import { NvmAccount, TxParameters } from '../../src/models'

export class ContractBaseMock extends ContractBase {
  public interface
  public async initMock(config: any) {
    await this.init(config)
    const eventEmitter = new EventHandler()
    this.events = ContractEvent.getInstance(
      this,
      eventEmitter,
      this.nevermined,
      this.nevermined.client,
    )
    this.interface = parseAbi(['function name() view returns (string)'])
  }

  public async callMock(name: string, args: any[], from?: string) {
    return this.call(name, args, from)
  }

  public async sendMock(name: string, from: NvmAccount, args: any[], txParams?: TxParameters) {
    return this.send(name, from, args, txParams)
  }
}
