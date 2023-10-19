[@nevermined-io/sdk](../code-reference.md) / ContractHandler

# Class: ContractHandler

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`ContractHandler`**

## Table of contents

### Constructors

- [constructor](ContractHandler.md#constructor)

### Properties

- [contracts](ContractHandler.md#contracts)

### Accessors

- [artifactsFolder](ContractHandler.md#artifactsfolder)
- [circuitsFolder](ContractHandler.md#circuitsfolder)
- [config](ContractHandler.md#config)
- [instanceConfig](ContractHandler.md#instanceconfig)
- [instantiableConfig](ContractHandler.md#instantiableconfig)
- [logger](ContractHandler.md#logger)
- [nevermined](ContractHandler.md#nevermined)
- [web3](ContractHandler.md#web3)

### Methods

- [checkExists](ContractHandler.md#checkexists)
- [deployAbi](ContractHandler.md#deployabi)
- [get](ContractHandler.md#get)
- [getFeeData](ContractHandler.md#getfeedata)
- [getFeeDataArbitrum](ContractHandler.md#getfeedataarbitrum)
- [getFeeDataPolygon](ContractHandler.md#getfeedatapolygon)
- [getVersion](ContractHandler.md#getversion)
- [load](ContractHandler.md#load)
- [setInstanceConfig](ContractHandler.md#setinstanceconfig)
- [fetchJson](ContractHandler.md#fetchjson)
- [getABI](ContractHandler.md#getabi)
- [getContract](ContractHandler.md#getcontract)
- [getHash](ContractHandler.md#gethash)
- [getInstance](ContractHandler.md#getinstance)
- [getSignatureOfMethod](ContractHandler.md#getsignatureofmethod)
- [hasContract](ContractHandler.md#hascontract)
- [setContract](ContractHandler.md#setcontract)
- [setInstanceConfig](ContractHandler.md#setinstanceconfig-1)

## Constructors

### constructor

• **new ContractHandler**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/keeper/ContractHandler.ts:47](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L47)

## Properties

### contracts

▪ `Static` `Private` **contracts**: `Map`<`string`, `BaseContract`\>

#### Defined in

[src/keeper/ContractHandler.ts:38](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L38)

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

### checkExists

▸ **checkExists**(`address`): `Promise`<`boolean`\>

Returns true of contract exists else it throws.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

true if the contract exists.

#### Defined in

[src/keeper/ContractHandler.ts:208](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L208)

---

### deployAbi

▸ **deployAbi**(`artifact`, `from`, `args?`): `Promise`<`BaseContract`\>

#### Parameters

| Name                | Type                    | Default value |
| :------------------ | :---------------------- | :------------ |
| `artifact`          | `Object`                | `undefined`   |
| `artifact.abi`      | `InterfaceAbi`          | `undefined`   |
| `artifact.bytecode` | `string`                | `undefined`   |
| `artifact.name?`    | `string`                | `undefined`   |
| `from`              | [`Account`](Account.md) | `undefined`   |
| `args`              | `string`[]              | `[]`          |

#### Returns

`Promise`<`BaseContract`\>

#### Defined in

[src/keeper/ContractHandler.ts:116](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L116)

---

### get

▸ **get**(`what`, `optional?`, `artifactsFolder`, `address?`): `Promise`<`BaseContract`\>

#### Parameters

| Name              | Type      | Default value |
| :---------------- | :-------- | :------------ |
| `what`            | `string`  | `undefined`   |
| `optional`        | `boolean` | `false`       |
| `artifactsFolder` | `string`  | `undefined`   |
| `address?`        | `string`  | `undefined`   |

#### Returns

`Promise`<`BaseContract`\>

#### Defined in

[src/keeper/ContractHandler.ts:52](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L52)

---

### getFeeData

▸ **getFeeData**(`gasPrice?`, `maxFeePerGas?`, `maxPriorityFeePerGas?`): `Promise`<{ `maxFeePerGas`: `bigint` = maxFeePerGas; `maxPriorityFeePerGas`: `bigint` = maxPriorityFeePerGas; `type`: `number` = 2 } \| { `gasPrice`: `bigint` = feeData.gasPrice }\>

#### Parameters

| Name                    | Type     |
| :---------------------- | :------- |
| `gasPrice?`             | `bigint` |
| `maxFeePerGas?`         | `bigint` |
| `maxPriorityFeePerGas?` | `bigint` |

#### Returns

`Promise`<{ `maxFeePerGas`: `bigint` = maxFeePerGas; `maxPriorityFeePerGas`: `bigint` = maxPriorityFeePerGas; `type`: `number` = 2 } \| { `gasPrice`: `bigint` = feeData.gasPrice }\>

#### Defined in

[src/keeper/ContractHandler.ts:258](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L258)

---

### getFeeDataArbitrum

▸ `Private` **getFeeDataArbitrum**(): `Promise`<{ `gasPrice`: `bigint` = feeData.gasPrice }\>

#### Returns

`Promise`<{ `gasPrice`: `bigint` = feeData.gasPrice }\>

#### Defined in

[src/keeper/ContractHandler.ts:322](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L322)

---

### getFeeDataPolygon

▸ `Private` **getFeeDataPolygon**(`networkId`): `Promise`<{ `maxFeePerGas`: `bigint` = maxFeePerGas; `maxPriorityFeePerGas`: `bigint` = maxPriorityFeePerGas; `type`: `number` = 2 }\>

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `networkId` | `number` |

#### Returns

`Promise`<{ `maxFeePerGas`: `bigint` = maxFeePerGas; `maxPriorityFeePerGas`: `bigint` = maxPriorityFeePerGas; `type`: `number` = 2 }\>

#### Defined in

[src/keeper/ContractHandler.ts:287](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L287)

---

### getVersion

▸ **getVersion**(`contractName`, `artifactsFolder`): `Promise`<`string`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `contractName`    | `string` |
| `artifactsFolder` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/ContractHandler.ts:100](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L100)

---

### load

▸ `Private` **load**(`what`, `where`, `networkId`, `artifactsFolder`, `address?`): `Promise`<`BaseContract`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `what`            | `string` |
| `where`           | `string` |
| `networkId`       | `number` |
| `artifactsFolder` | `string` |
| `address?`        | `string` |

#### Returns

`Promise`<`BaseContract`\>

#### Defined in

[src/keeper/ContractHandler.ts:172](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L172)

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

### fetchJson

▸ `Static` **fetchJson**(`path`): `Promise`<`any`\>

#### Parameters

| Name   | Type  |
| :----- | :---- |
| `path` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/keeper/ContractHandler.ts:239](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L239)

---

### getABI

▸ `Static` **getABI**(`contractName`, `artifactsFolder?`, `networkName?`): `Promise`<`any`\>

#### Parameters

| Name              | Type     | Default value   |
| :---------------- | :------- | :-------------- |
| `contractName`    | `string` | `undefined`     |
| `artifactsFolder` | `string` | `'./artifacts'` |
| `networkName?`    | `string` | `undefined`     |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/keeper/ContractHandler.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L73)

---

### getContract

▸ `Static` `Protected` **getContract**(`what`, `networkId`, `address?`): `BaseContract`

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `what`      | `string` |
| `networkId` | `number` |
| `address?`  | `string` |

#### Returns

`BaseContract`

#### Defined in

[src/keeper/ContractHandler.ts:21](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L21)

---

### getHash

▸ `Static` `Private` **getHash**(`what`, `networkId`, `address?`): `string`

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `what`      | `string` |
| `networkId` | `number` |
| `address?`  | `string` |

#### Returns

`string`

#### Defined in

[src/keeper/ContractHandler.ts:43](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L43)

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

### getSignatureOfMethod

▸ `Static` **getSignatureOfMethod**(`baseContract`, `methodName`, `args`): `string`

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `baseContract` | `BaseContract` |
| `methodName`   | `string`       |
| `args`         | `any`[]        |

#### Returns

`string`

#### Defined in

[src/keeper/ContractHandler.ts:224](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L224)

---

### hasContract

▸ `Static` `Protected` **hasContract**(`what`, `networkId`, `address?`): `boolean`

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `what`      | `string` |
| `networkId` | `number` |
| `address?`  | `string` |

#### Returns

`boolean`

#### Defined in

[src/keeper/ContractHandler.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L34)

---

### setContract

▸ `Static` `Protected` **setContract**(`what`, `networkId`, `contractInstance`, `address?`): `void`

#### Parameters

| Name               | Type           |
| :----------------- | :------------- |
| `what`             | `string`       |
| `networkId`        | `number`       |
| `contractInstance` | `BaseContract` |
| `address?`         | `string`       |

#### Returns

`void`

#### Defined in

[src/keeper/ContractHandler.ts:25](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/ContractHandler.ts#L25)

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
