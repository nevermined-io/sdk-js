import { MetaData } from '../ddo/MetaData'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import AssetRewards from '../models/AssetRewards'
import { DDO, utils } from '../sdk'
import {
    fillConditionsWithDDO,
    findServiceConditionByName,
    generateId,
    getAssetRewardsFromDDOByService,
    getAssetRewardsFromService,
    getDIDFromService,
    getNftAmountFromService,
    getNftHolderFromService,
    noZeroX,
    SubscribablePromise,
    zeroX
} from '../utils'
import { CreateProgressStep } from './Assets'
import Account from './Account'
import Token from '../keeper/contracts/Token'
import { ServiceSecondary } from '../ddo/Service'
import { TxParameters } from '../keeper/contracts/ContractBase'

export class Nfts extends Instantiable {
    public static async getInstance(config: InstantiableConfig): Promise<Nfts> {
        const instance = new Nfts()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Create a new NFT Nevermined Asset.
     *
     * @param {MetaData}        metadata The metadata associated with the NFT.
     * @param {number}          cap The max number of nfts.
     * @param {Account}         publisher The account of the creator od the NFT.
     * @param {number}          nftAmount The maximum amount of NFTs that can be minted for this asset. Set it to zero for unlimited.
     * @param {number}          royalties The percentage that the `publisher` should get on secondary market sales. A number between 0 and 100.
     * @param {AssetRewards}    assetRewards The sales reward distribution.
     * @param {string}          erc20TokenAddress The sales reward distribution.
     * @returns {DDO} The newly registered DDO.
     */
    public create(
        metadata: MetaData,
        publisher: Account,
        cap: number,
        royalties: number,
        assetRewards: AssetRewards,
        nftAmount: number = 1,
        erc20TokenAddress?: string,
        preMint?: boolean,
        nftMetadata?: string,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.nevermined.assets.createNft(
            metadata,
            publisher,
            assetRewards,
            undefined,
            cap,
            undefined,
            nftAmount,
            royalties,
            erc20TokenAddress,
            preMint,
            nftMetadata ? nftMetadata : '',
            txParams
        )
    }

    public create721(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards,
        nftTokenAddress: string,
        erc20tokenAddress?: string,
        royalties?: number,
        nftMetadata?: string,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.nevermined.assets.createNft721(
            metadata,
            publisher,
            assetRewards,
            undefined,
            nftTokenAddress,
            erc20tokenAddress,
            undefined,
            royalties,
            nftMetadata ? nftMetadata : '',
            txParams
        )
    }

    /**
     * Mint NFTs associated with an asset.
     *
     * This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.
     *
     * @param {String} did The Decentralized Identifier of the NFT asset.
     * @param {Number} nftAmount The amount of NFTs to mint.
     * @param {Account} publisher The account of the publisher of the NFT.
     * @returns
     */
    public async mint(
        did: string,
        nftAmount: number,
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
     * The publisher can only burn NFTs that it owns. NFTs that were already transfered cannot be burned by the publisher.
     *
     * @param {String} did The Decentralized Identifier of the NFT asset.
     * @param {Number} nftAmount The amount of NFTs to burn.
     * @param {Account} publisher The account of the publisher of the NFT.
     * @returns
     */
    public async burn(
        did: string,
        nftAmount: number,
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
    //       Right now it fetchs the rewards from the DDO which don't change.
    /**
     * Buy NFTs.
     *
     * This will lock the funds of the consumer in escrow pending the transfer of the NFTs
     * from the publisher/provider.
     *
     * @param {String} did The Decentralized Identifier of the NFT asset.
     * @param {Number} nftAmount The amount of NFTs to buy.
     * @param {Account} consumer The account of the NFT buyer.
     * @returns {string} The NFT sales agreement id.
     */
    public async order(
        did: string,
        nftAmount: number,
        consumer: Account,
        txParams?: TxParameters
    ): Promise<string> {
        let result: boolean
        const { nftSalesTemplate } = this.nevermined.keeper.templates
        const { agreements } = this.nevermined

        const agreementId = zeroX(generateId())
        const ddo = await this.nevermined.assets.resolve(did)

        const salesService = ddo.findServiceByType('nft-sales')
        const assetRewards = getAssetRewardsFromService(salesService)

        this.logger.log('Creating nft-sales agreement')
        result = await nftSalesTemplate.createAgreementFromDDO(
            agreementId,
            ddo,
            assetRewards,
            consumer,
            nftAmount,
            undefined,
            undefined,
            txParams
        )
        if (!result) {
            throw Error('Error creating nft-sales agreement')
        }

        this.logger.log('Locking payment')
        const payment = findServiceConditionByName(salesService, 'lockPayment')
        if (!payment) throw new Error('Payment condition not found!')

        result = await agreements.conditions.lockPayment(
            agreementId,
            ddo.id,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            payment.parameters.find(p => p.name === '_tokenAddress').value as string,
            consumer,
            txParams
        )
        if (!result) {
            throw Error('Error locking payment')
        }

        return agreementId
    }

    public async order721(
        did: string,
        consumer: Account,
        txParams?: TxParameters
    ): Promise<string> {
        let result: boolean

        const { nft721SalesTemplate } = this.nevermined.keeper.templates
        const { agreements } = this.nevermined

        const agreementId = zeroX(generateId())
        const ddo = await this.nevermined.assets.resolve(did)

        const salesService = ddo.findServiceByType('nft721-sales')
        const assetRewards = getAssetRewardsFromService(salesService)

        this.logger.log('Creating nft721-sales agreement')
        result = await nft721SalesTemplate.createAgreementFromDDO(
            agreementId,
            ddo,
            assetRewards,
            consumer,
            consumer,
            txParams
        )
        if (!result) {
            throw Error('Error creating nft721-sales agreement')
        }

        this.logger.log('Locking payment')
        const payment = findServiceConditionByName(salesService, 'lockPayment')
        if (!payment) throw new Error('Payment condition not found!')

        result = await agreements.conditions.lockPayment(
            agreementId,
            ddo.id,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            payment.parameters.find(p => p.name === '_tokenAddress').value as string,
            consumer,
            txParams
        )
        if (!result) {
            throw Error('Error locking nft721 payment')
        }

        return agreementId
    }

    /**
     * Transfer NFTs to the consumer.
     *
     * A publisher/provider will check if the consumer put the funds in escrow and
     * execute the transfer in order to be able to release the rewards.
     *
     * @param {String} agreementId The NFT sales agreement id.
     * @param {String} did The Decentralized identifier of the NFT asset.
     * @param {Number} nftAmount The number of NFTs to transfer.
     * @param {Account} publisher The current owner of the NFTs.
     * @returns {Boolean} True if the transfer was successfull.
     */
    public async transfer(
        agreementId: string,
        did: string,
        nftAmount: number,
        publisher: Account,
        txParams?: TxParameters
    ): Promise<boolean> {
        const { agreements } = this.nevermined

        const ddo = await this.nevermined.assets.resolve(did)
        const salesService = ddo.findServiceByType('nft-sales')
        const assetRewards = getAssetRewardsFromService(salesService)

        const result = await agreements.conditions.transferNft(
            agreementId,
            ddo,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            nftAmount,
            publisher,
            txParams
        )

        if (!result) {
            throw Error('Error transferring nft.')
        }

        return true
    }

    public async transferForDelegate(
        agreementId: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: number
    ): Promise<boolean> {
        return await this.nevermined.gateway.nftTransferForDelegate(
            agreementId,
            nftHolder,
            nftReceiver,
            nftAmount
        )
    }

    public async transfer721(
        agreementId: string,
        did: string,
        from: Account,
        txParams?: TxParameters
    ): Promise<boolean> {
        const { agreements } = this.nevermined

        const ddo = await this.nevermined.assets.resolve(did)
        const assetRewards = getAssetRewardsFromDDOByService(ddo, 'nft721-sales')

        const result = await agreements.conditions.transferNft721(
            agreementId,
            ddo,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            from,
            txParams
        )
        if (!result) {
            throw Error('Error transferring nft721.')
        }

        return true
    }

    /**
     * Release the funds from escrow.
     *
     * A publisher is able to release the funds put on escrow by the consumer after transfering the NFTs.
     *
     * @param {String} agreementId
     * @param {String} did
     * @param {Number} nftAmount
     * @param {Account} consumer
     * @param {Account} publisher
     * @returns {Boolean} True if the funds release was successfull.
     */
    public async releaseRewards(
        agreementId: string,
        did: string,
        nftAmount: number,
        consumer: Account,
        publisher: Account,
        txParams?: TxParameters
    ): Promise<boolean> {
        const { agreements } = this.nevermined

        const ddo = await this.nevermined.assets.resolve(did)
        const salesService = ddo.findServiceByType('nft-sales')
        const assetRewards = getAssetRewardsFromService(salesService)

        const result = await agreements.conditions.releaseNftReward(
            agreementId,
            ddo,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            nftAmount,
            publisher,
            undefined,
            txParams
        )

        if (!result) {
            throw Error('Error releasing the rewards.')
        }

        return true
    }

    public async release721Rewards(
        agreementId: string,
        did: string,
        publisher: Account,
        txParams?: TxParameters
    ): Promise<boolean> {
        const { agreements } = this.nevermined

        const ddo = await this.nevermined.assets.resolve(did)
        const assetRewards = getAssetRewardsFromDDOByService(ddo, 'nft721-sales')

        const result = await agreements.conditions.releaseNft721Reward(
            agreementId,
            ddo,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            publisher,
            undefined,
            txParams
        )

        if (!result) {
            throw Error('Error releasing the 721 rewards.')
        }

        return true
    }

    /**
     * Access the files associated with an NFT.
     *
     * This function will call the gateway that will check if all the access conditions where fulfilled
     * before providing the files.
     *
     * @param {String} did The Decentralized Identifier of the NFT asset.
     * @param {Account} consumer The NFT holder account.
     * @param {String} destination The download destination for the files.
     * @param {Number} index The index of the file. If unset will download all the files in the asset.
     * @returns
     */
    public async access(
        did: string,
        consumer: Account,
        destination?: string,
        index?: number,
        agreementId: string = '0x'
    ) {
        const ddo = await this.nevermined.assets.resolve(did)

        // Download the files
        this.logger.log('Downloading the files')
        return await this.downloadFiles(agreementId, ddo, consumer, destination, index)
    }

    /**
     * Get the NFT balance for a particular did
     *
     * @param {String} did The Decentralized Identifier of the NFT asset.
     * @param {Account} account The account to check the balance of.
     * @returns {Number} The ammount of NFTs owned by the account.
     */
    public async balance(did: string, account: Account) {
        return await this.nevermined.keeper.nftUpgradeable.balance(account.getId(), did)
    }

    public async ownerOf(did: string, nftTokenAddress: string) {
        return (await this.nevermined.contracts.loadNft721(nftTokenAddress)).ownerOf(did)
    }

    /**
     * Get the details of an NFT
     *
     * @param {String} did The Decentralized Identifier of the NFT asset.
     * @returns The details of the NFT.
     */
    public async details(did: string) {
        const details = await this.nevermined.keeper.didRegistry.getDIDRegister(did)
        return {
            owner: details[0],
            lastChecksum: details[1],
            url: details[2],
            lastUpdatedBy: details[3],
            blockNumberUpdated: Number(details[4]),
            providers: details[5],
            nftSupply: Number(details[6]),
            mintCap: Number(details[7]),
            royalties: Number(details[8])
        }
    }

    private async downloadFiles(
        agreementId: string,
        ddo: DDO,
        consumer: Account,
        destination?: string,
        index?: number
    ) {
        const { serviceEndpoint } =
            ddo.findServiceByType('nft-access') || ddo.findServiceByType('nft721-access')
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
                await this.nevermined.utils.fetch.downloadFile(
                    url,
                    destination,
                    i,
                    headers
                )
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
     *
     * @param ddo {DDO} the Decentraized ID of the NFT
     * @param assetRewards {AssetRewards} the currect setup of asset rewards
     * @param nftAmount {Number} the number of NFTs put up for secondary sale
     * @param provider {Account} the account that will be the provider of the secondary sale
     * @param owner {Account} the account of the current owner
     * @returns {Promise<string>} the agreementId if the secondary sale config was successful
     */
    public async listOnSecondaryMarkets(
        ddo: DDO,
        assetRewards: AssetRewards,
        nftAmount: number,
        provider: string,
        token: Token,
        owner: string
    ): Promise<string> {
        const { nftSalesTemplate } = this.nevermined.keeper.templates
        const agreementId = zeroX(utils.generateId())
        const nftSalesServiceAgreementTemplate = await nftSalesTemplate.getServiceAgreementTemplate()
        const nftSalesTemplateConditions = await nftSalesTemplate.getServiceAgreementTemplateConditions()

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
            agreementId,
            nftSalesServiceAgreement
        )

        if (saveResult) {
            return agreementId
        } else {
            throw Error(`Error saving ${agreementId} to MetadataDB`)
        }
    }

    /**
     * Buys a number of listed goods on secondary markets.
     * @param consumer The account of the buyer/consumer.
     * @param nftAmount The number of assets to buy. 1 by default.
     * @param agreementId The agreementId of the initial sales agreement created off-chain.
     * @returns {Promise<Boolean>} true if the buy was successful.
     */
    public async buySecondaryMarketNft(
        consumer: Account,
        nftAmount: number = 1,
        agreementId: string,
        params?: TxParameters
    ): Promise<boolean> {
        const { nftSalesTemplate } = this.nevermined.keeper.templates
        const service = await this.nevermined.metadata.retrieveService(agreementId)
        const assetRewards = getAssetRewardsFromService(service)
        // has no privkeys, so we can't sign
        const currentNftHolder = new Account(getNftHolderFromService(service))
        const did = getDIDFromService(service)
        const ddo = await this.nevermined.assets.resolve(did)

        const result = await nftSalesTemplate.createAgreementFromDDO(
            agreementId,
            ddo,
            assetRewards,
            consumer,
            nftAmount,
            currentNftHolder,
            consumer,
            params,
            service
        )

        if (!result) throw new Error('Creating buy agreement failed')

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

        if (!receipt) throw new Error('LockPayment Failed.')
        return receipt
    }

    /**
     * Used to release the secondary market NFT & the locked rewards.
     * @param owner The owner account.
     * @param agreementId the Id of the underlying service agreement.
     * @returns {Promise<Boolean>} true if the transaction was successful.
     */
    public async releaseSecondaryMarketRewards(
        owner: Account,
        agreementId: string,
        params?: TxParameters
    ): Promise<boolean> {
        const service = await this.nevermined.metadata.retrieveService(agreementId)
        const assetRewards = getAssetRewardsFromService(service)
        const did = getDIDFromService(service)
        const nftAmount = getNftAmountFromService(service)
        const ddo = await this.nevermined.assets.resolve(did)

        let receipt = await this.nevermined.agreements.conditions.transferNft(
            agreementId,
            ddo,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            nftAmount,
            owner,
            params
        )

        if (!receipt) throw new Error('TranferNft Failed.')

        receipt = await this.nevermined.agreements.conditions.releaseNftReward(
            agreementId,
            ddo,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            nftAmount,
            owner,
            undefined,
            params
        )

        if (!receipt) throw new Error('ReleaseNftReward Failed.')
        return receipt
    }
}
