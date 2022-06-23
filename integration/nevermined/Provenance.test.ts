import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO, ProvenanceMethod, utils } from '../../src'
import { sleep } from '../utils/utils'

describe('Provenance', () => {
    let nevermined: Nevermined

    let publisher: Account
    let intermediary: Account

    let newMetadata = () => getMetadata()
    let ddo: DDO

    const activitiesIds = {
        publisher: utils.generateId(),
        intermediary: utils.generateId()
    }

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, intermediary] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )

        await nevermined.marketplace.login(clientAssertion)

        if (!nevermined.keeper.dispenser) {
            newMetadata = () => getMetadata(0)
        }
    })

    it('should be able to get the provenance data from a new asset', async () => {
        const payload = decodeJwt(config.marketplaceAuthToken)
        const metadata = newMetadata()
        metadata.userId = payload.sub

        ddo = await nevermined.assets.create(metadata, publisher)
        await sleep(2000)
        const provenance = await nevermined.provenance.getProvenanceEntry(ddo.shortId())

        assert.equal(utils.zeroX(provenance.did), utils.zeroX(ddo.shortId()))
        assert.equal(utils.zeroX(provenance.agentId), utils.zeroX(publisher.getId()))
        assert.equal(provenance.method, ProvenanceMethod.WAS_GENERATED_BY)
    })

    it('should register an association', async () => {
        const provId = utils.generateId()
        await nevermined.provenance.wasAssociatedWith(
            provId,
            ddo.shortId(),
            publisher.getId(),
            activitiesIds.publisher,
            'PublisherStuff',
            publisher
        )

        const provenance = await nevermined.provenance.getProvenanceEntry(provId)
        assert.equal(utils.zeroX(provenance.did), utils.zeroX(ddo.shortId()))
        assert.equal(utils.zeroX(provenance.agentId), utils.zeroX(publisher.getId()))
        assert.equal(provenance.method, ProvenanceMethod.WAS_ASSOCIATED_WITH)
    })

    it('should delegate the next step of the provenance', async () => {
        const provId = utils.generateId()
        await nevermined.provenance.actedOnBehalf(
            provId,
            ddo.shortId(),
            intermediary.getId(),
            publisher.getId(),
            activitiesIds.intermediary,
            '0x0',
            'FirstIntermediaryStuff',
            publisher
        )

        const provenance = await nevermined.provenance.getProvenanceEntry(provId)
        assert.equal(utils.zeroX(provenance.did), utils.zeroX(ddo.shortId()))
        assert.equal(utils.zeroX(provenance.agentId), utils.zeroX(intermediary.getId()))
        assert.equal(
            utils.zeroX(provenance.agentInvolvedId),
            utils.zeroX(publisher.getId())
        )
        assert.equal(provenance.method, ProvenanceMethod.ACTED_ON_BEHALF)
    })

    it('should register an intermediary association', async () => {
        const provId = utils.generateId()
        await nevermined.provenance.wasAssociatedWith(
            provId,
            ddo.shortId(),
            intermediary.getId(),
            activitiesIds.intermediary,
            'FirstIntermediaryStuff',
            intermediary
        )

        const provenance = await nevermined.provenance.getProvenanceEntry(provId)
        assert.equal(utils.zeroX(provenance.did), utils.zeroX(ddo.shortId()))
        assert.equal(utils.zeroX(provenance.agentId), utils.zeroX(intermediary.getId()))
        assert.equal(provenance.method, ProvenanceMethod.WAS_ASSOCIATED_WITH)
    })

    it('should register a use', async () => {
        const provId = utils.generateId()
        await nevermined.provenance.used(
            provId,
            ddo.shortId(),
            intermediary.getId(),
            activitiesIds.intermediary,
            '0x0',
            'FirstIntermediaryStuff',
            intermediary
        )

        const provenance = await nevermined.provenance.getProvenanceEntry(provId)
        assert.equal(utils.zeroX(provenance.did), utils.zeroX(ddo.shortId()))
        assert.equal(utils.zeroX(provenance.agentId), utils.zeroX(intermediary.getId()))
        assert.equal(provenance.method, ProvenanceMethod.USED)
    })

    it('should return the events associated to DID', async () => {
        const pm = ProvenanceMethod

        // wait for the graph to pickup the event
        await sleep(3000)

        const events = await nevermined.provenance.getDIDProvenanceEvents(ddo.shortId())

        assert.deepEqual(
            events.map(_ => _.method),
            [
                pm.WAS_GENERATED_BY,
                pm.WAS_ASSOCIATED_WITH,
                pm.ACTED_ON_BEHALF,
                pm.WAS_ASSOCIATED_WITH,
                pm.USED
            ]
        )
    })

    it('should return the events of an specific method by DID', async () => {
        await sleep(2000)
        const events = await Promise.all(
            [
                'WAS_GENERATED_BY',
                'USED',
                'WAS_DERIVED_FROM',
                'WAS_ASSOCIATED_WITH',
                'ACTED_ON_BEHALF'
            ].map(async _ => [
                _,
                (
                    await nevermined.provenance.getProvenanceMethodEvents(
                        ProvenanceMethod[_] as any,
                        ddo.shortId()
                    )
                ).length
            ])
        )
        const expected = [
            ['WAS_GENERATED_BY', 1],
            ['USED', 1],
            ['WAS_DERIVED_FROM', 0],
            ['WAS_ASSOCIATED_WITH', 2],
            ['ACTED_ON_BEHALF', 1]
        ]
        assert.deepEqual(events, expected)
    })
})
