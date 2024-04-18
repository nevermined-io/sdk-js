import { InstantiableConfig } from '../../Instantiable.abstract'
import { DDO } from '../../ddo/DDO'
import { AssetError, DDOError } from '../../errors/NeverminedErrors'
import { RoyaltyScheme } from '../../keeper/contracts/royalties/RoyaltyScheme.abstract'
import { AssetAttributes } from '../../models/AssetAttributes'
import { NvmAccount } from '../../models/NvmAccount'
import { TxParameters } from '../../models/Transactions'
import { apiPath } from '../../services/metadata/MetadataService'
import {
  MetaData,
  NvmConfigVersions,
  ServiceNFTAccess,
  ServiceNFTSales,
  ServiceType,
} from '../../types/DDOTypes'
import { Babysig } from '../../types/GeneralTypes'
import {
  AssetPublicationOptions,
  DIDResolvePolicy,
  PublishMetadataOptions,
  PublishOnChainOptions,
  RoyaltyKind,
} from '../../types/MetadataTypes'
import { didZeroX } from '../../utils/ConversionTypeHelpers'
import { SubscribablePromise } from '../../utils/SubscribablePromise'
import { Nevermined } from '../Nevermined'
import { CreateProgressStep, OrderProgressStep, UpdateProgressStep } from '../ProgressSteps'
import { Providers } from '../Provider'
import { SignatureUtils } from '../utils/SignatureUtils'
import { RegistryBaseApi } from './RegistryBaseApi'

/**
 * Attributes defining the royalties model attached to the asset
 */
export interface RoyaltyAttributes {
  royaltyKind: RoyaltyKind
  scheme: RoyaltyScheme
  amount: number
}

/**
 * It gets the on-chain royalties scheme
 * @param nvm Nevermined instance
 * @param kind The type of royalty
 * @returns The royalty scheme
 */
export function getRoyaltyScheme(nvm: Nevermined, kind: RoyaltyKind): RoyaltyScheme | undefined {
  if (kind == RoyaltyKind.Standard) {
    return nvm.keeper.royalties.standard
  } else if (kind == RoyaltyKind.Curve) {
    return nvm.keeper.royalties.curve
  }
}

/**
 * It gets a `RoyaltyAttributes` instance
 * @param nvm Nevermined instance
 * @param kind The type of royalty
 * @param amount The amount of royalties to get in the secondary market
 * @returns The RoyaltyAttributes instance
 */
export function getRoyaltyAttributes(nvm: Nevermined, kind: RoyaltyKind, amount: number) {
  return {
    scheme: getRoyaltyScheme(nvm, kind),
    royaltyKind: kind,
    amount,
  } as RoyaltyAttributes
}

/**
 * Nevermined Assets API. It allows the registration and management of digital assets in a
 * Nevermined digital ecosystem.
 * You can find more information about you can do in a Nevermined information here:
 * {@link https://docs.nevermined.io/docs/architecture/what-can-i-do}
 */
export class AssetsApi extends RegistryBaseApi {
  /**
   * Utilities about the providers associated to an asset
   */
  public providers: Providers

  /**
   * Creates a new AssetsApi
   * @param config - Configuration of the Nevermined instance
   * @returns {@link AssetsApi}
   */
  constructor(config: InstantiableConfig) {
    super()
    this.servicePlugin = AssetsApi.getServicePlugin(config)
    this.setInstanceConfig(config)
    this.providers = new Providers(config)
  }

  /**
   * Returns a DDO by DID. Depending of the resolution policy it prioritize the Metadata API or Immutable urls.
   * @param did - Decentralized ID.
   * @param policy - It specifies the resolve policy to apply. It allows to select that priorities during the asset resolution via Metadata API or Immutable URLs (IPFS, Filecoin, etc)
   * @returns {@link DDO}
   */
  public async resolve(
    did: string,
    policy: DIDResolvePolicy = DIDResolvePolicy.NoRegistry,
  ): Promise<DDO> {
    return this.resolveAsset(did, policy)
  }

