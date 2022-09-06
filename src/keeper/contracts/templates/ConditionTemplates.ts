
export const lockPaymentTemplate = () => ({
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
                functionName: 'fulfillAccessCondition',
                version: '0.1'
            }
        }
    ]
})

export const accessTemplate = () => (
    {
        name: 'access',
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
                    moduleName: 'access',
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
    }
)

export const escrowTemplate = () => ({
    name: 'escrowPayment',
    timelock: 0,
    timeout: 0,
    contractName: 'EscrowPaymentCondition',
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
})

export const didTransferTemplate = () => ({
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
})

export const serviceExecutionTemplate = () => ({
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
})

export const nft721HolderTemplate = () => ({
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
        },
        {
            name: '_contractAddress',
            type: 'address',
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
})

export const nftAccessCondition = () => ({
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
})

export const nftHolderTemplate = () => ({
    name: 'nftHolder',
    timelock: 0,
    timeout: 0,
    contractName: 'NFTHolderCondition',
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
})

export const transferNFT721Template = () => ({
    name: 'transferNFT',
    timelock: 0,
    timeout: 0,
    contractName: 'TransferNFT721Condition',
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
        },
        {
            name: '_numberNfts',
            type: 'uint256',
            value: ''
        },
        {
            name: '_conditionId',
            type: 'bytes32',
            value: ''
        },
        {
            name: '_nftHolder',
            type: 'address',
            value: ''
        },
        {
            name: '_nftTransfer',
            type: 'boolean',
            value: 'false'
        },
        {
            name: '_duration',
            type: 'uint256',
            value: '0'
        },
        {
            name: '_contractAddress',
            type: 'address',
            value: ''
        }
    ],
    events: [
        {
            name: 'Fulfilled',
            actorType: 'publisher',
            handler: {
                moduleName: 'transferNFT',
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
})

export const transferNftTemplate = () => ({
    name: 'transferNFT',
    timelock: 0,
    timeout: 0,
    contractName: 'TransferNFTCondition',
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
        },
        {
            name: '_numberNfts',
            type: 'uint256',
            value: ''
        },
        {
            name: '_nftHolder',
            type: 'address',
            value: ''
        },
        {
            name: '_conditionId',
            type: 'bytes32',
            value: ''
        }
    ],
    events: [
        {
            name: 'Fulfilled',
            actorType: 'publisher',
            handler: {
                moduleName: 'transferNFT',
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
})

