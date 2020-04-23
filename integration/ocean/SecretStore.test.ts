import { assert } from 'chai'

import { config } from '../config'

import { Ocean, Account, DID } from '../../src' // @oceanprotocol/squid

describe('Secret Store', () => {
    let ocean: Ocean

    let account: Account

    const did: DID = DID.generate()
    const content = { content: 'Test 123' }
    let encryptedContent

    before(async () => {
        ocean = await Ocean.getInstance(config)

        // Accounts
        ;[account] = await ocean.accounts.list()
    })

    it('should encrypt a text', async () => {
        encryptedContent = await ocean.secretStore.encrypt(did.getId(), content, account)

        assert.isDefined(encryptedContent)
        assert.match(encryptedContent, /^0x[a-f0-9]{76}$/i)
    })
})
