import { Accounts } from './Accounts'
import { Agreements } from './Agreements'
import { Assets } from './Assets'
import { Auth } from './Auth'
import { Token } from './Token'
import { Versions } from './Versions'
import { Provenance } from './Provenance'
import { Utils } from './utils/Utils'

import { Metadata } from '../metadata/Metadata'
import { Profiles } from '../profiles/Profiles'
import { Bookmarks } from '../bookmarks/Bookmarks'
import { Permissions } from '../permissions/Permissions'
import { NeverminedNode } from '../node/NeverminedNode'

import Keeper from '../keeper/Keeper'

import { Config } from '../models/Config'

import {
    Instantiable,
    generateIntantiableConfigFromConfig
} from '../Instantiable.abstract'
import { Provider } from './Provider'
import { Files } from './Files'
import { NFT1155Api } from './nfts/NFT1155Api'
import { NFT721Api } from './nfts/NFT721Api'
import { AaveCredit } from './AaveCredit'
import { MarketplaceApi } from '../marketplace/MarketplaceAPI'
import CustomToken from '../keeper/contracts/CustomToken'
import { Nft1155Contract } from '../keeper/contracts/Nft1155Contract'

/**
 * Main interface for Nevermined Protocol.
 */
export class Nevermined extends Instantiable {
    /**
     * Returns the instance of Nevermined.
     *
     * @example
     * ```ts
     * import { Nevermined, Config } from '@nevermined-io/nevermied-sdk-js'
     *
     * const config: Config = {...}
     * const nevermined = await Nevermined.getInstance(config)
     * ```
     *
     * @param config - Nevermined instance configuration.
     * @returns A {@link Nevermined} instance
     */
    public static async getInstance(config: Config): Promise<Nevermined> {
        const instance = new Nevermined()

        const instanceConfig = {
            ...generateIntantiableConfigFromConfig(config),
            nevermined: instance
        }
        instance.setInstanceConfig(instanceConfig)

        instance.keeper = await Keeper.getInstance(instanceConfig)
        await instance.keeper.init()

        instance.node = new NeverminedNode(instanceConfig)
        instance.marketplace = new MarketplaceApi(instanceConfig)
        instance.metadata = new Metadata(instanceConfig)
        instance.profiles = new Profiles(instanceConfig)
        instance.bookmarks = new Bookmarks(instanceConfig)
        instance.permissions = new Permissions(instanceConfig)

        instance.accounts = await Accounts.getInstance(instanceConfig)
        instance.auth = await Auth.getInstance(instanceConfig)
        instance.assets = await Assets.getInstance(instanceConfig)

        instance.nfts1155 = await NFT1155Api.getInstance(
            instanceConfig,
            instance.keeper.nftUpgradeable
        )
        instance.files = await Files.getInstance(instanceConfig)
        instance.agreements = await Agreements.getInstance(instanceConfig)
        instance.token = await Token.getInstance(instanceConfig)
        instance.aaveCredit = await AaveCredit.getInstance(instanceConfig)

        instance.versions = await Versions.getInstance(instanceConfig)
        instance.provenance = await Provenance.getInstance(instanceConfig)
        instance.provider = await Provider.getInstance(instanceConfig)

        instance.utils = await Utils.getInstance(instanceConfig)

        return instance
    }

    /**
     * Keeper instance.
     */
    public keeper: Keeper

    /**
     * Nevermind very own contract reflector.
     */
    public contracts = {
        /**
         * Load a custom ERC-721 nft.
         *
         * @param address - The address of the ERC-721 contracts to load
         * @returns An instance of {@link NFT721Api}
         */
        loadNft721: async (address: string): Promise<NFT721Api> => {
            this.nfts721 = await NFT721Api.getInstance(this.instanceConfig, address)
            return this.nfts721
        },
        loadNft721Api: async (api: NFT721Api): Promise<NFT721Api> => {
            this.nfts721 = api
            return this.nfts721
        },
        /**
         * Load a custom ERC-1155 nft.
         *
         * @param address - The address of the ERC-721 contracts to load
         * @returns An instance of {@link NFT721Api}
         */
        loadNft1155: async (address: string): Promise<Nft1155Contract> => {
            return await Nft1155Contract.getInstance(this.instanceConfig, address)
        },
        /**
         * Load a custom ERC-20 nft.
         *
         * @param address - The address of the ERC-20 contracts to load
         * @returns An instance of the {@link CustomToken}
         */
        loadErc20: async (address: string): Promise<CustomToken> => {
            return await CustomToken.getInstanceByAddress(this.instanceConfig, address)
        }
    }

    /**
     * Nevermined Node instance.
     */
    public node: NeverminedNode

    /**
     * Metadata instance.
     */
    public metadata: Metadata

    /**
     * Marketplace instance.
     */
    public marketplace: MarketplaceApi

    /**
     * Profiles instance
     */
    public profiles: Profiles

    /**
     * Bookmarks instance
     */
    public bookmarks: Bookmarks

    /**
     * Permissions instance
     */
    public permissions: Permissions

    /**
     * Accounts submodule
     */
    public accounts: Accounts

    /**
     * Auth submodule
     */
    public auth: Auth

    /**
     * Assets submodule
     */
    public assets: Assets

    /**
     * Nfts submodule
     */
    public nfts1155: NFT1155Api

    /**
     * Nfts submodule
     */
    public nfts721: NFT721Api

    /**
     * Files submodule
     */
    public files: Files

    /**
     * Agreements submodule
     */
    public agreements: Agreements

    /**
     * Nevermined probiders submodule
     */
    public provider: Provider

    /**
     * Nevermined tokens submodule
     */
    public token: Token

    /**
     * AaveCredit allows taking loans from Aave protocol using NFT tokens as collateral.
     */
    public aaveCredit: AaveCredit

    /**
     * Versions submodule
     */
    public versions: Versions

    /**
     * Provenance submodule
     */
    public provenance: Provenance

    /**
     * Utils submodule
     */
    public utils: Utils

    private constructor() {
        super()
    }
}
