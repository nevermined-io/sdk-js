// TODO: Enable when ZeroDev is back
// import chai, { assert } from 'chai'
// import chaiAsPromised from 'chai-as-promised'

// import {
//   AssetPrice,
//   ResourceAuthentication,
//   SubscriptionType,
//   convertEthersV6SignerToAccountSigner,
//   isAddress,
//   makeWallets,
//   makeRandomWallet,
// } from '../../src'
// import TestContractHandler from '../../test/keeper/TestContractHandler'
// import { NVMAppEnvironments, NvmApp } from '../../src/nevermined/NvmApp'
// import { NvmAppMetadata } from '../../src/ddo/NvmAppMetadata'
// import { ZeroDevAccountSigner, ZeroDevEthersProvider } from '@zerodev/sdk'
// import { AppDeploymentStaging } from '../../src/nevermined/resources/AppNetworks'

// chai.use(chaiAsPromised)

// // Execute first:
// // ./scripts/download-artifacts.sh v3.5.6 arbitrum-sepolia public
// // export PROJECT_ID=your_project_id
// describe('NVM App API', () => {
//   let nvmAppPublisher: NvmApp
//   let nvmAppSubscriber: NvmApp

//   let subscriptionNFTAddress: string
//   let subscriptionDid: string
//   let agentDid: string
//   let datasetDid: string
//   let agreementId

//   const projectId = process.env.PROJECT_ID!
//   let zerodevProvider: ZeroDevEthersProvider<'ECDSA'>
//   let accountSigner: ZeroDevAccountSigner<'ECDSA'>
//   let publisherAddress: string
//   let subscriptionPrice: AssetPrice
//   let subscriptionPriceWithFees: AssetPrice

//   // Agent/Service test configuration
//   const SERVICE_ENDPOINT = process.env.SERVICE_ENDPOINT || 'http://127.0.0.1:3000'
//   const OPEN_PATH = process.env.OPEN_PATH || '/openapi.json'
//   const OPEN_ENDPOINT = process.env.OPEN_ENDPOINT || `${SERVICE_ENDPOINT}${OPEN_PATH}`
//   const AUTHORIZATION_TYPE = (process.env.AUTHORIZATION_TYPE ||
//     'bearer') as ResourceAuthentication['type']
//   const AUTHORIZATION_TOKEN = process.env.AUTHORIZATION_TOKEN || 'new_authorization_token'
//   const AUTHORIZATION_USER = process.env.AUTHORIZATION_USER || 'user'
//   const AUTHORIZATION_PASSWORD = process.env.AUTHORIZATION_PASSWORD || 'password'

//   before(async () => {
//     const owner = makeRandomWallet()
//     zerodevProvider = await ZeroDevEthersProvider.init('ECDSA', {
//       projectId,
//       owner: convertEthersV6SignerToAccountSigner(owner),
//     })

//     const contractABI = await TestContractHandler.getABIArtifact(
//       `NFT1155SubscriptionUpgradeable.arbitrum-sepolia`,
//       './artifacts/',
//     )

//     subscriptionNFTAddress = contractABI.address
//     console.debug(`Using ERC-1155 Subscription NFT on address: ${subscriptionNFTAddress}`)

//     accountSigner = zerodevProvider.getAccountSigner()
//     publisherAddress = await accountSigner.getAddress()

//     // Using USDC token address
//     // WARN: Make sure the subscriber account has balance to pay the gas and the subscription
//     subscriptionPrice = new AssetPrice(publisherAddress, 1000n).setTokenAddress(
//       new AppDeploymentStaging().tokenAddress,
//     )
//   })

//   describe('As a PUBLISHER', () => {
//     it('I want to search content from the app', async () => {
//       nvmAppPublisher = await NvmApp.getInstance(NVMAppEnvironments.Staging)
//       const results = await nvmAppPublisher.search.query({})
//       console.log(JSON.stringify(results.totalResults))

//       assert.isDefined(results)
//     })

