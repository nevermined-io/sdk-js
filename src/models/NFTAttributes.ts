import { RoyaltyAttributes } from '../nevermined/Assets'

export type NFTType = 721 | 1155

export class NFTAttributes {
    ercType: NFTType

    nftContractAddress: string

    cap: number = 0 // max number of nfts that can be minted, 0 means uncapped

    preMint: boolean = true // if the asset is pre-minted

    nftMetadataUrl: string = '' // URL to the metadata definition of the NFT contract

    nftTransfer: boolean = true // The asset is transferred (true) or minted (false) with Nevermined contracts

    isSubscription: boolean = false

    duration: number = 0 // If is a subscription this means the number of blocks the subscription last. If 0 means unlimitted

    amount: number = 1 // Number of editions

    royaltyAttributes: RoyaltyAttributes | undefined
}
