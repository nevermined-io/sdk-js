import { assert } from 'chai'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account } from '../../src'

describe('Asset Owners', () => {
    let nevermined: Nevermined

    let account1: Account
    let account2: Account

    let newMetadata = () => getMetadata()

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account1, account2] = await nevermined.accounts.list()

        if (!nevermined.keeper.dispenser) {
            newMetadata = () => getMetadata(0)
        }
    })

    it('should set the owner of an asset', async () => {
        const ddo = await nevermined.assets.create(newMetadata(), account1)
        const owner = await nevermined.assets.owner(ddo.id)

        assert.equal(owner, account1.getId())
    })

    it('should set the provider of an asset', async () => {
        const ddo = await nevermined.assets.create(newMetadata(), account1)

        const isProvider = await nevermined.keeper.didRegistry.isDIDProvider(
            ddo.id,
            config.gatewayAddress
        )

        assert.isTrue(isProvider)
    })

    it('should be added correctly a permission on an asset', async () => {
        const ddo = await nevermined.assets.create(newMetadata(), account1)

        assert.isFalse(
            await nevermined.keeper.didRegistry.getPermission(ddo.id, account2.getId())
        )

        await nevermined.keeper.didRegistry.grantPermission(
            ddo.id,
            account2.getId(),
            account1.getId()
        )

        assert.isTrue(
            await nevermined.keeper.didRegistry.getPermission(ddo.id, account2.getId())
        )
    })

    it('should get the assets owned by a user', async () => {
        const { length: initialLength } = await nevermined.assets.ownerAssets(
            account2.getId()
        )

        await nevermined.assets.create(newMetadata(), account1)
        await nevermined.assets.create(newMetadata(), account1)
        await nevermined.assets.create(newMetadata(), account2)

        const { length: finalLength } = await nevermined.assets.ownerAssets(
            account2.getId()
        )

        assert.equal(finalLength - initialLength, 1)
    })

    it('should be able to transfer ownership', async () => {
        const { id } = await nevermined.assets.create(newMetadata(), account1)

        // transfer
        await nevermined.assets.transferOwnership(id, account2.getId())
        const newOwner = await nevermined.keeper.didRegistry.getDIDOwner(id)

        assert.equal(newOwner, account2.getId())
    })
})
