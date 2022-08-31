[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [conditions](../modules/conditions.md) / TransferDIDOwnershipCondition

# Class: TransferDIDOwnershipCondition

[conditions](../modules/conditions.md).TransferDIDOwnershipCondition

Condition allowing to transfer the ownership between the original owner and a receiver.

## Hierarchy

- [`Condition`](Condition.md)<`AccessConditionContext`\>

  ↳ **`TransferDIDOwnershipCondition`**

## Table of contents

### Constructors

- [constructor](conditions.TransferDIDOwnershipCondition.md#constructor)

### Properties

- [contract](conditions.TransferDIDOwnershipCondition.md#contract)
- [contractName](conditions.TransferDIDOwnershipCondition.md#contractname)
- [events](conditions.TransferDIDOwnershipCondition.md#events)
- [version](conditions.TransferDIDOwnershipCondition.md#version)

### Accessors

- [address](conditions.TransferDIDOwnershipCondition.md#address)
- [artifactsFolder](conditions.TransferDIDOwnershipCondition.md#artifactsfolder)
- [config](conditions.TransferDIDOwnershipCondition.md#config)
- [instanceConfig](conditions.TransferDIDOwnershipCondition.md#instanceconfig)
- [instantiableConfig](conditions.TransferDIDOwnershipCondition.md#instantiableconfig)
- [logger](conditions.TransferDIDOwnershipCondition.md#logger)
- [nevermined](conditions.TransferDIDOwnershipCondition.md#nevermined)
- [web3](conditions.TransferDIDOwnershipCondition.md#web3)

### Methods

- [abortByTimeOut](conditions.TransferDIDOwnershipCondition.md#abortbytimeout)
- [addresses](conditions.TransferDIDOwnershipCondition.md#addresses)
- [call](conditions.TransferDIDOwnershipCondition.md#call)
- [checkExists](conditions.TransferDIDOwnershipCondition.md#checkexists)
- [findSigner](conditions.TransferDIDOwnershipCondition.md#findsigner)
- [fulfill](conditions.TransferDIDOwnershipCondition.md#fulfill)
- [fulfillInstance](conditions.TransferDIDOwnershipCondition.md#fulfillinstance)
- [fulfillPlain](conditions.TransferDIDOwnershipCondition.md#fulfillplain)
- [generateId](conditions.TransferDIDOwnershipCondition.md#generateid)
- [generateIdHash](conditions.TransferDIDOwnershipCondition.md#generateidhash)
- [generateIdWithSeed](conditions.TransferDIDOwnershipCondition.md#generateidwithseed)
- [getAddress](conditions.TransferDIDOwnershipCondition.md#getaddress)
- [getConditionFulfilledEvent](conditions.TransferDIDOwnershipCondition.md#getconditionfulfilledevent)
- [getContract](conditions.TransferDIDOwnershipCondition.md#getcontract)
- [getFromAddress](conditions.TransferDIDOwnershipCondition.md#getfromaddress)
- [getInputsOfMethod](conditions.TransferDIDOwnershipCondition.md#getinputsofmethod)
- [getSignatureOfMethod](conditions.TransferDIDOwnershipCondition.md#getsignatureofmethod)
- [hashValues](conditions.TransferDIDOwnershipCondition.md#hashvalues)
- [hashValuesPlain](conditions.TransferDIDOwnershipCondition.md#hashvaluesplain)
- [init](conditions.TransferDIDOwnershipCondition.md#init)
- [instance](conditions.TransferDIDOwnershipCondition.md#instance)
- [instanceFromDDO](conditions.TransferDIDOwnershipCondition.md#instancefromddo)
- [params](conditions.TransferDIDOwnershipCondition.md#params)
- [paramsFromDDO](conditions.TransferDIDOwnershipCondition.md#paramsfromddo)
- [send](conditions.TransferDIDOwnershipCondition.md#send)
- [sendFrom](conditions.TransferDIDOwnershipCondition.md#sendfrom)
- [setInstanceConfig](conditions.TransferDIDOwnershipCondition.md#setinstanceconfig)
- [addressesStatic](conditions.TransferDIDOwnershipCondition.md#addressesstatic)
- [findSignerStatic](conditions.TransferDIDOwnershipCondition.md#findsignerstatic)
- [getInstance](conditions.TransferDIDOwnershipCondition.md#getinstance)
- [setInstanceConfig](conditions.TransferDIDOwnershipCondition.md#setinstanceconfig-1)

## Constructors

### constructor

• **new TransferDIDOwnershipCondition**(`contractName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |

#### Inherited from

[Condition](Condition.md).[constructor](Condition.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L32)

## Properties

### contract

• **contract**: `Contract` = `null`

#### Inherited from

[Condition](Condition.md).[contract](Condition.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L24)

___

### contractName

• **contractName**: `string`

#### Inherited from

[Condition](Condition.md).[contractName](Condition.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L23)

___

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

[Condition](Condition.md).[events](Condition.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L25)

___

### version

• **version**: `string`

#### Inherited from

[Condition](Condition.md).[version](Condition.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

Condition.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L28)

___

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Condition.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

Condition.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Condition.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Condition.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

Condition.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Condition.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

Condition.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L63)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L99)

___

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[Condition](Condition.md).[addresses](Condition.md#addresses)

#### Defined in

[src/Instantiable.abstract.ts:131](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L131)

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

[src/keeper/contracts/ContractBase.ts:244](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L244)

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

Contract exists.

#### Inherited from

[Condition](Condition.md).[checkExists](Condition.md#checkexists)

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L44)

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

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L105)

___

### fulfill

▸ **fulfill**(`agreementId`, `did`, `receiver`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

Fulfill the transfer DID ownership condition.
 Only DID owner or DID provider can call this method.
 Fulfill method transfer full ownership permissions to the receiver address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementId` | `string` | Agreement identifier. |
| `did` | `string` | The Decentralized Identifier of the asset. |
| `receiver` | `string` | The address of the granted user. |
| `from?` | [`Account`](Account.md) |  |
| `params?` | `TxParameters` | - |

#### Returns

`Promise`<`ContractReceipt`\>

Condition state.

#### Overrides

[Condition](Condition.md).[fulfill](Condition.md#fulfill)

#### Defined in

[src/keeper/contracts/conditions/TransferDIDOwnershipCondition.ts:50](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/TransferDIDOwnershipCondition.ts#L50)

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
| `method` | `string` | `'fulfill'` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[Condition](Condition.md).[fulfillInstance](Condition.md#fulfillinstance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:164](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L164)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:71](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L71)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:85](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L85)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L81)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:89](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L89)

___

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

[Condition](Condition.md).[getAddress](Condition.md#getaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:41](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L41)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:103](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L103)

___

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

[Condition](Condition.md).[getContract](Condition.md#getcontract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:37](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L37)

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

[src/keeper/contracts/ContractBase.ts:90](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L90)

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

[src/keeper/contracts/ContractBase.ts:50](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L50)

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

[src/keeper/contracts/ContractBase.ts:45](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L45)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:143](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L143)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:147](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L147)

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

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L55)

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

[Condition](Condition.md).[instance](Condition.md#instance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:179](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L179)

___

### instanceFromDDO

▸ **instanceFromDDO**(`agreementId`, `ctx`, ...`args`): `Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `ctx` | `AccessConditionContext` |
| `...args` | [`ConditionInstanceSmall`](../interfaces/conditions.ConditionInstanceSmall.md)[] |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Inherited from

[Condition](Condition.md).[instanceFromDDO](Condition.md#instancefromddo)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:156](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/Condition.abstract.ts#L156)

___

### params

▸ **params**(`did`, `receiver`): [`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

Generates the hash of the condition inputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The Decentralized Identifier of the asset. |
| `receiver` | `string` | Address of the granted user or the DID provider. |

#### Returns

[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

Hash of all the values.

#### Overrides

[Condition](Condition.md).[params](Condition.md#params)

#### Defined in

[src/keeper/contracts/conditions/TransferDIDOwnershipCondition.ts:31](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/TransferDIDOwnershipCondition.ts#L31)

___

### paramsFromDDO

▸ **paramsFromDDO**(`__namedParameters`): `Promise`<[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `AccessConditionContext` |

#### Returns

`Promise`<[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Overrides

[Condition](Condition.md).[paramsFromDDO](Condition.md#paramsfromddo)

#### Defined in

[src/keeper/contracts/conditions/TransferDIDOwnershipCondition.ts:35](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/TransferDIDOwnershipCondition.ts#L35)

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

[src/keeper/contracts/ContractBase.ts:117](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L117)

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

[src/keeper/contracts/ContractBase.ts:97](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L97)

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

[src/Instantiable.abstract.ts:176](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L176)

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

[src/Instantiable.abstract.ts:144](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L144)

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

[src/Instantiable.abstract.ts:116](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L116)

___

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`TransferDIDOwnershipCondition`](conditions.TransferDIDOwnershipCondition.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`Promise`<[`TransferDIDOwnershipCondition`](conditions.TransferDIDOwnershipCondition.md)\>

#### Overrides

[Condition](Condition.md).[getInstance](Condition.md#getinstance)

#### Defined in

[src/keeper/contracts/conditions/TransferDIDOwnershipCondition.ts:15](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/conditions/TransferDIDOwnershipCondition.ts#L15)

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

[src/Instantiable.abstract.ts:167](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L167)
