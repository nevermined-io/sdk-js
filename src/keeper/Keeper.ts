import { ContractBase } from './contracts/ContractBase'

import NeverminedConfig from './contracts/governance/NeverminedConfig'
import {
  LockPaymentCondition,
  EscrowPaymentCondition,
  AccessCondition,
  ComputeExecutionCondition,
  NFTHolderCondition,
  NFTLockCondition,
  NFTAccessCondition,
  TransferNFTCondition,
  TransferDIDOwnershipCondition,
  TransferNFT721Condition,
  NFT721HolderCondition,
  AaveBorrowCondition,
  AaveCollateralDepositCondition,
  AaveCollateralWithdrawCondition,
  AaveRepayCondition,
  NFT721LockCondition,
  DistributeNFTCollateralCondition,
  ConditionSmall,
  DIDRegistry,
  Dispenser,
  Token,
  AccessTemplate,
  EscrowComputeExecutionTemplate,
  DIDSalesTemplate,
  NFTAccessTemplate,
  NFT721AccessTemplate,
  NFTSalesTemplate,
  NFT721SalesTemplate,
  AaveCreditTemplate,
  TemplateStoreManager,
  AgreementStoreManager,
  ConditionStoreManager,
  RewardsDistributor,
  StandardRoyalties,
  CurveRoyalties,
  Nft1155Contract,
  GenericAccess,
  CustomToken,
} from './contracts'
import * as KeeperUtils from './utils'
import { objectPromiseAll } from '../utils'
import { EventHandler } from '../events/EventHandler'

