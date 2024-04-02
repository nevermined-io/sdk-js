import { ContractBase } from '@/keeper/contracts/ContractBase'

import { EventHandler } from '@/events/EventHandler'
import * as NetworkUtils from '@/utils/Network'

import { Instantiable, InstantiableConfig } from '@/Instantiable.abstract'
import { KeeperError } from '@/errors/NeverminedErrors'
import { ConditionSmall } from '@/keeper/contracts/conditions/Condition.abstract'
import { NFT721LockCondition } from '@/keeper/contracts/conditions/NFTs/NFT721LockCondition'
import { isValidAddress } from '@/nevermined/utils/BlockchainViemUtils'
import { NeverminedInitializationOptions } from '@/types/GeneralTypes'
import { objectPromiseAll } from '@/utils/PromiseResolver'
import { DIDRegistry } from './contracts/DIDRegistry'
import { Dispenser } from './contracts/Dispenser'
import { Nft1155Contract } from './contracts/Nft1155Contract'
import { Token } from './contracts/Token'
import { AccessCondition } from './contracts/conditions/AccessCondition'
import { ComputeExecutionCondition } from './contracts/conditions/ComputeExecutionCondition'
import { EscrowPaymentCondition } from './contracts/conditions/EscrowPaymentCondition'
import { LockPaymentCondition } from './contracts/conditions/LockPaymentCondition'
import { NFT721HolderCondition } from './contracts/conditions/NFTs/NFT721HolderCondition'
import { NFTAccessCondition } from './contracts/conditions/NFTs/NFTAccessCondition'
import { NFTHolderCondition } from './contracts/conditions/NFTs/NFTHolderCondition'
import { NFTLockCondition } from './contracts/conditions/NFTs/NFTLockCondition'
import { TransferNFT721Condition } from './contracts/conditions/NFTs/TransferNFT721Condition'
import { TransferNFTCondition } from './contracts/conditions/NFTs/TransferNFTCondition'
import { TransferDIDOwnershipCondition } from './contracts/conditions/TransferDIDOwnershipCondition'
import { AgreementStoreManager } from './contracts/managers/AgreementStoreManager'
import { ConditionStoreManager } from './contracts/managers/ConditionStoreManager'
import { TemplateStoreManager } from './contracts/managers/TemplateStoreManager'
import { CurveRoyalties } from './contracts/royalties/CurveRoyalties'
import { RewardsDistributor } from './contracts/royalties/RewardsDistributor'
import { StandardRoyalties } from './contracts/royalties/StandardRoyalties'
import { AccessTemplate } from './contracts/templates/AccessTemplate'
import { DIDSalesTemplate } from './contracts/templates/DIDSalesTemplate'
import { EscrowComputeExecutionTemplate } from './contracts/templates/EscrowComputeExecutionTemplate'
import { GenericAccess } from './contracts/templates/GenericAccess'
import { NFT721AccessTemplate } from './contracts/templates/NFT721AccessTemplate'
import { NFT721SalesTemplate } from './contracts/templates/NFT721SalesTemplate'
import { NFTAccessTemplate } from './contracts/templates/NFTAccessTemplate'
import { NFTSalesTemplate } from './contracts/templates/NFTSalesTemplate'
import { NeverminedConfig } from './contracts/governance/NeverminedConfig'

/**
 * Interface with Nevermined contracts.
 * Nevermined Keeper implementation where we put the following modules together:
 * - TCRs: users create challenges and resolve them through voting to maintain registries.
 * - Nevermined Tokens: the intrinsic tokens circulated inside Nevermined network, which is used in the voting of TCRs.
 * - Marketplace: the core marketplace where people can transact with each other with Nevermined tokens.
 */
export class Keeper extends Instantiable {
  /**
   * Returns Keeper instance.
   * @returns {@link Keeper}
   */
  public static async getInstance(config: InstantiableConfig): Promise<Keeper> {
    const keeper = new Keeper()
    keeper.setInstanceConfig(config)
    return keeper
  }

