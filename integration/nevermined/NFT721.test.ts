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

    let artist: Account
    let collector: Account
    let ddo: DDO

    let token: Token
    let newMetadata = () => getMetadata()

    before(async () => {
        TestContractHandler.setConfig(config)

        // deploy a nft contract we can use
        nftContract = await TestContractHandler.deployArtifact(ERC721)

        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[artist, collector] = await nevermined.accounts.list()
        ;({ token } = nevermined)

        if (!nevermined.keeper.dispenser) {
            newMetadata = () => getMetadata(0)
        }

        // artist creates the nft
        ddo = await nevermined.nfts.create721(
            newMetadata() as any,
            artist,
            new AssetRewards(),
            nftContract.options.address
        )
    })

    it('should mint an nft token', async () => {
        // artist mints the nft
        await nftContract.methods
            .mint(zeroX(ddo.shortId()))
            .send({ from: artist.getId() })
    })

    it('should transfer an nft token', async () => {
        assert.equal(
            await nevermined.nfts.ownerOf(
                zeroX(ddo.shortId()),
                nftContract.options.address
            ),
            artist.getId()
        )

        // collector orders the nft
        const agreementId = await nevermined.nfts.order721(
            ddo.id,
            token.getAddress(),
            collector
        )

        // artists sends the nft
        await nevermined.nfts.transfer721(agreementId, ddo.id, token.getAddress(), artist)

        assert.equal(
            await nevermined.nfts.ownerOf(
                zeroX(ddo.shortId()),
                nftContract.options.address
            ),
            collector.getId()
        )

        // artist fetches the payment
        await nevermined.nfts.release721Rewards(agreementId, ddo.id, artist)
    })
})
