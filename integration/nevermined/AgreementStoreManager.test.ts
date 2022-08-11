import { assert } from 'chai'
import { Account, Nevermined, MetaData } from '../../src'
import { config } from '../config'
import { getMetadata } from '../utils'
import { decodeJwt } from 'jose'
import { sleep } from '../utils/utils'

describe('Agreement Store Manager', () => {
    let nevermined: Nevermined

    let account1: Account
    let account2: Account

    let newMetadata: (token: string) => MetaData

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account1, account2] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            account1
        )

        await nevermined.marketplace.login(clientAssertion)

        newMetadata = (token: string) => {
            const metadata = getMetadata(0)
            const jwtPayload = decodeJwt(token)
            metadata.userId = jwtPayload.sub
            return metadata
        }
    })

    it('should get agreements for did', async () => {
        const ddo = await nevermined.assets.create(
            newMetadata(config.marketplaceAuthToken),
            account1
        )

        let agreements = await nevermined.agreements.getAgreements(ddo.id)
        const num = agreements.length

        await account2.requestTokens(
            +getMetadata().main.price * 10 ** -(await nevermined.keeper.token.decimals())
        )
        const agreementId = await nevermined.assets.order(ddo.id, 'access', account2)

        // wait for the graph to pickup the event
        await sleep(3000)

        agreements = await nevermined.agreements.getAgreements(ddo.id)

        assert.isNotEmpty(agreements)
        assert.equal(agreements.length, 1 + num)
        const agreementFound = agreements.find((a) => a.agreementId === agreementId)

        assert.isTrue(agreementFound != undefined)
        assert.equal(agreementFound.agreementId, agreementId)
    })
})
