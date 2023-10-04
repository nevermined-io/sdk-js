import ContractBase, { TxParameters } from '../ContractBase'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { Account } from '../../../nevermined'

export default class NeverminedConfig extends ContractBase {
  templates: any

  public static async getInstance(config: InstantiableConfig): Promise<NeverminedConfig> {
    const neverminedConfig: NeverminedConfig = new NeverminedConfig('NeverminedConfig')
    await neverminedConfig.init(config)
    return neverminedConfig
  }

  public getOwner(): Promise<string> {
    return this.call('owner', [])
  }

  public getNetworkFee(): Promise<bigint> {
    return this.call('getMarketplaceFee', [])
  }

  public getFeeReceiver(): Promise<string> {
    return this.call('getFeeReceiver', [])
  }

  public getIsProvenanceEnabled(): Promise<boolean> {
    return this.call('getProvenanceStorage', [])
  }

  public isGovernor(address: string): Promise<boolean> {
    return this.call('isGovernor', [address])
  }

  public setGovernor(address: string, from?: Account, txParams?: TxParameters) {
    return this.sendFrom('setGovernor', [address], from, txParams)
  }

  public setTrustedForwarder(address: string, from?: Account, txParams?: TxParameters) {
    return this.sendFrom('setTrustedForwarder', [address], from, txParams)
  }

  public getTrustedForwarder(): Promise<string> {
    return this.call('getTrustedForwarder', [])
  }

  public setNetworkFees(
    networkFee: number,
    feeReceiver: string,
    from?: Account,
    txParams?: TxParameters,
  ) {
    return this.sendFrom('setMarketplaceFees', [networkFee, feeReceiver], from, txParams)
  }
}
