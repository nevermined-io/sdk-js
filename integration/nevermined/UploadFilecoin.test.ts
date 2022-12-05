import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { Nevermined, Account, DDO, MetaData } from '../../src'
import fs from 'fs'
import { getMetadata } from '../utils'
import '../globals'

describe('Filecoin Integration', () => {
    let nevermined: Nevermined
    let publisher: Account
    const metadata = getMetadata()
    let ddo: DDO

    const TEST_CID_HASH = 'bafkreigxr4y6aqzsgmpicz47pl4pn2j3okpd672yvbrq7xo5hxt7fnmxuq'
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
        ;({ url } = await nevermined.files.uploadFilecoin(stream))

        assert.equal(url, `cid://${TEST_CID_HASH}`)

        // cleanup file
        fs.unlinkSync(testPath)
    })

    it('should upload to Filecoin (encrypted)', async () => {
        const file = fs.openSync(testPath, 'w')
        fs.writeSync(file, 'Hello, Nevermined!')
        const stream = fs.createReadStream(testPath)
        const response = await nevermined.files.uploadFilecoin(stream, true)

        assert.isDefined(response.password)

        // cleanup file
        fs.unlinkSync(testPath)
    })

    it('should register an asset with a cid://', async () => {
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

    it('should download an asset with a cid://', async () => {
        const folder = '/tmp/output'
        const path = await nevermined.assets.download(ddo.id, publisher, folder, 0)

        assert.include(path, folder)
        const data = fs.readFileSync(`${path}${TEST_CID_HASH}`)
        assert.equal(data.toString(), 'Hello, Nevermined!')
    })

    it('should get a file asset object with a cid://', async () => {
        const result = (await nevermined.assets.download(
            ddo.id,
            publisher,
            undefined,
            0,
            false
        )) as File[]

        assert.equal(result[0].name, TEST_CID_HASH)
    })
})
