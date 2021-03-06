import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

/**
 * Agreements Conditions submodule of Nevermined.
 */
export class AgreementsConditions extends Instantiable {
    /**
     * Returns the instance of AgreementsConditions.
     * @return {Promise<AgreementsConditions>}
     */
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AgreementsConditions> {
        const instance = new AgreementsConditions()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Transfers tokens to the EscrowPaymentCondition contract as an escrow payment.
     * This is required before access can be given to the asset data.
     * @param {string}      agreementId Agreement ID.
     * @param {string}      did         The Asset ID.
     * @param {number[]}    amounts     Asset amounts to distribute.
     * @param {string[]}    receivers   Receivers of the rewards
     * @param {Account}     from        Account of sender.
     */
    public async lockPayment(
        agreementId: string,
        did: string,
        amounts: number[],
        receivers: string[],
        from?: Account
    ) {
        const {
            lockPaymentCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions
        const { token } = this.nevermined.keeper
        const totalAmount = amounts.reduce((a, b) => a + b, 0)

        try {
            await this.nevermined.keeper.token.approve(
                lockPaymentCondition.getAddress(),
                totalAmount,
                from && from.getId()
            )

            const receipt = await lockPaymentCondition.fulfill(
                agreementId,
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                amounts,
                receivers,
                from && from.getId()
            )

            return !!receipt.events.Fulfilled
        } catch (err) {
            return false
        }
    }

    /**
     * Authorize the consumer defined in the agreement to access (consume) this asset.
     * @param {string}  agreementId Agreement ID.
     * @param {string}  did         Asset ID.
     * @param {string}  grantee     Consumer address.
     * @param {Account} from        Account of sender.
     */
    public async grantAccess(
        agreementId: string,
        did: string,
        grantee: string,
        from?: Account
    ) {
        try {
            const { accessCondition } = this.nevermined.keeper.conditions

            const receipt = await accessCondition.fulfill(
                agreementId,
                did,
                grantee,
                from && from.getId()
            )
            return !!receipt.events.Fulfilled
        } catch {
            return false
        }
    }

    /**
     * Authorize the consumer defined in the agreement to execute a remote service associated with this asset.
     * @param {string}  agreementId Agreement ID.
     * @param {string}  did         Asset ID.
     * @param {string}  grantee     Consumer address.
     * @param {Account} from        Account of sender.
     */
    public async grantServiceExecution(
        agreementId: string,
        did: string,
        grantee: string,
        from?: Account
    ) {
        try {
            const { computeExecutionCondition } = this.nevermined.keeper.conditions

            const receipt = await computeExecutionCondition.fulfill(
                agreementId,
                did,
                grantee,
                from && from.getId()
            )
            return !!receipt.events.Fulfilled
        } catch {
            return false
        }
    }

    /**
     * Transfer the escrow or locked tokens from the LockPaymentCondition contract to the publisher's account.
     * This should be allowed after access has been given to the consumer and the asset data is downloaded.
     *
     * If the AccessCondition already timed out, this function will do a refund by transferring
     * the token amount to the original consumer.
     * @param {string}  agreementId Agreement ID.
     * @param {number[]}  amounts   Asset amounts to distribute.
     * @param {string[]} receivers Receivers of the rewards
     * @param {string}  did         Asset ID.
     * @param {string}  consumer    Consumer address.
     * @param {string}  publisher   Publisher address.
     * @param {Account} from        Account of sender.
     */
    public async releaseReward(
        agreementId: string,
        amounts: number[],
        receivers: string[],
        did: string,
        consumer: string,
        publisher: string,
        from?: Account
    ) {
        try {
            const {
                escrowPaymentCondition,
                accessCondition,
                lockPaymentCondition
            } = this.nevermined.keeper.conditions
            const { token } = this.nevermined.keeper

            const totalAmount = amounts.reduce((a, b) => a + b, 0)

            const conditionIdAccess = await accessCondition.generateIdHash(
                agreementId,
                did,
                consumer
            )
            const conditionIdLock = await lockPaymentCondition.generateIdHash(
                agreementId,
                escrowPaymentCondition.getAddress(),
                totalAmount
            )

            const receipt = await escrowPaymentCondition.fulfill(
                agreementId,
                did,
                amounts,
                receivers,
                publisher,
                token.getAddress(),
                conditionIdLock,
                conditionIdAccess,
                from && from.getId()
            )
            return !!receipt.events.Fulfilled
        } catch {
            return false
        }
    }

    /**
     * Releases the payment in escrow to the provider(s) of the sale
     *
     * @param {String} agreementId The service agreement id for the nft sale.
     * @param {String} did The decentralized identifier of the asset containing the nfts.
     * @param {Number[]} amounts The amounts that should have been payed.
     * @param {String[]} receivers The addresses that should receive the amounts.
     * @param {String} nftReceiver The address of the buyer of the nft.
     * @param {Number} nftAmount Number of nfts bought.
     * @param from
     * @returns {Boolean} True if the funds were released successfully.
     */
    public async releaseNftReward(
        agreementId: string,
        did: string,
        amounts: number[],
        receivers: string[],
        nftReceiver: string,
        nftAmount: number,
        from?: Account
    ) {
        const {
            escrowPaymentCondition,
            lockPaymentCondition,
            transferNftCondition
        } = this.nevermined.keeper.conditions
        const { token } = this.nevermined.keeper

        const lockPaymentConditionId = await lockPaymentCondition.generateId(
            agreementId,
            await lockPaymentCondition.hashValues(
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                amounts,
                receivers
            )
        )

        const transferNftConditionId = await transferNftCondition.generateId(
            agreementId,
            await transferNftCondition.hashValues(
                did,
                nftReceiver,
                nftAmount,
                lockPaymentConditionId
            )
        )

        const receipt = await escrowPaymentCondition.fulfill(
            agreementId,
            did,
            amounts,
            receivers,
            escrowPaymentCondition.getAddress(),
            token.getAddress(),
            lockPaymentConditionId,
            transferNftConditionId,
            from.getId()
        )
        return !!receipt.events.Fulfilled
    }

    /**
     * Allows an nft holder to prove ownership of a certain number of nfts.
     * Used as an access condition to the underlying files.
     *
     * @param {String} agreementId The service agreement id of the nft transfer.
     * @param {String} did The decentralized identifier of the asset containing the nfts.
     * @param {String} holder The address of the holder (recipient of a previous nft transfer with `agreementId`).
     * @param {String} nftAmount The amount of nfts that the `holder` needs to have to fulfill the access condition.
     * @param from
     * @returns {Boolean} True if the holder is able to fulfill the condition
     */
    public async holderNft(
        agreementId: string,
        did: string,
        holder: string,
        nftAmount: number,
        from?: Account
    ) {
        const { nftHolderCondition } = this.nevermined.keeper.conditions

        const receipt = await nftHolderCondition.fulfill(
            agreementId,
            did,
            holder,
            nftAmount,
            from && from.getId()
        )
        return !!receipt.events.Fulfilled
    }

    /**
     * Fulfills the access condition required to give access to the underliying files of an nft.
     *
     * @param {String} agreementId The service agreement id of the nft transfer.
     * @param {String} did The decentralized identifier of the asset containing the nfts.
     * @param {String} grantee The address of the user trying to get access to the files.
     * @param from
     * @returns True if the provider is able to fulfill the condition
     */
    public async grantNftAccess(
        agreementId: string,
        did: string,
        grantee: string,
        from?: string
    ) {
        const { nftAccessCondition } = this.nevermined.keeper.conditions

        const receipt = await nftAccessCondition.fulfill(agreementId, did, grantee, from)
        return !!receipt.events.Fulfilled
    }

    /**
     * Transfers a certain amount of nfts after payment as been made.
     *
     * @param {String} agreementId The service agreement id of the nft transfer.
     * @param {String} did he decentralized identifier of the asset containing the nfts.
     * @param {Number[]} amounts The expected that amounts that should have been payed.
     * @param {String[]} receivers The addresses of the expected receivers of the payment.
     * @param {String} nftReceiver The address of the receiver of the nfts.
     * @param {Number} nftAmount The amount of nfts to transfer.
     * @param from
     * @returns {Boolean} True if the transfer is successfull
     */
    public async transferNft(
        agreementId: string,
        did: string,
        amounts: number[],
        receivers: string[],
        nftReceiver: string,
        nftAmount: number,
        from?: Account
    ) {
        const {
            transferNftCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions
        const { token } = this.nevermined.keeper

        const lockPaymentConditionId = await lockPaymentCondition.generateId(
            agreementId,
            await lockPaymentCondition.hashValues(
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                amounts,
                receivers
            )
        )

        const receipt = await transferNftCondition.fulfill(
            agreementId,
            did,
            nftReceiver,
            nftAmount,
            lockPaymentConditionId,
            from.getId()
        )

        return !!receipt.events.Fulfilled
    }
}
