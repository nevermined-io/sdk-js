import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO, NFTAttributes, AssetPrice } from '../../src'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { generateId, ZeroAddress, zeroX } from '../../src/utils'
import { TokenUtils } from '../../src/nevermined'
import { ethers } from 'ethers'
import { Nft721Contract, TransferNFT721Condition } from '../../src/keeper'
import { BigNumber } from '../../src/utils'

describe('Nfts721 operations', async () => {
  let nevermined: Nevermined
  let transferNft721Condition: TransferNFT721Condition

  let nft: ethers.Contract
  let nftContract: Nft721Contract

  let deployer: Account
  let artist: Account
  let collector: Account
  let ddo: DDO

  let token: TokenUtils
  let payload: JWTPayload

  before(async () => {
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[deployer, artist, collector] = await nevermined.accounts.list()

    TestContractHandler.setConfig(config)

    const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
    const erc721ABI = await TestContractHandler.getABI(
      'NFT721Upgradeable',
      config.artifactsFolder,
      networkName,
    )

    // deploy a nft contract we can use
    nft = await TestContractHandler.deployArtifact(erc721ABI, deployer.getId(), [
      artist.getId(),
      nevermined.keeper.didRegistry.address,
      'NFT721',
      'NVM',
      '',
      0,
    ])
    nftContract = await Nft721Contract.getInstance(
      (nevermined.keeper as any).instanceConfig,
      nft.address,
    )

    await nevermined.contracts.loadNft721(nftContract.address)

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

    ;({ transferNft721Condition } = nevermined.keeper.conditions)

    const nftOwner = new Account((await nftContract.owner()) as string)
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
        serviceTypes: ['nft-sales', 'nft-access'],
        nftContractAddress: nft.address,
      })
      assert.equal(nftAttributes.fulfillAccessTimelock, 0)
      ddo = await nevermined.nfts721.create(nftAttributes, artist)
    })

    it('should clone an existing erc-721 nft contract', async () => {
      const cloneAddress = await nftContract.createClone(
        'My New NFT',
        'xyz',
        '',
        BigNumber.from(10),
        [],
        artist,
      )
      assert.isDefined(cloneAddress)
      console.log(`NFT (ERC-721) clonned into address ${cloneAddress}`)
    })

    it('should mint and burn a nft token', async () => {
      // artist mints the nft
      const tokenId = generateId()
      await nftContract.mint(zeroX(tokenId), artist.getId())

      await nftContract.burn(zeroX(tokenId), artist)
    })

    it('should transfer an nft token with default token', async () => {
      console.log(`Checking owner of DID ${ddo.id}`)

      assert.equal(await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())), artist.getId())
      assert.isTrue(BigNumber.from(0).eq(await nevermined.nfts721.balanceOf(collector.getId())))

      // collector orders the nft
      const agreementId = await nevermined.nfts721.order(ddo.id, collector)

      // artists sends the nft
      await nevermined.nfts721.transfer(agreementId, ddo.id, artist)

      assert.equal(await nevermined.nfts721.ownerOfAsset(zeroX(ddo.shortId())), collector.getId())
      assert.isTrue(BigNumber.from(1).eq(await nevermined.nfts721.balanceOf(collector.getId())))

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
        price: new AssetPrice().setTokenAddress(token.getAddress()),
        serviceTypes: ['nft-sales', 'nft-access'],
        nftContractAddress: nft.address,
        preMint: false,
      })
      ddo = await nevermined.nfts721.create(nftAttributes, artist)
    })

    it('should mint an nft token', async () => {
      // artist mints the nft
      await nftContract.mint(zeroX(ddo.shortId()), artist.getId())
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

      const assetPrice = new AssetPrice(
        artist.getId(),
        BigNumber.parseEther('0.1'),
      ).setTokenAddress(ZeroAddress) // With ETH

      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata,
        price: assetPrice,
        serviceTypes: ['nft-sales', 'nft-access'],
        nftContractAddress: nft.address,
        preMint: false,
      })
      ddo = await nevermined.nfts721.create(nftAttributes, artist)
    })

    it('should mint an nft token', async () => {
      // artist mints the nft
      await nftContract.mint(zeroX(ddo.shortId()), artist.getId())
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
