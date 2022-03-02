import { Contract } from 'web3-eth-contract'
import ContractHandler from '../../src/keeper/ContractHandler'
import Web3Provider from '../../src/keeper/Web3Provider'
import { Logger } from '../../src/utils/Logger'
import config from '../config'
import { ZeroAddress } from '../../src/utils'
import GenericContract from '../../src/keeper/contracts/GenericContract'
import Config from '../../src/models/Config'
import Web3 from 'web3'

interface ContractTest extends Contract {
    testContract?: boolean
    $initialized?: boolean
}

export default abstract class TestContractHandler extends ContractHandler {
    public static async prepareContracts(web3?: Web3, logger?: Logger, addressBook?: {}) {
        TestContractHandler.setConfig(config, web3, logger)
        TestContractHandler.setAddressBook(addressBook)
        const [deployerAddress] = await TestContractHandler.web3.eth.getAccounts()
        TestContractHandler.networkId = await TestContractHandler.web3.eth.net.getId()
        TestContractHandler.minter = await TestContractHandler.web3.utils.toHex('minter')
        // deploy contracts
        await TestContractHandler.deployContracts(deployerAddress)
    }

    private static networkId: number
    private static minter: string
    private static config = config
    private static logger: Logger
    private static web3 = Web3Provider.getWeb3(config)
    public static addressBook: {}

    public static setAddressBook(addressBook: {}) {
        TestContractHandler.addressBook = addressBook ? addressBook : {}
    }

    public static setConfig(config: Config, web3: Web3, logger: Logger) {
        TestContractHandler.config = config
        TestContractHandler.logger = logger
        TestContractHandler.web3 = Web3Provider.getWeb3(TestContractHandler.config)
    }

    private static async deployContracts(deployerAddress: string) {
        TestContractHandler.logger.log('Trying to deploy contracts')

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

        const erc1155 = await TestContractHandler.deployContract(
            'NFTUpgradeable',
            deployerAddress,
            ['']
        )

        const dispenser = await TestContractHandler.deployContract(
            'Dispenser',
            deployerAddress,
            [token.options.address, deployerAddress]
        )

        // Add dispenser as Token minter
        if (!token.$initialized) {
            await token.methods
                .grantRole(TestContractHandler.minter, dispenser.options.address)
                .send({ from: deployerAddress })
        }

        const didRegistry = await TestContractHandler.deployContract(
            'DIDRegistry',
            deployerAddress,
            [deployerAddress, erc1155.options.address, deployerAddress],
            {
                DIDRegistryLibrary: didRegistryLibrary.options.address
            }
        )

        await erc1155.methods
            .addMinter(didRegistry.options.address)
            .send({ from: deployerAddress })

        // Managers
        const templateStoreManager = await TestContractHandler.deployContract(
            'TemplateStoreManager',
            deployerAddress,
            [deployerAddress]
        )
        const conditionStoreManager = await TestContractHandler.deployContract(
            'ConditionStoreManager',
            deployerAddress,
            [deployerAddress, deployerAddress],
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
                erc1155.options.address
            ]
        )

        const nft721HolderCondition = await TestContractHandler.deployContract(
            'NFT721HolderCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.options.address]
        )

        await TestContractHandler.deployContract('NFTLockCondition', deployerAddress, [
            deployerAddress,
            conditionStoreManager.options.address,
            erc1155.options.address
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
                lockPaymentCondition.options.address
            ]
        )

