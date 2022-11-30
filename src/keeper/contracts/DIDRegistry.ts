import ContractBase, { TxParameters } from './ContractBase'
import { zeroX, didPrefixed, didZeroX, eventToObject, ZeroAddress } from '../../utils'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { ContractReceipt, ethers } from 'ethers'
import BigNumber from '../../utils/BigNumber'
import { NFTAttributes } from '../../models/NFTAttributes'
import { Assets } from '../../nevermined/Assets'

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

interface ProvenanceBaseEvent {
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

export default class DIDRegistry extends ContractBase {
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
     * @param ownerAddress - Address of the user registering the DID
     * @param params - Transaction additional parameters     
     * @returns Contract Receipt
     */     
    public async registerAttribute(
        did: string,
        checksum: string,
        providers: string[],
        url: string,
        ownerAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'registerAttribute',
            ownerAddress,
            [didZeroX(did), zeroX(checksum), providers.map(zeroX), url],
            params
        )
    }

    /**
     * It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract
     *
     * @param did - The unique identifier of the asset
     * @param checksum - Checksum resulted of hash the asset metadata
     * @param providers - List of addresses in charge of interact with the asset
     * @param ownerAddress - Address of the user registering the DID
     * @param url - URL to the metadata in the Metadata/Marketplace API     
     * @param immutableUrl - Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc
     * @param activityId - Provenance identifier about the asset registration action
     * @param params - Transaction additional parameters     
     * @returns Contract Receipt
     */ 
    public async registerDID(
        did: string,
        checksum: string,
        providers: string[],
        ownerAddress: string,
        url: string,
        immutableUrl = '',
        activityId = Assets.DEFAULT_REGISTRATION_ACTIVITY_ID,
        params?: TxParameters
    ) {
        return this.send(
            'registerDID',
            ownerAddress,
            [
                didZeroX(did),
                zeroX(checksum),
                providers.map(zeroX),
                url,
                zeroX(activityId),
                immutableUrl
            ],
            params
        )
    }

    /**
     * It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract with a ERC-1155 NFT attached to it
     *
     * @param did - The unique identifier of the asset
     * @param checksum - Checksum resulted of hash the asset metadata
     * @param providers - List of addresses in charge of interact with the asset
     * @param ownerAddress - Address of the user registering the DID
     * @param nftAttributes - Attributes of the NFT associated to the NFT
     * @param url - URL to the metadata in the Metadata/Marketplace API
     * @param immutableUrl - Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc
     * @param activityId - Provenance identifier about the asset registration action
     * @param params - Transaction additional parameters     
     * @returns Contract Receipt
     */     
    public async registerMintableDID(
        did: string,
        checksum: string,
        providers: string[],
        ownerAddress: string,
        nftAttributes: NFTAttributes,
        url: string,
        immutableUrl = '',    
        activityId = Assets.DEFAULT_REGISTRATION_ACTIVITY_ID,
        params?: TxParameters
    ) {

        return this.send(
            'registerMintableDID',
            ownerAddress,
            [
                didZeroX(did),
                zeroX(checksum),
                providers.map(zeroX),
                url,
                String(nftAttributes.cap),
                (nftAttributes.royaltyAttributes?.amount) > 0 ? String(nftAttributes.royaltyAttributes?.amount) : '0',
                nftAttributes.preMint,
                ethers.utils.hexZeroPad(zeroX(activityId), 32),
                nftAttributes.nftMetadataUrl || '',
                immutableUrl
            ],
            params
        )
    }

    /**
     * It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract with a ERC-721 NFT attached to it
     *
     * @param did - The unique identifier of the asset
     * @param checksum - Checksum resulted of hash the asset metadata
     * @param providers - List of addresses in charge of interact with the asset
     * @param ownerAddress - Address of the user registering the DID
     * @param nftAttributes - Attributes of the NFT associated to the NFT
     * @param url - URL to the metadata in the Metadata/Marketplace API
     * @param immutableUrl - Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc
     * @param activityId - Provenance identifier about the asset registration action
     * @param params - Transaction additional parameters     
     * @returns Contract Receipt
     */      
    public async registerMintableDID721(
        did: string,
        checksum: string,
        providers: string[],
        ownerAddress: string,
        nftAttributes: NFTAttributes,
        url: string,
        immutableUrl = '',    
        activityId = Assets.DEFAULT_REGISTRATION_ACTIVITY_ID,
        params?: TxParameters
    ) {
        return this.send(
            'registerMintableDID721',
            ownerAddress,
            [
                didZeroX(did),
                zeroX(checksum),
                providers.map(zeroX),
                url,
                (nftAttributes.royaltyAttributes?.amount) > 0 ? String(nftAttributes.royaltyAttributes?.amount) : '0',
                nftAttributes.preMint,
                ethers.utils.hexZeroPad(zeroX(activityId), 32),
                immutableUrl
            ],
            params
        )
    }

