import { InstantiableConfig } from '@/Instantiable.abstract'
import { ContractBase } from '@/keeper/contracts/ContractBase'
import { NvmAccount } from '@/models'
import { TxParameters } from '@/models/Transactions'
import { parseUnits } from 'viem'

export class Dispenser extends ContractBase {
  public static async getInstance(config: InstantiableConfig): Promise<Dispenser> {
    const dispenser: Dispenser = new Dispenser('Dispenser')
    await dispenser.init(config, true)
    return dispenser
  }

  public async requestTokens(
    amount: number | string | bigint,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    const requestedAmount = parseUnits(amount.toString(), 0)
    return this.send('requestTokens', from, [requestedAmount], txParams)
  }
}
