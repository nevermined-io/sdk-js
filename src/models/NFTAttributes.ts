import { RoyaltyAttributes } from '../nevermined/api/AssetsApi'
import BigNumber from '../utils/BigNumber'

export enum ERCType {
    nft721 = 721,
    nft1155 = 1155
}

export enum NeverminedNFT721Type {
    nft721 = 'nft721', // Standard 721 implementation
    nft721Subscription = 'nft721-subscription' // 721 implementing subscriptions that can expire
}

export enum NeverminedNFT1155Type {
    nft1155 = 'nft1155', // Standard 1155 implementation
    nft1155Credit = 'nft1155-credit' // 1155 implementation with a credit system that allow pay-as-you-go scenarios
}

export type NeverminedNFTType = NeverminedNFT721Type | NeverminedNFT1155Type

export const ercOfNeverminedNFTType = {
    nft1155: ERCType.nft1155,
    nft721: ERCType.nft721,
    'nft1155-credit': ERCType.nft1155,
    'nft721-subscription': ERCType.nft721
}

export const defaultNeverminedNFTType = {
    721: NeverminedNFT721Type.nft721,
    1155: NeverminedNFT1155Type.nft1155
}

export class NFTAttributes {

    ercType: ERCType // The type of ERC used

    nftType: NeverminedNFTType // The Nevermined implementetion of the NFT used

    nftContractAddress: string

    cap?: BigNumber // max number of nfts that can be minted, 0 means uncapped

    preMint?: boolean // if the asset is pre-minted

    nftMetadataUrl?: string // URL to the metadata definition of the NFT contract

    nftTransfer?: boolean // The asset is transferred (true) or minted (false) with Nevermined contracts

    isSubscription?: boolean

    duration?: number // If is a subscription this means the number of blocks the subscription last. If 0 means unlimitted

    amount?: BigNumber // Number of editions

    royaltyAttributes?: RoyaltyAttributes | undefined

    static defaultValues = {
        cap: BigNumber.from(0), // Cap equals to 0 means the NFT is uncapped
        preMint: true, // It means the NFT will mint all the editions defined in the `amount` attributed during the registration
        nftMetadataUrl: '', // Url to the metadata describing the NFT OpenSea style
        nftTransfer: true, // The NFT will use transfers
        isSubscription: false, // By default the asset doesn't represent a subscription
        duration: 0, // Because it's not a subscription it doesn't have a duration 
        amount: BigNumber.from(1), // By default just one edition
        royaltyAttributes: undefined // No royalty attributes by default what means no royalties
    }

    static getInstance(nftAttributes: NFTAttributes): Required<NFTAttributes> {
        return { ...NFTAttributes.defaultValues, ...nftAttributes }
    }
}
