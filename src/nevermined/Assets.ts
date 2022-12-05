import { SearchQuery } from '../common/interfaces'
import { DDO } from '../ddo/DDO'
import { MetaData } from '../ddo/MetaData'
import { Service, ServiceType, ServicePlugin } from '../ddo/Service'
import Account from './Account'
import DID from './DID'
import {
    fillConditionsWithDDO,
    SubscribablePromise,
    generateId,
    zeroX,
    didZeroX
} from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import AssetRewards from '../models/AssetRewards'
import { ServiceAgreementTemplate } from '../ddo/ServiceAgreementTemplate'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { AssetError } from '../errors'
import { RoyaltyScheme } from '../keeper/contracts/royalties'
import { Nevermined } from '../sdk'
import { ContractReceipt } from 'ethers'
import {
    ercOfNeverminedNFTType,
    NeverminedNFT1155Type,
    NeverminedNFT721Type,
    NeverminedNFTType,
    NFTAttributes
} from '../models/NFTAttributes'
import { EncryptionMethod, QueryResult } from '../metadata/Metadata'
import { AccessService, NFTAccessService, NFTSalesService } from './AccessService'
import BigNumber from '../utils/BigNumber'
import { ServiceAaveCredit } from '../keeper/contracts/defi/Service'
import { ImmutableBackends, NvmConfigVersions } from '../ddo/NvmConfig'
import { SignatureUtils } from './utils/SignatureUtils'
import { NodeUploadBackends } from '../node/NeverminedNode'

export enum CreateProgressStep {
    ServicesAdded,
    GeneratingProof,
    ProofGenerated,
    ConditionsFilled,
    EncryptingFiles,
    FilesEncrypted,
    RegisteringDid,
    SettingRoyaltyScheme,
    SettingRoyalties,
    StoringDdo,
    DdoStored,
    DdoStoredImmutable,
    DidRegistered
}

export enum UpdateProgressStep {
    ResolveAsset,
    UpdateMetadataInDDO,
    AddVersionInDDO,
    CalculateChecksum,
    StoringImmutableDDO,
    UpdatingAssetOnChain,
    StoringDDOMarketplaceAPI,
    AssetUpdated
}

export enum OrderProgressStep {
    CreatingAgreement,
    AgreementInitialized,
    LockingPayment,
    LockedPayment
}

export enum ExecuteProgressStep {
    CreatingAgreement,
    AgreementInitialized,
    LockingPayment,
    LockedPayment
}

export enum RoyaltyKind {
    Standard,
    Curve,
    Legacy
}

export enum PublishMetadata {
    OnlyMetadataAPI,
    IPFS,
    Filecoin,
    Arweave
}

export enum DIDResolvePolicy {
    ImmutableFirst,
    MetadataAPIFirst,
    OnlyImmutable,
    OnlyMetadataAPI
}

export interface RoyaltyAttributes {
    royaltyKind: RoyaltyKind
    scheme: RoyaltyScheme
    amount: number
}

export function getRoyaltyScheme(nvm: Nevermined, kind: RoyaltyKind): RoyaltyScheme {
    if (kind == RoyaltyKind.Standard) {
        return nvm.keeper.royalties.standard
    } else if (kind == RoyaltyKind.Curve) {
        return nvm.keeper.royalties.curve
    }
}

export function getRoyaltyAttributes(nvm: Nevermined, kind: RoyaltyKind, amount: number) {
    return {
        scheme: getRoyaltyScheme(nvm, kind),
        royaltyKind: kind,
        amount
    } as RoyaltyAttributes
}

/**
 * Assets submodule of Nevermined.
 */
export class Assets extends Instantiable {

