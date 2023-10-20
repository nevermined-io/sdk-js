[@nevermined-io/sdk](../code-reference.md) / Condition

# Class: Condition<Ctx, Extra\>

## Type parameters

| Name    | Type                                                            |
| :------ | :-------------------------------------------------------------- |
| `Ctx`   | extends [`ConditionContext`](../interfaces/ConditionContext.md) |
| `Extra` | `Record`<`string`, `unknown`\>                                  |

## Hierarchy

- [`ConditionSmall`](ConditionSmall.md)

  ↳ **`Condition`**

  ↳↳ [`ProviderCondition`](ProviderCondition.md)

  ↳↳ [`ConsumerCondition`](ConsumerCondition.md)

## Table of contents

### Constructors

- [constructor](Condition.md#constructor)

### Properties

- [address](Condition.md#address)
- [contract](Condition.md#contract)
- [contractName](Condition.md#contractname)
- [events](Condition.md#events)
- [version](Condition.md#version)

### Accessors

- [artifactsFolder](Condition.md#artifactsfolder)
- [circuitsFolder](Condition.md#circuitsfolder)
- [config](Condition.md#config)
- [instanceConfig](Condition.md#instanceconfig)
- [instantiableConfig](Condition.md#instantiableconfig)
- [logger](Condition.md#logger)
- [nevermined](Condition.md#nevermined)
- [web3](Condition.md#web3)

### Methods

- [abortByTimeOut](Condition.md#abortbytimeout)
- [call](Condition.md#call)
- [fulfill](Condition.md#fulfill)
- [fulfillInstance](Condition.md#fulfillinstance)
- [fulfillPlain](Condition.md#fulfillplain)
- [fulfillWithNode](Condition.md#fulfillwithnode)
- [generateId](Condition.md#generateid)
- [generateIdHash](Condition.md#generateidhash)
- [generateIdWithSeed](Condition.md#generateidwithseed)
- [getConditionFulfilledEvent](Condition.md#getconditionfulfilledevent)
- [getFromAddress](Condition.md#getfromaddress)
- [getInputsOfMethod](Condition.md#getinputsofmethod)
- [getSignatureOfMethod](Condition.md#getsignatureofmethod)
- [hashValues](Condition.md#hashvalues)
- [hashValuesPlain](Condition.md#hashvaluesplain)
- [init](Condition.md#init)
- [instance](Condition.md#instance)
- [instanceFromDDO](Condition.md#instancefromddo)
- [params](Condition.md#params)
- [paramsFromDDO](Condition.md#paramsfromddo)
- [send](Condition.md#send)
- [sendFrom](Condition.md#sendfrom)
- [setInstanceConfig](Condition.md#setinstanceconfig)
- [getInstance](Condition.md#getinstance)
- [setInstanceConfig](Condition.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Condition**<`Ctx`, `Extra`\>(`contractName`)

#### Type parameters

| Name    | Type                                                            |
| :------ | :-------------------------------------------------------------- |
| `Ctx`   | extends [`ConditionContext`](../interfaces/ConditionContext.md) |
| `Extra` | `Record`<`string`, `unknown`\>                                  |

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[ConditionSmall](ConditionSmall.md).[constructor](ConditionSmall.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L34)

## Properties

### address

• **address**: `string`

#### Inherited from

[ConditionSmall](ConditionSmall.md).[address](ConditionSmall.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[ConditionSmall](ConditionSmall.md).[contract](ConditionSmall.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[ConditionSmall](ConditionSmall.md).[contractName](ConditionSmall.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[ConditionSmall](ConditionSmall.md).[events](ConditionSmall.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[ConditionSmall](ConditionSmall.md).[version](ConditionSmall.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ConditionSmall.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ConditionSmall.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

ConditionSmall.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

ConditionSmall.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

ConditionSmall.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

ConditionSmall.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

ConditionSmall.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

ConditionSmall.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### abortByTimeOut

▸ **abortByTimeOut**(`conditionId`, `from?`, `params?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name          | Type                                            |
| :------------ | :---------------------------------------------- |
| `conditionId` | `string`                                        |
| `from?`       | [`Account`](Account.md)                         |
| `params?`     | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[ConditionSmall](ConditionSmall.md).[abortByTimeOut](ConditionSmall.md#abortbytimeout)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L88)

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

[ConditionSmall](ConditionSmall.md).[call](ConditionSmall.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:328](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L328)

---

### fulfill

▸ `Abstract` **fulfill**(`agreementId`, `...args`): `any`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |
| `...args`     | `any`[]  |

#### Returns

`any`

#### Inherited from

[ConditionSmall](ConditionSmall.md).[fulfill](ConditionSmall.md#fulfill)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:61](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L61)

---

### fulfillInstance

▸ **fulfillInstance**(`cond`, `additionalParams`, `from?`, `txParams?`, `method?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name               | Type                                                                | Default value |
| :----------------- | :------------------------------------------------------------------ | :------------ |
| `cond`             | [`ConditionInstance`](../interfaces/ConditionInstance.md)<`Extra`\> | `undefined`   |
| `additionalParams` | `Extra`                                                             | `undefined`   |
| `from?`            | [`Account`](Account.md)                                             | `undefined`   |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)                     | `undefined`   |
| `method`           | [`ConditionMethod`](../code-reference.md#conditionmethod)           | `'fulfill'`   |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:150](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L150)

---

### fulfillPlain

▸ **fulfillPlain**(`agreementId`, `args`, `from?`, `txParams?`, `method?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name          | Type                                                      | Default value |
| :------------ | :-------------------------------------------------------- | :------------ |
| `agreementId` | `string`                                                  | `undefined`   |
| `args`        | `any`[]                                                   | `undefined`   |
| `from?`       | [`Account`](Account.md)                                   | `undefined`   |
| `txParams?`   | [`TxParameters`](../interfaces/TxParameters.md)           | `undefined`   |
| `method`      | [`ConditionMethod`](../code-reference.md#conditionmethod) | `'fulfill'`   |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[ConditionSmall](ConditionSmall.md).[fulfillPlain](ConditionSmall.md#fulfillplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L63)

---

### fulfillWithNode

▸ `Abstract` **fulfillWithNode**(`cond`, `additionalParams`, `from?`, `txParams?`): `Promise`<`void` \| `ContractTransactionReceipt`\>

#### Parameters

| Name               | Type                                                                |
| :----------------- | :------------------------------------------------------------------ |
| `cond`             | [`ConditionInstance`](../interfaces/ConditionInstance.md)<`Extra`\> |
| `additionalParams` | `Extra`                                                             |
| `from?`            | [`Account`](Account.md)                                             |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)                     |

#### Returns

`Promise`<`void` \| `ContractTransactionReceipt`\>

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:167](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L167)

---

### generateId

▸ **generateId**(`agreementId`, `valueHash`): `Promise`<`string`\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |
| `valueHash`   | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConditionSmall](ConditionSmall.md).[generateId](ConditionSmall.md#generateid)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L77)

---

### generateIdHash

▸ **generateIdHash**(`agreementId`, `...values`): `Promise`<`string`\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |
| `...values`   | `any`[]  |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConditionSmall](ConditionSmall.md).[generateIdHash](ConditionSmall.md#generateidhash)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L73)

---

### generateIdWithSeed

▸ **generateIdWithSeed**(`agreementId`, `valueHash`): `Promise`<[`string`, `string`]\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |
| `valueHash`   | `string` |

#### Returns

`Promise`<[`string`, `string`]\>

#### Inherited from

[ConditionSmall](ConditionSmall.md).[generateIdWithSeed](ConditionSmall.md#generateidwithseed)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L81)

---

### getConditionFulfilledEvent

▸ **getConditionFulfilledEvent**(`agreementId`): [`EventResult`](../code-reference.md#eventresult)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |

#### Returns

[`EventResult`](../code-reference.md#eventresult)

#### Inherited from

[ConditionSmall](ConditionSmall.md).[getConditionFulfilledEvent](ConditionSmall.md#getconditionfulfilledevent)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:92](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L92)

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

[ConditionSmall](ConditionSmall.md).[getFromAddress](ConditionSmall.md#getfromaddress)

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

[ConditionSmall](ConditionSmall.md).[getInputsOfMethod](ConditionSmall.md#getinputsofmethod)

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

[ConditionSmall](ConditionSmall.md).[getSignatureOfMethod](ConditionSmall.md#getsignatureofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L39)

---

### hashValues

▸ **hashValues**(`...args`): `Promise`<`string`\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Overrides

[ConditionSmall](ConditionSmall.md).[hashValues](ConditionSmall.md#hashvalues)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L129)

---

### hashValuesPlain

▸ **hashValuesPlain**(`...args`): `Promise`<`string`\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:133](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L133)

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

[ConditionSmall](ConditionSmall.md).[init](ConditionSmall.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:49](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L49)

---

### instance

▸ **instance**(`agreementId`, `params`): `Promise`<[`ConditionInstance`](../interfaces/ConditionInstance.md)<`Extra`\>\>

#### Parameters

| Name          | Type                                                                    |
| :------------ | :---------------------------------------------------------------------- |
| `agreementId` | `string`                                                                |
| `params`      | [`ConditionParameters`](../interfaces/ConditionParameters.md)<`Extra`\> |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/ConditionInstance.md)<`Extra`\>\>

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:174](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L174)

---

### instanceFromDDO

▸ **instanceFromDDO**(`agreementId`, `ctx`, `...args`): `Promise`<[`ConditionInstance`](../interfaces/ConditionInstance.md)<`Extra`\>\>

#### Parameters

| Name          | Type                                                                  |
| :------------ | :-------------------------------------------------------------------- |
| `agreementId` | `string`                                                              |
| `ctx`         | `Ctx`                                                                 |
| `...args`     | [`ConditionInstanceSmall`](../interfaces/ConditionInstanceSmall.md)[] |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/ConditionInstance.md)<`Extra`\>\>

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L142)

---

### params

▸ **params**(`...args`): [`ConditionParameters`](../interfaces/ConditionParameters.md)<`Extra`\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

[`ConditionParameters`](../interfaces/ConditionParameters.md)<`Extra`\>

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:122](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L122)

---

### paramsFromDDO

▸ `Abstract` **paramsFromDDO**(`ctx`, `...args`): `Promise`<[`ConditionParameters`](../interfaces/ConditionParameters.md)<`Extra`\>\>

#### Parameters

| Name      | Type                                                                  |
| :-------- | :-------------------------------------------------------------------- |
| `ctx`     | `Ctx`                                                                 |
| `...args` | [`ConditionInstanceSmall`](../interfaces/ConditionInstanceSmall.md)[] |

#### Returns

`Promise`<[`ConditionParameters`](../interfaces/ConditionParameters.md)<`Extra`\>\>

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:137](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L137)

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

[ConditionSmall](ConditionSmall.md).[send](ConditionSmall.md#send)

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

[ConditionSmall](ConditionSmall.md).[sendFrom](ConditionSmall.md#sendfrom)

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

[ConditionSmall](ConditionSmall.md).[setInstanceConfig](ConditionSmall.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### getInstance

▸ `Static` **getInstance**<`Ctx`, `Extra`\>(`config`, `conditionName`, `conditionsClass`, `optional?`): `Promise`<`any`\>

#### Type parameters

| Name    | Type                                                            |
| :------ | :-------------------------------------------------------------- |
| `Ctx`   | extends [`ConditionContext`](../interfaces/ConditionContext.md) |
| `Extra` | `Extra`                                                         |

#### Parameters

| Name              | Type                                                        | Default value |
| :---------------- | :---------------------------------------------------------- | :------------ |
| `config`          | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | `undefined`   |
| `conditionName`   | `string`                                                    | `undefined`   |
| `conditionsClass` | `any`                                                       | `undefined`   |
| `optional`        | `boolean`                                                   | `false`       |

#### Returns

`Promise`<`any`\>

#### Overrides

[ConditionSmall](ConditionSmall.md).[getInstance](ConditionSmall.md#getinstance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:111](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L111)

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

[ConditionSmall](ConditionSmall.md).[setInstanceConfig](ConditionSmall.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
