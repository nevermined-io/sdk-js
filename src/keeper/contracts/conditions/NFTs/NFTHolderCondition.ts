import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../../utils'
import { Condition, ConditionContext } from '../Condition.abstract'
import Account from '../../../../nevermined/Account'
import { TxParameters } from '../../ContractBase'

export interface NFTHolderConditionContext extends ConditionContext {
    holderAddress: string
    amount: number
}

/**
 * Allows to fulfill a condition to users holding some amount of NFTs for a specific DID.
 */
export class NFTHolderCondition extends Condition<NFTHolderConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTHolderCondition> {
        return Condition.getInstance(config, 'NFTHolderCondition', NFTHolderCondition)
    }

    /**
     * Generate the hash of condition inputs with the following parameters.
     *
     * @param did - The Decentralized Identifier of the asset.
     * @param holderAddress - The address of the NFT holder .
     * @param amount - The amount of NFTs that need to be hold by the holder
     * @returns hash of all the values
     */
    public params(did: string, holderAddress: string, amount: number) {
        return super.params(didZeroX(did), zeroX(holderAddress), String(amount))
    }

    public async paramsFromDDO({
        ddo,
        holderAddress,
        amount
    }: NFTHolderConditionContext) {
        return this.params(ddo.shortId(), holderAddress, amount)
    }

    /**
     * Fulfill requires a validation that holder as enough NFTs for a specific DID.
     *
     * @param agreementId - SEA agreement identifier.
     * @param did - The Decentralized Identifier of the asset.
     * @param holderAddress - The contract address where the reward is locked.
     * @param amount - The amount of NFT to be hold
     * @param from -
     * @returns condition state
     */
    public fulfill(
        agreementId: string,
        did: string,
        holderAddress: string,
        amount: number,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfillPlain(
            agreementId,
            [didZeroX(did), zeroX(holderAddress), String(amount)],
            from,
            params
        )
    }
}
