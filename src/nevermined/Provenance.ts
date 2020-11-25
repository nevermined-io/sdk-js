import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

/**
 * Provenance submodule of Nevermined.
 */
export class Provenance extends Instantiable {
    /**
     * Returns the instance of Provenance.
     * @return {Promise<Provenance>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Provenance> {
        const instance = new Provenance()
        instance.setInstanceConfig(config)

        return instance
    }
}
