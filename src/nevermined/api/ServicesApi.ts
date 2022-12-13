import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { MarketplaceApi } from '../../services/metadata/MarketplaceAPI'
import { MetadataService } from '../../services/metadata/MetadataService'
import { NeverminedNode } from '../../services/node/NeverminedNode'
import { Profiles } from '../../services/metadata/Profiles'
import { Permissions } from '../../services/metadata/Permissions'
import { AaveCredit } from '../../services/aave/AaveCredit'
import { Bookmarks } from '../../services/metadata/Bookmarks'
import { Faucet } from '../../services/faucet/Faucet'

/**
 * Utils internal submodule of Nevermined.
 */
export class ServicesApi extends Instantiable {

    /**
     * Nevermined Node Service
     */
    public node: NeverminedNode

    /**
     * Nevermined Node Service
     */
     public marketplace: MarketplaceApi

    /**
     * Marketplace instance.
     */
     public metadata: MetadataService

    /**
     * Permissions service
     */
     public permissions: Permissions

     /**
      * Profiles instance
      */
     public profiles: Profiles
 
     /**
      * Bookmarks instance
      */
     public bookmarks: Bookmarks
 
     /**
      * Metadata instance.
      */
     public faucet: Faucet

     /**
      * Aave instance.
      */
      public aave: AaveCredit

    /**
     * Returns the instance of Services.
     *
     * @returns {@link Services}
     */
    public static async getInstance(config: InstantiableConfig): Promise<ServicesApi> {
        const instance = new ServicesApi()
        instance.setInstanceConfig(config)

        instance.node = new NeverminedNode(config)
        instance.marketplace = new MarketplaceApi(config)
        instance.metadata = new MetadataService(config)
        instance.profiles = new Profiles(config)
        instance.bookmarks = new Bookmarks(config)
        instance.permissions = new Permissions(config)
        instance.faucet = new Faucet(config)
        instance.aave = await AaveCredit.getInstance(config)

        return instance
    }
}
