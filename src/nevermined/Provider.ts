import { Account } from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper'

/**
 * Providers API that allows the basic management of the provider accounts associated to an asset.
 */
export class Providers extends Instantiable {
    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
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
