import ContractBase, { TxParameters } from '../ContractBase'
import { Condition, ConditionState, conditionStateNames } from '../conditions'
import { DDO } from '../../../ddo/DDO'
import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import Account from '../../../nevermined/Account'
import { BabyjubPublicKey } from '../../../models/KeyTransfer'
import { Service } from '../../../ddo/Service'

export interface AgreementConditionsStatus {
    [condition: string]: {
        condition: string
        contractName: string
        state: ConditionState
        blocked: boolean
        blockedBy: string[]
    }
}

export abstract class AgreementTemplate extends ContractBase {
    public static async getInstance(
        config: InstantiableConfig,
        conditionName: string,
        templateClass: any,
        optional: boolean = false
    ): Promise<AgreementTemplate & any> {
        const condition: AgreementTemplate = new (templateClass as any)(conditionName)
        await condition.init(config, optional)
        return condition
    }

    protected constructor(contractName: string) {
        super(contractName)
    }

    public createAgreement(
        agreementId: string,
        did: string,
        conditionIds: string[],
        timeLocks: number[],
        timeOuts: number[],
        ...args: any[]
    )

    public createAgreement(
        agreementId: string,
        did: string,
        conditionIds: string[],
        timeLocks: number[],
        timeOuts: number[],
        extraArgs: any[],
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom(
            'createAgreement',
            [
                zeroX(agreementId),
                zeroX(did),
                conditionIds.map(zeroX),
                timeLocks,
                timeOuts,
                ...extraArgs
            ],
            from,
            params
        )
    }

    /**
     * Conditions address list.
     * @return {Promise<string[]>} Conditions address.
     */
    public getConditionTypes(): Promise<string[]> {
        return this.call('getConditionTypes', [])
    }

    /**
     * List of condition contracts.
     * @return {Promise<Condition[]>} Conditions contracts.
     */
    public async getConditions(): Promise<Condition[]> {
        return (await this.getConditionTypes()).map(address =>
            this.nevermined.keeper.getConditionByAddress(address)
        )
    }

    /**
     * Get agreement conditions IDs.
     * @param  {string}            agreementId Agreement ID.
     * @param  {DDO}               ddo         DDO.
     * @param  {AssetRewards}      assetRewards Asset Rewards distribution
     * @param  parameters
     * @return {Promise<string[]>}             Condition IDs.
     */
    public abstract getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        ...parameters: (string | number | Account | BabyjubPublicKey | Service)[]
    ): Promise<string[]>

    /**
     * Create a new agreement using the data of a DDO.
     * @param  {string}            agreementId Agreement ID.
     * @param  {DDO}               ddo         DDO.
     * @param  {AssetRewards}      assetRewards Asset Rewards distribution
     * @param  parameters
     * @return {Promise<boolean>}              Success.
     */
    public abstract createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        ...parameters: (
            | string
            | number
            | Account
            | BabyjubPublicKey
            | Service
            | TxParameters
        )[]
    ): Promise<boolean>

    public abstract getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate>

    public async getServiceAgreementTemplateConditions() {
        const serviceAgreementTemplate = await this.getServiceAgreementTemplate()
        return serviceAgreementTemplate.conditions
    }

    public async getServiceAgreementTemplateConditionByRef(ref: string) {
        const name = (await this.getServiceAgreementTemplateConditions()).find(
            ({ name: conditionRef }) => conditionRef === ref
        ).contractName
        return (await this.getConditions()).find(
            condition => condition.contractName === name
        )
    }

    public async getServiceAgreementTemplateDependencies() {
        const serviceAgreementTemplate = await this.getServiceAgreementTemplate()
        return serviceAgreementTemplate.conditionDependency
    }

    /**
     * Returns the status of the conditions.
     * @param  {string}  agreementId Agreement ID.
     * @return {Promise}             Conditions status.
     */
    public async getAgreementStatus(
        agreementId: string
    ): Promise<AgreementConditionsStatus | false> {
        const agreementStore = this.nevermined.keeper.agreementStoreManager
        const conditionStore = this.nevermined.keeper.conditionStoreManager

        const dependencies = await this.getServiceAgreementTemplateDependencies()
        const { conditionIds } = await agreementStore.getAgreement(agreementId)

        if (!conditionIds.length) {
            this.logger.error(`Agreement not created yet: "${agreementId}"`)
            return false
        }

        const conditionIdByConddition = (await this.getConditions()).reduce(
            (acc, { contractName }, i) => ({
                ...acc,
                [contractName]: conditionIds[i]
            }),
            {}
        )

        const statesPromises = Object.keys(dependencies).map(async (ref, i) => {
            const { contractName } = await this.getServiceAgreementTemplateConditionByRef(
                ref
            )
            return {
                ref,
                contractName,
                state: (
                    await conditionStore.getCondition(
                        conditionIdByConddition[contractName]
                    )
                ).state
            }
        })
        const states = await Promise.all(statesPromises)

        return states.reduce((acc, { contractName, ref, state }) => {
            const blockers = dependencies[ref]
                .map(dependency => states.find(_ => _.ref === dependency))
                .filter(condition => condition.state !== ConditionState.Fulfilled)
            return {
                ...acc,
                [ref]: {
                    condition: ref,
                    contractName,
                    state,
                    blocked: !!blockers.length,
                    blockedBy: blockers.map(_ => _.ref)
                }
            }
        }, {})
    }

    /**
     * Prints the agreement status.
     * @param {string} agreementId Agreement ID.
     */
    public async printAgreementStatus(agreementId: string) {
        const status = await this.getAgreementStatus(agreementId)

        this.logger.bypass('-'.repeat(80))
        this.logger.bypass('Template:', this.contractName)
        this.logger.bypass('Agreement ID:', agreementId)
        this.logger.bypass('-'.repeat(40))
        if (!status) {
            this.logger.bypass('Agreement not created yet!')
        }
        Object.values(status || []).forEach(
            ({ condition, contractName, state, blocked, blockedBy }, i) => {
                if (i) {
                    this.logger.bypass('-'.repeat(20))
                }
                this.logger.bypass(`${condition} (${contractName})`)
                this.logger.bypass('  Status:', state, `(${conditionStateNames[state]})`)
                if (blocked) {
                    this.logger.bypass('  Blocked by:', blockedBy)
                }
            }
        )
        this.logger.bypass('-'.repeat(80))
    }

    /**
     * Generates and returns the agreement creation event.
     * @param  {string} agreementId Agreement ID.
     * @return {Event}              Agreement created event.
     */
    public getAgreementCreatedEvent(agreementId: string) {
        return this.getEvent('AgreementCreated', {
            agreementId: zeroX(agreementId)
        })
    }
}
