import { InstantiableConfig } from '@/Instantiable.abstract'
import { DDO } from '@/ddo/DDO'
import { Nft1155Contract } from '@/keeper/contracts/Nft1155Contract'
import { AssetAttributes } from '@/models/AssetAttributes'
import { NFTAttributes } from '@/models/NFTAttributes'
import { NvmAccount } from '@/models/NvmAccount'
import { TxParameters } from '@/models/Transactions'
import { CreateProgressStep, OrderProgressStep } from '@/nevermined/ProgressSteps'
import { ServiceType, ServiceNFTSales } from '@/types/DDOTypes'
import {
  AssetPublicationOptions,
  PublishMetadataOptions,
  PublishOnChainOptions,
} from '@/types/MetadataTypes'
import { zeroX } from '@/utils/ConversionTypeHelpers'
import { SubscribablePromise } from '@/utils/SubscribablePromise'
import { NFTsBaseApi } from './NFTsBaseApi'
import { generateId } from '@/common/helpers'
import { NFTError } from '@/errors/NeverminedErrors'

/**
 * Allows the interaction with external ERC-1155 NFT contracts built on top of the Nevermined NFT extra features.
 */
export class NFT1155Api extends NFTsBaseApi {
  // Instance of the ERC-1155 NFT Contract where the API is connected
  nftContract: Nft1155Contract

  /**
   * Create a new Nevermined NFTs (ERC-1155) instance allowing to interact with that kind of NFTs.
   *
   * @example
   * ```ts
   * nfts1155 = await Nft1155Api.getInstance(
   *      instanceConfig,
   *      nft1155Contract
   * )
   * ```
   *
   * @param cpnfig - The Nevermined config
   * @param nftContractInstance - If there is already deployed an instance of `Nft1155Contract`
   * @param nftContractAddress - If the `Nft1155Contract` is deployed in an address it will connect to that contract
   * @returns The NFTs 1155 API instance {@link NFT1155Api}.
   */
  public static async getInstance(
    config: InstantiableConfig,
    nftContractInstance?: Nft1155Contract,
    nftContractAddress?: string,
  ): Promise<NFT1155Api> {
    const instance = new NFT1155Api()
    instance.servicePlugin = NFT1155Api.getServicePlugin(config)
    instance.setInstanceConfig(config)

    if (nftContractInstance) instance.nftContract = nftContractInstance
    else if (nftContractAddress)
      instance.nftContract = await Nft1155Contract.getInstance(config, nftContractAddress)

    return instance
  }

  /**
   * Gets the ERC-721 NFT Contract address
   * @returns The NFT contract address
   */
  public get address(): string {
    return this.nftContract.address
  }

  /**
   * Gets the instance of the ERC-1155 NFT Contract where the API is connected
   * @returns The `Nft1155Contract` instance
   */
  public get getContract(): Nft1155Contract {
    return this.nftContract
  }

  /**
   * Creates a new Nevermined asset associated to a NFT (ERC-1155).
   *
   * @example
   * ```ts
   * const assetAttributes = AssetAttributes.getInstance({
   *           metadata,
   *           price: assetPrice,
   *           serviceTypes: ['nft-sales', 'nft-access']
   *       })
   * const nftAttributes = NFTAttributes.getNFT1155Instance({
   *           ...assetAttributes,
   *           nftContractAddress: nftUpgradeable.address,
   *           cap: cappedAmount,
   *           amount: numberNFTs,
   *           royaltyAttributes,
   *           preMint
   *       })
   * const ddo = await nevermined.nfts1155.create(
   *           nftAttributes,
   *           publisher
   *       )
   * ```
   *
   * @param nftAttributes -Attributes describing the NFT (ERC-721) associated to the asset
   * @param publisher - The account publishing the asset
   * @param publicationOptions - Allows to specify the publication options of the off-chain and the on-chain data. @see {@link PublishOnChainOptions} and {@link PublishMetadataOptions}
   * @param txParams - Optional transaction parameters
   *
   * @returns The newly registered {@link DDO}.
   */
  public create(
    nftAttributes: NFTAttributes,
    publisher: NvmAccount,
    publicationOptions: AssetPublicationOptions = {
      metadata: PublishMetadataOptions.OnlyMetadataAPI,
      did: PublishOnChainOptions.DIDRegistry,
    },
    txParams?: TxParameters,
  ): SubscribablePromise<CreateProgressStep, DDO> {
    return this.registerNeverminedAsset(
      nftAttributes as AssetAttributes,
      publisher,
      publicationOptions,
      nftAttributes,
      txParams,
    )
  }

