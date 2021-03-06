import { TransactionReceipt } from 'web3-core'
import { Metadata, SearchQuery } from '../metadata/Metadata'
import { DDO } from '../ddo/DDO'
import { MetaData } from '../ddo/MetaData'
import { Service, ServiceType } from '../ddo/Service'
import Account from './Account'
import DID from './DID'
import {
    fillConditionsWithDDO,
    getLockPaymentTotalAmount,
    SubscribablePromise,
    generateId,
    zeroX,
    didZeroX,
    getAssetRewardsFromDDO
} from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import AssetRewards from '../models/AssetRewards'

export enum CreateProgressStep {
    GeneratingProof,
    ProofGenerated,
    EncryptingFiles,
    FilesEncrypted,
    RegisteringDid,
    DidRegistered,
    StoringDdo,
    DdoStored
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
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Returns a DDO by DID.
     * @param  {string} did Decentralized ID.
     * @return {Promise<DDO>}
     */
    public async resolve(did: string): Promise<DDO> {
        const {
            serviceEndpoint
        } = await this.nevermined.keeper.didRegistry.getAttributesByDid(did)
        return this.nevermined.metadata.retrieveDDOByUrl(serviceEndpoint)
    }

    public createMintable(
        metadata: MetaData,
        publisher: Account,
        cap: number,
        royalties: number = 0,
        assetRewards: AssetRewards = new AssetRewards(),
        serviceTypes: ServiceType[] = ['access'],
        services: Service[] = [],
        method: string = 'PSK-RSA',
        providers?: string[]
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.create(
            metadata,
            publisher,
            assetRewards,
            serviceTypes,
            services,
            method,
            providers,
            cap,
            royalties
        )
    }

