import { InstantiableConfig } from '../Instantiable.abstract'
import { MetaData } from '../ddo/MetaData'
import { DDO, OrderProgressStep } from '../sdk'
import {
    generateId,
    getDIDFromService,
    SubscribablePromise,
    zeroX
} from '../utils'
import Account from './Account'
import Nft721Contract from '../keeper/contracts/Nft721Contract'
import { TxParameters } from '../keeper/contracts/ContractBase'
import AssetRewards from '../models/AssetRewards'
import { CreateProgressStep, PublishMetadata, RoyaltyAttributes } from './Assets'
import { NFTError } from '../errors/NFTError'
import { ethers } from 'ethers'
import { NFTsBaseApi } from './NFTsBaseApi'

export class Nft721Api extends NFTsBaseApi {

    nftContract: Nft721Contract

    public static async getInstance(
        config: InstantiableConfig,
        address: string
    ): Promise<Nft721Api> {
        const nft721 = new Nft721Api()
        nft721.setInstanceConfig(config)

        nft721.nftContract = await Nft721Contract.getInstance(config, address)
        return nft721
    }


    /**
     * Create a new Nevermined NFT-721.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param metadata - The metadata associated with the NFT.
     * @param publisher -The account of the creator od the NFT.
     * @param assetRewards - The sales reward distribution.
     * @param nftTokenAddress - The address of the ERC-721 contract
     * @param erc20TokenAddress - The ERC-20 Token used to price the NFT.
     * @param royaltyAttributes - The royalties associated with the NFT.
     * @param nftMetadata - Url to the NFT metadata.
     * @param nftTransfer - TODO
     * @param duration - TODO
     * @param appId - Id of the application creating this NFT.
     * @param txParams - Optional transaction parameters
     *
     * @returns The newly registered {@link DDO}.
     */
     public create(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards,
        nftTokenAddress: string,
        erc20TokenAddress?: string,
        royaltyAttributes?: RoyaltyAttributes,
        nftMetadata?: string,
        nftTransfer = true,
        duration = 0,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.nevermined.assets.createNft721(
            metadata,
            publisher,
            assetRewards,
            undefined,
            nftTokenAddress,
            erc20TokenAddress,
            true,
            undefined,
            royaltyAttributes,
            nftMetadata ? nftMetadata : '',
            ['nft-sales', 'nft-access'],
            nftTransfer,
            duration,
            undefined,
            appId,
            publishMetadata,
            txParams
        )
    }


    /**
     * Buy NFT-721.
     *
     * @remarks
     * This will lock the funds of the consumer in escrow pending the transfer of the NFTs
     * from the publisher.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param did - The Decentralized Identifier of the NFT asset.
     * @param consumer - The account of the NFT buyer.
     * @param txParams - Optional transaction parameters.
     *
     * @returns The agreement ID.
     */
     public order(
        did: string,
        consumer: Account,
        txParams?: TxParameters
    ): SubscribablePromise<OrderProgressStep, string> {
        return new SubscribablePromise<OrderProgressStep, string>(async observer => {
            const { nft721SalesTemplate } = this.nevermined.keeper.templates

            const agreementIdSeed = zeroX(generateId())
            const ddo = await this.nevermined.assets.resolve(did)

            this.logger.log('Creating nft721-sales agreement')
            const agreementId =
                await nft721SalesTemplate.createAgreementWithPaymentFromDDO(
                    agreementIdSeed,
                    ddo,
                    nft721SalesTemplate.params(consumer.getId()),
                    consumer,
                    consumer,
                    undefined,
                    txParams,
                    a => observer.next(a)
                )
            if (!agreementId) {
                throw new NFTError('Error creating nft721-sales agreement')
            }

            return agreementId
        })
    }


    /**
     * Transfer NFT-721 to the consumer.
     *
     * @remarks
     * A publisher/provider will check if the consumer put the funds in escrow and
     * execute the transfer in order to be able to release the rewards.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param agreementId - The NFT sales agreement id.
     * @param did - The Decentralized identifier of the NFT asset.
     * @param publisher - The current owner of the NFTs.
     * @param txParams - Optional transaction parameters.
     *
     * @returns true if the transfer was successful.
     *
     * @throws {@link NFTError}
     * Thrown if there is an error transferring the NFT
     */
     public async transfer721(
        agreementId: string,
        did: string,
        publisher: Account,
        txParams?: TxParameters
    ): Promise<boolean> {
        const { agreements } = this.nevermined

        const ddo = await this.nevermined.assets.resolve(did)

        const result = await agreements.conditions.transferNft721(
            agreementId,
            ddo,
            publisher,
            txParams
        )
        if (!result) {
            throw new NFTError('Error transferring nft721.')
        }

        return true
    }


