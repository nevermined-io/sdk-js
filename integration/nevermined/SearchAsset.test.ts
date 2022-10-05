import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { generateMetadata } from '../utils'
import { Nevermined, Account, DDO, MetaData } from '../../src'

describe('Search Asset', () => {
    let nevermined: Nevermined

    let publisher: Account

    const testHash = Math.random().toString(36).substr(2)
    let price
    const metadataGenerator = (name: string, userId: string) => {
        const metadata = generateMetadata(`${name}${testHash}`, price) as MetaData
        metadata.userId = userId
        return metadata
    }

    let test1length
    let test2length
    let test3length
    let userId: string

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )

        await nevermined.marketplace.login(clientAssertion)

        const payload = decodeJwt(config.marketplaceAuthToken)

        userId = payload.sub
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
            await nevermined.assets.create(metadataGenerator('Test1', userId), publisher),
            DDO
        )
        assert.instanceOf(
            await nevermined.assets.create(metadataGenerator('Test2', userId), publisher),
            DDO
        )
        assert.instanceOf(
            await nevermined.assets.create(metadataGenerator('Test2', userId), publisher),
            DDO
        )
        assert.instanceOf(
            await nevermined.assets.create(metadataGenerator('Test3', userId), publisher),
            DDO
        )
        await new Promise(r => setTimeout(r, 1000))
    })

    it('should search by text and see the increment of DDOs', async () => {
        const result1 = await nevermined.assets.search(`Test2${testHash}`)
        assert.equal(
            result1.results.length - test2length,
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
        const { results: ddos } = await nevermined.assets.search(`Test2${testHash}`)

        assert.equal(ddos.length, 2)
        ddos.map(ddo =>
            assert.instanceOf(ddo, DDO, 'The DDO is not an instance of a DDO')
        )
    })
})
