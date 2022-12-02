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
import Nft721Contract from '../../src/keeper/contracts/Nft721Contract'
import BigNumber from '../../src/utils/BigNumber'
import { TransferNFT721Condition } from '../../src/keeper/contracts/conditions'

describe('Nfts721 operations', async () => {
    let nevermined: Nevermined
    let transferNft721Condition: TransferNFT721Condition

    let nft: ethers.Contract
    let nftContract: Nft721Contract

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
        nftContract = await Nft721Contract.getInstance(
            (nevermined.keeper as any).instanceConfig,
            nft.address
        )

        // Accounts
        ;[artist, collector] = await nevermined.accounts.list()
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        ;({ transferNft721Condition } = nevermined.keeper.conditions)

        const nftOwner = new Account(await nftContract.owner() as string)
        nftContract.setProxyApproval(transferNft721Condition.address, true, nftOwner)

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

        it('should clone an existing erc-721 nft contract', async () => {
            const cloneAddress = await nftContract.createClone('My New NFT', 'xyz', '', BigNumber.from(10), artist)
            assert.isDefined(cloneAddress)
            console.log(`NFT (ERC-721) clonned into address ${cloneAddress}`)
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
            await nevermined.nfts.release721Rewards(agreementId, ddo.id, artist)
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
            await nevermined.nfts.release721Rewards(agreementId, ddo.id, artist)
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
                new AssetRewards(artist.getId(), BigNumber.parseEther('0.1')),
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
            await nevermined.nfts.release721Rewards(agreementId, ddo.id, artist)
        })
    })
})
