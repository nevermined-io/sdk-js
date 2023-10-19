[@nevermined-io/sdk](../code-reference.md) / ConditionStoreManager

# Class: ConditionStoreManager

## Hierarchy

- [`ContractBase`](ContractBase.md)

  ↳ **`ConditionStoreManager`**

## Table of contents

### Constructors

- [constructor](ConditionStoreManager.md#constructor)

### Properties

- [address](ConditionStoreManager.md#address)
- [contract](ConditionStoreManager.md#contract)
- [contractName](ConditionStoreManager.md#contractname)
- [events](ConditionStoreManager.md#events)
- [version](ConditionStoreManager.md#version)

### Accessors

- [artifactsFolder](ConditionStoreManager.md#artifactsfolder)
- [circuitsFolder](ConditionStoreManager.md#circuitsfolder)
- [config](ConditionStoreManager.md#config)
- [instanceConfig](ConditionStoreManager.md#instanceconfig)
- [instantiableConfig](ConditionStoreManager.md#instantiableconfig)
- [logger](ConditionStoreManager.md#logger)
- [nevermined](ConditionStoreManager.md#nevermined)
- [web3](ConditionStoreManager.md#web3)

### Methods

- [call](ConditionStoreManager.md#call)
- [createCondition](ConditionStoreManager.md#createcondition)
- [delegateCreateRole](ConditionStoreManager.md#delegatecreaterole)
- [getCondition](ConditionStoreManager.md#getcondition)
- [getCreateRole](ConditionStoreManager.md#getcreaterole)
- [getFromAddress](ConditionStoreManager.md#getfromaddress)
- [getInputsOfMethod](ConditionStoreManager.md#getinputsofmethod)
- [getOwner](ConditionStoreManager.md#getowner)
- [getSignatureOfMethod](ConditionStoreManager.md#getsignatureofmethod)
- [init](ConditionStoreManager.md#init)
- [isConditionTimeLocked](ConditionStoreManager.md#isconditiontimelocked)
- [isConditionTimedOut](ConditionStoreManager.md#isconditiontimedout)
- [send](ConditionStoreManager.md#send)
- [sendFrom](ConditionStoreManager.md#sendfrom)
- [setInstanceConfig](ConditionStoreManager.md#setinstanceconfig)
- [getInstance](ConditionStoreManager.md#getinstance)
- [setInstanceConfig](ConditionStoreManager.md#setinstanceconfig-1)

## Constructors

### constructor

• **new ConditionStoreManager**(`contractName`)

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

### createCondition

▸ **createCondition**(`id`, `typeRef`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `id`        | `string`                                        |
| `typeRef`   | `string`                                        |
| `from?`     | [`Account`](Account.md)                         |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/managers/ConditionStoreManager.ts:26](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/ConditionStoreManager.ts#L26)

---

### delegateCreateRole

▸ **delegateCreateRole**(`delegatee`, `owner`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `delegatee` | `string`                                        |
| `owner`     | `string`                                        |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/managers/ConditionStoreManager.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/ConditionStoreManager.ts#L35)

---

### getCondition

▸ **getCondition**(`conditionId`): `Promise`<[`ConditionData`](../interfaces/ConditionData.md)\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `conditionId` | `string` |

#### Returns

`Promise`<[`ConditionData`](../interfaces/ConditionData.md)\>

#### Defined in

[src/keeper/contracts/managers/ConditionStoreManager.ts:55](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/ConditionStoreManager.ts#L55)

---

### getCreateRole

▸ **getCreateRole**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/keeper/contracts/managers/ConditionStoreManager.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/ConditionStoreManager.ts#L39)

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

### getOwner

▸ **getOwner**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/managers/ConditionStoreManager.ts:51](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/ConditionStoreManager.ts#L51)

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

### isConditionTimeLocked

▸ **isConditionTimeLocked**(`id`): `Promise`<`unknown`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/keeper/contracts/managers/ConditionStoreManager.ts:43](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/ConditionStoreManager.ts#L43)

---

### isConditionTimedOut

▸ **isConditionTimedOut**(`id`): `Promise`<`unknown`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/keeper/contracts/managers/ConditionStoreManager.ts:47](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/ConditionStoreManager.ts#L47)

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

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`ConditionStoreManager`](ConditionStoreManager.md)\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`ConditionStoreManager`](ConditionStoreManager.md)\>

#### Overrides

[ContractBase](ContractBase.md).[getInstance](ContractBase.md#getinstance)

#### Defined in

[src/keeper/contracts/managers/ConditionStoreManager.ts:18](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/ConditionStoreManager.ts#L18)

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
