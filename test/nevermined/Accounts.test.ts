import { assert, spy, use } from 'chai'
import spies from 'chai-spies'

import config from '../config'
import Account from '../../src/nevermined/Account'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { Accounts } from '../../src/nevermined/Accounts'

use(spies)

describe('Accounts', () => {
    let accounts: Accounts

    before(async () => {
        accounts = (await Nevermined.getInstance(config)).accounts
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#list()', () => {
        it('should return the list of accounts', async () => {
            const accountsList = await accounts.list()

            accountsList.map(account => assert.instanceOf(account, Account))
        })
    })

    describe('#balance()', () => {
        it('should return the balance of an account', async () => {
            const [account] = await accounts.list()
            spy.on(account, 'getBalance', () => ({ eth: 1, ocn: 5 }))
            const balance = await accounts.balance(account)

            assert.deepEqual(balance, { eth: 1, ocn: 5 })
        })
    })

    describe('#requestTokens()', () => {
        it('should return the balance of an account', async () => {
            const [account] = await accounts.list()
            spy.on(account, 'requestTokens', () => 10)
            const success = await accounts.requestTokens(account, 10)

            assert.isTrue(success)
        })
    })
})
