[@nevermined-io/nevermined-sdk-js](../code-reference.md) / DID

# Class: DID

Decentralized ID.

## Table of contents

### Constructors

- [constructor](DID.md#constructor)

### Properties

- [id](DID.md#id)

### Methods

- [getDid](DID.md#getdid)
- [getId](DID.md#getid)
- [generate](DID.md#generate)
- [parse](DID.md#parse)

## Constructors

### constructor

• `Private` **new DID**(`id`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Defined in

[src/nevermined/DID.ts:45](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/DID.ts#L45)

## Properties

### id

• `Private` **id**: `string`

ID.

#### Defined in

[src/nevermined/DID.ts:43](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/DID.ts#L43)

## Methods

### getDid

▸ **getDid**(): `string`

Returns the DID.

#### Returns

`string`

A string with the prefixed id.

#### Defined in

[src/nevermined/DID.ts:53](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/DID.ts#L53)

___

### getId

▸ **getId**(): `string`

Returns the ID.

#### Returns

`string`

A string of the _id_ without the prefix.

#### Defined in

[src/nevermined/DID.ts:61](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/DID.ts#L61)

___

### generate

▸ `Static` **generate**(): [`DID`](DID.md)

Returns a new DID.

#### Returns

[`DID`](DID.md)

[DID](DID.md)

#### Defined in

[src/nevermined/DID.ts:36](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/DID.ts#L36)

___

### parse

▸ `Static` **parse**(`didString`): [`DID`](DID.md)

Parses a DID from a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `didString` | `string` \| [`DID`](DID.md) | DID in string. |

#### Returns

[`DID`](DID.md)

[DID](DID.md)

#### Defined in

[src/nevermined/DID.ts:14](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/DID.ts#L14)