  /**
   * Mint NFTs associated with an asset.
   *
   * @remarks
   * This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.
   *
   * @example
   * ```ts
   * await nevermined.nfts1155.mint(
   *           did,
   *           10n,
   *           artist
   * )
   * ```
   *
   * @param did - The Decentralized Identifier of the NFT asset.
   * @param nftAmount - The amount of NFTs to mint.
   * @param receiver - Account address of the NFT receiver, if `undefined` the minter account will receive the NFT/s
   * @param account - The account to mint the NFT.    *
   * @param data - Data
   * @param txParams - Optional transaction parameters.
   *
   * @returns The {@link TransactionReceipt}
   */
  public async mint(
    did: string,
    nftAmount: bigint,
    receiver: string | undefined,
    account: NvmAccount,
    data?: string,
    txParams?: TxParameters,
  ) {
    return await this.nftContract.mint(
      receiver || account.getId(),
      did,
      nftAmount,
      account,
      data || '0x',
      txParams,
    )
  }

  /**
   * Burn NFTs associated with an asset.
   *
   * @remarks
   * The publisher can only burn NFTs that it owns. NFTs that were already transferred cannot be burned by the publisher.
   *
   * @example
   * ```ts
   * await nevermined.nfts1155.burn(
   *           did,
   *           2n,
   *           artist
   * )
   * ```
   *
   * @param tokenId - The Decentralized Identifier of the NFT asset.
   * @param nftAmount - The amount of NFTs to burn.
   * @param account - The account of the publisher of the NFT.
   * @param txParams - Optional transaction parameters.
   *
   * @returns The {@link TransactionReceipt}
   */
  public async burn(
    tokenId: string,
    nftAmount: bigint,
    account: NvmAccount,
    txParams?: TxParameters,
  ) {
    return await this.nftContract.burn(account, tokenId, nftAmount, txParams)
  }

  /**
   * Burn NFTs associated with an asset of a specific account.
   *
   * @remarks
   * The publisher can only burn NFTs of an account if is an operator. NFTs that were already transferred cannot be burned by the publisher.
   *
   * @example
   * ```ts
   * await nevermined.nfts1155.burnTo(
   *           holder,
   *           tokenId,
   *           2n,
   *           artist
   * )
   * ```
   *
   * @param holder - The address of the account that holds the NFTs.
   * @param tokenId - The TokenId of the NFT
   * @param nftAmount - The amount of NFTs to burn.
   * @param account - The account of the publisher of the NFT.
   * @param txParams - Optional transaction parameters.
   *
   * @returns The {@link TransactionReceipt}
   */
  public async burnFromHolder(
    holder: string,
    tokenId: string,
    nftAmount: bigint,
    account: NvmAccount,
    txParams?: TxParameters,
  ) {
    return await this.nftContract.burnFromHolder(holder, tokenId, nftAmount, account, txParams)
  }

