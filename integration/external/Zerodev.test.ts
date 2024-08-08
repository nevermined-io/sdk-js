// TODO: Enable when ZeroDev is ready
import { verifyMessage } from '@ambire/signature-validator'
import { assert } from 'chai'
import { ethers } from 'ethers'
import * as fs from 'fs'
import { decodeJwt } from 'jose'
import { createPublicClient, http } from 'viem'
import { arbitrumSepolia } from 'viem/chains'
import {
  AssetAttributes,
  AssetPrice,
  ERCType,
  MetaData,
  NETWORK_FEE_DENOMINATOR,
  NFTAttributes,
  Nevermined,
  NeverminedNFT1155Type,
  NvmAccount,
  PublishMetadataOptions,
  ServiceAttributes,
  SubscriptionType,
  makeRandomWallet,
} from '../../src'
import { DDO } from '../../src/ddo'
import {
  createKernelClient,
  createSessionKey,
  getSessionKey,
} from '../../src/nevermined/utils/BlockchainViemUtils'
import { config } from '../config'
import { getMetadata } from '../utils'
import { getFullZeroDevPermissions } from '../../src/nevermined/resources/ZeroDevPermissions'

describe('Nevermined sdk with zerodev', () => {
  let nevermined: Nevermined
  const PROJECT_ID = process.env.PROJECT_ID!
  const BUNDLER_RPC = `https://rpc.zerodev.app/api/v2/bundler/${PROJECT_ID}`
  // const PAYMASTER_RPC = `https://rpc.zerodev.app/api/v2/paymaster/${PROJECT_ID}`

  const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(BUNDLER_RPC),
  })
  const provider = new ethers.providers.JsonRpcProvider(config.web3ProviderUri)

  before(async () => {
    nevermined = await Nevermined.getInstance({ ...config, web3Provider: BUNDLER_RPC })
  })

  describe('Test zerodev signatures and login', () => {
    let kernelClient: any // TODO: KernelAccountClient<any, any, any, any>
    let clientAssertion: string
    const owner = makeRandomWallet()

    before(async () => {
      kernelClient = await createKernelClient(owner, config.chainId as number, PROJECT_ID)
    })

    it('should produce a valid EIP-6492 signature', async () => {
      const signature = await kernelClient.signMessage({
        account: kernelClient.account,
        message: 'nevermined',
      })
      const isValidSignature = await verifyMessage({
        signer: kernelClient.account.address,
        signature: signature,
        message: 'nevermined',
        provider: provider,
      })
      assert.isTrue(isValidSignature)

      const signature2 = await kernelClient.account.signMessage({ message: 'nevermined' })
      const isValidSignature2 = await publicClient.verifyMessage({
        address: kernelClient.account.address,
        message: 'nevermined',
        signature: signature2,
      })
      assert.isTrue(isValidSignature2)
    })

    it('should provide a valid EIP-6492 typed signature', async () => {
      const domain = {
        name: 'Nevermined',
        version: '1',
        chainId: 80001,
      }
      const types = {
        Nevermined: [
          { name: 'from', type: 'address' },
          { name: 'message', type: 'string' },
          { name: 'token', type: 'string' },
        ],
      }
      const message = {
        from: kernelClient.account.address,
        message: 'nevermined',
        token: 'token',
      }

      const signature = await kernelClient.account.signTypedData({
        domain,
        types,
        message,
        primaryType: 'Nevermined',
      })

      // Currently using the method from the signature-validator package cause is the one that we use in the passport library

      //   const isValidSignature = await publicClient.verifyTypedData({
      //     address: kernelClient.account.address,
      //     domain,
      //     types,
      //     primaryType: 'Nevermined',
      //     message,
      //     signature,
      //    })

      const isValidSignature = await verifyMessage({
        signer: kernelClient.account.address,
        signature: signature,
        typedData: { types, domain, message },
        provider: provider,
      })

      assert.isTrue(isValidSignature)
    })

    it('should generate a client assertion with a zerodev signer', async () => {
      const account = await NvmAccount.fromZeroDevSigner(kernelClient)

      clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account, 'hello world')
      assert.isDefined(clientAssertion)

      const jwtPayload = decodeJwt(clientAssertion)
      assert.equal(jwtPayload.iss, kernelClient.account.address)
    })

    it('should login to the marketplace api', async () => {
      const accessToken = await nevermined.services.marketplace.login(clientAssertion)
      assert.isDefined(accessToken)

      const jwtPayload = decodeJwt(accessToken)
      //   const signer = zerodevProvider.getAccountSigner()
      assert.equal(jwtPayload.iss, kernelClient.account.address)
      assert.isDefined(jwtPayload.sub)
    })
  })

  describe('E2E Asset flow with zerodev', () => {
    let kernelClientPublisher: any // TODO: KernelAccountClient<any, any, any, any>
    let kernelClientConsumer: any // TODO:  KernelAccountClient<any, any, any, any>

    let metadata: MetaData
    let ddo: DDO
    let agreementId: string

    before(async () => {
      const publisher = makeRandomWallet()
      const consumer = makeRandomWallet()

      // kernelClientPublisher = await createEcdsaKernelAccountClient({
      //   chain: getChain(config.chainId),
      //   projectId: PROJECT_ID,
      //   signer: publisher,
      //   paymaster: 'SPONSOR',
      //   entryPointAddress: ENTRYPOINT_ADDRESS_V07,
      // })
      // kernelClientConsumer = await createEcdsaKernelAccountClient({
      //   chain: getChain(config.chainId),
      //   projectId: PROJECT_ID,
      //   signer: consumer,
      //   paymaster: 'SPONSOR',
      //   entryPointAddress: ENTRYPOINT_ADDRESS_V07,
      // })

      kernelClientPublisher = await createKernelClient(
        publisher,
        config.chainId as number,
        PROJECT_ID,
      )

      kernelClientConsumer = await createKernelClient(
        consumer,
        config.chainId as number,
        PROJECT_ID,
      )

      // zerodevProviderPublisher = await ZeroDevEthersProvider.init('ECDSA', {
      //   projectId,
      //   owner: convertEthersV6SignerToAccountSigner(publisher),
      // })

      // zerodevProviderConsumer = await ZeroDevEthersProvider.init('ECDSA', {
      //   projectId,
      //   owner: convertEthersV6SignerToAccountSigner(consumer),
      // })

      // const signerPublisher = kernelClientPublisher.getAccountSigner()
      const accountPublisher = await NvmAccount.fromZeroDevSigner(kernelClientPublisher)
      const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(accountPublisher)

      const accessToken = await nevermined.services.marketplace.login(clientAssertion)
      const payload = decodeJwt(accessToken)

      metadata = getMetadata()
      metadata.userId = payload.sub
    })

    it('should register an asset with a zerodev account', async () => {
      const assetAttributes = AssetAttributes.getInstance({
        metadata,
        services: [
          {
            serviceType: 'access',
            price: new AssetPrice(),
          },
        ],
        providers: [config.neverminedNodeAddress as string],
      })

      // const signerPublisher = kernelClientPublisher.getAccountSigner()
      const publisher = await NvmAccount.fromZeroDevSigner(kernelClientPublisher)
      ddo = await nevermined.assets.create(assetAttributes, publisher)

      assert.isDefined(ddo)
      assert.equal(ddo.publicKey[0].owner, publisher.getAddress())
      assert.equal(ddo.proof.creator, publisher.getAddress())
    })

    it('owner should be able to download the asset', async () => {
      // const signerPublisher = kernelClientPublisher.getAccountSigner()
      const publisher = await NvmAccount.fromZeroDevSigner(kernelClientPublisher)
      const folder = '/tmp/nevermined/sdk-js'

      const path = (await nevermined.assets.download(ddo.id, publisher, folder, -1)) as string
      const files = await new Promise<string[]>((resolve) => {
        fs.readdir(path, (_e, fileList) => {
          resolve(fileList)
        })
      })

      assert.deepEqual(files, ['README.md', 'ddo-example.json'])
    })

    it('consumer should be able to order the asset with a zerodev account', async () => {
      // const signerConsumer = kernelClientConsumer.getAccountSigner()
      const consumer = await NvmAccount.fromZeroDevSigner(kernelClientConsumer)
      agreementId = await nevermined.assets.order(ddo.id, 'access', consumer, {
        // zeroDevSigner: signerConsumer,
      })

      assert.isDefined(agreementId)
    })

    it('consumer should be able to access ordered assets with zerodev account', async () => {
      // const signerConsumer = kernelClientConsumer.getAccountSigner()
      const consumer = await NvmAccount.fromZeroDevSigner(kernelClientConsumer)
      const folder = '/tmp/nevermined/sdk-js'

      const path = (await nevermined.assets.access(
        agreementId,
        ddo.id,
        'access',
        consumer,
        folder,
        -1,
      )) as string

      const files = await new Promise<string[]>((resolve) => {
        fs.readdir(path, (_e, fileList) => {
          resolve(fileList)
        })
      })

      assert.deepEqual(files, ['README.md', 'ddo-example.json'])
    })
  })

  describe('Test zerodev sessionKeys', () => {
    // let kernelClient: any // TODO: KernelAccountClient<any, any, any, any>
    const contractAddress = '0x93605C644181f3dD03A37228528649A76822Fcf1' as '0x{string}' // DIDRegistry address

    const owner = makeRandomWallet()
    const consumer = makeRandomWallet()

    it('should generate a session key', async () => {
      const permissions = getFullZeroDevPermissions(
        contractAddress, // DIDRegistry address
        '0x1c52ed414EDd1bCC20Ea670d42289e8bFC03C095', // Sales Template address
        '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d', // ERC20 address
      )
      const sessionKey = await createSessionKey(owner, publicClient, permissions)
      assert.isDefined(sessionKey)

      const deserializedSessionKey = await getSessionKey(sessionKey, PROJECT_ID, publicClient)

      // Login to the marketplace
      const acc = NvmAccount.fromAccount(owner)
      const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(acc)
      const marketplaceAuthToken = await nevermined.services.marketplace.login(clientAssertion)
      console.log('marketplaceAuthToken', marketplaceAuthToken)
      const account = deserializedSessionKey

      // REGISTRATION OF AN ASSET
      //================================================================================================
      const subscriptionNFT = await nevermined.contracts.loadNft1155(
        '0x1bcA156f746C6Eb8b18d61654293e2Fc5b653fF5',
      )
      const feeReceiver = await nevermined.keeper.nvmConfig.getFeeReceiver()

      const assetPrice = new AssetPrice(account.getId(), 0n).adjustToIncludeNetworkFees(
        feeReceiver,
        NETWORK_FEE_DENOMINATOR,
      )
      assetPrice.setTokenAddress('0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d')

      const date = new Date().toISOString().replace(/\.\d{3}/, '')
      const subscriptionLimitType = SubscriptionType.Credits
      const metadata: MetaData = {
        main: {
          name: 'TEST FROM ZERODEV USING SESSION KEY',
          author: account.getId(),
          dateCreated: date,
          datePublished: date,
          type: 'subscription',
          license: 'No License Specified',
          files: [],
          ercType: ERCType.nft1155,
          nftType: NeverminedNFT1155Type.nft1155Credit,
          subscription: {
            timeMeasure: 'days',
            subscriptionType: subscriptionLimitType,
          },
        },
        additionalInformation: {
          description: 'test',
          tags: [],
          customData: {
            dateMeasure: 'days',
            plan: 'custom',
            subscriptionLimitType,
          },
        },
      }
      const services: ServiceAttributes[] = [
        {
          serviceType: 'nft-sales',
          price: assetPrice,
          nft: {
            // duration,
            amount: 10n,
            nftTransfer: false,
          },
        },
      ]

      const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
        metadata,
        services,
        providers: ['0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc'],
        nftContractAddress: subscriptionNFT.address,
        preMint: false,
        royaltyAttributes: undefined,
      })

      const ddo = await nevermined.nfts1155.create(nftAttributes, account, {
        metadata: PublishMetadataOptions.OnlyMetadataAPI,
      })

      assert.isDefined(ddo)

      // ORDER OF AN ASSET
      //================================================================================================
      const sessionKeyConsumer = await createSessionKey(consumer, publicClient, permissions)
      assert.isDefined(sessionKey)

      const deserializedSessionKeyConsumer = await getSessionKey(
        sessionKeyConsumer,
        PROJECT_ID,
        publicClient,
      )
      const subscriptionDid = ddo.id
      const agreementId = await nevermined.nfts1155.order(
        subscriptionDid,
        1n,
        deserializedSessionKeyConsumer,
      )
      console.log(agreementId)
      const subscriptionOwner = await nevermined.assets.owner(subscriptionDid)
      console.log('claiming to@', subscriptionOwner)
      const claim = await nevermined.nfts1155.claim(
        agreementId,
        subscriptionOwner,
        deserializedSessionKeyConsumer.getId(),
        undefined,
        subscriptionDid,
        undefined,
      )
      console.log(claim)

      // DOWNLOAD OF AN ASSET
      // const fileDid = 'did:nv:d65e2726b37510d231a86183d0de5d9281830381b579315c64e1eea7ee3e416f'
      // const download = await nevermined.nfts1155.access(
      //   fileDid,
      //   account,
      //   '/tmp/nevermined/sdk-js',
      //   -1,
      // )
      // console.log(download)
    })
  })
})
