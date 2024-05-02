import { InstantiableConfig } from '../../Instantiable.abstract'
import { TxParameters } from '../../models/Transactions'
import { ContractBase } from './ContractBase'
import { NvmAccount } from '../../models'

export class GenericContract extends ContractBase {
  protected fixedAddress: string

  public static async getInstance(
    config: InstantiableConfig,
    contractName: string,
    address: string,
  ): Promise<GenericContract> {
    const contract: GenericContract = new GenericContract(contractName, address)
    await contract.init(config)
    return contract
  }

  private constructor(contractName: string, address: string) {
    super(contractName)
    this.fixedAddress = address
  }

  protected async init(config: InstantiableConfig, optional = false) {
    this.setInstanceConfig(config)

    this.contract = await this.nevermined.utils.contractHandler.getContractFromArtifacts(
      this.contractName,
      optional,
      config.artifactsFolder as string,
      this.fixedAddress,
    )
  }

  public async call<T>(name: string, args: any[], from: string): Promise<T> {
    return super.call(name, args, from)
  }

  public async send(name: string, from: NvmAccount, args: any[], params: TxParameters = {}) {
    return super.send(name, from, args, params)
  }

  public getContract() {
    return this.contract
  }
}
