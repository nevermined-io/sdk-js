import BigNumber from '../utils/BigNumber'

export default class AssetRewards {
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
            this.rewards = rewards
            this.rewards.forEach((v) => (this.totalPrice = this.totalPrice.add(v)))
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

    public getAmountsString(): string {
        return this.rewards.size
            ? JSON.stringify(
                  Array.from(this.rewards.values()).map((value) => value.toString())
              )
            : '[]'
    }

    public getReceiversString(): string {
        if (this.rewards.size == 0) return '[]'
        return '["' + Array.from(this.rewards.keys()).join('","') + '"]'
    }
}
