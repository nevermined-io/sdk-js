import { SignatureUtils } from "../../nevermined/utils/SignatureUtils"

/**
 * Identifies the default Provenance Activity Id to be recorded on-chain in the DIDRegistry Smart Contract when 
 * an asset is registered. It associates to the new DID created the 'Asset Registration' activity.
 * (@see https://docs.nevermined.io/docs/architecture/specs/Spec-PROVENANCE#provenance-relations)
 * 
 */
export const DEFAULT_REGISTRATION_ACTIVITY_ID = SignatureUtils.hash('AssetRegistration')


export enum ProvenanceMethod {
    ENTITY = 0,
    ACTIVITY = 1,
    WAS_GENERATED_BY = 2,
    USED = 3,
    WAS_INFORMED_BY = 4,
    WAS_STARTED_BY = 5,
    WAS_ENDED_BY = 6,
    WAS_INVALIDATED_BY = 7,
    WAS_DERIVED_FROM = 8,
    AGENT = 9,
    WAS_ATTRIBUTED_TO = 10,
    WAS_ASSOCIATED_WITH = 11,
    ACTED_ON_BEHALF = 12
}

export interface ProvenanceRegistry {
    did: string
    relatedDid: string
    agentId: string
    activityId: string
    agentInvolvedId: string
    method: ProvenanceMethod
    createdBy: string
    blockNumberUpdated: number
    signatureDelegate: string
}

export interface ProvenanceAttributeRegisteredEvent {
    provId: string
    did: string
    agentId: string
    activityId: string
    relatedDid: string
    agentInvolvedId: string
    method: ProvenanceMethod
    attributes?: string
    blockNumberUpdated: number
}

export interface ProvenanceBaseEvent {
    event: string
    method: ProvenanceMethod
    activityId: string
    provId: string
    attributes?: string
    blockNumberUpdated: number
}
export interface WasGeneratedByEvent extends ProvenanceBaseEvent {
    did: string
    agentId: string
}
export interface UsedEvent extends ProvenanceBaseEvent {
    did: string
    agentId: string
}
export interface WasDerivedFromEvent extends ProvenanceBaseEvent {
    newEntityDid: string
    usedEntityDid: string
    agentId: string
}
export interface WasAssociatedWithEvent extends ProvenanceBaseEvent {
    entityDid: string
    agentId: string
}
export interface ActedOnBehalfEvent extends ProvenanceBaseEvent {
    entityDid: string
    delegateAgentId: string
    responsibleAgentId: string
}
export type ProvenanceEvent<T extends ProvenanceMethod | any = any> =
    T extends ProvenanceMethod.WAS_GENERATED_BY
        ? WasGeneratedByEvent
        : T extends ProvenanceMethod.USED
        ? UsedEvent
        : T extends ProvenanceMethod.WAS_DERIVED_FROM
        ? WasDerivedFromEvent
        : T extends ProvenanceMethod.WAS_ASSOCIATED_WITH
        ? WasAssociatedWithEvent
        : T extends ProvenanceMethod.ACTED_ON_BEHALF
        ? ActedOnBehalfEvent
        :
              | WasGeneratedByEvent
              | UsedEvent
              | WasDerivedFromEvent
              | WasAssociatedWithEvent
              | ActedOnBehalfEvent