    /**
     * It registers a decentralized identifier (aka DID) in the `DIDRegistry` smart contract with a ERC-721 NFT attached to it
     *
     * @param did - The unique identifier of the asset
     * @param checksum - Checksum resulted of hash the asset metadata
     * @param ownerAddress - Address of the user registering the DID
     * @param url - URL to the metadata in the Metadata/Marketplace API
     * @param immutableUrl - Hash or URL to the metadata stored in a immutable data store like IPFS, Filecoin, etc
     * @param params - Transaction additional parameters     
     * @returns Contract Receipt
     */           
     public async updateMetadataUrl(
        did: string,
        checksum: string,
        ownerAddress: string,
        url: string,
        immutableUrl = '',
        params?: TxParameters
    ) {
        return this.send(
            'updateMetadataUrl',
            ownerAddress,
            [didZeroX(did), checksum, url, immutableUrl],
            params
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
     * @param ownerAddress - Address of the user registering the DID
     * @param nftMetadata - URL to the metadata describing the NFT
     * @param params - Transaction additional parameters     
     * @returns Contract Receipt
     */     
    public async enableAndMintDidNft(
        did: string,
        cap: number,
        royalties: number,
        preMint: boolean,
        ownerAddress: string,
        nftMetadata: string,
        params?: TxParameters
    ) {
        return this.send(
            'enableAndMintDidNft',
            ownerAddress,
            [didZeroX(did), cap, royalties, preMint, nftMetadata],
            params
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
     * @param ownerAddress - Address of the user registering the DID
     * @param nftMetadata - URL to the metadata describing the NFT
     * @param params - Transaction additional parameters     
     * @returns Contract Receipt
     */     
    public async enableAndMintDidNft721(
        did: string,
        royalties: number,
        preMint: boolean,
        ownerAddress: string,
        nftMetadata: string,
        params?: TxParameters
    ) {
        return this.send(
            'enableAndMintDidNft721',
            ownerAddress,
            [didZeroX(did), royalties, preMint, nftMetadata],
            params
        )
    }

    public async getDIDOwner(did: string): Promise<string> {
        return this.call('getDIDOwner', [didZeroX(did)])
    }

    public async getBlockNumberUpdated(did: string): Promise<number> {
        return +(await this.call('getBlockNumberUpdated', [didZeroX(did)]))
    }

    public async isDIDProvider(did: string, provider: string): Promise<string> {
        return this.call('isDIDProvider', [didZeroX(did), zeroX(provider)])
    }

    public async getAttributesByOwner(owner: string): Promise<string[]> {
        return (
            await this.events.getPastEvents({
                eventName: 'DIDAttributeRegistered',
                methodName: 'getDIDAttributeRegistereds',
                filterJsonRpc: { _owner: zeroX(owner) },
                filterSubgraph: { where: { _owner: zeroX(owner) } },
                result: {
                    _did: true,
                    _owner: true,
                    _value: true,
                    _lastUpdatedBy: true,
                    _blockNumberUpdated: true
                }
            })
        )
            .map(event => {
                if (event.args) {
                    return event.args._did
                } else {
                    return event._did
                }
            })
            .map(didPrefixed)
    }

    public async getAttributesByDid(
        did: string
    ): Promise<{ did: string; serviceEndpoint: string; checksum: string }> {
        const registeredValues = await this.call('getDIDRegister', [didZeroX(did)])
        return {
            did,
            serviceEndpoint: registeredValues[2],
            checksum: registeredValues[1]
        }
    }

    public async grantPermission(
        did: string,
        grantee: string,
        ownerAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'grantPermission',
            ownerAddress,
            [didZeroX(did), zeroX(grantee)],
            params
        )
    }

    public async revokePermission(
        did: string,
        grantee: string,
        ownerAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'revokePermission',
            ownerAddress,
            [didZeroX(did), zeroX(grantee)],
            params
        )
    }

    public async setDIDRoyalties(
        did: string,
        scheme: string,
        ownerAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'setDIDRoyalties',
            ownerAddress,
            [didZeroX(did), zeroX(scheme)],
            params
        )
    }

    public async getDIDRoyalties(did: string) {
        return this.call('getDIDRoyaltyScheme', [didZeroX(did)])
    }

    public async getPermission(did: string, grantee: string): Promise<boolean> {
        return this.call('getPermission', [didZeroX(did), zeroX(grantee)])
    }

    public async transferDIDOwnership(
        did: string,
        newOwnerAddress: string,
        ownerAddress: string,
        params?: TxParameters
    ): Promise<ContractReceipt> {
        return this.send(
            'transferDIDOwnership',
            ownerAddress,
            [didZeroX(did), zeroX(newOwnerAddress)],
            params
        )
    }

    // Provenance
    public async getDIDProvenanceEvents(did: string) {
        return (
            await this.events.getPastEvents({
                eventName: 'ProvenanceAttributeRegistered',
                methodName: 'getProvenanceAttributeRegistereds',
                filterJsonRpc: { _did: didZeroX(did) },
                filterSubgraph: { where: { _did: didZeroX(did) } },
                result: {
                    provId: true,
                    _did: true,
                    _agentId: true,
                    _activityId: true,
                    _relatedDid: true,
                    _agentInvolvedId: true,
                    _method: true,
                    _attributes: true,
                    _blockNumberUpdated: true
                }
            })
        )
            .map(event => {
                if (event.args === undefined)
                    return eventToObject(event) as ProvenanceAttributeRegisteredEvent
                else
                    return eventToObject(event.args) as ProvenanceAttributeRegisteredEvent
            })
            .map(event => ({ ...event, method: +event.method }))
            .sort(
                (
                    firstEvent: ProvenanceAttributeRegisteredEvent,
                    secondEvent: ProvenanceAttributeRegisteredEvent
                ) =>
                    Number(firstEvent.blockNumberUpdated) >
                    Number(secondEvent.blockNumberUpdated)
                        ? 1
                        : -1
            )
    }

    public async getDIDProvenanceMethodEvents<T extends ProvenanceMethod>(
        did: string,
        method: T
    ): Promise<ProvenanceEvent<T>[]> {
        let filter: any = { _did: didZeroX(did) }
        let methodName = ''
        let eventName = ''
        switch (method) {
            case ProvenanceMethod.ACTED_ON_BEHALF:
                filter = { _entityDid: didZeroX(did) }
                eventName = 'ActedOnBehalf'
                methodName = 'getActedOnBehalfs'
                break
            case ProvenanceMethod.WAS_ASSOCIATED_WITH:
                eventName = 'WasAssociatedWith'
                methodName = 'getWasAssociatedWiths'
                filter = { _entityDid: didZeroX(did) }
                break
            case ProvenanceMethod.WAS_DERIVED_FROM:
                eventName = 'WasDerivedFrom'
                methodName = 'getWasDerivedFroms'
                filter = { _usedEntityDid: didZeroX(did) }
                break
            case ProvenanceMethod.USED:
                eventName = 'Used'
                methodName = 'getUseds'
                break
            case ProvenanceMethod.WAS_GENERATED_BY:
                eventName = 'WasGeneratedBy'
                methodName = 'getWasGeneratedBys'
                break
        }
        const eventOptions = {
            eventName,
            methodName,
            filterJsonRpc: filter,
            filterSubgraph: { where: filter },
            result: {
                provId: true,
                _activityId: true,
                _blockNumberUpdated: true
            }
        }
        const events = await this.events.getPastEvents(eventOptions)
        return events
            .map(event => eventToObject(event))
            .map(event => ({ ...event, method: +method }))
            .sort(
                (
                    firstEvent: ProvenanceAttributeRegisteredEvent,
                    secondEvent: ProvenanceAttributeRegisteredEvent
                ) =>
                    Number(firstEvent.blockNumberUpdated) >
                    Number(secondEvent.blockNumberUpdated)
                        ? 1
                        : -1
            )
    }

    public async getProvenanceEntry(provId: string) {
        const provenance: ProvenanceRegistry = await this.call('getProvenanceEntry', [
            zeroX(provId)
        ])
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
        ownerAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'used',
            ownerAddress,
            [
                zeroX(provId),
                didZeroX(did),
                zeroX(agentId),
                zeroX(activityId),
                zeroX(signatureUsing),
                attributes
            ],
            params
        )
    }

