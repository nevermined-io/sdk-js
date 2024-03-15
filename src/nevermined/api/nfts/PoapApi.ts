import { NvmAccount, Nevermined } from '../../../nevermined'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { NeverminedOptions } from '../../../models'
import { ContractHandler, Nft721Contract } from '../../../keeper'
import { NFT721Api } from './NFT721Api'

export default class PoapNFTApi extends NFT721Api {
  public static async getInstanceUsingABI(
    config: InstantiableConfig,
    nftContractAddress: string,
    solidityABI: any,
  ): Promise<PoapNFTApi> {
    const instance = new PoapNFTApi()
    instance.servicePlugin = PoapNFTApi.getServicePlugin(config)
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
  ): Promise<PoapNFTApi> {
    const { instanceConfig } = (await Nevermined.getInstance(config)) as any
    const contractHandler = new ContractHandler(instanceConfig)

    const nftContract = await contractHandler.deployAbi(contractABI, from, args)
    return PoapNFTApi.getInstanceUsingABI(
      instanceConfig,
      await nftContract.getAddress(),
      contractABI,
    )
  }
}
