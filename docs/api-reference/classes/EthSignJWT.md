[@nevermined-io/sdk - v3.0.40](../code-reference.md) / EthSignJWT

# Class: EthSignJWT

## Hierarchy

- `SignJWT`

  ↳ **`EthSignJWT`**

## Table of contents

### Constructors

- [constructor](EthSignJWT.md#constructor)

### Properties

- [\_payload](EthSignJWT.md#_payload)
- [protectedHeader](EthSignJWT.md#protectedheader)

### Methods

- [base64url](EthSignJWT.md#base64url)
- [concat](EthSignJWT.md#concat)
- [ethSign](EthSignJWT.md#ethsign)
- [setAudience](EthSignJWT.md#setaudience)
- [setExpirationTime](EthSignJWT.md#setexpirationtime)
- [setIssuedAt](EthSignJWT.md#setissuedat)
- [setIssuer](EthSignJWT.md#setissuer)
- [setJti](EthSignJWT.md#setjti)
- [setNotBefore](EthSignJWT.md#setnotbefore)
- [setProtectedHeader](EthSignJWT.md#setprotectedheader)
- [setSubject](EthSignJWT.md#setsubject)
- [sign](EthSignJWT.md#sign)
- [signText](EthSignJWT.md#signtext)

## Constructors

### constructor

• **new EthSignJWT**(`payload`): [`EthSignJWT`](EthSignJWT.md)

#### Parameters

| Name      | Type         | Description                |
| :-------- | :----------- | :------------------------- |
| `payload` | `JWTPayload` | The JWT Claims Set object. |

#### Returns

[`EthSignJWT`](EthSignJWT.md)

#### Inherited from

SignJWT.constructor

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:6

## Properties

### \_payload

• `Protected` **\_payload**: `JWTPayload`

#### Inherited from

SignJWT.\_payload

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:4

---

### protectedHeader

• **protectedHeader**: `JWSHeaderParameters`

#### Defined in

[src/nevermined/utils/JwtUtils.ts:12](https://github.com/nevermined-io/sdk-js/blob/b5e55eab9d0ebcc9023ac5ea2d4b30a77616251e/src/nevermined/utils/JwtUtils.ts#L12)

## Methods

### base64url

▸ **base64url**(`input`): `string`

#### Parameters

| Name    | Type                     |
| :------ | :----------------------- |
| `input` | `string` \| `Uint8Array` |

#### Returns

`string`

#### Defined in

[src/nevermined/utils/JwtUtils.ts:89](https://github.com/nevermined-io/sdk-js/blob/b5e55eab9d0ebcc9023ac5ea2d4b30a77616251e/src/nevermined/utils/JwtUtils.ts#L89)

---

### concat

▸ **concat**(`...buffers`): `Uint8Array`

#### Parameters

| Name         | Type           |
| :----------- | :------------- |
| `...buffers` | `Uint8Array`[] |

#### Returns

`Uint8Array`

#### Defined in

[src/nevermined/utils/JwtUtils.ts:97](https://github.com/nevermined-io/sdk-js/blob/b5e55eab9d0ebcc9023ac5ea2d4b30a77616251e/src/nevermined/utils/JwtUtils.ts#L97)

---

### ethSign

▸ **ethSign**(`signatureUtils`, `account`, `eip712Data?`): `Promise`\<`string`\>

#### Parameters

| Name             | Type                                        |
| :--------------- | :------------------------------------------ |
| `signatureUtils` | [`SignatureUtils`](SignatureUtils.md)       |
| `account`        | [`NvmAccount`](NvmAccount.md)               |
| `eip712Data?`    | [`Eip712Data`](../interfaces/Eip712Data.md) |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:19](https://github.com/nevermined-io/sdk-js/blob/b5e55eab9d0ebcc9023ac5ea2d4b30a77616251e/src/nevermined/utils/JwtUtils.ts#L19)

---

### setAudience

▸ **setAudience**(`audience`): `this`

Set "aud" (Audience) Claim.

#### Parameters

| Name       | Type                   | Description                                                |
| :--------- | :--------------------- | :--------------------------------------------------------- |
| `audience` | `string` \| `string`[] | "aud" (Audience) Claim value to set on the JWT Claims Set. |

#### Returns

`this`

#### Inherited from

SignJWT.setAudience

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:24

---

### setExpirationTime

▸ **setExpirationTime**(`input`): `this`

Set "exp" (Expiration Time) Claim.

#### Parameters

| Name    | Type                 | Description                                                                                                                                                                                              |
| :------ | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input` | `string` \| `number` | "exp" (Expiration Time) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

`this`

#### Inherited from

SignJWT.setExpirationTime

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:46

---

### setIssuedAt

▸ **setIssuedAt**(`input?`): `this`

Set "iat" (Issued At) Claim.

#### Parameters

| Name     | Type     | Description                                                                               |
| :------- | :------- | :---------------------------------------------------------------------------------------- |
| `input?` | `number` | "iat" (Issued At) Claim value to set on the JWT Claims Set. Default is current timestamp. |

#### Returns

`this`

#### Inherited from

SignJWT.setIssuedAt

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:53

---

### setIssuer

▸ **setIssuer**(`issuer`): `this`

Set "iss" (Issuer) Claim.

#### Parameters

| Name     | Type     | Description                                        |
| :------- | :------- | :------------------------------------------------- |
| `issuer` | `string` | "Issuer" Claim value to set on the JWT Claims Set. |

#### Returns

`this`

#### Inherited from

SignJWT.setIssuer

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:12

---

### setJti

▸ **setJti**(`jwtId`): `this`

Set "jti" (JWT ID) Claim.

#### Parameters

| Name    | Type     | Description                                              |
| :------ | :------- | :------------------------------------------------------- |
| `jwtId` | `string` | "jti" (JWT ID) Claim value to set on the JWT Claims Set. |

#### Returns

`this`

#### Inherited from

SignJWT.setJti

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:30

---

### setNotBefore

▸ **setNotBefore**(`input`): `this`

Set "nbf" (Not Before) Claim.

#### Parameters

| Name    | Type                 | Description                                                                                                                                                                                         |
| :------ | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input` | `string` \| `number` | "nbf" (Not Before) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

`this`

#### Inherited from

SignJWT.setNotBefore

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:38

---

### setProtectedHeader

▸ **setProtectedHeader**(`protectedHeader`): [`EthSignJWT`](EthSignJWT.md)

#### Parameters

| Name              | Type                  |
| :---------------- | :-------------------- |
| `protectedHeader` | `JWSHeaderParameters` |

#### Returns

[`EthSignJWT`](EthSignJWT.md)

#### Overrides

SignJWT.setProtectedHeader

#### Defined in

[src/nevermined/utils/JwtUtils.ts:14](https://github.com/nevermined-io/sdk-js/blob/b5e55eab9d0ebcc9023ac5ea2d4b30a77616251e/src/nevermined/utils/JwtUtils.ts#L14)

---

### setSubject

▸ **setSubject**(`subject`): `this`

Set "sub" (Subject) Claim.

#### Parameters

| Name      | Type     | Description                                               |
| :-------- | :------- | :-------------------------------------------------------- |
| `subject` | `string` | "sub" (Subject) Claim value to set on the JWT Claims Set. |

#### Returns

`this`

#### Inherited from

SignJWT.setSubject

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:18

---

### sign

▸ **sign**(`key`, `options?`): `Promise`\<`string`\>

Signs and returns the JWT.

#### Parameters

| Name       | Type                      | Description                                                                                                                     |
| :--------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| `key`      | `Uint8Array` \| `KeyLike` | Private Key or Secret to sign the JWT with. See [Algorithm Key Requirements](https://github.com/panva/jose/issues/210#jws-alg). |
| `options?` | `SignOptions`             | JWT Sign options.                                                                                                               |

#### Returns

`Promise`\<`string`\>

#### Inherited from

SignJWT.sign

#### Defined in

node_modules/jose/dist/types/jwt/sign.d.ts:22

---

### signText

▸ **signText**(`text`, `account`): `Promise`\<`undefined` \| `string`\>

#### Parameters

| Name      | Type                     |
| :-------- | :----------------------- |
| `text`    | `string` \| `Uint8Array` |
| `account` | `Account`                |

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:75](https://github.com/nevermined-io/sdk-js/blob/b5e55eab9d0ebcc9023ac5ea2d4b30a77616251e/src/nevermined/utils/JwtUtils.ts#L75)
