import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../../utils'
import { Condition } from '../Condition.abstract'

/**
 * Allows to fulfill a condition to users holding some amount of NFTs for a specific DID.
 */
export class NFTHolderCondition extends Condition {
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
    public hashValues(did: string, holderAddress: string, amount: number) {
        return super.hashValues(didZeroX(did), zeroX(holderAddress), String(amount))
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
        amount: number,
        from?: string
    ) {
        return super.fulfill(
            agreementId,
            [didZeroX(did), zeroX(holderAddress), String(amount)],
            from
        )
    }
}
