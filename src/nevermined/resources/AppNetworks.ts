import { NeverminedOptions } from '../../models'

export class NeverminedAppOptions extends NeverminedOptions {
  instanceName: string
  appUrl?: string
  nftContractAddress?: string
  tokenAddress?: string // ERC-20 token address or zero address (0x000..) for native token
}

export class AppDeploymentLocal extends NeverminedAppOptions {
  instanceName = 'localnet'
  appUrl = 'http://localhost:3000'
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
  web3ProviderUri = 'https://sepolia-rollup.arbitrum.io/rpc'
  marketplaceUri = 'https://marketplace-api.staging.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.staging.nevermined.app'
  neverminedNodeAddress = '0x046d0698926aFa3ab6D6591f03063488F3Fb4327'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
}

export class AppDeploymentTesting extends NeverminedAppOptions {
  instanceName = 'appTesting'
  appUrl = 'https://testing.nevermined.app'
  web3ProviderUri = 'https://sepolia-rollup.arbitrum.io/rpc'
  marketplaceUri = 'https://marketplace-api.testing.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.testing.nevermined.app'
  neverminedNodeAddress = '0x046d0698926aFa3ab6D6591f03063488F3Fb4327'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
}

export class AppDeploymentArbitrum extends NeverminedAppOptions {
  instanceName = 'appArbitrum'
  appUrl = 'https://nevermined.app'
  web3ProviderUri = 'https://arb1.arbitrum.io/rpc'
  marketplaceUri = 'https://marketplace-api.arbitrum.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.arbitrum.nevermined.app'
  neverminedNodeAddress = '0x0b5297b97655A29dE245700864F5591741e50d2c'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'
}

export class AppDeploymentGnosis extends NeverminedAppOptions {
  instanceName = 'appGnosis'
  appUrl = 'https://gnosis.nevermined.app'
  web3ProviderUri = 'https://rpc.gnosischain.com/'
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

export class AppDeploymentMumbai extends NeverminedAppOptions {
  instanceName = 'appMumbai'
  appUrl = 'https://mumbai.nevermined.app'
  web3ProviderUri = 'https://matic-mumbai.chainstacklabs.com'
  marketplaceUri = 'https://marketplace-api.mumbai.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.mumbai.nevermined.app'
  neverminedNodeAddress = '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractAddress = undefined
  tokenAddress = '0x2058a9d7613eee744279e3856ef0eada5fcbaa7e'
}

export class AppDeploymentMatic extends NeverminedAppOptions {
  instanceName = 'appMatic'
  appUrl = 'https://matic.nevermined.app'
  web3ProviderUri = 'https://polygon-rpc.com'
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