  /**
   * Registers a new asset in Nevermined.
   * You can find more information about how different data is stored in Nevermined here:
   * {@link https://docs.nevermined.io/docs/architecture/nevermined-data}
   *
   * @param assetAttributes - Attributes describing the asset
   * @param publicationOptions - Allows to specify the publication options of the off-chain and the on-chain data. @see {@link PublishOnChainOptions} and {@link PublishMetadataOptions}
   * @param publisherAccount - The account publishing the asset
   * @param txParams - Optional transaction parameters
   * @returns The metadata of the asset created (DDO)
   *
   * @returns {@link DDO}
   */
  public create(
    assetAttributes: AssetAttributes,
    publisherAccount: NvmAccount,
    publicationOptions: AssetPublicationOptions = {
      metadata: PublishMetadataOptions.OnlyMetadataAPI,
      did: PublishOnChainOptions.DIDRegistry,
    },
    txParams?: TxParameters,
  ): SubscribablePromise<CreateProgressStep, DDO> {
    return this.registerNeverminedAsset(
      assetAttributes,
      publisherAccount,
      publicationOptions,
      undefined,
      txParams,
    )
  }

  /**
   * Given a DID, updates the metadata associated to the asset. It also can upload this metadata to a remote decentralized stored depending on the `publishMetadata` parameter.
   *
   * @example
   * ```ts
   * const ddoUpdated = await nevermined.assets.update(
   *      ddo.shortId(),
   *      updatedMetadata,
   *      publisher,
   *      PublishMetadata.IPFS
   * )
   * ```
   *
   * @param did - Decentralized ID representing the unique id of an asset in a Nevermined network.
   * @param metadata - Metadata describing the asset
   * @param publisherAccount - Account of the user updating the metadata
   * @param publishMetadata - It allows to specify where to store the metadata
   * @param txParams - Optional transaction parameters
   * @returns {@link DDO} The DDO updated
   */
  public update(
    did: string,
    metadata: MetaData,
    publisherAccount: NvmAccount,
    publishMetadata: PublishMetadataOptions = PublishMetadataOptions.OnlyMetadataAPI,
    txParams?: TxParameters,
  ): SubscribablePromise<UpdateProgressStep, DDO> {
    return this.updateAsset(did, metadata, publisherAccount, publishMetadata, txParams)
  }

  /**
   * Start the purchase/order of an access service. Starts by signing the service agreement
   * then sends the request to the publisher via the service endpoint (Node http service).
   * If the access service to purchase is having associated some price, it will make the payment
   * for that service.
   * @param did - Unique identifier of the asset to order
   * @param serviceReference - The service to order. By default is the access service, but it can be specified the service.index to refer a different specific service
   * @param consumerAccount - The account of the user ordering the asset
   * @param txParams - Optional transaction parameters
   * @returns The agreement ID identifying the order
   */
  public order(
    did: string,
    serviceReference: ServiceType | number = 'access',
    consumerAccount: NvmAccount,
    txParams?: TxParameters,
  ): SubscribablePromise<OrderProgressStep, string> {
    return this.orderAsset(did, serviceReference, consumerAccount, txParams)
  }

  /**
   * Having previously ordered an "access" service (referenced via an "agreementId").
   * This method allows to download the assets associated to that service.
   * @param agreementId  - The unique identifier of the order placed for a service
   * @param did - Unique identifier of the asset ordered
   * @param serviceReference - The service to download. By default is the access service, but it can be specified the service.index to refer a different specific service
   * @param consumerAccount - The account of the user who ordered the asset and is downloading the files
   * @param resultPath - Where the files will be downloaded
   * @param fileIndex - The file to download. If not given or is -1 it will download all of them.
   * @param buyer - Key which represent the buyer
   * @param babysig - An elliptic curve signature
   * @returns The result path or true if everything went okay
   */
  public async access(
    agreementId: string,
    did: string,
    serviceReference: ServiceType | number,
    consumerAccount: NvmAccount,
    resultPath?: string,
    fileIndex = -1,
    buyer?: string,
    babysig?: Babysig,
  ): Promise<string | true> {
    const ddo = await this.resolve(did)
    const { attributes } = ddo.findServiceByType('metadata')
    let service
    if (typeof serviceReference === 'number') {
      service = ddo.findServiceByIndex(serviceReference)
    } else {
      service = ddo.findServiceByType(serviceReference)
    }
    const { files } = attributes.main

    if (!files) {
      throw new AssetError('No files found in the metadata')
    }

    const serviceEndpoint = service.serviceEndpoint
      ? service.serviceEndpoint
      : this.nevermined.services.node.getAccessEndpoint()

    this.logger.log('Consuming files')

    resultPath = resultPath
      ? `${resultPath}/datafile.${ddo.shortId()}.${service.index}/`
      : undefined

    await this.nevermined.services.node.consumeService(
      did,
      agreementId,
      serviceEndpoint,
      consumerAccount,
      files,
      resultPath,
      fileIndex,
      undefined,
      buyer,
      babysig,
    )
    this.logger.log('Files consumed')

    if (resultPath) {
      return resultPath
    }
    return true
  }

