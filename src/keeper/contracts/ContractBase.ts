import {
  Account,
  PrivateKeyAccount,
  TransactionReceipt,
  encodeFunctionData,
  parseEventLogs,
} from 'viem'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { jsonReplacer } from '../../common/helpers'
import { KeeperError } from '../../errors/NeverminedErrors'
import { ContractEvent } from '../../events/ContractEvent'
import { EventHandler } from '../../events/EventHandler'
import { SubgraphEvent } from '../../events/SubgraphEvent'
import { ContractHandler } from '../../keeper/ContractHandler'
import { NvmAccount } from '../../models/NvmAccount'
import { TxParameters } from '../../models/Transactions'
import {
  getInputsOfFunctionFormatted,
  getSignatureOfFunction,
} from '../../nevermined/utils/BlockchainViemUtils'
import { ENTRYPOINT_ADDRESS_V06, bundlerActions } from 'permissionless'

export abstract class ContractBase extends Instantiable {
  public readonly contractName: string
  public contract
  public events: ContractEvent | SubgraphEvent
  public version: string
  public address: `0x${string}`

  constructor(contractName: string) {
    super()
    this.contractName = contractName
  }

  protected async init(config: InstantiableConfig, optional = false, contractAddress?: string) {
    this.setInstanceConfig(config)
    try {
      this.contract = await this.nevermined.utils.contractHandler.getContractFromArtifacts(
        this.contractName,
        optional,
        config.artifactsFolder as string,
        contractAddress,
      )
      this.address = await this.contract.address
    } catch {
      if (!optional) throw new KeeperError(`Unable to load contract: ${this.contractName}`)
      else return
    }

    try {
      this.version = ContractHandler.getVersion(
        this.contractName,
        this.client.chain?.id as number,
        // config.artifactsFolder,
      )
    } catch {
      throw new KeeperError(`${this.contractName} not available on this network.`)
    }

    const eventEmitter = new EventHandler()
    if (this.config.graphHttpUri) {
      this.events = SubgraphEvent.getInstance(
        this,
        eventEmitter,
        this.config.graphHttpUri,
        await this.nevermined.keeper.getNetworkName(),
      )
    } else {
      this.events = ContractEvent.getInstance(this, eventEmitter, config.nevermined, this.client)
    }
  }

  protected async getFromAddress(from?: string): Promise<string> {
    if (!from) {
      // eslint-disable-next-line
      ;[from] = await this.nevermined.accounts.addresses()
    }
    return from
  }

  public getTransactionLogs(txReceipt: TransactionReceipt, eventName: string) {
    return parseEventLogs({
      abi: this.contract.abi,
      logs: txReceipt.logs,
      eventName,
      strict: false,
    })
  }

  public someLog(logs: any[]) {
    logs.some((e: any) => {
      return e.args
    })
    return undefined
  }

  public async call<T>(functionName: string, args: any[], from?: string): Promise<T> {
    try {
      return (await this.client.public.readContract({
        address: this.address,
        abi: this.contract.abi,
        functionName,
        args,
        ...(from && { account: from as `0x${string}` }),
      })) as T
      //return await this.contract[functionSignature](...args, { from })
    } catch (err) {
      throw new KeeperError(
        `Calling method "${functionName}" on contract "${this.contractName}" failed. Args: ${args} - ${err}`,
      )
    }
  }

  public async sendFrom(functionName: string, args: any[], from: NvmAccount, value?: TxParameters) {
    const receipt = await this.send(functionName, from, args, value)
    // receipt.transactionHash
    if (from.getType() === 'sessionKey') {
      return receipt
    }
    const tx = await this.client.public.waitForTransactionReceipt({ hash: receipt.transactionHash })
    if (tx.status !== 'success') {
      this.logger.error(
        'Transaction failed!',
        this.contractName,
        functionName,
        args,
        from.getAddress(),
      )
    }
    return receipt
  }

  public async send(
    functionName: string,
    from: NvmAccount,
    args: any[],
    params: TxParameters = {},
  ) {
    const signer = from.getAccountSigner()
    if (from.getType() === 'local') {
      this.logger.debug(
        `Blockchain Send using Local account with functionName: ${functionName} and following args: ${args}`,
      )
      return await this.localAccountSend(
        functionName,
        signer as Account,
        args,
        params,
        params.progress,
      )
    } else if (from.getType() === 'json-rpc') {
      this.logger.debug(`Blockchain Send using JSON-RPC account to ${functionName}`)
      return await this.localAccountSend(
        functionName,
        from.getAddress(),
        args,
        params,
        params.progress,
      )
    } else if (from.getType() === 'zerodev') {
      this.logger.debug(`Blockchain Send using ZeroDev account`)
      return await this.internalSendZeroDev(functionName, from, args, params, params.progress)
    } else if (from.getType() === 'sessionKey') {
      this.logger.debug('Session Key account used for send')
      return await this.internalSendSessionKey(functionName, from, args, params, params.progress)
    } else {
      throw new KeeperError(`Account not supported`)
    }
  }

