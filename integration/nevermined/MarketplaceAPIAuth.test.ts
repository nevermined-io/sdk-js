import { assert } from 'chai'
import { config } from '../config'
import { Nevermined, Account } from '../../src'

describe('Marketplace api auth', () => {
    let nevermined: Nevermined
    let account1: Account

    before(async () => {
        try {
            localStorage.clear()
        } catch {}
        config.marketplaceAuthToken = undefined

        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account1] = await nevermined.accounts.list()
    })

    it('should login in marketplace API', async () => {
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            account1
        )

        try {
            await nevermined.marketplace.login(clientAssertion)
            assert.equal(Boolean(config.marketplaceAuthToken), true)
        } catch (error) {
            assert.fail('should not fail')
        }
    })
})
