import { assert } from 'chai'
import { ethers } from 'ethers'
import Account from '../../src/nevermined/Account'
import { Nevermined } from '../../src/nevermined/Nevermined'
import BigNumber from '../../src/utils/BigNumber'
import config from '../config'
import TestContractHandler from '../keeper/TestContractHandler'

let nevermined: Nevermined
let accounts: Account[]

describe('Account', () => {
    before(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        accounts = await nevermined.accounts.list()
    })

    describe('#getNeverminedBalance()', () => {
        it('should get initial nevermined balance', async () => {
            const balance = await accounts[8].getNeverminedBalance()

            assert.equal(0, balance.toNumber(), `Expected 0 got ${balance}`)
        })

        it('should get the correct balance', async () => {
            const amount = BigNumber.from(100)
            const [account] = accounts
            const initialBalance = await account.getNeverminedBalance()
            await account.requestTokens(amount)
            const balance = await account.getNeverminedBalance()

            const balancePlusAmount = BigNumber.from(
                BigNumber.parseUnits('100', 'ether').toString()
            )
            console.log(`Initial Balance :    ${initialBalance.toString()}`)
            console.log(`Balance         :    ${balance.toString()}`)
            console.log(`Balance + Amount:    ${balancePlusAmount.toString()}`)
            assert.isTrue(balance.gte(initialBalance.add(balancePlusAmount)))
        })
    })

    describe('#getEthBalance()', () => {
        it('should get initial ether balance', async () => {
            // eslint-disable-next-line prefer-destructuring
            const account: Account = accounts[9]
            const balanceEth = await account.getEtherBalance()

            console.log(
                `Balance ${balanceEth} should be ${BigNumber.from(
                    BigNumber.parseUnits('1000', 'ether').toString()
                )}`
            )
            assert.isTrue(balanceEth.eq(BigNumber.parseUnits('1000', 'ether').toString()))
        })
    })

    describe('#getBalance()', () => {
        it('should get initial balance', async () => {
            // eslint-disable-next-line prefer-destructuring
            const account: Account = accounts[9]
            const balance = await account.getBalance()

            assert.isTrue(balance.eth.eq(BigNumber.parseUnits('1000', 'ether')))
            assert.isTrue(balance.nevermined.isZero())
        })
    })

    describe('#requestTokens()', () => {
        it('should return the amount of tokens granted', async () => {
            const tokens = '5'
            // eslint-disable-next-line prefer-destructuring
            const account: Account = accounts[7]
            const tokensGranted: string = await account.requestTokens(tokens)

            assert.equal(tokensGranted, tokens)
        })
    })
})
