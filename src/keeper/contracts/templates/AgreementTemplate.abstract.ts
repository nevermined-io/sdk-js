import ContractBase, { TxParameters } from '../ContractBase'
import {
  ConditionContext,
  ConditionInstanceSmall,
  ConditionSmall,
  ConditionState,
  conditionStateNames,
} from '../conditions'
import { DDO, ServiceAgreementTemplate, Service, ServiceType } from '../../../ddo'
import {
  didZeroX,
  findServiceConditionByName,
  getAssetPriceFromService,
  ZeroAddress,
  zeroX,
} from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { AssetPrice, BabyjubPublicKey } from '../../../models'
import { Account, OrderProgressStep } from '../../../nevermined'
import { CustomToken } from '../CustomToken'
import { Token } from '../Token'

export interface AgreementConditionsStatus {
  [condition: string]: {
    condition: string
    contractName: string
    state: ConditionState
    blocked: boolean
    blockedBy: string[]
  }
}

export type ParameterType =
  | string
  | number
  | number[]
  | Account
  | BabyjubPublicKey
  | Service
  | ServiceType
  | TxParameters

export interface AgreementInstance<Params> {
  list: Params
  agreementId: string
  instances: ConditionInstanceSmall[]
}

export interface PaymentData {
  rewardAddress: string
  tokenAddress: string
  amounts: bigint[]
  receivers: string[]
}

export abstract class AgreementTemplate<Params> extends ContractBase {
  // cache these values since they are always the same for a template
  private _conditionTypes: string[]
  private _conditions: ConditionSmall[]

  public static async getInstance<Params>(
    config: InstantiableConfig,
    templateContractName: string,
    templateClass: any,
    optional = false,
  ): Promise<AgreementTemplate<Params> & any> {
    const agreementTemplate: AgreementTemplate<Params> = new (templateClass as any)(
      templateContractName,
    )
    await agreementTemplate.init(config, optional)
    return agreementTemplate
  }

  protected constructor(contractName: string) {
    super(contractName)
  }

  public abstract params(...args: any[]): Params

  public lockConditionIndex(): number {
    return 1
  }

  public paymentData(service: Service): PaymentData {
    const assetPrice = getAssetPriceFromService(service)
    const payment = findServiceConditionByName(service, 'lockPayment')
    if (!payment) throw new Error('Payment Condition not found!')
    return {
      rewardAddress: this.nevermined.keeper.conditions.escrowPaymentCondition.getAddress(),
      tokenAddress: payment.parameters.find((p) => p.name === '_tokenAddress').value as string,
      amounts: assetPrice.getAmounts(),
      receivers: assetPrice.getReceivers(),
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
    txParams?: TxParameters,
  ) {
    return this.sendFrom(
      'createAgreement',
      [
        zeroX(agreementId),
        didZeroX(did),
        conditionIds.map(zeroX),
        timeLocks,
        timeOuts,
        ...extraArgs,
      ],
      from,
      txParams,
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
    amounts: bigint[],
    receivers: string[],
    from?: Account,
    txParams?: TxParameters,
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
        amounts.map((a) => a.toString()),
        receivers,
      ],
      from,
      txParams,
    )
  }

  /**
   * Conditions address list.
   * @returns A list of condition addresses.
   */
  public async getConditionTypes(): Promise<string[]> {
    if (!this._conditionTypes) {
      this._conditionTypes = await this.call('getConditionTypes', [])
    }
    return this._conditionTypes
  }

  /**
   * List of condition contracts.
   * @returns A list of condition contracts.
   */
  public async getConditions(): Promise<ConditionSmall[]> {
    if (!this._conditions) {
      this._conditions = (await this.getConditionTypes()).map((address) =>
        this.nevermined.keeper.getConditionByAddress(address),
      )
    }
    return this._conditions
  }

