import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, findServiceConditionByName, zeroX } from '../../../../utils'
import { Condition, ConditionContext } from '../Condition.abstract'
import Account from '../../../../nevermined/Account'
import { TxParameters } from '../../ContractBase'

export interface TransferNFT721ConditionContext extends ConditionContext {
    consumerId: string
}

/**
 * Condition allowing to transfer an NFT between the original owner and a receiver
 */
export class TransferNFT721Condition extends Condition<TransferNFT721ConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<TransferNFT721Condition> {
        return Condition.getInstance(
            config,
            'TransferNFT721Condition',
            TransferNFT721Condition,
            true
        )
    }

    /**
     * Generates the hash of condition inputs.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} nftReceiver The address of the granted user or the DID provider.
     * @param {String} nftHolder The address of the Holder of the NFT.
     * @param {String} lockCondition Lock condition identifier.
     * @param {String} nftTokenAddress The address of the NFT token to use.
     * @param {String} willBeTransferred Indicates if the asset will be transferred or minted
     * @returns Hash of all the values
     */
    public params(
        did: string,
        nftHolder: string,
        nftReceiver: string,
        lockCondition: string,
        nftTokenAddress: string,
        willBeTransferred: boolean = true
    ) {
        return super.params(
            didZeroX(did),
            zeroX(nftHolder),
            zeroX(nftReceiver),
            String(1),
            lockCondition,
            nftTokenAddress,
            willBeTransferred
        )
    }

    public async paramsFromDDO(
        { ddo, service, consumerId }: TransferNFT721ConditionContext,
        lockCondition
    ) {
        const transfer = findServiceConditionByName(service, 'transferNFT')
        if (!transfer) throw new Error('TransferNFT condition not found!')

        const nft = await this.nevermined.contracts.loadNft721(
            transfer.parameters.find(p => p.name === '_contract').value as string
        )

        const nftOwner = await nft.ownerOf(ddo.id)
        return this.params(
            ddo.shortId(),
            nftOwner,
            consumerId,
            lockCondition.id,
            nft.address,
            true
        )
    }

    /**
     * Fulfill the transfer NFT condition.
     *  Only DID owner or DID provider can call this method.
     *
     * @param {String} agreementId The agreement identifier.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} nftReceiver The address of the account to receive the NFT.
     * @param {String} lockPaymentCondition lock payment condition identifier.
     * @param {String} nftTokenAddress address of the nft token to use.
     * @param {String} willBeTransferred Indicates if the asset will be transferred or minted
     * @param {String} from
     * @returns Condition state.
     */
    public fulfill(
        agreementId: string,
        did: string,
        nftReceiver: string,
        lockPaymentCondition: string,
        nftTokenAddress: string,
        willBeTransferred: boolean = true,
        from?: Account,
        txParams?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [
                didZeroX(did),
                zeroX(nftReceiver),
                String(1),
                lockPaymentCondition,
                nftTokenAddress,
                willBeTransferred
            ],
            from,
            txParams
        )
    }
}
