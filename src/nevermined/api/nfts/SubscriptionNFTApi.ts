import { Account, Nevermined } from '../../../nevermined'
import { NeverminedOptions } from '../../../models'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { ContractHandler, Nft721Contract } from '../../../keeper'
import { NFT721Api } from './NFT721Api'

export class SubscriptionNFTApi extends NFT721Api {
  public static async getInstanceUsingABI(
    config: InstantiableConfig,
    nftContractAddress: string,
    solidityABI: any,
  ): Promise<SubscriptionNFTApi> {
    const instance = new SubscriptionNFTApi()
    instance.servicePlugin = SubscriptionNFTApi.getServicePlugin(config)
    instance.setInstanceConfig(config)

    instance.nftContract = await Nft721Contract.getInstanceUsingABI(
      config,
      nftContractAddress,
      solidityABI,
    )
    return instance
  }

  public static async deployInstance(
    config: NeverminedOptions,
    contractABI: any,
    from: Account,
    args = [],
  ): Promise<SubscriptionNFTApi> {
    const { instanceConfig } = (await Nevermined.getInstance(config)) as any
    const contractHandler = new ContractHandler(instanceConfig)
    const nftContract = await contractHandler.deployAbi(contractABI, from, args)
    return SubscriptionNFTApi.getInstanceUsingABI(instanceConfig, nftContract.address, contractABI)
  }
}
