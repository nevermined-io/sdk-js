import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { didTransferTemplate, escrowTemplate, lockPaymentTemplate } from './ConditionTemplates'

export const didSalesTemplateServiceAgreementTemplate: ServiceAgreementTemplate = {
    contractName: 'DIDSalesTemplate',
    events: [
        {
            name: 'AgreementCreated',
            actorType: 'consumer',
            handler: {
                moduleName: 'didSalesTemplate',
                functionName: 'fulfillLockPaymentCondition',
                version: '0.1'
            }
        }
    ],
    fulfillmentOrder: [
        'lockPayment.fulfill',
        'transferDID.fulfill',
        'escrowPayment.fulfill'
    ],
    conditionDependency: {
        lockPayment: [],
        transferDID: [],
        escrowPayment: ['lockPayment', 'transferNFT']
    },
    conditions: [lockPaymentTemplate(), didTransferTemplate(), escrowTemplate()]
}
