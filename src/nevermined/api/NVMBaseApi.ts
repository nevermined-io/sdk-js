import { Account, CreateProgressStep, DDO } from "../.."
import { NvmConfigVersions } from "../../ddo/NvmConfig"
import { Service, ServicePlugin } from "../../ddo/Service"
import { ServiceAgreementTemplate } from "../../ddo/ServiceAgreementTemplate"
import { Instantiable, InstantiableConfig } from "../../Instantiable.abstract"
import { TxParameters } from "../../keeper/contracts/ContractBase"
import { ServiceAaveCredit } from "../../keeper/contracts/defi/Service"
import { DEFAULT_REGISTRATION_ACTIVITY_ID } from "../../keeper/contracts/Provenance"
import { AssetAttributes } from "../../models/AssetAttributes"
import { NFTAttributes } from "../../models/NFTAttributes"
import { SubscribablePromise, fillConditionsWithDDO } from "../../utils"
import { AccessService, NFTAccessService, NFTSalesService } from "../AccessService"
import DID from "../DID"
import { PublishMetadata } from "./AssetsApi"

/**
 * Abstract class providing common functionality to all the Nevermined public APIs
 */
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
            const { neverminedNodeUri } = this.config
            const { didRegistry } = this.nevermined.keeper
            const tokenAddress = assetAttributes.price.getTokenAddress() || this.nevermined.utils.token.getAddress()

            // create ddo itself
            const ddo = DDO.getInstance(assetAttributes.metadata.userId, publisher.getId(), assetAttributes.appId)

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
                const encryptedFilesResponse = await this.nevermined.services.node.encrypt(
                    ddo.id,
                    JSON.stringify(assetAttributes.metadata.main.files),
                    new String(assetAttributes.encryptionMethod)
                )
                encryptedFiles = JSON.parse(encryptedFilesResponse)['hash']
            }

            let serviceEndpoint = this.nevermined.services.metadata.getServiceEndpoint(
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
                        await this.nevermined.services.node.publishImmutableContent(ddo, publishMetadata))
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
                        DEFAULT_REGISTRATION_ACTIVITY_ID,
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
                        DEFAULT_REGISTRATION_ACTIVITY_ID,                     
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
                    DEFAULT_REGISTRATION_ACTIVITY_ID,                     
                    txParams
                )
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
     * Initialities the default Nevermined service plugins and return that instance
     * @param config Nevermined config
     * @returns The Nevermined Service Plugin instance
     */
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