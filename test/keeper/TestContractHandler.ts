import { Web3Clients } from '@/Instantiable.abstract'
import { ZeroAddress } from '@/constants/AssetConstants'
import { ContractHandler } from '@/keeper/ContractHandler'
import Logger from '@/models/Logger'
import { NeverminedOptions } from '@/models/NeverminedOptions'
import { NvmAccount } from '@/models/NvmAccount'
import { Nevermined } from '@/nevermined/Nevermined'
import { keccak256 } from '@/nevermined/utils/BlockchainViemUtils'
import * as NetworkUtils from '@/utils/Network'
import fs from 'fs'
import config from '../config'

export default abstract class TestContractHandler extends ContractHandler {
  private static networkId: number
  private static minter: string
  private static config = config
  // private static web3: ethers.JsonRpcProvider | ethers.BrowserProvider
  private static client: Web3Clients
  private static nevermined: Nevermined

  public static async prepareContracts(): Promise<string> {
    // await TestContractHandler.setConfig(config)
    TestContractHandler.config = config
    TestContractHandler.nevermined = await Nevermined.getInstance(config)

    const [deployerAddress] = await TestContractHandler.addresses(TestContractHandler.config)
    // TestContractHandler.client = await getWeb3ViemClients(TestContractHandler.config)
    // console.log('testContractHandler', await TestContractHandler.client.public.getChainId())
    TestContractHandler.networkId = await TestContractHandler.client.public.getChainId()

    // TestContractHandler.networkId = await TestContractHandler.client.public.getChainId() //TestContractHandler.web3 //Number((await TestContractHandler.web3.getNetwork()).chainId)
    TestContractHandler.minter = keccak256('minter')

    // deploy contracts
    await TestContractHandler.deployContracts(deployerAddress)
    return deployerAddress
  }

  // public static async setConfig(config) {
  //   TestContractHandler.config = config
  //   // TestContractHandler.web3 = await getWeb3EthersProvider(TestContractHandler.config)
  //   // TestContractHandler.client = await getWeb3ViemClients(TestContractHandler.config)
  // }

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

