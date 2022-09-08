import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../../utils'
import { Condition, ConditionContext, ConsumerCondition } from '../Condition.abstract'
import Account from '../../../../nevermined/Account'
import { TxParameters } from '../../ContractBase'
import BigNumber from '../../../../utils/BigNumber'

export interface NFTHolderConditionContext extends ConditionContext {
    holderAddress: string
    amount?: BigNumber
}

/**
 * Allows to fulfill a condition to users holding some amount of NFTs for a specific DID.
 */
export class NFTHolderCondition extends ConsumerCondition<NFTHolderConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTHolderCondition> {
        return Condition.getInstance(config, 'NFTHolderCondition', NFTHolderCondition)
    }

    /**
     * Generate the hash of condition inputs with the following parameters.
     *
     * @param {String} did The Decentralized Identifier of the asset.
     * @param {String} holderAddress The address of the NFT holder .
     * @param {Number} amount The amouunt of NFTs that need to be hold by the holder
     * @returns hash of all the values
     */
    public params(did: string, holderAddress: string, amount?: BigNumber) {
        return super.params(didZeroX(did), zeroX(holderAddress), amount.toString())
    }

    public async paramsFromDDO({
        ddo,
        service,
        holderAddress,
        amount
    }: NFTHolderConditionContext) {
        const numberNfts =
            amount ||
            BigNumber.from(
                service.attributes.serviceAgreementTemplate.conditions[0].parameters[2]
                    .value
            )
        return this.params(ddo.shortId(), holderAddress, numberNfts)
    }

    /**
     * Fulfill requires a validation that holder as enough NFTs for a specific DID.
     *
     * @param {String} agreementId SEA agreement identifier.
     * @param {String} did The Decentralized Identifier of the asset.
     * @param {String} holderAddress The contract address where the reward is locked.
     * @param {Number} amount The amount of NFT to be hold
     * @param {String} from
     * @returns condition state
     */
    public fulfill(
        agreementId: string,
        did: string,
        holderAddress: string,
        amount: BigNumber,
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
