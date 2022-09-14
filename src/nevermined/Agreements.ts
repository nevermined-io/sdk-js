import { generateId } from '../utils/GeneratorHelpers'
import Account from './Account'
import DID from './DID'
import { zeroX } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { AgreementsConditions } from './AgreementsConditions'
import { ServiceType } from '../ddo/Service'
import { TxParameters } from '../keeper/contracts/ContractBase'

export interface AgreementPrepareResult {
    agreementIdSeed: string
    signature: string
}

/**
 * Agreements submodule of Nevermined.
 */
export class Agreements extends Instantiable {
    /**
     * Returns the instance of Agreements.
     * @returns {@link Agreements}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Agreements> {
        const instance = new Agreements()
        instance.setInstanceConfig(config)
        instance.conditions = await AgreementsConditions.getInstance(config)

        return instance
    }

    /**
     * Agreements Conditions submodule.
     */
    public conditions: AgreementsConditions

    /**
     * Creates a consumer signature for the specified asset service.
     *
     * @privateRemarks
     * TODO: Only works for access service?
     *
     * @param did - Decentralized ID.
     * @param serviceType - Service.
     * @param  consumer - Consumer account.
     * @returns The agreement ID and signature.
     */
    public async prepare(
        did: string,
        serviceType: ServiceType,
        consumer: Account
    ): Promise<AgreementPrepareResult> {
        const d: DID = DID.parse(did as string)
        const ddo = await this.nevermined.metadata.retrieveDDO(d)
        const agreementIdSeed: string = zeroX(generateId())

        const { accessTemplate } = this.nevermined.keeper.templates
        const agreementConditionsIds =
            await this.nevermined.keeper.templates.accessTemplate.getAgreementIdsFromDDO(
                agreementIdSeed,
                ddo,
                consumer.getId(),
                accessTemplate.params(consumer)
            )

        const signature = await this.nevermined.utils.agreements.signServiceAgreement(
            ddo,
            serviceType,
            agreementIdSeed,
            agreementConditionsIds,
            consumer
        )

        return { agreementIdSeed, signature }
    }

    /**
     * Create a service agreement on-chain. This should be called by the publisher of the asset.
     *
     * @remarks
     * Consumer signature will be verified on-chain, but it is recommended to verify the signature
     * in this method before submitting on-chain.
     *
     * @param did -  Decentralized ID.
     * @param agreementId - Service agreement ID.
     * @param serviceType - Service.
     * @param consumer - Consumer account.
     * @param publisher - Publisher account.
     * @returns
     */
    public async create(
        did: string,
        agreementIdSeed: string,
        serviceType: ServiceType,
        agreementParams: any,
        consumer: Account,
        publisher: Account,
        params?: TxParameters
    ) {
        const ddo = await this.nevermined.assets.resolve(did)

        const templateName =
            ddo.findServiceByType(serviceType).attributes.serviceAgreementTemplate
                .contractName

        const agreementId = await this.nevermined.keeper
            .getTemplateByName(templateName)
            .createAgreementFromDDO(
                agreementIdSeed,
                ddo,
                agreementParams,
                consumer,
                publisher,
                undefined,
                params
            )

        return agreementId
    }

    /**
     * Get the status of a service agreement.
     * @param agreementId - Service agreement ID.
     * @param extended - Returns a complete status with dependencies.
     * @returns
     */
    public async status(agreementId: string, extended: boolean = false) {
        const { templateId } =
            await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
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
        const { accessConsumer } =
            await this.nevermined.keeper.templates.accessTemplate.getAgreementData(
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
