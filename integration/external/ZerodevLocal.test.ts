// TODO: Enable when ZeroDev is ready
// import { verifyMessage } from '@ambire/signature-validator'
import { assert } from 'chai'
// import { ethers } from 'ethers'
// import * as fs from 'fs'
// import { decodeJwt } from 'jose'
import { createPublicClient, http, parseAbi } from 'viem'
import { arbitrumSepolia } from 'viem/chains'
import {
  // AssetAttributes,
  AssetPrice,
  ERCType,
  MetaData,
  NETWORK_FEE_DENOMINATOR,
  NFTAttributes,
  Nevermined,
  NeverminedNFT1155Type,
  NvmAccount,
  PublishMetadataOptions,
  PublishOnChainOptions,
  ServiceAttributes,
  SubscriptionType,
  makeRandomWallet,
} from '../../src'
// import { DDO } from '../../src/ddo'
import {
  // createKernelClient,
  createSessionKey,
  getSessionKey,
} from '../../src/nevermined/utils/BlockchainViemUtils'
import { config } from '../config'
import { getMetadata } from '../utils'
// import { getMetadata } from '../utils'

describe('Nevermined sdk with zerodev', () => {
  let nevermined: Nevermined
  const PROJECT_ID = process.env.PROJECT_ID!
  const BUNDLER_RPC = `https://rpc.zerodev.app/api/v2/bundler/${PROJECT_ID}`
  // const PAYMASTER_RPC = `https://rpc.zerodev.app/api/v2/paymaster/${PROJECT_ID}`

  const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(BUNDLER_RPC),
  })
  // const provider = new ethers.providers.JsonRpcProvider(config.web3ProviderUri)

  before(async () => {
    nevermined = await Nevermined.getInstance({ ...config, web3Provider: BUNDLER_RPC })
  })

  // describe('Test zerodev signatures and login', () => {
  //   let kernelClient: any // TODO: KernelAccountClient<any, any, any, any>
  //   let clientAssertion: string
  //   const owner = makeRandomWallet()

  //   before(async () => {
  //     kernelClient = await createKernelClient(owner, config.chainId as number, PROJECT_ID)
  //   })

  //   it('should produce a valid EIP-6492 signature', async () => {
  //     const signature = await kernelClient.signMessage({
  //       account: kernelClient.account,
  //       message: 'nevermined',
  //     })
  //     const isValidSignature = await verifyMessage({
  //       signer: kernelClient.account.address,
  //       signature: signature,
  //       message: 'nevermined',
  //       provider: provider,
  //     })
  //     assert.isTrue(isValidSignature)

  //     const signature2 = await kernelClient.account.signMessage({ message: 'nevermined' })
  //     const isValidSignature2 = await publicClient.verifyMessage({
  //       address: kernelClient.account.address,
  //       message: 'nevermined',
  //       signature: signature2,
  //     })
  //     assert.isTrue(isValidSignature2)
  //   })

  //   it('should provide a valid EIP-6492 typed signature', async () => {
  //     const domain = {
  //       name: 'Nevermined',
  //       version: '1',
  //       chainId: 80001,
  //     }
  //     const types = {
  //       Nevermined: [
  //         { name: 'from', type: 'address' },
  //         { name: 'message', type: 'string' },
  //         { name: 'token', type: 'string' },
  //       ],
  //     }
  //     const message = {
  //       from: kernelClient.account.address,
  //       message: 'nevermined',
  //       token: 'token',
  //     }

  //     const signature = await kernelClient.account.signTypedData({
  //       domain,
  //       types,
  //       message,
  //       primaryType: 'Nevermined',
  //     })

  //     // Currently using the method from the signature-validator package cause is the one that we use in the passport library

  //     //   const isValidSignature = await publicClient.verifyTypedData({
  //     //     address: kernelClient.account.address,
  //     //     domain,
  //     //     types,
  //     //     primaryType: 'Nevermined',
  //     //     message,
  //     //     signature,
  //     //    })

  //     const isValidSignature = await verifyMessage({
  //       signer: kernelClient.account.address,
  //       signature: signature,
  //       typedData: { types, domain, message },
  //       provider: provider,
  //     })

  //     assert.isTrue(isValidSignature)
  //   })

  //   it('should generate a client assertion with a zerodev signer', async () => {
  //     const account = await NvmAccount.fromZeroDevSigner(kernelClient)

  //     clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account, 'hello world')
  //     assert.isDefined(clientAssertion)

  //     const jwtPayload = decodeJwt(clientAssertion)
  //     assert.equal(jwtPayload.iss, kernelClient.account.address)
  //   })

  //   it('should login to the marketplace api', async () => {
  //     const accessToken = await nevermined.services.marketplace.login(clientAssertion)
  //     assert.isDefined(accessToken)

  //     const jwtPayload = decodeJwt(accessToken)
  //     //   const signer = zerodevProvider.getAccountSigner()
  //     assert.equal(jwtPayload.iss, kernelClient.account.address)
  //     assert.isDefined(jwtPayload.sub)
  //   })
  // })

  // describe('E2E Asset flow with zerodev', () => {
  //   let kernelClientPublisher: any // TODO: KernelAccountClient<any, any, any, any>
  //   let kernelClientConsumer: any // TODO:  KernelAccountClient<any, any, any, any>

  //   let metadata: MetaData
  //   let ddo: DDO
  //   let agreementId: string

  //   before(async () => {
  //     const publisher = makeRandomWallet()
  //     const consumer = makeRandomWallet()

  //     // kernelClientPublisher = await createEcdsaKernelAccountClient({
  //     //   chain: getChain(config.chainId),
  //     //   projectId: PROJECT_ID,
  //     //   signer: publisher,
  //     //   paymaster: 'SPONSOR',
  //     //   entryPointAddress: ENTRYPOINT_ADDRESS_V07,
  //     // })
  //     // kernelClientConsumer = await createEcdsaKernelAccountClient({
  //     //   chain: getChain(config.chainId),
  //     //   projectId: PROJECT_ID,
  //     //   signer: consumer,
  //     //   paymaster: 'SPONSOR',
  //     //   entryPointAddress: ENTRYPOINT_ADDRESS_V07,
  //     // })

  //     kernelClientPublisher = await createKernelClient(
  //       publisher,
  //       config.chainId as number,
  //       PROJECT_ID,
  //     )

  //     kernelClientConsumer = await createKernelClient(
  //       consumer,
  //       config.chainId as number,
  //       PROJECT_ID,
  //     )

  //     // zerodevProviderPublisher = await ZeroDevEthersProvider.init('ECDSA', {
  //     //   projectId,
  //     //   owner: convertEthersV6SignerToAccountSigner(publisher),
  //     // })

  //     // zerodevProviderConsumer = await ZeroDevEthersProvider.init('ECDSA', {
  //     //   projectId,
  //     //   owner: convertEthersV6SignerToAccountSigner(consumer),
  //     // })

  //     // const signerPublisher = kernelClientPublisher.getAccountSigner()
  //     const accountPublisher = await NvmAccount.fromZeroDevSigner(kernelClientPublisher)
  //     const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(accountPublisher)

  //     const accessToken = await nevermined.services.marketplace.login(clientAssertion)
  //     const payload = decodeJwt(accessToken)

  //     metadata = getMetadata()
  //     metadata.userId = payload.sub
  //   })

  //   it('should register an asset with a zerodev account', async () => {
  //     const assetAttributes = AssetAttributes.getInstance({
  //       metadata,
  //       services: [
  //         {
  //           serviceType: 'access',
  //           price: new AssetPrice(),
  //         },
  //       ],
  //       providers: [config.neverminedNodeAddress as string],
  //     })

  //     // const signerPublisher = kernelClientPublisher.getAccountSigner()
  //     const publisher = await NvmAccount.fromZeroDevSigner(kernelClientPublisher)
  //     ddo = await nevermined.assets.create(assetAttributes, publisher)

  //     assert.isDefined(ddo)
  //     assert.equal(ddo.publicKey[0].owner, publisher.getAddress())
  //     assert.equal(ddo.proof.creator, publisher.getAddress())
  //   })

  //   it('owner should be able to download the asset', async () => {
  //     // const signerPublisher = kernelClientPublisher.getAccountSigner()
  //     const publisher = await NvmAccount.fromZeroDevSigner(kernelClientPublisher)
  //     const folder = '/tmp/nevermined/sdk-js'

  //     const path = (await nevermined.assets.download(ddo.id, publisher, folder, -1)) as string
  //     const files = await new Promise<string[]>((resolve) => {
  //       fs.readdir(path, (_e, fileList) => {
  //         resolve(fileList)
  //       })
  //     })

  //     assert.deepEqual(files, ['README.md', 'ddo-example.json'])
  //   })

  //   it('consumer should be able to order the asset with a zerodev account', async () => {
  //     // const signerConsumer = kernelClientConsumer.getAccountSigner()
  //     const consumer = await NvmAccount.fromZeroDevSigner(kernelClientConsumer)
  //     agreementId = await nevermined.assets.order(ddo.id, 'access', consumer, {
  //       // zeroDevSigner: signerConsumer,
  //     })

  //     assert.isDefined(agreementId)
  //   })

  //   it('consumer should be able to access ordered assets with zerodev account', async () => {
  //     // const signerConsumer = kernelClientConsumer.getAccountSigner()
  //     const consumer = await NvmAccount.fromZeroDevSigner(kernelClientConsumer)
  //     const folder = '/tmp/nevermined/sdk-js'

  //     const path = (await nevermined.assets.access(
  //       agreementId,
  //       ddo.id,
  //       'access',
  //       consumer,
  //       folder,
  //       -1,
  //     )) as string

  //     const files = await new Promise<string[]>((resolve) => {
  //       fs.readdir(path, (_e, fileList) => {
  //         resolve(fileList)
  //       })
  //     })

  //     assert.deepEqual(files, ['README.md', 'ddo-example.json'])
  //   })
  // })

  describe('Test zerodev sessionKeys', () => {
    // let kernelClient: any // TODO: KernelAccountClient<any, any, any, any>
    // const contractAddress = '0x93605C644181f3dD03A37228528649A76822Fcf1' as '0x{string}' // DIDRegistry address

    const owner = makeRandomWallet()
    const consumer = makeRandomWallet()

    it('should generate a session key', async () => {
      console.log('Owner: ', owner.address)
      console.log('Consumer: ', consumer.address)
      const permissions = [
        {
          target: nevermined.keeper.didRegistry.contract.address,
          abi: parseAbi([
            'function registerMintableDID(bytes32 _didSeed, address _nftContractAddress, bytes32 _checksum, address[] memory _providers, string memory _url, uint256 _cap, uint256 _royalties, bool _mint, bytes32 _activityId, string memory _nftMetadata, string memory _immutableUrl) public',
          ]),
          functionName: 'registerMintableDID',
        },
        {
          target: nevermined.keeper.didRegistry.contract.address,
          abi: parseAbi([
            'function registerMintableDID(bytes32 _didSeed,address _nftContractAddress,bytes32 _checksum,address[] memory _providers,string memory _url,uint256 _cap,uint256 _royalties,bytes32 _activityId,string memory _nftMetadata,string memory _immutableUrl) public',
          ]),
          functionName: 'registerMintableDID',
        },
        {
          target: nevermined.keeper.token.address,
          abi: parseAbi([
            'function approve(address spender, uint256 amount) external returns (bool)',
          ]),
          functionName: 'approve',
        },
        {
          target: nevermined.keeper.templates.nftSalesTemplate.address,
          abi: parseAbi([
            'function createAgreementAndPayEscrow(bytes32 _id, bytes32 _did, bytes32[] _conditionIds, uint256[] _timeLocks, uint256[] _timeOuts, address _accessConsumer, uint256 _idx, address _rewardAddress, address _tokenAddress, uint256[] _amounts, address[] _receivers) public',
          ]),
          functionName: 'createAgreementAndPayEscrow',
        },
        {
          target: nevermined.keeper.token.address,
          abi: parseAbi(['function transfer(address to, uint amount) returns (bool)']),
          functionName: 'transfer',
        },
      ]
      const sessionKeyOwner = await createSessionKey(owner, publicClient, permissions)
      assert.isDefined(sessionKeyOwner)

      const deserializedSessionKeyOwner = await getSessionKey(
        sessionKeyOwner,
        PROJECT_ID,
        publicClient,
      )

      // Login to the marketplace
      const acc = NvmAccount.fromAccount(owner)
      const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(acc)
      await nevermined.services.marketplace.login(clientAssertion)

      // const account = deserializedSessionKey

      // REGISTRATION OF AN ASSET
      //================================================================================================
      const subscriptionNFT = await nevermined.contracts.loadNft1155(
        '0xB4e92c6e1a1ad3f7b42463d11804BE6ca2be79D3',
      )
      const feeReceiver = await nevermined.keeper.nvmConfig.getFeeReceiver()

      const assetPrice = new AssetPrice(
        deserializedSessionKeyOwner.getId(),
        0n,
      ).adjustToIncludeNetworkFees(feeReceiver, NETWORK_FEE_DENOMINATOR)
      assetPrice.setTokenAddress(nevermined.keeper.token.address)

      const date = new Date().toISOString().replace(/\.\d{3}/, '')
      const subscriptionLimitType = SubscriptionType.Credits
      const metadata: MetaData = {
        main: {
          name: 'TEST FROM ZERODEV USING SESSION KEY',
          author: deserializedSessionKeyOwner.getId(),
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
        providers: ['0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'],
        nftContractAddress: subscriptionNFT.address,
        preMint: false,
        royaltyAttributes: undefined,
      })

      const subscriptionDDO = await nevermined.nfts1155.create(
        nftAttributes,
        deserializedSessionKeyOwner,
        {
          metadata: PublishMetadataOptions.OnlyMetadataAPI,
        },
      )

      assert.isDefined(subscriptionDDO)
      console.log('Subscription DDO:', subscriptionDDO)

      // REGISTRATION OF A DATASET
      //================================================================================================

      const nftDatasetAttributes = NFTAttributes.getCreditsSubscriptionInstance({
        metadata: getMetadata(),
        services: [
          {
            serviceType: 'nft-access',
            nft: {
              tokenId: subscriptionDDO.shortId(),
              duration: 20,
              amount: 2n,
              nftTransfer: false,
              maxCreditsToCharge: 100n,
              minCreditsToCharge: 1n,
            },
          },
        ],
        providers: ['0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'],
        nftContractAddress: subscriptionNFT.address,
        preMint: false,
        royaltyAttributes: undefined,
      })
      const datasetDDO = await nevermined.nfts1155.create(
        nftDatasetAttributes,
        deserializedSessionKeyOwner,
        {
          metadata: PublishMetadataOptions.OnlyMetadataAPI,
          did: PublishOnChainOptions.OnlyOffchain,
        },
      )
      console.log('Dataset DDO:', datasetDDO.shortId())

      // ORDER OF AN ASSET
      //================================================================================================
      const sessionKeyConsumer = await createSessionKey(consumer, publicClient, permissions)
      assert.isDefined(sessionKeyOwner)
      const deserializedSessionKeyConsumer = await getSessionKey(
        sessionKeyConsumer,
        PROJECT_ID,
        publicClient,
      )

      const subscriptionDid = subscriptionDDO.id
      const agreementId = await nevermined.nfts1155.order(
        subscriptionDid,
        1n,
        deserializedSessionKeyConsumer,
      )

      console.log('AgreementID', agreementId)
      console.log('Subscripcion did', subscriptionDid)

      const subscriptionOwner = await nevermined.assets.owner(subscriptionDid)
      console.log('claiming to:', subscriptionOwner)
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
      //================================================================================================
      const fileDid = datasetDDO.id
      const download = await nevermined.nfts1155.access(
        fileDid,
        deserializedSessionKeyConsumer,
        '/tmp/nevermined/sdk-js',
        -1,
      )
      console.log(download)
    })
  })
})
