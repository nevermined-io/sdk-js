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

[src/nevermined/DID.ts:46](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/DID.ts#L46)

## Properties

### id

• `Private` **id**: `string`

ID.

#### Defined in

[src/nevermined/DID.ts:44](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/DID.ts#L44)

## Methods

### getDid

▸ **getDid**(): `string`

Returns the DID.

#### Returns

`string`

#### Defined in

[src/nevermined/DID.ts:54](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/DID.ts#L54)

___

### getId

▸ **getId**(): `string`

Returns the ID.

#### Returns

`string`

#### Defined in

[src/nevermined/DID.ts:62](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/DID.ts#L62)

___

### generate

▸ `Static` **generate**(): [`DID`](DID.md)

Returns a new DID.

#### Returns

[`DID`](DID.md)

#### Defined in

[src/nevermined/DID.ts:36](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/DID.ts#L36)

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

#### Defined in

[src/nevermined/DID.ts:14](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/DID.ts#L14)
