[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [templates](../modules/templates.md) / EscrowComputeExecutionTemplate

# Class: EscrowComputeExecutionTemplate

[templates](../modules/templates.md).EscrowComputeExecutionTemplate

## Hierarchy

- [`BaseTemplate`](templates.BaseTemplate.md)<`EscrowComputeExecutionParams`\>

  ↳ **`EscrowComputeExecutionTemplate`**

## Table of contents

### Constructors

- [constructor](templates.EscrowComputeExecutionTemplate.md#constructor)

### Properties

- [contract](templates.EscrowComputeExecutionTemplate.md#contract)
- [contractName](templates.EscrowComputeExecutionTemplate.md#contractname)
- [events](templates.EscrowComputeExecutionTemplate.md#events)
- [version](templates.EscrowComputeExecutionTemplate.md#version)

### Accessors

- [address](templates.EscrowComputeExecutionTemplate.md#address)
- [artifactsFolder](templates.EscrowComputeExecutionTemplate.md#artifactsfolder)
- [config](templates.EscrowComputeExecutionTemplate.md#config)
- [instanceConfig](templates.EscrowComputeExecutionTemplate.md#instanceconfig)
- [instantiableConfig](templates.EscrowComputeExecutionTemplate.md#instantiableconfig)
- [logger](templates.EscrowComputeExecutionTemplate.md#logger)
- [nevermined](templates.EscrowComputeExecutionTemplate.md#nevermined)
- [web3](templates.EscrowComputeExecutionTemplate.md#web3)

### Methods

- [accept](templates.EscrowComputeExecutionTemplate.md#accept)
- [addresses](templates.EscrowComputeExecutionTemplate.md#addresses)
- [agreementId](templates.EscrowComputeExecutionTemplate.md#agreementid)
- [call](templates.EscrowComputeExecutionTemplate.md#call)
- [checkExists](templates.EscrowComputeExecutionTemplate.md#checkexists)
- [conditions](templates.EscrowComputeExecutionTemplate.md#conditions)
- [createAgreement](templates.EscrowComputeExecutionTemplate.md#createagreement)
- [createAgreementAndPay](templates.EscrowComputeExecutionTemplate.md#createagreementandpay)
- [createAgreementFromDDO](templates.EscrowComputeExecutionTemplate.md#createagreementfromddo)
- [createAgreementWithPaymentFromDDO](templates.EscrowComputeExecutionTemplate.md#createagreementwithpaymentfromddo)
- [createService](templates.EscrowComputeExecutionTemplate.md#createservice)
- [description](templates.EscrowComputeExecutionTemplate.md#description)
- [extraGen](templates.EscrowComputeExecutionTemplate.md#extragen)
- [findSigner](templates.EscrowComputeExecutionTemplate.md#findsigner)
- [getAddress](templates.EscrowComputeExecutionTemplate.md#getaddress)
- [getAgreementCreatedEvent](templates.EscrowComputeExecutionTemplate.md#getagreementcreatedevent)
- [getAgreementData](templates.EscrowComputeExecutionTemplate.md#getagreementdata)
- [getAgreementIdsFromDDO](templates.EscrowComputeExecutionTemplate.md#getagreementidsfromddo)
- [getAgreementStatus](templates.EscrowComputeExecutionTemplate.md#getagreementstatus)
- [getAgreementsForDID](templates.EscrowComputeExecutionTemplate.md#getagreementsfordid)
- [getConditionTypes](templates.EscrowComputeExecutionTemplate.md#getconditiontypes)
- [getConditions](templates.EscrowComputeExecutionTemplate.md#getconditions)
- [getContract](templates.EscrowComputeExecutionTemplate.md#getcontract)
- [getFromAddress](templates.EscrowComputeExecutionTemplate.md#getfromaddress)
- [getInputsOfMethod](templates.EscrowComputeExecutionTemplate.md#getinputsofmethod)
- [getServiceAgreementTemplate](templates.EscrowComputeExecutionTemplate.md#getserviceagreementtemplate)
- [getServiceAgreementTemplateConditionByRef](templates.EscrowComputeExecutionTemplate.md#getserviceagreementtemplateconditionbyref)
- [getServiceAgreementTemplateConditions](templates.EscrowComputeExecutionTemplate.md#getserviceagreementtemplateconditions)
- [getServiceAgreementTemplateDependencies](templates.EscrowComputeExecutionTemplate.md#getserviceagreementtemplatedependencies)
- [getSignatureOfMethod](templates.EscrowComputeExecutionTemplate.md#getsignatureofmethod)
- [init](templates.EscrowComputeExecutionTemplate.md#init)
- [instanceFromDDO](templates.EscrowComputeExecutionTemplate.md#instancefromddo)
- [lockConditionIndex](templates.EscrowComputeExecutionTemplate.md#lockconditionindex)
- [lockTokens](templates.EscrowComputeExecutionTemplate.md#locktokens)
- [name](templates.EscrowComputeExecutionTemplate.md#name)
- [params](templates.EscrowComputeExecutionTemplate.md#params)
- [paramsGen](templates.EscrowComputeExecutionTemplate.md#paramsgen)
- [paymentData](templates.EscrowComputeExecutionTemplate.md#paymentdata)
- [printAgreementStatus](templates.EscrowComputeExecutionTemplate.md#printagreementstatus)
- [process](templates.EscrowComputeExecutionTemplate.md#process)
- [providerConfig](templates.EscrowComputeExecutionTemplate.md#providerconfig)
- [send](templates.EscrowComputeExecutionTemplate.md#send)
- [sendFrom](templates.EscrowComputeExecutionTemplate.md#sendfrom)
- [service](templates.EscrowComputeExecutionTemplate.md#service)
- [serviceEndpoint](templates.EscrowComputeExecutionTemplate.md#serviceendpoint)
- [setInstanceConfig](templates.EscrowComputeExecutionTemplate.md#setinstanceconfig)
- [standardContext](templates.EscrowComputeExecutionTemplate.md#standardcontext)
- [validateAgreement](templates.EscrowComputeExecutionTemplate.md#validateagreement)
- [addressesStatic](templates.EscrowComputeExecutionTemplate.md#addressesstatic)
- [findSignerStatic](templates.EscrowComputeExecutionTemplate.md#findsignerstatic)
- [getInstance](templates.EscrowComputeExecutionTemplate.md#getinstance)
- [setInstanceConfig](templates.EscrowComputeExecutionTemplate.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new EscrowComputeExecutionTemplate**(`contractName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[constructor](templates.BaseTemplate.md#constructor)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:75](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L75)

## Properties

### contract

• **contract**: `Contract` = `null`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[contract](templates.BaseTemplate.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L24)

___

### contractName

• **contractName**: `string`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[contractName](templates.BaseTemplate.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L23)

___

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[events](templates.BaseTemplate.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L25)

___

### version

• **version**: `string`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[version](templates.BaseTemplate.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

BaseTemplate.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L28)

___

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

BaseTemplate.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

BaseTemplate.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

BaseTemplate.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

BaseTemplate.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

BaseTemplate.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

BaseTemplate.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

BaseTemplate.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L63)

## Methods

### accept

▸ **accept**(`_params`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_params` | `ValidationParams` |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[accept](templates.BaseTemplate.md#accept)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:69](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L69)

___

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[addresses](templates.BaseTemplate.md#addresses)

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L129)

___

### agreementId

▸ **agreementId**(`agreementIdSeed`, `creator`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementIdSeed` | `string` |
| `creator` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[agreementId](templates.BaseTemplate.md#agreementid)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:213](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L213)

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

[BaseTemplate](templates.BaseTemplate.md).[call](templates.BaseTemplate.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:244](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L244)

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

[BaseTemplate](templates.BaseTemplate.md).[checkExists](templates.BaseTemplate.md#checkexists)

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L44)

___

### conditions

▸ **conditions**(): [[`ComputeExecutionCondition`](conditions.ComputeExecutionCondition.md), [`LockPaymentCondition`](conditions.LockPaymentCondition.md), [`EscrowPaymentCondition`](conditions.EscrowPaymentCondition.md)]

#### Returns

[[`ComputeExecutionCondition`](conditions.ComputeExecutionCondition.md), [`LockPaymentCondition`](conditions.LockPaymentCondition.md), [`EscrowPaymentCondition`](conditions.EscrowPaymentCondition.md)]

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[conditions](templates.BaseTemplate.md#conditions)

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:128](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L128)

___

### createAgreement

▸ **createAgreement**(`agreementId`, `did`, `conditionIds`, `timeLocks`, `timeOuts`, `extraArgs`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `did` | `string` |
| `conditionIds` | `string`[] |
| `timeLocks` | `number`[] |
| `timeOuts` | `number`[] |
| `extraArgs` | `any`[] |
| `from?` | [`Account`](Account.md) |
| `params?` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[createAgreement](templates.BaseTemplate.md#createagreement)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L99)

___

### createAgreementAndPay

▸ **createAgreementAndPay**(`agreementId`, `did`, `conditionIds`, `timeLocks`, `timeOuts`, `accessConsumer`, `condIdx`, `rewardAddress`, `tokenAddress`, `amounts`, `receivers`, `from?`, `params?`): `Promise`<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `did` | `string` |
| `conditionIds` | `string`[] |
| `timeLocks` | `number`[] |
| `timeOuts` | `number`[] |
| `accessConsumer` | `string` |
| `condIdx` | `number` |
| `rewardAddress` | `string` |
| `tokenAddress` | `string` |
| `amounts` | `default`[] |
| `receivers` | `string`[] |
| `from?` | [`Account`](Account.md) |
| `params?` | `TxParameters` |

#### Returns

`Promise`<`ContractReceipt`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[createAgreementAndPay](templates.BaseTemplate.md#createagreementandpay)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:124](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L124)

___

### createAgreementFromDDO

▸ **createAgreementFromDDO**(`agreementIdSeed`, `ddo`, `parameters`, `consumer`, `from`, `timeOuts?`, `params?`): `Promise`<`string`\>

Create a new agreement using the data of a DDO.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementIdSeed` | `string` | - |
| `ddo` | [`DDO`](DDO.md) | DDO. |
| `parameters` | `EscrowComputeExecutionParams` |  |
| `consumer` | [`Account`](Account.md) | - |
| `from` | [`Account`](Account.md) | - |
| `timeOuts?` | `number`[] | - |
| `params?` | `TxParameters` | - |

#### Returns

`Promise`<`string`\>

true if the call was successful.

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[createAgreementFromDDO](templates.BaseTemplate.md#createagreementfromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:225](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L225)

___

### createAgreementWithPaymentFromDDO

▸ **createAgreementWithPaymentFromDDO**(`agreementIdSeed`, `ddo`, `parameters`, `consumer`, `from`, `timeOuts?`, `txParams?`, `observer?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementIdSeed` | `string` |
| `ddo` | [`DDO`](DDO.md) |
| `parameters` | `EscrowComputeExecutionParams` |
| `consumer` | [`Account`](Account.md) |
| `from` | [`Account`](Account.md) |
| `timeOuts?` | `number`[] |
| `txParams?` | `TxParameters` |
| `observer?` | (`OrderProgressStep`: `any`) => `void` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[createAgreementWithPaymentFromDDO](templates.BaseTemplate.md#createagreementwithpaymentfromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:255](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L255)

___

### createService

▸ **createService**(`publisher`, `metadata`): `Promise`<`ServiceCommon`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `publisher` | [`Account`](Account.md) |
| `metadata` | [`MetaData`](../interfaces/MetaData.md) |

#### Returns

`Promise`<`ServiceCommon`\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[createService](templates.BaseTemplate.md#createservice)

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:92](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L92)

___

### description

▸ **description**(): `string`

#### Returns

`string`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[description](templates.BaseTemplate.md#description)

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:39](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L39)

___

### extraGen

▸ **extraGen**(`_params`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_params` | `ValidationParams` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[extraGen](templates.BaseTemplate.md#extragen)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:65](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L65)

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

[BaseTemplate](templates.BaseTemplate.md).[findSigner](templates.BaseTemplate.md#findsigner)

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L105)

___

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAddress](templates.BaseTemplate.md#getaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:41](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L41)

___

### getAgreementCreatedEvent

▸ **getAgreementCreatedEvent**(`agreementId`): `Promise`<`any`[]\>

Generates and returns the agreement creation event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementId` | `string` | Agreement ID. |

#### Returns

`Promise`<`any`[]\>

Agreement created event.

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAgreementCreatedEvent](templates.BaseTemplate.md#getagreementcreatedevent)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:469](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L469)

___

### getAgreementData

▸ **getAgreementData**(`agreementId`): `Promise`<{ `accessConsumer`: `string` ; `accessProvider`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |

#### Returns

`Promise`<{ `accessConsumer`: `string` ; `accessProvider`: `string`  }\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAgreementData](templates.BaseTemplate.md#getagreementdata)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:18](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L18)

___

### getAgreementIdsFromDDO

▸ **getAgreementIdsFromDDO**(`agreementId`, `ddo`, `creator`, `params`): `Promise`<`string`[]\>

Get agreement conditions IDs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementId` | `string` | Agreement ID. |
| `ddo` | [`DDO`](DDO.md) | DDO. |
| `creator` | `string` | - |
| `params` | `EscrowComputeExecutionParams` | - |

#### Returns

`Promise`<`string`[]\>

The condition IDs.

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAgreementIdsFromDDO](templates.BaseTemplate.md#getagreementidsfromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:183](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L183)

___

### getAgreementStatus

▸ **getAgreementStatus**(`agreementId`): `Promise`<``false`` \| [`AgreementConditionsStatus`](../interfaces/templates.AgreementConditionsStatus.md)\>

Returns the status of the conditions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementId` | `string` | Agreement ID. |

#### Returns

`Promise`<``false`` \| [`AgreementConditionsStatus`](../interfaces/templates.AgreementConditionsStatus.md)\>

The conditions status.

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAgreementStatus](templates.BaseTemplate.md#getagreementstatus)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:343](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L343)

___

### getAgreementsForDID

▸ **getAgreementsForDID**(`did`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAgreementsForDID](templates.BaseTemplate.md#getagreementsfordid)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:496](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L496)

___

### getConditionTypes

▸ **getConditionTypes**(): `Promise`<`string`[]\>

Conditions address list.

#### Returns

`Promise`<`string`[]\>

A list of condition addresses.

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getConditionTypes](templates.BaseTemplate.md#getconditiontypes)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:163](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L163)

___

### getConditions

▸ **getConditions**(): `Promise`<[`ConditionSmall`](conditions.ConditionSmall.md)[]\>

List of condition contracts.

#### Returns

`Promise`<[`ConditionSmall`](conditions.ConditionSmall.md)[]\>

A list of condition contracts.

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getConditions](templates.BaseTemplate.md#getconditions)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L171)

___

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getContract](templates.BaseTemplate.md#getcontract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:37](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L37)

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

[BaseTemplate](templates.BaseTemplate.md).[getFromAddress](templates.BaseTemplate.md#getfromaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:90](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L90)

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

[BaseTemplate](templates.BaseTemplate.md).[getInputsOfMethod](templates.BaseTemplate.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:50](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L50)

___

### getServiceAgreementTemplate

▸ **getServiceAgreementTemplate**(): `Promise`<`ServiceAgreementTemplate`\>

#### Returns

`Promise`<`ServiceAgreementTemplate`\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[getServiceAgreementTemplate](templates.BaseTemplate.md#getserviceagreementtemplate)

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:116](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L116)

___

### getServiceAgreementTemplateConditionByRef

▸ **getServiceAgreementTemplateConditionByRef**(`ref`): `Promise`<[`ConditionSmall`](conditions.ConditionSmall.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `string` |

#### Returns

`Promise`<[`ConditionSmall`](conditions.ConditionSmall.md)\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getServiceAgreementTemplateConditionByRef](templates.BaseTemplate.md#getserviceagreementtemplateconditionbyref)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:324](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L324)

___

### getServiceAgreementTemplateConditions

▸ **getServiceAgreementTemplateConditions**(): `Promise`<`ServiceAgreementTemplateCondition`[]\>

#### Returns

`Promise`<`ServiceAgreementTemplateCondition`[]\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getServiceAgreementTemplateConditions](templates.BaseTemplate.md#getserviceagreementtemplateconditions)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:319](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L319)

___

### getServiceAgreementTemplateDependencies

▸ **getServiceAgreementTemplateDependencies**(): `Promise`<{ `[condition: string]`: `string`[];  }\>

#### Returns

`Promise`<{ `[condition: string]`: `string`[];  }\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getServiceAgreementTemplateDependencies](templates.BaseTemplate.md#getserviceagreementtemplatedependencies)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:333](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L333)

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

[BaseTemplate](templates.BaseTemplate.md).[getSignatureOfMethod](templates.BaseTemplate.md#getsignatureofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:45](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L45)

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

[BaseTemplate](templates.BaseTemplate.md).[init](templates.BaseTemplate.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L55)

___

### instanceFromDDO

▸ **instanceFromDDO**(`agreementIdSeed`, `ddo`, `creator`, `parameters`): `Promise`<[`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`EscrowComputeExecutionParams`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementIdSeed` | `string` |
| `ddo` | [`DDO`](DDO.md) |
| `creator` | `string` |
| `parameters` | `EscrowComputeExecutionParams` |

#### Returns

`Promise`<[`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`EscrowComputeExecutionParams`\>\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[instanceFromDDO](templates.BaseTemplate.md#instancefromddo)

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:141](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L141)

___

### lockConditionIndex

▸ **lockConditionIndex**(): `number`

#### Returns

`number`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[lockConditionIndex](templates.BaseTemplate.md#lockconditionindex)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L81)

___

### lockTokens

▸ **lockTokens**(`tokenAddress`, `amounts`, `from`, `txParams`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenAddress` | `any` |
| `amounts` | `any` |
| `from` | [`Account`](Account.md) |
| `txParams` | `TxParameters` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[lockTokens](templates.BaseTemplate.md#locktokens)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:398](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L398)

___

### name

▸ **name**(): `string`

#### Returns

`string`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[name](templates.BaseTemplate.md#name)

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:36](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L36)

___

### params

▸ **params**(`consumer`): `EscrowComputeExecutionParams`

#### Parameters

| Name | Type |
| :------ | :------ |
| `consumer` | [`Account`](Account.md) |

#### Returns

`EscrowComputeExecutionParams`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[params](templates.BaseTemplate.md#params)

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:124](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L124)

___

### paramsGen

▸ **paramsGen**(`params`): `Promise`<`EscrowComputeExecutionParams`\>

Specialize params

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `ValidationParams` | Generic parameters |

#### Returns

`Promise`<`EscrowComputeExecutionParams`\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[paramsGen](templates.BaseTemplate.md#paramsgen)

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:20](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L20)

___

### paymentData

▸ **paymentData**(`service`): [`PaymentData`](../interfaces/templates.PaymentData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `ServiceCommon` |

#### Returns

[`PaymentData`](../interfaces/templates.PaymentData.md)

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[paymentData](templates.BaseTemplate.md#paymentdata)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:85](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L85)

___

### printAgreementStatus

▸ **printAgreementStatus**(`agreementId`): `Promise`<`void`\>

Prints the agreement status.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementId` | `string` | Agreement ID. |

#### Returns

`Promise`<`void`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[printAgreementStatus](templates.BaseTemplate.md#printagreementstatus)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:439](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L439)

___

### process

▸ **process**(`params`, `from`, `txparams?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `ValidationParams` |
| `from` | [`Account`](Account.md) |
| `txparams?` | `TxParameters` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[process](templates.BaseTemplate.md#process)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L73)

___

### providerConfig

▸ **providerConfig**(): `Promise`<{ `description`: `string` = ''; `environment`: { `cluster`: { `type`: `string` = 'Kubernetes'; `url`: `string` = 'http://10.0.0.17/xxx' } ; `supportedContainers`: { `checksum`: `string` = 'sha256:cb57ecfa6ebbefd8ffc7f75c0f00e57a7fa739578a429b6f72a0df19315deadc'; `image`: `string` = 'tensorflow/tensorflow'; `tag`: `string` = 'latest' }[] ; `supportedServers`: { `cpu`: `string` = '16'; `disk`: `string` = '160gb'; `gpu`: `string` = '0'; `maxExecutionTime`: `number` = 86400; `memory`: `string` = '128gb'; `price`: `string` = '50'; `serverId`: `string` = '1'; `serverType`: `string` = 'xlsize' }[]  } ; `type`: `string` = 'Azure' }\>

#### Returns

`Promise`<{ `description`: `string` = ''; `environment`: { `cluster`: { `type`: `string` = 'Kubernetes'; `url`: `string` = 'http://10.0.0.17/xxx' } ; `supportedContainers`: { `checksum`: `string` = 'sha256:cb57ecfa6ebbefd8ffc7f75c0f00e57a7fa739578a429b6f72a0df19315deadc'; `image`: `string` = 'tensorflow/tensorflow'; `tag`: `string` = 'latest' }[] ; `supportedServers`: { `cpu`: `string` = '16'; `disk`: `string` = '160gb'; `gpu`: `string` = '0'; `maxExecutionTime`: `number` = 86400; `memory`: `string` = '128gb'; `price`: `string` = '50'; `serverId`: `string` = '1'; `serverType`: `string` = 'xlsize' }[]  } ; `type`: `string` = 'Azure' }\>

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:43](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L43)

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

[BaseTemplate](templates.BaseTemplate.md).[send](templates.BaseTemplate.md#send)

#### Defined in

[src/keeper/contracts/ContractBase.ts:117](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L117)

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

[BaseTemplate](templates.BaseTemplate.md).[sendFrom](templates.BaseTemplate.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:97](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/ContractBase.ts#L97)

___

### service

▸ **service**(): `ServiceType`

#### Returns

`ServiceType`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[service](templates.BaseTemplate.md#service)

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:120](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L120)

___

### serviceEndpoint

▸ **serviceEndpoint**(): `ServiceType`

#### Returns

`ServiceType`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[serviceEndpoint](templates.BaseTemplate.md#serviceendpoint)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:28](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L28)

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

[BaseTemplate](templates.BaseTemplate.md).[setInstanceConfig](templates.BaseTemplate.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L171)

___

### standardContext

▸ **standardContext**(`ddo`, `creator`): [`ConditionContext`](../interfaces/conditions.ConditionContext.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ddo` | [`DDO`](DDO.md) |
| `creator` | `string` |

#### Returns

[`ConditionContext`](../interfaces/conditions.ConditionContext.md)

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[standardContext](templates.BaseTemplate.md#standardcontext)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:207](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L207)

___

### validateAgreement

▸ **validateAgreement**(`agreement_id`, `did`, `params`, `from`, `extra?`, `txparams?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreement_id` | `string` |
| `did` | `string` |
| `params` | `EscrowComputeExecutionParams` |
| `from` | [`Account`](Account.md) |
| `extra` | `any` |
| `txparams?` | `TxParameters` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[validateAgreement](templates.BaseTemplate.md#validateagreement)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:88](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L88)

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

[BaseTemplate](templates.BaseTemplate.md).[addressesStatic](templates.BaseTemplate.md#addressesstatic)

#### Defined in

[src/Instantiable.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L142)

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

[BaseTemplate](templates.BaseTemplate.md).[findSignerStatic](templates.BaseTemplate.md#findsignerstatic)

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L115)

___

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`EscrowComputeExecutionTemplate`](templates.EscrowComputeExecutionTemplate.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`Promise`<[`EscrowComputeExecutionTemplate`](templates.EscrowComputeExecutionTemplate.md)\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[getInstance](templates.BaseTemplate.md#getinstance)

#### Defined in

[src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts:27](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/keeper/contracts/templates/EscrowComputeExecutionTemplate.ts#L27)

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

[BaseTemplate](templates.BaseTemplate.md).[setInstanceConfig](templates.BaseTemplate.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/6f83096/src/Instantiable.abstract.ts#L162)
