import { assert } from 'chai'
import { makeKeyTransfer } from '../../src/utils/KeyTransfer'

describe('KeyTransfer', () => {
    let keyTransfer

    let buyerK
    let providerK
    let buyerPub
    let providerPub

    const data = Buffer.from('12345678901234567890123456789012')

    before(async () => {
        keyTransfer = await makeKeyTransfer()
        buyerK = await keyTransfer.makeKey('a b c')
        providerK = await keyTransfer.makeKey('e f g')
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
                await keyTransfer.ecdh(providerK, buyerPub),
                await keyTransfer.ecdh(buyerK, providerPub)
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
