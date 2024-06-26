import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../ddo/DDO'
import { NvmAccount } from '../../../models/NvmAccount'
import { TxParameters } from '../../../models/Transactions'
import { ConditionInstanceSmall } from '../../../types/ContractTypes'
import { didZeroX, zeroX } from '../../../utils/ConversionTypeHelpers'
import { ConditionContext, ProviderCondition, Condition } from './Condition.abstract'

export interface EscrowPaymentConditionContext extends ConditionContext {
  consumerId: string
}

export class EscrowPaymentCondition extends ProviderCondition<EscrowPaymentConditionContext> {
  public static async getInstance(config: InstantiableConfig): Promise<EscrowPaymentCondition> {
    return Condition.getInstance(config, 'EscrowPaymentCondition', EscrowPaymentCondition)
  }

  public params(
    did: string,
    amounts: bigint[],
    receivers: string[],
    returnAddress: string,
    sender: string,
    tokenAddress: string,
    lockCondition: string,
    releaseCondition: string,
  ) {
    const amountsString = amounts.map((v) => v.toString())
    return super.params(
      didZeroX(did),
      amountsString,
      receivers,
      ...[returnAddress, sender, tokenAddress, lockCondition, releaseCondition].map(zeroX),
    )
  }

  public async paramsFromDDO(
    { ddo, service, price: rewards, consumerId }: EscrowPaymentConditionContext,
    access: ConditionInstanceSmall,
    lock: ConditionInstanceSmall,
  ) {
    const escrow = DDO.findServiceConditionByName(service, 'escrowPayment')
    if (!escrow) throw new Error('Escrow Condition not found!')
    const tokenAddress = escrow.parameters.find((p) => p.name === '_tokenAddress')?.value as string
    return this.params(
      ddo.shortId(),
      rewards.getAmounts(),
      rewards.getReceivers(),
      consumerId,
      this.nevermined.keeper.conditions.escrowPaymentCondition.address,
      tokenAddress,
      lock.id,
      access.id,
    )
  }

  public fulfill(
    agreementId: string,
    did: string,
    amounts: bigint[],
    receivers: string[],
    returnAddress: string,
    lockPaymentAddress: string,
    tokenAddress: string,
    lockCondition: string,
    releaseCondition: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    const amountsString = amounts.map((v) => v.toString())
    return super.fulfillPlain(
      agreementId,
      [
        didZeroX(did),
        amountsString,
        receivers,
        ...[returnAddress, lockPaymentAddress, tokenAddress, lockCondition, releaseCondition].map(
          zeroX,
        ),
      ],
      from,
      txParams,
    )
  }
}
