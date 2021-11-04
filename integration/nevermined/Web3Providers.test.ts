import { assert } from 'chai'

import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account } from '../../src'

import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import * as keyFile from '../KeyFile.json'

describe('Web3Providers', () => {
    let nevermined: Nevermined
    let account: Account

    it('should register an asset (mnemonic)', async () => {
        config.web3Provider = new HDWalletProvider(
            process.env.SEED_WORDS,
            config.nodeUri,
            0,
            10
        )
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account] = await nevermined.accounts.list()

        const ddo = await nevermined.assets.create(getMetadata(), account)
        assert.isDefined(ddo)
    })

    it('should register an asset (keyfile)', async () => {
        // Get account from keyfile
        const w3 = new Web3()
        const keyFileAccount = w3.eth.accounts.decrypt(keyFile, 'test')

        // Create provider with private key
        config.web3Provider = new HDWalletProvider(
            [keyFileAccount.privateKey],
            config.nodeUri
        )

        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account] = await nevermined.accounts.list()

        const ddo = await nevermined.assets.create(getMetadata(), account)
        assert.isDefined(ddo)
    })
})