    /**
     * Release the funds from escrow.
     *
     * @remarks
     * A publisher is able to release the funds put on escrow by the consumer after transferring the NFTs.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param agreementId - The NFT sales agreement id.
     * @param did - The Decentralized identifier of the NFT asset.
     * @param publisher - The current owner of the NFTs.
     * @param txParams - Optional transaction parameters.
     *
     * @returns true if the funds release was successful.
     *
     * @throws {@link NFTError}
     * Thrown if there is an error releasing the rewards.
     */
     public async release721Rewards(
        agreementId: string,
        did: string,
        publisher: Account,
        txParams?: TxParameters
    ): Promise<boolean> {
        const { agreements } = this.nevermined

        const ddo = await this.nevermined.assets.resolve(did)

        const result = await agreements.conditions.releaseNft721Reward(
            agreementId,
            ddo,
            publisher,
            undefined,
            txParams
        )

        if (!result) {
            throw new NFTError('Error releasing the 721 rewards.')
        }

        return true
    }

    /**
     * Mint NFTs associated with an asset.
     *
     * This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.
     *
     * @param did - The Decentralized Identifier of the NFT asset.
     * @param publisher - The account of the publisher of the NFT.
     * @returns
     */
    public async mint(did: string, publisher: Account, txParams?: TxParameters) {
        return await this.nftContract.mint(did, publisher.getId(), txParams)
    }

    public async mintWithURL(
        to: string,
        did: string,
        url: string,
        from?: Account,
        txParams?: TxParameters
    ) {
        return await this.nftContract.mintWithURL(to, did, url, from, txParams)
    }

    public async setApprovalForAll(
        target: string,
        state: boolean,
        publisher: Account,
        txParams?: TxParameters
    ) {
        return await this.nftContract.setApprovalForAll(
            target,
            state,
            publisher.getId(),
            txParams
        )
    }


    /**
     * Get the owner of the NFT
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param did - The Decentralized identifier of the NFT asset.
     * @param nftTokenAddress - The address of the ERC-721 contract.
     * @param agreementId - The NFT sales agreement id.
     *
     * @returns The address of the NFT owner.
     */
     public async ownerOfAsset(did?: string, nftTokenAddress: string = this.nftContract.address, agreementId?: string) {
        if (!agreementId) {
            return (await this.nevermined.contracts.loadNft721(nftTokenAddress)).ownerOf(
                did
            )
        } else {
            const tokenId = ethers.utils.keccak256(
                ethers.utils.defaultAbiCoder.encode(
                    ['bytes32', 'bytes32'],
                    [zeroX(did), zeroX(agreementId)]
                )
            )
            return (await this.nevermined.contracts.loadNft721(nftTokenAddress)).ownerOf(
                tokenId
            )
        }
    }

    public async isApprovedForAll(accountAddress: string, operatorAddress: string) {
        return await this.nftContract.isApprovedForAll(accountAddress, operatorAddress)
    }

    public async balanceOf(owner: Account) {
        return await this.nftContract.balanceOf(owner.getId())
    }

    public async ownerOf(did: string): Promise<string> {
        return await this.nftContract.ownerOf(did)
    }

    public get address() {
        return this.nftContract.address
    }

    public get getContract() {
        return this.nftContract
    }

    /**
     * Used to release the secondary market NFT & the locked rewards.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param owner - The owner account.
     * @param agreementId - the Id of the underlying service agreement.
     *
     * @returns  true if the transaction was successful.
     *
     * @throws {@link NFTError}
     * Thrown if there is an error releasing the rewards.
     */
     public async releaseSecondaryMarketRewards(
        owner: Account,
        consumer: Account,
        agreementIdSeed: string,
        params?: TxParameters
    ): Promise<boolean> {
        const service = await this.nevermined.metadata.retrieveService(agreementIdSeed)
        const did = getDIDFromService(service)
        const ddo = await this.nevermined.assets.resolve(did)
        ddo.updateService(this.nevermined, service)
        const agreementId =
            await this.nevermined.keeper.agreementStoreManager.agreementId(
                agreementIdSeed,
                consumer.getId()
            )

        let receipt = await this.nevermined.agreements.conditions.transferNft721(
            agreementId,
            ddo,
            owner,
            params
        )

        if (!receipt) throw new NFTError('TransferNft Failed.')

        receipt = await this.nevermined.agreements.conditions.releaseNft721Reward(
            agreementId,
            ddo,
            owner,
            undefined,
            params
        )

        if (!receipt) throw new NFTError('ReleaseNftReward Failed.')
        return receipt
    }

    public addMinter(
        minterAddress: string,
        from?: Account,
        params?: TxParameters
    ) {
        return this.nftContract.addMinter(minterAddress, from, params)
    }
    
}
