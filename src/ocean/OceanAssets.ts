import { TransactionReceipt } from 'web3-core'
import { SearchQuery } from '../aquarius/Aquarius'
import { DDO } from '../ddo/DDO'
import { MetaData } from '../ddo/MetaData'
import { Service } from '../ddo/Service'
import Account from './Account'
import DID from './DID'
import { fillConditionsWithDDO, SubscribablePromise, generateId, zeroX } from '../utils'
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

/**
 * Assets submodule of Ocean Protocol.
 */
export class OceanAssets extends Instantiable {
    /**
     * Returns the instance of OceanAssets.
     * @return {Promise<OceanAssets>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<OceanAssets> {
        const instance = new OceanAssets()
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
        } = await this.ocean.keeper.didRegistry.getAttributesByDid(did)
        return this.ocean.aquarius.retrieveDDOByUrl(serviceEndpoint)
    }

    /**
     * Creates a new DDO.
     * @param  {MetaData} metadata DDO metadata.
     * @param  {Account} publisher Publisher account.
     * @return {Promise<DDO>}
     */
    public create(
        metadata: MetaData,
        publisher: Account,
        services: Service[] = []
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Creating asset')
        return new SubscribablePromise(async observer => {
            const { secretStoreUri } = this.config
            const { didRegistry, templates } = this.ocean.keeper

            const did: DID = DID.generate()

            this.logger.log('Encrypting files')
            observer.next(CreateProgressStep.EncryptingFiles)
            const encryptedFiles = await this.ocean.secretStore.encrypt(
                did.getId(),
                metadata.main.files,
                publisher
            )
            this.logger.log('Files encrypted')
            observer.next(CreateProgressStep.FilesEncrypted)

            const serviceAgreementTemplate = await templates.escrowAccessSecretStoreTemplate.getServiceAgreementTemplate()

            const serviceEndpoint = this.ocean.aquarius.getServiceEndpoint(did)

            let indexCount = 0
            // create ddo itself
            const ddo: DDO = new DDO({
                id: did.getDid(),
                authentication: [
                    {
                        type: 'RsaSignatureAuthentication2018',
                        publicKey: did.getDid()
                    }
                ],
                publicKey: [
                    {
                        id: did.getDid(),
                        type: 'EthereumECDSAKey',
                        owner: publisher.getId()
                    }
                ],
                service: [
                    {
                        type: 'access',
                        serviceEndpoint: this.ocean.brizo.getConsumeEndpoint(),
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
                    },
                    {
                        type: 'authorization',
                        service: 'SecretStore',
                        serviceEndpoint: secretStoreUri,
                        attributes: { main: {} }
                    },
                    {
                        type: 'metadata',
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
                                files: metadata.main.files.map((file, index) => ({
                                    ...file,
                                    index,
                                    url: undefined
                                }))
                            } as any
                        }
                    },
                    ...services
                ]
                    // Remove duplications
                    .reverse()
                    .filter(
                        ({ type }, i, list) =>
                            list.findIndex(({ type: t }) => t === type) === i
                    )
                    .reverse()
                    // Adding index
                    .map(_ => ({
                        ..._,
                        index: indexCount++
                    })) as Service[]
            })

            // Overwrite initial service agreement conditions
            const rawConditions = await templates.escrowAccessSecretStoreTemplate.getServiceAgreementTemplateConditions()
            const conditions = fillConditionsWithDDO(rawConditions, ddo)
            serviceAgreementTemplate.conditions = conditions

            this.logger.log('Generating proof')
            observer.next(CreateProgressStep.GeneratingProof)
            await ddo.addProof(this.ocean, publisher.getId(), publisher.getPassword())
            this.logger.log('Proof generated')
            observer.next(CreateProgressStep.ProofGenerated)

            this.logger.log('Registering DID')
            observer.next(CreateProgressStep.RegisteringDid)
            await didRegistry.registerAttribute(
                did.getId(),
                ddo.getChecksum(),
                [this.config.brizoAddress],
                serviceEndpoint,
                publisher.getId()
            )
            this.logger.log('DID registred')
            observer.next(CreateProgressStep.DidRegistred)

            this.logger.log('Storing DDO')
            observer.next(CreateProgressStep.StoringDdo)
            const storedDdo = await this.ocean.aquarius.storeDDO(ddo)
            this.logger.log('DDO stored')
            observer.next(CreateProgressStep.DdoStored)

            return storedDdo
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
            await this.ocean.brizo.consumeService(
                agreementId,
                serviceEndpoint,
                consumerAccount,
                files,
                resultPath,
                index
            )
        } else {
            const files = await this.ocean.secretStore.decrypt(
                did,
                ddo.findServiceByType('metadata').attributes.encryptedFiles,
                consumerAccount,
                ddo.findServiceByType('authorization').serviceEndpoint
            )
            const downloads = files
                .filter(({ index: i }) => index === -1 || index === i)
                .map(({ url, index: i }) =>
                    this.ocean.utils.fetch.downloadFile(url, resultPath, i)
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
     * then sends the request to the publisher via the service endpoint (Brizo http service).
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
            const oceanAgreements = this.ocean.agreements

            const agreementId = zeroX(generateId())
            const ddo = await this.resolve(did)

            const { keeper } = this.ocean
            const templateName = ddo.findServiceByType('access').attributes
                .serviceAgreementTemplate.contractName
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
                const paid = await oceanAgreements.conditions.lockReward(
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

                await accessGranted

                this.logger.log('Access granted')
                resolve()
            })

            observer.next(OrderProgressStep.CreatingAgreement)
            this.logger.log('Creating agreement')
            await oceanAgreements.create(
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
     * Returns the owner of a asset.
     * @param  {string} did Decentralized ID.
     * @return {Promise<string>} Returns Agreement ID
     */
    public async owner(did: string): Promise<string> {
        const ddo = await this.resolve(did)
        const checksum = ddo.getChecksum()
        const { creator, signatureValue } = ddo.proof
        const signer = await this.ocean.utils.signature.verifyText(
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
        return this.ocean.keeper.didRegistry.getAttributesByOwner(owner)
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
        const owner = await this.ocean.assets.owner(did)
        return this.ocean.keeper.didRegistry.transferDIDOwnership(did, newOwner, owner)
    }

    /**
     * Returns the assets of a consumer.
     * @param  {string} consumer Consumer address.
     * @return {Promise<string[]>} List of DIDs.
     */
    public async consumerAssets(consumer: string): Promise<string[]> {
        return (
            await this.ocean.keeper.conditions.accessSecretStoreCondition.getGrantedDidByConsumer(
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
        return this.ocean.aquarius.queryMetadata(query)
    }

    /**
     * Search over the assets using a keyword.
     * @param  {SearchQuery} text Text to filter the assets.
     * @return {Promise<DDO[]>}
     */
    public async search(text: string) {
        return this.ocean.aquarius.queryMetadataByText({
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
}
