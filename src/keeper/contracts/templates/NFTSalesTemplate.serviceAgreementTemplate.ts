import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { escrowTemplate, lockPaymentTemplate, transferNftTemplate } from './ConditionTemplates'

export const nftSalesTemplateServiceAgreementTemplate: ServiceAgreementTemplate = {
    contractName: 'NFTSalesTemplate',
    events: [
        {
            name: 'AgreementCreated',
            actorType: 'consumer',
            handler: {
                moduleName: 'nftSalesTemplate',
                functionName: 'fulfillLockPaymentCondition',
                version: '0.1'
            }
        }
    ],
    fulfillmentOrder: [
        'lockPayment.fulfill',
        'transferNFT.fulfill',
        'escrowPayment.fulfill'
    ],
    conditionDependency: {
        lockPayment: [],
        transferNFT: [],
        escrowPayment: ['lockPayment', 'transferNFT']
    },
    conditions: [lockPaymentTemplate(), transferNftTemplate(), escrowTemplate()]
}
