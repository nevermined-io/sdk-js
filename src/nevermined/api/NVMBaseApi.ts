import { MetaData, Account, CreateProgressStep, DDO } from "../.."
import { NvmConfigVersions } from "../../ddo/NvmConfig"
import { Service, ServicePlugin, ServiceType } from "../../ddo/Service"
import { ServiceAgreementTemplate } from "../../ddo/ServiceAgreementTemplate"
import { Instantiable, InstantiableConfig } from "../../Instantiable.abstract"
import { TxParameters } from "../../keeper/contracts/ContractBase"
import { ServiceAaveCredit } from "../../keeper/contracts/defi/Service"
import { EncryptionMethod } from "../../metadata/MetadataService"
import { AssetAttributes } from "../../models/AssetAttributes"
import AssetRewards from "../../models/AssetRewards"
import { NFTAttributes } from "../../models/NFTAttributes"
import { SubscribablePromise, fillConditionsWithDDO } from "../../utils"
import { AccessService, NFTAccessService, NFTSalesService } from "../AccessService"
import DID from "../DID"
import { PublishMetadata, AssetsApi } from "./AssetsApi"

export abstract class NVMBaseApi extends Instantiable {

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
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Registering Asset')
        return new SubscribablePromise(async observer => {
            const { neverminedNodeUri: neverminedNodeUri } = this.config
            const { didRegistry } = this.nevermined.keeper
            const tokenAddress = assetAttributes.price.getTokenAddress() || this.nevermined.token.getAddress()

            // create ddo itself
            const ddo = DDO.getInstance(assetAttributes.metadata.userId, publisher.getId(), assetAttributes.appId)

            if (assetAttributes.predefinedAssetServices.length > 0) {
                ddo.service = [...assetAttributes.predefinedAssetServices].reverse() as Service[]
            }

            let publicKey
            if (assetAttributes.encryptionMethod === 'PSK-ECDSA') {
                publicKey = this.nevermined.node.getEcdsaPublicKey()
            } else {
                publicKey = await this.nevermined.node.getRsaPublicKey()
            }

            this.logger.debug('Adding Authorization Service')
            await ddo.addService(
                DDO.createAuthorizationService(
                    neverminedNodeUri,
                    publicKey,
                    assetAttributes.encryptionMethod
                )
            )

            this.logger.debug('Adding Metadata Service')
            assetAttributes.metadata.main = await ddo.addDefaultMetadataService(assetAttributes.metadata, nftAttributes)
            
            for (const name of assetAttributes.serviceTypes) {
                const plugin = this.servicePlugin[name]
                if (plugin) {
                    await ddo.addService(
                        await plugin.createService(
                            publisher,
                            assetAttributes.metadata,
                            assetAttributes.price,
                            tokenAddress
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

            for (const name of assetAttributes.serviceTypes) {
                const service = ddo.findServiceByType(name)
                const { nftContractAddress, amount, nftTransfer, duration } =
                    nftAttributes || {}
                const sat: ServiceAgreementTemplate =
                    service.attributes.serviceAgreementTemplate
                sat.conditions = fillConditionsWithDDO(
                    sat.conditions,
                    ddo,
                    assetAttributes.price,
                    tokenAddress,
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
            if (!['workflow'].includes(assetAttributes.metadata.main.type)) {
                const encryptedFilesResponse = await this.nevermined.node.encrypt(
                    ddo.id,
                    JSON.stringify(assetAttributes.metadata.main.files),
                    new String(assetAttributes.encryptionMethod)
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
                    ...assetAttributes.metadata,
                    encryptedFiles,
                    // Cleaning not needed information
                    main: {
                        ...assetAttributes.metadata.main,
                        files: assetAttributes.metadata.main.files?.map((file, index) => ({
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
                        assetAttributes.providers || [this.config.neverminedNodeAddress],
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
                        assetAttributes.providers || [this.config.neverminedNodeAddress],
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
                    assetAttributes.providers || [this.config.neverminedNodeAddress],
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

}