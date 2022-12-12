import { DDO } from '../../ddo/DDO'
import { MetaData } from '../../ddo/MetaData'
import { ServiceType } from '../../ddo/Service'
import Account from '../Account'
import {
    SubscribablePromise,
    didZeroX
} from '../../utils'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { TxParameters } from '../../keeper/contracts/ContractBase'
import { AssetError } from '../../errors'
import { RoyaltyScheme } from '../../keeper/contracts/royalties'
import { Nevermined } from '../../sdk'
import { ContractReceipt } from 'ethers'
import { SignatureUtils } from '../utils/SignatureUtils'
import { DIDResolvePolicy, RegistryBaseApi } from './RegistryBaseApi'
import { CreateProgressStep, OrderProgressStep, UpdateProgressStep } from '../ProgessSteps'
import { AssetAttributes } from '../../models/AssetAttributes'

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
 * Nevermined Assets API. It allows the registration and management of digital assets in a 
 * Nevermined digital ecosystem. 
 * You can find more information about you can do in a Nevermined information here:
 * {@link https://docs.nevermined.io/docs/architecture/what-can-i-do}
 */
export class AssetsApi extends RegistryBaseApi {

    /**
     * Stores the default Provenance Activity Id to be recorded on-chain in the DIDRegistry Smart Contract when 
     * an asset is registered. It associates to the new DID created the 'Asset Registration' activity.
     * (@see https://docs.nevermined.io/docs/architecture/specs/Spec-PROVENANCE#provenance-relations)
     * 
     */
    static DEFAULT_REGISTRATION_ACTIVITY_ID = SignatureUtils.hash('AssetRegistration')
    /**
     * Returns the instance of the AssetsApi.
     * @param config - Configuration of the Nevermined instance
     * @returns {@link AssetsApi}
     */
    public static async getInstance(config: InstantiableConfig): Promise<AssetsApi> {
        const instance = new AssetsApi()
        instance.servicePlugin = AssetsApi.getServicePlugin(config)
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
        return this.resolveAsset(did, policy)
    }

    /**
     * Given a DID, updates the metadata associated to the asset. It also can upload this metadata to a remote decentralized stored depending on the `publishMetadata` parameter.
     * 
     * @example
     * ```ts
     * const ddoUpdated = await nevermined.assets.update(
     *      ddo.shortId(), 
     *      updatedMetadata, 
     *      publisher, 
     *      PublishMetadata.IPFS
     * )
     * ```
     * 
     * @param did - Decentralized ID representing the unique id of an asset in a Nevermined network.
     * @param metadata - Metadata describing the asset
     * @param publisher - Account of the user updating the metadata
     * @param publishMetadata - It allows to specify where to store the metadata  
     * @param txParams - Optional transaction parameters
     * @returns {@link DDO} The DDO updated
     */
    public update(
        did: string,
        metadata: MetaData,
        publisher: Account,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<UpdateProgressStep, DDO> {
        return this.updateAsset(did, metadata, publisher, publishMetadata, txParams)
    }



    /**
     * Registers a new asset in Nevermined. 
     * You can find more information about how different data is stored in Nevermined here:
     * {@link https://docs.nevermined.io/docs/architecture/nevermined-data}
     *
     * @param assetAttributes - Attributes describing the asset
     * @param publishMetadata - Allows to specify if the metadata should be stored in different backends
     * @param publisher - The account publishing the asset
     * @param txParams - Optional transaction parameters
     * @returns The metadata of the asset created (DDO)
     *
     * @returns {@link DDO}
     */
    public create(
        assetAttributes: AssetAttributes,
        publisher: Account,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.registerNeverminedAsset(
            assetAttributes,
            publisher,
            publishMetadata,
            undefined,
            txParams
        )
    }

    /**
     * Start the purchase/order of an access service. Starts by signing the service agreement
     * then sends the request to the publisher via the service endpoint (Node http service).
     * If the access service to purchase is having associated some price, it will make the payment
     * for that service.
     * @param did - Unique identifier of the asset to order
     * @param consumerAccount - The account of the user ordering the asset
     * @returns The agreement ID identifying the order
     */
     public order(
        did: string,
        consumerAccount: Account,
        params?: TxParameters
    ): SubscribablePromise<OrderProgressStep, string> {
        return this.orderAsset(did, 'access', consumerAccount, params)
    }


    /**
     * Having previously ordered an "access" service (referenced via an "agreementId"). 
     * This method allows to download the assets associated to that service.
     * @param agreementId  - The unique identifier of the order placed for a service
     * @param did - Unique identifier of the asset ordered
     * @param consumerAccount - The account of the user who ordered the asset and is downloading the files
     * @param resultPath - Where the files will be downloaded
     * @param fileIndex - The file to download. If not given or is -1 it will download all of them.
     * @returns The result path or true if everything went okay
     */
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

    /**
     * Having previously ordered an "access" service (referenced via an "agreementId"). 
     * This method allows to download the assets associated to that service.
     * @param agreementId  - The unique identifier of the order placed for a service
     * @param did - Unique identifier of the asset ordered
     * @param consumerAccount - The account of the user who ordered the asset and is downloading the files
     * @param resultPath - Where the files will be downloaded
     * @param fileIndex - The file to download. If not given or is -1 it will download all of them.
     * @returns The result path or true if everything went okay
     */
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
     * Returns the owner of an asset.
     * @param did - Decentralized ID.
     * @returns The address of the owner of the asset
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
     * Returns the assets owned by an address
     * @param owner - The address to check 
     * @returns List of DIDs owned by the address
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


    /**
     * It grants permissions to an account for a specific asset represented by a DID.
     * Only can be called by the asset owner.
     * @param did - The unique identifier of the assert
     * @param address - The account to grant the permissions
     * @param account - Account sending the request. It must be the owner of the asset
     * @param params  - Transaction parameters
     */    
    public async grantPermissions(
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

    /**
     * It revokes permissions to an account for a specific asset represented by a DID.
     * Only can be called by the asset owner.
     * @param did - The unique identifier of the assert
     * @param address - The account to revoke the permissions
     * @param account - Account sending the request. It must be the owner of the asset
     * @param params  - Transaction parameters
     */
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

    /**
     * Checks if an account with a specific address has permissions to a specific asset represented by a DID
     * @param did - The unique identifier of the asset to check the permissions
     * @param address - The address of the account to check the permissions
     * @returns True if the address has permissions on the asset
     */
    public async getPermissions(did: string, address: string) {
        return await this.nevermined.keeper.didRegistry.getPermission(did, address)
    }
}
