[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [conditions](../modules/conditions.md) / ConsumerCondition

# Class: ConsumerCondition<Ctx, Extra\>

[conditions](../modules/conditions.md).ConsumerCondition

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | extends [`ConditionContext`](../interfaces/conditions.ConditionContext.md) |
| `Extra` | `Record`<`string`, `unknown`\> |

## Hierarchy

- [`Condition`](Condition.md)<`Ctx`, `Extra`\>

  ↳ **`ConsumerCondition`**

  ↳↳ [`LockPaymentCondition`](conditions.LockPaymentCondition.md)

  ↳↳ [`NFTHolderCondition`](conditions.NFTHolderCondition.md)

  ↳↳ [`NFT721HolderCondition`](conditions.NFT721HolderCondition.md)

  ↳↳ [`NFTLockCondition`](conditions.NFTLockCondition.md)

## Table of contents

### Constructors

- [constructor](conditions.ConsumerCondition.md#constructor)

### Properties

- [contract](conditions.ConsumerCondition.md#contract)
- [contractName](conditions.ConsumerCondition.md#contractname)
- [events](conditions.ConsumerCondition.md#events)
- [version](conditions.ConsumerCondition.md#version)

### Accessors

- [address](conditions.ConsumerCondition.md#address)
- [artifactsFolder](conditions.ConsumerCondition.md#artifactsfolder)
- [config](conditions.ConsumerCondition.md#config)
- [instanceConfig](conditions.ConsumerCondition.md#instanceconfig)
- [instantiableConfig](conditions.ConsumerCondition.md#instantiableconfig)
- [logger](conditions.ConsumerCondition.md#logger)
- [nevermined](conditions.ConsumerCondition.md#nevermined)
- [web3](conditions.ConsumerCondition.md#web3)

### Methods

- [abortByTimeOut](conditions.ConsumerCondition.md#abortbytimeout)
- [addresses](conditions.ConsumerCondition.md#addresses)
- [call](conditions.ConsumerCondition.md#call)
- [checkExists](conditions.ConsumerCondition.md#checkexists)
- [findSigner](conditions.ConsumerCondition.md#findsigner)
- [fulfill](conditions.ConsumerCondition.md#fulfill)
- [fulfillGateway](conditions.ConsumerCondition.md#fulfillgateway)
- [fulfillInstance](conditions.ConsumerCondition.md#fulfillinstance)
- [fulfillPlain](conditions.ConsumerCondition.md#fulfillplain)
- [generateId](conditions.ConsumerCondition.md#generateid)
- [generateIdHash](conditions.ConsumerCondition.md#generateidhash)
- [generateIdWithSeed](conditions.ConsumerCondition.md#generateidwithseed)
- [getAddress](conditions.ConsumerCondition.md#getaddress)
- [getConditionFulfilledEvent](conditions.ConsumerCondition.md#getconditionfulfilledevent)
- [getContract](conditions.ConsumerCondition.md#getcontract)
- [getFromAddress](conditions.ConsumerCondition.md#getfromaddress)
- [getInputsOfMethod](conditions.ConsumerCondition.md#getinputsofmethod)
- [getSignatureOfMethod](conditions.ConsumerCondition.md#getsignatureofmethod)
- [hashValues](conditions.ConsumerCondition.md#hashvalues)
- [hashValuesPlain](conditions.ConsumerCondition.md#hashvaluesplain)
- [init](conditions.ConsumerCondition.md#init)
- [instance](conditions.ConsumerCondition.md#instance)
- [instanceFromDDO](conditions.ConsumerCondition.md#instancefromddo)
- [params](conditions.ConsumerCondition.md#params)
- [paramsFromDDO](conditions.ConsumerCondition.md#paramsfromddo)
- [send](conditions.ConsumerCondition.md#send)
- [sendFrom](conditions.ConsumerCondition.md#sendfrom)
- [setInstanceConfig](conditions.ConsumerCondition.md#setinstanceconfig)
- [addressesStatic](conditions.ConsumerCondition.md#addressesstatic)
- [findSignerStatic](conditions.ConsumerCondition.md#findsignerstatic)
- [getInstance](conditions.ConsumerCondition.md#getinstance)
- [setInstanceConfig](conditions.ConsumerCondition.md#setinstanceconfig-1)

## Constructors

### constructor

• **new ConsumerCondition**<`Ctx`, `Extra`\>(`contractName`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | extends [`ConditionContext`](../interfaces/conditions.ConditionContext.md) |
| `Extra` | `Record`<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |

#### Inherited from

[Condition](Condition.md).[constructor](Condition.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L32)

## Properties

### contract

• **contract**: `Contract` = `null`

#### Inherited from

[Condition](Condition.md).[contract](Condition.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L24)

___

### contractName

• **contractName**: `string`

#### Inherited from

[Condition](Condition.md).[contractName](Condition.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L23)

___

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

[Condition](Condition.md).[events](Condition.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L25)

___

### version

• **version**: `string`

#### Inherited from

[Condition](Condition.md).[version](Condition.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

Condition.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L28)

___

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Condition.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

Condition.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Condition.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Condition.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

Condition.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Condition.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

Condition.web3

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

[Condition](Condition.md).[abortByTimeOut](Condition.md#abortbytimeout)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L97)

___

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[Condition](Condition.md).[addresses](Condition.md#addresses)

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

[Condition](Condition.md).[call](Condition.md#call)

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

[Condition](Condition.md).[checkExists](Condition.md#checkexists)

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

[Condition](Condition.md).[findSigner](Condition.md#findsigner)

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

___

### fulfill

▸ `Abstract` **fulfill**(`agreementId`, ...`args`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `...args` | `any`[] |

#### Returns

`any`

#### Inherited from

[Condition](Condition.md).[fulfill](Condition.md#fulfill)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:67](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L67)

___

### fulfillGateway

▸ **fulfillGateway**(`_cond`, `_additionalParams`, `_from?`, `_params?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_cond` | [`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Extra`\> |
| `_additionalParams` | `Extra` |
| `_from?` | [`Account`](Account.md) |
| `_params?` | `TxParameters` |

#### Returns

`Promise`<`void`\>

#### Overrides

[Condition](Condition.md).[fulfillGateway](Condition.md#fulfillgateway)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:230](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L230)

___

### fulfillInstance

▸ **fulfillInstance**(`cond`, `additionalParams`, `from?`, `params?`, `method?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cond` | [`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Extra`\> | `undefined` |
| `additionalParams` | `Extra` | `undefined` |
| `from?` | [`Account`](Account.md) | `undefined` |
| `params?` | `TxParameters` | `undefined` |
| `method` | [`ConditionMethod`](../modules/conditions.md#conditionmethod) | `'fulfill'` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[Condition](Condition.md).[fulfillInstance](Condition.md#fulfillinstance)

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

[Condition](Condition.md).[fulfillPlain](Condition.md#fulfillplain)

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

[Condition](Condition.md).[generateId](Condition.md#generateid)

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

[Condition](Condition.md).[generateIdHash](Condition.md#generateidhash)

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

[Condition](Condition.md).[generateIdWithSeed](Condition.md#generateidwithseed)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L87)

___

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

[Condition](Condition.md).[getAddress](Condition.md#getaddress)

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

[Condition](Condition.md).[getConditionFulfilledEvent](Condition.md#getconditionfulfilledevent)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:101](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L101)

___

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

[Condition](Condition.md).[getContract](Condition.md#getcontract)

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

[Condition](Condition.md).[getFromAddress](Condition.md#getfromaddress)

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

[Condition](Condition.md).[getInputsOfMethod](Condition.md#getinputsofmethod)

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

[Condition](Condition.md).[getSignatureOfMethod](Condition.md#getsignatureofmethod)

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

[Condition](Condition.md).[hashValues](Condition.md#hashvalues)

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

[Condition](Condition.md).[hashValuesPlain](Condition.md#hashvaluesplain)

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

[Condition](Condition.md).[init](Condition.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L55)

___

### instance

▸ **instance**(`agreementId`, `params`): `Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Extra`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `params` | [`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Extra`\> |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Extra`\>\>

#### Inherited from

[Condition](Condition.md).[instance](Condition.md#instance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:184](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L184)

___

### instanceFromDDO

▸ **instanceFromDDO**(`agreementId`, `ctx`, ...`args`): `Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Extra`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `ctx` | `Ctx` |
| `...args` | [`ConditionInstanceSmall`](../interfaces/conditions.ConditionInstanceSmall.md)[] |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Extra`\>\>

#### Inherited from

[Condition](Condition.md).[instanceFromDDO](Condition.md#instancefromddo)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:154](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L154)

___

### params

▸ **params**(...`args`): [`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Extra`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Extra`\>

#### Inherited from

[Condition](Condition.md).[params](Condition.md#params)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:134](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L134)

___

### paramsFromDDO

▸ `Abstract` **paramsFromDDO**(`ctx`, ...`args`): `Promise`<[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Extra`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `Ctx` |
| `...args` | [`ConditionInstanceSmall`](../interfaces/conditions.ConditionInstanceSmall.md)[] |

#### Returns

`Promise`<[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Extra`\>\>

#### Inherited from

[Condition](Condition.md).[paramsFromDDO](Condition.md#paramsfromddo)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:149](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L149)

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

[Condition](Condition.md).[send](Condition.md#send)

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

[Condition](Condition.md).[sendFrom](Condition.md#sendfrom)

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

[Condition](Condition.md).[setInstanceConfig](Condition.md#setinstanceconfig)

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

[Condition](Condition.md).[addressesStatic](Condition.md#addressesstatic)

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

[Condition](Condition.md).[findSignerStatic](Condition.md#findsignerstatic)

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

___

### getInstance

▸ `Static` **getInstance**<`Ctx`, `Extra`\>(`config`, `conditionName`, `conditionsClass`, `optional?`): `Promise`<`any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | extends [`ConditionContext`](../interfaces/conditions.ConditionContext.md) |
| `Extra` | `Extra` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config` | `InstantiableConfig` | `undefined` |
| `conditionName` | `string` | `undefined` |
| `conditionsClass` | `any` | `undefined` |
| `optional` | `boolean` | `false` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Condition](Condition.md).[getInstance](Condition.md#getinstance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:121](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L121)

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

[Condition](Condition.md).[setInstanceConfig](Condition.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
