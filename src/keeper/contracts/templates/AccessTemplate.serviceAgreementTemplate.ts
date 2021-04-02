import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'

export const accessTemplateServiceAgreementTemplate: ServiceAgreementTemplate = {
    contractName: 'AccessTemplate',
    events: [
        {
            name: 'AgreementCreated',
            actorType: 'consumer',
            handler: {
                moduleName: 'accessTemplate',
                functionName: 'fulfillLockPaymentCondition',
                version: '0.1'
            }
        }
    ],
    fulfillmentOrder: [
        'lockPayment.fulfill',
        'accessSecretStore.fulfill',
        'escrowReward.fulfill'
    ],
    conditionDependency: {
        lockPayment: [],
        accessSecretStore: [],
        escrowReward: ['lockPayment', 'accessSecretStore']
    },
    conditions: [
        {
            name: 'lockPayment',
            timelock: 0,
            timeout: 0,
            contractName: 'LockPaymentCondition',
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
                        moduleName: 'lockPaymentCondition',
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
