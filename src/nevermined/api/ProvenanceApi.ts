import Account from '../Account'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { TxParameters } from '../../keeper/contracts/ContractBase'
import { ethers } from 'ethers'
import { zeroX } from '../../utils'
import { NVMBaseApi } from './NVMBaseApi'
import { ProvenanceMethod } from '../../keeper/contracts/Provenance'

/**
 * Nevermined Provenance API. It allows to register and search entries in the Nevermined W3C Provenance registry 
 * You can find more information about Nevermined Provenance here:
 * {@link https://docs.nevermined.io/docs/architecture/specs/Spec-PROVENANCE}
 */
export class ProvenanceApi extends NVMBaseApi {

    /**
     * Returns the instance of the ProvenanceApi.
     * @param config - Configuration of the Nevermined instance
     * @returns {@link ProvenanceApi}
     */ 
    public static async getInstance(config: InstantiableConfig): Promise<ProvenanceApi> {
        const instance = new ProvenanceApi()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Given a provenance id it returns the provenance details
     * @param provenanceId Unique identifier of a provenance entry
     * @returns 
     */
    public async getProvenanceEntry(provenanceId: string) {
        return this.nevermined.keeper.didRegistry.getProvenanceEntry(provenanceId)
    }

    /**
     * Implements the W3C PROV Usage action
     * @param provenanceId - Provenance ID
     * @param did - Identifier of the entity created
     * @param agentId - Agent Identifier
     * @param activityId - Identifier of the activity creating the new entity
     * @param signature - Signature (optional) provided by the agent involved
     * @param attributes - Attributes associated with the action
     * @param from - Sender account address.
     * @returns {@link true} if the call succeeded.
     */
    public async used(
        provenanceId: string,
        did: string,
        agentId: string,
        activityId: string,
        signature: string,
        attributes: string,
        from: Account,
        params?: TxParameters
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.used(
            provenanceId,
            did,
            agentId,
            ethers.utils.hexZeroPad(zeroX(activityId), 32),
            signature,
            attributes,
            from.getId(),
            params
        )
        return true
    }

    /**
     * Implements the W3C PROV Derivation action
     * @param provenanceId - Provenance ID
     * @param newEntityDid - Identifier of the new entity derived
     * @param usedEntityDid - Identifier of the entity used to derive the new entity
     * @param agentId - Agent Identifier
     * @param activityId - Identifier of the activity creating the new entity
     * @param attributes - Attributes associated with the action
     * @param from - Sender account address.
     * @returns {@link true} if the call succeeded.
     */
    public async wasDerivedFrom(
        provenanceId: string,
        newEntityDid: string,
        usedEntityDid: string,
        agentId: string,
        activityId: string,
        attributes: string,
        from: Account,
        params?: TxParameters
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.wasDerivedFrom(
            provenanceId,
            newEntityDid,
            usedEntityDid,
            agentId,
            ethers.utils.hexZeroPad(zeroX(activityId), 32),
            attributes,
            from.getId(),
            params
        )
        return true
    }

    /**
     * Implements the W3C PROV Association action
     * @param provenanceId - Provenance ID
     * @param did - Identifier of the entity created
     * @param agentId - Agent Identifier
     * @param activityId - Identifier of the activity creating the new entity
     * @param attributes - Attributes associated with the action
     * @param from - Sender account address.
     * @returns {@link true} if the call succeeded.
     */
    public async wasAssociatedWith(
        provenanceId: string,
        did: string,
        agentId: string,
        activityId: string,
        attributes: string,
        from: Account,
        params?: TxParameters
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.wasAssociatedWith(
            provenanceId,
            did,
            agentId,
            ethers.utils.hexZeroPad(zeroX(activityId), 32),
            attributes,
            from.getId(),
            params
        )
        return true
    }

    /**
     * Implements the W3C PROV Delegation action
     * @param provenanceId - Provenance ID
     * @param did - Identifier of the entity created
     * @param delegateAgentId - Delegate Agent Identifier
     * @param responsibleAgentId - Responsible Agent Identifier
     * @param activityId - Identifier of the activity creating the new entity
     * @param signature - Signature provided by the delegated agent
     * @param attributes - Attributes associated with the action
     * @param from - Sender account address.
     * @returns {@link true} if the call succeeded.
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
        params?: TxParameters
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.actedOnBehalf(
            provenanceId,
            did,
            delegateAgentId,
            responsibleAgentId,
            ethers.utils.hexZeroPad(zeroX(activityId), 32),
            signature,
            attributes,
            from.getId(),
            params
        )
        return true
    }

    /**
     * Add new DID provenance delegate.
     * @param did - Identifier of the entity created
     * @param delegated - Delegate Address
     * @param from - Sender account address.
     * @returns {@link true} if the call succeeded.
     */
    public async addDidProvenanceDelegate(
        did: string,
        delegated: string,
        from: Account,
        params?: TxParameters
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.addDidProvenanceDelegate(
            did,
            delegated,
            from.getId(),
            params
        )
        return true
    }

    /**
     * Remove an existing DID delegate.
     * @param did - Identifier of the entity created
     * @param delegated - Delegate Address
     * @param from - Sender account address.
     * @returns {@link true} if the call succeeded.
     */
    public async removeDidProvenanceDelegate(
        did: string,
        delegated: string,
        from: Account,
        params?: TxParameters
    ): Promise<boolean> {
        await this.nevermined.keeper.didRegistry.removeDidProvenanceDelegate(
            did,
            delegated,
            from.getId(),
            params
        )
        return true
    }

    /**
     * Check whether a given DID delegate exists
     * @param did - Identifier of the entity created
     * @param delegated - Delegate Address
     */
    public async isProvenanceDelegate(did: string, delegated: string) {
        return this.nevermined.keeper.didRegistry.isProvenanceDelegate(did, delegated)
    }

    /**
     * Retrieve the owner of the provenance record.
     * @param did - Identifier of the entity created
     */
    public async getProvenanceOwner(did: string) {
        return this.nevermined.keeper.didRegistry.getProvenanceOwner(did)
    }

    /**
     * Search for ProvenanceAttributeRegistered events related with a specific DID
     * @param did - identifier of the entity created
     * @returns A list of provenance events.
     */
    public async getDIDProvenanceEvents(did: string) {
        return this.nevermined.keeper.didRegistry.getDIDProvenanceEvents(did)
    }

    /**
     * Search for ProvenanceAttributeRegistered events related with a specific DID
     * @param method - Method
     * @param did - Identifier of the entity created
     * @returns A list of provenance method events.
     */
    public async getProvenanceMethodEvents<T extends ProvenanceMethod>(
        method: T,
        did: string
    ) {
        return this.nevermined.keeper.didRegistry.getDIDProvenanceMethodEvents<T>(
            did,
            method
        )
    }
}