    /**
     * Creates a new DDO.
     * @param  {MetaData} metadata DDO metadata.
     * @param  {Account} publisher Publisher account.
     * @param {ServiceType[]} serviceTypes List of service types to associate with the asset.
     * @param {String} method Method used to encrypt the urls.
     * @param {String[]} providers List of provider addresses of this asset.
     * @param {Number} cap Max cap of nfts that can be minted for the asset.
     * @param {Number} royalties royalties in the secondary market going to the original creator
     * @return {Promise<DDO>}
     */
    public create(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        serviceTypes: ServiceType[] = ['access'],
        services: Service[] = [],
        method: string = 'PSK-RSA',
        providers?: string[],
        cap?: number,
        royalties?: number,
        nftAmount?: number
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Creating asset')
        return new SubscribablePromise(async observer => {
            const { gatewayUri } = this.config
            const { didRegistry, templates } = this.nevermined.keeper

            const accessServiceAgreementTemplate = await templates.accessTemplate.getServiceAgreementTemplate()
            const computeServiceAgreementTemplate = await templates.escrowComputeExecutionTemplate.getServiceAgreementTemplate()
            const nftSalesServiceAgreementTemplate = await templates.nftSalesTemplate.getServiceAgreementTemplate()
            const nftAccessServiceAgreementTemplate = await templates.nftAccessTemplate.getServiceAgreementTemplate()

            // create ddo itself
            const ddo: DDO = new DDO({
                id: '',
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

            if (services.length > 0) {
                ddo.service = [, ...services].reverse() as Service[]
            }

            if (serviceTypes.includes('access'))
                ddo.addService(
                    this.nevermined,
                    this.createAccessService(
                        templates,
                        publisher,
                        metadata,
                        accessServiceAgreementTemplate
                    )
                )
            if (serviceTypes.includes('compute'))
                await ddo.addService(
                    this.nevermined,
                    this.createComputeService(
                        templates,
                        publisher,
                        metadata,
                        computeServiceAgreementTemplate
                    )
                )
            if (serviceTypes.includes('nft-sales'))
                await ddo.addService(
                    this.nevermined,
                    await this.createNftSalesService(metadata, publisher)
                )
            if (serviceTypes.includes('nft-access'))
                await ddo.addService(
                    this.nevermined,
                    await this.createNftAccessService(metadata, publisher)
                )

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

            ddo.service.sort((a, b) => (a.index > b.index ? 1 : -1))

            this.logger.log('Generating proof')
            observer.next(CreateProgressStep.GeneratingProof)
            await ddo.addProof(
                this.nevermined,
                publisher.getId(),
                publisher.getPassword()
            )

            const didSeed = await ddo.generateDidSeed(ddo.proof.checksum)
            await ddo.assignDid(didSeed, didRegistry, publisher)

            await ddo.addSignature(
                this.nevermined,
                publisher.getId(),
                publisher.getPassword()
            )
            this.logger.log('Proof generated')
            observer.next(CreateProgressStep.ProofGenerated)

            this.logger.log('Encrypting files')
            observer.next(CreateProgressStep.EncryptingFiles)

            let encryptedFiles
            if (!['workflow'].includes(metadata.main.type)) {
                if (method === 'SecretStore') {
                    // TODO- Continue keeping the support for the secret-store client
                    encryptedFiles = await this.nevermined.secretStore.encrypt(
                        ddo.id,
                        metadata.main.files,
                        publisher
                    )
                } else {
                    const encryptedFilesResponse = await this.nevermined.gateway.encrypt(
                        ddo.id,
                        JSON.stringify(metadata.main.files),
                        method
                    )
                    encryptedFiles = JSON.parse(encryptedFilesResponse)['hash']
                }
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

            //Fulfill conditions
            if (serviceTypes.includes('access')) {
                const rawConditions = await templates.accessTemplate.getServiceAgreementTemplateConditions()
                const conditions = fillConditionsWithDDO(rawConditions, ddo, assetRewards)
                accessServiceAgreementTemplate.conditions = conditions
            }
            if (serviceTypes.includes('compute')) {
                const rawConditions = await templates.escrowComputeExecutionTemplate.getServiceAgreementTemplateConditions()
                const conditions = fillConditionsWithDDO(rawConditions, ddo, assetRewards)
                computeServiceAgreementTemplate.conditions = conditions
            }
            if (serviceTypes.includes('nft-access')) {
                const rawConditions = await templates.nftAccessTemplate.getServiceAgreementTemplateConditions()
                const conditions = fillConditionsWithDDO(
                    rawConditions,
                    ddo,
                    assetRewards,
                    nftAmount
                )
                nftAccessServiceAgreementTemplate.conditions = conditions
            }
            if (serviceTypes.includes('nft-sales')) {
                const rawConditions = await templates.nftSalesTemplate.getServiceAgreementTemplateConditions()
                const conditions = fillConditionsWithDDO(rawConditions, ddo, assetRewards)
                nftSalesServiceAgreementTemplate.conditions = conditions
            }

            this.logger.log('Files encrypted')
            observer.next(CreateProgressStep.FilesEncrypted)
            this.logger.log('Registering DID')
            observer.next(CreateProgressStep.RegisteringDid)
            await didRegistry.registerAttribute(
                didSeed,
                ddo.checksum(ddo.shortId()),
                providers || [this.config.gatewayAddress],
                serviceEndpoint,
                publisher.getId()
            )

            if (cap || royalties) {
                await didRegistry.enableAndMintDidNft(
                    ddo.shortId(),
                    cap,
                    royalties,
                    false,
                    publisher.getId()
                )
            }

            this.logger.log('DID registred')
            observer.next(CreateProgressStep.DidRegistered)

            this.logger.log('Storing DDO')
            observer.next(CreateProgressStep.StoringDdo)
            const storedDdo = await this.nevermined.metadata.storeDDO(ddo)
            this.logger.log('DDO stored')
            observer.next(CreateProgressStep.DdoStored)

            return storedDdo
        })
    }

    public createCompute(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        service: Service[] = [],
        method: string = 'PSK-RSA'
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return new SubscribablePromise(async observer => {
            const computeService = {
                main: {
                    name: 'dataAssetComputeServiceAgreement',
                    creator: publisher.getId(),
                    datePublished: metadata.main.dateCreated,
                    price: metadata.main.price,
                    timeout: 86400,
                    provider: this.providerConfig()
                }
            }

            return this.create(
                metadata,
                publisher,
                assetRewards,
                ['compute'],
                [
                    {
                        type: 'compute',
                        index: 4,
                        serviceEndpoint: this.nevermined.gateway.getExecutionEndpoint(),
                        attributes: computeService
                    } as Service
                ],
                method
            )
        })
    }

    public async consume(
        agreementId: string,
        did: string,
        serviceIndex: number,
        consumerAccount: Account,
        resultPath: string,
        index?: number,
        useSecretStore?: boolean
    ): Promise<string>

    public async consume(
        agreementId: string,
        did: string,
        serviceIndex: number,
        consumerAccount: Account,
        resultPath?: undefined | null,
        index?: number,
        useSecretStore?: boolean
    ): Promise<true>

    public async consume(
        agreementId: string,
        did: string,
        serviceIndex: number,
        consumerAccount: Account,
        resultPath?: string,
        index: number = -1,
        useSecretStore?: boolean
    ): Promise<string | true> {
        const ddo = await this.resolve(did)
        const { attributes } = ddo.findServiceByType('metadata')

        const accessService = ddo.findServiceById(serviceIndex)

        const { files } = attributes.main

        const { serviceEndpoint } = accessService

        if (!serviceEndpoint) {
            throw new Error(
                'Consume asset failed, service definition is missing the `serviceEndpoint`.'
            )
        }

        this.logger.log('Consuming files')

        resultPath = resultPath
            ? `${resultPath}/datafile.${ddo.shortId()}.${serviceIndex}/`
            : undefined

        if (!useSecretStore) {
            await this.nevermined.gateway.consumeService(
                did,
                agreementId,
                serviceEndpoint,
                consumerAccount,
                files,
                resultPath,
                index
            )
        } else {
            const files = await this.nevermined.secretStore.decrypt(
                did,
                ddo.findServiceByType('metadata').attributes.encryptedFiles,
                consumerAccount,
                ddo.findServiceByType('authorization').serviceEndpoint
            )
            const downloads = files
                .filter(({ index: i }) => index === -1 || index === i)
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
     * @param  {number} index Service index.
     * @param  {Account} consumer Consumer account.
     * @return {Promise<string>} Returns Agreement ID
     */
    public order(
        did: string,
        index: number,
        consumer: Account
    ): SubscribablePromise<OrderProgressStep, string> {
        return new SubscribablePromise(async observer => {
            const { agreements } = this.nevermined

            const agreementId = zeroX(generateId())
            const ddo = await this.resolve(did)

            const { keeper } = this.nevermined
            const service = ddo.findServiceById(index)
            const templateName = service.attributes.serviceAgreementTemplate.contractName
            const template = keeper.getTemplateByName(templateName)
            const assetRewards = getAssetRewardsFromDDO(ddo, index)

            // eslint-disable-next-line no-async-promise-executor
            const paymentFlow = new Promise(async (resolve, reject) => {
                await template.getAgreementCreatedEvent(agreementId).once()

                this.logger.log('Agreement initialized')
                observer.next(OrderProgressStep.AgreementInitialized)

                const { attributes } = ddo.findServiceByType('metadata')

                this.logger.log('Locking payment')

                observer.next(OrderProgressStep.LockingPayment)
                const paid = await agreements.conditions.lockPayment(
                    agreementId,
                    ddo.id,
                    assetRewards.getAmounts(),
                    assetRewards.getReceivers(),
                    consumer
                )
                observer.next(OrderProgressStep.LockedPayment)

                if (paid) {
                    this.logger.log('Payment was OK')
                } else {
                    this.logger.error('Payment was KO')
                    this.logger.error('Agreement ID: ', agreementId)
                    this.logger.error('DID: ', ddo.id)
                    reject(new Error('Error on payment'))
                }

                resolve(did)
            })

            observer.next(OrderProgressStep.CreatingAgreement)
            this.logger.log('Creating agreement')
            await agreements.create(did, agreementId, index, consumer, consumer)
            this.logger.log('Agreement created')

            try {
                await paymentFlow
            } catch (e) {
                throw new Error('Error paying the asset.')
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
     * @return {Promise<TransactionReceipt>} Returns Web3 transaction receipt.
     */
    public async transferOwnership(
        did: string,
        newOwner: string
    ): Promise<TransactionReceipt> {
        const owner = await this.nevermined.assets.owner(did)
        return this.nevermined.keeper.didRegistry.transferDIDOwnership(
            did,
            newOwner,
            owner
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
        sort: number = 1
    ) {
        return this.nevermined.metadata.queryMetadataByText({
            text,
            page: page,
            offset: offset,
            query: {
                value: 1
            },
            sort: {
                value: sort
            }
        } as SearchQuery)
    }

    public async retire(did: string) {
        return this.nevermined.metadata.delete(did)
    }

    public async download(
        did: string,
        serviceIndex: number,
        ownerAccount: Account,
        resultPath: string,
        index?: number,
        useSecretStore?: boolean
    ): Promise<string>

    public async download(
        did: string,
        serviceIndex: number,
        ownerAccount: Account,
        resultPath?: undefined | null,
        index?: number,
        useSecretStore?: boolean
    ): Promise<true>

    public async download(
        did: string,
        serviceIndex: number,
        ownerAccount: Account,
        resultPath?: string,
        index: number = -1,
        useSecretStore?: boolean
    ): Promise<string | boolean> {
        const ddo = await this.resolve(did)
        const { attributes } = ddo.findServiceByType('metadata')

        const accessService = ddo.findServiceById(serviceIndex)

        const { files } = attributes.main

        const { serviceEndpoint } = accessService

        if (!serviceEndpoint) {
            throw new Error(
                'Consume asset failed, service definition is missing the `serviceEndpoint`.'
            )
        }

        this.logger.log('Consuming files')

        resultPath = resultPath
            ? `${resultPath}/datafile.${ddo.shortId()}.${serviceIndex}/`
            : undefined

        if (!useSecretStore) {
            await this.nevermined.gateway.downloadService(
                did,
                ownerAccount,
                files,
                resultPath,
                index
            )
        } else {
            const files = await this.nevermined.secretStore.decrypt(
                did,
                ddo.findServiceByType('metadata').attributes.encryptedFiles,
                ownerAccount,
                ddo.findServiceByType('authorization').serviceEndpoint
            )
            const downloads = files
                .filter(({ index: i }) => index === -1 || index === i)
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

    public async delegatePermissions(did: string, address: string, account: Account) {
        return await this.nevermined.keeper.didRegistry.grantPermission(
            did,
            address,
            account.getId()
        )
    }

    public async revokePermissions(did: string, address: string, account: Account) {
        return await this.nevermined.keeper.didRegistry.revokePermission(
            did,
            address,
            account.getId()
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

    private async providerConfig() {
        return {
            type: 'Azure',
            description: '',
            environment: {
                cluster: {
                    type: 'Kubernetes',
                    url: 'http://10.0.0.17/xxx'
                },
                supportedContainers: [
                    {
                        image: 'tensorflow/tensorflow',
                        tag: 'latest',
                        checksum:
                            'sha256:cb57ecfa6ebbefd8ffc7f75c0f00e57a7fa739578a429b6f72a0df19315deadc'
                    },
                    {
                        image: 'tensorflow/tensorflow',
                        tag: 'latest',
                        checksum:
                            'sha256:cb57ecfa6ebbefd8ffc7f75c0f00e57a7fa739578a429b6f72a0df19315deadc'
                    }
                ],
                supportedServers: [
                    {
                        serverId: '1',
                        serverType: 'xlsize',
                        price: '50',
                        cpu: '16',
                        gpu: '0',
                        memory: '128gb',
                        disk: '160gb',
                        maxExecutionTime: 86400
                    },
                    {
                        serverId: '2',
                        serverType: 'medium',
                        price: '10',
                        cpu: '2',
                        gpu: '0',
                        memory: '8gb',
                        disk: '80gb',
                        maxExecutionTime: 86400
                    }
                ]
            }
        }
    }

    private createAccessService(
        templates,
        publisher,
        metadata: MetaData,
        serviceAgreementTemplate
    ) {
        return {
            type: 'access',
            index: 3,
            serviceEndpoint: this.nevermined.gateway.getAccessEndpoint(),
            templateId: templates.accessTemplate.getAddress(),
            attributes: {
                main: {
                    creator: publisher.getId(),
                    datePublished: metadata.main.datePublished,
                    name: 'dataAssetAccessServiceAgreement',
                    price: metadata.main.price,
                    timeout: 3600
                },
                serviceAgreementTemplate
            }
        } as Service
    }

    private createComputeService(
        templates,
        publisher,
        metadata: MetaData,
        serviceAgreementTemplate
    ) {
        return {
            type: 'compute',
            index: 4,
            serviceEndpoint: this.nevermined.gateway.getExecutionEndpoint(),
            templateId: templates.escrowComputeExecutionTemplate.getAddress(),
            attributes: {
                main: {
                    name: 'dataAssetComputeServiceAgreement',
                    creator: publisher.getId(),
                    datePublished: metadata.main.datePublished,
                    price: metadata.main.price,
                    timeout: 86400,
                    provider: this.providerConfig()
                },
                serviceAgreementTemplate
            }
        } as Service
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
                    service: method!,
                    threshold: 0
                }
            }
        } as Service
    }

    private async createNftAccessService(
        metadata: MetaData,
        publisher: Account
    ): Promise<Service> {
        const { nftAccessTemplate } = this.nevermined.keeper.templates
        const serviceAgreementTemplate = await nftAccessTemplate.getServiceAgreementTemplate()
        return {
            type: 'nft-access',
            index: 7,
            serviceEndpoint: this.nevermined.gateway.getNftAccessEndpoint(),
            templateId: nftAccessTemplate.getAddress(),
            attributes: {
                main: {
                    name: 'nftAccessAgreement',
                    creator: publisher.getId(),
                    datePublished: metadata.main.datePublished,
                    price: metadata.main.price,
                    timeout: 86400
                },
                additionalInformation: {
                    description: ''
                },
                serviceAgreementTemplate
            }
        }
    }

    private async createNftSalesService(
        metadata: MetaData,
        publisher: Account
    ): Promise<Service> {
        const { nftSalesTemplate } = this.nevermined.keeper.templates
        const serviceAgreementTemplate = await nftSalesTemplate.getServiceAgreementTemplate()
        return {
            type: 'nft-sales',
            index: 6,
            serviceEndpoint: this.nevermined.gateway.getNftEndpoint(),
            templateId: nftSalesTemplate.getAddress(),
            attributes: {
                main: {
                    name: 'nftSalesAgreement',
                    creator: publisher.getId(),
                    datePublished: metadata.main.datePublished,
                    price: metadata.main.price,
                    timeout: 86400
                },
                additionalInformation: {
                    description: ''
                },
                serviceAgreementTemplate
            }
        }
    }
}
