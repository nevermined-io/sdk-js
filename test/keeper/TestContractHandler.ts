import { Contract } from 'web3-eth-contract'
import ContractHandler from '../../src/keeper/ContractHandler'
import Web3Provider from '../../src/keeper/Web3Provider'
import Logger from '../../src/utils/Logger'
import config from '../config'

interface ContractTest extends Contract {
    testContract?: boolean
    $initialized?: boolean
}

export default class TestContractHandler extends ContractHandler {
    public static async prepareContracts() {
        const web3 = Web3Provider.getWeb3(config)
        const [deployerAddress] = await web3.eth.getAccounts()
        this.networkId = await web3.eth.net.getId()
        this.minter = await web3.utils.toHex('minter')
        // deploy contracts
        await TestContractHandler.deployContracts(deployerAddress)
    }

    private static networkId: number
    private static minter: string

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
        const token = await TestContractHandler.deployContract(
            'NeverminedToken',
            deployerAddress,
            [deployerAddress, deployerAddress]
        )

        const dispenser = await TestContractHandler.deployContract(
            'Dispenser',
            deployerAddress,
            [token.options.address, deployerAddress]
        )

        // Add dispenser as Token minter
        if (!token.$initialized) {
            await token.methods
                .grantRole(this.minter, dispenser.options.address)
                .send({ from: deployerAddress })
        }

        const didRegistry = await TestContractHandler.deployContract(
            'DIDRegistry',
            deployerAddress,
            [deployerAddress],
            {
                DIDRegistryLibrary: didRegistryLibrary.options.address
            }
        )

        // Managers
        const templateStoreManager = await TestContractHandler.deployContract(
            'TemplateStoreManager',
            deployerAddress,
            [deployerAddress]
        )
        const conditionStoreManager = await TestContractHandler.deployContract(
            'ConditionStoreManager',
            deployerAddress,
            [deployerAddress],
            {
                EpochLibrary: epochLibrary.options.address
            }
        )
        const agreementStoreManager = await TestContractHandler.deployContract(
            'AgreementStoreManager',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address,
                templateStoreManager.options.address,
                didRegistry.options.address
            ]
        )

        // Conditions
        const lockPaymentCondition = await TestContractHandler.deployContract(
            'LockPaymentCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address,
                didRegistry.options.address
            ]
        )

        const accessCondition = await TestContractHandler.deployContract(
            'AccessCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address,
                agreementStoreManager.options.address
            ]
        )

        const nftHolderCondition = await TestContractHandler.deployContract(
            'NFTHolderCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address,
                didRegistry.options.address
            ]
        )

        const nft721HolderCondition = await TestContractHandler.deployContract(
            'NFT721HolderCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address
            ]
        )

        await TestContractHandler.deployContract('NFTLockCondition', deployerAddress, [
            deployerAddress,
            conditionStoreManager.options.address,
            didRegistry.options.address
        ])

        const nftAcessCondition = await TestContractHandler.deployContract(
            'NFTAccessCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address,
                didRegistry.options.address
            ]
        )

        const transferNft721Condition = await TestContractHandler.deployContract(
            'TransferNFT721Condition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address,
                didRegistry.options.address,
                "0x0000000000000000000000000000000000000000"
            ]
        )

        const transferNftCondition = await TestContractHandler.deployContract(
            'TransferNFTCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address,
                didRegistry.options.address,
                "0x0000000000000000000000000000000000000000"
            ]
        )
        await didRegistry.methods
            .setProxyApproval(transferNftCondition.options.address, true)
            .send({ from: deployerAddress })

        const transferDidOwnershipCondition = await TestContractHandler.deployContract(
            'TransferDIDOwnershipCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address,
                didRegistry.options.address
            ]
        )

        // Conditions rewards
        const escrowPaymentCondition = await TestContractHandler.deployContract(
            'EscrowPaymentCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.options.address]
        )

        // Templates
        await TestContractHandler.deployContract('AccessTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.options.address,
            didRegistry.options.address,
            accessCondition.options.address,
            lockPaymentCondition.options.address,
            escrowPaymentCondition.options.address
        ])

        await TestContractHandler.deployContract('DIDSalesTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.options.address,
            lockPaymentCondition.options.address,
            transferDidOwnershipCondition.options.address,
            escrowPaymentCondition.options.address
        ])

        await TestContractHandler.deployContract('NFTAccessTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.options.address,
            nftHolderCondition.options.address,
            nftAcessCondition.options.address
        ])

        await TestContractHandler.deployContract('NFT721AccessTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.options.address,
            nft721HolderCondition.options.address,
            nftAcessCondition.options.address
        ])

        await TestContractHandler.deployContract('NFTSalesTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.options.address,
            lockPaymentCondition.options.address,
            transferNftCondition.options.address,
            escrowPaymentCondition.options.address
        ])

        await TestContractHandler.deployContract('NFT721SalesTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.options.address,
            lockPaymentCondition.options.address,
            transferNft721Condition.options.address,
            escrowPaymentCondition.options.address
        ])
    }

    private static async deployContract(
        name: string,
        from: string,
        args: any[] = [],
        tokens: { [name: string]: string } = {}
    ): Promise<ContractTest> {
        const where = this.networkId

        // dont redeploy if there is already something loaded
        if (TestContractHandler.hasContract(name, where)) {
            const contract: ContractTest = await ContractHandler.getContract(name, where)
            if (contract.testContract) {
                return { ...contract, $initialized: true } as any
            }
        }

        const web3 = Web3Provider.getWeb3(config)

        let contractInstance: ContractTest
        try {
            Logger.log('Deploying', name)
            const sendConfig = {
                from,
                gas: 6721975,
                gasPrice: '10000'
                // gas: 6000000,
                // gasPrice: '10000'
            }
            const artifact = require(`@nevermined-io/contracts/artifacts/${name}.development.json`)
            const tempContract = new web3.eth.Contract(artifact.abi, artifact.address)
            const isZos = !!tempContract.methods.initialize

            Logger.debug({
                name,
                from,
                isZos,
                args,
                libraries: artifact.bytecode
                    .replace(/(0x)?[a-f0-9]{8}/gi, '')
                    .replace(/__([^_]+)_*[0-9a-f]{2}/g, '|$1')
                    .split('|')
                    .splice(1)
            })

            contractInstance = await tempContract
                .deploy({
                    data: TestContractHandler.replaceTokens(
                        artifact.bytecode.toString(),
                        tokens
                    ),
                    arguments: isZos ? undefined : args
                })
                .send(sendConfig)
            if (isZos) {
                await contractInstance.methods.initialize(...args).send(sendConfig)
            }
            contractInstance.testContract = true
            ContractHandler.setContract(name, where, contractInstance)
            // Logger.log('Deployed', name, 'at', contractInstance.options.address)
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

    private static replaceTokens(
        bytecode: string,
        tokens: { [name: string]: string }
    ): string {
        return Object.entries(tokens).reduce(
            (acc, [token, address]) =>
                acc.replace(new RegExp(`_+${token}_+`, 'g'), address.substr(2)),
            bytecode
        )
    }
}
