import { Web3Clients, getWeb3ViemClients } from '@/Instantiable.abstract'
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
import { Account } from 'viem/accounts'

export default abstract class TestContractHandler extends ContractHandler {
  private static networkId: number
  private static minter: string
  private static config = config
  // private static web3: ethers.JsonRpcProvider | ethers.BrowserProvider
  private static client: Web3Clients
  private static nevermined: Nevermined

  public static async initEnvironment(nvm: Nevermined, config: NeverminedOptions): Promise<string> {
    TestContractHandler.nevermined = nvm
    TestContractHandler.config = config

    config.accounts.map((a) => {    
      //const a = NvmAccount.fromAccount(wallet)
      const signer = a.getAccountSigner() as Account
      console.log(`TestContractHandler::Account loaded with address ${a.getAddress()} and type: ${signer.type}`)
      return a
    })
    console.log(`Addresses loaded`)
    
    TestContractHandler.networkId = await TestContractHandler.nevermined.client.public.getChainId()
    //const [deployerAddress] = await TestContractHandler.addresses(TestContractHandler.config)
    const nvmAccount = TestContractHandler.getNvmAccount()
    const deployerAddress = nvmAccount.getAddress()    
    console.log(`Deployer: `, deployerAddress)
    TestContractHandler.minter = keccak256('minter')

    console.log(`Lets deploy contracts ....`)
    // deploy contracts
    await TestContractHandler.deployContracts(nvmAccount)
    return deployerAddress
  }

  public static async prepareContracts(): Promise<string> {
    // await TestContractHandler.setConfig(config)
    TestContractHandler.config = config
    TestContractHandler.nevermined = await Nevermined.getInstance(config)
    
    console.log('Nevermined Loaded ....')


    TestContractHandler.client = await getWeb3ViemClients(config)
    console.log('Clients Loaded ....', TestContractHandler.nevermined.client.chain.id)

    const [deployerAddress] = await TestContractHandler.addresses(TestContractHandler.config)
    console.log(`Addresses loaded`)
    TestContractHandler.networkId = await TestContractHandler.client.public.getChainId() //TestContractHandler.web3 //Number((await TestContractHandler.web3.getNetwork()).chainId)
    console.log(`Network Id loaded`)

    TestContractHandler.minter = keccak256('minter')

    console.log(`Lets deploy contracts ....`)
    // deploy contracts
    const nvmAccount = TestContractHandler.getNvmAccount()

    await TestContractHandler.deployContracts(nvmAccount)
    return deployerAddress
  }

  // public static async setConfig(config) {
  //   TestContractHandler.config = config
  //   // TestContractHandler.web3 = await getWeb3EthersProvider(TestContractHandler.config)
  //   // TestContractHandler.client = await getWeb3ViemClients(TestContractHandler.config)
  // }

