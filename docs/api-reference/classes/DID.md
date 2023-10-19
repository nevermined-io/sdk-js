[@nevermined-io/sdk](../code-reference.md) / DID

# Class: DID

Decentralized ID.

## Table of contents

### Constructors

- [constructor](DID.md#constructor)

### Properties

- [id](DID.md#id)

### Methods

- [getDid](DID.md#getdid)
- [getEncoded](DID.md#getencoded)
- [getId](DID.md#getid)
- [fromEncoded](DID.md#fromencoded)
- [generate](DID.md#generate)
- [parse](DID.md#parse)
- [parseBigInt](DID.md#parsebigint)

## Constructors

### constructor

• `Private` **new DID**(`id`)

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Defined in

[src/nevermined/DID.ts:83](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/DID.ts#L83)

## Properties

### id

• `Private` **id**: `string`

Short ID.

#### Defined in

[src/nevermined/DID.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/DID.ts#L81)

## Methods

### getDid

▸ **getDid**(): `string`

Returns the DID (i.e did:nv:...)

#### Returns

`string`

A string with the prefixed id.

#### Defined in

[src/nevermined/DID.ts:91](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/DID.ts#L91)

---

### getEncoded

▸ **getEncoded**(): `string`

Generates an encoded string in base 36 from a DID.

#### Returns

`string`

A base36 encoded string.

#### Defined in

[src/nevermined/DID.ts:74](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/DID.ts#L74)

---

### getId

▸ **getId**(): `string`

Returns the Short ID.

#### Returns

`string`

A string of the _id_ without the prefix.

#### Defined in

[src/nevermined/DID.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/DID.ts#L99)

---

### fromEncoded

▸ `Static` **fromEncoded**(`encoded`): [`DID`](DID.md)

Returns a new DID from a base36 encoded string.

#### Parameters

| Name      | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `encoded` | `string` | Base36 encoded string. |

#### Returns

[`DID`](DID.md)

[DID](DID.md)

#### Defined in

[src/nevermined/DID.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/DID.ts#L64)

---

### generate

▸ `Static` **generate**(): [`DID`](DID.md)

Returns a new DID.

#### Returns

[`DID`](DID.md)

[DID](DID.md)

#### Defined in

[src/nevermined/DID.ts:43](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/DID.ts#L43)

---

### parse

▸ `Static` **parse**(`didString`): [`DID`](DID.md)

Parses a DID from a string.

#### Parameters

| Name        | Type                        | Description                                                                                 |
| :---------- | :-------------------------- | :------------------------------------------------------------------------------------------ |
| `didString` | `string` \| [`DID`](DID.md) | DID in string format or DID instance. The didString can be in did:nv: format or 0x: format. |

#### Returns

[`DID`](DID.md)

[DID](DID.md)

#### Defined in

[src/nevermined/DID.ts:14](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/DID.ts#L14)

---

### parseBigInt

▸ `Static` **parseBigInt**(`value`, `radix?`): `any`

#### Parameters

| Name    | Type     | Default value |
| :------ | :------- | :------------ |
| `value` | `any`    | `undefined`   |
| `radix` | `number` | `36`          |

#### Returns

`any`

#### Defined in

[src/nevermined/DID.ts:47](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/DID.ts#L47)
