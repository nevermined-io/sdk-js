[@nevermined-io/sdk - v3.0.15](../code-reference.md) / NvmConfigVersions

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

[src/types/DDOTypes.ts:593](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L593)

---

### id

• **id**: `number`

The id of the DDO revision.

**`Remarks`**

This is a self incrementing number

#### Defined in

[src/types/DDOTypes.ts:585](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L585)

---

### immutableBackend

• `Optional` **immutableBackend**: [`ImmutableBackends`](../enums/ImmutableBackends.md)

The immutable solution to record the DDO

#### Defined in

[src/types/DDOTypes.ts:603](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L603)

---

### immutableUrl

• `Optional` **immutableUrl**: `string`

ID Hash of the metadata recorded in an immutable data store (IPFS, Filecoin, Arweave, ..)

#### Defined in

[src/types/DDOTypes.ts:598](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L598)

---

### updated

• **updated**: `string`

The date when the update occurred.

#### Defined in

[src/types/DDOTypes.ts:589](https://github.com/nevermined-io/sdk-js/blob/172733038c5edaf3c10f438cc01aecd8a5cd0ce8/src/types/DDOTypes.ts#L589)
