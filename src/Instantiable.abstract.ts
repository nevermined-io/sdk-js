import { NeverminedOptions } from './'
import { Logger, LoggerInstance, LogLevel } from './utils'
import { Nevermined } from './nevermined'
import { ethers } from 'ethers'
import { BlockchainEthersUtils } from './nevermined/utils/BlockchainEthersUtils'

export interface InstantiableConfig {
  nevermined: Nevermined
  config?: NeverminedOptions
  web3?: ethers.JsonRpcProvider | ethers.BrowserProvider
  logger?: Logger
  artifactsFolder?: string
  circuitsFolder?: string
}

export async function generateInstantiableConfigFromConfig(
  config: NeverminedOptions,
  loadCore: boolean = true,
): Promise<Partial<InstantiableConfig>> {
  const logLevel =
    typeof config.verbose !== 'number'
      ? config.verbose
        ? LogLevel.Log
        : LogLevel.None
      : (config.verbose as LogLevel)
  return {
    config,
    web3: loadCore ? await BlockchainEthersUtils.getWeb3Provider(config) : undefined,
    logger: new Logger(logLevel),
    artifactsFolder: config.artifactsFolder,
    circuitsFolder: config.circuitsFolder,
  }
}

export abstract class Instantiable {
  protected get nevermined() {
    if (!this._instantiableConfig?.nevermined) {
      this.logger.error('Nevermined instance is not defined.')
    }
    return this._instantiableConfig.nevermined
  }

  public get web3() {
    if (!this._instantiableConfig?.web3) {
      this.logger.error('Web3 Provider not initialized')
      throw new Error('Web3 Provider not initialized')
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

  protected get circuitsFolder() {
    return this._instantiableConfig?.circuitsFolder
  }

  protected get instanceConfig(): InstantiableConfig {
    const { nevermined, web3, config, logger, artifactsFolder, circuitsFolder } = this
    return { nevermined, web3, config, logger, artifactsFolder, circuitsFolder }
  }

  public static getInstance(..._args: any): any {
    LoggerInstance.warn('getInstance() methods has needs to be added to child class.')
  }

  protected static setInstanceConfig<T extends Instantiable>(
    instance: T,
    instantiableConfig: InstantiableConfig,
  ) {
    instance._instantiableConfig = instantiableConfig
  }

  private _instantiableConfig?: InstantiableConfig

  protected setInstanceConfig(config: InstantiableConfig) {
    Instantiable.setInstanceConfig(this, config)
  }
}
