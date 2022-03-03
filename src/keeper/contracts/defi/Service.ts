import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { ServiceCommon } from '../../../ddo/Service'

const lockNft = 'lockNft'
const depositCollateral = 'depositCollateral'
const borrowCredit = 'borrowCredit'
const repayCredit = 'repayCredit'
const withdrawCollateral = 'withdrawCollateral'
const distributeNft = 'distributeNft'

export const AaveCreditConditions = [
    lockNft,
    depositCollateral,
    borrowCredit,
    repayCredit,
    withdrawCollateral,
    distributeNft
]

export type AaveConditionType =
    | 'lockNft'
    | 'depositCollateral'
    | 'borrowCredit'
    | 'repayCredit'
    | 'withdrawCollateral'
    | 'distributeNft'

export type SERVICE_AAVE_CREDIT = 'aave-credit'

export interface ServiceAaveCredit extends ServiceCommon {
    type: SERVICE_AAVE_CREDIT
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