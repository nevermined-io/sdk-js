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

  public async getOwner(): Promise<string> {
    return this.call('owner', [])
  }

  public async getNetworkFee(): Promise<number> {
    return this.call('getMarketplaceFee', [])
  }

  public async getFeeReceiver(): Promise<string> {
    return this.call('getFeeReceiver', [])
  }

  public async getIsProvenanceEnabled(): Promise<boolean> {
    return this.call('getProvenanceStorage', [])
  }

  public async isGovernor(address: string): Promise<boolean> {
    return this.call('isGovernor', [address])
  }

  public async setGovernor(address: string, from?: Account, txParams?: TxParameters) {
    return this.sendFrom('setGovernor', [address], from, txParams)
  }

  public async setTrustedForwarder(address: string, from?: Account, txParams?: TxParameters) {
    return this.sendFrom('setTrustedForwarder', [address], from, txParams)
  }

  public async getTrustedForwarder(): Promise<string> {
    return this.call('getTrustedForwarder', [])
  }

  public async setNetworkFees(
    networkFee: number,
    feeReceiver: string,
    from?: Account,
    txParams?: TxParameters,
  ) {
    return this.sendFrom('setMarketplaceFees', [networkFee, feeReceiver], from, txParams)
  }
}
