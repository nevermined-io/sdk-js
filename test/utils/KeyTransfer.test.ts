import { assert } from 'chai'
import KeyTransfer from '../../src/utils/KeyTransfer'

describe('KeyTransfer', () => {
    const keyTransfer = new KeyTransfer()

    const buyerK = keyTransfer.makeKey('a b c')
    const providerK = keyTransfer.makeKey('e f g')
    let buyerPub
    let providerPub

    const data = Buffer.from('12345678901234567890123456789012')

    before(async () => {
        buyerPub = await keyTransfer.secretToPublic(buyerK)
        providerPub = await keyTransfer.secretToPublic(providerK)
    })

    describe('whole flow', () => {
        it('hashing works', async () => {
            assert.equal(
                await keyTransfer.hashKey(data),
                '0x0e7f3c2e154c0793d96cad8b90862d41f58f6e526b42241bcd0b0ccfca8ba4f2'
            )
        })
        it('can get the secret using ecdh', async () => {
            assert.equal(
                keyTransfer.ecdh(providerK, buyerPub),
                keyTransfer.ecdh(buyerK, providerPub)
            )
        })
        it('can encrypt and decrypt the key', async () => {
            const mimcSecret = await keyTransfer.ecdh(providerK, buyerPub)
            const cipher = await keyTransfer.encryptKey(data, mimcSecret)
            assert.equal(
                data.toString('hex'),
                keyTransfer.decryptKey(cipher, mimcSecret).toString('hex')
            )
        })
        it('proving works', async () => {
            await keyTransfer.prove(buyerPub, providerPub, providerK, data)
        })
    })
})
