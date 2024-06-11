import { InstantiableConfig } from '../../../Instantiable.abstract'
import { ContractHandler } from '../../../keeper/ContractHandler'
import { Nft721Contract } from '../../../keeper/contracts/Nft721Contract'
import { NeverminedOptions } from '../../../models/NeverminedOptions'
import { NvmAccount } from '../../../models/NvmAccount'
import { Nevermined } from '../../../nevermined/Nevermined'
import { NFT721Api } from '../../../nevermined/api/nfts/NFT721Api'

export class SoulBoundNFTApi extends NFT721Api {
  /**
   * It gets a SoulBound NFT (ERC-721) instance
   * @param config - The Nevermined config
   * @param nftContractAddress - If the SoulBound Contract is deployed in an address it will connect to that contract
   * @param solidityABI - The ABI of the SoulBound Contract
   * @returns The SoulBound API instance {@link SoulBoundNFTApi}.
   */
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

  /**
   * It deploys a new instance of the SoulBound NFT (ERC-721) contract
   * @param config - The Nevermined config
   * @param contractABI - The ABI of the SoulBound Contract
   * @param from - The account that will deploy the contract
   * @param args - The list of arguments passed to the contract when is initialized
   * @returns The SoulBound API instance {@link SoulBoundNFTApi}.
   */
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
