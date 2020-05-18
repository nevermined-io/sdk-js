import { assert, spy, use } from 'chai'
import spies from 'chai-spies'

import { SearchQuery } from '../../src/metadata/Metadata'
import { Nevermined } from '../../src/nevermined/Nevermined'
import config from '../config'

use(spies)

let nevermined: Nevermined

describe('Assets', () => {
    before(async () => {
        nevermined = await Nevermined.getInstance(config)
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#query()', () => {
        it('should search for assets', async () => {
            const query: SearchQuery = {
                offset: 100,
                page: 1,
                query: {
                    text: 'Office'
                },
                sort: {
                    created: -1
                }
            } as SearchQuery

            const assets = await nevermined.assets.query(query)

            assert(assets)
        })
    })

    describe('#search()', () => {
        it('should search for assets', async () => {
            const text = 'office'
            const assets = await nevermined.assets.search(text)

            assert(assets)
        })
    })
})
