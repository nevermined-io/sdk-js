import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper/contracts/ContractBase'

/**
 * Pro submodule of Nevermined.
 */
export class Provider extends Instantiable {
    /**
     * Returns the instance of Provider.
     * @returns {@link Provider}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Provider> {
        const instance = new Provider()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Add a new provider in the registry for a did.
     *
     * @param did - Identifier of the entity created
     * @param address - New provider address in the list of providers.
     * @param from - Sender account address.
     * @returns {@link true} if the call succeeded.
     */
    public async add(
        did: string,
        address: string,
        from: Account,
        params?: TxParameters
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.addProvider(
            did,
            address,
            from.getId(),
            params
        )
        return true
    }

    /**
     * Remove a provider in the registry for a did.
     * @param did - Identifier of the entity created
     * @param address - New provider address in the list of providers.
     * @param from - Sender account address.
     * @returns {@link true} if the call succeeded.
     */
    public async remove(
        did: string,
        address: string,
        from: Account,
        params?: TxParameters
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.removeProvider(
            did,
            address,
            from.getId(),
            params
        )
        return true
    }

    /**
     * List the provider addresses for a did.
     * @param did - Identifier of the entity created
     */
    public async list(did: string) {
        return await this.nevermined.keeper.didRegistry.getProviders(did)
    }
}
