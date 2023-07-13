import { ServiceAgreementTemplate } from '../../../ddo'
import { escrowTemplate, lockPaymentTemplate, transferNFT721Template } from './ConditionTemplates'

export const nft721SalesTemplateServiceAgreementTemplate = (): ServiceAgreementTemplate => ({
  contractName: 'NFT721SalesTemplate',
  events: [
    {
      name: 'AgreementCreated',
      actorType: 'consumer',
      handler: {
        moduleName: 'nft721SalesTemplate',
        functionName: 'fulfillLockPaymentCondition',
        version: '0.1',
      },
    },
  ],
  fulfillmentOrder: ['lockPayment.fulfill', 'transferNFT.fulfill', 'escrowPayment.fulfill'],
  conditionDependency: {
    lockPayment: [],
    transferNFT: [],
    escrowPayment: ['lockPayment', 'transferNFT'],
  },
  conditions: [lockPaymentTemplate(), transferNFT721Template(), escrowTemplate()],
})
