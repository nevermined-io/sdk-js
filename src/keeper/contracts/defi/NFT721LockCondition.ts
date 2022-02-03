import { InstantiableConfig } from '../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../utils/index'
import { Condition } from '../conditions/Condition.abstract'
import Account from '../../../nevermined/Account'

/**
 * Implementation of the NFT Lock Condition
 */
export class NFT721LockCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFT721LockCondition> {
        return Condition.getInstance(config, 'NFT721LockCondition', NFT721LockCondition)
    }

    /**
     * Generates the hash of condition inputs.
     * @param {String} did The DID of the asset with NFTs attached to lock.
     * @param {String} lockAddress the address to lock the NFT to (vault address)
     * @param {Number} amount The amount of locked tokens.
     * @param {String} nftContractAddress The NFT721 contract address
     * @returns Hash of all the values.
     */
    public hashValues(did: string, lockAddress: string, amount: number, nftContractAddress: string) {
        return super.hashValues(didZeroX(did), zeroX(lockAddress), String(amount), zeroX(nftContractAddress))
    }

    /**
     * Fulfill requires valid NFT transfer in order to lock the amount of DID NFTs based on SEA.
     * @param {String} agreementId SEA agreement identifier.
     * @param {String} did Asset Decentralized identifier.
     * @param {String} lockAddress The contract addresss where the NFT is locked.
     * @param {Number} amount The amount of tokens to be locked.
     * @param {String} nftContractAddress The NFT721 contract address
     * @param {String} from
     * @returns Condition state.
     */
    public fulfill(
        agreementId: string,
        did: string,
        lockAddress: string,
        amount: number,
        nftContractAddress: string,
        from?: Account
    ) {
        return super.fulfill(
            agreementId,
            [didZeroX(did), zeroX(lockAddress), String(amount), zeroX(nftContractAddress)],
            from
        )
    }
}
