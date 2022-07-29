export * from './PromiseResolver'
export * from './Logger'
export * from './Events'
export * from './ConversionTypeHelpers'
export * from './GeneratorHelpers'
export * from './DDOHelpers'
export * from './SubscribablePromise'
export * from './SubscribableObserver'
export * from './BigNumber'

export function makeBuffer(a, b) {
    return Buffer.from(a, b)
}

export enum OrderProgressStep {
    ApprovingPayment,
    ApprovedPayment,
    CreatingAgreement,
    AgreementInitialized
}
