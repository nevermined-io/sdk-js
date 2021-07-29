import { assert } from 'chai'
import * as fs from 'fs'

import { config } from '../config'
import { getMetadata } from '../utils'

import { Nevermined, Account, DDO } from '../../src'

// Ensure that your network is fast enought and you have some free ram before run it.
xdescribe('Consume Asset (Large size)', () => {
    let nevermined: Nevermined

    let publisher: Account
    let consumer: Account

    let ddo: DDO
    let agreementId: string

    let baseMetadata = getMetadata()
    let metadata = getMetadata()

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()

        if (!nevermined.keeper.dispenser) {
            baseMetadata = getMetadata(0)
        }
        metadata = {
            ...baseMetadata,
            main: {
                ...baseMetadata.main,
                files: [
                    {
                        index: 0,
                        contentType: 'hello/hello',
                        url: 'https://speed.hetzner.de/1GB.bin'
                    }
                ]
            }
        }
    })

    it('should register an asset', async () => {
        ddo = await nevermined.assets.create(metadata as any, publisher)

        assert.instanceOf(ddo, DDO)
    })

    it('should order the asset', async () => {
        try {
            await consumer.requestTokens(
                +metadata.main.price * 10 ** -(await nevermined.keeper.token.decimals())
            )
        } catch {}

        agreementId = await nevermined.assets.order(ddo.id, 'access', consumer)

        assert.isDefined(agreementId)
    })

    it('should consume and store the assets', async () => {
        const folder = '/tmp/nevermined/sdk-js'
        const path = await nevermined.assets.consume(
            agreementId,
            ddo.id,
            consumer,
            folder
        )

        assert.include(path, folder, 'The storage path is not correct.')

        const files = await new Promise<string[]>(resolve => {
            fs.readdir(path, (e, fileList) => {
                resolve(fileList)
            })
        })

        assert.deepEqual(files, ['1GB.bin'], 'Stored files are not correct.')
    })
})
