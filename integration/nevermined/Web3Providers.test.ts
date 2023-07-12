import { assert } from 'chai'
import { decodeJwt } from 'jose'

import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, AssetAttributes } from '../../src'

import * as keyFile from '../KeyFile.json'
import { HDNodeWallet, ethers } from 'ethers'

describe('Web3Providers', () => {
  let nevermined: Nevermined
  let account: Account

  it('should register an asset (mnemonic)', async () => {
    const node = HDNodeWallet.fromPhrase(process.env.SEED_WORDS)
    const accounts: ethers.Wallet[] = []
    for (let i = 0; i < 10; i++) {
      const acc = node.derivePath("m/44'/60'/0'/0/" + i)
      const wallet = new ethers.Wallet(acc.privateKey)
      accounts.push(wallet)
    }
    config.accounts = accounts
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[account] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account)

    await nevermined.services.marketplace.login(clientAssertion)

    const payload = decodeJwt(config.marketplaceAuthToken)
    const metadata = getMetadata()
    metadata.userId = payload.sub

    const ddo = await nevermined.assets.create(AssetAttributes.getInstance({ metadata }), account)
    assert.isDefined(ddo)
  })

  it('should register an asset (keyfile)', async () => {
    // Get account from keyfile
    const keyFileAccount = ethers.Wallet.fromEncryptedJsonSync(
      JSON.stringify(keyFile),
      'test',
    ) as ethers.Wallet
    const accounts: ethers.Wallet[] = [keyFileAccount]
    config.accounts = accounts

    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[account] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account)

    await nevermined.services.marketplace.login(clientAssertion)

    const payload = decodeJwt(config.marketplaceAuthToken)
    const metadata = getMetadata()
    metadata.userId = payload.sub

    const ddo = await nevermined.assets.create(AssetAttributes.getInstance({ metadata }), account)
    assert.isDefined(ddo)
  })
})
