import { SmartAccount } from 'viem/account-abstraction'
import { NETWORK_FEE_DENOMINATOR } from '../constants/AssetConstants'
import { DDO } from '../ddo/DDO'
import { Web3Error } from '../errors/NeverminedErrors'
import { AssetPrice } from '../models/AssetPrice'
import { NFTAttributes } from '../models/NFTAttributes'
import { NeverminedOptions } from '../models/NeverminedOptions'
import { NvmAccount } from '../models/NvmAccount'
import { NvmApiKey } from '../models/NvmApiKey'
import {
  AppDeploymentArbitrum,
  AppDeploymentBase,
  AppDeploymentBaseSepolia,
  AppDeploymentCelo,
  AppDeploymentGnosis,
  AppDeploymentLocal,
  AppDeploymentMatic,
  AppDeploymentOptimism,
  AppDeploymentPeaq,
  AppDeploymentStaging,
  AppDeploymentTesting,
  NeverminedAppOptions,
} from '../nevermined/resources/AppNetworks'
import { SubscriptionToken } from '../services/node/NeverminedNode'
import { MetaData, ServiceNFTSales, SubscriptionType } from '../types/DDOTypes'
import { NeverminedInitializationOptions } from '../types/GeneralTypes'
import { PublishMetadataOptions, PublishOnChainOptions } from '../types/MetadataTypes'
import { SubscribablePromise } from '../utils/SubscribablePromise'
import { Nevermined } from './Nevermined'
import { CreateProgressStep, OrderProgressStep, UpdateProgressStep } from './ProgressSteps'
import { SearchApi } from './api/SearchApi'
import { ServicesApi } from './api/ServicesApi'
import { createKernelClient, isValidAddress } from './utils/BlockchainViemUtils'

export enum NVMAppEnvironments {
  Staging = 'staging',
  Testing = 'testing',
  Live = 'live',
  Matic = 'matic',
  Gnosis = 'gnosis',
  Base = 'base',
  BaseSepolia = 'base-sepolia',
  Celo = 'celo',
  Optimism = 'optimism',
  Peaq = 'peaq',
  Local = 'local',
  Custom = 'custom',
}

export interface MetadataValidationResults {
  isValid: boolean
  messages: string[]
}

export interface OperationResult {
  agreementId?: string
  success: boolean
}

export interface SubscriptionBalance {
  subscriptionType: SubscriptionType
  canAccess: boolean
  isSubscriptionOwner: boolean
  balance: bigint
}

export interface NeverminedNodeInfo {
  address: string
  publicKey: string
}

/**
 * Represents the NvmApp class which is the main entry point for interacting with the Nevermined SDK.
 */
export class NvmApp {
  private configNVM: NeverminedAppOptions
  private userAccount: NvmAccount | undefined
  private searchSDK: Nevermined
  private fullSDK: Nevermined | undefined
  private zeroDevSignerAccount: SmartAccount<any> | undefined
  public assetProviders: NeverminedNodeInfo[] = []
  private loginCredentials: string | undefined
  private networkFeeReceiver: string | undefined
  private networkFee: bigint | undefined

  /**
   * Default initialization options for the Nevermined application.
   */
  static readonly defaultAppInitializationOptions: NeverminedInitializationOptions = {
    loadCore: true,
    loadServiceAgreements: true,
    loadNFTs1155: true,
    loadNFTs721: false,
    loadDispenser: true,
    loadERC20Token: true,
    loadAccessFlow: false,
    loadDIDTransferFlow: false,
    loadRewards: false,
    loadRoyalties: true,
    loadCompute: false,
  }

  // static readonly publicationOptions = {
  //   metadata: PublishMetadataOptions.OnlyMetadataAPI,
  //   did: PublishOnChainOptions.DIDRegistry,
  // }

  /**
   * Returns an instance of the NvmApp class.
   * @param appEnv - The environment for the NvmApp instance.
   * @param config - Optional configuration options for the NvmApp instance.
   * @returns A Promise that resolves to an instance of the NvmApp class.
   */
  public static async getInstance(
    appEnv: NVMAppEnvironments,
    config?: Partial<NeverminedOptions | NeverminedAppOptions>,
  ): Promise<NvmApp> {
    const defaultEnvConfig = this.getConfigFromTagName(appEnv)
    const mergedConfig = config ? { ...defaultEnvConfig, ...config } : defaultEnvConfig
    const nvmApp = new NvmApp(mergedConfig as NeverminedAppOptions)
    await nvmApp.initializeSearch()
    return nvmApp
  }

