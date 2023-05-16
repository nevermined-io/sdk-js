import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { Nevermined, SearchQuery, Account } from '../../src'
import { ethers } from 'ethers'
import { HDNode } from 'ethers/lib/utils'

describe('Sdk working without artifacts', () => {
  let nevermined: Nevermined
  let account: Account

  beforeEach(async () => {
    config.artifactsFolder = undefined
    nevermined = await Nevermined.getInstance(config)
  })

  it('should login to metamask without artifacts', async () => {
    const node = HDNode.fromMnemonic(process.env.SEED_WORDS)
    const accounts: ethers.Wallet[] = []
    for (let i = 0; i < 10; i++) {
      const acc = node.derivePath("m/44'/60'/0'/0/" + i)
      const wallet = new ethers.Wallet(acc.privateKey)
      accounts.push(wallet)
    }
    config.accounts = accounts
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[account] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account)

    await nevermined.services.marketplace.login(clientAssertion)

    const payload = decodeJwt(config.marketplaceAuthToken)

    assert.isDefined(payload.sub)
  })

  it('Should be able to log in markeplace without artifacts', async () => {
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
