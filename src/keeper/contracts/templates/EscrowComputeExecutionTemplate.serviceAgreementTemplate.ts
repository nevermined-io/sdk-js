import { ServiceAgreementTemplate } from '../../../ddo'
import { escrowTemplate, lockPaymentTemplate, serviceExecutionTemplate } from './ConditionTemplates'

export const escrowComputeExecutionTemplateServiceAgreementTemplate =
  (): ServiceAgreementTemplate => ({
    contractName: 'EscrowComputeExecutionTemplate',
    events: [
      {
        name: 'AgreementCreated',
        actorType: 'consumer',
        handler: {
          moduleName: 'serviceExecutionTemplate',
          functionName: 'fulfillLockPaymentCondition',
          version: '0.1',
        },
      },
    ],
    fulfillmentOrder: ['lockPayment.fulfill', 'serviceExecution.fulfill', 'escrowPayment.fulfill'],
    conditionDependency: {
      lockPayment: [],
      serviceExecution: [],
      escrowPaymentCondition: ['lockPayment', 'serviceExecution'],
    },
    conditions: [lockPaymentTemplate(), serviceExecutionTemplate(), escrowTemplate()],
  })
