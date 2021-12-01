import { generateId } from '../utils/GeneratorHelpers'
import Account from './Account'
import DID from './DID'
import { zeroX, getAssetRewardsFromDDOByService } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { AgreementConditionsStatus } from '../keeper/contracts/templates/AgreementTemplate.abstract'
import { ConditionState } from '../keeper/contracts/conditions/Condition.abstract'

import { AgreementsConditions } from './AgreementsConditions'
import { ServiceType } from '../ddo/Service'

export interface AgreementPrepareResult {
    agreementId: string
    signature: string
}

/**
 * Agreements submodule of Nevermined.
 */
export class Agreements extends Instantiable {
    /**
     * Returns the instance of Agreements.
     * @return {Promise<Agreements>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Agreements> {
        const instance = new Agreements()
        instance.setInstanceConfig(config)
        instance.conditions = await AgreementsConditions.getInstance(config)

        return instance
    }

    /**
     * Agreements Conditions submodule.
     * @type {AgreementsConditions}
     */
    public conditions: AgreementsConditions

    /**
     * Creates a consumer signature for the specified asset service.
     * @param  {string} did Decentralized ID.
     * @param  {ServiceType} serviceType Service.
     * @param  {Account} consumer Consumer account.
     * @return {Promise<AgreementPrepareResult>} Agreement ID and signaturee.
     */
    public async prepare(
        did: string,
        serviceType: ServiceType,
        consumer: Account
    ): Promise<AgreementPrepareResult> {
        const d: DID = DID.parse(did as string)
        const ddo = await this.nevermined.metadata.retrieveDDO(d)
        const agreementId: string = zeroX(generateId())

        const templateName = ddo.findServiceByType('access').attributes
            .serviceAgreementTemplate.contractName
        const assetRewards = getAssetRewardsFromDDOByService(ddo, serviceType)

        const agreementConditionsIds = await this.nevermined.keeper
            .getTemplateByName(templateName)
            .getAgreementIdsFromDDO(
                agreementId,
                ddo,
                assetRewards,
                consumer.getId(),
                consumer
            )

        const signature = await this.nevermined.utils.agreements.signServiceAgreement(
            ddo,
            serviceType,
            agreementId,
            agreementConditionsIds,
            consumer
        )

        return { agreementId, signature }
    }

    /**
     * Create a service agreement on-chain. This should be called by the publisher of the asset.
     * Consumer signature will be verified on-chain, but it is recommended to verify the signature
     * in this method before submitting on-chain.
     * @param  {string} did Decentralized ID.
     * @param  {string} agreementId Service agreement ID.
     * @param  {ServiceType} serviceType Service.
     * @param  {Account} consumer Consumer account.
     * @param  {Account} publisher Publisher account.
     * @return {Promise<boolean>}
     */
    public async create(
        did: string,
        agreementId: string,
        serviceType: ServiceType,
        consumer: Account,
        publisher: Account
    ) {
        const ddo = await this.nevermined.assets.resolve(did)

        const templateName = ddo.findServiceByType(serviceType).attributes
            .serviceAgreementTemplate.contractName
        const assetRewards = getAssetRewardsFromDDOByService(ddo, serviceType)

        await this.nevermined.keeper
            .getTemplateByName(templateName)
            .createAgreementFromDDO(agreementId, ddo, assetRewards, consumer, publisher)

        return true
    }

    /**
     * Get the status of a service agreement.
     * @param  {string} agreementId Service agreement ID.
     * @param  {boolean} extended Returns a complete status with dependencies.
     * @return {Promise<any>}
     */
    public async status(
        agreementId: string,
        extended?: false
    ): Promise<{ [condition: string]: ConditionState }>

    public async status(
        agreementId: string,
        extended: true
    ): Promise<AgreementConditionsStatus>

    public async status(agreementId: string, extended: boolean = false) {
        const {
            templateId
        } = await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        const fullStatus = await this.nevermined.keeper
            .getTemplateByAddress(templateId)
            .getAgreementStatus(agreementId)

        if (!fullStatus) {
            return
        }
        if (extended) {
            return fullStatus
        }
        const simpleStatus = {}
        Object.entries(fullStatus).forEach(([condition, { state }]) => {
            simpleStatus[condition] = state
        })
        return simpleStatus as any
    }

    public async getAgreement(agreementId: string) {
        return this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
    }

    public async getAgreements(did: string) {
        return this.nevermined.keeper.agreementStoreManager.getAgreements(did)
    }

    public async isAccessGranted(
        agreementId: string,
        did: string,
        consumer: string,
        account: Account
    ): Promise<boolean> {
        const {
            accessConsumer
        } = await this.nevermined.keeper.templates.accessTemplate.getAgreementData(
            agreementId
        )
        if (!consumer.includes(accessConsumer)) {
            this.logger.log(`This address [${consumer}] has not access granted`)
            return false
        }
        return await this.nevermined.keeper.conditions.accessCondition.checkPermissions(
            accessConsumer,
            did,
            account
        )
    }
}
