import { InstantiableConfig } from '../../../Instantiable.abstract'
import { ContractHandler } from '../../../keeper/ContractHandler'
import { Nft721Contract } from '../../../keeper/contracts/Nft721Contract'
import { NeverminedOptions } from '../../../models/NeverminedOptions'
import { NvmAccount } from '../../../models/NvmAccount'
import { Nevermined } from '../../../nevermined/Nevermined'
import { NFT721Api } from './NFT721Api'

/**
 * Class to handle POAP NFTs (ERC-721) API
 */
export class PoapNFTApi extends NFT721Api {
  /**
   * It gets a POAP NFT (ERC-721) instance
   * @param config - The Nevermined config
   * @param nftContractAddress - If the POAP Contract is deployed in an address it will connect to that contract
   * @param solidityABI - The ABI of the POAP Contract
   * @returns The POAP API instance {@link PoapNFTApi}.
   */
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

  /**
   * It deploys a new instance of the POAP NFT (ERC-721) contract
   * @param config - The Nevermined config
   * @param contractABI - The ABI of the POAP Contract
   * @param from - The account that will deploy the contract
   * @param args - The list of arguments passed to the contract when is initialized
   * @returns The POAP API instance {@link PoapNFTApi}.
   */
  public static async deployInstance(
    config: NeverminedOptions,
    contractABI: any,
    from: NvmAccount,
    args: string[] = [],
  ): Promise<PoapNFTApi> {
    const { instanceConfig } = (await Nevermined.getInstance(config)) as any
    const contractHandler = new ContractHandler(instanceConfig)

    const nftContract = await contractHandler.deployAbi(contractABI, from, args)
    return PoapNFTApi.getInstanceUsingABI(instanceConfig, nftContract.address, contractABI)
  }
}
