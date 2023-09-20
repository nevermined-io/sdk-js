import { HDNodeWallet, Wallet } from 'ethers'
import { assert } from 'chai'
import { ZeroDevEthersProvider, convertEthersSignerToAccountSigner } from '@zerodev/sdk'
import {
  Account,
  AssetAttributes,
  AssetPrice,
  EthSignJWT,
  Nevermined,
  NeverminedOptions,
} from '../../src'
import { getMetadata } from '../utils'

describe('Nevermined sdk with zerodev', () => {
  let projectId: string
  let owner: HDNodeWallet
  let config: NeverminedOptions
  let nevermined: Nevermined
  let account: Account
  let zerodevProvider: ZeroDevEthersProvider<'ECDSA'>

  before(async () => {
    projectId = process.env.PROJECT_ID!
    owner = Wallet.createRandom()
    account = new Account(await owner.getAddress())
    const infuraToken = process.env.INFURA_TOKEN!

    config = {
      marketplaceUri: 'https://marketplace-api.mumbai.nevermined.app',
      neverminedNodeUri: 'https://node.mumbai.nevermined.app',
      graphHttpUri: 'https://api.thegraph.com/subgraphs/name/nevermined-io/public',
      neverminedNodeAddress: '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc',
      artifactsFolder: './artifacts',
      web3ProviderUri: `https://polygon-mumbai.infura.io/v3/${infuraToken}`,
    }
  })

  it('should instantiate nevermined sdk with a zerodev provider', async () => {
    zerodevProvider = await ZeroDevEthersProvider.init('ECDSA', {
      projectId,
      owner: convertEthersSignerToAccountSigner(owner as any),
    })

    nevermined = await Nevermined.getInstance({
      ...config,
      zerodevProvider: zerodevProvider,
    })

    assert.isDefined(nevermined)
  })

  it('should login to the marketplace api', async () => {
    const accountSigner = zerodevProvider.getAccountSigner()

    const clientAssertion = await new EthSignJWT({
      iss: account.getId(),
    })
      .setProtectedHeader({ alg: 'ES256K' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .ethSign(accountSigner as any)

    await nevermined.services.marketplace.login(clientAssertion)
  })

  it('should request some nevermined tokens', async () => {
    const accountSigner = zerodevProvider.getAccountSigner()
    const accountAddress = await accountSigner.getAddress()

    console.log('requesting tokens for account', accountAddress)
    const result = await nevermined.keeper.dispenser.requestTokens(10, accountAddress)
    assert.isDefined(result)
  })

  it('should create a new asset with zerodev provider', async () => {
    const assetAttributes = AssetAttributes.getInstance({
      metadata: getMetadata(),
      services: [
        {
          serviceType: 'access',
          price: new AssetPrice(await owner.getAddress(), 0n),
        },
      ],
      providers: [config.neverminedNodeAddress],
    })

    const ddo = await nevermined.assets.create(assetAttributes, account)
    assert.isDefined(ddo)
  })
})
