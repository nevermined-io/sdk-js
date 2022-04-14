import { assert } from 'chai'
import { config } from '../config'
import { generateMetadata } from '../utils'
import { Nevermined, Account, DDO, MetaData } from '../../src'

describe('Search Asset', () => {
    let nevermined: Nevermined

    let publisher: Account

    const testHash = Math.random()
        .toString(36)
        .substr(2)
    let price
    const metadataGenerator = (name: string) =>
        generateMetadata(`${name}${testHash}`, price) as MetaData

    let test1length
    let test2length
    let test3length

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher] = await nevermined.accounts.list()
    })

    it('should be able to search the assets', async () => {
        const { results: ddos } = await nevermined.assets.search(`Test1${testHash}`)

        assert.isArray(ddos, 'A search should return an array')

        test1length = ddos.length
        test2length = (await nevermined.assets.search(`Test2${testHash}`)).results.length
        test3length = (await nevermined.assets.search(`Test3${testHash}`)).results.length

        if (!nevermined.keeper.dispenser) {
            price = 0
        }
    })

    it('should register an asset', async () => {
        assert.instanceOf(
            await nevermined.assets.create(metadataGenerator('Test1'), publisher),
            DDO
        )
        assert.instanceOf(
            await nevermined.assets.create(metadataGenerator('Test2'), publisher),
            DDO
        )
        assert.instanceOf(
            await nevermined.assets.create(metadataGenerator('Test2'), publisher),
            DDO
        )
        assert.instanceOf(
            await nevermined.assets.create(metadataGenerator('Test3'), publisher),
            DDO
        )
    })

    it('should search by text and see the increment of DDOs', async () => {
        assert.equal(
            (await nevermined.assets.search(`Test2${testHash}`)).results.length -
                test2length,
            2,
            'Something was wrong searching the assets'
        )
        assert.equal(
            (await nevermined.assets.search(`Test3${testHash}`)).results.length -
                test3length,
            1,
            'Something was wrong searching the assets'
        )
    })

    it('should return a list of DDOs', async () => {
        const { results: ddos } = await nevermined.assets.search(`Test1${testHash}`)

        assert.equal(
            ddos.length - test1length,
            1,
            'Something was wrong searching the assets'
        )
        ddos.map(ddo =>
            assert.instanceOf(ddo, DDO, 'The DDO is not an instance of a DDO')
        )
    })

    it('should be able to do a query to get a list of DDOs', async () => {
        const { results: ddos } = await nevermined.assets.query({
            page: 1,
            offset: 1,
            query: {},
            text: `Test2${testHash}`,
            sort: undefined
        })

        assert.equal(ddos.length, 1, 'Something was wrong searching the assets')
        ddos.map(ddo =>
            assert.instanceOf(ddo, DDO, 'The DDO is not an instance of a DDO')
        )
    })
})
