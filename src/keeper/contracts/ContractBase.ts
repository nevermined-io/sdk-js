import { Contract } from 'web3-eth-contract'
import { TransactionReceipt } from 'web3-core'
import ContractHandler from '../ContractHandler'

import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import Account from '../../nevermined/Account'

export abstract class ContractBase extends Instantiable {
    protected static instance = null

    public contractName: string

    protected contract: Contract = null

    get address() {
        return this.contract.options.address
    }

    constructor(contractName: string, private optional: boolean = false) {
        super()
        this.contractName = contractName
    }

    public async getEventData(eventName: string, options: any) {
        if (!this.contract.events[eventName]) {
            throw new Error(
                `Event "${eventName}" not found on contract "${this.contractName}"`
            )
        }
        return this.contract.getPastEvents(eventName, options)
    }

    public getPastEvents(eventName: string, filter: { [key: string]: any }) {
        return this.getEventData(eventName, {
            filter,
            fromBlock: 0,
            toBlock: 'latest'
        })
    }

    public getAddress(): string {
        return this.contract.options.address
    }

    public getSignatureOfMethod(methodName: string): string {
        const foundMethod = this.searchMethod(methodName)
        return foundMethod.signature
    }

    public getInputsOfMethod(methodName: string): any[] {
        const foundMethod = this.searchMethod(methodName)
        return foundMethod.inputs
    }

    protected async init(config: InstantiableConfig) {
        this.setInstanceConfig(config)
        const contractHandler = new ContractHandler(config)
        this.contract = await contractHandler.get(this.contractName, this.optional)
    }

    protected async getFromAddress(from?: string): Promise<string> {
        if (!from) {
            ;[from] = await this.web3.eth.getAccounts()
        }
        return from
    }

    protected async sendFrom(
        name: string,
        args: any[],
        from?: Account,
        value?: string
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

    protected async send(
        name: string,
        from: string,
        args: any[],
        value?: string
    ): Promise<TransactionReceipt> {
        if (!this.contract.methods[name]) {
            throw new Error(
                `Method "${name}" is not part of contract "${this.contractName}"`
            )
        }

        // Logger.log(name, args)
        const method = this.contract.methods[name]
        try {
            const tx = method(...args)
            let gas = await tx.estimateGas(args, {
                from,
                value
            })

            if (value) gas += 21500

            const receipt = await tx.send({
                from,
                value,
                gas
            })

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

    protected async call<T extends any>(
        name: string,
        args: any[],
        from?: string
    ): Promise<T> {
        if (!this.contract.methods[name]) {
            throw new Error(`Method ${name} is not part of contract ${this.contractName}`)
        }
        // Logger.log(name)
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

    protected getEvent(eventName: string, filter: { [key: string]: any }) {
        if (!this.contract.events[eventName]) {
            throw new Error(
                `Event ${eventName} is not part of contract ${this.contractName}`
            )
        }
        return this.nevermined.keeper.utils.eventHandler.getEvent(this, eventName, filter)
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
}

export default ContractBase
