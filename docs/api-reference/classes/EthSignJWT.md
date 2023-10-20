[@nevermined-io/sdk](../code-reference.md) / EthSignJWT

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
- [signMessage](EthSignJWT.md#signmessage)
- [signText](EthSignJWT.md#signtext)
- [signTypedMessage](EthSignJWT.md#signtypedmessage)

## Constructors

### constructor

• **new EthSignJWT**(`payload`)

#### Parameters

| Name      | Type         | Description                |
| :-------- | :----------- | :------------------------- |
| `payload` | `JWTPayload` | The JWT Claims Set object. |

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

[src/nevermined/utils/JwtUtils.ts:27](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L27)

## Methods

### base64url

▸ `Private` **base64url**(`input`): `string`

#### Parameters

| Name    | Type                     |
| :------ | :----------------------- |
| `input` | `string` \| `Uint8Array` |

#### Returns

`string`

#### Defined in

[src/nevermined/utils/JwtUtils.ts:128](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L128)

---

### concat

▸ `Private` **concat**(`...buffers`): `Uint8Array`

#### Parameters

| Name         | Type           |
| :----------- | :------------- |
| `...buffers` | `Uint8Array`[] |

#### Returns

`Uint8Array`

#### Defined in

[src/nevermined/utils/JwtUtils.ts:136](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L136)

---

### ethSign

▸ **ethSign**(`signer`, `eip712Data?`): `Promise`<`string`\>

#### Parameters

| Name          | Type                                           |
| :------------ | :--------------------------------------------- |
| `signer`      | `Signer` \| `ZeroDevAccountSigner`<`"ECDSA"`\> |
| `eip712Data?` | [`Eip712Data`](../interfaces/Eip712Data.md)    |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L34)

---

### setAudience

▸ **setAudience**(`audience`): [`EthSignJWT`](EthSignJWT.md)

Set "aud" (Audience) Claim.

#### Parameters

| Name       | Type                   | Description                                                |
| :--------- | :--------------------- | :--------------------------------------------------------- |
| `audience` | `string` \| `string`[] | "aud" (Audience) Claim value to set on the JWT Claims Set. |

#### Returns

[`EthSignJWT`](EthSignJWT.md)

#### Inherited from

SignJWT.setAudience

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:24

---

### setExpirationTime

▸ **setExpirationTime**(`input`): [`EthSignJWT`](EthSignJWT.md)

Set "exp" (Expiration Time) Claim.

#### Parameters

| Name    | Type                 | Description                                                                                                                                                                                              |
| :------ | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input` | `string` \| `number` | "exp" (Expiration Time) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`EthSignJWT`](EthSignJWT.md)

#### Inherited from

SignJWT.setExpirationTime

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:46

---

### setIssuedAt

▸ **setIssuedAt**(`input?`): [`EthSignJWT`](EthSignJWT.md)

Set "iat" (Issued At) Claim.

#### Parameters

| Name     | Type     | Description                                                                               |
| :------- | :------- | :---------------------------------------------------------------------------------------- |
| `input?` | `number` | "iat" (Issued At) Claim value to set on the JWT Claims Set. Default is current timestamp. |

#### Returns

[`EthSignJWT`](EthSignJWT.md)

#### Inherited from

SignJWT.setIssuedAt

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:52

---

### setIssuer

▸ **setIssuer**(`issuer`): [`EthSignJWT`](EthSignJWT.md)

Set "iss" (Issuer) Claim.

#### Parameters

| Name     | Type     | Description                                        |
| :------- | :------- | :------------------------------------------------- |
| `issuer` | `string` | "Issuer" Claim value to set on the JWT Claims Set. |

#### Returns

[`EthSignJWT`](EthSignJWT.md)

#### Inherited from

SignJWT.setIssuer

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:12

---

### setJti

▸ **setJti**(`jwtId`): [`EthSignJWT`](EthSignJWT.md)

Set "jti" (JWT ID) Claim.

#### Parameters

| Name    | Type     | Description                                              |
| :------ | :------- | :------------------------------------------------------- |
| `jwtId` | `string` | "jti" (JWT ID) Claim value to set on the JWT Claims Set. |

#### Returns

[`EthSignJWT`](EthSignJWT.md)

#### Inherited from

SignJWT.setJti

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:30

---

### setNotBefore

▸ **setNotBefore**(`input`): [`EthSignJWT`](EthSignJWT.md)

Set "nbf" (Not Before) Claim.

#### Parameters

| Name    | Type                 | Description                                                                                                                                                                                         |
| :------ | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input` | `string` \| `number` | "nbf" (Not Before) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`EthSignJWT`](EthSignJWT.md)

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

[src/nevermined/utils/JwtUtils.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L29)

---

### setSubject

▸ **setSubject**(`subject`): [`EthSignJWT`](EthSignJWT.md)

Set "sub" (Subject) Claim.

#### Parameters

| Name      | Type     | Description                                               |
| :-------- | :------- | :-------------------------------------------------------- |
| `subject` | `string` | "sub" (Subject) Claim value to set on the JWT Claims Set. |

#### Returns

[`EthSignJWT`](EthSignJWT.md)

#### Inherited from

SignJWT.setSubject

#### Defined in

node_modules/jose/dist/types/jwt/produce.d.ts:18

---

### sign

▸ **sign**(`key`, `options?`): `Promise`<`string`\>

Signs and returns the JWT.

#### Parameters

| Name       | Type                      | Description                                 |
| :--------- | :------------------------ | :------------------------------------------ |
| `key`      | `Uint8Array` \| `KeyLike` | Private Key or Secret to sign the JWT with. |
| `options?` | `SignOptions`             | JWT Sign options.                           |

#### Returns

`Promise`<`string`\>

#### Inherited from

SignJWT.sign

#### Defined in

node_modules/jose/dist/types/jwt/sign.d.ts:34

---

### signMessage

▸ `Static` `Private` **signMessage**(`message`, `signer`): `Promise`<`string`\>

#### Parameters

| Name      | Type                                           |
| :-------- | :--------------------------------------------- |
| `message` | `string` \| `Uint8Array`                       |
| `signer`  | `Signer` \| `ZeroDevAccountSigner`<`"ECDSA"`\> |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:100](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L100)

---

### signText

▸ `Static` **signText**(`text`, `signer`): `Promise`<`string`\>

#### Parameters

| Name     | Type                     |
| :------- | :----------------------- |
| `text`   | `string` \| `Uint8Array` |
| `signer` | `Signer`                 |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L90)

---

### signTypedMessage

▸ `Static` `Private` **signTypedMessage**(`domain`, `types`, `value`, `signer`): `Promise`<`string`\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `domain` | [`TypedDataDomain`](../interfaces/TypedDataDomain.md) |
| `types`  | [`TypedDataTypes`](../interfaces/TypedDataTypes.md)   |
| `value`  | `Record`<`string`, `any`\>                            |
| `signer` | `Signer` \| `ZeroDevAccountSigner`<`"ECDSA"`\>        |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/JwtUtils.ts:111](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/JwtUtils.ts#L111)
