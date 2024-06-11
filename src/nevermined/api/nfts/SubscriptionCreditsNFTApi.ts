import { InstantiableConfig } from '../../../Instantiable.abstract'
import { ContractHandler } from '../../../keeper/ContractHandler'
import { Nft1155Contract } from '../../../keeper/contracts/Nft1155Contract'
import { NeverminedOptions } from '../../../models/NeverminedOptions'
import { NvmAccount } from '../../../models/NvmAccount'
import { Nevermined } from '../../../nevermined/Nevermined'
import { NFT1155Api } from './NFT1155Api'

/*
 * Class to handle Subscription Credits NFT based on ERC-1155 API
 */
export class SubscriptionCreditsNFTApi extends NFT1155Api {
  /**
   * It gets a Subscription NFT (ERC-1155) instance
   * @param config - The Nevermined config
   * @param nftContractAddress - If the Subscription NFT Contract is deployed in an address it will connect to that contract
   * @param solidityABI - The ABI of the Contract
   * @returns The Subscription NFT API instance {@link SubscriptionCreditsNFTApi}.
   */
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

  /**
   * It deploys a new instance of the Subscription NFT (ERC-1155) contract
   * @param config - The Nevermined config
   * @param contractABI - The ABI of the Subscription NFT Contract
   * @param from - The account that will deploy the contract
   * @param args - The list of arguments passed to the contract when is initialized
   * @returns The Subscription NFT API instance {@link SubscriptionCreditsNFTApi}.
   */
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
