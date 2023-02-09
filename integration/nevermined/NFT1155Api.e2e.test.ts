import chai, { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import chaiAsPromised from 'chai-as-promised'
import { Account, DDO, Nevermined, AssetPrice } from '../../src'
import {
  EscrowPaymentCondition,
  TransferNFTCondition,
  Token,
  Nft1155Contract,
} from '../../src/keeper'
import { config } from '../config'
import { getMetadata } from '../utils'
import {
  getRoyaltyAttributes,
  PublishMetadata,
  RoyaltyKind,
} from '../../src/nevermined/api/AssetsApi'
import { ethers } from 'ethers'
import '../globals'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import { NFTAttributes } from '../../src/models/NFTAttributes'
import { DIDResolvePolicy } from '../../src/nevermined/api/RegistryBaseApi'
import { BigNumber } from '../../src/utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { sleep } from '../utils/utils'

chai.use(chaiAsPromised)

const DELAY = 2000

function makeTest(isCustom) {
  describe(`NFTs 1155 Api End-to-End (${isCustom ? 'custom' : 'builtin'} token)`, () => {
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account
    //    let governor: Account

    let nevermined: Nevermined
    let token: Token
    let escrowPaymentCondition: EscrowPaymentCondition
    let transferNftCondition: TransferNFTCondition
    let ddo: DDO

    const metadata = getMetadata()
    const royalties1 = 100000 // 10% of royalties in the secondary market
    const royalties = 10 // 10% of royalties in the secondary market
    const cappedAmount = BigNumber.from(5)
    let agreementId: string
    let agreementId2: string

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberEditions = BigNumber.from(1)
    let nftPrice = BigNumber.from(100)
    let amounts = [BigNumber.from(75), BigNumber.from(25)]
    let receivers: string[]
    let assetPrice1: AssetPrice

    let initialBalances: any
    let scale: BigNumber
    let payload: JWTPayload

    before(async () => {
      nevermined = await Nevermined.getInstance(config)
      ;[, artist, collector1, collector2, , gallery] = await nevermined.accounts.list()
      const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

      await nevermined.services.marketplace.login(clientAssertion)

      payload = decodeJwt(config.marketplaceAuthToken)

      metadata.userId = payload.sub

      // conditions
      ;({ escrowPaymentCondition, transferNftCondition } = nevermined.keeper.conditions)

      const feeReceiver = await nevermined.keeper.nvmConfig.getFeeReceiver()
      console.debug(`FEE RECEIVER = ${feeReceiver}`)

      const fee = await nevermined.keeper.nvmConfig.getNetworkFee()
      console.debug(`NETWORK FEE = ${fee}`)

      console.debug(
        `Fee receiver: ${feeReceiver}, contract: ${escrowPaymentCondition.getAddress()}, artist: ${artist.getId()}, gallery: ${gallery.getId()}`,
      )

      if (isCustom) {
        TestContractHandler.setConfig(config)

        const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
        const erc1155ABI = await TestContractHandler.getABI(
          'NFT1155Upgradeable',
          config.artifactsFolder,
          networkName,
        )

        const nft = await TestContractHandler.deployArtifact(erc1155ABI, artist.getId(), [
          artist.getId(),
          nevermined.keeper.didRegistry.address,
          'NFT1155',
          'NVM',
          '',
        ])

        const nftContract = await Nft1155Contract.getInstance(
          (nevermined.keeper as any).instanceConfig,
          nft.address,
        )

        await nevermined.contracts.loadNft1155(nftContract.address)

        const nftContractOwner = new Account(artist.getId())
        await nftContract.grantOperatorRole(transferNftCondition.address, nftContractOwner)
      }

      // components
      ;({ token } = nevermined.keeper)

      scale = BigNumber.from(10).pow(await token.decimals())

      amounts = amounts.map((v) => v.mul(scale))
      receivers = [artist.getId(), gallery.getId()]
      const lst: [string, BigNumber][] = [
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
      ]
      if (feeReceiver !== '0x0000000000000000000000000000000000000000') {
        receivers.push(feeReceiver)
        const price = amounts.reduce((a, b) => a.add(b), BigNumber.from(0))
        amounts.push(price.mul(fee).div(BigNumber.from(1000000).sub(fee)))
        lst.push([receivers[2], amounts[2]])
      }
      nftPrice = amounts.reduce((a, b) => a.add(b), BigNumber.from(0))
      assetPrice1 = new AssetPrice(new Map(lst))
      await collector1.requestTokens(nftPrice.div(scale))

      initialBalances = {
        artist: await token.balanceOf(artist.getId()),
        collector1: await token.balanceOf(collector1.getId()),
        collector2: await token.balanceOf(collector2.getId()),
        gallery: await token.balanceOf(gallery.getId()),
        escrowPaymentCondition: await token.balanceOf(escrowPaymentCondition.getAddress()),
      }
    })

    describe('As an artist I want to register a new artwork', () => {
      it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
        const royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties1)

        const assetAttributes = AssetAttributes.getInstance({
          metadata,
          price: assetPrice1,
          serviceTypes: ['nft-sales', 'nft-access'],
          providers: [config.neverminedNodeAddress],
        })
        const nftAttributes = NFTAttributes.getNFT1155Instance({
          ...assetAttributes,
          nftContractAddress: nevermined.nfts1155.nftContract.address,
          cap: cappedAmount,
          amount: numberEditions,
          royaltyAttributes,
          preMint: true,
        })
        ddo = await nevermined.nfts1155.create(nftAttributes, artist, PublishMetadata.IPFS)

        assert.isDefined(ddo)

        const balance = await nevermined.nfts1155.balance(ddo.id, artist.getId())
        assert.deepEqual(balance, BigNumber.from(5))
      })

      it('Should set the Node as a provider by default', async () => {
        const providers = await nevermined.assets.providers.list(ddo.id)
        assert.deepEqual(providers, [ethers.utils.getAddress(config.neverminedNodeAddress)])
      })
    })

    describe('As a collector I want to buy some art', () => {
      it('I check the details of the NFT', async () => {
        await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.ImmutableFirst)
        const details = await nevermined.nfts1155.details(ddo.id)
        assert.equal(details.mintCap.toNumber(), 5)
        assert.equal(details.nftSupply.toNumber(), 5)
        assert.equal(details.royaltyScheme, RoyaltyKind.Standard)
        assert.equal(details.royalties, 100000)
        assert.equal(details.owner, artist.getId())
        assert.equal(details.mintCap.toNumber(), 5)
        assert.equal(details.nftSupply.toNumber(), 5)
      })

      it('I am ordering the NFT', async () => {
        const collector1BalanceBefore = await token.balanceOf(collector1.getId())

        assert.isTrue(collector1BalanceBefore.gte(nftPrice))
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )

        agreementId = await nevermined.nfts1155.order(ddo.id, numberEditions, collector1)
        await sleep(DELAY)
        assert.isDefined(agreementId)

        const collector1BalanceAfter = await token.balanceOf(collector1.getId())
        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )

        assert.isTrue(collector1BalanceBefore.sub(nftPrice).eq(collector1BalanceAfter))
        // Note that in mumbai test this might fail if two tests are running at the same time
        assert.isTrue(
          escrowPaymentConditionBalanceBefore.add(nftPrice).eq(escrowPaymentConditionBalanceAfter),
        )
      })

      it('The artist can check the payment and transfer the NFT to the collector', async () => {
        const nftBalanceArtistBefore = await nevermined.nfts1155.balance(ddo.id, artist)
        const nftBalanceCollectorBefore = await nevermined.nfts1155.balance(ddo.id, collector1)

        const receipt = await nevermined.nfts1155.transfer(
          agreementId,
          ddo.id,
          numberEditions,
          artist,
        )
        assert.isTrue(receipt)
        await sleep(DELAY)

        const nftBalanceArtistAfter = await nevermined.nfts1155.balance(ddo.id, artist)
        const nftBalanceCollectorAfter = await nevermined.nfts1155.balance(ddo.id, collector1)
        assert.equal(
          Number(nftBalanceArtistAfter),
          Number(nftBalanceArtistBefore) - Number(numberEditions),
        )
        assert.equal(
          Number(nftBalanceCollectorAfter),
          Number(nftBalanceCollectorBefore) + Number(numberEditions),
        )
      })

      it('the artist asks and receives the payment', async () => {
        await sleep(DELAY)
        const escrowPaymentConditionBefore = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        await sleep(DELAY)
        const receipt = await nevermined.nfts1155.releaseRewards(
          agreementId,
          ddo.id,
          numberEditions,
          artist,
        )
        await sleep(DELAY)
        assert.isTrue(receipt)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        const receiver0Balance = await token.balanceOf(assetPrice1.getReceivers()[0])
        const receiver1Balance = await token.balanceOf(assetPrice1.getReceivers()[1])
        const collectorBalance = await token.balanceOf(collector1.getId())

        await sleep(DELAY)
        assert.isTrue(receiver0Balance.eq(initialBalances.artist.add(assetPrice1.getAmounts()[0])))
        assert.isTrue(receiver1Balance.eq(initialBalances.gallery.add(assetPrice1.getAmounts()[1])))
        assert.isTrue(initialBalances.collector1.sub(nftPrice).eq(collectorBalance))
        // Note that in mumbai test this might fail if two tests are running at the same time
        assert.isTrue(
          escrowPaymentConditionBefore.sub(nftPrice).eq(escrowPaymentConditionBalanceAfter),
        )
      })
    })

    describe('As a collector I want to order and access the NFT without the intervention of the artist', () => {
      it('The artist gives the Node permissions to transfer his nfts', async () => {
        const message = 'should throw this error message'

        try {
          await nevermined.nfts1155.setApprovalForAll(transferNftCondition.address, true, artist)

          await nevermined.nfts1155.setApprovalForAll(config.neverminedNodeAddress, true, artist)

          assert.fail(message)
        } catch (error) {
          assert.equal(error.message, message)
        }
      })

      it('The artist creates and mints the nfts', async () => {
        const newMetadata = getMetadata()
        newMetadata.userId = payload.sub
        const royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties)

        const assetAttributes = AssetAttributes.getInstance({
          metadata: newMetadata,
          serviceTypes: ['nft-sales', 'nft-access'],
          price: assetPrice1,
        })
        const nftAttributes = NFTAttributes.getNFT1155Instance({
          ...assetAttributes,
          nftContractAddress: nevermined.nfts1155.nftContract.address,
          cap: cappedAmount,
          royaltyAttributes,
        })
        ddo = await nevermined.nfts1155.create(nftAttributes, artist)

        assert.isDefined(ddo)

        const balance = await nevermined.nfts1155.balance(ddo.id, artist)
        assert.deepEqual(balance, BigNumber.from(5))

        await nevermined.nfts1155.setApprovalForAll(config.neverminedNodeAddress, true, artist)
      })

      it('The collector orders the nft', async () => {
        await collector1.requestTokens(nftPrice.div(scale))

        agreementId = await nevermined.nfts1155.order(ddo.id, numberEditions, collector1)
        assert.isDefined(agreementId)
      })

      it('Ask the Node to transfer the nft and release the rewards', async () => {
        const result = await nevermined.nfts1155.claim(
          agreementId,
          artist.getId(),
          collector1.getId(),
          numberEditions,
        )
        assert.isTrue(result)
      })

      it('The Node should fulfill the NFTHolder and NFTAccess conditions', async () => {
        const result = await nevermined.nfts1155.access(ddo.id, collector1, '/tmp/', undefined)
        assert.isTrue(result)
      })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
      it('The collector access the files', async () => {
        const result = await nevermined.nfts1155.access(ddo.id, collector1, '/tmp/')
        assert.isTrue(result)
      })
    })

    describe('As a collector I should not be able to buy a sold out nft', () => {
      it('The artist gives the Node permissions to transfer his nfts', async () => {
        const message = 'shold throw this error message'

        try {
          await nevermined.nfts1155.setApprovalForAll(config.neverminedNodeAddress, true, artist)

          assert.fail(message)
        } catch (error) {
          assert.equal(error.message, message)
        }
      })
      it('The artist creates and mints one nft', async () => {
        const newMetadata = getMetadata()
        newMetadata.userId = payload.sub
        const royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties)

        const assetAttributes = AssetAttributes.getInstance({
          metadata: newMetadata,
          serviceTypes: ['nft-sales', 'nft-access'],
          price: assetPrice1,
        })
        const nftAttributes = NFTAttributes.getNFT1155Instance({
          ...assetAttributes,
          nftContractAddress: nevermined.nfts1155.nftContract.address,
          cap: BigNumber.from(1),
          royaltyAttributes,
        })
        ddo = await nevermined.nfts1155.create(nftAttributes, artist)

        assert.isDefined(ddo)

        const balance = await nevermined.nfts1155.balance(ddo.id, artist)
        assert.deepEqual(balance, BigNumber.from(1))
      })

      it('Collector1 orders the nft', async () => {
        await collector1.requestTokens(nftPrice.div(scale))

        agreementId = await nevermined.nfts1155.order(ddo.id, numberEditions, collector1)
        assert.isDefined(agreementId)
      })

      it('Ask the Node to transfer the nft and release the rewards', async () => {
        const result = await nevermined.nfts1155.claim(
          agreementId,
          artist.getId(),
          collector1.getId(),
          BigNumber.from(1),
        )
        assert.isTrue(result)
      })

      it('The Node should fulfill the NFTHolder and NFTAccess conditions', async () => {
        const result = await nevermined.nfts1155.access(ddo.id, collector1, '/tmp/', undefined)
        assert.isTrue(result)
      })

      it('The artist nft balance should be zero', async () => {
        const balance = await nevermined.nfts1155.balance(ddo.id, artist)
        assert.deepEqual(balance, BigNumber.from(0))
      })

      it('Collector 2 setups a service agreement to buy the nft', async () => {
        await collector2.requestTokens(nftPrice.div(scale))

        agreementId2 = await nevermined.nfts1155.order(ddo.id, numberEditions, collector2)
        assert.isDefined(agreementId2)
      })

      it('The Node should not be able to transfer the nft', async () => {
        await assert.isRejected(
          nevermined.nfts1155.claim(
            agreementId2,
            artist.getId(),
            collector2.getId(),
            BigNumber.from(1),
          ),
        )
      })
    })
  })
}

makeTest(false)
makeTest(true)
