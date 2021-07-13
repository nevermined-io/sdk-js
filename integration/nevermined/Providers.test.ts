import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'

describe('Providers operations', () => {
    let nevermined: Nevermined

    let account1: Account
    let account2: Account
    let ddo: DDO

    let newMetadata = () => getMetadata()

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account1, account2] = await nevermined.accounts.list()

        if (!nevermined.keeper.dispenser) {
            newMetadata = () => getMetadata(0)
        }
        ddo = await nevermined.assets.create(newMetadata() as any, account1)
    })

    it('should add and remove providers addresses', async () => {
        console.log(await nevermined.provider.list(ddo.id))
        await nevermined.provider.add(ddo.id, account2.getId(), account1)
        console.log(await nevermined.provider.list(ddo.id))
        await nevermined.provider.remove(ddo.id, account2.getId(), account1)
        console.log(await nevermined.provider.list(ddo.id))
    })
})
