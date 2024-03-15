import { Account } from '../../nevermined'
import { ContractEvent, EventHandler, SubgraphEvent } from '../../events'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { KeeperError } from '../../errors'
import {
  ContractTransactionReceipt,
  ContractTransactionResponse,
  FunctionFragment,
  TransactionReceipt,
  ethers,
} from 'ethers'
import { jsonReplacer, parseUnits } from '../../sdk'
import { SessionKeyProvider, ZeroDevAccountSigner } from '@zerodev/sdk'
export interface TxParameters {
  value?: string
  gasLimit?: bigint
  gasMultiplier?: number
  gasPrice?: string
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
  signer?: ethers.Signer
  zeroDevSigner?: ZeroDevAccountSigner<'ECDSA'>
  sessionKeyProvider?: SessionKeyProvider
  nonce?: number
  progress?: (data: any) => void
}

export abstract class ContractBase extends Instantiable {
  public readonly contractName: string
  public contract: ethers.BaseContract = null
  public events: ContractEvent | SubgraphEvent = null
  public version: string
  public address: string

  constructor(contractName: string) {
    super()
    this.contractName = contractName
  }

  public getSignatureOfMethod(methodName: string, args: any[] = []): string {
    const foundMethod = this.searchMethod(methodName, args)
    return foundMethod.format()
  }

  public getInputsOfMethod(methodName: string): ReadonlyArray<ethers.ParamType> {
    const foundMethod = this.searchMethod(methodName)
    return foundMethod.inputs
  }

  protected async init(config: InstantiableConfig, optional = false) {
    this.setInstanceConfig(config)
    this.contract = await this.nevermined.utils.contractHandler.get(
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
      this.events = ContractEvent.getInstance(this, eventEmitter, config.nevermined, this.web3)
    }
  }

