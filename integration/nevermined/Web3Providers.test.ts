import { assert } from 'chai'
import { decodeJwt } from 'jose'

import { config } from '../config'
import { getMetadata } from '../utils'
import {
  Nevermined,
  Account,
  AssetAttributes,
  makeWallets,
  makeWalletFromEncryptedJson,
} from '../../src'

import * as keyFile from '../KeyFile.json'

describe('Web3 Providers', () => {
  let nevermined: Nevermined
  let account: Account

  it('should register an asset (mnemonic)', async () => {
    config.accounts = makeWallets(process.env.SEED_WORDS)
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
    const keyFileAccount = makeWalletFromEncryptedJson(JSON.stringify(keyFile), 'test')
    const accounts = [keyFileAccount]
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
