import { ServiceType } from "../ddo/Service"

export type NFTType = 721 | 1155

export class NFTAttributes {

    ercType: NFTType

    nftContractAddress: string

    preMint: boolean = true

    nftMetadataUrl: string

    nftTransfer: boolean = true

    duration: number = 0

    services: ServiceType[]
}
