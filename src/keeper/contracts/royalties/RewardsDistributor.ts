import ContractBase, { TxParameters as txParams } from '../ContractBase'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { NvmAccount } from '../../../nevermined'
import { didZeroX, zeroX } from '../../../utils'

export class RewardsDistributor extends ContractBase {
  public static async getInstance(config: InstantiableConfig): Promise<RewardsDistributor> {
    try {
      const instance: RewardsDistributor = new RewardsDistributor('RewardsDistributor')
      await instance.init(config, true)
      return instance
    } catch (e) {
      config.logger.warn('Cannot load optional contract RewardsDistributor')
    }
  }
  public setReceivers(did: string, addr: string[], from?: NvmAccount, params?: txParams) {
    return this.sendFrom('setReceivers', [didZeroX(did), addr], from, params)
  }
  public claimReward(
    agreementId: string,
    did: string,
    amounts: bigint[],
    receivers: string[],
    returnAddress: string,
    lockPaymentAddress: string,
    tokenAddress: string,
    lockCondition: string,
    releaseConditions: string[],
    from?: NvmAccount,
    txParams?: txParams,
  ) {
    const amountsString = amounts.map((v) => v.toString())
    return this.sendFrom(
      'claimReward',
      [
        agreementId,
        didZeroX(did),
        amountsString,
        receivers,
        ...[returnAddress, lockPaymentAddress, tokenAddress, lockCondition].map(zeroX),
        releaseConditions.map(zeroX),
      ],
      from,
      txParams,
    )
  }
}
