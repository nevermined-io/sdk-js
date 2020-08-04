import { assert, expect, spy, use } from 'chai'
import spies from 'chai-spies'

import Account from '../../src/nevermined/Account'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NeverminedSecretStore } from '../../src/nevermined/NeverminedSecretStore'
import config from '../config'

use(spies)

describe('Encrypt', () => {
    let secretStore: NeverminedSecretStore
    let accounts: Account[]

    let nevermined: Nevermined
    const digits = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
    let didHash = ''
    while( didHash.length < 64 ){

      didHash += digits[ Math.round( Math.random() * (digits.length-1) ) ]
    }
    const did = 'did:nv:' + didHash

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        secretStore = nevermined.secretStore
        accounts = await nevermined.accounts.list()
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#secretStore encrypt()', () => {
        it('should encrypt a content using Secret Store', async () => {
            const secretStoreEncryptSpy = spy.on(
                nevermined.gateway,
                'encrypt',
                () => 'encryptedResult'
            )

            const document = [{"url": "https://nevermined.io"}]
            const result = await nevermined.gateway.encrypt(did, document, 'SecretStore')

            expect(secretStoreEncryptSpy).to.have.been.called.with(did, document, 'SecretStore')

            assert.equal(result, 'encryptedResult', "Result doesn't match")
        })
    })

    describe('#RSA encrypt()', () => {
        it('should encrypt a content using RSA', async () => {
            const gatewayEncryptSpy = spy.on(
                nevermined.gateway,
                'encrypt',
                () => 'encryptedResult'
            )

            const result = await nevermined.gateway.encrypt(didHash, 'test', 'PSK-RSA')

            expect(gatewayEncryptSpy).to.have.been.called.with(didHash, 'test', 'PSK-RSA')

            assert.equal(result, 'encryptedResult', "Result doesn't match")
        })
    })

})
