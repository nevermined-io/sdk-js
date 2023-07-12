import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import {
  Nevermined,
  Account,
  MetaData,
  DDO,
  AssetPrice,
  AssetAttributes,
  ConditionState,
  Token,
} from '../../src'
import { BigNumber } from '../../src/utils'
import { repeat, sleep } from '../utils/utils'

let nevermined: Nevermined
let publisher: Account
let consumer: Account
let metadata: MetaData
let createdMetadata: MetaData
let assetPrice1: AssetPrice
let assetPrice2: AssetPrice
let payload: JWTPayload
let ddo: DDO
let token: Token
let balanceBefore: BigNumber
let balanceAfter: BigNumber
const totalAmount1 = '100'
const totalAmount2 = '350'

describe('Assets with multiple services', () => {
  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;({ token } = nevermined.keeper)
    // Accounts
    ;[publisher, consumer] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)

    payload = decodeJwt(config.marketplaceAuthToken)
    assetPrice1 = new AssetPrice(publisher.getId(), BigNumber.from(totalAmount1))
    assetPrice2 = new AssetPrice(publisher.getId(), BigNumber.from(totalAmount2))

    metadata = getMetadata()
    metadata.userId = payload.sub
  })

  describe('E2E flow for access services', () => {
    it('Register with multiple access services', async () => {
      balanceBefore = await token.balanceOf(consumer.getId())

      const nonce = Math.random()
      createdMetadata = getMetadata(nonce, `Immutable Multiple Services Test ${nonce}`)

      createdMetadata.main.ercType = 721
      createdMetadata.additionalInformation.tags = ['test']

      const assetAttributes = AssetAttributes.getInstance({
        metadata: createdMetadata,
        services: [
          {
            serviceType: 'access',
            price: assetPrice1,
          },
          {
            serviceType: 'access',
            price: assetPrice2,
          },
        ],
      })
      ddo = await nevermined.assets.create(assetAttributes, publisher)

      assert.isDefined(ddo)
      console.log(ddo.id)

      const accessServices = ddo.getServicesByType('access')
      assert.equal(accessServices.length, 2)
      assert.equal(accessServices[0].index, 2)
      assert.equal(accessServices[1].index, 3)

      assert.equal(
        accessServices[0].attributes.serviceAgreementTemplate.conditions[0].parameters[3].value,
        [totalAmount1],
      )
      assert.equal(
        accessServices[1].attributes.serviceAgreementTemplate.conditions[0].parameters[3].value,
        [totalAmount2],
      )

      const metadata = ddo.findServiceByType('metadata')
      assert.equal(metadata.attributes.main.ercType, 721)
      assert.equal(metadata.attributes.additionalInformation.tags[0], 'test')
    })

    it('Order and download the first of multiple access services', async () => {
      const accessServices = ddo.getServicesByType('access')

      const agreementId = await nevermined.assets.order(ddo.id, accessServices[0].index, consumer)
      await sleep(3000)
      const status = await repeat(3, nevermined.agreements.status(agreementId))

      assert.deepEqual(status, {
        lockPayment: ConditionState.Fulfilled,
        access: ConditionState.Unfulfilled,
        escrowPayment: ConditionState.Unfulfilled,
      })
      balanceAfter = await token.balanceOf(consumer.getId())

      console.log(`Asset Price = ${assetPrice1.getTotalPrice()}`)
      console.log(`Balance Before: ${balanceBefore.toString()}`)
      console.log(`Balance After : ${balanceAfter.toString()}`)

      assert.equal(balanceBefore.sub(assetPrice1.getTotalPrice()), balanceAfter)

      const folder = '/tmp/nevermined/sdk-js/multiple-services/access'
      const path = (await nevermined.assets.access(
        agreementId,
        ddo.id,
        consumer,
        folder,
        -1,
      )) as string

      assert.include(path, folder, 'The storage path is not correct.')
    })
  })
})
