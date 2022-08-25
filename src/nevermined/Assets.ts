import { SearchQuery } from '../common/interfaces'
import { DDO } from '../ddo/DDO'
import { MetaData } from '../ddo/MetaData'
import { Service, ServiceType, ServiceCommon } from '../ddo/Service'
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
import { ApiError, AssetError } from '../errors'
import { RoyaltyScheme } from '../keeper/contracts/royalties'
import { Nevermined } from '../sdk'
import { ContractReceipt } from 'ethers'

export interface ServicePlugin {
    createService(publisher: Account, metadata: MetaData): Promise<ServiceCommon>
}

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

function getRoyaltyScheme(nvm: Nevermined, kind: RoyaltyKind): RoyaltyScheme {
    if (kind == RoyaltyKind.Standard) {
        return nvm.keeper.royalties.standard
    } else if (kind == RoyaltyKind.Curve) {
        return nvm.keeper.royalties.curve
    }
}

/**
 * Assets submodule of Nevermined.
 */
export class Assets extends Instantiable {
    /**
     * Returns the instance of Assets.
     * @return {Promise<Assets>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Assets> {
        const instance = new Assets()
        instance.servicePlugin = {
            access: config.nevermined.keeper.templates.accessTemplate,
            compute: config.nevermined.keeper.templates.escrowComputeExecutionTemplate,
            'nft-sales': config.nevermined.keeper.templates.nftSalesTemplate,
            'nft-access': config.nevermined.keeper.templates.nftAccessTemplate,
            'nft721-sales': config.nevermined.keeper.templates.nft721SalesTemplate,
            'nft721-access': config.nevermined.keeper.templates.nft721AccessTemplate,
            'aave-credit': config.nevermined.keeper.templates.aaveCreditTemplate
        }
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Returns a DDO by DID.
     * @param  {string} did Decentralized ID.
     * @return {Promise<DDO>}
     */
    public async resolve(did: string): Promise<DDO> {
        const { serviceEndpoint } =
            await this.nevermined.keeper.didRegistry.getAttributesByDid(did)
        return this.nevermined.metadata.retrieveDDOByUrl(serviceEndpoint)
    }

    public createMintable(
        metadata: MetaData,
        publisher: Account,
        cap: number = 0,
        royalties: number = 0,
        assetRewards: AssetRewards = new AssetRewards(),
        method: string = 'PSK-RSA',
        providers?: string[],
        nftMetadata?: string,
        params?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.createNft(
            metadata,
            publisher,
            assetRewards,
            method,
            cap,
            providers,
            royalties, // is this royalties or nftAmount?
            undefined,
            undefined,
            undefined,
            nftMetadata,
            params
        )
    }