  // TODO: We need to improve this to allow for secondary market sales
  //       Right now it fetches the rewards from the DDO which don't change.
  /**
   * Buy NFTs.
   *
   * @remarks
   * This will lock the funds of the consumer in escrow pending the transfer of the NFTs
   * from the publisher.
   *
   * @example
   * ```ts
   * agreementId = await nevermined.nfts1155.order(ddo.id, numberNFTs, collector)
   * ```
   *
   * @param did - The Decentralized Identifier of the NFT asset.
   * @param numberEditions - The amount of NFTs to buy.
   * @param consumer - The account of the NFT buyer.
   * @param serviceReference - The reference to identify wich service within the DDO to order
   * @param txParams - Optional transaction parameters.
   *
   * @returns The agreement ID.
   */
  public order(
    did: string,
    numberEditions: bigint,
    consumer: NvmAccount,
    serviceReference: ServiceType | number = 'nft-sales',
    txParams?: TxParameters,
  ): SubscribablePromise<OrderProgressStep, string> {
    return new SubscribablePromise<OrderProgressStep, string>(async (observer) => {
      const { nftSalesTemplate } = this.nevermined.keeper.templates

      const agreementIdSeed = zeroX(generateId())
      const ddo = await this.nevermined.assets.resolve(did)

      const service = ddo.findServiceByReference(serviceReference) as ServiceNFTSales
      const params = await nftSalesTemplate.getParamsFromService(
        consumer.getId(),
        numberEditions,
        service,
      )

      this.logger.log('Creating nft-sales agreement and paying')
      const agreementId = await nftSalesTemplate.createAgreementWithPaymentFromDDO(
        agreementIdSeed,
        ddo,
        serviceReference,
        params,
        consumer,
        consumer,
        txParams,
        (a) => observer.next(a),
      )
      if (!agreementId) {
        throw new NFTError('Error creating nft-sales agreement')
      }

      return agreementId
    })
  }

  /**
   * Claims the transfer of a NFT to the Nevermined Node on behalf of the publisher.
   *
   * @remarks
   * This is useful when the consumer does not want to wait for the publisher
   * to transfer the NFT once the payment is made. Assuming the publisher delegated
   * transfer permissions to the Node.
   *
   * One example would be a marketplace where the user wants to get access to the NFT
   * as soon as the payment is made
   *
   * @example
   * ```ts
   * const receipt = await nevermined.nfts721.claim(
   *           agreementId,
   *           editor.getId(),
   *           subscriber.getId(),
   *           1n
   *       )
   * ```
   *
   * @param agreementId - The NFT sales agreement id.
   * @param nftHolder - The address of the current owner of the NFT.
   * @param nftReceiver - The address where the NFT should be transferred.
   * @param numberEditions - The number of NFT editions to transfer. If the NFT is ERC-721 it should be 1
   * @param did - The Decentralized Identifier of the asset.
   * @param serviceIndex - The index of the service in the DDO that will be claimed
   *
   * @returns true if the transfer was successful.
   */
  public async claim(
    agreementId: string,
    nftHolder: string,
    nftReceiver: string,
    numberEditions = 1n,
    did?: string,
    serviceIndex?: number,
  ): Promise<boolean> {
    return await this.claimNFT(
      agreementId,
      nftHolder,
      nftReceiver,
      numberEditions,
      1155,
      did,
      serviceIndex,
    )
  }

  /**
   * Transfer NFTs to the consumer.
   *
   * @remarks
   * A publisher/provider will check if the consumer put the funds in escrow and
   * execute the transfer in order to be able to release the rewards.
   *
   * @example
   * ```ts
   * const receipt = await nevermined.nfts1155.transfer(
   *           agreementId,
   *           ddo.id,
   *           numberNFTs,
   *           artist
   *       )
   * ```
   *
   * @param agreementId - The NFT sales agreement id.
   * @param did - The Decentralized identifier of the NFT asset.
   * @param nftAmount - The number of NFTs to transfer.
   * @param publisher - The current owner of the NFTs.
   * @param serviceReference - The reference to identify wich service within the DDO to transfer
   * @param txParams - Optional transaction parameters.
   * @returns true if the transfer was successful.
   *
   * @throws {@link NFTError}
   * Thrown if there is an error transferring the NFT
   */
  public async transfer(
    agreementId: string,
    did: string,
    nftAmount: bigint,
    publisher: NvmAccount,
    serviceReference: number | ServiceType = 'nft-sales',
    txParams?: TxParameters,
  ): Promise<boolean> {
    const { agreements } = this.nevermined
    const ddo = await this.nevermined.assets.resolve(did)
    const service = ddo.findServiceByReference(serviceReference)

    const result = await agreements.conditions.transferNft(
      agreementId,
      ddo,
      service.index,
      nftAmount,
      publisher,
      txParams,
    )

    if (!result) {
      throw new NFTError('Error transferring nft.')
    }

    return true
  }

