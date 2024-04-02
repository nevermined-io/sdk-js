import { assert } from 'chai'
import TestContractHandler from './TestContractHandler'
import { Keeper } from '@/keeper/Keeper'
import { Nevermined } from '@/nevermined/Nevermined'
import { ZeroAddress } from '@/constants/AssetConstants'

let keeper: Keeper

describe('Keeper', () => {
  let nevermined: Nevermined
  let deployerAddress
  let owner
  const newNetworkFee = 200000 / 100

  before(async () => {
    const deployer = await TestContractHandler.prepareContracts()
    nevermined = deployer.nevermined
    deployerAddress = deployer.deployerAddress
    ;[owner] = await nevermined.accounts.list()
    ;({ keeper } = nevermined)
  })

  describe('public interface', () => {
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

  describe('#getNetworkName()', () => {
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

  describe('Contracts are Configured', () => {
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
})
