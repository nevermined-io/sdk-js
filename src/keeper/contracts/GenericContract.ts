import ContractBase, { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import ContractHandler from '../ContractHandler'
import { Contract } from 'web3-eth-contract'
import { TransactionReceipt } from 'web3-core'

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
        console.log(`GenericContract :: INIT :: ${config.artifactsFolder}`)
        this.contract = await contractHandler.get(
            this.contractName,
            optional,
            this.fixedAddress,
            config.artifactsFolder
        )
    }

    public async call<T extends any>(
        name: string,
        args: any[],
        from?: string
    ): Promise<T> {
        return super.call(name, args, from)
    }

    public async send(
        name: string,
        from: string,
        args: any[],
        params: TxParameters = {}
    ): Promise<TransactionReceipt> {
        return super.send(name, from, args, params)
    }

    public getContract(): Contract {
        return this.contract
    }
}
