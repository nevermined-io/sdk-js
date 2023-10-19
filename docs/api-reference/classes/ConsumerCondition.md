[@nevermined-io/sdk](../code-reference.md) / ConsumerCondition

# Class: ConsumerCondition<Ctx, Extra\>

## Type parameters

| Name    | Type                                                            |
| :------ | :-------------------------------------------------------------- |
| `Ctx`   | extends [`ConditionContext`](../interfaces/ConditionContext.md) |
| `Extra` | `Record`<`string`, `unknown`\>                                  |

## Hierarchy

- [`Condition`](Condition.md)<`Ctx`, `Extra`\>

  ↳ **`ConsumerCondition`**

  ↳↳ [`LockPaymentCondition`](LockPaymentCondition.md)

  ↳↳ [`NFTHolderCondition`](NFTHolderCondition.md)

  ↳↳ [`NFT721HolderCondition`](NFT721HolderCondition.md)

  ↳↳ [`NFTLockCondition`](NFTLockCondition.md)

## Table of contents

### Constructors

- [constructor](ConsumerCondition.md#constructor)

### Properties

- [address](ConsumerCondition.md#address)
- [contract](ConsumerCondition.md#contract)
- [contractName](ConsumerCondition.md#contractname)
- [events](ConsumerCondition.md#events)
- [version](ConsumerCondition.md#version)

### Accessors

- [artifactsFolder](ConsumerCondition.md#artifactsfolder)
- [circuitsFolder](ConsumerCondition.md#circuitsfolder)
- [config](ConsumerCondition.md#config)
- [instanceConfig](ConsumerCondition.md#instanceconfig)
- [instantiableConfig](ConsumerCondition.md#instantiableconfig)
- [logger](ConsumerCondition.md#logger)
- [nevermined](ConsumerCondition.md#nevermined)
- [web3](ConsumerCondition.md#web3)

### Methods

- [abortByTimeOut](ConsumerCondition.md#abortbytimeout)
- [call](ConsumerCondition.md#call)
- [fulfill](ConsumerCondition.md#fulfill)
- [fulfillInstance](ConsumerCondition.md#fulfillinstance)
- [fulfillPlain](ConsumerCondition.md#fulfillplain)
- [fulfillWithNode](ConsumerCondition.md#fulfillwithnode)
- [generateId](ConsumerCondition.md#generateid)
- [generateIdHash](ConsumerCondition.md#generateidhash)
- [generateIdWithSeed](ConsumerCondition.md#generateidwithseed)
- [getConditionFulfilledEvent](ConsumerCondition.md#getconditionfulfilledevent)
- [getFromAddress](ConsumerCondition.md#getfromaddress)
- [getInputsOfMethod](ConsumerCondition.md#getinputsofmethod)
- [getSignatureOfMethod](ConsumerCondition.md#getsignatureofmethod)
- [hashValues](ConsumerCondition.md#hashvalues)
- [hashValuesPlain](ConsumerCondition.md#hashvaluesplain)
- [init](ConsumerCondition.md#init)
- [instance](ConsumerCondition.md#instance)
- [instanceFromDDO](ConsumerCondition.md#instancefromddo)
- [params](ConsumerCondition.md#params)
- [paramsFromDDO](ConsumerCondition.md#paramsfromddo)
- [send](ConsumerCondition.md#send)
- [sendFrom](ConsumerCondition.md#sendfrom)
- [setInstanceConfig](ConsumerCondition.md#setinstanceconfig)
- [getInstance](ConsumerCondition.md#getinstance)
- [setInstanceConfig](ConsumerCondition.md#setinstanceconfig-1)

## Constructors

### constructor

• **new ConsumerCondition**<`Ctx`, `Extra`\>(`contractName`)

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

[Condition](Condition.md).[constructor](Condition.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L34)

## Properties

### address

• **address**: `string`

#### Inherited from

[Condition](Condition.md).[address](Condition.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[Condition](Condition.md).[contract](Condition.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[Condition](Condition.md).[contractName](Condition.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[Condition](Condition.md).[events](Condition.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[Condition](Condition.md).[version](Condition.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Condition.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Condition.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

Condition.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Condition.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Condition.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

Condition.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Condition.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

Condition.web3

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

[Condition](Condition.md).[abortByTimeOut](Condition.md#abortbytimeout)

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

[Condition](Condition.md).[call](Condition.md#call)

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

[Condition](Condition.md).[fulfill](Condition.md#fulfill)

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

#### Inherited from

[Condition](Condition.md).[fulfillInstance](Condition.md#fulfillinstance)

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

[Condition](Condition.md).[fulfillPlain](Condition.md#fulfillplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L63)

---

### fulfillWithNode

▸ **fulfillWithNode**(`_cond`, `_additionalParams`, `_from?`, `_txParams?`): `Promise`<`void`\>

#### Parameters

| Name                | Type                                                                |
| :------------------ | :------------------------------------------------------------------ |
| `_cond`             | [`ConditionInstance`](../interfaces/ConditionInstance.md)<`Extra`\> |
| `_additionalParams` | `Extra`                                                             |
| `_from?`            | [`Account`](Account.md)                                             |
| `_txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)                     |

#### Returns

`Promise`<`void`\>

#### Overrides

[Condition](Condition.md).[fulfillWithNode](Condition.md#fulfillwithnode)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:217](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/conditions/Condition.abstract.ts#L217)

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

[Condition](Condition.md).[generateId](Condition.md#generateid)

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

[Condition](Condition.md).[generateIdHash](Condition.md#generateidhash)

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

[Condition](Condition.md).[generateIdWithSeed](Condition.md#generateidwithseed)

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

[Condition](Condition.md).[getConditionFulfilledEvent](Condition.md#getconditionfulfilledevent)

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

[Condition](Condition.md).[getFromAddress](Condition.md#getfromaddress)

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

[Condition](Condition.md).[getInputsOfMethod](Condition.md#getinputsofmethod)

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

[Condition](Condition.md).[getSignatureOfMethod](Condition.md#getsignatureofmethod)

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

#### Inherited from

[Condition](Condition.md).[hashValues](Condition.md#hashvalues)

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

#### Inherited from

[Condition](Condition.md).[hashValuesPlain](Condition.md#hashvaluesplain)

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

[Condition](Condition.md).[init](Condition.md#init)

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

#### Inherited from

[Condition](Condition.md).[instance](Condition.md#instance)

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

#### Inherited from

[Condition](Condition.md).[instanceFromDDO](Condition.md#instancefromddo)

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

#### Inherited from

[Condition](Condition.md).[params](Condition.md#params)

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

#### Inherited from

[Condition](Condition.md).[paramsFromDDO](Condition.md#paramsfromddo)

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

[Condition](Condition.md).[send](Condition.md#send)

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

[Condition](Condition.md).[sendFrom](Condition.md#sendfrom)

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

[Condition](Condition.md).[setInstanceConfig](Condition.md#setinstanceconfig)

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

#### Inherited from

[Condition](Condition.md).[getInstance](Condition.md#getinstance)

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

[Condition](Condition.md).[setInstanceConfig](Condition.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
