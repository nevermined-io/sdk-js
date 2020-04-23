import { assert } from 'chai'
import * as fs from 'fs'

import { config } from '../config'
import { getMetadata } from '../utils'

import { Ocean, Account, DDO } from '../../src' // @oceanprotocol/squid

// Ensure that your network is fast enought and you have some free ram before run it.
xdescribe('Consume Asset (Large size)', () => {
    let ocean: Ocean

    let publisher: Account
    let consumer: Account

    let ddo: DDO
    let agreementId: string

    let baseMetadata = getMetadata()
    let metadata = getMetadata()

    before(async () => {
        ocean = await Ocean.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await ocean.accounts.list()

        if (!ocean.keeper.dispenser) {
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

    it('should regiester an asset', async () => {
        ddo = await ocean.assets.create(metadata as any, publisher)

        assert.instanceOf(ddo, DDO)
    })

    it('should order the asset', async () => {
        const accessService = ddo.findServiceByType('access')

        try {
            await consumer.requestTokens(
                +metadata.main.price * 10 ** -(await ocean.keeper.token.decimals())
            )
        } catch {}

        agreementId = await ocean.assets.order(ddo.id, accessService.index, consumer)

        assert.isDefined(agreementId)
    })

    it('should consume and store the assets', async () => {
        const accessService = ddo.findServiceByType('access')

        const folder = '/tmp/ocean/squid-js'
        const path = await ocean.assets.consume(
            agreementId,
            ddo.id,
            accessService.index,
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
