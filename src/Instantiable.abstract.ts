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
        logger: new Logger(logLevel)
    }
}

export abstract class Instantiable {
    protected get nevermined() {
        if (!this._nevermined) {
            this.logger.error('Nevermined instance is not defined.')
        }
        return this._nevermined
    }

    protected get web3() {
        if (!this._web3) {
            this.logger.error('Web3 instance is not defined.')
            this.logger.error('Using default instance.')
            return Web3Provider.getWeb3()
        }
        return this._web3
    }

    protected get config() {
        if (!this._config) {
            this.logger.error('Config instance is not defined.')
        }
        return this._config
    }

    protected get logger() {
        if (!this._logger) {
            LoggerInstance.error('Logger instance is not defined.')
            LoggerInstance.error('Using default instance.')
            return LoggerInstance
        }
        return this._logger
    }

    protected get instanceConfig(): InstantiableConfig {
        const { nevermined, web3, config, logger } = this
        return { nevermined, web3, config, logger }
    }

    public static async getInstance(...args: any[]): Promise<any>

    public static async getInstance(config: InstantiableConfig): Promise<any> {
        LoggerInstance.warn('getInstance() methods has needs to be added to child class.')
    }

    protected static setInstanceConfig<T extends Instantiable>(
        instance: T,
        { nevermined, config, web3, logger }: InstantiableConfig
    ) {
        instance._nevermined = nevermined
        instance._config = config
        instance._web3 = web3
        instance._logger = logger
    }

    private _nevermined: Nevermined

    private _web3: Web3

    private _config: Config

    private _logger: Logger

    protected setInstanceConfig(config: InstantiableConfig) {
        Instantiable.setInstanceConfig(this, config)
    }
}
