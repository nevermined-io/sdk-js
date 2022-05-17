import { assert, spy, use } from 'chai'
import { faker } from '@faker-js/faker'
import spies from 'chai-spies'
import { Nevermined, Account } from '../../src'
import { Profiles } from '../../src/profiles/Profiles'
import { NewProfile, Profile, State } from '../../src/profiles/Profiles.interfaces'
import config from '../config'

use(spies)

const reponsify = async data => ({
    ok: true,
    json: () => Promise.resolve(data)
})

describe('Profiles', () => {
    let nevermined: Nevermined
    let profiles: Profiles
    let account: Account

    let newProfile: NewProfile

    let profile: Profile

    /* eslint-disable @typescript-eslint/camelcase */
    /* eslint-enable @typescript-eslint/camelcase */

    beforeEach(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[account] = await nevermined.accounts.list()
        profiles = nevermined.profiles // eslint-disable-line prefer-destructuring

        newProfile = {
            nickname: faker.internet.userName(),
            email: faker.internet.email(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            isListed: true,
            addresses: [account.getId()],
            state: State.Confirmed
        }

        profile = {
            ...newProfile,
            userId: faker.datatype.uuid(),
            creationDate: faker.date.recent(),
            updateDate: faker.date.recent()
        }
    })

    afterEach(() => {
        spy.restore()
    })

    it('should create a profile', async () => {
        spy.on(nevermined.utils.fetch, 'post', () => {
            reponsify(profile)
        })

        const result = await profiles.create(newProfile)

        assert.equal(result, profile)
    })

    it('should get a profile by userId', async () => {
        spy.on(nevermined.utils.fetch, 'get', () => {
            reponsify(profile)
        })

        const result = await profiles.findOneByUserId(profile.userId)

        assert.equal(result, profile)
    })

    it('should get a profile by address', async () => {
        spy.on(nevermined.utils.fetch, 'get', () => {
            reponsify(profile)
        })

        const result = await profiles.findOneByAddress(profile.addresses[0])

        assert.equal(result, profile)
    })

    it('should update a profile by address', async () => {
        const updatedProfile = { ...profile, isListed: false }

        spy.on(nevermined.utils.fetch, 'get', () => {
            reponsify(updatedProfile)
        })

        const result = await profiles.update(profile.userId, { isListed: false })

        assert.equal(result, updatedProfile)
    })

    it('should disable a profile by userId', async () => {
        const disabledProfile = { ...profile, state: State.Disabled }

        spy.on(nevermined.utils.fetch, 'get', () => {
            reponsify(disabledProfile)
        })

        const result = await profiles.update(profile.userId, { isListed: false })

        assert.equal(result, disabledProfile)
    })
})
