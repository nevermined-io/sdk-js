import { InstantiableConfig } from '../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../utils'
import { Condition } from './Condition.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

/**
 * Condition allowing to transfer the ownership between the original owner and a receiver.
 */
export class TransferDIDOwnershipCondition extends Condition {
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
     * @param did The Decentralized Identifier of the asset.
     * @param receiver Address of the granted user or the DID provider.
     * @returns Hash of all the values.
     */
    public hashValues(did: string, receiver: string) {
        return super.hashValues(didZeroX(did), zeroX(receiver))
    }

    /**
     * Fulfill the transfer DID ownership condition.
     *  Only DID owner or DID provider can call this method.
     *  Fulfill method transfer full ownership permissions to the receiver address.
     *
     * @param agreementId Agreement identifier.
     * @param did The Decentralized Identifier of the asset.
     * @param receiver The address of the granted user.
     * @param from
     * @returns Condition state.
     */
    public fulfill(
        agreementId: string,
        did: string,
        receiver: string,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfill(agreementId, [didZeroX(did), zeroX(receiver)], from, params)
    }
}
