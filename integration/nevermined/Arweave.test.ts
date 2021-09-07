import chai, { assert, expect } from 'chai'
import { Account, DDO, Nevermined } from '../../src'
import DIDRegistry from '../../src/keeper/contracts/DIDRegistry'
import { DDOStatus } from '../../src/metadata/Metadata'
import AssetRewards from '../../src/models/AssetRewards'
import { config } from '../config'
import { getAssetRewards, getMetadata } from '../utils'

describe.skip('Get DDO status', () => {
    let nevermined: Nevermined
    let publisher: Account
    let assetRewards: AssetRewards
    let ddo: DDO
    let ddoStatus: DDOStatus
    let didRegistry: DIDRegistry

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;({ didRegistry } = nevermined.keeper)
        ;[publisher] = await nevermined.accounts.list()
        assetRewards = getAssetRewards(publisher.getId())
    })

    it('should get the external status of an asset', async () => {
        ddo = await nevermined.assets.create(
            getMetadata(0) as any,
            publisher,
            assetRewards
        )

        ddoStatus = await nevermined.metadata.status(ddo.id)
        assert.isDefined(ddoStatus)
        assert.isDefined(ddoStatus.external)
        assert.isDefined(ddoStatus.external.id)
        assert.equal(ddoStatus.external.type, 'Arweave')
        assert.equal(ddoStatus.external.status, 'PENDING')
        assert.equal(
            ddoStatus.external.url,
            `https://arweave.net:443/${ddoStatus.external.id}`
        )
    })

    it('should have the arweave endpoint in the did registry', async () => {
        const attributes = await didRegistry.getAttributesByDid(ddo.id)
        assert.equal(attributes.serviceEndpoint, ddoStatus.external.url)
    })

    it('should resolve external url', async () => {
        chai.spy.on((nevermined as any).metadata, 'retrieveDDOByUrl')

        const retrievedDdo = await nevermined.assets.resolve(ddo.id)
        assert.deepEqual(ddo, retrievedDdo)
        expect(nevermined.metadata.retrieveDDOByUrl).to.have.been.called.with(
            ddoStatus.external.url
        )
    })
})
