import { assert } from 'chai'
import { config } from '../config'
import { Nevermined, Account, DDO } from '../../src'
import fs from 'fs'
import { getMetadata } from '../utils'

// Skipped because it requires powergate in the CI
describe.skip('Filecoin Integration', () => {
    let nevermined: Nevermined
    let publisher: Account
    const metadata = getMetadata()
    let ddo: DDO

    const testPath = '/tmp/test.txt'
    let url: string

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        ;[publisher] = await nevermined.accounts.list()
    })

    it('should upload to Filecoin', async () => {
        const file = fs.openSync(testPath, 'w')
        fs.writeSync(file, 'Hello, Nevermined!')
        const stream = fs.createReadStream(testPath)
        url = await nevermined.files.uploadFilecoin(stream)

        assert.equal(url, 'cid://QmSJA3xNH62sj4xggZZzCp2VXpsXbkR9zYoqNYXp3c4xuN')

        // cleanup file
        fs.unlinkSync(testPath)
    })

    it('should register an asset with a cid://', async () => {
        metadata.main.files = [
            {
                index: 0,
                contentType: 'text/plain',
                url: url
            }
        ]
        ddo = await nevermined.assets.create(metadata as any, publisher)
        assert.isDefined(ddo)
    })

    it('should download an asset with a cid://', async () => {
        const accessService = ddo.findServiceByType('access')
        const folder = '/tmp/output'
        const path = await nevermined.assets.download(
            ddo.id,
            accessService.index,
            publisher,
            folder,
            0
        )

        assert.include(path, folder)
        const data = fs.readFileSync(`${path}0`)
        assert.equal(data.toString(), 'Hello, Nevermined!')
    })
})