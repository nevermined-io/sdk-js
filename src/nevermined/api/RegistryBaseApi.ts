import { NVMBaseApi } from "./NVMBaseApi"
import { Service, ServicePlugin, ServiceType } from "../../ddo/Service"
import { AccessService, NFTAccessService, NFTSalesService } from "../AccessService"
import { ServiceAaveCredit } from "../../keeper/contracts/defi/Service"
import { InstantiableConfig } from "../../Instantiable.abstract"
import { MetaData, Account, CreateProgressStep, DDO } from "../.."
import { NvmConfigVersions } from "../../ddo/NvmConfig"
import { ServiceAgreementTemplate } from "../../ddo/ServiceAgreementTemplate"
import { TxParameters } from "../../keeper/contracts/ContractBase"
import { EncryptionMethod } from "../../metadata/Metadata"
import AssetRewards from "../../models/AssetRewards"
import { NFTAttributes } from "../../models/NFTAttributes"
import { SubscribablePromise, fillConditionsWithDDO, zeroX, generateId } from "../../utils"
import DID from "../DID"
import { PublishMetadata, AssetsApi } from "./AssetsApi"
import { OrderProgressStep, UpdateProgressStep } from "../ProgessSteps"
import { AssetError } from "../../errors/AssetError"

export enum DIDResolvePolicy {
    ImmutableFirst,
    MetadataAPIFirst,
    OnlyImmutable,
    OnlyMetadataAPI
}

export abstract class RegistryBaseApi extends NVMBaseApi {

    public servicePlugin: { [key: string]: ServicePlugin<Service> }

    protected static getServicePlugin(config: InstantiableConfig) {
        return {
            access: new AccessService(
                config,
                config.nevermined.keeper.templates.accessTemplate
            ),
            compute: config.nevermined.keeper.templates.escrowComputeExecutionTemplate,
            'nft-sales': new NFTSalesService(config),
            'nft-access': new NFTAccessService(config),
            'aave-credit': config.nevermined.keeper.templates
                .aaveCreditTemplate as ServicePlugin<ServiceAaveCredit>
        }
    }

