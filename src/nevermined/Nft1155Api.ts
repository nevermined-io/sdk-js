import { MetaData } from '../ddo/MetaData'
import { InstantiableConfig } from '../Instantiable.abstract'
import AssetRewards from '../models/AssetRewards'
import { DDO } from '../sdk'
import {
    generateId,
    getDIDFromService,
    getNftAmountFromService,
    OrderProgressStep,
    SubscribablePromise,
    zeroX
} from '../utils'
import { CreateProgressStep, PublishMetadata, RoyaltyAttributes } from './Assets'
import Account from './Account'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { NFTError } from '../errors'
import BigNumber from '../utils/BigNumber'
import { Nft1155Contract } from '../keeper/contracts/Nft1155Contract'
import { NFTsBaseApi } from './NFTsBaseApi'

/**
 * Nevermined Nft module
 */
export class Nft1155Api extends NFTsBaseApi {

    nftContract: Nft1155Contract

    public static async getInstance(
        config: InstantiableConfig,
        nftContractInstance?: Nft1155Contract,
        nftContractAddress?: string
        ): Promise<Nft1155Api> {
        const nft1155 = new Nft1155Api()
        nft1155.setInstanceConfig(config)
        
        if (nftContractInstance)
            nft1155.nftContract = nftContractInstance
        else if (nftContractAddress)
            nft1155.nftContract = await Nft1155Contract.getInstance(config, nftContractAddress)

        return nft1155
    }

    /**
     * Create a new NFT Nevermined NFT.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param metadata - The metadata associated with the NFT.
     * @param publisher -The account of the creator od the NFT.
     * @param cap - The max number of nfts.
     * @param royaltyAttributes - The royalties associated with the NFT.
     * @param nftAmount - The amount of NFTs that an address needs to hold in order to access the DID's protected assets. Leave it undefined and it will default to 1.
     * @param assetRewards - The sales reward distribution.
     * @param erc20TokenAddress - The ERC-20 Token used to price the NFT.
     * @param preMint - Set to true to mint _nftAmount_ during creation.
     * @param nftMetadata - Url to the NFT metadata.
     * @param appId - The id of the application creating the NFT.
     * @param txParams - Optional transaction parameters
     * @returns The newly registered {@link DDO}.
     */
    public create(
        metadata: MetaData,
        publisher: Account,
        cap: BigNumber,
        royaltyAttributes: RoyaltyAttributes,
        assetRewards: AssetRewards,
        nftAmount: BigNumber = BigNumber.from(1),
        erc20TokenAddress?: string,
        preMint?: boolean,
        nftMetadata?: string,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.nevermined.assets.createNft(
            metadata,
            publisher,
            assetRewards,
            'PSK-RSA',
            cap,
            undefined,
            nftAmount,
            royaltyAttributes,
            erc20TokenAddress,
            this.nftContract.address,
            preMint,
            nftMetadata ? nftMetadata : '',
            undefined,
            undefined,
            appId,
            publishMetadata,
            txParams
        )
    }


    /**
     * Mint NFTs associated with an asset.
     *
     * @remarks
     * This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param did - The Decentralized Identifier of the NFT asset.
     * @param nftAmount - The amount of NFTs to mint.
     * @param publisher - The account of the publisher of the NFT.
     * @param params - Optional transaction parameters.
     *
     * @returns The {@link ethers.ContractReceipt}
     */
    public async mint(
        did: string,
        nftAmount: BigNumber,
        publisher: Account,
        params?: TxParameters
    ) {
        return await this.nevermined.keeper.didRegistry.mint(
            did,
            nftAmount,
            publisher.getId(),
            params
        )
    }

    /**
     * Burn NFTs associated with an asset.
     *
     * @remarks
     * The publisher can only burn NFTs that it owns. NFTs that were already transferred cannot be burned by the publisher.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param did - The Decentralized Identifier of the NFT asset.
     * @param nftAmount - The amount of NFTs to burn.
     * @param publisher - The account of the publisher of the NFT.
     * @param params - Optional transaction parameters.
     *
     * @returns The {@link ethers.ContractReceipt}
     */
    public async burn(
        did: string,
        nftAmount: BigNumber,
        publisher: Account,
        params?: TxParameters
    ) {
        return await this.nevermined.keeper.didRegistry.burn(
            did,
            nftAmount,
            publisher.getId(),
            params
        )
    }

