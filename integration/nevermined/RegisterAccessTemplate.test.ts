import { assert } from 'chai'
import { decodeJwt } from 'jose'

import { config } from '../config'

import { Nevermined, Account, Keeper, DDO, Logger, AssetAttributes, AssetPrice } from '../../src'
import {
  Token,
  AccessCondition,
  EscrowPaymentCondition,
  LockPaymentCondition,
  AccessTemplate,
} from '../../src/keeper'
import { getMetadata } from '../utils'
import { generateId } from '../../src/utils'
import { EventLog } from 'ethers'

describe('Register Escrow Access Template', () => {
  let nevermined: Nevermined
  let keeper: Keeper

  let accessTemplate: AccessTemplate

  const url = 'https://example.com/did/nevermined/test-attr-example.txt'
  const checksum = generateId()
  const totalAmount = 12n
  const amounts = [10n, 2n]

  let templateManagerOwner: Account
  let publisher: Account
  let consumer: Account
  let provider: Account
  let receivers: string[]

  let accessCondition: AccessCondition
  let lockPaymentCondition: LockPaymentCondition
  let escrowPaymentCondition: EscrowPaymentCondition
  let token: Token

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;({ keeper } = nevermined)
    ;({ accessTemplate } = keeper.templates)
    ;({ token } = keeper)

    // Accounts
    ;[templateManagerOwner, publisher, consumer, provider] = await nevermined.accounts.list()

    receivers = [publisher.getId(), provider.getId()]

    // Conditions
    ;({ accessCondition, lockPaymentCondition, escrowPaymentCondition } = keeper.conditions)
  })

  describe('Propose and approve template', () => {
    it('should propose the template', async () => {
      await keeper.templateStoreManager.proposeTemplate(accessTemplate.address, consumer, true)
    })

    it('should approve the template', async () => {
      await keeper.templateStoreManager.approveTemplate(
        accessTemplate.address,
        templateManagerOwner,
        true,
      )
    })
  })

  describe('Full flow', () => {
    let agreementId: string
    let agreementIdSeed: string
    let didSeed: string
    let did: string

    let conditionIdAccess: [string, string]
    let conditionIdLock: [string, string]
    let conditionIdEscrow: [string, string]

    before(async () => {
      agreementIdSeed = generateId()
      agreementId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementIdSeed,
        publisher.getId(),
      )
      didSeed = generateId()
      did = await keeper.didRegistry.hashDID(didSeed, publisher.getId())
    })

    it('should register a DID', async () => {
      await keeper.didRegistry.registerAttribute(didSeed, checksum, [], url, publisher.getId())
    })

    it('should generate the condition IDs', async () => {
      conditionIdAccess = await accessCondition.generateIdWithSeed(
        agreementId,
        await accessCondition.hashValues(did, consumer.getId()),
      )
      conditionIdLock = await lockPaymentCondition.generateIdWithSeed(
        agreementId,
        await lockPaymentCondition.hashValues(
          did,
          escrowPaymentCondition.address,
          token.address,
          amounts,
          receivers,
        ),
      )
      conditionIdEscrow = await escrowPaymentCondition.generateIdWithSeed(
        agreementId,
        await escrowPaymentCondition.hashValues(
          did,
          amounts,
          receivers,
          consumer.getId(),
          escrowPaymentCondition.address,
          token.address,
          conditionIdLock[1],
          conditionIdAccess[1],
        ),
      )
    })

    it('should have conditions types', async () => {
      const conditionTypes = await accessTemplate.getConditionTypes()

      assert.equal(conditionTypes.length, 3, 'Expected 3 conditions.')
      assert.deepEqual(
        [...conditionTypes].sort(),
        [
          accessCondition.address,
          escrowPaymentCondition.address,
          lockPaymentCondition.address,
        ].sort(),
        "The conditions doesn't match",
      )
    })

    it('should have condition instances associated', async () => {
      const conditionInstances = await accessTemplate.getConditions()

      assert.equal(conditionInstances.length, 3, 'Expected 3 conditions.')

      const conditionClasses = [AccessCondition, EscrowPaymentCondition, LockPaymentCondition]
      conditionClasses.forEach((conditionClass) => {
        if (!conditionInstances.find((condition) => condition instanceof conditionClass)) {
          throw new Error(`${conditionClass.name} is not part of the conditions.`)
        }
      })
    })

    it('should create a new agreement', async () => {
      const agreement = await accessTemplate.createAgreement(
        agreementIdSeed,
        did,
        [conditionIdAccess[0], conditionIdLock[0], conditionIdEscrow[0]],
        [0, 0, 0],
        [0, 0, 0],
        [consumer.getId()],
        publisher,
      )

      assert.equal(agreement.status, 1)
    })

    it('should not grant the access to the consumer', async () => {
      const accessGranted = await accessCondition.checkPermissions(consumer.getId(), did)

      assert.isFalse(accessGranted, 'Consumer has been granted.')
    })

    it('should fulfill LockPaymentCondition', async () => {
      try {
        await consumer.requestTokens(totalAmount)
      } catch (error) {
        Logger.error(error)
      }

      await keeper.token.approve(lockPaymentCondition.address, totalAmount, consumer)

      const contractReceipt = await lockPaymentCondition.fulfill(
        agreementId,
        did,
        escrowPaymentCondition.address,
        token.address,
        amounts,
        receivers,
        consumer,
      )

      assert.isTrue(
        contractReceipt.logs.some((e: EventLog) => e.eventName === 'Fulfilled'),
        'Not Fulfilled event.',
      )
    })

    it('should fulfill AccessCondition', async () => {
      const contractReceipt = await accessCondition.fulfill(
        agreementId,
        did,
        consumer.getId(),
        publisher,
      )

      assert.isTrue(
        contractReceipt.logs.some((e: EventLog) => e.eventName === 'Fulfilled'),
        'Not Fulfilled event.',
      )
    })

    it('should fulfill EscrowPaymentCondition', async () => {
      const contractReceipt = await escrowPaymentCondition.fulfill(
        agreementId,
        did,
        amounts,
        receivers,
        consumer.getId(),
        escrowPaymentCondition.address,
        token.address,
        conditionIdLock[1],
        conditionIdAccess[1],
        consumer,
      )

      assert.isTrue(
        contractReceipt.logs.some((e: EventLog) => e.eventName === 'Fulfilled'),
        'Not Fulfilled event.',
      )
    })

    it('should grant the access to the consumer', async () => {
      const accessGranted = await accessCondition.checkPermissions(consumer.getId(), did)

      assert.isTrue(accessGranted, 'Consumer has not been granted.')
    })
  })

  describe('Short flow', () => {
    let agreementId: string
    let ddo: DDO

    before(async () => {
      const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

      await nevermined.services.marketplace.login(clientAssertion)

      const payload = decodeJwt(config.marketplaceAuthToken)
      const metadata = getMetadata()
      metadata.userId = payload.sub
      const assetPrice = new AssetPrice(
        new Map([
          [receivers[0], amounts[0]],
          [receivers[1], amounts[1]],
        ]),
      )

      ddo = await nevermined.assets.create(
        AssetAttributes.getInstance({
          metadata,
          services: [
            {
              serviceType: 'access',
              price: assetPrice,
            },
          ],
        }),
        publisher,
      )
    })

    it('should create a new agreement (short way)', async () => {
      agreementId = await accessTemplate.createAgreementFromDDO(
        generateId(),
        ddo,
        accessTemplate.params(consumer),
        consumer,
        consumer,
      )

      assert.match(agreementId, /^0x[a-f0-9]{64}$/i)
    })

    it('should not grant the access to the consumer', async () => {
      const accessGranted = await accessCondition.checkPermissions(consumer.getId(), ddo.shortId())

      assert.isFalse(accessGranted, 'Consumer has been granted.')
    })

    it('should fulfill the conditions from consumer side', async () => {
      try {
        await consumer.requestTokens(totalAmount)
      } catch (error) {
        Logger.error(error)
      }

      await nevermined.agreements.conditions.lockPayment(
        agreementId,
        ddo.shortId(),
        amounts,
        receivers,
        token.address,
        consumer,
      )
    })

    it('should fulfill the conditions from publisher side', async () => {
      await nevermined.agreements.conditions.grantAccess(
        agreementId,
        ddo.shortId(),
        consumer.getId(),
        publisher,
      )
      await nevermined.agreements.conditions.releaseReward(
        agreementId,
        amounts,
        receivers,
        consumer.getId(),
        ddo.shortId(),
        token.address,
        publisher,
      )
    })

    it('should grant the access to the consumer', async () => {
      const accessGranted = await accessCondition.checkPermissions(consumer.getId(), ddo.shortId())

      assert.isTrue(accessGranted, 'Consumer has not been granted.')
    })
  })
})