import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { KeeperError } from '../errors'

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

  public async init() {
    this.instances = {}
    try {
      this.instances = await objectPromiseAll({
        // Main contracts
        dispenser: undefined, // Optional
        token: undefined, // Optional
        curveRoyalties: undefined, // Optional
        nvmConfig: NeverminedConfig.getInstance(this.instanceConfig),
        didRegistry: DIDRegistry.getInstance(this.instanceConfig),
        // Managers
        templateStoreManager: TemplateStoreManager.getInstance(this.instanceConfig),
        agreementStoreManager: AgreementStoreManager.getInstance(this.instanceConfig),
        conditionStoreManager: ConditionStoreManager.getInstance(this.instanceConfig),
        // Conditions
        lockPaymentCondition: LockPaymentCondition.getInstance(this.instanceConfig),
        escrowPaymentCondition: EscrowPaymentCondition.getInstance(this.instanceConfig),
        accessCondition: AccessCondition.getInstance(this.instanceConfig),
        computeExecutionCondition: ComputeExecutionCondition.getInstance(this.instanceConfig),
        nftHolderCondition: NFTHolderCondition.getInstance(this.instanceConfig),
        nft721HolderCondition: NFT721HolderCondition.getInstance(this.instanceConfig),
        nftLockCondition: NFTLockCondition.getInstance(this.instanceConfig),
        nftAccessCondition: NFTAccessCondition.getInstance(this.instanceConfig),
        transferNftCondition: TransferNFTCondition.getInstance(this.instanceConfig),
        transferNft721Condition: TransferNFT721Condition.getInstance(this.instanceConfig),
        transferDidOwnershipCondition: TransferDIDOwnershipCondition.getInstance(
          this.instanceConfig,
        ),
        aaveBorrowCondition: AaveBorrowCondition.getInstance(this.instanceConfig),
        aaveCollateralDepositCondition: AaveCollateralDepositCondition.getInstance(
          this.instanceConfig,
        ),
        aaveCollateralWithdrawCondition: AaveCollateralWithdrawCondition.getInstance(
          this.instanceConfig,
        ),
        aaveRepayCondition: AaveRepayCondition.getInstance(this.instanceConfig),
        nft721LockCondition: NFT721LockCondition.getInstance(this.instanceConfig),
        distributeNftCollateralCondition: DistributeNFTCollateralCondition.getInstance(
          this.instanceConfig,
        ),
        // Templates
        accessTemplate: AccessTemplate.getInstance(this.instanceConfig),
        escrowComputeExecutionTemplate: EscrowComputeExecutionTemplate.getInstance(
          this.instanceConfig,
        ),
        nftAccessTemplate: NFTAccessTemplate.getInstance(this.instanceConfig),
        nft721AccessTemplate: NFT721AccessTemplate.getInstance(this.instanceConfig),
        didSalesTemplate: DIDSalesTemplate.getInstance(this.instanceConfig),
        nftSalesTemplate: NFTSalesTemplate.getInstance(this.instanceConfig),
        nft721SalesTemplate: NFT721SalesTemplate.getInstance(this.instanceConfig),
        aaveCreditTemplate: AaveCreditTemplate.getInstance(this.instanceConfig), // optional
        standardRoyalties: StandardRoyalties.getInstance(this.instanceConfig), // optional
        rewardsDistributor: RewardsDistributor.getInstance(this.instanceConfig),
        nftUpgradeable: Nft1155Contract.getInstance(this.instanceConfig),
      })

      this.royalties = {
        standard: this.instances.standardRoyalties,
        curve: this.instances.curveRoyalties,
      }

      this.rewardsDistributor = this.instances.rewardsDistributor

      const templates = [
        this.instances.accessTemplate,
        this.instances.escrowComputeExecutionTemplate,
        this.instances.nftAccessTemplate,
        this.instances.nft721AccessTemplate,
        this.instances.didSalesTemplate,
        this.instances.nftSalesTemplate,
        this.instances.nft721SalesTemplate,
        this.instances.aaveCreditTemplate,
      ]

      const templateObj: any = {}
      for (const i of templates) {
        templateObj[i.address] = i
      }

      this.instances.agreementStoreManager.setTemplates(templateObj)

      this.connected = true
    } catch (err) {
      this.connected = false
      throw new KeeperError(
        `Keeper could not connect to ${await this.getNetworkName()} - ${err.message} ${err.stack}`,
      )
    }

    // Optionals
    try {
      this.instances.dispenser = await Dispenser.getInstance(this.instantiableConfig)
    } catch {
      this.logger.debug('Dispenser not available on this network.')
    }

    try {
      this.instances.token = await CustomToken.getInstanceByAddress(
        this.instantiableConfig,
        this.instantiableConfig.config.tokenAddress,
      )
    } catch {
      this.logger.debug('Token not available on this network.')
    }

    try {
      this.instances.curveRoyalties = await CurveRoyalties.getInstance(this.instanceConfig)
    } catch {
      this.logger.debug('CurveRoyalties not available on this network.')
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
      aaveBorrowCondition: this.instances.aaveBorrowCondition,
      aaveCollateralDepositCondition: this.instances.aaveCollateralDepositCondition,
      aaveCollateralWithdrawCondition: this.instances.aaveCollateralWithdrawCondition,
      aaveRepayCondition: this.instances.aaveRepayCondition,
      nft721LockCondition: this.instances.nft721LockCondition,
      distributeNftCollateralCondition: this.instances.distributeNftCollateralCondition,
    }
    this.conditionsList = Object.values(this.conditions)
    // Templates
    this.templates = {
      accessTemplate: this.instances.accessTemplate,
      escrowComputeExecutionTemplate: this.instances.escrowComputeExecutionTemplate,
      didSalesTemplate: this.instances.didSalesTemplate,
      nftAccessTemplate: this.instances.nftAccessTemplate,
      nft721AccessTemplate: this.instances.nft721AccessTemplate,
      nftSalesTemplate: this.instances.nftSalesTemplate,
      nft721SalesTemplate: this.instances.nft721SalesTemplate,
      aaveCreditTemplate: this.instances.aaveCreditTemplate,
    }
    this.templateList = [
      this.instances.accessTemplate,
      this.instances.escrowComputeExecutionTemplate,
      this.instances.nft721AccessTemplate,
      this.instances.nftAccessTemplate,
    ]
    // Utils
    this.utils = {
      eventHandler: new EventHandler(),
    }
    // version
    this.version = this.didRegistry.version.replace('v', '')
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
    aaveCollateralDepositCondition: AaveCollateralDepositCondition
    aaveBorrowCondition: AaveBorrowCondition
    aaveRepayCondition: AaveRepayCondition
    aaveCollateralWithdrawCondition: AaveCollateralWithdrawCondition
    distributeNftCollateralCondition: DistributeNFTCollateralCondition
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
    aaveCreditTemplate: AaveCreditTemplate
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
   * Version of the artifacts in use
   */
  public version: string

  /**
   * Network id loaded from web3
   */
  protected network: {
    id?: number
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
    return this.conditionsList.find((condition) => condition.getAddress() === address)
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
    return Object.values(this.templates).find((template) => template.getAddress() === address)
  }

  /**
   * Returns the network by name.
   * @returns Network name.
   */
  public async getNetworkName(): Promise<string> {
    return KeeperUtils.getNetworkName(await this.getNetworkId())
  }

  /**
   * Returns the id of the network.
   * @returns Network ID.
   */
  public async getNetworkId(): Promise<number> {
    if (this.network.loading) {
      this.network.loading = false
      this.network.id = (await this.web3.getNetwork()).chainId
    }

    while (!this.network.id) {
      await new Promise((resolve) => setTimeout(resolve, 1))
    }

    return this.network.id
  }

  public getAllInstances() {
    return this.instances
  }
}

export default Keeper
