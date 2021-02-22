export interface ServiceAgreementTemplateParameter {
    name: string
    type: string
    value: string | number | string[]
}

export interface ServiceAgreementTemplateEvent {
    name: string
    actorType: string
    handler: {
        moduleName: string
        functionName: string
        version: string
    }
}

export interface ServiceAgreementTemplateCondition {
    name: string
    timelock: number
    timeout: number
    contractName: string
    functionName: string
    parameters: ServiceAgreementTemplateParameter[]
    events: ServiceAgreementTemplateEvent[]
}

export interface ServiceAgreementTemplate {
    contractName: string
    events: ServiceAgreementTemplateEvent[]
    fulfillmentOrder: string[]
    conditionDependency: { [condition: string]: string[] }
    conditions: ServiceAgreementTemplateCondition[]
}
