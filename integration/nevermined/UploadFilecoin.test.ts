import { assert } from 'chai'
import { decodeJwt } from 'jose'
import config from '../../test/config'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { DDO } from '../../src/ddo/DDO'
import { AssetAttributes } from '../../src/models/AssetAttributes'

import fs from 'fs'
import { getMetadata } from '../utils'
import '../globals'

describe.skip('Filecoin Integration', () => {
  let nevermined: Nevermined
  let publisher: NvmAccount
  const metadata = getMetadata()
  let ddo: DDO
  let userId: string

  const TEST_CID_HASH = 'bafkreigxr4y6aqzsgmpicz47pl4pn2j3okpd672yvbrq7xo5hxt7fnmxuq'
  let url: string

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[publisher] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)

    const payload = decodeJwt(config.marketplaceAuthToken)
    userId = payload.sub as string
  })

  it('should register an asset with a cid://', async () => {
    metadata.userId = userId
    metadata.main.files = [
      {
        index: 0,
        contentType: 'text/plain',
        url: url,
      },
    ]

    ddo = await nevermined.assets.create(AssetAttributes.getInstance({ metadata }), publisher)
    assert.isDefined(ddo)
  })

  it('should download an asset with a cid://', async () => {
    const folder = '/tmp/output'
    const path = await nevermined.assets.download(ddo.id, publisher, folder, 0)

    assert.include(path, folder)
    const data = fs.readFileSync(`${path}${TEST_CID_HASH}`)
    assert.equal(data.toString(), 'Hello, Nevermined!')
  })

  it('should register an asset with a cid:// and filename', async () => {
    metadata.userId = userId
    metadata.main.files = [
      {
        index: 0,
        contentType: 'text/plain',
        url: url,
        name: 'test.txt',
      },
    ]

    ddo = await nevermined.assets.create(AssetAttributes.getInstance({ metadata }), publisher)
    assert.isDefined(ddo)
  })

  it('should download an asset with a cid:// and filename', async () => {
    const folder = '/tmp/output'
    const path = await nevermined.assets.download(ddo.id, publisher, folder, 0)

    assert.include(path, folder)
    const data = fs.readFileSync(`${path}test.txt`)
    assert.equal(data.toString(), 'Hello, Nevermined!')
  })
})
