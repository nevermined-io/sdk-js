import { Accounts } from './Accounts'
import { Agreements } from './Agreements'
import { Assets } from './Assets'
import { Auth } from './Auth'
import { NeverminedSecretStore } from './NeverminedSecretStore'
import { Token } from './Token'
import { Versions } from './Versions'
import { Provenance } from './Provenance'
import { Utils } from './utils/Utils'

import { Metadata } from '../metadata/Metadata'
import { Gateway } from '../gateway/Gateway'

import Keeper from '../keeper/Keeper'

import { Config } from '../models/Config'

import {
    Instantiable,
    generateIntantiableConfigFromConfig
} from '../Instantiable.abstract'
import { Faucet } from '../faucet/Faucet'
import { Provider } from './Provider'
import { Files } from './Files'
import { Nfts } from './Nfts'
import { Nft721 } from './Nft721'
import { AaveCredit } from './AaveCredit'
import { MarketplaceApi } from '../marketplace/MarketplaceAPI'

/**
 * Main interface for Nevermined Protocol.
 */
export class Nevermined extends Instantiable {
    /**
     * Returns the instance of Nevermined.
     * @param  {Config} config Nevermined instance configuration.
     * @return {Promise<Nevermined>}
     */
    public static async getInstance(config: Config): Promise<Nevermined> {
        const instance = new Nevermined()

        const instanceConfig = {
            ...generateIntantiableConfigFromConfig(config),
            nevermined: instance
        }
        instance.setInstanceConfig(instanceConfig)

        instance.keeper = await Keeper.getInstance(instanceConfig)

        instance.gateway = new Gateway(instanceConfig)
        instance.marketplace = new MarketplaceApi(instanceConfig)
        instance.metadata = new Metadata(instanceConfig)
        instance.faucet = new Faucet(instanceConfig)

        instance.accounts = await Accounts.getInstance(instanceConfig)
        instance.auth = await Auth.getInstance(instanceConfig)
        instance.assets = await Assets.getInstance(instanceConfig)
        instance.nfts = await Nfts.getInstance(instanceConfig)
        instance.files = await Files.getInstance(instanceConfig)
        instance.agreements = await Agreements.getInstance(instanceConfig)
        instance.secretStore = await NeverminedSecretStore.getInstance(instanceConfig)
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
     * @type {Keeper}
     */
    public keeper: Keeper

    /**
     * Nevermind very own contract reflector.
     * @type {Keeper}
     */
    public contracts = {
        loadNft721: async (address: string): Promise<Nft721> => {
            return await Nft721.getInstance(this.instanceConfig, address)
        }
    }

    /**
     * Gateway instance.
     * @type {Gateway}
     */
    public gateway: Gateway

    /**
     * Metadata instance.
     * @type {Metadata}
     */
    public metadata: Metadata

    /**
     * marketplace instance.
     * @type {marketplace}
     */
    public marketplace: MarketplaceApi

    /**
     * Metadata instance.
     * @type {Metadata}
     */
    public faucet: Faucet

    /**
     * Accounts submodule
     * @type {Accounts}
     */
    public accounts: Accounts

    /**
     * Auth submodule
     * @type {Auth}
     */
    public auth: Auth

    /**
     * Assets submodule
     * @type {Assets}
     */
    public assets: Assets

    /**
     * Nfts submodule
     * @type {Nfts}
     */
    public nfts: Nfts

    /**
     * Files submodule
     * @type {Files}
     */
    public files: Files

    /**
     * Agreements submodule
     * @type {Agreements}
     */
    public agreements: Agreements

    /**
     * SecretStore submodule
     * @type {NeverminedSecretStore}
     */
    public secretStore: NeverminedSecretStore

    /**
     * Nevermined probiders submodule
     * @type {Provider}
     */
    public provider: Provider

    /**
     * Nevermined tokens submodule
     * @type {Token}
     */
    public token: Token

    /**
     * AaveCredit allows taking loans from Aave protocol using NFT tokens as collateral.
     */
    public aaveCredit: AaveCredit

    /**
     * Versions submodule
     * @type {Versions}
     */
    public versions: Versions

    /**
     * Provenance submodule
     * @type {Provenance}
     */
    public provenance: Provenance

    /**
     * Utils submodule
     * @type {Utils}
     */
    public utils: Utils

    private constructor() {
        super()
    }
}
