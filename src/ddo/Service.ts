import { MetaData } from './MetaData'
import { ServiceAgreementTemplate } from './ServiceAgreementTemplate'
import {AaveConditionType, SERVICE_AAVE_CREDIT, ServiceAaveCredit} from "../keeper/contracts/defi/Service";

export type ConditionType = 'lockPayment' | 'escrowPayment' | 'nftHolder' | 'transferNFT' | AaveConditionType

export type ServiceType =
    | 'authorization'
    | 'metadata'
    | 'access'
    | 'access-proof'
    | 'compute'
    | 'workflow'
    | 'nft-access'
    | 'nft-sales'
    | 'nft721-access'
    | 'nft721-sales'
    | SERVICE_AAVE_CREDIT

export interface ServiceCommon {
    type: ServiceType
    index: number
    serviceEndpoint?: string
    templateId?: string
    attributes: any & {
        main: { [key: string]: any }
    }
}

export interface ServiceAuthorization extends ServiceCommon {
    type: 'authorization'
    service: 'SecretStore' | 'None' | 'RSAES-OAEP'
}

export interface ServiceMetadata extends ServiceCommon {
    type: 'metadata'
    attributes: MetaData
}

export interface ServiceAccess extends ServiceCommon {
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
        }
    }
}

export interface ServiceAccessProof extends ServiceCommon {
    type: 'access-proof'
    templateId?: string
    attributes: {
        main: {
            creator: string
            name: string
            datePublished: string
            price: string
            timeout: number
            _hash: string
            _providerPub: [string, string]
        }
        serviceAgreementTemplate?: ServiceAgreementTemplate
        additionalInformation: {
            description: string
        }
    }
}

export interface ServiceCompute extends ServiceCommon {
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
        }
    }
}

export type ServiceNftSales = ServiceCommon

export type Service<
    T extends ServiceType | 'default' = 'default'
> = T extends 'authorization'
    ? ServiceAuthorization
    : T extends 'metadata'
    ? ServiceMetadata
    : T extends 'access'
    ? ServiceAccess
    : T extends 'access-proof'
    ? ServiceAccessProof
    : T extends 'compute'
    ? ServiceCompute
    : T extends SERVICE_AAVE_CREDIT
    ? ServiceAaveCredit
    : T extends 'default'
    ? ServiceCommon
    : ServiceCommon
