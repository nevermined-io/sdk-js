[@nevermined-io/sdk - v3.1.0](../code-reference.md) / NvmAccount

# Class: NvmAccount

Account information.

## Table of contents

### Constructors

- [constructor](NvmAccount.md#constructor)

### Properties

- [accountSigner](NvmAccount.md#accountsigner)
- [accountType](NvmAccount.md#accounttype)
- [babySecret](NvmAccount.md#babysecret)
- [babyX](NvmAccount.md#babyx)
- [babyY](NvmAccount.md#babyy)
- [id](NvmAccount.md#id)
- [kernelClient](NvmAccount.md#kernelclient)
- [password](NvmAccount.md#password)
- [zeroDevSigner](NvmAccount.md#zerodevsigner)

### Methods

- [getAccountSigner](NvmAccount.md#getaccountsigner)
- [getAddress](NvmAccount.md#getaddress)
- [getId](NvmAccount.md#getid)
- [getKernelClient](NvmAccount.md#getkernelclient)
- [getPassword](NvmAccount.md#getpassword)
- [getPublic](NvmAccount.md#getpublic)
- [getType](NvmAccount.md#gettype)
- [getZeroDevSigner](NvmAccount.md#getzerodevsigner)
- [isZeroDev](NvmAccount.md#iszerodev)
- [setId](NvmAccount.md#setid)
- [setPassword](NvmAccount.md#setpassword)
- [signTextLocally](NvmAccount.md#signtextlocally)
- [fromAccount](NvmAccount.md#fromaccount)
- [fromAddress](NvmAccount.md#fromaddress)
- [fromZeroDevSessionKey](NvmAccount.md#fromzerodevsessionkey)
- [fromZeroDevSigner](NvmAccount.md#fromzerodevsigner)

## Constructors

### constructor

• **new NvmAccount**(`id`, `accountType?`): [`NvmAccount`](NvmAccount.md)

#### Parameters

| Name          | Type             |
| :------------ | :--------------- |
| `id`          | `string`         |
| `accountType` | `NvmAccountType` |

#### Returns

[`NvmAccount`](NvmAccount.md)

#### Defined in

[src/models/NvmAccount.ts:70](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L70)

## Properties

### accountSigner

• `Private` `Optional` **accountSigner**: `Account` \| \{ `address`: \`0x$\{string}\` ; `experimental_signAuthorization`: (`parameters`: `Authorization`) => `Promise`\<`SignAuthorizationReturnType`\> ; `nonceManager?`: `NonceManager` ; `publicKey`: \`0x$\{string}\` ; `sign`: (`parameters`: \{ `hash`: \`0x$\{string}\`  }) => `Promise`\<\`0x$\{string}\`\> ; `signMessage`: (`__namedParameters`: \{ `message`: `SignableMessage` }) => `Promise`\<\`0x$\{string}\`\> ; `signTransaction`: \<serializer, transaction\>(`transaction`: `transaction`, `options?`: \{ `serializer?`: `serializer`  }) => `Promise`\<`IsNarrowable`\<`TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\>, \`0x$\{string}\`\> extends `true` ? `TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\> : \`0x$\{string}\`\> ; `signTypedData`: \<typedData, primaryType\>(`parameters`: `TypedDataDefinition`\<`typedData`, `primaryType`\>) => `Promise`\<\`0x$\{string}\`\> ; `source`: `"privateKey"` ; `type`: `"local"` }

#### Defined in

[src/models/NvmAccount.ts:16](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L16)

---

### accountType

• **accountType**: `NvmAccountType`

#### Defined in

[src/models/NvmAccount.ts:19](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L19)

---

### babySecret

• `Optional` **babySecret**: `string`

#### Defined in

[src/models/NvmAccount.ts:15](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L15)

---

### babyX

• `Optional` **babyX**: `string`

#### Defined in

[src/models/NvmAccount.ts:13](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L13)

---

### babyY

• `Optional` **babyY**: `string`

#### Defined in

[src/models/NvmAccount.ts:14](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L14)

---

### id

• `Private` **id**: `string`

#### Defined in

[src/models/NvmAccount.ts:71](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L71)

---

### kernelClient

• `Private` `Optional` **kernelClient**: `KernelAccountClient`\<`Transport`, `Chain`, `any`, `any`, `any`\>

#### Defined in

[src/models/NvmAccount.ts:17](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L17)

---

### password

• `Private` `Optional` **password**: `string`

#### Defined in

[src/models/NvmAccount.ts:12](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L12)

---

### zeroDevSigner

• `Private` `Optional` **zeroDevSigner**: `SmartAccount`\<`any`\>

#### Defined in

[src/models/NvmAccount.ts:18](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L18)

## Methods

### getAccountSigner

▸ **getAccountSigner**(): `undefined` \| `Account` \| `SmartAccount`\<`any`\> \| \{ `address`: \`0x$\{string}\` ; `experimental_signAuthorization`: (`parameters`: `Authorization`) => `Promise`\<`SignAuthorizationReturnType`\> ; `nonceManager?`: `NonceManager` ; `publicKey`: \`0x$\{string}\` ; `sign`: (`parameters`: \{ `hash`: \`0x$\{string}\`  }) => `Promise`\<\`0x$\{string}\`\> ; `signMessage`: (`__namedParameters`: \{ `message`: `SignableMessage` }) => `Promise`\<\`0x$\{string}\`\> ; `signTransaction`: \<serializer, transaction\>(`transaction`: `transaction`, `options?`: \{ `serializer?`: `serializer`  }) => `Promise`\<`IsNarrowable`\<`TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\>, \`0x$\{string}\`\> extends `true` ? `TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\> : \`0x$\{string}\`\> ; `signTypedData`: \<typedData, primaryType\>(`parameters`: `TypedDataDefinition`\<`typedData`, `primaryType`\>) => `Promise`\<\`0x$\{string}\`\> ; `source`: `"privateKey"` ; `type`: `"local"` }

#### Returns

`undefined` \| `Account` \| `SmartAccount`\<`any`\> \| \{ `address`: \`0x$\{string}\` ; `experimental_signAuthorization`: (`parameters`: `Authorization`) => `Promise`\<`SignAuthorizationReturnType`\> ; `nonceManager?`: `NonceManager` ; `publicKey`: \`0x$\{string}\` ; `sign`: (`parameters`: \{ `hash`: \`0x$\{string}\`  }) => `Promise`\<\`0x$\{string}\`\> ; `signMessage`: (`__namedParameters`: \{ `message`: `SignableMessage` }) => `Promise`\<\`0x$\{string}\`\> ; `signTransaction`: \<serializer, transaction\>(`transaction`: `transaction`, `options?`: \{ `serializer?`: `serializer`  }) => `Promise`\<`IsNarrowable`\<`TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\>, \`0x$\{string}\`\> extends `true` ? `TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\> : \`0x$\{string}\`\> ; `signTypedData`: \<typedData, primaryType\>(`parameters`: `TypedDataDefinition`\<`typedData`, `primaryType`\>) => `Promise`\<\`0x$\{string}\`\> ; `source`: `"privateKey"` ; `type`: `"local"` }

#### Defined in

[src/models/NvmAccount.ts:78](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L78)

---

### getAddress

▸ **getAddress**(): \`0x$\{string}\`

#### Returns

\`0x$\{string}\`

#### Defined in

[src/models/NvmAccount.ts:97](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L97)

---

### getId

▸ **getId**(): \`0x$\{string}\`

#### Returns

\`0x$\{string}\`

#### Defined in

[src/models/NvmAccount.ts:101](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L101)

---

### getKernelClient

▸ **getKernelClient**(): `undefined` \| `KernelAccountClient`\<`Transport`, `Chain`, `any`, `any`, `any`\>

#### Returns

`undefined` \| `KernelAccountClient`\<`Transport`, `Chain`, `any`, `any`, `any`\>

#### Defined in

[src/models/NvmAccount.ts:82](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L82)

---

### getPassword

▸ **getPassword**(): `undefined` \| `string`

Returns account password.

#### Returns

`undefined` \| `string`

The account password.

#### Defined in

[src/models/NvmAccount.ts:137](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L137)

---

### getPublic

▸ **getPublic**(): `string`

#### Returns

`string`

#### Defined in

[src/models/NvmAccount.ts:109](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L109)

---

### getType

▸ **getType**(): `"local"` \| `"json-rpc"` \| `"smart"` \| `"zerodev"` \| `"sessionKey"`

#### Returns

`"local"` \| `"json-rpc"` \| `"smart"` \| `"zerodev"` \| `"sessionKey"`

#### Defined in

[src/models/NvmAccount.ts:86](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L86)

---

### getZeroDevSigner

▸ **getZeroDevSigner**(): `SmartAccount`\<`any`\>

#### Returns

`SmartAccount`\<`any`\>

#### Defined in

[src/models/NvmAccount.ts:89](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L89)

---

### isZeroDev

▸ **isZeroDev**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/models/NvmAccount.ts:93](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L93)

---

### setId

▸ **setId**(`id`): `void`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[src/models/NvmAccount.ts:105](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L105)

---

### setPassword

▸ **setPassword**(`password`): `void`

Set account password.

#### Parameters

| Name       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `password` | `string` | Password for account. |

#### Returns

`void`

#### Defined in

[src/models/NvmAccount.ts:129](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L129)

---

### signTextLocally

▸ **signTextLocally**(`text`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name   | Type                     |
| :----- | :----------------------- |
| `text` | `string` \| `Uint8Array` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/models/NvmAccount.ts:113](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L113)

---

### fromAccount

▸ **fromAccount**(`account`): [`NvmAccount`](NvmAccount.md)

Returns a nevermined Account from a viem account

#### Parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Description          |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| `account` | `Account` \| \{ `address`: \`0x$\{string}\` ; `experimental_signAuthorization`: (`parameters`: `Authorization`) => `Promise`\<`SignAuthorizationReturnType`\> ; `nonceManager?`: `NonceManager` ; `publicKey`: \`0x$\{string}\` ; `sign`: (`parameters`: \{ `hash`: \`0x$\{string}\`  }) => `Promise`\<\`0x$\{string}\`\> ; `signMessage`: (`__namedParameters`: \{ `message`: `SignableMessage` }) => `Promise`\<\`0x$\{string}\`\> ; `signTransaction`: \<serializer, transaction\>(`transaction`: `transaction`, `options?`: \{ `serializer?`: `serializer`  }) => `Promise`\<`IsNarrowable`\<`TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\>, \`0x$\{string}\`\> extends `true` ? `TransactionSerialized`\<`GetTransactionType`\<`transaction`\>\> : \`0x$\{string}\`\> ; `signTypedData`: \<typedData, primaryType\>(`parameters`: `TypedDataDefinition`\<`typedData`, `primaryType`\>) => `Promise`\<\`0x$\{string}\`\> ; `source`: `"privateKey"` ; `type`: `"local"` } | A viem local account |

#### Returns

[`NvmAccount`](NvmAccount.md)

The nevermined account

#### Defined in

[src/models/NvmAccount.ts:27](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L27)

---

### fromAddress

▸ **fromAddress**(`address`): [`NvmAccount`](NvmAccount.md)

Returns a nevermined Account from an address. This method is used for browser integration (i.e Metamask)

#### Parameters

| Name      | Type             | Description      |
| :-------- | :--------------- | :--------------- |
| `address` | \`0x$\{string}\` | A wallet address |

#### Returns

[`NvmAccount`](NvmAccount.md)

The nevermined account

#### Defined in

[src/models/NvmAccount.ts:40](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L40)

---

### fromZeroDevSessionKey

▸ **fromZeroDevSessionKey**(`kernelClient`): [`NvmAccount`](NvmAccount.md)

#### Parameters

| Name           | Type                                                               |
| :------------- | :----------------------------------------------------------------- |
| `kernelClient` | `KernelAccountClient`\<`Transport`, `Chain`, `any`, `any`, `any`\> |

#### Returns

[`NvmAccount`](NvmAccount.md)

#### Defined in

[src/models/NvmAccount.ts:62](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L62)

---

### fromZeroDevSigner

▸ **fromZeroDevSigner**(`kernelClient`): `Promise`\<[`NvmAccount`](NvmAccount.md)\>

Returns a nevermined Account from a zerodev signer

#### Parameters

| Name           | Type                                                               |
| :------------- | :----------------------------------------------------------------- |
| `kernelClient` | `KernelAccountClient`\<`Transport`, `Chain`, `any`, `any`, `any`\> |

#### Returns

`Promise`\<[`NvmAccount`](NvmAccount.md)\>

The nevermined account

#### Defined in

[src/models/NvmAccount.ts:52](https://github.com/nevermined-io/sdk-js/blob/613e61d8e011d30fd229ab508635ef7f04ad97cb/src/models/NvmAccount.ts#L52)