  /**
   * Returns the owner of an asset.
   * @param did - Decentralized ID.
   * @returns The address of the owner of the asset
   */
  public async owner(did: string): Promise<string> {
    return this.nevermined.keeper.didRegistry.getDIDOwner(didZeroX(did))
  }

  /**
   * Returns the owner of an asset.
   * @param did - Decentralized ID.
   * @returns The address of the owner of the asset
   */
  public async ownerSignature(did: string): Promise<string> {
    const ddo = await this.resolve(did)
    const checksum = ddo.checksum(didZeroX(did))
    const { creator, signatureValue } = ddo.proof
    const signer = await SignatureUtils.recoverSignerAddress(checksum, signatureValue)

    if (signer.toLowerCase() !== creator.toLowerCase()) {
      this.logger.warn(
        `Owner of ${ddo.id} doesn't match. Expected ${creator} instead of ${signer}.`,
      )
    }

    return creator
  }

  /**
   * Returns the assets owned by an address
   * @param owner - The address to check
   * @returns List of DIDs owned by the address
   */
  public async ownerAssets(owner: string): Promise<string[]> {
    return this.nevermined.keeper.didRegistry.getAttributesByOwner(owner)
  }

  /**
   * Transfer ownership of an asset.
   * @param did - Asset DID.
   * @param newOwner - Ethereum address of the new owner of the DID.
   * @param owner - Account owning the DID and doing the transfer of ownership
   * @param newUserId - User Id of the new user getting the ownership of the asset
   * @param txParams - Transaction parameters
   * @returns Returns transaction receipt.
   */
  public async transferOwnership(
    did: string,
    newOwner: string,
    owner: NvmAccount,
    newUserId?: string,
    txParams?: TxParameters,
  ) {
    // const owner = await this.nevermined.assets.owner(did)
    const ownerAddress = owner.getAddress()
    const ddo = await this.resolveAsset(did)

    ddo.proof = await ddo.generateProof(newOwner)
    const checksum = ddo.getProofChecksum()

    const versions = ddo._nvm.versions
    let lastIndex = versions.length
    versions.map((v) => (v.id > lastIndex ? (lastIndex = v.id) : false))
    const ddoVersion: NvmConfigVersions = {
      id: lastIndex + 1,
      updated: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
      checksum: checksum,
    }
    versions.push(ddoVersion)

    const updatedDDO = JSON.parse(JSON.stringify(ddo).replaceAll(ownerAddress, newOwner))
    if (newUserId) {
      updatedDDO._nvm.userId = newUserId
    }

    updatedDDO._nvm.versions = versions
    updatedDDO.updated = ddoVersion.updated

    await this.nevermined.services.metadata.updateDDO(did, updatedDDO)

    return this.nevermined.keeper.didRegistry.transferDIDOwnership(did, newOwner, owner, txParams)
  }

  /**
   * Returns the assets of a consumer.
   * @param consumerAccount - Consumer address.
   * @returns List of DIDs.
   */
  public async consumerAssets(consumerAccount: string): Promise<string[]> {
    return (
      await this.nevermined.keeper.conditions.accessCondition.getGrantedDidByConsumer(
        consumerAccount,
      )
    ).map(({ did }) => did)
  }

  public async retire(did: string) {
    return this.nevermined.services.metadata.delete(did)
  }

