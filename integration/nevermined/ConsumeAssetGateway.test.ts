import { assert } from 'chai'
import * as fs from 'fs'

import { config } from '../config'
import { getMetadata } from '../utils'

import { Nevermined, Account, DDO } from '../../src'

describe('Consume Asset (Gateway)', () => {
    let nevermined: Nevermined

    let publisher: Account
    let consumer: Account

    let ddo: DDO
    let agreementId: string

    let metadata = getMetadata()

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()

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
            .create(metadata as any, publisher)
            .next(step => steps.push(step))

        assert.instanceOf(ddo, DDO)
        assert.deepEqual(steps, [0, 1, 2, 3, 4, 5, 6, 7])
    })

    it('should order the asset', async () => {
        const accessService = ddo.findServiceByType('access')

        try {
            await consumer.requestTokens(
                +metadata.main.price * 10 ** -(await nevermined.keeper.token.decimals())
            )
        } catch {}

        const steps = []
        agreementId = await nevermined.assets
            .order(ddo.id, accessService.index, consumer)
            .next(step => steps.push(step))

        assert.isDefined(agreementId)
        assert.deepEqual(steps, [0, 1, 2, 3])
    })

    it('should be able to download the asset if you are the owner', async()=> {
        const accessService = ddo.findServiceByType('access')

        const folder = '/tmp/nevermined/sdk-js'
        const path = await nevermined.assets.download(
            ddo.id,
            accessService.index,
            publisher,
            folder,
            -1,
            false
        )
        assert.include(path, folder, 'The storage path is not correct.')
        const files = await new Promise<string[]>(resolve => {
            fs.readdir(path, (e, fileList) => {
                resolve(fileList)
            })
        })

        assert.deepEqual(
            files,
            ['README.md', 'ddo-example.json'],
            'Stored files are not correct.'
        )

    })

    it('should consume and store the assets', async () => {
        const accessService = ddo.findServiceByType('access')

        const folder = '/tmp/nevermined/sdk-js'
        const path = await nevermined.assets.consume(
            agreementId,
            ddo.id,
            accessService.index,
            consumer,
            folder,
            -1,
            false
        )

        assert.include(path, folder, 'The storage path is not correct.')

        const files = await new Promise<string[]>(resolve => {
            fs.readdir(path, (e, fileList) => {
                resolve(fileList)
            })
        })

        assert.deepEqual(
            files,
            ['README.md', 'ddo-example.json'],
            'Stored files are not correct.'
        )
    })
})
