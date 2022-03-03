import { assert, spy, use } from 'chai'
import spies from 'chai-spies'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { Metadata, SearchQuery } from '../../src/metadata/Metadata'
import { DDO } from '../../src/ddo/DDO'
import DID from '../../src/nevermined/DID'
import config from '../config'

use(spies)

const reponsify = async (data) => ({
    ok: true,
    json: () => Promise.resolve(data)
})

describe('Metadata', () => {
    let nevermined: Nevermined
    let metadata: Metadata
    const getResults = (
        results: DDO[],
        page = 0,
        total_pages = 1,
        total_results = 1
    ) => ({
        results,
        page,
        total_pages,
        total_results
    })

    beforeEach(async () => {
        nevermined = await Nevermined.getInstance(config)
        metadata = nevermined.metadata // eslint-disable-line prefer-destructuring
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#queryMetadata()', () => {
        const query = {
            offset: 100,
            page: 1,
            query: {
                value: 1
            },
            sort: {
                value: 1
            },
            text: 'Office'
        } as SearchQuery

        it('should query metadata', async () => {
            spy.on(nevermined.utils.fetch, 'post', () =>
                reponsify(getResults([new DDO()]))
            )

            const result = await metadata.queryMetadata(query)
            assert.typeOf(result.results, 'array')
            assert.lengthOf(result.results, 1)
            assert.equal(result.page, 0)
            assert.equal(result.totalPages, 1)
            assert.equal(result.totalResults, 1)
        })

        it('should query metadata and return real ddo', async () => {
            spy.on(nevermined.utils.fetch, 'post', () =>
                reponsify(getResults([new DDO()]))
            )

            const result = await metadata.queryMetadata(query)
            assert.typeOf(result.results, 'array')
            assert.lengthOf(result.results, 1)
            assert.isDefined(result.results[0].findServiceByType)
        })
    })

    describe('#queryServiceMetadata()', () => {
        const query = {
            query: {
                bool: {
                    must: {
                        match: {
                            type: 'nft-sales'
                        }
                    }
                }
            }
        }

        it('should query metadata', async () => {
            spy.on(nevermined.utils.fetch, 'post', () =>
                reponsify([{ type: 'nft-sales' } as any])
            )

            const result = await metadata.queryServiceMetadata(query)
            assert.typeOf(result, 'array')
            assert.lengthOf(result, 1)
        })

        it('should query metadata and return real ddo', async () => {
            spy.on(nevermined.utils.fetch, 'post', () =>
                reponsify([{ type: 'nft-sales' } as any])
            )

            const result = await metadata.queryServiceMetadata(query)
            assert.typeOf(result, 'array')
            assert.lengthOf(result, 1)
            assert.isDefined(result[0].type)
        })
    })

    describe('#queryMetadataByText()', () => {
        const query = {
            offset: 100,
            page: 1,
            query: {
                value: 1
            },
            sort: {
                value: 1
            },
            text: 'Office'
        } as SearchQuery

        it('should query metadata by text', async () => {
            spy.on(nevermined.utils.fetch, 'get', () =>
                reponsify(getResults([new DDO()]))
            )

            const result = await metadata.queryMetadataByText(query)
            assert.typeOf(result.results, 'array')
            assert.lengthOf(result.results, 1)
            assert.equal(result.page, 0)
            assert.equal(result.totalPages, 1)
            assert.equal(result.totalResults, 1)
        })

        it('should query metadata and return real ddo', async () => {
            spy.on(nevermined.utils.fetch, 'get', () =>
                reponsify(getResults([new DDO()]))
            )

            const result = await metadata.queryMetadataByText(query)
            assert.typeOf(result.results, 'array')
            assert.lengthOf(result.results, 1)
            assert.isDefined(result.results[0].findServiceByType)
        })
    })

    describe('#storeDDO()', () => {
        it('should store a ddo', async () => {
            const did: DID = DID.generate()
            const ddo: DDO = new DDO({
                id: did.getId()
            })

            spy.on(nevermined.utils.fetch, 'post', () => reponsify(ddo))

            const result: DDO = await metadata.storeDDO(ddo)
            assert(result)
            assert(result.id === ddo.id)
        })
    })

    describe('#updateDDO()', () => {
        it('should update a ddo', async () => {
            const did: DID = DID.generate()
            const ddo: DDO = new DDO({
                id: did.getId(),
                created: '0'
            })

            spy.on(nevermined.utils.fetch, 'post', () => reponsify(ddo))

            const result: DDO = await metadata.storeDDO(ddo)
            assert(result)
            assert(result.id === ddo.id)

            const updatedDdo: DDO = new DDO({
                id: did.getId(),
                created: '1'
            })

            spy.on(nevermined.utils.fetch, 'put', () => reponsify(updatedDdo))
            const updatedResult: DDO = await metadata.updateDDO(did, ddo)

            assert(updatedResult)
            assert(updatedResult.id === ddo.id)
            assert(updatedResult.created === '1')
        })
    })

    describe('#retrieveDDO()', () => {
        it('should store a ddo', async () => {
            const did: DID = DID.generate()
            const ddo: DDO = new DDO({
                id: did.getId()
            })

            spy.on(nevermined.utils.fetch, 'post', () => reponsify(ddo))
            spy.on(nevermined.utils.fetch, 'get', () => reponsify(ddo))

            const storageResult: DDO = await metadata.storeDDO(ddo)
            assert(storageResult)

            assert(storageResult.id === did.getId())

            const restrieveResult: DDO = await metadata.retrieveDDO(did)
            assert(restrieveResult)

            assert(restrieveResult.id === did.getId())
            assert(restrieveResult.id === storageResult.id)
        })
    })
})
