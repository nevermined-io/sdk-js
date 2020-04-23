import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

/**
 * Agreements Conditions submodule of Ocean Protocol.
 */
export class OceanAgreementsConditions extends Instantiable {
    /**
     * Returns the instance of OceanAgreementsConditions.
     * @return {Promise<OceanAgreementsConditions>}
     */
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<OceanAgreementsConditions> {
        const instance = new OceanAgreementsConditions()
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
        const { lockRewardCondition, escrowReward } = this.ocean.keeper.conditions

        try {
            await this.ocean.keeper.token.approve(
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
            const { accessSecretStoreCondition } = this.ocean.keeper.conditions

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
            const { computeExecutionCondition } = this.ocean.keeper.conditions

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
     * @param {number}  amount      Asset amount.
     * @param {string}  did         Asset ID.
     * @param {string}  consumer    Consumer address.
     * @param {string}  publisher   Publisher address.
     * @param {Account} from        Account of sender.
     */
    public async releaseReward(
        agreementId: string,
        amount: number,
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
            } = this.ocean.keeper.conditions

            const conditionIdAccess = await accessSecretStoreCondition.generateIdHash(
                agreementId,
                did,
                consumer
            )
            const conditionIdLock = await lockRewardCondition.generateIdHash(
                agreementId,
                escrowReward.getAddress(),
                amount
            )

            const receipt = await escrowReward.fulfill(
                agreementId,
                amount,
                publisher,
                consumer,
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
