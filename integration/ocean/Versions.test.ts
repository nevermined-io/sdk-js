import { assert } from 'chai'

import { config } from '../config'

import { Ocean, OceanPlatformTechStatus } from '../../src' // @oceanprotocol/squid

describe('Versions', () => {
    let ocean: Ocean

    before(async () => {
        ocean = await Ocean.getInstance(config)
    })

    // TODO: enable again after new versions of Gateway
    xit('should return the versions', async () => {
        const versions = await ocean.versions.get()

        assert.equal(versions.metadata.status, OceanPlatformTechStatus.Working)
        assert.equal(versions.gateway.status, OceanPlatformTechStatus.Working)
        assert.equal(versions.squid.status, OceanPlatformTechStatus.Working)

        assert.deepEqual(versions.status, {
            ok: true,
            contracts: true,
            network: true
        })
    })
})
