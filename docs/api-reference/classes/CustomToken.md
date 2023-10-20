[@nevermined-io/sdk](../code-reference.md) / CustomToken

# Class: CustomToken

## Hierarchy

- [`Token`](Token.md)

  ↳ **`CustomToken`**

## Table of contents

### Constructors

- [constructor](CustomToken.md#constructor)

### Properties

- [address](CustomToken.md#address)
- [contract](CustomToken.md#contract)
- [contractName](CustomToken.md#contractname)
- [events](CustomToken.md#events)
- [version](CustomToken.md#version)
- [ERC20_ABI](CustomToken.md#erc20_abi)

### Accessors

- [artifactsFolder](CustomToken.md#artifactsfolder)
- [circuitsFolder](CustomToken.md#circuitsfolder)
- [config](CustomToken.md#config)
- [instanceConfig](CustomToken.md#instanceconfig)
- [instantiableConfig](CustomToken.md#instantiableconfig)
- [logger](CustomToken.md#logger)
- [nevermined](CustomToken.md#nevermined)
- [web3](CustomToken.md#web3)

### Methods

- [approve](CustomToken.md#approve)
- [balanceOf](CustomToken.md#balanceof)
- [balanceOfConverted](CustomToken.md#balanceofconverted)
- [call](CustomToken.md#call)
- [decimals](CustomToken.md#decimals)
- [getFromAddress](CustomToken.md#getfromaddress)
- [getInputsOfMethod](CustomToken.md#getinputsofmethod)
- [getSignatureOfMethod](CustomToken.md#getsignatureofmethod)
- [init](CustomToken.md#init)
- [name](CustomToken.md#name)
- [send](CustomToken.md#send)
- [sendFrom](CustomToken.md#sendfrom)
- [setInstanceConfig](CustomToken.md#setinstanceconfig)
- [strBalanceOf](CustomToken.md#strbalanceof)
- [symbol](CustomToken.md#symbol)
- [totalSupply](CustomToken.md#totalsupply)
- [transfer](CustomToken.md#transfer)
- [getInstance](CustomToken.md#getinstance)
- [getInstanceByAddress](CustomToken.md#getinstancebyaddress)
- [setInstanceConfig](CustomToken.md#setinstanceconfig-1)

## Constructors

### constructor

• **new CustomToken**(`contractName`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[Token](Token.md).[constructor](Token.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L34)

## Properties

### address

• **address**: `string`

#### Inherited from

[Token](Token.md).[address](Token.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[Token](Token.md).[contract](Token.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[Token](Token.md).[contractName](Token.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[Token](Token.md).[events](Token.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[Token](Token.md).[version](Token.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

---

### ERC20_ABI

▪ `Static` **ERC20_ABI**: `string`[]

#### Inherited from

[Token](Token.md).[ERC20_ABI](Token.md#erc20_abi)

#### Defined in

[src/keeper/contracts/Token.ts:7](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L7)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Token.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Token.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

Token.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Token.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Token.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

Token.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Token.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

Token.web3

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

#### Inherited from

[Token](Token.md).[approve](Token.md#approve)

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

#### Inherited from

[Token](Token.md).[balanceOf](Token.md#balanceof)

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

#### Inherited from

[Token](Token.md).[balanceOfConverted](Token.md#balanceofconverted)

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

[Token](Token.md).[call](Token.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:328](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L328)

---

### decimals

▸ **decimals**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Inherited from

[Token](Token.md).[decimals](Token.md#decimals)

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

[Token](Token.md).[getFromAddress](Token.md#getfromaddress)

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

[Token](Token.md).[getInputsOfMethod](Token.md#getinputsofmethod)

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

[Token](Token.md).[getSignatureOfMethod](Token.md#getsignatureofmethod)

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

[Token](Token.md).[init](Token.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:49](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L49)

---

### name

▸ **name**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Inherited from

[Token](Token.md).[name](Token.md#name)

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

[Token](Token.md).[send](Token.md#send)

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

[Token](Token.md).[sendFrom](Token.md#sendfrom)

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

[Token](Token.md).[setInstanceConfig](Token.md#setinstanceconfig)

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

#### Inherited from

[Token](Token.md).[strBalanceOf](Token.md#strbalanceof)

#### Defined in

[src/keeper/contracts/Token.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L39)

---

### symbol

▸ **symbol**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Inherited from

[Token](Token.md).[symbol](Token.md#symbol)

#### Defined in

[src/keeper/contracts/Token.ts:47](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L47)

---

### totalSupply

▸ **totalSupply**(): `Promise`<`bigint`\>

#### Returns

`Promise`<`bigint`\>

#### Inherited from

[Token](Token.md).[totalSupply](Token.md#totalsupply)

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

#### Inherited from

[Token](Token.md).[transfer](Token.md#transfer)

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

#### Inherited from

[Token](Token.md).[getInstance](Token.md#getinstance)

#### Defined in

[src/keeper/contracts/Token.ts:21](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/Token.ts#L21)

---

### getInstanceByAddress

▸ `Static` **getInstanceByAddress**(`config`, `address`): `Promise`<[`CustomToken`](CustomToken.md)\>

#### Parameters

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `config`  | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |
| `address` | `string`                                                    |

#### Returns

`Promise`<[`CustomToken`](CustomToken.md)\>

#### Defined in

[src/keeper/contracts/CustomToken.ts:7](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/CustomToken.ts#L7)

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

[Token](Token.md).[setInstanceConfig](Token.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
