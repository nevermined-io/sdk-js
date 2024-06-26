import TestContractHandler from '../../test/keeper/TestContractHandler'
import fs from 'fs'

import { assert } from 'chai'
import { decodeJwt } from 'jose'
import config from '../../test/config'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { DDO } from '../../src/ddo/DDO'
import { AssetPrice } from '../../src/models/AssetPrice'
import { getMetadata } from '../utils/ddo-metadata-generator'

import { NFTAttributes } from '../../src/models/NFTAttributes'
import { MetaData } from '../../src/types/DDOTypes'
import { NFT721Api } from '../../src/nevermined/api/nfts/NFT721Api'
import { getRoyaltyAttributes } from '../../src/nevermined/api/AssetsApi'
import { RoyaltyKind } from '../../src/types/MetadataTypes'

describe('POAPs with Assets', () => {
  let nevermined: Nevermined
  let poapContract
  let editor: NvmAccount
  let user: NvmAccount
  let gatewayAddress: string
  let poapDDO: DDO
  let agreementId: string
  let metadata: MetaData
  let nft721Api: NFT721Api
  const ARTIFACT_FILE = 'artifacts/NFT721SubscriptionUpgradeable.geth-localnet.json'

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    gatewayAddress = await nevermined.services.node.getProviderAddress()
    ;[editor, user] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(editor)

    await nevermined.services.marketplace.login(clientAssertion)
    const payload = decodeJwt(config.marketplaceAuthToken)

    metadata = getMetadata()
    metadata.userId = payload.sub
  })

  it('should deploy the contract', async () => {
    TestContractHandler.setConfig(config)
    const POAPUpgradeable = JSON.parse(fs.readFileSync(ARTIFACT_FILE).toString())
    poapContract = await nevermined.utils.blockchain.deployAbi(POAPUpgradeable, editor, [
      editor.getId(),
      nevermined.keeper.didRegistry.address,
      'NFT721',
      'NVM',
      '',
      '0',
      nevermined.keeper.nvmConfig.address,
    ])
    assert.isDefined(poapContract)

    nft721Api = await nevermined.contracts.loadNft721(await poapContract.address)

    // INFO: We allow transferNFT condition to mint NFTs
    // Typically this only needs to happen once per NFT contract
    const response = await nft721Api.grantOperatorRole(
      nevermined.keeper.conditions.transferNft721Condition.address,
      editor,
    )
    assert.equal(response.status, 'success')

    // INFO: We allow the gateway to fulfill the transfer condition in behalf of the user
    // Typically this only needs to happen once per NFT contract
    await nft721Api.setApprovalForAll(gatewayAddress, true, editor)

    const isApproved = await nft721Api.isApprovedForAll(editor.getId(), gatewayAddress)
    assert.isTrue(isApproved)
  })

  it('editor should be able to register poap', async () => {
    const nftAttributes = NFTAttributes.getPOAPInstance({
      metadata,
      services: [
        {
          serviceType: 'nft-sales',
          price: new AssetPrice(editor.getId(), 0n, nevermined.utils.token.getAddress()),
          nft: { nftTransfer: false },
        },
        {
          serviceType: 'nft-access',
        },
      ],
      providers: [gatewayAddress],
      nftContractAddress: poapContract.address,
      preMint: false,
      royaltyAttributes: getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 0),
    })
    poapDDO = await nevermined.nfts721.create(nftAttributes, editor)

    assert.isDefined(poapDDO)
  })

  it('user should be able to redeem a poap', async () => {
    agreementId = await nevermined.nfts721.order(poapDDO.id, user)
    assert.isDefined(agreementId)
  })

  it('we should be able to claim the POAP via the Nevermined Node', async () => {
    const receipt = await nevermined.nfts721.claim(agreementId, editor.getId(), user.getId())
    assert.isTrue(receipt)
  })

  it('user should have a balance of 1 poap', async () => {
    const balance = await nft721Api.balanceOf(user)
    assert.equal(balance, 1n)
  })

  it('user should have access', async () => {
    const result = await nevermined.nfts721.access(
      poapDDO.id,
      user,
      '/tmp/',
      undefined,
      agreementId,
    )
    assert.isTrue(result)
  })
})
