import { NeverminedOptions } from './'
import { Logger, LoggerInstance, LogLevel } from './utils'
import { Nevermined } from './nevermined'
import { ethers } from 'ethers'
import { createPublicClient, createWalletClient, http, PublicClient, WalletClient } from 'viem'

export interface InstantiableConfig {
  nevermined: Nevermined
  config?: NeverminedOptions
  web3?: ethers.JsonRpcProvider | ethers.BrowserProvider
  client?: Web3Clients
  logger?: Logger
  artifactsFolder?: string
  circuitsFolder?: string
}

export interface Web3Clients {
  public: PublicClient
  wallet: WalletClient
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
    web3: loadCore ? await getWeb3EthersProvider(config) : undefined,
    client: loadCore ? getWeb3ViemClients(config) : undefined,
    logger: new Logger(logLevel),
    artifactsFolder: config.artifactsFolder,
    circuitsFolder: config.circuitsFolder,
  }
}

export function getWeb3ViemClients(config: Partial<NeverminedOptions> = {}): Web3Clients {
  const publicClient = createPublicClient({
    cacheTime: 0,
    transport: http(config.web3ProviderUri),
  })
  const walletClient = createWalletClient({
    cacheTime: 0,
    transport: http(config.web3ProviderUri),
  })

  return {
    public: publicClient,
    wallet: walletClient,
  } as Web3Clients
}

export async function getWeb3EthersProvider(
  config: Partial<NeverminedOptions> = {},
): Promise<ethers.JsonRpcProvider | ethers.BrowserProvider> {
  if (config.web3Provider) {
    return new ethers.BrowserProvider(config.web3Provider)
  }

  // disabling the cache since this will lead to duplicated nonces on test networks
  // See https://docs.ethers.org/v6/api/providers/abstract-provider/#AbstractProviderOptions
  let provider = new ethers.JsonRpcProvider(config.web3ProviderUri, undefined, {
    cacheTimeout: -1,
  })

  // Adding the static network prevents ethers from calling eth_chainId with every call
  const network = await provider.getNetwork()
  provider = new ethers.JsonRpcProvider(config.web3ProviderUri, undefined, {
    cacheTimeout: -1,
    staticNetwork: network,
  })

  return provider
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

  public get client() {
    if (!this._instantiableConfig?.client) {
      this.logger.error('Web3 Provider not initialized')
      throw new Error('Web3 Provider not initialized')
    }
    return this._instantiableConfig.client
  }

  public get publicClient(): PublicClient {
    if (!this._instantiableConfig?.client?.public) {
      this.logger.error('Web3 Provider not initialized')
      throw new Error('Web3 Provider not initialized')
    }
    return this._instantiableConfig.client?.public
  }

  public get walletClient(): WalletClient {
    if (!this._instantiableConfig?.client?.wallet) {
      this.logger.error('Web3 Provider not initialized')
      throw new Error('Web3 Provider not initialized')
    }
    return this._instantiableConfig.client?.wallet
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
