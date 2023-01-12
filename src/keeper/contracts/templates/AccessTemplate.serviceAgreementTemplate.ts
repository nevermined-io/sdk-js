import { ServiceAgreementTemplate } from '../../../ddo'
import { accessTemplate, escrowTemplate, lockPaymentTemplate } from './ConditionTemplates'

export const accessTemplateServiceAgreementTemplate: ServiceAgreementTemplate = {
    contractName: 'AccessTemplate',
    events: [
        {
            name: 'AgreementCreated',
            actorType: 'consumer',
            handler: {
                moduleName: 'escrowAccessTemplate',
                functionName: 'fulfillLockPaymentCondition',
                version: '0.1'
            }
        }
    ],
    fulfillmentOrder: ['access.fulfill', 'lockPayment.fulfill', 'escrowPayment.fulfill'],
    conditionDependency: {
        lockPayment: [],
        access: [],
        escrowPayment: ['lockPayment', 'access']
    },
    conditions: [lockPaymentTemplate(), accessTemplate(), escrowTemplate()]
}
