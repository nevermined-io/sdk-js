/**
 * It described the policy to be used when resolving an asset. It has the following options:
 * * ImmutableFirst - It checks if there is a reference to an immutable data-store (IPFS, Filecoin, etc) on-chain. If that's the case uses the URL to resolve the Metadata. If not try to resolve the metadata using the URL of the Metadata/Marketplace API
 * * MetadataAPIFirst - Try to resolve the metadata from the Marketplace/Metadata API, if it can't tries to resolve using the immutable url
 * * OnlyImmutable - Try to resolve the metadata only from the immutable data store URL
 * * OnlyMetadataAPI - Try to resolve the metadata only from the Metadata API. It gets the metadata api url from the DIDRegistry
 * * NoRegisry - Gets the metadata from the Metadata API using as endpoint the metadata api url from the SDK config. This method don't gets any on-chain information because assumes the DID is not registered on-chain
 */
export enum DIDResolvePolicy {
  ImmutableFirst,
  MetadataAPIFirst,
  OnlyImmutable,
  OnlyMetadataAPI,
  NoRegistry,
}

/**
 * Where the metadata will be published. Options:
 * - OnlyMetadataAPI, The metadata will be stored only in the Metadata/Marketplace API
 * - IPFS, The metadata will be stored in the Metadata/Marketplace API and IPFS
 * - Filecoin, The metadata will be stored in the Metadata/Marketplace API and Filecoin
 * - Arweave, The metadata will be stored in the Metadata/Marketplace API and Arweave
 */
export enum PublishMetadataOptions {
  OnlyMetadataAPI,
  IPFS,
  Filecoin,
  Arweave,
}

/**
 * It specifies if the DID will be published on-chain initially or not.
 */
export enum PublishOnChainOptions {
  DIDRegistry, // The DID and the reference to the DDO will be stored in the DIDRegistry contract
  OnlyOffchain, // THE DID won't be stored on-chain and will be lazy-registered when needed
}

export class AssetPublicationOptions {
  metadata?: PublishMetadataOptions = PublishMetadataOptions.OnlyMetadataAPI
  did?: PublishOnChainOptions = PublishOnChainOptions.DIDRegistry
}

/**
 * The type of royalty
 */
export enum RoyaltyKind {
  Standard,
  Curve,
  Legacy,
}

export interface SearchResults {
  value: number
  relation: 'eq' | 'gte'
}

export interface MarketplaceResults<Entity> {
  page: number
  results: Entity[]
  total_pages: number
  total_results: SearchResults
}

export interface SearchQuery {
  offset?: number
  page?: number
  text?: string
  query?: unknown
  sort?: unknown
  show_unlisted?: boolean
  appId?: string
}

export interface NewBookmark {
  did: string
  userId: string
  description: string
}

export interface Bookmark extends NewBookmark {
  id: string
  createdAt: Date
}

export enum PermissionType {
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Admin = 'admin',
}

export interface NewPermission {
  userId: string
  type: PermissionType[]
  issuer: string
  holder: string
}

export interface Permission extends NewPermission {
  id: string
  issuanceDate: Date
}

export enum State {
  Disabled = 'disabled',
  Unconfirmed = 'unconfirmed',
  Confirmed = 'confirmed',
}

export interface NewProfile {
  isListed: boolean
  state: State
  addresses: string[]
  nickname: string
  name?: string
  email?: string
  additionalInformation?: unknown
}

export interface Profile extends NewProfile {
  userId: string
  creationDate: Date
  updateDate: Date
}

export interface ReducedProfile {
  userId: string
  nickname?: string
  additionalInformation?: unknown
}
