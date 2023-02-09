[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [conditions](../modules/conditions.md) / NFTAccessCondition

# Class: NFTAccessCondition

[conditions](../modules/conditions.md).NFTAccessCondition

## Hierarchy

- [`ProviderCondition`](conditions.ProviderCondition.md)<`NFTAccessConditionContext`\>

  ↳ **`NFTAccessCondition`**

## Table of contents

### Constructors

- [constructor](conditions.NFTAccessCondition.md#constructor)

### Properties

- [contract](conditions.NFTAccessCondition.md#contract)
- [contractName](conditions.NFTAccessCondition.md#contractname)
- [events](conditions.NFTAccessCondition.md#events)
- [version](conditions.NFTAccessCondition.md#version)

### Accessors

- [address](conditions.NFTAccessCondition.md#address)
- [artifactsFolder](conditions.NFTAccessCondition.md#artifactsfolder)
- [config](conditions.NFTAccessCondition.md#config)
- [instanceConfig](conditions.NFTAccessCondition.md#instanceconfig)
- [instantiableConfig](conditions.NFTAccessCondition.md#instantiableconfig)
- [logger](conditions.NFTAccessCondition.md#logger)
- [nevermined](conditions.NFTAccessCondition.md#nevermined)
- [web3](conditions.NFTAccessCondition.md#web3)

### Methods

- [abortByTimeOut](conditions.NFTAccessCondition.md#abortbytimeout)
- [addresses](conditions.NFTAccessCondition.md#addresses)
- [call](conditions.NFTAccessCondition.md#call)
- [checkExists](conditions.NFTAccessCondition.md#checkexists)
- [checkPermissions](conditions.NFTAccessCondition.md#checkpermissions)
- [findSigner](conditions.NFTAccessCondition.md#findsigner)
- [fulfill](conditions.NFTAccessCondition.md#fulfill)
- [fulfillGateway](conditions.NFTAccessCondition.md#fulfillgateway)
- [fulfillInstance](conditions.NFTAccessCondition.md#fulfillinstance)
- [fulfillPlain](conditions.NFTAccessCondition.md#fulfillplain)
- [gatewayMethod](conditions.NFTAccessCondition.md#gatewaymethod)
- [generateId](conditions.NFTAccessCondition.md#generateid)
- [generateIdHash](conditions.NFTAccessCondition.md#generateidhash)
- [generateIdWithSeed](conditions.NFTAccessCondition.md#generateidwithseed)
- [getAddress](conditions.NFTAccessCondition.md#getaddress)
- [getConditionFulfilledEvent](conditions.NFTAccessCondition.md#getconditionfulfilledevent)
- [getContract](conditions.NFTAccessCondition.md#getcontract)
- [getFromAddress](conditions.NFTAccessCondition.md#getfromaddress)
- [getInputsOfMethod](conditions.NFTAccessCondition.md#getinputsofmethod)
- [getSignatureOfMethod](conditions.NFTAccessCondition.md#getsignatureofmethod)
- [hashValues](conditions.NFTAccessCondition.md#hashvalues)
- [hashValuesPlain](conditions.NFTAccessCondition.md#hashvaluesplain)
- [init](conditions.NFTAccessCondition.md#init)
- [instance](conditions.NFTAccessCondition.md#instance)
- [instanceFromDDO](conditions.NFTAccessCondition.md#instancefromddo)
- [params](conditions.NFTAccessCondition.md#params)
- [paramsFromDDO](conditions.NFTAccessCondition.md#paramsfromddo)
- [send](conditions.NFTAccessCondition.md#send)
- [sendFrom](conditions.NFTAccessCondition.md#sendfrom)
- [setInstanceConfig](conditions.NFTAccessCondition.md#setinstanceconfig)
- [addressesStatic](conditions.NFTAccessCondition.md#addressesstatic)
- [findSignerStatic](conditions.NFTAccessCondition.md#findsignerstatic)
- [getInstance](conditions.NFTAccessCondition.md#getinstance)
- [setInstanceConfig](conditions.NFTAccessCondition.md#setinstanceconfig-1)

## Constructors

### constructor

• **new NFTAccessCondition**(`contractName`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[constructor](conditions.ProviderCondition.md#constructor)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L32)

## Properties

### contract

• **contract**: `Contract` = `null`

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[contract](conditions.ProviderCondition.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L24)

---

### contractName

• **contractName**: `string`

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[contractName](conditions.ProviderCondition.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L23)

---

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[events](conditions.ProviderCondition.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L25)

---

### version

• **version**: `string`

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[version](conditions.ProviderCondition.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

ProviderCondition.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L28)

---

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ProviderCondition.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

---

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

ProviderCondition.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

ProviderCondition.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

ProviderCondition.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

---

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

ProviderCondition.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

ProviderCondition.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

---

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

ProviderCondition.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L63)

## Methods

### abortByTimeOut

▸ **abortByTimeOut**(`agreementId`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name          | Type                    |
| :------------ | :---------------------- |
| `agreementId` | `string`                |
| `from?`       | [`Account`](Account.md) |
| `params?`     | `TxParameters`          |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[abortByTimeOut](conditions.ProviderCondition.md#abortbytimeout)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L97)

---

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[addresses](conditions.ProviderCondition.md#addresses)

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L129)

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

[ProviderCondition](conditions.ProviderCondition.md).[call](conditions.ProviderCondition.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:244](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L244)

---

### checkExists

▸ `Protected` **checkExists**(`address`): `Promise`<`boolean`\>

Returns true of contract exists else it throws.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

true if the contract exists.

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[checkExists](conditions.ProviderCondition.md#checkexists)

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L44)

---

### checkPermissions

▸ **checkPermissions**(`grantee`, `did`, `from?`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type                    |
| :-------- | :---------------------- |
| `grantee` | `string`                |
| `did`     | `string`                |
| `from?`   | [`Account`](Account.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFTAccessCondition.ts:41](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/NFTs/NFTAccessCondition.ts#L41)

---

### findSigner

▸ **findSigner**(`from`): `Promise`<`Signer`\>

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[findSigner](conditions.ProviderCondition.md#findsigner)

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

---

### fulfill

▸ **fulfill**(`agreementId`, `did`, `grantee`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name          | Type                    |
| :------------ | :---------------------- |
| `agreementId` | `string`                |
| `did`         | `string`                |
| `grantee`     | `string`                |
| `from?`       | [`Account`](Account.md) |
| `params?`     | `TxParameters`          |

#### Returns

`Promise`<`ContractReceipt`\>

#### Overrides

[ProviderCondition](conditions.ProviderCondition.md).[fulfill](conditions.ProviderCondition.md#fulfill)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFTAccessCondition.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/NFTs/NFTAccessCondition.ts#L26)

---

### fulfillGateway

▸ **fulfillGateway**(`cond`, `additionalParams`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name               | Type                                                                                                  |
| :----------------- | :---------------------------------------------------------------------------------------------------- |
| `cond`             | [`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\> |
| `additionalParams` | `Record`<`string`, `unknown`\>                                                                        |
| `from?`            | [`Account`](Account.md)                                                                               |
| `params?`          | `TxParameters`                                                                                        |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[fulfillGateway](conditions.ProviderCondition.md#fulfillgateway)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:204](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L204)

---

### fulfillInstance

▸ **fulfillInstance**(`cond`, `additionalParams`, `from?`, `params?`, `method?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name               | Type                                                                                                  | Default value |
| :----------------- | :---------------------------------------------------------------------------------------------------- | :------------ |
| `cond`             | [`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\> | `undefined`   |
| `additionalParams` | `Record`<`string`, `unknown`\>                                                                        | `undefined`   |
| `from?`            | [`Account`](Account.md)                                                                               | `undefined`   |
| `params?`          | `TxParameters`                                                                                        | `undefined`   |
| `method`           | [`ConditionMethod`](../modules/conditions.md#conditionmethod)                                         | `'fulfill'`   |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[fulfillInstance](conditions.ProviderCondition.md#fulfillinstance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L162)

---

### fulfillPlain

▸ **fulfillPlain**(`agreementId`, `args`, `from?`, `params?`, `method?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name          | Type                                                          | Default value |
| :------------ | :------------------------------------------------------------ | :------------ |
| `agreementId` | `string`                                                      | `undefined`   |
| `args`        | `any`[]                                                       | `undefined`   |
| `from?`       | [`Account`](Account.md)                                       | `undefined`   |
| `params?`     | `TxParameters`                                                | `undefined`   |
| `method`      | [`ConditionMethod`](../modules/conditions.md#conditionmethod) | `'fulfill'`   |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[fulfillPlain](conditions.ProviderCondition.md#fulfillplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:69](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L69)

---

### gatewayMethod

▸ **gatewayMethod**(): [`ConditionMethod`](../modules/conditions.md#conditionmethod)

#### Returns

[`ConditionMethod`](../modules/conditions.md#conditionmethod)

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[gatewayMethod](conditions.ProviderCondition.md#gatewaymethod)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:221](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L221)

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

[ProviderCondition](conditions.ProviderCondition.md).[generateId](conditions.ProviderCondition.md#generateid)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:83](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L83)

---

### generateIdHash

▸ **generateIdHash**(`agreementId`, ...`values`): `Promise`<`string`\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |
| `...values`   | `any`[]  |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[generateIdHash](conditions.ProviderCondition.md#generateidhash)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:79](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L79)

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

[ProviderCondition](conditions.ProviderCondition.md).[generateIdWithSeed](conditions.ProviderCondition.md#generateidwithseed)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L87)

---

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[getAddress](conditions.ProviderCondition.md#getaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:41](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L41)

---

### getConditionFulfilledEvent

▸ **getConditionFulfilledEvent**(`agreementId`): [`EventResult`](../modules/events.md#eventresult)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |

#### Returns

[`EventResult`](../modules/events.md#eventresult)

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[getConditionFulfilledEvent](conditions.ProviderCondition.md#getconditionfulfilledevent)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:101](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L101)

---

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[getContract](conditions.ProviderCondition.md#getcontract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:37](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L37)

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

[ProviderCondition](conditions.ProviderCondition.md).[getFromAddress](conditions.ProviderCondition.md#getfromaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:90](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L90)

---

### getInputsOfMethod

▸ **getInputsOfMethod**(`methodName`): `any`[]

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `methodName` | `string` |

#### Returns

`any`[]

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[getInputsOfMethod](conditions.ProviderCondition.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:50](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L50)

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

[ProviderCondition](conditions.ProviderCondition.md).[getSignatureOfMethod](conditions.ProviderCondition.md#getsignatureofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:45](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L45)

---

### hashValues

▸ **hashValues**(...`args`): `Promise`<`string`\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[hashValues](conditions.ProviderCondition.md#hashvalues)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:141](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L141)

---

### hashValuesPlain

▸ **hashValuesPlain**(...`args`): `Promise`<`string`\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`string`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[hashValuesPlain](conditions.ProviderCondition.md#hashvaluesplain)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:145](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L145)

---

### init

▸ `Protected` **init**(`config`, `optional?`): `Promise`<`void`\>

#### Parameters

| Name       | Type                 | Default value |
| :--------- | :------------------- | :------------ |
| `config`   | `InstantiableConfig` | `undefined`   |
| `optional` | `boolean`            | `false`       |

#### Returns

`Promise`<`void`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[init](conditions.ProviderCondition.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L55)

---

### instance

▸ **instance**(`agreementId`, `params`): `Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name          | Type                                                                                                      |
| :------------ | :-------------------------------------------------------------------------------------------------------- |
| `agreementId` | `string`                                                                                                  |
| `params`      | [`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\> |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[instance](conditions.ProviderCondition.md#instance)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:184](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L184)

---

### instanceFromDDO

▸ **instanceFromDDO**(`agreementId`, `ctx`, ...`args`): `Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name          | Type                                                                             |
| :------------ | :------------------------------------------------------------------------------- |
| `agreementId` | `string`                                                                         |
| `ctx`         | `NFTAccessConditionContext`                                                      |
| `...args`     | [`ConditionInstanceSmall`](../interfaces/conditions.ConditionInstanceSmall.md)[] |

#### Returns

`Promise`<[`ConditionInstance`](../interfaces/conditions.ConditionInstance.md)<`Record`<`string`, `unknown`\>\>\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[instanceFromDDO](conditions.ProviderCondition.md#instancefromddo)

#### Defined in

[src/keeper/contracts/conditions/Condition.abstract.ts:154](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/Condition.abstract.ts#L154)

---

### params

▸ **params**(`did`, `grantee`): [`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `did`     | `string` |
| `grantee` | `string` |

#### Returns

[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>

#### Overrides

[ProviderCondition](conditions.ProviderCondition.md).[params](conditions.ProviderCondition.md#params)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFTAccessCondition.ts:18](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/NFTs/NFTAccessCondition.ts#L18)

---

### paramsFromDDO

▸ **paramsFromDDO**(`__namedParameters`): `Promise`<[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Parameters

| Name                | Type                        |
| :------------------ | :-------------------------- |
| `__namedParameters` | `NFTAccessConditionContext` |

#### Returns

`Promise`<[`ConditionParameters`](../interfaces/conditions.ConditionParameters.md)<`Record`<`string`, `unknown`\>\>\>

#### Overrides

[ProviderCondition](conditions.ProviderCondition.md).[paramsFromDDO](conditions.ProviderCondition.md#paramsfromddo)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFTAccessCondition.ts:22](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/NFTs/NFTAccessCondition.ts#L22)

---

### send

▸ **send**(`name`, `from`, `args`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name     | Type           |
| :------- | :------------- |
| `name`   | `string`       |
| `from`   | `string`       |
| `args`   | `any`[]        |
| `params` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[send](conditions.ProviderCondition.md#send)

#### Defined in

[src/keeper/contracts/ContractBase.ts:117](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L117)

---

### sendFrom

▸ **sendFrom**(`name`, `args`, `from?`, `value?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `name`   | `string`                |
| `args`   | `any`[]                 |
| `from?`  | [`Account`](Account.md) |
| `value?` | `TxParameters`          |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[sendFrom](conditions.ProviderCondition.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L97)

---

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `config` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[setInstanceConfig](conditions.ProviderCondition.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L171)

---

### addressesStatic

▸ `Static` **addressesStatic**(`config`, `web3`): `Promise`<`string`[]\>

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `config` | [`Config`](Config.md) |
| `web3`   | `JsonRpcProvider`     |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[addressesStatic](conditions.ProviderCondition.md#addressesstatic)

#### Defined in

[src/Instantiable.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L142)

---

### findSignerStatic

▸ `Static` **findSignerStatic**(`config`, `web3`, `from`): `Promise`<`Signer`\>

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `config` | [`Config`](Config.md) |
| `web3`   | `JsonRpcProvider`     |
| `from`   | `string`              |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[findSignerStatic](conditions.ProviderCondition.md#findsignerstatic)

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`NFTAccessCondition`](conditions.NFTAccessCondition.md)\>

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `config` | `InstantiableConfig` |

#### Returns

`Promise`<[`NFTAccessCondition`](conditions.NFTAccessCondition.md)\>

#### Overrides

[ProviderCondition](conditions.ProviderCondition.md).[getInstance](conditions.ProviderCondition.md#getinstance)

#### Defined in

[src/keeper/contracts/conditions/NFTs/NFTAccessCondition.ts:12](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/conditions/NFTs/NFTAccessCondition.ts#L12)

---

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `T`  | extends `Instantiable`<`T`\> |

#### Parameters

| Name                 | Type                 |
| :------------------- | :------------------- |
| `instance`           | `T`                  |
| `instantiableConfig` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

[ProviderCondition](conditions.ProviderCondition.md).[setInstanceConfig](conditions.ProviderCondition.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
