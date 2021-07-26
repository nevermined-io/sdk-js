import { assert } from 'chai'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import ERC721 from '../../src/artifacts/ERC721.json'
import { Contract } from 'web3-eth-contract'
import { zeroX } from '../../src/utils'
import { Token } from '../../src/nevermined/Token'

describe('Nfts721 operations', () => {
    let nevermined: Nevermined

    let nftContract: Contract

    let account1: Account
    let account2: Account
    let ddo: DDO

    let token: Token
    let newMetadata = () => getMetadata()

    before(async () => {
        TestContractHandler.setConfig(config)

        // deploy a nft contract we can use
        nftContract = await TestContractHandler.deployArtifact(ERC721)

        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[account1, account2] = await nevermined.accounts.list()
        ;({ token } = nevermined)

        if (!nevermined.keeper.dispenser) {
            newMetadata = () => getMetadata(0)
        }

        ddo = await nevermined.nfts.create721(
            newMetadata() as any,
            account1,
            new AssetRewards(),
            nftContract.options.address
        )
    })

    it('should mint an nft token', async () => {
        await nftContract.methods
            .mint(zeroX(ddo.shortId()))
            .send({ from: account1.getId() })
    })

    it('should transfer an nft token', async () => {
        assert.equal(
            await nevermined.nfts.ownerOf(
                zeroX(ddo.shortId()),
                nftContract.options.address
            ),
            account1.getId()
        )

        const agreementId = await nevermined.nfts.order721(
            ddo.id,
            1,
            token.getAddress(),
            account2
        )

        await nevermined.nfts.transfer721(
            agreementId,
            ddo.id,
            1,
            nftContract.options.address,
            token.getAddress(),
            account2,
            account1
        )

        assert.equal(
            await nevermined.nfts.ownerOf(
                zeroX(ddo.shortId()),
                nftContract.options.address
            ),
            account2.getId()
        )

        await nevermined.nfts.release721Rewards(
            agreementId,
            ddo.id,
            1,
            nftContract.options.address,
            account2,
            account1
        )
    })
})
