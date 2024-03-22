import { NeverminedOptions, LogLevel } from '../src'
import { makeWallets } from '../src/nevermined/utils'
import { LoggerInstance } from '../src/utils'

LoggerInstance.setLevel(LogLevel.Error)

const config = {
  marketplaceUri: 'http://localhost:3100',
  neverminedNodeUri: 'http://localhost:8030',
  neverminedNodeAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
  web3ProviderUri: `http://127.0.0.1:${process.env.ETH_PORT || 8545}`,
  verbose: LogLevel.Error,
  artifactsFolder: './artifacts',
  circuitsFolder: './circuits',
} as NeverminedOptions

if (process.env.SEED_WORDS) {
  config.accounts = makeWallets(process.env.SEED_WORDS)
}

export default config
