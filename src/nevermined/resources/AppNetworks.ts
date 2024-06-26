import { NeverminedOptions } from '../../models'

export class NeverminedAppOptions extends NeverminedOptions {
  instanceName: string
  nftContractAddress?: string
  tokenAddress?: string // ERC-20 token address or zero address (0x000..) for native token
}

export class AppDeploymentLocal extends NeverminedAppOptions {
  instanceName = 'localnet'
  appUrl = 'http://localhost:3000'
  chainId = 1337
  web3ProviderUri = 'http://contracts.nevermined.localnet'
  marketplaceUri = 'http://marketplace.nevermined.localnet'
  graphHttpUri = undefined
  neverminedNodeUri = 'http://node.nevermined.localnet'
  neverminedNodeAddress = '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
}

export class AppDeploymentStaging extends NeverminedAppOptions {
  instanceName = 'appStaging'
  appUrl = 'https://staging.nevermined.app'
  chainId = 421614
  web3ProviderUri = window.ethereum ? window.ethereum : 'https://sepolia-rollup.arbitrum.io/rpc'
  marketplaceUri = 'https://marketplace-api.staging.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.staging.nevermined.app'
  neverminedNodeAddress = '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
}

export class AppDeploymentTesting extends NeverminedAppOptions {
  instanceName = 'appTesting'
  appUrl = 'https://testing.nevermined.app'
  chainId = 421614
  web3ProviderUri = window.ethereum ? window.ethereum : 'https://sepolia-rollup.arbitrum.io/rpc'
  marketplaceUri = 'https://marketplace-api.testing.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.testing.nevermined.app'
  neverminedNodeAddress = '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
}

export class AppDeploymentArbitrum extends NeverminedAppOptions {
  instanceName = 'appArbitrum'
  appUrl = 'https://nevermined.app'
  chainId = 42161
  web3ProviderUri = window.ethereum ? window.ethereum : 'https://arb1.arbitrum.io/rpc'
  marketplaceUri = 'https://marketplace-api.arbitrum.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.arbitrum.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'
}

export class AppDeploymentGnosis extends NeverminedAppOptions {
  instanceName = 'appGnosis'
  appUrl = 'https://gnosis.nevermined.app'
  chainId = 100
  web3ProviderUri = window.ethereum ? window.ethereum : 'https://rpc.gnosischain.com/'
  marketplaceUri = 'https://marketplace-api.gnosis.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.gnosis.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83'
}

export class AppDeploymentMatic extends NeverminedAppOptions {
  instanceName = 'appMatic'
  appUrl = 'https://matic.nevermined.app'
  chainId = 137
  web3ProviderUri = window.ethereum ? window.ethereum : 'https://polygon-rpc.com'
  marketplaceUri = 'https://marketplace-api.matic.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.matic.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  verbose = true
  gasMultiplier = 1.2
  gasPriceMultiplier = 1.2
  nftContractAddress = undefined
  tokenAddress = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
}

export class AppDeploymentBase extends NeverminedAppOptions {
  instanceName = 'appBase'
  appUrl = 'https://base.nevermined.app'
  chainId = 8453
  web3ProviderUri = window.ethereum ? window.ethereum : 'https://1rpc.io/base'
  marketplaceUri = 'https://marketplace-api.base.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.base.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
}

export class AppDeploymentCelo extends NeverminedAppOptions {
  instanceName = 'appCelo'
  appUrl = 'https://celo.nevermined.app'
  chainId = 42220
  web3ProviderUri = window.ethereum ? window.ethereum : 'https://forno.celo.org'
  marketplaceUri = 'https://marketplace-api.celo.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.celo.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0xef4229c8c3250C675F21BCefa42f58EfbfF6002a'
}

export class AppDeploymentOptimism extends NeverminedAppOptions {
  instanceName = 'appOptimism'
  appUrl = 'https://optimism.nevermined.app'
  chainId = 10
  web3ProviderUri = window.ethereum ? window.ethereum : 'https://optimism.drpc.org'
  marketplaceUri = 'https://marketplace-api.optimism.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.optimism.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85'
}
