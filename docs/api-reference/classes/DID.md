[@nevermined-io/sdk - v3.0.47](../code-reference.md) / DID

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

• **new DID**(`id`): [`DID`](DID.md)

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

[`DID`](DID.md)

#### Defined in

[src/nevermined/DID.ts:84](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/DID.ts#L84)

## Properties

### id

• `Private` **id**: `string`

Short ID.

#### Defined in

[src/nevermined/DID.ts:82](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/DID.ts#L82)

## Methods

### getDid

▸ **getDid**(): `string`

Returns the DID (i.e did:nv:...)

#### Returns

`string`

A string with the prefixed id.

#### Defined in

[src/nevermined/DID.ts:92](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/DID.ts#L92)

---

### getEncoded

▸ **getEncoded**(): `string`

Generates an encoded string in base 36 from a DID.

#### Returns

`string`

A base36 encoded string.

#### Defined in

[src/nevermined/DID.ts:75](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/DID.ts#L75)

---

### getId

▸ **getId**(): `string`

Returns the Short ID.

#### Returns

`string`

A string of the _id_ without the prefix.

#### Defined in

[src/nevermined/DID.ts:100](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/DID.ts#L100)

---

### fromEncoded

▸ **fromEncoded**(`encoded`): [`DID`](DID.md)

Returns a new DID from a base36 encoded string.

#### Parameters

| Name      | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `encoded` | `string` | Base36 encoded string. |

#### Returns

[`DID`](DID.md)

[DID](DID.md)

#### Defined in

[src/nevermined/DID.ts:65](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/DID.ts#L65)

---

### generate

▸ **generate**(): [`DID`](DID.md)

Returns a new DID.

#### Returns

[`DID`](DID.md)

[DID](DID.md)

#### Defined in

[src/nevermined/DID.ts:44](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/DID.ts#L44)

---

### parse

▸ **parse**(`didString`): [`DID`](DID.md)

Parses a DID from a string.

#### Parameters

| Name        | Type                        | Description                                                                                 |
| :---------- | :-------------------------- | :------------------------------------------------------------------------------------------ |
| `didString` | `string` \| [`DID`](DID.md) | DID in string format or DID instance. The didString can be in did:nv: format or 0x: format. |

#### Returns

[`DID`](DID.md)

[DID](DID.md)

#### Defined in

[src/nevermined/DID.ts:14](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/DID.ts#L14)

---

### parseBigInt

▸ **parseBigInt**(`value`, `radix?`): `any`

#### Parameters

| Name    | Type     | Default value |
| :------ | :------- | :------------ |
| `value` | `any`    | `undefined`   |
| `radix` | `number` | `36`          |

#### Returns

`any`

#### Defined in

[src/nevermined/DID.ts:48](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/DID.ts#L48)
