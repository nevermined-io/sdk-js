import { assert } from 'chai'
import DIDRegistry from '../../src/keeper/contracts/DIDRegistry'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { generateId } from '../../src/utils/GeneratorHelpers'
import config from '../config'
import TestContractHandler from './TestContractHandler'
import { Logger, LogLevel } from '../../src/utils'

let nevermined: Nevermined
let didRegistry: DIDRegistry

describe('DIDRegistry', () => {
    before(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        ;({ didRegistry } = nevermined.keeper)
    })

    describe('#registerAttribute()', () => {
        it('should register an attribute in a new did', async () => {
            const [ownerAccount] = await nevermined.accounts.list()
            const did = generateId()
            const data = 'my nice provider, is nice'
            const receipt = await didRegistry.registerAttribute(
                did,
                `0123456789abcdef`,
                [],
                data,
                ownerAccount.getId()
            )
            assert(receipt.status)
            assert(receipt.events.DIDAttributeRegistered)
        })
    })

    describe('#getDIDOwner()', () => {
        it('should get the owner of a did properly', async () => {
            const [ownerAccount] = await nevermined.accounts.list()
            const didSeed = generateId()
            const data = 'my nice provider, is nice'
            await didRegistry.registerAttribute(
                didSeed,
                '0123456789abcdef',
                [],
                data,
                ownerAccount.getId()
            )
            const did = await didRegistry.hashDID(didSeed, ownerAccount.getId())

            const owner = await didRegistry.getDIDOwner(did)

            assert.equal(
                owner,
                ownerAccount.getId(),
                `Got ${owner} but expected ${ownerAccount.getId()}`
            )
        })

        it('should get 0x0 for a not registered did', async () => {
            const owner = await didRegistry.getDIDOwner('1234')
            assert.equal(owner, `0x${'0'.repeat(40)}`)
        })
    })

    describe('#transferDIDOwnership()', () => {
        it('should be able to transfer ownership', async () => {
            // create and register DID
            const [ownerAccount] = await nevermined.accounts.list()
            const didSeed = generateId()
            const data = 'my nice provider, is nice'
            await didRegistry.registerAttribute(
                didSeed,
                '12345678',
                [],
                data,
                ownerAccount.getId()
            )
            const did = await didRegistry.hashDID(didSeed, ownerAccount.getId())

            // transfer
            const [, newOwnerAccount] = await nevermined.accounts.list()
            const logger = new Logger(LogLevel.Error)
            logger.log('New Owner Account: ' + newOwnerAccount.getId())
            await didRegistry.transferDIDOwnership(
                did,
                newOwnerAccount.getId(),
                ownerAccount.getId()
            )

            // check
            const newOwner = await didRegistry.getDIDOwner(did)
            logger.log('DID Owner Account: ' + newOwner)

            assert.equal(
                newOwner,
                newOwnerAccount.getId(),
                `Got ${newOwner} but expected ${newOwnerAccount.getId()}`
            )
        })
    })
})