  public async init(initOptions: NeverminedInitializationOptions) {
    this.instances = {}
    try {
      this.instances = await objectPromiseAll({
        dispenser: undefined, // Optional
        token: undefined, // Optional
        curveRoyalties: undefined, // Optional
        // CORE Contracts
        nvmConfig: NeverminedConfig.getInstance(this.instanceConfig),
        didRegistry: DIDRegistry.getInstance(this.instanceConfig),
        // ServiceAgrements Manager Contracts
        templateStoreManager: initOptions.loadServiceAgreements
          ? TemplateStoreManager.getInstance(this.instanceConfig)
          : undefined,
        agreementStoreManager: initOptions.loadServiceAgreements
          ? AgreementStoreManager.getInstance(this.instanceConfig)
          : undefined,
        conditionStoreManager: initOptions.loadServiceAgreements
          ? ConditionStoreManager.getInstance(this.instanceConfig)
          : undefined,
        lockPaymentCondition: initOptions.loadServiceAgreements
          ? LockPaymentCondition.getInstance(this.instanceConfig)
          : undefined,
        escrowPaymentCondition: initOptions.loadServiceAgreements
          ? EscrowPaymentCondition.getInstance(this.instanceConfig)
          : undefined,

        // Access Flows
        accessCondition: initOptions.loadAccessFlow
          ? AccessCondition.getInstance(this.instanceConfig)
          : undefined,
        accessTemplate: initOptions.loadAccessFlow
          ? AccessTemplate.getInstance(this.instanceConfig)
          : undefined,

        // Compute
        computeExecutionCondition: initOptions.loadCompute
          ? ComputeExecutionCondition.getInstance(this.instanceConfig)
          : undefined,
        escrowComputeExecutionTemplate: initOptions.loadCompute
          ? EscrowComputeExecutionTemplate.getInstance(this.instanceConfig)
          : undefined,

        // NFT 1155
        nftHolderCondition: initOptions.loadNFTs1155
          ? NFTHolderCondition.getInstance(this.instanceConfig)
          : undefined,
        nftLockCondition: initOptions.loadNFTs1155
          ? NFTLockCondition.getInstance(this.instanceConfig)
          : undefined,
        nftAccessCondition: initOptions.loadNFTs1155
          ? NFTAccessCondition.getInstance(this.instanceConfig)
          : undefined,
        transferNftCondition: initOptions.loadNFTs1155
          ? TransferNFTCondition.getInstance(this.instanceConfig)
          : undefined,
        nftAccessTemplate: initOptions.loadNFTs1155
          ? NFTAccessTemplate.getInstance(this.instanceConfig)
          : undefined,
        nftSalesTemplate: initOptions.loadNFTs1155
          ? NFTSalesTemplate.getInstance(this.instanceConfig)
          : undefined,
        nftUpgradeable: initOptions.loadNFTs1155
          ? Nft1155Contract.getInstance(this.instanceConfig)
          : undefined,

        // NFT 721
        nft721HolderCondition: initOptions.loadNFTs721
          ? NFT721HolderCondition.getInstance(this.instanceConfig)
          : undefined,
        transferNft721Condition: initOptions.loadNFTs721
          ? TransferNFT721Condition.getInstance(this.instanceConfig)
          : undefined,
        nft721LockCondition: initOptions.loadNFTs721
          ? NFT721LockCondition.getInstance(this.instanceConfig)
          : undefined,
        nft721AccessTemplate: initOptions.loadNFTs721
          ? NFT721AccessTemplate.getInstance(this.instanceConfig)
          : undefined,
        nft721SalesTemplate: initOptions.loadNFTs721
          ? NFT721SalesTemplate.getInstance(this.instanceConfig)
          : undefined,

        // DID Transfer
        transferDidOwnershipCondition: initOptions.loadDIDTransferFlow
          ? TransferDIDOwnershipCondition.getInstance(this.instanceConfig)
          : undefined,
        didSalesTemplate: initOptions.loadDIDTransferFlow
          ? DIDSalesTemplate.getInstance(this.instanceConfig)
          : undefined,

        // Royalties & Rewards
        standardRoyalties: initOptions.loadRoyalties
          ? StandardRoyalties.getInstance(this.instanceConfig)
          : undefined, // optional
        rewardsDistributor: undefined, // RewardsDistributor.getInstance(this.instanceConfig), // optional
      })

      this.royalties = {
        standard: initOptions.loadRoyalties ? this.instances.standardRoyalties : undefined,
        curve: undefined,
      }

      this.rewardsDistributor = undefined // this.instances.rewardsDistributor

      const templates = []
      if (initOptions.loadAccessFlow) templates.push(this.instances.accessTemplate)
      if (initOptions.loadCompute) templates.push(this.instances.escrowComputeExecutionTemplate)
      if (initOptions.loadNFTs1155) {
        templates.push(this.instances.nftAccessTemplate)
        templates.push(this.instances.nftSalesTemplate)
      }
      if (initOptions.loadNFTs721) {
        templates.push(this.instances.nft721AccessTemplate)
        templates.push(this.instances.nft721SalesTemplate)
      }
      if (initOptions.loadDIDTransferFlow) templates.push(this.instances.didSalesTemplate)

      if (initOptions.loadServiceAgreements) {
        const templateObj: any = {}
        for (const i of templates) {
          templateObj[i.address] = i
        }

        this.instances.agreementStoreManager.setTemplates(templateObj)
      }

      this.connected = true
    } catch (err) {
      this.connected = false
      throw new KeeperError(
        `Keeper could not connect to ${await this.getNetworkName()} - ${err.message} ${err.stack}`,
      )
    }

    // const chainId = Number((await this.web3.getNetwork()).chainId)
    const chainId = await this.publicClient.getChainId()

    if (NetworkUtils.isTestnet(chainId)) {
      this.instances.dispenser = initOptions.loadDispenser
        ? await Dispenser.getInstance(this.instantiableConfig)
        : undefined
      this.instances.token = initOptions.loadERC20Token
        ? await Token.getInstance(this.instantiableConfig)
        : undefined
    }

    // Main contracts
    this.dispenser = this.instances.dispenser
    this.token = this.instances.token
    this.nvmConfig = this.instances.nvmConfig
    this.didRegistry = this.instances.didRegistry
    this.nftUpgradeable = this.instances.nftUpgradeable
    // Managers
    this.templateStoreManager = this.instances.templateStoreManager
    this.agreementStoreManager = this.instances.agreementStoreManager
    this.conditionStoreManager = this.instances.conditionStoreManager
    // Conditions
    this.conditions = {
      lockPaymentCondition: this.instances.lockPaymentCondition,
      escrowPaymentCondition: this.instances.escrowPaymentCondition,
      accessCondition: this.instances.accessCondition,
      computeExecutionCondition: this.instances.computeExecutionCondition,
      nftHolderCondition: this.instances.nftHolderCondition,
      nft721HolderCondition: this.instances.nft721HolderCondition,
      nftLockCondition: this.instances.nftLockCondition,
      nftAccessCondition: this.instances.nftAccessCondition,
      transferNftCondition: this.instances.transferNftCondition,
      transferNft721Condition: this.instances.transferNft721Condition,
      transferDidOwnershipCondition: this.instances.transferDidOwnershipCondition,
      nft721LockCondition: this.instances.nft721LockCondition,
    }
    this.conditionsList = Object.values(this.conditions).filter(
      (condition) => condition !== undefined,
    )
    // Templates
    this.templates = {
      accessTemplate: this.instances.accessTemplate,
      escrowComputeExecutionTemplate: this.instances.escrowComputeExecutionTemplate,
      didSalesTemplate: this.instances.didSalesTemplate,
      nftAccessTemplate: this.instances.nftAccessTemplate,
      nft721AccessTemplate: this.instances.nft721AccessTemplate,
      nftSalesTemplate: this.instances.nftSalesTemplate,
      nft721SalesTemplate: this.instances.nft721SalesTemplate,
    }
    if (initOptions.loadServiceAgreements) {
      this.templateList = Object.values(this.templates).filter((template) => template !== undefined)
    }

    // Utils
    this.utils = {
      eventHandler: new EventHandler(),
    }
    // version
    this.network = {
      chainId,
      version: this.didRegistry.version.replace('v', ''),
      name: await NetworkUtils.getNetworkName(chainId),
      loading: false,
    }
  }

