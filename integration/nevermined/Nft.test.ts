import { assert } from 'chai'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'

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
        ddo = await nevermined.assets.create(newMetadata() as any, account1)

    })


    it('should mint 10 nft tokens', async () => {

        await nevermined.assets.mint(ddo.id, 10, account1)

        assert.equal(11, await nevermined.assets.balance(account1.getId(), ddo.id))

    })

    it('should transfer 2 nft tokens', async () => {
        await nevermined.assets.transferNft(ddo.id, account2.getId(),2, account1)

        assert.equal(9, await nevermined.assets.balance(account1.getId(), ddo.id))
        assert.equal(2, await nevermined.assets.balance(account2.getId(), ddo.id))
    })

    it('should burn nft tokens', async () => {
        await nevermined.assets.burn(ddo.id, 8, account1)

        assert.equal(1, await nevermined.assets.balance(account1.getId(), ddo.id))

    })
 
})
