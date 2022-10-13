import { assert } from 'chai'
import { config } from '../config'
import { Nevermined, Account, Logger } from '../../src'
import { NewProfile, State } from '../../src/profiles/Profiles.interfaces'
import { faker } from '@faker-js/faker'
import { sleep } from '../utils/utils'

describe('User Profiles', () => {
    let nevermined: Nevermined
    let account3: Account
    let newProfile: NewProfile
    let userId: string

    before(async () => {
        try {
            localStorage.clear()
        } catch(error) {
            Logger.error(error);
        }
        config.marketplaceAuthToken = undefined

        nevermined = await Nevermined.getInstance(config)
        account3 = (await nevermined.accounts.list())[2] // eslint-disable-line prefer-destructuring

        //TODO admin token which will expire within 3 years. In the future an admin account will be created in elasticsearch directly to run theses tests
        config.marketplaceAuthToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweGUyREQwOWQ3MTlEYTg5ZTVhM0QwRjI1NDljN0UyNDU2NmU5NDcyNjAiLCJzdWIiOiJ1LWU2YzI2NDhjLTIwZjktNDJlMC1iMWZlLWZjZWEwNzA4ODY3NyIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTY1MTI0ODM1NCwiZXhwIjoxNzUxMjUxOTU0fQ.p9fr_c_HVlJzY1cJSGDod1zMdhRCRWdExOB_UxMDrKg'

        newProfile = {
            nickname: faker.internet.userName(),
            email: faker.internet.email(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            isListed: true,
            addresses: [account3.getId()],
            state: State.Confirmed
        }
    })

    it('should create a userProfile', async () => {
        const response = await nevermined.profiles.create(newProfile)

        userId = response.userId // eslint-disable-line prefer-destructuring

        assert.deepEqual(response, {
            ...newProfile,
            userId: userId,
            creationDate: response.creationDate,
            updateDate: response.updateDate
        })
    })

    it('should get a profile by userId', async () => {
        const response = await nevermined.profiles.findOneByUserId(userId)

        assert.deepEqual(response, {
            ...newProfile,
            userId: response.userId,
            creationDate: response.creationDate,
            updateDate: response.updateDate
        })
    })

    it('should get a profile by address', async () => {
        await sleep(2000)
        const response = await nevermined.profiles.findOneByAddress(account3.getId())

        assert.deepEqual(response, {
            ...newProfile,
            userId: response.userId,
            creationDate: response.creationDate,
            updateDate: response.updateDate
        })
    })

    it('should update a profile by userid', async () => {
        const response = await nevermined.profiles.update(userId, {
            isListed: false
        })

        assert.deepEqual(response, {
            ...newProfile,
            userId: response.userId,
            isListed: false,
            creationDate: response.creationDate,
            updateDate: response.updateDate
        })
    })

    it('should disable a profile by userId', async () => {
        const response = await nevermined.profiles.disableOneByUserId(userId)

        assert.deepEqual(response, {
            ...newProfile,
            userId: response.userId,
            state: State.Disabled,
            isListed: false,
            creationDate: response.creationDate,
            updateDate: response.updateDate
        })
    })
})
