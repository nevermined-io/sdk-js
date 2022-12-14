import { assert } from 'chai'
import { config } from '../config'
import { Nevermined, Account, Logger } from '../../src'

describe('Marketplace api auth', () => {
    let nevermined: Nevermined
    let account1: Account
    let account2: Account

    before(async () => {
        try {
            localStorage.clear()
        } catch(error) {
            Logger.error(error);
        }
        
        config.marketplaceAuthToken = undefined

        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account1, account2] = await nevermined.accounts.list()
    })

    it('should login in marketplace API', async () => {
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            account1
        )

        try {
            await nevermined.services.marketplace.login(clientAssertion)
            assert.equal(Boolean(config.marketplaceAuthToken), true)
        } catch (error) {
            assert.fail('should not fail')
        }
    })

    it('should add new address to the account', async () => {
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            account2
        )

        await nevermined.services.marketplace.addNewAddress(clientAssertion)
        assert.equal(Boolean(config.marketplaceAuthToken), true)
    })
})
