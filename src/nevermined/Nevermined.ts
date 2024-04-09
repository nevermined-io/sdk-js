import { Instantiable, generateInstantiableConfigFromConfig } from '../Instantiable.abstract'
import { Keeper } from '../keeper'
import { CustomToken } from '../keeper/contracts/CustomToken'
import { Nft1155Contract } from '../keeper/contracts/Nft1155Contract'
import { Nft721Contract } from '../keeper/contracts/Nft721Contract'
import { LoggerInstance } from '../models/Logger'
import { NeverminedOptions } from '../models/NeverminedOptions'
import { AccountsApi } from '../nevermined/api/AccountsApi'
import { AgreementsApi } from '../nevermined/api/AgreementsApi'
import { AssetsApi } from '../nevermined/api/AssetsApi'
import { ComputeApi } from '../nevermined/api/ComputeApi'
import { ProvenanceApi } from '../nevermined/api/ProvenanceApi'
import { SearchApi } from '../nevermined/api/SearchApi'
import { ServicesApi } from '../nevermined/api/ServicesApi'
import { UtilsApi } from '../nevermined/api/UtilsApi'
import { NFT1155Api } from '../nevermined/api/nfts/NFT1155Api'
import { NFT721Api } from '../nevermined/api/nfts/NFT721Api'
import { NeverminedInitializationOptions } from '../types/GeneralTypes'

/**
 * Main interface for Nevermined Protocol.
 */
export class Nevermined extends Instantiable {
  static DEFAULT_INITIALIZATION_OPTIONS: NeverminedInitializationOptions = {
    loadCore: true,
    loadServiceAgreements: true,
    loadNFTs1155: true,
    loadNFTs721: true,
    loadDispenser: true,
    loadERC20Token: true,
    loadAccessFlow: true,
    loadDIDTransferFlow: true,
    loadRewards: true,
    loadRoyalties: true,
    loadCompute: true,
  }
  /**
   * Returns the instance of Nevermined.
   *
   * @example
   * ```ts
   * import { Nevermined, Config } from '@nevermined-io/sdk'
   *
   * const config: Config = {...}
   * const nevermined = await Nevermined.getInstance(config)
   * ```
   *
   * @param config - Nevermined instance configuration.
   * @returns A {@link Nevermined} instance
   */
  public static async getInstance(
    config: NeverminedOptions,
    initOptions: NeverminedInitializationOptions = this.DEFAULT_INITIALIZATION_OPTIONS,
  ): Promise<Nevermined> {
    const instance = new Nevermined()

    const instanceConfig = {
      ...(await generateInstantiableConfigFromConfig(config, initOptions.loadCore)),
      nevermined: instance,
    }
    instance.setInstanceConfig(instanceConfig)

    // Nevermined main API

    try {
      instance.search = new SearchApi(instanceConfig)
      instance.services = new ServicesApi(instanceConfig)
      instance.utils = new UtilsApi(instanceConfig, initOptions)

      if (initOptions.loadCore) {
        instance.accounts = new AccountsApi(instanceConfig)
        instance.agreements = new AgreementsApi(instanceConfig)
        instance.provenance = new ProvenanceApi(instanceConfig)
        instance.keeper = await Keeper.getInstance(instanceConfig)
        await instance.keeper.init(initOptions)

        if (initOptions.loadNFTs1155) {
          instance.nfts1155 = await NFT1155Api.getInstance(
            instanceConfig,
            instance.keeper.nftUpgradeable,
          )
        }

        instance.assets = new AssetsApi(instanceConfig)

        if (initOptions.loadCompute) instance.compute = new ComputeApi(instanceConfig)

        // instance.web3 =
      }

      instance.isKeeperConnected = initOptions.loadCore
    } catch (error) {
      instance.isKeeperConnected = false

      LoggerInstance.error(error)
      LoggerInstance.error(
        "Contracts didn't initialize because for the above mentioned reason. Loading SDK in offchain mode...",
      )
    }

    return instance
  }

