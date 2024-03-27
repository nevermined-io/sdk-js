import { assert, expect, spy, use } from 'chai'
import { faker } from '@faker-js/faker'
import spies from 'chai-spies'
import { MarketplaceResults, Nevermined } from '../../src'
import config from '../config'
import { Bookmark, Bookmarks, NewBookmark } from '../../src/services'
import TestContractHandler from '../keeper/TestContractHandler'

use(spies)

const reponsify = async (data) => ({
  ok: true,
  json: () => Promise.resolve(data),
})

describe('Bookmarks', () => {
  let nevermined: Nevermined
  let bookmarks: Bookmarks
  let newBookmark: NewBookmark
  let bookmark: Bookmark
  let bookmarksResults: MarketplaceResults<Bookmark>

  before(async () => {
    await TestContractHandler.prepareContracts()
    nevermined = await Nevermined.getInstance(config)
  })

  beforeEach(async () => {
    bookmarks = nevermined.services.bookmarks // eslint-disable-line prefer-destructuring

    newBookmark = {
      did: `did:${faker.datatype.uuid()}`,
      userId: `us-${faker.datatype.uuid()}`,
      description: faker.lorem.sentence(),
    }

    bookmark = {
      ...newBookmark,
      id: `bo-${faker.datatype.uuid()}`,
      createdAt: faker.date.recent(),
    }

    /* eslint-disable @typescript-eslint/naming-convention */
    bookmarksResults = {
      page: 1,
      results: [bookmark],
      total_pages: 1,
      total_results: { value: 1, relation: 'eq' },
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
      description: updatedBookmark.description,
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
