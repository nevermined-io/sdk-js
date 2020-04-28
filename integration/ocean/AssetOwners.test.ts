import { assert } from 'chai'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Ocean, Account } from '../../src' // @oceanprotocol/squid

describe('Asset Owners', () => {
    let ocean: Ocean

    let account1: Account
    let account2: Account

    let metadata = getMetadata()

    before(async () => {
        ocean = await Ocean.getInstance(config)

        // Accounts
        ;[account1, account2] = await ocean.accounts.list()

        if (!ocean.keeper.dispenser) {
            metadata = getMetadata(0)
        }
    })

    it('should set the owner of an asset', async () => {
        const ddo = await ocean.assets.create(metadata as any, account1)
        const owner = await ocean.assets.owner(ddo.id)

        assert.equal(owner, account1.getId())
    })

    it('should set the provider of an asset', async () => {
        const ddo = await ocean.assets.create(metadata as any, account1)

        const isProvider = await ocean.keeper.didRegistry.isDIDProvider(
            ddo.id,
            config.brizoAddress
        )

        assert.isTrue(isProvider)
    })

    it('should be added correctly a permission on an asset', async () => {
        const ddo = await ocean.assets.create(metadata as any, account1)

        assert.isFalse(
            await ocean.keeper.didRegistry.getPermission(ddo.id, account2.getId())
        )

        await ocean.keeper.didRegistry.grantPermission(
            ddo.id,
            account2.getId(),
            account1.getId()
        )

        assert.isTrue(
            await ocean.keeper.didRegistry.getPermission(ddo.id, account2.getId())
        )
    })

    it('should get the assets owned by a user', async () => {
        const { length: initialLength } = await ocean.assets.ownerAssets(account2.getId())

        await ocean.assets.create(metadata as any, account1)
        await ocean.assets.create(metadata as any, account1)

        await ocean.assets.create(metadata as any, account2)

        const { length: finalLength } = await ocean.assets.ownerAssets(account2.getId())

        assert.equal(finalLength - initialLength, 1)
    })

    it('should get the assets that can be consumed by a user', async () => {
        const { length: initialLength } = await ocean.assets.consumerAssets(
            account2.getId()
        )

        const ddo = await ocean.assets.create(metadata as any, account1)

        const { length: finalLength1 } = await ocean.assets.consumerAssets(
            account2.getId()
        )
        assert.equal(finalLength1 - initialLength, 0)

        // Granting access
        try {
            await account2.requestTokens(
                +metadata.main.price * 10 ** -(await ocean.keeper.token.decimals())
            )
        } catch {}

        const { index } = ddo.findServiceByType('access')

        await ocean.assets.order(ddo.id, index, account2)
        // Access granted

        const { length: finalLength2 } = await ocean.assets.consumerAssets(
            account2.getId()
        )
        assert.equal(finalLength2 - initialLength, 1)
    })

    it('should be able to transfer ownership', async () => {
        const { id } = await ocean.assets.create(metadata as any, account1)

        // transfer
        await ocean.assets.transferOwnership(id, account2.getId())
        const newOwner = await ocean.keeper.didRegistry.getDIDOwner(id)

        assert.equal(newOwner, account2.getId())
    })
})
