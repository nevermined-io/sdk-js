import { assert } from 'chai'
import { AaveRepayCondition } from '../../../src/keeper/contracts/conditions/'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import {zeroX} from "../../../src/utils";
import BigNumber from "bignumber.js"
import Account from "../../../src/nevermined/Account"
import * as utils from "../../../src/utils"
import DIDRegistry from "../../../src/keeper/contracts/DIDRegistry"

let condition: AaveRepayCondition

describe('AaveRepayCondition', () => {
    let did: string
    let agreementId: string
    const vaultAddress = `0x${'a'.repeat(40)}`
    const assetToRepay = `0x${'a'.repeat(40)}`
    const amountToRepay = new BigNumber('11000000000000000000')
    const interestRateMode = 1
    let user: Account
    let nevermined: Nevermined
    let didRegistry: DIDRegistry

    before(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        ;[user, ] = await nevermined.accounts.list()
        ;({ didRegistry } = nevermined.keeper)
        condition = (await Nevermined.getInstance(config)).keeper.conditions
            .aaveRepayCondition
    })

    beforeEach(async () => {
        agreementId = utils.generateId()
        const didSeed = `did:nv:${utils.generateId()}`
        did = await didRegistry.hashDID(didSeed, user.getId())
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const hash = await condition.hashValues(
                zeroX(did),
                vaultAddress,
                assetToRepay,
                amountToRepay,
                interestRateMode
            )
            assert.match(hash, /^0x[a-f0-9]{64}$/i)

            const id = await condition.generateId(agreementId, hash)
            assert.match(id, /^0x[a-f0-9]{64}$/i)

            // const txReceipt: TransactionReceipt = await condition.fulfill(
            //     agreementId,
            //     did,
            //     vaultAddress,
            //     assetToRepay,
            //     amountToRepay,
            //     interestRateMode
            //     user
            // )

        })
    })

})
