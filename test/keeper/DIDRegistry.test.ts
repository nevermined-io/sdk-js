import { assert } from 'chai'
import DIDRegistry from '../../src/keeper/contracts/DIDRegistry'
import Account from '../../src/nevermined/Account'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { generateId } from '../../src/utils/GeneratorHelpers'
import config from '../config'
import TestContractHandler from './TestContractHandler'

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
            const ownerAccount: Account = (await nevermined.accounts.list())[0]
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

        it('should register another attribute in the same did', async () => {
            const ownerAccount: Account = (await nevermined.accounts.list())[0]
            const did = generateId()
            {
                // register the first attribute
                const data = 'my nice provider, is nice'
                await didRegistry.registerAttribute(
                    did,
                    '0123456789abcdef',
                    [],
                    data,
                    ownerAccount.getId()
                )
            }
            {
                // register the second attribute with the same did
                const data = 'asdsad'
                const receipt = await didRegistry.registerAttribute(
                    did,
                    '0123456789abcdef',
                    [],
                    data,
                    ownerAccount.getId()
                )
                assert.isTrue(receipt.status)
                assert.isDefined(receipt.events.DIDAttributeRegistered)
            }
        })
    })

    describe('#getDIDOwner()', () => {
        it('should get the owner of a did properly', async () => {
            const ownerAccount: Account = (await nevermined.accounts.list())[0]
            const did = generateId()
            const data = 'my nice provider, is nice'
            await didRegistry.registerAttribute(
                did,
                '0123456789abcdef',
                [],
                data,
                ownerAccount.getId()
            )

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
            const ownerAccount: Account = (await nevermined.accounts.list())[0]
            const did = generateId()
            const data = 'my nice provider, is nice'
            await didRegistry.registerAttribute(
                did,
                '0123456789abcdef',
                [],
                data,
                ownerAccount.getId()
            )

            // transfer
            const newOwnerAccount: Account = (await nevermined.accounts.list())[1]
            await didRegistry.transferDIDOwnership(
                did,
                newOwnerAccount.getId(),
                ownerAccount.getId()
            )

            // check
            const newOwner = await didRegistry.getDIDOwner(did)
            assert.equal(
                newOwner,
                newOwnerAccount.getId(),
                `Got ${newOwner} but expected ${newOwnerAccount.getId()}`
            )
        })
    })
})
