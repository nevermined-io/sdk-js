import { assert } from 'chai'
import config from '../config'
import TestContractHandler from './TestContractHandler'
import { Keeper } from '../../src/keeper'
import { Nevermined } from '../../src/nevermined'
import { ZeroAddress } from '../../src/utils'

let keeper: Keeper

describe('Keeper', () => {
  let deployerAddress
  let owner
  const newNetworkFee = 200000 / 100

  before(async () => {
    deployerAddress = await TestContractHandler.prepareContracts()
    const nevermined = await Nevermined.getInstance(config)
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

    it('should not have Aave contracts', () => {
      assert(keeper.templates!.aaveCreditTemplate! === undefined, 'should not have aave templates')
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
      const isGovernor = await keeper.nvmConfig.isGovernor(deployerAddress)
      assert(isGovernor)
    })

    it('Get Network Fee', async () => {
      const networkFee = await keeper.nvmConfig.getNetworkFee()
      console.log(`NETWORK FEE = ${networkFee}`)
      assert.equal(networkFee, 0n)
    })

    it('Get Fee Receiver', async () => {
      const feeReceiver = await keeper.nvmConfig.getFeeReceiver()
      console.log(`FEE RECEIVER = ${feeReceiver}`)
      assert.equal(feeReceiver, ZeroAddress)
    })

    it('Set Network Fees', async () => {
      await keeper.nvmConfig.setNetworkFees(newNetworkFee, deployerAddress, owner)
      const networkFee = await keeper.nvmConfig.getNetworkFee()
      const feeReceiver = await keeper.nvmConfig.getFeeReceiver()

      console.log(`NETWORK FEE = ${networkFee}`)
      console.log(`FEE RECEIVER = ${feeReceiver}`)

      assert.equal(networkFee, BigInt(newNetworkFee))
      assert.equal(feeReceiver, deployerAddress)
    })
  })
})
