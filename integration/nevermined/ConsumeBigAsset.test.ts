import { assert } from 'chai'
import * as fs from 'fs'
import { decodeJwt } from 'jose'

import config from '../../test/config'
import { getMetadata } from '../utils'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { MetaData } from '../../src/types/DDOTypes'
import { DDO } from '../../src/ddo/DDO'
import { NvmAccount } from '../../src/models/NvmAccount'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import Logger from '../../src/models/Logger'

// Ensure that your network is fast enough and you have some free ram before run it.
describe.skip('Consume Asset (Large size)', () => {
  let nevermined: Nevermined

  let publisher: NvmAccount
  let consumer: NvmAccount

  let ddo: DDO
  let agreementId: string

  let baseMetadata: MetaData
  let metadata: MetaData

  before(async () => {
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[publisher, consumer] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)
    const payload = decodeJwt(config.marketplaceAuthToken)

    baseMetadata = getMetadata()
    metadata = {
      ...baseMetadata,
      userId: payload.sub,
      main: {
        ...baseMetadata.main,
        files: [
          {
            index: 0,
            contentType: 'hello/hello',
            url: 'https://speed.hetzner.de/1GB.bin',
          },
        ],
      },
    }
  })

  it('should register an asset', async () => {
    ddo = await nevermined.assets.create(AssetAttributes.getInstance({ metadata }), publisher)

    assert.instanceOf(ddo, DDO)
  })

  it('should order the asset', async () => {
    try {
      await nevermined.accounts.requestTokens(
        consumer,
        ddo.getPriceByService() * 10n ** -BigInt(await nevermined.keeper.token.decimals()),
      )
    } catch (error) {
      Logger.error(error)
    }

    agreementId = await nevermined.assets.order(ddo.id, 'access', consumer)

    assert.isDefined(agreementId)
  })

  it('should consume and store the assets', async () => {
    const folder = '/tmp/nevermined/sdk-js'
    const path = (await nevermined.assets.access(
      agreementId,
      ddo.id,
      'access',
      consumer,
      folder,
    )) as string

    assert.include(path, folder, 'The storage path is not correct.')

    const files = await new Promise<string[]>((resolve) => {
      fs.readdir(path, (e, fileList) => {
        resolve(fileList)
      })
    })

    assert.deepEqual(files, ['1GB.bin'], 'Stored files are not correct.')
  })
})
