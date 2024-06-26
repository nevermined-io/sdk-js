import { Web3Clients, getWeb3ViemClients } from '../../src/Instantiable.abstract'
import { ZeroAddress } from '../../src/constants/AssetConstants'
import { ContractHandler } from '../../src/keeper/ContractHandler'
import Logger from '../../src/models/Logger'
import { NeverminedOptions } from '../../src/models/NeverminedOptions'
import { NvmAccount } from '../../src/models/NvmAccount'
import { Nevermined } from '../../src/nevermined/Nevermined'
import {
  deployContractInstance,
  encodeBytes32String,
} from '../../src/nevermined/utils/BlockchainViemUtils'
import * as NetworkUtils from '../../src/utils/Network'
import fs from 'fs'
import config from '../config'
import { Account } from 'viem/accounts'

export default abstract class TestContractHandler extends ContractHandler {
  private static networkId: number
  private static minter: string
  private static client: Web3Clients

  public static async prepareContracts(): Promise<{
    nevermined: Nevermined
    deployerAddress: string
    deployerAccount: NvmAccount
    config: NeverminedOptions
  }> {
    await TestContractHandler.setConfig(config)

    config.accounts.map((a) => {
      return a.getAccountSigner() as Account
    })

    TestContractHandler.networkId = await TestContractHandler.client.public.getChainId()

    const nvmAccount = TestContractHandler.getNvmAccount()
    const deployerAddress = nvmAccount.getAddress()
    TestContractHandler.minter = encodeBytes32String('minter')

    // deploy contracts
    await TestContractHandler.deployContracts(nvmAccount)
    const nevermined = await Nevermined.getInstance(config)

    return {
      nevermined,
      deployerAddress,
      deployerAccount: nvmAccount,
      config,
    }
  }

  public static async setConfig(config) {
    TestContractHandler.client = await getWeb3ViemClients(config)
  }

  private static async deployContracts(nvmAccount: NvmAccount) {
    Logger.log('Deploying Nevermined Contracts ...')
    const account = nvmAccount.getAccountSigner() as Account
    const deployerAddress = account.address
    // Contracts
    const nvmConfig = await TestContractHandler.deployContract('NeverminedConfig', nvmAccount, [
      deployerAddress,
      deployerAddress,
      false,
    ])

    const token = await TestContractHandler.deployContract('NeverminedToken', nvmAccount, [
      deployerAddress,
      deployerAddress,
    ])

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

    const args = [TestContractHandler.minter, dispenser.address]

    const { request } = await TestContractHandler.client.public.simulateContract({
      address: token.address,
      abi: token.abi,
      functionName: 'grantRole',
      args,
      account,
    })
    let txHash = await TestContractHandler.client.wallet.writeContract(request)
    let tx = await TestContractHandler.client.public.waitForTransactionReceipt({ hash: txHash })
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

    const erc1155 = await TestContractHandler.deployContract('NFT1155Upgradeable', nvmAccount, [
      deployerAddress,
      didRegistry.address,
      'Nevermined NFT1155',
      'NVM',
      '',
      nvmConfig.address,
    ])

    const erc721 = await TestContractHandler.deployContract('NFT721Upgradeable', nvmAccount, [
      deployerAddress,
      didRegistry.address,
      'Nevermined NFT721',
      'NVM',
      '',
      0,
      nvmConfig.address,
    ])

    txHash = await didRegistry.write.setNFT1155({ args: [erc1155.address], account })
    tx = await TestContractHandler.client.public.waitForTransactionReceipt({ hash: txHash })
    if (tx.status !== 'success') {
      throw new Error('Error calling "setNFT1155" on "didRegistry"')
    }

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
      [deployerAddress, conditionStoreManager.address, agreementStoreManager.address],
    )

