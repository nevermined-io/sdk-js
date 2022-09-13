import { AgreementTemplate } from './AgreementTemplate.abstract'
import { zeroX } from '../../../utils'
import {
    ServiceCommon,
    serviceIndex,
    ServicePlugin,
    ServiceType,
    ValidationParams
} from '../../../ddo/Service'
import { Account, Condition, MetaData } from '../../../sdk'
import { TxParameters } from '../ContractBase'
import { ConditionInstance, ConditionState } from '../conditions'

export abstract class BaseTemplate<Params>
    extends AgreementTemplate<Params>
    implements ServicePlugin
{
    public async getAgreementData(
        agreementId: string
    ): Promise<{ accessProvider: string; accessConsumer: string }> {
        return this.call<any>('getAgreementData', [zeroX(agreementId)])
    }

    public abstract name(): string
    public abstract description(): string
    public abstract conditions(): Condition<any>[]

    public serviceEndpoint(): ServiceType {
        return this.service()
    }

    public async createService(
        publisher: Account,
        metadata: MetaData
    ): Promise<ServiceCommon> {
        const serviceAgreementTemplate = await this.getServiceAgreementTemplate()
        return {
            type: this.service(),
            index: serviceIndex[this.service()],
            serviceEndpoint: this.nevermined.gateway.getServiceEndpoint(
                this.serviceEndpoint()
            ),
            templateId: this.getAddress(),
            attributes: {
                main: {
                    creator: publisher.getId(),
                    datePublished: metadata.main.datePublished,
                    name: this.name(),
                    timeout: 0
                },
                additionalInformation: {
                    description: this.description()
                },
                serviceAgreementTemplate
            }
        } as ServiceCommon
    }

    /**
     * Specialize params
     * @param params Generic parameters
     */
    public abstract paramsGen(params: ValidationParams): Promise<Params>

    public async extraGen(_params: ValidationParams): Promise<any> {
        return {}
    }

    public async accept(_params: ValidationParams): Promise<boolean> {
        return false
    }

    public async process(
        params: ValidationParams,
        from: Account,
        txparams?: TxParameters
    ): Promise<void> {
        await this.validateAgreement(
            params.agreement_id,
            params.did,
            await this.paramsGen(params),
            from,
            await this.extraGen(params),
            txparams
        )
    }

    public async validateAgreement(
        agreement_id: string,
        did: string,
        params: Params,
        from: Account,
        extra: any = {},
        txparams?: TxParameters
    ): Promise<void> {
        const ddo = await this.nevermined.assets.resolve(did)
        const agreement = await this.nevermined.keeper.agreementStoreManager.getAgreement(
            agreement_id
        )
        const agreementData = await this.instanceFromDDO(
            agreement.agreementIdSeed,
            ddo,
            agreement.creator,
            params
        )
        if (agreementData.agreementId !== agreement_id) {
            throw new Error(
                `Agreement doesn't match ${agreement_id} should be ${agreementData.agreementId}`
            )
        }
        for (const { idx, a } of this.conditions().map((a, idx) => ({ idx, a }))) {
            const condInstance = agreementData.instances[idx] as ConditionInstance<any>
            await a.fulfillGateway(condInstance, extra, from, txparams)
            const lock_state =
                await this.nevermined.keeper.conditionStoreManager.getCondition(
                    agreementData.instances[idx].id
                )
            if (lock_state.state !== ConditionState.Fulfilled) {
                throw new Error(
                    `In agreement ${agreement_id}, condition ${agreementData.instances[idx].id} is not fulfilled`
                )
            }
        }
    }
}