  /**
   * Is connected to the correct network or not.
   */
  public connected = false

  /**
   * Nevermined Token smart contract instance.
   */
  public token: Token

  /**
   * Market smart contract instance.
   */
  public dispenser: Dispenser

  /**
   * Nevermined Config smart contract instance.
   */
  public nvmConfig: NeverminedConfig

  /**
   * DID registry smart contract instance.
   */
  public didRegistry: DIDRegistry

  /**
   * NFT upgradeable smart contract instance.
   */
  public nftUpgradeable: Nft1155Contract

  /**
   * Template store manager smart contract instance.
   */
  public templateStoreManager: TemplateStoreManager

  /**
   * Template store manager smart contract instance.
   */
  public agreementStoreManager: AgreementStoreManager

  /**
   * Template store manager smart contract instance.
   */
  public conditionStoreManager: ConditionStoreManager

  /**
   * Conditions instances.
   */
  public conditions: {
    lockPaymentCondition: LockPaymentCondition
    escrowPaymentCondition: EscrowPaymentCondition
    accessCondition: AccessCondition
    computeExecutionCondition: ComputeExecutionCondition
    nftHolderCondition: NFTHolderCondition
    nft721HolderCondition: NFT721HolderCondition
    nftLockCondition: NFTLockCondition
    nftAccessCondition: NFTAccessCondition
    transferNftCondition: TransferNFTCondition
    transferNft721Condition: TransferNFT721Condition
    transferDidOwnershipCondition: TransferDIDOwnershipCondition
    nft721LockCondition: NFT721LockCondition
  }

