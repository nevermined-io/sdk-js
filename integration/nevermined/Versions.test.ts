import { assert } from 'chai'

import { config } from '../config'

import { Nevermined, PlatformTechStatus } from '../../src'

describe('Versions', () => {
    let nevermined: Nevermined

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
    })

    it('should return the versions', async () => {
        const versions = await nevermined.versions.get()

        assert.equal(versions.gateway.status, PlatformTechStatus.Working)
        assert.equal(versions.sdk.status, PlatformTechStatus.Working)
        assert.equal(versions.gateway.keeperVersion, versions.sdk.keeperVersion)
        assert.equal(versions.gateway.network, versions.sdk.network)
    })
})
