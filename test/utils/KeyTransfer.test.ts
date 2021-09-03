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
    describe('#makeKey()', () => {
        it('testing', async () => {
            const buyerK = makeKey('a b c')
            const providerK = makeKey('e f g')
            console.log('key', buyerK, providerK)
            const buyerPub = secretToPublic(buyerK)
            const providerPub = secretToPublic(providerK)
            console.log('public', buyerPub)

            const data = Buffer.from('12345678901234567890123456789012')
            const hash = hashKey(data)
            console.log(hash)

            const mimcSecret = ecdh(providerK, buyerPub)
            console.log(mimcSecret, ecdh(buyerK, providerPub))

            const cipher = encryptKey(data, mimcSecret)
            console.log('cipher', cipher)

            console.log('decrypted', decryptKey(cipher, mimcSecret).toString())

            console.log(await prove(buyerPub, providerPub, providerK, data))
        })
    })
})
