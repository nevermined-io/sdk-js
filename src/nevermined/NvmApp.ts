import { NETWORK_FEE_DENOMINATOR } from '@/constants/AssetConstants'
import { DDO } from '@/ddo/DDO'
import { Web3Error } from '@/errors/NeverminedErrors'
import { ContractHandler } from '@/keeper/ContractHandler'
import { AssetPrice } from '@/models/AssetPrice'
import { NFTAttributes } from '@/models/NFTAttributes'
import { NeverminedOptions } from '@/models/NeverminedOptions'
import { NvmAccount } from '@/models/NvmAccount'
import {
  AppDeploymentArbitrum,
  AppDeploymentBase,
  AppDeploymentCelo,
  AppDeploymentGnosis,
  AppDeploymentLocal,
  AppDeploymentMatic,
  AppDeploymentMumbai,
  AppDeploymentOptimism,
  AppDeploymentStaging,
  AppDeploymentTesting,
  NeverminedAppOptions,
} from '@/nevermined/resources/AppNetworks'
import { SubscriptionToken } from '@/services/node/NeverminedNode'
import { SubscriptionType, MetaData } from '@/types/DDOTypes'
import { NeverminedInitializationOptions } from '@/types/GeneralTypes'
import { PublishMetadataOptions, PublishOnChainOptions } from '@/types/MetadataTypes'
import { Nevermined } from './Nevermined'
import { SearchApi } from './api/SearchApi'
import { isValidAddress } from './utils/BlockchainViemUtils'

export enum NVMAppEnvironments {
  Staging = 'staging',
  Testing = 'testing',
  Live = 'live',
  Matic = 'matic',
  Mumbai = 'mumbai',
  Gnosis = 'gnosis',
  Base = 'base',
  Celo = 'celo',
  Optimism = 'optimism',
  Local = 'local',
  Custom = 'custom',
}

export interface MetadataValidationResults {
  isValid: boolean
  messages: string[]
}

export interface OperationResult {
  agreementId: string
  success: boolean
}

export interface SubscriptionBalance {
  subscriptionType: SubscriptionType
  canAccess: boolean
  isSubscriptionOwner: boolean
  balance: bigint
}

export class NvmApp {
  private configNVM: NeverminedAppOptions
  private userAccount: NvmAccount | undefined
  private searchSDK: Nevermined | undefined
  private fullSDK: Nevermined | undefined
  // private useZeroDevSigner: boolean = false
  // private zeroDevSignerAccount?: ZeroDevAccountSigner<'ECDSA'>
  private assetProviders: string[] = []
  private loginCredentials: string | undefined
  private subscriptionNFTContractAddress: string | undefined
  private networkFeeReceiver: string | undefined
  private networkFee: bigint | undefined

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

  public static async getInstance(
    appEnv: NVMAppEnvironments,
    config?: Partial<NeverminedOptions>,
  ): Promise<NvmApp> {
    const defaultEnvConfig = this.getConfigFromTagName(appEnv)
    const mergedConfig = config ? { ...defaultEnvConfig, ...config } : defaultEnvConfig
    const nvmApp = new NvmApp(mergedConfig as NeverminedAppOptions)
    await nvmApp.initializeSearch()
    return nvmApp
  }

  private constructor(config: NeverminedAppOptions) {
    this.configNVM = config
  }

  public async initializeSearch(config?: NeverminedAppOptions) {
    this.searchSDK = await Nevermined.getSearchOnlyInstance(config ? config : this.configNVM)
  }

