import { assert, spy, use } from 'chai'
import spies from 'chai-spies'

import config from '../config'
import { Account } from '../../src/nevermined'
import { Nevermined } from '../../src/nevermined'
import { BigNumber } from '../../src/utils'
import { AccountsApi } from '../../src/nevermined'

use(spies)

describe('Accounts', () => {
    let accounts: AccountsApi

    before(async () => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;({ accounts } = await Nevermined.getInstance(config))
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
            spy.on(account, 'getBalance', () => ({
                eth: BigNumber.from(1),
                nevermined: BigNumber.from(5)
            }))
            const balance = await accounts.balance(account)

            assert.deepEqual(balance, {
                eth: BigNumber.from(1),
                nevermined: BigNumber.from(5)
            })
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