//     it('Get the default configuration used', async () => {
//       const appConfig = nvmAppPublisher.config
//       assert.isDefined(appConfig)
//       assert.equal(appConfig.marketplaceUri, 'https://marketplace-api.staging.nevermined.app')
//     })

//     it('Overwrite the default config with some parameters', async () => {
//       assert.notEqual(nvmAppPublisher.config.artifactsFolder, './artifacts')
//       nvmAppPublisher = await NvmApp.getInstance(NVMAppEnvironments.Staging, {
//         artifactsFolder: './artifacts',
//       })
//       assert.equal(nvmAppPublisher.config.artifactsFolder, './artifacts')
//     })

//     it('I want to connect my account', async () => {
//       assert.isFalse(nvmAppPublisher.isWeb3Connected())

//       await nvmAppPublisher.connect(accountSigner)

//       assert.isTrue(nvmAppPublisher.isWeb3Connected())
//       assert.isTrue(nvmAppPublisher.getLoginCredentials().length > 0)
//     })

//     it('I can get the network fees', async () => {
//       const networkFees = nvmAppPublisher.networkFees
//       assert.isDefined(networkFees)
//       console.log(`Network Fees: ${JSON.stringify(networkFees)}`)
//       assert.isTrue(isAddress(networkFees.receiver))
//       assert.isTrue(networkFees.fee > 0)
//     })

//     it('I can calculate and include network fees', async () => {
//       // console.log(`AssetPrice object: ${subscriptionPrice.toString()}`)

//       // assert.isFalse(nvmApp.isNetworkFeeIncluded(subscriptionPrice))

//       subscriptionPriceWithFees = nvmAppPublisher.addNetworkFee(subscriptionPrice)
//       console.log(`Asset Price with fees: ${subscriptionPriceWithFees.toString()}`)

//       assert.isTrue(nvmAppPublisher.isNetworkFeeIncluded(subscriptionPriceWithFees))
//     })

//     it('I want to create a time subscription', async () => {
//       const timeSubscriptionMetadata = NvmAppMetadata.getTimeSubscriptionMetadataTemplate(
//         'NVM App Time only Subscription test',
//         'Nevermined',
//         'hours',
//       )
//       timeSubscriptionMetadata.additionalInformation.customData = {
//         subscriptionLimitType: SubscriptionType.Time,
//         dateMeasure: 'hours',
//       }

//       const ddo = await nvmAppPublisher.createTimeSubscription(
//         timeSubscriptionMetadata,
//         subscriptionPriceWithFees,
//         100, // 100 blocks duration
//       )

//       assert.isDefined(ddo)
//       const ddoFound = await nvmAppPublisher.search.byDID(ddo.id)
//       assert.equal(ddo.id, ddoFound.id)
//     })

//     it('I want to create a credits subscription', async () => {
//       const creditsSubscriptionMetadata = NvmAppMetadata.getCreditsSubscriptionMetadataTemplate(
//         'NVM App Credits Subscription test',
//         'Nevermined',
//       )
//       creditsSubscriptionMetadata.additionalInformation.customData = {
//         subscriptionLimitType: SubscriptionType.Credits,
//       }

//       const ddo = await nvmAppPublisher.createCreditsSubscription(
//         creditsSubscriptionMetadata,
//         subscriptionPriceWithFees,
//         50n, // number of credits given to the subscribers
//       )

//       assert.isDefined(ddo)
//       const ddoFound = await nvmAppPublisher.search.byDID(ddo.id)
//       assert.equal(ddo.id, ddoFound.id)
//       subscriptionDid = ddo.id
//     })

//     it('I want to register an Agent', async () => {
//       const agentMetadata = NvmAppMetadata.getServiceMetadataTemplate(
//         'Nevermined Ageeeent',
//         'Nevermined',
//         [
//           {
//             GET: `${SERVICE_ENDPOINT}/(.*)`,
//           },
//         ],
//         [OPEN_ENDPOINT],
//         OPEN_ENDPOINT,
//         'RESTful',
//         AUTHORIZATION_TYPE,
//         AUTHORIZATION_TOKEN,
//         AUTHORIZATION_USER,
//         AUTHORIZATION_PASSWORD,
//         true,
//       )

