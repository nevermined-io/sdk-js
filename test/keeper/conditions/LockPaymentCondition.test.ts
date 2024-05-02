import chai, { assert } from 'chai'
import {
  EscrowPaymentCondition,
  LockPaymentCondition,
  Token,
  ConditionStoreManager,
} from '../../../src/keeper'
import TestContractHandler from '../TestContractHandler'
import { AssetPrice } from '../../../src/models/AssetPrice'
import { NvmAccount } from '../../../src/models/NvmAccount'
import { generateId } from '../../../src/common/helpers'
import { ZeroAddress } from '../../../src/constants/AssetConstants'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

let conditionStoreManager: ConditionStoreManager
let lockPaymentCondition: LockPaymentCondition
let escrowPaymentCondition: EscrowPaymentCondition
let assetPrice: AssetPrice
let token: Token

let deployer: NvmAccount
let owner: NvmAccount
let buyer: NvmAccount
let seller: NvmAccount

describe('LockPaymentCondition', () => {
  const amount = 15n
  let agreementId
  let did
  let nevermined

  beforeEach(() => {
    agreementId = generateId(64)
    did = `did:nv:${generateId()}`
  })

  before(async () => {
    const prepare = await TestContractHandler.prepareContracts()
    nevermined = prepare.nevermined
    deployer = prepare.deployerAccount

    await nevermined.keeper.nvmConfig.setNetworkFees(0, ZeroAddress, deployer)
    ;({ conditionStoreManager } = nevermined.keeper)
    ;({ lockPaymentCondition, escrowPaymentCondition } = nevermined.keeper.conditions)
    ;({ token } = nevermined.keeper)
    ;[owner, seller, buyer] = nevermined.accounts.list()
    assetPrice = new AssetPrice(seller.getId(), amount)
  })

  describe('#hashValues()', () => {
    it('should hash the values', async () => {
      const hash = await lockPaymentCondition.hashValues(
        did,
        seller.getId(),
        token.address,
        assetPrice.getAmounts(),
        assetPrice.getReceivers(),
      )

      assert.match(hash, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('#generateId()', () => {
    it('should generate an ID', async () => {
      const hash = await lockPaymentCondition.hashValues(
        did,
        seller.getId(),
        token.address,
        assetPrice.getAmounts(),
        assetPrice.getReceivers(),
      )
      const conditionId = await lockPaymentCondition.generateId(agreementId, hash)

      assert.match(conditionId, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('#fulfill()', () => {
    it('should fulfill with token', async () => {
      const hash = await lockPaymentCondition.hashValues(
        did,
        escrowPaymentCondition.address,
        token.address,
        assetPrice.getAmounts(),
        assetPrice.getReceivers(),
      )
      const conditionId = await lockPaymentCondition.generateId(agreementId, hash)

      await conditionStoreManager.createCondition(conditionId, lockPaymentCondition.address, owner)

      await nevermined.accounts.requestTokens(buyer, assetPrice.getTotalPrice())

      await token.approve(lockPaymentCondition.address, assetPrice.getTotalPrice(), buyer)

      await lockPaymentCondition.fulfill(
        agreementId,
        did,
        escrowPaymentCondition.address,
        token.address,
        assetPrice.getAmounts(),
        assetPrice.getReceivers(),
        buyer,
      )

      assert.match(conditionId, /^0x[a-f0-9]{64}$/i)
    })

    it('should fulfill with ether', async () => {
      const hash = await lockPaymentCondition.hashValues(
        did,
        escrowPaymentCondition.address,
        ZeroAddress,
        assetPrice.getAmounts(),
        assetPrice.getReceivers(),
      )
      const conditionId = await lockPaymentCondition.generateId(agreementId, hash)

      await conditionStoreManager.createCondition(conditionId, lockPaymentCondition.address, owner)

      await lockPaymentCondition.fulfill(
        agreementId,
        did,
        escrowPaymentCondition.address,
        ZeroAddress,
        assetPrice.getAmounts(),
        assetPrice.getReceivers(),
        buyer,
        { value: assetPrice.getTotalPrice() },
      )

      assert.match(conditionId, /^0x[a-f0-9]{64}$/i)
    })

    it('should fail to fulfill without ether', async () => {
      const hash = await lockPaymentCondition.hashValues(
        did,
        escrowPaymentCondition.address,
        ZeroAddress,
        assetPrice.getAmounts(),
        assetPrice.getReceivers(),
      )
      const conditionId = await lockPaymentCondition.generateId(agreementId, hash)

      await conditionStoreManager.createCondition(conditionId, lockPaymentCondition.address, owner)

      await assert.isRejected(
        lockPaymentCondition.fulfill(
          agreementId,
          did,
          escrowPaymentCondition.address,
          ZeroAddress,
          assetPrice.getAmounts(),
          assetPrice.getReceivers(),
          buyer,
        ),
        /Transaction value does not match amount/,
      )
    })

    it('should fail to fulfill with too few ether', async () => {
      const hash = await lockPaymentCondition.hashValues(
        did,
        escrowPaymentCondition.address,
        ZeroAddress,
        assetPrice.getAmounts(),
        assetPrice.getReceivers(),
      )
      const conditionId = await lockPaymentCondition.generateId(agreementId, hash)

      await conditionStoreManager.createCondition(conditionId, lockPaymentCondition.address, owner)

      await assert.isRejected(
        lockPaymentCondition.fulfill(
          agreementId,
          did,
          escrowPaymentCondition.address,
          ZeroAddress,
          assetPrice.getAmounts(),
          assetPrice.getReceivers(),
          buyer,
          { value: assetPrice.getTotalPrice() - 1n },
        ),
        /Transaction value does not match amount/,
      )
    })
  })
})
