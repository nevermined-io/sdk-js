import { MetaData } from '../ddo/MetaData'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import AssetRewards from '../models/AssetRewards'
import { DDO } from '../sdk'
import {
    generateId,
    getAssetRewardsFromDDO,
    noZeroX,
    SubscribablePromise,
    zeroX
} from '../utils'
import { CreateProgressStep } from './Assets'
import Account from './Account'

export class Nfts extends Instantiable {
    public static async getInstance(config: InstantiableConfig): Promise<Nfts> {
        const instance = new Nfts()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Create a new NFT Nevermined Asset.
     *
     * @param {MetaData} metadata The metadata associated with the NFT.
     * @param {Account} publisher The account of the creator od the NFT.
     * @param {Number} cap The maximum amount of NFTs that can be minted for this asset. Set it to zero for unlimited.
     * @param {Number} royalties The percentage that the `publisher` should get on secondary market sales. A number between 0 and 100.
     * @param {AssetRewards} assetRewards The sales reward distribution.
     * @param {Number} nftAmount The amount of nfts a consumer needs to hold in order to gain access to the files.
     * @returns {DDO} The newly registered DDO.
     */
    public create(
        metadata: MetaData,
        publisher: Account,
        cap: number,
        royalties: number,
        assetRewards: AssetRewards,
        nftAmount: number = 1
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.nevermined.assets.create(
            metadata,
            publisher,
            assetRewards,
            ['nft-sales', 'nft-access'],
            [],
            'PSK-RSA',
            [],
            cap,
            royalties,
            nftAmount
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
    public async mint(did: string, nftAmount: number, publisher: Account) {
        return await this.nevermined.keeper.didRegistry.mint(
            did,
            nftAmount,
            publisher.getId()
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
    public async burn(did: string, nftAmount: number, publisher: Account) {
        return await this.nevermined.keeper.didRegistry.burn(
            did,
            nftAmount,
            publisher.getId()
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
        consumer: Account
    ): Promise<string> {
        let result: boolean
        const { nftSalesTemplate } = this.nevermined.keeper.templates
        const { agreements } = this.nevermined

        const agreementId = zeroX(generateId())
        const ddo = await this.nevermined.assets.resolve(did)

        // TODO: Remove hardcoded index value
        const assetRewards = getAssetRewardsFromDDO(ddo, 6)

        this.logger.log('Creating nft-sales agreement')
        result = await nftSalesTemplate.createAgreementFromDDO(
            agreementId,
            ddo,
            assetRewards,
            consumer.getId(),
            undefined,
            nftAmount
        )
        if (!result) {
            throw Error('Error creating nft-sales agreement')
        }

        this.logger.log('Locking payment')
        result = await agreements.conditions.lockPayment(
            agreementId,
            ddo.id,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            consumer
        )
        if (!result) {
            throw Error('Error locking payment')
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
     * @param {Account} consumer The recipient of the NFTs.
     * @param {Account} publisher The current owner of the NFTs.
     * @returns {Boolean} True if the transfer was successfull.
     */
    public async transfer(
        agreementId: string,
        did: string,
        nftAmount: number,
        consumer: Account,
        publisher: Account
    ): Promise<boolean> {
        const { agreements } = this.nevermined

        const ddo = await this.nevermined.assets.resolve(did)
        const assetRewards = getAssetRewardsFromDDO(ddo, 6)

        const result = await agreements.conditions.transferNft(
            agreementId,
            did,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            consumer.getId(),
            nftAmount,
            publisher
        )
        if (!result) {
            throw Error('Error transfering nft.')
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
        publisher: Account
    ): Promise<boolean> {
        const { agreements } = this.nevermined

        const ddo = await this.nevermined.assets.resolve(did)
        const assetRewards = getAssetRewardsFromDDO(ddo, 6)

        const result = await agreements.conditions.releaseNftReward(
            agreementId,
            did,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            consumer.getId(),
            nftAmount,
            publisher
        )
        if (!result) {
            throw Error('Error releasing the rewards.')
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
        index?: number
    ) {
        const ddo = await this.nevermined.assets.resolve(did)

        // Download the files
        this.logger.log('Downloading the files')
        return await this.dowloadFiles('0x', ddo, consumer, destination, index)
    }

    /**
     * Get the NFT balance for a particular did
     *
     * @param {String} did The Decentralized Identifier of the NFT asset.
     * @param {Account} account The account to check the balance of.
     * @returns {Number} The ammount of NFTs owned by the account.
     */
    public async balance(did: string, account: Account) {
        return await this.nevermined.keeper.didRegistry.balance(account.getId(), did)
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

    private async dowloadFiles(
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
            files.forEach(async (_, i) => {
                const url = `${serviceEndpoint}/${noZeroX(agreementId)}/${i}`
                await this.nevermined.utils.fetch.downloadFile(
                    url,
                    destination,
                    i,
                    headers
                )
            })
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
}
