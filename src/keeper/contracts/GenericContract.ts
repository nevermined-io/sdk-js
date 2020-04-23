import ContractBase from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'

export default class GenericContract extends ContractBase {
    public static async getInstance(
        config: InstantiableConfig,
        contractName: string
    ): Promise<ContractBase> {
        const contract: GenericContract = new GenericContract(contractName)
        await contract.init(config)
        return contract
    }

    private constructor(contractName: string) {
        super(contractName)
    }
}
