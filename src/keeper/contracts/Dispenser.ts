import ContractBase, { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { parseUnits } from '../../sdk'
export class Dispenser extends ContractBase {
  public static async getInstance(config: InstantiableConfig): Promise<Dispenser> {
    const dispenser: Dispenser = new Dispenser('Dispenser')
    await dispenser.init(config, true)
    return dispenser
  }

  public async requestTokens(
    amount: number | string | bigint,
    receiverAddress: string,
    txParams?: TxParameters,
  ) {
    return this.send('requestTokens', receiverAddress, [parseUnits(amount.toString(), 0)], txParams)
  }
}
