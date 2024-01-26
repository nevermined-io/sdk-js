import { ethers } from 'ethers'
import { LogLevel } from '../utils'
import { AaveConfig } from './'

export interface NeverminedInitializationOptions {
  loadCore: boolean // NVMConfig, DIDRegistry
  loadServiceAgreements: boolean // TemplateStoreManager, AgreementStoreManager, ConditionStoreManager
  loadNFTs721: boolean // NFT721HolderCondition, NFT721LockCondition, NFT721AccessTemplate, NFT721SalesTemplate
  loadNFTs1155: boolean // NFTHolderCondition, NFTLockCondition, NFTAccessTemplate, NFTSalesTemplate
  loadDispenser: boolean // Dispenser
  loadERC20Token: boolean // Token
  loadAccessFlow: boolean // LockPaymentCondition, EscrowPaymentCondition, AccessCondition, AccessTemplate
  loadDIDTransferFlow: boolean // TransferDIDOwnershipCondition, DIDSalesTemplate
  loadRewards: boolean // RewardsDistributor
  loadRoyalties: boolean // StandardRoyalties, CurveRoyalties
  loadCompute: boolean // ComputeExecutionCondition, EscrowComputeExecutionTemplate
}

export class NeverminedOptions {
  /**
   * Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
   * This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
   * It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.
   */
  public web3ProviderUri?: string
  /**
   * URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
   * multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.
   * @see https://docs.nevermined.io/docs/architecture/marketplace-api/
   */
  public marketplaceUri: string

  /**
   * URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
   * Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.
   * @see https://docs.nevermined.io/docs/architecture/node/
   */
  public neverminedNodeUri: string

  /**
   * The public address of the Nevermined Node.
   * @see {@link neverminedNodeUri}
   */
  public neverminedNodeAddress?: string

  /**
   * Marketplace auth token.
   */
  public marketplaceAuthToken?: string

  /**
   * Web3 Provider.
   */
  public web3Provider?: any

  /**
   * Log level.
   */
  public verbose?: boolean | LogLevel

  /**
   * Gas multiplier for the fees.
   * Can be used to speed up the transactions.
   */
  public gasMultiplier?: number

  /**
   * Enpoint for the graph-node http query
   */
  public graphHttpUri?: string

  public aaveConfig?: AaveConfig

  /**
   * The folder where the nevermined contract artifacts are located.
   */
  public artifactsFolder?: string
  /**
   * The folder where the nevermined contract circuits are located.
   */
  public circuitsFolder?: string

  public accounts?: ethers.Signer[]

  /**
   * IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
   * INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
   * the asset resolution requests.
   */
  public ipfsGateway?: string = 'https://ipfs.io'

  public ipfsProjectId?: string

  public ipfsProjectSecret?: string

  /**
   * Use a gas station to calculate transaction fees
   */
  public gasStationUri?: string
}
