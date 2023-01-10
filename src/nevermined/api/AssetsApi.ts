import { DDO, MetaData, ServiceType } from '../../ddo'
import { Account } from '../Account'
import { SubscribablePromise, didZeroX } from '../../utils'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { TxParameters, RoyaltyScheme } from '../../keeper'
import { AssetError } from '../../errors'
import { Nevermined } from '../../sdk'
import { ContractReceipt } from 'ethers'
import { DIDResolvePolicy, RegistryBaseApi } from './RegistryBaseApi'
import {
    CreateProgressStep,
    OrderProgressStep,
    UpdateProgressStep
} from '../ProgressSteps'
import { Providers } from '../Provider'
import { Babysig, AssetAttributes } from '../../models'

/**
 * Where the metadata will be published. Options:
 * - OnlyMetadataAPI, The metadata will be stored only in the Metadata/Marketplace API
 * - IPFS, The metadata will be stored in the Metadata/Marketplace API and IPFS
 * - Filecoin, The metadata will be stored in the Metadata/Marketplace API and Filecoin
 * - Arweave, The metadata will be stored in the Metadata/Marketplace API and Arweave
 */
export enum PublishMetadata {
    OnlyMetadataAPI,
    IPFS,
    Filecoin,
    Arweave
}

/**
 * Attributes defining the royalties model attached to the asset
 */
export interface RoyaltyAttributes {
    royaltyKind: RoyaltyKind
    scheme: RoyaltyScheme
    amount: number
}

/**
 * The type of royalty
 */
export enum RoyaltyKind {
    Standard,
    Curve,
    Legacy
}

/**
 * It gets the on-chain royalties scheme
 * @param nvm Nevermined instance
 * @param kind The type of royalty
 * @returns The royalty scheme
 */
export function getRoyaltyScheme(nvm: Nevermined, kind: RoyaltyKind): RoyaltyScheme {
    if (kind == RoyaltyKind.Standard) {
        return nvm.keeper.royalties.standard
    } else if (kind == RoyaltyKind.Curve) {
        return nvm.keeper.royalties.curve
    }
}

