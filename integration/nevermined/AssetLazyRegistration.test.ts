// import { assert } from 'chai'
// import { ContractHandler, Nevermined, NvmAccount, didZeroX, generateId, zeroX } from '../../src'
// import { config } from '../config'
// import { sleep } from '../utils/utils'

describe.skip('Lazy registration of assets', () => {
  // let publisher: NvmAccount
  // let relayer: NvmAccount
  // let publisherSigner: NvmAccount
  // let relayerSigner: NvmAccount
  // let nevermined: Nevermined
  // let didRegistryAbi
  // let registryContract
  // let functionArgs
  // const functionName = 'registerDID'
  // const providers = []
  // const metadataUrl = 'http://localhost:5000'
  // const activityId = zeroX(generateId())
  // const immutableUrl = ''
  // before(async () => {
  //   nevermined = await Nevermined.getInstance(config)
  //   ;[publisher, relayer] = await nevermined.accounts.list()
  //   publisherSigner = await nevermined.accounts.findAccount(publisher.getId())
  //   relayerSigner = await nevermined.accounts.findAccount(relayer.getId())
  //   const networkName = await nevermined.keeper.getNetworkName()
  //   didRegistryAbi = await ContractHandler.getABIArtifact(
  //     'DIDRegistry',
  //     config.artifactsFolder,
  //     networkName,
  //   )
  //   registryContract = await nevermined.utils.blockchain.loadContract(didRegistryAbi.address, didRegistryAbi.abi)
  //   registryContract[functionName](didRegistryAbi.address)
  // })
  // describe('Ethers :: Lazy registration of assets', () => {
  //   const didSeed = zeroX(generateId())
  //   const checksum = zeroX(generateId())
  //   let fragment
  //   let unsignedTx
  //   let signedTx
  //   it('should be able to generate a tx hash and the signature', async () => {
  //     registryContract.connect(publisherSigner)
  //     functionArgs = [
  //       didSeed,
  //       checksum,
  //       providers.map(zeroX),
  //       metadataUrl,
  //       activityId,
  //       immutableUrl,
  //     ]
  //     fragment = await registryContract[functionName].getFragment(...functionArgs)
  //     assert.isDefined(fragment)
  //     unsignedTx = await registryContract[functionName].populateTransaction(...functionArgs)
  //     assert.isDefined(unsignedTx)
  //     // unsignedTx.from = relayer.getId()
  //     console.log(`unsignedTx: `, unsignedTx)
  //     signedTx = await nevermined.utils.signature.signTransaction(unsignedTx, publisherSigner)
  //     assert.isDefined(signedTx)
  //     console.log(`signedTx: `, JSON.stringify(signedTx))
  //   })
  //   it('should be able to rely the tx and register on-chain', async () => {
  //     const tx = Transaction.from(signedTx)
  //     const gasLimit = await registryContract[functionName].estimateGas(...functionArgs, {
  //       from: relayer.getId(),
  //     })
  //     console.log(`Relayer ETH balance: `, await relayer.getEtherBalance())
  //     const feeData = await nevermined.utils.blockchain.getFeeData()
  //     console.log(`Fee Data: `, feeData)
  //     // const feeData = await nevermined.web3.getFeeData()
  //     tx.chainId = await nevermined.keeper.getNetworkId()
  //     tx.type = 2
  //     tx.nonce = await relayerSigner.getNonce()
  //     tx.gasLimit = gasLimit
  //     if (Object.keys(feeData).includes('gasPrice')) {
  //       tx.gasPrice = feeData['gasPrice']! // eslint-disable-line @typescript-eslint/no-non-null-assertion
  //     } else {
  //       tx.maxFeePerGas = feeData['maxFeePerGas']! // eslint-disable-line @typescript-eslint/no-non-null-assertion
  //       tx.maxPriorityFeePerGas = feeData['maxPriorityFeePerGas']! // eslint-disable-line @typescript-eslint/no-non-null-assertion
  //     }
  //     console.log(`Deserialized tx: `, JSON.stringify(tx))
  //     const txResponse = await relayerSigner.sendTransaction(tx)
  //     // const provider = new ethers.JsonRpcProvider(config.web3ProviderUri, undefined, {cacheTimeout: -1})
  //     // const txResponse = await nevermined.web3.broadcastTransaction(tx.serialized)
  //     // const txResponse = await provider.sendTransaction(Transaction.from(signedTx))
  //     assert.isDefined(txResponse)
  //     console.log(`TX Response: `, txResponse)
  //     await sleep(3000)
  //     // const txResult = await nevermined.web3.getTransactionReceipt(txResponse.hash)
  //     // console.log(`TX Result: `, JSON.stringify(txResult))
  //   })
  //   it('the asset should be there created correctly', async () => {
  //     const did = await nevermined.keeper.didRegistry.hashDID(zeroX(didSeed), publisher.getId())
  //     console.log(`DID: `, did)
  //     console.log(`DID Seed: `, didSeed)
  //     const assetRegistry = await nevermined.keeper.didRegistry.getAttributesByDid(did)
  //     assert.equal(assetRegistry.did, didZeroX(did))
  //     assert.equal(assetRegistry.owner, publisher.getId())
  //   })
  // })
  // describe.skip('Contracts :: Lazy registration of assets', () => {
  //   const didSeed = `did:nv:${generateId()}`
  //   const checksum = generateId()
  //   it('should be able to generate a tx hash and the signature', async () => {
  //     const _did = await nevermined.keeper.didRegistry.hashDID(didSeed, publisher.getId())
  //     await nevermined.keeper.didRegistry.registerDID(
  //       didSeed,
  //       checksum,
  //       providers,
  //       publisher.getId(),
  //       metadataUrl,
  //     )
  //   })
  //   // it('should be able to rely the tx and register on-chain', async () => {
  //   // })
  //   // it('the asset should be there created correctly', async () => {
  //   // })
  // })
})
