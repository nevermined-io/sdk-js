import { InstantiableConfig } from '../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../utils'
import { Condition, ConditionContext, ProviderCondition } from '../conditions/Condition.abstract'
import { NvmAccount } from '../../../nevermined'

export interface NFT721LockConditionContext extends ConditionContext {
  lockAddress: string
  nftAmount: number
  nftContractAddress: string
}

/**
 * Implementation of the NFT Lock Condition
 */
export class NFT721LockCondition extends ProviderCondition<NFT721LockConditionContext> {
  public static async getInstance(config: InstantiableConfig): Promise<NFT721LockCondition> {
    return Condition.getInstance(config, 'NFT721LockCondition', NFT721LockCondition, true)
  }

  /**
   * Generates the hash of condition inputs.
   * @param did - The DID of the asset with NFTs attached to lock.
   * @param lockAddress - the address to lock the NFT to (vault address)
   * @param amount - The amount of locked tokens.
   * @param nftContractAddress - The NFT721 contract address
   * @returns Hash of all the values.
   */
  public params(did: string, lockAddress: string, amount: number, nftContractAddress: string) {
    return super.params(
      didZeroX(did),
      zeroX(lockAddress),
      String(amount),
      zeroX(nftContractAddress),
    )
  }

  public async paramsFromDDO({
    ddo,
    lockAddress,
    nftAmount,
    nftContractAddress,
  }: NFT721LockConditionContext) {
    return this.params(ddo.shortId(), lockAddress, nftAmount, nftContractAddress)
  }

  /**
   * Fulfill requires valid NFT transfer in order to lock the amount of DID NFTs based on SEA.
   * @param agreementId - SEA agreement identifier.
   * @param did - Asset Decentralized identifier.
   * @param lockAddress - The contract address where the NFT is locked.
   * @param amount - The amount of tokens to be locked.
   * @param nftContractAddress - The NFT721 contract address
   * @param from -
   * @returns Condition state.
   */
  public fulfill(
    agreementId: string,
    did: string,
    lockAddress: string,
    amount: number,
    nftContractAddress: string,
    from?: NvmAccount,
  ) {
    return super.fulfillPlain(
      agreementId,
      [didZeroX(did), zeroX(lockAddress), String(amount), zeroX(nftContractAddress)],
      from,
    )
  }
}
