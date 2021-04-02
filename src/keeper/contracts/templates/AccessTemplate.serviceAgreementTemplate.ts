import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'

export const accessTemplateServiceAgreementTemplate: ServiceAgreementTemplate = {
    contractName: 'AccessTemplate',
    events: [
        {
            name: 'AgreementCreated',
            actorType: 'consumer',
            handler: {
                moduleName: 'accessTemplate',
                functionName: 'fulfillLockRewardCondition',
                version: '0.1'
            }
        }
    ],
    fulfillmentOrder: [
        'lockReward.fulfill',
        'accessSecretStore.fulfill',
        'escrowReward.fulfill'
    ],
    conditionDependency: {
        lockReward: [],
        accessSecretStore: [],
        escrowReward: ['lockReward', 'accessSecretStore']
    },
    conditions: [
        {
            name: 'lockReward',
            timelock: 0,
            timeout: 0,
            contractName: 'LockRewardCondition',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_rewardAddress',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_amount',
                    type: 'uint256',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'publisher',
                    handler: {
                        moduleName: 'lockRewardCondition',
                        functionName: 'fulfillAccessSecretStoreCondition',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'accessSecretStore',
            timelock: 0,
            timeout: 0,
            contractName: 'AccessSecretStoreCondition',
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
                        moduleName: 'accessSecretStore',
                        functionName: 'fulfillEscrowRewardCondition',
                        version: '0.1'
                    }
                },
                {
                    name: 'TimedOut',
                    actorType: 'consumer',
                    handler: {
                        moduleName: 'accessSecretStore',
                        functionName: 'fulfillEscrowRewardCondition',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'escrowReward',
            timelock: 0,
            timeout: 0,
            contractName: 'EscrowReward',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_amounts',
                    type: 'uint256[]',
                    value: ''
                },
                {
                    name: '_receivers',
                    type: 'address[]',
                    value: ''
                },
                {
                    name: '_sender',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_lockCondition',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_releaseCondition',
                    type: 'bytes32',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'publisher',
                    handler: {
                        moduleName: 'escrowRewardCondition',
                        functionName: 'verifyRewardTokens',
                        version: '0.1'
                    }
                }
            ]
        }
    ]
}