    public async wasDerivedFrom(
        provId: string,
        newEntityDid: string,
        usedEntityDid: string,
        agentId: string,
        activityId: string,
        attributes: string,
        ownerAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'wasDerivedFrom',
            ownerAddress,
            [
                zeroX(provId),
                zeroX(newEntityDid),
                zeroX(usedEntityDid),
                zeroX(agentId),
                zeroX(activityId),
                attributes
            ],
            params
        )
    }

    public async wasAssociatedWith(
        provId: string,
        did: string,
        agentId: string,
        activityId: string,
        attributes: string,
        ownerAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'wasAssociatedWith',
            ownerAddress,
            [zeroX(provId), didZeroX(did), zeroX(agentId), zeroX(activityId), attributes],
            params
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
        ownerAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'actedOnBehalf',
            ownerAddress,
            [
                zeroX(provId),
                didZeroX(did),
                zeroX(delegateAgentId),
                zeroX(responsibleAgentId),
                zeroX(activityId),
                zeroX(signatureDelegate),
                attributes
            ],
            params
        )
    }

    public async addDidProvenanceDelegate(
        did: string,
        delegateAddress: string,
        ownerAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'addDIDProvenanceDelegate',
            ownerAddress,
            [didZeroX(did), zeroX(delegateAddress)],
            params
        )
    }

    public async removeDidProvenanceDelegate(
        did: string,
        delegateAddress: string,
        ownerAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'removeDIDProvenanceDelegate',
            ownerAddress,
            [didZeroX(did), zeroX(delegateAddress)],
            params
        )
    }

    public async isProvenanceDelegate(did: string, delegateAddress: string) {
        return this.call('isProvenanceDelegate', [didZeroX(did), zeroX(delegateAddress)])
    }

    public async getProvenanceOwner(did: string) {
        return this.call('getProvenanceOwner', [didZeroX(did)])
    }

    public async mint(
        did: string,
        amount: BigNumber,
        from: string,
        params?: TxParameters
    ) {
        return this.send('mint', from, [didZeroX(did), String(amount)], params)
    }

    public async burn(
        did: string,
        amount: BigNumber,
        from: string,
        params?: TxParameters
    ) {
        return this.send('burn', from, [didZeroX(did), String(amount)], params)
    }

    public async addProvider(
        did: string,
        provider: string,
        from: string,
        params?: TxParameters
    ) {
        return await this.send(
            'addDIDProvider',
            from,
            [didZeroX(did), zeroX(provider)],
            params
        )
    }

    public async removeProvider(
        did: string,
        provider: string,
        from: string,
        params?: TxParameters
    ) {
        return await this.send(
            'removeDIDProvider',
            from,
            [didZeroX(did), zeroX(provider)],
            params
        )
    }

    public async getProviders(did: string) {
        const registeredValues = await this.call('getDIDRegister', [didZeroX(did)])
        return registeredValues[5].filter((x: string) => x != ZeroAddress)
    }

    public async setProxyApproval(
        operator: string,
        approved: boolean,
        from: string,
        params?: TxParameters
    ) {
        return await this.send(
            'setProxyApproval',
            from,
            [zeroX(operator), approved],
            params
        )
    }

    public async getDIDRegister(did: string) {
        return this.call('getDIDRegister', [didZeroX(did)])
    }

    public async hashDID(didSeed: string, creator: string): Promise<string> {
        return this.call('hashDID', [didZeroX(didSeed), zeroX(creator)])
    }

    public async setManager(manager: string, from: string, params?: TxParameters) {
        return await this.send('setManager', from, [zeroX(manager)], params)
    }
}
