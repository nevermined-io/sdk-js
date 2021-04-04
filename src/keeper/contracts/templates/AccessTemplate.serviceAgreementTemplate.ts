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
        'escrowPaymentCondition.fulfill'
    ],
    conditionDependency: {
        lockPayment: [],
        accessSecretStore: [],
        escrowPaymentCondition: ['lockPayment', 'accessSecretStore']
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
                        functionName: 'fulfillAccessCondition',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'accessSecretStore',
            timelock: 0,
            timeout: 0,
            contractName: 'AccessCondition',
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
                        functionName: 'fulfillEscrowPaymentCondition',
                        version: '0.1'
                    }
                },
                {
                    name: 'TimedOut',
                    actorType: 'consumer',
                    handler: {
                        moduleName: 'accessSecretStore',
                        functionName: 'fulfillEscrowPaymentCondition',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'escrowPaymentCondition',
            timelock: 0,
            timeout: 0,
            contractName: 'EscrowPaymentCondition',
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
                        moduleName: 'escrowPaymentCondition',
                        functionName: 'verifyRewardTokens',
                        version: '0.1'
                    }
                }
            ]
        }
    ]
}
