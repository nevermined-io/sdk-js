import { NeverminedOptions } from '../../models'

export class NeverminedAppOptions extends NeverminedOptions {
  instanceName: string
  nftContractTimeAddress?: string
  nftContractCreditsAddress?: string
  tokenAddress?: string // ERC-20 token address or zero address (0x000..) for native token
  neverminedBackendUri?: string
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
  nftContractTimeAddress = undefined
  nftContractCreditsAddress = undefined
}

export class AppDeploymentStaging extends NeverminedAppOptions {
  instanceName = 'appStaging'
  appUrl = 'https://staging.nevermined.app'
  chainId = 421614
  web3ProviderUri = isWindowEthereumDefined() ? undefined : 'https://sepolia-rollup.arbitrum.io/rpc'
  marketplaceUri = 'https://marketplace-api.staging.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.staging.nevermined.app'
  neverminedNodeAddress = '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc'
  neverminedBackendUri = 'https://one-backend.staging.nevermined.app'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractTimeAddress = '0x1bcA156f746C6Eb8b18d61654293e2Fc5b653fF5'
  nftContractCreditsAddress = '0xb1c2237d0a2b32da39b9a1cdff4a1e6429c0fe52'
  tokenAddress = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
}

export class AppDeploymentTesting extends NeverminedAppOptions {
  instanceName = 'appTesting'
  appUrl = 'https://testing.nevermined.app'
  chainId = 421614
  web3ProviderUri = isWindowEthereumDefined() ? undefined : 'https://sepolia-rollup.arbitrum.io/rpc'
  marketplaceUri = 'https://marketplace-api.testing.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.testing.nevermined.app'
  neverminedNodeAddress = '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc'
  neverminedBackendUri = 'https://one-backend.testing.nevermined.app'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractTimeAddress = '0x1bcA156f746C6Eb8b18d61654293e2Fc5b653fF5'
  nftContractCreditsAddress = '0xb1c2237d0a2b32da39b9a1cdff4a1e6429c0fe52'
  tokenAddress = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
}

export class AppDeploymentArbitrum extends NeverminedAppOptions {
  instanceName = 'appArbitrum'
  appUrl = 'https://nevermined.app'
  chainId = 42161
  web3ProviderUri = isWindowEthereumDefined() ? undefined : 'https://arb1.arbitrum.io/rpc'
  marketplaceUri = 'https://marketplace-api.arbitrum.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.arbitrum.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  neverminedBackendUri = 'https://one-backend.arbitrum.nevermined.app'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractTimeAddress = '0x19D7551f112457deb78DadeFfd87D95a0810EDfF'
  nftContractCreditsAddress = '0xda658962eb23e6343dacc222bac0401a8c8f2879'
  tokenAddress = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'
}

export class AppDeploymentGnosis extends NeverminedAppOptions {
  instanceName = 'appGnosis'
  appUrl = 'https://gnosis.nevermined.app'
  chainId = 100
  web3ProviderUri = isWindowEthereumDefined() ? undefined : 'https://rpc.gnosischain.com/'
  marketplaceUri = 'https://marketplace-api.gnosis.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.gnosis.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  neverminedBackendUri = 'https://one-backend.gnosis.nevermined.app'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractTimeAddress = '0x80A9b55F8604acC26dF2Ac6e07F9dC5B0eAa05Ce'
  nftContractCreditsAddress = '0x80A9b55F8604acC26dF2Ac6e07F9dC5B0eAa05Ce'
  tokenAddress = '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83'
}

export class AppDeploymentMatic extends NeverminedAppOptions {
  instanceName = 'appMatic'
  appUrl = 'https://matic.nevermined.app'
  chainId = 137
  web3ProviderUri = isWindowEthereumDefined() ? undefined : 'https://polygon-rpc.com'
  marketplaceUri = 'https://marketplace-api.matic.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.matic.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  neverminedBackendUri = 'https://one-backend.matic.nevermined.app'
  verbose = true
  gasMultiplier = 1.2
  gasPriceMultiplier = 1.2
  nftContractTimeAddress = '0xaB53c5EBd2C42D063EA548b8e46F3E1b8F343391'
  nftContractCreditsAddress = '0xaB53c5EBd2C42D063EA548b8e46F3E1b8F343391'
  tokenAddress = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
}

export class AppDeploymentBase extends NeverminedAppOptions {
  instanceName = 'appBase'
  appUrl = 'https://base.nevermined.app'
  chainId = 8453
  web3ProviderUri = isWindowEthereumDefined() ? undefined : 'https://1rpc.io/base'
  marketplaceUri = 'https://marketplace-api.base.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.base.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  neverminedBackendUri = 'https://one-backend.base.nevermined.app'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractTimeAddress = '0xE24f60aE42F7Cc3B3357480C94165afD86B66583'
  nftContractCreditsAddress = '0xE24f60aE42F7Cc3B3357480C94165afD86B66583'
  tokenAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
}

export class AppDeploymentCelo extends NeverminedAppOptions {
  instanceName = 'appCelo'
  appUrl = 'https://celo.nevermined.app'
  chainId = 42220
  web3ProviderUri = isWindowEthereumDefined() ? undefined : 'https://forno.celo.org'
  marketplaceUri = 'https://marketplace-api.celo.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.celo.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  neverminedBackendUri = 'https://one-backend.celo.nevermined.app'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractTimeAddress = '0x4daA62Fe74bFE5558D97F5B9fC45b999c6508A8e'
  nftContractCreditsAddress = '0x4daA62Fe74bFE5558D97F5B9fC45b999c6508A8e'
  tokenAddress = '0xef4229c8c3250C675F21BCefa42f58EfbfF6002a'
}

export class AppDeploymentOptimism extends NeverminedAppOptions {
  instanceName = 'appOptimism'
  appUrl = 'https://optimism.nevermined.app'
  chainId = 10
  web3ProviderUri = isWindowEthereumDefined() ? undefined : 'https://optimism.drpc.org'
  marketplaceUri = 'https://marketplace-api.optimism.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.optimism.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  neverminedBackendUri = 'https://one-backend.optimism.nevermined.app'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractTimeAddress = '0xE24f60aE42F7Cc3B3357480C94165afD86B66583'
  nftContractCreditsAddress = '0xE24f60aE42F7Cc3B3357480C94165afD86B66583'
  tokenAddress = '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85'
}

export class AppDeploymentPeaq extends NeverminedAppOptions {
  instanceName = 'appPeaq'
  appUrl = 'https://peaq.nevermined.app'
  chainId = 3338
  web3ProviderUri = isWindowEthereumDefined() ? undefined : 'https://evm.peaq.network'
  marketplaceUri = 'https://marketplace-api.peaq.nevermined.app'
  graphHttpUri = 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
  neverminedNodeUri = 'https://node.peaq.nevermined.app'
  neverminedNodeAddress = '0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'
  neverminedBackendUri = 'https://one-backend.peaq.nevermined.app'
  verbose = true
  gasMultiplier = 0
  gasPriceMultiplier = 0
  nftContractTimeAddress = '0xE24f60aE42F7Cc3B3357480C94165afD86B66583'
  nftContractCreditsAddress = '0xE24f60aE42F7Cc3B3357480C94165afD86B66583'
  tokenAddress = '0x0000000000000000000000000000000000000000'
}

export function isWindowEthereumDefined(): boolean {
  try {
    window.ethereum
    return true
  } catch {
    return false
  }
}
