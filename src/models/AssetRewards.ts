import BigNumber from 'bignumber.js'

export default class AssetRewards {
    private totalPrice: BigNumber

    private rewards: Map<string, BigNumber>

    public constructor()

    public constructor(_rewards: Map<string, BigNumber>)

    // eslint-disable-next-line no-dupe-class-members
    public constructor(address: string, amount: BigNumber)

    // eslint-disable-next-line no-dupe-class-members
    public constructor(..._params: any[]) {
        this.totalPrice = new BigNumber(0)
        this.rewards = new Map()
        if (_params.length === 1) {
            this.rewards = _params[0]
            this.rewards.forEach(v => (this.totalPrice = this.totalPrice.plus(v)))
        } else if (_params.length === 2) {
            this.rewards.set(_params[0], _params[1])
            this.totalPrice = _params[1]
        }
    }

    public static sumAmounts(amounts: BigNumber[]) {
        return amounts.reduce((a, b) => b.plus(new BigNumber(a)), new BigNumber(0))
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

    public getAmountsString(): string {
        return this.rewards.size
            ? JSON.stringify(
                  Array.from(this.rewards.values()).map(value => value.toFixed())
              )
            : '[]'
    }

    public getReceiversString(): string {
        if (this.rewards.size == 0) return '[]'
        return '["' + Array.from(this.rewards.keys()).join('","') + '"]'
    }
}
