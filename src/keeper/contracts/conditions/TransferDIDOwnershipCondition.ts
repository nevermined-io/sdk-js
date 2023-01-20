import { InstantiableConfig } from '../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../utils'
import { Condition, ConditionContext, ProviderCondition } from './Condition.abstract'
import { Account } from '../../../nevermined'
import { TxParameters } from '../ContractBase'

export interface AccessConditionContext extends ConditionContext {
    receiverId: string
}

/**
 * Condition allowing to transfer the ownership between the original owner and a receiver.
 */
export class TransferDIDOwnershipCondition extends ProviderCondition<AccessConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<TransferDIDOwnershipCondition> {
        return Condition.getInstance(
            config,
            'TransferDIDOwnershipCondition',
            TransferDIDOwnershipCondition
        )
    }

    /**
     * Generates the hash of the condition inputs.
     * @param did - The Decentralized Identifier of the asset.
     * @param receiver - Address of the granted user or the DID provider.
     * @returns Hash of all the values.
     */
    public params(did: string, receiver: string) {
        return super.params(didZeroX(did), zeroX(receiver))
    }

    public async paramsFromDDO({ ddo, receiverId }: AccessConditionContext) {
        return this.params(ddo.shortId(), receiverId)
    }

    /**
     * Fulfill the transfer DID ownership condition.
     *
     * @remarks
     * Only DID owner or DID provider can call this method.
     * Fulfill method transfer full ownership permissions to the receiver address.
     *
     * @param agreementId - Agreement identifier.
     * @param did - The Decentralized Identifier of the asset.
     * @param receiver - The address of the granted user.
     * @param from - Account fullfilling
     * @param txParams - Transaction parameters
     * @returns Condition state.
     */
    public fulfill(
        agreementId: string,
        did: string,
        receiver: string,
        from?: Account,
        txParams?: TxParameters
    ) {
        return super.fulfillPlain(
            agreementId,
            [didZeroX(did), zeroX(receiver)],
            from,
            txParams
        )
    }
}
