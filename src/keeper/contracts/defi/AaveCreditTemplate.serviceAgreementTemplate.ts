import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'

export const aaveCreditTemplateServiceAgreementTemplate: ServiceAgreementTemplate = {
    contractName: 'AaveCreditTemplate',
    events: [
        {
            name: 'AgreementCreated',
            actorType: 'borrower',
            handler: {
                moduleName: 'aaveNftLoan',
                functionName: 'lockNft',
                version: '0.1'
            }
        },
        {
            name: 'VaultCreated',
            actorType: 'borrower',
            handler: {
                moduleName: 'aaveNftLoan',
                functionName: '',
                version: '0.1'
            }
        }
    ],
    fulfillmentOrder: [
        'lockNft.fulfill',
        'depositCollateral.fulfill',
        'borrowCredit.fulfill',
        'repayCredit.fulfill',
        'withdrawCollateral.fulfill',
        'distributeNft.fulfill'
    ],
    conditionDependency: {
        lockNft: [],
        depositCollateral: [],
        borrowCredit: ['lockNft', 'depositCollateral'],
        repayCredit: [],
        withdrawCollateral: [],
        distributeNft: ['repayCredit', 'withdrawCollateral']
    },
    conditions: [
        {
            name: 'lockNft',
            timelock: 0,
            timeout: 0,
            contractName: 'NFT721LockCondition',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_agreementId',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_did',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_lockAddress',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_amount',
                    type: 'uint256',
                    value: ''
                },
                {
                    name: '_nftContractAddress',
                    type: 'address',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'lender',
                    handler: {
                        moduleName: 'nftLockCondition',
                        functionName: 'fulfillDepositCondition',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'depositCollateral',
            timelock: 0,
            timeout: 0,
            contractName: 'AaveCollateralDepositCondition',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_agreementId',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_did',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_vaultAddress',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_collateralAsset',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_collateralAmount',
                    type: 'uint256',
                    value: ''
                },
                {
                    name: '_delegatedAsset',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_delegatedAmount',
                    type: 'uint256',
                    value: ''
                },
                {
                    name: '_interestRateMode',
                    type: 'uint256',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'borrower',
                    handler: {
                        moduleName: 'aaveNftLoan',
                        functionName: 'fulfillBorrowCondition',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'borrowCredit',
            timelock: 0,
            timeout: 0,
            contractName: 'AaveBorrowCondition',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_agreementId',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_did',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_vaultAddress',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_assetToBorrow',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_amount',
                    type: 'uint256',
                    value: ''
                },
                {
                    name: '_interestRateMode',
                    type: 'uint256',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'lender',
                    handler: {
                        moduleName: 'aaveNftLoan',
                        functionName: 'monitorBorrowedAsset',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'repayCredit',
            timelock: 0,
            timeout: 0,
            contractName: 'AaveRepayCondition',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_agreementId',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_did',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_vaultAddress',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_assetToRepay',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_amountToRepay',
                    type: 'uint256',
                    value: ''
                },
                {
                    name: '_interestRateMode',
                    type: 'uint256',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'lender',
                    handler: {
                        moduleName: 'aaveNftLoan',
                        functionName: 'withdrawCollateral',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'withdrawCollateral',
            timelock: 0,
            timeout: 0,
            contractName: 'AaveCollateralWithdrawCondition',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_agreementId',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_did',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_vaultAddress',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_collateralAsset',
                    type: 'address',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'borrower',
                    handler: {
                        moduleName: 'aaveNftLoan',
                        functionName: 'distributeNft',
                        version: '0.1'
                    }
                }
            ]
        },
        {
            name: 'distributeNft',
            timelock: 0,
            timeout: 0,
            contractName: 'DistributeNFTCollateralCondition',
            functionName: 'fulfill',
            parameters: [
                {
                    name: '_agreementId',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_did',
                    type: 'bytes32',
                    value: ''
                },
                {
                    name: '_vaultAddress',
                    type: 'address',
                    value: ''
                },
                {
                    name: '_nftContractAddress',
                    type: 'address',
                    value: ''
                }
            ],
            events: [
                {
                    name: 'Fulfilled',
                    actorType: 'publisher',
                    handler: {
                        moduleName: 'aaveNftLoan',
                        functionName: 'verifyLenderFees',
                        version: '0.1'
                    }
                }
            ]
        }
    ]
}
