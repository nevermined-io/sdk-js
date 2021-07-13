import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'

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
    conditions: [
        {
            name: 'nftHolder',
            timelock: 0,
            timeout: 0,
            contractName: 'NFT721HolderCondition',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_did',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_holderAddress',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_numberNfts',
                    type: 'uint256',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'publisher',
                    handler: {
                        moduleName: 'nftHolderCondition',
                        functionName: 'fulfillNFTHolderCondition',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'nftAccess',
            timelock: 0,
            timeout: 0,
            contractName: 'NFTAccessCondition',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_documentId',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_grantee',
                    type: 'address',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'publisher',
                    handler: {
                        moduleName: 'nftAccess',
                        functionName: 'fulfillNFTAccessCondition',
                        version: '0.1'
                    }
                },
                {
                    name: 'TimedOut',
                    actorType: 'consumer',
                    handler: {
                        moduleName: 'access',
                        functionName: 'fulfillNFTAccessCondition',
                        version: '0.1'
                    }
                }
            ]
        }
    ]
}
