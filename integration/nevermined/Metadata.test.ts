import { assert } from 'chai'
import { Account, DID, Nevermined } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getAssetRewards, getMetadata } from '../utils'

describe('Get DDO status', () => {
    let nevermined: Nevermined
    let publisher: Account
    let assetRewards: AssetRewards

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[publisher] = await nevermined.accounts.list()
        assetRewards = getAssetRewards(publisher.getId())
    })

    it('should get the internal status of an asset', async () => {
        const ddo = await nevermined.assets.create(
            getMetadata(0) as any,
            publisher,
            assetRewards
        )

        const ddoStatus = await nevermined.metadata.status(ddo.id)
        assert.isDefined(ddoStatus)
        assert.isDefined(ddoStatus.internal)
        assert.equal(ddoStatus.internal.id, ddo.id)
        assert.equal(ddoStatus.internal.type, 'Elasticsearch')
        assert.equal(ddoStatus.internal.status, 'ACCEPTED')
        assert.equal(
            ddoStatus.internal.url,
            nevermined.metadata.getServiceEndpoint(DID.parse(ddo.id))
        )
    })
})
