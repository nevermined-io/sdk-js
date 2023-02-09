import { ServiceAgreementTemplate } from '../../../ddo'
import { nftAccessCondition, nftHolderTemplate } from './ConditionTemplates'

export const nftAccessTemplateServiceAgreementTemplate: ServiceAgreementTemplate = {
  contractName: 'NFTAccessTemplate',
  events: [
    {
      name: 'AgreementCreated',
      actorType: 'consumer',
      handler: {
        moduleName: 'nftAccessTemplate',
        functionName: 'fulfillNFTHolderCondition',
        version: '0.1',
      },
    },
  ],
  fulfillmentOrder: ['nftHolder.fulfill', 'nftAccess.fulfill'],
  conditionDependency: {
    nftHolder: [],
    nftAccess: [],
  },
  conditions: [nftHolderTemplate(), nftAccessCondition()],
}
