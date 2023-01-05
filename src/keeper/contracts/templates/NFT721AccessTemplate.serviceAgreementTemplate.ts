import { ServiceAgreementTemplate } from '../../../ddo'
import { nft721HolderTemplate, nftAccessCondition } from './ConditionTemplates'

export const nft721AccessTemplateServiceAgreementTemplate: ServiceAgreementTemplate = {
    contractName: 'NFT721AccessTemplate',
    events: [
        {
            name: 'AgreementCreated',
            actorType: 'consumer',
            handler: {
                moduleName: 'nft721AccessTemplate',
                functionName: 'fulfillNFTHolderCondition',
                version: '0.1'
            }
        }
    ],
    fulfillmentOrder: ['nftHolder.fulfill', 'nftAccess.fulfill'],
    conditionDependency: {
        nftHolder: [],
        nftAccess: []
    },
    conditions: [nft721HolderTemplate(), nftAccessCondition()]
}
