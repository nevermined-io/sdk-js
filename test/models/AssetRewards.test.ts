import { assert } from 'chai'
import AssetPrice from '../../src/models/AssetPrice'
import BigNumber from '../../src/utils/BigNumber'

describe('AssetPrice', () => {
    describe('Initialize asset rewards', () => {
        it('it initialize with an empty constructor', async () => {
            const assetRewards = new AssetPrice()

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
            const assetRewards = new AssetPrice('0x123', BigNumber.from(7))

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
                assetRewards.getRewards().get('0x123').toNumber(),
                `Expected 7 for address 0x123`
            )
            assert.equal('["7"]', assetRewards.getAmountsString())
            assert.equal('["0x123"]', assetRewards.getReceiversString())
        })

        it('it initialize with a map', async () => {
            const rewardsMap = new Map([
                ['0x123', BigNumber.from(10)],
                ['0x456', BigNumber.from(2)]
            ])

            const assetRewards = new AssetPrice(rewardsMap)

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
                assetRewards.getRewards().get('0x123').toNumber(),
                `Expected 10 for address 0x123`
            )
            assert.equal(
                2,
                assetRewards.getRewards().get('0x456').toNumber(),
                `Expected 2 for address 0x456`
            )
            assert.equal('["10","2"]', assetRewards.getAmountsString())
            assert.equal('["0x123","0x456"]', assetRewards.getReceiversString())
        })
    })

    it('it uses a big number', async () => {
        const rewardsMap = new Map([['0x123', BigNumber.from(1000000000000000)]])

        const assetRewards = new AssetPrice(rewardsMap)

        assert.equal(
            1000000000000000,
            assetRewards.getTotalPrice().toNumber(),
            `Expected 1000000000000000 got ${assetRewards.getTotalPrice()}`
        )
        assert.equal(
            1,
            assetRewards.getRewards().size,
            `Expected 1 size, got ${assetRewards.getRewards().size}`
        )
        assert.equal(
            1000000000000000,
            assetRewards.getRewards().get('0x123').toNumber(),
            `Expected 1000000000000000 for address 0x123`
        )
        assert.equal('["1000000000000000"]', assetRewards.getAmountsString())
        assert.equal('["0x123"]', assetRewards.getReceiversString())
    })

    it('it can add a receiver', async () => {
        const rewardsMap = new Map([['0x123', BigNumber.from(500)]])

        const assetRewards = new AssetPrice(rewardsMap)
        assetRewards.setReceiver('0x456', BigNumber.from(100))

        assert.equal(
            600,
            assetRewards.getTotalPrice().toNumber(),
            `Expected 600 got ${assetRewards.getTotalPrice()}`
        )
        assert.equal(
            2,
            assetRewards.getRewards().size,
            `Expected 2 size, got ${assetRewards.getRewards().size}`
        )
        assert.equal(
            500,
            assetRewards.getRewards().get('0x123').toNumber(),
            `Expected 500 for address 0x123`
        )
        assert.equal(
            100,
            assetRewards.getRewards().get('0x456').toNumber(),
            `Expected 100 for address 0x456`
        )
        assert.equal('["500","100"]', assetRewards.getAmountsString())
        assert.equal('["0x123","0x456"]', assetRewards.getReceiversString())
    })

    it('it can add rewards to an existing receiver', async () => {
        const rewardsMap = new Map([
            ['0x123', BigNumber.from(500)],
            ['0x789', BigNumber.from(500)]
        ])

        const firstRewards = new AssetPrice(rewardsMap)
        const assetRewards = firstRewards.setReceiver('0x123', BigNumber.from(100))

        assert.equal(
            600,
            assetRewards.getTotalPrice().toNumber(),
            `Expected 600 got ${assetRewards.getTotalPrice()}`
        )
        assert.equal(
            2,
            assetRewards.getRewards().size,
            `Expected 2 size, got ${assetRewards.getRewards().size}`
        )
        assert.equal(
            100,
            assetRewards.getRewards().get('0x123').toNumber(),
            `Expected 600 for address 0x123`
        )
        assert.equal('["100","500"]', assetRewards.getAmountsString())
        assert.equal('["0x123","0x789"]', assetRewards.getReceiversString())
    })

    it('it can add network fees', async () => {
        const rewardsMap = new Map([
            ['0x123', BigNumber.from(50)],
            ['0x789', BigNumber.from(50)]
        ])

        const assetRewards = new AssetPrice(rewardsMap).addNetworkFees(
            '0xfff',
            BigNumber.from(20000)
        )

        assert.equal(
            102,
            assetRewards.getTotalPrice().toNumber(),
            `Expected 102 got ${assetRewards.getTotalPrice()}`
        )
        assert.equal(
            3,
            assetRewards.getRewards().size,
            `Expected 3 size, got ${assetRewards.getRewards().size}`
        )
        assert.equal(
            2,
            assetRewards.getRewards().get('0xfff').toNumber(),
            `Expected 2 for address 0xfff`
        )
        assert.equal('["50","50","2"]', assetRewards.getAmountsString())
        assert.equal('["0x123","0x789","0xfff"]', assetRewards.getReceiversString())
    })

    it('it includes fees', async () => {
        const rewardsMap = new Map([
            ['0x123', BigNumber.from(70)],
            ['0x789', BigNumber.from(30)]
        ])

        const assetRewards = new AssetPrice(rewardsMap).adjustToIncludeNetworkFees(
            '0xfff',
            BigNumber.from(100000)
        )

        assert.equal(
            100,
            assetRewards.getTotalPrice().toNumber(),
            `Expected 100 got ${assetRewards.getTotalPrice()}`
        )
        assert.equal(
            3,
            assetRewards.getRewards().size,
            `Expected 3 size, got ${assetRewards.getRewards().size}`
        )
        assert.equal(
            10,
            assetRewards.getRewards().get('0xfff').toNumber(),
            `Expected 10 for address 0xfff`
        )
        assert.equal('["63","27","10"]', assetRewards.getAmountsString())
        assert.equal('["0x123","0x789","0xfff"]', assetRewards.getReceiversString())
    })
})