  /**
   * Represents the NvmApp class.
   * @class
   * @constructor
   * @param {NeverminedAppOptions} config - The configuration options for the Nevermined App.
   */
  private constructor(config: NeverminedAppOptions) {
    this.configNVM = config
  }

  /**
   * Initializes the search functionality of the Nevermined App.
   * @param config - Optional configuration options for the Nevermined App.
   * @returns A Promise that resolves to void.
   */
  public async initializeSearch(config?: NeverminedAppOptions) {
    this.searchSDK = await Nevermined.getSearchOnlyInstance(config ? config : this.configNVM)
  }

  /**
   * Connects to the Nevermined network and initializes the NvmApp instance.
   *
   * @param account - The account to connect with. It can be either a string representing the account address or an instance of the Account class.
   * @param message - An optional message to include in the client assertion for authentication.
   * @param config - Optional configuration options for the Nevermined instance.
   * @param initOptions - Optional initialization options for the Nevermined instance.
   * @returns An object containing the marketplace authentication token, user account, and zeroDev signer account (if applicable).
   */
  public async connect(
    account: string | NvmAccount | SmartAccount,
    message?: string,
    config?: NeverminedOptions,
    initOptions?: NeverminedInitializationOptions,
  ) {
    const ops = initOptions
      ? { ...NvmApp.defaultAppInitializationOptions, ...initOptions }
      : NvmApp.defaultAppInitializationOptions
    this.fullSDK = await Nevermined.getInstance(config ? config : this.configNVM, ops)

    if (config && config.zeroDevProjectId) {
      const kernelClient = await createKernelClient(
        account,
        config.chainId!,
        config.zeroDevProjectId,
      )
      this.userAccount = await NvmAccount.fromZeroDevSigner(kernelClient)
    } else if (account instanceof NvmAccount) {
      this.userAccount = account
    } else {
      this.userAccount = this.fullSDK.accounts.getAccount(account as string)
    }

    if (
      config &&
      config.marketplaceAuthToken &&
      this.fullSDK.utils.jwt.isTokenValid(config.marketplaceAuthToken)
    ) {
      this.loginCredentials = config.marketplaceAuthToken
    } else {
      const clientAssertion = await this.fullSDK.utils.jwt.generateClientAssertion(
        this.userAccount,
        message,
      )

      this.loginCredentials = await this.fullSDK.services.marketplace.login(clientAssertion)
    }

    const nodeInfo = await this.fullSDK.services.node.getNeverminedNodeInfo()
    this.assetProviders = [
      {
        address: nodeInfo['provider-address'],
        publicKey: nodeInfo['ecdsa-public-key'],
      },
    ]

    this.networkFeeReceiver = await this.fullSDK.keeper.nvmConfig.getFeeReceiver()
    this.networkFee = await this.fullSDK.keeper.nvmConfig.getNetworkFee()
    return {
      marketplaceAuthToken: this.loginCredentials,
      userAccount: this.userAccount,
      zeroDevSignerAccount: this.zeroDevSignerAccount,
    }
  }

  /**
   * Disconnects the NvmApp from the current web3 provider.
   * Clears the fullSDK instance and resets the user account, zeroDevSigner settings, and login credentials.
   */
  public async disconnect() {
    if (this.fullSDK && this.isWeb3Connected()) {
      this.fullSDK = undefined
      this.userAccount = undefined
      // this.useZeroDevSigner = false
      this.zeroDevSignerAccount = undefined
      this.loginCredentials = undefined
    }
  }

  /**
   * Checks if the web3 provider is connected.
   * @returns {boolean} True if the web3 provider is connected, false otherwise.
   */
  public isWeb3Connected(): boolean {
    return this.fullSDK ? this.fullSDK.isKeeperConnected : false
  }

  /**
   * Retrieves the login credentials.
   * @returns The login credentials as a string, or undefined if not set.
   */
  public getLoginCredentials(): string | undefined {
    return this.loginCredentials
  }

