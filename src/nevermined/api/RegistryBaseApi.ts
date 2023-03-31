import {
  Service,
  ServicePlugin,
  ServiceType,
  NvmConfigVersions,
  ServiceAgreementTemplate,
  DDO,
  MetaData,
} from '../../ddo'
import { AssetAttributes, NFTAttributes } from '../../models'
import { Account, CreateProgressStep, DID } from '../../nevermined'
import { TxParameters, ServiceAaveCredit, DEFAULT_REGISTRATION_ACTIVITY_ID } from '../../keeper'
import { SubscribablePromise, zeroX, generateId, fillConditionsWithDDO } from '../../utils'
import { PublishMetadata } from './AssetsApi'
import { OrderProgressStep, UpdateProgressStep } from '../ProgressSteps'
import { AssetError } from '../../errors/AssetError'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { AccessService, NFTSalesService, NFTAccessService } from '../AccessService'

/**
 * It described the policy to be used when resolving an asset. It has the following options:
 * * ImmutableFirst - It checks if there is a reference to an immutable data-store (IPFS, Filecoin, etc) on-chain. If that's the case uses the URL to resolve the Metadata. If not try to resolve the metadata using the URL of the Metadata/Marketplace API
 * * MetadataAPIFirst - Try to resolve the metadata from the Marketplace/Metadata API, if it can't tries to resolve using the immutable url
 * * OnlyImmutable - Try to resolve the metadata only from the immutable data store URL
 * * OnlyMetadataAPI - Try to resolve the metadata only from the Marketplace/Metadata API
 */
export enum DIDResolvePolicy {
  ImmutableFirst,
  MetadataAPIFirst,
  OnlyImmutable,
  OnlyMetadataAPI,
}

/**
 * Abstract class proving common functionality related with Assets registration.
 */
export abstract class RegistryBaseApi extends Instantiable {
  public servicePlugin: { [key: string]: ServicePlugin<Service> }

