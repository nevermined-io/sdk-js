import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../../utils'
import { Condition, ConditionContext, ConsumerCondition } from '../Condition.abstract'
import { Account } from '../../../../nevermined'
import { TxParameters } from '../../ContractBase'
import { DDO, ServiceCommon } from '../../../../ddo'

export interface NFTHolderConditionContext extends ConditionContext {
  holderAddress: string
  amount?: bigint
}

/**
 * Allows to fulfill a condition to users holding some amount of NFTs for a specific DID.
 */
export class NFTHolderCondition extends ConsumerCondition<NFTHolderConditionContext> {
  public static async getInstance(config: InstantiableConfig): Promise<NFTHolderCondition> {
    return Condition.getInstance(config, 'NFTHolderCondition', NFTHolderCondition)
  }

  /**
   * Generate the hash of condition inputs with the following parameters.
   *
   * @param did - The Decentralized Identifier of the asset.
   * @param holderAddress - The address of the NFT holder .
   * @param amount - The amount of NFTs that need to be hold by the holder
   * @param nftContractAddress - The address of the NFT token to use.
   * @returns hash of all the values
   */
  public params(did: string, holderAddress: string, amount: bigint, nftContractAddress?: string) {
    return super.params(
      didZeroX(did),
      zeroX(holderAddress),
      amount.toString(),
      zeroX(nftContractAddress || this.nevermined.keeper.nftUpgradeable.address),
    )
  }

  public amountFromService(service: ServiceCommon): bigint {
    const holder = DDO.findServiceConditionByName(service, 'nftHolder')
    if (!holder) throw new Error('Holder condition not found!')
    return BigInt(holder.parameters.find((p) => p.name === '_numberNfts').value as string)
  }

  public nftContractFromService(service: ServiceCommon): string {
    const holder = DDO.findServiceConditionByName(service, 'nftHolder')
    if (!holder) throw new Error('Holder condition not found!')
    const res = holder.parameters.find((p) => p.name === '_contractAddress').value as string
    return res || this.nevermined.keeper.nftUpgradeable.address
  }

  public async paramsFromDDO({ ddo, service, holderAddress, amount }: NFTHolderConditionContext) {
    const numberNfts = amount || this.amountFromService(service)
    return this.params(
      ddo.shortId(),
      holderAddress,
      numberNfts,
      this.nftContractFromService(service),
    )
  }

  /**
   * Fulfill requires a validation that holder as enough NFTs for a specific DID.
   *
   * @param agreementId - SEA agreement identifier.
   * @param did - The Decentralized Identifier of the asset.
   * @param holderAddress - The contract address where the reward is locked.
   * @param amount - The amount of NFT to be hold
   * @param nftContractAddress - Address of the nft contract
   * @param from - Account sending the transaction
   * @param txParams - Transacion parameters
   * @returns condition state
   */
  public fulfill(
    agreementId: string,
    did: string,
    holderAddress: string,
    amount: bigint,
    nftContractAddress: string,
    from?: Account,
    txParams?: TxParameters,
  ) {
    return super.fulfillPlain(
      agreementId,
      [didZeroX(did), zeroX(holderAddress), String(amount), zeroX(nftContractAddress)],
      from,
      txParams,
    )
  }
}
