import { Account, Nevermined } from '../../src'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { config } from '../config'
import POAPUpgradeable from '../../test/testdata/POAPUpgradeable.json'
import { assert } from 'chai'
import { ethers } from 'ethers'
import { generateId } from '../../src/utils'

describe('POAPs End-to-End', () => {
    let nevermined: Nevermined
    let poapContract: ethers.Contract
    let minter: Account
    let user1: Account
    let user2: Account
    const url = 'http://nevermined.io'
    const eventId = `0x${generateId()}`

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[minter, user1, user2] = await nevermined.accounts.list()
    })

    it('should deploy the contract', async () => {
        TestContractHandler.setConfig(config)
        poapContract = await TestContractHandler.deployArtifact(
            POAPUpgradeable,
            minter.getId()
        )
        assert.isDefined(poapContract)
    })

    it('minter should be able to mint a poap for user1', async () => {
        const tx = await poapContract['mint(address,string,uint256)'](
            user1.getId(),
            url,
            eventId,
            {
                from: minter.getId()
            }
        )

        const response = await tx.wait()
        assert.equal(response.status, 1)
    })

    it('user1 should have a balance of 1 poap', async () => {
        const balance = await poapContract.balanceOf(user1.getId())
        assert.equal(balance.toNumber(), 1)
    })

    it('minter should be able to mint a poap for user2 with same eventId', async () => {
        const tx = await poapContract['mint(address,string,uint256)'](
            user2.getId(),
            url,
            eventId,
            {
                from: minter.getId()
            }
        )

        const response = await tx.wait()
        assert.equal(response.status, 1)
    })

    it('user2 should have a balance of 1 poap', async () => {
        const balance = await poapContract.balanceOf(user2.getId())
        assert.equal(balance.toNumber(), 1)
    })
})
