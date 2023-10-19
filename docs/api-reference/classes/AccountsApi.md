[@nevermined-io/sdk](../code-reference.md) / AccountsApi

# Class: AccountsApi

Nevermined Accounts API. It allows execute operations related with Ethereum accounts.

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`AccountsApi`**

## Table of contents

### Constructors

- [constructor](AccountsApi.md#constructor)

### Accessors

- [artifactsFolder](AccountsApi.md#artifactsfolder)
- [circuitsFolder](AccountsApi.md#circuitsfolder)
- [config](AccountsApi.md#config)
- [instanceConfig](AccountsApi.md#instanceconfig)
- [instantiableConfig](AccountsApi.md#instantiableconfig)
- [logger](AccountsApi.md#logger)
- [nevermined](AccountsApi.md#nevermined)
- [web3](AccountsApi.md#web3)

### Methods

- [addresses](AccountsApi.md#addresses)
- [balance](AccountsApi.md#balance)
- [findSigner](AccountsApi.md#findsigner)
- [findSignerStatic](AccountsApi.md#findsignerstatic)
- [getAccount](AccountsApi.md#getaccount)
- [list](AccountsApi.md#list)
- [requestTokens](AccountsApi.md#requesttokens)
- [setInstanceConfig](AccountsApi.md#setinstanceconfig)
- [getInstance](AccountsApi.md#getinstance)
- [setInstanceConfig](AccountsApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new AccountsApi**(`config`)

Creates a new AccountsApi

#### Parameters

| Name     | Type                                                        | Description                              |
| :------- | :---------------------------------------------------------- | :--------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | Configuration of the Nevermined instance |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/api/AccountsApi.ts:16](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AccountsApi.ts#L16)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/nevermined/api/AccountsApi.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AccountsApi.ts#L90)

---

### balance

▸ **balance**(`account`): `Promise`<[`Balance`](../interfaces/Balance.md)\>

Return account balance.

#### Parameters

| Name      | Type                    | Description       |
| :-------- | :---------------------- | :---------------- |
| `account` | [`Account`](Account.md) | Account instance. |

#### Returns

`Promise`<[`Balance`](../interfaces/Balance.md)\>

Ether and Nevermined Token balance.

#### Defined in

[src/nevermined/api/AccountsApi.ts:46](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AccountsApi.ts#L46)

---

### findSigner

▸ **findSigner**(`from`): `Promise`<`Signer`\>

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Defined in

[src/nevermined/api/AccountsApi.ts:70](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AccountsApi.ts#L70)

---

### findSignerStatic

▸ **findSignerStatic**(`from`): `Promise`<`Signer`\>

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Defined in

[src/nevermined/api/AccountsApi.ts:80](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AccountsApi.ts#L80)

---

### getAccount

▸ **getAccount**(`address`): [`Account`](Account.md)

Returns an account initialized with existing web3 provider

#### Parameters

| Name      | Type     | Description         |
| :-------- | :------- | :------------------ |
| `address` | `string` | The account address |

#### Returns

[`Account`](Account.md)

The account

#### Defined in

[src/nevermined/api/AccountsApi.ts:37](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AccountsApi.ts#L37)

---

### list

▸ **list**(): `Promise`<[`Account`](Account.md)[]\>

Returns the list of accounts including the addresses not controlled by the node,
only can be used by providers like metamask, Status or Trustwallet but not by default
provider

#### Returns

`Promise`<[`Account`](Account.md)[]\>

The list of accounts.

#### Defined in

[src/nevermined/api/AccountsApi.ts:27](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AccountsApi.ts#L27)

---

### requestTokens

▸ **requestTokens**(`account`, `amount`, `params?`): `Promise`<`boolean`\>

Request tokens for an account.

#### Parameters

| Name      | Type                                            | Description       |
| :-------- | :---------------------------------------------- | :---------------- |
| `account` | [`Account`](Account.md)                         | Account instance. |
| `amount`  | `number`                                        | Token amount.     |
| `params?` | [`TxParameters`](../interfaces/TxParameters.md) | -                 |

#### Returns

`Promise`<`boolean`\>

true if the call was successful. false otherwise.

#### Defined in

[src/nevermined/api/AccountsApi.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/AccountsApi.ts#L57)

---

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`void`

#### Inherited from

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### getInstance

▸ `Static` **getInstance**(`..._args`): `any`

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `..._args` | `any` |

#### Returns

`any`

#### Inherited from

[Instantiable](Instantiable.md).[getInstance](Instantiable.md#getinstance)

#### Defined in

[src/Instantiable.abstract.ts:86](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L86)

---

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type                                      |
| :--- | :---------------------------------------- |
| `T`  | extends [`Instantiable`](Instantiable.md) |

#### Parameters

| Name                 | Type                                                        |
| :------------------- | :---------------------------------------------------------- |
| `instance`           | `T`                                                         |
| `instantiableConfig` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`void`

#### Inherited from

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
