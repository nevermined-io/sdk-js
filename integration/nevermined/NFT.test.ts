import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO } from '../../src'
import AssetPrice from '../../src/models/AssetPrice'
import { ZeroAddress } from '../../src/utils'
import BigNumber from '../../src/utils/BigNumber'
import {
    getRoyaltyAttributes,
    RoyaltyAttributes,
    RoyaltyKind
} from '../../src/nevermined/api/AssetsApi'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import { NFTAttributes } from '../../src/models/NFTAttributes'

describe('Nfts operations', () => {
    let nevermined: Nevermined

    let artist: Account
    let collector: Account
    let ddo: DDO

    let payload: JWTPayload
    let royaltyAttributes: RoyaltyAttributes

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[artist, collector] = await nevermined.accounts.list()
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

        await nevermined.services.marketplace.login(clientAssertion)
        payload = decodeJwt(config.marketplaceAuthToken)
    })

    describe('with default token', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub
            royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 0)

            const assetAttributes = AssetAttributes.getInstance({
                metadata,
                serviceTypes: ['nft-sales', 'nft-access']
            })
            const nftAttributes = NFTAttributes.getNFT1155Instance({                
                nftContractAddress: nevermined.nfts1155.nftContract.address,
                cap: BigNumber.from(10),
                royaltyAttributes
            })            
            ddo = await nevermined.nfts1155.create(
                assetAttributes,
                nftAttributes,
                artist
            )

        })

        it('should mint 10 nft tokens', async () => {
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(10)
            )
        })

        it('should transfer 2 nft tokens with default token', async () => {
            const agreementId = await nevermined.nfts1155.order(
                ddo.id,
                BigNumber.from(2),
                collector
            )
            await nevermined.nfts1155.transfer(agreementId, ddo.id, BigNumber.from(2), artist)

            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(8)
            )
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, collector),
                BigNumber.from(2)
            )
        })

        it('should the operation be approved', async () => {
            await nevermined.nfts1155.setApprovalForAll(config.neverminedNodeAddress, true, artist)
            const isApproved = await nevermined.nfts1155.isApprovedForAll(config.neverminedNodeAddress, artist.getId())
            assert.equal(Boolean(isApproved), true)
        })

        it('should burn nft tokens', async () => {
            await nevermined.nfts1155.burn(ddo.id, BigNumber.from(6), artist)
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(2)
            )
        })
    })

    describe('with custom token', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub

            const assetAttributes = AssetAttributes.getInstance({
                metadata,
                serviceTypes: ['nft-sales', 'nft-access']
            })
            const nftAttributes = NFTAttributes.getNFT1155Instance({                
                nftContractAddress: nevermined.nfts1155.nftContract.address,
                cap: BigNumber.from(10),
                royaltyAttributes
            })            
            ddo = await nevermined.nfts1155.create(
                assetAttributes,
                nftAttributes,
                artist
            )
        })

        it('should mint 10 nft tokens', async () => {
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(10)
            )
        })

        it('should transfer 2 nft tokens with custom token', async () => {
            const agreementId = await nevermined.nfts1155.order(
                ddo.id,
                BigNumber.from(2),
                collector
            )
            await nevermined.nfts1155.transfer(agreementId, ddo.id, BigNumber.from(2), artist)

            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(8)
            )
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, collector),
                BigNumber.from(2)
            )
        })

        it('should burn nft tokens', async () => {
            await nevermined.nfts1155.burn(ddo.id, BigNumber.from(6), artist)
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(2)
            )
        })
    })

    describe('with ether', async () => {
        before(async () => {
            const metadata = getMetadata()
            metadata.userId = payload.sub

            const assetAttributes = AssetAttributes.getInstance({
                metadata,
                serviceTypes: ['nft-sales', 'nft-access'],
                price: new AssetPrice(artist.getId(), BigNumber.parseEther('0.1')).setTokenAddress(ZeroAddress)
            })
            const nftAttributes = NFTAttributes.getNFT1155Instance({                
                nftContractAddress: nevermined.nfts1155.nftContract.address,
                cap: BigNumber.from(10),
                royaltyAttributes
            })            
            ddo = await nevermined.nfts1155.create(
                assetAttributes,
                nftAttributes,
                artist
            )
        })

        it('should mint 10 nft tokens', async () => {
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(10)
            )
        })

        it('should transfer 2 nft tokens with ether', async () => {
            const agreementId = await nevermined.nfts1155.order(
                ddo.id,
                BigNumber.from(2),
                collector
            )
            await nevermined.nfts1155.transfer(agreementId, ddo.id, BigNumber.from(2), artist)

            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(8)
            )
            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, collector),
                BigNumber.from(2)
            )
        })

        it('should burn nft tokens', async () => {
            await nevermined.nfts1155.burn(ddo.id, BigNumber.from(6), artist)

            assert.deepEqual(
                await nevermined.nfts1155.balance(ddo.id, artist),
                BigNumber.from(2)
            )
        })
    })
})
