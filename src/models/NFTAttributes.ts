import { RoyaltyAttributes } from '../nevermined/Assets'
import BigNumber from '../utils/BigNumber'

export type ERCType = 721 | 1155

export type NeverminedNFTType =
    | 'nft1155' // Standard 1155 implementation
    | 'nft721' // Standard 721 implementation
    | 'nft1155-credit' // 1155 implementation with a credit system that allow pay-as-you-go scenarios
    | 'nft721-subscription' // 721 implementing subscriptions that can expire

export const ercOfNeverminedNFTType = {
    nft1155: 1155 as ERCType,
    nft721: 721 as ERCType,
    'nft1155-credit': 1155 as ERCType,
    'nft721-subscription': 721 as ERCType
}

export class NFTAttributes {
    ercType: ERCType // The type of ERC used

    nftType: NeverminedNFTType // The Nevermined implementetion of the NFT used

    nftContractAddress: string

    cap: BigNumber = BigNumber.from(0) // max number of nfts that can be minted, 0 means uncapped

    preMint: boolean = true // if the asset is pre-minted

    nftMetadataUrl: string = '' // URL to the metadata definition of the NFT contract

    nftTransfer: boolean = true // The asset is transferred (true) or minted (false) with Nevermined contracts

    isSubscription: boolean = false

    duration: number = 0 // If is a subscription this means the number of blocks the subscription last. If 0 means unlimitted

    amount: BigNumber = BigNumber.from(0) // Number of editions

    royaltyAttributes: RoyaltyAttributes | undefined
}
