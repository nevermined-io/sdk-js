import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'

export const didSalesTemplateServiceAgreementTemplate: ServiceAgreementTemplate = {
    contractName: 'DIDSalesTemplate',
    events: [
        {
            name: 'AgreementCreated',
            actorType: 'consumer',
            handler: {
                moduleName: 'didSalesTemplate',
                functionName: 'fulfillLockPaymentCondition',
                version: '0.1'
            }
        }
    ],
    fulfillmentOrder: [
        'lockPayment.fulfill',
        'transferDID.fulfill',
        'escrowPayment.fulfill'
    ],
    conditionDependency: {
        lockPayment: [],
        transferDID: [],
        escrowPayment: ['lockPayment', 'transferNFT']
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
                        functionName: 'fulfillTransferDIDCondition',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'transferDID',
            timelock: 0,
            timeout: 0,
            contractName: 'TransferDIDCondition',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_documentId',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_receiver',
                    type: 'address',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'publisher',
                    handler: {
                        moduleName: 'transferDID',
                        functionName: 'fulfillEscrowPaymentCondition',
                        version: '0.1'
                    }
                },
                {
                    name: 'TimedOut',
                    actorType: 'consumer',
                    handler: {
                        moduleName: 'access',
                        functionName: 'fulfillEscrowPaymentCondition',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'escrowPayment',
            timelock: 0,
            timeout: 0,
            contractName: 'EscrowPayment',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_did',
                    type: 'bytes32',
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
