import { assert } from 'chai'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, Config } from '../../src'
import { decodeJwt } from 'jose'
import { MetaData } from '../../src'

describe('Asset Owners', () => {
    let nevermined: Nevermined
    let nevermined2: Nevermined
    let config2: Config

    let account1: Account
    let account2: Account

    let newMetadata: (token: string) => MetaData

    before(async () => {
        config2 = { ...config }
        nevermined = await Nevermined.getInstance(config)
        nevermined2 = await Nevermined.getInstance(config2)

        // Accounts
        ;[account1, account2] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            account1
        )

        const clientAssertion2 = await nevermined2.utils.jwt.generateClientAssertion(
            account2
        )

        await nevermined.marketplace.login(clientAssertion)
        await nevermined2.marketplace.login(clientAssertion2)

        newMetadata = (token: string) => {
            const metadata = getMetadata()
            const jwtPayload = decodeJwt(token)
            metadata.userId = jwtPayload.sub
            return metadata
        }
    })

    it('should set the owner of an asset', async () => {
        const ddo = await nevermined.assets.create(
            newMetadata(config.marketplaceAuthToken),
            account1
        )
        const owner = await nevermined.assets.owner(ddo.id)

        assert.equal(owner, account1.getId())
    })

    it('should set the provider of an asset', async () => {
        const ddo = await nevermined.assets.create(
            newMetadata(config.marketplaceAuthToken),
            account1
        )

        const isProvider = await nevermined.keeper.didRegistry.isDIDProvider(
            ddo.id,
            config.gatewayAddress
        )

        assert.isTrue(isProvider)
    })

    it('should be added correctly a permission on an asset', async () => {
        const ddo = await nevermined.assets.create(
            newMetadata(config.marketplaceAuthToken),
            account1
        )

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

        await nevermined.assets.create(newMetadata(config.marketplaceAuthToken), account1)
        await nevermined.assets.create(newMetadata(config.marketplaceAuthToken), account1)
        await nevermined2.assets.create(
            newMetadata(config2.marketplaceAuthToken),
            account2
        )

        // wait a bit for the subgraph to index the events
        await new Promise(r => setTimeout(r, 5000))

        const { length: finalLength } = await nevermined.assets.ownerAssets(
            account2.getId()
        )

        assert.equal(finalLength - initialLength, 1)
    })

    it('should be able to transfer ownership', async () => {
        const { id } = await nevermined.assets.create(
            newMetadata(config.marketplaceAuthToken),
            account1
        )

        // transfer
        await nevermined.assets.transferOwnership(id, account2.getId())
        const newOwner = await nevermined.keeper.didRegistry.getDIDOwner(id)

        assert.equal(newOwner, account2.getId())
    })
})
