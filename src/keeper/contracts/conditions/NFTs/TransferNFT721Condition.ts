import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, findServiceConditionByName, zeroX } from '../../../../utils'
import {
    Condition,
    ConditionContext,
    ConditionMethod,
    ConditionParameters,
    ProviderCondition
} from '../Condition.abstract'
import Account from '../../../../nevermined/Account'
import { TxParameters } from '../../ContractBase'

export interface TransferNFT721ConditionContext extends ConditionContext {
    consumerId: string
    expiration: number
}

/**
 * Condition allowing to transfer an NFT between the original owner and a receiver
 */
export class TransferNFT721Condition extends ProviderCondition<TransferNFT721ConditionContext> {
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
        willBeTransferred: boolean = true,
        expiration: number = 0
    ): ConditionParameters<Record<string, unknown>> {
        return {
            list: [
                didZeroX(did),
                zeroX(nftHolder),
                zeroX(nftReceiver),
                String(1),
                lockCondition,
                nftTokenAddress,
                willBeTransferred
            ],
            params: async method => {
                if (method === 'fulfill') {
                    return [
                        didZeroX(did),
                        zeroX(nftReceiver),
                        String(1),
                        lockCondition,
                        nftTokenAddress,
                        willBeTransferred
                    ]
                } else if (method === 'fulfillForDelegate') {
                    return [
                        didZeroX(did),
                        zeroX(nftHolder),
                        zeroX(nftReceiver),
                        String(1),
                        lockCondition,
                        willBeTransferred,
                        nftTokenAddress,
                        expiration
                    ]
                }
            }
        }
    }

    public async paramsFromDDO(
        { ddo, service, consumerId, expiration }: TransferNFT721ConditionContext,
        lockCondition
    ) {
        const transfer = findServiceConditionByName(service, 'transferNFT')
        if (!transfer) throw new Error('TransferNFT condition not found!')

        const nft = await this.nevermined.contracts.loadNft721(
            transfer.parameters.find(p => p.name === '_contractAddress').value as string
        )
        const nftHolder = transfer.parameters.find(p => p.name === '_nftHolder')
            .value as string

        const nftTransferString = transfer.parameters.find(p => p.name === '_nftTransfer')
            .value as string
        return this.params(
            ddo.shortId(),
            nftHolder,
            consumerId,
            lockCondition.id,
            nft.address,
            nftTransferString.toLowerCase() === 'true',
            expiration
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
        return super.fulfillPlain(
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

    public gatewayMethod(): ConditionMethod {
        return 'fulfillForDelegate'
    }
}
