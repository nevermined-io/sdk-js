import { assert } from 'chai'
import { AssetPrice } from '../../src'

describe('AssetPrice', () => {
  describe('Initialize asset rewards', () => {
    it('it initialize with an empty constructor', () => {
      const assetPrice = new AssetPrice()

      assert.equal(0n, assetPrice.getTotalPrice(), `Expected 0 got ${assetPrice.getTotalPrice()}`)
      assert.equal(
        0,
        assetPrice.getRewards().size,
        `Expected 0 size, got ${assetPrice.getRewards().size}`,
      )
      assert.equal('[]', assetPrice.getAmountsString())
      assert.equal('[]', assetPrice.getReceiversString())
    })

    it('it initialize with an address and amount', () => {
      const assetPrice = new AssetPrice('0x123', 7n)

      assert.equal(7n, assetPrice.getTotalPrice(), `Expected 7 got ${assetPrice.getTotalPrice()}`)
      assert.equal(
        1,
        assetPrice.getRewards().size,
        `Expected 1 size, got ${assetPrice.getRewards().size}`,
      )
      assert.equal(7n, assetPrice.getRewards().get('0x123'), `Expected 7 for address 0x123`)
      assert.equal('["7"]', assetPrice.getAmountsString())
      assert.equal('["0x123"]', assetPrice.getReceiversString())
    })

    it('it initialize with a map', () => {
      const rewardsMap = new Map([
        ['0x123', 10n],
        ['0x456', 2n],
      ])

      const assetPrice = new AssetPrice(rewardsMap)

      assert.equal(12n, assetPrice.getTotalPrice(), `Expected 12 got ${assetPrice.getTotalPrice()}`)
      assert.equal(
        2,
        assetPrice.getRewards().size,
        `Expected 2 size, got ${assetPrice.getRewards().size}`,
      )
      assert.equal(10n, assetPrice.getRewards().get('0x123'), `Expected 10 for address 0x123`)
      assert.equal(2n, assetPrice.getRewards().get('0x456'), `Expected 2 for address 0x456`)
      assert.equal('["10","2"]', assetPrice.getAmountsString())
      assert.equal('["0x123","0x456"]', assetPrice.getReceiversString())
    })
  })

  it('it uses a big number', () => {
    const rewardsMap = new Map([['0x123', 1000000000000000n]])

    const assetPrice = new AssetPrice(rewardsMap)

    assert.equal(
      1000000000000000n,
      assetPrice.getTotalPrice(),
      `Expected 1000000000000000 got ${assetPrice.getTotalPrice()}`,
    )
    assert.equal(
      1,
      assetPrice.getRewards().size,
      `Expected 1 size, got ${assetPrice.getRewards().size}`,
    )
    assert.equal(
      1000000000000000n,
      assetPrice.getRewards().get('0x123'),
      `Expected 1000000000000000 for address 0x123`,
    )
    assert.equal('["1000000000000000"]', assetPrice.getAmountsString())
    assert.equal('["0x123"]', assetPrice.getReceiversString())
  })

  it('it can add a receiver', () => {
    const rewardsMap = new Map([['0x123', 500n]])

    const assetPrice = new AssetPrice(rewardsMap)
    assetPrice.setReceiver('0x456', 100n)

    assert.equal(600n, assetPrice.getTotalPrice(), `Expected 600 got ${assetPrice.getTotalPrice()}`)
    assert.equal(
      2,
      assetPrice.getRewards().size,
      `Expected 2 size, got ${assetPrice.getRewards().size}`,
    )
    assert.equal(500n, assetPrice.getRewards().get('0x123'), `Expected 500 for address 0x123`)
    assert.equal(100n, assetPrice.getRewards().get('0x456'), `Expected 100 for address 0x456`)
    assert.equal('["500","100"]', assetPrice.getAmountsString())
    assert.equal('["0x123","0x456"]', assetPrice.getReceiversString())
  })

  it('it can add rewards to an existing receiver', () => {
    const rewardsMap = new Map([
      ['0x123', 500n],
      ['0x789', 500n],
    ])

    const firstRewards = new AssetPrice(rewardsMap)
    const assetPrice = firstRewards.setReceiver('0x123', 100n)

    assert.equal(600n, assetPrice.getTotalPrice(), `Expected 600 got ${assetPrice.getTotalPrice()}`)
    assert.equal(
      2,
      assetPrice.getRewards().size,
      `Expected 2 size, got ${assetPrice.getRewards().size}`,
    )
    assert.equal(100n, assetPrice.getRewards().get('0x123'), `Expected 600 for address 0x123`)
    assert.equal('["100","500"]', assetPrice.getAmountsString())
    assert.equal('["0x123","0x789"]', assetPrice.getReceiversString())
  })

  it('it can add network fees', () => {
    const rewardsMap = new Map([
      ['0x123', 50n],
      ['0x789', 50n],
    ])

    const assetPrice = new AssetPrice(rewardsMap).addNetworkFees('0xfff', 20000n)

    assert.equal(102n, assetPrice.getTotalPrice(), `Expected 102 got ${assetPrice.getTotalPrice()}`)
    assert.equal(
      3,
      assetPrice.getRewards().size,
      `Expected 3 size, got ${assetPrice.getRewards().size}`,
    )
    assert.equal(2n, assetPrice.getRewards().get('0xfff'), `Expected 2 for address 0xfff`)
    assert.equal('["50","50","2"]', assetPrice.getAmountsString())
    assert.equal('["0x123","0x789","0xfff"]', assetPrice.getReceiversString())
  })

  it('it includes fees', () => {
    const rewardsMap = new Map([
      ['0x123', 70n],
      ['0x789', 30n],
    ])

    const assetPrice = new AssetPrice(rewardsMap).adjustToIncludeNetworkFees('0xfff', 100000n)

    assert.equal(100n, assetPrice.getTotalPrice(), `Expected 100 got ${assetPrice.getTotalPrice()}`)
    assert.equal(
      3,
      assetPrice.getRewards().size,
      `Expected 3 size, got ${assetPrice.getRewards().size}`,
    )
    assert.equal(10n, assetPrice.getRewards().get('0xfff'), `Expected 10 for address 0xfff`)
    assert.equal('["63","27","10"]', assetPrice.getAmountsString())
    assert.equal('["0x123","0x789","0xfff"]', assetPrice.getReceiversString())
  })
})
