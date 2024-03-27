import { NvmAccount } from '@/models'
import { ContractEvent, EventHandler, SubgraphEvent } from '@/events'
import { Instantiable, InstantiableConfig } from '@/Instantiable.abstract'
import { KeeperError } from '@/errors/NeverminedErrors'
import { getInputsOfFunctionFormatted } from '@/nevermined/utils/BlockchainViemUtils'
import { TransactionReceipt, parseEventLogs } from 'viem'
import { TxParameters } from '@/models/Transactions'

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

  protected async init(config: InstantiableConfig, optional = false) {
    this.setInstanceConfig(config)
    this.contract = await this.nevermined.utils.contractHandler.getContractFromArtifacts(
      this.contractName,
      optional,
      config.artifactsFolder,
    )
    this.address = await this.contract.getAddress()

    try {
      this.version = await this.nevermined.utils.contractHandler.getVersion(
        this.contractName,
        config.artifactsFolder,
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
      this.events = ContractEvent.getInstance(this, eventEmitter) //, config.nevermined, this.client)
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
      abi: this.contract.interface.abi,
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

  public async sendFrom(
    functionName: string,
    args: any[],
    from?: NvmAccount,
    value?: TxParameters,
  ) {
    const fromAddress = await this.getFromAddress(from && from.getId())
    const receipt = await this.send(functionName, fromAddress, args, value)
    if (!receipt.status) {
      this.logger.error('Transaction failed!', this.contractName, functionName, args, fromAddress)
    }
    return receipt
  }

  public async send(functionName: string, from: string, args: any[], params: TxParameters = {}) {
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

    // if (params.signer) {
    //   const paramsFixed = { ...params, signer: undefined }
    //   const contract = this.contract.connect(params.signer)
    //   return await this.internalEthersSend(name, from, args, paramsFixed, contract, params.progress)
    // }

    if (params.nvmAccount) {
      return await this.internalSend(functionName, from, args, params, params.progress)
    }

    // const methodSignature = getSignatureOfFunction(this.contract.interface, name, args)

    // get signer
    // const _nvmAccount = await this.nevermined.accounts.findAccount(from)
    // const contract = this.contract.connect(nvmAccount)

    // calculate gas cost
    // let { gasLimit } = params
    // const { value, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce } = params

    // try {
    //   if (params.progress) {
    //     params.progress({
    //       stage: 'estimateGas',
    //       args: getInputsOfFunctionFormatted(this.contract.interface, name, args),
    //       method: name,
    //       from,
    //       value,
    //       contractName: this.contractName,
    //       contractAddress: this.address,
    //     })
    //   }

    //   if (!gasLimit) {
    //     gasLimit = await this.client.public.estimateContractGas({
    //       address: this.address,
    //       abi: this.contract.abi,
    //       functionName: name,
    //       account: from as `0x${string}`,
    //       args
    //     })
    //   }

    //   // get correct fee data
    //   const feeData = await this.nevermined.utils.viem.getFeeData(
    //     gasPrice && BigInt(gasPrice),
    //     maxFeePerGas && BigInt(maxFeePerGas),
    //     maxPriorityFeePerGas && BigInt(maxPriorityFeePerGas),
    //   )

    //   const txparams = {
    //     value,
    //     gasLimit,
    //     nonce,
    //     ...feeData,
    //   }
    //   return await this.internalSend(name, from, args, txparams, params.progress)
    // } catch (err) {
    //   const mappedArgs = getInputsOfFunctionFormatted(this.contract.interface, name, args)
    //   throw new KeeperError(`
    //             ${'-'.repeat(40)}\n
    //             Sending transaction "${name}" on contract "${this.contractName}" at ${
    //     this.address
    //   } failed.\n
    //             Error: ${err}\n
    //             From: ${from}\n
    //             Parameters: ${JSON.stringify(mappedArgs, jsonReplacer, 2)}\n
    //             ${'-'.repeat(40)}
    //         `)
    // }
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

  private async internalSend(
    name: string,
    from: string,
    args: any[],
    txparams: any,
    progress: (data: any) => void,
  ) {
    const functionInputs = getInputsOfFunctionFormatted(this.contract.abi, name, args)
    // const functionSignature = getSignatureOfFunction(this.contract.interface, name, args)
    // Uncomment to debug contract calls
    // console.debug(`Making contract call ....: ${name} - ${from}`)
    // console.debug(`With args - ${JSON.stringify(args)}`)
    // console.debug(`And signature - ${methodSignature}`)

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
      account: from as `0x${string}`,
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
    const txReceipt = await await this.client.public.getTransactionReceipt({ hash: txHash })

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

export default ContractBase
