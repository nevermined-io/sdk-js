import { assert } from 'chai'
import TestContractHandler from './TestContractHandler'
import { Keeper } from '@/keeper/Keeper'
import { Nevermined } from '@/nevermined/Nevermined'
import { ZeroAddress } from '@/constants/AssetConstants'
import { Abi, getAbiItem } from 'viem'
import { generateId } from '@/common/helpers'
import { NFTAttributes } from '@/models'

let keeper: Keeper

describe('Keeper', () => {
  let nevermined: Nevermined
  let deployerAddress
  let owner
  let deployer
  const newNetworkFee = 200000 / 100
  let transferAbi: Abi
  let didRegistryAbi: Abi

  before(async () => {
    const handler = await TestContractHandler.prepareContracts()
    nevermined = handler.nevermined
    deployerAddress = handler.deployerAddress
    deployer = handler.deployerAccount
    ;[owner] = await nevermined.accounts.list()
    ;({ keeper } = nevermined)
    transferAbi = keeper.conditions.transferNftCondition.contract.abi
    didRegistryAbi = keeper.didRegistry.contract.abi
  })

  describe.skip('blockchain utils: registerMintable', () => {
    const didSeed = '0x0f6a2f355c104801b4ff70c504877df4081658779f5848a299221486672e31d4'
    const nftAddress = '0xe2DD09d719Da89e5a3D0F2549c7E24566e947260'
    const checksum = generateId()
    const providers: string[] = ['0xe2DD09d719Da89e5a3D0F2549c7E24566e947260']
    const url = 'https://nevermined.io'
    const cap = 100
    const royalties = 0
    const mint = false
    const activityId = generateId()

    const args = [
      didSeed, // bytes32
      nftAddress, // address
      checksum, // bytes32
      providers, // address[]
      url, // string
      cap, // uint256
      royalties, // uint256
      mint, // bool
      activityId, // bytes32
      '', // nftMetadataaddress string
      '', // immutableUrl string
    ]

    it('should find abi function', () => {
      assert(didRegistryAbi)

      console.log(args)
      console.log(args.length)
      const func = getAbiItem({ abi: didRegistryAbi, name: 'registerMintableDID', args })
      assert(func)
      console.log(func)
      // @ts-ignore
      console.log(func.inputs.length)
      // @ts-ignore
      assert.isTrue(func.inputs.length === args.length)
    })

    it('should register the asset', async () => {
      const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({ metadata: undefined })
      const hash = await keeper.didRegistry.registerMintableDID(
        didSeed,
        nftAddress,
        checksum,
        providers,
        deployer,
        nftAttributes,
        url,
        '',
        activityId,
      )
      console.log(`Hash: ${hash}`)
      assert(hash)
    })
  })

  describe.skip('blockchain utils: hashValues', () => {
    const did = '0x448df0b7fb0fa7c505a01e085a6edfc5066616b76a0bc6a216f4f4ff983d6364'
    const owner = '0xe2DD09d719Da89e5a3D0F2549c7E24566e947260'
    const receiver = '0xBE5449a6A97aD46c8558A3356267Ee5D2731ab5e'
    const conditionId = '0x79004a5a24064be293e5842f25aa8a3a53ac8ba156cc44028450ad315066d437'
    const amount = 2
    const args = [
      did, // bytes32
      owner, // address
      receiver, // address
      amount, // uint256
      conditionId, //bytes32
      receiver, // address
      true, // bool
    ]

    it('should find abi function', () => {
      assert(transferAbi)

      const func = getAbiItem({ abi: transferAbi, name: 'hashValues', args })
      assert(func)
      console.log(func)
      // @ts-ignore
      assert.isTrue(func.inputs.length === 7)
      //searchAbiFunction()
    })

    it('should generate right hashes', async () => {
      const hash = await keeper.conditions.transferNftCondition.hashValues(
        did,
        owner,
        receiver,
        amount,
        conditionId,
      )
      console.log(`Hash: ${hash}`)
      assert(hash)
    })
  })
  describe.skip('public interface', () => {
    it('should have dispenser', () => {
      assert(keeper.dispenser !== null)
    })

    it('should have token', () => {
      assert(keeper.token !== null)
    })

    it('should not have curve royalties', () => {
      assert(keeper.royalties.curve === undefined, 'should not have curve royalties')
    })
  })

  describe.skip('#getNetworkName()', () => {
    it('should get localnet as default', async () => {
      const networkName: string = await keeper.getNetworkName()
      assert(
        networkName === 'geth-localnet' ||
          networkName === 'polygon-localnet' ||
          networkName === 'spree' ||
          networkName === 'hardhat',
      )
    })
  })

  describe.skip('Contracts are Configured', () => {
    it('Deployer is Governor', async () => {
      console.log(`NVMConfig Address: ${keeper.nvmConfig.address}`)
      console.log(`Checking if: ${deployerAddress} is GOVERNOR`)
      const isGovernor = await keeper.nvmConfig.isGovernor(deployerAddress)
      assert(isGovernor)
    })

    it('Get Network Fee', async () => {
      const networkFee = await keeper.nvmConfig.getNetworkFee()
      assert.equal(networkFee, 0n)
    })

    it('Get Fee Receiver', async () => {
      const feeReceiver = await keeper.nvmConfig.getFeeReceiver()
      assert.equal(feeReceiver, ZeroAddress)
    })

    it('Set Network Fees', async () => {
      await keeper.nvmConfig.setNetworkFees(newNetworkFee, deployerAddress, owner)
      const networkFee = await keeper.nvmConfig.getNetworkFee()
      const feeReceiver = await keeper.nvmConfig.getFeeReceiver()

      assert.equal(networkFee, BigInt(newNetworkFee))
      assert.equal(feeReceiver, deployerAddress)
    })
  })

  describe('request tokens', () => {
    it('should get be able to request tokens', async () => {
      console.log(`Dispenser address: ${nevermined.keeper.dispenser.address}`)
      const result = await nevermined.accounts.requestTokens(owner, 200n)
      assert.isTrue(result)
    })
  })
})
