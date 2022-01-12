import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper/contracts/ContractBase'

/**
 * Pro submodule of Nevermined.
 */
export class Provider extends Instantiable {
    /**
     * Returns the instance of Provider.
     * @return {Promise<Provider>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Provider> {
        const instance = new Provider()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Add a new provider in the registry for a did.
     * @param  {string}           did     Identifier of the entity created
     * @param  {string}           address New provider address in the list of providers.
     * @param  {Account}          from    Sender account address.
     * @return {Promise<boolean>}         Success,
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
     * @param  {string}           did     Identifier of the entity created
     * @param  {string}           address New provider address in the list of providers.
     * @param  {Account}          from    Sender account address.
     * @return {Promise<boolean>}         Success,
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
     * @param  {string}           did     Identifier of the entity created
     */
    public async list(did: string) {
        return await this.nevermined.keeper.didRegistry.getProviders(did)
    }
}
