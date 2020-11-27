import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { ProvenanceMethod } from '../keeper/contracts/DIDRegistry'

/**
 * Provenance submodule of Nevermined.
 */
export class Provenance extends Instantiable {
    /**
     * Returns the instance of Provenance.
     * @return {Promise<Provenance>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Provenance> {
        const instance = new Provenance()
        instance.setInstanceConfig(config)

        return instance
    }

    public async getProvenanceEntry(provenanceId: string) {
        return this.nevermined.keeper.didRegistry.getProvenanceEntry(provenanceId)
    }

    /**
     * Implements the W3C PROV Usage action
     * @param  {string}           provenanceId  Provenance ID
     * @param  {string}           did           Identifier of the entity created
     * @param  {string}           agentId       Agent Identifier
     * @param  {string}           activityId    Identifier of the activity creating the new entity
     * @param  {string}           signature     Signature (optional) provided by the agent involved
     * @param  {string}           attributes    Attributes associated with the action
     * @param  {Account}          from          Sender account address.
     * @return {Promise<boolean>}               Success
     */
    public async used(
        provenanceId: string,
        did: string,
        agentId: string,
        activityId: string,
        signature: string,
        attributes: string,
        from: Account,
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.used(
            provenanceId,
            did,
            agentId,
            activityId,
            signature,
            attributes,
            from.getId(),
        )
        return true
    }

    /**
     * Implements the W3C PROV Derivation action
     * @param  {string}           provenanceId  Provenance ID
     * @param  {string}           newEntityDid  Identifier of the new entity derived
     * @param  {string}           usedEntityDid Identifier of the entity used to derive the new entity
     * @param  {string}           agentId       Agent Identifier
     * @param  {string}           activityId    Identifier of the activity creating the new entity
     * @param  {string}           attributes    Attributes associated with the action
     * @param  {Account}          from          Sender account address.
     * @return {Promise<boolean>}               Success
     */
    public async wasDerivedFrom(
        provenanceId: string,
        newEntityDid: string,
        usedEntityDid: string,
        agentId: string,
        activityId: string,
        attributes: string,
        from: Account,
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.wasDerivedFrom(
            provenanceId,
            newEntityDid,
            usedEntityDid,
            agentId,
            activityId,
            attributes,
            from.getId(),
        )
        return true
    }

    /**
     * Implements the W3C PROV Association action
     * @param  {string}           provenanceId  Provenance ID
     * @param  {string}           did           Identifier of the entity created
     * @param  {string}           agentId       Agent Identifier
     * @param  {string}           activityId    Identifier of the activity creating the new entity
     * @param  {string}           attributes    Attributes associated with the action
     * @param  {Account}          from          Sender account address.
     * @return {Promise<boolean>}               Success
     */
    public async wasAssociatedWith(
        provenanceId: string,
        did: string,
        agentId: string,
        activityId: string,
        attributes: string,
        from: Account,
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.wasAssociatedWith(
            provenanceId,
            did,
            agentId,
            activityId,
            attributes,
            from.getId(),
        )
        return true
    }

    /**
     * Implements the W3C PROV Delegation action
     * @param  {string}           provenanceId          Provenance ID
     * @param  {string}           did                   Identifier of the entity created
     * @param  {string}           delegateAgentId       Delegate Agent Identifier
     * @param  {string}           responsibleAgentId    Responsible Agent Identifier
     * @param  {string}           activityId            Identifier of the activity creating the new entity
     * @param  {string}           signature             Signature provided by the delegated agent
     * @param  {string}           attributes            Attributes associated with the action
     * @param  {Account}          from                  Sender account address.
     * @return {Promise<boolean>}                       Success
     */
    public async actedOnBehalf(
        provenanceId: string,
        did: string,
        delegateAgentId: string,
        responsibleAgentId: string,
        activityId: string,
        signature: string,
        attributes: string,
        from: Account,
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.actedOnBehalf(
            provenanceId,
            did,
            delegateAgentId,
            responsibleAgentId,
            activityId,
            signature,
            attributes,
            from.getId(),
        )
        return true
    }

    /**
     * Search for ProvenanceAttributeRegistered events related with a specific DID
     * @param  {string}           provenanceId          Provenance ID
     * @param  {string}           method                Method
     * @return {Promise<ProvenanceAttributeRegisteredEvent>}
     */
    public async getDIDProvenanceEvents(did: string) {
        return this.nevermined.keeper.didRegistry.getDIDProvenanceEvents(did)
    }

    /**
     * Search for ProvenanceAttributeRegistered events related with a specific DID
     * @param  {string}           method                Method
     * @param  {string}           provenanceId          Provenance ID
     * @return {Promise<>}
     */
    public async getProvenanceMethodEvents<T extends ProvenanceMethod>(method: T, did: string) {
        return this.nevermined.keeper.didRegistry.getDIDProvenanceMethodEvents<T>(did, method)
    }
}
