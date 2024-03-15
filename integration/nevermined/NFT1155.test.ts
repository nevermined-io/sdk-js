import chai, { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import chaiAsPromised from 'chai-as-promised'
import {
  Account,
  DDO,
  Nevermined,
  AssetPrice,
  NFTAttributes,
  ContractHandler,
  ChargeType,
  NFTServiceAttributes,
} from '../../src'
import { config } from '../config'
import { getMetadata } from '../utils'
import { getRoyaltyAttributes, RoyaltyKind } from '../../src/nevermined'
import { ethers } from 'ethers'
import '../globals'

chai.use(chaiAsPromised)

describe('NFT1155 End-to-End', () => {
  let deployer: Account
  let publisher: Account
  let someone: Account
  let minter: Account
  let nftContract: ethers.BaseContract

  let nevermined: Nevermined
  let ddo: DDO
  let token
  let nftUpgradeable

  const amounts = [15n, 5n]

  const metadata = getMetadata()
  const royalties = 0 // 10% of royalties in the secondary market
  const cappedAmount = 10n
  const preMint = false
  const numberNFTs = 1n

  let royaltyAttributes
  let receivers: string[]
  let assetPrice: AssetPrice

  let payload: JWTPayload

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[deployer, publisher, someone, minter, ,] = await nevermined.accounts.list()
    ;({ token, nftUpgradeable } = nevermined.keeper)

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)

    payload = decodeJwt(config.marketplaceAuthToken)

    metadata.userId = payload.sub

    receivers = [publisher.getId(), deployer.getId()]
    assetPrice = new AssetPrice(
      new Map([
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
      ]),
    ).setTokenAddress(token.address)
  })

  describe('As user I can deploy Nevermined ERC-1155 NFT contract instances', () => {
    it('Using the ABI', async () => {
      const networkName = await nevermined.keeper.getNetworkName()
      const erc1155ABI = await ContractHandler.getABIArtifact(
        'NFT1155Upgradeable',
        config.artifactsFolder,
        networkName,
      )

      nftContract = await nevermined.utils.blockchain.deployAbi(erc1155ABI, deployer, [
        deployer.getId(),
        nevermined.keeper.didRegistry.address,
        'NFT1155',
        'NVM',
        '',
        nevermined.keeper.nvmConfig.address,
      ])

      assert.isDefined(nftContract)
      console.log(`NFT (ERC-1155) deployed at address ${await nftContract.getAddress()}`)
    })

    it('Cloning an instance', async () => {
      const cloneAddress = await nevermined.nfts1155.getContract.createClone(
        'My New NFT',
        'xyz',
        '',
        [],
        deployer,
      )
      assert.isDefined(cloneAddress)
      console.log(`NFT (ERC-1155) clonned into address ${cloneAddress}`)
    })
  })

  describe('As publisher I can setup different charging mechanisms', () => {
    it('Should be able to charge fixed amounts', async () => {
      const chargeType = ChargeType.Fixed
      const nftService = new NFTServiceAttributes()
      nftService.amount = 2n

      const amountToCharge = NFTServiceAttributes.getCreditsToCharge(nftService, chargeType)
      assert.equal(amountToCharge, 2n)
    })

    it('Should be able to charge dynamic amounts', async () => {
      const chargeType = ChargeType.Dynamic
      const dynamicAmount = 3n
      const nftService = new NFTServiceAttributes()
      nftService.amount = 1n
      nftService.minCreditsRequired = 1n
      nftService.maxCreditsToCharge = 5n

      const amountToCharge = NFTServiceAttributes.getCreditsToCharge(
        nftService,
        chargeType,
        dynamicAmount,
      )
      assert.equal(amountToCharge, 3n)
    })
  })

  describe('As user I can register a mintable asset and manage some permissions', () => {
    it('Should be able to publish a mintable DID attached to the new NFT1155 contract', async () => {
      royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties)

      const nftAttributes = NFTAttributes.getNFT1155Instance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice,
            nft: { amount: numberNFTs },
          },
          {
            serviceType: 'nft-access',
            nft: { amount: numberNFTs, maxCreditsToCharge: 100n, minCreditsToCharge: 1n },
          },
        ],
        nftContractAddress: nftUpgradeable.address,
        cap: cappedAmount,
        royaltyAttributes,
        preMint,
      })
      ddo = await nevermined.nfts1155.create(nftAttributes, publisher)

      assert.isDefined(ddo.shortId())
    })

    it('NFT Attributes should be part of the DDO', async () => {
      const accessService = ddo.getServicesByType('nft-access')[0]
      const ddoAttributes = accessService.attributes.main.nftAttributes

      console.log(JSON.stringify(ddoAttributes))

      assert.equal(ddoAttributes.amount, numberNFTs)
      assert.equal(ddoAttributes.maxCreditsToCharge, 100n)
      assert.equal(ddoAttributes.minCreditsToCharge, 1n)
    })

    it('Should be able to approve permissions', async () => {
      await nftUpgradeable.setApprovalForAll(someone.getId(), true, deployer)

      const isApproved = await nftUpgradeable.isApprovedForAll(deployer.getId(), someone.getId())
      assert.isTrue(isApproved)
    })

    it('Should be able to revoke permissions', async () => {
      await nftUpgradeable.setApprovalForAll(someone.getId(), false, deployer)

      const isApproved = await nftUpgradeable.isApprovedForAll(deployer.getId(), someone.getId())
      assert.isFalse(isApproved)
    })

    it('Should be able to mint', async () => {
      const beforeBalance = await nftUpgradeable.balance(someone.getId(), ddo.shortId())
      console.log(`Contract owner ${await nftUpgradeable.owner()}`)
      const owner = new Account(await nftUpgradeable.owner())
      await nftUpgradeable.grantOperatorRole(minter.getId(), owner)

      await nftUpgradeable.mint(someone.getId(), ddo.shortId(), 1n, minter.getId())

      const afterBalance = await nftUpgradeable.balance(someone.getId(), ddo.shortId())
      assert.equal(beforeBalance + 1n, afterBalance)
    })

    it('Should be able to burn', async () => {
      const beforeBalance = await nftUpgradeable.balance(someone.getId(), ddo.shortId())

      await nftUpgradeable.burn(someone.getId(), ddo.shortId(), 1n)

      const afterBalance = await nftUpgradeable.balance(someone.getId(), ddo.shortId())
      assert.equal(beforeBalance - 1n, afterBalance)
    })
  })
})
