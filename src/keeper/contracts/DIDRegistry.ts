import { InstantiableConfig } from '../../Instantiable.abstract'
import { ZeroAddress } from '../../constants/AssetConstants'
import { ContractBase } from '../../keeper/contracts/ContractBase'
import { NFTAttributes } from '../../models/NFTAttributes'
import { TxParameters as txParams } from '../../models/Transactions'
import { zeroPadValue } from '../../nevermined/utils/BlockchainViemUtils'
import { SignatureUtils } from '../../nevermined/utils/SignatureUtils'
import { didZeroX, zeroX, didPrefixed } from '../../utils/ConversionTypeHelpers'
import { eventToObject } from '../../utils/Events'
import {
  DEFAULT_REGISTRATION_ACTIVITY_ID,
  ProvenanceAttributeRegisteredEvent,
  ProvenanceMethod,
  ProvenanceEvent,
  ProvenanceRegistry,
} from './Provenance'
import { AssetError } from '../../errors/NeverminedErrors'
import { NvmAccount } from '../../models/NvmAccount'

export class DIDRegistry extends ContractBase {
  public static async getInstance(config: InstantiableConfig): Promise<DIDRegistry> {
    const didRegistry: DIDRegistry = new DIDRegistry('DIDRegistry')
    await didRegistry.init(config)
    return didRegistry
  }

