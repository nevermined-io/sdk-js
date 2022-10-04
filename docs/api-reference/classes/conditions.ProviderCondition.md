[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [conditions](../modules/conditions.md) / ProviderCondition

# Class: ProviderCondition<Ctx, Extra\>

[conditions](../modules/conditions.md).ProviderCondition

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | extends [`ConditionContext`](../interfaces/conditions.ConditionContext.md) |
| `Extra` | `Record`<`string`, `unknown`\> |

## Hierarchy

- [`Condition`](Condition.md)<`Ctx`, `Extra`\>

  ↳ **`ProviderCondition`**

  ↳↳ [`AccessCondition`](conditions.AccessCondition.md)

  ↳↳ [`EscrowPaymentCondition`](conditions.EscrowPaymentCondition.md)

  ↳↳ [`ComputeExecutionCondition`](conditions.ComputeExecutionCondition.md)

  ↳↳ [`NFTAccessCondition`](conditions.NFTAccessCondition.md)

  ↳↳ [`TransferNFTCondition`](conditions.TransferNFTCondition.md)

  ↳↳ [`TransferNFT721Condition`](conditions.TransferNFT721Condition.md)

  ↳↳ [`TransferDIDOwnershipCondition`](conditions.TransferDIDOwnershipCondition.md)

  ↳↳ [`AaveBorrowCondition`](conditions.AaveBorrowCondition.md)

  ↳↳ [`AaveCollateralDepositCondition`](conditions.AaveCollateralDepositCondition.md)

  ↳↳ [`AaveCollateralWithdrawCondition`](conditions.AaveCollateralWithdrawCondition.md)

  ↳↳ [`AaveRepayCondition`](conditions.AaveRepayCondition.md)

  ↳↳ [`NFT721LockCondition`](conditions.NFT721LockCondition.md)

  ↳↳ [`DistributeNFTCollateralCondition`](conditions.DistributeNFTCollateralCondition.md)

## Table of contents

### Constructors

- [constructor](conditions.ProviderCondition.md#constructor)

### Properties

- [contract](conditions.ProviderCondition.md#contract)
- [contractName](conditions.ProviderCondition.md#contractname)
- [events](conditions.ProviderCondition.md#events)
- [version](conditions.ProviderCondition.md#version)

### Accessors

- [address](conditions.ProviderCondition.md#address)
- [artifactsFolder](conditions.ProviderCondition.md#artifactsfolder)
- [config](conditions.ProviderCondition.md#config)
- [instanceConfig](conditions.ProviderCondition.md#instanceconfig)
- [instantiableConfig](conditions.ProviderCondition.md#instantiableconfig)
- [logger](conditions.ProviderCondition.md#logger)
- [nevermined](conditions.ProviderCondition.md#nevermined)
- [web3](conditions.ProviderCondition.md#web3)

### Methods

- [abortByTimeOut](conditions.ProviderCondition.md#abortbytimeout)
- [addresses](conditions.ProviderCondition.md#addresses)
- [call](conditions.ProviderCondition.md#call)
- [checkExists](conditions.ProviderCondition.md#checkexists)
- [findSigner](conditions.ProviderCondition.md#findsigner)
- [fulfill](conditions.ProviderCondition.md#fulfill)
- [fulfillGateway](conditions.ProviderCondition.md#fulfillgateway)
- [fulfillInstance](conditions.ProviderCondition.md#fulfillinstance)
- [fulfillPlain](conditions.ProviderCondition.md#fulfillplain)
- [gatewayMethod](conditions.ProviderCondition.md#gatewaymethod)
- [generateId](conditions.ProviderCondition.md#generateid)
- [generateIdHash](conditions.ProviderCondition.md#generateidhash)
- [generateIdWithSeed](conditions.ProviderCondition.md#generateidwithseed)
- [getAddress](conditions.ProviderCondition.md#getaddress)
- [getConditionFulfilledEvent](conditions.ProviderCondition.md#getconditionfulfilledevent)
- [getContract](conditions.ProviderCondition.md#getcontract)
- [getFromAddress](conditions.ProviderCondition.md#getfromaddress)
- [getInputsOfMethod](conditions.ProviderCondition.md#getinputsofmethod)
- [getSignatureOfMethod](conditions.ProviderCondition.md#getsignatureofmethod)
- [hashValues](conditions.ProviderCondition.md#hashvalues)
- [hashValuesPlain](conditions.ProviderCondition.md#hashvaluesplain)
- [init](conditions.ProviderCondition.md#init)
- [instance](conditions.ProviderCondition.md#instance)
- [instanceFromDDO](conditions.ProviderCondition.md#instancefromddo)
- [params](conditions.ProviderCondition.md#params)
- [paramsFromDDO](conditions.ProviderCondition.md#paramsfromddo)
- [send](conditions.ProviderCondition.md#send)
- [sendFrom](conditions.ProviderCondition.md#sendfrom)
- [setInstanceConfig](conditions.ProviderCondition.md#setinstanceconfig)
- [addressesStatic](conditions.ProviderCondition.md#addressesstatic)
- [findSignerStatic](conditions.ProviderCondition.md#findsignerstatic)
- [getInstance](conditions.ProviderCondition.md#getinstance)
- [setInstanceConfig](conditions.ProviderCondition.md#setinstanceconfig-1)

## Constructors

### constructor

• **new ProviderCondition**<`Ctx`, `Extra`\>(`contractName`)

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

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L32)

## Properties

### contract

• **contract**: `Contract` = `null`

#### Inherited from

[Condition](Condition.md).[contract](Condition.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L24)

___

### contractName

• **contractName**: `string`

#### Inherited from

[Condition](Condition.md).[contractName](Condition.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L23)

___

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

[Condition](Condition.md).[events](Condition.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L25)

___

### version

• **version**: `string`

#### Inherited from

[Condition](Condition.md).[version](Condition.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

Condition.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L28)

___

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Condition.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

Condition.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Condition.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Condition.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

Condition.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Condition.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

Condition.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L63)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:97](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L97)

___

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[Condition](Condition.md).[addresses](Condition.md#addresses)

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L129)

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

[src/keeper/contracts/ContractBase.ts:244](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L244)

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

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L44)

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

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L105)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:67](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L67)

___

### fulfillGateway

▸ **fulfillGateway**(`cond`, `additionalParams`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cond` | [`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Extra`\> |
| `additionalParams` | `Extra` |
| `from?` | [`Account`](Account.md) |
| `params?` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Overrides

[Condition](Condition.md).[fulfillGateway](Condition.md#fulfillgateway)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:204](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L204)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L162)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:69](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L69)

___

### gatewayMethod

▸ **gatewayMethod**(): [`ConditionMethod`](../modules/conditions.md#conditionmethod)

#### Returns

[`ConditionMethod`](../modules/conditions.md#conditionmethod)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:221](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L221)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:83](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L83)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:79](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L79)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L87)

___

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

[Condition](Condition.md).[getAddress](Condition.md#getaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:41](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L41)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:101](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L101)

___

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

[Condition](Condition.md).[getContract](Condition.md#getcontract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:37](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L37)

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

[src/keeper/contracts/ContractBase.ts:90](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L90)

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

[src/keeper/contracts/ContractBase.ts:50](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L50)

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

[src/keeper/contracts/ContractBase.ts:45](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L45)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:141](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L141)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:145](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L145)

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

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L55)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:184](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L184)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:154](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L154)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:134](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L134)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:149](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L149)

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

[src/keeper/contracts/ContractBase.ts:117](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L117)

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

[src/keeper/contracts/ContractBase.ts:97](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/ContractBase.ts#L97)

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

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L171)

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

[src/Instantiable.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L142)

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

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L115)

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

[src/keeper/contracts/conditions/Condition.abstract.ts:121](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/keeper/contracts/conditions/Condition.abstract.ts#L121)

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

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/b9e384c/src/Instantiable.abstract.ts#L162)
