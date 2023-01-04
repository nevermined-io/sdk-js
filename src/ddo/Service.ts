import { MetaData } from './MetaData'
import { ServiceAgreementTemplate } from './ServiceAgreementTemplate'
import { AaveConditionType, ServiceAaveCredit } from '../keeper/contracts/defi/Service'
import { Account } from '../sdk'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { BigNumber } from 'ethers'
import { ERCType, NeverminedNFTType, AssetPrice, Babysig } from '..'

export type ConditionType =
    | 'lockPayment'
    | 'escrowPayment'
    | 'nftHolder'
    | 'transferNFT'
    | AaveConditionType

export type ServiceType =
    | 'authorization'
    | 'metadata'
    | 'access'
    | 'compute'
    | 'workflow'
    | 'nft-access'
    | 'nft-sales'
    | 'aave-credit'

export const serviceIndex = {
    authorization: 2,
    metadata: 0,
    access: 3,
    'access-proof': 10,
    compute: 4,
    workflow: 5,
    'nft-access': 7,
    'nft-sales': 6,
    'nft721-access': 9,
    'nft721-sales': 8,
    'aave-credit': 11,
    'nft-access-proof': 12,
    'nft-sales-proof': 13,
    'nft721-access-proof': 14,
    'nft721-sales-proof': 15
}
export interface ServiceCommon {
    type: ServiceType
    index: number
    serviceEndpoint?: string
    templateId?: string
    attributes: any & {
        main: { [key: string]: any }
    }
}

export type Priced = {
    attributes: {
        main: {
            price: string
        }
        additionalInformation: {
            priceHighestDenomination: number
        }
    }
}

export interface ServiceAuthorization extends ServiceCommon {
    type: 'authorization'
    service: 'None' | 'RSAES-OAEP'
}

export interface ServiceMetadata extends ServiceCommon {
    type: 'metadata'
    attributes: MetaData
}

export interface ServiceAccess extends ServiceCommon, Priced {
    type: 'access'
    templateId?: string
    attributes: {
        main: {
            creator: string
            name: string
            datePublished: string
            price: string
            timeout: number
        }
        serviceAgreementTemplate?: ServiceAgreementTemplate
        additionalInformation: {
            description: string
            priceHighestDenomination: number
        }
    }
}

export interface ServiceCompute extends ServiceCommon, Priced {
    type: 'compute'
    templateId?: string
    attributes: {
        main: {
            creator: string
            name: string
            datePublished: string
            price: string
            timeout: number
        }
        serviceAgreementTemplate?: ServiceAgreementTemplate
        additionalInformation: {
            description: string
            priceHighestDenomination: number
        }
    }
}

export interface ServiceNFTAccess extends ServiceCommon {
    type: 'nft-access'
    templateId?: string
    attributes: {
        main: {
            ercType: ERCType
            nftType: NeverminedNFTType
            creator: string
            name: string
            datePublished: string
            timeout: number
        }
        serviceAgreementTemplate?: ServiceAgreementTemplate
        additionalInformation: {
            description: string
        }
    }
}

export interface ServiceNFTSales extends ServiceCommon, Priced {
    type: 'nft-sales'
    templateId?: string
    attributes: {
        main: {
            ercType: ERCType
            nftType: NeverminedNFTType
            creator: string
            name: string
            datePublished: string
            price: string
            timeout: number
        }
        serviceAgreementTemplate?: ServiceAgreementTemplate
        additionalInformation: {
            description: string
            priceHighestDenomination: number
        }
    }
}

export interface ServiceSecondary extends Service {
    agreementId: string
    did: string
}

export type Service<T extends ServiceType | 'default' = 'default'> =
    T extends 'authorization'
        ? ServiceAuthorization
        : T extends 'metadata'
        ? ServiceMetadata
        : T extends 'nft-access'
        ? ServiceNFTAccess
        : T extends 'nft-sales'
        ? ServiceNFTSales
        : T extends 'access'
        ? ServiceAccess
        : T extends 'compute'
        ? ServiceCompute
        : T extends 'aave-credit'
        ? ServiceAaveCredit
        : T extends 'default'
        ? ServiceCommon
        : ServiceCommon

export interface ValidationParams {
    agreement_id: string
    did: string
    consumer_address?: string
    buyer?: string
    babysig?: Babysig
    nft_amount?: BigNumber
    nft_holder?: string
}

export interface ServicePlugin<T extends Service> {
    createService(
        publisher: Account,
        metadata: MetaData,
        assetPrice?: AssetPrice,
        erc20TokenAddress?: string,
        priced?: boolean
    ): Promise<T>
    // Process agreement for provider
    process(
        params: ValidationParams,
        from: Account,
        txparams?: TxParameters
    ): Promise<void>
    // Check if service can be granted without agreement
    accept(params: ValidationParams): Promise<boolean>
}