  /**
   * It registers a new asset in a Nevermined network. This method is protected and not exposed
   * via the Nevermined APIs directly. It must accessed via the `assets`, `compute`, and `nfts` APIs.
   *
   * @param assetAttributes - Attributes describing the asset
   * @param publisher - The account publishing the asset
   * @param publishMetadata - Allows to specify if the metadata should be stored in different backends
   * @param nftAttributes -Attributes describing the NFT (ERC-721) associated to the asset
   * @param txParams - Optional transaction parameters
   * @returns The metadata of the asset created (DDO)
   */
  protected registerNeverminedAsset(
    assetAttributes: AssetAttributes,
    publisher: Account,
    publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
    nftAttributes?: NFTAttributes,
    txParams?: TxParameters,
  ): SubscribablePromise<CreateProgressStep, DDO> {
    this.logger.log('Registering Asset')
    return new SubscribablePromise(async (observer) => {
      const { neverminedNodeUri } = this.config
      const { didRegistry } = this.nevermined.keeper
      const tokenAddress =
        assetAttributes.price.getTokenAddress() || this.nevermined.utils.token.getAddress()

      // create ddo itself
      const ddo = DDO.getInstance(
        assetAttributes.metadata.userId,
        publisher.getId(),
        assetAttributes.appId,
      )

      if (assetAttributes.predefinedAssetServices.length > 0) {
        ddo.service = [...assetAttributes.predefinedAssetServices].reverse() as Service[]
      }

      let publicKey
      if (assetAttributes.encryptionMethod === 'PSK-ECDSA') {
        publicKey = this.nevermined.services.node.getEcdsaPublicKey()
      } else {
        publicKey = await this.nevermined.services.node.getRsaPublicKey()
      }

      this.logger.debug('Adding Authorization Service')
      await ddo.addService(
        DDO.createAuthorizationService(
          neverminedNodeUri,
          publicKey,
          assetAttributes.encryptionMethod,
        ),
      )

      this.logger.debug('Adding Metadata Service')
      assetAttributes.metadata.main = await ddo.addDefaultMetadataService(
        assetAttributes.metadata,
        nftAttributes,
      )

      for (const name of assetAttributes.serviceTypes) {
        const plugin = this.servicePlugin[name]
        if (plugin) {
          await ddo.addService(
            await plugin.createService(
              publisher,
              assetAttributes.metadata,
              assetAttributes.price,
              tokenAddress,
            ),
          )
        }
      }

      this.logger.log('Services Added')
      observer.next(CreateProgressStep.ServicesAdded)

      ddo.service.sort((a, b) => (a.index > b.index ? 1 : -1))

      this.logger.log('Generating proof')
      observer.next(CreateProgressStep.GeneratingProof)

      await ddo.addProof(publisher.getId())

      const didSeed = await ddo.generateDidSeed(ddo.proof.checksum)
      await ddo.assignDid(didSeed, didRegistry, publisher)

      await ddo.addSignature(this.nevermined, publisher.getId())

      this.logger.log('Proof generated')
      observer.next(CreateProgressStep.ProofGenerated)

      for (const name of assetAttributes.serviceTypes) {
        const service = ddo.findServiceByType(name)
        const { nftContractAddress, amount, nftTransfer, duration } = nftAttributes || {}
        const sat: ServiceAgreementTemplate = service.attributes.serviceAgreementTemplate
        sat.conditions = fillConditionsWithDDO(
          sat.conditions,
          ddo,
          assetAttributes.price,
          tokenAddress,
          nftContractAddress,
          publisher.getId(),
          amount,
          nftTransfer,
          duration,
        )
      }

      this.logger.log('Conditions filled')
      observer.next(CreateProgressStep.ConditionsFilled)

      this.logger.log('Encrypting files')
      observer.next(CreateProgressStep.EncryptingFiles)

      let encryptedFiles, encryptedAttributes
      if (!['workflow'].includes(assetAttributes.metadata.main.type)) {
        const encryptedFilesResponse = await this.nevermined.services.node.encrypt(
          ddo.id,
          JSON.stringify(assetAttributes.metadata.main.files),
          new String(assetAttributes.encryptionMethod),
        )
        encryptedFiles = JSON.parse(encryptedFilesResponse)['hash']

        if (assetAttributes.metadata.main.type === 'service') {
          const encryptedServiceAttributesResponse = await this.nevermined.services.node.encrypt(
            ddo.id,
            JSON.stringify(assetAttributes.metadata.main.webService.internalAttributes),
            new String(assetAttributes.encryptionMethod),
          )
          encryptedAttributes = JSON.parse(encryptedServiceAttributesResponse)['hash']
          assetAttributes.metadata.main.webService.encryptedAttributes = encryptedAttributes
          assetAttributes.metadata.main.webService.internalAttributes = undefined
        }
      }

      let serviceEndpoint = this.nevermined.services.metadata.getServiceEndpoint(DID.parse(ddo.id))

      await ddo.updateService(this.nevermined, {
        type: 'metadata',
        index: 0,
        serviceEndpoint,
        attributes: {
          // Default values
          curation: {
            isListed: true,
            rating: 0,
            numVotes: 0,
          },
          // Overwrites defaults
          ...assetAttributes.metadata,
          encryptedFiles,
          // Cleaning not needed information
          main: {
            ...assetAttributes.metadata.main,
            files: assetAttributes.metadata.main.files?.map((file, index) => ({
              ...file,
              index,
              url: undefined,
            })),
          } as any,
        },
      } as Service)

      this.logger.log('Files encrypted')
      observer.next(CreateProgressStep.FilesEncrypted)

      const checksum = ddo.getProofChecksum()

      const ddoVersion: NvmConfigVersions = {
        id: 0,
        updated: ddo.created,
        checksum,
        immutableUrl: '',
      }
      ddo._nvm.versions.push(ddoVersion)

      if (publishMetadata != PublishMetadata.OnlyMetadataAPI) {
        observer.next(CreateProgressStep.DdoStoredImmutable)
        try {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;({ url: ddoVersion.immutableUrl, backend: ddoVersion.immutableBackend } =
            await this.nevermined.services.node.publishImmutableContent(ddo, publishMetadata))
        } catch (error) {
          this.logger.log(`Unable to publish immutable content`)
        }
      }

      if (ddoVersion.immutableBackend) ddo._nvm.versions[0] = ddoVersion

      observer.next(CreateProgressStep.RegisteringDid)

      // On-chain asset registration
      if (nftAttributes) {
        this.logger.log('Registering Mintable Asset', ddo.id)

        const nftAttributesWithoutRoyalties = { ...nftAttributes }
        nftAttributesWithoutRoyalties.royaltyAttributes = undefined
        if (nftAttributes.ercType === 721) {
          await didRegistry.registerMintableDID721(
            didSeed,
            nftAttributes.nftContractAddress,
            checksum,
            assetAttributes.providers || [this.config.neverminedNodeAddress],
            publisher.getId(),
            nftAttributesWithoutRoyalties,
            serviceEndpoint,
            ddoVersion.immutableUrl,
            DEFAULT_REGISTRATION_ACTIVITY_ID,
            txParams,
          )
        } else {
          await didRegistry.registerMintableDID(
            didSeed,
            nftAttributes.nftContractAddress,
            checksum,
            assetAttributes.providers || [this.config.neverminedNodeAddress],
            publisher.getId(),
            nftAttributesWithoutRoyalties,
            serviceEndpoint,
            ddoVersion.immutableUrl,
            DEFAULT_REGISTRATION_ACTIVITY_ID,
            txParams,
          )
        }

        if (nftAttributes.royaltyAttributes != undefined) {
          observer.next(CreateProgressStep.SettingRoyaltyScheme)
          await didRegistry.setDIDRoyalties(
            ddo.shortId(),
            nftAttributes.royaltyAttributes.scheme.address,
            publisher.getId(),
            txParams,
          )
          observer.next(CreateProgressStep.SettingRoyalties)
          await nftAttributes.royaltyAttributes.scheme.setRoyalty(
            ddo.shortId(),
            nftAttributes.royaltyAttributes.amount,
            publisher,
            txParams,
          )
        }
      } else {
        this.logger.log('Registering Asset', ddo.id)
        await didRegistry.registerDID(
          didSeed,
          checksum,
          assetAttributes.providers || [this.config.neverminedNodeAddress],
          publisher.getId(),
          serviceEndpoint,
          ddoVersion.immutableUrl,
          DEFAULT_REGISTRATION_ACTIVITY_ID,
          txParams,
        )
      }

      this.logger.log('Storing DDO', ddo.id)
      observer.next(CreateProgressStep.StoringDdo)
      const storedDdo = await this.nevermined.services.metadata.storeDDO(ddo)
      this.logger.log('DDO stored')
      observer.next(CreateProgressStep.DdoStored)

      const ddoStatus = await this.nevermined.services.metadata.status(storedDdo.id)
      if (ddoStatus.external) {
        serviceEndpoint = ddoStatus.external.url
      }

      this.logger.log('Asset registered')
      observer.next(CreateProgressStep.DidRegistered)

      return storedDdo
    })
  }

