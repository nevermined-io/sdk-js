import HDWalletProvider from "@truffle/hdwallet-provider";
import { Config, LogLevel } from "../src/models/Config";

const seedPhrase = process.env.SEED_WORDS

export default {
    metadataUri: 'http://metadata.keyko.rocks',
    gatewayUri: 'http://gateway.keyko.rocks/',
    nodeUri: `https://rinkeby.infura.io/v3/6a91d92ed84f457a9e54f808a60417a1`,
    gatewayAddress: '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0',
    web3Provider: new HDWalletProvider(seedPhrase, 'https://rinkeby.infura.io/v3/6a91d92ed84f457a9e54f808a60417a1', 0, 5),
    verbose: LogLevel.Error
} as Config