        const transferNftCondition = await TestContractHandler.deployContract(
            'TransferNFTCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address,
                erc1155.options.address,
                ZeroAddress
            ]
        )
        await erc1155.methods
            .setProxyApproval(transferNftCondition.options.address, true)
            .send({ from: deployerAddress })
        await erc1155.methods
            .setProxyApproval(didRegistry.options.address, true)
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

        await TestContractHandler.deployContract(
            'NFT721AccessTemplate',
            deployerAddress,
            [
                deployerAddress,
                agreementStoreManager.options.address,
                nft721HolderCondition.options.address,
                nftAcessCondition.options.address
            ]
        )

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

        const aaveCollateralDepositCondition = await TestContractHandler.deployContract(
            'AaveCollateralDepositCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.options.address]
        )
        const aaveBorrowCondition = await TestContractHandler.deployContract(
            'AaveBorrowCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.options.address]
        )
        const aaveRepayCondition = await TestContractHandler.deployContract(
            'AaveRepayCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.options.address]
        )
        const aaveCollateralWithdrawCondition = await TestContractHandler.deployContract(
            'AaveCollateralWithdrawCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.options.address]
        )
        const nft721LockCondition = await TestContractHandler.deployContract(
            'NFT721LockCondition',
            deployerAddress,
            [deployerAddress, conditionStoreManager.options.address]
        )
        const distributeNFTCollateralCondition = await TestContractHandler.deployContract(
            'DistributeNFTCollateralCondition',
            deployerAddress,
            [
                deployerAddress,
                conditionStoreManager.options.address,
                nft721LockCondition.options.address
            ]
        )

        await TestContractHandler.deployContract('AaveCreditTemplate', deployerAddress, [
            deployerAddress,
            agreementStoreManager.options.address,
            nft721LockCondition.options.address,
            aaveCollateralDepositCondition.options.address,
            aaveBorrowCondition.options.address,
            aaveRepayCondition.options.address,
            aaveCollateralWithdrawCondition.options.address,
            distributeNFTCollateralCondition.options.address
        ])
    }

    private static async deployContract(
        name: string,
        from: string,
        args: any[] = [],
        tokens: { [name: string]: string } = {}
    ): Promise<ContractTest> {
        const where = TestContractHandler.networkId
        const address =
            TestContractHandler.addressBook && TestContractHandler.addressBook[name]
                ? TestContractHandler.addressBook[name]
                : undefined
        // dont redeploy if there is already something loaded
        if (TestContractHandler.hasContract(name, where)) {
            const contract: ContractTest = await ContractHandler.getContract(name, where)
            if (contract.testContract) {
                return { ...contract, $initialized: true } as any
            }
        } else if (address && TestContractHandler.web3) {
            const gcontract = await GenericContract.getInstance(
                TestContractHandler.web3,
                TestContractHandler.logger,
                name,
                address
            )
            const contract: ContractTest = gcontract.getContract() //await ContractHandler.getContract(name, where, address)
            contract.testContract = true
            ContractHandler.setContract(name, where, contract, address)
            ContractHandler.setContract(name, where, contract)
            return { ...contract, $initialized: true } as any
        }

        let contractInstance: ContractTest
        try {
            TestContractHandler.logger.log('Deploying', name)
            const artifact = require(`@nevermined-io/contracts/artifacts/${name}.development.json`)
            contractInstance = await TestContractHandler.deployArtifact(
                artifact,
                from,
                args,
                tokens
            )
            contractInstance.testContract = true
            ContractHandler.setContract(name, where, contractInstance)
        } catch (err) {
            TestContractHandler.logger.error(
                'Deployment failed for',
                name,
                'with args',
                JSON.stringify(args, null, 2),
                err.message
            )
            throw err
        }
        console.log(`deployed contract: ${name}, ${contractInstance.options.address}`)
        TestContractHandler.addressBook[name] = contractInstance.options.address
        return contractInstance
    }

    public static async deployArtifact(
        artifact,
        from?: string,
        args = [],
        tokens = {}
    ): Promise<Contract> {
        if (!from) {
            from = (await TestContractHandler.web3.eth.getAccounts())[0]
        }

        const sendConfig = {
            from,
            gas: 6721975,
            gasPrice: '10000'
        }

        const tempContract = new TestContractHandler.web3.eth.Contract(
            artifact.abi,
            artifact.address
        )
        const isZos = !!tempContract.methods.initialize

        TestContractHandler.logger.debug({
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

        const contractInstance: Contract = await tempContract
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
        // TestContractHandler.logger.log('Deployed', name, 'at', contractInstance.options.address)

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
}