    const computeCondition = await TestContractHandler.deployContract(
      'ComputeExecutionCondition',
      nvmAccount,
      [deployerAddress, conditionStoreManager.address, agreementStoreManager.address],
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
    txHash = await erc1155.write.grantOperatorRole({ args: [nftLockCondition.address], account })
    tx = await TestContractHandler.client.public.waitForTransactionReceipt({ hash: txHash })
    if (tx.status !== 'success') {
      throw new Error('Error calling "grantOperatorRole" on "erc1155" - nftLockCondition')
    }

    await TestContractHandler.deployContract('NFT721LockCondition', nvmAccount, [
      deployerAddress,
      conditionStoreManager.address,
    ])

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

    txHash = await erc1155.write.grantOperatorRole({
      args: [transferNftCondition.address],
      account,
    })
    tx = await TestContractHandler.client.public.waitForTransactionReceipt({ hash: txHash })
    if (tx.status !== 'success') {
      throw new Error('Error calling "grantOperatorRole" on "erc1155" - transferNftCondition')
    }

    txHash = await erc1155.write.grantOperatorRole({ args: [didRegistry.address], account })
    tx = await TestContractHandler.client.public.waitForTransactionReceipt({ hash: txHash })
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
    const templates: any[] = []
    templates.push(
      await TestContractHandler.deployContract('AccessTemplate', nvmAccount, [
        deployerAddress,
        agreementStoreManager.address,
        didRegistry.address,
        accessCondition.address,
        lockPaymentCondition.address,
        escrowPaymentCondition.address,
      ]),
    )

    templates.push(
      await TestContractHandler.deployContract('EscrowComputeExecutionTemplate', nvmAccount, [
        deployerAddress,
        agreementStoreManager.address,
        didRegistry.address,
        computeCondition.address,
        lockPaymentCondition.address,
        escrowPaymentCondition.address,
      ]),
    )

    templates.push(
      await TestContractHandler.deployContract('DIDSalesTemplate', nvmAccount, [
        deployerAddress,
        agreementStoreManager.address,
        lockPaymentCondition.address,
        transferDidOwnershipCondition.address,
        escrowPaymentCondition.address,
      ]),
    )

    templates.push(
      await TestContractHandler.deployContract('NFTAccessTemplate', nvmAccount, [
        deployerAddress,
        agreementStoreManager.address,
        nftHolderCondition.address,
        nftAcessCondition.address,
      ]),
    )

    templates.push(
      await TestContractHandler.deployContract('NFT721AccessTemplate', nvmAccount, [
        deployerAddress,
        agreementStoreManager.address,
        nft721HolderCondition.address,
        nftAcessCondition.address,
      ]),
    )

    templates.push(
      await TestContractHandler.deployContract('NFTSalesTemplate', nvmAccount, [
        deployerAddress,
        agreementStoreManager.address,
        lockPaymentCondition.address,
        transferNftCondition.address,
        escrowPaymentCondition.address,
      ]),
    )

    templates.push(
      await TestContractHandler.deployContract('NFT721SalesTemplate', nvmAccount, [
        deployerAddress,
        agreementStoreManager.address,
        lockPaymentCondition.address,
        transferNft721Condition.address,
        escrowPaymentCondition.address,
      ]),
    )
    const templateObj: any = {}
    for (const i of templates) {
      templateObj[i.address] = i
    }
    // txHash = await didRegistry.write.setNFT1155({ args: [erc1155.address], account })

    return { templates: templateObj }
  }

  public static async findNvmAccount(
    config: NeverminedOptions,
    // client: Web3Clients,
    from: string,
  ): Promise<NvmAccount | undefined> {
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

  public static async deployContract(
    name: string,
    nvmAccount: NvmAccount,
    args,
    tokens: { [name: string]: string } = {},
    init = true,
  ) {
    const where = TestContractHandler.networkId

    let contractInstance
    try {
      const networkName = (await NetworkUtils.getNetworkName(where)).toLowerCase()
      const abiFilename = `./artifacts/${name}.${networkName}.json`

      const artifact = JSON.parse(fs.readFileSync(abiFilename).toString())

      contractInstance = await TestContractHandler.deployArtifact(
        artifact,
        nvmAccount,
        args,
        tokens,
        init,
      )
      Logger.debug(
        `Contract ${name} deployed on network ${where} with address ${contractInstance.address}`,
      )
      ContractHandler.setContract(name, where, contractInstance, undefined, artifact.version)
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
    const contractArtifact = {
      ...artifact,
      bytecode: TestContractHandler.replaceTokens(artifact.bytecode, tokens),
    }

    const contractInstance = deployContractInstance(
      contractArtifact,
      nvmAccount,
      args,
      TestContractHandler.client,
    )

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
