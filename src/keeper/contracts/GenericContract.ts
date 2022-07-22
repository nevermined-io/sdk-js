import ContractBase, { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import ContractHandler from '../ContractHandler'
import { ContractReceipt, ethers } from 'ethers'

export default class GenericContract extends ContractBase {
    protected fixedAddress: string

    public static async getInstance(
        config: InstantiableConfig,
        contractName: string,
        address?: string
    ): Promise<GenericContract> {
        const contract: GenericContract = new GenericContract(contractName, address)
        await contract.init(config)
        return contract
    }

    private constructor(contractName: string, address?: string) {
        super(contractName)
        this.fixedAddress = address
    }

    protected async init(config: InstantiableConfig, optional: boolean = false) {
        this.setInstanceConfig(config)

        const contractHandler = new ContractHandler(config)
        this.contract = await contractHandler.get(
            this.contractName,
            optional,
            this.fixedAddress,
            config.artifactsFolder
        )
    }

    public async call<T>(name: string, args: any[], from?: string): Promise<T> {
        return super.call(name, args, from)
    }

    public async send(
        name: string,
        from: string,
        args: any[],
        params: TxParameters = {}
    ): Promise<ContractReceipt> {
        return super.send(name, from, args, params)
    }

    public getContract(): ethers.Contract {
        return this.contract
    }
}
