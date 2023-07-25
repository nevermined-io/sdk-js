import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import {
  Nevermined,
  Account,
  MetaData,
  DDO,
  AssetPrice,
  Token,
  ContractHandler,
  Nft721Contract,
  NFTAttributes,
  ConditionState,
  NFTServiceAttributes,
} from '../../src'
import { ethers } from 'ethers'
import { repeat } from '../utils/utils'

let nevermined: Nevermined
let publisher: Account
let collector1: Account
let metadata: MetaData
let assetPrice1: AssetPrice
let assetPrice2: AssetPrice
let payload: JWTPayload
let ddo: DDO
let token: Token
let service
let agreementId
let neverminedNodeAddress
let nft: ethers.BaseContract
let nftContract: Nft721Contract
let salesServices
const totalAmount1 = '100'
const totalAmount2 = '150'

describe('E2E Flow for NFTs with multiple services', () => {
  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;({ token } = nevermined.keeper)
    // Accounts
    ;[publisher, collector1] = await nevermined.accounts.list()

    neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

    const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
    const erc721ABI = await ContractHandler.getABI(
      'NFT721Upgradeable',
      config.artifactsFolder,
      networkName,
    )

    nft = await nevermined.utils.contractHandler.deployAbi(erc721ABI, publisher, [
      publisher.getId(),
      nevermined.keeper.didRegistry.address,
      'NFT721',
      'NVM',
      '',
      '0',
    ])

    nftContract = await Nft721Contract.getInstance(
      (nevermined.keeper as any).instanceConfig,
      await nft.getAddress(),
    )

    await nevermined.contracts.loadNft721(nftContract.address)

    await nftContract.grantOperatorRole(
      nevermined.keeper.conditions.transferNft721Condition.address,
      publisher,
    )

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)

    payload = decodeJwt(config.marketplaceAuthToken)
    assetPrice1 = new AssetPrice(publisher.getId(), BigInt(totalAmount1))
    assetPrice2 = new AssetPrice(publisher.getId(), BigInt(totalAmount2))

    try {
      await collector1.requestTokens(BigInt(totalAmount1) * 10n)
    } catch (error) {
      console.error(error)
    }

    metadata = getMetadata()
    metadata.userId = payload.sub
  })

  describe('Asset with multiple NFTs registration', () => {
    it('Register with multiple access services', async () => {
      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice1,
            nft: { ...NFTServiceAttributes.defaultValues, nftTransfer: true },
          },
          {
            serviceType: 'nft-sales',
            price: assetPrice2,
            nft: { nftTransfer: false, nftAmount: 2n },
          },
          {
            serviceType: 'nft-access',
          },
        ],
        nftContractAddress: nftContract.address,
        providers: [neverminedNodeAddress],
      })

      ddo = await nevermined.nfts721.create(nftAttributes, publisher)

      assert.isDefined(ddo)
      console.log(ddo.id)

      const salesServices = ddo.getServicesByType('nft-sales')
      assert.equal(salesServices.length, 2)

      const accessServices = ddo.getServicesByType('nft-access')
      assert.equal(accessServices.length, 1)

      assert.equal(
        salesServices[0].attributes.serviceAgreementTemplate.conditions[0].parameters[3].value[0],
        totalAmount1,
      )
      assert.equal(
        salesServices[0].attributes.serviceAgreementTemplate.conditions[1].parameters[2]
          .value as string,
        '1',
      )

      assert.equal(
        salesServices[1].attributes.serviceAgreementTemplate.conditions[0].parameters[3].value[0],
        totalAmount2,
      )
      assert.equal(
        salesServices[1].attributes.serviceAgreementTemplate.conditions[1].parameters[2]
          .value as string,
        '2',
      )

      assert.isDefined(ddo.findServiceByType('metadata'))
    })

    it('The collector is ordering the NFT between multiple nft-sales services', async () => {
      const collector1BalanceBefore = await token.balanceOf(collector1.getId())

      salesServices = ddo.getServicesByType('nft-sales')
      service = salesServices[1]

      agreementId = await nevermined.nfts721.order(ddo.id, collector1, service.index)

      assert.isDefined(agreementId)

      const collector1BalanceAfter = await token.balanceOf(collector1.getId())

      const price = DDO.getAssetPriceFromService(service)
      assert.isTrue(collector1BalanceBefore - price.getTotalPrice() === collector1BalanceAfter)

      const status = await repeat(3, nevermined.agreements.status(agreementId))

      assert.deepEqual(status, {
        lockPayment: ConditionState.Fulfilled,
        transferNFT: ConditionState.Unfulfilled,
        escrowPayment: ConditionState.Unfulfilled,
      })
    })

    it('The publisher can check the payment and transfer the NFT to the collector', async () => {
      service = salesServices[1]

      const receipt = await nevermined.nfts721.transfer(
        agreementId,
        ddo.id,
        publisher,
        service.index,
      )
      assert.isTrue(receipt)

      const status = await repeat(3, nevermined.agreements.status(agreementId))

      assert.deepEqual(status, {
        lockPayment: ConditionState.Fulfilled,
        transferNFT: ConditionState.Fulfilled,
        escrowPayment: ConditionState.Unfulfilled,
      })
    })

    it('The publisher can get the rewards', async () => {
      service = salesServices[1]

      const receipt = await nevermined.nfts721.releaseRewards(
        agreementId,
        ddo.id,
        publisher,
        service.index,
      )
      assert.isTrue(receipt)

      const status = await repeat(3, nevermined.agreements.status(agreementId))

      assert.deepEqual(status, {
        lockPayment: ConditionState.Fulfilled,
        transferNFT: ConditionState.Fulfilled,
        escrowPayment: ConditionState.Fulfilled,
      })
    })

    it('The collector can order the other service too', async () => {
      const collector1BalanceBefore = await token.balanceOf(collector1.getId())

      service = salesServices[0]

      agreementId = await nevermined.nfts721.order(ddo.id, collector1, service.index)

      assert.isDefined(agreementId)

      const collector1BalanceAfter = await token.balanceOf(collector1.getId())

      const price = DDO.getAssetPriceFromService(service)
      assert.isTrue(collector1BalanceBefore - price.getTotalPrice() === collector1BalanceAfter)

      let status = await repeat(3, nevermined.agreements.status(agreementId))

      assert.deepEqual(status, {
        lockPayment: ConditionState.Fulfilled,
        transferNFT: ConditionState.Unfulfilled,
        escrowPayment: ConditionState.Unfulfilled,
      })

      await nevermined.nfts721.transfer(agreementId, ddo.id, publisher)

      await nevermined.nfts721.releaseRewards(agreementId, ddo.id, publisher)

      status = await repeat(3, nevermined.agreements.status(agreementId))

      assert.deepEqual(status, {
        lockPayment: ConditionState.Fulfilled,
        transferNFT: ConditionState.Fulfilled,
        escrowPayment: ConditionState.Fulfilled,
      })
    })
  })
})