    private async createDDO(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards,
        method: string,
        nftTokenAddress: string,
        erc20TokenAddress: string,
        nftAmount: number,
        services: ServiceType[],
        nftTransfer: boolean,
        duration: number,
        observer
    ): Promise<DDO> {
        const { gatewayUri } = this.config
        const { didRegistry } = this.nevermined.keeper

        // create ddo itself
        const ddo: DDO = new DDO({
            id: '',
            userId: metadata.userId,
            authentication: [
                {
                    type: 'RsaSignatureAuthentication2018',
                    publicKey: ''
                }
            ],
            publicKey: [
                {
                    id: '',
                    type: 'EthereumECDSAKey',
                    owner: publisher.getId()
                }
            ]
        })

        let publicKey = await this.nevermined.gateway.getRsaPublicKey()
        if (method == 'PSK_ECDSA') {
            publicKey = this.nevermined.gateway.getEcdsaPublicKey()
        }

        await ddo.addService(
            this.nevermined,
            this.createAuthorizationService(gatewayUri, publicKey, method)
        )

        await ddo.addService(this.nevermined, {
            type: 'metadata',
            index: 0,
            serviceEndpoint: '',
            attributes: {
                // Default values
                curation: {
                    rating: 0,
                    numVotes: 0
                },
                // Overwrites defaults
                ...metadata,
                // Cleaning not needed information
                main: {
                    ...metadata.main
                } as any
            }
        } as Service)

        for (const name of services) {
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

        for (const name of services) {
            const service = ddo.findServiceByType(name)
            const sat: ServiceAgreementTemplate =
                service.attributes.serviceAgreementTemplate
            sat.conditions = fillConditionsWithDDO(
                sat.conditions,
                ddo,
                assetRewards,
                erc20TokenAddress || this.nevermined.token.getAddress(),
                nftTokenAddress,
                publisher.getId(),
                nftAmount,
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
                method
            )
            encryptedFiles = JSON.parse(encryptedFilesResponse)['hash']
        }

        const serviceEndpoint = this.nevermined.metadata.getServiceEndpoint(
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

        return ddo
    }

    public createNft721(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        method: string = 'PSK-RSA',
        nftTokenAddress: string,
        erc20TokenAddress?: string,
        preMint: boolean = true,
        providers?: string[],
        royalties: number = 0,
        nftMetadata?: string,
        txParams?: TxParameters,
        services: ServiceType[] = ['nft721-sales', 'nft721-access'],
        nftTransfer: boolean = true,
        duration: number = 0
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Creating NFT721')
        return new SubscribablePromise(async (observer) => {
            const ddo = await this.createDDO(
                metadata,
                publisher,
                assetRewards,
                method,
                nftTokenAddress,
                erc20TokenAddress,
                1,
                services,
                nftTransfer,
                duration,
                observer
            )
            const { didRegistry } = this.nevermined.keeper

            let serviceEndpoint = this.nevermined.metadata.getServiceEndpoint(
                DID.parse(ddo.id)
            )

            this.logger.log('Registering Mintable DID', ddo.id)
            observer.next(CreateProgressStep.RegisteringDid)

            await didRegistry.registerMintableDID721(
                ddo.didSeed,
                ddo.checksum(ddo.shortId()),
                providers || [this.config.gatewayAddress],
                serviceEndpoint,
                '0x1',
                nftMetadata ? nftMetadata : '',
                royalties,
                preMint,
                publisher.getId(),
                txParams
            )

            this.logger.log('Storing DDO', ddo.id)
            observer.next(CreateProgressStep.StoringDdo)
            const storedDdo = await this.nevermined.metadata.storeDDO(ddo)
            this.logger.log('DDO stored')
            observer.next(CreateProgressStep.DdoStored)

            const ddoStatus = await this.nevermined.metadata.status(storedDdo.id)
            if (ddoStatus.external) {
                serviceEndpoint = ddoStatus.external.url
            }

            this.logger.log('Mintable DID registred')
            observer.next(CreateProgressStep.DidRegistered)

            return storedDdo
        })
    }

    public createNft(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        method: string = 'PSK-RSA',
        cap: number = 0,
        providers?: string[],
        nftAmount?: number,
        royalties: number = 0,
        erc20TokenAddress?: string,
        preMint: boolean = true,
        nftMetadata?: string,
        txParams?: TxParameters,
        services: ServiceType[] = ['nft-access', 'nft-sales']
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Creating NFT')
        return new SubscribablePromise(async (observer) => {
            try {
                const ddo = await this.createDDO(
                    metadata,
                    publisher,
                    assetRewards,
                    method,
                    undefined,
                    erc20TokenAddress,
                    nftAmount,
                    services,
                    true,
                    undefined,
                    observer
                )

                const { didRegistry } = this.nevermined.keeper

                let serviceEndpoint = this.nevermined.metadata.getServiceEndpoint(
                    DID.parse(ddo.id)
                )

                this.logger.log('Registering Mintable DID', ddo.id)
                observer.next(CreateProgressStep.RegisteringDid)

                await didRegistry.registerMintableDID(
                    ddo.didSeed,
                    ddo.checksum(ddo.shortId()),
                    providers || [this.config.gatewayAddress],
                    serviceEndpoint,
                    '0x1',
                    nftMetadata ? nftMetadata : '',
                    cap,
                    royalties,
                    preMint,
                    publisher.getId(),
                    txParams
                )

                this.logger.log('Storing DDO', ddo.id)
                observer.next(CreateProgressStep.StoringDdo)
                const storedDdo = await this.nevermined.metadata.storeDDO(ddo)
                this.logger.log('DDO stored')
                observer.next(CreateProgressStep.DdoStored)

                const ddoStatus = await this.nevermined.metadata.status(storedDdo.id)
                if (ddoStatus.external) {
                    serviceEndpoint = ddoStatus.external.url
                }

                this.logger.log('Mintable DID registred')
                observer.next(CreateProgressStep.DidRegistered)

                return storedDdo
            } catch (error) {
                throw new ApiError(error)
            }
        })
    }

    public createNftWithRoyalties(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        method: string = 'PSK-RSA',
        cap: number = 0,
        providers?: string[],
        nftAmount?: number,
        royaltyKind?: RoyaltyKind,
        royalties?: number,
        erc20TokenAddress?: string,
        preMint: boolean = true,
        nftMetadata?: string,
        txParams?: TxParameters,
        services: ServiceType[] = ['nft-access', 'nft-sales']
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Creating NFT')
        return new SubscribablePromise(async (observer) => {
            try {
                const ddo = await this.createDDO(
                    metadata,
                    publisher,
                    assetRewards,
                    method,
                    undefined,
                    erc20TokenAddress,
                    nftAmount,
                    services,
                    true,
                    undefined,
                    observer
                )

                const { didRegistry } = this.nevermined.keeper

                let serviceEndpoint = this.nevermined.metadata.getServiceEndpoint(
                    DID.parse(ddo.id)
                )

                this.logger.log('Registering Mintable DID', ddo.id)
                observer.next(CreateProgressStep.RegisteringDid)

                await didRegistry.registerMintableDID(
                    ddo.didSeed,
                    ddo.checksum(ddo.shortId()),
                    providers || [this.config.gatewayAddress],
                    serviceEndpoint,
                    '0x1',
                    nftMetadata ? nftMetadata : '',
                    cap,
                    0,
                    preMint,
                    publisher.getId(),
                    txParams
                )
                this.logger.log('Mintable DID registred')
                const scheme = getRoyaltyScheme(this.nevermined, royaltyKind)
                observer.next(CreateProgressStep.SettingRoyaltyScheme)
                await didRegistry.setDIDRoyalties(
                    ddo.shortId(),
                    scheme.address,
                    publisher.getId(),
                    txParams
                )
                observer.next(CreateProgressStep.SettingRoyalties)
                await scheme.setRoyalty(ddo.shortId(), royalties, publisher, txParams)

                this.logger.log('Storing DDO', ddo.id)
                observer.next(CreateProgressStep.StoringDdo)
                const storedDdo = await this.nevermined.metadata.storeDDO(ddo)
                this.logger.log('DDO stored')
                observer.next(CreateProgressStep.DdoStored)

                const ddoStatus = await this.nevermined.metadata.status(storedDdo.id)
                if (ddoStatus.external) {
                    serviceEndpoint = ddoStatus.external.url
                }
                observer.next(CreateProgressStep.DidRegistered)

                return storedDdo
            } catch (error) {
                throw new ApiError(error)
            }
        })
    }

    public servicePlugin: { [key: string]: ServicePlugin }

    /**
     * Creates a new DDO.
     * @param {MetaData} metadata DDO metadata.
     * @param {Account} publisher Publisher account.
     * @param {AssetRewards} assetRewards Publisher account.
     * @param {ServiceType[]} serviceTypes List of service types to associate with the asset.
     * @param {Service[]} services List of provider addresses of this asset.
     * @param {String} method Method used to encrypt the urls.
     * @param {String[]} providers List of provider addresses of this asset.
     * @return {Promise<DDO>}
     */
    public create(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        serviceTypes: ServiceType[] = ['access'],
        method: string = 'PSK-RSA',
        providers?: string[],
        erc20TokenAddress?: string,
        params?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Creating asset')
        return new SubscribablePromise(async (observer) => {
            const ddo = await this.createDDO(
                metadata,
                publisher,
                assetRewards,
                method,
                undefined,
                erc20TokenAddress,
                undefined,
                serviceTypes,
                true,
                undefined,
                observer
            )

            const { didRegistry } = this.nevermined.keeper

            let serviceEndpoint = this.nevermined.metadata.getServiceEndpoint(
                DID.parse(ddo.id)
            )

            this.logger.log('Registering DID', ddo.id)
            observer.next(CreateProgressStep.RegisteringDid)

            await didRegistry.registerAttribute(
                ddo.didSeed,
                ddo.checksum(ddo.shortId()),
                providers || [this.config.gatewayAddress],
                serviceEndpoint,
                publisher.getId(),
                params
            )

            this.logger.log('Storing DDO')
            observer.next(CreateProgressStep.StoringDdo)
            const storedDdo = await this.nevermined.metadata.storeDDO(ddo)
            this.logger.log('DDO stored')
            observer.next(CreateProgressStep.DdoStored)

            const ddoStatus = await this.nevermined.metadata.status(storedDdo.id)
            if (ddoStatus.external) {
                serviceEndpoint = ddoStatus.external.url
            }

            this.logger.log('DID registered')
            observer.next(CreateProgressStep.DidRegistered)

            return storedDdo
        })
    }

    public createCompute(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        method: string = 'PSK-RSA',
        params?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return new SubscribablePromise(async () => {
            return this.create(
                metadata,
                publisher,
                assetRewards,
                ['compute'],
                method,
                undefined,
                undefined,
                params
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
     * @param  {string} did Decentralized ID.
     * @param  {ServiceType} serviceType Service.
     * @param  {Account} consumer Consumer account.
     * @return {Promise<string>} Returns Agreement ID
     */
    public order(
        did: string,
        serviceType: ServiceType,
        consumer: Account,
        params?: TxParameters
    ): SubscribablePromise<OrderProgressStep, string> {
        return new SubscribablePromise(async (observer) => {
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
                (a) => observer.next(a)
            )

            if (!agreementId) {
                throw new AssetError(`Error creating ${serviceType} agreement`)
            }

            return agreementId
        })
    }

    /**
     * @param  {string} did Decentralized ID.
     * @param  {number} index Service index.
     * @param  {Account} consumer Consumer account.
     * @return {Promise<string>} Returns Agreement ID
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
     * @param  {string} did Decentralized ID.
     * @return {Promise<string>} Returns Agreement ID
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
     * @param  {string} owner Owner address.
     * @return {Promise<string[]>} List of DIDs.
     */
    public async ownerAssets(owner: string): Promise<string[]> {
        return this.nevermined.keeper.didRegistry.getAttributesByOwner(owner)
    }

    /**
     * Transfer ownership of an asset.
     * @param  {string} did Asset DID.
     * @param  {string} newOwner Ethereum address of the new owner of the DID.
     * @return {Promise<TransactionReceipt>} Returns ethers transaction receipt.
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
     * @param  {string} consumer Consumer address.
     * @return {Promise<string[]>} List of DIDs.
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
     * @param  {SearchQuery} query Query to filter the assets.
     * @return {Promise<DDO[]>}
     */
    public async query(query: SearchQuery) {
        return this.nevermined.metadata.queryMetadata(query)
    }

    /**
     * Search over the assets using a keyword.
     * @param  {SearchQuery} text Text to filter the assets.
     * @return {Promise<DDO[]>}
     */
    public async search(
        text: string,
        offset: number = 100,
        page: number = 1,
        sort: string = 'desc'
    ) {
        return this.nevermined.metadata.queryMetadataByText({
            text,
            page: page,
            offset: offset,
            query: {
                value: 1
            },
            sort: {
                created: sort
            }
        } as SearchQuery)
    }

    public async retire(did: string) {
        return this.nevermined.metadata.delete(did)
    }

    public async download(
        did: string,
        ownerAccount: Account,
        resultPath: string,
        fileIndex?: number,
        useSecretStore?: boolean
    ): Promise<string>

    public async download(
        did: string,
        ownerAccount: Account,
        resultPath?: undefined | null,
        fileIndex?: number,
        useSecretStore?: boolean
    ): Promise<true>

    public async download(
        did: string,
        ownerAccount: Account,
        resultPath?: string,
        fileIndex: number = -1,
        useSecretStore?: boolean
    ): Promise<string | boolean> {
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
        return true
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
