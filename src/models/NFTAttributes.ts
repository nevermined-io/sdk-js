import { RoyaltyAttributes } from '../nevermined/Assets'
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

    cap: BigNumber = BigNumber.from(0) // max number of nfts that can be minted, 0 means uncapped

    preMint = true // if the asset is pre-minted

    nftMetadataUrl = '' // URL to the metadata definition of the NFT contract

    nftTransfer = true // The asset is transferred (true) or minted (false) with Nevermined contracts

    isSubscription = false

    duration = 0 // If is a subscription this means the number of blocks the subscription last. If 0 means unlimitted

    amount: BigNumber = BigNumber.from(0) // Number of editions

    royaltyAttributes: RoyaltyAttributes | undefined
}
