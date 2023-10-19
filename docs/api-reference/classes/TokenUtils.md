[@nevermined-io/sdk](../code-reference.md) / TokenUtils

# Class: TokenUtils

Tokens submodule of Nevermined.

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`TokenUtils`**

## Table of contents

### Constructors

- [constructor](TokenUtils.md#constructor)

### Accessors

- [artifactsFolder](TokenUtils.md#artifactsfolder)
- [circuitsFolder](TokenUtils.md#circuitsfolder)
- [config](TokenUtils.md#config)
- [instanceConfig](TokenUtils.md#instanceconfig)
- [instantiableConfig](TokenUtils.md#instantiableconfig)
- [logger](TokenUtils.md#logger)
- [nevermined](TokenUtils.md#nevermined)
- [web3](TokenUtils.md#web3)

### Methods

- [getAddress](TokenUtils.md#getaddress)
- [getName](TokenUtils.md#getname)
- [getSymbol](TokenUtils.md#getsymbol)
- [getTotalSupply](TokenUtils.md#gettotalsupply)
- [request](TokenUtils.md#request)
- [setInstanceConfig](TokenUtils.md#setinstanceconfig)
- [transfer](TokenUtils.md#transfer)
- [getInstance](TokenUtils.md#getinstance)
- [setInstanceConfig](TokenUtils.md#setinstanceconfig-1)

## Constructors

### constructor

• **new TokenUtils**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/Token.ts:9](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Token.ts#L9)

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

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Defined in

[src/nevermined/Token.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Token.ts#L30)

---

### getName

▸ **getName**(): `Promise`<`string`\>

Get token name.

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/Token.ts:37](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Token.ts#L37)

---

### getSymbol

▸ **getSymbol**(): `Promise`<`string`\>

Get token symbol.

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/Token.ts:26](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Token.ts#L26)

---

### getTotalSupply

▸ **getTotalSupply**(): `Promise`<`bigint`\>

Get token total supply

#### Returns

`Promise`<`bigint`\>

#### Defined in

[src/nevermined/Token.ts:44](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Token.ts#L44)

---

### request

▸ **request**(`account`, `amount`, `params?`): `Promise`<`boolean`\>

Request tokens for an account.

#### Parameters

| Name      | Type                                            | Description       |
| :-------- | :---------------------------------------------- | :---------------- |
| `account` | [`Account`](Account.md)                         | Account instance. |
| `amount`  | `number`                                        | Token amount.     |
| `params?` | [`TxParameters`](../interfaces/TxParameters.md) | -                 |

#### Returns

`Promise`<`boolean`\>

true if the call succeeded, false otherwise

#### Defined in

[src/nevermined/Token.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Token.ts#L73)

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

### transfer

▸ **transfer**(`to`, `amount`, `from`, `txParams?`): `Promise`<`boolean`\>

Transfer a number of tokens to the mentioned account.

#### Parameters

| Name        | Type                                            | Description                       |
| :---------- | :---------------------------------------------- | :-------------------------------- |
| `to`        | `string`                                        | Address that receives the tokens. |
| `amount`    | `bigint`                                        | Tokens to transfer.               |
| `from`      | [`Account`](Account.md)                         | Sender account address.           |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters            |

#### Returns

`Promise`<`boolean`\>

True if the transfer succeeded.

#### Defined in

[src/nevermined/Token.ts:56](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Token.ts#L56)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`TokenUtils`](TokenUtils.md)\>

Returns the instance of Token.

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`TokenUtils`](TokenUtils.md)\>

[Token](Token.md)

#### Overrides

[Instantiable](Instantiable.md).[getInstance](Instantiable.md#getinstance)

#### Defined in

[src/nevermined/Token.ts:18](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Token.ts#L18)

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
