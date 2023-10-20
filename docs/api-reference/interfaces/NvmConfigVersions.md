[@nevermined-io/sdk](../code-reference.md) / NvmConfigVersions

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

[src/ddo/types.ts:542](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L542)

---

### id

• **id**: `number`

The id of the DDO revision.

**`Remarks`**

This is a self incrementing number

#### Defined in

[src/ddo/types.ts:534](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L534)

---

### immutableBackend

• `Optional` **immutableBackend**: [`ImmutableBackends`](../enums/ImmutableBackends.md)

The immutable solution to record the DDO

#### Defined in

[src/ddo/types.ts:552](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L552)

---

### immutableUrl

• `Optional` **immutableUrl**: `string`

ID Hash of the metadata recorded in an immutable data store (IPFS, Filecoin, Arweave, ..)

#### Defined in

[src/ddo/types.ts:547](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L547)

---

### updated

• **updated**: `string`

The date when the update occurred.

#### Defined in

[src/ddo/types.ts:538](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L538)