//       const ddo = await nvmAppPublisher.registerServiceAsset(
//         agentMetadata,
//         subscriptionDid,
//         // We are gonna configure the agent usage costs in a dynamic manner:
//         // The cost in credits for every succesful query to the agent will be between 1 and 5 credits being 2 credits the default cost
//         2n, // default cost in credits for every succesful query to the agent
//         1n, // min amount of credits to be consumed
//         5n, // max amount of credits to be consumed
//       )

//       assert.isDefined(ddo)
//       const ddoFound = await nvmAppPublisher.search.byDID(ddo.id)
//       assert.equal(ddo.id, ddoFound.id)
//       agentDid = ddo.id
//     })

//     it('I want to register a Dataset', async () => {
//       const datasetMetadata = NvmAppMetadata.getFileMetadataTemplate(
//         'NVM App Dataset test',
//         'Nevermined',
//       )
//       datasetMetadata.main.files = [
//         {
//           index: 0,
//           contentType: 'application/json',
//           name: 'ddo-example.json',
//           url: 'https://storage.googleapis.com/nvm-static-assets/files/ci/ddo-example.json',
//         },
//         {
//           index: 1,
//           contentType: 'text/plain',
//           name: 'README.md',
//           url: 'https://storage.googleapis.com/nvm-static-assets/files/ci/README.md',
//         },
//       ]

//       const ddo = await nvmAppPublisher.registerFileAsset(
//         datasetMetadata,
//         subscriptionDid,
//         1n, // every file download costs 1 credit to the subscriber
//       )

//       assert.isDefined(ddo)
//       const ddoFound = await nvmAppPublisher.search.byDID(ddo.id)
//       assert.equal(ddo.id, ddoFound.id)
//       datasetDid = ddo.id
//     })
//   })

//   describe('As a SUBSCRIBER', () => {
//     it('I want to connect as subscriber', async () => {
//       nvmAppSubscriber = await NvmApp.getInstance(NVMAppEnvironments.Staging, {
//         artifactsFolder: './artifacts',
//       })
//       const appConfig = nvmAppSubscriber.config
//       appConfig.accounts = makeWallets(process.env.SEED_WORDS)

//       const subscriberAddress = await appConfig.accounts[0].getAddress()
//       await nvmAppSubscriber.connect(subscriberAddress, appConfig)

//       assert.isTrue(nvmAppSubscriber.isWeb3Connected())
//     })

//     it('I want to order a subscription', async () => {
//       const orderResult = await nvmAppSubscriber.orderSubscription(subscriptionDid)
//       assert.isDefined(orderResult)
//       assert.isTrue(orderResult.success)
//       assert.isTrue(orderResult.agreementId.length > 0)
//       agreementId = orderResult.agreementId
//     })

//     it('I want to get the token giving access to a remote agent', async () => {
//       const token = await nvmAppSubscriber.getServiceAccessToken(agentDid)
//       console.log(`Token: ${JSON.stringify(token)}`)
//       assert.isDefined(token)
//       assert.isTrue(token.accessToken.length > 0)
//       assert.isTrue(token.neverminedProxyUri.length > 0)
//     })

//     it('I want to download a file asset', async () => {
//       const results = await nvmAppSubscriber.downloadFiles(
//         datasetDid,
//         agreementId,
//         `/tmp/.nevermined/downloads/${datasetDid}/`,
//       )

//       assert.isDefined(results)
//       assert.isTrue(results.success)
//     })

//     it('I can disconnect and still search', async () => {
//       await nvmAppSubscriber.disconnect()
//       const results = await nvmAppSubscriber.search.query({})
//       assert.isTrue(results.totalResults.value > 0)
//     })
//   })
// })
