import { Contract } from 'web3-eth-contract'
import { TransactionReceipt } from 'web3-core'
import ContractHandler from '../ContractHandler'

import Account from '../../nevermined/Account'
import { ContractEvent, EventHandler, SubgraphEvent } from '../../events'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { KeeperError } from '../../errors'

export interface TxParameters {
    value?: string
    gas?: number
    gasMultiplier?: number
    gasPrice?: string
    maxPriorityFeePerGas?: string
    maxFeePerGas?: string
    progress?: (data: any) => void
}

export abstract class ContractBase extends Instantiable {
    public contractName: string
    public contract: Contract = null
    public events: ContractEvent | SubgraphEvent = null
    public version: string

    get address() {
        return this.getAddress()
    }

    constructor(contractName: string) {
        super()
        this.contractName = contractName
    }

    public getContract(): Contract {
        return this.contract
    }

    public getAddress(): string {
        return this.contract?.options?.address
    }

    public getSignatureOfMethod(methodName: string): string {
        const foundMethod = this.searchMethod(methodName)
        return foundMethod.signature
    }

    public getInputsOfMethod(methodName: string): any[] {
        const foundMethod = this.searchMethod(methodName)
        return foundMethod.inputs
    }

    protected async init(config: InstantiableConfig, optional: boolean = false) {
        this.setInstanceConfig(config)
        const contractHandler = new ContractHandler(config)
        this.contract = await contractHandler.get(
            this.contractName,
            optional,
            undefined,
            config.artifactsFolder
        )
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
                this.config.graphHttpUri
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
            ;[from] = await this.web3.eth.getAccounts()
        }
        return from
    }

    public async sendFrom(
        name: string,
        args: any[],
        from?: Account,
        value?: TxParameters
    ): Promise<TransactionReceipt> {
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
    ): Promise<TransactionReceipt> {
        if (!this.contract.methods[name]) {
            throw new Error(
                `Method "${name}" is not part of contract "${this.contractName}"`
            )
        }

        const method = this.contract.methods[name]
        const { value, gasPrice } = params
        try {
            const tx = method(...args)
            let { gas } = params
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
            if (!gas) {
                gas = await tx.estimateGas(args, {
                    from,
                    value
                })
                if (value) gas += 21500

                if (params.gasMultiplier) {
                    gas = Math.floor(gas * params.gasMultiplier)
                } else if (this.config && this.config.gasMultiplier) {
                    gas = Math.floor(gas * this.config.gasMultiplier)
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
                    gas
                })
            }
            let txparams: any = {
                from,
                value,
                gas,
                gasPrice
            }
            if (!gasPrice) {
                let { maxPriorityFeePerGas } = params
                try {
                    const fee: string = await new Promise((resolve, reject) =>
                        (this.web3.currentProvider as any).send(
                            {
                                method: 'eth_maxPriorityFeePerGas',
                                params: [],
                                jsonrpc: '2.0',
                                id: new Date().getTime()
                            },
                            (err, res) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(res.result)
                                }
                            }
                        )
                    )
                    const { maxFeePerGas } = params
                    if (!maxPriorityFeePerGas) {
                        maxPriorityFeePerGas = fee
                    }
                    txparams = {
                        from,
                        value,
                        gas,
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
                    gas,
                    gasPrice
                }
            }
            const receipt = await tx
                .send(txparams)
                .on('sent', tx => {
                    if (params.progress) {
                        params.progress({
                            stage: 'sent',
                            args: this.searchMethodInputs(name, args),
                            tx,
                            method: name,
                            from,
                            value,
                            contractName: this.contractName,
                            contractAddress: this.address,
                            gas
                        })
                    }
                })
                .on('transactionHash', async txHash => {
                    if (params.progress) {
                        const tx = await this.web3.eth.getTransaction(txHash)
                        params.progress({
                            stage: 'txHash',
                            args: this.searchMethodInputs(name, args),
                            txHash,
                            gasPrice: tx.gasPrice,
                            method: name,
                            from,
                            value,
                            contractName: this.contractName,
                            contractAddress: this.address,
                            gas: tx.gas
                        })
                    }
                })
            if (params.progress) {
                params.progress({
                    stage: 'receipt',
                    args: this.searchMethodInputs(name, args),
                    receipt,
                    method: name,
                    from,
                    value,
                    contractName: this.contractName,
                    contractAddress: this.address,
                    gas
                })
            }

            return receipt
        } catch (err) {
            const mappedArgs = this.searchMethod(name, args).inputs.map((input, i) => {
                return {
                    name: input.name,
                    value: args[i]
                }
            })
            throw new KeeperError(`
                ${'-'.repeat(40)}\n
                Sending transaction "${name}" on contract "${this.contractName}" failed.\n
                Error: ${err.message}\n
                From: ${from}\n
                Parameters: ${JSON.stringify(mappedArgs, null, 2)}\n
                ${'-'.repeat(40)}
            `)
        }
    }

    public async call<T extends any>(
        name: string,
        args: any[],
        from?: string
    ): Promise<T> {
        if (!this.contract.methods[name]) {
            throw new Error(`Method ${name} is not part of contract ${this.contractName}`)
        }
        try {
            const method = this.contract.methods[name](...args)
            return await method.call(from ? { from } : null)
        } catch (err) {
            throw new KeeperError(
                `Calling method "${name}" on contract "${this.contractName}" failed. Args: ${args} - ${err}`
            )
        }
    }

    private searchMethod(methodName: string, args: any[] = []) {
        const methods = this.contract.options.jsonInterface
            .map(method => ({
                ...method,
                signature: (method as any).signature
            }))
            .filter((method: any) => method.name === methodName)
        const foundMethod =
            methods.find(({ inputs }) => inputs.length === args.length) || methods[0]
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
