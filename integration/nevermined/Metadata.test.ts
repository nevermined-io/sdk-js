import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { Account, DID, Nevermined, AssetPrice, AssetAttributes } from '../../src'
import { config } from '../config'
import { getAssetPrice, getMetadata } from '../utils'

describe('Get DDO status', () => {
  let nevermined: Nevermined
  let publisher: Account
  let assetPrice: AssetPrice
  let payload: JWTPayload

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[publisher] = await nevermined.accounts.list()
    assetPrice = getAssetPrice(publisher.getId())
    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)
    payload = decodeJwt(config.marketplaceAuthToken)
  })

  it('should get the internal status of an asset', async () => {
    const metadata = getMetadata()
    metadata.userId = payload.sub
    const ddo = await nevermined.assets.create(
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

    const ddoStatus = await nevermined.services.metadata.status(ddo.id)
    assert.isDefined(ddoStatus)
    assert.isDefined(ddoStatus.internal)
    assert.equal(ddoStatus.internal.id, ddo.id)
    assert.equal(ddoStatus.internal.type, 'Elasticsearch')
    assert.equal(ddoStatus.internal.status, 'ACCEPTED')
    assert.equal(
      ddoStatus.internal.url,
      nevermined.services.metadata.getServiceEndpoint(DID.parse(ddo.id)),
    )
  })
})
