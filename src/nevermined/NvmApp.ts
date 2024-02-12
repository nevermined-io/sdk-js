import { ZeroDevAccountSigner } from '@zerodev/sdk'
import {
  Account,
  AssetPrice,
  ContractHandler,
  DDO,
  MetaData,
  NFTAttributes,
  Nevermined,
  NeverminedInitializationOptions,
  NeverminedOptions,
  PublishMetadataOptions,
  PublishOnChainOptions,
  SearchApi,
  SubscriptionToken,
  Web3Error,
} from '../sdk'
import {
  AppDeploymentArbitrum,
  AppDeploymentGnosis,
  AppDeploymentLocal,
  AppDeploymentMatic,
  AppDeploymentMumbai,
  AppDeploymentStaging,
  AppDeploymentTesting,
  NeverminedAppOptions,
} from './resources/AppNetworks'
import { isAddress } from 'ethers'

export enum NVMAppEnvironments {
  Staging = 'staging',
  Testing = 'testing',
  Live = 'live',
  Matic = 'matic',
  Mumbai = 'mumbai',
  Gnosis = 'gnosis',
  Local = 'local',
  Custom = 'custom',
}

export enum NVMAppSubscriptionType {
  Time = 'time',
  Credits = 'credits',
}

export interface MetadataValidationResults {
  isValid: boolean
  messages: string[]
}

export interface OperationResult {
  agreementId: string
  success: boolean
}

export class NvmApp {
  private configNVM: NeverminedAppOptions
  private userAccount: Account | undefined
  private searchSDK: Nevermined | undefined
  private fullSDK: Nevermined | undefined
  private useZeroDevSigner: boolean = false
  private zeroDevSignerAccount?: ZeroDevAccountSigner<'ECDSA'>
  private assetProviders: string[] = []
  private loginCredentials: string | undefined
  private subscriptionNFTContractAddress: string | undefined
  private networkFeeReceiver: string | undefined
  private networkFee: bigint | undefined

  static readonly defaultAppInitializatioinOptions: NeverminedInitializationOptions = {
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

  static readonly publicationOptions = {
    metadata: PublishMetadataOptions.OnlyMetadataAPI,
    did: PublishOnChainOptions.DIDRegistry,
  }

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
    account: string | ZeroDevAccountSigner<'ECDSA'> | Account,
    config?: NeverminedOptions,
    initOptions?: NeverminedInitializationOptions,
  ) {
    const ops = initOptions
      ? { ...NvmApp.defaultAppInitializatioinOptions, ...initOptions }
      : NvmApp.defaultAppInitializatioinOptions
    this.fullSDK = await Nevermined.getInstance(config ? config : this.configNVM, ops)

    if (account instanceof ZeroDevAccountSigner) {
      this.userAccount = await Account.fromZeroDevSigner(account)
      this.zeroDevSignerAccount = account
      this.useZeroDevSigner = true
    } else if (account instanceof Account) {
      this.userAccount = account
    } else {
      this.userAccount = this.fullSDK.accounts.getAccount(account)
    }

    const clientAssertion = await this.fullSDK.utils.jwt.generateClientAssertion(this.userAccount)

    this.loginCredentials = await this.fullSDK.services.marketplace.login(clientAssertion)

    const nodeInfo = await this.fullSDK.services.node.getNeverminedNodeInfo()
    this.assetProviders = [nodeInfo['provider-address']]

    if (!isAddress(this.configNVM.nftContractAddress)) {
      const contractABI = await ContractHandler.getABI(
        'NFT1155SubscriptionUpgradeable',
        this.configNVM.artifactsFolder,
        await this.fullSDK.keeper.getNetworkName(),
      )
      this.subscriptionNFTContractAddress = contractABI.address
    } else {
      this.subscriptionNFTContractAddress = this.configNVM.nftContractAddress
    }
    if (!isAddress(this.subscriptionNFTContractAddress)) {
      throw new Web3Error('Invalid Subscription NFT contract address')
    }

    this.networkFeeReceiver = await this.fullSDK.keeper.nvmConfig.getFeeReceiver()
    this.networkFee = await this.fullSDK.keeper.nvmConfig.getNetworkFee()
  }

  public async disconnect() {
    if (this.fullSDK && this.isWeb3Connected()) {
      this.fullSDK = undefined
      this.userAccount = undefined
      this.useZeroDevSigner = false
      this.zeroDevSignerAccount = undefined
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
      NVMAppSubscriptionType.Time,
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
      NvmApp.publicationOptions,
      { ...(this.useZeroDevSigner && { zeroDevSigner: this.zeroDevSignerAccount }) },
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
      NVMAppSubscriptionType.Credits,
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
      NvmApp.publicationOptions,
      { ...(this.useZeroDevSigner && { zeroDevSigner: this.zeroDevSignerAccount }) },
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
      numberCredits = salesService.attributes.main.nftAttributes.amount

      if (!agreementId)
        agreementId = await this.fullSDK.nfts1155.order(
          subscriptionDid,
          numberCredits,
          this.userAccount,
          serviceIndex,
          { ...(this.useZeroDevSigner && { zeroDevSigner: this.zeroDevSignerAccount }) },
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
      NvmApp.publicationOptions,
      { ...(this.useZeroDevSigner && { zeroDevSigner: this.zeroDevSignerAccount }) },
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
      NvmApp.publicationOptions,
      { ...(this.useZeroDevSigner && { zeroDevSigner: this.zeroDevSignerAccount }) },
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
    const expectedFee =
      (price.getTotalPrice() * this.networkFee) / AssetPrice.NETWORK_FEE_DENOMINATOR / 100n
    if (networkFee !== expectedFee) return false
    return true
  }

  // TODO: Implement subscription validations
  public validateSubscription(
    metadata: MetaData,
    price: AssetPrice,
    subscriptionType: NVMAppSubscriptionType,
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

    if (subscriptionType === NVMAppSubscriptionType.Time) {
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
      case NVMAppEnvironments.Local:
        return new AppDeploymentLocal()
      default:
        throw new Error('Invalid environment')
    }
  }
}