  /**
   * Gets the configuration options for the Nevermined application.
   * @returns The configuration options for the Nevermined application.
   */
  public get config(): NeverminedOptions {
    return this.configNVM
  }

  /**
   * Gets the SearchApi instance.
   * @returns The SearchApi instance.
   */
  public get search(): SearchApi {
    return this.searchSDK.search
  }

  /**
   * Gets the Services API instance.
   * @returns The Services API instance.
   */
  public get services(): ServicesApi {
    return this.searchSDK.services
  }

  /**
   * Gets the Nevermined SDK instance.
   * @returns The Nevermined SDK instance.
   * @throws {Web3Error} If Web3 is not connected, try calling the connect method first.
   */
  public get sdk(): Nevermined {
    if (!this.fullSDK || !this.isWeb3Connected())
      throw new Web3Error('Web3 not connected, try calling the connect method first')
    return this.fullSDK
  }

  /**
   * Gets the network fees.
   * @returns An object containing the receiver and fee.
   */
  public get networkFees(): { receiver: string; fee: bigint } {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.networkFeeReceiver || !this.networkFee)
      throw new Web3Error('Web3 not connected, try calling the connect method first')
    return { receiver: this.networkFeeReceiver, fee: this.networkFee }
  }

  /**
   * It gets an encrypted Nevermined API Key that can be used to interact with the Nevermined.
   * The generation of the API Key requires to have a ZeroDev Session Key that is given as parameter to this method.
   * @param sessionKey - The Zero Dev Session Key.
   * @returns A encrypted Nevermined API Key.
   * @throws {Web3Error} If Web3 is not connected. Call the connect method first.
   */
  public async getEncryptedAPIKey(sessionKey: string): Promise<string> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    const marketplaceAuthToken = this.getLoginCredentials() as string

    const { exp } = NvmApiKey.decodeJWT(marketplaceAuthToken)

    return NvmApiKey.generate(
      this.fullSDK.utils.signature,
      this.userAccount,
      sessionKey,
      this.getLoginCredentials() as string,
      this.assetProviders[0].address,
      this.assetProviders[0].publicKey,
      exp,
    )
  }

  public getProviderAddresses(): string[] {
    return this.assetProviders
      .filter((provider) => isValidAddress(provider.address))
      .map((provider) => provider.address)
  }

  /**
   * Creates a time-based subscription for a given asset.
   *
   * @param susbcriptionMetadata - The metadata of the subscription.
   * @param subscriptionPrice - The price of the subscription.
   * @param duration - The duration of the subscription in seconds.
   * @returns A promise that resolves to the progress steps and the resulting DDO (Decentralized Data Object).
   * @throws {Web3Error} If Web3 is not connected.
   * @throws {Error} If the validation of the subscription fails.
   */
  public createTimeSubscription(
    susbcriptionMetadata: MetaData,
    subscriptionPrice: AssetPrice,
    duration: number,
    subscriptionNFTContractTimeAddress?: string,
  ): SubscribablePromise<CreateProgressStep, DDO> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    const validationResult = this.validateSubscription(
      susbcriptionMetadata,
      subscriptionPrice,
      SubscriptionType.Time,
    )
    if (!validationResult.isValid) {
      throw new Error(validationResult.messages.join(','))
    }

    this.fullSDK.services.node.getVersionInfo()

    let nftContractAddress = subscriptionNFTContractTimeAddress
      ? subscriptionNFTContractTimeAddress
      : this.configNVM.nftContractTimeAddress

    if (!nftContractAddress) {
      nftContractAddress = this.fullSDK.nfts1155.address
    }
    if (!isValidAddress(nftContractAddress as string)) {
      throw new Web3Error('Invalid Subscription NFT contract time address')
    }

    const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
      metadata: susbcriptionMetadata,
      services: [
        {
          serviceType: 'nft-sales',
          price: subscriptionPrice,
          nft: {
            duration,
            amount: 1n,
            nftTransfer: false,
          },
        },
      ],
      providers: this.getProviderAddresses(),
      nftContractAddress: nftContractAddress,
      preMint: false,
    })

    return this.fullSDK.nfts1155.create(nftAttributes, this.userAccount, {
      metadata: PublishMetadataOptions.OnlyMetadataAPI,
      did: PublishOnChainOptions.DIDRegistry,
    })
  }

  /**
   * Creates a time-based subscription asynchronously.
   *
   * @param susbcriptionMetadata - The metadata for the subscription.
   * @param subscriptionPrice - The price of the subscription.
   * @param duration - The duration of the subscription in seconds.
   * @returns A Promise that resolves to the {@link DDO} (Decentralized Data Object) of the created subscription.
   */
  public async createTimeSubscriptionAsync(
    susbcriptionMetadata: MetaData,
    subscriptionPrice: AssetPrice,
    duration: number,
  ): Promise<DDO> {
    return await this.createTimeSubscription(susbcriptionMetadata, subscriptionPrice, duration)
  }

  /**
   * Creates a credits subscription.
   *
   * @param susbcriptionMetadata - The metadata for the subscription.
   * @param subscriptionPrice - The price of the subscription.
   * @param numberCredits - The number of credits for the subscription.
   * @returns A `SubscribablePromise` that resolves to a `DDO` object representing the created subscription.
   * @throws {Web3Error} If Web3 is not connected.
   * @throws {Error} If the validation of the subscription fails.
   */
  public createCreditsSubscription(
    susbcriptionMetadata: MetaData,
    subscriptionPrice: AssetPrice,
    numberCredits: bigint,
    subscriptionNFTContractCreditsAddress?: string,
  ): SubscribablePromise<CreateProgressStep, DDO> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    const validationResult = this.validateSubscription(
      susbcriptionMetadata,
      subscriptionPrice,
      SubscriptionType.Credits,
    )
    if (!validationResult.isValid) {
      throw new Error(validationResult.messages.join(','))
    }

    let nftContractAddress = subscriptionNFTContractCreditsAddress
      ? subscriptionNFTContractCreditsAddress
      : this.configNVM.nftContractCreditsAddress

    if (!nftContractAddress) {
      nftContractAddress = this.fullSDK.nfts1155.address
    }
    if (!isValidAddress(nftContractAddress as string)) {
      throw new Web3Error('Invalid Subscription NFT contract credits address')
    }

    const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
      metadata: susbcriptionMetadata,
      services: [
        {
          serviceType: 'nft-sales',
          price: subscriptionPrice,
          nft: {
            amount: numberCredits,
            nftTransfer: false,
          },
        },
      ],
      providers: this.getProviderAddresses(),
      nftContractAddress: nftContractAddress,
      preMint: false,
    })

    return this.fullSDK.nfts1155.create(
      nftAttributes,
      this.userAccount,
      {
        metadata: PublishMetadataOptions.OnlyMetadataAPI,
        did: PublishOnChainOptions.DIDRegistry,
      },
      // TODO: Review ZeroDev integration as part of the NvmAccount
      // { ...(this.useZeroDevSigner && { zeroDevSigner: this.zeroDevSignerAccount }) },
    )
  }

  /**
   * Creates a credits subscription asynchronously.
   *
   * @param susbcriptionMetadata - The metadata for the subscription.
   * @param subscriptionPrice - The price of the subscription.
   * @param numberCredits - The number of credits for the subscription.
   * @returns A Promise that resolves to a DDO (Decentralized Data Object).
   */
  public async createCreditsSubscriptionAsync(
    susbcriptionMetadata: MetaData,
    subscriptionPrice: AssetPrice,
    numberCredits: bigint,
  ): Promise<DDO> {
    return await this.createCreditsSubscription(
      susbcriptionMetadata,
      subscriptionPrice,
      numberCredits,
    )
  }

  /**
   * Updates the metadata of an asset.
   *
   * @param did - The decentralized identifier (DID) of the asset.
   * @param metadata - The updated metadata for the asset.
   * @returns A `SubscribablePromise` that resolves to the updated `DDO` (Decentralized Data Object).
   * @throws {Web3Error} If Web3 is not connected. Call the `connect` method first.
   */
  public updateAsset(
    did: string,
    metadata: MetaData,
  ): SubscribablePromise<UpdateProgressStep, DDO> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    return this.fullSDK.assets.update(
      did,
      metadata,
      this.userAccount,
      PublishMetadataOptions.OnlyMetadataAPI,
      //{ ...(this.useZeroDevSigner && { zeroDevSigner: this.zeroDevSignerAccount }) },
    )
  }

  /**
   * Updates the asset with the specified DID using the provided metadata.
   * @param did - The DID (Decentralized Identifier) of the asset to update.
   * @param metadata - The updated metadata for the asset.
   * @returns A Promise that resolves to the updated DDO (Decentralized Data Object) of the asset.
   */
  public async updateAssetAsync(did: string, metadata: MetaData): Promise<DDO> {
    return await this.updateAsset(did, metadata)
  }

  /**
   * Orders a subscription and claim asynchronously.
   *
   * @param subscriptionDid - The DID of the subscription.
   * @param agreementId - The ID of the agreement (optional).
   * @returns A Promise that resolves to an OperationResult object.
   * @throws {Web3Error} If Web3 is not connected.
   * @throws {Web3Error} If there is an error ordering the subscription.
   */
  public async orderSubscriptionAsync(
    subscriptionDid: string,
    agreementId?: string,
  ): Promise<OperationResult> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    let numberCredits: bigint
    let serviceIndex: number
    let transferResult = false
    try {
      const ddo = await this.fullSDK.assets.resolve(subscriptionDid)
      const salesService = ddo.findServiceByReference('nft-sales')
      serviceIndex = salesService.index
      numberCredits = salesService.attributes.main.nftAttributes.amount as bigint

      const subscriptionNftAddress = DDO.getNftContractAddressFromService(
        salesService as ServiceNFTSales,
      )
      this.sdk.contracts.loadNft1155(subscriptionNftAddress)

      if (!agreementId)
        agreementId = await this.fullSDK.nfts1155.order(
          subscriptionDid,
          numberCredits,
          this.userAccount,
          serviceIndex,
          // TODO: Review ZeroDev integration as part of the NvmAccount
          // { ...(this.useZeroDevSigner && { zeroDevSigner: this.zeroDevSignerAccount }) },
        )
      const subscriptionOwner = await this.fullSDK.assets.owner(subscriptionDid)
      transferResult = await this.fullSDK.nfts1155.claim(
        agreementId,
        subscriptionOwner,
        this.userAccount.getId(),
        numberCredits,
        subscriptionDid,
        serviceIndex,
      )
      if (!transferResult) {
        throw new Error(`Error claiming the NFT of the subscription with agreement ${agreementId}`)
      }
    } catch (error) {
      throw new Web3Error(`Error ordering subscription: ${error.message}`)
    }

    return { agreementId, success: transferResult }
  }

  /**
   * Orders a subscription for a given NFT.
   *
   * @param subscriptionDid - The DID of the subscription NFT.
   * @param numberCredits - The number of credits to be used for the subscription.
   * @param serviceIndex - (Optional) The index of the service to be used for the subscription.
   * @returns A `SubscribablePromise` that resolves to the progress of the order or rejects with an error message.
   * @throws {Web3Error} If Web3 is not connected.
   * @throws {Web3Error} If there is an error ordering the subscription.
   */
  public orderSubscription(
    subscriptionDid: string,
    numberCredits: bigint,
    serviceIndex?: number,
  ): SubscribablePromise<OrderProgressStep, string> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    try {
      return this.fullSDK.nfts1155.order(
        subscriptionDid,
        numberCredits,
        this.userAccount,
        serviceIndex,
        //{ ...(this.useZeroDevSigner && { zeroDevSigner: this.zeroDevSignerAccount }) },
      )
    } catch (error) {
      throw new Web3Error(`Error ordering subscription: ${error.message}`)
    }
  }

  /**
   * Claims a subscription by transferring the specified number of credits from the subscription owner to the user's account.
   * @param agreementId - The ID of the agreement associated with the subscription.
   * @param subscriptionDid - The DID (Decentralized Identifier) of the subscription.
   * @param numberCredits - The number of credits to be claimed.
   * @param serviceIndex - (Optional) The index of the service within the subscription.
   * @returns A Promise that resolves to a boolean indicating whether the claim was successful.
   * @throws {Web3Error} If Web3 is not connected or if there is an error claiming the NFT of the subscription.
   */
  public async claimSubscription(
    agreementId: string,
    subscriptionDid: string,
    numberCredits: bigint,
    serviceIndex?: number,
  ): Promise<boolean> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')
    try {
      const subscriptionOwner = await this.fullSDK.assets.owner(subscriptionDid)
      return this.fullSDK.nfts1155.claim(
        agreementId,
        subscriptionOwner,
        this.userAccount.getId(),
        numberCredits,
        subscriptionDid,
        serviceIndex,
      )
    } catch (error) {
      throw new Web3Error(
        `Error claiming the NFT of the subscription with agreement ${agreementId}`,
      )
    }
  }

  /**
   * Retrieves the balance and subscription information for a given subscription DID and account address.
   * If no account address is provided, the user's account ID will be used.
   *
   * @param subscriptionDid - The DID (Decentralized Identifier) of the subscription.
   * @param accountAddress - (Optional) The Ethereum address of the account. If not provided, the user's account ID will be used.
   * @returns A Promise that resolves to a SubscriptionBalance object containing the subscription type, balance, and access information.
   * @throws {Web3Error} If the Web3 provider is not connected.
   * @throws {Web3Error} If there is an error retrieving the subscription information.
   */
  public async getBalance(
    subscriptionDid: string,
    accountAddress?: string,
  ): Promise<SubscriptionBalance> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    const address = accountAddress ? accountAddress : this.userAccount.getId()

    try {
      const ddo = await this.fullSDK.assets.resolve(subscriptionDid)
      const salesService = ddo.findServiceByReference('nft-sales')
      const subscriptionType = salesService.attributes.main.nftAttributes.subscriptionType
      const numberCredits = salesService.attributes.main.nftAttributes.amount

      const subscriptionOwner = await this.fullSDK.assets.owner(subscriptionDid)
      const balance = await this.fullSDK.nfts1155.balance(subscriptionDid, address)
      const isOwner = address.toLowerCase() === subscriptionOwner.toLowerCase()
      const canAccess = isOwner || balance >= numberCredits
      return {
        subscriptionType,
        canAccess,
        isSubscriptionOwner: address.toLowerCase() === subscriptionOwner.toLowerCase(),
        balance,
      }
    } catch (error) {
      throw new Web3Error(`Error ordering subscription: ${error.message}`)
    }
  }

  /**
   * Retrieves the service access token for a given service DID.
   * @param serviceDid - The service DID for which to retrieve the access token.
   * @returns A promise that resolves to the subscription token.
   * @throws {Web3Error} If Web3 is not connected. Call the connect method first.
   */
  public async getServiceAccessToken(serviceDid: string): Promise<SubscriptionToken> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    return await this.fullSDK.nfts1155.getSubscriptionToken(serviceDid, this.userAccount)
  }

  /**
   * Downloads files associated with a given file asset DID.
   *
   * @param fileAssetDid - The DID of the file asset.
   * @param fileIndex - (Optional) The index of the file to download if the file asset contains multiple files.
   * @param destinationPath - (Optional) The path where the downloaded files will be saved.
   * @param agreementId - (Optional) The ID of the agreement associated with the file asset.
   * @returns A Promise that resolves to an OperationResult object containing the agreement ID and the success status of the download operation.
   * @throws {Web3Error} If there is an error downloading the files.
   */
  public async downloadFiles(
    fileAssetDid: string,
    fileIndex?: number,
    destinationPath?: string,
    agreementId?: string,
  ): Promise<OperationResult> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    try {
      const result = await this.fullSDK.nfts1155.access(
        fileAssetDid,
        this.userAccount,
        destinationPath,
        fileIndex,
        agreementId,
      )
      return { agreementId, success: result }
    } catch (error) {
      throw new Web3Error(`Error downloading files: ${error.message}`)
    }
  }

  /**
   * Registers a service asset.
   *
   * @param metadata - The metadata of the asset.
   * @param subscriptionDid - The subscription DID.
   * @param costInCredits - The cost in credits (default: 1).
   * @param minCreditsToCharge - The minimum credits required to charge (default: 1).
   * @param maxCreditsToCharge - The maximum credits to charge (default: 1).
   * @param nftContractAddress - The address of the NFT contract associated with the file asset.
   * @returns A promise that resolves to the progress steps and the registered DDO.
   * @throws {Web3Error} If Web3 is not connected.
   * @throws {Error} If the metadata validation fails.
   */
  public registerServiceAsset(
    metadata: MetaData,
    subscriptionDid: string,
    costInCredits = 1n,
    minCreditsToCharge = 1n,
    maxCreditsToCharge = 1n,
    nftContractAddress: string,
  ): SubscribablePromise<CreateProgressStep, DDO> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    const validationResult = this.validateServiceAssetMetadata(metadata)
    if (!validationResult.isValid) {
      throw new Error(validationResult.messages.join(','))
    }

    const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
      metadata,
      services: [
        {
          serviceType: 'nft-access',
          nft: {
            tokenId: subscriptionDid,
            amount: costInCredits,
            maxCreditsToCharge,
            minCreditsRequired: minCreditsToCharge,
            minCreditsToCharge,
            nftTransfer: false,
          },
        },
      ],
      providers: this.getProviderAddresses(),
      nftContractAddress,
      preMint: false,
    })

    return this.fullSDK.nfts1155.create(nftAttributes, this.userAccount, {
      metadata: PublishMetadataOptions.OnlyMetadataAPI,
      did: PublishOnChainOptions.DIDRegistry,
    })
  }

  public async registerServiceAssetAsync(
    metadata: MetaData,
    subscriptionDid: string,
    costInCredits = 1n,
    minCreditsToCharge = 1n,
    maxCreditsToCharge = 1n,
    nftContractAddress: string,
  ): Promise<DDO> {
    return await this.registerServiceAsset(
      metadata,
      subscriptionDid,
      costInCredits,
      minCreditsToCharge,
      maxCreditsToCharge,
      nftContractAddress,
    )
  }

  /**
   * Registers a file asset by creating a new DDO (Decentralized Data Object) on the network.
   *
   * @param metadata - The metadata of the file asset.
   * @param subscriptionDid - The subscription DID (Decentralized Identifier) associated with the file asset.
   * @param costInCredits - The cost of the file asset in credits (default is 1).
   * @param nftContractAddress - The address of the NFT contract associated with the file asset.
   * @returns A `SubscribablePromise` that resolves to a `DDO` (Decentralized Data Object) representing the registered file asset.
   * @throws {Web3Error} If the Web3 connection is not established.
   * @throws {Error} If the file asset metadata is not valid.
   */
  public registerFileAsset(
    metadata: MetaData,
    subscriptionDid: string,
    costInCredits = 1n,
    nftContractAddress: string,
  ): SubscribablePromise<CreateProgressStep, DDO> {
    if (!this.fullSDK || !this.isWeb3Connected() || !this.userAccount)
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    const validationResult = this.validateFileAssetMetadata(metadata)
    if (!validationResult.isValid) {
      throw new Error(validationResult.messages.join(','))
    }

    const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
      metadata,
      services: [
        {
          serviceType: 'nft-access',
          nft: {
            tokenId: subscriptionDid,
            amount: costInCredits,
            nftTransfer: false,
          },
        },
      ],
      providers: this.getProviderAddresses(),
      nftContractAddress,
      preMint: false,
    })

    return this.fullSDK.nfts1155.create(nftAttributes, this.userAccount, {
      metadata: PublishMetadataOptions.OnlyMetadataAPI,
      did: PublishOnChainOptions.DIDRegistry,
    })
  }

  /**
   * Registers a file asset asynchronously.
   *
   * @param metadata - The metadata of the file asset.
   * @param subscriptionDid - The subscription DID.
   * @param costInCredits - The cost in credits (default: 1n).
   * @returns A Promise that resolves to the registered DDO (Decentralized Data Object).
   */
  public async registerFileAssetAsync(
    metadata: MetaData,
    subscriptionDid: string,
    costInCredits = 1n,
    nftContractAddress: string,
  ): Promise<DDO> {
    return await this.registerFileAsset(
      metadata,
      subscriptionDid,
      costInCredits,
      nftContractAddress,
    )
  }

  /**
   * Adds the network fee to the given asset price.
   * If the network fee is not already included in the price, it adjusts the price to include the network fees.
   *
   * @param price - The asset price to which the network fee will be added.
   * @returns The updated asset price with the network fee included, or the original price if the network fee is already included.
   */
  public addNetworkFee(price: AssetPrice): AssetPrice {
    if (!this.isNetworkFeeIncluded(price)) {
      return price.adjustToIncludeNetworkFees(
        this.networkFeeReceiver as string,
        this.networkFee as bigint,
      )
    }
    return price
  }

  /**
   * Checks if the network fee is included in the given asset price.
   * @param price - The asset price to check.
   * @returns A boolean indicating whether the network fee is included.
   */
  public isNetworkFeeIncluded(price: AssetPrice): boolean {
    if (!this.fullSDK || !this.isWeb3Connected())
      throw new Web3Error('Web3 not connected, try calling the connect method first')
    // If there are no network fees everything is okay
    if (this.networkFee === 0n || price.getTotalPrice() === 0n) return true
    if (!price.getRewards().has(this.networkFeeReceiver as string)) return false

    const networkFee = price.getRewards().get(this.networkFeeReceiver as string)
    const expectedFee =
      (price.getTotalPrice() * (this.networkFee as bigint)) / NETWORK_FEE_DENOMINATOR / 100n
    if (networkFee !== expectedFee) return false
    return true
  }

  // TODO: Implement subscription validations
  protected validateSubscription(
    metadata: MetaData,
    price: AssetPrice,
    subscriptionType: SubscriptionType,
  ): MetadataValidationResults {
    const errorMessages: string[] = []
    if (!this.isNetworkFeeIncluded(price)) errorMessages.push('Network fee not included')
    if (!metadata.additionalInformation?.customData) errorMessages.push('Custom Data not included')
    if (!metadata.additionalInformation?.customData?.subscriptionLimitType)
      errorMessages.push('customData.subscriptionLimitType not included')
    if (
      metadata.additionalInformation?.customData?.subscriptionLimitType !==
      subscriptionType.toString()
    )
      errorMessages.push('invalid customData.subscriptionLimitType value')

    if (subscriptionType === SubscriptionType.Time) {
      if (!metadata.additionalInformation?.customData?.dateMeasure)
        errorMessages.push('customData.dateMeasure not included')
    }

    if (errorMessages.length > 0) return { isValid: false, messages: errorMessages }
    return { isValid: true, messages: [] }
  }

  // TODO: Implement subscription validations
  protected validateServiceAssetMetadata(
    _susbcriptionMetadata: MetaData,
  ): MetadataValidationResults {
    return { isValid: true, messages: [] }
  }

  // TODO: Implement subscription validations
  protected validateFileAssetMetadata(_susbcriptionMetadata: MetaData): MetadataValidationResults {
    return { isValid: true, messages: [] }
  }

  private static getConfigFromTagName(appEnv: NVMAppEnvironments) {
    const defaultDeploymentConfig = this.switchConfigBetweenEnvs(appEnv)
    return defaultDeploymentConfig
  }

  private static switchConfigBetweenEnvs(appEnv: NVMAppEnvironments): NeverminedOptions {
    switch (appEnv) {
      case NVMAppEnvironments.Staging:
        return new AppDeploymentStaging()
      case NVMAppEnvironments.Testing:
        return new AppDeploymentTesting()
      case NVMAppEnvironments.Live:
        return new AppDeploymentArbitrum()
      case NVMAppEnvironments.Matic:
        return new AppDeploymentMatic()
      case NVMAppEnvironments.Gnosis:
        return new AppDeploymentGnosis()
      case NVMAppEnvironments.Base:
        return new AppDeploymentBase()
      case NVMAppEnvironments.BaseSepolia:
        return new AppDeploymentBaseSepolia()
      case NVMAppEnvironments.Celo:
        return new AppDeploymentCelo()
      case NVMAppEnvironments.Optimism:
        return new AppDeploymentOptimism()
      case NVMAppEnvironments.Peaq:
        return new AppDeploymentPeaq()
      case NVMAppEnvironments.Local:
        return new AppDeploymentLocal()
      default:
        throw new Error('Invalid environment')
    }
  }
}
