import { InstantiableConfig } from '../../../Instantiable.abstract'
import { ContractHandler } from '../../../keeper/ContractHandler'
import { Nft1155Contract } from '../../../keeper/contracts/Nft1155Contract'
import { NeverminedOptions } from '../../../models/NeverminedOptions'
import { NvmAccount } from '../../../models/NvmAccount'
import { Nevermined } from '../../../nevermined/Nevermined'
import { NFT1155Api } from './NFT1155Api'

export class SubscriptionCreditsNFTApi extends NFT1155Api {
  public static async getInstanceUsingABI(
    config: InstantiableConfig,
    nftContractAddress: string,
    solidityABI: any,
  ): Promise<SubscriptionCreditsNFTApi> {
    const instance = new SubscriptionCreditsNFTApi()
    instance.servicePlugin = SubscriptionCreditsNFTApi.getServicePlugin(config)
    instance.setInstanceConfig(config)

    instance.nftContract = await Nft1155Contract.getInstanceUsingABI(
      config,
      nftContractAddress,
      solidityABI,
    )
    return instance
  }

  public static async deployInstance(
    config: NeverminedOptions,
    contractABI: any,
    from: NvmAccount,
    args = [],
  ): Promise<SubscriptionCreditsNFTApi> {
    const { instanceConfig } = (await Nevermined.getInstance(config)) as any
    const contractHandler = new ContractHandler(instanceConfig)
    const nftContract = await contractHandler.deployAbi(contractABI, from, args)
    return SubscriptionCreditsNFTApi.getInstanceUsingABI(
      instanceConfig,
      nftContract.address,
      contractABI,
    )
  }
}
