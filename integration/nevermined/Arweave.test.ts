import chai, { assert, expect } from 'chai'
import config from '../../test/config'
import { Nevermined } from '@/nevermined/Nevermined'
import { NvmAccount } from '@/models/NvmAccount'
import { DDO } from '@/ddo/DDO'
import { DDOStatus } from '@/services/metadata/MetadataService'
import { DIDRegistry } from '@/keeper/contracts/DIDRegistry'
import { AssetPrice } from '@/models/AssetPrice'
import { getAssetPrice, getMetadata } from '../utils/ddo-metadata-generator'
import { AssetAttributes } from '@/models/AssetAttributes'

describe.skip('Get DDO status', () => {
  let nevermined: Nevermined
  let publisher: NvmAccount
  let assetPrice: AssetPrice
  let ddo: DDO
  let ddoStatus: DDOStatus
  let didRegistry: DIDRegistry

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;({ didRegistry } = nevermined.keeper)
    ;[publisher] = await nevermined.accounts.list()
    assetPrice = getAssetPrice(publisher.getId())
  })

  it('should get the external status of an asset', async () => {
    const assetAttributes = AssetAttributes.getInstance({
      metadata: getMetadata(),
      services: [
        {
          serviceType: 'access',
          price: assetPrice,
        },
      ],
    })
    const ddo = await nevermined.assets.create(assetAttributes, publisher)

    ddoStatus = await nevermined.services.metadata.status(ddo.id)
    assert.isDefined(ddoStatus)
    assert.isDefined(ddoStatus.external)
    assert.isDefined(ddoStatus.external.id)
    assert.equal(ddoStatus.external.type, 'Arweave')
    assert.equal(ddoStatus.external.status, 'PENDING')
    assert.equal(ddoStatus.external.url, `https://arweave.net:443/${ddoStatus.external.id}`)
  })

  it('should have the arweave endpoint in the did registry', async () => {
    const attributes = await didRegistry.getAttributesByDid(ddo.id)
    assert.equal(attributes.serviceEndpoint, ddoStatus.external.url)
  })

  it('should resolve external url', async () => {
    chai.spy.on((nevermined as any).metadata, 'retrieveDDOByUrl')

    const retrievedDdo = await nevermined.assets.resolve(ddo.id)
    assert.deepEqual(ddo, retrievedDdo)
    expect(nevermined.services.metadata.retrieveDDOByUrl).to.have.been.called.with(
      ddoStatus.external.url,
    )
  })
})
