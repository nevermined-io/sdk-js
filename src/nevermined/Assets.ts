import { TransactionReceipt } from 'web3-core'
import { SearchQuery } from '../metadata/Metadata'
import { DDO } from '../ddo/DDO'
import { MetaData } from '../ddo/MetaData'
import { Service } from '../ddo/Service'
import Account from './Account'
import DID from './DID'
import { ConditionState } from '../keeper/contracts/conditions'
import { fillConditionsWithDDO, SubscribablePromise, generateId, zeroX, didZeroX } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

export enum CreateProgressStep {
    EncryptingFiles,
    FilesEncrypted,
    GeneratingProof,
    ProofGenerated,
    RegisteringDid,
    DidRegistred,
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
    LockedPayment,
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

    /**
     * Creates a new DDO.
     * @param  {MetaData} metadata DDO metadata.
     * @param  {Account} publisher Publisher account.
     * @param services
     * @param method
     * @return {Promise<DDO>}
     */
    public create(
        metadata: MetaData,
        publisher: Account,
        services: Service[] = [],
        method: string = 'PSK-RSA'
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Creating asset')
        return new SubscribablePromise(async observer => {
            const { gatewayUri } = this.config
            const { didRegistry, templates } = this.nevermined.keeper

            const serviceAgreementTemplate = (metadata.main.type === 'compute') ?
                await templates.escrowComputeExecutionTemplate.getServiceAgreementTemplate() :
                await templates.escrowAccessSecretStoreTemplate.getServiceAgreementTemplate()

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
                ],
                service: [,
                    ...services
                ].reverse() as Service[]
            })

            if (metadata.main.type === 'compute') {
                await ddo.addService(this.nevermined, this.createComputeService(templates, publisher, metadata,serviceAgreementTemplate))
            }
            else if (metadata.main.type === 'algorithm' || metadata.main.type === 'dataset') {
                await ddo.addService(this.nevermined, this.createAccessService(templates, publisher, metadata,serviceAgreementTemplate))
      
            }

