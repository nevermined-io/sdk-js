import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../ddo/DDO'
import { Nft721Contract } from '../../../keeper/contracts/Nft721Contract'
import { AssetAttributes } from '../../../models/AssetAttributes'
import { NFTAttributes } from '../../../models/NFTAttributes'
import { NvmAccount } from '../../../models/NvmAccount'
import { TxParameters } from '../../../models/Transactions'
import { CreateProgressStep, OrderProgressStep } from '../../../nevermined/ProgressSteps'
import { keccak256WithEncode } from '../../../nevermined/utils/BlockchainViemUtils'
import { ServiceType } from '../../../types/DDOTypes'
import {
  AssetPublicationOptions,
  PublishMetadataOptions,
  PublishOnChainOptions,
} from '../../../types/MetadataTypes'
import { zeroX } from '../../../utils/ConversionTypeHelpers'
import { SubscribablePromise } from '../../../utils/SubscribablePromise'
import { NFTsBaseApi } from './NFTsBaseApi'
import { NFTError } from '../../../errors/NeverminedErrors'
import { generateId } from '../../../common/helpers'

/**
 * Allows the interaction with external ERC-721 NFT contracts built on top of the Nevermined NFT extra features.
 */
export class NFT721Api extends NFTsBaseApi {
  // Instance of the ERC-721 NFT Contract where the API is connected
  nftContract: Nft721Contract

