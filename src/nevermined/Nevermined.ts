import { AccountsApi } from './api/AccountsApi'
import { AgreementsApi } from './api/AgreementsApi'
import { AssetsApi } from './api/AssetsApi'
import { ProvenanceApi } from './api/ProvenanceApi'
import { UtilsApi } from './api/UtilsApi'
import Keeper from '../keeper/Keeper'
import { NeverminedOptions } from '../models/NeverminedOptions'
import {
    Instantiable,
    generateIntantiableConfigFromConfig
} from '../Instantiable.abstract'
import { NFT1155Api } from './api/nfts/NFT1155Api'
import { NFT721Api } from './api/nfts/NFT721Api'
import CustomToken from '../keeper/contracts/CustomToken'
import { Nft1155Contract } from '../keeper/contracts/Nft1155Contract'
import { ComputeApi } from './api/ComputeApi'
import { SearchApi } from './api/SearchApi'
import { ServicesApi } from './api/ServicesApi'

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
        instance.accounts = await AccountsApi.getInstance(instanceConfig)
        instance.agreements = await AgreementsApi.getInstance(instanceConfig)
        instance.assets = await AssetsApi.getInstance(instanceConfig)
        instance.compute = await ComputeApi.getInstance(instanceConfig)
        instance.nfts1155 = await NFT1155Api.getInstance(instanceConfig, instance.keeper.nftUpgradeable)
        instance.provenance = await ProvenanceApi.getInstance(instanceConfig)
        instance.search = await SearchApi.getInstance(instanceConfig)
        instance.services = await ServicesApi.getInstance(instanceConfig)
        instance.utils = await UtilsApi.getInstance(instanceConfig)

        return instance
    }


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
     * Keeper instance.
     */
     public keeper: Keeper

    /**
     * Accounts submodule
     */
    public accounts: AccountsApi

    /**
     * Assets API
     */
    public assets: AssetsApi

    /**
     * SearchApi API
     */
    public search: SearchApi

    /**
     * SearchApi API
     */
     public services: ServicesApi

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
     * Agreements submodule
     */
    public agreements: AgreementsApi

    /**
     * Provenance submodule
     */
     public provenance: ProvenanceApi

    /**
     * Utils submodule
     */
    public utils: UtilsApi

    private constructor() {
        super()
    }
}
