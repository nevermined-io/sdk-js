import { assert } from 'chai'

import { Account, Nevermined } from '../../src'
import { config } from '../config'

describe('SignatureUtils', () => {
    const text = '0123456789abcde'
    const signature =
        '0xb76f14f0a1664d14a667a7647baee471f76796cff97a6e78f2884bed352dea2c11b89286811ccd5640bfdc8a567a7151e4450ad6bf889ed37d971a4f39ea79cb1b'
    let nevermined: Nevermined
    let account: Account

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[account] = await nevermined.accounts.list()
    })

    describe('#signText', () => {
        it('should sign a text as expected', async () => {
            const signed = await nevermined.utils.signature.signText(
                text,
                account.getId()
            )

            assert.equal(signed, signature)
        })
    })

    describe('#verifyText', () => {
        it('should recover the privateKey of a signed message', async () => {
            const verifiedPublicKey = await nevermined.utils.signature.verifyText(
                text,
                signature
            )

            assert.equal(account.getId(), verifiedPublicKey)
        })
    })
})
