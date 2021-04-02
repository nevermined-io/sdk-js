import { generateId } from '../utils/GeneratorHelpers'
import Account from './Account'
import DID from './DID'
import { zeroX, didPrefixed, getAssetRewardsFromDDO } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { AgreementConditionsStatus } from '../keeper/contracts/templates/AgreementTemplate.abstract'
import { ConditionState } from '../keeper/contracts/conditions/Condition.abstract'

import { AgreementsConditions } from './AgreementsConditions'

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
     * @param  {number} index Service index.
     * @param  {Account} consumer Consumer account.
     * @return {Promise<AgreementPrepareResult>} Agreement ID and signaturee.
     */
    public async prepare(
        did: string,
        index: number,
        consumer: Account
    ): Promise<AgreementPrepareResult> {
        const d: DID = DID.parse(did as string)
        const ddo = await this.nevermined.metadata.retrieveDDO(d)
        const agreementId: string = zeroX(generateId())

        const templateName = ddo.findServiceByType('access').attributes
            .serviceAgreementTemplate.contractName
        const assetRewards = getAssetRewardsFromDDO(ddo, index)

        const agreementConditionsIds = await this.nevermined.keeper
            .getTemplateByName(templateName)
            .getAgreementIdsFromDDO(agreementId, ddo, assetRewards, consumer.getId(), consumer.getId())

        const signature = await this.nevermined.utils.agreements.signServiceAgreement(
            ddo,
            index,
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
     * @param  {number} index Service index.
     * @param  {string} signature Service agreement signature.
     * @param  {Account} consumer Consumer account.
     * @param  {Account} publisher Publisher account.
     * @return {Promise<boolean>}
     */
    public async create(
        did: string,
        agreementId: string,
        index: number,
        consumer: Account,
        publisher: Account
    ) {
        const d: DID = DID.parse(did)
        const ddo = await this.nevermined.metadata.retrieveDDO(d)

        const templateName = ddo.findServiceById<'access'>(index).attributes
            .serviceAgreementTemplate.contractName
        const assetRewards = getAssetRewardsFromDDO(ddo, index)

        await this.nevermined.keeper
            .getTemplateByName(templateName)
            .createAgreementFromDDO(agreementId, ddo, assetRewards, consumer.getId(), publisher.getId())

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

    public async isAccessGranted(agreementId: string, did: string, consumer: string, account: Account): Promise<boolean> {
        const consumerAddress = this.nevermined.keeper.templates.accessTemplate.getAgreementData(agreementId)[0]
        if(!consumer.includes(consumerAddress)){
            console.log(`This address [${consumer}] has not access granted`)
            return false
        }
        return await this.nevermined.keeper.conditions.accessSecretStoreCondition.checkPermissions(consumerAddress, did, account.getId())
    }
}
