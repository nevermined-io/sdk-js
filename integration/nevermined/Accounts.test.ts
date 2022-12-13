import { assert, spy, use } from 'chai'
import spies from 'chai-spies'

import { Nevermined } from '../../src'
import { AccountsApi } from '../../src/nevermined/api/AccountsApi'
import { config } from '../config'

use(spies)

describe('Accounts', () => {
    let nevermined: Nevermined
    let accounts: AccountsApi

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;({ accounts } = await Nevermined.getInstance(config))
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#requestEthFromFaucet()', () => {
        it('should get eth in the account', async () => {
            const [account] = await accounts.list()
            spy.on(account, 'requestEthFromFaucet', () => true)
            const success = await accounts.requestEthFromFaucet(account.getId())

            // Can only request once every 24h
            if (!success) {
                try {
                    await nevermined.services.faucet.requestEth(account.getId())
                } catch (e) {
                    assert.include(await e.message, 'Already requested')
                }
            } else {
                assert.isTrue(success)
            }
        })
    })
})
