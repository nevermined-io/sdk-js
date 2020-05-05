import { assert } from 'chai'
import { AccessSecretStoreCondition } from '../../../src/keeper/contracts/conditions'
import { Ocean } from '../../../src/ocean/Ocean'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

let condition: AccessSecretStoreCondition

describe('AccessSecretStoreCondition', () => {
    const agreementId = `0x${'a'.repeat(64)}`
    const did = `did:nv:${'a'.repeat(64)}`
    const address = `0x${'a'.repeat(40)}`

    before(async () => {
        await TestContractHandler.prepareContracts()
        condition = (await Ocean.getInstance(config)).keeper.conditions
            .accessSecretStoreCondition
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const hash = await condition.hashValues(did, address)

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
            assert.equal(
                hash,
                '0x1abbd7e58bc32bff739ee1e756a4108882322f2ec939d5e2f251e6b8424947fb',
                'The hash is not the expected.'
            )
        })
    })

    describe('#generateId()', () => {
        it('should generate an ID', async () => {
            const hash = await condition.hashValues(did, address)
            const id = await condition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })
})
