import { SearchQuery } from '../../common/interfaces'
import { DDO } from '../../ddo/DDO'
import { MetaData } from '../../ddo/MetaData'
import { Service, ServiceType } from '../../ddo/Service'
import Account from '../Account'
import {
    SubscribablePromise,
    didZeroX
} from '../../utils'
import { InstantiableConfig } from '../../Instantiable.abstract'
import AssetRewards from '../../models/AssetRewards'
import { TxParameters } from '../../keeper/contracts/ContractBase'
import { AssetError } from '../../errors'
import { RoyaltyScheme } from '../../keeper/contracts/royalties'
import { Nevermined } from '../../sdk'
import { ContractReceipt } from 'ethers'
import {
    ercOfNeverminedNFTType,
    NeverminedNFT1155Type,
    NeverminedNFT721Type,
    NeverminedNFTType,
    NFTAttributes
} from '../../models/NFTAttributes'
import { EncryptionMethod, QueryResult } from '../../metadata/Metadata'
import BigNumber from '../../utils/BigNumber'
import { SignatureUtils } from '../utils/SignatureUtils'
import { DIDResolvePolicy, RegistryBaseApi } from './RegistryBaseApi'
import { CreateProgressStep, OrderProgressStep, UpdateProgressStep } from '../ProgessSteps'

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
 * Assets submodule of Nevermined.
 */
export class AssetsApi extends RegistryBaseApi {

    static DEFAULT_REGISTRATION_ACTIVITY_ID = SignatureUtils.hash('AssetRegistration')
    /**
     * Returns the instance of Assets.
     * @returns {@link Assets}
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


    public update(
        did: string,
        metadata: MetaData,
        publisher: Account,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<UpdateProgressStep, DDO> {
        return this.updateAsset(did, metadata, publisher, publishMetadata, txParams)
    }


    // public createMintable(
    //     metadata: MetaData,
    //     publisher: Account,
    //     cap: BigNumber = BigNumber.from(0),
    //     royaltyAttributes: RoyaltyAttributes | undefined,
    //     assetRewards: AssetRewards = new AssetRewards(),
    //     encryptionMethod: EncryptionMethod,
    //     providers?: string[],
    //     nftMetadata?: string,
    //     appId?: string,
    //     publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
    //     txParams?: TxParameters
    // ): SubscribablePromise<CreateProgressStep, DDO> {
    //     return this.createNft(
    //         metadata,
    //         publisher,
    //         assetRewards,
    //         encryptionMethod,
    //         cap,
    //         providers,
    //         BigNumber.from(1),
    //         royaltyAttributes,
    //         undefined,
    //         undefined,
    //         undefined,
    //         nftMetadata,
    //         undefined,
    //         undefined,
    //         appId,
    //         publishMetadata,
    //         txParams
    //     )
    // }

    public createNft721(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        encryptionMethod: EncryptionMethod,
        nftTokenAddress: string,
        erc20TokenAddress?: string,
        preMint = true,
        providers?: string[],
        royaltyAttributes?: RoyaltyAttributes,
        nftMetadata?: string,
        serviceTypes: ServiceType[] = ['nft-sales', 'nft-access'],
        nftTransfer = true,
        duration = 0,
        nftType: NeverminedNFT721Type = NeverminedNFT721Type.nft721,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        const nftAttributes = NFTAttributes.getInstance({
            ercType: 721,
            nftType,
            nftContractAddress: nftTokenAddress,
            cap: BigNumber.from(0),
            preMint: preMint,
            nftMetadataUrl: nftMetadata,
            amount: BigNumber.from(1),
            nftTransfer: nftTransfer,
            isSubscription: duration > 0 ? true : false,
            duration: duration,
            royaltyAttributes
        })
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
            publishMetadata,
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
        preMint = true,
        nftMetadata?: string,
        services: ServiceType[] = ['nft-access', 'nft-sales'],
        nftType: NeverminedNFT1155Type = NeverminedNFT1155Type.nft1155,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        const nftAttributes: NFTAttributes = {
            ercType: ercOfNeverminedNFTType[nftType],
            nftType,
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
            publishMetadata,
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
        preMint = true,
        nftMetadata?: string,
        nftType: NeverminedNFTType = NeverminedNFT1155Type.nft1155,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        const nftAttributes: NFTAttributes = {
            ercType: ercOfNeverminedNFTType[nftType],
            nftType,
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
            publishMetadata,
            txParams
        )
    }


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
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
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
            erc20TokenAddress,
            providers,
            appId,
            publishMetadata,
            txParams
        )
    }

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
     * Start the purchase/order of an access service. Starts by signing the service agreement
     * then sends the request to the publisher via the service endpoint (Node http service).
     * @param did - Decentralized ID.
     * @param consumer - Consumer account.
     * @returns The agreement ID.
     */
    public order(
        did: string,
        consumer: Account,
        params?: TxParameters
    ): SubscribablePromise<OrderProgressStep, string> {
        return this.orderAsset(did, 'access', consumer, params)
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
}
