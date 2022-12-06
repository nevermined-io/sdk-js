import { Config } from '../src'
import { LoggerInstance, LogLevel, makeAccounts } from '../src/utils'

LoggerInstance.setLevel(LogLevel.Error)

const logLevel = Number(process.env['LOG_LEVEL'])
const nograph = process.env['NO_GRAPH'] === 'true'
const infuraToken = process.env['INFURA_TOKEN']

const ipfsGateway = process.env['IPFS_GATEWAY'] || 'https://ipfs.io'
const ipfsProjectId = process.env['IPFS_PROJECT_ID']
const ipfsProjectSecret = process.env['IPFS_PROJECT_SECRET']

const configBase: Config = {
    web3ProviderUri: 'http://localhost:8545',
    marketplaceUri: 'http://172.17.0.1:3100',
    faucetUri: 'http://localhost:3001',
    neverminedNodeUri: 'http://localhost:8030',
    neverminedNodeAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    marketplaceAuthToken: undefined,
    artifactsFolder: './artifacts',
    graphHttpUri: nograph
        ? undefined
        : 'http://localhost:9000/subgraphs/name/nevermined-io/development',
    gasMultiplier: 1.1,
    ipfsGateway,
    ipfsProjectId,
    ipfsProjectSecret,
    verbose: logLevel
}

if (process.env.NETWORK_NAME === 'testing') {
    Object.assign(configBase, {
        web3ProviderUri: 'http://localhost:8545',
        marketplaceUri: 'http://nevermined-metadata:3100',
        faucetUri: 'http://localhost:3001',
        neverminedNodeUri: 'http://localhost:8030',
        neverminedNodeAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0'
    } as Config)
}

if (process.env.NETWORK_NAME === 'goerli') {
    Object.assign(configBase, {
        marketplaceUri: 'https://metadata.goerli.nevermined.rocks',
        faucetUri: 'https://faucet.goerli.nevermined.rocks',
        neverminedNodeUri: 'https://node.goerli.nevermined.rocks',
        web3ProviderUri: `https://goerli.infura.io/v3/${infuraToken}`,
        neverminedNodeAddress: '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'
    } as Config)
}

if (process.env.NETWORK_NAME === 'mumbai') {
    Object.assign(configBase, {
        marketplaceUri: 'https://marketplace-api.mumbai.public.nevermined.rocks',
        faucetUri: 'https://faucet.mumbai.public.nevermined.rocks',
        neverminedNodeUri: 'https://node.mumbai.public.nevermined.rocks',
        web3ProviderUri: `https://polygon-mumbai.infura.io/v3/${infuraToken}`,
        neverminedNodeAddress: '0xB82dc620BB4dE6712376055a5cfc0DF11112D442',
        graphHttpUri: 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
    } as Config)
}

if (process.env.SEED_WORDS) {
    configBase.accounts = makeAccounts(process.env.SEED_WORDS)
}

export const config: Config & { forceVerbose: Config } = configBase as any
;(config as any).forceVerbose = { ...configBase, verbose: true }
