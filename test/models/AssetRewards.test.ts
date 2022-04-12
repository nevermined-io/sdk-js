import BigNumber from 'bignumber.js'
import { assert } from 'chai'
import AssetRewards from '../../src/models/AssetRewards'

describe('AssetRewards', () => {
    describe('Initialize asset rewards', () => {
        it('it initialize with an empty constructor', async () => {
            const assetRewards = new AssetRewards()

            assert.equal(
                0,
                assetRewards.getTotalPrice().toNumber(),
                `Expected 0 got ${assetRewards.getTotalPrice()}`
            )
            assert.equal(
                0,
                assetRewards.getRewards().size,
                `Expected 0 size, got ${assetRewards.getRewards().size}`
            )
            assert.equal('[]', assetRewards.getAmountsString())
            assert.equal('[]', assetRewards.getReceiversString())
        })

        it('it initialize with an address and amount', async () => {
            const assetRewards = new AssetRewards('0x123', new BigNumber(7))

            assert.equal(
                7,
                assetRewards.getTotalPrice().toNumber(),
                `Expected 7 got ${assetRewards.getTotalPrice()}`
            )
            assert.equal(
                1,
                assetRewards.getRewards().size,
                `Expected 1 size, got ${assetRewards.getRewards().size}`
            )
            assert.equal(
                7,
                assetRewards
                    .getRewards()
                    .get('0x123')
                    .toNumber(),
                `Expected 7 for address 0x123`
            )
            assert.equal('["7"]', assetRewards.getAmountsString())
            assert.equal('["0x123"]', assetRewards.getReceiversString())
        })

        it('it initialize with a map', async () => {
            const rewardsMap = new Map([
                ['0x123', new BigNumber(10)],
                ['0x456', new BigNumber(2)]
            ])

            const assetRewards = new AssetRewards(rewardsMap)

            assert.equal(
                12,
                assetRewards.getTotalPrice().toNumber(),
                `Expected 12 got ${assetRewards.getTotalPrice()}`
            )
            assert.equal(
                2,
                assetRewards.getRewards().size,
                `Expected 2 size, got ${assetRewards.getRewards().size}`
            )
            assert.equal(
                10,
                assetRewards
                    .getRewards()
                    .get('0x123')
                    .toNumber(),
                `Expected 10 for address 0x123`
            )
            assert.equal(
                2,
                assetRewards
                    .getRewards()
                    .get('0x456')
                    .toNumber(),
                `Expected 2 for address 0x456`
            )
            assert.equal('["10","2"]', assetRewards.getAmountsString())
            assert.equal('["0x123","0x456"]', assetRewards.getReceiversString())
        })
    })

    it('it uses a big number', async () => {
        const rewardsMap = new Map([
            ['0x123', new BigNumber(10000000000000000000000)]
        ])

        const assetRewards = new AssetRewards(rewardsMap)

        assert.equal(
            10000000000000000000000,
            assetRewards.getTotalPrice().toNumber(),
            `Expected 10000000000000000000000 got ${assetRewards.getTotalPrice()}`
        )
        assert.equal(
            1,
            assetRewards.getRewards().size,
            `Expected 1 size, got ${assetRewards.getRewards().size}`
        )
        assert.equal(
            10000000000000000000000,
            assetRewards
                .getRewards()
                .get('0x123')
                .toNumber(),
            `Expected 10000000000000000000000 for address 0x123`
        )
        assert.equal('["10000000000000000000000"]', assetRewards.getAmountsString())
        assert.equal('["0x123"]', assetRewards.getReceiversString())
    })
})
