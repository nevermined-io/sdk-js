import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { Nevermined, Account, DDO, MetaData } from '../../src'
import fs from 'fs'
import { getMetadata } from '../utils'
import '../globals'
import { WebApiFile } from '../../src/nevermined/utils/WebServiceConnector'

describe('Filecoin Integration', () => {
    let nevermined: Nevermined
    let publisher: Account
    const metadata = getMetadata()
    let ddo: DDO
    let userId: string

    const testPath = '/tmp/test.txt'
    let url: string

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[publisher] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )

        await nevermined.marketplace.login(clientAssertion)

        const payload = decodeJwt(config.marketplaceAuthToken)
        userId = payload.sub
    })

    it('should upload to Filecoin', async () => {
        const file = fs.openSync(testPath, 'w')
        fs.writeSync(file, 'Hello, Nevermined!')
        const stream = fs.createReadStream(testPath)
        ;({ url } = await nevermined.files.uploadFilecoin(stream))

        assert.equal(url, 'cid://bafkqaesimvwgy3zmebhgk5tfojwws3tfmqqq')

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
        metadata.userId = userId
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
        const data = fs.readFileSync(`${path}bafkqaesimvwgy3zmebhgk5tfojwws3tfmqqq`)
        assert.equal(data.toString(), 'Hello, Nevermined!')
    })

    it('should get a file asset object with a cid://', async () => {
        const result = (await nevermined.assets.download(
            ddo.id,
            publisher,
            undefined,
            0,
            false
        )) as WebApiFile[]

        assert.equal(result[0].name, 'bafkqaesimvwgy3zmebhgk5tfojwws3tfmqqq')
    })

    it('should register an asset with a cid:// and filename', async () => {
        metadata.userId = userId
        metadata.main.files = [
            {
                index: 0,
                contentType: 'text/plain',
                url: url,
                name: 'test.txt'
            }
        ]

        ddo = await nevermined.assets.create(metadata as MetaData, publisher)
        assert.isDefined(ddo)
    })

    it('should download an asset with a cid:// and filename', async () => {
        const folder = '/tmp/output'
        const path = await nevermined.assets.download(ddo.id, publisher, folder, 0)

        assert.include(path, folder)
        const data = fs.readFileSync(`${path}test.txt`)
        assert.equal(data.toString(), 'Hello, Nevermined!')
    })

    it('should get a file asset object with a cid:// and filename', async () => {
        const result = (await nevermined.assets.download(
            ddo.id,
            publisher,
            undefined,
            0,
            false
        )) as WebApiFile[]

        assert.equal(result[0].name, 'test.txt')
    })
})
