[@nevermined-io/sdk - v3.0.31](../code-reference.md) / NvmConfigVersions

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

[src/types/DDOTypes.ts:594](https://github.com/nevermined-io/sdk-js/blob/1c7b11ad598c195e6a484cc8f4ca9cc52a947a9f/src/types/DDOTypes.ts#L594)

---

### id

• **id**: `number`

The id of the DDO revision.

**`Remarks`**

This is a self incrementing number

#### Defined in

[src/types/DDOTypes.ts:586](https://github.com/nevermined-io/sdk-js/blob/1c7b11ad598c195e6a484cc8f4ca9cc52a947a9f/src/types/DDOTypes.ts#L586)

---

### immutableBackend

• `Optional` **immutableBackend**: [`ImmutableBackends`](../enums/ImmutableBackends.md)

The immutable solution to record the DDO

#### Defined in

[src/types/DDOTypes.ts:604](https://github.com/nevermined-io/sdk-js/blob/1c7b11ad598c195e6a484cc8f4ca9cc52a947a9f/src/types/DDOTypes.ts#L604)

---

### immutableUrl

• `Optional` **immutableUrl**: `string`

ID Hash of the metadata recorded in an immutable data store (IPFS, Filecoin, Arweave, ..)

#### Defined in

[src/types/DDOTypes.ts:599](https://github.com/nevermined-io/sdk-js/blob/1c7b11ad598c195e6a484cc8f4ca9cc52a947a9f/src/types/DDOTypes.ts#L599)

---

### updated

• **updated**: `string`

The date when the update occurred.

#### Defined in

[src/types/DDOTypes.ts:590](https://github.com/nevermined-io/sdk-js/blob/1c7b11ad598c195e6a484cc8f4ca9cc52a947a9f/src/types/DDOTypes.ts#L590)
