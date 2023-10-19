[@nevermined-io/sdk](../code-reference.md) / Token

# Class: Token

## Hierarchy

- [`ContractBase`](ContractBase.md)

  ↳ **`Token`**

  ↳↳ [`CustomToken`](CustomToken.md)

## Table of contents

### Constructors

- [constructor](Token.md#constructor)

### Properties

- [address](Token.md#address)
- [contract](Token.md#contract)
- [contractName](Token.md#contractname)
- [events](Token.md#events)
- [version](Token.md#version)
- [ERC20_ABI](Token.md#erc20_abi)

### Accessors

- [artifactsFolder](Token.md#artifactsfolder)
- [circuitsFolder](Token.md#circuitsfolder)
- [config](Token.md#config)
- [instanceConfig](Token.md#instanceconfig)
- [instantiableConfig](Token.md#instantiableconfig)
- [logger](Token.md#logger)
- [nevermined](Token.md#nevermined)
- [web3](Token.md#web3)

### Methods

- [approve](Token.md#approve)
- [balanceOf](Token.md#balanceof)
- [balanceOfConverted](Token.md#balanceofconverted)
- [call](Token.md#call)
- [decimals](Token.md#decimals)
- [getFromAddress](Token.md#getfromaddress)
- [getInputsOfMethod](Token.md#getinputsofmethod)
- [getSignatureOfMethod](Token.md#getsignatureofmethod)
- [init](Token.md#init)
- [name](Token.md#name)
- [send](Token.md#send)
- [sendFrom](Token.md#sendfrom)
- [setInstanceConfig](Token.md#setinstanceconfig)
- [strBalanceOf](Token.md#strbalanceof)
- [symbol](Token.md#symbol)
- [totalSupply](Token.md#totalsupply)
- [transfer](Token.md#transfer)
- [getInstance](Token.md#getinstance)
- [setInstanceConfig](Token.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Token**(`contractName`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[ContractBase](ContractBase.md).[constructor](ContractBase.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L34)

## Properties

### address

• **address**: `string`

#### Inherited from

[ContractBase](ContractBase.md).[address](ContractBase.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[ContractBase](ContractBase.md).[contract](ContractBase.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[ContractBase](ContractBase.md).[contractName](ContractBase.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[ContractBase](ContractBase.md).[events](ContractBase.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[ContractBase](ContractBase.md).[version](ContractBase.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

---

### ERC20_ABI

▪ `Static` **ERC20_ABI**: `string`[]

#### Defined in

[src/keeper/contracts/Token.ts:7](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L7)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ContractBase.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ContractBase.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

ContractBase.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

ContractBase.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

ContractBase.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

ContractBase.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

ContractBase.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

ContractBase.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### approve

▸ **approve**(`to`, `price`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `to`        | `string`                                        |
| `price`     | `bigint`                                        |
| `from?`     | [`Account`](Account.md)                         |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/Token.ts:27](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L27)

---

### balanceOf

▸ **balanceOf**(`address`): `Promise`<`bigint`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

`Promise`<`bigint`\>

#### Defined in

[src/keeper/contracts/Token.ts:43](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L43)

---

### balanceOfConverted

▸ **balanceOfConverted**(`address`): `Promise`<`bigint`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

`Promise`<`bigint`\>

#### Defined in

[src/keeper/contracts/Token.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L35)

---

### call

▸ **call**<`T`\>(`name`, `args`, `from?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `name`  | `string` |
| `args`  | `any`[]  |
| `from?` | `string` |

#### Returns

`Promise`<`T`\>

#### Inherited from

[ContractBase](ContractBase.md).[call](ContractBase.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:328](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L328)

---

### decimals

▸ **decimals**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Defined in

[src/keeper/contracts/Token.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L31)

---

### getFromAddress

▸ `Protected` **getFromAddress**(`from?`): `Promise`<`string`\>

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `from?` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ContractBase](ContractBase.md).[getFromAddress](ContractBase.md#getfromaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:80](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L80)

---

### getInputsOfMethod

▸ **getInputsOfMethod**(`methodName`): readonly `ParamType`[]

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `methodName` | `string` |

#### Returns

readonly `ParamType`[]

#### Inherited from

[ContractBase](ContractBase.md).[getInputsOfMethod](ContractBase.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:44](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L44)

---

### getSignatureOfMethod

▸ **getSignatureOfMethod**(`methodName`, `args?`): `string`

#### Parameters

| Name         | Type     | Default value |
| :----------- | :------- | :------------ |
| `methodName` | `string` | `undefined`   |
| `args`       | `any`[]  | `[]`          |

#### Returns

`string`

#### Inherited from

[ContractBase](ContractBase.md).[getSignatureOfMethod](ContractBase.md#getsignatureofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L39)

---

### init

▸ `Protected` **init**(`config`, `optional?`): `Promise`<`void`\>

#### Parameters

| Name       | Type                                                        | Default value |
| :--------- | :---------------------------------------------------------- | :------------ |
| `config`   | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | `undefined`   |
| `optional` | `boolean`                                                   | `false`       |

#### Returns

`Promise`<`void`\>

#### Inherited from

[ContractBase](ContractBase.md).[init](ContractBase.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:49](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L49)

---

### name

▸ **name**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/Token.ts:51](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L51)

---

### send

▸ **send**(`name`, `from`, `args`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `name`   | `string`                                        |
| `from`   | `string`                                        |
| `args`   | `any`[]                                         |
| `params` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[ContractBase](ContractBase.md).[send](ContractBase.md#send)

#### Defined in

[src/keeper/contracts/ContractBase.ts:235](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L235)

---

### sendFrom

▸ **sendFrom**(`name`, `args`, `from?`, `value?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `name`   | `string`                                        |
| `args`   | `any`[]                                         |
| `from?`  | [`Account`](Account.md)                         |
| `value?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[ContractBase](ContractBase.md).[sendFrom](ContractBase.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L88)

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

[ContractBase](ContractBase.md).[setInstanceConfig](ContractBase.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### strBalanceOf

▸ **strBalanceOf**(`address`): `Promise`<`string`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/Token.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L39)

---

### symbol

▸ **symbol**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/Token.ts:47](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L47)

---

### totalSupply

▸ **totalSupply**(): `Promise`<`bigint`\>

#### Returns

`Promise`<`bigint`\>

#### Defined in

[src/keeper/contracts/Token.ts:55](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L55)

---

### transfer

▸ **transfer**(`to`, `amount`, `from`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `to`        | `string`                                        |
| `amount`    | `bigint`                                        |
| `from`      | `string`                                        |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/Token.ts:59](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L59)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`Token`](Token.md)\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`Token`](Token.md)\>

#### Overrides

[ContractBase](ContractBase.md).[getInstance](ContractBase.md#getinstance)

#### Defined in

[src/keeper/contracts/Token.ts:21](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L21)

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

[ContractBase](ContractBase.md).[setInstanceConfig](ContractBase.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
