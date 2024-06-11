import { InstantiableConfig } from '../../../Instantiable.abstract'
import { ContractHandler } from '../../../keeper/ContractHandler'
import { Nft721Contract } from '../../../keeper/contracts/Nft721Contract'
import { NeverminedOptions } from '../../../models/NeverminedOptions'
import { NvmAccount } from '../../../models/NvmAccount'
import { Nevermined } from '../../../nevermined/Nevermined'
import { NFT721Api } from './NFT721Api'

/*
 * Class to handle Subscription NFTs based on ERC-721 API
 */
export class SubscriptionNFTApi extends NFT721Api {
  /**
   * It gets a Subscription NFT (ERC-721) instance
   * @param config - The Nevermined config
   * @param nftContractAddress - If the Subscription NFT Contract is deployed in an address it will connect to that contract
   * @param solidityABI - The ABI of the Contract
   * @returns The Subscription NFT API instance {@link SubscriptionNFTApi}.
   */
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

  /**
   * It deploys a new instance of the Subscription NFT (ERC-721) contract
   * @param config - The Nevermined config
   * @param contractABI - The ABI of the Subscription NFT Contract
   * @param from - The account that will deploy the contract
   * @param args - The list of arguments passed to the contract when is initialized
   * @returns The Subscription NFT API instance {@link SubscriptionNFTApi}.
   */
  public static async deployInstance(
    config: NeverminedOptions,
    contractABI: any,
    from: NvmAccount,
    args = [],
  ): Promise<SubscriptionNFTApi> {
    const { instanceConfig } = (await Nevermined.getInstance(config)) as any
    const contractHandler = new ContractHandler(instanceConfig)
    const nftContract = await contractHandler.deployAbi(contractABI, from, args)
    return SubscriptionNFTApi.getInstanceUsingABI(instanceConfig, nftContract.address, contractABI)
  }
}
