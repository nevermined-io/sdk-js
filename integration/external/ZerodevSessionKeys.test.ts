// import { LocalAccountSigner } from '@alchemy/aa-core'
// import { ECDSAProvider, SessionKeyProvider, getPermissionFromABI } from '@zerodev/sdk'

// import { assert } from 'chai'
// import { ethers } from 'ethers'
// import { parseAbi } from 'viem'
// import { generatePrivateKey } from 'viem/accounts'
// import {
//     Account,
//     AssetAttributes,
//     AssetPrice,
//     DDO,
//     MetaData,
//     NFTAttributes,
//     Nevermined,
//     Nft1155Contract,
//     PublishMetadataOptions,
//     ServiceAttributes,
//     convertEthersV6SignerToAccountSigner
// } from '../../src'
// import { config } from '../config'
// import { getMetadata } from '../utils'
// import { decodeJwt } from 'jose'

// describe('Nevermined sdk with zerodev', () => {
//   let nevermined: Nevermined
//   let erc20TokenAddress: string
//   let projectId: string

//   before(async () => {
//     nevermined = await Nevermined.getInstance(config)
//     projectId = process.env.PROJECT_ID!
//     erc20TokenAddress = process.env.TOKEN_ADDRESS || nevermined.utils.token.getAddress()
//   })

//   describe('Test zerodev signatures and login', () => {
//     let clientAssertion: string
//     let zerodevProvider: ECDSAProvider
//     let sessionKey: string

//     before(async () => {
//       const owner = ethers.Wallet.createRandom()
//       zerodevProvider = await ECDSAProvider.init({
//         projectId,
//         owner: convertEthersV6SignerToAccountSigner(owner),
//       })
//       const sessionPrivateKey = generatePrivateKey()
//       const sessionKeyLocalAccount = LocalAccountSigner.privateKeyToAccountSigner(sessionPrivateKey)
//       const permissions = [
//         getPermissionFromABI({
//           target: nevermined.keeper.didRegistry.address as `0x${string}`,
//           abi: parseAbi([
//             'function registerMintableDID(bytes32 _didSeed, address _nftContractAddress, bytes32 _checksum, address[] memory _providers, string memory _url, uint256 _cap, uint256 _royalties, bool _mint, bytes32 _activityId, string memory _nftMetadata, string memory _immutableUrl) public',
//           ]),
//           functionName: 'registerMintableDID',
//         }),
//         getPermissionFromABI({
//           target: nevermined.keeper.didRegistry.address as `0x${string}`,
//           abi: parseAbi([
//             'function registerMintableDID(bytes32 _didSeed,address _nftContractAddress,bytes32 _checksum,address[] memory _providers,string memory _url,uint256 _cap,uint256 _royalties,bytes32 _activityId,string memory _nftMetadata,string memory _immutableUrl) public',
//           ]),
//           functionName: 'registerMintableDID',
//         }),
//         getPermissionFromABI({
//           target: erc20TokenAddress as `0x${string}`,
//           abi: parseAbi([
//             'function approve(address spender, uint256 amount) external returns (bool)',
//           ]),
//           functionName: 'approve',
//         }),
//         getPermissionFromABI({
//           target: nevermined.keeper.templates.nftSalesTemplate.address as `0x${string}`,
//           abi: parseAbi([
//             'function createAgreementAndPayEscrow(bytes32 _id, bytes32 _did, bytes32[] _conditionIds, uint256[] _timeLocks, uint256[] _timeOuts, address _accessConsumer, uint256 _idx, address _rewardAddress, address _tokenAddress, uint256[] _amounts, address[] _receivers) public',
//           ]),
//           functionName: 'createAgreementAndPayEscrow',
//         }),
//       ]
//       const sessionKeyProvider = await SessionKeyProvider.init({
//         projectId: projectId,
//         defaultProvider: zerodevProvider,
//         sessionKey: sessionKeyLocalAccount,
//         sessionKeyData: {
//           validAfter: 0,
//           validUntil: 0,
//           permissions,
//         }
//       })
//       sessionKey = await sessionKeyProvider.serializeSessionKeyParams(sessionPrivateKey)
//     })

//     it('should deserialize the sessionKey', async () => {
//       const sessionKeyParams = SessionKeyProvider.deserializeSessionKeyParams(sessionKey)
//       const sessionKeyProvider = await SessionKeyProvider.fromSessionKeyParams({
//         projectId: projectId,
//         sessionKeyParams,
//       })
//       const account = await Account.fromZeroDevSigner(sessionKeyProvider)
//       const accountInitialProvider = await zerodevProvider.account.getAddress()

