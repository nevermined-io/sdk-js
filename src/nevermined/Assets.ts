import { TransactionReceipt } from 'web3-core'
import { SearchQuery } from '../metadata/Metadata'
import { DDO } from '../ddo/DDO'
import { MetaData } from '../ddo/MetaData'
import { Service, ServiceType } from '../ddo/Service'
import Account from './Account'
import DID from './DID'
import {
    fillConditionsWithDDO,
    SubscribablePromise,
    generateId,
    zeroX,
    didZeroX,
    getAssetRewardsFromService,
    findServiceConditionByName
} from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import AssetRewards from '../models/AssetRewards'
import { ServiceAgreementTemplate } from '../ddo/ServiceAgreementTemplate'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { GenericAccess } from '../keeper/contracts/templates/GenericAccess'

export enum CreateProgressStep {
    ServicesAdded,
    GeneratingProof,
    ProofGenerated,
    ConditionsFilled,
    EncryptingFiles,
    FilesEncrypted,
    StoringDdo,
    DdoStored,
    RegisteringDid,
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
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Creating NFT721')
        return new SubscribablePromise(async observer => {
            const { gatewayUri } = this.config
            const { didRegistry, templates } = this.nevermined.keeper

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

            this.logger.debug('NTF721 Sales Template')
            const nft721SalesServiceAgreementTemplate = await templates.nft721SalesTemplate.getServiceAgreementTemplate()

            await ddo.addService(
                this.nevermined,
                await this.createNft721SalesService(
                    metadata,
                    publisher,
                    nft721SalesServiceAgreementTemplate
                )
            )

            this.logger.debug('NTF721 Access Template')
            const nft721AccessServiceAgreementTemplate = await templates.nft721AccessTemplate.getServiceAgreementTemplate()

            await ddo.addService(
                this.nevermined,
                await this.createNft721AccessService(
                    metadata,
                    publisher,
                    nft721AccessServiceAgreementTemplate
                )
            )

            this.logger.debug('NTF721 Aave Credit Template')
            const nftAaveCreditServiceAgreementTemplate = await templates.aaveCreditTemplate.getServiceAgreementTemplate()

            await ddo.addService(
                this.nevermined,
                await this.createNftAaveCreditService(
                    metadata,
                    publisher,
                    nftAaveCreditServiceAgreementTemplate
                )
            )

            this.logger.log('Services Added')
            observer.next(CreateProgressStep.ServicesAdded)

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

            const nft721SalesTemplateConditions = await templates.nft721SalesTemplate.getServiceAgreementTemplateConditions()
            nft721SalesServiceAgreementTemplate.conditions = fillConditionsWithDDO(
                nft721SalesTemplateConditions,
                ddo,
                assetRewards,
                erc20TokenAddress || this.nevermined.token.getAddress(),
                nftTokenAddress,
                publisher.getId()
            )

            const nft721AccessTemplateConditions = await templates.nft721AccessTemplate.getServiceAgreementTemplateConditions()
            nft721AccessServiceAgreementTemplate.conditions = fillConditionsWithDDO(
                nft721AccessTemplateConditions,
                ddo,
                assetRewards,
                erc20TokenAddress || this.nevermined.token.getAddress(),
                nftTokenAddress,
                publisher.getId()
            )

            const nft721AaveCreditTemplateConditions = await templates.aaveCreditTemplate.getServiceAgreementTemplateConditions()
            nftAaveCreditServiceAgreementTemplate.conditions = fillConditionsWithDDO(
                nft721AaveCreditTemplateConditions,
                ddo,
                assetRewards,
                erc20TokenAddress || this.nevermined.token.getAddress(),
                nftTokenAddress,
                publisher.getId()
            )

            this.logger.log('Conditions filled')
            observer.next(CreateProgressStep.ConditionsFilled)

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

            this.logger.log('Storing DDO', ddo.id)
            observer.next(CreateProgressStep.StoringDdo)
            const storedDdo = await this.nevermined.metadata.storeDDO(ddo)
            this.logger.log('DDO stored')
            observer.next(CreateProgressStep.DdoStored)

            const ddoStatus = await this.nevermined.metadata.status(storedDdo.id)
            if (ddoStatus.external) {
                serviceEndpoint = ddoStatus.external.url
            }

            this.logger.log('Registering Mintable DID', ddo.id)
            observer.next(CreateProgressStep.RegisteringDid)

            await didRegistry.registerMintableDID721(
                didSeed,
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
        cap?: number,
        providers?: string[],
        nftAmount?: number,
        royalties?: number,
        erc20TokenAddress?: string,
        preMint: boolean = true,
        nftMetadata?: string,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Creating NFT')
        return new SubscribablePromise(async observer => {
            const { gatewayUri } = this.config
            const { didRegistry, templates } = this.nevermined.keeper

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

            this.logger.debug('NTF Sales Template')
            const nftSalesServiceAgreementTemplate = await templates.nftSalesTemplate.getServiceAgreementTemplate()

            await ddo.addService(
                this.nevermined,
                await this.createNftSalesService(
                    metadata,
                    publisher,
                    nftSalesServiceAgreementTemplate
                )
            )

            this.logger.debug('NTF Access Template')
            const nftAccessServiceAgreementTemplate = await templates.nftAccessTemplate.getServiceAgreementTemplate()

            await ddo.addService(
                this.nevermined,
                await this.createNftAccessService(
                    metadata,
                    publisher,
                    nftAccessServiceAgreementTemplate
                )
            )

            this.logger.log('Services Added')
            observer.next(CreateProgressStep.ServicesAdded)

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

            this.logger.log('Filling Conditions')
            const nftAccessTemplateConditions = await templates.nftAccessTemplate.getServiceAgreementTemplateConditions()
            nftAccessServiceAgreementTemplate.conditions = fillConditionsWithDDO(
                nftAccessTemplateConditions,
                ddo,
                assetRewards,
                erc20TokenAddress || this.nevermined.token.getAddress(),
                undefined,
                publisher.getId(),
                nftAmount
            )

            const nftSalesTemplateConditions = await templates.nftSalesTemplate.getServiceAgreementTemplateConditions()
            nftSalesServiceAgreementTemplate.conditions = fillConditionsWithDDO(
                nftSalesTemplateConditions,
                ddo,
                assetRewards,
                erc20TokenAddress || this.nevermined.token.getAddress(),
                undefined,
                publisher.getId(),
                nftAmount
            )

            this.logger.log('Conditions filled')
            observer.next(CreateProgressStep.ConditionsFilled)

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

            this.logger.log('Storing DDO', ddo.id)
            observer.next(CreateProgressStep.StoringDdo)
            const storedDdo = await this.nevermined.metadata.storeDDO(ddo)
            this.logger.log('DDO stored')
            observer.next(CreateProgressStep.DdoStored)

            const ddoStatus = await this.nevermined.metadata.status(storedDdo.id)
            if (ddoStatus.external) {
                serviceEndpoint = ddoStatus.external.url
            }

            this.logger.log('Registering Mintable DID', ddo.id)
            observer.next(CreateProgressStep.RegisteringDid)

            await didRegistry.registerMintableDID(
                didSeed,
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

            this.logger.log('Mintable DID registred')
            observer.next(CreateProgressStep.DidRegistered)

            return storedDdo
        })
    }

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
        services: Service[] = [],
        method: string = 'PSK-RSA',
        providers?: string[],
        erc20TokenAddress?: string,
        params?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        this.logger.log('Creating asset')
        return new SubscribablePromise(async observer => {
            const { gatewayUri } = this.config
            const { didRegistry, templates } = this.nevermined.keeper

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

            if (services.length > 0) {
                ddo.service = [, ...services].reverse() as Service[]
            }

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

            const accessServiceAgreementTemplate = await templates.accessTemplate.getServiceAgreementTemplate()
            const accessProofServiceAgreementTemplate = await templates.accessProofTemplate.getServiceAgreementTemplate()
            const computeServiceAgreementTemplate = await templates.escrowComputeExecutionTemplate.getServiceAgreementTemplate()

            if (serviceTypes.includes('access')) {
                this.logger.log('Access service Added')
                await ddo.addService(
                    this.nevermined,
                    this.createAccessService(
                        templates,
                        publisher,
                        metadata,
                        accessServiceAgreementTemplate
                    )
                )
            }

            if (serviceTypes.includes('access-proof')) {
                this.logger.log('Access proof service Added')
                await ddo.addService(
                    this.nevermined,
                    this.createAccessProofService(
                        templates,
                        publisher,
                        metadata,
                        accessProofServiceAgreementTemplate
                    )
                )
            }

            if (serviceTypes.includes('compute')) {
                this.logger.log('Compute service Added')
                await ddo.addService(
                    this.nevermined,
                    this.createComputeService(
                        templates,
                        publisher,
                        metadata,
                        computeServiceAgreementTemplate
                    )
                )
            }

            this.logger.log('Services Added')
            observer.next(CreateProgressStep.ServicesAdded)

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

            if (serviceTypes.includes('access')) {
                const accessTemplateConditions = await templates.accessTemplate.getServiceAgreementTemplateConditions()
                accessServiceAgreementTemplate.conditions = fillConditionsWithDDO(
                    accessTemplateConditions,
                    ddo,
                    assetRewards,
                    erc20TokenAddress || this.nevermined.token.getAddress()
                )
            }

            if (serviceTypes.includes('access-proof')) {
                const templateConditions = await templates.accessProofTemplate.getServiceAgreementTemplateConditions()
                accessProofServiceAgreementTemplate.conditions = fillConditionsWithDDO(
                    templateConditions,
                    ddo,
                    assetRewards,
                    erc20TokenAddress || this.nevermined.token.getAddress()
                )
            }

            if (serviceTypes.includes('compute')) {
                const escrowComputeExecutionTemplateConditions = await templates.escrowComputeExecutionTemplate.getServiceAgreementTemplateConditions()
                computeServiceAgreementTemplate.conditions = fillConditionsWithDDO(
                    escrowComputeExecutionTemplateConditions,
                    ddo,
                    assetRewards,
                    erc20TokenAddress || this.nevermined.token.getAddress()
                )
            }

            this.logger.log('Conditions filled')
            observer.next(CreateProgressStep.ConditionsFilled)

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

            this.logger.log('Storing DDO')
            observer.next(CreateProgressStep.StoringDdo)
            const storedDdo = await this.nevermined.metadata.storeDDO(ddo)
            this.logger.log('DDO stored')
            observer.next(CreateProgressStep.DdoStored)

            const ddoStatus = await this.nevermined.metadata.status(storedDdo.id)
            if (ddoStatus.external) {
                serviceEndpoint = ddoStatus.external.url
            }

            this.logger.log('Registering DID', ddo.id)
            observer.next(CreateProgressStep.RegisteringDid)

            await didRegistry.registerAttribute(
                didSeed,
                ddo.checksum(ddo.shortId()),
                providers || [this.config.gatewayAddress],
                serviceEndpoint,
                publisher.getId(),
                params
            )

            this.logger.log('DID registred')
            observer.next(CreateProgressStep.DidRegistered)

            return storedDdo
        })
    }

    public createCompute(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        service: Service[] = [],
        method: string = 'PSK-RSA',
        params?: TxParameters
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
            throw new Error(
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

    public async consumeProof(
        agreementId: string,
        did: string,
        consumerAccount: Account
    ): Promise<string | true> {
        const ddo = await this.resolve(did)
        const { attributes } = ddo.findServiceByType('metadata')
        const { serviceEndpoint } = ddo.findServiceByType('access-proof')
        const { files } = attributes.main

        if (!serviceEndpoint) {
            throw new Error(
                'Consume asset failed, service definition is missing the `serviceEndpoint`.'
            )
        }

        return await this.nevermined.gateway.consumeProofService(
            did,
            agreementId,
            serviceEndpoint,
            consumerAccount,
            files
        )
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
        return new SubscribablePromise(async observer => {
            const agreementIdSeed = zeroX(generateId())
            const ddo = await this.resolve(did)

            const { keeper } = this.nevermined
            const service = ddo.findServiceByType(serviceType)
            const templateName = service.attributes.serviceAgreementTemplate.contractName

            const template = keeper.getAccessTemplateByName(templateName)
            const assetRewards = getAssetRewardsFromService(service)

            this.logger.log(`Creating ${serviceType} agreement and paying`)
            const agreementId = await template.createAgreementWithPaymentFromDDO(
                agreementIdSeed,
                ddo,
                assetRewards,
                consumer,
                serviceType,
                consumer,
                consumer,
                undefined,
                params,
                a => observer.next(a)
            )

            if (!agreementId) {
                throw Error(`Error creating ${serviceType} agreement`)
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
        newOwner: string,
        params?: TxParameters
    ): Promise<TransactionReceipt> {
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
            throw new Error(
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
                    timeout: 3600
                },
                serviceAgreementTemplate
            }
        } as Service
    }

    private createAccessProofService(
        templates,
        publisher,
        metadata: MetaData,
        serviceAgreementTemplate
    ) {
        return {
            type: 'access-proof',
            index: 10,
            serviceEndpoint: this.nevermined.gateway.getAccessProofEndpoint(),
            templateId: templates.accessProofTemplate.getAddress(),
            attributes: {
                main: {
                    creator: publisher.getId(),
                    datePublished: metadata.main.datePublished,
                    name: 'dataAssetAccessProofServiceAgreement',
                    timeout: 3600,
                    _hash: metadata.additionalInformation.poseidonHash,
                    _providerPub: [
                        metadata.additionalInformation.providerKey.x,
                        metadata.additionalInformation.providerKey.y
                    ]
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
                    service: method,
                    threshold: 0
                }
            }
        } as Service
    }

    private async createNftAccessService(
        metadata: MetaData,
        publisher: Account,
        serviceAgreementTemplate: ServiceAgreementTemplate
    ): Promise<Service> {
        const { nftAccessTemplate } = this.nevermined.keeper.templates
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
        publisher: Account,
        serviceAgreementTemplate: ServiceAgreementTemplate
    ): Promise<Service> {
        const { nftSalesTemplate } = this.nevermined.keeper.templates
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
                    timeout: 86400
                },
                additionalInformation: {
                    description: ''
                },
                serviceAgreementTemplate
            }
        }
    }

    private async createNftAaveCreditService(
        metadata: MetaData,
        publisher: Account,
        serviceAgreementTemplate: ServiceAgreementTemplate
    ): Promise<Service> {
        const { aaveCreditTemplate } = this.nevermined.keeper.templates
        return {
            type: 'aave-credit',
            index: 11,
            serviceEndpoint: this.nevermined.gateway.getNft721Endpoint(),
            templateId: aaveCreditTemplate.getAddress(),
            attributes: {
                main: {
                    name: 'aaveCreditAgreement',
                    creator: publisher.getId(),
                    datePublished: metadata.main.datePublished,
                    timeout: 86400
                },
                additionalInformation: {
                    description: 'Aave credit agreement using NFT721 as collateral'
                },
                serviceAgreementTemplate
            }
        }

    }

    private async createNft721AccessService(
        metadata: MetaData,
        publisher: Account,
        serviceAgreementTemplate: ServiceAgreementTemplate
    ): Promise<Service> {
        const { nft721AccessTemplate } = this.nevermined.keeper.templates
        return {
            type: 'nft721-access',
            index: 9,
            serviceEndpoint: this.nevermined.gateway.getNftAccessEndpoint(),
            templateId: nft721AccessTemplate.getAddress(),
            attributes: {
                main: {
                    name: 'nft721AccessAgreement',
                    creator: publisher.getId(),
                    datePublished: metadata.main.datePublished,
                    timeout: 86400
                },
                additionalInformation: {
                    description: 'NFT721 Access Service Definition'
                },
                serviceAgreementTemplate
            }
        }
    }

    private async createNft721SalesService(
        metadata: MetaData,
        publisher: Account,
        serviceAgreementTemplate: ServiceAgreementTemplate
    ): Promise<Service> {
        const { nft721SalesTemplate } = this.nevermined.keeper.templates
        return {
            type: 'nft721-sales',
            index: 8,
            serviceEndpoint: this.nevermined.gateway.getNft721Endpoint(),
            templateId: nft721SalesTemplate.getAddress(),
            attributes: {
                main: {
                    name: 'nft721SalesAgreement',
                    creator: publisher.getId(),
                    datePublished: metadata.main.datePublished,
                    timeout: 86400
                },
                additionalInformation: {
                    description: 'NFT721 Sales Service Definition'
                },
                serviceAgreementTemplate
            }
        }
    }
}
