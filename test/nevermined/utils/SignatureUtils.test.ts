import { assert, expect, spy, use } from 'chai'
import spies from 'chai-spies'
import config from '../../config'

import { Nevermined } from '../../../src/nevermined/Nevermined'
import { ethers } from 'ethers'

use(spies)

describe('SignatureUtils', () => {
    const publicKey = `0x${'a'.repeat(40)}`
    const text = '0123456789abcde'
    const signature = `0x${'a'.repeat(130)}`
    let nevermined: Nevermined

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#signText', () => {
        it('should sign a text as expected', async () => {
            const signed = await nevermined.utils.signature.signText(text, publicKey)

            assert.equal(signed, signature)
        })

        it('should sign a text as expected using password', async () => {
            const signed = await nevermined.utils.signature.signText(text, publicKey)

            assert.equal(signed, signature)
        })
    })

    describe('#verifyText', () => {
        it('should recover the privateKey of a signed message', async () => {
            const personalRecoverSpy = spy.on(
                ethers.utils,
                'verifyMessage',
                () => publicKey
            )

            const verifiedPublicKey = await nevermined.utils.signature.verifyText(
                text,
                signature
            )

            assert.equal(publicKey, verifiedPublicKey)
            expect(personalRecoverSpy).to.have.been.called.with(text, signature)
        })
    })
})
