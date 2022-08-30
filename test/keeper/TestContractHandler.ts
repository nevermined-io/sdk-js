import ContractHandler from '../../src/keeper/ContractHandler'
import Web3Provider from '../../src/keeper/Web3Provider'
import * as KeeperUtils from '../../src/keeper/utils'
import Logger from '../../src/utils/Logger'
import config from '../config'
import { ZeroAddress } from '../../src/utils'
import { ContractReceipt, ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import fs from 'fs'

interface ContractTest extends ethers.Contract {
    testContract?: boolean
    $initialized?: boolean
}

export default abstract class TestContractHandler extends ContractHandler {
    public static async prepareContracts() {
        TestContractHandler.setConfig(config)
        const [deployerAddress] = await TestContractHandler.addressesStatic(
            TestContractHandler.config,
            TestContractHandler.web3
        )
        TestContractHandler.networkId = (
            await TestContractHandler.web3.getNetwork()
        ).chainId
        TestContractHandler.minter = ethers.utils.formatBytes32String('minter')

        // deploy contracts
        await TestContractHandler.deployContracts(deployerAddress)
    }

    private static networkId: number
    private static minter: string
    private static config = config
    private static web3 = Web3Provider.getWeb3(config)

    public static setConfig(config) {
        TestContractHandler.config = config
        TestContractHandler.web3 = Web3Provider.getWeb3(TestContractHandler.config)
    }

    private static async deployContracts(deployerAddress: string) {
        Logger.log('Trying to deploy contracts')

        // Libraries
        const epochLibrary = await TestContractHandler.deployContract(
            'EpochLibrary',
            deployerAddress
        )
        const didRegistryLibrary = await TestContractHandler.deployContract(
            'DIDRegistryLibrary',
            deployerAddress
        )

        // Contracts
        const nvmConfig = await TestContractHandler.deployContract(
            'NeverminedConfig',
            deployerAddress,
            [deployerAddress, deployerAddress]
        )

        const token = await TestContractHandler.deployContract(
            'NeverminedToken',
            deployerAddress,
            [deployerAddress, deployerAddress]
        )

        const erc1155 = await TestContractHandler.deployContract(
            'NFTUpgradeable',
            deployerAddress,
            ['']
        )

        const erc721 = await TestContractHandler.deployContract(
            'NFT721Upgradeable',
            deployerAddress,
            []
        )

        const dispenser = await TestContractHandler.deployContract(
            'Dispenser',
            deployerAddress,
            [token.address, deployerAddress]
        )

        // Add dispenser as Token minter
        if (!token.$initialized) {
            const signer = await TestContractHandler.findSignerStatic(
                TestContractHandler.config,
                TestContractHandler.web3,
                deployerAddress
            )
            const contract = token.connect(signer)
            const args = [TestContractHandler.minter, dispenser.address]
            const methodSignature = this.getSignatureOfMethod(contract, 'grantRole', args)
            const transactionResponse: TransactionResponse = await contract[
                methodSignature
            ](...args)
            const contractReceipt: ContractReceipt = await transactionResponse.wait()
            if (contractReceipt.status !== 1) {
                throw new Error('Error calling "grantRole" on "token"')
            }
        }

        const didRegistry = await TestContractHandler.deployContract(
            'DIDRegistry',
            deployerAddress,
            [deployerAddress, erc1155.address, deployerAddress],
            {
                DIDRegistryLibrary: didRegistryLibrary.address
            }
        )

        let transactionResponse: TransactionResponse = await erc1155.addMinter(
            didRegistry.address
        )
        let contractReceipt: ContractReceipt = await transactionResponse.wait()
        if (contractReceipt.status !== 1) {
            throw new Error('Error calling "addMinter" on "erc1155"')
        }

        transactionResponse = await erc721.addMinter(didRegistry.address)
        contractReceipt = await transactionResponse.wait()
        if (contractReceipt.status !== 1) {
            throw new Error('Error calling "addMinter" on "erc721"')
        }

        // Managers
        const templateStoreManager = await TestContractHandler.deployContract(
            'TemplateStoreManager',
            deployerAddress,
            [deployerAddress]
        )
        const conditionStoreManager = await TestContractHandler.deployContract(
            'ConditionStoreManager',
            deployerAddress,
            [deployerAddress, deployerAddress, nvmConfig.address],
            {
                EpochLibrary: epochLibrary.address
            }
        )
        const agreementStoreManager = await TestContractHandler.deployContract(
            'AgreementStoreManager',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.address,
                templateStoreManager.address,
                didRegistry.address
            ]
        )

        // Conditions
        const lockPaymentCondition = await TestContractHandler.deployContract(
            'LockPaymentCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address, didRegistry.address]
        )

        const accessCondition = await TestContractHandler.deployContract(
            'AccessCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.address,
                agreementStoreManager.address
            ]
        )

        const nftHolderCondition = await TestContractHandler.deployContract(
            'NFTHolderCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address, erc1155.address]
        )

        const nft721HolderCondition = await TestContractHandler.deployContract(
            'NFT721HolderCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address]
        )

        await TestContractHandler.deployContract('NFTLockCondition', deployerAddress, [
            deployerAddress,
            conditionStoreManager.address,
            erc1155.address
        ])

        const nftAcessCondition = await TestContractHandler.deployContract(
            'NFTAccessCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address, didRegistry.address]
        )

        const transferNft721Condition = await TestContractHandler.deployContract(
            'TransferNFT721Condition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.address,
                didRegistry.address,
                erc721.address,
                lockPaymentCondition.address
            ]
        )

        const transferNftCondition = await TestContractHandler.deployContract(
            'TransferNFTCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.address,
                didRegistry.address,
                erc1155.address,
                ZeroAddress
            ]
        )
        transactionResponse = await erc1155.setProxyApproval(
            transferNftCondition.address,
            true
        )
        contractReceipt = await transactionResponse.wait()
        if (contractReceipt.status !== 1) {
            throw new Error('Error calling "addMinter" on "erc721"')
        }

        transactionResponse = await erc1155.setProxyApproval(didRegistry.address, true)
        contractReceipt = await transactionResponse.wait()
        if (contractReceipt.status !== 1) {
            throw new Error('Error calling "addMinter" on "erc721"')
        }

        const transferDidOwnershipCondition = await TestContractHandler.deployContract(
            'TransferDIDOwnershipCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address, didRegistry.address]
        )

        // Conditions rewards
        const escrowPaymentCondition = await TestContractHandler.deployContract(
            'EscrowPaymentCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address]
        )

        // Templates
        await TestContractHandler.deployContract('AccessTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.address,
            didRegistry.address,
            accessCondition.address,
            lockPaymentCondition.address,
            escrowPaymentCondition.address
        ])

        await TestContractHandler.deployContract('DIDSalesTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.address,
            lockPaymentCondition.address,
            transferDidOwnershipCondition.address,
            escrowPaymentCondition.address
        ])

        await TestContractHandler.deployContract('NFTAccessTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.address,
            nftHolderCondition.address,
            nftAcessCondition.address
        ])

        await TestContractHandler.deployContract(
            'NFT721AccessTemplate',
            deployerAddress,
            [
                deployerAddress,
                agreementStoreManager.address,
                nft721HolderCondition.address,
                nftAcessCondition.address
            ]
        )

        await TestContractHandler.deployContract('NFTSalesTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.address,
            lockPaymentCondition.address,
            transferNftCondition.address,
            escrowPaymentCondition.address
        ])

        await TestContractHandler.deployContract('NFT721SalesTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.address,
            lockPaymentCondition.address,
            transferNft721Condition.address,
            escrowPaymentCondition.address
        ])

        const aaveCollateralDepositCondition = await TestContractHandler.deployContract(
            'AaveCollateralDepositCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address]
        )
        const aaveBorrowCondition = await TestContractHandler.deployContract(
            'AaveBorrowCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address]
        )
        const aaveRepayCondition = await TestContractHandler.deployContract(
            'AaveRepayCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address]
        )
        const aaveCollateralWithdrawCondition = await TestContractHandler.deployContract(
            'AaveCollateralWithdrawCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address]
        )
        const nft721LockCondition = await TestContractHandler.deployContract(
            'NFT721LockCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address]
        )
        const distributeNFTCollateralCondition = await TestContractHandler.deployContract(
            'DistributeNFTCollateralCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.address, nft721LockCondition.address]
        )
        const vaultLibrary = await TestContractHandler.deployContract(
            'AaveCreditVault',
            deployerAddress,
            [],
            {},
            false
        )

        await TestContractHandler.deployContract('AaveCreditTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.address,
            nft721LockCondition.address,
            aaveCollateralDepositCondition.address,
            aaveBorrowCondition.address,
            aaveRepayCondition.address,
            aaveCollateralWithdrawCondition.address,
            distributeNFTCollateralCondition.address,
            vaultLibrary.address
        ])
    }

    public static async deployAbi(
        artifact: any,
        from: string,
        args: string[] = []
    ): Promise<ethers.Contract> {
        const signer = await TestContractHandler.findSignerStatic(
            TestContractHandler.config,
            TestContractHandler.web3,
            from
        )
        const contract = new ethers.ContractFactory(
            artifact.abi,
            artifact.bytecode,
            signer
        )
        const isZos = contract.interface.fragments.some(f => f.name === 'initialize')

        const argument = isZos ? [] : args
        let contractInstance: ethers.Contract
        try {
            contractInstance = await contract.deploy(...argument)
            await contractInstance.deployTransaction.wait()
        } catch (error) {
            console.error(JSON.stringify(error))
            throw new Error(error.message)
        }

        if (isZos) {
            const methodSignature = TestContractHandler.getSignatureOfMethod(
                contractInstance,
                'initialize',
                args
            )
            const contract = contractInstance.connect(signer)
            const transactionResponse: TransactionResponse = await contract[
                methodSignature
            ](...args)
            const contractReceipt: ContractReceipt = await transactionResponse.wait()
            if (contractReceipt.status !== 1) {
                throw new Error(`Error deploying contract ${artifact.name}`)
            }
        }
        return contractInstance
    }

    private static async deployContract(
        name: string,
        from: string,
        args: any[] = [],
        tokens: { [name: string]: string } = {},
        init = true
    ): Promise<ContractTest> {
        const where = TestContractHandler.networkId

        // dont redeploy if there is already something loaded
        if (TestContractHandler.hasContract(name, where)) {
            const contract: ethers.Contract = await ContractHandler.getContract(
                name,
                where
            )
            if (contract.testContract) {
                return { ...contract, $initialized: true } as any
            }
        }

        let contractInstance: ContractTest
        try {
            const networkName = (
                await KeeperUtils.getNetworkName(TestContractHandler.networkId)
            ).toLowerCase()
            Logger.log('Deploying', name)
            const artifact = JSON.parse(
                fs.readFileSync(`./artifacts/${name}.${networkName}.json`).toString()
            )
            contractInstance = await TestContractHandler.deployArtifact(
                artifact,
                from,
                args,
                tokens,
                init
            )
            contractInstance.testContract = true
            ContractHandler.setContract(name, where, contractInstance)
        } catch (err) {
            Logger.error(
                'Deployment failed for',
                name,
                'with args',
                JSON.stringify(args, null, 2),
                err.message
            )
            throw err
        }

        return contractInstance
    }

    public static async deployArtifact(
        artifact,
        from?: string,
        args = [],
        tokens = {},
        init = true
    ): Promise<ethers.Contract> {
        if (!from) {
            ;[from] = await TestContractHandler.addressesStatic(
                TestContractHandler.config,
                TestContractHandler.web3
            )
        }

        const sendConfig = {
            gasLimit: 6721975,
            gasPrice: '0x87500000'
        }

        const signer = await TestContractHandler.findSignerStatic(
            TestContractHandler.config,
            TestContractHandler.web3,
            from
        )
        const tempContract = new ethers.ContractFactory(
            artifact.abi,
            TestContractHandler.replaceTokens(artifact.bytecode, tokens),
            signer
        )
        const initializeExists = tempContract.interface.fragments.some(
            f => f.name === 'initialize'
        )
        const isZos = initializeExists && init

        Logger.debug({
            name: artifact.name,
            from,
            isZos,
            args,
            libraries: artifact.bytecode
                .replace(/(0x)?[a-f0-9]{8}/gi, '')
                .replace(/__([^_]+)_*[0-9a-f]{2}/g, '|$1')
                .split('|')
                .splice(1)
        })

        const argument = isZos ? [] : args
        const contractInstance: ethers.Contract = await tempContract.deploy(
            ...argument,
            sendConfig
        )
        await contractInstance.deployTransaction.wait()

        if (isZos) {
            const methodSignature = TestContractHandler.getSignatureOfMethod(
                contractInstance,
                'initialize',
                args
            )
            const contract = contractInstance.connect(signer)
            const transactionResponse: TransactionResponse = await contract[
                methodSignature
            ](...args, sendConfig)
            const contractReceipt: ContractReceipt = await transactionResponse.wait()
            if (contractReceipt.status !== 1) {
                throw new Error(`Error deploying contract ${artifact.name}`)
            }
        }

        return contractInstance
    }

    private static replaceTokens(
        bytecode: string,
        tokens: { [name: string]: string }
    ): string {
        return Object.entries(tokens).reduce(
            (acc, [_token, address]) =>
                acc.replace(
                    new RegExp(`__\\$[0-9a-f]*\\$__`, 'g'),
                    address.substr(2).toLowerCase()
                ),
            bytecode
        )
    }

    private static getSignatureOfMethod(
        contractInstace: ethers.Contract,
        methodName: string,
        args: any[]
    ): string {
        const methods = contractInstace.interface.fragments.filter(
            f => f.name === methodName
        )
        const foundMethod =
            methods.find(f => f.inputs.length === args.length) || methods[0]
        if (!foundMethod) {
            throw new Error(`Method "${methodName}" not found in contract`)
        }
        return foundMethod.format()
    }
}
