import { ZeroDevEthersProvider } from '@zerodev/sdk'
import { verifyMessage } from '@ambire/signature-validator'
import * as fs from 'fs'
import {
  Account,
  AssetAttributes,
  AssetPrice,
  DDO,
  MetaData,
  Nevermined,
  convertEthersV6SignerToAccountSigner,
  makeRandomWallet,
} from '../../src'
import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'

describe('Nevermined sdk with zerodev', () => {
  let nevermined: Nevermined

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
  })

  describe('Test zerodev signatures and login', () => {
    let zerodevProvider: ZeroDevEthersProvider<'ECDSA'>
    let clientAssertion: string

    before(async () => {
      const projectId = process.env.PROJECT_ID!
      const owner = makeRandomWallet()

      zerodevProvider = await ZeroDevEthersProvider.init('ECDSA', {
        projectId,
        owner: convertEthersV6SignerToAccountSigner(owner),
      })
    })

    it('should produce a valid EIP-6492 signature', async () => {
      const signer = zerodevProvider.getAccountSigner()

      const signature = await signer.signMessageWith6492('nevermined')
      const isValidSignature = await verifyMessage({
        signer: await signer.getAddress(),
        message: 'nevermined',
        signature: signature,
        provider: zerodevProvider,
      })

      assert.isTrue(isValidSignature)
    })

    it('should provide a valid EIP-6492 typed signature', async () => {
      const domain = {
        name: 'Nevermined',
        version: '1',
        chainId: 80001,
      }
      const types = {
        Nevermined: [{ name: 'message', type: 'string' }],
      }
      const message = {
        message: 'nevermined',
      }

      const signer = zerodevProvider.getAccountSigner()
      const signature = await signer.signTypedDataWith6492({
        domain,
        types,
        message,
        primaryType: '',
      })

      const isValidSignature = await verifyMessage({
        signer: await signer.getAddress(),
        signature: signature,
        typedData: {
          types,
          domain,
          message,
        },
        provider: zerodevProvider,
      })

      assert.isTrue(isValidSignature)
    })

    it('should generate a client assertion with a zerodev signer', async () => {
      const signer = zerodevProvider.getAccountSigner()
      const account = await Account.fromZeroDevSigner(signer)

      clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account, 'hello world')
      assert.isDefined(clientAssertion)

      const jwtPayload = decodeJwt(clientAssertion)
      assert.equal(jwtPayload.iss, await signer.getAddress())
    })

    it('should login to the marketplace api', async () => {
      const accessToken = await nevermined.services.marketplace.login(clientAssertion)
      assert.isDefined(accessToken)

      const jwtPayload = decodeJwt(accessToken)
      const signer = zerodevProvider.getAccountSigner()
      assert.equal(jwtPayload.iss, await signer.getAddress())
      assert.isDefined(jwtPayload.sub)
    })
  })

  describe('E2E Asset flow with zerodev', () => {
    let zerodevProviderPublisher: ZeroDevEthersProvider<'ECDSA'>
    let zerodevProviderConsumer: ZeroDevEthersProvider<'ECDSA'>
    let metadata: MetaData
    let ddo: DDO
    let agreementId: string

    before(async () => {
      const projectId = process.env.PROJECT_ID!
      const publisher = makeRandomWallet()
      const consumer = makeRandomWallet()

      zerodevProviderPublisher = await ZeroDevEthersProvider.init('ECDSA', {
        projectId,
        owner: convertEthersV6SignerToAccountSigner(publisher),
      })

      zerodevProviderConsumer = await ZeroDevEthersProvider.init('ECDSA', {
        projectId,
        owner: convertEthersV6SignerToAccountSigner(consumer),
      })

      const signerPublisher = zerodevProviderPublisher.getAccountSigner()
      const accountPublisher = await Account.fromZeroDevSigner(signerPublisher)
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

      const signerPublisher = zerodevProviderPublisher.getAccountSigner()
      const publisher = await Account.fromZeroDevSigner(signerPublisher)
      ddo = await nevermined.assets.create(assetAttributes, publisher, undefined, {
        zeroDevSigner: signerPublisher,
      })

      assert.isDefined(ddo)
      assert.equal(ddo.publicKey[0].owner, await signerPublisher.getAddress())
      assert.equal(ddo.proof.creator, await signerPublisher.getAddress())
    })

    it('owner should be able to download the asset', async () => {
      const signerPublisher = zerodevProviderPublisher.getAccountSigner()
      const publisher = await Account.fromZeroDevSigner(signerPublisher)
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
      const signerConsumer = zerodevProviderConsumer.getAccountSigner()
      const consumer = await Account.fromZeroDevSigner(signerConsumer)
      agreementId = await nevermined.assets.order(ddo.id, 'access', consumer, {
        zeroDevSigner: signerConsumer,
      })

      assert.isDefined(agreementId)
    })

    it('consumer should be able to access ordered assets with zerodev account', async () => {
      const signerConsumer = zerodevProviderConsumer.getAccountSigner()
      const consumer = await Account.fromZeroDevSigner(signerConsumer)
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