//       assert.equal(account.getId(), accountInitialProvider)
//     })

//     it('should generate a client assertion with a zerodev signer', async () => {
//       const sessionKeyParams = SessionKeyProvider.deserializeSessionKeyParams(sessionKey)
//       const sessionKeyProvider = await SessionKeyProvider.fromSessionKeyParams({
//         projectId: projectId,
//         sessionKeyParams,
//         })
//       const account = await Account.fromZeroDevSigner(sessionKeyProvider)
//       // console.log('account', await account.zeroDevSigner.signMessageWith6492('hello world'))
//     //   const account2 = await Account.fromZeroDevSigner(zerodevProvider.getAccountSigner())

//     //   const signer = zerodevProvider.getAccountSigner()
//     //   const account = await Account.fromZeroDevSigner(signer)

//       clientAssertion = await nevermined.utils.jwt.generateClientAssertion(account, 'hello world')
//       assert.isDefined(clientAssertion)

//       const jwtPayload = decodeJwt(clientAssertion)
//       assert.equal(jwtPayload.iss, await zerodevProvider.account.getAddress())
//     })

//     // it('should login to the marketplace api', async () => {
//     //   const accessToken = await nevermined.services.marketplace.login(clientAssertion)
//     //   assert.isDefined(accessToken)

//     //   const jwtPayload = decodeJwt(accessToken)
//     //   const signer = zerodevProvider.getAccountSigner()
//     //   assert.equal(jwtPayload.iss, await signer.getAddress())
//     //   assert.isDefined(jwtPayload.sub)
//     // })
//   })

//   describe('E2E Asset flow with zerodev session keys', () => {
//     let zerodevProviderPublisher: ECDSAProvider
//     let sessionKeyZerodevProviderPublisher: SessionKeyProvider
//     // let sessionKeyZerodevProviderConsumer: SessionKeyProvider
//     // let zerodevProviderConsumer: ECDSAProvider
//     let metadata: MetaData
//     let ddo: DDO
//     let agreementId: string
//     let sessionKeyPublisher: string

//     before(async () => {
//       const projectId = process.env.PROJECT_ID!
//       const publisher = ethers.Wallet.createRandom()
//     //   const consumer = ethers.Wallet.createRandom()

//       zerodevProviderPublisher = await ECDSAProvider.init({
//         projectId,
//         owner: convertEthersV6SignerToAccountSigner(publisher),
//       })
//       const sessionPrivateKey = generatePrivateKey()
//       const sessionKeyLocalAccount = LocalAccountSigner.privateKeyToAccountSigner(sessionPrivateKey)
//       const permissions = [
//         getPermissionFromABI({
//           target: nevermined.keeper.didRegistry.address as `0x${string}`,
//           abi: parseAbi([
//             'function registerMintableDID(bytes32 _didSeed, address _nftContractAddress, bytes32 _checksum, address[] memory _providers, string memory _url, uint256 _cap, uint256 _royalties, bool _mint, bytes32 _activityId, string memory _nftMetadata, string memory _immutableUrl) public',
//           ]),
//           functionName: 'registerMintableDID',
//         }),
//         getPermissionFromABI({
//           target: nevermined.keeper.didRegistry.address as `0x${string}`,
//           abi: parseAbi([
//             'function registerMintableDID(bytes32 _didSeed,address _nftContractAddress,bytes32 _checksum,address[] memory _providers,string memory _url,uint256 _cap,uint256 _royalties,bytes32 _activityId,string memory _nftMetadata,string memory _immutableUrl) public',
//           ]),
//           functionName: 'registerMintableDID',
//         }),
//         getPermissionFromABI({
//           target: erc20TokenAddress as `0x${string}`,
//           abi: parseAbi([
//             'function approve(address spender, uint256 amount) external returns (bool)',
//           ]),
//           functionName: 'approve',
//         }),
//         getPermissionFromABI({
//           target: nevermined.keeper.templates.nftSalesTemplate.address as `0x${string}`,
//           abi: parseAbi([
//             'function createAgreementAndPayEscrow(bytes32 _id, bytes32 _did, bytes32[] _conditionIds, uint256[] _timeLocks, uint256[] _timeOuts, address _accessConsumer, uint256 _idx, address _rewardAddress, address _tokenAddress, uint256[] _amounts, address[] _receivers) public',
//           ]),
//           functionName: 'createAgreementAndPayEscrow',
//         }),
//       ]
//       sessionKeyZerodevProviderPublisher = await SessionKeyProvider.init({
//         projectId: projectId,
//         defaultProvider: zerodevProviderPublisher,
//         sessionKey: sessionKeyLocalAccount,
//         sessionKeyData: {
//           validAfter: 0,
//           validUntil: 0,
//           permissions,
//         }
//       })

