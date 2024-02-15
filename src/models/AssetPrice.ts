export class AssetPrice {
  public static readonly NETWORK_FEE_DENOMINATOR = 10000n

  private totalPrice: bigint

  private rewards: Map<string, bigint>

  private tokenAddress?: string

  public constructor()
  public constructor(_rewards: Map<string, bigint>)
  public constructor(address: string, amount: bigint)
  public constructor(address: string, amount: bigint, tokenAddress: string)
  public constructor(..._params: any[]) {
    this.totalPrice = 0n
    this.rewards = new Map<string, bigint>()

    if (_params.length === 1) {
      const [rewards] = _params
      this.rewards = rewards as Map<string, bigint>
      this.rewards.forEach((v) => (this.totalPrice = this.totalPrice + v))
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

  public static sumAmounts(amounts: bigint[]) {
    return amounts.reduce((a, b) => b + a, 0n)
  }

  public getTotalPrice(): bigint {
    return this.totalPrice
  }

  public getRewards(): Map<string, bigint> {
    return this.rewards
  }

  public getAmounts(): bigint[] {
    return [...Array.from(this.rewards.values())]
  }

  public getReceivers(): string[] {
    return [...Array.from(this.rewards.keys())]
  }

  public setReceiver(receiver: string, amount: bigint): AssetPrice {
    if (amount > 0) {
      this.rewards.set(receiver, amount)
      this.totalPrice = AssetPrice.sumAmounts(this.getAmounts())
    }
    return this
  }

  public setTokenAddress(address: string): AssetPrice {
    this.tokenAddress = address
    return this
  }

  public getTokenAddress(): string {
    return this.tokenAddress
  }

  /**
   * It adds network fees on top of the already configured asset rewards
   * @param feeReceiver - the address receiving the fees
   * @param networkFeePercent - the percent of fees to receive, it uses the contract denominator @see AssetPrice.NETWORK_FEE_DENOMINATOR
   * @returns the asset rewards object
   */
  public addNetworkFees(feeReceiver: string, networkFeePercent: bigint): AssetPrice {
    const amount = (this.totalPrice * networkFeePercent) / AssetPrice.NETWORK_FEE_DENOMINATOR / 100n
    return this.setReceiver(feeReceiver, amount)
  }

  /**
   * It includes network fees on the existing asset rewards subtracting the proportion taking into account the receivers percent
   * @param feeReceiver - the address receiving the fees
   * @param networkFeePercent - the percent of fees to receive, it uses the contract denominator @see AssetPrice.NETWORK_FEE_DENOMINATOR
   * @returns the asset rewards object
   */
  public adjustToIncludeNetworkFees(feeReceiver: string, networkFeePercent: bigint): AssetPrice {
    const feesToInclude =
      (this.totalPrice * networkFeePercent) / AssetPrice.NETWORK_FEE_DENOMINATOR / 100n

    if (feesToInclude > 0) {
      const newRewards: Map<string, bigint> = new Map()
      this.rewards.forEach((k, v) => {
        newRewards.set(v, k - (k * networkFeePercent) / AssetPrice.NETWORK_FEE_DENOMINATOR / 100n)
      })
      newRewards.set(feeReceiver, feesToInclude)
      this.rewards = newRewards
      this.totalPrice = AssetPrice.sumAmounts(this.getAmounts())
    }

    return this
  }

  public getAmountsString(): string {
    return this.rewards.size
      ? JSON.stringify(Array.from(this.rewards.values()).map((value) => value.toString()))
      : '[]'
  }

  public getReceiversString(): string {
    if (this.rewards.size == 0) return '[]'
    return '["' + Array.from(this.rewards.keys()).join('","') + '"]'
  }

  public toString(): string {
    return JSON.stringify({
      rewards: {
        amounts: this.getAmounts(),
        receivers: this.getReceivers(),
      },
      totalPrice: this.totalPrice,
      token: this.tokenAddress,
    })
  }
}