  private async internalSendSessionKey(
    name: string,
    from: NvmAccount,
    args: any[],
    txparams: any,
    progress: ((data: any) => void) | undefined,
  ) {
    const functionInputs = getInputsOfFunctionFormatted(this.contract.abi, name, args)

    const { gasLimit, value } = txparams
    if (progress) {
      progress({
        stage: 'sending',
        args: functionInputs,
        method: name,
        from: from.getAccountSigner(),
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    const kernelClient = from.getKernelClient()
    const data = encodeFunctionData({ abi: this.contract.abi, functionName: name, args })
    // @ts-ignore
    const txHash = await kernelClient.sendUserOperation({
      userOperation: {
        // @ts-ignore
        callData: await kernelClient.account.encodeCallData({
          to: this.address,
          value: txparams.value || 0n,
          data,
        }),
      },
    })

    if (progress) {
      progress({
        stage: 'sent',
        args: functionInputs,
        txHash,
        method: name,
        from: from.getAccountSigner(),
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    // @ts-ignore
    const bundlerClient = kernelClient.extend(bundlerActions(ENTRYPOINT_ADDRESS_V06))
    const txReceipt = await bundlerClient.waitForUserOperationReceipt({ hash: txHash })

    if (progress) {
      progress({
        stage: 'receipt',
        args: functionInputs,
        txReceipt,
        method: name,
        from: from.getAccountSigner(),
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    return txReceipt
  }

  private async internalSendZeroDev(
    name: string,
    from: NvmAccount,
    args: any[],
    txparams: any,
    progress: ((data: any) => void) | undefined,
  ) {
    const functionInputs = getInputsOfFunctionFormatted(this.contract.abi, name, args)
    const { gasLimit, value } = txparams
    if (progress) {
      progress({
        stage: 'sending',
        args: functionInputs,
        method: name,
        from: from.getAccountSigner(),
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }
    const { request } = await this.client.public.simulateContract({
      address: this.address,
      abi: this.contract.abi,
      functionName: name,
      args,
      account: from.getAccountSigner(),
      ...(txparams.value && { value: txparams.value }),
    })

    const kernelClient = from.getKernelClient()
    // @ts-ignore
    const txHash = await kernelClient.writeContract(request)
    if (progress) {
      progress({
        stage: 'sent',
        args: functionInputs,
        txHash,
        method: name,
        from: from.getAccountSigner(),
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }
    const txReceipt = this.nevermined.utils.blockchain.getTransactionReceipt(txHash)

    if (progress) {
      progress({
        stage: 'receipt',
        args: functionInputs,
        txReceipt,
        method: name,
        from: from.getAccountSigner(),
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    return txReceipt
  }

  private async localAccountSend(
    name: string,
    from: PrivateKeyAccount | Account | `0x${string}`,
    args: any[],
    txparams: any,
    progress: ((data: any) => void) | undefined,
  ) {
    const functionInputs = getInputsOfFunctionFormatted(this.contract.abi, name, args)
    // Uncomment to debug contract calls
    // if (name === 'XXXXX') {
    const functionSignature = getSignatureOfFunction(this.contract.abi, name, args)
    console.debug(`Making contract call ....: ${name} - ${from}`)
    console.debug(`With args`, args)
    console.debug(`And signature - ${JSON.stringify(functionSignature, jsonReplacer)}`)
    console.debug('And amount: ', txparams.value)
    // }

    const { gasLimit, value } = txparams
    // make the call
    if (progress) {
      progress({
        stage: 'sending',
        args: functionInputs,
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }
    const { request } = await this.client.public.simulateContract({
      address: this.address,
      abi: this.contract.abi,
      functionName: name,
      args,
      account: from,
      ...(txparams.value && { value: txparams.value }),
    })
    // @ts-ignore
    const txHash = await this.client.wallet.writeContract(request)

    if (progress) {
      progress({
        stage: 'sent',
        args: functionInputs,
        txHash,
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    const txReceipt = this.nevermined.utils.blockchain.getTransactionReceipt(txHash)

    if (progress) {
      progress({
        stage: 'receipt',
        args: functionInputs,
        txReceipt,
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    return txReceipt
  }
}
