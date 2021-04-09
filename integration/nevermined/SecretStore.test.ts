import { assert } from 'chai'

import { config } from '../config'

import { Nevermined, Account, DID } from '../../src'

describe.skip('Secret Store', () => {
    let nevermined: Nevermined

    let account: Account

    const did: DID = DID.generate()
    const content = { content: 'Test 123' }
    let encryptedContent

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account] = await nevermined.accounts.list()
    })

    it('should encrypt a text', async () => {
        encryptedContent = await nevermined.secretStore.encrypt(
            did.getId(),
            content,
            account
        )

        assert.isDefined(encryptedContent)
        assert.match(encryptedContent, /^0x[a-f0-9]{76}$/i)
    })
})
