import chai, { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import chaiAsPromised from 'chai-as-promised'
import { Account, DDO, Nevermined, AssetPrice } from '../../src'
import {
  EscrowPaymentCondition,
  TransferNFTCondition,
  Token,
  Nft1155Contract,
  ContractHandler,
} from '../../src/keeper'
import { config } from '../config'
import { getMetadata } from '../utils'
import {
  DIDResolvePolicy,
  getRoyaltyAttributes,
  PublishMetadataOptions,
  RoyaltyKind,
} from '../../src/nevermined/api/AssetsApi'
import { ethers } from 'ethers'
import '../globals'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import { NFTAttributes } from '../../src/models/NFTAttributes'

chai.use(chaiAsPromised)

function makeTest(isCustom) {
  describe(`NFTs 1155 Api End-to-End (${isCustom ? 'custom' : 'builtin'} token)`, () => {
    let artist: Account
    let collector1: Account
    let collector2: Account
    let gallery: Account

    let nevermined: Nevermined
    let token: Token
    let escrowPaymentCondition: EscrowPaymentCondition
    let transferNftCondition: TransferNFTCondition
    let ddo: DDO

    const metadata = getMetadata()
    const royalties1 = 100000 // 10% of royalties in the secondary market
    const royalties = 10 // 10% of royalties in the secondary market
    const cappedAmount = 5n
    let agreementId: string
    let agreementId2: string

    // Configuration of First Sale:
    // Artist -> Collector1, the gallery get a cut (25%)
    const numberEditions = 1n
    let nftPrice = 100n
    let amounts = [75n, 25n]
    let receivers: string[]
    let assetPrice1: AssetPrice

    let initialBalances: any
    let scale: bigint
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
        `Fee receiver: ${feeReceiver}, contract: ${
          escrowPaymentCondition.address
        }, artist: ${artist.getId()}, gallery: ${gallery.getId()}`,
      )

      if (isCustom) {
        const networkName = await nevermined.keeper.getNetworkName()
        const erc1155ABI = await ContractHandler.getABI(
          'NFT1155Upgradeable',
          config.artifactsFolder,
          networkName,
        )

        const nft = await nevermined.utils.contractHandler.deployAbi(erc1155ABI, artist, [
          artist.getId(),
          nevermined.keeper.didRegistry.address,
          'NFT1155',
          'NVM',
          '',
          nevermined.keeper.nvmConfig.address,
        ])

        const nftContract = await Nft1155Contract.getInstance(
          (nevermined.keeper as any).instanceConfig,
          await nft.getAddress(),
        )

        await nevermined.contracts.loadNft1155(nftContract.address)

        const nftContractOwner = new Account(artist.getId())
        await nftContract.grantOperatorRole(transferNftCondition.address, nftContractOwner)
      }

      // components
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;({ token } = nevermined.keeper)

      scale = 10n ** BigInt(await token.decimals())

      amounts = amounts.map((v) => v * scale)
      receivers = [artist.getId(), gallery.getId()]
      const lst: [string, bigint][] = [
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
      ]
      if (feeReceiver !== '0x0000000000000000000000000000000000000000') {
        receivers.push(feeReceiver)
        const price = amounts.reduce((a, b) => a + b, 0n)
        amounts.push((price * fee) / 1000000n - fee)
        lst.push([receivers[2], amounts[2]])
      }
      nftPrice = amounts.reduce((a, b) => a + b, 0n)
      assetPrice1 = new AssetPrice(new Map(lst))
      await collector1.requestTokens(nftPrice / scale)

      console.debug(
        `Contract balance (initial) ${await token.balanceOf(escrowPaymentCondition.address)}`,
      )
      initialBalances = {
        artist: await token.balanceOf(artist.getId()),
        collector1: await token.balanceOf(collector1.getId()),
        collector2: await token.balanceOf(collector2.getId()),
        gallery: await token.balanceOf(gallery.getId()),
        escrowPaymentCondition: await token.balanceOf(escrowPaymentCondition.address),
      }
    })

    describe('As an artist I want to register a new artwork', () => {
      it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
        const royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties1)

        const assetAttributes = AssetAttributes.getInstance({
          metadata,
          services: [
            {
              serviceType: 'nft-sales',
              price: assetPrice1,
              nft: { amount: numberEditions, nftTransfer: true },
            },
            {
              serviceType: 'nft-access',
              nft: { amount: numberEditions },
            },
          ],
          providers: [config.neverminedNodeAddress],
        })
        const nftAttributes = NFTAttributes.getNFT1155Instance({
          ...assetAttributes,
          nftContractAddress: nevermined.nfts1155.nftContract.address,
          cap: cappedAmount,
          royaltyAttributes,
          preMint: true,
        })
        ddo = await nevermined.nfts1155.create(nftAttributes, artist, {
          metadata: PublishMetadataOptions.IPFS,
        })

        assert.isDefined(ddo)

        const balance = await nevermined.nfts1155.balance(ddo.id, artist.getId())
        assert.isTrue(balance === 5n)
      })

      it('should give Nevermined the operator role', async () => {
        assert.isTrue(
          await nevermined.nfts1155.isOperator(
            ddo.id,
            nevermined.keeper.conditions.transferNftCondition.address,
          ),
        )
      })

      it('Should set the Node as a provider by default', async () => {
        const providers = await nevermined.assets.providers.list(ddo.id)
        assert.deepEqual(providers, [ethers.getAddress(config.neverminedNodeAddress)])
      })
    })

    describe('As a collector I want to buy some art', () => {
      it('I check the details of the NFT', async () => {
        await nevermined.assets.resolve(ddo.id, DIDResolvePolicy.ImmutableFirst)
        const details = await nevermined.nfts1155.details(ddo.id)
        assert.equal(details.mintCap, 5n)
        assert.equal(details.nftSupply, 5n)
        assert.equal(details.royaltyScheme, RoyaltyKind.Standard)
        assert.equal(details.royalties, 100000)
        assert.equal(details.owner, artist.getId())
        assert.isTrue(details.mintCap === 5n)
        assert.equal(details.nftSupply, 5n)
      })

      it('I am ordering the NFT', async () => {
        const collector1BalanceBefore = await token.balanceOf(collector1.getId())
        assert.isTrue(collector1BalanceBefore >= nftPrice)

        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.address,
        )

        agreementId = await nevermined.nfts1155.order(ddo.id, numberEditions, collector1)
        assert.isDefined(agreementId)

        const collector1BalanceAfter = await token.balanceOf(collector1.getId())
        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.address,
        )

        console.debug(
          `${collector1BalanceBefore} - ${nftPrice} == ${collector1BalanceAfter}\n`,
          `${escrowPaymentConditionBalanceBefore} + ${nftPrice} == ${escrowPaymentConditionBalanceAfter}`,
        )

        assert.equal(collector1BalanceBefore - nftPrice, collector1BalanceAfter)
        assert.equal(
          escrowPaymentConditionBalanceBefore + nftPrice,
          escrowPaymentConditionBalanceAfter,
        )
      })

      it('The artist can check the payment and transfer the NFT to the collector', async () => {
        const nftBalanceArtistBefore = await nevermined.nfts1155.balance(ddo.id, artist)
        const nftBalanceCollectorBefore = await nevermined.nfts1155.balance(ddo.id, collector1)

        console.debug(`Contract balance ${await token.balanceOf(escrowPaymentCondition.address)}`)

        const receipt = await nevermined.nfts1155.transfer(
          agreementId,
          ddo.id,
          numberEditions,
          artist,
        )
        assert.isTrue(receipt)

        console.debug(
          `Contract balance (after) ${await token.balanceOf(escrowPaymentCondition.address)}`,
        )
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
        const escrowPaymentConditionBefore = await token.balanceOf(escrowPaymentCondition.address)
        const service = ddo.findServiceByReference('nft-sales')

        const receipt = await nevermined.nfts1155.releaseRewards(
          agreementId,
          ddo.id,
          service.index,
          numberEditions,
          artist,
        )

        assert.isTrue(receipt)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.address,
        )
        const receiver0Balance = await token.balanceOf(assetPrice1.getReceivers()[0])
        const receiver1Balance = await token.balanceOf(assetPrice1.getReceivers()[1])
        const collectorBalance = await token.balanceOf(collector1.getId())

        console.debug(
          `${receiver0Balance} == ${initialBalances.artist} + ${assetPrice1.getAmounts()[0]}\n`,
          `${receiver1Balance} == ${initialBalances.gallery} + ${assetPrice1.getAmounts()[1]}\n`,
          `${initialBalances.collector1} - ${nftPrice} == ${collectorBalance}\n`,
          `${escrowPaymentConditionBefore} - ${nftPrice} == ${escrowPaymentConditionBalanceAfter}`,
        )

        assert.equal(receiver0Balance, initialBalances.artist + assetPrice1.getAmounts()[0])
        assert.equal(receiver1Balance, initialBalances.gallery + assetPrice1.getAmounts()[1])
        assert.equal(initialBalances.collector1 - nftPrice, collectorBalance)
        assert.equal(escrowPaymentConditionBefore - nftPrice, escrowPaymentConditionBalanceAfter)
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
          services: [
            {
              serviceType: 'nft-sales',
              price: assetPrice1,
              nft: { nftTransfer: true },
            },
            {
              serviceType: 'nft-access',
            },
          ],
        })
        const nftAttributes = NFTAttributes.getNFT1155Instance({
          ...assetAttributes,
          nftContractAddress: nevermined.nfts1155.nftContract.address,
          cap: cappedAmount,
          royaltyAttributes,
          preMint: true,
        })
        ddo = await nevermined.nfts1155.create(nftAttributes, artist)

        assert.isDefined(ddo)

        const balance = await nevermined.nfts1155.balance(ddo.id, artist)
        assert.isTrue(balance === 5n)

        await nevermined.nfts1155.setApprovalForAll(config.neverminedNodeAddress, true, artist)
      })

      it('The collector orders the nft', async () => {
        await collector1.requestTokens(nftPrice / scale)

        agreementId = await nevermined.nfts1155.order(ddo.id, numberEditions, collector1)
        assert.isDefined(agreementId)
      })

      it('Ask the Node to transfer the nft and release the rewards', async () => {
        const result = await nevermined.nfts1155.claim(
          agreementId,
          artist.getId(),
          collector1.getId(),
          numberEditions,
          ddo.id,
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
        const message = 'should throw this error message'

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
          services: [
            {
              serviceType: 'nft-sales',
              price: assetPrice1,
              nft: { nftTransfer: true },
            },
            {
              serviceType: 'nft-access',
            },
          ],
        })
        const nftAttributes = NFTAttributes.getNFT1155Instance({
          ...assetAttributes,
          nftContractAddress: nevermined.nfts1155.nftContract.address,
          cap: 1n,
          royaltyAttributes,
        })
        ddo = await nevermined.nfts1155.create(nftAttributes, artist)

        assert.isDefined(ddo)

        const balance = await nevermined.nfts1155.balance(ddo.id, artist)
        assert.deepEqual(balance, 1n)
      })

      it('Collector1 orders the nft', async () => {
        await collector1.requestTokens(nftPrice / scale)

        agreementId = await nevermined.nfts1155.order(ddo.id, numberEditions, collector1)
        assert.isDefined(agreementId)
      })

      it('Ask the Node to transfer the nft and release the rewards', async () => {
        const result = await nevermined.nfts1155.claim(
          agreementId,
          artist.getId(),
          collector1.getId(),
          1n,
        )
        assert.isTrue(result)
      })

      it('The Node should fulfill the NFTHolder and NFTAccess conditions', async () => {
        const result = await nevermined.nfts1155.access(ddo.id, collector1, '/tmp/', undefined)
        assert.isTrue(result)
      })

      it('The artist nft balance should be zero', async () => {
        const balance = await nevermined.nfts1155.balance(ddo.id, artist)
        assert.equal(balance, 0n)
      })

      it('Collector 2 setups a service agreement to buy the nft', async () => {
        await collector2.requestTokens(nftPrice / scale)

        agreementId2 = await nevermined.nfts1155.order(ddo.id, numberEditions, collector2)
        assert.isDefined(agreementId2)
      })

      it('The Node should not be able to transfer the nft', async () => {
        await assert.isRejected(
          nevermined.nfts1155.claim(agreementId2, artist.getId(), collector2.getId(), 1n),
        )
      })
    })

    describe('Node should not be able to transfer the nft without the operator role', () => {
      it('should create the subscription NFT without granting Nevermined the operator role', async () => {
        const networkName = await nevermined.keeper.getNetworkName()
        const erc1155ABI = await ContractHandler.getABI(
          'NFT1155Upgradeable',
          config.artifactsFolder,
          networkName,
        )

        const nft = await nevermined.utils.contractHandler.deployAbi(erc1155ABI, artist, [
          artist.getId(),
          nevermined.keeper.didRegistry.address,
          'NFT1155',
          'NVM',
          '',
          nevermined.keeper.nvmConfig.address,
        ])

        const nftContract = await Nft1155Contract.getInstance(
          (nevermined.keeper as any).instanceConfig,
          await nft.getAddress(),
        )

        await nevermined.contracts.loadNft1155(nftContract.address)

        const assetAttributes = AssetAttributes.getInstance({
          metadata: getMetadata(),
          services: [
            {
              serviceType: 'nft-sales',
              price: new AssetPrice(artist.getId(), 0n),
            },
          ],
        })
        const nftAttributes = NFTAttributes.getNFT1155Instance({
          ...assetAttributes,
          nftContractAddress: nevermined.nfts1155.nftContract.address,
          cap: 1n,
        })
        ddo = await nevermined.nfts1155.create(nftAttributes, artist)

        assert.isDefined(ddo)
      })

      it('subscriber should be able to order the nft', async () => {
        agreementId = await nevermined.nfts1155.order(ddo.id, numberEditions, collector1)
        assert.isDefined(agreementId)
      })

      it('nevermined should not allow the subscriber to claim through the node', async () => {
        await assert.isRejected(
          nevermined.nfts1155.claim(
            agreementId,
            artist.getId(),
            collector1.getId(),
            numberEditions,
            ddo.id,
          ),
          /Nevermined does not have operator role/,
        )
      })
    })
  })
}

makeTest(false)
makeTest(true)
