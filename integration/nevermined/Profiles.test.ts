import { assert } from 'chai'
import { config } from '../config'
import { Nevermined, Account, Logger, NewProfile, State } from '../../src'
import { faker } from '@faker-js/faker'

describe('User Profiles', () => {
  let nevermined: Nevermined
  let account3: Account
  let newProfile: NewProfile
  let userId: string

  before(async () => {
    try {
      localStorage.clear()
    } catch (error) {
      Logger.error(error)
    }
    const profilesConfig = { ...config }
    profilesConfig.marketplaceAuthToken = undefined

    // const numAccounts = config.accounts.length
    profilesConfig.accounts = [config.accounts[6]]
    // profilesConfig.accounts = makeRandomAccounts()

    nevermined = await Nevermined.getInstance(profilesConfig)

    account3 = (await nevermined.accounts.list())[0] // eslint-disable-line prefer-destructuring

    //TODO admin token which will expire within 3 years. In the future an admin account will be created in elasticsearch directly to run theses tests
    profilesConfig.marketplaceAuthToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweGUyREQwOWQ3MTlEYTg5ZTVhM0QwRjI1NDljN0UyNDU2NmU5NDcyNjAiLCJzdWIiOiJ1LWU2YzI2NDhjLTIwZjktNDJlMC1iMWZlLWZjZWEwNzA4ODY3NyIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTY1MTI0ODM1NCwiZXhwIjoxNzUxMjUxOTU0fQ.p9fr_c_HVlJzY1cJSGDod1zMdhRCRWdExOB_UxMDrKg'

    newProfile = {
      nickname: faker.internet.userName(),
      email: faker.internet.email(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      isListed: true,
      addresses: [account3.getId()],
      state: State.Confirmed,
    }
  })

  it('should create a userProfile', async () => {
    const response = await nevermined.services.profiles.create(newProfile)

    userId = response.userId // eslint-disable-line prefer-destructuring

    assert.deepEqual(response, {
      ...newProfile,
      userId: userId,
      creationDate: response.creationDate,
      updateDate: response.updateDate,
    })
  })

  it('should get a profile by userId', async () => {
    const response = await nevermined.services.profiles.findOneByUserId(userId)

    assert.deepEqual(response, {
      ...newProfile,
      userId: response.userId,
      creationDate: response.creationDate,
      updateDate: response.updateDate,
    })
  })

  it('should get a profile by address', async () => {
    const response = await nevermined.services.profiles.findOneByAddress(account3.getId())

    assert.deepEqual(response, {
      userId: response.userId,
      name: response.name,
    })
  })

  it('should update a profile by userid', async () => {
    const response = await nevermined.services.profiles.update(userId, {
      isListed: false,
    })

    assert.deepEqual(response, {
      ...newProfile,
      userId: response.userId,
      isListed: false,
      creationDate: response.creationDate,
      updateDate: response.updateDate,
    })
  })

  it('should disable a profile by userId', async () => {
    const response = await nevermined.services.profiles.disableOneByUserId(userId)

    assert.deepEqual(response, {
      ...newProfile,
      userId: response.userId,
      state: State.Disabled,
      isListed: false,
      creationDate: response.creationDate,
      updateDate: response.updateDate,
    })
  })
})
