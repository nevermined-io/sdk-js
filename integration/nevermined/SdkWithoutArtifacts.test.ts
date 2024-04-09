import { assert } from 'chai'
import { decodeJwt } from 'jose'
import config from '../../test/config'

import { NvmAccount } from '../../src/models/NvmAccount'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { makeWallets } from '../../src/nevermined/utils/BlockchainViemUtils'
import { SearchQuery } from '../../src/types/MetadataTypes'

describe('Sdk working without artifacts', () => {
  let nevermined: Nevermined
  let account: NvmAccount
  let configCopy

  before(async () => {
    configCopy = { ...config }
  })

  it('should keeper be disconnected', async () => {
    const failNvm = await Nevermined.getInstance({ ...config, chainId: 9999 })
    assert.isFalse(failNvm.isKeeperConnected)
  })

  it('should login to metamask without artifacts', async () => {
    const wallets = makeWallets(process.env.SEED_WORDS)
    configCopy.accounts = configCopy.accounts = wallets.map((wallet) => {
      return NvmAccount.fromAccount(wallet)
    })
    nevermined = await Nevermined.getInstance(configCopy)

    // Accounts
    ;[account] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account)

    await nevermined.services.marketplace.login(clientAssertion)

    const payload = decodeJwt(configCopy.marketplaceAuthToken)

    assert.isDefined(payload.sub)
  })

  it('Should be able to query the markeplace without artifacts', async () => {
    const query: SearchQuery = {
      offset: 100,
      page: 1,
      text: 'Office',
      sort: {
        created: 'desc',
      },
    }

    const assets = await nevermined.search.query(query)

    assert.isDefined(assets)
  })
})
