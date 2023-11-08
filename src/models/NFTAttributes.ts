import { RoyaltyAttributes } from '../nevermined'
import { AssetAttributes } from './AssetAttributes'
import { ERCType, NeverminedNFTType, NeverminedNFT1155Type, NeverminedNFT721Type } from './'
import { ServiceType } from '../ddo/types'
import { NFTError } from '../errors/NFTError'
import { jsonReplacer } from '../common'

export class NFTServiceAttributes {
  /**
   * Number of editions
   */
  amount?: bigint

  /**
   * The asset is transferred (true) or minted (false) with Nevermined contracts
   */
  nftTransfer?: boolean

  /**
   * If true means the NFT works as a subscription
   */
  isSubscription?: boolean

  /**
   * If is a subscription this means the number of blocks the subscription last. If 0 means unlimited
   */
  duration?: number

  /**
   * The tokenId of the NFT related with the Service.
   * For example if is a NFT Access service requiring holding a NFT, this is the tokenId of the NFT
   */
  tokenId?: string

  /**
   * The maximum number of credits that can be charged to the subscriber.
   * If not specified, the subscription cost is not capped
   */
  maxCreditsCharged?: bigint

  /**
   * The minimum number of credits that will be charged to the subscriber.
   * If not specified, the amount defined in the service agreement or 1 credit will be charged
   */
  minCreditsCharged?: bigint

  /**
   * The minimum number of credits that the subscribers needs to hold to access the asset.
   * If not specified, the amount defined in the service agreement or 1 credit will be required
   */
  minCreditsRequired?: bigint

  static defaultValues = {
    serviceType: 'nft-access' as ServiceType,
    nftTransfer: true, // The NFT will use transfers instead of minting
    isSubscription: false, // By default the asset doesn't represent a subscription
    duration: 0, // Because it's not a subscription it doesn't have a duration
    amount: 1n, // By default just one edition
    tokenId: '', // By default no tokenId
    maxCreditsCharged: 0n, // Max credits charged equals to 0 means the subscription cost is not capped
    minCreditsCharged: 0n, // Min credits charged equals to 0 means the amount defined in the service agreement or 1 credit will be charged
    minCreditsRequired: 1n, // One credit required to access
  }

  public static getDefaultNFTServiceAttributes(): Required<NFTServiceAttributes> {
    return {
      ...NFTServiceAttributes.defaultValues,
    }
  }

  /**
   * Taking into account the nft attributes confifured tt returns the number of credits to be consumed
   * @param dynamicAmount the dynamic amount of credits asked to be consumed
   * @returns amount to consume
   */
  static getCreditsToConsume(nftAttributes: NFTServiceAttributes, dynamicAmount?: bigint) {
    if (!nftAttributes) throw new NFTError('NFT attributes are not defined')

    if (dynamicAmount) {
      if (dynamicAmount > nftAttributes.maxCreditsCharged) {
        // TODO: Evalue if thow an exception or return the max credits that can be charged
        //throw new DynamicCreditsOverLimit(`The amount of credits to consume ${dynamicAmount} is higher than the max credits charged ${this.maxCreditsCharged}`)
        return nftAttributes.maxCreditsCharged
      } else if (dynamicAmount < nftAttributes.minCreditsCharged) {
        // TODO: Evalue if thow an exception or return the min amount to be charged
        //throw new DynamicCreditsUnderLimit(`The amount of credits to consume ${dynamicAmount} is lower than the min credits charged ${this.minCreditsCharged}`)
        nftAttributes.minCreditsCharged
      }
      return dynamicAmount
    }
    if (nftAttributes.minCreditsCharged && nftAttributes.minCreditsCharged >= 0n)
      return nftAttributes.amount > nftAttributes.minCreditsCharged
        ? nftAttributes.amount
        : nftAttributes.minCreditsCharged
    else return nftAttributes.amount
  }

  /**
   * Given some credits balance if checks if that's enough to access to a NFT asset
   * @param creditsBalance balance of credits
   * @returns boolean
   */
  static isCreditsBalanceEnough(nftAttributes: NFTServiceAttributes, creditsBalance: bigint) {
    // the user needs to have enough credits to pay the min credits required and the amount of credits to consume
    if (nftAttributes.minCreditsRequired === undefined)
      return creditsBalance >= nftAttributes.amount
    else
      return (
        creditsBalance >= nftAttributes.minCreditsRequired && creditsBalance >= nftAttributes.amount
      )
  }

