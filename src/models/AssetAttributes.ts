import { Service, ServiceType, MetaData } from '../ddo'
import { EncryptionMethod } from '../services'
import { AssetPrice } from './AssetPrice'

export class AssetAttributes {
  static DEFAULT_ENCRYPTION_METHOD = 'PSK-RSA' as EncryptionMethod

  /**
   * Metadata describing the asset
   * @see {@link MetaData}
   */
  metadata: MetaData

  /**
   * It allows to specify the price of an asset
   * @see {@link AssetPrice}
   */
  price?: AssetPrice

  /**
   * When an asset is published in a Nevermined network, some internal Metadata attributes are encrypted so they can't be accessed.
   * This method allows to specify the encryption method to be used.
   * @see {@link EncryptionMethod}
   */
  encryptionMethod?: EncryptionMethod

  /**
   * List of services offered by an asset.
   * @see {@link ServiceType}
   */
  serviceTypes?: ServiceType[]

  /**
   * List of additional asset services to be included as part of an asset
   * @see {@link Service}
   */
  predefinedAssetServices?: Service[]

  /**
   * A provider of an asset identify the public address of an account with some privileges over that asset.
   * Typically these permissions are granted to Nevermined Nodes to allow them to give access to some services without
   * the direct interaction of the final user.
   * Here a user publishing an asset can define a list of all the addresses with these permissions.
   * Typically just the address of one Nevermined Node trusted by the user.
   */
  providers?: string[]

  /**
   * Unique identifier of the application/domain/vertical where the asset belong to.
   * That asset association typically helps to search and filter between assets part of a domain via Marketplace API
   */
  appId?: string

  static defaultValues = {
    price: new AssetPrice(), // It means there is no payment required
    encryptionMethod: AssetAttributes.DEFAULT_ENCRYPTION_METHOD, // The default encryption method for the internal metadata attributes is PSK-RSA
    serviceTypes: ['access'] as ServiceType[], // By default it will be added an access service
    predefinedAssetServices: [] as Service[], // By default there in additional services to add to the asset
    providers: [], // By default there are no addresses registered as providers for the asset
    appId: '', // No appId by default
  }

  static getInstance(assetAttributes: AssetAttributes): Required<AssetAttributes> {
    return { ...AssetAttributes.defaultValues, ...assetAttributes }
  }
}