  /**
   * Returns a DDO by DID. Depending of the resolution policy it prioritize the Metadata API or Immutable urls.
   * @param did - Decentralized ID.
   * @param policy - It specifies the resolve policy to apply. It allows to select that priorities during the asset resolution via Metadata API or Immutable URLs (IPFS, Filecoin, etc)
   * @returns {@link DDO}
   */
  protected async resolveAsset(
    did: string,
    policy: DIDResolvePolicy = DIDResolvePolicy.ImmutableFirst,
  ): Promise<DDO> {
    const { serviceEndpoint, immutableUrl } =
      await this.nevermined.keeper.didRegistry.getAttributesByDid(did)

    if (policy === DIDResolvePolicy.OnlyImmutable)
      return await this.nevermined.services.metadata.retrieveDDOFromImmutableBackend(immutableUrl)
    else if (policy === DIDResolvePolicy.OnlyMetadataAPI)
      return await this.nevermined.services.metadata.retrieveDDOByUrl(serviceEndpoint)
    else if (policy === DIDResolvePolicy.ImmutableFirst) {
      try {
        return await this.nevermined.services.metadata.retrieveDDOFromImmutableBackend(immutableUrl)
      } catch (error) {
        this.logger.debug(`Unable to fetch DDO from immutable data store`)
      }
      return await this.nevermined.services.metadata.retrieveDDOByUrl(serviceEndpoint)
    } else {
      // DIDResolvePolicy.MetadataAPIFirst
      try {
        return await this.nevermined.services.metadata.retrieveDDOByUrl(serviceEndpoint)
      } catch (error) {
        this.logger.debug(`Unable to fetch DDO metadata api`)
      }
      return await this.nevermined.services.metadata.retrieveDDOFromImmutableBackend(immutableUrl)
    }
  }

