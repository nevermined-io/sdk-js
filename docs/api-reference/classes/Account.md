[@nevermined-io/nevermined-sdk-js](../code-reference.md) / Account

# Class: Account

Account information.

## Hierarchy

- `Instantiable`

  ↳ **`Account`**

## Table of contents

### Constructors

- [constructor](Account.md#constructor)

### Properties

- [babySecret](Account.md#babysecret)
- [babyX](Account.md#babyx)
- [babyY](Account.md#babyy)
- [id](Account.md#id)
- [password](Account.md#password)
- [token](Account.md#token)

### Accessors

- [artifactsFolder](Account.md#artifactsfolder)
- [config](Account.md#config)
- [instanceConfig](Account.md#instanceconfig)
- [instantiableConfig](Account.md#instantiableconfig)
- [logger](Account.md#logger)
- [nevermined](Account.md#nevermined)
- [web3](Account.md#web3)

### Methods

- [addresses](Account.md#addresses)
- [authenticate](Account.md#authenticate)
- [checkExists](Account.md#checkexists)
- [findSigner](Account.md#findsigner)
- [getBalance](Account.md#getbalance)
- [getEtherBalance](Account.md#getetherbalance)
- [getId](Account.md#getid)
- [getNeverminedBalance](Account.md#getneverminedbalance)
- [getPassword](Account.md#getpassword)
- [getPublic](Account.md#getpublic)
- [getToken](Account.md#gettoken)
- [isTokenStored](Account.md#istokenstored)
- [requestTokens](Account.md#requesttokens)
- [setId](Account.md#setid)
- [setInstanceConfig](Account.md#setinstanceconfig)
- [setPassword](Account.md#setpassword)
- [setToken](Account.md#settoken)
- [addressesStatic](Account.md#addressesstatic)
- [findSignerStatic](Account.md#findsignerstatic)
- [getInstance](Account.md#getinstance)
- [setInstanceConfig](Account.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Account**(`id?`, `config?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `'0x0'` |
| `config?` | `InstantiableConfig` | `undefined` |

#### Overrides

Instantiable.constructor

#### Defined in

[src/nevermined/Account.ts:20](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L20)

## Properties

### babySecret

• `Optional` **babySecret**: `string`

#### Defined in

[src/nevermined/Account.ts:18](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L18)

___

### babyX

• `Optional` **babyX**: `string`

#### Defined in

[src/nevermined/Account.ts:16](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L16)

___

### babyY

• `Optional` **babyY**: `string`

#### Defined in

[src/nevermined/Account.ts:17](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L17)

___

### id

• `Private` **id**: `string` = `'0x0'`

#### Defined in

[src/nevermined/Account.ts:20](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L20)

___

### password

• `Private` `Optional` **password**: `string`

#### Defined in

[src/nevermined/Account.ts:12](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L12)

___

### token

• `Private` `Optional` **token**: `string`

#### Defined in

[src/nevermined/Account.ts:14](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L14)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L63)

## Methods

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Instantiable.addresses

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L129)

___

### authenticate

▸ **authenticate**(): `Promise`<`void`\>

Authenticate the account.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/nevermined/Account.ts:82](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L82)

___

### checkExists

▸ `Protected` **checkExists**(`address`): `Promise`<`boolean`\>

Returns true of contract exists else it throws.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

true if the contract exists.

#### Inherited from

Instantiable.checkExists

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L44)

___

### findSigner

▸ **findSigner**(`from`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

Instantiable.findSigner

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

___

### getBalance

▸ **getBalance**(): `Promise`<`default`\>

Balances of Ether and Nevermined Token.

#### Returns

`Promise`<`default`\>

#### Defined in

[src/nevermined/Account.ts:108](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L108)

___

### getEtherBalance

▸ **getEtherBalance**(): `Promise`<`default`\>

Balance of Ether.

#### Returns

`Promise`<`default`\>

#### Defined in

[src/nevermined/Account.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L100)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[src/nevermined/Account.ts:27](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L27)

___

### getNeverminedBalance

▸ **getNeverminedBalance**(): `Promise`<`default`\>

Balance of Nevermined Token.

#### Returns

`Promise`<`default`\>

#### Defined in

[src/nevermined/Account.ts:90](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L90)

___

### getPassword

▸ **getPassword**(): `string`

Returns account password.

#### Returns

`string`

The account password.

#### Defined in

[src/nevermined/Account.ts:51](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L51)

___

### getPublic

▸ **getPublic**(): `string`

#### Returns

`string`

#### Defined in

[src/nevermined/Account.ts:35](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L35)

___

### getToken

▸ **getToken**(): `Promise`<`string`\>

Returns account token.

#### Returns

`Promise`<`string`\>

Account token.

#### Defined in

[src/nevermined/Account.ts:67](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L67)

___

### isTokenStored

▸ **isTokenStored**(): `Promise`<`boolean`\>

Returns if account token is stored.

#### Returns

`Promise`<`boolean`\>

true if the token is stored.

#### Defined in

[src/nevermined/Account.ts:75](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L75)

___

### requestTokens

▸ **requestTokens**(`amount`, `params?`): `Promise`<`string`\>

Request Nevermined Tokens.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` \| `number` \| `default` | Tokens to be requested. |
| `params?` | `TxParameters` | - |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/Account.ts:120](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L120)

___

### setId

▸ **setId**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `any` |

#### Returns

`void`

#### Defined in

[src/nevermined/Account.ts:31](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L31)

___

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

Instantiable.setInstanceConfig

#### Defined in

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L171)

___

### setPassword

▸ **setPassword**(`password`): `void`

Set account password.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `string` | Password for account. |

#### Returns

`void`

#### Defined in

[src/nevermined/Account.ts:43](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L43)

___

### setToken

▸ **setToken**(`token`): `void`

Set account token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | Token for account. |

#### Returns

`void`

#### Defined in

[src/nevermined/Account.ts:59](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Account.ts#L59)

___

### addressesStatic

▸ `Static` **addressesStatic**(`config`, `web3`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](Config.md) |
| `web3` | `JsonRpcProvider` |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Instantiable.addressesStatic

#### Defined in

[src/Instantiable.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L142)

___

### findSignerStatic

▸ `Static` **findSignerStatic**(`config`, `web3`, `from`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](Config.md) |
| `web3` | `JsonRpcProvider` |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

Instantiable.findSignerStatic

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

___

### getInstance

▸ `Static` **getInstance**(...`_args`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `..._args` | `any` |

#### Returns

`any`

#### Inherited from

Instantiable.getInstance

#### Defined in

[src/Instantiable.abstract.ts:158](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L158)

___

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Instantiable`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `T` |
| `instantiableConfig` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

Instantiable.setInstanceConfig

#### Defined in

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
