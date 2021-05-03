import { assert } from 'chai'

import { config } from '../config'

import { Nevermined, PlatformTechStatus } from '../../src'

describe('Versions', () => {
    let nevermined: Nevermined

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
    })

    // TODO: enable again after new versions of Gateway
    it('should return the versions', async () => {
        const versions = await nevermined.versions.get()

        assert.equal(versions.metadata.status, PlatformTechStatus.Working)
        assert.equal(versions.gateway.status, PlatformTechStatus.Working)
        assert.equal(versions.sdk.status, PlatformTechStatus.Working)

        assert.deepEqual(versions.status, {
            ok: true,
            contracts: true,
            network: true
        })
    })
})
