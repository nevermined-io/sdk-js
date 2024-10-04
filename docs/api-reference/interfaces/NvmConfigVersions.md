[@nevermined-io/sdk - v3.0.38](../code-reference.md) / NvmConfigVersions

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

[src/types/DDOTypes.ts:644](https://github.com/nevermined-io/sdk-js/blob/19fc2a94ba4543472977483f1df808804d5fb1b7/src/types/DDOTypes.ts#L644)

---

### id

• **id**: `number`

The id of the DDO revision.

**`Remarks`**

This is a self incrementing number

#### Defined in

[src/types/DDOTypes.ts:636](https://github.com/nevermined-io/sdk-js/blob/19fc2a94ba4543472977483f1df808804d5fb1b7/src/types/DDOTypes.ts#L636)

---

### immutableBackend

• `Optional` **immutableBackend**: [`ImmutableBackends`](../enums/ImmutableBackends.md)

The immutable solution to record the DDO

#### Defined in

[src/types/DDOTypes.ts:654](https://github.com/nevermined-io/sdk-js/blob/19fc2a94ba4543472977483f1df808804d5fb1b7/src/types/DDOTypes.ts#L654)

---

### immutableUrl

• `Optional` **immutableUrl**: `string`

ID Hash of the metadata recorded in an immutable data store (IPFS, Filecoin, Arweave, ..)

#### Defined in

[src/types/DDOTypes.ts:649](https://github.com/nevermined-io/sdk-js/blob/19fc2a94ba4543472977483f1df808804d5fb1b7/src/types/DDOTypes.ts#L649)

---

### updated

• **updated**: `string`

The date when the update occurred.

#### Defined in

[src/types/DDOTypes.ts:640](https://github.com/nevermined-io/sdk-js/blob/19fc2a94ba4543472977483f1df808804d5fb1b7/src/types/DDOTypes.ts#L640)