//       sessionKeyPublisher = await sessionKeyZerodevProviderPublisher.serializeSessionKeyParams(sessionPrivateKey)

//     //   sessionKeyZerodevProviderPublisher = await ZeroDevEthersProvider.init('ECDSA', {
//     //     projectId,
//     //     owner: convertEthersV6SignerToAccountSigner(publisher),
//     //   })

//     //   zerodevProviderConsumer = await ZeroDevEthersProvider.init('ECDSA', {
//     //     projectId,
//     //     owner: convertEthersV6SignerToAccountSigner(consumer),
//     //   })

//     //   const signerPublisher = zerodevProviderPublisher.getAccountSigner()
//     //   const accountPublisher = await Account.fromZeroDevSigner(sessionKeyZerodevProviderPublisher)
//     //   const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(accountPublisher)
//     //   console.log('clientAssertion', clientAssertion)

//     //   const accessToken = await nevermined.services.marketplace.login(clientAssertion)
//     //   const payload = decodeJwt(accessToken)

//       metadata = getMetadata()
//       metadata.userId  = await publisher.getAddress()
//     })

//     it('should register an asset with a zerodev account', async () => {
//       const sessionKeyParams = SessionKeyProvider.deserializeSessionKeyParams(sessionKeyPublisher)
//       const sessionKeyProvider = await SessionKeyProvider.fromSessionKeyParams({
//         projectId,
//         sessionKeyParams,
//       })

//       const publisher = await Account.fromZeroDevSigner(sessionKeyProvider)

//       const subscriptionNFT = await nevermined.contracts.loadNft1155(
//         erc20TokenAddress
//       )
//       const services: ServiceAttributes[] = [
//         {
//           serviceType: 'nft-sales',
//           price: new AssetPrice(),
//           nft: {
//             amount: 1n,
//             nftTransfer: false,
//           },
//         },
//       ]

//       const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
//         metadata,
//         services,
//         providers: [config.neverminedNodeAddress],
//         nftContractAddress: subscriptionNFT.address,
//         preMint: false,
//         royaltyAttributes: undefined,
//       })
//       ddo = await nevermined.nfts1155.create(nftAttributes, publisher,  undefined, {
//         sessionKeyProvider: sessionKeyProvider
//       })

//       assert.isDefined(ddo)
//     //   assert.equal(ddo.publicKey[0].owner, await signerPublisher.getAddress())
//     //   assert.equal(ddo.proof.creator, await signerPublisher.getAddress())
//     })

//     // it('owner should be able to download the asset', async () => {
//     //   const signerPublisher = zerodevProviderPublisher.getAccountSigner()
//     //   const publisher = await Account.fromZeroDevSigner(signerPublisher)
//     //   const folder = '/tmp/nevermined/sdk-js'

//     //   const path = (await nevermined.assets.download(ddo.id, publisher, folder, -1)) as string
//     //   const files = await new Promise<string[]>((resolve) => {
//     //     fs.readdir(path, (e, fileList) => {
//     //       resolve(fileList)
//     //     })
//     //   })

//     //   assert.deepEqual(files, ['README.md', 'ddo-example.json'])
//     // })

//     // it('consumer should be able to order the asset with a zerodev account', async () => {
//     //   const signerConsumer = zerodevProviderConsumer.getAccountSigner()
//     //   const consumer = await Account.fromZeroDevSigner(signerConsumer)
//     //   agreementId = await nevermined.assets.order(ddo.id, 'access', consumer, {
//     //     zeroDevSigner: signerConsumer,
//     //   })

//     //   assert.isDefined(agreementId)
//     // })

//     // it('consumer should be able to access ordered assets with zerodev account', async () => {
//     //   const signerConsumer = zerodevProviderConsumer.getAccountSigner()
//     //   const consumer = await Account.fromZeroDevSigner(signerConsumer)
//     //   const folder = '/tmp/nevermined/sdk-js'

//     //   const path = (await nevermined.assets.access(
//     //     agreementId,
//     //     ddo.id,
//     //     'access',
//     //     consumer,
//     //     folder,
//     //     -1,
//     //   )) as string

//     //   const files = await new Promise<string[]>((resolve) => {
//     //     fs.readdir(path, (e, fileList) => {
//     //       resolve(fileList)
//     //     })
//     //   })

//     //   assert.deepEqual(files, ['README.md', 'ddo-example.json'])
//     // })
//   })
// })
