import { assert } from 'chai'
import * as fs from 'fs'

import { config } from '../config'
import { getMetadata } from '../utils'

import { Nevermined, DDO, Account } from '../../src'

describe('Publisher Download Asset', () => {
    let nevermined: Nevermined

    let publisher: Account

    let metadata = getMetadata()

    let ddo: DDO

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher] = await nevermined.accounts.list()

        if (!nevermined.keeper.dispenser) {
            metadata = getMetadata(0)
        }
    })

    it('should register an asset', async () => {
        ddo = await nevermined.assets.create(metadata, publisher)

        assert.isDefined(ddo, 'Register has not returned a DDO')
        assert.match(ddo.id, /^did:nv:[a-f0-9]{64}$/, 'DDO id is not valid')
        assert.isAtLeast(ddo.authentication.length, 1, 'Default authentication not added')
        assert.isDefined(
            ddo.findServiceByType('access'),
            "DDO access service doesn't exist"
        )
    })

    it('should consume and store the assets', async () => {
        const folder = '/tmp/nevermined/sdk-js-1'
        const path = await nevermined.assets.download(ddo.id, publisher, folder)

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

    it('should consume and store one asset', async () => {
        const folder = '/tmp/nevermined/sdk-js-2'
        const path = await nevermined.assets.download(ddo.id, publisher, folder, 1)

        assert.include(path, folder, 'The storage path is not correct.')

        const files = await new Promise<string[]>(resolve => {
            fs.readdir(path, (e, fileList) => {
                resolve(fileList)
            })
        })

        assert.deepEqual(files, ['README.md'], 'Stored files are not correct.')
    })
})