  /**
   * Release the funds from escrow.
   *
   * @remarks
   * A publisher is able to release the funds put on escrow by the consumer after transferring the NFTs.
   *
   * @example
   * ```ts
   * const receipt = await nevermined.nfts1155.releaseRewards(
   *           agreementId,
   *           ddo.id,
   *           numberNFTs,
   *           artist
   *       )
   * ```
   *
   * @param agreementId - The NFT sales agreement id.
   * @param did - The Decentralized identifier of the NFT asset.
   * @param serviceReference - The reference to identify wich service within the DDO to release rewards
   * @param nftAmount - The amount of NFTs to transfer.
   * @param publisher - The current owner of the NFTs.
   * @param txParams - Optional transaction parameters.
   *
   * @returns true if the funds release was successful.
   *
   * @throws {@link NFTError}
   * Thrown if there is an error releasing the rewards
   */
  public async releaseRewards(
    agreementId: string,
    did: string,
    serviceReference: number | ServiceType = 'nft-sales',
    nftAmount: bigint,
    publisher: NvmAccount,
    txParams?: TxParameters,
  ): Promise<boolean> {
    const { agreements } = this.nevermined

    const ddo = await this.nevermined.assets.resolve(did)
    const service = ddo.findServiceByReference(serviceReference)
    const result = await agreements.conditions.releaseNftReward(
      agreementId,
      ddo,
      service.index,
      nftAmount,
      publisher,
      undefined,
      txParams,
    )

    if (!result) {
      throw new NFTError('Error releasing the rewards.')
    }

    return true
  }

  /**
   * Get the NFT balance for a particular did associated to an account/address
   *
   * @example
   * ```ts
   * const balance = await nevermined.nfts1155.balance(ddo.id, artist)
   * ```
   *
   * @param did - The Decentralized Identifier of the NFT asset.
   * @param account - The account/address to check the balance of.
   *
   * @returns The number of editions of a NFT owned by the account/address.
   */
  public async balance(did: string, account: NvmAccount | string): Promise<bigint> {
    return await this.nftContract.balance(
      account instanceof NvmAccount ? account.getId() : account,
      did,
    )
  }

  /**
   * Gets the contract owner
   *
   * @example
   * ```ts
   * const nftContractOwner = new NvmAccount(
   *      await nevermined.nfts1155.owner()
   * )
   * ```
   *
   * @returns Address of the contract owner
   */
  public async owner(): Promise<string> {
    return this.nftContract.owner()
  }

  /**
   * Enable or disable NFT permissions for an operator.
   *
   * @see {@link claim}
   *
   * @example
   * ```ts
   * await nevermined.nfts1155.setApprovalForAll(
   *               someoneElse,
   *               true,
   *               artist
   * )
   * ```
   *
   * @param operatorAddress - The address that of the operator we want to give transfer rights to.
   * @param approved - Give or remove transfer rights from the operator.
   * @param from - The account that wants to give transfer rights to the operator.
   * @param txParams - Transaction additional parameters
   *
   * @returns The {@link TransactionReceipt}
   */
  public async setApprovalForAll(
    operatorAddress: string,
    approved: boolean,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    const isApproved = await this.nftContract.isApprovedForAll(from.getId(), operatorAddress)

    if (isApproved) {
      return
    }

    return this.nftContract.setApprovalForAll(operatorAddress, approved, from, txParams)
  }

  /**
   * Returns if the `operatorAddress` is approved
   *
   * @see {@link claim}
   *
   * @example
   * ```ts
   * await nevermined.nfts1155.isApprovedForAll(someoneElse, artist.getId())
   * ```
   *
   * @param operatorAddress -  The address to check the permissions
   * @param from - The address of the account granting or revoking the permissions via `setApprovalForAll`.
   *
   * @returns Boolean saying if the `operatorAddress` is approved
   */
  public async isApprovedForAll(operatorAddress: string, from: string) {
    return this.nftContract.isApprovedForAll(from, operatorAddress)
  }

