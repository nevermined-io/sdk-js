[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [conditions](../modules/conditions.md) / LockPaymentCondition

# Class: LockPaymentCondition

[conditions](../modules/conditions.md).LockPaymentCondition

## Hierarchy

- [`ConsumerCondition`](conditions.ConsumerCondition.md)<[`ConditionContext`](../interfaces/conditions.ConditionContext.md)\>

  ↳ **`LockPaymentCondition`**

## Table of contents

### Constructors

- [constructor](conditions.LockPaymentCondition.md#constructor)

### Properties

- [contract](conditions.LockPaymentCondition.md#contract)
- [contractName](conditions.LockPaymentCondition.md#contractname)
- [events](conditions.LockPaymentCondition.md#events)
- [version](conditions.LockPaymentCondition.md#version)

### Accessors

- [address](conditions.LockPaymentCondition.md#address)
- [artifactsFolder](conditions.LockPaymentCondition.md#artifactsfolder)
- [config](conditions.LockPaymentCondition.md#config)
- [instanceConfig](conditions.LockPaymentCondition.md#instanceconfig)
- [instantiableConfig](conditions.LockPaymentCondition.md#instantiableconfig)
- [logger](conditions.LockPaymentCondition.md#logger)
- [nevermined](conditions.LockPaymentCondition.md#nevermined)
- [web3](conditions.LockPaymentCondition.md#web3)

### Methods

- [abortByTimeOut](conditions.LockPaymentCondition.md#abortbytimeout)
- [addresses](conditions.LockPaymentCondition.md#addresses)
- [call](conditions.LockPaymentCondition.md#call)
- [checkExists](conditions.LockPaymentCondition.md#checkexists)
- [findSigner](conditions.LockPaymentCondition.md#findsigner)
- [fulfill](conditions.LockPaymentCondition.md#fulfill)
- [fulfillGateway](conditions.LockPaymentCondition.md#fulfillgateway)
- [fulfillInstance](conditions.LockPaymentCondition.md#fulfillinstance)
- [fulfillPlain](conditions.LockPaymentCondition.md#fulfillplain)
- [generateId](conditions.LockPaymentCondition.md#generateid)
- [generateIdHash](conditions.LockPaymentCondition.md#generateidhash)
- [generateIdWithSeed](conditions.LockPaymentCondition.md#generateidwithseed)
- [getAddress](conditions.LockPaymentCondition.md#getaddress)
- [getConditionFulfilledEvent](conditions.LockPaymentCondition.md#getconditionfulfilledevent)
- [getContract](conditions.LockPaymentCondition.md#getcontract)
- [getFromAddress](conditions.LockPaymentCondition.md#getfromaddress)
- [getInputsOfMethod](conditions.LockPaymentCondition.md#getinputsofmethod)
- [getSignatureOfMethod](conditions.LockPaymentCondition.md#getsignatureofmethod)
- [hashValues](conditions.LockPaymentCondition.md#hashvalues)
- [hashValuesPlain](conditions.LockPaymentCondition.md#hashvaluesplain)
- [init](conditions.LockPaymentCondition.md#init)
- [instance](conditions.LockPaymentCondition.md#instance)
- [instanceFromDDO](conditions.LockPaymentCondition.md#instancefromddo)
- [params](conditions.LockPaymentCondition.md#params)
- [paramsFromDDO](conditions.LockPaymentCondition.md#paramsfromddo)
- [send](conditions.LockPaymentCondition.md#send)
- [sendFrom](conditions.LockPaymentCondition.md#sendfrom)
- [setInstanceConfig](conditions.LockPaymentCondition.md#setinstanceconfig)
- [addressesStatic](conditions.LockPaymentCondition.md#addressesstatic)
- [findSignerStatic](conditions.LockPaymentCondition.md#findsignerstatic)
- [getInstance](conditions.LockPaymentCondition.md#getinstance)
- [setInstanceConfig](conditions.LockPaymentCondition.md#setinstanceconfig-1)

## Constructors

### constructor

• **new LockPaymentCondition**(`contractName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[constructor](conditions.ConsumerCondition.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L32)

## Properties

### contract

• **contract**: `Contract` = `null`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[contract](conditions.ConsumerCondition.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L24)

___

### contractName

• **contractName**: `string`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[contractName](conditions.ConsumerCondition.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L23)

___

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[events](conditions.ConsumerCondition.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L25)

___

### version

• **version**: `string`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[version](conditions.ConsumerCondition.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

ConsumerCondition.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L28)

___

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ConsumerCondition.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

ConsumerCondition.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

ConsumerCondition.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

ConsumerCondition.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

ConsumerCondition.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

ConsumerCondition.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

ConsumerCondition.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L63)

## Methods

### abortByTimeOut

▸ **abortByTimeOut**(`agreementId`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `from?` | [`Account`](Account.md) |
| `params?` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[abortByTimeOut](conditions.ConsumerCondition.md#abortbytimeout)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L97)

___

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[addresses](conditions.ConsumerCondition.md#addresses)

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L129)

___

### call

▸ **call**<`T`\>(`name`, `args`, `from?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `args` | `any`[] |
| `from?` | `string` |

#### Returns

`Promise`<`T`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[call](conditions.ConsumerCondition.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:244](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L244)

___

### checkExists

▸ `Protected` **checkExists**(`address`): `Promise`<`boolean`\>

Returns true of contract exists else it throws.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

true if the contract exists.

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[checkExists](conditions.ConsumerCondition.md#checkexists)

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L44)

___

### findSigner

▸ **findSigner**(`from`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[findSigner](conditions.ConsumerCondition.md#findsigner)

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

___

### fulfill

▸ **fulfill**(`agreementId`, `did`, `rewardAddress`, `tokenAddress`, `amounts`, `receivers`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `did` | `string` |
| `rewardAddress` | `string` |
| `tokenAddress` | `string` |
| `amounts` | `default`[] |
| `receivers` | `string`[] |
| `from?` | [`Account`](Account.md) |
| `params?` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Overrides

[ConsumerCondition](conditions.ConsumerCondition.md).[fulfill](conditions.ConsumerCondition.md#fulfill)

#### Defined in

[src/keeper/contracts/conditions/LockPaymentCondition.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/LockPaymentCondition.ts#L44)

___

### fulfillGateway

▸ **fulfillGateway**(`_cond`, `_additionalParams`, `_from?`, `_params?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_cond` | [`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\> |
| `_additionalParams` | `Record`<`string`, `unknown`\> |
| `_from?` | [`Account`](Account.md) |
| `_params?` | `TxParameters` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[fulfillGateway](conditions.ConsumerCondition.md#fulfillgateway)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:230](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L230)

___

### fulfillInstance

▸ **fulfillInstance**(`cond`, `additionalParams`, `from?`, `params?`, `method?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cond` | [`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\> | `undefined` |
| `additionalParams` | `Record`<`string`, `unknown`\> | `undefined` |
| `from?` | [`Account`](Account.md) | `undefined` |
| `params?` | `TxParameters` | `undefined` |
| `method` | [`ConditionMethod`](../modules/conditions.md#conditionmethod) | `'fulfill'` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[fulfillInstance](conditions.ConsumerCondition.md#fulfillinstance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L162)

___

### fulfillPlain

▸ **fulfillPlain**(`agreementId`, `args`, `from?`, `params?`, `method?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `agreementId` | `string` | `undefined` |
| `args` | `any`[] | `undefined` |
| `from?` | [`Account`](Account.md) | `undefined` |
| `params?` | `TxParameters` | `undefined` |
| `method` | [`ConditionMethod`](../modules/conditions.md#conditionmethod) | `'fulfill'` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[fulfillPlain](conditions.ConsumerCondition.md#fulfillplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:69](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L69)

___

### generateId

▸ **generateId**(`agreementId`, `valueHash`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `valueHash` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[generateId](conditions.ConsumerCondition.md#generateid)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:83](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L83)

___

### generateIdHash

▸ **generateIdHash**(`agreementId`, ...`values`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `...values` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[generateIdHash](conditions.ConsumerCondition.md#generateidhash)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:79](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L79)

___

### generateIdWithSeed

▸ **generateIdWithSeed**(`agreementId`, `valueHash`): `Promise`<[`string`, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `valueHash` | `string` |

#### Returns

`Promise`<[`string`, `string`]\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[generateIdWithSeed](conditions.ConsumerCondition.md#generateidwithseed)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L87)

___

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getAddress](conditions.ConsumerCondition.md#getaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:41](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L41)

___

### getConditionFulfilledEvent

▸ **getConditionFulfilledEvent**(`agreementId`): [`EventResult`](../modules/events.md#eventresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |

#### Returns

[`EventResult`](../modules/events.md#eventresult)

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getConditionFulfilledEvent](conditions.ConsumerCondition.md#getconditionfulfilledevent)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:101](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L101)

___

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getContract](conditions.ConsumerCondition.md#getcontract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:37](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L37)

___

### getFromAddress

▸ `Protected` **getFromAddress**(`from?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from?` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getFromAddress](conditions.ConsumerCondition.md#getfromaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:90](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L90)

___

### getInputsOfMethod

▸ **getInputsOfMethod**(`methodName`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `methodName` | `string` |

#### Returns

`any`[]

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getInputsOfMethod](conditions.ConsumerCondition.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:50](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L50)

___

### getSignatureOfMethod

▸ **getSignatureOfMethod**(`methodName`, `args?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `methodName` | `string` | `undefined` |
| `args` | `any`[] | `[]` |

#### Returns

`string`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[getSignatureOfMethod](conditions.ConsumerCondition.md#getsignatureofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:45](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L45)

___

### hashValues

▸ **hashValues**(...`args`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[hashValues](conditions.ConsumerCondition.md#hashvalues)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:141](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L141)

___

### hashValuesPlain

▸ **hashValuesPlain**(...`args`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[hashValuesPlain](conditions.ConsumerCondition.md#hashvaluesplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:145](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L145)

___

### init

▸ `Protected` **init**(`config`, `optional?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config` | `InstantiableConfig` | `undefined` |
| `optional` | `boolean` | `false` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[init](conditions.ConsumerCondition.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L55)

___

### instance

▸ **instance**(`agreementId`, `params`): `Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `params` | [`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\> |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[instance](conditions.ConsumerCondition.md#instance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:184](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L184)

___

### instanceFromDDO

▸ **instanceFromDDO**(`agreementId`, `ctx`, ...`args`): `Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `ctx` | [`ConditionContext`](../interfaces/conditions.ConditionContext.md) |
| `...args` | [`ConditionInstanceSmall`](../interfaces/conditions.ConditionInstanceSmall.md)[] |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[instanceFromDDO](conditions.ConsumerCondition.md#instancefromddo)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:154](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L154)

___

### params

▸ **params**(`did`, `rewardAddress`, `tokenAddress`, `amounts`, `receivers`): [`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `rewardAddress` | `string` |
| `tokenAddress` | `string` |
| `amounts` | `default`[] |
| `receivers` | `string`[] |

#### Returns

[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

#### Overrides

[ConsumerCondition](conditions.ConsumerCondition.md).[params](conditions.ConsumerCondition.md#params)

#### Defined in

[src/keeper/contracts/conditions/LockPaymentCondition.ts:15](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/LockPaymentCondition.ts#L15)

___

### paramsFromDDO

▸ **paramsFromDDO**(`__namedParameters`): `Promise`<[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ConditionContext`](../interfaces/conditions.ConditionContext.md) |

#### Returns

`Promise`<[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Overrides

[ConsumerCondition](conditions.ConsumerCondition.md).[paramsFromDDO](conditions.ConsumerCondition.md#paramsfromddo)

#### Defined in

[src/keeper/contracts/conditions/LockPaymentCondition.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/LockPaymentCondition.ts#L33)

___

### send

▸ **send**(`name`, `from`, `args`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `from` | `string` |
| `args` | `any`[] |
| `params` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[send](conditions.ConsumerCondition.md#send)

#### Defined in

[src/keeper/contracts/ContractBase.ts:117](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L117)

___

### sendFrom

▸ **sendFrom**(`name`, `args`, `from?`, `value?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `args` | `any`[] |
| `from?` | [`Account`](Account.md) |
| `value?` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[sendFrom](conditions.ConsumerCondition.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L97)

___

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[setInstanceConfig](conditions.ConsumerCondition.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L171)

___

### addressesStatic

▸ `Static` **addressesStatic**(`config`, `web3`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](Config.md) |
| `web3` | `JsonRpcProvider` |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[addressesStatic](conditions.ConsumerCondition.md#addressesstatic)

#### Defined in

[src/Instantiable.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L142)

___

### findSignerStatic

▸ `Static` **findSignerStatic**(`config`, `web3`, `from`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](Config.md) |
| `web3` | `JsonRpcProvider` |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[findSignerStatic](conditions.ConsumerCondition.md#findsignerstatic)

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

___

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`LockPaymentCondition`](conditions.LockPaymentCondition.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`Promise`<[`LockPaymentCondition`](conditions.LockPaymentCondition.md)\>

#### Overrides

[ConsumerCondition](conditions.ConsumerCondition.md).[getInstance](conditions.ConsumerCondition.md#getinstance)

#### Defined in

[src/keeper/contracts/conditions/LockPaymentCondition.ts:9](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/LockPaymentCondition.ts#L9)

___

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Instantiable`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `T` |
| `instantiableConfig` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

[ConsumerCondition](conditions.ConsumerCondition.md).[setInstanceConfig](conditions.ConsumerCondition.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
