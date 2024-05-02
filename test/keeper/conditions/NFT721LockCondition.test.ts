import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { ConditionStoreManager, DIDRegistry } from '../../../src/keeper'

import TestContractHandler from '../TestContractHandler'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import { NFT721Api } from '../../../src/nevermined/api'
import { NvmAccount } from '../../../src/models/NvmAccount'
import { generateId } from '../../../src/common/helpers'
import { didZeroX, zeroX } from '../../../src/utils/ConversionTypeHelpers'
import { NFT721LockCondition } from '../../../src/keeper/contracts/conditions/NFTs/NFT721LockCondition'
import { ConditionState } from '../../../src/types/ContractTypes'
import { Log } from 'viem'

chai.use(chaiAsPromised)

describe('NFT721LockCondition', () => {
  let nevermined: Nevermined
  let nft721LockCondition: NFT721LockCondition
  let conditionStoreManager: ConditionStoreManager
  let didRegistry: DIDRegistry
  let nftContractAddress: string
  let _nftContract
  let nft721Wrapper: NFT721Api
  let lockAddress: NvmAccount
  let owner: NvmAccount
  let did: string
  let didSeed: string

  let agreementId: string
  const amount = 10

  before(async () => {
    const prepare = await TestContractHandler.prepareContracts()
    nevermined = prepare.nevermined
    ;({ nft721LockCondition } = nevermined.keeper.conditions)
    ;({ conditionStoreManager, didRegistry } = nevermined.keeper)
    ;[owner, lockAddress] = nevermined.accounts.list()

    console.log(`NFT721LockCondition`, nft721LockCondition)

    _nftContract = await TestContractHandler.deployContract('NFT721Upgradeable', owner, [
      owner.getId(),
      didRegistry.address,
      'NFT721',
      'NVM',
      '',
      0,
      nevermined.keeper.nvmConfig.address,
    ])
    console.log(`NFT721Upgradeable contract deployed on: ${_nftContract.address}`)

    nft721Wrapper = await nevermined.contracts.loadNft721(_nftContract.address)
    nftContractAddress = nft721Wrapper.address
    await nft721Wrapper.nftContract.grantOperatorRole(nft721LockCondition.address, owner)
  })

  beforeEach(async () => {
    agreementId = generateId()
    didSeed = `did:nv:${generateId()}`
    did = await didRegistry.hashDID(didSeed, owner.getId())

    await nft721Wrapper.mint(didZeroX(did), owner)
    await nft721Wrapper.setApprovalForAll(nft721LockCondition.address, true, owner)
  })

  describe('#hashValues()', () => {
    it('should hash the values and generate an ID', async () => {
      const hash = await nft721LockCondition.hashValues(
        did,
        lockAddress.getId(),
        amount,
        nftContractAddress,
      )
      assert.match(hash, /^0x[a-f0-9]{64}$/i)

      const id = await nft721LockCondition.generateId(agreementId, hash)
      assert.match(id, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('fulfill correctly', () => {
    it('should fulfill if conditions exist for account address', async () => {
      const hashValues = await nft721LockCondition.hashValues(
        did,
        lockAddress.getId(),
        1,
        nftContractAddress,
      )
      const conditionId = await nft721LockCondition.generateId(agreementId, hashValues)
      await conditionStoreManager.createCondition(conditionId, nft721LockCondition.address, owner)
      const txReceipt = await nft721LockCondition.fulfill(
        agreementId,
        did,
        lockAddress.getId(),
        1,
        nftContractAddress,
        owner,
      )
      const { state } = await conditionStoreManager.getCondition(conditionId)
      assert.equal(state, ConditionState.Fulfilled)
      const nftBalance = await nft721Wrapper.balanceOf(lockAddress)
      assert.equal(nftBalance, 1n)

      const logs = nft721LockCondition.getTransactionLogs(txReceipt, 'Fulfilled')
      assert.isTrue(logs.length > 0)

      const event: Log = logs[0]
      // @ts-ignore
      const { _agreementId, _did, _lockAddress, _conditionId, _amount, _nftContractAddress } =
        event.args

      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))
      assert.equal(_conditionId, conditionId)
      assert.equal(_lockAddress, lockAddress.getId())
      assert.equal(Number(_amount), 1)
      assert.equal(_nftContractAddress.toLowerCase(), nftContractAddress.toLowerCase())
    })
  })

  describe('trying to fulfill but is invalid', () => {
    it('should not fulfill if conditions do not exist', async () => {
      await nft721LockCondition.hashValues(did, lockAddress.getId(), 1, nftContractAddress)
      await assert.isRejected(
        nft721LockCondition.fulfill(
          agreementId,
          did,
          lockAddress.getId(),
          1,
          nftContractAddress,
          owner,
        ),
        /Condition doesnt exist/,
      )
    })

    it('correct transfer should fail to fulfill if conditions already fulfilled', async () => {
      const hashValues = await nft721LockCondition.hashValues(
        did,
        lockAddress.getId(),
        1,
        nftContractAddress,
      )
      const conditionId = await nft721LockCondition.generateId(agreementId, hashValues)
      await conditionStoreManager.createCondition(conditionId, nft721LockCondition.address, owner)

      await nft721LockCondition.fulfill(
        agreementId,
        did,
        lockAddress.getId(),
        1,
        nftContractAddress,
        owner,
      )
      let { state } = await conditionStoreManager.getCondition(conditionId)
      assert.equal(state, ConditionState.Fulfilled)

      await assert.isRejected(
        nft721LockCondition.fulfill(
          agreementId,
          did,
          lockAddress.getId(),
          1,
          nftContractAddress,
          owner,
        ),
        undefined,
      )
      ;({ state } = await conditionStoreManager.getCondition(conditionId))
      assert.equal(state, ConditionState.Fulfilled)
    })
  })
})