  /**
   * It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract
   *
   * @param did - The unique identifier of the asset
   * @param checksum - Checksum resulted of hash the asset metadata
   * @param providers - List of addresses in charge of interact with the asset
   * @param url - URL to the metadata in the Metadata/Marketplace API
   * @param owner - Account of the user registering the DID
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async registerAttribute(
    did: string,
    checksum: string,
    providers: string[],
    url: string,
    owner: NvmAccount,
    txParams?: txParams,
  ) {
    return this.send(
      'registerAttribute',
      owner,
      [didZeroX(did), zeroX(checksum), providers.map(zeroX), url],
      txParams,
    )
  }

  /**
   * It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract
   *
   * @param did - The unique identifier of the asset
   * @param checksum - Checksum resulted of hash the asset metadata
   * @param providers - List of addresses in charge of interact with the asset
   * @param owner - Account of the user registering the DID
   * @param url - URL to the metadata in the Metadata/Marketplace API
   * @param immutableUrl - Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc
   * @param activityId - Provenance identifier about the asset registration action
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async registerDID(
    did: string,
    checksum: string,
    providers: string[],
    owner: NvmAccount,
    url: string,
    immutableUrl = '',
    activityId = SignatureUtils.hash(DEFAULT_REGISTRATION_ACTIVITY_ID),
    txParams?: txParams,
  ) {
    return this.send(
      'registerDID',
      owner,
      [didZeroX(did), zeroX(checksum), providers.map(zeroX), url, zeroX(activityId), immutableUrl],
      txParams,
    )
  }

  /**
   * It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract with a ERC-1155 NFT attached to it
   *
   * @param did - The unique identifier of the asset
   * @param checksum - Checksum resulted of hash the asset metadata
   * @param providers - List of addresses in charge of interact with the asset
   * @param owner - Address of the user registering the DID
   * @param nftAttributes - Attributes of the NFT associated to the NFT
   * @param url - URL to the metadata in the Metadata/Marketplace API
   * @param immutableUrl - Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc
   * @param activityId - Provenance identifier about the asset registration action
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async registerMintableDID(
    did: string,
    nftContractAddress: string,
    checksum: string,
    providers: string[],
    owner: NvmAccount,
    nftAttributes: NFTAttributes,
    url: string,
    immutableUrl = '',
    activityId = SignatureUtils.hash(DEFAULT_REGISTRATION_ACTIVITY_ID),
    txParams?: txParams,
  ) {
    return this.send(
      'registerMintableDID',
      owner,
      [
        didZeroX(did),
        zeroX(nftContractAddress),
        zeroX(checksum),
        providers.map(zeroX),
        url,
        nftAttributes.cap,
        nftAttributes.royaltyAttributes?.amount ?? 0,
        nftAttributes.preMint,
        zeroPadValue(activityId as `0x${string}`, 32),
        nftAttributes.nftMetadataUrl || '',
        immutableUrl,
      ],
      txParams,
    )
  }

  /**
   * It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract with a ERC-721 NFT attached to it
   *
   * @param did - The unique identifier of the asset
   * @param checksum - Checksum resulted of hash the asset metadata
   * @param providers - List of addresses in charge of interact with the asset
   * @param owner - Account of the user registering the DID
   * @param nftAttributes - Attributes of the NFT associated to the NFT
   * @param url - URL to the metadata in the Metadata/Marketplace API
   * @param immutableUrl - Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc
   * @param activityId - Provenance identifier about the asset registration action
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async registerMintableDID721(
    did: string,
    nftContractAddress: string,
    checksum: string,
    providers: string[],
    owner: NvmAccount,
    nftAttributes: NFTAttributes,
    url: string,
    immutableUrl = '',
    activityId = SignatureUtils.hash(DEFAULT_REGISTRATION_ACTIVITY_ID),
    txParams?: txParams,
  ) {
    return this.send(
      'registerMintableDID721',
      owner,
      [
        didZeroX(did),
        zeroX(nftContractAddress),
        zeroX(checksum),
        providers.map(zeroX),
        url,
        nftAttributes.royaltyAttributes?.amount ?? 0,
        nftAttributes.preMint,
        zeroPadValue(activityId as `0x${string}`, 32),
        immutableUrl,
      ],
      txParams,
    )
  }

  /**
   * It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract with a ERC-721 NFT attached to it
   *
   * @param did - The unique identifier of the asset
   * @param checksum - Checksum resulted of hash the asset metadata
   * @param owner - Account of the user registering the DID
   * @param url - URL to the metadata in the Metadata/Marketplace API
   * @param immutableUrl - Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async updateMetadataUrl(
    did: string,
    checksum: string,
    owner: NvmAccount,
    url: string,
    immutableUrl = '',
    txParams?: txParams,
  ) {
    return this.send(
      'updateMetadataUrl',
      owner,
      [didZeroX(did), checksum, url, immutableUrl],
      txParams,
    )
  }

  /**
   * It activates a NFT associated to a NFT (ERC-1155) and allows to pre-mint. This method only can be called once per DID, so if this was called
   * or executed before internally the method will fail.
   * Only use if the intention is to register a mintable asset and it was registered via `registerDID` or `registerAttribute`
   *
   * @param did - The unique identifier of the asset
   * @param cap - Max number of editions
   * @param royalties - Asset royalties in the secondary market
   * @param preMint - If true pre-mints the editions of NFT
   * @param owner - Account of the user registering the DID
   * @param nftMetadata - URL to the metadata describing the NFT
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async enableAndMintDidNft(
    did: string,
    cap: number,
    royalties: number,
    preMint: boolean,
    owner: NvmAccount,
    nftMetadata: string,
    txParams?: txParams,
  ) {
    return this.send(
      'enableAndMintDidNft',
      owner,
      [didZeroX(did), cap, royalties, preMint, nftMetadata],
      txParams,
    )
  }

  /**
   * It activates a NFT associated to a NFT (ERC-721) and allows to pre-mint. This method only can be called once per DID, so if this was called
   * or executed before internally the method will fail.
   * Only use if the intention is to register a mintable asset and it was registered via `registerDID` or `registerAttribute`
   *
   * @param did - The unique identifier of the asset
   * @param royalties - Asset royalties in the secondary market
   * @param preMint - If true pre-mints the editions of NFT
   * @param owner - Account of the user registering the DID
   * @param nftMetadata - URL to the metadata describing the NFT
   * @param txParams - Transaction additional parameters
   * @returns Contract Receipt
   */
  public async enableAndMintDidNft721(
    did: string,
    royalties: number,
    preMint: boolean,
    owner: NvmAccount,
    nftMetadata: string,
    txParams?: txParams,
  ) {
    return this.send(
      'enableAndMintDidNft721',
      owner,
      [didZeroX(did), royalties, preMint, nftMetadata],
      txParams,
    )
  }

