import { assert } from 'chai'
import { NvmAccount, Nevermined } from '../../src'
import { CustomToken } from '../../src/keeper'
import { config } from '../config'

describe('CustomToken', () => {
  let account: NvmAccount
  let nevermined: Nevermined
  let erc20TokenAddress: string
  let customErc20Token: CustomToken

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[account] = await nevermined.accounts.list()
    erc20TokenAddress = process.env.TOKEN_ADDRESS || nevermined.utils.token.getAddress()
  })

  it('should get a custom token instance', async () => {
    customErc20Token = await nevermined.contracts.loadErc20(erc20TokenAddress)
    assert.isDefined(customErc20Token)
  })

  it('should get the token symbol', async () => {
    const tokenSymbol = await customErc20Token.symbol()
    assert.equal(tokenSymbol, await nevermined.keeper.token.symbol())
  })

  it('should get the token name', async () => {
    const tokenName = await customErc20Token.name()
    assert.equal(tokenName, await nevermined.keeper.token.name())
  })

  it('should get the token decimals', async () => {
    const tokenDecimals = await customErc20Token.decimals()
    assert.equal(tokenDecimals, await nevermined.keeper.token.decimals())
  })

  it('should get the token balance of an account', async () => {
    const tokenBalance = await customErc20Token.balanceOf(account.getId())
    assert.deepEqual(tokenBalance, await nevermined.keeper.token.balanceOf(account.getId()))
  })
})
