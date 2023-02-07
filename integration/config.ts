import { NeverminedOptions } from '../src'
import { LoggerInstance, LogLevel, makeAccounts } from '../src/utils'

LoggerInstance.setLevel(LogLevel.Error)

const logLevel = Number(process.env['LOG_LEVEL']) || 1 // warn by default
const nograph = process.env['NO_GRAPH'] === 'true'
const infuraToken = process.env['INFURA_TOKEN']

const ipfsGateway = process.env['IPFS_GATEWAY'] || 'https://ipfs.io'
const ipfsProjectId = process.env['IPFS_PROJECT_ID']
const ipfsProjectSecret = process.env['IPFS_PROJECT_SECRET']

const configBase: NeverminedOptions = {
    web3ProviderUri: 'http://contracts.nevermined.localnet',
    marketplaceUri: 'http://marketplace.nevermined.localnet',
    neverminedNodeUri:
        process.env.NEVERMINED_NODE_URI || 'http://node.nevermined.localnet',
    neverminedNodeAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    marketplaceAuthToken: undefined,
    artifactsFolder: './artifacts',
    circuitsFolder: './circuits',
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
        neverminedNodeUri: 'http://localhost:8030',
        neverminedNodeAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0'
    } as NeverminedOptions)
}

if (process.env.NETWORK_NAME === 'goerli') {
    Object.assign(configBase, {
        marketplaceUri: 'https://metadata.goerli.nevermined.network',
        neverminedNodeUri: 'https://node.goerli.nevermined.network',
        web3ProviderUri: `https://goerli.infura.io/v3/${infuraToken}`,
        neverminedNodeAddress: '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'
    } as NeverminedOptions)
}

if (process.env.NETWORK_NAME === 'mumbai') {
    Object.assign(configBase, {
        marketplaceUri: 'https://marketplace-api.mumbai.public.nevermined.network',
        neverminedNodeUri: 'https://node.mumbai.public.nevermined.network',
        web3ProviderUri: `https://polygon-mumbai.infura.io/v3/${infuraToken}`,
        neverminedNodeAddress: '0xB82dc620BB4dE6712376055a5cfc0DF11112D442',
        graphHttpUri: 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
    } as NeverminedOptions)
}

if (process.env.SEED_WORDS) {
    console.log('have seed words', process.env.SEED_WORDS)
    configBase.accounts = makeAccounts(process.env.SEED_WORDS)
}

export const config: NeverminedOptions & { forceVerbose: NeverminedOptions } =
    configBase as any
;(config as any).forceVerbose = { ...configBase, verbose: true }
