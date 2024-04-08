import { assert } from 'chai'
import config from '../../test/config'

import { decodeJwt } from 'jose'
import { mineBlocks } from '../utils/utils'
import { Nevermined } from '@/nevermined/Nevermined'
import { NeverminedOptions } from '@/models/NeverminedOptions'
import { NvmAccount } from '@/models/NvmAccount'
import { MetaData } from '@/types/DDOTypes'
import { getMetadata } from '../utils/ddo-metadata-generator'
import { generateId } from '@/common/helpers'
import { AssetAttributes } from '@/models/AssetAttributes'

describe('Asset Owners', () => {
  let nevermined: Nevermined
  let nevermined2: Nevermined
  let nevermined3: Nevermined
  let config2: NeverminedOptions
  let config3: NeverminedOptions

  let account1: NvmAccount
  let account2: NvmAccount
  let account3: NvmAccount

  let newMetadata: (token: string) => MetaData

  before(async () => {
    config2 = { ...config }
    config3 = { ...config }
    nevermined = await Nevermined.getInstance(config)
    nevermined2 = await Nevermined.getInstance(config2)
    nevermined3 = await Nevermined.getInstance(config3)

    // Accounts
    ;[account1, account2, account3] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account1)

    const clientAssertion2 = await nevermined2.utils.jwt.generateClientAssertion(account2)

    const clientAssertion3 = await nevermined2.utils.jwt.generateClientAssertion(account3)

    await nevermined.services.marketplace.login(clientAssertion)
    await nevermined2.services.marketplace.login(clientAssertion2)
    await nevermined3.services.marketplace.login(clientAssertion3)

    newMetadata = (token: string) => {
      const metadata = getMetadata()
      const jwtPayload = decodeJwt(token)
      metadata.userId = jwtPayload.sub
      metadata.main.name = `Test Metadata ${generateId()}`
      return metadata
    }
  })

  it('should set the owner of an asset', async () => {
    const assetAttributes = AssetAttributes.getInstance({
      metadata: newMetadata(config.marketplaceAuthToken),
    })
    const ddo = await nevermined.assets.create(assetAttributes, account1)

    const owner = await nevermined.assets.owner(ddo.id)

    assert.equal(owner, account1.getId())
  })

  it('should set the provider of an asset', async () => {
    const assetAttributes = AssetAttributes.getInstance({
      metadata: newMetadata(config.marketplaceAuthToken),
      providers: [config.neverminedNodeAddress],
    })
    const ddo = await nevermined.assets.create(assetAttributes, account1)

    const isProvider = await nevermined.keeper.didRegistry.isDIDProvider(
      ddo.id,
      config.neverminedNodeAddress,
    )

    assert.isTrue(isProvider)
  })

  it('should be added correctly a permission on an asset', async () => {
    const assetAttributes = AssetAttributes.getInstance({
      metadata: newMetadata(config.marketplaceAuthToken),
    })
    const ddo = await nevermined.assets.create(assetAttributes, account1)

    assert.isFalse(await nevermined.keeper.didRegistry.getPermission(ddo.id, account2.getId()))

    await nevermined.keeper.didRegistry.grantPermission(ddo.id, account2.getId(), account1)

    assert.isTrue(await nevermined.keeper.didRegistry.getPermission(ddo.id, account2.getId()))
  })

  it('should get the assets owned by a user', async () => {
    await nevermined.assets.create(
      AssetAttributes.getInstance({
        metadata: newMetadata(config.marketplaceAuthToken),
      }),
      account1,
    )
    await nevermined.assets.create(
      AssetAttributes.getInstance({
        metadata: newMetadata(config.marketplaceAuthToken),
      }),
      account1,
    )
    const ddo = await nevermined2.assets.create(
      AssetAttributes.getInstance({
        metadata: newMetadata(config2.marketplaceAuthToken),
      }),
      account2,
    )

    await mineBlocks(nevermined, account1, 1)

    const result = await nevermined.assets.ownerAssets(account2.getId())
    assert.includeMembers(result, [ddo.id])
  })

  describe('Ownership transfer', () => {
    let did: string
    it('should be able to transfer ownership to account2', async () => {
      const assetDDO = await nevermined.assets.create(
        AssetAttributes.getInstance({
          metadata: newMetadata(config.marketplaceAuthToken),
        }),
        account1,
      )
      did = assetDDO.id
      assert.equal(assetDDO._nvm.versions.length, 1)
      // transfer
      await nevermined.assets.transferOwnership(did, account2.getId(), account1)
      const newOwner = await nevermined.keeper.didRegistry.getDIDOwner(did)

      assert.equal(newOwner, account2.getId())

      const ddo = await nevermined.assets.resolve(did)
      assert.equal(ddo._nvm.versions.length, 2)

      assert.equal(ddo.publicKey[0].owner, account2.getId())
      assert.equal(ddo.proof.creator, account2.getId())
    })

    it('account2 should be able to transfer ownership to account3', async () => {
      // transfer
      await nevermined2.assets.transferOwnership(did, account3.getId(), account2)
      const newOwner = await nevermined.keeper.didRegistry.getDIDOwner(did)

      assert.equal(newOwner, account3.getId())

      const ddo = await nevermined.assets.resolve(did)
      assert.equal(ddo._nvm.versions.length, 3)

      assert.equal(ddo.publicKey[0].owner, account3.getId())
      assert.equal(ddo.proof.creator, account3.getId())
    })
  })
})
