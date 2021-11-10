import { assert } from 'chai'
import { Account, Nevermined } from '../../src'
import { config } from '../config'
import { getMetadata } from '../utils'

let nevermined: Nevermined
let account1: Account
let account2: Account

describe('Agreement Store Manager', () => {
    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[account1, account2] = await nevermined.accounts.list()
    })

    it('should get agreements for did', async () => {
        const ddo = await nevermined.assets.create(getMetadata(), account1)

        let agreements = await nevermined.agreements.getAgreements(ddo.id)
        assert.isEmpty(agreements)

        await account2.requestTokens(
            +getMetadata().main.price * 10 ** -(await nevermined.keeper.token.decimals())
        )
        const agreementId = await nevermined.assets.order(ddo.id, 'access', account2)

        agreements = await nevermined.agreements.getAgreements(ddo.id)
        assert.isNotEmpty(agreements)
        assert.equal(agreements.length, 1)
        assert.equal(agreements[0].agreementId, agreementId)
    })
})