  public conditionsList: ConditionSmall[]
  public templateList: GenericAccess[]

  /**
   * Templates instances.
   */
  public templates: {
    accessTemplate: AccessTemplate
    escrowComputeExecutionTemplate: EscrowComputeExecutionTemplate
    didSalesTemplate: DIDSalesTemplate
    nftAccessTemplate: NFTAccessTemplate
    nft721AccessTemplate: NFT721AccessTemplate
    nftSalesTemplate: NFTSalesTemplate
    nft721SalesTemplate: NFT721SalesTemplate
  }

  public royalties: {
    standard: StandardRoyalties
    curve: CurveRoyalties
  }

  rewardsDistributor: RewardsDistributor

  /**
   * Helpers for contracts.
   */
  public utils: {
    eventHandler: EventHandler
  }

  /**
   * Network id loaded from web3
   */
  protected network: {
    /**
     * chainId of the network
     */
    chainId?: number
    /**
     * Name of the network
     */
    name?: string
    /**
     * Version of the artifacts in use
     */
    version?: string
    /**
     * True if keeper is still connecting
     */
    loading: boolean
  } = {
    loading: true,
  }

  private instances: { [contractRef: string]: ContractBase & any }

  /**
   * Returns a condition by address.
   * @param address - Address of deployed condition.
   * @returns Condition instance.
   */
  public getConditionByAddress(address: string): ConditionSmall {
    return this.conditionsList
      .filter((condition) => condition.address && isValidAddress(condition.address))
      .find((condition) => condition.address === address)
  }

  /**
   * Returns a template by name.
   * @param name - Template name.
   * @returns Agreement template instance.
   */
  public getTemplateByName(name: string) {
    return Object.values(this.templates).find((template) => template.contractName === name)
  }

  /**
   * Returns the network by name.
   * @returns Network name.
   */
  public async getNetworkName(): Promise<string> {
    if (!this.network.name) {
      this.network.name = await NetworkUtils.getNetworkName(await this.getNetworkId())
    }
    return this.network.name
  }

  /**
   * Returns the id of the network.
   * @returns Network ID.
   */
  public async getNetworkId(): Promise<number> {
    if (!this.network.chainId) {
      this.network.loading = false
      this.network.chainId = this.client.chain.id
    }

    while (!this.network.chainId) {
      await new Promise((resolve) => setTimeout(resolve, 1))
    }

    return this.network.chainId
  }

  /**
   * Returns the network version.
   * @returns Network version.
   */
  public getNetworkVersion(): string {
    if (!this.network.version) {
      this.network.version = this.didRegistry.version.replace('v', '')
    }
    return this.network.version
  }

  /**
   * Returns a Access template by name.
   * @param name - Template name.
   * @returns Agreement template instance.
   */
  public getAccessTemplateByName(name: string): GenericAccess {
    return this.templateList.find((template) => template.contractName === name)
  }

  /**
   * Returns a template by address.
   * @param address - Template address.
   * @returns Agreement template instance.
   */
  public getTemplateByAddress(address: string) {
    return Object.values(this.templates).find((template) => template.address === address)
  }

  public getAllInstances() {
    return this.instances
  }

  public async loadCurveRoyaltiesInstance() {
    if (this.royalties.curve) return this.royalties.curve

    try {
      this.royalties.curve = await CurveRoyalties.getInstance(this.instanceConfig)
    } catch {
      this.logger.debug('CurveRoyalties not available on this network.')
    }
    return this.royalties.curve
  }
}