  private static async deployContracts(nvmAccount: NvmAccount) {
    Logger.log('Trying to deploy contracts')
    const account = nvmAccount.getAccountSigner() as Account
    const deployerAddress = account.address
    // Contracts
    const nvmConfig = await TestContractHandler.deployContract(
      'NeverminedConfig',
      nvmAccount,
      [deployerAddress, deployerAddress, false],
    )

    const token = await TestContractHandler.deployContract('NeverminedToken', nvmAccount, [
      deployerAddress,
      deployerAddress,
    ])
    console.log(`Token Address: ${token.address}`)
    const dispenser = await TestContractHandler.deployContract('Dispenser', nvmAccount, [
      token.address,
      deployerAddress,
    ])

    const royalties = await TestContractHandler.deployContract(
      'StandardRoyalties',
      nvmAccount,
      [deployerAddress], // TODO: should be registry
    )

    // Add dispenser as Token minter

    // const nvmAccount = await TestContractHandler.findNvmAccount(
    //   TestContractHandler.config,
    //   TestContractHandler.client,
    //   deployerAddress,
    // )
    //const contract = token.connect(signer)
    const args = [TestContractHandler.minter, dispenser.address]
    // const methodSignature = getSignatureOfFunction(token.interface, 'grantRole', args)
    // let transactionResponse: ContractTransactionResponse = await contract[methodSignature](...args)
    // let contractReceipt: ContractTransactionReceipt = await transactionResponse.wait()
    // if (contractReceipt.status !== 1) {
    //   throw new Error('Error calling "grantRole" on "token"')
    // }
    const { request } = await TestContractHandler.nevermined.client.public.simulateContract({
      address: token.address,
      abi: token.abi,
      functionName: 'grantRole',
      args,
      account
    
    })
    let txHash = await TestContractHandler.nevermined.client.wallet.writeContract(request)
    //let txHash = await token.write.grantRole(args)
    let tx = await TestContractHandler.nevermined.client.public.waitForTransactionReceipt({ hash: txHash })
    if (tx.status !== 'success') {
      throw new Error('Error calling "grantRole" on "token"')
    }

    const didRegistry = await TestContractHandler.deployContract('DIDRegistry', nvmAccount, [
      deployerAddress,
      ZeroAddress,
      ZeroAddress,
      nvmConfig.address,
      royalties.address,
    ])

    const erc1155 = await TestContractHandler.deployContract(
      'NFT1155Upgradeable',
      nvmAccount,
      [
        deployerAddress,
        didRegistry.address,
        'Nevermined NFT1155',
        'NVM',
        '',
        nvmConfig.address,
      ],
    )

    const erc721 = await TestContractHandler.deployContract('NFT721Upgradeable', nvmAccount, [
      deployerAddress,
      didRegistry.address,
      'Nevermined NFT721',
      'NVM',
      '',
      0,
      nvmConfig.address,
    ])

    txHash = await didRegistry.write.setNFT1155(erc1155.address)
    tx = await TestContractHandler.nevermined.client.public.waitForTransactionReceipt({ hash: txHash })
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
      nvmAccount,
      [deployerAddress],
    )
    const conditionStoreManager = await TestContractHandler.deployContract(
      'ConditionStoreManager',
      nvmAccount,
      [deployerAddress, deployerAddress, nvmConfig.address],
    )
    const agreementStoreManager = await TestContractHandler.deployContract(
      'AgreementStoreManager',
      nvmAccount,
      [
        deployerAddress,
        conditionStoreManager.address,
        templateStoreManager.address,
        didRegistry.address,
      ],
    )

    // Conditions
    const lockPaymentCondition = await TestContractHandler.deployContract(
      'LockPaymentCondition',
      nvmAccount,
      [deployerAddress, conditionStoreManager.address, didRegistry.address],
    )

    const accessCondition = await TestContractHandler.deployContract(
      'AccessCondition',
      nvmAccount,
      [
        deployerAddress,
        conditionStoreManager.address,
        agreementStoreManager.address,
      ],
    )

    const nftHolderCondition = await TestContractHandler.deployContract(
      'NFTHolderCondition',
      nvmAccount,
      [deployerAddress, conditionStoreManager.address, erc1155.address],
    )

    const nft721HolderCondition = await TestContractHandler.deployContract(
      'NFT721HolderCondition',
      nvmAccount,
      [deployerAddress, conditionStoreManager.address],
    )