  /**
   * Given a DID, updates the metadata associated to the asset. It also can upload this metadata to a remote decentralized stored depending on the `publishMetadata` parameter.
   * @param did - Decentralized ID representing the unique id of an asset in a Nevermined network.
   * @param metadata - Metadata describing the asset
   * @param publisher - Account of the user updating the metadata
   * @param publishMetadata - It allows to specify where to store the metadata
   * @param txParams - Optional transaction parameters
   * @returns {@link DDO} The DDO updated
   */
  protected updateAsset(
    did: string,
    metadata: MetaData,
    publisher: Account,
    publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
    txParams?: TxParameters,
  ): SubscribablePromise<UpdateProgressStep, DDO> {
    this.logger.log('Updating Asset')
    return new SubscribablePromise(async (observer) => {
      observer.next(UpdateProgressStep.ResolveAsset)
      const ddo = await this.resolveAsset(did)

      observer.next(UpdateProgressStep.UpdateMetadataInDDO)
      let metadataService = ddo.findServiceByType('metadata')

      metadataService = {
        ...metadataService,
        attributes: {
          ...metadataService.attributes,
          main: metadata.main,
          additionalInformation: metadata.additionalInformation,
          curation: metadata.curation,
        },
      }

      await ddo.replaceService(metadataService.index, metadataService)

      observer.next(UpdateProgressStep.CalculateChecksum)
      ddo.proof = await ddo.generateProof(publisher.getId())
      const checksum = ddo.getProofChecksum()

      observer.next(UpdateProgressStep.AddVersionInDDO)

      let lastIndex = 0
      ddo._nvm.versions.map((v) => (v.id > lastIndex ? (lastIndex = v.id) : false))
      const ddoVersion: NvmConfigVersions = {
        id: lastIndex + 1,
        updated: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
        checksum: checksum,
      }
      ddo._nvm.versions.push(ddoVersion)
      ddo.updated = ddoVersion.updated

      if (publishMetadata != PublishMetadata.OnlyMetadataAPI) {
        observer.next(UpdateProgressStep.StoringImmutableDDO)
        try {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;({ url: ddoVersion.immutableUrl, backend: ddoVersion.immutableBackend } =
            await this.nevermined.services.node.publishImmutableContent(ddo, publishMetadata))
          if (ddoVersion.immutableBackend) ddo._nvm.versions[lastIndex + 1] = ddoVersion
        } catch (error) {
          this.logger.log(`Unable to publish immutable content`)
        }
      }

      observer.next(UpdateProgressStep.UpdatingAssetOnChain)
      await this.nevermined.keeper.didRegistry.updateMetadataUrl(
        ddo.id,
        checksum,
        publisher.getId(),
        metadataService.serviceEndpoint,
        ddoVersion.immutableUrl,
        txParams,
      )

      observer.next(UpdateProgressStep.StoringDDOMarketplaceAPI)
      const storedDdo = await this.nevermined.services.metadata.updateDDO(ddo.id, ddo)

      observer.next(UpdateProgressStep.AssetUpdated)

      return storedDdo
    })
  }

  /**
   * Given a DID, updates the metadata associated to the asset allowing to list or unlist it. It also can upload this metadata to a remote decentralized stored depending on the `publishMetadata` parameter.
   * In a Nevermined environment, when an asset is unlisted, it is not possible to be found and accessed by any user.
   *
   * @param did - Decentralized ID representing the unique id of an asset in a Nevermined network.
   * @param list - Needs the asset to be listed or unlisted
   * @param publisher - Account of the user updating the metadata
   * @param publishMetadata - It allows to specify where to store the metadata
   * @param txParams - Optional transaction parameters
   * @returns {@link DDO} The DDO updated
   */
  public switchListing(
    did: string,
    list: boolean,
    publisher: Account,
    publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
    txParams?: TxParameters,
  ): SubscribablePromise<UpdateProgressStep, DDO> {
    this.logger.log('Switching Asset Publication')
    return new SubscribablePromise(async (observer) => {
      observer.next(UpdateProgressStep.ResolveAsset)
      const ddo = await this.resolveAsset(did)

      const metadataService = ddo.findServiceByType('metadata')
      if (!metadataService.attributes.curation) {
        metadataService.attributes.curation = {
          isListed: list,
          rating: 0,
          numVotes: 0,
        }
      } else if (
        metadataService.attributes.curation.isListed &&
        metadataService.attributes.curation.isListed === list
      ) {
        this.logger.log('Asset was already having the same listing status')
        return ddo
      }

      metadataService.attributes.curation = {
        ...metadataService.attributes.curation,
        isListed: list,
      }
      return await this.updateAsset(
        did,
        metadataService.attributes,
        publisher,
        publishMetadata,
        txParams,
      )
    })
  }

