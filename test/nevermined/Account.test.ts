import BigNumber from 'bignumber.js'
import { assert } from 'chai'
import Web3Provider from '../../src/keeper/Web3Provider'
import Account from '../../src/nevermined/Account'
import { Nevermined } from '../../src/nevermined/Nevermined'
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
            const web3 = Web3Provider.getWeb3()
            const amount = new BigNumber(100)
            const account: Account = accounts[0]
            const initialBalance = await account.getNeverminedBalance()
            await account.requestTokens(amount)
            const balance = await account.getNeverminedBalance()

            const balancePlusAmount = new BigNumber(web3.utils.toWei('100', 'ether'))
            console.log(`Initial Balance :    ${initialBalance.toString()}`)
            console.log(`Balance         :    ${balance.toString()}`)
            console.log(`Balance + Amount:    ${balancePlusAmount.toString()}`)
            assert.isTrue(balance.comparedTo(initialBalance.plus(balancePlusAmount)) >= 0)
        })
    })

    describe('#getEthBalance()', () => {
        it('should get initial ether balance', async () => {
            const account: Account = accounts[9]
            const balanceEth = await account.getEtherBalance()
            const web3 = Web3Provider.getWeb3()

            console.log(`Balance ${balanceEth}`)
            assert.isTrue(
                balanceEth.isEqualTo(new BigNumber(web3.utils.toWei('1000', 'ether')))
            )
        })
    })

    describe('#getBalance()', () => {
        it('should get initial balance', async () => {
            const account: Account = accounts[9]
            const balance = await account.getBalance()
            const web3 = Web3Provider.getWeb3()

            assert.isTrue(
                balance.eth.isEqualTo(new BigNumber(web3.utils.toWei('1000', 'ether')))
            )
            assert.isTrue(balance.nevermined.comparedTo(new BigNumber(0)) === 0)
        })
    })

    describe('#requestTokens()', () => {
        it('should return the amount of tokens granted', async () => {
            const tokens = '5'
            const account: Account = accounts[7]
            const tokensGranted: string = await account.requestTokens(tokens)

            assert.equal(tokensGranted, tokens)
        })
    })
})
