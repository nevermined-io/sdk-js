[@nevermined-io/sdk - v3.0.47](../code-reference.md) / NvmConfigVersions

# Interface: NvmConfigVersions

## Table of contents

### Properties

- [checksum](NvmConfigVersions.md#checksum)
- [id](NvmConfigVersions.md#id)
- [immutableBackend](NvmConfigVersions.md#immutablebackend)
- [immutableUrl](NvmConfigVersions.md#immutableurl)
- [updated](NvmConfigVersions.md#updated)

## Properties

### checksum

• **checksum**: `string`

The checksum of the document

#### Defined in

[src/types/DDOTypes.ts:639](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L639)

---

### id

• **id**: `number`

The id of the DDO revision.

**`Remarks`**

This is a self incrementing number

#### Defined in

[src/types/DDOTypes.ts:631](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L631)

---

### immutableBackend

• `Optional` **immutableBackend**: [`ImmutableBackends`](../enums/ImmutableBackends.md)

The immutable solution to record the DDO

#### Defined in

[src/types/DDOTypes.ts:649](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L649)

---

### immutableUrl

• `Optional` **immutableUrl**: `string`

ID Hash of the metadata recorded in an immutable data store (IPFS, Filecoin, Arweave, ..)

#### Defined in

[src/types/DDOTypes.ts:644](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L644)

---

### updated

• **updated**: `string`

The date when the update occurred.

#### Defined in

[src/types/DDOTypes.ts:635](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L635)
