import { LogLevel, LoggerInstance } from '@/models/Logger'
import { NeverminedOptions } from '@/models/NeverminedOptions'
import { NvmAccount } from '@/models/NvmAccount'
import { makeWallets } from '@/nevermined/utils/BlockchainViemUtils'

LoggerInstance.setLevel(LogLevel.Error)

const config = {
  chainId: 1337,
  marketplaceUri: 'http://localhost:3100',
  neverminedNodeUri: 'http://localhost:8030',
  neverminedNodeAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
  web3ProviderUri: `http://127.0.0.1:${process.env.ETH_PORT || 8545}`,
  verbose: LogLevel.Error,
  artifactsFolder: './artifacts',
  circuitsFolder: './circuits',
} as NeverminedOptions

if (process.env.SEED_WORDS) {
  const wallets = makeWallets(process.env.SEED_WORDS)
  config.accounts = wallets.map((wallet) => new NvmAccount(wallet.address))
}

export default config
