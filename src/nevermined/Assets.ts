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
// import { ApiError, AssetError } from '../errors'
import { AssetError } from '../errors'
import { RoyaltyScheme } from '../keeper/contracts/royalties'
import { Nevermined } from '../sdk'
import { ContractReceipt } from 'ethers'
import { NFTAttributes } from '../models/NFTAttributes'
import { EncryptionMethod } from '../metadata/Metadata'
import { AccessService, NFTAccessService } from './AccessService'
import BigNumber from '../utils/BigNumber'

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
    DidRegistered
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
            'nft-sales': new NFTAccessService(
                config,
                config.nevermined.keeper.templates.nftSalesTemplate,
                config.nevermined.keeper.templates.nft721SalesTemplate
            ),
            'nft-access': new NFTAccessService(
                config,
                config.nevermined.keeper.templates.nftAccessTemplate,
                config.nevermined.keeper.templates.nft721AccessTemplate
            ),
            'aave-credit': config.nevermined.keeper.templates.aaveCreditTemplate
        }
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Returns a DDO by DID.
     * @param did - Decentralized ID.
     * @returns {@link DDO}
     */
    public async resolve(did: string): Promise<DDO> {
        const { serviceEndpoint } =
            await this.nevermined.keeper.didRegistry.getAttributesByDid(did)
        return this.nevermined.metadata.retrieveDDOByUrl(serviceEndpoint)
    }

    public registerAsset(
        metadata: MetaData,
        publisher: Account,
        encryptionMethod: EncryptionMethod = 'PSK-RSA',
        assetRewards: AssetRewards | undefined,
        serviceTypes: ServiceType[],
        predefinedAssetServices: Service[] = [],
        nftAttributes: NFTAttributes | undefined,
        erc20TokenAddress: string | undefined,
        providers: string[] = [this.config.gatewayAddress],
        appId?: string,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Registering Asset')
        return new SubscribablePromise(async observer => {
            // try {
            const { gatewayUri } = this.config
            const { didRegistry } = this.nevermined.keeper
            assetRewards = assetRewards ? assetRewards : new AssetRewards()

            // create ddo itself
            const ddo = DDO.getInstance(metadata.userId, publisher.getId(), appId)

            if (predefinedAssetServices.length > 0) {
                ddo.service = [, ...predefinedAssetServices].reverse() as Service[]
            }

            let publicKey
            if (encryptionMethod === 'PSK-ECDSA') {
                publicKey = this.nevermined.gateway.getEcdsaPublicKey()
            } else {
                publicKey = await this.nevermined.gateway.getRsaPublicKey()
            }

            this.logger.debug('Adding Authorization Service')
            await ddo.addService(
                this.nevermined,
                this.createAuthorizationService(gatewayUri, publicKey, encryptionMethod)
            )

            this.logger.debug('Adding Metadata Service')
            await ddo.addDefaultMetadataService(metadata)

            for (const name of serviceTypes) {
                const plugin = this.servicePlugin[name]
                if (plugin) {
                    await ddo.addService(
                        this.nevermined,
                        await plugin.createService(publisher, metadata)
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
                    nftAttributes || new NFTAttributes()
                const sat: ServiceAgreementTemplate =
                    service.attributes.serviceAgreementTemplate
                sat.conditions = fillConditionsWithDDO(
                    sat.conditions,
                    ddo,
                    assetRewards,
                    erc20TokenAddress || this.nevermined.token.getAddress(),
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
                const encryptedFilesResponse = await this.nevermined.gateway.encrypt(
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

            observer.next(CreateProgressStep.RegisteringDid)
            // On-chain asset registration
            if (nftAttributes) {
                this.logger.log('Registering Mintable Asset', ddo.id)
                if (nftAttributes.ercType === 721) {
                    await didRegistry.registerMintableDID721(
                        didSeed,
                        ddo.checksum(ddo.shortId()),
                        providers || [this.config.gatewayAddress],
                        serviceEndpoint,
                        '0x1',
                        nftAttributes.nftMetadataUrl,
                        0,
                        nftAttributes.preMint,
                        publisher.getId(),
                        txParams
                    )
                } else {
                    await didRegistry.registerMintableDID(
                        didSeed,
                        ddo.checksum(ddo.shortId()),
                        providers || [this.config.gatewayAddress],
                        serviceEndpoint,
                        '0x1',
                        nftAttributes.nftMetadataUrl,
                        nftAttributes.cap,
                        0,
                        nftAttributes.preMint,
                        publisher.getId(),
                        txParams
                    )
                }

                if (nftAttributes.royaltyAttributes) {
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
                await didRegistry.registerAttribute(
                    didSeed,
                    ddo.checksum(ddo.shortId()),
                    providers || [this.config.gatewayAddress],
                    serviceEndpoint,
                    publisher.getId(),
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

            this.logger.log('Asset registred')
            observer.next(CreateProgressStep.DidRegistered)

            return storedDdo
            /*
            } catch (error) {
                throw new ApiError(error)
            }*/
        })
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
            appId,
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
        preMint: boolean = true,
        providers?: string[],
        royaltyAttributes?: RoyaltyAttributes,
        nftMetadata?: string,
        serviceTypes: ServiceType[] = ['nft-sales', 'nft-access'],
        nftTransfer: boolean = true,
        duration: number = 0,
        appId?: string,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        const nftAttributes: NFTAttributes = {
            ercType: 721,
            nftContractAddress: nftTokenAddress,
            cap: BigNumber.from(0),
            preMint: preMint,
            nftMetadataUrl: nftMetadata,
            amount: BigNumber.from(1),
            nftTransfer: nftTransfer,
            isSubscription: duration > 0 ? true : false,
            duration: duration,
            royaltyAttributes
        }
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
        preMint: boolean = true,
        nftMetadata?: string,
        services: ServiceType[] = ['nft-access', 'nft-sales'],
        appId?: string,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        const nftAttributes: NFTAttributes = {
            ercType: 1155,
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
        preMint: boolean = true,
        nftMetadata?: string,
        appId?: string,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        const nftAttributes: NFTAttributes = {
            ercType: 1155,
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
            txParams
        )
    }

    public servicePlugin: { [key: string]: ServicePlugin }

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
            erc20TokenAddress || this.nevermined.token.getAddress(),
            providers,
            appId,
            txParams
        )
    }

    public createCompute(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        encryptionMethod: EncryptionMethod = 'PSK-RSA',
        _serviceTimeout: number = 86400,
        appId?: string,
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
                txParams
            )
        })
    }

    public async consume(
        agreementId: string,
        did: string,
        consumerAccount: Account,
        resultPath: string,
        fileIndex?: number,
        useSecretStore?: boolean
    ): Promise<string>

    // eslint-disable-next-line no-dupe-class-members
    public async consume(
        agreementId: string,
        did: string,
        consumerAccount: Account,
        resultPath?: undefined | null,
        fileIndex?: number,
        useSecretStore?: boolean
    ): Promise<true>

    // eslint-disable-next-line no-dupe-class-members
    public async consume(
        agreementId: string,
        did: string,
        consumerAccount: Account,
        resultPath?: string,
        fileIndex: number = -1,
        useSecretStore?: boolean
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

        if (!useSecretStore) {
            await this.nevermined.gateway.consumeService(
                did,
                agreementId,
                serviceEndpoint,
                consumerAccount,
                files,
                resultPath,
                fileIndex
            )
        } else {
            const files = await this.nevermined.secretStore.decrypt(
                did,
                ddo.findServiceByType('metadata').attributes.encryptedFiles,
                consumerAccount,
                ddo.findServiceByType('authorization').serviceEndpoint
            )
            const downloads = files
                .filter(({ index: i }) => fileIndex === -1 || fileIndex === i)
                .map(({ url, index: i }) =>
                    this.nevermined.utils.fetch.downloadFile(url, resultPath, i)
                )
            await Promise.all(downloads)
        }
        this.logger.log('Files consumed')

        if (resultPath) {
            return resultPath
        }
        return true
    }

    /**
     * Start the purchase/order of an asset's service. Starts by signing the service agreement
     * then sends the request to the publisher via the service endpoint (Gateway http service).
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
        computeDid: string,
        workflowDid: string,
        consumer: Account
    ): Promise<string> {
        const { gateway } = this.nevermined

        return (await gateway.execute(agreementId, computeDid, workflowDid, consumer))
            .workflowId
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
        offset: number = 100,
        page: number = 1,
        sort: string = 'desc',
        appId?: string
    ) {
        const query: SearchQuery = {
            query: {
                query_string: { query: text }
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

    public async download(
        did: string,
        ownerAccount: Account,
        resultPath?: string,
        fileIndex: number = -1,
        useSecretStore?: boolean
    ): Promise<string> {
        const ddo = await this.resolve(did)
        const { attributes } = ddo.findServiceByType('metadata')
        const { files } = attributes.main

        const { serviceEndpoint, index } = ddo.findServiceByType('access')

        if (!serviceEndpoint) {
            throw new AssetError(
                'Consume asset failed, service definition is missing the `serviceEndpoint`.'
            )
        }

        this.logger.log('Consuming files')

        resultPath = resultPath
            ? `${resultPath}/datafile.${ddo.shortId()}.${index}/`
            : undefined

        if (!useSecretStore) {
            await this.nevermined.gateway.downloadService(
                did,
                ownerAccount,
                files,
                resultPath,
                fileIndex
            )
        } else {
            const files = await this.nevermined.secretStore.decrypt(
                did,
                ddo.findServiceByType('metadata').attributes.encryptedFiles,
                ownerAccount,
                ddo.findServiceByType('authorization').serviceEndpoint
            )
            const downloads = files
                .filter(({ index: i }) => fileIndex === -1 || fileIndex === i)
                .map(({ url, index: i }) =>
                    this.nevermined.utils.fetch.downloadFile(url, resultPath, i)
                )
            await Promise.all(downloads)
        }
        this.logger.log('Files consumed')

        if (resultPath) {
            return resultPath
        }
        return 'success'
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
        return await this.nevermined.gateway.computeLogs(
            agreementId,
            executionId,
            account
        )
    }

    public async computeStatus(
        agreementId: string,
        executionId: string,
        account: Account
    ) {
        return await this.nevermined.gateway.computeStatus(
            agreementId,
            executionId,
            account
        )
    }

    private createAuthorizationService(
        gatewayUri: string,
        publicKey: string,
        method: string
    ) {
        return {
            type: 'authorization',
            index: 2,
            serviceEndpoint: gatewayUri,
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
