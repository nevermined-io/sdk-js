import { assert } from 'chai'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'

describe('Nfts operations', () => {
    let nevermined: Nevermined

    let account1: Account
    let account2: Account
    let ddo: DDO

    let newMetadata = () => getMetadata()

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account1, account2] = await nevermined.accounts.list()

        if (!nevermined.keeper.dispenser) {
            newMetadata = () => getMetadata(0)
        }
        ddo = await nevermined.nfts.create(
            newMetadata() as any,
            account1,
            10,
            0,
            new AssetRewards()
        )
    })

    it('should mint 10 nft tokens', async () => {
        await nevermined.nfts.mint(ddo.id, 10, account1)

        assert.equal(10, await nevermined.nfts.balance(ddo.id, account1))
    })

    it('should transfer 2 nft tokens', async () => {
        const agreementId = await nevermined.nfts.order(ddo.id, 2, account2)
        await nevermined.nfts.transfer(agreementId, ddo.id, 2, account2, account1)

        assert.equal(8, await nevermined.nfts.balance(ddo.id, account1))
        assert.equal(2, await nevermined.nfts.balance(ddo.id, account2))
    })

    it('should burn nft tokens', async () => {
        await nevermined.nfts.burn(ddo.id, 6, account1)

        assert.equal(2, await nevermined.nfts.balance(ddo.id, account1))
    })
})
