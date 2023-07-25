import { Service, MetaData, ServiceAttributes, ServiceType } from '../ddo'
import { EncryptionMethod } from '../services'
import { ZeroAddress } from '../utils'
import { AssetPrice } from './AssetPrice'

export class AssetAttributes {
  static DEFAULT_ENCRYPTION_METHOD = 'PSK-RSA' as EncryptionMethod

  /**
   * Metadata describing the asset
   * @see {@link MetaData}
   */
  metadata: MetaData

  /**
   * When an asset is published in a Nevermined network, some internal Metadata attributes are encrypted so they can't be accessed.
   * This method allows to specify the encryption method to be used.
   * @see {@link EncryptionMethod}
   */
  encryptionMethod?: EncryptionMethod

  /**
   * List of services and their attributes offered by an asset.
   * @see {@link ServiceAttributes}
   */
  services?: ServiceAttributes[]

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

  /**
   * An asset can offer different services. Each service can have different conditions that need to be fulfilled
   * to provide that service. These conditions can expire if they are not fulfilled in a certain period of time.
   * This attribute allows to specify the timeouts for the access condition associated to the service.
   * Setting up a timeout of 0 means that the condition will never expire.
   * Setting a timeout greater than 0 means that the condition will expire after that number of blocks after the agreement is created.
   * This would allow to create an agreement that is not fulfilled after a certain period of time, the user can claim back funds locked if the condition is any.
   */
  fulfillAccessTimeout?: number

  /**
   * An asset can offer different services. Each service can have different conditions that need to be fulfilled
   * to provide that service. These conditions can expire if they are not fulfilled in a certain period of time.
   * This attribute allows to specify a period of time the condition can not be fullfilled
   * Setting up a timelock of 0 means that the condition can be fulfilled at any time.
   * Setting a timelock greater than 0 means that the condition can not be fulfilled until that number of blocks after the agreement is created are mined.
   * This would allow to create an agreement that can not fulfilled until certain period of time.
   */
  fulfillAccessTimelock?: number

  static defaultValues = {
    encryptionMethod: AssetAttributes.DEFAULT_ENCRYPTION_METHOD, // The default encryption method for the internal metadata attributes is PSK-RSA
    services: [
      {
        serviceType: 'access' as ServiceType,
        price: new AssetPrice().setTokenAddress(process.env.TOKEN_ADDRESS || ZeroAddress), // It means there is no payment required
      },
    ], // By default it will be added an access service
    predefinedAssetServices: [] as Service[], // By default there in additional services to add to the asset
    providers: [], // By default there are no addresses registered as providers for the asset
    appId: '', // No appId by default
    fulfillAccessTimeout: 90, // By default the access condition will never expire
    fulfillAccessTimelock: 0, // By default the access condition can be fulfilled at any time
  }

  static getInstance(assetAttributes: AssetAttributes): Required<AssetAttributes> {
    return { ...AssetAttributes.defaultValues, ...assetAttributes }
  }
}
