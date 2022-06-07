import { assert } from 'chai'
import {
    EscrowPaymentCondition,
    LockPaymentCondition
} from '../../../src/keeper/contracts/conditions'
import Token from '../../../src/keeper/contracts/Token'
import AssetRewards from '../../../src/models/AssetRewards'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import { Account } from '../../../src'
import { ConditionStoreManager } from '../../../src/keeper/contracts/managers'
import { generateId, ZeroAddress } from '../../../src/utils'
import BigNumber from 'bignumber.js'

let conditionStoreManager: ConditionStoreManager
let lockPaymentCondition: LockPaymentCondition
let escrowPaymentCondition: EscrowPaymentCondition
let assetRewards: AssetRewards
let token: Token

let owner: Account
let buyer: Account
let seller: Account

describe('LockPaymentCondition', () => {
    const amount = new BigNumber(15)
    let agreementId
    let did

    beforeEach(() => {
        agreementId = generateId(64)
        did = `did:nv:${generateId()}`
    })

    before(async () => {
        await TestContractHandler.prepareContracts()

        const nevermined = await Nevermined.getInstance(config)
        ;({ conditionStoreManager } = nevermined.keeper)
        ;({ lockPaymentCondition, escrowPaymentCondition } = nevermined.keeper.conditions)
        ;({ token } = nevermined.keeper)
        ;[owner, seller, buyer] = await nevermined.accounts.list()
        assetRewards = new AssetRewards(seller.getId(), amount)
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const hash = await lockPaymentCondition.hashValues(
                did,
                seller.getId(),
                token.getAddress(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('#generateId()', () => {
        it('should generate an ID', async () => {
            const hash = await lockPaymentCondition.hashValues(
                did,
                seller.getId(),
                token.getAddress(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
            const conditionId = await lockPaymentCondition.generateId(agreementId, hash)

            assert.match(conditionId, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('#fulfill()', () => {
        it('should fulfill with token', async () => {
            const hash = await lockPaymentCondition.hashValues(
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
            const conditionId = await lockPaymentCondition.generateId(agreementId, hash)

            await conditionStoreManager.createCondition(
                conditionId,
                lockPaymentCondition.getAddress(),
                owner
            )

            await buyer.requestTokens(assetRewards.getTotalPrice())

            await token.approve(
                lockPaymentCondition.getAddress(),
                assetRewards.getTotalPrice(),
                buyer
            )

            await lockPaymentCondition.fulfill(
                agreementId,
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers(),
                buyer
            )

            assert.match(conditionId, /^0x[a-f0-9]{64}$/i)
        })

        it('should fulfill with ether', async () => {
            const hash = await lockPaymentCondition.hashValues(
                did,
                escrowPaymentCondition.getAddress(),
                ZeroAddress,
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
            const conditionId = await lockPaymentCondition.generateId(agreementId, hash)

            await conditionStoreManager.createCondition(
                conditionId,
                lockPaymentCondition.getAddress(),
                owner
            )

            await lockPaymentCondition.fulfill(
                agreementId,
                did,
                escrowPaymentCondition.getAddress(),
                ZeroAddress,
                assetRewards.getAmounts(),
                assetRewards.getReceivers(),
                buyer,
                { value: String(assetRewards.getTotalPrice()) }
            )

            assert.match(conditionId, /^0x[a-f0-9]{64}$/i)
        })

        it('should fail to fulfill without ether', async () => {
            const hash = await lockPaymentCondition.hashValues(
                did,
                escrowPaymentCondition.getAddress(),
                ZeroAddress,
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
            const conditionId = await lockPaymentCondition.generateId(agreementId, hash)

            await conditionStoreManager.createCondition(
                conditionId,
                lockPaymentCondition.getAddress(),
                owner
            )

            await assert.isRejected(
                lockPaymentCondition.fulfill(
                    agreementId,
                    did,
                    escrowPaymentCondition.getAddress(),
                    ZeroAddress,
                    assetRewards.getAmounts(),
                    assetRewards.getReceivers(),
                    buyer
                ),
                /Transaction value does not match amount/
            )
        })

        it('should fail to fulfill with too few ether', async () => {
            const hash = await lockPaymentCondition.hashValues(
                did,
                escrowPaymentCondition.getAddress(),
                ZeroAddress,
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
            const conditionId = await lockPaymentCondition.generateId(agreementId, hash)

            await conditionStoreManager.createCondition(
                conditionId,
                lockPaymentCondition.getAddress(),
                owner
            )

            await assert.isRejected(
                lockPaymentCondition.fulfill(
                    agreementId,
                    did,
                    escrowPaymentCondition.getAddress(),
                    ZeroAddress,
                    assetRewards.getAmounts(),
                    assetRewards.getReceivers(),
                    buyer,
                    { value: String(assetRewards.getTotalPrice().minus(1)) }
                ),
                /Transaction value does not match amount/
            )
        })
    })
})
