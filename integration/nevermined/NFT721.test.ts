import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import config from '../../test/config'
import { Nevermined } from '@/nevermined/Nevermined'
import { NvmAccount } from '@/models/NvmAccount'
import { DDO } from '@/ddo/DDO'
import { AssetPrice } from '@/models/AssetPrice'
import { getMetadata } from '../utils/ddo-metadata-generator'

import { NFTAttributes } from '@/models/NFTAttributes'
import { parseEther } from '@/nevermined/utils/BlockchainViemUtils'
import { ZeroAddress } from '@/constants/AssetConstants'
import { Nft721Contract } from '@/keeper/contracts/Nft721Contract'
import { TransferNFT721Condition } from '@/keeper/contracts/conditions/NFTs/TransferNFT721Condition'
import { TokenUtils } from '@/nevermined/Token'
import { ContractHandler } from '@/keeper/ContractHandler'
import { generateId } from '@/common/helpers'
import { zeroX } from '@/utils/ConversionTypeHelpers'

describe('Nfts721 operations', async () => {
  let nevermined: Nevermined
  let transferNft721Condition: TransferNFT721Condition

  let nft
  let nftContract: Nft721Contract

  let deployer: NvmAccount
  let artist: NvmAccount
  let collector: NvmAccount
  let ddo: DDO

  let token: TokenUtils
  let payload: JWTPayload

  before(async () => {
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[deployer, artist, collector] = nevermined.accounts.list()

    const networkName = await nevermined.keeper.getNetworkName()
    const erc721ABI = await ContractHandler.getABIArtifact(
      'NFT721Upgradeable',
      config.artifactsFolder,
      networkName,
    )

    // deploy a nft contract we can use
    nft = await nevermined.utils.blockchain.deployAbi(erc721ABI, deployer, [
      artist.getId(),
      nevermined.keeper.didRegistry.address,
      'NFT721',
      'NVM',
      '',
      '0',
      nevermined.keeper.nvmConfig.address,
    ])
    nftContract = await Nft721Contract.getInstance(
      (nevermined.keeper as any).instanceConfig,
      await nft.address,
    )

    await nevermined.contracts.loadNft721(nftContract.address)

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

    ;({ transferNft721Condition } = nevermined.keeper.conditions)

    const nftOwner = NvmAccount.fromAddress((await nftContract.owner()) as `0x${string}`)

    nftContract.grantOperatorRole(transferNft721Condition.address, nftOwner)

    await nevermined.services.marketplace.login(clientAssertion)
    payload = decodeJwt(config.marketplaceAuthToken)
    ;({ token } = nevermined.utils)
  })

  describe('with default token', async () => {
    before(async () => {
      const metadata = getMetadata()
      metadata.userId = payload.sub

      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            nft: { nftTransfer: true },
          },
          {
            serviceType: 'nft-access',
          },
        ],
        nftContractAddress: await nft.address,
        preMint: true,
      })
      assert.equal(nftAttributes.fulfillAccessTimelock, 0)
      ddo = await nevermined.nfts721.create(nftAttributes, artist)
    })

    it('should clone an existing erc-721 nft contract', async () => {
      const cloneAddress = await nftContract.createClone('My New NFT', 'xyz', '', 10n, [], artist)
      assert.isDefined(cloneAddress)
      console.log(`NFT (ERC-721) cloned into address ${cloneAddress}`)
    })

    it('should mint and burn a nft token', async () => {
      // artist mints the nft
      const tokenId = generateId()
      await nftContract.mint(zeroX(tokenId), artist)

      await nftContract.burn(zeroX(tokenId), artist)
    })

    it('should transfer an nft token with default token', async () => {
      console.log(`Checking owner of DID ${ddo.id}`)

      assert.equal(await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())), artist.getId())
      assert.equal(await nevermined.nfts721.balanceOf(collector.getId()), 0n)

      // collector orders the nft
      const agreementId = await nevermined.nfts721.order(ddo.id, collector)

      // artists sends the nft
      await nevermined.nfts721.transfer(agreementId, ddo.id, artist)

      assert.equal(await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())), collector.getId())
      assert.equal(await nevermined.nfts721.balanceOf(collector.getId()), 1n)

      // artist fetches the payment
      await nevermined.nfts721.releaseRewards(agreementId, ddo.id, artist)
    })
  })

  describe('with custom token', async () => {
    before(async () => {
      const metadata = getMetadata()
      metadata.userId = payload.sub

      // artist creates the nft
      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: new AssetPrice().setTokenAddress(token.getAddress()),
            nft: { nftTransfer: true },
          },
          {
            serviceType: 'nft-access',
          },
        ],
        nftContractAddress: await nft.address,
        preMint: false,
      })
      ddo = await nevermined.nfts721.create(nftAttributes, artist)
    })

    it('should mint an nft token', async () => {
      // artist mints the nft
      await nftContract.mint(zeroX(ddo.shortId()), artist)
    })

    it('should transfer an nft token with custom token', async () => {
      assert.equal(await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())), artist.getId())

      // collector orders the nft
      const agreementId = await nevermined.nfts721.order(ddo.id, collector)

      // artists sends the nft
      await nevermined.nfts721.transfer(agreementId, ddo.id, artist)

      assert.equal(await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())), collector.getId())

      // artist fetches the payment
      await nevermined.nfts721.releaseRewards(agreementId, ddo.id, artist)
    })
  })

  describe('with ether', async () => {
    before(async () => {
      const metadata = getMetadata()
      metadata.userId = payload.sub
      // artist creates the nft

      const assetPrice = new AssetPrice(artist.getId(), parseEther('0.1')).setTokenAddress(
        ZeroAddress,
      ) // With ETH

      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice,
            nft: { nftTransfer: true },
          },
          {
            serviceType: 'nft-access',
          },
        ],
        nftContractAddress: await nft.address,
        preMint: false,
      })
      ddo = await nevermined.nfts721.create(nftAttributes, artist)
    })

    it('should mint an nft token', async () => {
      // artist mints the nft
      await nftContract.mint(zeroX(ddo.shortId()), artist)
    })

    it('should transfer an nft token with ether', async () => {
      assert.equal(await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())), artist.getId())

      // collector orders the nft
      const agreementId = await nevermined.nfts721.order(ddo.id, collector)

      // artists sends the nft
      await nevermined.nfts721.transfer(agreementId, ddo.id, artist)

      assert.equal(await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())), collector.getId())

      // artist fetches the payment
      await nevermined.nfts721.releaseRewards(agreementId, ddo.id, artist)
    })
  })
})