  /**
   * Used to release the secondary market NFT & the locked rewards.
   *
   * @example
   * ```ts
   * // TODO
   * ```
   *
   * @param owner - The owner account.
   * @param consumer - The consumer account.
   * @param agreementIdSeed - the Id of the underlying service agreement seed.
   * @param serviceReference - The reference to identify wich service within the DDO to release rewards
   * @param txParams - Optional transaction parameters.
   * @returns  true if the transaction was successful.
   *
   * @throws {@link NFTError}
   * Thrown if there is an error releasing the rewards.
   */
  public async releaseSecondaryMarketRewards(
    owner: NvmAccount,
    consumer: NvmAccount,
    agreementIdSeed: string,
    serviceReference: number | ServiceType = 'nft-sales',
    txParams?: TxParameters,
  ): Promise<boolean> {
    const service = await this.nevermined.services.metadata.retrieveService(agreementIdSeed)
    const did = DDO.getDIDFromService(service)
    const nftAmount = DDO.getNftAmountFromService(service)
    const ddo = await this.nevermined.assets.resolve(did)
    ddo.updateMetadataService(service)
    const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
      agreementIdSeed,
      consumer.getId(),
    )

    const ddoService = ddo.findServiceByReference(serviceReference)

    let receipt = await this.nevermined.agreements.conditions.transferNft(
      agreementId,
      ddo,
      ddoService.index,
      nftAmount,
      owner,
      txParams,
    )

    if (!receipt) throw new NFTError('TransferNft Failed.')

    receipt = await this.nevermined.agreements.conditions.releaseNftReward(
      agreementId,
      ddo,
      serviceReference,
      nftAmount,
      owner,
      undefined,
      txParams,
    )

    if (!receipt) throw new NFTError('ReleaseNftReward Failed.')
    return receipt
  }

  /**
   * Adds a minter (`minterAddress`) to the NFT Contract.
   * Granting and revoking minting permissions only can be done by the NFT Contract owner
   *
   *
   * @example
   * ```ts
   * await nevermined.nfts1155.grantOperatorRole(
   *               someoneElse,
   *               artist
   * )
   * ```
   *
   * @param operatorAddress - The address of the account to be added as operator in the NFT Contract
   * @param from - The account giving operator permissions
   * @param txParams - Optional transaction parameters.
   *
   * @returns The {@link TransactionReceipt}
   */
  public async grantOperatorRole(
    operatorAddress: string,
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.nftContract.grantOperatorRole(operatorAddress, from, txParams)
  }

  /**
   * Revokes an address (`operatorAddress`) of the NFT Contract as operator.
   * Granting and revoking minting permissions only can be done by the NFT Contract owner
   *
   * @example
   * ```ts
   * await nevermined.nfts1155.revokeOperatorRole(
   *               someoneElse,
   *               artist
   * )
   * ```
   *
   * @param operatorAddress - The address of the account to be revoked as operator in the NFT Contract
   * @param from - The account revoking operator permissions
   * @param txParams - Optional transaction parameters.
   *
   * @returns The {@link TransactionReceipt}
   */
  public async revokeOperatorRole(
    operatorAddress: string,
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.nftContract.revokeOperatorRole(operatorAddress, from, txParams)
  }

  /**
   * Get the details of an NFT
   *
   * @example
   * ```ts
   * const details = await nevermined.nfts1155.details(ddo.id)
   *
   * // The `details` object includes the NFT information
   *
   * assert.equal(details.mintCap, 5)
   * assert.equal(details.nftSupply, 5)
   * assert.equal(details.royaltyScheme, RoyaltyKind.Standard)
   * assert.equal(details.royalties, 100000)
   * assert.equal(details.owner, artist.getId())
   * ```
   *
   * @param did - The Decentralized Identifier of the NFT asset.
   *
   * @returns The details of the NFT.
   */
  public async details(did: string) {
    return this._details(did, 1155)
  }
}