  public static async getSearchOnlyInstance(config: NeverminedOptions): Promise<Nevermined> {
    return this.getInstance(config, {
      loadCore: false,
      loadServiceAgreements: false,
      loadNFTs1155: false,
      loadNFTs721: false,
      loadDispenser: false,
      loadERC20Token: false,
      loadAccessFlow: false,
      loadDIDTransferFlow: false,
      loadRewards: false,
      loadRoyalties: false,
      loadCompute: false,
    })
  }

  /**
   * Nevermined very own contract reflector.
   */
  public contracts = {
    ////////////////
    // ERC-721
    ////////////////
    /**
     * Load the ERC-721 API in the `nevermined` object given a remote NFT contract address.
     *
     * @param address - The address of the ERC-721 contracts to load
     * @returns An instance of {@link NFT721Api}
     */
    loadNft721: async (address: string): Promise<NFT721Api> => {
      this.nfts721 = await NFT721Api.getInstance(this.instanceConfig, address)
      return this.nfts721
    },
    /**
     * Loads the ERC-721 API in the `nevermined` object
     *
     * @param api - An instance of the `NFT721Api`
     * @returns An instance of {@link NFT721Api}
     */
    loadNft721Api: async (api: NFT721Api): Promise<NFT721Api> => {
      this.nfts721 = api
      return this.nfts721
    },
    /**
     * Returns a ERC-721 NFT contract instance given a remote NFT contract address.
     *
     * @param address - The address of the ERC-721 contracts to load
     * @returns An instance of {@link Nft721Contract}
     */
    loadNft721Contract: async (address: string): Promise<Nft721Contract> => {
      return await Nft721Contract.getInstance(this.instanceConfig, address)
    },

    ////////////////
    // ERC-1155
    ////////////////
    /**
     * Load the ERC-1155 API in the `nevermined` object given a remote NFT contract address.
     *
     * @param address - The address of the ERC-1155 contracts to load
     * @returns An instance of {@link NFT1155Api}
     */
    loadNft1155: async (address: string): Promise<NFT1155Api> => {
      this.nfts1155 = await NFT1155Api.getInstance(this.instanceConfig, undefined, address)
      return this.nfts1155
    },
    /**
     * Loads the ERC-1155 API in the `nevermined` object
     *
     * @param api - An instance of the `NFT1155Api`
     * @returns An instance of {@link NFT1155Api}
     */
    loadNft1155Api: async (api: NFT1155Api): Promise<NFT1155Api> => {
      this.nfts1155 = api
      return this.nfts1155
    },
    /**
     * Returns a ERC-1155 NFT contract instance given a remote NFT contract address.
     *
     * @param address - The address of the ERC-1155 contracts to load
     * @returns An instance of {@link Nft1155Contract}
     */
    loadNft1155Contract: async (address: string): Promise<Nft1155Contract> => {
      return await Nft1155Contract.getInstance(this.instanceConfig, address)
    },
    /**
     * Load a custom ERC-20 nft.
     *
     * @param address - The address of the ERC-20 contracts to load
     * @returns An instance of the {@link CustomToken}
     */
    loadErc20: async (address: string): Promise<CustomToken> => {
      return await CustomToken.getInstanceByAddress(this.instanceConfig, address)
    },
  }

  /**
   * Keeper instance.
   */
  public keeper: Keeper

  /**
   * Accounts submodule
   */
  public accounts: AccountsApi

  /**
   * Agreements submodule
   */
  public agreements: AgreementsApi

  /**
   * Assets API
   */
  public assets: AssetsApi

  /**
   * Compute API
   */
  public compute: ComputeApi

  /**
   * ERC-1155 Nfts API
   */
  public nfts1155: NFT1155Api

  /**
   * ERC-721 Nfts API
   */
  public nfts721: NFT721Api

  /**
   * Provenance submodule
   */
  public provenance: ProvenanceApi

  /**
   * SearchApi API
   */
  public search: SearchApi

  /**
   * SearchApi API
   */
  public services: ServicesApi

  /**
   * Utils submodule
   */
  public utils: UtilsApi

  /**
   * Web3 Clients
   */
  // public web3: Web3Clients

  /**
   * If keeper is connected
   */
  public isKeeperConnected: boolean

  private constructor() {
    super()
  }
}
