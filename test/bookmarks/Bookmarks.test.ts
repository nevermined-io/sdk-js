import { assert, expect, spy, use } from 'chai'
import { faker } from '@faker-js/faker'
import spies from 'chai-spies'
import { Nevermined } from '../../src'
import { MarketplaceResults } from '../../src/common/interfaces'
import { Bookmarks } from '../../src/bookmarks/Bookmarks'
import { NewBookmark, Bookmark } from '../../src/bookmarks/Bookmarks.interfaces'
import config from '../config'

use(spies)

const reponsify = async data => ({
    ok: true,
    json: () => Promise.resolve(data)
})

describe('Bookmarks', () => {
    let nevermined: Nevermined
    let bookmarks: Bookmarks
    let newBookmark: NewBookmark
    let bookmark: Bookmark
    let bookmarksResults: MarketplaceResults<Bookmark>

    beforeEach(async () => {
        nevermined = await Nevermined.getInstance(config)
        bookmarks = nevermined.bookmarks // eslint-disable-line prefer-destructuring

        newBookmark = {
            did: `did:${faker.datatype.uuid()}`,
            userId: `us-${faker.datatype.uuid()}`,
            description: faker.lorem.sentence()
        }

        bookmark = {
            ...newBookmark,
            id: `bo-${faker.datatype.uuid()}`,
            createdAt: faker.date.recent()
        }

        /* eslint-disable @typescript-eslint/camelcase */
        bookmarksResults = {
            page: 1,
            results: [bookmark],
            total_pages: 1,
            total_results: 1
        }
    })

    afterEach(() => {
        spy.restore()
    })

    it('should create a bookmark', async () => {
        spy.on(nevermined.utils.fetch, 'post', () => {
            return reponsify(bookmark)
        })

        const result = await bookmarks.create(newBookmark)

        assert.equal(result, bookmark)
    })

    it('should get a bookmark by id', async () => {
        spy.on(nevermined.utils.fetch, 'get', () => {
            return reponsify(bookmark)
        })

        const result = await bookmarks.findOneById(bookmark.id)

        assert.equal(result, bookmark)
    })

    it('should get bookmarks by userId', async () => {
        spy.on(nevermined.utils.fetch, 'get', () => {
            return reponsify(bookmarksResults)
        })

        const result = await bookmarks.findManyByUserId(bookmark.userId)

        assert.equal(result, bookmarksResults)
    })

    it('should update a bookmark by id', async () => {
        const updatedBookmark = { ...bookmark, description: faker.lorem.sentence() }

        spy.on(nevermined.utils.fetch, 'put', () => {
            return reponsify(updatedBookmark)
        })

        const result = await bookmarks.updateOneById(bookmark.id, {
            description: updatedBookmark.description
        })

        assert.equal(result, updatedBookmark)
    })

    it('should delete a bookmark by id', async () => {
        const deleteBookmarkSpy = spy.on(nevermined.utils.fetch, 'delete', () => {
            return reponsify(undefined)
        })

        await bookmarks.deleteOneById(bookmark.id)

        expect(deleteBookmarkSpy).to.be.called()
    })
})
