import BigNumber from '../utils/BigNumber'

export default class AssetRewards {
    public static readonly NETWORK_FEE_DENOMINATOR = BigNumber.from(10000)

    private totalPrice: BigNumber

    private rewards: Map<string, BigNumber>

    public constructor()

    public constructor(_rewards: Map<string, BigNumber>)

    // eslint-disable-next-line no-dupe-class-members
    public constructor(address: string, amount: BigNumber)

    // eslint-disable-next-line no-dupe-class-members
    public constructor(..._params: any[]) {
        this.totalPrice = BigNumber.from(0)
        this.rewards = new Map()

        if (_params.length === 1) {
            const [rewards] = _params
            this.rewards = rewards as Map<string, BigNumber>
            this.rewards.forEach(v => (this.totalPrice = this.totalPrice.add(v)))
        } else if (_params.length === 2) {
            const [address, amount] = _params
            this.rewards.set(address, amount)
            this.totalPrice = amount
        }
    }

    public static sumAmounts(amounts: BigNumber[]) {
        return amounts.reduce((a, b) => b.add(a), BigNumber.from(0))
    }

    public getTotalPrice(): BigNumber {
        return this.totalPrice
    }

    public getRewards(): Map<string, BigNumber> {
        return this.rewards
    }

    public getAmounts(): BigNumber[] {
        return [...Array.from(this.rewards.values())]
    }

    public getReceivers(): string[] {
        return [...Array.from(this.rewards.keys())]
    }

    public setReceiver(receiver: string, amount: BigNumber): AssetRewards {
        this.rewards.set(receiver, amount)
        this.totalPrice = AssetRewards.sumAmounts(this.getAmounts())
        return this
    }

    public getAmountsString(): string {
        return this.rewards.size
            ? JSON.stringify(
                  Array.from(this.rewards.values()).map(value => value.toString())
              )
            : '[]'
    }

    /**
     * It adds network fees on top of the already configured asset rewards
     * @param feeReceiver - the address receiving the fees
     * @param networkFeePercent - the percent of fees to receive, it uses the contract denomitor @see AssetRewards.NETWORK_FEE_DENOMINATOR
     * @returns the asset rewards object
     */
    public addNetworkFees(
        feeReceiver: string,
        networkFeePercent: BigNumber
    ): AssetRewards {
        return this.setReceiver(
            feeReceiver,
            this.totalPrice
                .mul(networkFeePercent)
                .div(AssetRewards.NETWORK_FEE_DENOMINATOR)
                .div(100)
        )
    }

    /**
     * It includes network fees on the existing asset rewards substracting the proportion taking into account the receivers percent
     * @param feeReceiver - the address receiving the fees
     * @param networkFeePercent - the percent of fees to receive, it uses the contract denomitor @see AssetRewards.NETWORK_FEE_DENOMINATOR
     * @returns the asset rewards object
     */
    public adjustToIncludeNetworkFees(
        feeReceiver: string,
        networkFeePercent: BigNumber
    ): AssetRewards {
        const feesToInclude = this.totalPrice
            .mul(networkFeePercent)
            .div(AssetRewards.NETWORK_FEE_DENOMINATOR)
            .div(100)

        const newRewards: Map<string, BigNumber> = new Map()
        this.rewards.forEach((k, v) => {
            newRewards.set(
                v,
                k.sub(
                    k
                        .mul(networkFeePercent)
                        .div(AssetRewards.NETWORK_FEE_DENOMINATOR)
                        .div(100)
                )
            )
        })
        newRewards.set(feeReceiver, feesToInclude)
        this.rewards = newRewards
        this.totalPrice = AssetRewards.sumAmounts(this.getAmounts())

        return this
    }

    public getReceiversString(): string {
        if (this.rewards.size == 0) return '[]'
        return '["' + Array.from(this.rewards.keys()).join('","') + '"]'
    }
}
