import { OceanAccounts } from './OceanAccounts'
import { OceanAgreements } from './OceanAgreements'
import { OceanAssets } from './OceanAssets'
import { OceanAuth } from './OceanAuth'
import { OceanSecretStore } from './OceanSecretStore'
import { OceanTokens } from './OceanTokens'
import { OceanVersions } from './OceanVersions'
import { OceanUtils } from './utils/OceanUtils'

import { Aquarius } from '../aquarius/Aquarius'
import { Brizo } from '../brizo/Brizo'

import Keeper from '../keeper/Keeper'

import { Config } from '../models/Config'

import {
    Instantiable,
    generateIntantiableConfigFromConfig
} from '../Instantiable.abstract'

/**
 * Main interface for Ocean Protocol.
 */
export class Ocean extends Instantiable {
    /**
     * Returns the instance of Ocean.
     * @param  {Config} config Ocean instance configuration.
     * @return {Promise<Ocean>}
     */
    public static async getInstance(config: Config): Promise<Ocean> {
        const instance = new Ocean()

        const instanceConfig = {
            ...generateIntantiableConfigFromConfig(config),
            ocean: instance
        }
        instance.setInstanceConfig(instanceConfig)

        instance.keeper = await Keeper.getInstance(instanceConfig)

        instance.brizo = new Brizo(instanceConfig)
        instance.aquarius = new Aquarius(instanceConfig)

        instance.accounts = await OceanAccounts.getInstance(instanceConfig)
        instance.auth = await OceanAuth.getInstance(instanceConfig)
        instance.assets = await OceanAssets.getInstance(instanceConfig)
        instance.agreements = await OceanAgreements.getInstance(instanceConfig)
        instance.secretStore = await OceanSecretStore.getInstance(instanceConfig)
        instance.tokens = await OceanTokens.getInstance(instanceConfig)
        instance.versions = await OceanVersions.getInstance(instanceConfig)

        instance.utils = await OceanUtils.getInstance(instanceConfig)

        return instance
    }

    /**
     * Keeper instance.
     * @type {Keeper}
     */
    public keeper: Keeper

    /**
     * Brizo instance.
     * @type {Brizo}
     */
    public brizo: Brizo

    /**
     * Aquarius instance.
     * @type {Aquarius}
     */
    public aquarius: Aquarius

    /**
     * Ocean account submodule
     * @type {OceanAccounts}
     */
    public accounts: OceanAccounts

    /**
     * Ocean auth submodule
     * @type {OceanAuth}
     */
    public auth: OceanAuth

    /**
     * Ocean assets submodule
     * @type {OceanAssets}
     */
    public assets: OceanAssets

    /**
     * Ocean agreements submodule
     * @type {OceanAgreements}
     */
    public agreements: OceanAgreements

    /**
     * Ocean secretStore submodule
     * @type {OceanSecretStore}
     */
    public secretStore: OceanSecretStore

    /**
     * Ocean tokens submodule
     * @type {OceanTokens}
     */
    public tokens: OceanTokens

    /**
     * Ocean versions submodule
     * @type {OceanVersions}
     */
    public versions: OceanVersions

    /**
     * Ocean utils submodule
     * @type {OceanUtils}
     */
    public utils: OceanUtils

    private constructor() {
        super()
    }
}
