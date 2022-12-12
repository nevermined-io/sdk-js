import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO, OrderProgressStep } from '../../../sdk'
import {
    generateId,
    getDIDFromService,
    SubscribablePromise,
    zeroX
} from '../../../utils'
import Account from '../../Account'
import Nft721Contract from '../../../keeper/contracts/Nft721Contract'
import { TxParameters } from '../../../keeper/contracts/ContractBase'
import { PublishMetadata } from '../AssetsApi'
import { NFTError } from '../../../errors/NFTError'
import { ContractReceipt, ethers } from 'ethers'
import { NFTsBaseApi } from './NFTsBaseApi'
import BigNumber from '../../../utils/BigNumber'
import { CreateProgressStep } from '../../ProgessSteps'
import { AssetAttributes } from '../../../models/AssetAttributes'
import { NFTAttributes } from '../../../models/NFTAttributes'

/**
 * Allows the interaction with external ERC-721 NFT contracts built on top of the Nevermined NFT extra features.
 */
export class NFT721Api extends NFTsBaseApi {

    // Instance of the ERC-721 NFT Contract where the API is connected
    nftContract: Nft721Contract

    /**
     * Create a new Nevermined NFTs (ERC-721) instance allowing to interact with that kind of NFTs.
     *
     * @example
     * ```ts
     * nfts721 = await Nft721Api.getInstance(
     *      instanceConfig, 
     *      nftContractAddress
     * )
     * ```
     *
     * @param cpnfig - The Nevermined config
     * @param nftContractAddress - If the Nft721 Contract is deployed in an address it will connect to that contract
     * @returns The NFTs 721 API instance {@link NFT721Api}.
     */
    public static async getInstance(
        config: InstantiableConfig,
        nftContractAddress: string
    ): Promise<NFT721Api> {
        const instance = new NFT721Api()
        instance.servicePlugin = NFT721Api.getServicePlugin(config)
        instance.setInstanceConfig(config)

        instance.nftContract = await Nft721Contract.getInstance(config, nftContractAddress)
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
     * Gets the instance of the ERC-721 NFT Contract where the API is connected
     * @returns The `Nft721Contract` instance
     */   
    public get getContract(): Nft721Contract {
        return this.nftContract
    }


    /**
     * Creates a new Nevermined asset associted to a NFT (ERC-721).
     *
     * @example
     * ```ts
     * 
     * // We define how the Asset is
     * const assetAttributes = AssetAttributes.getInstance({
     *      metadata,
     *      price: assetRewards1,
     *      serviceTypes: ['nft-sales', 'nft-access']
     *      })
     * 
     * // And where is the NFT attached
     * const nftAttributes = NFTAttributes.getNFT721Instance({
     *      nftContractAddress: nftContract.address
     * })            
     * 
     * // And register the asset
     * ddo = await nevermined.nfts721.createRefactored(
     *           assetAttributes,
     *           nftAttributes,
     *           artist,
     *           PublishMetadata.IPFS
     * )
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
     * Order a NFT-721.
     *
     * @remarks
     * This will lock the funds of the consumer in escrow pending the transfer of the NFTs
     * from the publisher.
     *
     * @example
     * ```ts
     * const agreementId = await nevermined.nfts721.order(ddo.id, collector)
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
     * const receipt = await nevermined.nfts721.transfer(agreementId, ddo.id, artist)
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
     public async transfer(
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
     * const receipt = await nevermined.nfts721.releaseRewards(
     *           agreementId,
     *           ddo.id,
     *           artist
     *       )
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
     public async releaseRewards(
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
     * @example
     * ```ts
     * await nevermined.nfts721.mint(ddo.id, artist)
     * ```
     * @param did - The Decentralized Identifier of the NFT asset.
     * @param publisher - The account of the minter
     * @param txParams - Optional transaction parameters.
     * @returns The {@link ethers.ContractReceipt}
     */
    public async mint(
        did: string, 
        publisher: Account, 
        txParams?: TxParameters
    ): Promise<ContractReceipt>{
        return await this.nftContract.mint(did, publisher.getId(), txParams)
    }

    /**
     * Mint NFTs associated with an asset allowing to specify some metadata
     *
     * This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.
     *
     * @example
     * ```ts
     * await nevermined.nfts721.mintWithURL(receiverAddress, ddo.id, nftMetadata, artist)
     * ```
     * @param to - The address receiving the NFT minted
     * @param did - The Decentralized Identifier of the NFT asset.
     * @param url - The URL with NFT metadata
     * @param from - The account of the minter
     * @param txParams - Optional transaction parameters.
     * @returns The {@link ethers.ContractReceipt}
     */    
    public async mintWithURL(
        to: string,
        did: string,
        url: string,
        from?: Account,
        txParams?: TxParameters
    ): Promise<ContractReceipt> {
        return await this.nftContract.mintWithURL(to, did, url, from, txParams)
    }

     /**
     * Enable or disable NFT permissions for an operator.
     * 
     * @example
     * ```ts
     * await nevermined.nfts721.setApprovalForAll(
     *               someoneElse,
     *               true,
     *               artist
     * )
     * ```
     *
     * @param target - The address that of the operator we want to give transfer rights to.
     * @param approved - Give or remove transfer rights from the operator.
     * @param from - The account that wants to give transfer rights to the operator.
     * @param txParams - Optional transaction parameters.
     * @returns The {@link ethers.ContractReceipt}
     */   
    public async setApprovalForAll(
        target: string,
        approved: boolean,
        from: Account,
        txParams?: TxParameters
    ): Promise<ContractReceipt> {
        return await this.nftContract.setApprovalForAll(
            target,
            approved,
            from.getId(),
            txParams
        )
    }

     /**
     * Gets the contract owner
     * 
     * @example
     * ```ts
     * const nftContractOwner = new Account(
     *      await nevermined.nfts721.ownerOf()
     * )
     * ```
     *
     * @returns Address of the contract owner
     */   
      public async ownerOf(did: string): Promise<string> {
        return await this.nftContract.ownerOf(did)
    }

    /**
     * Given some information, it gets the owner of the NFT
     *
     * @example
     * ```ts
     * const owner = await nevermined.nfts721.ownerOfTokenId(tokenId)
     * ```
     *
     * @param tokenId - The token id 
     * @param nftTokenAddress - The address of the ERC-721 contract.
     *
     * @returns The address of the NFT owner.
     */
     public async ownerOfTokenId(tokenId: string) {
        return this.nftContract.ownerOf(tokenId)
        // return (await this.nevermined.contracts.loadNft721(nftTokenAddress)).ownerOf(
        //     tokenId
        // )
    }   

    /**
     * Given a DID it gets the owner of the NFT if that DID is used as tokenId
     *
     * @example
     * ```ts
     * const owner = await nevermined.nfts721.ownerOfAsset(ddo.id, nftTokebnAddress)
     * ```
     *
     * @param did - The Decentralized identifier of the NFT asset.
     * @param nftTokenAddress - The address of the ERC-721 contract.
     *
     * @returns The address of the NFT owner.
     */
     public async ownerOfAsset(did: string) {
        return this.ownerOfTokenId(did)
    }

    /**
     * Given a DID and an agreement id it gets the owner of the NFT
     *
     * @example
     * ```ts
     * const owner = await nevermined.nfts721.ownerOfAssetByAgreement(ddo.id, agreementId)
     * ```
     *
     * @param did - The Decentralized identifier of the NFT asset.
     * @param nftTokenAddress - The address of the ERC-721 contract.
     * @param agreementId - The NFT sales agreement id.
     *
     * @returns The address of the NFT owner.
     */
     public async ownerOfAssetByAgreement(did: string, agreementId: string) {
        const tokenId = ethers.utils.keccak256(
            ethers.utils.defaultAbiCoder.encode(
                ['bytes32', 'bytes32'],
                [zeroX(did), zeroX(agreementId)]
            )
        )
        return this.ownerOfTokenId(tokenId)
    
    }

    /**
     * Returns if the `operatorAddress` is approved 
     *
     *
     * @example
     * ```ts
     * await nevermined.nfts721.isApprovedForAll(someoneElse, artist.getId())
     * ```
     *
     * @param operatorAddress - The address to check the permissions
     * @param from - The address of the account granting or revoking the permissions via `setApprovalForAll`.
     *
     * @returns Boolean saying if the `operatorAddress` is approved
     */    
    public async isApprovedForAll(operatorAddress: string, from: string) {
        return await this.nftContract.isApprovedForAll(from, operatorAddress)
    }

     /**
     * Get the NFT balance for a particular account
     *
     * @example
     * ```ts
     * const balance = await nevermined.nfts721.balance(artist)
     * ```
     *
     * @param account - The account to check the balance of.
     *
     * @returns The amount of NFTs owned by the account.
     */   
    public async balanceOf(owner: Account): Promise<BigNumber> {
        return await this.nftContract.balanceOf(owner.getId())
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


    /**
     * Adds a minter (`minterAddress`) to the NFT Contract. 
     * Granting and revoking minting permissions only can be done by the NFT Contract owner
     *
     * @example
     * ```ts
     * await nevermined.nfts721.addMinter(
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
     * await nevermined.nfts721.revokeMinter(
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