  public async getDIDOwner(did: string): Promise<string> {
    return this.call('getDIDOwner', [didZeroX(did)]) as Promise<string>
  }

  public async getBlockNumberUpdated(did: string): Promise<number> {
    const blockNumber: any = await this.call('getBlockNumberUpdated', [didZeroX(did)])
    return +blockNumber
  }

  public async isDIDProvider(did: string, provider: string): Promise<string> {
    return this.call('isDIDProvider', [didZeroX(did), zeroX(provider)]) as Promise<string>
  }

  public async getAttributesByOwner(owner: string): Promise<string[]> {
    return (
      await this.events!.getPastEvents({
        eventName: 'DIDAttributeRegistered',
        filterJsonRpc: { _owner: zeroX(owner) },
        filterSubgraph: { where: { _owner: zeroX(owner) } },
        result: {
          _did: true,
          _owner: true,
          _value: true,
          _lastUpdatedBy: true,
          _blockNumberUpdated: true,
        },
      })
    )
      .map((event) => {
        if (event.args) {
          return event.args._did
        } else {
          return event._did
        }
      })
      .map(didPrefixed)
  }

  public async getAttributesByDid(did: string): Promise<{
    did: string
    serviceEndpoint: string
    checksum: string
    owner: string
    providers: string[]
    royalties: bigint
    immutableUrl: string
    nftInitialized: boolean
  }> {
    const registeredValues: any = await this.call('getDIDRegister', [didZeroX(did)])
    if (registeredValues[4] < 1)
      // If not valid `blockNumberUpdated` is because the asset doesn't exist on-chain
      throw new AssetError(`Asset with DID ${did} not found on-chain`)
    return {
      did,
      serviceEndpoint: registeredValues[2],
      checksum: registeredValues[1],
      owner: registeredValues[0],
      providers: registeredValues[5],
      royalties: BigInt(registeredValues[6]),
      immutableUrl: registeredValues[7],
      nftInitialized: registeredValues[8],
    }
  }

  public async grantPermission(
    did: string,
    grantee: string,
    owner: NvmAccount,
    txParams?: txParams,
  ) {
    return this.send('grantPermission', owner, [didZeroX(did), zeroX(grantee)], txParams)
  }

  public async revokePermission(
    did: string,
    grantee: string,
    owner: NvmAccount,
    txParams?: txParams,
  ) {
    return this.send('revokePermission', owner, [didZeroX(did), zeroX(grantee)], txParams)
  }

  public async setDIDRoyalties(
    did: string,
    scheme: string,
    owner: NvmAccount,
    txParams?: txParams,
  ) {
    return this.send('setDIDRoyalties', owner, [didZeroX(did), zeroX(scheme)], txParams)
  }

  public async getDIDRoyalties(did: string) {
    return this.call('getDIDRoyaltyScheme', [didZeroX(did)])
  }

  public async getPermission(did: string, grantee: string): Promise<boolean> {
    return this.call('getPermission', [didZeroX(did), zeroX(grantee)]) as Promise<boolean>
  }

  public async transferDIDOwnership(
    did: string,
    newOwnerAddress: string,
    owner: NvmAccount,
    params?: txParams,
  ) {
    return this.send('transferDIDOwnership', owner, [didZeroX(did), zeroX(newOwnerAddress)], params)
  }

