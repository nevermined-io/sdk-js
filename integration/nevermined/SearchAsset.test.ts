import { assert } from 'chai'
import { decodeJwt } from 'jose'
import config from '../../test/config'
import { getMetadata } from '../utils'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { DDO } from '../../src/ddo/DDO'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import { generateId } from '../../src/common/helpers'
import { NvmAppMetadata } from '../../src/ddo/NvmAppMetadata'
describe('Search Asset', () => {
  let nevermined: Nevermined
  let neverminedOffline: Nevermined
  let account: NvmAccount
  let appId: string
  let userId: string

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    neverminedOffline = await Nevermined.getSearchOnlyInstance(config)
    ;[account] = nevermined.accounts.list()
    appId = generateId()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account)
    await nevermined.services.marketplace.login(clientAssertion)
    const payload = decodeJwt(config.marketplaceAuthToken)
    userId = payload.sub as string
  })

  it('should register the assets', async () => {
    let metadata = getMetadata(undefined, 'Test1')
    metadata.userId = userId
    await nevermined.assets.create(AssetAttributes.getInstance({ metadata, appId }), account)

    metadata = getMetadata(undefined, 'Test2')
    metadata.userId = userId

    await nevermined.assets.create(AssetAttributes.getInstance({ metadata, appId }), account)

    metadata = getMetadata(undefined, 'Test2')
    metadata.userId = userId
    await nevermined.assets.create(AssetAttributes.getInstance({ metadata, appId }), account)

    metadata = getMetadata(undefined, 'Test3')
    metadata.userId = userId
    await nevermined.assets.create(AssetAttributes.getInstance({ metadata, appId }), account)

    const agentMetadata = NvmAppMetadata.getServiceMetadataTemplate(
      'Nevermined Agent Metadata TEST',
      'Nevermined',
      [{ POST: `http://localhost/did:nv:{DID}/search` }, { POST: `http://localhost/api/(.*)` }],
      [],
      `http://localhost/api-json`,
      'RESTful',
      'bearer',
      '1234',
      '',
      '',
      false,
      true,
      'v1',
      'http://localhost/',
    )
    metadata = getMetadata(undefined, 'Test4')
    agentMetadata.userId = userId
    agentMetadata.main.type = 'agent'
    await nevermined.assets.create(
      AssetAttributes.getInstance({ metadata: agentMetadata, appId }),
      account,
    )
  })

  it('should search by text', async () => {
    let result = await neverminedOffline.search.byText(
      'Test',
      undefined,
      undefined,
      undefined,
      appId,
    )
    assert.equal(result.totalResults.value, 5)

    result = await neverminedOffline.search.byText('Test1', undefined, undefined, undefined, appId)
    assert.equal(result.totalResults.value, 1)

    result = await neverminedOffline.search.byText('Test2', undefined, undefined, undefined, appId)
    assert.equal(result.totalResults.value, 2)

    result = await neverminedOffline.search.byText('Test3', undefined, undefined, undefined, appId)
    assert.equal(result.totalResults.value, 1)
  })

  it('should return a list of DDOs', async () => {
    const { results: ddos } = await neverminedOffline.search.byText(
      'Test1',
      undefined,
      undefined,
      undefined,
      appId,
    )

    assert.equal(ddos.length, 1)
    ddos.map((ddo) => assert.instanceOf(ddo, DDO))
  })

  it('should be able to do a query to get a list of DDOs', async () => {
    const { results: ddos } = await neverminedOffline.search.byText(
      'Test2',
      undefined,
      undefined,
      undefined,
      appId,
    )

    assert.equal(ddos.length, 2)
    ddos.map((ddo) => assert.instanceOf(ddo, DDO))
  })

  it('should be able get the assets by DID', async () => {
    const { results: ddos } = await neverminedOffline.search.byText(
      'Test2',
      undefined,
      undefined,
      undefined,
      appId,
    )

    assert.equal(ddos.length, 2)
    ddos.map((ddo) => {
      nevermined.search.byDID(ddo.id).then((ddo) => assert.instanceOf(ddo, DDO))
    })
  })

  it('should be able to get assets by type', async () => {
    const { results: ddos } = await neverminedOffline.search.byType('dataset')
    assert.isAtLeast(ddos.length, 5)

    const { results: ddosWithTextFilter } = await neverminedOffline.search.byType(
      'dataset',
      'TestAsset',
    )
    assert.isAtLeast(ddosWithTextFilter.length, 4)

    const { results: ddosServices } = await neverminedOffline.search.byType('service')
    assert.isAtLeast(ddosServices.length, 2)

    const { results: agent } = await neverminedOffline.search.byType('agent')
    assert.isAtLeast(agent.length, 1)
  })
})
