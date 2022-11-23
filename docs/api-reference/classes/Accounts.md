[@nevermined-io/nevermined-sdk-js](../code-reference.md) / Accounts

# Class: Accounts

Account submodule of Nevermined.

## Hierarchy

- `Instantiable`

  ↳ **`Accounts`**

## Table of contents

### Constructors

- [constructor](Accounts.md#constructor)

### Accessors

- [artifactsFolder](Accounts.md#artifactsfolder)
- [config](Accounts.md#config)
- [instanceConfig](Accounts.md#instanceconfig)
- [instantiableConfig](Accounts.md#instantiableconfig)
- [logger](Accounts.md#logger)
- [nevermined](Accounts.md#nevermined)
- [web3](Accounts.md#web3)

### Methods

- [addresses](Accounts.md#addresses)
- [balance](Accounts.md#balance)
- [checkExists](Accounts.md#checkexists)
- [findSigner](Accounts.md#findsigner)
- [list](Accounts.md#list)
- [requestEthFromFaucet](Accounts.md#requestethfromfaucet)
- [requestList](Accounts.md#requestlist)
- [requestTokens](Accounts.md#requesttokens)
- [setInstanceConfig](Accounts.md#setinstanceconfig)
- [addressesStatic](Accounts.md#addressesstatic)
- [findSignerStatic](Accounts.md#findsignerstatic)
- [getInstance](Accounts.md#getinstance)
- [setInstanceConfig](Accounts.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Accounts**()

#### Inherited from

Instantiable.constructor

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

### balance

▸ **balance**(`account`): `Promise`<`default`\>

Return account balance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | [`Account`](Account.md) | Account instance. |

#### Returns

`Promise`<`default`\>

Ether and Nevermined Token balance.

#### Defined in

[src/nevermined/Accounts.ts:47](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Accounts.ts#L47)

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

### list

▸ **list**(): `Promise`<[`Account`](Account.md)[]\>

Returns the list of accounts.

#### Returns

`Promise`<[`Account`](Account.md)[]\>

The list of accounts.

#### Defined in

[src/nevermined/Accounts.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Accounts.ts#L26)

___

### requestEthFromFaucet

▸ **requestEthFromFaucet**(`address`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/nevermined/Accounts.ts:70](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Accounts.ts#L70)

___

### requestList

▸ **requestList**(): `Promise`<[`Account`](Account.md)[]\>

Returns the list of accounts including the addresses not controlled by the node,
only can be used by providers like metamask, Status or Trustwallet but not by default
provider

#### Returns

`Promise`<[`Account`](Account.md)[]\>

#### Defined in

[src/nevermined/Accounts.ts:38](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Accounts.ts#L38)

___

### requestTokens

▸ **requestTokens**(`account`, `amount`, `params?`): `Promise`<`boolean`\>

Request tokens for an account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | [`Account`](Account.md) | Account instance. |
| `amount` | `number` | Token amount. |
| `params?` | `TxParameters` | - |

#### Returns

`Promise`<`boolean`\>

true if the call was successful. false otherwise.

#### Defined in

[src/nevermined/Accounts.ts:57](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Accounts.ts#L57)

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

▸ `Static` **getInstance**(`config`): `Promise`<[`Accounts`](Accounts.md)\>

Returns the instance of Accounts.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`Promise`<[`Accounts`](Accounts.md)\>

[Accounts](Accounts.md)

#### Overrides

Instantiable.getInstance

#### Defined in

[src/nevermined/Accounts.ts:14](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined/Accounts.ts#L14)

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
