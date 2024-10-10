[@nevermined-io/sdk - v3.0.40](../code-reference.md) / NvmApiKey

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
- [hashJWT](NvmApiKey.md#hashjwt)
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
- [generateWithoutSessionKey](NvmApiKey.md#generatewithoutsessionkey)
- [getSignerAddress](NvmApiKey.md#getsigneraddress)
- [hash](NvmApiKey.md#hash-1)

## Constructors

### constructor

• **new NvmApiKey**(): [`NvmApiKey`](NvmApiKey.md)

#### Returns

[`NvmApiKey`](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:59](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L59)

## Properties

### aud

• **aud**: `string`

The chain id of the network the key is valid for. If zero the key is not having any network limitation

#### Implementation of

JWTPayload.aud

#### Defined in

[src/models/NvmApiKey.ts:18](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L18)

---

### exp

• `Optional` **exp**: `number`

JWT Expiration Time

**`See`**

[RFC7519#section-4.1.4](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4)

#### Implementation of

JWTPayload.exp

#### Defined in

[src/models/NvmApiKey.ts:45](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L45)

---

### iat

• `Optional` **iat**: `number`

JWT Issued At

**`See`**

[RFC7519#section-4.1.6](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.6)

#### Implementation of

JWTPayload.iat

#### Defined in

[src/models/NvmApiKey.ts:52](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L52)

---

### iss

• **iss**: `string`

The public address of the account issuing the key.

#### Implementation of

JWTPayload.iss

#### Defined in

[src/models/NvmApiKey.ts:13](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L13)

---

### nvt

• `Optional` **nvt**: `string`

The Marketplace auth token

#### Defined in

[src/models/NvmApiKey.ts:38](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L38)

---

### sub

• **sub**: `string`

The public address of the account the key is issued for.

#### Implementation of

JWTPayload.sub

#### Defined in

[src/models/NvmApiKey.ts:23](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L23)

---

### ver

• **ver**: `string` = `'v2'`

The version of the key

#### Defined in

[src/models/NvmApiKey.ts:28](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L28)

---

### zsk

• `Optional` **zsk**: `string`

The ZeroDev session key

#### Defined in

[src/models/NvmApiKey.ts:33](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L33)

## Methods

### hash

▸ **hash**(): `string`

It generates the hash of the NvmApiKey

#### Returns

`string`

a string representing the hash of the NvmApiKey

#### Defined in

[src/models/NvmApiKey.ts:280](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L280)

---

### hashJWT

▸ **hashJWT**(`signatureUtils`, `issuerAccount`): `Promise`\<`string`\>

It generates the hash in JWT format of the NvmApiKey

#### Parameters

| Name             | Type                                  | Description                 |
| :--------------- | :------------------------------------ | :-------------------------- |
| `signatureUtils` | [`SignatureUtils`](SignatureUtils.md) | the SignatureUtils instance |
| `issuerAccount`  | [`NvmAccount`](NvmAccount.md)         | the account issuing the key |

#### Returns

`Promise`\<`string`\>

a JWT string representing the hash of the NvmApiKey

#### Defined in

[src/models/NvmApiKey.ts:201](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L201)

---

### isValid

▸ **isValid**(`chainId?`): `boolean`

It checks if the NVM API Key attributes are valid

#### Parameters

| Name      | Type     | Default value | Description                                      |
| :-------- | :------- | :------------ | :----------------------------------------------- |
| `chainId` | `number` | `0`           | The chain id of the network the key is valid for |

#### Returns

`boolean`

true if the key is valid, false otherwise

#### Defined in

[src/models/NvmApiKey.ts:165](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L165)

---

### serialize

▸ **serialize**(): `string`

It serializes the NVM Api Key into a string

#### Returns

`string`

a string representing the NVM API Key

#### Defined in

[src/models/NvmApiKey.ts:255](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L255)

---

### toJWT

▸ **toJWT**(`signatureUtils`, `issuerAccount`): `Promise`\<`string`\>

It generates a signed JWT from the NvmApiKey

#### Parameters

| Name             | Type                                  | Description                 |
| :--------------- | :------------------------------------ | :-------------------------- |
| `signatureUtils` | [`SignatureUtils`](SignatureUtils.md) | The SignatureUtils instance |
| `issuerAccount`  | [`NvmAccount`](NvmAccount.md)         | The account issuing the key |

#### Returns

`Promise`\<`string`\>

the string in JWT format represeting the NvmApiKey

#### Defined in

[src/models/NvmApiKey.ts:182](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L182)

---

### toString

▸ **toString**(): `string`

It serializes the NVM Api Key into a string

#### Returns

`string`

a string representing the NVM API Key

#### Defined in

[src/models/NvmApiKey.ts:263](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L263)

---

### decodeJWT

▸ **decodeJWT**(`str`): `JWTPayload`

It decodes a string JWT into a JWTPayload

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `str` | `string` | jwt string  |

#### Returns

`JWTPayload`

the JWTPayload

#### Defined in

[src/models/NvmApiKey.ts:272](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L272)

---

### decryptAndDecode

▸ **decryptAndDecode**(`encryptedJwt`, `privateKey`): `Promise`\<[`NvmApiKey`](NvmApiKey.md)\>

Givena an encrypted JWT and a private key, it decrypts and decodes the JWT into a NvmApiKey

#### Parameters

| Name           | Type     | Description                              |
| :------------- | :------- | :--------------------------------------- |
| `encryptedJwt` | `string` | The encrypted JWT                        |
| `privateKey`   | `string` | The private key representing the account |

#### Returns

`Promise`\<[`NvmApiKey`](NvmApiKey.md)\>

The

**`See`**

[NvmApiKey](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:140](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L140)

---

### deserialize

▸ **deserialize**(`str`): [`NvmApiKey`](NvmApiKey.md)

It regenerates the NvmApiKey from a string

#### Parameters

| Name  | Type     | Description                          |
| :---- | :------- | :----------------------------------- |
| `str` | `string` | the string represeting the NvmApiKey |

#### Returns

[`NvmApiKey`](NvmApiKey.md)

the

**`See`**

[NvmApiKey](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:247](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L247)

---

### fromJSON

▸ **fromJSON**(`jwt`): [`NvmApiKey`](NvmApiKey.md)

It regenerates the NvmApiKey from a JSON object

#### Parameters

| Name  | Type         | Description               |
| :---- | :----------- | :------------------------ |
| `jwt` | `JWTPayload` | JWTPayload in JSON format |

#### Returns

[`NvmApiKey`](NvmApiKey.md)

the

**`See`**

[NvmApiKey](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:220](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L220)

---

### fromJWT

▸ **fromJWT**(`jwtString`): [`NvmApiKey`](NvmApiKey.md)

It regenerates the NvmApiKey from a JWT

#### Parameters

| Name        | Type     | Description                                        |
| :---------- | :------- | :------------------------------------------------- |
| `jwtString` | `string` | the string in JWT format represeting the NvmApiKey |

#### Returns

[`NvmApiKey`](NvmApiKey.md)

the

**`See`**

[NvmApiKey](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:237](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L237)

---

### generate

▸ **generate**(`signatureUtils`, `issuerAccount`, `zeroDevSessionKey`, `marketplaceAuthToken`, `receiverAddress`, `receiverPublicKey`, `expirationTime?`, `additionalParams?`): `Promise`\<`string`\>

It generates a new serialized and encrypted NvmApiKey including the ZeroDev session key and the Marketplace auth token.
The string representing this key can be used to authenticate against the Nevermined API.

#### Parameters

| Name                   | Type                                  | Default value | Description                                         |
| :--------------------- | :------------------------------------ | :------------ | :-------------------------------------------------- |
| `signatureUtils`       | [`SignatureUtils`](SignatureUtils.md) | `undefined`   | The SignatureUtils instance                         |
| `issuerAccount`        | [`NvmAccount`](NvmAccount.md)         | `undefined`   | The account issuing the key                         |
| `zeroDevSessionKey`    | `undefined` \| `string`               | `undefined`   | The ZeroDev session key                             |
| `marketplaceAuthToken` | `string`                              | `undefined`   | The Marketplace Auth Token                          |
| `receiverAddress`      | `string`                              | `undefined`   | The address of the account the key is issued for    |
| `receiverPublicKey`    | `string`                              | `undefined`   | The public key of the account the key is issued for |
| `expirationTime`       | `string` \| `number`                  | `'1y'`        | -                                                   |
| `additionalParams`     | `Object`                              | `{}`          | Addintional params to be added to the Key generated |

#### Returns

`Promise`\<`string`\>

The encrypted string representing the

**`See`**

[NvmApiKey](NvmApiKey.md)

#### Defined in

[src/models/NvmApiKey.ts:74](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L74)

---

### generateWithoutSessionKey

▸ **generateWithoutSessionKey**(`signatureUtils`, `issuerAccount`, `marketplaceAuthToken`, `receiverAddress`, `receiverPublicKey`, `additionalParams?`): `Promise`\<`string`\>

#### Parameters

| Name                   | Type                                  |
| :--------------------- | :------------------------------------ |
| `signatureUtils`       | [`SignatureUtils`](SignatureUtils.md) |
| `issuerAccount`        | [`NvmAccount`](NvmAccount.md)         |
| `marketplaceAuthToken` | `string`                              |
| `receiverAddress`      | `string`                              |
| `receiverPublicKey`    | `string`                              |
| `additionalParams`     | `Object`                              |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/models/NvmApiKey.ts:112](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L112)

---

### getSignerAddress

▸ **getSignerAddress**(`jwtString`): `Promise`\<`string`\>

Given a signed JWT, it recovers the signer address

#### Parameters

| Name        | Type     | Description    |
| :---------- | :------- | :------------- |
| `jwtString` | `string` | The signed JWT |

#### Returns

`Promise`\<`string`\>

The signer address

#### Defined in

[src/models/NvmApiKey.ts:150](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L150)

---

### hash

▸ **hash**(`serialized`): `string`

Given a serialized string, it generates the hash

#### Parameters

| Name         | Type     | Description           |
| :----------- | :------- | :-------------------- |
| `serialized` | `string` | the serialized string |

#### Returns

`string`

the hash

#### Defined in

[src/models/NvmApiKey.ts:289](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/models/NvmApiKey.ts#L289)
