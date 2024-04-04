// TODO: Enable when ZeroDev is ready
import { verifyMessage } from '@ambire/signature-validator'
import { createEcdsaKernelAccountClient } from '@zerodev/presets/zerodev'
import { KernelAccountClient } from '@zerodev/sdk'
import { assert } from 'chai'
import { ethers } from 'ethers'
import * as fs from 'fs'
import { decodeJwt } from 'jose'
import { createPublicClient, http } from 'viem'
import { arbitrumSepolia } from 'viem/chains'
import {
  AssetAttributes,
  AssetPrice,
  DDO,
  MetaData,
  Nevermined,
  NvmAccount,
  makeRandomWallet,
} from '../../src'
import { config } from '../config'
import { getMetadata } from '../utils'

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
    nevermined = await Nevermined.getInstance(config)
  })

  describe('Test zerodev signatures and login', () => {
    let kernelClient: KernelAccountClient
    let clientAssertion: string

    before(async () => {
      const owner = makeRandomWallet()
      kernelClient = await createEcdsaKernelAccountClient({
        chain: arbitrumSepolia,
        projectId: PROJECT_ID,
        signer: owner,
      })
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
      const account = await NvmAccount.fromZeroDevSigner(kernelClient.account)

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
    let kernelClientPublisher: KernelAccountClient
    let kernelClientConsumer: KernelAccountClient

    let metadata: MetaData
    let ddo: DDO
    let agreementId: string

    before(async () => {
      const publisher = makeRandomWallet()
      const consumer = makeRandomWallet()

      kernelClientPublisher = await createEcdsaKernelAccountClient({
        chain: arbitrumSepolia,
        projectId: PROJECT_ID,
        signer: publisher,
      })
      kernelClientConsumer = await createEcdsaKernelAccountClient({
        chain: arbitrumSepolia,
        projectId: PROJECT_ID,
        signer: consumer,
      })

      // zerodevProviderPublisher = await ZeroDevEthersProvider.init('ECDSA', {
      //   projectId,
      //   owner: convertEthersV6SignerToAccountSigner(publisher),
      // })

      // zerodevProviderConsumer = await ZeroDevEthersProvider.init('ECDSA', {
      //   projectId,
      //   owner: convertEthersV6SignerToAccountSigner(consumer),
      // })

      // const signerPublisher = kernelClientPublisher.getAccountSigner()
      const accountPublisher = await NvmAccount.fromZeroDevSigner(kernelClientPublisher.account)
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
        providers: [config.neverminedNodeAddress],
      })

      // const signerPublisher = kernelClientPublisher.getAccountSigner()
      const publisher = await NvmAccount.fromZeroDevSigner(kernelClientPublisher.account)
      ddo = await nevermined.assets.create(assetAttributes, publisher)

      assert.isDefined(ddo)
      assert.equal(ddo.publicKey[0].owner, publisher.getAddress())
      assert.equal(ddo.proof.creator, publisher.getAddress())
    })

    it('owner should be able to download the asset', async () => {
      // const signerPublisher = kernelClientPublisher.getAccountSigner()
      const publisher = await NvmAccount.fromZeroDevSigner(kernelClientPublisher.account)
      const folder = '/tmp/nevermined/sdk-js'

      const path = (await nevermined.assets.download(ddo.id, publisher, folder, -1)) as string
      const files = await new Promise<string[]>((resolve) => {
        fs.readdir(path, (e, fileList) => {
          resolve(fileList)
        })
      })

      assert.deepEqual(files, ['README.md', 'ddo-example.json'])
    })

    it('consumer should be able to order the asset with a zerodev account', async () => {
      // const signerConsumer = kernelClientConsumer.getAccountSigner()
      const consumer = await NvmAccount.fromZeroDevSigner(kernelClientConsumer.account)
      agreementId = await nevermined.assets.order(ddo.id, 'access', consumer, {
        // zeroDevSigner: signerConsumer,
      })

      assert.isDefined(agreementId)
    })

    it('consumer should be able to access ordered assets with zerodev account', async () => {
      // const signerConsumer = kernelClientConsumer.getAccountSigner()
      const consumer = await NvmAccount.fromZeroDevSigner(kernelClientConsumer.account)
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
        fs.readdir(path, (e, fileList) => {
          resolve(fileList)
        })
      })

      assert.deepEqual(files, ['README.md', 'ddo-example.json'])
    })
  })
})
