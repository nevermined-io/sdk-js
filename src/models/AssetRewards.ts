export default class AssetRewards {
    private totalPrice: number

    private rewards: Map<string, number>

    public constructor()

    public constructor(_rewards: Map<string, number>)

    public constructor(address: string, amount: number)

    public constructor(..._params: any[]) {
        this.totalPrice = 0
        this.rewards = new Map()

        if (_params.length === 1) {
            this.rewards = _params[0]
            this.rewards.forEach(
                (v, k) => (this.totalPrice = v + this.totalPrice)
            )
        } else if (_params.length === 2) {
            this.rewards.set(_params[0], _params[1])
            this.totalPrice = _params[1]
        }
    }

    public getTotalPrice(): number {
        return this.totalPrice
    }

    public getRewards(): Map<string, number> {
        return this.rewards
    }

    public getAmounts(): number[] {
        return [...this.rewards.values()]
    }

    public getReceivers(): string[] {
        return [...this.rewards.keys()]
    }

    public getAmountsString(): string {
        if (this.rewards.size == 0) return '[]'
        return '["' + Array.from(this.rewards.values()).join('","') + '"]'
    }

    public getReceiversString(): string {
        if (this.rewards.size == 0) return '[]'
        return '["' + Array.from(this.rewards.keys()).join('","') + '"]'
    }
}
