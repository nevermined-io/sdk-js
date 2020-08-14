import { Accounts } from './Accounts'
import { Agreements } from './Agreements'
import { Assets } from './Assets'
import { Auth } from './Auth'
import { NeverminedSecretStore } from './NeverminedSecretStore'
import { Token } from './Token'
import { Versions } from './Versions'
import { Utils } from './utils/Utils'

import { Metadata } from '../metadata/Metadata'
import { Gateway } from '../gateway/Gateway'

import Keeper from '../keeper/Keeper'

import { Config } from '../models/Config'

import {
    Instantiable,
    generateIntantiableConfigFromConfig
} from '../Instantiable.abstract'

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
        instance.metadata = new Metadata(instanceConfig)

        instance.accounts = await Accounts.getInstance(instanceConfig)
        instance.auth = await Auth.getInstance(instanceConfig)
        instance.assets = await Assets.getInstance(instanceConfig)
        instance.agreements = await Agreements.getInstance(instanceConfig)
        instance.secretStore = await NeverminedSecretStore.getInstance(instanceConfig)
        instance.token = await Token.getInstance(instanceConfig)
        instance.versions = await Versions.getInstance(instanceConfig)

        instance.utils = await Utils.getInstance(instanceConfig)

        return instance
    }

    /**
     * Keeper instance.
     * @type {Keeper}
     */
    public keeper: Keeper

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
     * Ocean tokens submodule
     * @type {Token}
     */
    public token: Token

    /**
     * Versions submodule
     * @type {Versions}
     */
    public versions: Versions

    /**
     * Utils submodule
     * @type {Utils}
     */
    public utils: Utils

    private constructor() {
        super()
    }
}
