import { assert } from 'chai'
import { config } from '../config'
import { Nevermined } from '../../src'
import fs from 'fs'
import temp from 'temp'

// Skipped because it requires powergate in the CI
describe.skip('Upload to Filecoin', () => {
    let nevermined: Nevermined

    before(async () => {
        try {
            localStorage.clear()
        } catch {}

        nevermined = await Nevermined.getInstance(config)
    })

    after(async () => {
        try {
            localStorage.clear()
        } catch {}
    })

    it('should upload to Filecoin', async () => {
        temp.track()
        temp.open('test.txt', async (_err, info) => {
            fs.writeSync(info.fd, 'Hello, Nevermined!')
            const stream = fs.createReadStream(info.path)
            const url = await nevermined.files.uploadFilecoin(stream)

            assert.equal(url, 'cid://QmSJA3xNH62sj4xggZZzCp2VXpsXbkR9zYoqNYXp3c4xuN')
        })
    })
})