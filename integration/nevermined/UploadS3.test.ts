import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { Nevermined, Account, DDO, MetaData } from '../../src'
import fs from 'fs'
import { getMetadata } from '../utils'

describe.skip('Uploading to S3', () => {
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

    it('should upload to S3', async () => {
        const file = fs.openSync(testPath, 'w')
        fs.writeSync(file, 'Hello, Nevermined!')
        const stream = fs.createReadStream(testPath)
        url = (await nevermined.files.uploadS3(stream)).url

        // cleanup file
        fs.unlinkSync(testPath)
    })

    it('should register an asset with an url', async () => {
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )

        await nevermined.marketplace.login(clientAssertion)

        const payload = decodeJwt(config.marketplaceAuthToken)
        metadata.userId = payload.sub

        metadata.main.files = [
            {
                index: 0,
                contentType: 'text/plain',
                url: url
            }
        ]
        ddo = await nevermined.assets.create(metadata as MetaData, publisher)
        assert.isDefined(ddo)
    })

    it('should download an asset with an url', async () => {
        const folder = '/tmp/output'
        const path = await nevermined.assets.download(ddo.id, publisher, folder, 0)

        assert.include(path, folder)
        const data = fs.readFileSync(`${path}data`)
        assert.equal(data.toString(), 'Hello, Nevermined!')
    })
})
