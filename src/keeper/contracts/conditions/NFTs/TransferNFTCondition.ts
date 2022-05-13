import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, zeroX } from '../../../../utils'
import { Condition } from '../Condition.abstract'
import Account from '../../../../nevermined/Account'
import { TxParameters } from '../../ContractBase'

/**
 * Condition allowing to transfer an NFT between the original owner and a receiver
 */
export class TransferNFTCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<TransferNFTCondition> {
        return Condition.getInstance(config, 'TransferNFTCondition', TransferNFTCondition)
    }

    /**
     * Generates the hash of condition inputs.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} nftHolder The address of the holder of the NFT.
     * @param {String} nftReceiver The address of the granted user or the DID provider.
     * @param {Number} nftAmount Amount of NFTs to transfer.
     * @param {String} lockCondition Lock condition identifier.
     * @returns Hash of all the values
     */
    public hashValues(
        did: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: number,
        lockCondition: string
    ) {
        return super.hashValues(
            didZeroX(did),
            zeroX(nftHolder),
            zeroX(nftReceiver),
            String(nftAmount),
            lockCondition
        )
    }

    /**
     * Generates the hash of condition inputs.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} nftHolder The address of the holder of the NFT.
     * @param {String} nftReceiver The address of the granted user or the DID provider.
     * @param {Number} nftAmount Amount of NFTs to transfer.
     * @param {String} lockCondition Lock condition identifier.
     * @param {String} nftContractAddress The address of the NFT token to use.
     * @param {String} willBeTransferred Indicates if the asset will be transferred or minted
     * @returns Hash of all the values
     */    
    public hashValuesComplete(
        did: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: number,
        lockCondition: string,
        nftContractAddress: string,
        willBeTransferred: boolean = true
    ) {
        return super.hashValues(
            didZeroX(did),
            zeroX(nftHolder),
            zeroX(nftReceiver),
            String(nftAmount),
            lockCondition,
            zeroX(nftContractAddress),
            willBeTransferred
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
     * @param {String} from
     * @returns Condition state.
     */
    public fulfill(
        agreementId: string,
        did: string,
        nftReceiver: string,
        nftAmount: number,
        lockPaymentCondition: string,
        from?: Account,
        txParams?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [didZeroX(did), zeroX(nftReceiver), String(nftAmount), lockPaymentCondition],
            from,
            txParams
        )
    }

    /**
     * Fulfill the transfer NFT condition.
     *  Only DID owner or DID provider can call this method.
     *
     * @param {String} agreementId The agreement identifier.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} nftHolder The address of the account currently holding the NFT.
     * @param {String} nftReceiver The address of the account to receive the NFT.
     * @param {Number[]} nftAmount amount of NFTs to transfer.
     * @param {String} lockPaymentCondition lock payment condition identifier.
     * @param {String} from
     * @returns Condition state.
     */
    public fulfillForDelegate(
        agreementId: string,
        did: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: number,
        lockPaymentCondition: string,
        transferAsset: boolean = true,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [
                didZeroX(did),
                zeroX(nftHolder),
                zeroX(nftReceiver),
                String(nftAmount),
                lockPaymentCondition,
                transferAsset
            ],
            from,
            params,
            'fulfillForDelegate'
        )
    }
}
