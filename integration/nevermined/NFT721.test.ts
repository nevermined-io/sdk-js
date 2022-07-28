import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import ERC721 from '../../src/artifacts/ERC721.json'
import { ZeroAddress, zeroX } from '../../src/utils'
import { Token } from '../../src/nevermined/Token'
import { ethers } from 'ethers'
import Nft721 from '../../src/keeper/contracts/Nft721'

describe('Nfts721 operations', async () => {
    let nevermined: Nevermined

    let nft: ethers.Contract
    let nftContract: Nft721

    let artist: Account
    let collector: Account
    let ddo: DDO

    let token: Token
    let payload: JWTPayload

    before(async () => {
        TestContractHandler.setConfig(config)

        // deploy a nft contract we can use
        nft = await TestContractHandler.deployArtifact(ERC721)

        nevermined = await Nevermined.getInstance(config)
        nftContract = await Nft721.getInstance(
            (nevermined.keeper as any).instanceConfig,
            nft.address
        )

        // Accounts
        ;[artist, collector] = await nevermined.accounts.list()
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        await nevermined.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
        ;({ token } = nevermined)
    })

    describe('with default token', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub

            // artist creates the nft
            ddo = await nevermined.nfts.create721(
                metadata,
                artist,
                new AssetRewards(),
                nft.address
            )
        })

        it('should mint an nft token', async () => {
            // artist mints the nft
            await nftContract.mint(zeroX(ddo.shortId()), artist.getId())
        })

        it('should transfer an nft token with default token', async () => {
            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.address),
                artist.getId()
            )

            // collector orders the nft
            const agreementId = await nevermined.nfts.order721(ddo.id, collector)

            // artists sends the nft
            await nevermined.nfts.transfer721(agreementId, ddo.id, artist)

            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.address),
                collector.getId()
            )

            // artist fetches the payment
            await nevermined.nfts.release721Rewards(
                agreementId,
                ddo.id,
                collector,
                artist
            )
        })
    })

    describe('with custom token', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub
            // artist creates the nft
            ddo = await nevermined.nfts.create721(
                metadata,
                artist,
                new AssetRewards(),
                nft.address,
                token.getAddress()
            )
        })

        it('should mint an nft token', async () => {
            // artist mints the nft
            await nftContract.mint(zeroX(ddo.shortId()), artist.getId())
        })

        it('should transfer an nft token with custom token', async () => {
            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.address),
                artist.getId()
            )

            // collector orders the nft
            const agreementId = await nevermined.nfts.order721(ddo.id, collector)

            // artists sends the nft
            await nevermined.nfts.transfer721(agreementId, ddo.id, artist)

            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.address),
                collector.getId()
            )

            // artist fetches the payment
            await nevermined.nfts.release721Rewards(
                agreementId,
                ddo.id,
                collector,
                artist
            )
        })
    })

    describe('with ether', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub
            // artist creates the nft
            ddo = await nevermined.nfts.create721(
                metadata,
                artist,
                new AssetRewards(artist.getId(), ethers.utils.parseEther('0.1')),
                nft.address,
                ZeroAddress
            )
        })

        it('should mint an nft token', async () => {
            // artist mints the nft
            await nftContract.mint(zeroX(ddo.shortId()), artist.getId())
        })

        it('should transfer an nft token with ether', async () => {
            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.address),
                artist.getId()
            )

            // collector orders the nft
            const agreementId = await nevermined.nfts.order721(ddo.id, collector)

            // artists sends the nft
            await nevermined.nfts.transfer721(agreementId, ddo.id, artist)

            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.address),
                collector.getId()
            )

            // artist fetches the payment
            await nevermined.nfts.release721Rewards(
                agreementId,
                ddo.id,
                collector,
                artist
            )
        })
    })
})
