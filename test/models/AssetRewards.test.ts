import { assert } from 'chai'
import AssetRewards from '../../src/models/AssetRewards'

describe('AssetRewards', () => {

    describe('Initialize asset rewards', () => {
        it('it initialize with an empty constructor', async () => {
            const assetRewards = new AssetRewards()

            assert.equal(0, assetRewards.getTotalPrice(), `Expected 0 got ${assetRewards.getTotalPrice()}`)
            assert.equal(0, assetRewards.getRewards().size, `Expected 0 size, got ${assetRewards.getRewards().size}`)
            assert.equal("[]", assetRewards.getAmountsString())
            assert.equal("[]", assetRewards.getReceiversString())
        })

        it('it initialize with an address and amount', async () => {
            const assetRewards = new AssetRewards("0x123", 7)

            assert.equal(7, assetRewards.getTotalPrice(), `Expected 7 got ${assetRewards.getTotalPrice()}`)
            assert.equal(1, assetRewards.getRewards().size, `Expected 1 size, got ${assetRewards.getRewards().size}`)
            assert.equal(7, assetRewards.getRewards().get("0x123"), `Expected 7 for address 0x123`)
            assert.equal("[\"7\"]", assetRewards.getAmountsString())
            assert.equal("[\"0x123\"]", assetRewards.getReceiversString())
        })

        it('it initialize with a map', async () => {
            const rewardsMap = new Map([
                ["0x123", 10],
                ["0x456", 2],
            ])
            const assetRewards = new AssetRewards(rewardsMap)

            assert.equal(12, assetRewards.getTotalPrice(), `Expected 12 got ${assetRewards.getTotalPrice()}`)
            assert.equal(2, assetRewards.getRewards().size, `Expected 2 size, got ${assetRewards.getRewards().size}`)
            assert.equal(10, assetRewards.getRewards().get("0x123"), `Expected 10 for address 0x123`)
            assert.equal(2, assetRewards.getRewards().get("0x456"), `Expected 2 for address 0x456`)
            assert.equal("[\"10\",\"2\"]", assetRewards.getAmountsString())
            assert.equal("[\"0x123\",\"0x456\"]", assetRewards.getReceiversString())
        })
    })

})
