import KeyTransfer from './KeyTransfer'

export * from './PromiseResolver'
export * from './Logger'
export * from './Events'
export * from './ConversionTypeHelpers'
export * from './GeneratorHelpers'
export * from './DDOHelpers'
export * from './SubscribablePromise'
export * from './SubscribableObserver'

export { KeyTransfer }

export function makeBuffer(a,b) {
    return Buffer.from(a,b)
}