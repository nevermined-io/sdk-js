export enum AccessStatus {
  Requested,
  Committed,
  Delivered,
  Verified,
  Revoked,
}

export interface InputType {
  name: string

  type: string
}

export enum ERCType {
  nft721 = 721,
  nft1155 = 1155,
}

export enum NeverminedNFT721Type {
  nft721 = 'nft721', // Standard 721 implementation
  nft721Subscription = 'nft721-subscription', // 721 implementing subscriptions that can expire
  nft721POAP = 'nft721-poap', // 721 implementing a Proof of Attendance NFT
  nft721SoulBound = 'nft721-soulbound', // 721 implementing a Proof of Attendance NFT
}

export enum NeverminedNFT1155Type {
  nft1155 = 'nft1155', // Standard 1155 implementation
  nft1155Credit = 'nft1155-credit', // 1155 implementation with a credit system that allow pay-as-you-go scenarios
}

export type NeverminedNFTType = NeverminedNFT721Type | NeverminedNFT1155Type

export const ercOfNeverminedNFTType = {
  nft1155: ERCType.nft1155,
  nft721: ERCType.nft721,
  'nft1155-credit': ERCType.nft1155,
  'nft721-subscription': ERCType.nft721,
}

export const defaultNeverminedNFTType = {
  721: NeverminedNFT721Type.nft721,
  1155: NeverminedNFT1155Type.nft1155,
}

export enum ValueType {
  DID, // DID string e.g. 'did:nv:xxx'
  DIDRef, // hash of DID same as in parameter (bytes32 _did) in text 0x0123abc.. or 0123abc..
  URL, // URL string e.g. 'http(s)://xx'
  DDO, // DDO string in JSON e.g. '{ "id": "did:nv:xxx"...
}

export interface ValuePair {
  type: string
  value: any
}

export interface MethodReflection {
  contractName: string

  methodName: string

  address: string

  signature: string

  inputs: InputType[]
}

export interface Babysig {
  R8: [string, string]
  S: string
}

export interface Balance {
  eth: bigint
  nevermined: bigint
}
