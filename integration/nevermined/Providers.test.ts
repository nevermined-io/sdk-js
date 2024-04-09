import { decodeJwt } from 'jose'
import config from '../../test/config'
import { getMetadata } from '../utils'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { DDO } from '../../src/ddo/DDO'
import { AssetAttributes } from '../../src/models/AssetAttributes'

describe('Providers operations', () => {
  let nevermined: Nevermined

  let account1: NvmAccount
  let account2: NvmAccount
  let ddo: DDO

  before(async () => {
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[account1, account2] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account1)

    await nevermined.services.marketplace.login(clientAssertion)

    const metadata = getMetadata()
    const payload = decodeJwt(config.marketplaceAuthToken)
    metadata.userId = payload.sub

    ddo = await nevermined.assets.create(AssetAttributes.getInstance({ metadata }), account1)
  })

  it('should add and remove providers addresses', async () => {
    console.log(await nevermined.assets.providers.list(ddo.id))
    await nevermined.assets.providers.add(ddo.id, account2.getId(), account1)
    console.log(await nevermined.assets.providers.list(ddo.id))
    await nevermined.assets.providers.remove(ddo.id, account2.getId(), account1)
    console.log(await nevermined.assets.providers.list(ddo.id))
  })
})
