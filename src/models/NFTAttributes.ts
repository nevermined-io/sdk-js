import { RoyaltyAttributes } from '../nevermined'
import BigNumber from '../utils/BigNumber'
import { AssetAttributes } from './AssetAttributes'
import { ERCType, NeverminedNFTType, NeverminedNFT1155Type, NeverminedNFT721Type } from './'

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
   * Max number of nfts that can be minted, 0 means uncapped
   */
  cap?: BigNumber

  /**
   * If the asset is pre-minted
   */
  preMint?: boolean

  /**
   * URL to the metadata definition of the NFT contract
   */
  nftMetadataUrl?: string

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
  amount?: BigNumber

  /**
   * Attributes describing the royalties attached to the NFT in the secondary market
   */
  royaltyAttributes?: RoyaltyAttributes

  static defaultValues = {
    ...AssetAttributes.defaultValues,
    cap: BigNumber.from(0), // Cap equals to 0 means the NFT is uncapped
    preMint: true, // It means the NFT will mint all the editions defined in the `amount` attributed during the registration
    nftMetadataUrl: '', // Url to the metadata describing the NFT OpenSea style
    nftTransfer: true, // The NFT will use transfers
    isSubscription: false, // By default the asset doesn't represent a subscription
    duration: 0, // Because it's not a subscription it doesn't have a duration
    amount: BigNumber.from(1), // By default just one edition
    royaltyAttributes: undefined, // No royalty attributes by default what means no royalties
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
      nftType: NeverminedNFT721Type.nft721Subscription,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...nftAttributes,
    }
  }

  static getSubscriptionInstance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    return {
      ercType: 721,
      nftType: NeverminedNFT721Type.nft721Subscription,
      isSubscription: true,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...nftAttributes,
    }
  }

  static getPOAPInstance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    return {
      ercType: 721,
      nftType: NeverminedNFT721Type.nft721POAP,
      isSubscription: false,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...nftAttributes,
    }
  }

  static getSoulBoundInstance(nftAttributes: Partial<NFTAttributes>): Required<NFTAttributes> {
    return {
      ercType: 721,
      nftType: NeverminedNFT721Type.nft721SoulBound,
      isSubscription: false,
      nftContractAddress: nftAttributes.nftContractAddress,
      metadata: nftAttributes.metadata,
      ...NFTAttributes.defaultValues,
      ...nftAttributes,
    }
  }
}
