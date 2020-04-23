import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'

export const escrowComputeExecutionTemplateServiceAgreementTemplate: ServiceAgreementTemplate = {
    contractName: 'EscrowComputeExecutionTemplate',
    events: [
        {
            name: 'AgreementCreated',
            actorType: 'consumer',
            handler: {
                moduleName: 'serviceExecutionTemplate',
                functionName: 'fulfillLockRewardCondition',
                version: '0.1'
            }
        }
    ],
    fulfillmentOrder: [
        'lockReward.fulfill',
        'serviceExecution.fulfill',
        'escrowReward.fulfill'
    ],
    conditionDependency: {
        lockReward: [],
        serviceExecution: [],
        escrowReward: ['lockReward', 'serviceExecution']
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
            name: 'escrowReward',
            timelock: 0,
            timeout: 0,
            contractName: 'EscrowReward',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_amount',
                    type: 'uint256',
                    value: ''
                },
                {
                    name: '_receiver',
                    type: 'address',
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
