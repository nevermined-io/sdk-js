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
        const { lockPaymentCondition, escrowPaymentCondition } = this.nevermined.keeper.conditions
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
                amounts,
                receivers,
                from && from.getId(),
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
                conditionIdLock,
                conditionIdAccess,
                from && from.getId()
            )
            return !!receipt.events.Fulfilled
        } catch {
            return false
        }
    }
}