    const nftLockCondition = await TestContractHandler.deployContract(
      'NFTLockCondition',
      nvmAccount,
      [deployerAddress, conditionStoreManager.address, erc1155.address],
    )
    txHash = erc1155.write.grantOperatorRole(nftLockCondition.address)
    tx = await TestContractHandler.nevermined.client.public.waitForTransactionReceipt({ hash: txHash })
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
      nvmAccount,
      [deployerAddress, conditionStoreManager.address, didRegistry.address],
    )

    const transferNft721Condition = await TestContractHandler.deployContract(
      'TransferNFT721Condition',
      nvmAccount,
      [
        deployerAddress,
        conditionStoreManager.address,
        didRegistry.address,
        erc721.address,
        lockPaymentCondition.address,
      ],
    )

    const transferNftCondition = await TestContractHandler.deployContract(
      'TransferNFTCondition',
      nvmAccount,
      [
        deployerAddress,
        conditionStoreManager.address,
        didRegistry.address,
        erc1155.address,
        ZeroAddress,
      ],
    )

    txHash = erc1155.write.grantOperatorRole(transferNftCondition.address)
    tx = await TestContractHandler.nevermined.client.public.waitForTransactionReceipt({ hash: txHash })
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
    txHash = erc1155.write.grantOperatorRole(didRegistry.address)
    tx = await TestContractHandler.nevermined.client.public.waitForTransactionReceipt({ hash: txHash })
    if (tx.status !== 'success') {
      throw new Error('Error calling "grantOperatorRole" on "erc1155" - didRegistry')
    }

    const transferDidOwnershipCondition = await TestContractHandler.deployContract(
      'TransferDIDOwnershipCondition',
      nvmAccount,
      [deployerAddress, conditionStoreManager.address, didRegistry.address],
    )

    // Conditions rewards
    const escrowPaymentCondition = await TestContractHandler.deployContract(
      'EscrowPaymentCondition',
      nvmAccount,
      [deployerAddress, conditionStoreManager.address],
    )

    // Templates
    await TestContractHandler.deployContract('AccessTemplate', nvmAccount, [
      deployerAddress,
      agreementStoreManager.address,
      didRegistry.address,
      accessCondition.address,
      lockPaymentCondition.address,
      escrowPaymentCondition.address,
    ])

    await TestContractHandler.deployContract('DIDSalesTemplate', nvmAccount, [
      deployerAddress,
      agreementStoreManager.address,
      lockPaymentCondition.address,
      transferDidOwnershipCondition.address,
      escrowPaymentCondition.address,
    ])

    await TestContractHandler.deployContract('NFTAccessTemplate', nvmAccount, [
      deployerAddress,
      agreementStoreManager.address,
      nftHolderCondition.address,
      nftAcessCondition.address,
    ])

    await TestContractHandler.deployContract('NFT721AccessTemplate', nvmAccount, [
      deployerAddress,
      agreementStoreManager.address,
      nft721HolderCondition.address,
      nftAcessCondition.address,
    ])

    await TestContractHandler.deployContract('NFTSalesTemplate', nvmAccount, [
      deployerAddress,
      agreementStoreManager.address,
      lockPaymentCondition.address,
      transferNftCondition.address,
      escrowPaymentCondition.address,
    ])

    await TestContractHandler.deployContract('NFT721SalesTemplate', nvmAccount, [
      deployerAddress,
      agreementStoreManager.address,
      lockPaymentCondition.address,
      transferNft721Condition.address,
      escrowPaymentCondition.address,
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

  public static getAccountSigner(index = 0): Account {
    return TestContractHandler.getNvmAccount(index).getAccountSigner() as Account
  }

  public static getNvmAccount(index = 0): NvmAccount {
    return config.accounts[index]
  }

  public static async addresses(config: NeverminedOptions): Promise<string[]> {
    return await Promise.all((config.accounts || []).map((a) => a.getAddress()))
  }

  private static async deployContract(
    name: string,
    nvmAccount: NvmAccount,
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
      const abiFilename = `./artifacts/${name}.${networkName}.json`
      Logger.log('Deploying', name)
      Logger.log('ABI Filename', abiFilename)
      const artifact = JSON.parse(
        fs.readFileSync(abiFilename).toString(),
      )

      contractInstance = await TestContractHandler.deployArtifact(
        artifact,
        nvmAccount,
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
    nvmAccount: NvmAccount,
    args = [],
    tokens = {},
    _init = true,
  ) {
    // if (!deployer) {
    //   // eslint-disable-next-line @typescript-eslint/no-extra-semi
    //   ;[deployer] = await TestContractHandler.addresses(TestContractHandler.config)
    // }

    // const sendConfig = {
    //   gasLimit: 6721975,
    //   gasPrice: '0x87500000',
    // }

    // const nvmAccount = await TestContractHandler.findNvmAccount(
    //   TestContractHandler.config,
    //   TestContractHandler.client,
    //   deployer,
    // )
    const contractArtifact = {
      ...artifact,
      bytecode: TestContractHandler.replaceTokens(artifact.bytecode, tokens),
    }
    console.log('Deploying contract', artifact.name, 'with args', args)
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
