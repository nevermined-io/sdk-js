import { InstantiableConfig } from '@/Instantiable.abstract'
import { ContractHandler } from '@/keeper/ContractHandler'
import { Nft721Contract } from '@/keeper/contracts/Nft721Contract'
import { NeverminedOptions } from '@/models/NeverminedOptions'
import { NvmAccount } from '@/models/NvmAccount'
import { Nevermined } from '@/nevermined/Nevermined'
import { NFT721Api } from '@/nevermined/api/nfts/NFT721Api'

export class SoulBoundNFTApi extends NFT721Api {
  public static async getInstanceUsingABI(
    config: InstantiableConfig,
    nftContractAddress: string,
    solidityABI: any,
  ): Promise<SoulBoundNFTApi> {
    const instance = new SoulBoundNFTApi()
    instance.servicePlugin = SoulBoundNFTApi.getServicePlugin(config)
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
    from: NvmAccount,
    args: string[] = [],
  ): Promise<SoulBoundNFTApi> {
    const { instanceConfig } = (await Nevermined.getInstance(config)) as any
    const contractHandler = new ContractHandler(instanceConfig)
    const nftContract = await contractHandler.deployAbi(contractABI, from, args)
    return SoulBoundNFTApi.getInstanceUsingABI(instanceConfig, nftContract.address, contractABI)
  }
}
