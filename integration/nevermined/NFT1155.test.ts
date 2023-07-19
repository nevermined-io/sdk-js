import chai, { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import chaiAsPromised from 'chai-as-promised'
import {
  Account,
  DDO,
  Nevermined,
  AssetPrice,
  AssetAttributes,
  NFTAttributes,
  ContractHandler,
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
      const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
      const erc1155ABI = await ContractHandler.getABI(
        'NFT1155Upgradeable',
        config.artifactsFolder,
        networkName,
      )

      nftContract = await nevermined.utils.contractHandler.deployAbi(erc1155ABI, deployer, [
        deployer.getId(),
        nevermined.keeper.didRegistry.address,
        'NFT1155',
        'NVM',
        '',
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

  describe('As user I can register a mintable asset and manage some permissions', () => {
    it('Should be able to publish a mintable DID attached to the new NFT1155 contract', async () => {
      royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties)

      const assetAttributes = AssetAttributes.getInstance({
        metadata,
        price: assetPrice,
        serviceTypes: ['nft-sales', 'nft-access'],
      })
      const nftAttributes = NFTAttributes.getNFT1155Instance({
        ...assetAttributes,
        nftContractAddress: nftUpgradeable.address,
        cap: cappedAmount,
        amount: numberNFTs,
        royaltyAttributes,
        preMint,
      })
      ddo = await nevermined.nfts1155.create(nftAttributes, publisher)

      assert.isDefined(ddo.shortId())
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
      assert.isTrue(beforeBalance.add(1).eq(afterBalance))
    })

    it('Should be able to burn', async () => {
      const beforeBalance = await nftUpgradeable.balance(someone.getId(), ddo.shortId())

      await nftUpgradeable.burn(someone.getId(), ddo.shortId(), 1n)

      const afterBalance = await nftUpgradeable.balance(someone.getId(), ddo.shortId())
      assert.isTrue(beforeBalance.sub(1).eq(afterBalance))
    })
  })
})
