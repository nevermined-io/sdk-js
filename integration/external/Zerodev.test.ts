import { ethers } from 'ethers'
import { ZeroDevEthersProvider } from '@zerodev/sdk'
import { verifyMessage } from '@ambire/signature-validator'
import {
  Account,
  AssetAttributes,
  AssetPrice,
  Nevermined,
  convertEthersV6SignerToAccountSigner,
} from '../../src'
import { assert } from 'chai'
import { decodeJwt } from 'jose'
import { config } from '../config'
import { getMetadata } from '../utils'

describe('Nevermined sdk with zerodev', () => {
  let zerodevProvider: ZeroDevEthersProvider<'ECDSA'>
  let nevermined: Nevermined
  let clientAssertion: string
  let userId: string

  before(async () => {
    const projectId = process.env.PROJECT_ID!
    const owner = ethers.Wallet.createRandom()

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

  it('should initialize nevermined with zerodev provider', async () => {
    nevermined = await Nevermined.getInstance(config)
    assert.isDefined(nevermined)
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

    userId = jwtPayload.sub
  })

  it('should register an asset with a zerodev account', async () => {
    const metadata = getMetadata()
    metadata.userId = userId
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

    const signer = zerodevProvider.getAccountSigner()
    const account = await nevermined.accounts.fromZeroDevSigner(signer)
    const ddo = await nevermined.assets.create(assetAttributes, account, undefined, {
      zeroDevSigner: signer,
    })
    assert.isDefined(ddo)
    console.log(ddo)
  })
})
