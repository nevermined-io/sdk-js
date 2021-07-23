import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../../utils'
import { Condition } from '../Condition.abstract'

/**
 * Condition allowing to transfer an NFT between the original owner and a receiver
 */
export class TransferNFT721Condition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<TransferNFT721Condition> {
        return Condition.getInstance(
            config,
            'TransferNFT721Condition',
            TransferNFT721Condition
        )
    }

    /**
     * Generates the ash of condition inputs.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} nftReceiver The address of the granted user or the DID provider.
     * @param {Number} nftAmount Amount of NFTs to transfer.
     * @param {String} lockCondition Lock condition identifier.
     * @param {String} nftTokenAddress The address of the NFT token to use.
     * @returns Hash of all the values
     */
    public hashValues(
        did: string,
        nftReceiver: string,
        nftAmount: number,
        lockCondition: string,
        nftTokenAddress: string
    ) {
        return super.hashValues(
            didZeroX(did),
            zeroX(nftReceiver),
            String(nftAmount),
            lockCondition,
            nftTokenAddress
        )
    }

    /**
     * Fulfill the transfer NFT condition.
     *  Only DID owner or DID provider can call this method.
     *
     * @param {String} agreementId The agreement identifier.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} nftReceiver The address of the account to receive the NFT.
     * @param {Number[]} nftAmount amount of NFTs to transfer.
     * @param {String} lockPaymentCondition lock payment condition identifier.
     * @param {String} nftTokenAddress address of the nft token to use.
     * @param {String} from
     * @returns Condition state.
     */
    public fulfill(
        agreementId: string,
        did: string,
        nftReceiver: string,
        nftAmount: number,
        lockPaymentCondition: string,
        nftTokenAddress: string,
        from?: string
    ) {
        return super.fulfill(
            agreementId,
            [
                didZeroX(did),
                zeroX(nftReceiver),
                String(nftAmount),
                lockPaymentCondition,
                nftTokenAddress
            ],
            from
        )
    }
}
