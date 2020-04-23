import { generateId } from '../utils/GeneratorHelpers'
import Account from './Account'
import DID from './DID'
import { zeroX, didPrefixed } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { AgreementConditionsStatus } from '../keeper/contracts/templates/AgreementTemplate.abstract'
import { ConditionState } from '../keeper/contracts/conditions/Condition.abstract'

import { OceanAgreementsConditions } from './OceanAgreementsConditions'

export interface AgreementPrepareResult {
    agreementId: string
    signature: string
}

/**
 * Agreements submodule of Ocean Protocol.
 */
export class OceanAgreements extends Instantiable {
    /**
     * Returns the instance of OceanAgreements.
     * @return {Promise<OceanAgreements>}
     */
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<OceanAgreements> {
        const instance = new OceanAgreements()
        instance.setInstanceConfig(config)
        instance.conditions = await OceanAgreementsConditions.getInstance(config)

        return instance
    }

    /**
     * Agreements Conditions submodule.
     * @type {OceanAgreementsConditions}
     */
    public conditions: OceanAgreementsConditions

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
        const ddo = await this.ocean.aquarius.retrieveDDO(d)
        const agreementId: string = zeroX(generateId())

        const templateName = ddo.findServiceByType('access').attributes
            .serviceAgreementTemplate.contractName
        const agreementConditionsIds = await this.ocean.keeper
            .getTemplateByName(templateName)
            .getAgreementIdsFromDDO(agreementId, ddo, consumer.getId(), consumer.getId())

        const signature = await this.ocean.utils.agreements.signServiceAgreement(
            ddo,
            index,
            agreementId,
            agreementConditionsIds,
            consumer
        )

        return { agreementId, signature }
    }

    /**
     * Submit a service agreement to the publisher to create the agreement on-chain.
     * @param  {string} did Decentralized ID.
     * @param  {number} index Service index.
     * @param  {Account} consumer Consumer account.
     * @return {Promise<void>}
     */
    public async send(
        did: string,
        agreementId: string,
        index: number,
        signature: string,
        consumer: Account
    ): Promise<void> {
        const result = await this.ocean.brizo.initializeServiceAgreement(
            didPrefixed(did),
            zeroX(agreementId),
            index,
            zeroX(signature),
            consumer.getId()
        )

        if (!result.ok) {
            throw new Error('Error on initialize agreement: ' + (await result.text()))
        }
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
        signature: string,
        consumer: Account,
        publisher: Account
    ) {
        const d: DID = DID.parse(did)
        const ddo = await this.ocean.aquarius.retrieveDDO(d)

        const templateName = ddo.findServiceById<'access'>(index).attributes
            .serviceAgreementTemplate.contractName
        await this.ocean.keeper
            .getTemplateByName(templateName)
            .createAgreementFromDDO(agreementId, ddo, consumer.getId(), publisher.getId())

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
        const { templateId } = await this.ocean.keeper.agreementStoreManager.getAgreement(
            agreementId
        )
        const fullStatus = await this.ocean.keeper
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
}
