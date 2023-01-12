import { AccountsApi } from './api/AccountsApi'
import { AgreementsApi } from './api/AgreementsApi'
import { AssetsApi } from './api/AssetsApi'
import { ProvenanceApi } from './api/ProvenanceApi'
import { UtilsApi } from './api/UtilsApi'
import { Keeper, CustomToken, Nft1155Contract } from '../keeper'
import { NeverminedOptions } from '../models'
import {
    Instantiable,
    generateIntantiableConfigFromConfig
} from '../Instantiable.abstract'
import { NFT1155Api, NFT721Api, ComputeApi, SearchApi, ServicesApi } from './api'

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
    public static async getInstance(config: NeverminedOptions): Promise<Nevermined> {
        const instance = new Nevermined()

        const instanceConfig = {
            ...generateIntantiableConfigFromConfig(config),
            nevermined: instance
        }
        instance.setInstanceConfig(instanceConfig)

        instance.keeper = await Keeper.getInstance(instanceConfig)
        await instance.keeper.init()

        // Nevermined main API
        instance.accounts = new AccountsApi(instanceConfig)
        instance.agreements = new AgreementsApi(instanceConfig)
        instance.assets = new AssetsApi(instanceConfig)
        instance.compute = new ComputeApi(instanceConfig)
        instance.nfts1155 = await NFT1155Api.getInstance(
            instanceConfig,
            instance.keeper.nftUpgradeable
        )
        instance.provenance = new ProvenanceApi(instanceConfig)
        instance.search = new SearchApi(instanceConfig)
        instance.services = new ServicesApi(instanceConfig)
        instance.utils = new UtilsApi(instanceConfig)

        return instance
    }

    /**
     * Nevermined very own contract reflector.
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
     * Keeper instance.
     */
    public keeper: Keeper

    /**
     * Accounts submodule
     */
    public accounts: AccountsApi

    /**
     * Agreements submodule
     */
    public agreements: AgreementsApi

    /**
     * Assets API
     */
    public assets: AssetsApi

    /**
     * Compute API
     */
    public compute: ComputeApi

    /**
     * ERC-1155 Nfts API
     */
    public nfts1155: NFT1155Api

    /**
     * ERC-721 Nfts API
     */
    public nfts721: NFT721Api

    /**
     * Provenance submodule
     */
    public provenance: ProvenanceApi

    /**
     * SearchApi API
     */
    public search: SearchApi

    /**
     * SearchApi API
     */
    public services: ServicesApi

    /**
     * Utils submodule
     */
    public utils: UtilsApi

    private constructor() {
        super()
    }
}
