[@nevermined-io/sdk](../code-reference.md) / AgreementStoreManager

# Class: AgreementStoreManager

## Hierarchy

- [`ContractBase`](ContractBase.md)

  ↳ **`AgreementStoreManager`**

## Table of contents

### Constructors

- [constructor](AgreementStoreManager.md#constructor)

### Properties

- [address](AgreementStoreManager.md#address)
- [contract](AgreementStoreManager.md#contract)
- [contractName](AgreementStoreManager.md#contractname)
- [events](AgreementStoreManager.md#events)
- [templates](AgreementStoreManager.md#templates)
- [version](AgreementStoreManager.md#version)

### Accessors

- [artifactsFolder](AgreementStoreManager.md#artifactsfolder)
- [circuitsFolder](AgreementStoreManager.md#circuitsfolder)
- [config](AgreementStoreManager.md#config)
- [instanceConfig](AgreementStoreManager.md#instanceconfig)
- [instantiableConfig](AgreementStoreManager.md#instantiableconfig)
- [logger](AgreementStoreManager.md#logger)
- [nevermined](AgreementStoreManager.md#nevermined)
- [web3](AgreementStoreManager.md#web3)

### Methods

- [addTemplate](AgreementStoreManager.md#addtemplate)
- [agreementId](AgreementStoreManager.md#agreementid)
- [call](AgreementStoreManager.md#call)
- [createAgreement](AgreementStoreManager.md#createagreement)
- [getAgreement](AgreementStoreManager.md#getagreement)
- [getAgreements](AgreementStoreManager.md#getagreements)
- [getFromAddress](AgreementStoreManager.md#getfromaddress)
- [getInputsOfMethod](AgreementStoreManager.md#getinputsofmethod)
- [getOwner](AgreementStoreManager.md#getowner)
- [getSignatureOfMethod](AgreementStoreManager.md#getsignatureofmethod)
- [init](AgreementStoreManager.md#init)
- [send](AgreementStoreManager.md#send)
- [sendFrom](AgreementStoreManager.md#sendfrom)
- [setInstanceConfig](AgreementStoreManager.md#setinstanceconfig)
- [setTemplates](AgreementStoreManager.md#settemplates)
- [getInstance](AgreementStoreManager.md#getinstance)
- [setInstanceConfig](AgreementStoreManager.md#setinstanceconfig-1)

## Constructors

### constructor

• **new AgreementStoreManager**(`contractName`)

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

### templates

• **templates**: `any`

#### Defined in

[src/keeper/contracts/managers/AgreementStoreManager.ts:19](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/AgreementStoreManager.ts#L19)

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

### addTemplate

▸ **addTemplate**(`name`, `obj`): `void`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |
| `obj`  | `any`    |

#### Returns

`void`

#### Defined in

[src/keeper/contracts/managers/AgreementStoreManager.ts:33](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/AgreementStoreManager.ts#L33)

---

### agreementId

▸ **agreementId**(`agreementIdSeed`, `creator`): `Promise`<`string`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `agreementIdSeed` | `string` |
| `creator`         | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/managers/AgreementStoreManager.ts:76](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/AgreementStoreManager.ts#L76)

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

### createAgreement

▸ **createAgreement**(`agreementId`, `did`, `conditionTypes`, `conditionIds`, `timeLocks`, `timeOuts`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name             | Type                                            |
| :--------------- | :---------------------------------------------- |
| `agreementId`    | `string`                                        |
| `did`            | `string`                                        |
| `conditionTypes` | `string`[]                                      |
| `conditionIds`   | `string`[]                                      |
| `timeLocks`      | `number`[]                                      |
| `timeOuts`       | `number`[]                                      |
| `from?`          | [`Account`](Account.md)                         |
| `txParams?`      | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/managers/AgreementStoreManager.ts:80](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/AgreementStoreManager.ts#L80)

---

### getAgreement

▸ **getAgreement**(`agreementId`): `Promise`<[`AgreementData`](../interfaces/AgreementData.md)\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |

#### Returns

`Promise`<[`AgreementData`](../interfaces/AgreementData.md)\>

#### Defined in

[src/keeper/contracts/managers/AgreementStoreManager.ts:41](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/AgreementStoreManager.ts#L41)

---

### getAgreements

▸ **getAgreements**(`did`): `Promise`<[`AgreementData`](../interfaces/AgreementData.md)[]\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<[`AgreementData`](../interfaces/AgreementData.md)[]\>

#### Defined in

[src/keeper/contracts/managers/AgreementStoreManager.ts:68](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/AgreementStoreManager.ts#L68)

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

[src/keeper/contracts/managers/AgreementStoreManager.ts:37](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/AgreementStoreManager.ts#L37)

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

### setTemplates

▸ **setTemplates**(`temp`): `void`

#### Parameters

| Name   | Type  |
| :----- | :---- |
| `temp` | `any` |

#### Returns

`void`

#### Defined in

[src/keeper/contracts/managers/AgreementStoreManager.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/AgreementStoreManager.ts#L29)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`AgreementStoreManager`](AgreementStoreManager.md)\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`AgreementStoreManager`](AgreementStoreManager.md)\>

#### Overrides

[ContractBase](ContractBase.md).[getInstance](ContractBase.md#getinstance)

#### Defined in

[src/keeper/contracts/managers/AgreementStoreManager.ts:21](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/managers/AgreementStoreManager.ts#L21)

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
