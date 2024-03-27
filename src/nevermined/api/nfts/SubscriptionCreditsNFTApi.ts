import { NeverminedOptions } from '@/models'
import { InstantiableConfig } from '@/Instantiable.abstract'
import { ContractHandler, Nft1155Contract } from '@/keeper'
import { NFT1155Api } from '@/nevermined/api/nfts/NFT1155Api'
import { Nevermined } from '@/nevermined'
import { NvmAccount } from '@/models/NvmAccount'

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