    static DEFAULT_REGISTRATION_ACTIVITY_ID = SignatureUtils.hash('AssetRegistration')
    /**
     * Returns the instance of Assets.
     * @returns {@link Assets}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Assets> {
        const instance = new Assets()
        instance.servicePlugin = {
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
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Returns a DDO by DID. Depending of the resolution policy it prioritize the Metadata API or Immutable urls.
     * @param did - Decentralized ID.
     * @param policy - It specifies the resolve policy to apply. It allows to select that priorities during the asset resolution via Metadata API or Immutable URLs (IPFS, Filecoin, etc)
     * @returns {@link DDO}
     */
    public async resolve(did: string, policy: DIDResolvePolicy = DIDResolvePolicy.ImmutableFirst): Promise<DDO> {
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


    public registerAsset(
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
                this.createAuthorizationService(
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
                        await this.publishImmutableContent(ddo, publishMetadata))
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
                        Assets.DEFAULT_REGISTRATION_ACTIVITY_ID,
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
                        Assets.DEFAULT_REGISTRATION_ACTIVITY_ID,                     
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
                    Assets.DEFAULT_REGISTRATION_ACTIVITY_ID,                     
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

    public update(
        did: string,
        metadata: MetaData,
        publisher: Account,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<UpdateProgressStep, DDO> {

        this.logger.log('Updating Asset')
        return new SubscribablePromise(async observer => {
            observer.next(UpdateProgressStep.ResolveAsset)
            const ddo = await this.resolve(did)
            

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
                        await this.publishImmutableContent(ddo, publishMetadata))
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


    private async publishImmutableContent(
        ddo: DDO,
        publishMetadata: PublishMetadata = PublishMetadata.IPFS
    ): Promise<{url: string, backend: ImmutableBackends}> {
        let url, backend = undefined

        if (publishMetadata === PublishMetadata.Filecoin) {
            this.logger.log('Publishing metadata to Filecoin')                    
            ;({ url } = await this.nevermined.node.uploadContent(
                JSON.stringify(ddo), 
                false, 
                NodeUploadBackends.Filecoin
                ))
            backend = 'filecoin'
            
        } else if (publishMetadata === PublishMetadata.IPFS) {
            this.logger.log('Publishing metadata to IPFS')                    
            ;({ url: url } = await this.nevermined.node.uploadContent(
                JSON.stringify(ddo), 
                false, 
                NodeUploadBackends.IPFS
                ))
            backend = 'ipfs'

        }
        return { url, backend }
    }

    public createMintable(
        metadata: MetaData,
        publisher: Account,
        cap: BigNumber = BigNumber.from(0),
        royaltyAttributes: RoyaltyAttributes | undefined,
        assetRewards: AssetRewards = new AssetRewards(),
        encryptionMethod: EncryptionMethod,
        providers?: string[],
        nftMetadata?: string,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.createNft(
            metadata,
            publisher,
            assetRewards,
            encryptionMethod,
            cap,
            providers,
            BigNumber.from(1),
            royaltyAttributes,
            undefined,
            undefined,
            undefined,
            nftMetadata,
            undefined,
            undefined,
            appId,
            publishMetadata,
            txParams
        )
    }

    public createNft721(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        encryptionMethod: EncryptionMethod,
        nftTokenAddress: string,
        erc20TokenAddress?: string,
        preMint = true,
        providers?: string[],
        royaltyAttributes?: RoyaltyAttributes,
        nftMetadata?: string,
        serviceTypes: ServiceType[] = ['nft-sales', 'nft-access'],
        nftTransfer = true,
        duration = 0,
        nftType: NeverminedNFT721Type = NeverminedNFT721Type.nft721,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        const nftAttributes = NFTAttributes.getInstance({
            ercType: 721,
            nftType,
            nftContractAddress: nftTokenAddress,
            cap: BigNumber.from(0),
            preMint: preMint,
            nftMetadataUrl: nftMetadata,
            amount: BigNumber.from(1),
            nftTransfer: nftTransfer,
            isSubscription: duration > 0 ? true : false,
            duration: duration,
            royaltyAttributes
        })
        return this.registerAsset(
            metadata,
            publisher,
            encryptionMethod,
            assetRewards,
            serviceTypes,
            [],
            nftAttributes,
            erc20TokenAddress,
            providers,
            appId,
            publishMetadata,
            txParams
        )
    }

    public createNft(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        encryptionMethod: EncryptionMethod,
        cap: BigNumber = BigNumber.from(0),
        providers?: string[],
        nftAmount?: BigNumber,
        royaltyAttributes?: RoyaltyAttributes,
        erc20TokenAddress?: string,
        nftContractAddress?: string,
        preMint = true,
        nftMetadata?: string,
        services: ServiceType[] = ['nft-access', 'nft-sales'],
        nftType: NeverminedNFT1155Type = NeverminedNFT1155Type.nft1155,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        const nftAttributes: NFTAttributes = {
            ercType: ercOfNeverminedNFTType[nftType],
            nftType,
            nftContractAddress: nftContractAddress,
            cap: cap,
            preMint: preMint,
            nftMetadataUrl: nftMetadata,
            amount: nftAmount,
            nftTransfer: false,
            isSubscription: false,
            duration: 0,
            royaltyAttributes
        }
        return this.registerAsset(
            metadata,
            publisher,
            encryptionMethod,
            assetRewards,
            services,
            [],
            nftAttributes,
            erc20TokenAddress,
            providers,
            appId,
            publishMetadata,
            txParams
        )
    }

    public createNftWithRoyalties(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        encryptionMethod: EncryptionMethod = 'PSK-RSA',
        cap: BigNumber = BigNumber.from(0),
        providers?: string[],
        nftAmount?: BigNumber,
        royaltyAttributes?: RoyaltyAttributes,
        erc20TokenAddress?: string,
        preMint = true,
        nftMetadata?: string,
        nftType: NeverminedNFTType = NeverminedNFT1155Type.nft1155,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        const nftAttributes: NFTAttributes = {
            ercType: ercOfNeverminedNFTType[nftType],
            nftType,
            nftContractAddress: this.nevermined.keeper.nftUpgradeable.address,
            cap,
            preMint: preMint,
            nftMetadataUrl: nftMetadata,
            amount: nftAmount,
            nftTransfer: false,
            isSubscription: false,
            duration: 0,
            royaltyAttributes
        }
        return this.registerAsset(
            metadata,
            publisher,
            encryptionMethod,
            assetRewards,
            ['nft-access', 'nft-sales'],
            [],
            nftAttributes,
            erc20TokenAddress,
            providers,
            appId,
            publishMetadata,
            txParams
        )
    }

    public servicePlugin: { [key: string]: ServicePlugin<Service> }

    /**
     * Creates a new DDO.
     *
     * @param metadata - DDO metadata.
     * @param publisher - Publisher account.
     * @param assetRewards - Publisher account.
     * @param serviceTypes - List of service types to associate with the asset.
     * @param predefinedAssetServices -
     * @param encryptionMethod -
     * @param providers - List of provider addresses of this asset.
     * @param erc20TokenAddress - The ERC-20 Token used to price the asset.
     * @param appId - The id of the application creating the NFT.
     * @param txParams - Optional transaction parameters
     *
     * @returns {@link DDO}
     */
    public create(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        serviceTypes: ServiceType[] = ['access'],
        predefinedAssetServices: Service[] = [],
        encryptionMethod: EncryptionMethod = 'PSK-RSA',
        providers?: string[],
        erc20TokenAddress?: string,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.registerAsset(
            metadata,
            publisher,
            encryptionMethod,
            assetRewards,
            serviceTypes,
            predefinedAssetServices,
            undefined,
            erc20TokenAddress,
            providers,
            appId,
            publishMetadata,
            txParams
        )
    }

    public createCompute(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        encryptionMethod: EncryptionMethod = 'PSK-RSA',
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return new SubscribablePromise(async () => {
            return this.create(
                metadata,
                publisher,
                assetRewards,
                ['compute'],
                undefined,
                encryptionMethod,
                undefined,
                undefined,
                appId,
                publishMetadata,
                txParams
            )
        })
    }

    public async consume(
        agreementId: string,
        did: string,
        consumerAccount: Account,
        resultPath: string,
        fileIndex?: number
    ): Promise<string>

    // eslint-disable-next-line no-dupe-class-members
    public async consume(
        agreementId: string,
        did: string,
        consumerAccount: Account,
        resultPath?: undefined | null,
        fileIndex?: number
    ): Promise<true>

    // eslint-disable-next-line no-dupe-class-members
    public async consume(
        agreementId: string,
        did: string,
        consumerAccount: Account,
        resultPath?: string,
        fileIndex = -1
    ): Promise<string | true> {
        const ddo = await this.resolve(did)
        const { attributes } = ddo.findServiceByType('metadata')
        const { serviceEndpoint, index } = ddo.findServiceByType('access')
        const { files } = attributes.main

        if (!serviceEndpoint) {
            throw new AssetError(
                'Consume asset failed, service definition is missing the `serviceEndpoint`.'
            )
        }

        this.logger.log('Consuming files')

        resultPath = resultPath
            ? `${resultPath}/datafile.${ddo.shortId()}.${index}/`
            : undefined

        await this.nevermined.node.consumeService(
            did,
            agreementId,
            serviceEndpoint,
            consumerAccount,
            files,
            resultPath,
            fileIndex
        )
        this.logger.log('Files consumed')

        if (resultPath) {
            return resultPath
        }
        return true
    }

    /**
     * Start the purchase/order of an asset's service. Starts by signing the service agreement
     * then sends the request to the publisher via the service endpoint (Node http service).
     * @param did - Decentralized ID.
     * @param serviceType - Service.
     * @param consumer - Consumer account.
     * @returns The agreement ID.
     */
    public order(
        did: string,
        serviceType: ServiceType,
        consumer: Account,
        params?: TxParameters
    ): SubscribablePromise<OrderProgressStep, string> {
        return new SubscribablePromise(async observer => {
            const agreementIdSeed = zeroX(generateId())
            const ddo = await this.resolve(did)

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

    /**
     * @param consumer - Consumer account.
     * @returns The agreement ID.
     */
    public async execute(
        agreementId: string,
        workflowDid: string,
        consumer: Account
    ): Promise<string> {
        const { node } = this.nevermined

        return (await node.execute(agreementId, workflowDid, consumer)).workflowId
    }

    /**
     * Returns the owner of a asset.
     * @param did - Decentralized ID.
     * @returns The agreement ID.
     */
    public async owner(did: string): Promise<string> {
        const ddo = await this.resolve(did)
        const checksum = ddo.checksum(didZeroX(did))
        const { creator, signatureValue } = ddo.proof
        const signer = await this.nevermined.utils.signature.verifyText(
            checksum,
            signatureValue
        )

        if (signer.toLowerCase() !== creator.toLowerCase()) {
            this.logger.warn(
                `Owner of ${ddo.id} doesn't match. Expected ${creator} instead of ${signer}.`
            )
        }

        return creator
    }

    /**
     * Returns the assets of a owner.
     * @param owner - Owner address.
     * @returns List of DIDs.
     */
    public async ownerAssets(owner: string): Promise<string[]> {
        return this.nevermined.keeper.didRegistry.getAttributesByOwner(owner)
    }

    /**
     * Transfer ownership of an asset.
     * @param did - Asset DID.
     * @param newOwner - Ethereum address of the new owner of the DID.
     * @returns Returns ethers transaction receipt.
     */
    public async transferOwnership(
        did: string,
        newOwner: string,
        params?: TxParameters
    ): Promise<ContractReceipt> {
        const owner = await this.nevermined.assets.owner(did)
        return this.nevermined.keeper.didRegistry.transferDIDOwnership(
            did,
            newOwner,
            owner,
            params
        )
    }

    /**
     * Returns the assets of a consumer.
     * @param consumer - Consumer address.
     * @returns List of DIDs.
     */
    public async consumerAssets(consumer: string): Promise<string[]> {
        return (
            await this.nevermined.keeper.conditions.accessCondition.getGrantedDidByConsumer(
                consumer
            )
        ).map(({ did }) => did)
    }

    /**
     * Search over the assets using a query.
     *
     * @remarks
     * If the `appId` is set in the search query results will be filtered
     * returning only DDOs for that appId
     *
     * @param query - Query to filter the assets.
     * @returns A list of {@link DDO}s matching the query
     */
    public async query(query: SearchQuery) {
        if (query.appId) {
            query = {
                query: {
                    bool: {
                        must: [query.query || { match_all: {} }],
                        filter: [{ term: { '_nvm.appId': query.appId } }]
                    }
                },
                offset: query.offset,
                page: query.page,
                sort: query.sort,
                show_unlisted: query.show_unlisted
            }
        }
        return this.nevermined.metadata.queryMetadata(query)
    }

    /**
     * Search over the assets using a keyword.
     * @param text - Text to filter the assets.
     * @returns A list of {@link DDO}s.
     */
    public async search(
        text: string,
        offset = 100,
        page = 1,
        sort = 'desc',
        appId?: string
    ) {
        const query: SearchQuery = {
            query: {
                simple_query_string: { query: `${text}*` }
            },
            offset,
            page,
            sort: {
                created: sort
            },
            appId
        }
        return this.query(query)
    }

    /**
     * Query for assets by price.
     *
     * @example
     * ```ts
     * const results = await nevermined.assets.searchByPrice(1, 20)
     * ```
     *
     * @param minPrice - The minimum price to search for.
     * @param maxPrice - The maximum price to search for.
     * @param serviceType - The name of the service. Defaults to all services.
     * @param offset -
     * @param page -
     * @param sort -
     * @param appId -
     * @returns
     */
    public async searchByPrice(
        minPrice: number,
        maxPrice: number,
        serviceType?: ServiceType,
        offset = 100,
        page = 1,
        sort = 'desc',
        appId?: string
    ): Promise<QueryResult> {
        const query: SearchQuery = {
            query: {
                nested: {
                    path: 'service',
                    query: {
                        bool: {
                            must: [
                                serviceType && { match: { 'service.type': serviceType } },
                                {
                                    range: {
                                        'service.attributes.additionalInformation.priceHighestDenomination':
                                            {
                                                gte: minPrice,
                                                lte: maxPrice
                                            }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            offset,
            page,
            sort: {
                created: sort
            },
            appId
        }
        return this.query(query)
    }

    public async retire(did: string) {
        return this.nevermined.metadata.delete(did)
    }

    /**
     * Download the asset
     *
     * @param did - The Decentralized Identifier of the asset.
     * @param ownerAccount - The receiver account owner
     * @param resultPath - Path to be the files downloader
     * @param fileIndex - the index of the file
     * @param isToDownload - If the NFT is for downloading
     * @param serviceType - service type. 'access' by default
     *
     * @return status, path destination if resultPath is provided or file object if isToDownload is false
     */
    public async download(
        did: string,
        ownerAccount: Account,
        resultPath?: string,
        fileIndex = -1,
        isToDownload = true,
        serviceType: ServiceType = 'access'
    ) {
        const ddo = await this.resolve(did)
        const { attributes } = ddo.findServiceByType('metadata')
        const { files } = attributes.main

        const { serviceEndpoint, index } = ddo.findServiceByType(serviceType)

        if (!serviceEndpoint) {
            throw new AssetError(
                'Consume asset failed, service definition is missing the `serviceEndpoint`.'
            )
        }

        this.logger.log('Consuming files')

        resultPath = resultPath
            ? `${resultPath}/datafile.${ddo.shortId()}.${index}/`
            : undefined

        const accessToken = await this.nevermined.utils.jwt.getDownloadGrantToken(
            ddo.id,
            ownerAccount
        )
        const headers = {
            Authorization: 'Bearer ' + accessToken
        }
        return this.nevermined.node.downloadService(
            files,
            resultPath,
            fileIndex,
            isToDownload,
            headers
        )
    }

    public async delegatePermissions(
        did: string,
        address: string,
        account: Account,
        params?: TxParameters
    ) {
        return await this.nevermined.keeper.didRegistry.grantPermission(
            did,
            address,
            account.getId(),
            params
        )
    }

    public async revokePermissions(
        did: string,
        address: string,
        account: Account,
        params?: TxParameters
    ) {
        return await this.nevermined.keeper.didRegistry.revokePermission(
            did,
            address,
            account.getId(),
            params
        )
    }

    public async getPermissions(did: string, address: string) {
        return await this.nevermined.keeper.didRegistry.getPermission(did, address)
    }

    public async computeLogs(agreementId: string, executionId: string, account: Account) {
        return await this.nevermined.node.computeLogs(agreementId, executionId, account)
    }

    public async computeStatus(
        agreementId: string,
        executionId: string,
        account: Account
    ) {
        return await this.nevermined.node.computeStatus(agreementId, executionId, account)
    }

    private createAuthorizationService(
        neverminedNodeUri: string,
        publicKey: string,
        method: string
    ) {
        return {
            type: 'authorization',
            index: 2,
            serviceEndpoint: neverminedNodeUri,
            attributes: {
                main: {
                    publicKey: publicKey,
                    service: method,
                    threshold: 0
                }
            }
        } as Service
    }
}