/**
 * It gets a `RoyaltyAttributes` instance
 * @param nvm Nevermined instance
 * @param kind The type of royalty
 * @param amount The amount of royalties to get in the secondary market
 * @returns The RoyaltyAttributes instance
 */
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
     * Utilities about the providers associated to an asset
     */
    public providers: Providers

    /**
     * Creates a new AssetsApi
     * @param config - Configuration of the Nevermined instance
     * @returns {@link AssetsApi}
     */
    constructor(config: InstantiableConfig) {
        super()
        this.servicePlugin = AssetsApi.getServicePlugin(config)
        this.setInstanceConfig(config)
        this.providers = new Providers(config)
    }

    /**
     * Returns a DDO by DID. Depending of the resolution policy it prioritize the Metadata API or Immutable urls.
     * @param did - Decentralized ID.
     * @param policy - It specifies the resolve policy to apply. It allows to select that priorities during the asset resolution via Metadata API or Immutable URLs (IPFS, Filecoin, etc)
     * @returns {@link DDO}
     */
    public async resolve(
        did: string,
        policy: DIDResolvePolicy = DIDResolvePolicy.ImmutableFirst
    ): Promise<DDO> {
        return this.resolveAsset(did, policy)
    }

    /**
     * Registers a new asset in Nevermined.
     * You can find more information about how different data is stored in Nevermined here:
     * {@link https://docs.nevermined.io/docs/architecture/nevermined-data}
     *
     * @param assetAttributes - Attributes describing the asset
     * @param publishMetadata - Allows to specify if the metadata should be stored in different backends
     * @param publisherAccount - The account publishing the asset
     * @param txParams - Optional transaction parameters
     * @returns The metadata of the asset created (DDO)
     *
     * @returns {@link DDO}
     */
    public create(
        assetAttributes: AssetAttributes,
        publisherAccount: Account,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.registerNeverminedAsset(
            assetAttributes,
            publisherAccount,
            publishMetadata,
            undefined,
            txParams
        )
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
     * @param publisherAccount - Account of the user updating the metadata
     * @param publishMetadata - It allows to specify where to store the metadata
     * @param txParams - Optional transaction parameters
     * @returns {@link DDO} The DDO updated
     */
    public update(
        did: string,
        metadata: MetaData,
        publisherAccount: Account,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<UpdateProgressStep, DDO> {
        return this.updateAsset(
            did,
            metadata,
            publisherAccount,
            publishMetadata,
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
     * @param txParams - Optional transaction parameters
     * @returns The agreement ID identifying the order
     */
    public order(
        did: string,
        consumerAccount: Account,
        txParams?: TxParameters
    ): SubscribablePromise<OrderProgressStep, string> {
        return this.orderAsset(did, 'access', consumerAccount, txParams)
    }

    /**
     * Having previously ordered an "access" service (referenced via an "agreementId").
     * This method allows to download the assets associated to that service.
     * @param agreementId  - The unique identifier of the order placed for a service
     * @param did - Unique identifier of the asset ordered
     * @param consumerAccount - The account of the user who ordered the asset and is downloading the files
     * @param resultPath - Where the files will be downloaded
     * @param fileIndex - The file to download. If not given or is -1 it will download all of them.
     * @param buyer - Key which represent the buyer
     * @param babysig - An elliptic curve signature
     * @returns The result path or true if everything went okay
     */
    public async access(
        agreementId: string,
        did: string,
        consumerAccount: Account,
        resultPath?: string,
        fileIndex = -1,
        buyer?: string,
        babysig?: Babysig
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

        await this.nevermined.services.node.consumeService(
            did,
            agreementId,
            serviceEndpoint,
            consumerAccount,
            files,
            resultPath,
            fileIndex,
            buyer,
            babysig
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
     * @param consumerAccount - Consumer address.
     * @returns List of DIDs.
     */
    public async consumerAssets(consumerAccount: string): Promise<string[]> {
        return (
            await this.nevermined.keeper.conditions.accessCondition.getGrantedDidByConsumer(
                consumerAccount
            )
        ).map(({ did }) => did)
    }

    public async retire(did: string) {
        return this.nevermined.services.metadata.delete(did)
    }

    /**
     * It allows to download of the files attached to the asset by their owner or provider.
     * This method only can be called successfully by the owner of the asset or a provider.
     *
     * @param did - The Decentralized Identifier of the asset.
     * @param ownerAccount - The receiver account owner
     * @param resultPath - Path to be the files downloader
     * @param fileIndex - The index of the file
     * @param serviceType - Service type. 'access' by default
     * @param buyer - Key which represent the buyer
     * @param babysig - An elliptic curve signature
     * @return Status, path destination if resultPath is provided
     */
    public async download(
        did: string,
        ownerAccount: Account,
        resultPath?: string,
        fileIndex = -1,
        serviceType: ServiceType = 'access',
        buyer?: string,
        babysig?: Babysig
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
            ownerAccount,
            buyer,
            babysig
        )
        const headers = {
            Authorization: 'Bearer ' + accessToken
        }
        return this.nevermined.services.node.downloadService(
            files,
            resultPath,
            fileIndex,
            headers
        )
    }

    /**
     * It grants permissions to an account for a specific asset represented by a DID.
     * Only can be called by the asset owner.
     * @param did - The unique identifier of the assert
     * @param address - The account to grant the permissions
     * @param ownerAccount - Account sending the request. It must be the owner of the asset
     * @param params  - Transaction parameters
     */
    public async grantPermissions(
        did: string,
        address: string,
        ownerAccount: Account,
        params?: TxParameters
    ) {
        return await this.nevermined.keeper.didRegistry.grantPermission(
            did,
            address,
            ownerAccount.getId(),
            params
        )
    }

    /**
     * It revokes permissions to an account for a specific asset represented by a DID.
     * Only can be called by the asset owner.
     * @param did - The unique identifier of the assert
     * @param address - The account to revoke the permissions
     * @param ownerAccount - Account sending the request. It must be the owner of the asset
     * @param params  - Transaction parameters
     */
    public async revokePermissions(
        did: string,
        address: string,
        ownerAccount: Account,
        params?: TxParameters
    ) {
        return await this.nevermined.keeper.didRegistry.revokePermission(
            did,
            address,
            ownerAccount.getId(),
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
