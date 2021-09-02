import { assert } from 'chai'
import {
    decryptKey,
    ecdh,
    encryptKey,
    hashKey,
    makeKey, secretToPublic
} from '../../src/utils/KeyTransfer'

describe.only('KeyTransfer', () => {
    describe('#makeKey()', () => {
        it("testing", async () => {
            let buyerK = makeKey("a b c")
            let providerK = makeKey("e f g")
            console.log('key', buyerK, providerK)
            let buyerPub = secretToPublic(buyerK)
            let providerPub = secretToPublic(providerK)
            console.log('public', buyerPub)

            let data = Buffer.from('12345678901234567890123456789012')
            let hash = hashKey(data)
            console.log(hash)

            let mimc_secret = ecdh(providerK, buyerPub)
            console.log(mimc_secret, ecdh(buyerK, providerPub))

            let cipher = encryptKey(data, mimc_secret)
            console.log('cipher', cipher)

            console.log('decrypted', decryptKey(cipher, mimc_secret).toString())
        })

    })

})