  protected async getFromAddress(from?: string): Promise<string> {
    if (!from) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;[from] = await this.nevermined.accounts.addresses()
    }
    return from
  }

  public async sendFrom(
    name: string,
    args: any[],
    from?: Account,
    value?: TxParameters,
  ): Promise<ContractTransactionReceipt> {
    const fromAddress = await this.getFromAddress(from && from.getId())
    const receipt = await this.send(name, fromAddress, args, value)
    if (!receipt.status) {
      this.logger.error('Transaction failed!', this.contractName, name, args, fromAddress)
    }
    return receipt
  }

  private async internalSend(
    name: string,
    from: string,
    args: any[],
    txparams: any,
    contract: ethers.BaseContract,
    progress: (data: any) => void,
  ): Promise<ContractTransactionReceipt> {
    const methodSignature = this.getSignatureOfMethod(name, args)
    // Uncomment to debug contract calls
    // console.debug(`Making contract call ....: ${name} - ${from}`)
    // console.debug(`With args - ${JSON.stringify(args)}`)
    // console.debug(`And signature - ${methodSignature}`)

    const { gasLimit, value } = txparams
    // make the call
    if (progress) {
      progress({
        stage: 'sending',
        args: this.searchMethodInputs(name, args),
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    const transactionResponse: ContractTransactionResponse = await contract[methodSignature](
      ...args,
      txparams,
    )
    if (progress) {
      progress({
        stage: 'sent',
        args: this.searchMethodInputs(name, args),
        transactionResponse,
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    const transactionReceipt: ContractTransactionReceipt = await transactionResponse.wait()

    if (progress) {
      progress({
        stage: 'receipt',
        args: this.searchMethodInputs(name, args),
        transactionReceipt,
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    return transactionReceipt
  }

  private async internalSendZeroDev(
    name: string,
    from: string,
    args: any[],
    txparams: any,
    contract: ethers.BaseContract,
    progress: (data: any) => void,
  ): Promise<ContractTransactionReceipt> {
    const methodSignature = this.getSignatureOfMethod(name, args)
    // Uncomment to debug contract calls
    // console.debug(`Making contract call ....: ${name} - ${from}`)
    // console.debug(`With args - ${JSON.stringify(args)}`)
    // console.debug(`And signature - ${methodSignature}`)

    const { gasLimit, value } = txparams
    // make the call
    if (progress) {
      progress({
        stage: 'sending',
        args: this.searchMethodInputs(name, args),
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    const transactionResponse: ContractTransactionResponse = await contract[methodSignature](
      ...args,
      txparams,
    )
    if (progress) {
      progress({
        stage: 'sent',
        args: this.searchMethodInputs(name, args),
        transactionResponse,
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    const transactionReceipt: TransactionReceipt =
      await transactionResponse.provider.waitForTransaction(transactionResponse.hash)

    if (progress) {
      progress({
        stage: 'receipt',
        args: this.searchMethodInputs(name, args),
        transactionReceipt,
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    return transactionReceipt as ContractTransactionReceipt
  }

  private async internalSendSessionKeyProvider(
    name: string,
    from: string,
    args: any[],
    txparams: any,
    progress: (data: any) => void,
  ): Promise<ContractTransactionReceipt> {
    const { gasLimit, value } = txparams
    const methodSignature = this.getSignatureOfMethod(name, args)

    // make the call
    if (progress) {
      progress({
        stage: 'sending',
        args: this.searchMethodInputs(name, args),
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    // Send the transaction
    const { hash } = await txparams.sessionKeyProvider.sendUserOperation({
      target: this.address,
      data: this.contract.interface.encodeFunctionData(methodSignature, args),
    })

    if (progress) {
      progress({
        stage: 'sent',
        args: this.searchMethodInputs(name, args),
        hash,
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    await txparams.sessionKeyProvider.waitForUserOperationTransaction(hash as `0x${string}`)
    const userOperationReceipt = await txparams.sessionKeyProvider.getUserOperationReceipt(hash)
    const receipt = userOperationReceipt.receipt

    if (progress) {
      progress({
        stage: 'receipt',
        args: this.searchMethodInputs(name, args),
        receipt,
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    return receipt
  }

  public async send(
    name: string,
    from: string,
    args: any[],
    params: TxParameters = {},
  ): Promise<ContractTransactionReceipt> {
    if (params.zeroDevSigner) {
      const paramsFixed = { ...params, signer: undefined }
      const contract = this.contract.connect(params.zeroDevSigner as any)
      return await this.internalSendZeroDev(
        name,
        from,
        args,
        paramsFixed,
        contract,
        params.progress,
      )
    } else if (params.sessionKeyProvider) {
      const paramsFixed = { ...params, signer: undefined }
      return await this.internalSendSessionKeyProvider(
        name,
        from,
        args,
        paramsFixed,
        params.progress,
      )
    }

    if (params.signer) {
      const paramsFixed = { ...params, signer: undefined }
      const contract = this.contract.connect(params.signer)
      return await this.internalSend(name, from, args, paramsFixed, contract, params.progress)
    }

    const methodSignature = this.getSignatureOfMethod(name, args)

    // get signer
    const signer = await this.nevermined.accounts.findSigner(from)
    const contract = this.contract.connect(signer)

    // calculate gas cost
    let { gasLimit } = params
    const { gasMultiplier, value, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce } = params

    try {
      if (params.progress) {
        params.progress({
          stage: 'estimateGas',
          args: this.searchMethodInputs(name, args),
          method: name,
          from,
          value,
          contractName: this.contractName,
          contractAddress: this.address,
        })
      }

      if (!gasLimit) {
        gasLimit = await this.estimateGas(
          contract,
          methodSignature,
          args,
          from,
          value,
          gasMultiplier,
        )
      }

      // get correct fee data
      const feeData = await this.nevermined.utils.contractHandler.getFeeData(
        gasPrice && BigInt(gasPrice),
        maxFeePerGas && BigInt(maxFeePerGas),
        maxPriorityFeePerGas && BigInt(maxPriorityFeePerGas),
      )

      const txparams = {
        value,
        gasLimit,
        nonce,
        ...feeData,
      }
      return await this.internalSend(name, from, args, txparams, contract, params.progress)
    } catch (err) {
      const mappedArgs = this.searchMethod(name, args).inputs.map((input, i) => {
        return {
          name: input.name,
          value: args[i],
        }
      })
      throw new KeeperError(`
                ${'-'.repeat(40)}\n
                Sending transaction "${name}" on contract "${this.contractName}" at ${
        this.address
      } failed.\n
                Error: ${err}\n
                From: ${from}\n
                Parameters: ${JSON.stringify(mappedArgs, jsonReplacer, 2)}\n
                ${'-'.repeat(40)}
            `)
    }
  }

  public async call<T>(name: string, args: any[], from?: string): Promise<T> {
    const methodSignature = this.getSignatureOfMethod(name, args)
    try {
      return await this.contract[methodSignature](...args, { from })
    } catch (err) {
      throw new KeeperError(
        `Calling method "${name}" on contract "${this.contractName}" failed. Args: ${args} - ${err}`,
      )
    }
  }

  private searchMethod(methodName: string, args: any[] = []) {
    const methods = (this.contract.interface.fragments as FunctionFragment[]).filter(
      (f: FunctionFragment) => f.name === methodName,
    )
    const foundMethod = methods.find((f) => f.inputs.length === args.length) || methods[0]
    if (!foundMethod) {
      throw new KeeperError(`Method "${methodName}" is not part of contract "${this.contractName}"`)
    }
    return foundMethod
  }

  private searchMethodInputs(methodName: string, args: any[] = []) {
    return this.searchMethod(methodName, args).inputs.map((input, i) => {
      return {
        name: input.name,
        value: args[i],
      }
    })
  }

  private async estimateGas(
    contract: ethers.BaseContract,
    methodSignature: string,
    args: any[],
    from: string,
    value: string,
    gasMultiplier?: number,
  ): Promise<bigint> {
    let gasLimit: bigint = await contract[methodSignature].estimateGas(...args, {
      from,
      value,
    })
    if (value) gasLimit = gasLimit + 21500n

    gasMultiplier = gasMultiplier || this.config.gasMultiplier
    if (gasMultiplier) {
      const gasMultiplierParsed = parseUnits(gasMultiplier.toString(), 2)
      gasLimit = (gasLimit * gasMultiplierParsed) / 100n
    }

    return gasLimit
  }
}

export default ContractBase
