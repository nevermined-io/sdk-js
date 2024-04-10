import { assert } from 'chai'
import { decodeJwt } from 'jose'
import * as fs from 'fs'

import config from '../../test/config'
import { getMetadata } from '../utils'

import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { DDO } from '../../src/ddo/DDO'
import { MetaData } from '../../src/types/DDOTypes'
import { AssetAttributes } from '../../src/models/AssetAttributes'

describe('Publisher Download Asset', () => {
  let nevermined: Nevermined
  let publisher: NvmAccount
  let metadata: MetaData
  let ddo: DDO

  before(async () => {
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[publisher] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)

    const payload = decodeJwt(config.marketplaceAuthToken)

    metadata = getMetadata()
    metadata.userId = payload.sub
  })

  it('should register an asset', async () => {
    ddo = await nevermined.assets.create(
      AssetAttributes.getInstance({ metadata, services: [] }),
      publisher,
    )

    assert.isDefined(ddo, 'Register has not returned a DDO')
    assert.match(ddo.id, /^did:nv:[a-f0-9]{64}$/, 'DDO id is not valid')
    assert.isAtLeast(ddo.authentication.length, 1, 'Default authentication not added')
    let accessService
    try {
      accessService = ddo.findServiceByType('access')
      // eslint-disable-next-line no-empty
    } catch {}
    assert.isUndefined(accessService, "DDO access service doesn't exist")
  })

  it('should consume and store the assets', async () => {
    const folder = '/tmp/nevermined/sdk-js-1'
    const path = (await nevermined.assets.download(ddo.id, publisher, folder)) as string

    assert.include(path, folder, 'The storage path is not correct.')

    const files = await new Promise<string[]>((resolve) => {
      fs.readdir(path, (_e, fileList) => {
        resolve(fileList)
      })
    })

    assert.deepEqual(files, ['README.md', 'ddo-example.json'], 'Stored files are not correct.')
  })

  it('should consume and store one asset', async () => {
    const folder = '/tmp/nevermined/sdk-js-2'
    const path = (await nevermined.assets.download(ddo.id, publisher, folder, 1)) as string

    assert.include(path, folder, 'The storage path is not correct.')

    const files = await new Promise<string[]>((resolve) => {
      fs.readdir(path, (_e, fileList) => {
        resolve(fileList)
      })
    })

    assert.deepEqual(files, ['README.md'], 'Stored files are not correct.')
  })
})
