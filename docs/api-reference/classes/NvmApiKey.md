[@nevermined-io/sdk - v3.0.20](../code-reference.md) / NvmApiKey

# Class: NvmApiKey

## Implements

- `JWTPayload`

## Indexable

▪ [propName: `string`]: `any`

Additional attributes

## Table of contents

### Constructors

- [constructor](NvmApiKey.md#constructor)

### Properties

- [aud](NvmApiKey.md#aud)
- [exp](NvmApiKey.md#exp)
- [iat](NvmApiKey.md#iat)
- [iss](NvmApiKey.md#iss)
- [nvt](NvmApiKey.md#nvt)
- [sub](NvmApiKey.md#sub)
- [ver](NvmApiKey.md#ver)
- [zsk](NvmApiKey.md#zsk)

### Methods

- [hash](NvmApiKey.md#hash)
- [isValid](NvmApiKey.md#isvalid)
- [serialize](NvmApiKey.md#serialize)
- [toJWT](NvmApiKey.md#tojwt)
- [toString](NvmApiKey.md#tostring)
- [decodeJWT](NvmApiKey.md#decodejwt)
- [decryptAndDecode](NvmApiKey.md#decryptanddecode)
- [deserialize](NvmApiKey.md#deserialize)
- [fromJSON](NvmApiKey.md#fromjson)
- [fromJWT](NvmApiKey.md#fromjwt)
- [generate](NvmApiKey.md#generate)
- [generateEncrypted](NvmApiKey.md#generateencrypted)
- [getSignerAddress](NvmApiKey.md#getsigneraddress)
- [hash](NvmApiKey.md#hash-1)

## Constructors

### constructor

• **new NvmApiKey**(): [`NvmApiKey`](NvmApiKey.md)

#### Returns

[`NvmApiKey`](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:59](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L59)

## Properties

### aud

• **aud**: `string`

The chain id of the network the key is valid for. If zero the key is not having any network limitation

#### Implementation of

JWTPayload.aud

#### Defined in

[src/models/NvmApiKey.ts:18](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L18)

---

### exp

• `Optional` **exp**: `number`

JWT Expiration Time

**`See`**

[RFC7519#section-4.1.4](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4)

#### Implementation of

JWTPayload.exp

#### Defined in

[src/models/NvmApiKey.ts:45](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L45)

---

### iat

• `Optional` **iat**: `number`

JWT Issued At

**`See`**

[RFC7519#section-4.1.6](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.6)

#### Implementation of

JWTPayload.iat

#### Defined in

[src/models/NvmApiKey.ts:52](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L52)

---

### iss

• **iss**: `string`

The public address of the account issuing the key

#### Implementation of

JWTPayload.iss

#### Defined in

[src/models/NvmApiKey.ts:13](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L13)

---

### nvt

• `Optional` **nvt**: `string`

The Marketplace auth token

#### Defined in

[src/models/NvmApiKey.ts:38](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L38)

---

### sub

• **sub**: `string`

The public address of the account the key is issued for. Typically the address of the Node/Backend who can process the key

#### Implementation of

JWTPayload.sub

#### Defined in

[src/models/NvmApiKey.ts:23](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L23)

---

### ver

• **ver**: `string` = `'v2'`

The version of the key

#### Defined in

[src/models/NvmApiKey.ts:28](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L28)

---

### zsk

• `Optional` **zsk**: `string`

The ZeroDev session key

#### Defined in

[src/models/NvmApiKey.ts:33](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L33)

## Methods

### hash

▸ **hash**(): `string`

#### Returns

`string`

#### Defined in

[src/models/NvmApiKey.ts:196](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L196)

---

### isValid

▸ **isValid**(`chainId?`): `boolean`

#### Parameters

| Name      | Type     | Default value |
| :-------- | :------- | :------------ |
| `chainId` | `number` | `0`           |

#### Returns

`boolean`

#### Defined in

[src/models/NvmApiKey.ts:139](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L139)

---

### serialize

▸ **serialize**(): `string`

#### Returns

`string`

#### Defined in

[src/models/NvmApiKey.ts:184](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L184)

---

### toJWT

▸ **toJWT**(`signatureUtils`, `issuerAccount`): `Promise`\<`string`\>

#### Parameters

| Name             | Type                                  |
| :--------------- | :------------------------------------ |
| `signatureUtils` | [`SignatureUtils`](SignatureUtils.md) |
| `issuerAccount`  | [`NvmAccount`](NvmAccount.md)         |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/models/NvmApiKey.ts:150](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L150)

---

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/models/NvmApiKey.ts:188](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L188)

---

### decodeJWT

▸ **decodeJWT**(`str`): `JWTPayload`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`JWTPayload`

#### Defined in

[src/models/NvmApiKey.ts:192](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L192)

---

### decryptAndDecode

▸ **decryptAndDecode**(`encryptedJwt`, `privateKey`): `Promise`\<[`NvmApiKey`](NvmApiKey.md)\>

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `encryptedJwt` | `string` |
| `privateKey`   | `string` |

#### Returns

`Promise`\<[`NvmApiKey`](NvmApiKey.md)\>

#### Defined in

[src/models/NvmApiKey.ts:124](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L124)

---

### deserialize

▸ **deserialize**(`str`): [`NvmApiKey`](NvmApiKey.md)

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

[`NvmApiKey`](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:180](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L180)

---

### fromJSON

▸ **fromJSON**(`jwt`): [`NvmApiKey`](NvmApiKey.md)

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `jwt` | `JWTPayload` |

#### Returns

[`NvmApiKey`](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:163](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L163)

---

### fromJWT

▸ **fromJWT**(`jwtString`): [`NvmApiKey`](NvmApiKey.md)

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `jwtString` | `string` |

#### Returns

[`NvmApiKey`](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:175](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L175)

---

### generate

▸ **generate**(`signatureUtils`, `issuerAccount`, `zeroDevSessionKey`, `marketplaceAuthToken`, `receiverAddress`, `expirationTime?`, `chainId?`, `additionalParams?`): `Promise`\<[`NvmApiKey`](NvmApiKey.md)\>

#### Parameters

| Name                   | Type                                  | Default value |
| :--------------------- | :------------------------------------ | :------------ |
| `signatureUtils`       | [`SignatureUtils`](SignatureUtils.md) | `undefined`   |
| `issuerAccount`        | [`NvmAccount`](NvmAccount.md)         | `undefined`   |
| `zeroDevSessionKey`    | `string`                              | `undefined`   |
| `marketplaceAuthToken` | `string`                              | `undefined`   |
| `receiverAddress`      | `string`                              | `undefined`   |
| `expirationTime`       | `string`                              | `'1y'`        |
| `chainId`              | `number`                              | `0`           |
| `additionalParams`     | `Object`                              | `{}`          |

#### Returns

`Promise`\<[`NvmApiKey`](NvmApiKey.md)\>

#### Defined in

[src/models/NvmApiKey.ts:61](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L61)

---

### generateEncrypted

▸ **generateEncrypted**(`signatureUtils`, `issuerAccount`, `zeroDevSessionKey`, `marketplaceAuthToken`, `receiverAddress`, `receiverPublicKey`, `expirationTime?`, `chainId?`, `additionalParams?`): `Promise`\<`string`\>

#### Parameters

| Name                   | Type                                  | Default value |
| :--------------------- | :------------------------------------ | :------------ |
| `signatureUtils`       | [`SignatureUtils`](SignatureUtils.md) | `undefined`   |
| `issuerAccount`        | [`NvmAccount`](NvmAccount.md)         | `undefined`   |
| `zeroDevSessionKey`    | `string`                              | `undefined`   |
| `marketplaceAuthToken` | `string`                              | `undefined`   |
| `receiverAddress`      | `string`                              | `undefined`   |
| `receiverPublicKey`    | `string`                              | `undefined`   |
| `expirationTime`       | `string`                              | `'1y'`        |
| `chainId`              | `number`                              | `0`           |
| `additionalParams`     | `Object`                              | `{}`          |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/models/NvmApiKey.ts:99](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L99)

---

### getSignerAddress

▸ **getSignerAddress**(`jwtString`): `Promise`\<`string`\>

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `jwtString` | `string` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/models/NvmApiKey.ts:129](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L129)

---

### hash

▸ **hash**(`serialized`): `string`

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `serialized` | `string` |

#### Returns

`string`

#### Defined in

[src/models/NvmApiKey.ts:200](https://github.com/nevermined-io/sdk-js/blob/fda834d746a6bb5136bf84409374b98a30682055/src/models/NvmApiKey.ts#L200)