  /**
   * Get agreement conditions IDs.
   * @param agreementId - Agreement ID.
   * @param ddo - DDO.
   * @returns The condition IDs.
   */
  public async getAgreementIdsFromDDO(
    agreementId: string,
    ddo: DDO,
    creator: string,
    params: Params,
  ): Promise<string[]> {
    const { instances } = await this.instanceFromDDO(agreementId, ddo, creator, params)
    return instances.map((a) => a.id)
  }

  public abstract instanceFromDDO?(
    agreementIdSeed: string,
    ddo: DDO,
    creator: string,
    parameters: Params,
  ): Promise<AgreementInstance<Params>>

  public abstract service(): ServiceType

  public standardContext(ddo: DDO, creator: string): ConditionContext {
    const service = ddo.findServiceByType(this.service())
    const rewards = getAssetPriceFromService(service)
    return { ddo, service, price: rewards, creator }
  }

  public async agreementId(agreementIdSeed: string, creator: string): Promise<string> {
    return await this.nevermined.keeper.agreementStoreManager.agreementId(agreementIdSeed, creator)
  }
  /**
   * Create a new agreement using the data of a DDO.
   * @param ddo - DDO.
   * @param parameters -
   * @returns {@link true} if the call was successful.
   */
  public async createAgreementFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    parameters: Params,
    consumer: Account,
    from: Account,
    timeOuts?: number[],
    txParams?: TxParameters,
  ): Promise<string> {
    const { agreementId, instances } = await this.instanceFromDDO(
      agreementIdSeed,
      ddo,
      from.getId(),
      parameters,
    )

    await this.createAgreement(
      agreementIdSeed,
      ddo.shortId(),
      instances.map((a) => a.seed),
      new Array(instances.length).fill(0),
      timeOuts ? timeOuts : new Array(instances.length).fill(0),
      [consumer.getId()],
      from,
      txParams,
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
    observer?: (OrderProgressStep) => void,
  ): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    observer = observer ? observer : (_) => ({})

    const { instances, agreementId } = await this.instanceFromDDO(
      agreementIdSeed,
      ddo,
      from.getId(),
      parameters,
    )

    const service = ddo.findServiceByType(this.service())
    const assetPrice = getAssetPriceFromService(service)
    const payment = findServiceConditionByName(service, 'lockPayment')
    if (!payment) throw new Error('Payment Condition not found!')
    const rewardAddress = this.nevermined.keeper.conditions.escrowPaymentCondition.getAddress()
    const tokenAddress = payment.parameters.find((p) => p.name === '_tokenAddress').value as string
    const amounts = assetPrice.getAmounts()
    const receivers = assetPrice.getReceivers()

    const timeouts: number[] = []
    const timelocks: number[] = []
    service.attributes.serviceAgreementTemplate.conditions.map((condition) => {
      timeouts.push(condition.timeout)
      timelocks.push(condition.timelock)
    })

    observer(OrderProgressStep.ApprovingPayment)
    await this.lockTokens(tokenAddress, amounts, from, txParams)
    observer(OrderProgressStep.ApprovedPayment)

    const totalAmount = AssetPrice.sumAmounts(amounts)
    const value =
      tokenAddress && tokenAddress.toLowerCase() === ZeroAddress
        ? totalAmount.toString()
        : undefined

    observer(OrderProgressStep.CreatingAgreement)
    await this.createAgreementAndPay(
      agreementIdSeed,
      ddo.shortId(),
      instances.map((a) => a.seed),
      timelocks ? timelocks : new Array(instances.length).fill(0),
      timeouts ? timeouts : new Array(instances.length).fill(0),
      consumer.getId(),
      this.lockConditionIndex(),
      rewardAddress,
      tokenAddress,
      amounts,
      receivers,
      from,
      { ...txParams, value },
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
      ({ name: conditionRef }) => conditionRef === ref,
    ).contractName
    return (await this.getConditions()).find((condition) => condition.contractName === name)
  }

  public async getServiceAgreementTemplateDependencies() {
    const serviceAgreementTemplate = await this.getServiceAgreementTemplate()
    return serviceAgreementTemplate.conditionDependency
  }

  /**
   * Returns the status of the conditions.
   * @param agreementId - Agreement ID.
   * @returns The conditions status.
   */
  public async getAgreementStatus(agreementId: string): Promise<AgreementConditionsStatus | false> {
    const agreementStore = this.nevermined.keeper.agreementStoreManager
    const conditionStore = this.nevermined.keeper.conditionStoreManager

    const dependencies = await this.getServiceAgreementTemplateDependencies()
    const { conditionIds } = await agreementStore.getAgreement(agreementId)

    if (!conditionIds.length) {
      this.logger.error(`Agreement not created yet: "${agreementId}"`)
      return false
    }

    const conditionIdByCondition = (await this.getConditions()).reduce(
      (acc, { contractName }, i) => ({
        ...acc,
        [contractName]: conditionIds[i],
      }),
      {},
    )

    const statesPromises = Object.keys(dependencies).map(async (ref) => {
      const { contractName } = await this.getServiceAgreementTemplateConditionByRef(ref)
      return {
        ref,
        contractName,
        state: (await conditionStore.getCondition(conditionIdByCondition[contractName])).state,
      }
    })
    const states = await Promise.all(statesPromises)

    return states.reduce((acc, { contractName, ref, state }) => {
      const blockers = dependencies[ref]
        .map((dependency) => states.find((_) => _.ref === dependency))
        .filter((condition) => condition.state !== ConditionState.Fulfilled)
      return {
        ...acc,
        [ref]: {
          condition: ref,
          contractName,
          state,
          blocked: !!blockers.length,
          blockedBy: blockers.map((_) => _.ref),
        },
      }
    }, {})
  }

  public async lockTokens(
    tokenAddress,
    amounts,
    from: Account,
    txParams: TxParameters,
  ): Promise<void> {
    let token: Token

    const { lockPaymentCondition } = this.nevermined.keeper.conditions

    if (!tokenAddress) {
      token = this.nevermined.keeper.token
    } else if (tokenAddress.toLowerCase() !== ZeroAddress) {
      token = await CustomToken.getInstanceByAddress(
        {
          nevermined: this.nevermined,
          web3: this.web3,
          logger: this.logger,
          config: this.config,
        },
        tokenAddress,
      )
    }

    const totalAmount = AssetPrice.sumAmounts(amounts)

    if (token) {
      this.logger.debug('Approving tokens', totalAmount)
      await token.approve(lockPaymentCondition.getAddress(), totalAmount, from, txParams)
    }
  }

  /**
   * Prints the agreement status.
   * @param agreementId - Agreement ID.
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
      },
    )
    this.logger.bypass('-'.repeat(80))
  }

  /**
   * Generates and returns the agreement creation event.
   * @param agreementId - Agreement ID.
   * @returns Agreement created event.
   */
  public async getAgreementCreatedEvent(agreementId: string) {
    const res = await this.events.once((events) => events, {
      eventName: 'AgreementCreated',
      methodName: 'getAgreementCreateds',
      filterJsonRpc: {
        _agreementId: zeroX(agreementId),
      },
      filterSubgraph: {
        where: {
          _agreementId: zeroX(agreementId),
        },
      },
      result: {
        _agreementId: true,
        _did: true,
        _accessConsumer: true,
        _accessProvider: true,
        _conditionIds: true,
        _conditionIdSeeds: true,
        _timeLocks: true,
        _timeOuts: true,
        _idSeed: true,
        _creator: true,
      },
    })
    return res
  }
  public async getAgreementsForDID(did: string): Promise<string[]> {
    const res = await this.events.getPastEvents({
      eventName: 'AgreementCreated',
      methodName: 'getAgreementCreateds',
      filterJsonRpc: {
        _did: didZeroX(did),
      },
      filterSubgraph: {
        where: {
          _did: didZeroX(did),
        },
      },
      result: {
        _agreementId: true,
      },
    })

    return res.map((event) => event.args?._agreementId || event._agreementId)
  }
}
