import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { generateId } from '../../src/common/helpers'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { DDO } from '../../src/ddo/DDO'

import config from '../../test/config'
import { getMetadata } from '../utils'
import { CustomToken } from '../../src/keeper/contracts/CustomToken'
import { parseUnits } from '../../src/nevermined/utils/BlockchainViemUtils'
import { AssetPrice } from '../../src/models/AssetPrice'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import { getRoyaltyAttributes } from '../../src/nevermined/api/AssetsApi'
import { NFTAttributes } from '../../src/models/NFTAttributes'
import { RoyaltyKind } from '../../src/types/MetadataTypes'

describe('Assets Query by Price', () => {
  let nevermined: Nevermined
  let price1: bigint
  let price2: bigint
  let royalties: bigint
  let payload: JWTPayload
  let account: NvmAccount
  let account2: NvmAccount
  let appId: string
  let token: CustomToken
  let ddoAccess: DDO
  let ddoNftSales: DDO

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    token = await nevermined.contracts.loadErc20(nevermined.utils.token.getAddress())

    price1 = parseUnits('2', await token.decimals())
    price2 = parseUnits('17.86', await token.decimals())
    royalties = parseUnits('2', await token.decimals())
    appId = generateId()
    ;[account, account2] = nevermined.accounts.list()
    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account)
    await nevermined.services.marketplace.login(clientAssertion)
    payload = decodeJwt(config.marketplaceAuthToken)
  })

  it('Should create tests assets', async () => {
    // publish asset with priced service `access`
    let metadata = getMetadata()
    metadata.userId = payload.sub
    let assetPrice = new AssetPrice(account.getId(), price1).setTokenAddress(await token.address)

    const _attributes = AssetAttributes.getInstance({
      metadata,
      services: [
        {
          serviceType: 'access',
          price: assetPrice,
        },
      ],
      appId,
    })
    ddoAccess = await nevermined.assets.create(_attributes, account)

    // publish asset with priced service `nft-sales`
    metadata = getMetadata()
    metadata.userId = payload.sub
    assetPrice = new AssetPrice(
      new Map([
        [account.getId(), price2 - royalties],
        [account2.getId(), royalties],
      ]),
    )
    const royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 0)

    const assetAttributes = AssetAttributes.getInstance({
      metadata,
      services: [
        {
          serviceType: 'nft-sales',
          price: assetPrice,
        },
        {
          serviceType: 'nft-access',
        },
      ],
      appId,
    })
    const nftAttributes = NFTAttributes.getNFT1155Instance({
      ...assetAttributes,
      nftContractAddress: nevermined.nfts1155.nftContract.address,
      cap: 1n,
      royaltyAttributes,
    })
    ddoNftSales = await nevermined.nfts1155.create(nftAttributes, account)
  })

  it('Should query all services by default', async () => {
    const results = await nevermined.search.byPrice(
      1,
      20,
      undefined,
      undefined,
      undefined,
      undefined,
      appId,
    )
    assert.equal(results.totalResults.value, 2)
  })

  it('Should query by service', async () => {
    let results = await nevermined.search.byPrice(
      1,
      20,
      'access',
      undefined,
      undefined,
      undefined,
      appId,
    )
    assert.equal(results.totalResults.value, 1)
    assert.equal(results.results.pop().id, ddoAccess.id)

    results = await nevermined.search.byPrice(
      1,
      20,
      'nft-sales',
      undefined,
      undefined,
      undefined,
      appId,
    )
    assert.equal(results.totalResults.value, 1)
    assert.equal(results.results.pop().id, ddoNftSales.id)
  })

  it('Should query with decimal values', async () => {
    let results = await nevermined.search.byPrice(
      2,
      17.86,
      undefined,
      undefined,
      undefined,
      undefined,
      appId,
    )
    assert.equal(results.totalResults.value, 2)

    results = await nevermined.search.byPrice(
      2.001,
      17.86,
      undefined,
      undefined,
      undefined,
      undefined,
      appId,
    )
    assert.equal(results.totalResults.value, 1)
    assert.equal(results.results.pop().id, ddoNftSales.id)

    results = await nevermined.search.byPrice(
      2.0,
      17.859999,
      undefined,
      undefined,
      undefined,
      undefined,
      appId,
    )
    assert.equal(results.totalResults.value, 1)
    assert.equal(results.results.pop().id, ddoAccess.id)
  })
})
