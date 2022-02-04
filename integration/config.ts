import { Config } from '../src'
import HDWalletProvider from '@truffle/hdwallet-provider'
import { LoggerInstance, LogLevel } from '../src/utils'

LoggerInstance.setLevel(LogLevel.Error)

const configBase: Config = {
    nodeUri: 'http://localhost:8545',
    metadataUri: 'http://172.17.0.1:5000',
    faucetUri: 'http://localhost:3001',
    gatewayUri: 'http://localhost:8030',
    secretStoreUri: 'http://localhost:12001',
    gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    graphHttpUri: 'http://localhost:9000/subgraphs/name/neverminedio',
    gasMultiplier: 1.1,
    verbose: LogLevel.Error
}

if (process.env.NETWORK_NAME === 'production') {
    Object.assign(configBase, {
        nodeUri: 'http://localhost:8545',
        metadataUri: 'http://nevermined-metadata:5000',
        faucetUri: 'http://localhost:3001',
        gatewayUri: 'http://localhost:8030',
        secretStoreUri: 'http://localhost:12001',
        gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0'
    } as Config)
}

if (process.env.NETWORK_NAME === 'integration') {
    Object.assign(configBase, {
        nodeUri: 'http://localhost:8545',
        metadataUri: 'http://nevermined-metadata:5000',
        faucetUri: 'http://localhost:3001',
        gatewayUri: 'http://localhost:8030',
        secretStoreUri: 'http://localhost:12001',
        gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0'
    } as Config)
}

if (process.env.NETWORK_NAME === 'testing') {
    Object.assign(configBase, {
        nodeUri: 'http://localhost:8545',
        metadataUri: 'http://nevermined-metadata:5000',
        faucetUri: 'http://localhost:3001',
        gatewayUri: 'http://localhost:8030',
        secretStoreUri: 'http://localhost:12001',
        gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0'
    } as Config)
}

if (process.env.NETWORK_NAME === 'rinkeby') {
    Object.assign(configBase, {
        metadataUri: 'https://metadata.rinkeby.nevermined.rocks',
        faucetUri: 'https://faucet.rinkeby.nevermined.rocks',
        gatewayUri: 'https://gateway.rinkeby.nevermined.rocks',
        nodeUri: `https://rinkeby.infura.io/v3/52b6d403f7de4757ab9ed23c3778a35b`,
        gatewayAddress: '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'
    } as Config)
}

if (process.env.NETWORK_NAME === 'mumbai') {
    Object.assign(configBase, {
        metadataUri: 'https://metadata.mumbai.nevermined.rocks',
        faucetUri: 'https://faucet.mumbai.nevermined.rocks',
        gatewayUri: 'https://gateway.mumbai.nevermined.rocks',
        nodeUri: `https://rpc-mumbai.maticvigil.com/v1/e145ac0424e2a2b3c340685c80a08e77099ce020`,
        gatewayAddress: '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'
    } as Config)
}

if (process.env.SEED_WORDS) {
    const seedphrase = process.env.SEED_WORDS

    // @ts-ignore
    configBase.web3Provider = new HDWalletProvider(seedphrase, configBase.nodeUri, 0, 10)
}

export const config: Config & { forceVerbose: Config } = configBase as any
;(config as any).forceVerbose = { ...configBase, verbose: true }
