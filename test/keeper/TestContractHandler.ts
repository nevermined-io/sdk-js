import { ContractHandler } from '../../src/keeper'
import * as KeeperUtils from '../../src/keeper/utils'
import Logger from '../../src/utils/Logger'
import config from '../config'
import { ZeroAddress } from '../../src/utils'
import { ContractTransactionReceipt, ContractTransactionResponse, ethers } from 'ethers'
import fs from 'fs'
import {
  NeverminedOptions,
  Web3Clients,
  getWeb3EthersProvider,
  getWeb3ViemClients,
} from '../../src'
import { getSignatureOfMethod } from '../../src/nevermined/utils/BlockchainEthersUtils'

export default abstract class TestContractHandler extends ContractHandler {
  public static async prepareContracts(): Promise<string> {
    await TestContractHandler.setConfig(config)

    const [deployerAddress] = await TestContractHandler.addresses(TestContractHandler.config)
    TestContractHandler.networkId = await TestContractHandler.client.public.getChainId() //TestContractHandler.web3 //Number((await TestContractHandler.web3.getNetwork()).chainId)
    TestContractHandler.minter = ethers.encodeBytes32String('minter')

    // deploy contracts
    await TestContractHandler.deployContracts(deployerAddress)
    return deployerAddress
  }

  private static networkId: number
  private static minter: string
  private static config = config
  private static web3: ethers.JsonRpcProvider | ethers.BrowserProvider
  private static client: Web3Clients

  public static async setConfig(config) {
    TestContractHandler.config = config
    TestContractHandler.web3 = await getWeb3EthersProvider(TestContractHandler.config)
    TestContractHandler.client = getWeb3ViemClients(TestContractHandler.config)
  }

