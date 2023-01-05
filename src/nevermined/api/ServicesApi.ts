import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import {
    MarketplaceApi,
    MetadataService,
    NeverminedNode,
    Profiles,
    Permissions,
    AaveCredit,
    Bookmarks
} from '../../services'

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
     * Aave instance.
     */
    public aave: AaveCredit

    /**
     * Creates a new ServicesApi
     * @param config - Configuration of the Nevermined instance
     * @returns {@link ServicesApi}
     */
    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)

        this.node = new NeverminedNode(config)
        this.marketplace = new MarketplaceApi(config)
        this.metadata = new MetadataService(config)
        this.profiles = new Profiles(config)
        this.bookmarks = new Bookmarks(config)
        this.permissions = new Permissions(config)
    }

    public async initializeAave() {
        this.aave = await AaveCredit.getInstance(this.instantiableConfig)
    }
}