    // const nvmAccount = await TestContractHandler.findNvmAccount(
    //   TestContractHandler.config,
    //   TestContractHandler.client,
    //   deployerAddress,
    // )
    //const contract = token.connect(signer)
    const args = [TestContractHandler.minter, await dispenser.getAddress()]
    // const methodSignature = getSignatureOfFunction(token.interface, 'grantRole', args)
    // let transactionResponse: ContractTransactionResponse = await contract[methodSignature](...args)
    // let contractReceipt: ContractTransactionReceipt = await transactionResponse.wait()
    // if (contractReceipt.status !== 1) {
    //   throw new Error('Error calling "grantRole" on "token"')
    // }
    let txHash = await token.write.grantRole(args)
    let tx = await this.client.public.waitForTransactionReceipt({ hash: txHash })
    if (tx.status !== 'success') {
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

    txHash = didRegistry.write.setNFT1155(await erc1155.getAddress())
    tx = await this.client.public.waitForTransactionReceipt({ hash: txHash })
    if (tx.status !== 'success') {
      throw new Error('Error calling "setNFT1155" on "didRegistry"')
    }
    // transactionResponse = await didRegistry.connect(nvmAccount).getFunction('setNFT1155')(
    //   await erc1155.getAddress(),
    // )
    // contractReceipt = await transactionResponse.wait()
    // if (contractReceipt.status !== 1) {
    //   throw new Error('Error calling "setNFT1155" on "didRegistry"')
    // }

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
    txHash = erc1155.write.grantOperatorRole(await nftLockCondition.getAddress())
    tx = await this.client.public.waitForTransactionReceipt({ hash: txHash })
    if (tx.status !== 'success') {
      throw new Error('Error calling "grantOperatorRole" on "erc1155" - nftLockCondition')
    }

    // transactionResponse = await erc1155.connect(nvmAccount).getFunction('grantOperatorRole')(
    //   await nftLockCondition.getAddress(),
    // )
    // contractReceipt = await transactionResponse.wait()
    // if (contractReceipt.status !== 1) {
    //   throw new Error('Error calling "grantOperatorRole" on "erc1155"')
    // }

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

    txHash = erc1155.write.grantOperatorRole(await transferNftCondition.getAddress())
    tx = await this.client.public.waitForTransactionReceipt({ hash: txHash })
    if (tx.status !== 'success') {
      throw new Error('Error calling "grantOperatorRole" on "erc1155" - transferNftCondition')
    }
    // transactionResponse = await erc1155.connect(nvmAccount).getFunction('grantOperatorRole')(
    //   await transferNftCondition.getAddress(),
    // )
    // contractReceipt = await transactionResponse.wait()
    // if (contractReceipt.status !== 1) {
    //   throw new Error('Error calling "grantOperatorRole" on "erc721"')
    // }

    // transactionResponse = await erc1155.connect(nvmAccount).getFunction('grantOperatorRole')(
    //   await didRegistry.getAddress(),
    // )
    // contractReceipt = await transactionResponse.wait()
    // if (contractReceipt.status !== 1) {
    //   throw new Error('Error calling "grantOperatorRole" on "erc721"')
    // }
    txHash = erc1155.write.grantOperatorRole(await didRegistry.getAddress())
    tx = await this.client.public.waitForTransactionReceipt({ hash: txHash })
    if (tx.status !== 'success') {
      throw new Error('Error calling "grantOperatorRole" on "erc1155" - didRegistry')
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
  }

  public static async findNvmAccount(
    config: NeverminedOptions,
    client: Web3Clients,
    from: string,
  ): Promise<NvmAccount> {
    for (const acc of config.accounts || []) {
      const addr = await acc.getAddress()
      if (addr.toLowerCase() === from.toLowerCase()) {
        return acc
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
  ) {
    const where = TestContractHandler.networkId

    let contractInstance
    try {
      const networkName = (
        await NetworkUtils.getNetworkName(TestContractHandler.networkId)
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
    _init = true,
  ) {
    if (!from) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;[from] = await TestContractHandler.addresses(TestContractHandler.config)
    }

    // const sendConfig = {
    //   gasLimit: 6721975,
    //   gasPrice: '0x87500000',
    // }

    const nvmAccount = await TestContractHandler.findNvmAccount(
      TestContractHandler.config,
      TestContractHandler.client,
      from,
    )
    const contractArtifact = {
      ...artifact,
      bytecode: TestContractHandler.replaceTokens(artifact.bytecode, tokens),
    }
    const contractInstance = TestContractHandler.nevermined.utils.blockchain.deployAbi(
      contractArtifact,
      nvmAccount,
      args,
    )
    // const tempContract = getContract({
    //   abi: artifact.abi,
    //   bytecode: TestContractHandler.replaceTokens(artifact.bytecode, tokens),
    //   // address: contractAddress,
    //   // @ts-expect-error "viem, wtf?"
    //   client: { wallet: this.client.wallet, public: this.client.public },
    // })

    // const tempContract = new ethers.ContractFactory(
    //   artifact.abi,
    //   TestContractHandler.replaceTokens(artifact.bytecode, tokens),
    //   nvmAccount,
    // )
    // const initializeFunc = searchAbiFunction(artifact.abi, 'initialize')
    // // const initializeExists = tempContract.interface.hasFunction('initialize')
    // const isZos = initializeFunc ? true : false

    // Logger.debug({
    //   name: artifact.name,
    //   from,
    //   isZos,
    //   args,
    //   libraries: artifact.bytecode
    //     .replace(/(0x)?[a-f0-9]{8}/gi, '')
    //     .replace(/__([^_]+)_*[0-9a-f]{2}/g, '|$1')
    //     .split('|')
    //     .splice(1),
    // })

    // const argument = isZos ? [] : args
    // const contractInstance: ethers.BaseContract = await tempContract.deploy(...argument, sendConfig)
    // await contractInstance.waitForDeployment()

    // if (isZos) {
    //   const methodSignature = getSignatureOfFunction(contractInstance.interface, 'initialize', args)
    //   const contract = contractInstance.connect(nvmAccount)
    //   const transactionResponse: ContractTransactionResponse = await contract[methodSignature](
    //     ...args,
    //     sendConfig,
    //   )
    //   const contractReceipt: ContractTransactionReceipt = await transactionResponse.wait()
    //   if (contractReceipt.status !== 1) {
    //     throw new Error(`Error deploying contract ${artifact.name}`)
    //   }
    // }

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
