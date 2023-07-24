import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { Nevermined, SearchQuery, Account, makeAccounts } from '../../src'

describe('Sdk working without artifacts', () => {
  let nevermined: Nevermined
  let account: Account
  let configCopy

  before(async () => {
    configCopy = { ...config }
    configCopy.artifactsFolder = undefined
    nevermined = await Nevermined.getInstance(configCopy)
  })

  it('should keeper be disconnected', () => {
    assert.isFalse(nevermined.isKeeperConnected)
  })

  it('should login to metamask without artifacts', async () => {
    configCopy.accounts = makeAccounts(process.env.SEED_WORDS)
    nevermined = await Nevermined.getInstance(configCopy)

    // Accounts
    ;[account] = await nevermined.accounts.list()

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
