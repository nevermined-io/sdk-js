import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { NvmAccount, DDO, Nevermined, NFTAttributes, AssetPrice } from '../../src'
import {
  EscrowPaymentCondition,
  TransferNFT721Condition,
  Token,
  Nft721Contract,
  ContractHandler,
} from '../../src/keeper'
import { config } from '../config'
import { getMetadata } from '../utils'
import { ethers } from 'ethers'
import '../globals'

describe('NFTs721 Api End-to-End', () => {
  let nftContractOwner: NvmAccount
  let artist: NvmAccount
  let collector1: NvmAccount
  let gallery: NvmAccount

  let nevermined: Nevermined
  let token: Token
  let escrowPaymentCondition: EscrowPaymentCondition
  let transferNft721Condition: TransferNFT721Condition
  let ddo: DDO

  const metadata = getMetadata()
  let agreementId: string

  // Configuration of First Sale:
  // Artist -> Collector1, the gallery get a cut (25%)
  let nftPrice = 20n
  let amounts = [15n, 5n]
  let receivers: string[]
  let assetPrice1: AssetPrice

  let initialBalances: any
  let scale: bigint

  let nft: ethers.BaseContract
  let nftContract: Nft721Contract

  let payload: JWTPayload

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[, artist, collector1, , gallery] = await nevermined.accounts.list()

    const networkName = await nevermined.keeper.getNetworkName()
    const erc721ABI = await ContractHandler.getABIArtifact(
      'NFT721Upgradeable',
      config.artifactsFolder,
      networkName,
    )

    nft = await nevermined.utils.blockchain.deployAbi(erc721ABI, artist, [
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
      await nft.getAddress(),
    )

    await nevermined.contracts.loadNft721(nftContract.address)

    nftContractOwner = new NvmAccount((await nftContract.owner()) as string)

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

    await nevermined.services.marketplace.login(clientAssertion)
    payload = decodeJwt(config.marketplaceAuthToken)
    metadata.userId = payload.sub

    // conditions
    ;({ escrowPaymentCondition, transferNft721Condition } = nevermined.keeper.conditions)

    // components
    ;({ token } = nevermined.keeper)

    scale = 10n ** BigInt(await token.decimals())

    nftPrice = nftPrice * scale
    amounts = amounts.map((v) => v * scale)
    receivers = [artist.getId(), gallery.getId()]
    assetPrice1 = new AssetPrice(
      new Map([
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
      ]),
    )

    await nftContract.grantOperatorRole(transferNft721Condition.address, nftContractOwner)

    initialBalances = {
      artist: await token.balanceOf(artist.getId()),
      collector1: await token.balanceOf(collector1.getId()),
      gallery: await token.balanceOf(gallery.getId()),
      escrowPaymentCondition: Number(await token.balanceOf(escrowPaymentCondition.address)),
    }
  })

  describe('As an artist I want to register a new artwork', () => {
    it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice1,
            nft: { nftTransfer: true },
          },
          {
            serviceType: 'nft-access',
            nft: { nftTransfer: true },
          },
        ],
        nftContractAddress: nftContract.address,
        preMint: true,
      })
      ddo = await nevermined.nfts721.create(nftAttributes, artist)

      assert.isDefined(ddo)

      const owner = await nevermined.nfts721.ownerOfAsset(ddo.id)
      assert.equal(owner, artist.getId())
    })

    it('should give operator role to Nevermined', async () => {
      assert.isTrue(
        await nevermined.nfts721.isOperatorOfDID(
          ddo.id,
          nevermined.keeper.conditions.transferNft721Condition.address,
        ),
      )
    })
  })

  describe('As a collector I want to buy some art', () => {
    it('I check the details of the NFT', async () => {
      const details = await nevermined.nfts1155.details(ddo.id)
      assert.equal(details.owner, artist.getId())
    })

    it('I am ordering the NFT', async () => {
      await collector1.requestTokens(nftPrice / scale)

      const collector1BalanceBefore = await token.balanceOf(collector1.getId())
      assert.equal(initialBalances.collector1 + nftPrice, collector1BalanceBefore)

      agreementId = await nevermined.nfts721.order(ddo.id, collector1)

      console.log(`DID: ${ddo.id}`)
      assert.isDefined(agreementId)

      const collector1BalanceAfter = await token.balanceOf(collector1.getId())

      assert.equal(collector1BalanceAfter - initialBalances.collector1, 0n)
    })

    it('The artist can check the payment and transfer the NFT to the collector', async () => {
      assert.equal(await nevermined.nfts721.ownerOfAsset(ddo.id), artist.getId())

      const receipt = await nevermined.nfts721.transfer(agreementId, ddo.id, artist)
      assert.isTrue(receipt)

      assert.equal(await nevermined.nfts721.ownerOfAsset(ddo.id), collector1.getId())
    })

    it('the artist asks and receives the payment', async () => {
      const escrowPaymentConditionBalanceBefore = await token.balanceOf(
        escrowPaymentCondition.address,
      )

      const receipt = await nevermined.nfts721.releaseRewards(agreementId, ddo.id, artist)

      assert.isTrue(receipt)

      const escrowPaymentConditionBalanceAfter = await token.balanceOf(
        escrowPaymentCondition.address,
      )
      const receiver0Balance = await token.balanceOf(assetPrice1.getReceivers()[0])
      const receiver1Balance = await token.balanceOf(assetPrice1.getReceivers()[1])
      const collectorBalance = await token.balanceOf(collector1.getId())

      assert.equal(initialBalances.artist + assetPrice1.getAmounts()[0], receiver0Balance)
      assert.equal(initialBalances.gallery + assetPrice1.getAmounts()[1], receiver1Balance)

      assert.equal(collectorBalance - initialBalances.collector1, 0n)
      assert.equal(
        escrowPaymentConditionBalanceBefore - assetPrice1.getTotalPrice(),
        escrowPaymentConditionBalanceAfter,
      )
    })
  })

  describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
    it('The collector access the files to download', async () => {
      const result = await nevermined.nfts1155.access(ddo.id, collector1, '/tmp/')
      assert.isTrue(result)
    })
  })
})
