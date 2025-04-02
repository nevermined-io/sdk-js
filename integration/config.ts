import { Account } from 'viem/accounts'
import { LogLevel, LoggerInstance } from '../src/models/Logger'
import { NeverminedOptions } from '../src/models/NeverminedOptions'
import { NvmAccount } from '../src/models/NvmAccount'
import { makeWallets } from '../src/nevermined/utils/BlockchainViemUtils'

LoggerInstance.setLevel(LogLevel.Error)

const logLevel = Number(process.env['LOG_LEVEL']) || 1 // warn by default
export const infuraToken = process.env['INFURA_TOKEN']

const ipfsGateway = process.env['IPFS_GATEWAY'] || 'https://ipfs.io'
const ipfsProjectId = process.env['IPFS_PROJECT_ID']
const ipfsProjectSecret = process.env['IPFS_PROJECT_SECRET']

const configBase: NeverminedOptions = {
  chainId: 1337,
  web3ProviderUri: 'http://contracts.nevermined.localnet',
  marketplaceUri: 'http://marketplace.nevermined.localnet',
  neverminedNodeUri: process.env.NEVERMINED_NODE_URI || 'http://node.nevermined.localnet',
  neverminedNodeAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
  marketplaceAuthToken: undefined,
  artifactsFolder: './artifacts',
  circuitsFolder: './circuits',
  graphHttpUri: process.env['GRAPH_HTTP_URI'],
  gasMultiplier: 1.1,
  ipfsGateway,
  ipfsProjectId,
  ipfsProjectSecret,
  verbose: logLevel,
}

if (process.env.NETWORK_NAME === 'testing') {
  Object.assign(configBase, {
    chainId: 421614,
    web3ProviderUri: 'http://localhost:8545',
    marketplaceUri: 'http://nevermined-metadata:3100',
    neverminedNodeUri: 'http://localhost:8030',
    neverminedNodeAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
  } as NeverminedOptions)
}

if (process.env.NETWORK_NAME === 'matic') {
  Object.assign(configBase, {
    chainId: 137,
    marketplaceUri: 'https://marketplace-api.matic.nevermined.app',
    neverminedNodeUri: 'https://node.matic.nevermined.app',
    web3ProviderUri: `https://polygon-mainnet.infura.io/v3/${infuraToken}`,
    neverminedNodeAddress: '0x3d6c431c48e6B3B989c26eE10e78df5DE827Ff7B',
    graphHttpUri: 'https://api.thegraph.com/subgraphs/name/nevermined-io/public',
  } as NeverminedOptions)
}

if (process.env.NETWORK_NAME === 'gnosis') {
  Object.assign(configBase, {
    chainId: 100,
    marketplaceUri: 'https://marketplace-api.gnosis.nevermined.app',
    neverminedNodeUri: 'https://node.gnosis.nevermined.app',
    web3ProviderUri: `https://rpc.gnosischain.com/`,
    neverminedNodeAddress: '0x3d6c431c48e6B3B989c26eE10e78df5DE827Ff7B',
    graphHttpUri: 'https://api.thegraph.com/subgraphs/name/nevermined-io/public',
  } as NeverminedOptions)
}

if (process.env.NETWORK_NAME === 'base') {
  Object.assign(configBase, {
    chainId: 8453,
    marketplaceUri: 'https://marketplace-api.base.nevermined.app',
    neverminedNodeUri: 'https://node.base.nevermined.app',
    web3ProviderUri: `https://mainnet.base.org`,
    neverminedNodeAddress: '0x3d6c431c48e6B3B989c26eE10e78df5DE827Ff7B',
    graphHttpUri: undefined,
  } as NeverminedOptions)
}

if (process.env.NETWORK_NAME === 'base-sepolia') {
  Object.assign(configBase, {
    chainId: 84532,
    marketplaceUri: 'https://marketplace-api.base-sepolia.nevermined.app',
    neverminedNodeUri: 'https://node.base-sepolia.nevermined.app',
    web3ProviderUri: `https://base-sepolia.drpc.org`,
    neverminedNodeAddress: '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc',
    graphHttpUri: undefined,
  } as NeverminedOptions)
}

if (process.env.NETWORK_NAME === 'one-staging') {
  Object.assign(configBase, {
    chainId: 421614,
    marketplaceUri: 'https://marketplace-api.staging.nevermined.app',
    neverminedNodeUri: 'https://node.staging.nevermined.app',
    web3ProviderUri: `https://arbitrum-sepolia.infura.io/v3/${infuraToken}`,
    neverminedNodeAddress: '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc',
    graphHttpUri: 'https://api.thegraph.com/subgraphs/name/nevermined-io/public',
  } as NeverminedOptions)
}

if (process.env.SEED_WORDS) {
  const wallets = makeWallets(process.env.SEED_WORDS)
  const config = { ...configBase }
  config.accounts = wallets.map((wallet) => {
    const a = NvmAccount.fromAccount(wallet)
    const signer = a.getAccountSigner() as Account
    LoggerInstance.debug(`Account loaded with address ${a.getAddress()} and type: ${signer.type}`)
    return a
  })
}

export const config: NeverminedOptions & { forceVerbose: NeverminedOptions } = configBase as any
;(config as any).forceVerbose = { ...configBase, verbose: true }
