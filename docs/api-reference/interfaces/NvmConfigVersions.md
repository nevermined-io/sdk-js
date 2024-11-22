[@nevermined-io/sdk - v3.0.43](../code-reference.md) / NvmConfigVersions

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

[src/types/DDOTypes.ts:638](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/types/DDOTypes.ts#L638)

---

### id

• **id**: `number`

The id of the DDO revision.

**`Remarks`**

This is a self incrementing number

#### Defined in

[src/types/DDOTypes.ts:630](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/types/DDOTypes.ts#L630)

---

### immutableBackend

• `Optional` **immutableBackend**: [`ImmutableBackends`](../enums/ImmutableBackends.md)

The immutable solution to record the DDO

#### Defined in

[src/types/DDOTypes.ts:648](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/types/DDOTypes.ts#L648)

---

### immutableUrl

• `Optional` **immutableUrl**: `string`

ID Hash of the metadata recorded in an immutable data store (IPFS, Filecoin, Arweave, ..)

#### Defined in

[src/types/DDOTypes.ts:643](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/types/DDOTypes.ts#L643)

---

### updated

• **updated**: `string`

The date when the update occurred.

#### Defined in

[src/types/DDOTypes.ts:634](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/types/DDOTypes.ts#L634)
