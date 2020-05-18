import { assert, expect, spy, use } from 'chai'
import spies from 'chai-spies'

import Account from '../../src/nevermined/Account'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NeverminedSecretStore } from '../../src/nevermined/NeverminedSecretStore'
import config from '../config'

use(spies)

describe('SecretStore', () => {
    let secretStore: NeverminedSecretStore
    let accounts: Account[]

    let nevermined: Nevermined
    const did = 'a'.repeat(64)

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        secretStore = nevermined.secretStore
        accounts = await nevermined.accounts.list()
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#encrypt()', () => {
        it('should encrypt a content', async () => {
            const secretStoreEncryptSpy = spy.on(
                nevermined.gateway,
                'encrypt',
                () => 'encryptedResult'
            )

            const result = await secretStore.encrypt(did, 'test', accounts[0])

            expect(secretStoreEncryptSpy).to.have.been.called.with(did, 'test')

            assert.equal(result, 'encryptedResult', "Result doesn't match")
        })
    })
})
