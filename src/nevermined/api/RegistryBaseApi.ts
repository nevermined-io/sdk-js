import { NVMBaseApi } from "./NVMBaseApi"
import { ServiceType } from "../../ddo/Service"
import { MetaData, Account, DDO } from "../.."
import { NvmConfigVersions } from "../../ddo/NvmConfig"
import { TxParameters } from "../../keeper/contracts/ContractBase"
import { SubscribablePromise, zeroX, generateId } from "../../utils"
import { PublishMetadata } from "./AssetsApi"
import { OrderProgressStep, UpdateProgressStep } from "../ProgessSteps"
import { AssetError } from "../../errors/AssetError"

/**
 * It described the policy to be used when resolving an asset. It has the following options:
 * * ImmutableFirst - It checks if there is a reference to an immutable data-store (IPFS, Filecoin, etc) on-chain. If that's the case uses the URL to resolve the Metadata. If not try to resolve the metadata using the URL of the Metadata/Marketplace API
 * * MetadataAPIFirst - Try to resolve the metadata from the Marketplace/Metadata API, if it can't tries to resolve using the immutable url
 * * OnlyImmutable - Try to resolve the metadata only from the immutable data store URL
 * * OnlyMetadataAPI - Try to resolve the metadata only from the Marketplace/Metadata API
 */
export enum DIDResolvePolicy {
    ImmutableFirst,
    MetadataAPIFirst,
    OnlyImmutable,
    OnlyMetadataAPI
}

/**
 * Abstract class proving common functionality related with Assets registration.
 */
export abstract class RegistryBaseApi extends NVMBaseApi {

    /**
     * Given a DID, updates the metadata associated to the asset. It also can upload this metadata to a remote decentralized stored depending on the `publishMetadata` parameter.
     * @param did - Decentralized ID representing the unique id of an asset in a Nevermined network.
     * @param metadata - Metadata describing the asset
     * @param publisher - Account of the user updating the metadata
     * @param publishMetadata - It allows to specify where to store the metadata  
     * @param txParams - Optional transaction parameters
     * @returns {@link DDO} The DDO updated
     */
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
                        await this.nevermined.services.node.publishImmutableContent(ddo, publishMetadata))
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
            const storedDdo = await this.nevermined.services.metadata.updateDDO(ddo.id, ddo)
            
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
            return await this.nevermined.services.metadata.retrieveDDOFromImmutableBackend(immutableUrl)
        else if (policy === DIDResolvePolicy.OnlyMetadataAPI)
            return await this.nevermined.services.metadata.retrieveDDOByUrl(serviceEndpoint)
        else if (policy === DIDResolvePolicy.ImmutableFirst) {
            try {             
                return await this.nevermined.services.metadata.retrieveDDOFromImmutableBackend(immutableUrl)                
            } catch (error) {
                this.logger.debug(`Unable to fetch DDO from immutable data store`)
            }
            return await this.nevermined.services.metadata.retrieveDDOByUrl(serviceEndpoint)
        } else { // DIDResolvePolicy.MetadataAPIFirst
            try {
                return await this.nevermined.services.metadata.retrieveDDOByUrl(serviceEndpoint)
            } catch (error) {
                this.logger.debug(`Unable to fetch DDO metadata api`)
            }
            return await this.nevermined.services.metadata.retrieveDDOFromImmutableBackend(immutableUrl)
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