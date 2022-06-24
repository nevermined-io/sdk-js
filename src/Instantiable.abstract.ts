import Web3 from 'web3'
import Config from './models/Config'
import { Logger, LoggerInstance, LogLevel } from './utils'
import Web3Provider from './keeper/Web3Provider'
import { Nevermined } from './nevermined/Nevermined'

export interface InstantiableConfig {
    nevermined: Nevermined
    config?: Config
    web3?: Web3
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
        const code = await this.web3.eth.getStorageAt(address, 0);
        if (code === '0x0000000000000000000000000000000000000000000000000000000000000000'
        ) {
            // no code in the blockchain dude
            throw new Error(`No contract deployed at address ${address}, sorry.`);
        }

        return true;
    }

    protected get web3() {
        if (!this._instantiableConfig?.web3) {
            this.logger.error('Web3 instance is not defined.')
            this.logger.error('Using default instance.')
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

    public static getInstance(...args: any[]): any
    // public static async getInstance(...args: any[]): Promise<any>

    public static async getInstance(config: InstantiableConfig): Promise<any> {
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
