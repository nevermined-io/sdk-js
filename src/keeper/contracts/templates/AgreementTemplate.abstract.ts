import ContractBase, { TxParameters } from '../ContractBase'
import { ConditionContext, ConditionInstanceSmall, ConditionSmall, ConditionState, conditionStateNames } from '../conditions'
import { DDO } from '../../../ddo/DDO'
import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { didZeroX, findServiceConditionByName, getAssetRewardsFromService, OrderProgressStep, ZeroAddress, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import Account from '../../../nevermined/Account'
import { BabyjubPublicKey } from '../../../models/KeyTransfer'
import { Service, ServiceType } from '../../../ddo/Service'
import BigNumber from 'bignumber.js'
import Token from '../Token'
import CustomToken from '../CustomToken'

export interface AgreementConditionsStatus {
    [condition: string]: {
        condition: string
        contractName: string
        state: ConditionState
        blocked: boolean
        blockedBy: string[]
    }
}

export type ParameterType = (
    | string
    | number
    | number[]
    | Account
    | BabyjubPublicKey
    | Service
    | ServiceType
    | TxParameters
)

export interface AgreementInstance<Params> {
    list: Params
    agreementId: string
    instances: ConditionInstanceSmall[]
}

export interface PaymentData {
    rewardAddress: string
    tokenAddress: string
    amounts: BigNumber[]
    receivers: string[]
}

export abstract class AgreementTemplate<Params> extends ContractBase {
    public static async getInstance<Params>(
        config: InstantiableConfig,
        templateContractName: string,
        templateClass: any,
        optional: boolean = false
    ): Promise<AgreementTemplate<Params> & any> {
        const agreementTemplate: AgreementTemplate<Params> = new (templateClass as any)(
            templateContractName
        )
        await agreementTemplate.init(config, optional)
        return agreementTemplate
    }

    protected constructor(contractName: string) {
        super(contractName)
    }

    public abstract params(...args: any[]): Params

    public paymentData(service: Service): PaymentData {
        const assetRewards = getAssetRewardsFromService(service)
        const payment = findServiceConditionByName(service, 'lockPayment')
        if (!payment) throw new Error('Payment Condition not found!')
        return {
            rewardAddress: this.nevermined.keeper.conditions.escrowPaymentCondition.getAddress(),
            tokenAddress: payment.parameters.find(p => p.name === '_tokenAddress').value as string,
            amounts: assetRewards.getAmounts(),
            receivers: assetRewards.getReceivers()
        }
    }

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
                didZeroX(did),
                conditionIds.map(zeroX),
                timeLocks,
                timeOuts,
                ...extraArgs
            ],
            from,
            params
        )
    }

    public createAgreementAndPay(
        agreementId: string,
        did: string,
        conditionIds: string[],
        timeLocks: number[],
        timeOuts: number[],
        accessConsumer: string,
        condIdx: number,
        rewardAddress: string,
        tokenAddress: string,
        amounts: BigNumber[],
        receivers: string[],
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom(
            'createAgreementAndPayEscrow',
            [
                zeroX(agreementId),
                didZeroX(did),
                conditionIds.map(zeroX),
                timeLocks,
                timeOuts,
                accessConsumer,
                condIdx,
                rewardAddress,
                tokenAddress,
                amounts.map(a => a.toFixed()),
                receivers
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
    public async getConditions(): Promise<ConditionSmall[]> {
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
     public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        creator: string,
        params: Params
    ): Promise<string[]> {
        const { instances } = await this.instanceFromDDO(agreementId, ddo, creator, params)
        return instances.map(a => a.id)
    }

    public abstract instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: Params
    ): Promise<AgreementInstance<Params>>

    public abstract service(): ServiceType

    public standardContext(ddo: DDO, creator: string): ConditionContext {
        const service = ddo.findServiceByType(this.service())
        const rewards = getAssetRewardsFromService(service)
        return { ddo, service, rewards, creator }
    }

    public async agreementId(agreementIdSeed: string, creator: string): Promise<string> {
        return await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            creator
        )
    }
    /**
     * Create a new agreement using the data of a DDO.
     * @param  {string}            agreementId Agreement ID.
     * @param  {DDO}               ddo         DDO.
     * @param  {AssetRewards}      assetRewards Asset Rewards distribution
     * @param  parameters
     * @return {Promise<boolean>}              Success.
     */
     public async createAgreementFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        parameters: Params,
        consumer: Account,
        from: Account,
        timeOuts?: number[],
        params?: TxParameters
    ): Promise<string> {
        const {
            agreementId,
            instances,
        } = await this.instanceFromDDO(
            agreementIdSeed,
            ddo,
            from.getId(),
            parameters
        )

        await this.createAgreement(
            agreementIdSeed,
            ddo.shortId(),
            instances.map(a => a.seed),
            instances.map(_ => 0),
            timeOuts ? timeOuts : instances.map(_ => 0),
            [consumer.getId()],
            from,
            params
        )

        return zeroX(agreementId)
    }

    public async createAgreementWithPaymentFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        parameters: Params,
        consumer: Account,
        from: Account,
        timeOuts?: number[],
        txParams?: TxParameters,
        observer?: (OrderProgressStep) => void
    ): Promise<string> {
        observer = observer ? observer : _ => {}

        const {
            instances,
            agreementId,
        } = await this.instanceFromDDO(
            agreementIdSeed,
            ddo,
            from.getId(),
            parameters
        )

        const service = ddo.findServiceByType(this.service())
        const assetRewards = getAssetRewardsFromService(service)
        const payment = findServiceConditionByName(service, 'lockPayment')
        if (!payment) throw new Error('Payment Condition not found!')
        const rewardAddress = this.nevermined.keeper.conditions.escrowPaymentCondition.getAddress()
        const tokenAddress = payment.parameters.find(p => p.name === '_tokenAddress').value as string
        const amounts = assetRewards.getAmounts()
        const receivers = assetRewards.getReceivers()

        observer(OrderProgressStep.ApprovingPayment)
        await this.lockTokens(tokenAddress, amounts, from, txParams)
        observer(OrderProgressStep.ApprovedPayment)

        const totalAmount = AssetRewards.sumAmounts(amounts)
        const value =
            tokenAddress && tokenAddress.toLowerCase() === ZeroAddress
                ? totalAmount.toFixed()
                : undefined

        observer(OrderProgressStep.CreatingAgreement)
        await this.createAgreementAndPay(
            agreementIdSeed,
            ddo.shortId(),
            instances.map(a => a.seed),
            instances.map(_ => 0),
            timeOuts ? timeOuts : instances.map(_ => 0),
            consumer.getId(),
            1,
            rewardAddress,
            tokenAddress,
            amounts,
            receivers,
            from,
            { ...txParams, value }
        )
        observer(OrderProgressStep.AgreementInitialized)

        return agreementId
    }

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

    public async lockTokens(
        tokenAddress,
        amounts,
        from: Account,
        txParams: TxParameters
    ): Promise<void> {
        let token: Token

        const { lockPaymentCondition } = this.nevermined.keeper.conditions

        if (!tokenAddress) {
            ;({ token } = this.nevermined.keeper)
        } else if (tokenAddress.toLowerCase() !== ZeroAddress) {
            token = await CustomToken.getInstanceByAddress(
                {
                    nevermined: this.nevermined,
                    web3: this.web3,
                    logger: this.logger,
                    config: this.config
                },
                tokenAddress
            )
        }

        const totalAmount = AssetRewards.sumAmounts(amounts)

        if (token) {
            this.logger.debug('Approving tokens', totalAmount)
            await token.approve(
                lockPaymentCondition.getAddress(),
                totalAmount,
                from,
                txParams
            )
        }
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
    public async getAgreementCreatedEvent(agreementId: string) {
        const res = await this.events.once(events => events, {
            eventName: 'AgreementCreated',
            methodName: 'getAgreementCreateds',
            filterJsonRpc: {
                _agreementId: zeroX(agreementId)
            },
            filterSubgraph: {
                where: {
                    _agreementId: zeroX(agreementId)
                }
            },
            result: {
                _agreementId: true,
                _did: true,
                _accessConsumer: true,
                _accessProvider: true,
                _conditionIds: true,
                _conditionIdSeeds: true,
                _timeLocks: true,
                _timeOuts: true
            }
        })
        return res
    }
    public async getAgreementsForDID(did: string): Promise<string[]> {
        const res = await this.events.getPastEvents({
            eventName: 'AgreementCreated',
            methodName: 'getAgreementCreateds',
            filterJsonRpc: {
                _did: didZeroX(did)
            },
            filterSubgraph: {
                where: {
                    _did: didZeroX(did)
                }
            },
            result: {
                _agreementId: true
            }
        })

        return res.map(event => event.returnValues?._agreementId || event._agreementId)
    }
}
