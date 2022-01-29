import { Account, Nevermined } from '../../src'
import { config } from '../config'
import { NeverminedToken } from '@nevermined-io/subgraphs'
import { assert } from 'chai'
import Web3 from 'web3'

describe('SubgraphsEventHandler', () => {
    let account: Account
    let nevermined: Nevermined

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[account] = await nevermined.accounts.list()

        await nevermined.keeper.dispenser.requestTokens(1, account.getId())
    })

    it('should query for the event', async () => {
        const graphUrl = 'http://localhost:9000/subgraphs/name/neverminedio'
        const response = await NeverminedToken.getTransfers(
            `${graphUrl}/NeverminedToken`,
            {
                where: {
                    to: account.getId()
                }
            },
            {
                to: true,
                value: true
            }
        )
        assert.strictEqual(
            Web3.utils.toChecksumAddress(response.pop().to),
            Web3.utils.toChecksumAddress(account.getId())
        )
    })
})