  /**
   * Create a new Nevermined NFTs (ERC-721) instance allowing to interact with that kind of NFTs.
   *
   * @example
   * ```ts
   * nfts721 = await Nft721Api.getInstance(
   *      instanceConfig,
   *      nftContractAddress
   * )
   * ```
   *
   * @param config - The Nevermined config
   * @param nftContractAddress - If the Nft721 Contract is deployed in an address it will connect to that contract
   * @returns The NFTs 721 API instance {@link NFT721Api}.
   */
  public static async getInstance(
    config: InstantiableConfig,
    nftContractAddress: string,
  ): Promise<NFT721Api> {
    const instance = new NFT721Api()
    instance.servicePlugin = NFT721Api.getServicePlugin(config)
    instance.setInstanceConfig(config)

    instance.nftContract = await Nft721Contract.getInstance(config, nftContractAddress)
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
   * Gets the instance of the ERC-721 NFT Contract where the API is connected
   * @returns The `Nft721Contract` instance
   */
  public get getContract(): Nft721Contract {
    return this.nftContract
  }

  /**
   * Creates a new Nevermined asset associated to a NFT (ERC-721).
   *
   * @example
   * ```ts
   *
   * // We define how the Asset is and the properties
   * // of the NFT attached to it
   * const nftAttributes = NFTAttributes.getNFT721Instance({
   *      metadata,
   *      price: assetPrice1,
   *      serviceTypes: ['nft-sales', 'nft-access']
   *      nftContractAddress: nftContract.address
   * })
   *
   * // And register the asset
   * ddo = await nevermined.nfts721.create(
   *           nftAttributes,
   *           artist,
   *           { metadata: PublishMetadata.IPFS }
   * )
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
   * Order a NFT-721.
   *
   * @remarks
   * This will lock the funds of the consumer in escrow pending the transfer of the NFTs
   * from the publisher.
   *
   * @example
   * ```ts
   * const agreementId = await nevermined.nfts721.order(ddo.id, collector)
   * ```
   *
   * @param did - The Decentralized Identifier of the NFT asset.
   * @param consumer - The account of the NFT buyer.
   * @param serviceReference - The reference to identify wich service within the DDO to order
   * @param txParams - Optional transaction parameters.
   *
   * @returns The agreement ID.
   */
  public order(
    did: string,
    consumer: NvmAccount,
    serviceReference: number | ServiceType = 'nft-sales',
    txParams?: TxParameters,
  ): SubscribablePromise<OrderProgressStep, string> {
    return new SubscribablePromise<OrderProgressStep, string>(async (observer) => {
      const { nft721SalesTemplate } = this.nevermined.keeper.templates

      const agreementIdSeed = zeroX(generateId())
      const ddo = await this.nevermined.assets.resolve(did)

      this.logger.log('Creating nft721-sales agreement')
      const agreementId = await nft721SalesTemplate.createAgreementWithPaymentFromDDO(
        agreementIdSeed,
        ddo,
        serviceReference,
        nft721SalesTemplate.params(consumer.getId()),
        consumer,
        consumer,
        txParams,
        (a) => observer.next(a),
      )
      if (!agreementId) {
        throw new NFTError('Error creating nft721-sales agreement')
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
   *           subscriber.getId()
   *       )
   * ```
   *
   * @param agreementId - The NFT sales agreement id.
   * @param nftHolder - The address of the current owner of the NFT.
   * @param nftReceiver - The address where the NFT should be transferred.
   * @param did - The Decentralized Identifier of the asset.
   * @param serviceIndex - The index of the service in the DDO that will be claimed
   *
   * @returns true if the transfer was successful.
   */
  public async claim(
    agreementId: string,
    nftHolder: string,
    nftReceiver: string,
    did?: string,
    serviceIndex?,
  ): Promise<boolean> {
    return await this.claimNFT(agreementId, nftHolder, nftReceiver, 1n, 721, did, serviceIndex)
  }

  /**
   * Transfer NFT-721 to the consumer.
   *
   * @remarks
   * A publisher/provider will check if the consumer put the funds in escrow and
   * execute the transfer in order to be able to release the rewards.
   *
   * @example
   * ```ts
   * const receipt = await nevermined.nfts721.transfer(agreementId, ddo.id, artist)
   * ```
   *
   * @param agreementId - The NFT sales agreement id.
   * @param did - The Decentralized identifier of the NFT asset.
   * @param publisher - The current owner of the NFTs.
   * @param serviceReference - The reference to identify wich service within the DDO to transfer
   * @param txParams - Optional transaction parameters.
   *
   * @returns true if the transfer was successful.
   *
   * @throws {@link NFTError}
   * Thrown if there is an error transferring the NFT
   */
  public async transfer(
    agreementId: string,
    did: string,
    publisher: NvmAccount,
    serviceReference: number | ServiceType = 'nft-sales',
    txParams?: TxParameters,
  ): Promise<boolean> {
    const { agreements } = this.nevermined

    const ddo = await this.nevermined.assets.resolve(did)
    const service = ddo.findServiceByReference(serviceReference)
    const result = await agreements.conditions.transferNft721(
      agreementId,
      ddo,
      service.index,
      publisher,
      txParams,
    )
    if (!result) {
      throw new NFTError('Error transferring nft721.')
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
   * const receipt = await nevermined.nfts721.releaseRewards(
   *           agreementId,
   *           ddo.id,
   *           artist
   *       )
   * ```
   *
   * @param agreementId - The NFT sales agreement id.
   * @param did - The Decentralized identifier of the NFT asset.
   * @param publisher - The current owner of the NFTs.
   * @param serviceReference - The reference to identify wich service within the DDO to release rewards
   * @param txParams - Optional transaction parameters.
   *
   * @returns true if the funds release was successful.
   *
   * @throws {@link NFTError}
   * Thrown if there is an error releasing the rewards.
   */
  public async releaseRewards(
    agreementId: string,
    did: string,
    publisher: NvmAccount,
    serviceReference: number | ServiceType = 'nft-sales',
    txParams?: TxParameters,
  ): Promise<boolean> {
    const { agreements } = this.nevermined

    const ddo = await this.nevermined.assets.resolve(did)
    const service = ddo.findServiceByReference(serviceReference)

    const result = await agreements.conditions.releaseNft721Reward(
      agreementId,
      ddo,
      service.index,
      publisher,
      undefined,
      txParams,
    )

    if (!result) {
      throw new NFTError('Error releasing the 721 rewards.')
    }

    return true
  }

  /**
   * Mint NFTs associated with an asset.
   *
   * This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.
   *
   * @example
   * ```ts
   * await nevermined.nfts721.mint(ddo.id, artist)
   * ```
   * @param did - The Decentralized Identifier of the NFT asset.
   * @param publisher - The account of the minter
   * @param txParams - Optional transaction parameters.
   * @returns The {@link TransactionReceipt}
   */
  public async mint(did: string, publisher: NvmAccount, txParams?: TxParameters) {
    return await this.nftContract.mint(did, publisher, txParams)
  }

  /**
   * Burn NFTs associated with an asset.
   *
   * @remarks
   * The publisher can only burn NFTs that it owns. NFTs that were already transferred cannot be burned by the publisher.
   *
   * @example
   * ```ts
   * await nevermined.nfts721.burn(
   *           tokenId,
   *           artist
   * )
   * ```
   *
   * @param tokenId - The identifier of the token to burn
   * @param account - The account of the publisher of the NFT.
   * @param txParams - Optional transaction parameters.
   *
   * @returns The {@link TransactionReceipt}
   */
  public async burn(tokenId: string, account: NvmAccount, txParams?: TxParameters) {
    return await this.nftContract.burn(tokenId, account, txParams)
  }

  /**
   * Mint NFTs associated with an asset allowing to specify some metadata
   *
   * This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.
   *
   * @example
   * ```ts
   * await nevermined.nfts721.mintWithURL(receiverAddress, ddo.id, nftMetadata, artist)
   * ```
   * @param to - The address receiving the NFT minted
   * @param did - The Decentralized Identifier of the NFT asset.
   * @param url - The URL with NFT metadata
   * @param from - The account of the minter
   * @param txParams - Optional transaction parameters.
   * @returns The {@link TransactionReceipt}
   */
  public async mintWithURL(
    to: string,
    did: string,
    url: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    return await this.nftContract.mintWithURL(to, did, url, from, txParams)
  }

  /**
   * Enable or disable NFT permissions for an operator.
   *
   * @example
   * ```ts
   * await nevermined.nfts721.setApprovalForAll(
   *               someoneElse,
   *               true,
   *               artist
   * )
   * ```
   *
   * @param target - The address that of the operator we want to give transfer rights to.
   * @param approved - Give or remove transfer rights from the operator.
   * @param from - The account that wants to give transfer rights to the operator.
   * @param txParams - Optional transaction parameters.
   * @returns The {@link TransactionReceipt}
   */
  public async setApprovalForAll(
    target: string,
    approved: boolean,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    return await this.nftContract.setApprovalForAll(target, approved, from, txParams)
  }

  /**
   * Gets the contract owner
   *
   * @example
   * ```ts
   * const nftContractOwner = new NvmAccount(
   *      await nevermined.nfts721.ownerOf()
   * )
   * ```
   *
   * @returns Address of the contract owner
   */
  public async ownerOf(did: string): Promise<string> {
    return await this.nftContract.ownerOf(did)
  }

  /**
   * Given some information, it gets the owner of the NFT
   *
   * @example
   * ```ts
   * const owner = await nevermined.nfts721.ownerOfTokenId(tokenId)
   * ```
   *
   * @param tokenId - The token id
   * @param nftTokenAddress - The address of the ERC-721 contract.
   *
   * @returns The address of the NFT owner.
   */
  public async ownerOfTokenId(tokenId: string) {
    return this.nftContract.ownerOf(tokenId)
  }

  /**
   * Given a DID it gets the owner of the NFT if that DID is used as tokenId
   *
   * @example
   * ```ts
   * const owner = await nevermined.nfts721.ownerOfAsset(ddo.id, nftTokenAddress)
   * ```
   *
   * @param did - The Decentralized identifier of the NFT asset.
   * @param nftTokenAddress - The address of the ERC-721 contract.
   *
   * @returns The address of the NFT owner.
   */
  public async ownerOfAsset(did: string) {
    return this.ownerOfTokenId(did)
  }

  /**
   * Given a DID and an agreement id it gets the owner of the NFT
   *
   * @example
   * ```ts
   * const owner = await nevermined.nfts721.ownerOfAssetByAgreement(ddo.id, agreementId)
   * ```
   *
   * @param did - The Decentralized identifier of the NFT asset.
   * @param nftTokenAddress - The address of the ERC-721 contract.
   * @param agreementId - The NFT sales agreement id.
   *
   * @returns The address of the NFT owner.
   */
  public async ownerOfAssetByAgreement(did: string, agreementId: string) {
    const tokenId = keccak256WithEncode(
      [{ type: 'bytes32' }, { type: 'bytes32' }],
      [zeroX(did), zeroX(agreementId)],
    )
    return this.ownerOfTokenId(tokenId)
  }

  /**
   * Returns if the `operatorAddress` is approved
   *
   *
   * @example
   * ```ts
   * await nevermined.nfts721.isApprovedForAll(someoneElse, artist.getId())
   * ```
   *
   * @param operatorAddress - The address to check the permissions
   * @param from - The address of the account granting or revoking the permissions via `setApprovalForAll`.
   *
   * @returns Boolean saying if the `operatorAddress` is approved
   */
  public async isApprovedForAll(operatorAddress: string, from: string) {
    return await this.nftContract.isApprovedForAll(from, operatorAddress)
  }

  /**
   * Get the NFT balance for a particular account/address
   *
   * @example
   * ```ts
   * const balance = await nevermined.nfts721.balance(artist)
   * ```
   *
   * @param account - The account/address to check the balance of.
   *
   * @returns The balance of NFTs owned by the account.
   */
  public async balanceOf(account: NvmAccount | string): Promise<bigint> {
    const _address = account instanceof NvmAccount ? account.getId() : account
    return await this.nftContract.balanceOf(_address)
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
   * @param account - Account of the user sending the transaction
   * @param agreementIdSeed - the seed of the Agreement Id of the underlying service agreement.
   * @param txParams - Transaction parameters
   *
   * @returns  true if the transaction was successful.
   *
   * @throws {@link NFTError}
   * Thrown if there is an error releasing the rewards.
   */
  public async releaseSecondaryMarketRewards(
    owner: NvmAccount,
    account: NvmAccount,
    agreementIdSeed: string,
    txParams?: TxParameters,
  ): Promise<boolean> {
    const service = await this.nevermined.services.metadata.retrieveService(agreementIdSeed)
    const did = DDO.getDIDFromService(service)
    const ddo = await this.nevermined.assets.resolve(did)
    ddo.updateMetadataService(service)
    const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
      agreementIdSeed,
      account.getId(),
    )

    let receipt = await this.nevermined.agreements.conditions.transferNft721(
      agreementId,
      ddo,
      service.index,
      owner,
      txParams,
    )

    if (!receipt) throw new NFTError('TransferNft Failed.')

    receipt = await this.nevermined.agreements.conditions.releaseNft721Reward(
      agreementId,
      ddo,
      service.index,
      owner,
      undefined,
      txParams,
    )

    if (!receipt) throw new NFTError('ReleaseNftReward Failed.')
    return receipt
  }

  /**
   * Adds a operator (`operatorAddress`) to the NFT Contract.
   * Granting and revoking operator permissions only can be done by the NFT Contract owner
   *
   * @example
   * ```ts
   * await nevermined.nfts721.grantOperatorRole(
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
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.nftContract.grantOperatorRole(operatorAddress, from, txParams)
  }

  /**
   * Revokes a minter (`operatorAddress`) of the NFT Contract.
   * Granting and revoking minting permissions only can be done by the NFT Contract owner
   *
   * @example
   * ```ts
   * await nevermined.nfts721.revokeOperatorRole(
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
    from: NvmAccount,
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
    return this._details(did, 721)
  }

  public async isOperatorOfDID(did: string, address: string): Promise<boolean> {
    return super.isOperatorOfDID(did, address, 721)
  }
}
