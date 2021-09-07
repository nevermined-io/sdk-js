import { assert } from 'chai'
import {
    decryptKey,
    ecdh,
    encryptKey,
    hashKey,
    makeKey,
    prove,
    secretToPublic
} from '../../src/utils/KeyTransfer'

describe('KeyTransfer', () => {
    const buyerK = makeKey('a b c')
    const providerK = makeKey('e f g')
    const buyerPub = secretToPublic(buyerK)
    const providerPub = secretToPublic(providerK)

    const data = Buffer.from('12345678901234567890123456789012')
    describe('whole flow', () => {
        it('hashing works', async () => {
            assert.equal(
                hashKey(data),
                '0x0e7f3c2e154c0793d96cad8b90862d41f58f6e526b42241bcd0b0ccfca8ba4f2'
            )
        })
        it('can get the secret using ecdh', async () => {
            assert.equal(ecdh(providerK, buyerPub), ecdh(buyerK, providerPub))
        })
        it('can encrypt and decrypt the key', async () => {
            const mimcSecret = ecdh(providerK, buyerPub)
            const cipher = encryptKey(data, mimcSecret)
            assert.equal(
                data.toString('hex'),
                decryptKey(cipher, mimcSecret).toString('hex')
            )
        })
        it('proving works', async () => {
            await prove(buyerPub, providerPub, providerK, data)
        })
    })
})