  private static async deployContracts(deployerAddress: string) {
    Logger.log('Trying to deploy contracts')

    // Contracts
    const nvmConfig = await TestContractHandler.deployContract(
      'NeverminedConfig',
      deployerAddress,
      [deployerAddress, deployerAddress],
    )

    const token = await TestContractHandler.deployContract('NeverminedToken', deployerAddress, [
      deployerAddress,
      deployerAddress,
    ])

    const dispenser = await TestContractHandler.deployContract('Dispenser', deployerAddress, [
      await token.getAddress(),
      deployerAddress,
    ])

    const royalties = await TestContractHandler.deployContract(
      'StandardRoyalties',
      deployerAddress,
      [deployerAddress], // TODO: should be registry
    )

    // Add dispenser as Token minter

    const signer = await TestContractHandler.findSignerStatic(
      TestContractHandler.config,
      TestContractHandler.web3,
      deployerAddress,
    )
    const contract = token.connect(signer)
    const args = [TestContractHandler.minter, await dispenser.getAddress()]
    const methodSignature = getSignatureOfMethod(contract.interface, 'grantRole', args)
    let transactionResponse: ContractTransactionResponse = await contract[methodSignature](...args)
    let contractReceipt: ContractTransactionReceipt = await transactionResponse.wait()
    if (contractReceipt.status !== 1) {
      throw new Error('Error calling "grantRole" on "token"')
    }

    const didRegistry = await TestContractHandler.deployContract('DIDRegistry', deployerAddress, [
      deployerAddress,
      ZeroAddress,
      ZeroAddress,
      await nvmConfig.getAddress(),
      await royalties.getAddress(),
    ])

    const erc1155 = await TestContractHandler.deployContract(
      'NFT1155Upgradeable',
      deployerAddress,
      [
        deployerAddress,
        await didRegistry.getAddress(),
        'Nevermined NFT1155',
        'NVM',
        '',
        await nvmConfig.getAddress(),
      ],
    )

    const erc721 = await TestContractHandler.deployContract('NFT721Upgradeable', deployerAddress, [
      deployerAddress,
      await didRegistry.getAddress(),
      'Nevermined NFT721',
      'NVM',
      '',
      0,
      await nvmConfig.getAddress(),
    ])

    transactionResponse = await didRegistry.connect(signer).getFunction('setNFT1155')(
      await erc1155.getAddress(),
    )
    contractReceipt = await transactionResponse.wait()
    if (contractReceipt.status !== 1) {
      throw new Error('Error calling "setNFT1155" on "didRegistry"')
    }

    // Managers
    const templateStoreManager = await TestContractHandler.deployContract(
      'TemplateStoreManager',
      deployerAddress,
      [deployerAddress],
    )
    const conditionStoreManager = await TestContractHandler.deployContract(
      'ConditionStoreManager',
      deployerAddress,
      [deployerAddress, deployerAddress, await nvmConfig.getAddress()],
    )
    const agreementStoreManager = await TestContractHandler.deployContract(
      'AgreementStoreManager',
      deployerAddress,
      [
        deployerAddress,
        await conditionStoreManager.getAddress(),
        await templateStoreManager.getAddress(),
        await didRegistry.getAddress(),
      ],
    )

    // Conditions
    const lockPaymentCondition = await TestContractHandler.deployContract(
      'LockPaymentCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress(), await didRegistry.getAddress()],
    )

    const accessCondition = await TestContractHandler.deployContract(
      'AccessCondition',
      deployerAddress,
      [
        deployerAddress,
        await conditionStoreManager.getAddress(),
        await agreementStoreManager.getAddress(),
      ],
    )

    const nftHolderCondition = await TestContractHandler.deployContract(
      'NFTHolderCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress(), await erc1155.getAddress()],
    )

    const nft721HolderCondition = await TestContractHandler.deployContract(
      'NFT721HolderCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress()],
    )

    const nftLockCondition = await TestContractHandler.deployContract(
      'NFTLockCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress(), await erc1155.getAddress()],
    )
    transactionResponse = await erc1155.connect(signer).getFunction('grantOperatorRole')(
      await nftLockCondition.getAddress(),
    )
    contractReceipt = await transactionResponse.wait()
    if (contractReceipt.status !== 1) {
      throw new Error('Error calling "grantOperatorRole" on "erc1155"')
    }

    const nftAcessCondition = await TestContractHandler.deployContract(
      'NFTAccessCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress(), await didRegistry.getAddress()],
    )

    const transferNft721Condition = await TestContractHandler.deployContract(
      'TransferNFT721Condition',
      deployerAddress,
      [
        deployerAddress,
        await conditionStoreManager.getAddress(),
        await didRegistry.getAddress(),
        await erc721.getAddress(),
        await lockPaymentCondition.getAddress(),
      ],
    )

    const transferNftCondition = await TestContractHandler.deployContract(
      'TransferNFTCondition',
      deployerAddress,
      [
        deployerAddress,
        await conditionStoreManager.getAddress(),
        await didRegistry.getAddress(),
        await erc1155.getAddress(),
        ZeroAddress,
      ],
    )

    transactionResponse = await erc1155.connect(signer).getFunction('grantOperatorRole')(
      await transferNftCondition.getAddress(),
    )
    contractReceipt = await transactionResponse.wait()
    if (contractReceipt.status !== 1) {
      throw new Error('Error calling "grantOperatorRole" on "erc721"')
    }

    transactionResponse = await erc1155.connect(signer).getFunction('grantOperatorRole')(
      await didRegistry.getAddress(),
    )
    contractReceipt = await transactionResponse.wait()
    if (contractReceipt.status !== 1) {
      throw new Error('Error calling "grantOperatorRole" on "erc721"')
    }

    const transferDidOwnershipCondition = await TestContractHandler.deployContract(
      'TransferDIDOwnershipCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress(), await didRegistry.getAddress()],
    )

    // Conditions rewards
    const escrowPaymentCondition = await TestContractHandler.deployContract(
      'EscrowPaymentCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress()],
    )

    // Templates
    await TestContractHandler.deployContract('AccessTemplate', deployerAddress, [
      deployerAddress,
      await agreementStoreManager.getAddress(),
      await didRegistry.getAddress(),
      await accessCondition.getAddress(),
      await lockPaymentCondition.getAddress(),
      await escrowPaymentCondition.getAddress(),
    ])

    await TestContractHandler.deployContract('DIDSalesTemplate', deployerAddress, [
      deployerAddress,
      await agreementStoreManager.getAddress(),
      await lockPaymentCondition.getAddress(),
      await transferDidOwnershipCondition.getAddress(),
      await escrowPaymentCondition.getAddress(),
    ])

    await TestContractHandler.deployContract('NFTAccessTemplate', deployerAddress, [
      deployerAddress,
      await agreementStoreManager.getAddress(),
      await nftHolderCondition.getAddress(),
      await nftAcessCondition.getAddress(),
    ])

    await TestContractHandler.deployContract('NFT721AccessTemplate', deployerAddress, [
      deployerAddress,
      await agreementStoreManager.getAddress(),
      await nft721HolderCondition.getAddress(),
      await nftAcessCondition.getAddress(),
    ])

    await TestContractHandler.deployContract('NFTSalesTemplate', deployerAddress, [
      deployerAddress,
      await agreementStoreManager.getAddress(),
      await lockPaymentCondition.getAddress(),
      await transferNftCondition.getAddress(),
      await escrowPaymentCondition.getAddress(),
    ])

    await TestContractHandler.deployContract('NFT721SalesTemplate', deployerAddress, [
      deployerAddress,
      await agreementStoreManager.getAddress(),
      await lockPaymentCondition.getAddress(),
      await transferNft721Condition.getAddress(),
      await escrowPaymentCondition.getAddress(),
    ])

    const aaveCollateralDepositCondition = await TestContractHandler.deployContract(
      'AaveCollateralDepositCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress()],
    )
    const aaveBorrowCondition = await TestContractHandler.deployContract(
      'AaveBorrowCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress()],
    )
    const aaveRepayCondition = await TestContractHandler.deployContract(
      'AaveRepayCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress()],
    )
    const aaveCollateralWithdrawCondition = await TestContractHandler.deployContract(
      'AaveCollateralWithdrawCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress()],
    )
    const nft721LockCondition = await TestContractHandler.deployContract(
      'NFT721LockCondition',
      deployerAddress,
      [deployerAddress, await conditionStoreManager.getAddress()],
    )
    const distributeNFTCollateralCondition = await TestContractHandler.deployContract(
      'DistributeNFTCollateralCondition',
      deployerAddress,
      [
        deployerAddress,
        await conditionStoreManager.getAddress(),
        await nft721LockCondition.getAddress(),
      ],
    )
    const vaultLibrary = await TestContractHandler.deployContract(
      'AaveCreditVault',
      deployerAddress,
      [],
      {},
      false,
    )

    await TestContractHandler.deployContract('AaveCreditTemplate', deployerAddress, [
      deployerAddress,
      await agreementStoreManager.getAddress(),
      await nft721LockCondition.getAddress(),
      await aaveCollateralDepositCondition.getAddress(),
      await aaveBorrowCondition.getAddress(),
      await aaveRepayCondition.getAddress(),
      await aaveCollateralWithdrawCondition.getAddress(),
      await distributeNFTCollateralCondition.getAddress(),
      await vaultLibrary.getAddress(),
    ])
  }

