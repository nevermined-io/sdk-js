import { InstantiableConfig } from '../../../../Instantiable.abstract'
import {
  Condition,
  ConditionContext,
  ConsumerCondition,
} from '../../../../keeper/contracts/conditions/Condition.abstract'
import { NvmAccount } from '../../../../models/NvmAccount'
import { TxParameters } from '../../../../models/Transactions'
import { didZeroX, zeroX } from '../../../../utils/ConversionTypeHelpers'

export interface NFTLockConditionContext extends ConditionContext {
  rewardAddress: string
  amount: number
}

/**
 * Implementation of the NFT Lock Condition
 */
export class NFTLockCondition extends ConsumerCondition<NFTLockConditionContext> {
  public static async getInstance(config: InstantiableConfig): Promise<NFTLockCondition> {
    return Condition.getInstance(config, 'NFTLockCondition', NFTLockCondition)
  }

  /**
   * Generates the hash of condition inputs.
   * @param did - The DID of the asset with NFTs attached to lock.
   * @param rewardAddress - The final address to receive the NFTs.
   * @param amount - The amount of locked tokens.
   * @returns Hash of all the values.
   */
  public params(did: string, rewardAddress: string, amount: number) {
    return super.params(didZeroX(did), zeroX(rewardAddress), amount)
  }

  public async paramsFromDDO({ ddo, rewardAddress, amount }: NFTLockConditionContext) {
    return this.params(ddo.shortId(), rewardAddress, amount)
  }

  /**
   * Fulfill requires valid NFT transfer in order to lock the amount of DID NFTs based on SEA.
   * @param agreementId - SEA agreement identifier.
   * @param did - Asset Decentralized identifier.
   * @param rewardAddress - The contract address where the reward is locked.
   * @param amount - The amount of tokens to be transferred.
   * @param from - Account sending the transaction
   * @param txParams - Transaction parameters
   * @returns Condition state.
   */
  public fulfill(
    agreementId: string,
    did: string,
    rewardAddress: string,
    amount: bigint,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    return super.fulfillPlain(
      agreementId,
      [didZeroX(did), zeroX(rewardAddress), String(amount)],
      from,
      txParams,
    )
  }
}
