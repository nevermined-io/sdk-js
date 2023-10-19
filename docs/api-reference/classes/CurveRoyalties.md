[@nevermined-io/sdk](../code-reference.md) / CurveRoyalties

# Class: CurveRoyalties

## Hierarchy

- [`RoyaltyScheme`](RoyaltyScheme.md)

  ↳ **`CurveRoyalties`**

## Table of contents

### Constructors

- [constructor](CurveRoyalties.md#constructor)

### Properties

- [address](CurveRoyalties.md#address)
- [contract](CurveRoyalties.md#contract)
- [contractName](CurveRoyalties.md#contractname)
- [events](CurveRoyalties.md#events)
- [version](CurveRoyalties.md#version)

### Accessors

- [artifactsFolder](CurveRoyalties.md#artifactsfolder)
- [circuitsFolder](CurveRoyalties.md#circuitsfolder)
- [config](CurveRoyalties.md#config)
- [instanceConfig](CurveRoyalties.md#instanceconfig)
- [instantiableConfig](CurveRoyalties.md#instantiableconfig)
- [logger](CurveRoyalties.md#logger)
- [nevermined](CurveRoyalties.md#nevermined)
- [web3](CurveRoyalties.md#web3)

### Methods

- [call](CurveRoyalties.md#call)
- [getFromAddress](CurveRoyalties.md#getfromaddress)
- [getInputsOfMethod](CurveRoyalties.md#getinputsofmethod)
- [getRoyalty](CurveRoyalties.md#getroyalty)
- [getSignatureOfMethod](CurveRoyalties.md#getsignatureofmethod)
- [init](CurveRoyalties.md#init)
- [send](CurveRoyalties.md#send)
- [sendFrom](CurveRoyalties.md#sendfrom)
- [setInstanceConfig](CurveRoyalties.md#setinstanceconfig)
- [setRoyalty](CurveRoyalties.md#setroyalty)
- [getInstance](CurveRoyalties.md#getinstance)
- [setInstanceConfig](CurveRoyalties.md#setinstanceconfig-1)

## Constructors

### constructor

• **new CurveRoyalties**(`contractName`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[RoyaltyScheme](RoyaltyScheme.md).[constructor](RoyaltyScheme.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L34)

## Properties

### address

• **address**: `string`

#### Inherited from

[RoyaltyScheme](RoyaltyScheme.md).[address](RoyaltyScheme.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[RoyaltyScheme](RoyaltyScheme.md).[contract](RoyaltyScheme.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[RoyaltyScheme](RoyaltyScheme.md).[contractName](RoyaltyScheme.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[RoyaltyScheme](RoyaltyScheme.md).[events](RoyaltyScheme.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[RoyaltyScheme](RoyaltyScheme.md).[version](RoyaltyScheme.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

RoyaltyScheme.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

RoyaltyScheme.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

RoyaltyScheme.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

RoyaltyScheme.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

RoyaltyScheme.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

RoyaltyScheme.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

RoyaltyScheme.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

RoyaltyScheme.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

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

[RoyaltyScheme](RoyaltyScheme.md).[call](RoyaltyScheme.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:328](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L328)

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

[RoyaltyScheme](RoyaltyScheme.md).[getFromAddress](RoyaltyScheme.md#getfromaddress)

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

[RoyaltyScheme](RoyaltyScheme.md).[getInputsOfMethod](RoyaltyScheme.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:44](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L44)

---

### getRoyalty

▸ **getRoyalty**(`did`): `Promise`<`number`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`number`\>

#### Inherited from

[RoyaltyScheme](RoyaltyScheme.md).[getRoyalty](RoyaltyScheme.md#getroyalty)

#### Defined in

[src/keeper/contracts/royalties/RoyaltyScheme.abstract.ts:26](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/royalties/RoyaltyScheme.abstract.ts#L26)

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

[RoyaltyScheme](RoyaltyScheme.md).[getSignatureOfMethod](RoyaltyScheme.md#getsignatureofmethod)

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

[RoyaltyScheme](RoyaltyScheme.md).[init](RoyaltyScheme.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:49](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L49)

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

[RoyaltyScheme](RoyaltyScheme.md).[send](RoyaltyScheme.md#send)

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

[RoyaltyScheme](RoyaltyScheme.md).[sendFrom](RoyaltyScheme.md#sendfrom)

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

[RoyaltyScheme](RoyaltyScheme.md).[setInstanceConfig](RoyaltyScheme.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### setRoyalty

▸ **setRoyalty**(`did`, `amount`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `did`       | `string`                                        |
| `amount`    | `number`                                        |
| `from?`     | [`Account`](Account.md)                         |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[RoyaltyScheme](RoyaltyScheme.md).[setRoyalty](RoyaltyScheme.md#setroyalty)

#### Defined in

[src/keeper/contracts/royalties/RoyaltyScheme.abstract.ts:22](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/royalties/RoyaltyScheme.abstract.ts#L22)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`CurveRoyalties`](CurveRoyalties.md)\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`CurveRoyalties`](CurveRoyalties.md)\>

#### Overrides

[RoyaltyScheme](RoyaltyScheme.md).[getInstance](RoyaltyScheme.md#getinstance)

#### Defined in

[src/keeper/contracts/royalties/CurveRoyalties.ts:5](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/royalties/CurveRoyalties.ts#L5)

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

[RoyaltyScheme](RoyaltyScheme.md).[setInstanceConfig](RoyaltyScheme.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
