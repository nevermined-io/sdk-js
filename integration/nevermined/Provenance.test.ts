import { assert } from 'chai'

import config from '../configRinkeby'
import { Nevermined, Account, DDO } from '../../src'
import { getMetadata } from '../utils'
import ProvenanceRegistry, { Activities } from '../../src/keeper/contracts/ProvenanceRegistry'


describe('Provenance Supply-Chain Test', () => {
    let nevermined: Nevermined
    let provenanceRegistry: ProvenanceRegistry

    let manufacturer: Account
    let transportGround: Account
    let transportAir: Account
    let recipient: Account
    let customs: Account

    let cargoDdo: DDO

    before(async () => {
        // nevermined instance
        nevermined = await Nevermined.getInstance(config)
        provenanceRegistry = nevermined.keeper.provenanceRegistry

        // Accounts
        ;[manufacturer, transportGround, transportAir, recipient, customs] = await nevermined.accounts.list()
        console.log(manufacturer.getId())
        console.log(transportGround.getId())
        console.log(transportAir.getId())
        console.log(recipient.getId())
        console.log(customs.getId())
    })

    it('should get an instance of nevermined and ProvenanceRegistry', async () => {
        assert(nevermined)
        assert(provenanceRegistry)
    })

    it('manufacturer should register and asset for the cargo', async () => {
        cargoDdo = await nevermined.assets.create(getMetadata() as any, manufacturer)
        assert(cargoDdo)
    })

    it('manufacturer generates entity [wasGeneratedBy]', async () => {
        const receipt = await provenanceRegistry.wasGeneratedBy(
            cargoDdo.id,
            manufacturer.getId(),
            Activities.GENERATED,
            [transportGround.getId(), transportAir.getId(), recipient.getId()],
            'acmeStuffManufacturing',
            manufacturer.getId()
        )
        assert(receipt)
    })

    it('manufacturer assigns responsibility for manufacturing [wasAssociatedWith]', async () => {
        const receipt = await provenanceRegistry.wasAssociatedWith(
            cargoDdo.id,
            manufacturer.getId(),
            Activities.MANUFACTURING,
            [],
            'acmeStuffManufacturing',
            manufacturer.getId()
        )
        assert(receipt)
    })

    it('manufacturer delegates to trasportGround [actedOnBehalfOf]', async () => {
        const receipt = await provenanceRegistry.actedOnBehalfOf(
            cargoDdo.id,
            transportGround.getId(),
            manufacturer.getId(),
            Activities.TRANSPORTATION,
            [],
            'groundTransportation',
            manufacturer.getId()
        )
        assert(receipt)
    })

    it('transportGround assigns responsibility for ground transportation [wasAssociatedWith]', async () => {
        const receipt = await provenanceRegistry.wasAssociatedWith(
            cargoDdo.id,
            transportGround.getId(),
            Activities.TRANSPORTATION,
            [],
            'groundTransportation',
            transportGround.getId()
        )
        assert(receipt)
    })

    it('transportGround begins transportation [used]', async () => {
        const receipt = await provenanceRegistry.used(
            cargoDdo.id,
            transportGround.getId(),
            Activities.TRANSPORTATION,
            'groundTransportation',
            transportGround.getId()
        )
        assert(receipt)
    })

    it('transportGround delegates to transportAir [actedOnBehalfOf]', async () => {
        const receipt = await provenanceRegistry.actedOnBehalfOf(
            cargoDdo.id,
            transportAir.getId(),
            transportGround.getId(),
            Activities.TRANSPORTATION,
            [],
            'airTransportation',
            transportGround.getId()
        )
        assert(receipt)
    })

    it('transportAir assigns responsibility for air transportation [wasAssociatedWith]', async () => {
        const receipt = await provenanceRegistry.wasAssociatedWith(
            cargoDdo.id,
            transportAir.getId(),
            Activities.TRANSPORTATION,
            [],
            'airTransportation',
            transportAir.getId()
        )
        assert(receipt)
    })

    it('transportAir begins transportation [used]', async () => {
        const receipt = await provenanceRegistry.used(
            cargoDdo.id,
            transportAir.getId(),
            Activities.TRANSPORTATION,
            'AirTransportation',
            transportAir.getId()
        )
        assert(receipt)
    })

    it('transportAir delegates to recipient [actedOnBehalfOf]', async () => {
        const receipt = await provenanceRegistry.actedOnBehalfOf(
            cargoDdo.id,
            recipient.getId(),
            transportAir.getId(),
            Activities.DELIVERY,
            [],
            'delivery',
            transportAir.getId()
        )
        assert(receipt)
    })

})
