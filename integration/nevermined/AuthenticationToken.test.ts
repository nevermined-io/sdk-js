import { assert } from 'chai'
import { config } from '../config'
import { Nevermined, Account } from '../../src'

describe('Authentication Token', () => {
    let nevermined: Nevermined

    let account1: Account
    let account2: Account

    before(async () => {
        try {
            localStorage.clear()
        } catch {}

        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account1, account2] = await nevermined.accounts.list()
    })

    after(async () => {
        try {
            localStorage.clear()
        } catch {}
    })

    it('should generate a token', async () => {
        const token = await nevermined.auth.get(account1)

        assert.match(token, /^0x[a-f0-9]{130}-[0-9]{0,14}/i)
    })

    it('should return the account that signed the token', async () => {
        const token = await nevermined.auth.get(account1)

        const address = await nevermined.auth.check(token)

        assert.equal(address, account1.getId())
    })

    it('should store the token for a user', async () => {
        assert.isUndefined(await account1.getToken())

        await nevermined.auth.store(account1)

        assert.match(await account1.getToken(), /^0x[a-f0-9]{130}-[0-9]{0,14}/i)
    })

    it('should restore the token for a user', async () => {
        const token = await nevermined.auth.restore(account1)

        assert.match(token, /^0x[a-f0-9]{130}-[0-9]{0,14}/i)
    })

    it('should return undefined when is not stored', async () => {
        const token = await nevermined.auth.restore(account2)

        assert.isUndefined(token)
    })

    it('should know if the token is stored', async () => {
        let acc1Stored: boolean
        let acc2Stored: boolean

        // eslint-disable-next-line
        acc1Stored = await nevermined.auth.isStored(account1)
        acc2Stored = await nevermined.auth.isStored(account2)

        assert.isTrue(acc1Stored)
        assert.isTrue(await account1.isTokenStored())
        assert.isFalse(acc2Stored)
        assert.isFalse(await account2.isTokenStored())

        await account2.authenticate()

        acc2Stored = await nevermined.auth.isStored(account2)
        assert.isTrue(acc2Stored)
        assert.isTrue(await account2.isTokenStored())
    })
})
