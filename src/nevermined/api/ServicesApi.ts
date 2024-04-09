import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { Bookmarks } from '../../services/metadata/Bookmarks'
import { MarketplaceApi } from '../../services/metadata/MarketplaceAPI'
import { MetadataService } from '../../services/metadata/MetadataService'
import { Permissions } from '../../services/metadata/Permissions'
import { Profiles } from '../../services/metadata/Profiles'
import { NeverminedNode } from '../../services/node/NeverminedNode'

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
}