    protected registerAsset(
        metadata: MetaData,
        publisher: Account,
        encryptionMethod: EncryptionMethod = 'PSK-RSA',
        assetRewards: AssetRewards | undefined,
        serviceTypes: ServiceType[],
        predefinedAssetServices: Service[] = [],
        nftAttributes?: NFTAttributes,
        erc20TokenAddress?: string,
        providers: string[] = [this.config.neverminedNodeAddress],
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Registering Asset')
        return new SubscribablePromise(async observer => {
            const { neverminedNodeUri: neverminedNodeUri } = this.config
            const { didRegistry } = this.nevermined.keeper
            assetRewards = assetRewards || new AssetRewards()
            erc20TokenAddress = erc20TokenAddress || this.nevermined.token.getAddress()

            // create ddo itself
            const ddo = DDO.getInstance(metadata.userId, publisher.getId(), appId)

            if (predefinedAssetServices.length > 0) {
                ddo.service = [...predefinedAssetServices].reverse() as Service[]
            }

            let publicKey
            if (encryptionMethod === 'PSK-ECDSA') {
                publicKey = this.nevermined.node.getEcdsaPublicKey()
            } else {
                publicKey = await this.nevermined.node.getRsaPublicKey()
            }

            this.logger.debug('Adding Authorization Service')
            await ddo.addService(
                DDO.createAuthorizationService(
                    neverminedNodeUri,
                    publicKey,
                    encryptionMethod
                )
            )

            this.logger.debug('Adding Metadata Service')
            metadata.main = await ddo.addDefaultMetadataService(metadata, nftAttributes)

            for (const name of serviceTypes) {
                const plugin = this.servicePlugin[name]
                if (plugin) {
                    await ddo.addService(
                        await plugin.createService(
                            publisher,
                            metadata,
                            assetRewards,
                            erc20TokenAddress
                        )
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

            for (const name of serviceTypes) {
                const service = ddo.findServiceByType(name)
                const { nftContractAddress, amount, nftTransfer, duration } =
                    nftAttributes || {}
                const sat: ServiceAgreementTemplate =
                    service.attributes.serviceAgreementTemplate
                sat.conditions = fillConditionsWithDDO(
                    sat.conditions,
                    ddo,
                    assetRewards,
                    erc20TokenAddress,
                    nftContractAddress,
                    publisher.getId(),
                    amount,
                    nftTransfer,
                    duration
                )
            }

            this.logger.log('Conditions filled')
            observer.next(CreateProgressStep.ConditionsFilled)

            this.logger.log('Encrypting files')
            observer.next(CreateProgressStep.EncryptingFiles)

            let encryptedFiles
            if (!['workflow'].includes(metadata.main.type)) {
                const encryptedFilesResponse = await this.nevermined.node.encrypt(
                    ddo.id,
                    JSON.stringify(metadata.main.files),
                    new String(encryptionMethod)
                )
                encryptedFiles = JSON.parse(encryptedFilesResponse)['hash']
            }

            let serviceEndpoint = this.nevermined.metadata.getServiceEndpoint(
                DID.parse(ddo.id)
            )

            await ddo.updateService(this.nevermined, {
                type: 'metadata',
                index: 0,
                serviceEndpoint,
                attributes: {
                    // Default values
                    curation: {
                        rating: 0,
                        numVotes: 0
                    },
                    // Overwrites defaults
                    ...metadata,
                    encryptedFiles,
                    // Cleaning not needed information
                    main: {
                        ...metadata.main,
                        files: metadata.main.files?.map((file, index) => ({
                            ...file,
                            index,
                            url: undefined
                        }))
                    } as any
                }
            } as Service)

            this.logger.log('Files encrypted')
            observer.next(CreateProgressStep.FilesEncrypted)

            const checksum = ddo.getProofChecksum()

            const ddoVersion: NvmConfigVersions = {
                id: 0,
                updated: ddo.created,
                checksum,
                immutableUrl: ''
            }
            ddo._nvm.versions.push(ddoVersion)

            if (publishMetadata != PublishMetadata.OnlyMetadataAPI) {
                observer.next(CreateProgressStep.DdoStoredImmutable)
                try {
                    ({url: ddoVersion.immutableUrl, backend: ddoVersion.immutableBackend } = 
                        await this.nevermined.node.publishImmutableContent(ddo, publishMetadata))
                } catch (error) {
                    this.logger.log(`Unable to publish immutable content`)
                }
                
            }

            if (ddoVersion.immutableBackend)
                ddo._nvm.versions[0] = ddoVersion

            observer.next(CreateProgressStep.RegisteringDid)

            // On-chain asset registration
            if (nftAttributes) {
                this.logger.log('Registering Mintable Asset', ddo.id)
                
                const nftAttributesWithoutRoyalties = { ...nftAttributes}
                nftAttributesWithoutRoyalties.royaltyAttributes = undefined
                if (nftAttributes.ercType === 721) {
                    await didRegistry.registerMintableDID721(
                        didSeed,
                        checksum,
                        providers || [this.config.neverminedNodeAddress],
                        publisher.getId(),
                        nftAttributesWithoutRoyalties,
                        serviceEndpoint,
                        ddoVersion.immutableUrl,
                        AssetsApi.DEFAULT_REGISTRATION_ACTIVITY_ID,
                        txParams
                    )
                } else {
                    await didRegistry.registerMintableDID(
                        didSeed,
                        checksum,
                        providers || [this.config.neverminedNodeAddress],
                        publisher.getId(),
                        nftAttributesWithoutRoyalties,
                        serviceEndpoint,
                        ddoVersion.immutableUrl,
                        AssetsApi.DEFAULT_REGISTRATION_ACTIVITY_ID,                     
                        txParams
                    )
                }
                
                if (nftAttributes.royaltyAttributes != undefined) {
                    observer.next(CreateProgressStep.SettingRoyaltyScheme)
                    await didRegistry.setDIDRoyalties(
                        ddo.shortId(),
                        nftAttributes.royaltyAttributes.scheme.address,
                        publisher.getId(),
                        txParams
                    )
                    observer.next(CreateProgressStep.SettingRoyalties)
                    await nftAttributes.royaltyAttributes.scheme.setRoyalty(
                        ddo.shortId(),
                        nftAttributes.royaltyAttributes.amount,
                        publisher,
                        txParams
                    )
                }
            } else {
                this.logger.log('Registering Asset', ddo.id)
                await didRegistry.registerDID(
                    didSeed,
                    checksum,
                    providers || [this.config.neverminedNodeAddress],
                    publisher.getId(),
                    serviceEndpoint,
                    ddoVersion.immutableUrl,
                    AssetsApi.DEFAULT_REGISTRATION_ACTIVITY_ID,                     
                    txParams
                )
            }

            this.logger.log('Storing DDO', ddo.id)
            observer.next(CreateProgressStep.StoringDdo)
            const storedDdo = await this.nevermined.metadata.storeDDO(ddo)
            this.logger.log('DDO stored')
            observer.next(CreateProgressStep.DdoStored)

            const ddoStatus = await this.nevermined.metadata.status(storedDdo.id)
            if (ddoStatus.external) {
                serviceEndpoint = ddoStatus.external.url
            }

            this.logger.log('Asset registered')
            observer.next(CreateProgressStep.DidRegistered)

            return storedDdo
        })
    }

    protected updateAsset(
        did: string,
        metadata: MetaData,
        publisher: Account,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<UpdateProgressStep, DDO> {

        this.logger.log('Updating Asset')
        return new SubscribablePromise(async observer => {
            observer.next(UpdateProgressStep.ResolveAsset)
            const ddo = await this.resolveAsset(did)
            

            observer.next(UpdateProgressStep.UpdateMetadataInDDO)
            const metadataService = ddo.findServiceByType('metadata')
            
            metadataService.attributes.additionalInformation = metadata.additionalInformation
            metadataService.attributes.main = metadata.main
            
            await ddo.replaceService(
                metadataService.index,
                metadataService
            )

            observer.next(UpdateProgressStep.CalculateChecksum)
            ddo.proof = await ddo.generateProof(publisher.getId())
            const checksum = ddo.getProofChecksum()

            observer.next(UpdateProgressStep.AddVersionInDDO)
            
            let lastIndex = 0
            ddo._nvm.versions.map(v => v.id > lastIndex? lastIndex = v.id : false)
            const ddoVersion: NvmConfigVersions = {
                id: lastIndex + 1,
                updated: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
                checksum: checksum
            }
            ddo._nvm.versions.push(ddoVersion)
            ddo.updated = ddoVersion.updated           

            if (publishMetadata != PublishMetadata.OnlyMetadataAPI) {
                observer.next(UpdateProgressStep.StoringImmutableDDO)
                try {
                    ({url: ddoVersion.immutableUrl, backend: ddoVersion.immutableBackend } = 
                        await this.nevermined.node.publishImmutableContent(ddo, publishMetadata))
                    if (ddoVersion.immutableBackend)
                        ddo._nvm.versions[lastIndex+1] = ddoVersion                    
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
                txParams
            )

            observer.next(UpdateProgressStep.StoringDDOMarketplaceAPI)
            const storedDdo = await this.nevermined.metadata.updateDDO(ddo.id, ddo)
            
            observer.next(UpdateProgressStep.AssetUpdated)

            return storedDdo
        })

    }

    /**
     * Returns a DDO by DID. Depending of the resolution policy it prioritize the Metadata API or Immutable urls.
     * @param did - Decentralized ID.
     * @param policy - It specifies the resolve policy to apply. It allows to select that priorities during the asset resolution via Metadata API or Immutable URLs (IPFS, Filecoin, etc)
     * @returns {@link DDO}
     */
     protected async resolveAsset(did: string, policy: DIDResolvePolicy = DIDResolvePolicy.ImmutableFirst): Promise<DDO> {
        const { serviceEndpoint, immutableUrl } =
            await this.nevermined.keeper.didRegistry.getAttributesByDid(did)

        if (policy === DIDResolvePolicy.OnlyImmutable)
            return await this.nevermined.metadata.retrieveDDOFromImmutableBackend(immutableUrl)
        else if (policy === DIDResolvePolicy.OnlyMetadataAPI)
            return await this.nevermined.metadata.retrieveDDOByUrl(serviceEndpoint)
        else if (policy === DIDResolvePolicy.ImmutableFirst) {
            try {             
                return await this.nevermined.metadata.retrieveDDOFromImmutableBackend(immutableUrl)                
            } catch (error) {
                this.logger.debug(`Unable to fetch DDO from immutable data store`)
            }
            return await this.nevermined.metadata.retrieveDDOByUrl(serviceEndpoint)
        } else { // DIDResolvePolicy.MetadataAPIFirst
            try {
                return await this.nevermined.metadata.retrieveDDOByUrl(serviceEndpoint)
            } catch (error) {
                this.logger.debug(`Unable to fetch DDO metadata api`)
            }
            return await this.nevermined.metadata.retrieveDDOFromImmutableBackend(immutableUrl)
        }         
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
        params?: TxParameters
    ): SubscribablePromise<OrderProgressStep, string> {
        return new SubscribablePromise(async observer => {
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
                a => observer.next(a)
            )

            if (!agreementId) {
                throw new AssetError(`Error creating ${serviceType} agreement`)
            }

            return agreementId
        })
    }




}