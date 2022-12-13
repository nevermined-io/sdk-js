import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import AssetPrice from '../../src/models/AssetPrice'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { ZeroAddress, zeroX } from '../../src/utils'
import { Token } from '../../src/nevermined/Token'
import { ethers } from 'ethers'
import Nft721Contract from '../../src/keeper/contracts/Nft721Contract'
import BigNumber from '../../src/utils/BigNumber'
import { TransferNFT721Condition } from '../../src/keeper/contracts/conditions'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import { NFTAttributes } from '../../src/models/NFTAttributes'

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
        nevermined = await Nevermined.getInstance(config)

        TestContractHandler.setConfig(config)

        const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
        const erc721ABI = await TestContractHandler.getABI('NFT721Upgradeable', config.artifactsFolder, networkName)

        // deploy a nft contract we can use
        nft = await TestContractHandler.deployArtifact(erc721ABI)        
        nftContract = await Nft721Contract.getInstance(
            (nevermined.keeper as any).instanceConfig,
            nft.address
        )

        await nevermined.contracts.loadNft721(nftContract.address)

        // Accounts
        ;[artist, collector] = await nevermined.accounts.list()
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        ;({ transferNft721Condition } = nevermined.keeper.conditions)

        const nftOwner = new Account(await nftContract.owner() as string)
        nftContract.setProxyApproval(transferNft721Condition.address, true, nftOwner)

        await nevermined.services.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
        ;({ token } = nevermined)
    })

    describe('with default token', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub

            const assetAttributes = AssetAttributes.getInstance({
                metadata,
                serviceTypes: ['nft-sales', 'nft-access']
            })
            const nftAttributes = NFTAttributes.getNFT721Instance({
                nftContractAddress: nft.address
            })            
            ddo = await nevermined.nfts721.create(
                assetAttributes,
                nftAttributes,
                artist
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
            console.log(`Checking owner of DID ${ddo.id}`)

            assert.equal(
                await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())),
                artist.getId()
            )

            // collector orders the nft
            const agreementId = await nevermined.nfts721.order(ddo.id, collector)

            // artists sends the nft
            await nevermined.nfts721.transfer(agreementId, ddo.id, artist)

            assert.equal(
                await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())),
                collector.getId()
            )

            // artist fetches the payment
            await nevermined.nfts721.releaseRewards(agreementId, ddo.id, artist)
        })
    })

    describe('with custom token', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub

            // artist creates the nft
            const assetAttributes = AssetAttributes.getInstance({
                metadata,
                price: new AssetPrice().setTokenAddress(token.getAddress()),
                serviceTypes: ['nft-sales', 'nft-access']
            })
            const nftAttributes = NFTAttributes.getNFT721Instance({
                nftContractAddress: nft.address
            })            
            ddo = await nevermined.nfts721.create(
                assetAttributes,
                nftAttributes,
                artist
            )
        })

        it('should mint an nft token', async () => {
            // artist mints the nft
            await nftContract.mint(zeroX(ddo.shortId()), artist.getId())
        })

        it('should transfer an nft token with custom token', async () => {
            assert.equal(
                await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())),
                artist.getId()
            )

            // collector orders the nft
            const agreementId = await nevermined.nfts721.order(ddo.id, collector)

            // artists sends the nft
            await nevermined.nfts721.transfer(agreementId, ddo.id, artist)

            assert.equal(
                await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())),
                collector.getId()
            )

            // artist fetches the payment
            await nevermined.nfts721.releaseRewards(agreementId, ddo.id, artist)
        })
    })

    describe('with ether', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub
            // artist creates the nft

            const assetPrice = new AssetPrice(
                artist.getId(), BigNumber.parseEther('0.1')
                ).setTokenAddress(ZeroAddress) // With ETH

            const assetAttributes = AssetAttributes.getInstance({
                metadata,
                price: assetPrice,
                serviceTypes: ['nft-sales', 'nft-access']
            })
            const nftAttributes = NFTAttributes.getNFT721Instance({
                nftContractAddress: nft.address
            })            
            ddo = await nevermined.nfts721.create(
                assetAttributes,
                nftAttributes,
                artist
            )
        })

        it('should mint an nft token', async () => {
            // artist mints the nft
            await nftContract.mint(zeroX(ddo.shortId()), artist.getId())
        })

        it('should transfer an nft token with ether', async () => {
            assert.equal(
                await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())),
                artist.getId()
            )

            // collector orders the nft
            const agreementId = await nevermined.nfts721.order(ddo.id, collector)

            // artists sends the nft
            await nevermined.nfts721.transfer(agreementId, ddo.id, artist)

            assert.equal(
                await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())),
                collector.getId()
            )

            // artist fetches the payment
            await nevermined.nfts721.releaseRewards(agreementId, ddo.id, artist)
        })
    })
})
