import { DDO, ServiceType } from '../../../ddo'
import {
  fillConditionsWithDDO,
  findServiceConditionByName,
  getAssetPriceFromService,
  getDIDFromService,
  getNftHolderFromService,
  zeroX,
} from '../../../utils'
import { AssetPrice, Babysig, ERCType } from '../../../models'
import { RoyaltyKind } from '../AssetsApi'
import { Account } from '../../Account'
import { Token, TxParameters } from '../../../keeper'
import { ServiceSecondary } from '../../../ddo'
import { NFTError } from '../../../errors'
import { BigNumber, generateId } from '../../../utils'
import { RegistryBaseApi } from '../RegistryBaseApi'

/**
 * Abstract class providing common NFT methods for different ERC implementations.
 */
export abstract class NFTsBaseApi extends RegistryBaseApi {
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
   *           nftAmount,
   *           721
   *       )
   * ```
   *
   * @param agreementId - The NFT sales agreement id.
   * @param nftHolder - The address of the current owner of the NFT.
   * @param nftReceiver - The address where the NFT should be transferred.
   * @param numberEditions - The number of NFT editions to transfer. If the NFT is ERC-721 it should be 1
   * @param ercType  - The Type of the NFT ERC (1155 or 721).
   * @param did - The DID of the NFT to claim.
   *
   * @throws {@link NFTError} if Nevermined is not an operator for this NFT
   * @returns true if the transfer was successful.
   */
  protected async claimNFT(
    agreementId: string,
    nftHolder: string,
    nftReceiver: string,
    numberEditions: BigNumber = BigNumber.from(1),
    ercType: ERCType = 1155,
    did?: string,
  ): Promise<boolean> {
    if (did) {
      // check if transferNFT condition has the operator role
      const transferNftConditionAddress =
        ercType == 1155
          ? this.nevermined.keeper.conditions.transferNftCondition.address
          : this.nevermined.keeper.conditions.transferNft721Condition.address

      const isOperator = await this.isOperator(did, transferNftConditionAddress)
      if (!isOperator) {
        throw new NFTError('Nevermined does not have operator role')
      }
    }

    return await this.nevermined.services.node.claimNFT(
      agreementId,
      nftHolder,
      nftReceiver,
      numberEditions,
      ercType,
    )
  }

  /**
   * Check if a particular address is the operator of a DID.
   *
   * @param did - The DID of the NFT to check
   * @param address - The address to check if operator status
   * @param ercType - The erc type of the NFT.
   *
   * @returns operator status of address as a boolean
   */
  public async isOperator(did: string, address: string, ercType: ERCType = 1155): Promise<boolean> {
    const ddo = await this.nevermined.assets.resolve(did)
    const nftContractAddress = NFTsBaseApi.getNFTContractAddress(ddo, 'nft-sales')

    const nftContract =
      ercType == 1155
        ? await this.nevermined.contracts.loadNft1155Contract(nftContractAddress)
        : await this.nevermined.contracts.loadNft721Contract(nftContractAddress)

    return nftContract.isOperator(address)
  }

  /**
   * Asks the Node to transfer the NFT on behalf of the publisher.
   *
   * @deprecated Use the `claim` method instead
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
   * const receipt = await nevermined.nfts721.transferForDelegate(
   *           agreementId,
   *           editor.getId(),
   *           subscriber.getId(),
   *           nftAmount,
   *           721
   *       )
   * ```
   *
   * @param agreementId - The NFT sales agreement id.
   * @param nftHolder - The address of the current owner of the NFT.
   * @param nftReceiver - The address where the NFT should be transferred.
   * @param nftAmount - The amount of NFTs to transfer.
   * @param ercType  - The Type of the NFT ERC (1155 or 721).
   *
   * @returns true if the transfer was successful.
   */
  public async transferForDelegate(
    agreementId: string,
    nftHolder: string,
    nftReceiver: string,
    nftAmount: BigNumber,
    ercType: ERCType = 1155,
  ): Promise<boolean> {
    return await this.nevermined.services.node.claimNFT(
      agreementId,
      nftHolder,
      nftReceiver,
      nftAmount,
      ercType,
    )
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
   * @param ercType - The type of NFT used
   *
   * @returns The details of the NFT.
   */
  protected async _details(did: string, ercType: ERCType) {
    const details = await this.nevermined.keeper.didRegistry.getDIDRegister(did)
    const royaltySchemeAddress = await this.nevermined.keeper.didRegistry.getDIDRoyalties(did)
    let royalties = Number(details[8])
    let royaltyScheme = RoyaltyKind.Legacy
    if (
      this.nevermined.keeper.royalties.curve &&
      royaltySchemeAddress === this.nevermined.keeper.royalties.curve.address
    ) {
      royaltyScheme = RoyaltyKind.Curve
      royalties = await this.nevermined.keeper.royalties.curve.getRoyalty(did)
    } else if (
      this.nevermined.keeper.royalties.standard &&
      royaltySchemeAddress === this.nevermined.keeper.royalties.standard.address
    ) {
      royaltyScheme = RoyaltyKind.Standard
      royalties = await this.nevermined.keeper.royalties.standard.getRoyalty(did)
    }

    const nftInfo = await this.nevermined.keeper.didRegistry.getNFTInfo(did)
    let nftSupply = BigNumber.from(0)
    let mintCap = BigNumber.from(0)
    let nftURI = ''

    if (nftInfo[1]) {
      // NFT is initialized so asking the NFT contract
      let nftApi
      if (ercType == 1155) {
        nftApi = await this.nevermined.contracts.loadNft1155(nftInfo[0])
      } else {
        nftApi = await this.nevermined.contracts.loadNft721(nftInfo[0])
      }

      const nftAttributes = await nftApi.getContract.getNFTAttributes(did)
      nftSupply = nftAttributes.nftSupply
      mintCap = nftAttributes.mintCap
      nftURI = nftAttributes.nftURI
    }

    return {
      owner: details[0],
      lastChecksum: details[1],
      url: details[2],
      lastUpdatedBy: details[3],
      blockNumberUpdated: Number(details[4]),
      providers: details[5],
      nftSupply,
      mintCap,
      royalties,
      royaltyScheme,
      nftContractAddress: nftInfo[0],
      nftInitialized: nftInfo[1],
      nftURI,
    }
  }

  /**
   * Gets the NFT contract address associated with a Nevermined asset from the DDO.
   *
   * @example
   * ```ts
   * const nftContractAddress = NFT1155Api.getNFTContractAddress(ddo)
   * ```
   *
   * @param ddo - The DDO of the asset.
   * @param serviceType - The service type to look for the contract address
   *
   * @returns The NFT contract address.
   */
  public static getNFTContractAddress(ddo: DDO, serviceType: ServiceType = 'nft-access') {
    const service = ddo.findServiceByType(serviceType)
    if (service) {
      const conditionName = serviceType == 'nft-access' ? 'nftHolder' : 'transferNFT'
      const cond = service.attributes.serviceAgreementTemplate.conditions.find(
        (c) => c.name === conditionName,
      )
      return !cond ? null : cond.parameters.find((p) => p.name === '_contractAddress').value
    }
    return null
  }

  /**
   * After purchase re-list an NFT to enable secondary market sales.
   *
   * @example
   * ```ts
   * const agreementId = await nevermined.nfts1155.listOnSecondaryMarkets(
   *               ddo,
   *               assetPrice,
   *               numberNFTs,
   *               collector.getId(),
   *               token,
   *               collector.getId()
   *           )
   * ```
   *
   * @param ddo - The DDO of the asset.
   * @param assetPrice - The current setup of asset rewards.
   * @param nftAmount - The number of NFTs put up for secondary sale.
   * @param provider - The address that will be the provider of the secondary sale.
   * @param owner - The account of the current owner.
   *
   * @returns  the agreementId of the secondary sale.
   *
   * @throws {@link NFTError}
   * Thrown if there is an error listing the NFT.
   */
  public async listOnSecondaryMarkets(
    ddo: DDO,
    assetPrice: AssetPrice,
    nftAmount: BigNumber,
    provider: string,
    token: Token,
    owner: string,
  ): Promise<string> {
    const serviceType: ServiceType = 'nft-sales'
    const { nftSalesTemplate } = this.nevermined.keeper.templates
    const agreementIdSeed = zeroX(generateId())
    const nftSalesServiceAgreementTemplate = await nftSalesTemplate.getServiceAgreementTemplate()
    const nftSalesTemplateConditions =
      await nftSalesTemplate.getServiceAgreementTemplateConditions()

    nftSalesServiceAgreementTemplate.conditions = fillConditionsWithDDO(
      serviceType,
      nftSalesTemplateConditions,
      ddo,
      assetPrice,
      token.getAddress(),
      undefined,
      provider || owner,
      nftAmount,
    )

    const nftSalesServiceAgreement: ServiceSecondary = {
      agreementId: agreementIdSeed,
      type: serviceType,
      index: 6,
      serviceEndpoint: this.nevermined.services.node.getNftEndpoint(),
      templateId: nftSalesTemplate.getAddress(),
      did: ddo.id,
      attributes: {
        main: {
          name: 'nftSalesAgreement',
          creator: owner,
          datePublished: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
          timeout: 86400,
        },
        additionalInformation: {
          description: '',
        },
        serviceAgreementTemplate: nftSalesServiceAgreementTemplate,
      },
    }

    const saveResult = await this.nevermined.services.metadata.storeService(
      agreementIdSeed,
      nftSalesServiceAgreement,
    )

    if (saveResult) {
      return agreementIdSeed
    } else {
      throw new NFTError(`Error saving ${agreementIdSeed} to MetadataDB`)
    }
  }

  /**
   * Buys a number of listed NFTs on secondary markets.
   *
   * @example
   * ```ts
   * const result = await nevermined.nfts1155.buySecondaryMarketNft(
   *               collector,
   *               BigNumber.from(1),
   *               agreementId
   *           )
   * ```
   *
   * @param consumer - The account of the buyer/consumer.
   * @param nftAmount - The number of assets to buy. 1 by default.
   * @param agreementId - The agreementId of the initial sales agreement created off-chain.
   *
   * @returns true if the buy was successful.
   *
   * @throws {@link NFTError}
   * Thrown if there is an error buying the NFT.
   */
  public async buySecondaryMarketNft(
    consumer: Account,
    nftAmount: BigNumber = BigNumber.from(1),
    agreementIdSeed: string,
    conditionsTimeout: number[] = [86400, 86400, 86400],
    txParams?: TxParameters,
  ): Promise<boolean> {
    const { nftSalesTemplate } = this.nevermined.keeper.templates
    const service = await this.nevermined.services.metadata.retrieveService(agreementIdSeed)
    const assetPrice = getAssetPriceFromService(service)
    // has no privkeys, so we can't sign
    const currentNftHolder = new Account(getNftHolderFromService(service))
    const did = getDIDFromService(service)
    const ddo = await this.nevermined.assets.resolve(did)
    ddo.updateService(this.nevermined, service)

    const agreementId = await nftSalesTemplate.createAgreementFromDDO(
      agreementIdSeed,
      ddo,
      nftSalesTemplate.params(consumer.getId(), nftAmount, currentNftHolder.getId()),
      consumer,
      consumer,
      conditionsTimeout,
      txParams,
    )

    if (!agreementId) throw new Error('Creating buy agreement failed')

    const payment = findServiceConditionByName(service, 'lockPayment')

    const receipt = await this.nevermined.agreements.conditions.lockPayment(
      agreementId,
      ddo.id,
      assetPrice.getAmounts(),
      assetPrice.getReceivers(),
      payment.parameters.find((p) => p.name === '_tokenAddress').value as string,
      consumer,
      txParams,
    )

    if (!receipt) throw new NFTError('LockPayment Failed.')
    return receipt
  }

  /**
   * Access the files associated with an NFT.
   *
   * @remarks
   * This function will call the Node that will check if all the access conditions where fulfilled
   * before providing the files.
   *
   * @example
   * ```ts
   * const result = await nevermined.nfts1155.access(ddo.id, collector, '/tmp/')
   * ```
   *
   * @param did - The Decentralized Identifier of the NFT asset.
   * @param consumer - The NFT holder account.
   * @param destination - The download destination for the files.
   * @param index - The index of the file. If unset will download all the files in the asset.
   * @param agreementId - The NFT sales agreement id.
   * @param buyer - Key which represent the buyer
   * @param babySig - An elliptic curve signature
   * @returns true if the access was successful or file if isToDownload is false.
   */
  public async access(
    did: string,
    consumer: Account,
    destination?: string,
    index?: number,
    agreementId = '0x',
    buyer?: string,
    babysig?: Babysig,
  ) {
    const ddo = await this.nevermined.assets.resolve(did)
    const { attributes } = ddo.findServiceByType('metadata')
    const { files } = attributes.main

    const accessToken = await this.nevermined.utils.jwt.getNftAccessGrantToken(
      agreementId,
      ddo.id,
      consumer,
      buyer,
      babysig,
    )
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    }

    // Download the files
    this.logger.log('Downloading the files')
    const result = await this.nevermined.services.node.downloadService(
      files,
      destination,
      index,
      headers,
    )

    if (typeof result === 'string') {
      return true
    }
    return result
  }
}
