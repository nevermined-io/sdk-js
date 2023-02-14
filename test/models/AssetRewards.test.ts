import { assert } from 'chai'
import { AssetPrice } from '../../src'
import { BigNumber } from '../../src/utils'

describe('AssetPrice', () => {
  describe('Initialize asset rewards', () => {
    it('it initialize with an empty constructor', async () => {
      const assetPrice = new AssetPrice()

      assert.equal(
        0,
        assetPrice.getTotalPrice().toNumber(),
        `Expected 0 got ${assetPrice.getTotalPrice()}`,
      )
      assert.equal(
        0,
        assetPrice.getRewards().size,
        `Expected 0 size, got ${assetPrice.getRewards().size}`,
      )
      assert.equal('[]', assetPrice.getAmountsString())
      assert.equal('[]', assetPrice.getReceiversString())
    })

    it('it initialize with an address and amount', async () => {
      const assetPrice = new AssetPrice('0x123', BigNumber.from(7))

      assert.equal(
        7,
        assetPrice.getTotalPrice().toNumber(),
        `Expected 7 got ${assetPrice.getTotalPrice()}`,
      )
      assert.equal(
        1,
        assetPrice.getRewards().size,
        `Expected 1 size, got ${assetPrice.getRewards().size}`,
      )
      assert.equal(
        7,
        assetPrice.getRewards().get('0x123').toNumber(),
        `Expected 7 for address 0x123`,
      )
      assert.equal('["7"]', assetPrice.getAmountsString())
      assert.equal('["0x123"]', assetPrice.getReceiversString())
    })

    it('it initialize with a map', async () => {
      const rewardsMap = new Map([
        ['0x123', BigNumber.from(10)],
        ['0x456', BigNumber.from(2)],
      ])

      const assetPrice = new AssetPrice(rewardsMap)

      assert.equal(
        12,
        assetPrice.getTotalPrice().toNumber(),
        `Expected 12 got ${assetPrice.getTotalPrice()}`,
      )
      assert.equal(
        2,
        assetPrice.getRewards().size,
        `Expected 2 size, got ${assetPrice.getRewards().size}`,
      )
      assert.equal(
        10,
        assetPrice.getRewards().get('0x123').toNumber(),
        `Expected 10 for address 0x123`,
      )
      assert.equal(
        2,
        assetPrice.getRewards().get('0x456').toNumber(),
        `Expected 2 for address 0x456`,
      )
      assert.equal('["10","2"]', assetPrice.getAmountsString())
      assert.equal('["0x123","0x456"]', assetPrice.getReceiversString())
    })
  })

  it('it uses a big number', async () => {
    const rewardsMap = new Map([['0x123', BigNumber.from(1000000000000000)]])

    const assetPrice = new AssetPrice(rewardsMap)

    assert.equal(
      1000000000000000,
      assetPrice.getTotalPrice().toNumber(),
      `Expected 1000000000000000 got ${assetPrice.getTotalPrice()}`,
    )
    assert.equal(
      1,
      assetPrice.getRewards().size,
      `Expected 1 size, got ${assetPrice.getRewards().size}`,
    )
    assert.equal(
      1000000000000000,
      assetPrice.getRewards().get('0x123').toNumber(),
      `Expected 1000000000000000 for address 0x123`,
    )
    assert.equal('["1000000000000000"]', assetPrice.getAmountsString())
    assert.equal('["0x123"]', assetPrice.getReceiversString())
  })

  it('it can add a receiver', async () => {
    const rewardsMap = new Map([['0x123', BigNumber.from(500)]])

    const assetPrice = new AssetPrice(rewardsMap)
    assetPrice.setReceiver('0x456', BigNumber.from(100))

    assert.equal(
      600,
      assetPrice.getTotalPrice().toNumber(),
      `Expected 600 got ${assetPrice.getTotalPrice()}`,
    )
    assert.equal(
      2,
      assetPrice.getRewards().size,
      `Expected 2 size, got ${assetPrice.getRewards().size}`,
    )
    assert.equal(
      500,
      assetPrice.getRewards().get('0x123').toNumber(),
      `Expected 500 for address 0x123`,
    )
    assert.equal(
      100,
      assetPrice.getRewards().get('0x456').toNumber(),
      `Expected 100 for address 0x456`,
    )
    assert.equal('["500","100"]', assetPrice.getAmountsString())
    assert.equal('["0x123","0x456"]', assetPrice.getReceiversString())
  })

  it('it can add rewards to an existing receiver', async () => {
    const rewardsMap = new Map([
      ['0x123', BigNumber.from(500)],
      ['0x789', BigNumber.from(500)],
    ])

    const firstRewards = new AssetPrice(rewardsMap)
    const assetPrice = firstRewards.setReceiver('0x123', BigNumber.from(100))

    assert.equal(
      600,
      assetPrice.getTotalPrice().toNumber(),
      `Expected 600 got ${assetPrice.getTotalPrice()}`,
    )
    assert.equal(
      2,
      assetPrice.getRewards().size,
      `Expected 2 size, got ${assetPrice.getRewards().size}`,
    )
    assert.equal(
      100,
      assetPrice.getRewards().get('0x123').toNumber(),
      `Expected 600 for address 0x123`,
    )
    assert.equal('["100","500"]', assetPrice.getAmountsString())
    assert.equal('["0x123","0x789"]', assetPrice.getReceiversString())
  })

  it('it can add network fees', async () => {
    const rewardsMap = new Map([
      ['0x123', BigNumber.from(50)],
      ['0x789', BigNumber.from(50)],
    ])

    const assetPrice = new AssetPrice(rewardsMap).addNetworkFees('0xfff', BigNumber.from(20000))

    assert.equal(
      102,
      assetPrice.getTotalPrice().toNumber(),
      `Expected 102 got ${assetPrice.getTotalPrice()}`,
    )
    assert.equal(
      3,
      assetPrice.getRewards().size,
      `Expected 3 size, got ${assetPrice.getRewards().size}`,
    )
    assert.equal(2, assetPrice.getRewards().get('0xfff').toNumber(), `Expected 2 for address 0xfff`)
    assert.equal('["50","50","2"]', assetPrice.getAmountsString())
    assert.equal('["0x123","0x789","0xfff"]', assetPrice.getReceiversString())
  })

  it('it includes fees', async () => {
    const rewardsMap = new Map([
      ['0x123', BigNumber.from(70)],
      ['0x789', BigNumber.from(30)],
    ])

    const assetPrice = new AssetPrice(rewardsMap).adjustToIncludeNetworkFees(
      '0xfff',
      BigNumber.from(100000),
    )

    assert.equal(
      100,
      assetPrice.getTotalPrice().toNumber(),
      `Expected 100 got ${assetPrice.getTotalPrice()}`,
    )
    assert.equal(
      3,
      assetPrice.getRewards().size,
      `Expected 3 size, got ${assetPrice.getRewards().size}`,
    )
    assert.equal(
      10,
      assetPrice.getRewards().get('0xfff').toNumber(),
      `Expected 10 for address 0xfff`,
    )
    assert.equal('["63","27","10"]', assetPrice.getAmountsString())
    assert.equal('["0x123","0x789","0xfff"]', assetPrice.getReceiversString())
  })
})