  // Provenance
  public async getDIDProvenanceEvents(did: string) {
    return (
      await this.events!.getPastEvents({
        eventName: 'ProvenanceAttributeRegistered',
        filterJsonRpc: { _did: didZeroX(did) },
        filterSubgraph: { where: { _did: didZeroX(did) } },
        result: {
          id: true,
          provId: true,
          _did: true,
          _agentId: true,
          _activityId: true,
          _relatedDid: true,
          _agentInvolvedId: true,
          _method: true,
          _attributes: true,
          _blockNumberUpdated: true,
        },
      })
    )
      .map((event) => {
        if (event.args === undefined)
          return eventToObject(event) as ProvenanceAttributeRegisteredEvent
        else
          return {
            id: event.args.provId,
            provId: event.args.provId,
            did: event.args._did,
            activityId: event.args._activityId,
            agentInvolvedId: event.args._agentInvolvedId,
            method: event.args._method,
            blockNumberUpdated: event.args._blockNumberUpdated,
            attributes: event.args._attributes,
          } as ProvenanceAttributeRegisteredEvent
      })
      .map((event) => ({ ...event, method: Number(event.method) }))
      .sort(
        (
          firstEvent: ProvenanceAttributeRegisteredEvent,
          secondEvent: ProvenanceAttributeRegisteredEvent,
        ) =>
          Number(firstEvent.blockNumberUpdated) > Number(secondEvent.blockNumberUpdated) ? 1 : -1,
      )
  }

  public async getDIDProvenanceMethodEvents<T extends ProvenanceMethod>(
    did: string,
    method: T,
  ): Promise<ProvenanceEvent<T>[]> {
    let filter: any = { _did: didZeroX(did) }
    let eventName = ''
    switch (method) {
      case ProvenanceMethod.ACTED_ON_BEHALF:
        filter = { _entityDid: didZeroX(did) }
        eventName = 'ActedOnBehalf'
        break
      case ProvenanceMethod.WAS_ASSOCIATED_WITH:
        eventName = 'WasAssociatedWith'
        filter = { _entityDid: didZeroX(did) }
        break
      case ProvenanceMethod.WAS_DERIVED_FROM:
        eventName = 'WasDerivedFrom'
        filter = { _usedEntityDid: didZeroX(did) }
        break
      case ProvenanceMethod.USED:
        eventName = 'Used'
        break
      case ProvenanceMethod.WAS_GENERATED_BY:
        eventName = 'WasGeneratedBy'
        break
    }
    const eventOptions = {
      eventName,
      filterJsonRpc: filter,
      filterSubgraph: { where: filter },
      result: {
        provId: true,
        _activityId: true,
        _blockNumberUpdated: true,
      },
    }
    const events = await this.events!.getPastEvents(eventOptions)
    return events
      .map((event) => eventToObject(event))
      .map((event) => ({ ...event, method: +method }))
      .sort(
        (
          firstEvent: ProvenanceAttributeRegisteredEvent,
          secondEvent: ProvenanceAttributeRegisteredEvent,
        ) =>
          Number(firstEvent.blockNumberUpdated) > Number(secondEvent.blockNumberUpdated) ? 1 : -1,
      )
  }

  public async getProvenanceEntry(provId: string) {
    const provenance: ProvenanceRegistry = await this.call('getProvenanceEntry', [zeroX(provId)])
    const did = provenance[0]
    console.log(provenance)
    if (did.match(/^0x0+$/)) {
      return
    }
    return {
      did,
      relatedDid: provenance[1],
      agentId: provenance[2],
      activityId: provenance[3],
      agentInvolvedId: provenance[4],
      method: provenance[5] as ProvenanceMethod,
      createdBy: provenance[6],
      blockNumberUpdated: provenance[7],
      signatureDelegate: provenance[8],
    }
  }

  public async used(
    provId: string,
    did: string,
    agentId: string,
    activityId: string,
    signatureUsing: string,
    attributes: string,
    owner: NvmAccount,
    params?: txParams,
  ) {
    return this.send(
      'used',
      owner,
      [
        zeroX(provId),
        didZeroX(did),
        zeroX(agentId),
        zeroX(activityId),
        zeroX(signatureUsing),
        attributes,
      ],
      params,
    )
  }

