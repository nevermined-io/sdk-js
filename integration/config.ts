import { Config } from '../src'
import HDWalletProvider from '@truffle/hdwallet-provider'

const configJson: Config = {
    nodeUri: 'http://localhost:8545',
    aquariusUri: 'http://nevermined-metadata:5000',
    brizoUri: 'http://localhost:8030',
    secretStoreUri: 'http://localhost:12001',
    brizoAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    verbose: false
}

if (process.env.NETWORK_NAME === 'pacific') {
    Object.assign(configJson, {
        nodeUri: 'https://pacific.oceanprotocol.com',
        aquariusUri: 'https://metadata.commons.oceanprotocol.com',
        brizoUri: 'https://brizo.commons.oceanprotocol.com',
        secretStoreUri: 'https://secret-store.oceanprotocol.com',
        brizoAddress: '0x008c25ed3594e094db4592f4115d5fa74c4f41ea'
    })
}

if (process.env.NETWORK_NAME === 'nile') {
    Object.assign(configJson, {
        nodeUri: 'https://nile.dev-ocean.com',
        aquariusUri: 'https://metadata.nile.dev-ocean.com',
        brizoUri: 'https://brizo.nile.dev-ocean.com',
        secretStoreUri: 'https://secret-store.nile.dev-ocean.com',
        brizoAddress: '0x413c9ba0a05b8a600899b41b0c62dd661e689354'
    })
}

if (process.env.NETWORK_NAME === 'duero') {
    Object.assign(configJson, {
        nodeUri: 'https://duero.dev-ocean.com',
        aquariusUri: 'https://metadata.duero.dev-ocean.com',
        brizoUri: 'https://brizo.duero.dev-ocean.com',
        secretStoreUri: 'https://secret-store.duero.dev-ocean.com',
        brizoAddress: '0x9d4ed58293f71122ad6a733c1603927a150735d0'
    })
}

if (process.env.SEED_WORDS) {
    const seedphrase = process.env.SEED_WORDS

    // @ts-ignore
    configJson.web3Provider = new HDWalletProvider(seedphrase, configJson.nodeUri, 0, 5)
}

export const config: Config & { forceVerbose: Config } = configJson as any
;(config as any).forceVerbose = { ...configJson, verbose: true }
