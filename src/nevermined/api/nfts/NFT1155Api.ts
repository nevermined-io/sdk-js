import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../sdk'
import {
    generateId,
    getDIDFromService,
    getNftAmountFromService,
    OrderProgressStep,
    SubscribablePromise,
    zeroX
} from '../../../utils'
import { PublishMetadata } from '../AssetsApi'
import Account from '../../Account'
import { TxParameters } from '../../../keeper/contracts/ContractBase'
import { NFTError } from '../../../errors'
import BigNumber from '../../../utils/BigNumber'
import { Nft1155Contract } from '../../../keeper/contracts/Nft1155Contract'
import { NFTsBaseApi } from './NFTsBaseApi'
import { ContractReceipt } from 'ethers'
import { CreateProgressStep } from '../../ProgressSteps'
import { AssetAttributes } from '../../../models/AssetAttributes'
import { NFTAttributes } from '../../../models/NFTAttributes'


/**
 * Allows the interaction with external ERC-1155 NFT contracts built on top of the Nevermined NFT extra features.
 */
export class NFT1155Api extends NFTsBaseApi {

    // Instance of the ERC-1155 NFT Contract where the API is connected
    nftContract: Nft1155Contract

    /**
     * Create a new Nevermined NFTs (ERC-1155) instance allowing to interact with that kind of NFTs.
     *
     * @example
     * ```ts
     * nfts1155 = await Nft1155Api.getInstance(
     *      instanceConfig, 
     *      nft1155Contract
     * )
     * ```
     *
     * @param cpnfig - The Nevermined config
     * @param nftContractInstance - If there is already deployed an instance of `Nft1155Contract`
     * @param nftContractAddress - If the `Nft1155Contract` is deployed in an address it will connect to that contract
     * @returns The NFTs 1155 API instance {@link NFT1155Api}.
     */
    public static async getInstance(
        config: InstantiableConfig,
        nftContractInstance?: Nft1155Contract,
        nftContractAddress?: string
        ): Promise<NFT1155Api> {
        const instance = new NFT1155Api()
        instance.servicePlugin = NFT1155Api.getServicePlugin(config)
        instance.setInstanceConfig(config)
        
        if (nftContractInstance)
            instance.nftContract = nftContractInstance
        else if (nftContractAddress)
            instance.nftContract = await Nft1155Contract.getInstance(config, nftContractAddress)

        return instance
    }


    /**
     * Gets the ERC-721 NFT Contract address
     * @returns The NFT contract address
     */     
      public get address(): string {
        return this.nftContract.address
    }

    /**
     * Gets the instance of the ERC-1155 NFT Contract where the API is connected
     * @returns The `Nft1155Contract` instance
     */
    public get getContract(): Nft1155Contract {
        return this.nftContract
    }



    /**
     * Creates a new Nevermined asset associted to a NFT (ERC-1155).
     *
     * @example
     * ```ts
     * const assetAttributes = AssetAttributes.getInstance({
     *           metadata,
     *           price: assetPrice,
     *           serviceTypes: ['nft-sales', 'nft-access']
     *       })
     * const nftAttributes = NFTAttributes.getNFT1155Instance({                
     *           nftContractAddress: nftUpgradeable.address,
     *           cap: cappedAmount,
     *           amount: numberNFTs,
     *           royaltyAttributes,
     *           preMint
     *       })            
     * const ddo = await nevermined.nfts1155.create(
     *           assetAttributes,
     *           nftAttributes,
     *           publisher
     *       )
     * ```
     *
     * @param assetAttributes - Attributes describing the asset
     * @param nftAttributes -Attributes describing the NFT (ERC-721) associated to the asset
     * @param publisher - The account publishing the asset
     * @param publishMetadata - Allows to specify if the metadata should be stored in different backends
     * @param txParams - Optional transaction parameters
     *
     * @returns The newly registered {@link DDO}.
     */    
     public create(
        assetAttributes: AssetAttributes,
        nftAttributes: NFTAttributes,        
        publisher: Account,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.registerNeverminedAsset(
            assetAttributes,
            publisher,
            publishMetadata,
            nftAttributes,
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
     * await nevermined.nfts1155.mint(
     *           did,
     *           BigNumber.from(10),
     *           artist
     * )
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
     * await nevermined.nfts1155.burn(
     *           did,
     *           BigNumber.from(2),
     *           artist
     * )
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
     * agreementId = await nevermined.nfts1155.order(ddo.id, numberNFTs, collector)
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
     * const receipt = await nevermined.nfts1155.transfer(
     *           agreementId,
     *           ddo.id,
     *           numberNFTs,
     *           artist
     *       )
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
     * const receipt = await nevermined.nfts1155.releaseRewards(
     *           agreementId,
     *           ddo.id,
     *           numberNFTs,
     *           artist
     *       )
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
     * const balance = await nevermined.nfts1155.balance(ddo.id, artist)
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
     * @example
     * ```ts
     * const nftContractOwner = new Account(
     *      await nevermined.nfts1155.owner()
     * )
     * ```
     *
     * @returns Address of the contract owner
     */
    public async owner(): Promise<string> {
        return this.nftContract.owner()
    }

    /**
     * Enable or disable NFT permissions for an operator.
     *
     * @see {@link transferForDelegate}
     *
     * @example
     * ```ts
     * await nevermined.nfts1155.setApprovalForAll(
     *               someoneElse,
     *               true,
     *               artist
     * )
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
    ): Promise<ContractReceipt> {
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

     /**
     * Returns if the `operatorAddress` is approved 
     *
     * @see {@link transferForDelegate}
     *
     * @example
     * ```ts
     * await nevermined.nfts1155.isApprovedForAll(someoneElse, artist.getId())
     * ```
     *
     * @param operatorAddress -  The address to check the permissions
     * @param from - The address of the account granting or revoking the permissions via `setApprovalForAll`.
     *
     * @returns Boolean saying if the `operatorAddress` is approved
     */   
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
        const service = await this.nevermined.services.metadata.retrieveService(agreementIdSeed)
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

    /**
     * Adds a minter (`minterAddress`) to the NFT Contract. 
     * Granting and revoking minting permissions only can be done by the NFT Contract owner
     *
     *
     * @example
     * ```ts
     * await nevermined.nfts1155.addMinter(
     *               someoneElse,
     *               artist
     * )
     * ```
     *
     * @param minterAddress - The address of the account to be added as minter in the NFT Contract
     * @param from - The account giving minting permissions
     * @param txParams - Optional transaction parameters.
     *
     * @returns The {@link ethers.ContractReceipt}
     */
    public async addMinter(
        minterAddress: string,
        from?: Account,
        params?: TxParameters
    ): Promise<ContractReceipt> {
        return this.nftContract.addMinter(minterAddress, from, params)
    }

    /**
     * Revokes a minter (`minterAddress`) of the NFT Contract. 
     * Granting and revoking minting permissions only can be done by the NFT Contract owner
     *
     * @example
     * ```ts
     * await nevermined.nfts1155.revokeMinter(
     *               someoneElse,
     *               artist
     * )
     * ```
     *
     * @param minterAddress - The address of the account to be revoked as minter in the NFT Contract
     * @param from - The account revoking minting permissions
     * @param txParams - Optional transaction parameters.
     *
     * @returns The {@link ethers.ContractReceipt}
     */
     public async revokeMinter(
        minterAddress: string,
        from?: Account,
        params?: TxParameters
    ): Promise<ContractReceipt> {
        return this.nftContract.revokeMinter(minterAddress, from, params)
    }

}
