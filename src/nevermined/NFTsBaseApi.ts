import { MetaData } from '../ddo/MetaData'
import { Instantiable } from '../Instantiable.abstract'
import AssetRewards from '../models/AssetRewards'
import { DDO, utils } from '../sdk'
import {
    fillConditionsWithDDO,
    findServiceConditionByName,
    getAssetRewardsFromService,
    getDIDFromService,
    getNftHolderFromService,
    SubscribablePromise,
    zeroX
} from '../utils'
import { CreateProgressStep, PublishMetadata, RoyaltyAttributes, RoyaltyKind } from './Assets'
import Account from './Account'
import Token from '../keeper/contracts/Token'
import { ServiceSecondary } from '../ddo/Service'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { NFTError } from '../errors'
import BigNumber from '../utils/BigNumber'
import {
    ERCType,
    NeverminedNFT1155Type,
    NeverminedNFTType
} from '../models/NFTAttributes'


export abstract class NFTsBaseApi extends Instantiable {

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
        providers: string[] = [],
        royaltyAttributes: RoyaltyAttributes,
        assetRewards: AssetRewards,
        nftAmount: BigNumber = BigNumber.from(1),
        erc20TokenAddress?: string,
        preMint?: boolean,
        nftMetadata?: string,
        nftType: NeverminedNFTType = NeverminedNFT1155Type.nft1155,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.nevermined.assets.createNftWithRoyalties(
            metadata,
            publisher,
            assetRewards,
            'PSK-RSA',
            cap,
            providers,
            nftAmount,
            royaltyAttributes,
            erc20TokenAddress,
            preMint,
            nftMetadata || '',
            nftType,
            appId,
            publishMetadata,
            txParams
        )
    }


    /**
     * Asks the Node to transfer the NFT on behalf of the publisher.
     *
     * @remarks
     * This is useful when the consumer does not want to wait for the publisher
     * to transfer the NFT once the payment is made. Assuming the publisher delegated
     * transfer permissions to the Node.
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
        return await this.nevermined.node.nftTransferForDelegate(
            agreementId,
            nftHolder,
            nftReceiver,
            nftAmount,
            ercType
        )
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
            serviceEndpoint: this.nevermined.node.getNftEndpoint(),
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
     * Access the files associated with an NFT.
     *
     * @remarks
     * This function will call the Node that will check if all the access conditions where fulfilled
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
     * @param agreementId - The NFT sales agreement id.
     * @param isToDownload - If the NFT is for downloading
     *
     * @returns true if the access was successful or file if isToDownload is false.
     */
     public async access(
        did: string,
        consumer: Account,
        destination?: string,
        index?: number,
        agreementId = '0x',
        isToDownload = true
    ) {
        const ddo = await this.nevermined.assets.resolve(did)
        const { attributes } = ddo.findServiceByType('metadata')
        const { files } = attributes.main

        const accessToken = await this.nevermined.utils.jwt.getNftAccessGrantToken(
            agreementId,
            ddo.id,
            consumer
        )
        const headers = {
            Authorization: 'Bearer ' + accessToken
        }

        // Download the files
        this.logger.log('Downloading the files')
        const result = await this.nevermined.node.downloadService(
            files,
            destination,
            index,
            isToDownload,
            headers
        )

        if (typeof result === 'string') {
            return true
        }
        return result
    }

}