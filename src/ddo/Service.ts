import { MetaData } from './MetaData'
import { ServiceAgreementTemplate } from './ServiceAgreementTemplate'
import { AaveConditionType, ServiceAaveCredit } from '../keeper/contracts/defi/Service'

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
    | 'access-proof'
    | 'compute'
    | 'workflow'
    | 'nft-access'
    | 'nft-sales'
    | 'nft721-access'
    | 'nft721-sales'
    | 'aave-credit'
    | 'nft-access-proof'
    | 'nft-sales-proof'
    | 'nft721-access-proof'
    | 'nft721-sales-proof'

export const serviceIndex = {
    'authorization': 2,
    'metadata': 0,
    'access': 3,
    'access-proof': 10,
    'compute': 4,
    'workflow': 5,
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

export interface ServiceSecondary extends Service {
    agreementId: string
    did: string
}

export type Service<T extends ServiceType | 'default' = 'default'> =
    T extends 'authorization'
        ? ServiceAuthorization
        : T extends 'metadata'
        ? ServiceMetadata
        : T extends 'access'
        ? ServiceAccess
        : T extends 'access-proof'
        ? ServiceAccessProof
        : T extends 'compute'
        ? ServiceCompute
        : T extends 'aave-credit'
        ? ServiceAaveCredit
        : T extends 'default'
        ? ServiceCommon
        : ServiceCommon
