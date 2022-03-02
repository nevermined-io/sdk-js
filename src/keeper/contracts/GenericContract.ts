import ContractBase, { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import ContractHandler from '../ContractHandler'
import { Contract } from 'web3-eth-contract'
import { TransactionReceipt } from 'web3-core'
import Web3 from 'web3'
import { Logger } from '../../utils'

export default class GenericContract extends ContractBase {
    protected fixedAddress: string

    public static async getInstance(
        web3: Web3,
        logger: Logger,
        contractName: string,
        address?: string
    ): Promise<GenericContract> {
        const contract: GenericContract = new GenericContract(
            contractName,
            web3,
            logger,
            address
        )
        await contract.init()
        return contract
    }

    private constructor(
        contractName: string,
        web3: Web3,
        logger: Logger,
        address?: string
    ) {
        super(contractName, web3, logger)
        this.fixedAddress = address
    }

    protected async init(optional: boolean = false) {
        const contractHandler = new ContractHandler(this.web3, this.logger)
        this.contract = await contractHandler.get(
            this.contractName,
            optional,
            this.fixedAddress
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