  public async connect(
    account: string | NvmAccount,
    config?: NeverminedOptions,
    initOptions?: NeverminedInitializationOptions,
  ) {
    const ops = initOptions
      ? { ...NvmApp.defaultAppInitializationOptions, ...initOptions }
      : NvmApp.defaultAppInitializationOptions
    this.fullSDK = await Nevermined.getInstance(config ? config : this.configNVM, ops)

    if (account instanceof NvmAccount) {
      // TODO Review ZeroDev integration as part of the NvmAccount
      this.userAccount = account
      // this.zeroDevSignerAccount = account
      // this.useZeroDevSigner = true
    } else {
      this.userAccount = this.fullSDK.accounts.getAccount(account)
    }

    console.log(
      `Using account: ${this.userAccount.getAddress()} with type ${
        this.userAccount.accountType.signerType
      }`,
    )
    const clientAssertion = await this.fullSDK.utils.jwt.generateClientAssertion(this.userAccount)
    console.log('Client assertion: ', clientAssertion)

    this.loginCredentials = await this.fullSDK.services.marketplace.login(clientAssertion)
    console.log('Login credentials: ', this.loginCredentials)

    const nodeInfo = await this.fullSDK.services.node.getNeverminedNodeInfo()
    this.assetProviders = [nodeInfo['provider-address']]

    console.log('Asset Providers: ', this.assetProviders)
    if (!isValidAddress(this.configNVM.nftContractAddress)) {
      const contractABI = await ContractHandler.getABIArtifact(
        'NFT1155SubscriptionUpgradeable',
        this.configNVM.artifactsFolder,
        await this.fullSDK.keeper.getNetworkName(),
      )
      this.subscriptionNFTContractAddress = contractABI.address
    } else {
      this.subscriptionNFTContractAddress = this.configNVM.nftContractAddress
    }
    if (!isValidAddress(this.subscriptionNFTContractAddress)) {
      throw new Web3Error('Invalid Subscription NFT contract address')
    }
    this.sdk.contracts.loadNft1155(this.subscriptionNFTContractAddress)
    this.networkFeeReceiver = await this.fullSDK.keeper.nvmConfig.getFeeReceiver()
    this.networkFee = await this.fullSDK.keeper.nvmConfig.getNetworkFee()
  }

  public async disconnect() {
    if (this.fullSDK && this.isWeb3Connected()) {
      this.fullSDK = undefined
      this.userAccount = undefined
      // this.useZeroDevSigner = false
      // this.zeroDevSignerAccount = undefined
      this.loginCredentials = undefined
    }
  }

  public isWeb3Connected(): boolean {
    return this.fullSDK ? this.fullSDK.isKeeperConnected : false
  }

  public getLoginCredentials(): string | undefined {
    return this.loginCredentials
  }

  public get config(): NeverminedOptions {
    return this.configNVM
  }

  public get search(): SearchApi {
    return this.searchSDK.search
  }

  public get sdk(): Nevermined {
    if (!this.isWeb3Connected())
      throw new Web3Error('Web3 not connected, try calling the connect method first')
    return this.fullSDK
  }

  public get networkFees(): { receiver: string; fee: bigint } {
    return { receiver: this.networkFeeReceiver, fee: this.networkFee }
  }

