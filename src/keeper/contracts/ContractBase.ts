import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { KeeperError } from '../../errors/NeverminedErrors'
import {
  getInputsOfFunctionFormatted,
  getSignatureOfFunction,
} from '../../nevermined/utils/BlockchainViemUtils'
import { Account, TransactionReceipt, parseEventLogs } from 'viem'
import { TxParameters } from '../../models/Transactions'
import { ContractEvent } from '../../events/ContractEvent'
import { EventHandler } from '../../events/EventHandler'
import { SubgraphEvent } from '../../events/SubgraphEvent'
import { NvmAccount } from '../../models/NvmAccount'
import { ContractHandler } from '../../keeper/ContractHandler'
import { jsonReplacer } from '../../common/helpers'

export abstract class ContractBase extends Instantiable {
  public readonly contractName: string
  public contract
  public events: ContractEvent | SubgraphEvent = null
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
        config.artifactsFolder,
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
        this.client.chain?.id,
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
      this.logger.debug(`Blockchain Send using Local account`)
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
      // TODO: Enable ZeroDev & Session Key Provider setup
      // if (params.zeroDevSigner) {
      //   const paramsFixed = { ...params, signer: undefined }
      //   const contract = this.contract.connect(params.zeroDevSigner as any)
      //   return await this.internalSendZeroDev(
      //     name,
      //     from,
      //     args,
      //     paramsFixed,
      //     contract,
      //     params.progress,
      //   )
      // } else if (params.sessionKeyProvider) {
      //   const paramsFixed = { ...params, signer: undefined }
      //   return await this.internalSendSessionKeyProvider(
      //     name,
      //     from,
      //     args,
      //     paramsFixed,
      //     params.progress,
      //   )
      // }
    } else {
      throw new KeeperError(`Account not supported`)
    }
  }

  private async localAccountSend(
    name: string,
    from: Account | `0x${string}`,
    args: any[],
    txparams: any,
    progress: (data: any) => void,
  ) {
    const functionInputs = getInputsOfFunctionFormatted(this.contract.abi, name, args)
    // Uncomment to debug contract calls
    if (name === 'grantOperatorRole') {
      const functionSignature = getSignatureOfFunction(this.contract.abi, name, args)
      console.debug(`Making contract call ....: ${name} - ${from}`)
      console.debug(`With args`, args)
      console.debug(`And signature - ${JSON.stringify(functionSignature, jsonReplacer)}`)
      console.debug('And amount: ', txparams.value)
    }

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
    // const nonce = await this.client.public.getTransactionCount({address: txHash.from})
    //const txReceipt = await this.client.public.getTransactionReceipt({ hash: txHash })
    //const txReceipt = await this.getTransactionReceipt(txHash)
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

  // private async internalEthersSend(
  //   name: string,
  //   from: string,
  //   args: any[],
  //   txparams: any,
  //   contract: ethers.BaseContract,
  //   progress: (data: any) => void,
  // ): Promise<ContractTransactionReceipt> {
  //   const methodSignature = getSignatureOfFunction(this.contract.interface, name, args)
  //   // Uncomment to debug contract calls
  //   // console.debug(`Making contract call ....: ${name} - ${from}`)
  //   // console.debug(`With args - ${JSON.stringify(args)}`)
  //   // console.debug(`And signature - ${methodSignature}`)

  //   const { gasLimit, value } = txparams
  //   // make the call
  //   if (progress) {
  //     progress({
  //       stage: 'sending',
  //       args: getInputsOfFunctionFormatted(this.contract.interface, name, args),
  //       method: name,
  //       from,
  //       value,
  //       contractName: this.contractName,
  //       contractAddress: this.address,
  //       gasLimit,
  //     })
  //   }

  //   const transactionResponse: ContractTransactionResponse = await contract[methodSignature](
  //     ...args,
  //     txparams,
  //   )
  //   if (progress) {
  //     progress({
  //       stage: 'sent',
  //       args: getInputsOfFunctionFormatted(this.contract.interface, name, args),
  //       transactionResponse,
  //       method: name,
  //       from,
  //       value,
  //       contractName: this.contractName,
  //       contractAddress: this.address,
  //       gasLimit,
  //     })
  //   }

  //   const transactionReceipt: ContractTransactionReceipt = await transactionResponse.wait()

  //   if (progress) {
  //     progress({
  //       stage: 'receipt',
  //       args: getInputsOfFunctionFormatted(this.contract.interface, name, args),
  //       transactionReceipt,
  //       method: name,
  //       from,
  //       value,
  //       contractName: this.contractName,
  //       contractAddress: this.address,
  //       gasLimit,
  //     })
  //   }

  //   return transactionReceipt
  // }

  // TODO: Re-enable ZeroDev
  // private async internalSendZeroDev(
  //   name: string,
  //   from: string,
  //   args: any[],
  //   txparams: any,
  //   contract: ethers.BaseContract,
  //   progress: (data: any) => void,
  // ): Promise<ContractTransactionReceipt> {
  //   const methodSignature = getSignatureOfFunction(this.contract.interface, name, args)
  //   // Uncomment to debug contract calls
  //   // console.debug(`Making contract call ....: ${name} - ${from}`)
  //   // console.debug(`With args - ${JSON.stringify(args)}`)
  //   // console.debug(`And signature - ${methodSignature}`)

  //   const { gasLimit, value } = txparams
  //   // make the call
  //   if (progress) {
  //     progress({
  //       stage: 'sending',
  //       args: getInputsOfFunctionFormatted(this.contract.interface, name, args),
  //       method: name,
  //       from,
  //       value,
  //       contractName: this.contractName,
  //       contractAddress: this.address,
  //       gasLimit,
  //     })
  //   }

  //   const transactionResponse: ContractTransactionResponse = await contract[methodSignature](
  //     ...args,
  //     txparams,
  //   )
  //   if (progress) {
  //     progress({
  //       stage: 'sent',
  //       args: getInputsOfFunctionFormatted(this.contract.interface, name, args),
  //       transactionResponse,
  //       method: name,
  //       from,
  //       value,
  //       contractName: this.contractName,
  //       contractAddress: this.address,
  //       gasLimit,
  //     })
  //   }

  //   const transactionReceipt: TransactionReceipt =
  //     await transactionResponse.provider.waitForTransaction(transactionResponse.hash)

  //   if (progress) {
  //     progress({
  //       stage: 'receipt',
  //       args: getInputsOfFunctionFormatted(this.contract.interface, name, args),
  //       transactionReceipt,
  //       method: name,
  //       from,
  //       value,
  //       contractName: this.contractName,
  //       contractAddress: this.address,
  //       gasLimit,
  //     })
  //   }

  //   return transactionReceipt as ContractTransactionReceipt
  // }

  // private async internalSendSessionKeyProvider(
  //   name: string,
  //   from: string,
  //   args: any[],
  //   txparams: any,
  //   progress: (data: any) => void,
  // ): Promise<ContractTransactionReceipt> {
  //   const { gasLimit, value } = txparams
  //   const methodSignature = getSignatureOfFunction(this.contract.interface, name, args)

  //   // make the call
  //   if (progress) {
  //     progress({
  //       stage: 'sending',
  //       args: getInputsOfFunctionFormatted(this.contract.interface, name, args),
  //       method: name,
  //       from,
  //       value,
  //       contractName: this.contractName,
  //       contractAddress: this.address,
  //       gasLimit,
  //     })
  //   }

  //   // Send the transaction
  //   const { hash } = await txparams.sessionKeyProvider.sendUserOperation({
  //     target: this.address,
  //     data: this.contract.interface.encodeFunctionData(methodSignature, args),
  //   })

  //   if (progress) {
  //     progress({
  //       stage: 'sent',
  //       args: getInputsOfFunctionFormatted(this.contract.interface, name, args),
  //       hash,
  //       method: name,
  //       from,
  //       value,
  //       contractName: this.contractName,
  //       contractAddress: this.address,
  //       gasLimit,
  //     })
  //   }

  //   await txparams.sessionKeyProvider.waitForUserOperationTransaction(hash as `0x${string}`)
  //   const userOperationReceipt = await txparams.sessionKeyProvider.getUserOperationReceipt(hash)
  //   const receipt = userOperationReceipt.receipt

  //   if (progress) {
  //     progress({
  //       stage: 'receipt',
  //       args: getInputsOfFunctionFormatted(this.contract.interface, name, args),
  //       receipt,
  //       method: name,
  //       from,
  //       value,
  //       contractName: this.contractName,
  //       contractAddress: this.address,
  //       gasLimit,
  //     })
  //   }

  //   return receipt
  // }
}
