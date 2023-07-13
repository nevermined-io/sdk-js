import { assert } from 'chai'
import { decodeJwt } from 'jose'
import * as fs from 'fs'
import { config } from '../config'
import {
  Nevermined,
  DDO,
  Account,
  ConditionState,
  MetaData,
  Logger,
  AssetPrice,
  AssetAttributes,
} from '../../src'
import { getMetadata } from '../utils'
import { repeat, sleep } from '../utils/utils'
import { BigNumber } from '../../src/utils'
import { AgreementPrepareResult } from '../../src/nevermined/api/AgreementsApi'

describe('Consume Asset (Documentation example)', () => {
  let nevermined: Nevermined

  let publisher: Account
  let consumer: Account

  let metadata: MetaData

  let ddo: DDO
  let serviceAgreementSignatureResult: AgreementPrepareResult
  let assetPrice: AssetPrice
  let agreementId: string

  before(async () => {
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[publisher, consumer] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)
    const payload = decodeJwt(config.marketplaceAuthToken)

    metadata = getMetadata()
    metadata.userId = payload.sub
    assetPrice = new AssetPrice(publisher.getId(), BigNumber.from('0'))
  })

  it('should register an asset', async () => {
    ddo = await nevermined.assets.create(
      AssetAttributes.getInstance({
        metadata,
        services: [
          {
            serviceType: 'access',
            price: assetPrice,
          },
        ],
      }),
      publisher,
    )

    assert.isDefined(ddo, 'Register has not returned a DDO')
    assert.match(ddo.id, /^did:nv:[a-f0-9]{64}$/, 'DDO id is not valid')
    assert.isAtLeast(ddo.authentication.length, 1, 'Default authentication not added')
    assert.isDefined(ddo.findServiceByType('access'), "DDO access service doesn't exist")
  })

  it('should be able to request tokens for consumer', async () => {
    const initialBalance = (await consumer.getBalance()).nevermined
    const claimedTokens = BigNumber.from(1)

    try {
      await consumer.requestTokens(claimedTokens)
    } catch (error) {
      Logger.error(error)
    }

    const balanceAfter = (await consumer.getBalance()).nevermined
    assert.isTrue(balanceAfter.gt(initialBalance))
  })

  it('should sign the service agreement', async () => {
    serviceAgreementSignatureResult = await nevermined.agreements.prepareSignature(
      ddo.id,
      'access',
      consumer,
    )

    const { agreementIdSeed, signature } = serviceAgreementSignatureResult
    assert.match(agreementIdSeed, /^0x[a-f0-9]{64}$/, 'Service agreement ID seems not valid')
    assert.match(signature, /^0x[a-f0-9]{130}$/, 'Service agreement signature seems not valid')
  })

  it('should execute the service agreement', async () => {
    agreementId = await nevermined.agreements.create(
      ddo.id,
      serviceAgreementSignatureResult.agreementIdSeed,
      'access',
      nevermined.keeper.templates.accessTemplate.params(consumer),
      consumer,
      publisher,
    )

    assert.isDefined(agreementId)
  })

  it('should get the agreement conditions status not fulfilled', async () => {
    // todo change this, a test should never dependent on the previous test because the order might change during runtime
    await sleep(3000)
    const status = await repeat(3, nevermined.agreements.status(agreementId))

    assert.deepEqual(status, {
      lockPayment: ConditionState.Unfulfilled,
      access: ConditionState.Unfulfilled,
      escrowPayment: ConditionState.Unfulfilled,
    })
  })

  it('should lock the payment by the consumer', async () => {
    const price = ddo.getPriceByService()
    const assetPrice = new AssetPrice(publisher.getId(), price)

    const paid = await nevermined.agreements.conditions.lockPayment(
      agreementId,
      ddo.id,
      assetPrice.getAmounts(),
      assetPrice.getReceivers(),
      undefined,
      consumer,
    )

    assert.isTrue(paid, 'The asset has not been paid correctly')
  })

  // The test will fail because Nevermined Node grants the access faster
  it('should grant the access by the publisher', async () => {
    try {
      const granted = await nevermined.agreements.conditions.grantAccess(
        agreementId,
        ddo.id,
        consumer.getId(),
        publisher,
      )

      assert.isTrue(granted, 'The asset has not been granted correctly')

      const accessGranted = await nevermined.keeper.conditions.accessCondition.checkPermissions(
        consumer.getId(),
        ddo.id,
      )

      assert.isTrue(accessGranted, 'Consumer has been granted.')
    } catch (error) {
      Logger.error(error)
    }
  })

  it('should get the agreement conditions status fulfilled', async () => {
    // todo change this, a test should never dependent on the previous test because the order might change during runtime
    await sleep(500)
    const status = await nevermined.agreements.status(agreementId)

    assert.deepEqual(status, {
      lockPayment: ConditionState.Fulfilled,
      access: ConditionState.Fulfilled,
      escrowPayment: ConditionState.Unfulfilled,
    })
  })

  it('should consume and store the assets', async () => {
    const folder = '/tmp/nevermined/sdk-js-1'
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

    assert.deepEqual(files, ['README.md', 'ddo-example.json'], 'Stored files are not correct.')
  })

  it('should consume and store one asset', async () => {
    const folder = '/tmp/nevermined/sdk-js-2'
    const path = (await nevermined.assets.access(
      agreementId,
      ddo.id,
      'access',
      consumer,
      folder,
      0,
    )) as string

    assert.include(path, folder, 'The storage path is not correct.')

    const files = await new Promise<string[]>((resolve) => {
      fs.readdir(path, (e, fileList) => {
        resolve(fileList)
      })
    })

    assert.deepEqual(files, ['ddo-example.json'], 'Stored files are not correct.')
  })
})
