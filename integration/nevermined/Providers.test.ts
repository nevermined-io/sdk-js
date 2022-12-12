import { decodeJwt } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import { AssetAttributes } from '../../src/models/AssetAttributes'

describe('Providers operations', () => {
    let nevermined: Nevermined

    let account1: Account
    let account2: Account
    let ddo: DDO

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account1, account2] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            account1
        )

        await nevermined.marketplace.login(clientAssertion)

        const metadata = getMetadata()
        const payload = decodeJwt(config.marketplaceAuthToken)
        metadata.userId = payload.sub

        ddo = await nevermined.assets.create(
            AssetAttributes.getInstance({ metadata }),
            account1
        )
    })

    it('should add and remove providers addresses', async () => {
        console.log(await nevermined.provider.list(ddo.id))
        await nevermined.provider.add(ddo.id, account2.getId(), account1)
        console.log(await nevermined.provider.list(ddo.id))
        await nevermined.provider.remove(ddo.id, account2.getId(), account1)
        console.log(await nevermined.provider.list(ddo.id))
    })
})
