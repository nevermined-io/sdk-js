import ContractHandler from '../ContractHandler'

import Account from '../../nevermined/Account'
import { ContractEvent, EventHandler, SubgraphEvent } from '../../events'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { KeeperError } from '../../errors'
import { ContractReceipt, ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export interface TxParameters {
    value?: string
    gasLimit?: ethers.BigNumber
    gasMultiplier?: number
    gasPrice?: string
    maxPriorityFeePerGas?: string
    maxFeePerGas?: string
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

    protected async init(config: InstantiableConfig, optional: boolean = false) {
        this.setInstanceConfig(config)
        console.log('didregistry init setConfig')
        const contractHandler = new ContractHandler(config)
        console.log('didregistry.init contractHandler')
        this.contract = await contractHandler.get(
            this.contractName,
            optional,
            undefined,
            config.artifactsFolder
        )
        console.log('didregistry.init get contract')
        try {
            this.version = await contractHandler.getVersion(
                this.contractName,
                config.artifactsFolder
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
                await this.nevermined.keeper.getNetworkName()
            )
        } else {
            this.events = ContractEvent.getInstance(
                this,
                eventEmitter,
                config.nevermined,
                this.web3
            )
        }
    }

    protected async getFromAddress(from?: string): Promise<string> {
        if (!from) {
            ;[from] = await this.web3.listAccounts()
        }
        return from
    }

    public async sendFrom(
        name: string,
        args: any[],
        from?: Account,
        value?: TxParameters
    ): Promise<ContractReceipt> {
        const fromAddress = await this.getFromAddress(from && from.getId())
        const receipt = await this.send(name, fromAddress, args, value)
        if (!receipt.status) {
            this.logger.error(
                'Transaction failed!',
                this.contractName,
                name,
                args,
                fromAddress
            )
        }
        return receipt
    }

    public async send(
        name: string,
        from: string,
        args: any[],
        params: TxParameters = {}
    ): Promise<ContractReceipt> {
        const methodSignature = this.getSignatureOfMethod(name, args)
        const { value, gasPrice } = params

        try {
            let { gasLimit } = params
            if (params.progress) {
                params.progress({
                    stage: 'estimateGas',
                    args: this.searchMethodInputs(name, args),
                    method: name,
                    from,
                    value,
                    contractName: this.contractName,
                    contractAddress: this.address
                })
            }
            if (!gasLimit) {
                gasLimit = await this.contract.estimateGas[methodSignature](...args, {
                    from,
                    value
                })
                if (value) gasLimit = gasLimit.add(21500)

                const gasMultiplier = params.gasMultiplier || this.config.gasMultiplier
                if (gasMultiplier) {
                    const gasMultiplierParsed = ethers.utils.parseUnits(
                        gasMultiplier.toString(),
                        2
                    )
                    gasLimit = gasLimit.mul(gasMultiplierParsed).div(100)
                }
            }

            if (params.progress) {
                params.progress({
                    stage: 'sending',
                    args: this.searchMethodInputs(name, args),
                    method: name,
                    from,
                    value,
                    contractName: this.contractName,
                    contractAddress: this.address,
                    gasLimit
                })
            }
            let txparams: any = {
                from,
                value,
                gasLimit,
                gasPrice
            }
            if (!gasPrice) {
                let { maxPriorityFeePerGas } = params
                try {
                    const fee = await this.web3.send('eth_maxPriorityFeePerGas', [])
                    const { maxFeePerGas } = params
                    if (!maxPriorityFeePerGas) {
                        maxPriorityFeePerGas = fee
                    }
                    txparams = {
                        from,
                        value,
                        gasLimit,
                        maxPriorityFeePerGas,
                        maxFeePerGas,
                        type: '0x2'
                    }
                } catch (err) {
                    // TODO: https://github.com/nevermined-io/sdk-js/issues/265
                    // If the error is because of no support for eip-1559, just continue
                    const chainId = await this.nevermined.keeper.getNetworkId()
                    // no eip-1559 support
                    if (![42220, 44787, 80001, 8997, 137].includes(chainId)) {
                        throw new KeeperError(err)
                    }
                }
            }

            // Something weird with celo eip-1559 implementation (mainnet, alfajores)
            const chainId = await this.nevermined.keeper.getNetworkId()
            if (chainId == 44787 || chainId == 42220) {
                console.log('Calling Celo...')
                txparams = {
                    from,
                    value,
                    gasLimit,
                    gasPrice
                }
            }

            // get signer
            const signer = this.web3.getSigner(from)
            const contract = this.contract.connect(signer)

            const transactionResponse: TransactionResponse = await contract[
                methodSignature
            ](...args, txparams)
            if (params.progress) {
                params.progress({
                    stage: 'sent',
                    args: this.searchMethodInputs(name, args),
                    transactionResponse,
                    method: name,
                    from,
                    value,
                    contractName: this.contractName,
                    contractAddress: this.address,
                    gasLimit
                })
            }

            const ContractReceipt: ContractReceipt = await transactionResponse.wait()
            if (params.progress) {
                params.progress({
                    stage: 'receipt',
                    args: this.searchMethodInputs(name, args),
                    ContractReceipt,
                    method: name,
                    from,
                    value,
                    contractName: this.contractName,
                    contractAddress: this.address,
                    gasLimit
                })
            }

            return ContractReceipt
        } catch (err) {
            const mappedArgs = this.searchMethod(name, args).inputs.map((input, i) => {
                return {
                    name: input.name,
                    value: args[i]
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
                `Calling method "${name}" on contract "${this.contractName}" failed. Args: ${args} - ${err}`
            )
        }
    }

    private searchMethod(methodName: string, args: any[] = []) {
        const methods = this.contract.interface.fragments.filter(
            f => f.name === methodName
        )
        const foundMethod =
            methods.find(f => f.inputs.length === args.length) || methods[0]
        if (!foundMethod) {
            throw new KeeperError(
                `Method "${methodName}" is not part of contract "${this.contractName}"`
            )
        }
        return foundMethod
    }

    private searchMethodInputs(methodName: string, args: any[] = []) {
        return this.searchMethod(methodName, args).inputs.map((input, i) => {
            return {
                name: input.name,
                value: args[i]
            }
        })
    }
}

export default ContractBase
