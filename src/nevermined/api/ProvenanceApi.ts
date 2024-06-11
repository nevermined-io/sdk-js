import { NvmAccount } from '../../models/NvmAccount'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { ProvenanceMethod } from '../../keeper/contracts/Provenance'
import { zeroPadValue } from '../../nevermined/utils/BlockchainViemUtils'
import { TxParameters } from '../../models/Transactions'

/**
 * The Nevermined Provenance API allows to register and search entries in the Nevermined W3C Provenance registry
 * You can find more information about Nevermined Provenance here:
 * {@link https://docs.nevermined.io/docs/architecture/specs/Spec-PROVENANCE}
 */
export class ProvenanceApi extends Instantiable {
  /**
   * Creates a new ProvenanceApi
   * @param config - Configuration of the Nevermined instance
   * @returns {@link ProvenanceApi}
   */
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  /**
   * Given a provenance id it returns the provenance details
   * @param provenanceId Unique identifier of a provenance entry
   * @returns {@link ProvenanceRegistry} object with the provenance details
   */
  public async getProvenanceEntry(provenanceId: string) {
    return this.nevermined.keeper.didRegistry.getProvenanceEntry(provenanceId)
  }

  /**
   * Implements the W3C PROV Usage action.
   *
   * @remarks
   * This method can be called when want to track the usage of a DID.
   *
   * @param provenanceId - Provenance ID
   * @param did - Identifier of the entity created
   * @param agentId - Agent Identifier
   * @param activityId - Identifier of the activity creating the new entity
   * @param signature - Signature (optional) provided by the agent involved
   * @param attributes - Attributes associated with the action
   * @param from - Sender account.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the call succeeded.
   */
  public async used(
    provenanceId: string,
    did: string,
    agentId: string,
    activityId: string,
    signature: string,
    attributes: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ): Promise<boolean> {
    await this.nevermined.keeper.didRegistry.used(
      provenanceId,
      did,
      agentId,
      zeroPadValue(activityId as `0x${string}`, 32),
      signature,
      attributes,
      from,
      txParams,
    )
    return true
  }

  /**
   * Implements the W3C PROV Derivation action
   *
   * @remarks
   * This method can be called when want to track the derivation of a new DID from an existing DID.
   *
   * @param provenanceId - Provenance ID
   * @param newEntityDid - Identifier of the new entity derived
   * @param usedEntityDid - Identifier of the entity used to derive the new entity
   * @param agentId - Agent Identifier
   * @param activityId - Identifier of the activity creating the new entity
   * @param attributes - Attributes associated with the action
   * @param from - Sender account.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the call succeeded.
   */
  public async wasDerivedFrom(
    provenanceId: string,
    newEntityDid: string,
    usedEntityDid: string,
    agentId: string,
    activityId: string,
    attributes: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ): Promise<boolean> {
    await this.nevermined.keeper.didRegistry.wasDerivedFrom(
      provenanceId,
      newEntityDid,
      usedEntityDid,
      agentId,
      zeroPadValue(activityId as `0x${string}`, 32),
      attributes,
      from,
      txParams,
    )
    return true
  }

  /**
   * Implements the W3C PROV Association action
   *
   * @remarks
   * This method can be called when want to track the association of an agent with a DID.
   *
   * @param provenanceId - Provenance ID
   * @param did - Identifier of the entity created
   * @param agentId - Agent Identifier
   * @param activityId - Identifier of the activity creating the new entity
   * @param attributes - Attributes associated with the action
   * @param from - Sender account.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the call succeeded.
   */
  public async wasAssociatedWith(
    provenanceId: string,
    did: string,
    agentId: string,
    activityId: string,
    attributes: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ): Promise<boolean> {
    await this.nevermined.keeper.didRegistry.wasAssociatedWith(
      provenanceId,
      did,
      agentId,
      zeroPadValue(activityId as `0x${string}`, 32),
      attributes,
      from,
      txParams,
    )
    return true
  }

  /**
   * Implements the W3C PROV Delegation action.
   *
   * @remarks
   * This method can be called when want to track the delegation of an agent to act on behalf of another agent.
   *
   * @param provenanceId - Provenance ID
   * @param did - Identifier of the entity created
   * @param delegateAgentId - Delegate Agent Identifier
   * @param responsibleAgentId - Responsible Agent Identifier
   * @param activityId - Identifier of the activity creating the new entity
   * @param signature - Signature provided by the delegated agent
   * @param attributes - Attributes associated with the action
   * @param from - Sender account.
   * @param txParams - Transaction parameters
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
    from: NvmAccount,
    txParams?: TxParameters,
  ): Promise<boolean> {
    await this.nevermined.keeper.didRegistry.actedOnBehalf(
      provenanceId,
      did,
      delegateAgentId,
      responsibleAgentId,
      zeroPadValue(activityId as `0x${string}`, 32),
      signature,
      attributes,
      from,
      txParams,
    )
    return true
  }

  /**
   * Add new DID provenance delegate. The delegate will be able to perform actions on behalf of the DID owner.
   * @param did - Identifier of the entity created
   * @param delegatedAddress - Delegate Address
   * @param from - Sender account.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the call succeeded.
   */
  public async addDidProvenanceDelegate(
    did: string,
    delegatedAddress: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ): Promise<boolean> {
    await this.nevermined.keeper.didRegistry.addDidProvenanceDelegate(
      did,
      delegatedAddress,
      from,
      txParams,
    )
    return true
  }

  /**
   * Remove an existing DID as delegate.
   * @param did - Identifier of the entity created
   * @param delegatedAddress - Delegate Address
   * @param from - Sender account.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the call succeeded.
   */
  public async removeDidProvenanceDelegate(
    did: string,
    delegatedAddress: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ): Promise<boolean> {
    await this.nevermined.keeper.didRegistry.removeDidProvenanceDelegate(
      did,
      delegatedAddress,
      from,
      txParams,
    )
    return true
  }

  /**
   * Check whether a given DID delegate exists
   * @param did - Identifier of the entity created
   * @param delegatedAddress - Delegate Address
   * @returns {@link true} if the address is a delegate.
   */
  public async isProvenanceDelegate(did: string, delegatedAddress: string) {
    return this.nevermined.keeper.didRegistry.isProvenanceDelegate(did, delegatedAddress)
  }

  /**
   * Retrieve the owner of the provenance record.
   * @param did - Identifier of the entity created
   * @returns Address of the provenance owner.
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
  public async getProvenanceMethodEvents<T extends ProvenanceMethod>(method: T, did: string) {
    return this.nevermined.keeper.didRegistry.getDIDProvenanceMethodEvents<T>(did, method)
  }
}