  /**
   * Given some partial nft attributes it applies some default validations and pre-configure default values
   * @param nftAttributes partial nft attributes
   * @returns nft attributes validated and configured
   */
  static configureServicesAttributes(
    nftAttributes: Partial<NFTAttributes>,
  ): Partial<NFTAttributes> {
    nftAttributes.services = nftAttributes.services.map((service) => {
      if (!service.nft) service.nft = {}
      // We setup a default value if the amount is not defined but keep it if it's 0
      if (service.nft.amount === undefined) service.nft.amount = this.defaultValues.amount

      if (service.serviceType === 'nft-access') {
        if (!service.nft.minCreditsCharged) service.nft.minCreditsCharged = service.nft.amount
        if (!service.nft.maxCreditsCharged) service.nft.maxCreditsCharged = service.nft.amount
        if (!service.nft.minCreditsRequired)
          service.nft.minCreditsRequired = service.nft.minCreditsCharged

        if (
          service.nft.amount < service.nft.minCreditsCharged ||
          service.nft.amount > service.nft.maxCreditsCharged
        )
          throw new NFTError(
            `The amount of credits to consume ${service.nft.amount} is not between the min credits charged ${service.nft.minCreditsCharged} and the max credits charged ${service.nft.maxCreditsCharged}`,
          )
      } else if (service.serviceType === 'nft-sales') {
        if (nftAttributes.ercType == 721) service.nft.amount = 1n
      }
      return service
    })
    console.log(`NFT Attributes: ${JSON.stringify(nftAttributes.services, jsonReplacer, 2)}`)
    return nftAttributes
  }
}

export class NFTAttributes extends AssetAttributes {
  /**
   * The type of ERC used (721 or 1155)
   * @see {@link https://ethereum.org/en/developers/docs/standards/tokens/erc-721/}
   * @see {@link https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/}
   */
  ercType: ERCType

  /**
   * The Nevermined implementation of the NFT used.
   * A part of what type of ERC is based, Nevermined provides different NFT implementations to fit in different scenarios.
   * This attribute allow to specify between the different Nevermined NFT types
   */
  nftType: NeverminedNFTType

  /**
   * The address of the deployed NFT Contract
   */
  nftContractAddress: string

  /**
   * Attributes related with the NFT service (access or sales)
   */
  nft?: NFTServiceAttributes

  /**
   * Attributes describing the royalties attached to the NFT in the secondary market
   */
  royaltyAttributes?: RoyaltyAttributes

  /**
   * If the asset is pre-minted
   */
  preMint?: boolean

  /**
   * URL to the metadata definition of the NFT contract
   */
  nftMetadataUrl?: string

  /**
   * Max number of nfts that can be minted, 0 means uncapped
   */
  cap?: bigint

  static defaultValues = {
    ...AssetAttributes.defaultValues,
    nft: NFTServiceAttributes.defaultValues,
    royaltyAttributes: undefined,
    preMint: true, // It means the NFT will mint all the editions defined in the `amount` attributed during the registration
    nftMetadataUrl: '', // Url to the metadata describing the NFT OpenSea style
    cap: 0n, // Cap equals to 0 means the NFT is uncapped
  }

  static getInstance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    return {
      ercType: 1155,
      nftType: NeverminedNFT1155Type.nft1155,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...NFTServiceAttributes.configureServicesAttributes(nftAttributes),
    }
  }

  static getNFT1155Instance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    return {
      ercType: 1155,
      nftType: NeverminedNFT1155Type.nft1155,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...NFTServiceAttributes.configureServicesAttributes(nftAttributes),
    }
  }

  static getCreditsSubscriptionInstance(
    nftAttributes: Partial<NFTAttributes>,
  ): Required<NFTAttributes> {
    const _instance = {
      ercType: 1155,
      nftType: NeverminedNFT1155Type.nft1155Credit,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...NFTServiceAttributes.configureServicesAttributes(nftAttributes),
    }
    _instance.services.forEach((service) => {
      service.nft.isSubscription = true
    })
    return _instance
  }

  static getNFT721Instance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    return {
      ercType: 721,
      nftType: NeverminedNFT721Type.nft721,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...NFTServiceAttributes.configureServicesAttributes(nftAttributes),
    }
  }

  static getSubscriptionInstance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    const _instance = {
      ercType: 721,
      nftType: NeverminedNFT721Type.nft721Subscription,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...NFTServiceAttributes.configureServicesAttributes(nftAttributes),
    }
    _instance.services.forEach((service) => {
      service.nft.isSubscription = true
    })
    return _instance
  }

  static getPOAPInstance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    const _instance = {
      ercType: 721,
      nftType: NeverminedNFT721Type.nft721POAP,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...NFTServiceAttributes.configureServicesAttributes(nftAttributes),
    }
    return _instance
  }

  static getSoulBoundInstance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    const _instance = {
      ercType: 721,
      nftType: NeverminedNFT721Type.nft721SoulBound,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...NFTServiceAttributes.configureServicesAttributes(nftAttributes),
    }
    return _instance
  }
}
