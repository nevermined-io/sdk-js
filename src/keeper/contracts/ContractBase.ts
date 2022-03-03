import { Contract } from 'web3-eth-contract'
import { TransactionReceipt } from 'web3-core'
import ContractHandler from '../ContractHandler'

import Account from '../../nevermined/Account'
import { ContractEvent, EventHandler, SubgraphEvent } from '../../events'
import Web3 from 'web3'
import { Logger } from '../../utils'

export interface TxParameters {
    value?: string
    gas?: number
    gasMultiplier?: number
    gasPrice?: string
    maxPriorityFeePerGas?: string
    maxFeePerGas?: string
    progress?: (data: any) => void
}

export abstract class ContractBase {
    public contractName: string
    public contract: Contract = null
    public events: ContractEvent | SubgraphEvent = null

    protected web3: Web3
    protected logger: Logger

    public static gasMultiplier: number
    public static graphHttpUri: string

    get address() {
        return this.getAddress()
    }

    constructor(
        contractName: string,
        web3: Web3,
        logger: Logger,
        private optional: boolean = false
    ) {
        this.contractName = contractName
        this.web3 = web3
        this.logger = logger
    }

    public async getEventData(eventName: string, options: any) {
        if (!this.contract.events[eventName]) {
            throw new Error(
                `Event "${eventName}" not found on contract "${this.contractName}"`
            )
        }
        return this.contract.getPastEvents(eventName, options)
    }

    public async getPastEvents(eventName: string, filter: { [key: string]: any }) {
        const chainId = await this.web3.eth.net.getId()

        let fromBlock = 0
        const toBlock = 'latest'

        // Temporary workaround to work with mumbai
        // Infura as a 1000 blokcs limit on their api
        if (chainId === 80001) {
            const latestBlock = await this.web3.eth.getBlockNumber()
            fromBlock = latestBlock - 990
        }

        return this.getEventData(eventName, {
            filter,
            fromBlock,
            toBlock
        })
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

    protected async init(optional: boolean = false) {
        const contractHandler = new ContractHandler(this.web3, this.logger)
        this.contract = await contractHandler.get(this.contractName, optional)

        const eventEmitter = new EventHandler(this.web3)
        if (ContractBase.graphHttpUri) {
            this.events = SubgraphEvent.getInstance(
                this,
                eventEmitter,
                ContractBase.graphHttpUri
            )
        } else {
            this.events = ContractEvent.getInstance(this, eventEmitter, this.web3)
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
                } else if (ContractBase.gasMultiplier) {
                    gas = Math.floor(gas * ContractBase.gasMultiplier)
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
                    // no eip-1559 support
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
            this.logger.error('-'.repeat(40))
            this.logger.error(
                `Sending transaction "${name}" on contract "${this.contractName}" failed.`
            )
            this.logger.error(`Error: ${err.message}`)
            this.logger.error(`From: ${from}`)
            this.logger.error(`Parameters: ${JSON.stringify(mappedArgs, null, 2)}`)
            if (value) this.logger.error(`Value: ${value}`)
            this.logger.error('-'.repeat(40))
            throw err
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
            this.logger.error(
                `Calling method "${name}" on contract "${this.contractName}" failed. Args: ${args}`,
                err
            )
            throw err
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
            throw new Error(
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
