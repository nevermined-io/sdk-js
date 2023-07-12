import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'
import { Nevermined, Account, DDO, NFTAttributes } from '../../src'
import { makeAccounts } from '../../src/utils'
import { getRoyaltyAttributes, RoyaltyAttributes, RoyaltyKind } from '../../src/nevermined'
import fs from 'fs'
import { RelayProvider } from '@opengsn/provider'
import { Web3ProviderWrapper } from '../../src/keeper'

describe.skip('MetaTx test with nfts', () => {
  let nevermined: Nevermined

  let artist: Account
  let collector: Account
  let ddo: DDO

  let payload: JWTPayload
  let royaltyAttributes: RoyaltyAttributes
  const paymasterAddress = JSON.parse(
    fs.readFileSync('artifacts/opengsn.json').toString(),
  ).paymasterAddress
  let wallets

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    wallets = makeAccounts(process.env.SEED_WORDS)

    // Accounts
    ;[artist, collector] = await nevermined.accounts.list()
    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

    await nevermined.services.marketplace.login(clientAssertion)
    payload = decodeJwt(config.marketplaceAuthToken)

    const nftContractOwner = new Account(await nevermined.nfts1155.owner())
    await nevermined.keeper.nftUpgradeable.grantOperatorRole(artist.getId(), nftContractOwner)
  })

  describe('with default token', async () => {
    before(async () => {
      const metadata = getMetadata(Math.random())
      metadata.userId = payload.sub
      royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 0)

      const nftAttributes = NFTAttributes.getNFT1155Instance({
        metadata,
        serviceTypes: ['nft-sales', 'nft-access'],
        nftContractAddress: nevermined.nfts1155.nftContract.address,
        cap: 10n,
        royaltyAttributes,
      })
      ddo = await nevermined.nfts1155.create(nftAttributes, artist)
    })

    it('should mint 10 nft tokens', async () => {
      assert.deepEqual(await nevermined.nfts1155.balance(ddo.id, artist), 10n)
    })

    it('should transfer 2 nft tokens with default token', async () => {
      const agreementId = await nevermined.nfts1155.order(ddo.id, 2n, collector)

      await nevermined.nfts1155.transfer(agreementId, ddo.id, 2n, artist)

      assert.deepEqual(await nevermined.nfts1155.balance(ddo.id, artist), 8n)
      assert.deepEqual(await nevermined.nfts1155.balance(ddo.id, collector), 2n)
    })

    it('metatransactions should work', async () => {
      const wallet = wallets[1]

      await nevermined.keeper.nftUpgradeable.transferNft(
        ddo.id,
        await wallet.getAddress(),
        2n,
        artist.getId(),
      )

      assert.equal(
        await nevermined.keeper.nftUpgradeable.balance(await wallet.getAddress(), ddo.id),
        4n,
      )

      const config = {
        paymasterAddress: paymasterAddress,
        auditorsCount: 0,
        preferredRelays: ['http://opengsn.nevermined.localnet'],
      }
      const { gsnSigner } = await RelayProvider.newEthersV6Provider({
        provider: new Web3ProviderWrapper(nevermined.web3),
        config,
      })

      const signerAccount = new Account(await gsnSigner.getAddress())

      await nevermined.nfts1155.burn(ddo.id, 2n, signerAccount)
      assert.equal(await nevermined.nfts1155.balance(ddo.id, artist), 6n)
      assert.equal(
        await nevermined.keeper.nftUpgradeable.balance(await wallet.getAddress(), ddo.id),
        2n,
      )
    })
  })
})
