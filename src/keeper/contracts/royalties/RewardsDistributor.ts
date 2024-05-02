import { InstantiableConfig } from '../../../Instantiable.abstract'
import { NvmAccount } from '../../../models/NvmAccount'
import { TxParameters as txParams } from '../../../models/Transactions'
import { didZeroX, zeroX } from '../../../utils/ConversionTypeHelpers'
import { ContractBase } from '../../../keeper/contracts/ContractBase'
import { LoggerInstance } from '../../../models'

export class RewardsDistributor extends ContractBase {
  public static async getInstance(config: InstantiableConfig): Promise<RewardsDistributor> {
    try {
      const instance: RewardsDistributor = new RewardsDistributor('RewardsDistributor')
      await instance.init(config, true)
      return instance
    } catch (e) {
      LoggerInstance.warn('Cannot load optional contract RewardsDistributor')
      throw new Error('Cannot load optional contract RewardsDistributor')
    }
  }
  public setReceivers(did: string, addr: string[], from: NvmAccount, params?: txParams) {
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
    from: NvmAccount,
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