  public static async findSignerStatic(
    config: NeverminedOptions,
    web3: ethers.JsonRpcProvider | ethers.BrowserProvider,
    from: string,
  ): Promise<ethers.Signer> {
    for (const acc of config.accounts || []) {
      const addr = await acc.getAddress()
      if (addr.toLowerCase() === from.toLowerCase()) {
        return acc.connect(web3)
      }
    }
  }

  public static async addresses(config: NeverminedOptions): Promise<string[]> {
    return await Promise.all((config.accounts || []).map((a) => a.getAddress()))
  }

  private static async deployContract(
    name: string,
    from: string,
    args: any[] = [],
    tokens: { [name: string]: string } = {},
    init = true,
  ): Promise<ethers.BaseContract> {
    const where = TestContractHandler.networkId

    let contractInstance: ethers.BaseContract
    try {
      const networkName = (
        await KeeperUtils.getNetworkName(TestContractHandler.networkId)
      ).toLowerCase()
      Logger.log('Deploying', name)
      const artifact = JSON.parse(
        fs.readFileSync(`./artifacts/${name}.${networkName}.json`).toString(),
      )
      contractInstance = await TestContractHandler.deployArtifact(
        artifact,
        from,
        args,
        tokens,
        init,
      )
      ContractHandler.setContract(name, where, contractInstance)
    } catch (err) {
      Logger.error(
        'Deployment failed for',
        name,
        'with args',
        JSON.stringify(args, null, 2),
        err.message,
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
    init = true,
  ): Promise<ethers.BaseContract> {
    if (!from) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;[from] = await TestContractHandler.addresses(TestContractHandler.config)
    }

    const sendConfig = {
      gasLimit: 6721975,
      gasPrice: '0x87500000',
    }

    const signer = await TestContractHandler.findSignerStatic(
      TestContractHandler.config,
      TestContractHandler.web3,
      from,
    )
    const tempContract = new ethers.ContractFactory(
      artifact.abi,
      TestContractHandler.replaceTokens(artifact.bytecode, tokens),
      signer,
    )
    const initializeExists = tempContract.interface.hasFunction('initialize')
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
        .splice(1),
    })

    const argument = isZos ? [] : args
    const contractInstance: ethers.BaseContract = await tempContract.deploy(...argument, sendConfig)
    await contractInstance.waitForDeployment()

    if (isZos) {
      const methodSignature = getSignatureOfMethod(contractInstance.interface, 'initialize', args)
      const contract = contractInstance.connect(signer)
      const transactionResponse: ContractTransactionResponse = await contract[methodSignature](
        ...args,
        sendConfig,
      )
      const contractReceipt: ContractTransactionReceipt = await transactionResponse.wait()
      if (contractReceipt.status !== 1) {
        throw new Error(`Error deploying contract ${artifact.name}`)
      }
    }

    return contractInstance
  }

  private static replaceTokens(bytecode: string, tokens: { [name: string]: string }): string {
    return Object.entries(tokens).reduce(
      (acc, [_token, address]) =>
        acc.replace(new RegExp(`__\\$[0-9a-f]*\\$__`, 'g'), address.substr(2).toLowerCase()),
      bytecode,
    )
  }
}