  public async wasDerivedFrom(
    provId: string,
    newEntityDid: string,
    usedEntityDid: string,
    agentId: string,
    activityId: string,
    attributes: string,
    owner: NvmAccount,
    params?: txParams,
  ) {
    return this.send(
      'wasDerivedFrom',
      owner,
      [
        zeroX(provId),
        zeroX(newEntityDid),
        zeroX(usedEntityDid),
        zeroX(agentId),
        zeroX(activityId),
        attributes,
      ],
      params,
    )
  }

  public async wasAssociatedWith(
    provId: string,
    did: string,
    agentId: string,
    activityId: string,
    attributes: string,
    owner: NvmAccount,
    params?: txParams,
  ) {
    return this.send(
      'wasAssociatedWith',
      owner,
      [zeroX(provId), didZeroX(did), zeroX(agentId), zeroX(activityId), attributes],
      params,
    )
  }

  public async actedOnBehalf(
    provId: string,
    did: string,
    delegateAgentId: string,
    responsibleAgentId: string,
    activityId: string,
    signatureDelegate: string,
    attributes: string,
    owner: NvmAccount,
    params?: txParams,
  ) {
    return this.send(
      'actedOnBehalf',
      owner,
      [
        zeroX(provId),
        didZeroX(did),
        zeroX(delegateAgentId),
        zeroX(responsibleAgentId),
        zeroX(activityId),
        zeroX(signatureDelegate),
        attributes,
      ],
      params,
    )
  }

  public async addDidProvenanceDelegate(
    did: string,
    delegateAddress: string,
    owner: NvmAccount,
    params?: txParams,
  ) {
    return this.send(
      'addDIDProvenanceDelegate',
      owner,
      [didZeroX(did), zeroX(delegateAddress)],
      params,
    )
  }

  public async removeDidProvenanceDelegate(
    did: string,
    delegateAddress: string,
    owner: NvmAccount,
    params?: txParams,
  ) {
    return this.send(
      'removeDIDProvenanceDelegate',
      owner,
      [didZeroX(did), zeroX(delegateAddress)],
      params,
    )
  }

  public async isProvenanceDelegate(did: string, delegateAddress: string) {
    return this.call('isProvenanceDelegate', [didZeroX(did), zeroX(delegateAddress)])
  }

  public async getProvenanceOwner(did: string) {
    return this.call('getProvenanceOwner', [didZeroX(did)])
  }

  public async mint(did: string, amount: bigint, from: NvmAccount, params?: txParams) {
    return this.send('mint', from, [didZeroX(did), amount], params)
  }

  public async burn(did: string, amount: bigint, from: NvmAccount, params?: txParams) {
    return this.send('burn', from, [didZeroX(did), amount], params)
  }

  public async addProvider(did: string, provider: string, from: NvmAccount, params?: txParams) {
    return await this.send('addDIDProvider', from, [didZeroX(did), zeroX(provider)], params)
  }

  public async removeProvider(did: string, provider: string, from: NvmAccount, params?: txParams) {
    return await this.send('removeDIDProvider', from, [didZeroX(did), zeroX(provider)], params)
  }

  public async getProviders(did: string) {
    const registeredValues: any = await this.call('getDIDRegister', [didZeroX(did)])
    return registeredValues[5].filter((x: string) => x != ZeroAddress)
  }

  public async getDIDRegister(did: string) {
    return this.call('getDIDRegister', [didZeroX(did)])
  }

  public async getNFTInfo(did: string) {
    return this.call('getNFTInfo', [didZeroX(did)])
  }

  public async hashDID(didSeed: string, creator: string): Promise<string> {
    return this.call('hashDID', [didZeroX(didSeed), zeroX(creator)])
  }

  public async grantRegistryOperatorRole(manager: string, from: NvmAccount, params?: txParams) {
    return await this.send('grantRegistryOperatorRole', from, [zeroX(manager)], params)
  }
}
