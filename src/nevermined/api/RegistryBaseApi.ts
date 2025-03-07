// @ts-nocheck
import { formatUnits } from 'viem'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { generateId } from '../../common/helpers'
import { DEFAULT_ENCRYPTION_METHOD, ZeroAddress } from '../../constants/AssetConstants'
import { DDO } from '../../ddo/DDO'
import { AssetError, DDOError } from '../../errors/NeverminedErrors'
import { DEFAULT_REGISTRATION_ACTIVITY_ID } from '../../keeper/contracts/Provenance'
import { AssetAttributes } from '../../models/AssetAttributes'
import { AssetPrice } from '../../models/AssetPrice'
import { NFTAttributes } from '../../models/NFTAttributes'
import { NvmAccount } from '../../models/NvmAccount'
import { TxParameters } from '../../models/Transactions'
import {
  MetaData,
  NvmConfigVersions,
  PricedMetadataInformation,
  Service,
  ServicePlugin,
  ServiceType,
} from '../../types/DDOTypes'
import {
  AssetPublicationOptions,
  DIDResolvePolicy,
  PublishMetadataOptions,
  PublishOnChainOptions,
} from '../../types/MetadataTypes'
import { zeroX } from '../../utils/ConversionTypeHelpers'
import { SubscribablePromise } from '../../utils/SubscribablePromise'
import { AccessService, NFTAccessService, NFTSalesService } from '../AccessService'
import { DID } from '../DID'
import { CreateProgressStep, OrderProgressStep, UpdateProgressStep } from '../ProgressSteps'
import { SignatureUtils } from '../utils/SignatureUtils'

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
   * @param from - The account publishing the asset
   * @param publicationOptions - Allows to specify the publication options of the off-chain and the on-chain data. @see {@link PublishOnChainOptions} and {@link PublishMetadataOptions}
   * @param nftAttributes -Attributes describing the NFT (ERC-721) associated to the asset
   * @param txParams - Optional transaction parameters
   * @returns The metadata of the asset created (DDO)
   */
  protected registerNeverminedAsset(
    assetAttributes: AssetAttributes,
    from: NvmAccount,
    publicationOptions: AssetPublicationOptions,
    nftAttributes?: NFTAttributes,
    txParams?: TxParameters,
  ): SubscribablePromise<CreateProgressStep, DDO> {
    this.logger.log('Registering Asset')
    return new SubscribablePromise(async (observer) => {
      const { neverminedNodeUri } = this.config
      const { didRegistry } = this.nevermined.keeper

      // create ddo itself
      let ddo = DDO.getInstance(
        assetAttributes.metadata.userId as string,
        from.getId(),
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
      ddo.addService(
        DDO.createAuthorizationService(
          neverminedNodeUri,
          publicKey,
          assetAttributes.encryptionMethod,
        ),
      )

      this.logger.debug('Adding Metadata Service')
      assetAttributes.metadata.main = ddo.addDefaultMetadataService(
        assetAttributes.metadata,
        nftAttributes,
      )

      for (const serviceAttributes of assetAttributes.services) {
        const plugin = this.servicePlugin[serviceAttributes.serviceType]

        if (plugin) {
          const pricedData = serviceAttributes.price
            ? await this.getPriced(serviceAttributes.price)
            : undefined

          const serviceCreated = plugin.createService(
            from,
            assetAttributes.metadata,
            serviceAttributes,
            nftAttributes,
            pricedData,
          )
          ddo.addService(serviceCreated)
        }
      }

      ddo.reorderServices()

      this.logger.log('Services Added')
      observer.next(CreateProgressStep.ServicesAdded)

      this.logger.log('Generating proof')
      observer.next(CreateProgressStep.GeneratingProof)

      await ddo.addProof(from.getId())

      const didSeed = await ddo.generateDidSeed(ddo.proof.checksum)
      await ddo.assignDid(didSeed, didRegistry, from)
      ddo = DDO.findAndReplaceDDOAttribute(ddo, '{DID}', ddo.shortId())
      assetAttributes.metadata.main = ddo.findServiceByReference('metadata').attributes.main

      // TODO: Evaluate if we need to add the signature to the DDO
      // Removing it would save a wallet interaction during asset creation
      // await ddo.addSignature(this.nevermined, publisher.getId())

      this.logger.log('Proof generated')
      observer.next(CreateProgressStep.ProofGenerated)

      this.logger.log('Conditions filled')
      observer.next(CreateProgressStep.ConditionsFilled)

      this.logger.log('Encrypting files')
      observer.next(CreateProgressStep.EncryptingFiles)

      let encryptedFiles, encryptedAttributes
      if (!['workflow'].includes(assetAttributes.metadata.main.type)) {
        if (assetAttributes.metadata.main.files) {
          // If we have files to encrypt we encrypt them
          const encryptedFilesResponse = await this.nevermined.services.node.encrypt(
            ddo.id,
            JSON.stringify(assetAttributes.metadata.main.files),
            new String(assetAttributes.encryptionMethod),
          )
          encryptedFiles = JSON.parse(encryptedFilesResponse)['hash']
        }

        if (
          assetAttributes.metadata.main.type === 'service' ||
          assetAttributes.metadata.main.type === 'assistant' ||
          assetAttributes.metadata.main.type === 'agent'
        ) {
          try {
            const _attr = { ...assetAttributes.metadata.main.webService }
            assetAttributes.metadata.main.webService = DDO.parseDDOWebServiceAttributes(
              _attr,
              ddo.id,
            )

            if (
              assetAttributes.metadata.main.webService?.openEndpoints &&
              assetAttributes.metadata.main.webService?.openEndpoints.length > 0
            )
              assetAttributes.metadata.additionalInformation = {
                ...assetAttributes.metadata.additionalInformation,
                customData: {
                  ...assetAttributes.metadata.additionalInformation?.customData,
                  openApi: assetAttributes.metadata.main.webService?.openEndpoints[0],
                },
              }

            const encryptedServiceAttributesResponse = await this.nevermined.services.node.encrypt(
              ddo.id,
              JSON.stringify(assetAttributes.metadata.main.webService.internalAttributes),
              new String(assetAttributes.encryptionMethod),
            )
            encryptedAttributes = JSON.parse(encryptedServiceAttributesResponse)['hash']
            assetAttributes.metadata.main.webService.encryptedAttributes = encryptedAttributes
            assetAttributes.metadata.main.webService.internalAttributes = undefined
          } catch (error) {
            this.logger.log(`Unable to parse service attributes: ${error.message}`)
            throw new DDOError(`Unable to parse service attributes: ${error.message}`)
          }
        }
      }

      let serviceEndpoint = this.nevermined.services.metadata.getServiceEndpoint(DID.parse(ddo.id))

      ddo.updateMetadataService({
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
      const networkId = await this.nevermined.keeper.getNetworkId()
      ddo._nvm.networks = { [networkId]: true }

      if (publicationOptions.metadata != PublishMetadataOptions.OnlyMetadataAPI) {
        observer.next(CreateProgressStep.DdoStoredImmutable)
        try {
          // eslint-disable-next-line
          ;({ url: ddoVersion.immutableUrl, backend: ddoVersion.immutableBackend } =
            await this.nevermined.services.node.publishImmutableContent(
              ddo,
              publicationOptions.metadata,
            ))
        } catch (error) {
          this.logger.log(`Unable to publish immutable content`)
        }
      }

      if (ddoVersion.immutableBackend) ddo._nvm.versions[0] = ddoVersion

      observer.next(CreateProgressStep.RegisteringDid)

      // On-chain asset registration
      if (publicationOptions.did != PublishOnChainOptions.OnlyOffchain) {
        if (nftAttributes) {
          this.logger.log('Registering Mintable Asset', ddo.id)

          const nftAttributesWithoutRoyalties = { ...nftAttributes, royaltyAttributes: undefined }

          if (nftAttributes.ercType === 721) {
            await didRegistry.registerMintableDID721(
              didSeed,
              nftAttributes.nftContractAddress,
              checksum,
              assetAttributes.providers || [this.config.neverminedNodeAddress],
              from,
              nftAttributesWithoutRoyalties,
              serviceEndpoint,
              ddoVersion.immutableUrl,
              SignatureUtils.hash(DEFAULT_REGISTRATION_ACTIVITY_ID),
              txParams,
            )
          } else {
            await didRegistry.registerMintableDID(
              didSeed,
              nftAttributes.nftContractAddress,
              checksum,
              assetAttributes.providers || [this.config.neverminedNodeAddress],
              from,
              nftAttributesWithoutRoyalties,
              serviceEndpoint,
              ddoVersion.immutableUrl,
              SignatureUtils.hash(DEFAULT_REGISTRATION_ACTIVITY_ID),
              txParams,
            )
          }

          if (nftAttributes.royaltyAttributes != undefined) {
            this.logger.log(`Setting up royalties`)

            observer.next(CreateProgressStep.SettingRoyaltyScheme)
            await didRegistry.setDIDRoyalties(
              ddo.shortId(),
              nftAttributes.royaltyAttributes.scheme.address,
              from,
              txParams,
            )
            observer.next(CreateProgressStep.SettingRoyalties)
            await nftAttributes.royaltyAttributes.scheme.setRoyalty(
              ddo.shortId(),
              nftAttributes.royaltyAttributes.amount,
              from,
              txParams,
            )
          }
        } else {
          this.logger.log('Registering Asset', ddo.id)
          await didRegistry.registerDID(
            didSeed,
            checksum,
            assetAttributes.providers || [this.config.neverminedNodeAddress],
            from,
            serviceEndpoint,
            ddoVersion.immutableUrl,
            SignatureUtils.hash(DEFAULT_REGISTRATION_ACTIVITY_ID),
            txParams,
          )
        }
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
   * Given an asset DID it returns the metadata of that asset represented by a DDO object.
   * Depending of the resolution policy it prioritize fetching that Metadata from the Marketplace API or Immutable urls (like IPFS).
   * @param did - Decentralized ID.
   * @param policy - It specifies the resolve policy to apply. It allows to select that priorities during the asset resolution via Metadata API or Immutable URLs (IPFS, Filecoin, etc)
   * @returns {@link DDO}
   */
  protected async resolveAsset(
    did: string,
    policy: DIDResolvePolicy = DIDResolvePolicy.MetadataAPIFirst,
  ): Promise<DDO> {
    // We compose the metadata api url using the SDK config, we don't retrieve any DID information from the DIDRegistry
    if (policy === DIDResolvePolicy.NoRegistry) {
      return await this.nevermined.services.metadata.retrieveDDO(did, undefined)
    }

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
   * @param from - Account of the user updating the metadata
   * @param publishMetadataOptions - It allows to specify where to store the metadata
   * @param txParams - Optional transaction parameters
   * @returns {@link DDO} The DDO updated
   */
  protected updateAsset(
    did: string,
    metadata: MetaData,
    from: NvmAccount,
    publishMetadataOptions: PublishMetadataOptions = PublishMetadataOptions.OnlyMetadataAPI,
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

      const updatedAt = DDO.getNewDateFormatted()
      const nonce = Math.random()
      this.logger.debug(`Asset updatedAt ${updatedAt} and Nonce ${nonce} `)
      metadataService.attributes.main.updatedAt = updatedAt
      metadataService.attributes.main.nonce = nonce

      if (!['workflow'].includes(metadataService.attributes.main.type)) {
        const encryptedFilesResponse = await this.nevermined.services.node.encrypt(
          ddo.id,
          JSON.stringify(metadataService.attributes.main.files),
          new String(DEFAULT_ENCRYPTION_METHOD),
        )
        metadataService.attributes.encryptedFiles = JSON.parse(encryptedFilesResponse)['hash']

        if (
          (metadataService.attributes.main.type === 'service' ||
            metadataService.attributes.main.type === 'assistant' ||
            metadataService.attributes.main.type === 'agent') &&
          metadataService.attributes.main.webService.internalAttributes
        ) {
          const encryptedServiceAttributesResponse = await this.nevermined.services.node.encrypt(
            ddo.id,
            JSON.stringify(metadataService.attributes.main.webService.internalAttributes),
            new String(DEFAULT_ENCRYPTION_METHOD),
          )
          const encryptedAttributes = JSON.parse(encryptedServiceAttributesResponse)['hash']
          metadataService.attributes.main.webService.encryptedAttributes = encryptedAttributes
          metadataService.attributes.main.webService.internalAttributes = undefined
        }
      }

      ddo.replaceService(metadataService.index, metadataService)

      observer.next(UpdateProgressStep.CalculateChecksum)
      ddo.proof = await ddo.generateProof(from.getId())
      const checksum = ddo.getProofChecksum()

      observer.next(UpdateProgressStep.AddVersionInDDO)

      let lastIndex = 0
      ddo._nvm.versions.map((v) => (v.id > lastIndex ? (lastIndex = v.id) : false))
      const ddoVersion: NvmConfigVersions = {
        id: lastIndex + 1,
        updated: DDO.getNewDateFormatted(),
        checksum: checksum,
      }
      ddo._nvm.versions.push(ddoVersion)
      ddo.updated = ddoVersion.updated

      if (publishMetadataOptions != PublishMetadataOptions.OnlyMetadataAPI) {
        observer.next(UpdateProgressStep.StoringImmutableDDO)
        try {
          // eslint-disable-next-line
          ;({ url: ddoVersion.immutableUrl, backend: ddoVersion.immutableBackend } =
            await this.nevermined.services.node.publishImmutableContent(
              ddo,
              publishMetadataOptions,
            ))
          if (ddoVersion.immutableBackend) ddo._nvm.versions[lastIndex + 1] = ddoVersion

          observer.next(UpdateProgressStep.UpdatingAssetOnChain)
          await this.nevermined.keeper.didRegistry.updateMetadataUrl(
            ddo.id,
            checksum,
            from,
            metadataService.serviceEndpoint,
            ddoVersion.immutableUrl,
            txParams,
          )
        } catch (error) {
          this.logger.log(`Unable to publish immutable content`)
        }
      }

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
   * @param from - Account of the user updating the metadata
   * @param publishMetadata - It allows to specify where to store the metadata
   * @param txParams - Optional transaction parameters
   * @returns {@link DDO} The DDO updated
   */
  public list(
    did: string,
    list: boolean,
    from: NvmAccount,
    publishMetadata: PublishMetadataOptions = PublishMetadataOptions.OnlyMetadataAPI,
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
        from,
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
   * @param from - Account of the user updating the metadata
   * @param publishMetadata - It allows to specify where to store the metadata
   * @param txParams - Optional transaction parameters
   * @returns {@link DDO} The DDO updated
   */
  public addRating(
    did: string,
    newRating: number,
    numVotesAdded = 1,
    from: NvmAccount,
    publishMetadata: PublishMetadataOptions = PublishMetadataOptions.OnlyMetadataAPI,
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
      } else {
        metadataService.attributes.curation = {
          ...metadataService.attributes.curation,
          rating: newRating,
          numVotes: metadataService.attributes.curation.numVotes + numVotesAdded,
        }
      }

      return await this.updateAsset(
        did,
        metadataService.attributes,
        from,
        publishMetadata,
        txParams,
      )
    })
  }

  /**
   * Start the purchase/order of an asset's service. Starts by signing the service agreement
   * then sends the request to the publisher via the service endpoint (Node http service).
   *
   * @param did - Decentralized ID.
   * @param serviceReference - Service.
   * @param from - Consumer account.
   * @param txParams - Transaction parameters
   * @returns The agreement ID.
   */
  public orderAsset(
    did: string,
    serviceReference: ServiceType | number,
    from: NvmAccount,
    txParams?: TxParameters,
  ): SubscribablePromise<OrderProgressStep, string> {
    return new SubscribablePromise(async (observer) => {
      const agreementIdSeed = zeroX(generateId())
      const ddo = await this.resolveAsset(did)

      const { keeper } = this.nevermined

      const service = ddo.findServiceByReference(serviceReference)

      const templateName = service.attributes.serviceAgreementTemplate.contractName
      const template = keeper.getAccessTemplateByName(templateName)

      this.logger.log(`Creating ${serviceReference} agreement and paying`)
      const agreementId = await template.createAgreementWithPaymentFromDDO(
        agreementIdSeed,
        ddo,
        serviceReference,
        template.params(from),
        from,
        from,
        txParams,
        (a) => observer.next(a),
      )

      if (!agreementId) {
        throw new AssetError(`Error creating ${serviceReference} agreement`)
      }

      // Checking the agreementId was created on-chain with the correct DID associated to it
      const agreementData = await template.getAgreementData(agreementId)

      if (
        agreementData.accessConsumer === ZeroAddress ||
        agreementData.accessConsumer.toLowerCase() !== from.getId().toLowerCase()
      )
        throw new AssetError(
          `Agreement Id ${agreementId} not found on-chain. Agreement Data ${JSON.stringify(
            agreementData,
          )}`,
        )

      return agreementId
    })
  }

  /**
   * Initializes the default Nevermined service plugins and return that instance
   * @param config Nevermined config
   * @returns The Nevermined Service Plugin instance
   */
  protected static getServicePlugin(config: InstantiableConfig) {
    return {
      access: new AccessService(config, config.nevermined.keeper.templates.accessTemplate),
      compute: config.nevermined.keeper.templates.escrowComputeExecutionTemplate,
      'nft-sales': new NFTSalesService(config),
      'nft-access': new NFTAccessService(config),
    }
  }

  /**
   * It returns the priced metadata information of an asset
   * @param assetPrice the asset price
   * @returns {@link PricedMetadataInformation}
   */
  private async getPriced(assetPrice: AssetPrice | undefined): Promise<PricedMetadataInformation> {
    if (assetPrice === undefined) {
      return {
        attributes: {
          main: {
            price: '0',
          },
          additionalInformation: {
            priceHighestDenomination: 0,
          },
        },
      }
    }

    const erc20TokenAddress =
      assetPrice?.getTokenAddress() || this.nevermined.utils.token.getAddress()
    let decimals: number
    let symbol: string
    if (erc20TokenAddress === ZeroAddress) {
      decimals = 18
      symbol = 'ETH'
    } else {
      const token = await this.nevermined.contracts.loadErc20(erc20TokenAddress)
      decimals = await token.decimals()
      symbol = await token.symbol()
    }

    const price = assetPrice.getTotalPrice().toString()
    const priceHighestDenomination = +formatUnits(assetPrice.getTotalPrice(), decimals)
    return {
      attributes: {
        main: {
          price,
        },
        additionalInformation: {
          priceHighestDenomination,
          symbol,
          decimals,
          erc20TokenAddress,
        },
      },
    }
  }
}