    // TODO: We need to improve this to allow for secondary market sales
    //       Right now it fetches the rewards from the DDO which don't change.
    /**
     * Buy NFTs.
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
     * @param nftAmount - The amount of NFTs to buy.
     * @param consumer - The account of the NFT buyer.
     * @param txParams - Optional transaction parameters.
     *
     * @returns The agreement ID.
     */
    public order(
        did: string,
        nftAmount: BigNumber,
        consumer: Account,
        txParams?: TxParameters
    ): SubscribablePromise<OrderProgressStep, string> {
        return new SubscribablePromise<OrderProgressStep, string>(async observer => {
            const { nftSalesTemplate } = this.nevermined.keeper.templates

            const agreementIdSeed = zeroX(generateId())
            const ddo = await this.nevermined.assets.resolve(did)

            this.logger.log('Creating nft-sales agreement and paying')
            const agreementId = await nftSalesTemplate.createAgreementWithPaymentFromDDO(
                agreementIdSeed,
                ddo,
                nftSalesTemplate.params(consumer.getId(), nftAmount),
                consumer,
                consumer,
                undefined,
                txParams,
                a => observer.next(a)
            )
            if (!agreementId) {
                throw new NFTError('Error creating nft-sales agreement')
            }

            return agreementId
        })
    }


    /**
     * Transfer NFTs to the consumer.
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
     * @param nftAmount - The number of NFTs to transfer.
     * @param publisher - The current owner of the NFTs.
     * @param txParams - Optional transaction parameters.
     *
     * @returns true if the transfer was successful.
     *
     * @throws {@link NFTError}
     * Thrown if there is an error transferring the NFT
     */
    public async transfer(
        agreementId: string,
        did: string,
        nftAmount: BigNumber,
        publisher: Account,
        txParams?: TxParameters
    ): Promise<boolean> {
        const { agreements } = this.nevermined
        const ddo = await this.nevermined.assets.resolve(did)

        const result = await agreements.conditions.transferNft(
            agreementId,
            ddo,
            nftAmount,
            publisher,
            txParams
        )

        if (!result) {
            throw new NFTError('Error transferring nft.')
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
     * @param nftAmount - The amount of NFTs to transfer.
     * @param publisher - The current owner of the NFTs.
     * @param txParams - Optional transaction parameters.
     *
     * @returns true if the funds release was successful.
     *
     * @throws {@link NFTError}
     * Thrown if there is an error releasing the rewards
     */
    public async releaseRewards(
        agreementId: string,
        did: string,
        nftAmount: BigNumber,
        publisher: Account,
        txParams?: TxParameters
    ): Promise<boolean> {
        const { agreements } = this.nevermined

        const ddo = await this.nevermined.assets.resolve(did)

        const result = await agreements.conditions.releaseNftReward(
            agreementId,
            ddo,
            nftAmount,
            publisher,
            undefined,
            txParams
        )

        if (!result) {
            throw new NFTError('Error releasing the rewards.')
        }

        return true
    }


    /**
     * Get the NFT balance for a particular did
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param did - The Decentralized Identifier of the NFT asset.
     * @param account - The account to check the balance of.
     *
     * @returns The amount of NFTs owned by the account.
     */
    public async balance(did: string, account: Account): Promise<BigNumber> {
        return await this.nftContract.balance(account.getId(), did)
    }

    /**
     * Gets the contract owner
     *
     * @returns Address of the contract owner
     */
        public async owner(): Promise<string> {
        return this.nftContract.owner()
    }

    /**
     * Enable or disable NFT transfer rights for an operator.
     *
     * @see {@link transferForDelegate}
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param operatorAddress - The address that of the operator we want to give transfer rights to.
     * @param approved - Give or remove transfer rights from the operator.
     * @param from - The account that wants to give transfer rights to the operator.
     *
     * @returns The {@link ethers.ContractReceipt}
     */
    public async setApprovalForAll(
        operatorAddress: string,
        approved: boolean,
        from: Account
    ) {
        const isApproved = await this.nftContract.isApprovedForAll(from.getId(), operatorAddress);

        if (isApproved) {
            return
        }

        return this.nftContract.setApprovalForAll(
            operatorAddress,
            approved,
            from
        )
    }

    public async isApprovedForAll(
        operatorAddress: string,
        from: string
    ) {
        return this.nftContract.isApprovedForAll(from, operatorAddress)
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
        const nftAmount = getNftAmountFromService(service)
        const ddo = await this.nevermined.assets.resolve(did)
        ddo.updateService(this.nevermined, service)
        const agreementId =
            await this.nevermined.keeper.agreementStoreManager.agreementId(
                agreementIdSeed,
                consumer.getId()
            )

        let receipt = await this.nevermined.agreements.conditions.transferNft(
            agreementId,
            ddo,
            nftAmount,
            owner,
            params
        )

        if (!receipt) throw new NFTError('TransferNft Failed.')

        receipt = await this.nevermined.agreements.conditions.releaseNftReward(
            agreementId,
            ddo,
            nftAmount,
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

    public get getContract() {
        return this.nftContract
    }

}
