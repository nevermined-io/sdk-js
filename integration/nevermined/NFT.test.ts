import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, NvmAccount, DDO, AssetPrice, NFTAttributes } from '../../src'
import { ZeroAddress } from '../../src/utils'
import {
  getRoyaltyAttributes,
  parseEther,
  RoyaltyAttributes,
  RoyaltyKind,
} from '../../src/nevermined'

describe('Nfts operations', () => {
  let nevermined: Nevermined

  let artist: NvmAccount
  let collector: NvmAccount
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

      const nftAttributes = NFTAttributes.getNFT1155Instance({
        metadata,
        services: [
          { serviceType: 'nft-sales', nft: { amount: 2n, nftTransfer: true } },
          { serviceType: 'nft-access' },
        ],
        nftContractAddress: nevermined.nfts1155.nftContract.address,
        cap: 10n,
        royaltyAttributes,
        preMint: true,
      })
      ddo = await nevermined.nfts1155.create(nftAttributes, artist)
    })

    it('nft contract address is correct', async () => {
      assert.equal(
        nevermined.assets.getNftContractAddress(ddo),
        nevermined.keeper.nftUpgradeable.address,
      )
    })

    it('artist should have balance because are pre-minted', async () => {
      assert.isTrue((await nevermined.nfts1155.balance(ddo.id, artist)) === 10n)
    })

    it('should transfer 2 nft tokens with default token', async () => {
      const agreementId = await nevermined.nfts1155.order(ddo.id, 2n, collector)

      await nevermined.nfts1155.transfer(agreementId, ddo.id, 2n, artist)

      assert.isTrue((await nevermined.nfts1155.balance(ddo.id, artist)) === 8n)
      console.log(`After Assert Balance`)

      assert.isTrue((await nevermined.nfts1155.balance(ddo.id, collector)) === 2n)
    })

    it('should the operation be approved', async () => {
      await nevermined.nfts1155.setApprovalForAll(config.neverminedNodeAddress, true, artist)
      const isApproved = await nevermined.nfts1155.isApprovedForAll(
        config.neverminedNodeAddress,
        artist.getId(),
      )
      assert.equal(Boolean(isApproved), true)
    })

    it('should burn nft tokens', async () => {
      await nevermined.nfts1155.burn(ddo.id, 6n, artist)
      assert.isTrue((await nevermined.nfts1155.balance(ddo.id, artist)) === 2n)
    })
  })

  describe('with custom token', async () => {
    before(async () => {
      const metadata = getMetadata()
      metadata.userId = payload.sub

      const nftAttributes = NFTAttributes.getNFT1155Instance({
        metadata,
        services: [
          { serviceType: 'nft-sales', nft: { nftTransfer: true } },
          { serviceType: 'nft-access' },
        ],
        nftContractAddress: nevermined.nfts1155.nftContract.address,
        cap: 10n,
        preMint: true,
        royaltyAttributes,
      })
      ddo = await nevermined.nfts1155.create(nftAttributes, artist)
    })

    it('should mint 10 nft tokens', async () => {
      assert.isTrue((await nevermined.nfts1155.balance(ddo.id, artist)) === 10n)
    })

    it('should transfer 2 nft tokens with custom token', async () => {
      const agreementId = await nevermined.nfts1155.order(ddo.id, 2n, collector)
      await nevermined.nfts1155.transfer(agreementId, ddo.id, 2n, artist)

      assert.equal(await nevermined.nfts1155.balance(ddo.id, artist), 8n)
      assert.equal(await nevermined.nfts1155.balance(ddo.id, collector), 2n)
    })

    it('should burn nft tokens', async () => {
      await nevermined.nfts1155.burn(ddo.id, 6n, artist)
      assert.deepEqual(await nevermined.nfts1155.balance(ddo.id, artist), 2n)
    })
  })

  describe('with ether', async () => {
    before(async () => {
      const metadata = getMetadata()
      metadata.userId = payload.sub

      const nftAttributes = NFTAttributes.getNFT1155Instance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: new AssetPrice(artist.getId(), parseEther('0.1')).setTokenAddress(ZeroAddress),
            nft: { nftTransfer: true },
          },
          {
            serviceType: 'nft-access',
          },
        ],
        nftContractAddress: nevermined.nfts1155.nftContract.address,
        cap: 10n,
        royaltyAttributes,
      })
      ddo = await nevermined.nfts1155.create(nftAttributes, artist)
    })

    it('should mint 10 nft tokens', async () => {
      assert.equal(await nevermined.nfts1155.balance(ddo.id, artist), 10n)
    })

    it('should transfer 2 nft tokens with ether', async () => {
      const agreementId = await nevermined.nfts1155.order(ddo.id, 2n, collector)
      await nevermined.nfts1155.transfer(agreementId, ddo.id, 2n, artist)

      assert.isTrue((await nevermined.nfts1155.balance(ddo.id, artist)) === 8n)
      assert.isTrue((await nevermined.nfts1155.balance(ddo.id, collector)) === 2n)
    })

    it('should burn nft tokens', async () => {
      await nevermined.nfts1155.burn(ddo.id, 6n, artist)

      assert.isTrue((await nevermined.nfts1155.balance(ddo.id, artist)) === 2n)
    })
  })
})
