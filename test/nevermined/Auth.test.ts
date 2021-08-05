import { assert, expect, spy, use } from 'chai'
import spies from 'chai-spies'

import config from '../config'
import Account from '../../src/nevermined/Account'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { Auth } from '../../src/nevermined/Auth'
import Web3 from 'web3'

use(spies)

describe('Auth', () => {
    let auth: Auth
    let account: Account
    let web3: Web3

    before(async () => {
        const nevermined = await Nevermined.getInstance(config)
        auth = nevermined.auth
        account = (await nevermined.accounts.list())[0]
        web3 = (nevermined as any).web3
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#get()', () => {
        it('should return the token for a account', async () => {
            const token = await auth.get(account)

            assert.match(token, /^0x[a-f0-9]{130}-[0-9]{0,14}/i)
        })
    })

    // Not valid using providers without support for `personal_ecRecover`
    describe('#check()', () => {
        it('should return the account of a signature', async () => {
            const token = await auth.get(account)

            spy.on(web3.eth.personal, 'ecRecover', () => account.getId())

            const address = await auth.check(token)

            assert.equal(address, account.getId())
        })

        it('should return empty address if the token is expired', async () => {
            const token = [
                '0x0cfe59ce5c35461728b4126431096e4e021a842ca1f679532c537be5f895a3607e498',
                'f2cc22f787f9c7c8a967c346d717ef50ccb9f0af418d87a86dad899e6d61b-1234567890'
            ].join('')

            const address = await auth.check(token)

            assert.equal(address, `0x${'0'.repeat(40)}`)
        })
    })

    describe('#store()', () => {
        it('should sign and store the token', async () => {
            const writeTokenSpy = spy.on(auth as any, 'writeToken', () => null)

            await auth.store(account)

            expect(writeTokenSpy).to.has.been.called()
        })
    })

    describe('#restore()', () => {
        it('should return a stored token', async () => {
            spy.on(auth as any, 'readToken', () => 'token')
            spy.on(auth as any, 'check', () => account.getId())

            const token = await auth.restore(account)

            assert.equal(token, 'token')
        })

        it('should not return values if there is any error', async () => {
            spy.on(auth as any, 'readToken', () => 'token')
            spy.on(auth as any, 'check', () => '0x...')

            const token = await auth.restore(account)

            assert.isUndefined(token)
        })
    })

    describe('#isStored()', () => {
        it('should know if the token is stored', async () => {
            spy.on(auth as any, 'restore', () => account.getId())

            const isStored = await auth.isStored(account)

            assert.isTrue(isStored)
        })

        it('should know if the token is not stored', async () => {
            spy.on(auth as any, 'restore', () => undefined)

            const isStored = await auth.isStored(account)

            assert.isFalse(isStored)
        })
    })
})
