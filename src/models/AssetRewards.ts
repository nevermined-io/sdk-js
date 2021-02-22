export default class AssetRewards {
  private totalPrice: string

  private rewards: Map<string, string>

  public constructor()

  public constructor(_rewards: Map<string, string>)

  public constructor(address: string, amount: string)

  public constructor(..._params: any[]) {
    this.totalPrice = '0'
    this.rewards = new Map()

    if (_params.length === 1) {
      this.rewards = _params[0]
      this.rewards.forEach(
        (v, k) => (this.totalPrice = String(Number(v) + Number(this.totalPrice)))
      )
    } else if (_params.length === 2) {
      this.rewards.set(_params[0], _params[1])
      this.totalPrice = _params[1]
    }
  }

  public getTotalPrice(): string {
    return this.totalPrice
  }

  public getRewards(): Map<string, string> {
    return this.rewards
  }

  public getAmounts(): string[] {
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
