import { NeverminedOptions, LogLevel, makeAccounts } from '../src'
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
  aaveConfig: {
    lendingPoolAddress: '0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe', // Kovan
    dataProviderAddress: '0x744C1aaA95232EeF8A9994C4E0b3a89659D9AB79', // Kovan
    wethAddress: '0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70', // Kovan
    treasuryAddress: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
    agreementFee: 15,
  },
} as NeverminedOptions

if (process.env.SEED_WORDS) {
  config.accounts = makeAccounts(process.env.SEED_WORDS)
}

export default config