  /**
   * It allows to download of the files attached to the asset by their owner or provider.
   * This method only can be called successfully by the owner of the asset or a provider.
   *
   * @param did - The Decentralized Identifier of the asset.
   * @param ownerAccount - The receiver account owner
   * @param resultPath - Path to be the files downloader
   * @param fileIndex - The index of the file
   * @param serviceType - Service type. 'access' by default
   * @param buyer - Key which represent the buyer
   * @param babysig - An elliptic curve signature
   * @return Status, path destination if resultPath is provided
   */
  public async download(
    did: string,
    ownerAccount: NvmAccount,
    resultPath?: string,
    fileIndex = -1,
    serviceType: ServiceType = 'access',
    buyer?: string,
    babysig?: Babysig,
  ) {
    const ddo = await this.resolve(did)
    const { attributes } = ddo.findServiceByType('metadata')
    const { files } = attributes.main

    if (!files) {
      throw new AssetError('No files found in the metadata')
    }

    let serviceEndpoint, index
    if (ddo.serviceExists(serviceType)) {
      const service = ddo.findServiceByType(serviceType)
      serviceEndpoint = service.serviceEndpoint
      index = service.index
    } else {
      serviceEndpoint = `${this.config.marketplaceUri}/${apiPath}/${did}`
      index = 0
    }

    if (!serviceEndpoint) {
      throw new AssetError(
        'Consume asset failed, service definition is missing the `serviceEndpoint`.',
      )
    }

    this.logger.log('Consuming files')

    resultPath = resultPath ? `${resultPath}/datafile.${ddo.shortId()}.${index}/` : undefined

    const accessToken = await this.nevermined.utils.jwt.getDownloadGrantToken(
      ddo.id,
      ownerAccount,
      buyer,
      babysig,
    )
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    }
    return this.nevermined.services.node.downloadService(files, resultPath, fileIndex, headers)
  }

  /**
   * It grants permissions to an account for a specific asset represented by a DID.
   * Only can be called by the asset owner.
   * @param did - The unique identifier of the assert
   * @param address - The account to grant the permissions
   * @param ownerAccount - Account sending the request. It must be the owner of the asset
   * @param txParams  - Transaction parameters
   */
  public async grantPermissions(
    did: string,
    address: string,
    ownerAccount: NvmAccount,
    txParams?: TxParameters,
  ) {
    return await this.nevermined.keeper.didRegistry.grantPermission(
      did,
      address,
      ownerAccount,
      txParams,
    )
  }

  /**
   * It revokes permissions to an account for a specific asset represented by a DID.
   * Only can be called by the asset owner.
   * @param did - The unique identifier of the assert
   * @param address - The account to revoke the permissions
   * @param ownerAccount - Account sending the request. It must be the owner of the asset
   * @param txParams  - Transaction parameters
   */
  public async revokePermissions(
    did: string,
    address: string,
    ownerAccount: NvmAccount,
    txParams?: TxParameters,
  ) {
    return await this.nevermined.keeper.didRegistry.revokePermission(
      did,
      address,
      ownerAccount,
      txParams,
    )
  }

  /**
   * Checks if an account with a specific address has permissions to a specific asset represented by a DID
   * @param did - The unique identifier of the asset to check the permissions
   * @param address - The address of the account to check the permissions
   * @returns True if the address has permissions on the asset
   */
  public async getPermissions(did: string, address: string) {
    return await this.nevermined.keeper.didRegistry.getPermission(did, address)
  }

  /**
   * Get the NFT contract address associated with a Nevermined asset.
   *
   * @example
   * ```ts
   * nevermined.assets.getNftContractAddress(ddo)
   * ```
   *
   * @param ddo - The DDO of the asset.
   * @param serviceType - The service type to use to get the NFT contract address.
   *
   * @throws DDOError - If the NFT contract address is not found in the DDO.
   * @returns The NFT contract address.
   */
  public getNftContractAddress(ddo: DDO, serviceType: ServiceType = 'nft-access') {
    const service = ddo.findServiceByType(serviceType)
    if (service.type === 'nft-access')
      return DDO.getNftContractAddressFromService(service as ServiceNFTAccess)
    else if (service.type === 'nft-sales')
      return DDO.getNftContractAddressFromService(service as ServiceNFTSales)
    throw new DDOError(`Unable to find NFT contract address in service ${serviceType}`)
  }
}
