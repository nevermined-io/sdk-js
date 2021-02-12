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
     * Transfers tokens to the EscrowRewardCondition contract as an escrow payment.
     * This is required before access can be given to the asset data.
     * @param {string}  agreementId Agreement ID.
     * @param {number}  amount      Asset amount.
     * @param {Account} from        Account of sender.
     */
    public async lockReward(
        agreementId: string,
        amount: number | string,
        from?: Account
    ) {
        const { lockRewardCondition, escrowReward } = this.nevermined.keeper.conditions

        try {
            await this.nevermined.keeper.token.approve(
                lockRewardCondition.getAddress(),
                amount,
                from.getId()
            )

            const receipt = await lockRewardCondition.fulfill(
                agreementId,
                escrowReward.getAddress(),
                amount,
                from && from.getId()
            )

            return !!receipt.events.Fulfilled
        } catch {
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
            const { accessSecretStoreCondition } = this.nevermined.keeper.conditions

            const receipt = await accessSecretStoreCondition.fulfill(
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
     * Transfer the escrow or locked tokens from the LockRewardCondition contract to the publisher's account.
     * This should be allowed after access has been given to the consumer and the asset data is downloaded.
     *
     * If the AccessSecretStoreCondition already timed out, this function will do a refund by transferring
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
                escrowReward,
                accessSecretStoreCondition,
                lockRewardCondition
            } = this.nevermined.keeper.conditions

            const totalAmount = amounts.reduce((a, b) => a + b, 0)

            const conditionIdAccess = await accessSecretStoreCondition.generateIdHash(
                agreementId,
                did,
                consumer
            )
            const conditionIdLock = await lockRewardCondition.generateIdHash(
                agreementId,
                escrowReward.getAddress(),
                totalAmount
            )

            const receipt = await escrowReward.fulfill(
                agreementId,
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
