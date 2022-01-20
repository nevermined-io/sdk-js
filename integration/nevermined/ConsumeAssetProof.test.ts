import { assert } from 'chai'

import { config } from '../config'
import { getMetadata, getMetadataForDTP } from '../utils'

import { Nevermined, Account, DDO } from '../../src'

describe('Consume Asset (Gateway w/ proofs)', () => {
    let nevermined: Nevermined

    let publisher: Account
    let consumer: Account

    let ddo: DDO
    let agreementId: string

    const providerKey = {
        x: '0x2e3133fbdaeb5486b665ba78c0e7e749700a5c32b1998ae14f7d1532972602bb',
        y: '0x0b932f02e59f90cdd761d9d5e7c15c8e620efce4ce018bf54015d68d9cb35561'
    }

    const origPasswd = '0123254678901232546789012325467890123254678901232546789f'

    let metadata = getMetadataForDTP('foo' + Math.random(), origPasswd, providerKey)

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()
        consumer.babyX =
            '0x0d7cdd240c2f5b0640839c49fbaaf016a8c5571b8f592e2b62ea939063545981'
        consumer.babyY =
            '0x14b14fa0a30ec744dde9f32d519c65ebaa749bfe991a32deea44b83a4e5c65bb'
        consumer.babySecret = 'abd'

        if (!nevermined.keeper.dispenser) {
            metadata = getMetadata(0)
        }
    })

    after(() => {
        try {
            localStorage.clear()
        } catch {}
    })

    it('should fetch the RSA publicKey from the gateway', async () => {
        const rsaPublicKey = await nevermined.gateway.getRsaPublicKey()
        assert.isDefined(rsaPublicKey)
    })

    it('should authenticate the accounts', async () => {
        await publisher.authenticate()
        await consumer.authenticate()
    })

    it('should register an asset', async () => {
        const steps = []
        ddo = await nevermined.assets
            .create(metadata, publisher, undefined, ['access-proof'])
            .next(step => steps.push(step))

        assert.instanceOf(ddo, DDO)
        assert.deepEqual(steps, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    it('should order the asset', async () => {
        try {
            await consumer.requestTokens(
                +metadata.main.price * 10 ** -(await nevermined.keeper.token.decimals())
            )
        } catch {}

        const steps = []
        agreementId = await nevermined.assets
            .order(ddo.id, 'access-proof', consumer)
            .next(step => steps.push(step))

        assert.isDefined(agreementId)
        assert.deepEqual(steps, [0, 1, 2, 3])
    })

    it('should consume and store the assets', async () => {
        const passwd = await nevermined.assets.consumeProof(agreementId, ddo.id, consumer)
        assert.deepEqual(passwd, origPasswd)
    })
})
