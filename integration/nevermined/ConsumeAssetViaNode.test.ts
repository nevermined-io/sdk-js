import { assert } from 'chai'
import * as fs from 'fs'
import { decodeJwt } from 'jose'

import config from '../../test/config'
import { getMetadata } from '../utils'
import { repeat } from '../utils/utils'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { MetaData } from '../../src/types/DDOTypes'
import { DDO } from '../../src/ddo/DDO'
import { NvmAccount } from '../../src/models/NvmAccount'
import { AssetPrice } from '../../src/models/AssetPrice'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import Logger from '../../src/models/Logger'
import { ConditionState } from '../../src/types/ContractTypes'
import { getChecksumAddress } from '../../src/nevermined/utils/BlockchainViemUtils'

describe('Consume Asset (Nevermined Node)', () => {
  let nevermined: Nevermined

  let publisher: NvmAccount
  let consumer: NvmAccount

  let ddo: DDO
  let agreementId: string

  let metadata: MetaData
  let assetPrice: AssetPrice

  before(async () => {
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[publisher, consumer] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)
    const payload = decodeJwt(config.marketplaceAuthToken)

    assetPrice = new AssetPrice(publisher.getId(), 0n)

    metadata = getMetadata()
    metadata.main.name = `${metadata.main.name} - ${Math.random()}`
    metadata.userId = payload.sub
  })

  after(() => {
    try {
      localStorage.clear()
    } catch (error) {
      Logger.error(error)
    }
  })

  it('should fetch the RSA publicKey from the Nevermined Node', async () => {
    const rsaPublicKey = await nevermined.services.node.getRsaPublicKey()
    assert.isDefined(rsaPublicKey)
  })

  it('should register an asset', async () => {
    const steps: any[] = []

    const assetAttributes = AssetAttributes.getInstance({
      metadata,
      services: [
        {
          serviceType: 'access',
          price: assetPrice,
        },
      ],
      providers: [config.neverminedNodeAddress],
    })
    ddo = await nevermined.assets
      .create(assetAttributes, publisher)
      .next((step) => steps.push(step))

    assert.instanceOf(ddo, DDO)
    assert.deepEqual(steps, [0, 1, 2, 3, 4, 5, 6, 9, 10, 12])

    const assetProviders = await nevermined.assets.providers.list(ddo.id)
    assert.deepEqual(assetProviders, [getChecksumAddress(config.neverminedNodeAddress)])
  })

  it('should order the asset', async () => {
    const steps: any[] = []
    agreementId = await nevermined.assets
      .order(ddo.id, 'access', consumer)
      .next((step) => steps.push(step))

    assert.isDefined(agreementId)
    assert.deepEqual(steps, [2, 3, 4, 5])
  })

  it('should get the lockPayment condition fulfilled', async () => {
    const status = await repeat(3, nevermined.agreements.status(agreementId))

    assert.deepEqual(status, {
      lockPayment: ConditionState.Fulfilled,
      access: ConditionState.Unfulfilled,
      escrowPayment: ConditionState.Unfulfilled,
    })
  })

  it('should be able to download the asset if you are the owner', async () => {
    const folder = '/tmp/nevermined/sdk-js'
    const path = (await nevermined.assets.download(ddo.id, publisher, folder, -1)) as string
    assert.include(path, folder, 'The storage path is not correct.')
    const files = await new Promise<string[]>((resolve) => {
      fs.readdir(path, (_e, fileList) => {
        resolve(fileList)
      })
    })

    assert.deepEqual(files, ['README.md', 'ddo-example.json'], 'Stored files are not correct.')
  })

  it('should consume and store the assets', async () => {
    const folder = '/tmp/nevermined/sdk-js'
    const path = (await nevermined.assets.access(
      agreementId,
      ddo.id,
      'access',
      consumer,
      folder,
      -1,
    )) as string

    assert.include(path, folder, 'The storage path is not correct.')

    const files = await new Promise<string[]>((resolve) => {
      fs.readdir(path, (_e, fileList) => {
        resolve(fileList)
      })
    })

    assert.deepEqual(files, ['README.md', 'ddo-example.json'], 'Stored files are not correct.')
  })
})
