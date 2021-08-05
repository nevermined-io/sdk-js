import { assert, spy, use } from 'chai'
import spies from 'chai-spies'

import { Accounts } from '../../src/nevermined/Accounts'
import { Nevermined } from '../../src'
import { config } from '../config'

use(spies)

describe('Accounts', () => {
    let accounts: Accounts

    before(async () => {
        accounts = (await Nevermined.getInstance(config)).accounts
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#requestEthFromFaucet()', () => {
        it('should get eth in the account', async () => {
            const [account] = await accounts.list()
            spy.on(account, 'requestEthFromFaucet', () => true)
            const success = await accounts.requestEthFromFaucet(account.getId())

            assert.isTrue(success)
        })
    })
})
