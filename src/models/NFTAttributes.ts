import { RoyaltyAttributes } from '../nevermined'
import { AssetAttributes } from './AssetAttributes'
import { ERCType, NeverminedNFTType, NeverminedNFT1155Type, NeverminedNFT721Type } from './'
import { ServiceType } from '../ddo/types'

export class NFTServiceAttributes {
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
   * Number of editions
   */
  amount?: bigint

  static defaultValues = {
    serviceType: 'nft-access' as ServiceType,
    nftTransfer: true, // The NFT will use transfers
    isSubscription: false, // By default the asset doesn't represent a subscription
    duration: 0, // Because it's not a subscription it doesn't have a duration
    amount: 1n, // By default just one edition
  }

  public static getDefaultNFTServiceAttributes(): NFTServiceAttributes {
    return {
      ...NFTServiceAttributes.defaultValues,
    }
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
    royaltyAttributes: undefined,
    preMint: true, // It means the NFT will mint all the editions defined in the `amount` attributed during the registration
    nftMetadataUrl: '', // Url to the metadata describing the NFT OpenSea style
    cap: 0n, // Cap equals to 0 means the NFT is uncapped
  }

  static getInstance(nftAttributes: NFTAttributes): Required<NFTAttributes> {
    return {
      ...NFTAttributes.defaultValues,
      ...nftAttributes,
    }
  }

  static getNFT1155Instance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    return {
      ercType: 1155,
      nftType: NeverminedNFT1155Type.nft1155,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...nftAttributes,
    }
  }

  static getNFT721Instance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    return {
      ercType: 721,
      nftType: NeverminedNFT721Type.nft721,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...nftAttributes,
    }
  }

  static getSubscriptionInstance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    const _instance = {
      ercType: 721,
      nftType: NeverminedNFT721Type.nft721Subscription,
      // isSubscription: true,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...nftAttributes,
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
      ...nftAttributes,
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
      ...nftAttributes,
    }
    return _instance
  }
}