  /**
   * Given a DID, it adds a vote to the asset curation information.
   *
   * @param did - Decentralized ID representing the unique id of an asset in a Nevermined network.
   * @param newRating - New average rating of the asset
   * @param numVotesAdded - Number of new votes added to the rating, typically just 1
   * @param publisher - Account of the user updating the metadata
   * @param publishMetadata - It allows to specify where to store the metadata
   * @param txParams - Optional transaction parameters
   * @returns {@link DDO} The DDO updated
   */
  public addRating(
    did: string,
    newRating: number,
    numVotesAdded = 1,
    publisher: Account,
    publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
    txParams?: TxParameters,
  ): SubscribablePromise<UpdateProgressStep, DDO> {
    this.logger.log('Adding votes to the asset')
    return new SubscribablePromise(async (observer) => {
      if (newRating < 0 || newRating > 1) throw new Error('Rating must be between 0 and 1')

      observer.next(UpdateProgressStep.ResolveAsset)
      const ddo = await this.resolveAsset(did)

      const metadataService = ddo.findServiceByType('metadata')
      if (!metadataService.attributes.curation) {
        metadataService.attributes.curation = {
          isListed: true,
          rating: newRating,
          numVotes: numVotesAdded,
        }
      }

      metadataService.attributes.curation = {
        ...metadataService.attributes.curation,
        rating: newRating,
        numVotes: metadataService.attributes.curation.numVotes + numVotesAdded,
      }
      return await this.updateAsset(
        did,
        metadataService.attributes,
        publisher,
        publishMetadata,
        txParams,
      )
    })
  }

  /**
   * Start the purchase/order of an asset's service. Starts by signing the service agreement
   * then sends the request to the publisher via the service endpoint (Node http service).
   * @param did - Decentralized ID.
   * @param serviceType - Service.
   * @param consumer - Consumer account.
   * @returns The agreement ID.
   */
  public orderAsset(
    did: string,
    serviceType: ServiceType,
    consumer: Account,
    params?: TxParameters,
  ): SubscribablePromise<OrderProgressStep, string> {
    return new SubscribablePromise(async (observer) => {
      const agreementIdSeed = zeroX(generateId())
      const ddo = await this.resolveAsset(did)

      const { keeper } = this.nevermined
      const service = ddo.findServiceByType(serviceType)
      const templateName = service.attributes.serviceAgreementTemplate.contractName

      const template = keeper.getAccessTemplateByName(templateName)

      this.logger.log(`Creating ${serviceType} agreement and paying`)
      const agreementId = await template.createAgreementWithPaymentFromDDO(
        agreementIdSeed,
        ddo,
        template.params(consumer),
        consumer,
        consumer,
        undefined,
        params,
        (a) => observer.next(a),
      )

      if (!agreementId) {
        throw new AssetError(`Error creating ${serviceType} agreement`)
      }

      return agreementId
    })
  }

  /**
   * Initialities the default Nevermined service plugins and return that instance
   * @param config Nevermined config
   * @returns The Nevermined Service Plugin instance
   */
  protected static getServicePlugin(config: InstantiableConfig) {
    return {
      access: new AccessService(config, config.nevermined.keeper.templates.accessTemplate),
      compute: config.nevermined.keeper.templates.escrowComputeExecutionTemplate,
      'nft-sales': new NFTSalesService(config),
      'nft-access': new NFTAccessService(config),
      'aave-credit': config.nevermined.keeper.templates
        .aaveCreditTemplate as ServicePlugin<ServiceAaveCredit>,
    }
  }
}
