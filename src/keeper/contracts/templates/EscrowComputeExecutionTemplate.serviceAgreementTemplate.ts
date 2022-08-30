import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'

export const escrowComputeExecutionTemplateServiceAgreementTemplate: ServiceAgreementTemplate =
    {
        contractName: 'EscrowComputeExecutionTemplate',
        events: [
            {
                name: 'AgreementCreated',
                actorType: 'consumer',
                handler: {
                    moduleName: 'serviceExecutionTemplate',
                    functionName: 'fulfillLockPaymentCondition',
                    version: '0.1'
                }
            }
        ],
        fulfillmentOrder: [
            'lockPayment.fulfill',
            'serviceExecution.fulfill',
            'escrowPayment.fulfill'
        ],
        conditionDependency: {
            lockPayment: [],
            serviceExecution: [],
            escrowPaymentCondition: ['lockPayment', 'serviceExecution']
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
                        name: '_did',
                        type: 'bytes32',
                        value: ''
                    },
                    {
                        name: '_rewardAddress',
                        type: 'address',
                        value: ''
                    },
                    {
                        name: '_tokenAddress',
                        type: 'address',
                        value: ''
                    },
                    {
                        name: '_amounts',
                        type: 'uint256[]',
                        value: []
                    },
                    {
                        name: '_receivers',
                        type: 'address[]',
                        value: []
                    }
                ],
                events: [
                    {
                        name: 'Fulfilled',
                        actorType: 'publisher',
                        handler: {
                            moduleName: 'lockPaymentCondition',
                            functionName: 'fulfillServiceExecutionCondition',
                            version: '0.1'
                        }
                    }
                ]
            },
            {
                name: 'serviceExecution',
                timelock: 0,
                timeout: 0,
                contractName: 'ComputeExecutionCondition',
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
                            moduleName: 'serviceExecution',
                            functionName: 'fulfillServiceExecutionCondition',
                            version: '0.1'
                        }
                    },
                    {
                        name: 'TimedOut',
                        actorType: 'consumer',
                        handler: {
                            moduleName: 'serviceExec',
                            functionName: 'fulfillServiceExecutionCondition',
                            version: '0.1'
                        }
                    }
                ]
            },
            {
                name: 'escrowPayment',
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
                        name: '_tokenAddress',
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
