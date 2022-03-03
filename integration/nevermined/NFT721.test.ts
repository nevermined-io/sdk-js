import { assert } from 'chai'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import ERC721 from '../../src/artifacts/ERC721.json'
import { Contract } from 'web3-eth-contract'
import { ZeroAddress, zeroX } from '../../src/utils'
import { Token } from '../../src/nevermined/Token'
import utils from 'web3-utils'
import { generateIntantiableConfigFromConfig } from "../../src/Instantiable.abstract";

describe('Nfts721 operations', async () => {
    let nevermined: Nevermined

    let nft: Contract

    let artist: Account
    let collector: Account
    let ddo: DDO

    let token: Token

    before(async () => {
        const instConfig = generateIntantiableConfigFromConfig(config)
        TestContractHandler.setConfig(config, instConfig.web3, instConfig.logger)

        // deploy a nft contract we can use
        nft = await TestContractHandler.deployArtifact(ERC721)

        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[artist, collector] = await nevermined.accounts.list()
        ;({ token } = nevermined)
    })

    describe('with default token', async () => {
        before(async () => {
            // artist creates the nft
            ddo = await nevermined.nfts.create721(
                getMetadata(),
                artist,
                new AssetRewards(),
                nft.options.address
            )
        })

        it('should mint an nft token', async () => {
            // artist mints the nft
            await nft.methods.mint(zeroX(ddo.shortId())).send({ from: artist.getId() })
        })

        it('should transfer an nft token with default token', async () => {
            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.options.address),
                artist.getId()
            )

            // collector orders the nft
            const agreementId = await nevermined.nfts.order721(ddo.id, collector)

            // artists sends the nft
            await nevermined.nfts.transfer721(agreementId, ddo.id, artist)

            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.options.address),
                collector.getId()
            )

            // artist fetches the payment
            await nevermined.nfts.release721Rewards(agreementId, ddo.id, artist)
        })
    })

    describe('with custom token', async () => {
        before(async () => {
            // artist creates the nft
            ddo = await nevermined.nfts.create721(
                getMetadata(),
                artist,
                new AssetRewards(),
                nft.options.address,
                token.getAddress()
            )
        })

        it('should mint an nft token', async () => {
            // artist mints the nft
            await nft.methods.mint(zeroX(ddo.shortId())).send({ from: artist.getId() })
        })

        it('should transfer an nft token with custom token', async () => {
            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.options.address),
                artist.getId()
            )

            // collector orders the nft
            const agreementId = await nevermined.nfts.order721(ddo.id, collector)

            // artists sends the nft
            await nevermined.nfts.transfer721(agreementId, ddo.id, artist)

            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.options.address),
                collector.getId()
            )

            // artist fetches the payment
            await nevermined.nfts.release721Rewards(agreementId, ddo.id, artist)
        })
    })

    describe('with ether', async () => {
        before(async () => {
            // artist creates the nft
            ddo = await nevermined.nfts.create721(
                getMetadata(),
                artist,
                new AssetRewards(artist.getId(), Number(utils.toWei('0.1', 'ether'))),
                nft.options.address,
                ZeroAddress
            )
        })

        it('should mint an nft token', async () => {
            // artist mints the nft
            await nft.methods.mint(zeroX(ddo.shortId())).send({ from: artist.getId() })
            assert.equal(
                await nft.methods.ownerOf(zeroX(ddo.shortId())).call(),
                artist.getId()
            )
        })

        it('should transfer an nft token with ether', async () => {
            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.options.address),
                artist.getId()
            )

            // collector orders the nft
            const agreementId = await nevermined.nfts.order721(ddo.id, collector)

            // artists sends the nft
            await nevermined.nfts.transfer721(agreementId, ddo.id, artist)

            assert.equal(
                await nevermined.nfts.ownerOf(zeroX(ddo.shortId()), nft.options.address),
                collector.getId()
            )

            // artist fetches the payment
            await nevermined.nfts.release721Rewards(agreementId, ddo.id, artist)
        })
    })
})
