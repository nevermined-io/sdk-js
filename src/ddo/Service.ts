import { MetaData } from './MetaData'
import { ServiceAgreementTemplate } from './ServiceAgreementTemplate'
import { Provider } from './ComputingProvider'

export type ServiceType =
    | 'authorization'
    | 'metadata'
    | 'access'
    | 'compute'
    | 'workflow'
    | 'nft-access'
    | 'nft-sales'
    | 'nft721-access'
    | 'nft721-sales'

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
    : T extends 'compute'
    ? ServiceCompute
    : T extends 'default'
    ? ServiceCommon
    : ServiceCommon