  public async createTimeSubscription(
    susbcriptionMetadata: MetaData,
    subscriptionPrice: AssetPrice,
    duration: number,
  ): Promise<DDO> {
    if (!this.isWeb3Connected())
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
      providers: this.assetProviders,
      nftContractAddress: this.subscriptionNFTContractAddress,
      preMint: false,
    })

    return await this.fullSDK.nfts1155.create(
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

  public async createCreditsSubscription(
    susbcriptionMetadata: MetaData,
    subscriptionPrice: AssetPrice,
    numberCredits: bigint,
  ): Promise<DDO> {
    if (!this.isWeb3Connected())
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    const validationResult = this.validateSubscription(
      susbcriptionMetadata,
      subscriptionPrice,
      SubscriptionType.Credits,
    )
    if (!validationResult.isValid) {
      throw new Error(validationResult.messages.join(','))
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
      providers: this.assetProviders,
      nftContractAddress: this.subscriptionNFTContractAddress,
      preMint: false,
    })

    return await this.fullSDK.nfts1155.create(
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

  public async orderSubscription(
    subscriptionDid: string,
    agreementId?: string,
  ): Promise<OperationResult> {
    if (!this.isWeb3Connected())
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    let numberCredits: bigint
    let serviceIndex: number
    let transferResult = false
    try {
      const ddo = await this.fullSDK.assets.resolve(subscriptionDid)
      const salesService = ddo.findServiceByReference('nft-sales')
      serviceIndex = salesService.index
      numberCredits = salesService.attributes.main.nftAttributes.amount as bigint

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
    } catch (error) {
      throw new Web3Error(`Error ordering subscription: ${error.message}`)
    }

    return { agreementId, success: transferResult }
  }

  public async getBalance(
    subscriptionDid: string,
    accountAddress?: string,
  ): Promise<SubscriptionBalance> {
    if (!this.isWeb3Connected())
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    const address = accountAddress ? accountAddress : this.userAccount.getId()

    try {
      const ddo = await this.fullSDK.assets.resolve(subscriptionDid)
      const salesService = ddo.findServiceByReference('nft-sales')
      const subscriptionType = salesService.attributes.main.nftAttributes.subscriptionType
      const numberCredits = salesService.attributes.main.nftAttributes.amount

      const subscriptionOwner = await this.fullSDK.assets.owner(subscriptionDid)
      console.log(`Subscription Owner: ${subscriptionOwner}`)
      console.log(`User Address: ${address}`)
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

  public async getServiceAccessToken(serviceDid: string): Promise<SubscriptionToken> {
    if (!this.isWeb3Connected())
      throw new Web3Error('Web3 not connected, try calling the connect method first')

    return await this.fullSDK.nfts1155.getSubscriptionToken(serviceDid, this.userAccount)
  }

  public async downloadFiles(
    fileAssetDid: string,
    agreementId: string,
    destinationPath: string,
  ): Promise<OperationResult> {
    try {
      const result = await this.fullSDK.nfts1155.access(
        fileAssetDid,
        this.userAccount,
        destinationPath,
        undefined,
        agreementId,
      )
      return { agreementId, success: result }
    } catch (error) {
      throw new Web3Error(`Error downloading files: ${error.message}`)
    }
  }

  public async registerServiceAsset(
    metadata: MetaData,
    subscriptionDid: string,
    costInCredits = 1n,
    minCreditsToCharge = 1n,
    maxCreditsToCharge = 1n,
  ): Promise<DDO> {
    if (!this.isWeb3Connected())
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
            minCreditsToCharge,
            nftTransfer: false,
          },
        },
      ],
      providers: this.assetProviders,
      nftContractAddress: this.subscriptionNFTContractAddress,
      preMint: false,
    })

    return await this.fullSDK.nfts1155.create(
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

  public async registerFileAsset(
    metadata: MetaData,
    subscriptionDid: string,
    costInCredits = 1n,
  ): Promise<DDO> {
    if (!this.isWeb3Connected())
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
      providers: this.assetProviders,
      nftContractAddress: this.subscriptionNFTContractAddress,
      preMint: false,
    })

    return await this.fullSDK.nfts1155.create(
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

  public addNetworkFee(price: AssetPrice): AssetPrice {
    if (!this.isNetworkFeeIncluded(price)) {
      return price.adjustToIncludeNetworkFees(this.networkFeeReceiver, this.networkFee)
    }
    return price
  }

  public isNetworkFeeIncluded(price: AssetPrice): boolean {
    // If there are no network fees everything is okay
    if (this.networkFee === 0n || price.getTotalPrice() === 0n) return true
    if (!price.getRewards().has(this.networkFeeReceiver)) return false

    const networkFee = price.getRewards().get(this.networkFeeReceiver)
    const expectedFee = (price.getTotalPrice() * this.networkFee) / NETWORK_FEE_DENOMINATOR / 100n
    if (networkFee !== expectedFee) return false
    return true
  }

  // TODO: Implement subscription validations
  public validateSubscription(
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
  public validateServiceAssetMetadata(_susbcriptionMetadata: MetaData): MetadataValidationResults {
    return { isValid: true, messages: [] }
  }

  // TODO: Implement subscription validations
  public validateFileAssetMetadata(_susbcriptionMetadata: MetaData): MetadataValidationResults {
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
      case NVMAppEnvironments.Mumbai:
        return new AppDeploymentMumbai()
      case NVMAppEnvironments.Gnosis:
        return new AppDeploymentGnosis()
      case NVMAppEnvironments.Base:
        return new AppDeploymentBase()
      case NVMAppEnvironments.Celo:
        return new AppDeploymentCelo()
      case NVMAppEnvironments.Optimism:
        return new AppDeploymentOptimism()
      case NVMAppEnvironments.Local:
        return new AppDeploymentLocal()
      default:
        throw new Error('Invalid environment')
    }
  }
}
