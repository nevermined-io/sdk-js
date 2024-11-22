[@nevermined-io/sdk - v3.0.44](../code-reference.md) / DIDResolvePolicy

# Enumeration: DIDResolvePolicy

It described the policy to be used when resolving an asset. It has the following options:

- ImmutableFirst - It checks if there is a reference to an immutable data-store (IPFS, Filecoin, etc) on-chain. If that's the case uses the URL to resolve the Metadata. If not try to resolve the metadata using the URL of the Metadata/Marketplace API
- MetadataAPIFirst - Try to resolve the metadata from the Marketplace/Metadata API, if it can't tries to resolve using the immutable url
- OnlyImmutable - Try to resolve the metadata only from the immutable data store URL
- OnlyMetadataAPI - Try to resolve the metadata only from the Metadata API. It gets the metadata api url from the DIDRegistry
- NoRegisry - Gets the metadata from the Metadata API using as endpoint the metadata api url from the SDK config. This method don't gets any on-chain information because assumes the DID is not registered on-chain

## Table of contents

### Enumeration Members

- [ImmutableFirst](DIDResolvePolicy.md#immutablefirst)
- [MetadataAPIFirst](DIDResolvePolicy.md#metadataapifirst)
- [NoRegistry](DIDResolvePolicy.md#noregistry)
- [OnlyImmutable](DIDResolvePolicy.md#onlyimmutable)
- [OnlyMetadataAPI](DIDResolvePolicy.md#onlymetadataapi)

## Enumeration Members

### ImmutableFirst

• **ImmutableFirst** = `0`

#### Defined in

[src/types/MetadataTypes.ts:10](https://github.com/nevermined-io/sdk-js/blob/73bbd7adf913370f1a2da0a0873209115a3fbd62/src/types/MetadataTypes.ts#L10)

---

### MetadataAPIFirst

• **MetadataAPIFirst** = `1`

#### Defined in

[src/types/MetadataTypes.ts:11](https://github.com/nevermined-io/sdk-js/blob/73bbd7adf913370f1a2da0a0873209115a3fbd62/src/types/MetadataTypes.ts#L11)

---

### NoRegistry

• **NoRegistry** = `4`

#### Defined in

[src/types/MetadataTypes.ts:14](https://github.com/nevermined-io/sdk-js/blob/73bbd7adf913370f1a2da0a0873209115a3fbd62/src/types/MetadataTypes.ts#L14)

---

### OnlyImmutable

• **OnlyImmutable** = `2`

#### Defined in

[src/types/MetadataTypes.ts:12](https://github.com/nevermined-io/sdk-js/blob/73bbd7adf913370f1a2da0a0873209115a3fbd62/src/types/MetadataTypes.ts#L12)

---

### OnlyMetadataAPI

• **OnlyMetadataAPI** = `3`

#### Defined in

[src/types/MetadataTypes.ts:13](https://github.com/nevermined-io/sdk-js/blob/73bbd7adf913370f1a2da0a0873209115a3fbd62/src/types/MetadataTypes.ts#L13)
