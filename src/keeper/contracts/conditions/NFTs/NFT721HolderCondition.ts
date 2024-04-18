import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { DDO } from '../../../../ddo/DDO'
import {
  Condition,
  ConditionContext,
  ConsumerCondition,
} from '../../../../keeper/contracts/conditions/Condition.abstract'
import { NvmAccount } from '../../../../models/NvmAccount'
import { TxParameters } from '../../../../models/Transactions'
import { ServiceCommon } from '../../../../types/DDOTypes'
import { didZeroX, zeroX } from '../../../../utils/ConversionTypeHelpers'

export interface NFT721HolderConditionContext extends ConditionContext {
  holderAddress: string
}

/**
 * Allows to fulfill a condition to users holding some amount of NFTs for a specific DID.
 */
export class NFT721HolderCondition extends ConsumerCondition<NFT721HolderConditionContext> {
  public static async getInstance(config: InstantiableConfig): Promise<NFT721HolderCondition> {
    return Condition.getInstance(config, 'NFT721HolderCondition', NFT721HolderCondition, true)
  }

  /**
   * Generate the hash of condition inputs with the following parameters.
   *
   * @param did - The Decentralized Identifier of the asset.
   * @param holderAddress - The address of the NFT holder .
   * @param nftTokenAddress - The address of the nft 721 token to use
   * @returns hash of all the values
   */
  public params(did: string, holderAddress: string, nftTokenAddress: string) {
    return super.params(didZeroX(did), zeroX(holderAddress), String(1), nftTokenAddress)
  }

  public nftContractFromService(service: ServiceCommon): string {
    const holder = DDO.findServiceConditionByName(service, 'nftHolder')
    if (!holder) throw new Error('Holder condition not found!')
    return holder.parameters.find((p) => p.name === '_contractAddress')?.value as string
  }

  public async paramsFromDDO({ ddo, service, holderAddress }: NFT721HolderConditionContext) {
    return this.params(ddo.shortId(), holderAddress, this.nftContractFromService(service))
  }
  /**
   * Fulfill requires a validation that holder as enough NFTs for a specific DID.
   *
   * @param agreementId - SEA agreement identifier.
   * @param did - The Decentralized Identifier of the asset.
   * @param holderAddress - The contract address where the reward is locked.
   * @param nftTokenAddress - The contract address of the nft to use.
   * @param from - Account sending the transaction
   * @param txParams - Transacion parameters
   * @returns condition state
   */
  public fulfill(
    agreementId: string,
    did: string,
    holderAddress: string,
    nftTokenAddress: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    return super.fulfillPlain(
      agreementId,
      [didZeroX(did), zeroX(holderAddress), String(1), nftTokenAddress],
      from,
      txParams,
    )
  }
}
