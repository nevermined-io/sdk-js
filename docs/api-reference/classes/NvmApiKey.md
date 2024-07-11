[@nevermined-io/sdk - v3.0.17](../code-reference.md) / NvmApiKey

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
- [toString](NvmApiKey.md#tostring)
- [decode](NvmApiKey.md#decode)
- [decryptAndDecode](NvmApiKey.md#decryptanddecode)
- [deserialize](NvmApiKey.md#deserialize)
- [fromJWT](NvmApiKey.md#fromjwt)
- [generate](NvmApiKey.md#generate)
- [generateEncrypted](NvmApiKey.md#generateencrypted)
- [hash](NvmApiKey.md#hash-1)

## Constructors

### constructor

• **new NvmApiKey**(): [`NvmApiKey`](NvmApiKey.md)

#### Returns

[`NvmApiKey`](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:58](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L58)

## Properties

### aud

• **aud**: `string`

The chain id of the network the key is valid for. If zero the key is not having any network limitation

#### Implementation of

JWTPayload.aud

#### Defined in

[src/models/NvmApiKey.ts:17](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L17)

---

### exp

• `Optional` **exp**: `number`

JWT Expiration Time

**`See`**

[RFC7519#section-4.1.4](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4)

#### Implementation of

JWTPayload.exp

#### Defined in

[src/models/NvmApiKey.ts:44](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L44)

---

### iat

• `Optional` **iat**: `number`

JWT Issued At

**`See`**

[RFC7519#section-4.1.6](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.6)

#### Implementation of

JWTPayload.iat

#### Defined in

[src/models/NvmApiKey.ts:51](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L51)

---

### iss

• **iss**: `string`

The public address of the account issuing the key

#### Implementation of

JWTPayload.iss

#### Defined in

[src/models/NvmApiKey.ts:12](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L12)

---

### nvt

• `Optional` **nvt**: `string`

The Marketplace auth token

#### Defined in

[src/models/NvmApiKey.ts:37](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L37)

---

### sub

• **sub**: `string`

The public address of the account the key is issued for. Typically the address of the Node/Backend who can process the key

#### Implementation of

JWTPayload.sub

#### Defined in

[src/models/NvmApiKey.ts:22](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L22)

---

### ver

• **ver**: `string` = `'v1'`

The version of the key

#### Defined in

[src/models/NvmApiKey.ts:27](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L27)

---

### zsk

• `Optional` **zsk**: `string`

The ZeroDev session key

#### Defined in

[src/models/NvmApiKey.ts:32](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L32)

## Methods

### hash

▸ **hash**(): `string`

#### Returns

`string`

#### Defined in

[src/models/NvmApiKey.ts:164](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L164)

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

[src/models/NvmApiKey.ts:126](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L126)

---

### serialize

▸ **serialize**(): `string`

#### Returns

`string`

#### Defined in

[src/models/NvmApiKey.ts:152](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L152)

---

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/models/NvmApiKey.ts:156](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L156)

---

### decode

▸ **decode**(`str`): `JWTPayload`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`JWTPayload`

#### Defined in

[src/models/NvmApiKey.ts:160](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L160)

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

[src/models/NvmApiKey.ts:121](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L121)

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

[src/models/NvmApiKey.ts:148](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L148)

---

### fromJWT

▸ **fromJWT**(`jwt`): [`NvmApiKey`](NvmApiKey.md)

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `jwt` | `JWTPayload` |

#### Returns

[`NvmApiKey`](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:137](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L137)

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

[src/models/NvmApiKey.ts:60](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L60)

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

[src/models/NvmApiKey.ts:97](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L97)

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

[src/models/NvmApiKey.ts:168](https://github.com/nevermined-io/sdk-js/blob/f4768bb40b31fadf971062208adb00e0efb39b34/src/models/NvmApiKey.ts#L168)
