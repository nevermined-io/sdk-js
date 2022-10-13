import { MetaData } from '../ddo/MetaData'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import AssetRewards from '../models/AssetRewards'
import { DDO, utils } from '../sdk'
import {
    fillConditionsWithDDO,
    findServiceConditionByName,
    generateId,
    getAssetRewardsFromService,
    getDIDFromService,
    getNftAmountFromService,
    getNftHolderFromService,
    OrderProgressStep,
    noZeroX,
    SubscribablePromise,
    zeroX
} from '../utils'
import { CreateProgressStep, RoyaltyAttributes, RoyaltyKind } from './Assets'
import Account from './Account'
import Token from '../keeper/contracts/Token'
import { ServiceSecondary } from '../ddo/Service'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { NFTError } from '../errors'
import BigNumber from '../utils/BigNumber'
import { ethers } from 'ethers'
import {
    ERCType,
    NeverminedNFT1155Type,
    NeverminedNFTType
} from '../models/NFTAttributes'

/**
 * Nevermined Nft module
 */
export class Nfts extends Instantiable {
    public static async getInstance(config: InstantiableConfig): Promise<Nfts> {
        const instance = new Nfts()
        instance.setInstanceConfig(config)

        return instance
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
            this.nevermined.keeper.nftUpgradeable.address,
            preMint,
            nftMetadata ? nftMetadata : '',
            undefined,
            undefined,
            appId,
            txParams
        )
    }

    /**
     * Create a new Nevermined NFT with royalties.
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
     *
     * @returns The newly registered {@link DDO}.
     */
    public createWithRoyalties(
        metadata: MetaData,
        publisher: Account,
        cap: BigNumber,
        royaltyAttributes: RoyaltyAttributes,
        assetRewards: AssetRewards,
        nftAmount: BigNumber = BigNumber.from(1),
        erc20TokenAddress?: string,
        preMint?: boolean,
        nftMetadata?: string,
        nftType: NeverminedNFTType = NeverminedNFT1155Type.nft1155,
        appId?: string,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.nevermined.assets.createNftWithRoyalties(
            metadata,
            publisher,
            assetRewards,
            undefined,
            cap,
            undefined,
            nftAmount,
            royaltyAttributes,
            erc20TokenAddress,
            preMint,
            nftMetadata || '',
            nftType,
            appId,
            txParams
        )
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
    public create721(
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
    public order721(
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
     * Asks the gateway to transfer the NFT on behalf of the publisher.
     *
     * @remarks
     * This is useful when the consumer does not want to wait for the publisher
     * to transfer the NFT once the payment is made. Assuming the publisher delegated
     * transfer permissions to the gateway.
     *
     * One example would be a marketplace where the user wants to get access to the NFT
     * as soon as the payment is made
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param agreementId - The NFT sales agreement id.
     * @param nftHolder - The address of the current owner of the NFT.
     * @param nftReceiver - The address where the NFT should be transferred.
     * @param nftAmount - The amount of NFTs to transfer.
     * @param ercType  - The Type of the NFT ERC (1155 or 721).
     *
     * @returns true if the transfer was successful.
     */
    public async transferForDelegate(
        agreementId: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: BigNumber,
        ercType: ERCType = 1155
    ): Promise<boolean> {
        return await this.nevermined.gateway.nftTransferForDelegate(
            agreementId,
            nftHolder,
            nftReceiver,
            nftAmount,
            ercType
        )
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
     * Access the files associated with an NFT.
     *
     * @remarks
     * This function will call the gateway that will check if all the access conditions where fulfilled
     * before providing the files.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param did - The Decentralized Identifier of the NFT asset.
     * @param consumer - The NFT holder account.
     * @param destination - The download destination for the files.
     * @param index-  The index of the file. If unset will download all the files in the asset.
     *
     * @returns true if the access was successful.
     */
    public async access(
        did: string,
        consumer: Account,
        destination?: string,
        index?: number,
        agreementId = '0x'
    ) {
        const ddo = await this.nevermined.assets.resolve(did)

        // Download the files
        this.logger.log('Downloading the files')
        return await this.downloadFiles(agreementId, ddo, consumer, destination, index)
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
        return await this.nevermined.keeper.nftUpgradeable.balance(account.getId(), did)
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
    public async ownerOf(did: string, nftTokenAddress: string, agreementId?: string) {
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

    /**
     * Get the details of an NFT
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param did - The Decentralized Identifier of the NFT asset.
     *
     * @returns The details of the NFT.
     */
    public async details(did: string) {
        const details = await this.nevermined.keeper.didRegistry.getDIDRegister(did)
        const royaltySchemeAddress =
            await this.nevermined.keeper.didRegistry.getDIDRoyalties(did)
        let royalties = Number(details[8])
        let royaltyScheme = RoyaltyKind.Legacy
        if (
            this.nevermined.keeper.royalties.curve &&
            royaltySchemeAddress === this.nevermined.keeper.royalties.curve.address
        ) {
            royaltyScheme = RoyaltyKind.Curve
            royalties = await this.nevermined.keeper.royalties.curve.getRoyalty(did)
        } else if (
            this.nevermined.keeper.royalties.standard &&
            royaltySchemeAddress === this.nevermined.keeper.royalties.standard.address
        ) {
            royaltyScheme = RoyaltyKind.Standard
            royalties = await this.nevermined.keeper.royalties.standard.getRoyalty(did)
        }

        return {
            owner: details[0],
            lastChecksum: details[1],
            url: details[2],
            lastUpdatedBy: details[3],
            blockNumberUpdated: Number(details[4]),
            providers: details[5],
            nftSupply: Number(details[6]),
            mintCap: Number(details[7]),
            royalties,
            royaltyScheme
        }
    }

    /**
     * Get the NFT contract address associated with a Nevermined asset.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param ddo - The DDO of the asset.
     *
     * @returns The NFT contract address.
     */
    public getNftContractAddress(ddo: DDO) {
        const service = ddo.findServiceByType('nft-access')
        if (service) {
            const cond = service.attributes.serviceAgreementTemplate.conditions.find(
                c => c.name === 'nftHolder'
            )
            return !cond
                ? null
                : cond.parameters.find(p => p.name === '_contractAddress').value
        }
        return null
    }

    private async downloadFiles(
        agreementId: string,
        ddo: DDO,
        consumer: Account,
        destination?: string,
        index?: number
    ) {
        const { serviceEndpoint } = ddo.findServiceByType('nft-access')
        const { attributes } = ddo.findServiceByType('metadata')
        const { files } = attributes.main
        const { jwt } = this.nevermined.utils

        let accessToken: string
        const cacheKey = jwt.generateCacheKey(agreementId, consumer.getId(), ddo.id)

        if (!jwt.tokenCache.has(cacheKey)) {
            const grantToken = await jwt.generateNftAccessGrantToken(
                agreementId,
                ddo.id,
                consumer
            )
            accessToken = await this.nevermined.gateway.fetchToken(grantToken)
            jwt.tokenCache.set(cacheKey, accessToken)
        } else {
            accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey)
        }

        const headers = {
            Authorization: 'Bearer ' + accessToken
        }

        if (index === undefined) {
            for (let i = 0; i < files.length; i++) {
                const url = `${serviceEndpoint}/${noZeroX(agreementId)}/${i}`
                const result = await this.nevermined.utils.fetch.downloadFile(
                    url,
                    destination,
                    i,
                    headers
                )
                console.log('---------------', result)
            }
        } else {
            const url = `${serviceEndpoint}/${noZeroX(agreementId)}/${index}`
            await this.nevermined.utils.fetch.downloadFile(
                url,
                destination,
                index,
                headers
            )
        }

        return true
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
        return this.nevermined.keeper.nftUpgradeable.setApprovalForAll(
            operatorAddress,
            approved,
            from
        )
    }

    /**
     * After purchase re-list an NFT to enable secondary market sales.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param ddo - The DDO of the asset.
     * @param assetRewards - The current setup of asset rewards.
     * @param nftAmount - The number of NFTs put up for secondary sale.
     * @param provider - The address that will be the provider of the secondary sale.
     * @param owner - The account of the current owner.
     *
     * @returns  the agreementId of the secondary sale.
     *
     * @throws {@link NFTError}
     * Thrown if there is an error listing the NFT.
     */
    public async listOnSecondaryMarkets(
        ddo: DDO,
        assetRewards: AssetRewards,
        nftAmount: BigNumber,
        provider: string,
        token: Token,
        owner: string
    ): Promise<string> {
        const { nftSalesTemplate } = this.nevermined.keeper.templates
        const agreementIdSeed = zeroX(utils.generateId())
        const nftSalesServiceAgreementTemplate =
            await nftSalesTemplate.getServiceAgreementTemplate()
        const nftSalesTemplateConditions =
            await nftSalesTemplate.getServiceAgreementTemplateConditions()

        nftSalesServiceAgreementTemplate.conditions = fillConditionsWithDDO(
            nftSalesTemplateConditions,
            ddo,
            assetRewards,
            token.getAddress(),
            undefined,
            provider || owner,
            nftAmount
        )

        const nftSalesServiceAgreement: ServiceSecondary = {
            agreementId: agreementIdSeed,
            type: 'nft-sales',
            index: 6,
            serviceEndpoint: this.nevermined.gateway.getNftEndpoint(),
            templateId: nftSalesTemplate.getAddress(),
            did: ddo.id,
            attributes: {
                main: {
                    name: 'nftSalesAgreement',
                    creator: owner,
                    datePublished: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
                    timeout: 86400
                },
                additionalInformation: {
                    description: ''
                },
                serviceAgreementTemplate: nftSalesServiceAgreementTemplate
            }
        }

        const saveResult = await this.nevermined.metadata.storeService(
            agreementIdSeed,
            nftSalesServiceAgreement
        )

        if (saveResult) {
            return agreementIdSeed
        } else {
            throw new NFTError(`Error saving ${agreementIdSeed} to MetadataDB`)
        }
    }

    /**
     * Buys a number of listed NFTs on secondary markets.
     *
     * @example
     * ```ts
     * // TODO
     * ```
     *
     * @param consumer - The account of the buyer/consumer.
     * @param nftAmount - The number of assets to buy. 1 by default.
     * @param agreementId - The agreementId of the initial sales agreement created off-chain.
     *
     * @returns true if the buy was successful.
     *
     * @throws {@link NFTError}
     * Thrown if there is an error buying the NFT.
     */
    public async buySecondaryMarketNft(
        consumer: Account,
        nftAmount: BigNumber = BigNumber.from(1),
        agreementIdSeed: string,
        params?: TxParameters
    ): Promise<boolean> {
        const { nftSalesTemplate } = this.nevermined.keeper.templates
        const service = await this.nevermined.metadata.retrieveService(agreementIdSeed)
        const assetRewards = getAssetRewardsFromService(service)
        // has no privkeys, so we can't sign
        const currentNftHolder = new Account(getNftHolderFromService(service))
        const did = getDIDFromService(service)
        const ddo = await this.nevermined.assets.resolve(did)
        ddo.updateService(this.nevermined, service)

        const agreementId = await nftSalesTemplate.createAgreementFromDDO(
            agreementIdSeed,
            ddo,
            nftSalesTemplate.params(
                consumer.getId(),
                nftAmount,
                currentNftHolder.getId()
            ),
            consumer,
            consumer,
            [86400, 86400, 86400],
            params
        )

        if (!agreementId) throw new Error('Creating buy agreement failed')

        const payment = findServiceConditionByName(service, 'lockPayment')

        const receipt = await this.nevermined.agreements.conditions.lockPayment(
            agreementId,
            ddo.id,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            payment.parameters.find(p => p.name === '_tokenAddress').value as string,
            consumer,
            params
        )

        if (!receipt) throw new NFTError('LockPayment Failed.')
        return receipt
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
}
