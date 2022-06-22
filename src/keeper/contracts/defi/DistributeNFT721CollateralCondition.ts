import { InstantiableConfig } from '../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../utils/index'
import { Condition, ConditionContext } from '../conditions/Condition.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

export interface DistributeNFTCollateralConditionContext extends ConditionContext {
    vaultAddress: string
    nftContractAddress: string
}

/**
 * Condition allowing to transfer an NFT either to the original owner or a lender
 * depending on the loan status.
 */
export class DistributeNFTCollateralCondition extends Condition<DistributeNFTCollateralConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<DistributeNFTCollateralCondition> {
        return Condition.getInstance(
            config,
            'DistributeNFTCollateralCondition',
            DistributeNFTCollateralCondition,
            true
        )
    }

    /**
     * Generates the ash of condition inputs.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} vaultAddress The address of the vault contract where the NFT is locked.
     * @param {String} nftContractAddress The address of the NFT721 contract
     * @returns Hash of all the values
     */
    public params(did: string, vaultAddress: string, nftContractAddress: string) {
        return super.params(
            didZeroX(did),
            zeroX(vaultAddress),
            zeroX(nftContractAddress)
        )
    }

    public async paramsFromDDO({ ddo, vaultAddress, nftContractAddress }: DistributeNFTCollateralConditionContext) {
        return this.params(ddo.shortId(), vaultAddress, nftContractAddress)
    }

    /**
     * Fulfill the distribute NFT collateral condition.
     *  Only the borrower or the lender can call this method.
     *
     * @param {String} agreementId The agreement identifier.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} vaultAddress The address of the vault contract where the NFT is locked.
     * @param {String} nftContractAddress The address of the NFT721 contract
     * @param {String} from
     * @returns Condition state.
     */
    public fulfill(
        agreementId: string,
        did: string,
        vaultAddress: string,
        nftContractAddress: string,
        from?: Account,
        txParams?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [didZeroX(did), zeroX(vaultAddress), zeroX(nftContractAddress)],
            from,
            txParams
        )
    }
}
