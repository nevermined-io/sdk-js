import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../../utils'
import { Condition } from '../Condition.abstract'
import Account from '../../../../nevermined/Account'
import { TxParameters } from '../../ContractBase'

/**
 * Allows to fulfill a condition to users holding some amount of NFTs for a specific DID.
 */
export class NFT721HolderCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFT721HolderCondition> {
        return Condition.getInstance(
            config,
            'NFT721HolderCondition',
            NFT721HolderCondition,
            true
        )
    }

    /**
     * Generate the hash of condition inputs with the following parameters.
     *
     * @param {String} did The Decentralized Identifier of the asset.
     * @param {String} holderAddress The address of the NFT holder .
     * @param {String} nftTokenAddress The address of the nft 721 token to use
     * @returns hash of all the values
     */
    public hashValues(did: string, holderAddress: string, nftTokenAddress: string) {
        return super.hashValues(
            didZeroX(did),
            zeroX(holderAddress),
            String(1),
            nftTokenAddress
        )
    }

    /**
     * Fulfill requires a validation that holder as enough NFTs for a specific DID.
     *
     * @param {String} agreementId SEA agreement identifier.
     * @param {String} did The Decentralized Identifier of the asset.
     * @param {String} holderAddress The contract address where the reward is locked.
     * @param {String} nftTokenAddress The contract address of the nft to use.
     * @param {String} from
     * @returns condition state
     */
    public fulfill(
        agreementId: string,
        did: string,
        holderAddress: string,
        nftTokenAddress: string,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [didZeroX(did), zeroX(holderAddress), String(1), nftTokenAddress],
            from,
            params
        )
    }
}
