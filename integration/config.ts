import { Config } from '../src'
import { LoggerInstance, LogLevel, makeAccounts } from '../src/utils'

LoggerInstance.setLevel(LogLevel.Error)

const nograph = process.env['NO_GRAPH'] === 'true'
const infuraToken = process.env['INFURA_TOKEN']

const configBase: Config = {
    nodeUri: 'http://localhost:8545',
    marketplaceUri: 'http://172.17.0.1:3100',
    faucetUri: 'http://localhost:3001',
    gatewayUri: 'http://localhost:8030',
    secretStoreUri: 'http://localhost:12001',
    gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    marketplaceAuthToken: undefined,
    artifactsFolder: './artifacts',
    graphHttpUri: nograph
        ? undefined
        : 'http://localhost:9000/subgraphs/name/nevermined-io/development',
    gasMultiplier: 1.1,
    newGateway: process.env.OLD_GATEWAY === 'false',
    verbose: LogLevel.Error
}

if (process.env.NETWORK_NAME === 'production') {
    Object.assign(configBase, {
        nodeUri: 'http://localhost:8545',
        marketplaceUri: 'http://nevermined-metadata:3100',
        faucetUri: 'http://localhost:3001',
        gatewayUri: 'http://localhost:8030',
        secretStoreUri: 'http://localhost:12001',
        gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0'
    } as Config)
}

if (process.env.NETWORK_NAME === 'integration') {
    Object.assign(configBase, {
        nodeUri: 'http://localhost:8545',
        marketplaceUri: 'http://nevermined-metadata:3100',
        faucetUri: 'http://localhost:3001',
        gatewayUri: 'http://localhost:8030',
        secretStoreUri: 'http://localhost:12001',
        gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0'
    } as Config)
}

if (process.env.NETWORK_NAME === 'testing') {
    Object.assign(configBase, {
        nodeUri: 'http://localhost:8545',
        marketplaceUri: 'http://nevermined-metadata:3100',
        faucetUri: 'http://localhost:3001',
        gatewayUri: 'http://localhost:8030',
        secretStoreUri: 'http://localhost:12001',
        gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0'
    } as Config)
}

if (process.env.NETWORK_NAME === 'rinkeby') {
    Object.assign(configBase, {
        marketplaceUri: 'https://metadata.rinkeby.nevermined.rocks',
        faucetUri: 'https://faucet.rinkeby.nevermined.rocks',
        gatewayUri: 'https://gateway.rinkeby.nevermined.rocks',
        nodeUri: `https://rinkeby.infura.io/v3/${infuraToken}`,
        gatewayAddress: '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'
    } as Config)
}

if (process.env.NETWORK_NAME === 'mumbai') {
    Object.assign(configBase, {
        marketplaceUri: 'https://marketplace-api.mumbai.public.nevermined.rocks',
        faucetUri: 'https://faucet.mumbai.public.nevermined.rocks',
        gatewayUri: 'https://gateway.mumbai.public.nevermined.rocks',
        nodeUri: `https://polygon-mumbai.infura.io/v3/${infuraToken}`,
        gatewayAddress: '0xB82dc620BB4dE6712376055a5cfc0DF11112D442',
        graphHttpUri: 'https://api.thegraph.com/subgraphs/name/nevermined-io/public'
    } as Config)
}

if (process.env.SEED_WORDS) {
    configBase.accounts = makeAccounts(process.env.SEED_WORDS)
}

export const config: Config & { forceVerbose: Config } = configBase as any
;(config as any).forceVerbose = { ...configBase, verbose: true }
