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
} from '../../src'
import { BigNumber } from '../../src/utils'
import { ethers } from 'ethers'

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
let nft: ethers.Contract
let nftContract: Nft721Contract
let nftContractOwner: Account
const totalAmount1 = '100'
const totalAmount2 = '150'

describe('NFTs with multiple services', () => {
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
      nft.address,
    )

    await nevermined.contracts.loadNft721(nftContract.address)

    nftContractOwner = new Account((await nftContract.owner()) as string)

    await nftContract.grantOperatorRole(
      nevermined.keeper.conditions.transferNft721Condition.address, 
      nftContractOwner)

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)

    payload = decodeJwt(config.marketplaceAuthToken)
    assetPrice1 = new AssetPrice(publisher.getId(), BigNumber.from(totalAmount1))
    assetPrice2 = new AssetPrice(publisher.getId(), BigNumber.from(totalAmount2))

    try {
      await collector1.requestTokens(BigNumber.from(totalAmount1).mul(10))
    } catch (error) {
      console.error(error)
    }

    metadata = getMetadata()
    metadata.userId = payload.sub
  })

  describe('E2E flow for an asset with multiple nft-sales services', () => {
    it('Register with multiple access services', async () => {

      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice1,
            nft: { nftTransfer: true }
          },
          {
            serviceType: 'nft-sales',
            price: assetPrice2,
            nft: { nftTransfer: false }
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
        totalAmount2,
      )
      assert.equal(
        salesServices[1].attributes.serviceAgreementTemplate.conditions[0].parameters[3].value[0],
        totalAmount1,
      )
      
      assert.isDefined(ddo.findServiceByType('metadata'))
    })

    it('I am ordering the NFT between multiple nft-sales services', async () => {

      const collector1BalanceBefore = await token.balanceOf(collector1.getId())

      const salesServices = ddo.getServicesByType('nft-sales')
      service = salesServices[0]

      agreementId = await nevermined.nfts721.order(ddo.id, collector1, service.index)
      
      assert.isDefined(agreementId)
      console.log(`Agreement Id: ${agreementId}`)

      const collector1BalanceAfter = await token.balanceOf(collector1.getId())

      const price = DDO.getAssetPriceFromService(service)
      assert.isTrue(
        collector1BalanceBefore.sub(price.getTotalPrice())
        .eq(collector1BalanceAfter))
    })

    it('The publisher can check the payment and transfer the NFT to the collector', async () => {
      assert.equal(await nevermined.nfts721.ownerOfAsset(ddo.id), publisher.getId())

      const receipt = await nevermined.nfts721.transfer(agreementId, ddo.id, collector1)
      assert.isTrue(receipt)

      assert.equal(await nevermined.nfts721.ownerOfAsset(ddo.id), collector1.getId())
    })

  })
})
