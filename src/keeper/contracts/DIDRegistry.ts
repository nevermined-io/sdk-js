import { TransactionReceipt } from 'web3-core'
import ContractBase from './ContractBase'
import { zeroX, didPrefixed, didZeroX, eventToObject } from '../../utils'
import { InstantiableConfig } from '../../Instantiable.abstract'

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
    ACTED_ON_BEHALF = 12,
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
    attributes: string
    blockNumberUpdated: number
}

interface ProvenanceBaseEvent {
    event: string
    method: ProvenanceMethod
    activityId: string
    provId: string
    attributes: string
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
    T extends ProvenanceMethod.WAS_GENERATED_BY ? WasGeneratedByEvent :
    T extends ProvenanceMethod.USED ? UsedEvent :
    T extends ProvenanceMethod.WAS_DERIVED_FROM ? WasDerivedFromEvent :
    T extends ProvenanceMethod.WAS_ASSOCIATED_WITH ? WasAssociatedWithEvent :
    T extends ProvenanceMethod.ACTED_ON_BEHALF ? ActedOnBehalfEvent :
        WasGeneratedByEvent | UsedEvent | WasDerivedFromEvent | WasAssociatedWithEvent | ActedOnBehalfEvent

export default class DIDRegistry extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<DIDRegistry> {
        const didRegistry: DIDRegistry = new DIDRegistry('DIDRegistry')
        await didRegistry.init(config)
        return didRegistry
    }

    public async registerAttribute(
        did: string,
        checksum: string,
        providers: string[],
        value: string,
        ownerAddress: string
    ) {
        return this.send('registerAttribute', ownerAddress, [
            didZeroX(did),
            zeroX(checksum),
            providers.map(zeroX),
            value
        ])
    }

    public async registerDID(
        did: string,
        checksum: string,
        providers: string[],
        value: string,
        activityId: string,
        attributes: string,
        ownerAddress: string
    ) {
        return this.send('registerDID', ownerAddress, [
            didZeroX(did),
            zeroX(checksum),
            providers.map(zeroX),
            value,
            zeroX(activityId),
            attributes
        ])
    }

    public async getDIDOwner(did: string): Promise<string> {
        return this.call('getDIDOwner', [didZeroX(did)])
    }

    public async getBlockNumberUpdated(did: string): Promise<number> {
        return +(await this.call('getBlockNumberUpdated', [zeroX(did)]))
    }

    public async isDIDProvider(did: string, provider: string): Promise<string> {
        return this.call('isDIDProvider', [didZeroX(did), zeroX(provider)])
    }

    public async getAttributesByOwner(owner: string): Promise<string[]> {
        return (
            await this.getPastEvents('DIDAttributeRegistered', {
                _owner: zeroX(owner)
            })
        )
            .map(({ returnValues }) => returnValues._did)
            .map(didPrefixed)
    }

    public async getAttributesByDid(
        did: string
    ): Promise<{ did: string; serviceEndpoint: string; checksum: string }> {
        return (
            await this.getPastEvents('DIDAttributeRegistered', {
                _did: didZeroX(did)
            })
        ).map(
            ({
                returnValues: { _did, _checksum: checksum, _value: serviceEndpoint }
            }) => ({
                did: didPrefixed(_did),
                serviceEndpoint,
                checksum
            })
        )[0]
    }

    public async grantPermission(did: string, grantee: string, ownerAddress: string) {
        return this.send('grantPermission', ownerAddress, [didZeroX(did), zeroX(grantee)])
    }

    public async revokePermission(did: string, grantee: string, ownerAddress: string) {
        return this.send('revokePermission', ownerAddress, [zeroX(did), zeroX(grantee)])
    }

    public async getPermission(did: string, grantee: string): Promise<boolean> {
        return this.call('getPermission', [didZeroX(did), zeroX(grantee)])
    }

    public async transferDIDOwnership(
        did: string,
        newOwnerAddress: string,
        ownerAddress: string
    ): Promise<TransactionReceipt> {
        return this.send('transferDIDOwnership', ownerAddress, [
            didZeroX(did),
            zeroX(newOwnerAddress)
        ])
    }

    // Provenance
    public async getDIDProvenanceEvents(did: string) {
        return (await this.getPastEvents('ProvenanceAttributeRegistered', {_did: didZeroX(did)}))
            .map(({returnValues}) => eventToObject(returnValues) as ProvenanceAttributeRegisteredEvent)
            .map(event => ({...event, method: +event.method}))
    }

    public async getDIDProvenanceMethodEvents<T extends ProvenanceMethod>(did: string, method: T): Promise<ProvenanceEvent<T>[]> {
        const capitalize = string => string
            .replace(/([a-z]+)(?:_|$)/ig, (_, w) => w.charAt(0).toUpperCase() + w.toLowerCase().slice(1))
        let filter: any = {_did: didZeroX(did)}
        switch (method) {
            case ProvenanceMethod.ACTED_ON_BEHALF:
            case ProvenanceMethod.WAS_ASSOCIATED_WITH:
                filter = {_entityDid: didZeroX(did)}
                break
            case ProvenanceMethod.WAS_DERIVED_FROM:
                filter = {_usedEntityDid: didZeroX(did)}
                break
        }
        return (await this.getPastEvents(capitalize(ProvenanceMethod[method as any]), filter))
            .map(({returnValues}) => eventToObject(returnValues))
    }

    public async getProvenanceEntry(provId: string) {
        const provenance: ProvenanceRegistry = await this.call('getProvenanceEntry', [zeroX(provId)])
        if (provenance.did.match(/^0x0+$/)) {
            return
        }
        return provenance
    }

    public async used(
        provId: string,
        did: string,
        agentId: string,
        activityId: string,
        signatureUsing: string,
        attributes: string,
        ownerAddress: string
    ) {
        return this.send('used', ownerAddress, [
            zeroX(provId),
            didZeroX(did),
            zeroX(agentId),
            zeroX(activityId),
            zeroX(signatureUsing),
            attributes
        ])
    }

    public async wasDerivedFrom(
        provId: string,
        newEntityDid: string,
        usedEntityDid: string,
        agentId: string,
        activityId: string,
        attributes: string,
        ownerAddress: string
    ) {
        return this.send('wasDerivedFrom', ownerAddress, [
            zeroX(provId),
            zeroX(newEntityDid),
            zeroX(usedEntityDid),
            zeroX(agentId),
            zeroX(activityId),
            attributes
        ])
    }

    public async wasAssociatedWith(
        provId: string,
        did: string,
        agentId: string,
        activityId: string,
        attributes: string,
        ownerAddress: string
    ) {
        return this.send('wasAssociatedWith', ownerAddress, [
            zeroX(provId),
            didZeroX(did),
            zeroX(agentId),
            zeroX(activityId),
            attributes
        ])
    }

    public async actedOnBehalf(
        provId: string,
        did: string,
        delegateAgentId: string,
        responsibleAgentId: string,
        activityId: string,
        signatureDelegate: string,
        attributes: string,
        ownerAddress: string
    ) {
        return this.send('actedOnBehalf', ownerAddress, [
            zeroX(provId),
            didZeroX(did),
            zeroX(delegateAgentId),
            zeroX(responsibleAgentId),
            zeroX(activityId),
            zeroX(signatureDelegate),
            attributes
        ])
    }
}
