import { Config } from '../src'
import HDWalletProvider from '@truffle/hdwallet-provider'

const configJson: Config = {
    nodeUri: 'http://localhost:8545',
    metadataUri: 'http://172.17.0.1:5000',
    gatewayUri: 'http://localhost:8030',
    secretStoreUri: 'http://localhost:12001',
    gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    verbose: false
}

if (process.env.NETWORK_NAME === 'production') {
    Object.assign(configJson, {
      nodeUri: 'http://localhost:8545',
      metadataUri: 'http://nevermined-metadata:5000',
      gatewayUri: 'http://localhost:8030',
      secretStoreUri: 'http://localhost:12001',
      gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    })
}

if (process.env.NETWORK_NAME === 'integration') {
    Object.assign(configJson, {
      nodeUri: 'http://localhost:8545',
      metadataUri: 'http://nevermined-metadata:5000',
      gatewayUri: 'http://localhost:8030',
      secretStoreUri: 'http://localhost:12001',
      gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    })
}

if (process.env.NETWORK_NAME === 'testing') {
    Object.assign(configJson, {
      nodeUri: 'http://localhost:8545',
      metadataUri: 'http://nevermined-metadata:5000',
      gatewayUri: 'http://localhost:8030',
      secretStoreUri: 'http://localhost:12001',
      gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    })
}

if (process.env.SEED_WORDS) {
    const seedphrase = process.env.SEED_WORDS

    // @ts-ignore
    configJson.web3Provider = new HDWalletProvider(seedphrase, configJson.nodeUri, 0, 5)
}

export const config: Config & { forceVerbose: Config } = configJson as any
;(config as any).forceVerbose = { ...configJson, verbose: true }
