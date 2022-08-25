import Config from './models/Config'
import { Logger, LoggerInstance, LogLevel } from './utils'
import Web3Provider from './keeper/Web3Provider'
import { Nevermined } from './nevermined/Nevermined'
import { ethers } from 'ethers'

export interface InstantiableConfig {
    nevermined: Nevermined
    config?: Config
    web3?: ethers.providers.JsonRpcProvider
    logger?: Logger
    artifactsFolder?: string
}

export function generateIntantiableConfigFromConfig(
    config: Config
): Partial<InstantiableConfig> {
    const logLevel =
        typeof config.verbose !== 'number'
            ? config.verbose
                ? LogLevel.Log
                : LogLevel.None
            : (config.verbose as LogLevel)
    return {
        config,
        web3: Web3Provider.getWeb3(config),
        logger: new Logger(logLevel),
        artifactsFolder: config.artifactsFolder
    }
}

export abstract class Instantiable {
    protected get nevermined() {
        if (!this._instantiableConfig?.nevermined) {
            this.logger.error('Nevermined instance is not defined.')
        }
        return this._instantiableConfig.nevermined
    }

    /**
     * Returns true of contract exists else it throws.
     * @return {Promise<boolean>} Contract exists.
     */
    protected async checkExists(address: string): Promise<boolean> {
        const storage = await this.web3.getStorageAt(address, 0)
        // check if storage is 0x0 at position 0, this is the case most of the cases
        if (
            storage ===
            '0x0000000000000000000000000000000000000000000000000000000000000000'
        ) {
            // if the storage is empty, check if there is no code for this contract,
            // if so we can be sure it does not exist
            const code = await this.web3.getCode(address)
            if (code === '0x0') {
                // no contract in the blockchain dude
                throw new Error(`No contract deployed at address ${address}, sorry.`)
            }
        }

        return true
    }

    protected get web3() {
        if (!this._instantiableConfig?.web3) {
            this.logger.warn(
                'ethers.Provider instance is not defined. Using default instance.'
            )
            return Web3Provider.getWeb3()
        }
        return this._instantiableConfig.web3
    }

    protected get instantiableConfig() {
        if (!this._instantiableConfig) {
            this.logger.error('InstantiableConfig instance is not defined.')
        }
        return this._instantiableConfig
    }

    protected get config() {
        if (!this._instantiableConfig?.config) {
            this.logger.error('Config instance is not defined.')
        }
        return this._instantiableConfig.config
    }

    protected get logger() {
        if (!this._instantiableConfig?.logger) {
            LoggerInstance.error('Logger instance is not defined.')
            LoggerInstance.error('Using default instance.')
            return LoggerInstance
        }
        return this._instantiableConfig.logger
    }

    protected get artifactsFolder() {
        return this._instantiableConfig?.artifactsFolder
    }

    protected get instanceConfig(): InstantiableConfig {
        const { nevermined, web3, config, logger, artifactsFolder } = this
        return { nevermined, web3, config, logger, artifactsFolder }
    }

    public async findSigner(from: string): Promise<ethers.Signer> {
        for (const acc of this.config.accounts || []) {
            const addr = await acc.getAddress()
            if (addr.toLowerCase() === from.toLowerCase()) {
                return acc.connect(this.web3)
            }
        }
        return this.web3.getSigner(from)
    }

    public static async findSignerStatic(
        config: Config,
        web3: ethers.providers.JsonRpcProvider,
        from: string
    ): Promise<ethers.Signer> {
        for (const acc of config.accounts || []) {
            const addr = await acc.getAddress()
            if (addr.toLowerCase() === from.toLowerCase()) {
                return acc.connect(web3)
            }
        }
        return web3.getSigner(from)
    }

    public async addresses(): Promise<string[]> {
        let ethAccounts: string[] = []
        try {
            ethAccounts = await this.web3.listAccounts()
        } catch (e) {
            // ignore
        }
        const addresses = await Promise.all(
            (this.config.accounts || []).map((a) => a.getAddress())
        )
        return addresses.concat(ethAccounts)
    }

    public static async addressesStatic(
        config: Config,
        web3: ethers.providers.JsonRpcProvider
    ): Promise<string[]> {
        let ethAccounts: string[] = []
        try {
            ethAccounts = await web3.listAccounts()
        } catch (e) {
            // ignore
        }
        const addresses = await Promise.all(
            (config.accounts || []).map((a) => a.getAddress())
        )
        return addresses.concat(ethAccounts)
    }

    public static getInstance(...args: any[]): any

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async getInstance(_config: InstantiableConfig): Promise<any> {
        LoggerInstance.warn('getInstance() methods has needs to be added to child class.')
    }

    protected static setInstanceConfig<T extends Instantiable>(
        instance: T,
        instantiableConfig: InstantiableConfig
    ) {
        instance._instantiableConfig = instantiableConfig
    }

    private _instantiableConfig?: InstantiableConfig

    protected setInstanceConfig(config: InstantiableConfig) {
        Instantiable.setInstanceConfig(this, config)
    }
}
