import { TransactionResponse } from '@ethersproject/abstract-provider'
import { Account } from '../../nevermined'
import { ContractEvent, EventHandler, SubgraphEvent } from '../../events'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { KeeperError } from '../../errors'
import { ContractReceipt, ethers } from 'ethers'
import { parseUnits } from '../../sdk'
export interface TxParameters {
  value?: string
  gasLimit?: bigint
  gasMultiplier?: number
  gasPrice?: string
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
  signer?: ethers.Signer
  nonce?: number
  progress?: (data: any) => void
}

export abstract class ContractBase extends Instantiable {
  public contractName: string
  public contract: ethers.Contract = null
  public events: ContractEvent | SubgraphEvent = null
  public version: string

  get address() {
    return this.getAddress()
  }

  constructor(contractName: string) {
    super()
    this.contractName = contractName
  }

  public getContract(): ethers.Contract {
    return this.contract
  }

  public getAddress(): string {
    return this.contract.address
  }

  public getSignatureOfMethod(methodName: string, args: any[] = []): string {
    const foundMethod = this.searchMethod(methodName, args)
    return foundMethod.format()
  }

  public getInputsOfMethod(methodName: string): any[] {
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
  ): Promise<ContractReceipt> {
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
    contract: ethers.Contract,
    progress: (data: any) => void,
  ) {
    // Uncomment to debug contract calls
    //console.debug(`Making contract call ....: ${name} - ${from} - ${JSON.stringify(args)}`)
    const methodSignature = this.getSignatureOfMethod(name, args)
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

    const transactionResponse: TransactionResponse = await contract[methodSignature](
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

    const ContractReceipt: ContractReceipt = await transactionResponse.wait()
    if (progress) {
      progress({
        stage: 'receipt',
        args: this.searchMethodInputs(name, args),
        ContractReceipt,
        method: name,
        from,
        value,
        contractName: this.contractName,
        contractAddress: this.address,
        gasLimit,
      })
    }

    return ContractReceipt
  }

  public async send(
    name: string,
    from: string,
    args: any[],
    params: TxParameters = {},
  ): Promise<ContractReceipt> {
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
                Error: ${err.message}\n
                From: ${from}\n
                Parameters: ${JSON.stringify(mappedArgs, null, 2)}\n
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
    const methods = this.contract.interface.fragments.filter((f) => f.name === methodName)
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
    contract: ethers.Contract,
    methodSignature: string,
    args: any[],
    from: string,
    value: string,
    gasMultiplier?: number,
  ): Promise<bigint> {
    let gasLimit = await contract.estimateGas[methodSignature](...args, {
      from,
      value,
    })
    if (value) gasLimit = gasLimit.add(21500)

    gasMultiplier = gasMultiplier || this.config.gasMultiplier
    if (gasMultiplier) {
      const gasMultiplierParsed = parseUnits(gasMultiplier.toString(), 2)
      gasLimit = gasLimit.mul(gasMultiplierParsed).div(100)
    }

    return gasLimit
  }
}

export default ContractBase
