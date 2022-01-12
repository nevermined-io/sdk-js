import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../../utils'
import { Condition } from '../Condition.abstract'
import Account from '../../../../nevermined/Account'
import { TxParameters } from '../../ContractBase'

/**
 * Implementation of the NFT Lock Condition
 */
export class NFTLockCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTLockCondition> {
        return Condition.getInstance(config, 'NFTLockCondition', NFTLockCondition)
    }

    /**
     * Generates the hash of condition inputs.
     * @param {String} did The DID of the asset with NFTs attached to lock.
     * @param {String} rewardAddress the final address to receive the NFTs.
     * @param {Number} amount The amount of locked tokens.
     * @returns Hash of all the values.
     */
    public hashValues(did: string, rewardAddress: string, amount: number) {
        return super.hashValues(didZeroX(did), zeroX(rewardAddress), String(amount))
    }

    /**
     * Fulfill requires valid NFT transfer in order to lock the amount of DID NFTs based on SEA.
     * @param {String} agreementId SEA agreement identifier.
     * @param {String} did Asset Decentralized identifier.
     * @param {String} rewardAddress The contract addresss where the reward is locked.
     * @param {Number} amount The amount of tokens to be transferred.
     * @param {String} from
     * @returns Condition state.
     */
    public fulfill(
        agreementId: string,
        did: string,
        rewardAddress: string,
        amount: number,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [didZeroX(did), zeroX(rewardAddress), String(amount)],
            from,
            params
        )
    }
}
