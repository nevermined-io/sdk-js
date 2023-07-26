import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import {
  Account,
  Nevermined,
  MetaData,
  AssetAttributes,
  DDO,
  didZeroX,
  generateId,
} from '../../src'
import { config } from '../config'
import { getMetadata } from '../utils'
import { decodeJwt } from 'jose'
import { sleep } from '../utils/utils'

chai.use(chaiAsPromised)

describe('Agreement Store Manager', () => {
  let nevermined: Nevermined
  let account1: Account
  let account2: Account
  let newMetadata: (token: string) => MetaData
  let agreementId: string
  let ddo: DDO

  before(async () => {
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[account1, account2] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account1)

    await nevermined.services.marketplace.login(clientAssertion)

    newMetadata = (token: string) => {
      const metadata = getMetadata()
      const jwtPayload = decodeJwt(token)
      metadata.userId = jwtPayload.sub
      return metadata
    }
  })

  it('should get agreements for did', async () => {
    const assetAttributes = AssetAttributes.getInstance({
      metadata: newMetadata(config.marketplaceAuthToken),
    })
    ddo = await nevermined.assets.create(assetAttributes, account1)

    let agreements = await nevermined.agreements.getAgreements(ddo.id)
    const num = agreements.length

    await account2.requestTokens(
      ddo.getPriceByService() * 10n ** BigInt(await nevermined.keeper.token.decimals()),
    )
    agreementId = await nevermined.assets.order(ddo.id, 'access', account2)

    // wait for the graph to pickup the event
    await sleep(3000)

    agreements = await nevermined.agreements.getAgreements(ddo.id)

    assert.isNotEmpty(agreements)
    assert.equal(agreements.length, 1 + num)
    const agreementFound = agreements.find((a) => a.agreementId === agreementId)

    assert.isTrue(agreementFound != undefined)
    assert.equal(agreementFound.agreementId, agreementId)
  })

  it('should get the agreement data for an agreementId', async () => {
    const agreementData = await nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
    assert.equal(didZeroX(ddo.id), agreementData.did)
    assert.equal(agreementId, agreementData.agreementId)
  })

  it('should raise a keeper error if the template is not found', async () => {
    const randomId = `0x${generateId()}`
    await assert.isRejected(
      nevermined.keeper.agreementStoreManager.getAgreement(randomId),
      /Could not find template for agreementId/,
    )
  })
})
