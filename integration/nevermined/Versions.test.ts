import { assert } from 'chai'

import config from '../../test/config'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { PlatformTechStatus } from '../../src/nevermined/Versions'

describe('Versions', () => {
  let nevermined: Nevermined

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
  })

  it('should return the versions', async () => {
    const versions = await nevermined.utils.versions.get()

    assert.equal(versions.node.status, PlatformTechStatus.Working)
    assert.equal(versions.sdk.status, PlatformTechStatus.Working)
    assert.equal(versions.node.keeperVersion, versions.sdk.keeperVersion)
    assert.equal(versions.node.network, versions.sdk.network)
  })
})
