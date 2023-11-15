import ContractBase, { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { ContractTransactionReceipt, ethers } from 'ethers'

export class GenericContract extends ContractBase {
  private overrideAddress: string

  public static async getInstance(
    config: InstantiableConfig,
    contractName: string,
    address?: string,
  ): Promise<GenericContract> {
    const contract: GenericContract = new GenericContract(contractName, config)
    contract.overrideAddress = address
    return contract
  }

  protected async init() {
    super.init(this.overrideAddress)
  }

  public async call<T>(name: string, args: any[], from?: string): Promise<T> {
    return super.call(name, args, from)
  }

  public async send(
    name: string,
    from: string,
    args: any[],
    params: TxParameters = {},
  ): Promise<ContractTransactionReceipt> {
    return super.send(name, from, args, params)
  }

  public getContract(): ethers.BaseContract {
    return this.contract
  }
}
