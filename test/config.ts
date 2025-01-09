import { LogLevel, LoggerInstance } from '../src/models/Logger'
import { NeverminedOptions } from '../src/models/NeverminedOptions'
import { NvmAccount } from '../src/models/NvmAccount'
import { makeWallets } from '../src/nevermined/utils/BlockchainViemUtils'
import { Account } from 'viem/accounts'

LoggerInstance.setLevel(LogLevel.Verbose)
const logLevel = Number(process.env['LOG_LEVEL']) || 1 // warn by default
export const infuraToken = process.env['INFURA_TOKEN']

const ipfsGateway = process.env['IPFS_GATEWAY'] || 'https://ipfs.io'
const ipfsProjectId = process.env['IPFS_PROJECT_ID']
const ipfsProjectSecret = process.env['IPFS_PROJECT_SECRET']

let config
if (process.env.NETWORK_NAME === 'geth-localnet') {
  // integration tests
  config = {
    chainId: 1337,
    web3ProviderUri: 'http://contracts.nevermined.localnet',
    marketplaceUri: 'http://marketplace.nevermined.localnet',
    neverminedNodeUri: process.env.NEVERMINED_NODE_URI || 'http://node.nevermined.localnet',
    neverminedNodeAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    marketplaceAuthToken: '', // undefined
    artifactsFolder: './artifacts',
    circuitsFolder: './circuits',
    graphHttpUri: process.env['GRAPH_HTTP_URI'],
    gasMultiplier: 1.1,
    ipfsGateway,
    ipfsProjectId,
    ipfsProjectSecret,
    verbose: logLevel,
  } as NeverminedOptions
} else if (process.env.NETWORK_NAME === 'one-staging') {
  config = {
    chainId: 421614,
    marketplaceUri: 'https://marketplace-api.staging.nevermined.app',
    neverminedNodeUri: 'https://node.staging.nevermined.app',
    neverminedNodeAddress: '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc',
    web3ProviderUri: `https://arbitrum-sepolia.infura.io/v3/${infuraToken}`,
    graphHttpUri: 'https://api.thegraph.com/subgraphs/name/nevermined-io/public',
    // verbose: LogLevel.Verbose,
    artifactsFolder: './artifacts',
    circuitsFolder: './circuits',
  } as NeverminedOptions
} else {
  // default unit tests
  config = {
    chainId: 8998,
    marketplaceUri: 'http://localhost:3100',
    neverminedNodeUri: 'http://localhost:8030',
    neverminedNodeAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    web3ProviderUri: `http://127.0.0.1:${process.env.ETH_PORT || 8545}`,
    verbose: LogLevel.Verbose,
    artifactsFolder: './artifacts',
    circuitsFolder: './circuits',
  } as NeverminedOptions
}

if (process.env.SEED_WORDS) {
  const wallets = makeWallets(process.env.SEED_WORDS)
  config.accounts = wallets.map((wallet) => {
    const a = NvmAccount.fromAccount(wallet)
    const signer = a.getAccountSigner() as Account
    LoggerInstance.debug(`Account loaded with address ${a.getAddress()} and type: ${signer.type}`)
    return a
  })
}

export default config