            let publicKey = await this.nevermined.gateway.getRsaPublicKey()
            if (method == 'PSK_ECDSA') {
                publicKey = this.nevermined.gateway.getEcdsaPublicKey()
            }
            await ddo.addService(this.nevermined, this.createAuthorizationService(gatewayUri, publicKey, method))
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
                        ...metadata.main,
                    } as any
                }
            } as Service)

            ddo.service.sort((a, b) => (a.index > b.index) ? 1 : -1)

            this.logger.log('Generating proof')
            observer.next(CreateProgressStep.GeneratingProof)
            await ddo.addProof(
                this.nevermined,
                publisher.getId(),
                publisher.getPassword()
            )
            await ddo.assignDid(ddo.proof.checksum)
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

            const serviceEndpoint = this.nevermined.metadata.getServiceEndpoint(DID.parse(ddo.id))

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
            if (metadata.main.type === 'compute') {
                const rawConditions = await templates.escrowComputeExecutionTemplate.getServiceAgreementTemplateConditions()
                const conditions = fillConditionsWithDDO(rawConditions, ddo)
                serviceAgreementTemplate.conditions = conditions
            }
            else if (metadata.main.type === 'algorithm' || metadata.main.type === 'dataset') {
                const rawConditions = await templates.escrowAccessSecretStoreTemplate.getServiceAgreementTemplateConditions()
                const conditions = fillConditionsWithDDO(rawConditions, ddo)
                serviceAgreementTemplate.conditions = conditions
            }

            this.logger.log('Files encrypted')
            observer.next(CreateProgressStep.FilesEncrypted)
            this.logger.log('Registering DID')
            observer.next(CreateProgressStep.RegisteringDid)
            await didRegistry.registerAttribute(
                ddo.shortId(),
                ddo.checksum(ddo.shortId()),
                [this.config.gatewayAddress],
                serviceEndpoint,
                publisher.getId()
            )
            this.logger.log('DID registred')
            observer.next(CreateProgressStep.DidRegistred)

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
        service: Service[] = [], 
        method: string = 'PSK-RSA'
        ): SubscribablePromise<CreateProgressStep, DDO> {
            return new SubscribablePromise(async observer => {
                const computeService = {main: {
                    name: "dataAssetComputeServiceAgreement",
                    creator: publisher.getId(),
                    datePublished: metadata.main.dateCreated,
                    price: metadata.main.price,
                    timeout: 86400,
                    provider: this.providerConfig()
                    }
                }

                return this.create(metadata, publisher, [   {
                    type: 'compute',
                    index: 4,
                    serviceEndpoint: this.nevermined.gateway.getExecutionEndpoint(),
                    attributes: computeService
                } as Service], method )
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
            const templateName = ddo.findServiceById(index)
                .attributes.serviceAgreementTemplate.contractName
            const template = keeper.getTemplateByName(templateName)
            const accessCondition = keeper.conditions.accessSecretStoreCondition

            // eslint-disable-next-line no-async-promise-executor
            const paymentFlow = new Promise(async (resolve, reject) => {
                await template.getAgreementCreatedEvent(agreementId).once()

                this.logger.log('Agreement initialized')
                observer.next(OrderProgressStep.AgreementInitialized)

                const { attributes } = ddo.findServiceByType('metadata')

                this.logger.log('Locking payment')

                const accessGranted = accessCondition
                    .getConditionFulfilledEvent(agreementId)
                    .once()

                observer.next(OrderProgressStep.LockingPayment)
                const paid = await agreements.conditions.lockReward(
                    agreementId,
                    attributes.main.price,
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
            await agreements.create(
                did,
                agreementId,
                index,
                undefined,
                consumer,
                consumer
            )
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

        return (await gateway.execute(agreementId, computeDid, workflowDid, consumer)).workflowId
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
            await this.nevermined.keeper.conditions.accessSecretStoreCondition.getGrantedDidByConsumer(
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
    public async search(text: string) {
        return this.nevermined.metadata.queryMetadataByText({
            text,
            page: 1,
            offset: 100,
            query: {
                value: 1
            },
            sort: {
                value: 1
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

    public async computeLogs(agreementId: string, executionId: string, account: Account){
        return await this.nevermined.gateway.computeLogs(agreementId, executionId, account)
    }

    public async computeStatus(agreementId: string, executionId: string, account: Account){
        return await this.nevermined.gateway.computeStatus(agreementId, executionId, account)
    }

    public async mint(did: string, amount: number, account: Account){
        return await this.nevermined.keeper.didRegistry.mint(did, amount, account.getId())

    }

    public async burn(did: string, amount: number, account: Account){
        return await this.nevermined.keeper.didRegistry.burn(did, amount, account.getId())

    }

    public async transferNft(did: string, to: string,  amount: number, account: Account){
        return await this.nevermined.keeper.didRegistry.transferNft(did, to,  amount, account.getId())

    }

    public async balance(address: string, did: string, ){
        return await this.nevermined.keeper.didRegistry.balance(address, did)

    }

    private async providerConfig(){
        return  {
            'type': 'Azure',
            'description': '',
            'environment': {
                'cluster': {
                    'type': 'Kubernetes',
                    'url': 'http://10.0.0.17/xxx'
                },
                'supportedContainers': [
                    {
                        'image': 'tensorflow/tensorflow',
                        'tag': 'latest',
                        'checksum':
                            'sha256:cb57ecfa6ebbefd8ffc7f75c0f00e57a7fa739578a429b6f72a0df19315deadc'
                    },
                    {
                        'image': 'tensorflow/tensorflow',
                        'tag': 'latest',
                        'checksum':
                            'sha256:cb57ecfa6ebbefd8ffc7f75c0f00e57a7fa739578a429b6f72a0df19315deadc'
                    }
                ],
                'supportedServers': [
                    {
                        'serverId': '1',
                        'serverType': 'xlsize',
                        'price': '50',
                        'cpu': '16',
                        'gpu': '0',
                        'memory': '128gb',
                        'disk': '160gb',
                        'maxExecutionTime': 86400
                    },
                    {
                        'serverId': '2',
                        'serverType': 'medium',
                        'price': '10',
                        'cpu': '2',
                        'gpu': '0',
                        'memory': '8gb',
                        'disk': '80gb',
                        'maxExecutionTime': 86400
                    }
                ]
            }
        }
    }

    private createAccessService(templates, publisher, metadata: MetaData, serviceAgreementTemplate){
        return {
            type: 'access',
            index: 3,
            serviceEndpoint: this.nevermined.gateway.getAccessEndpoint(),
            templateId: templates.escrowAccessSecretStoreTemplate.getAddress(),
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

    private createComputeService(templates, publisher, metadata: MetaData, serviceAgreementTemplate){
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

    private createAuthorizationService(gatewayUri: string, publicKey: string, method: string){
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
}
