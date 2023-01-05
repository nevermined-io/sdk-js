import { BigNumber } from '../utils'

export class AssetPrice {
    public static readonly NETWORK_FEE_DENOMINATOR = BigNumber.from(10000)

    private totalPrice: BigNumber

    private rewards: Map<string, BigNumber>

    private tokenAddress?: string

    public constructor()
    public constructor(_rewards: Map<string, BigNumber>)
    public constructor(address: string, amount: BigNumber)
    public constructor(address: string, amount: BigNumber, tokenAddress: string)
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
        } else if (_params.length === 3) {
            const [address, amount, tokenAddress] = _params
            this.rewards.set(address, amount)
            this.totalPrice = amount
            this.tokenAddress = tokenAddress
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

    public setReceiver(receiver: string, amount: BigNumber): AssetPrice {
        this.rewards.set(receiver, amount)
        this.totalPrice = AssetPrice.sumAmounts(this.getAmounts())
        return this
    }

    public setTokenAddress(address: string): AssetPrice {
        this.tokenAddress = address
        return this
    }

    public getTokenAddress(): string {
        return this.tokenAddress
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
     * @param networkFeePercent - the percent of fees to receive, it uses the contract denominator @see AssetPrice.NETWORK_FEE_DENOMINATOR
     * @returns the asset rewards object
     */
    public addNetworkFees(feeReceiver: string, networkFeePercent: BigNumber): AssetPrice {
        return this.setReceiver(
            feeReceiver,
            this.totalPrice
                .mul(networkFeePercent)
                .div(AssetPrice.NETWORK_FEE_DENOMINATOR)
                .div(100)
        )
    }

    /**
     * It includes network fees on the existing asset rewards subtracting the proportion taking into account the receivers percent
     * @param feeReceiver - the address receiving the fees
     * @param networkFeePercent - the percent of fees to receive, it uses the contract denominator @see AssetPrice.NETWORK_FEE_DENOMINATOR
     * @returns the asset rewards object
     */
    public adjustToIncludeNetworkFees(
        feeReceiver: string,
        networkFeePercent: BigNumber
    ): AssetPrice {
        const feesToInclude = this.totalPrice
            .mul(networkFeePercent)
            .div(AssetPrice.NETWORK_FEE_DENOMINATOR)
            .div(100)

        const newRewards: Map<string, BigNumber> = new Map()
        this.rewards.forEach((k, v) => {
            newRewards.set(
                v,
                k.sub(
                    k
                        .mul(networkFeePercent)
                        .div(AssetPrice.NETWORK_FEE_DENOMINATOR)
                        .div(100)
                )
            )
        })
        newRewards.set(feeReceiver, feesToInclude)
        this.rewards = newRewards
        this.totalPrice = AssetPrice.sumAmounts(this.getAmounts())

        return this
    }

    public getReceiversString(): string {
        if (this.rewards.size == 0) return '[]'
        return '["' + Array.from(this.rewards.keys()).join('","') + '"]'
    }
}
