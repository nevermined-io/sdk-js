import { InstantiableConfig } from '../../../Instantiable.abstract'
import { NvmAccount } from '../../../models/NvmAccount'
import { TxParameters } from '../../../models/Transactions'
import { didZeroX } from '../../../utils/ConversionTypeHelpers'
import { ContractBase } from '../../../keeper/contracts/ContractBase'
import { LoggerInstance } from '../../../models'

export abstract class RoyaltyScheme extends ContractBase {
  public static async getInstance(
    config: InstantiableConfig,
    schemeName: string,
    schemeClass: any,
    optional = true,
  ): Promise<RoyaltyScheme & any> {
    try {
      const scheme: RoyaltyScheme = new (schemeClass as any)(schemeName)
      await scheme.init(config, optional)
      return scheme
    } catch (e) {
      LoggerInstance.warn(`Cannot load optional contract ${schemeName}`)
    }
  }

  public setRoyalty(did: string, amount: number, from: NvmAccount, txParams?: TxParameters) {
    return this.sendFrom('setRoyalty', [didZeroX(did), amount], from, txParams)
  }

  public async getRoyalty(did: string) {
    return Number(await this.call('royalties', [didZeroX(did)]))
  }
}
