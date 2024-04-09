import { getChain } from './utils/Network'
import {
  Chain,
  createPublicClient,
  createWalletClient,
  http,
  PublicClient,
  WalletClient,
} from 'viem'
import { Logger, LoggerInstance, LogLevel } from './models/Logger'
import { NeverminedOptions } from './models/NeverminedOptions'
import { Nevermined } from './nevermined/Nevermined'

export interface InstantiableConfig {
  nevermined: Nevermined
  config?: NeverminedOptions
  client?: Web3Clients
  logger?: Logger
  artifactsFolder?: string
  circuitsFolder?: string
}

export interface Web3Clients {
  public: PublicClient
  wallet: WalletClient
  chain?: Chain
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
    client: loadCore ? await getWeb3ViemClients(config) : undefined,
    logger: new Logger(logLevel),
    artifactsFolder: config.artifactsFolder,
    circuitsFolder: config.circuitsFolder,
  }
}

export async function getWeb3ViemClients(
  config: Partial<NeverminedOptions> = {},
): Promise<Web3Clients> {
  const chain = getChain(config.chainId)
  const providerTransport = config.web3ProviderUri ? http(config.web3ProviderUri) : http()

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  const walletClient = createWalletClient({
    // cacheTime: 0 as number,
    chain,
    transport: providerTransport,
  })

  return {
    public: publicClient,
    wallet: walletClient,
    chain,
  } as Web3Clients
}

export abstract class Instantiable {
  protected get nevermined() {
    if (!this._instantiableConfig?.nevermined) {
      this.logger.error('Nevermined instance is not defined.')
    }
    return this._instantiableConfig.nevermined
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
    const { nevermined, client, config, logger, artifactsFolder, circuitsFolder } = this
    return { nevermined, client, config, logger, artifactsFolder, circuitsFolder }
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
