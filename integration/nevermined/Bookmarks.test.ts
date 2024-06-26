import { assert } from 'chai'
import config from '../../test/config'
import { faker } from '@faker-js/faker'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { NewBookmark } from '../../src/types/MetadataTypes'

describe('Bookmarks', () => {
  let nevermined: Nevermined
  let account1: NvmAccount
  let newBookmark: NewBookmark
  let id: string

  before(async () => {
    config.marketplaceAuthToken = undefined

    nevermined = await Nevermined.getInstance(config)
    ;[account1] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account1)

    await nevermined.services.marketplace.login(clientAssertion)

    const userProfile = await nevermined.services.profiles.findOneByAddress(account1.getId())

    newBookmark = {
      did: `did:${faker.datatype.uuid()}`,
      userId: userProfile.userId,
      description: faker.lorem.sentence(),
    }
  })

  it('should create a bookmark', async () => {
    const response = await nevermined.services.bookmarks.create(newBookmark)

    id = response.id // eslint-disable-line prefer-destructuring

    assert.deepEqual(response, {
      ...newBookmark,
      createdAt: response.createdAt,
      id,
    })
  })

  it('should get a bookmark by id', async () => {
    const response = await nevermined.services.bookmarks.findOneById(id)

    assert.deepEqual(response, {
      ...newBookmark,
      createdAt: response.createdAt,
      id,
    })
  })

  it('should get bookmarks by userId', async () => {
    const response = await nevermined.services.bookmarks.findManyByUserId(newBookmark.userId)

    /* eslint-disable @typescript-eslint/naming-convention */
    assert.deepEqual(response, {
      page: 1,
      total_pages: response.total_pages,
      total_results: response.total_results,
      results: [{ ...newBookmark, createdAt: response.results[0].createdAt, id }],
    })
  })

  it('should update a bookmark by id', async () => {
    const description = faker.lorem.sentence()
    const response = await nevermined.services.bookmarks.updateOneById(id, {
      description,
      userId: newBookmark.userId,
    })

    assert.deepEqual(response, {
      ...newBookmark,
      id,
      description,
      createdAt: response.createdAt,
    })
  })

  it('should delete a bookmark by id', async () => {
    await nevermined.services.bookmarks.deleteOneById(id)

    const response = await nevermined.services.bookmarks.findManyByUserId(newBookmark.userId)

    /* eslint-disable @typescript-eslint/naming-convention */
    assert.deepEqual(response, {
      page: 1,
      total_pages: response.total_pages,
      total_results: { value: 0, relation: 'eq' },
      results: [],
    })
  })
})
