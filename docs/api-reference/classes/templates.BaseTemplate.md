[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [templates](../modules/templates.md) / BaseTemplate

# Class: BaseTemplate<Params\>

[templates](../modules/templates.md).BaseTemplate

## Type parameters

| Name |
| :------ |
| `Params` |

## Hierarchy

- [`AgreementTemplate`](AgreementTemplate.md)<`Params`\>

  ↳ **`BaseTemplate`**

  ↳↳ [`AccessTemplate`](templates.AccessTemplate.md)

  ↳↳ [`EscrowComputeExecutionTemplate`](templates.EscrowComputeExecutionTemplate.md)

  ↳↳ [`DIDSalesTemplate`](templates.DIDSalesTemplate.md)

  ↳↳ [`NFTAccessTemplate`](templates.NFTAccessTemplate.md)

  ↳↳ [`NFT721AccessTemplate`](templates.NFT721AccessTemplate.md)

  ↳↳ [`NFTSalesTemplate`](templates.NFTSalesTemplate.md)

  ↳↳ [`NFT721SalesTemplate`](templates.NFT721SalesTemplate.md)

  ↳↳ [`AaveCreditTemplate`](templates.AaveCreditTemplate.md)

## Table of contents

### Constructors

- [constructor](templates.BaseTemplate.md#constructor)

### Properties

- [contract](templates.BaseTemplate.md#contract)
- [contractName](templates.BaseTemplate.md#contractname)
- [events](templates.BaseTemplate.md#events)
- [version](templates.BaseTemplate.md#version)

### Accessors

- [address](templates.BaseTemplate.md#address)
- [artifactsFolder](templates.BaseTemplate.md#artifactsfolder)
- [config](templates.BaseTemplate.md#config)
- [instanceConfig](templates.BaseTemplate.md#instanceconfig)
- [instantiableConfig](templates.BaseTemplate.md#instantiableconfig)
- [logger](templates.BaseTemplate.md#logger)
- [nevermined](templates.BaseTemplate.md#nevermined)
- [web3](templates.BaseTemplate.md#web3)

### Methods

- [addresses](templates.BaseTemplate.md#addresses)
- [agreementId](templates.BaseTemplate.md#agreementid)
- [call](templates.BaseTemplate.md#call)
- [checkExists](templates.BaseTemplate.md#checkexists)
- [createAgreement](templates.BaseTemplate.md#createagreement)
- [createAgreementAndPay](templates.BaseTemplate.md#createagreementandpay)
- [createAgreementFromDDO](templates.BaseTemplate.md#createagreementfromddo)
- [createAgreementWithPaymentFromDDO](templates.BaseTemplate.md#createagreementwithpaymentfromddo)
- [findSigner](templates.BaseTemplate.md#findsigner)
- [getAddress](templates.BaseTemplate.md#getaddress)
- [getAgreementCreatedEvent](templates.BaseTemplate.md#getagreementcreatedevent)
- [getAgreementData](templates.BaseTemplate.md#getagreementdata)
- [getAgreementIdsFromDDO](templates.BaseTemplate.md#getagreementidsfromddo)
- [getAgreementStatus](templates.BaseTemplate.md#getagreementstatus)
- [getAgreementsForDID](templates.BaseTemplate.md#getagreementsfordid)
- [getConditionTypes](templates.BaseTemplate.md#getconditiontypes)
- [getConditions](templates.BaseTemplate.md#getconditions)
- [getContract](templates.BaseTemplate.md#getcontract)
- [getFromAddress](templates.BaseTemplate.md#getfromaddress)
- [getInputsOfMethod](templates.BaseTemplate.md#getinputsofmethod)
- [getServiceAgreementTemplate](templates.BaseTemplate.md#getserviceagreementtemplate)
- [getServiceAgreementTemplateConditionByRef](templates.BaseTemplate.md#getserviceagreementtemplateconditionbyref)
- [getServiceAgreementTemplateConditions](templates.BaseTemplate.md#getserviceagreementtemplateconditions)
- [getServiceAgreementTemplateDependencies](templates.BaseTemplate.md#getserviceagreementtemplatedependencies)
- [getSignatureOfMethod](templates.BaseTemplate.md#getsignatureofmethod)
- [init](templates.BaseTemplate.md#init)
- [instanceFromDDO](templates.BaseTemplate.md#instancefromddo)
- [lockConditionIndex](templates.BaseTemplate.md#lockconditionindex)
- [lockTokens](templates.BaseTemplate.md#locktokens)
- [params](templates.BaseTemplate.md#params)
- [paymentData](templates.BaseTemplate.md#paymentdata)
- [printAgreementStatus](templates.BaseTemplate.md#printagreementstatus)
- [send](templates.BaseTemplate.md#send)
- [sendFrom](templates.BaseTemplate.md#sendfrom)
- [service](templates.BaseTemplate.md#service)
- [setInstanceConfig](templates.BaseTemplate.md#setinstanceconfig)
- [standardContext](templates.BaseTemplate.md#standardcontext)
- [addressesStatic](templates.BaseTemplate.md#addressesstatic)
- [findSignerStatic](templates.BaseTemplate.md#findsignerstatic)
- [getInstance](templates.BaseTemplate.md#getinstance)
- [setInstanceConfig](templates.BaseTemplate.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new BaseTemplate**<`Params`\>(`contractName`)

#### Type parameters

| Name |
| :------ |
| `Params` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[constructor](AgreementTemplate.md#constructor)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:75](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L75)

## Properties

### contract

• **contract**: `Contract` = `null`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[contract](AgreementTemplate.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L24)

___

### contractName

• **contractName**: `string`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[contractName](AgreementTemplate.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L23)

___

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[events](AgreementTemplate.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L25)

___

### version

• **version**: `string`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[version](AgreementTemplate.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

AgreementTemplate.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L28)

___

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

AgreementTemplate.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

AgreementTemplate.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

AgreementTemplate.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

AgreementTemplate.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

AgreementTemplate.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

AgreementTemplate.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

AgreementTemplate.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L63)

## Methods

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[addresses](AgreementTemplate.md#addresses)

#### Defined in

[src/Instantiable.abstract.ts:131](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L131)

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

[AgreementTemplate](AgreementTemplate.md).[agreementId](AgreementTemplate.md#agreementid)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:215](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L215)

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

[AgreementTemplate](AgreementTemplate.md).[call](AgreementTemplate.md#call)

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

[AgreementTemplate](AgreementTemplate.md).[checkExists](AgreementTemplate.md#checkexists)

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L44)

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

[AgreementTemplate](AgreementTemplate.md).[createAgreement](AgreementTemplate.md#createagreement)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L99)

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

[AgreementTemplate](AgreementTemplate.md).[createAgreementAndPay](AgreementTemplate.md#createagreementandpay)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:124](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L124)

___

### createAgreementFromDDO

▸ **createAgreementFromDDO**(`agreementIdSeed`, `ddo`, `parameters`, `consumer`, `from`, `timeOuts?`, `params?`): `Promise`<`string`\>

Create a new agreement using the data of a DDO.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agreementIdSeed` | `string` | - |
| `ddo` | [`DDO`](DDO.md) | DDO. |
| `parameters` | `Params` |  |
| `consumer` | [`Account`](Account.md) | - |
| `from` | [`Account`](Account.md) | - |
| `timeOuts?` | `number`[] | - |
| `params?` | `TxParameters` | - |

#### Returns

`Promise`<`string`\>

Success.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[createAgreementFromDDO](AgreementTemplate.md#createagreementfromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:229](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L229)

___

### createAgreementWithPaymentFromDDO

▸ **createAgreementWithPaymentFromDDO**(`agreementIdSeed`, `ddo`, `parameters`, `consumer`, `from`, `timeOuts?`, `txParams?`, `observer?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementIdSeed` | `string` |
| `ddo` | [`DDO`](DDO.md) |
| `parameters` | `Params` |
| `consumer` | [`Account`](Account.md) |
| `from` | [`Account`](Account.md) |
| `timeOuts?` | `number`[] |
| `txParams?` | `TxParameters` |
| `observer?` | (`OrderProgressStep`: `any`) => `void` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[createAgreementWithPaymentFromDDO](AgreementTemplate.md#createagreementwithpaymentfromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:259](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L259)

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

[AgreementTemplate](AgreementTemplate.md).[findSigner](AgreementTemplate.md#findsigner)

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L105)

___

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getAddress](AgreementTemplate.md#getaddress)

#### Defined in

[src/keeper/contracts/ContractBase.ts:41](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L41)

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

[AgreementTemplate](AgreementTemplate.md).[getAgreementCreatedEvent](AgreementTemplate.md#getagreementcreatedevent)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:473](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L473)

___

### getAgreementData

▸ **getAgreementData**(`agreementId`): `Promise`<{ `accessConsumer`: `string` ; `accessProvider`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |

#### Returns

`Promise`<{ `accessConsumer`: `string` ; `accessProvider`: `string`  }\>

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:5](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L5)

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
| `params` | `Params` | - |

#### Returns

`Promise`<`string`[]\>

Condition IDs.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getAgreementIdsFromDDO](AgreementTemplate.md#getagreementidsfromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:185](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L185)

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

Conditions status.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getAgreementStatus](AgreementTemplate.md#getagreementstatus)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:347](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L347)

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

[AgreementTemplate](AgreementTemplate.md).[getAgreementsForDID](AgreementTemplate.md#getagreementsfordid)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:500](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L500)

___

### getConditionTypes

▸ **getConditionTypes**(): `Promise`<`string`[]\>

Conditions address list.

#### Returns

`Promise`<`string`[]\>

Conditions address.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getConditionTypes](AgreementTemplate.md#getconditiontypes)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:163](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L163)

___

### getConditions

▸ **getConditions**(): `Promise`<[`ConditionSmall`](conditions.ConditionSmall.md)[]\>

List of condition contracts.

#### Returns

`Promise`<[`ConditionSmall`](conditions.ConditionSmall.md)[]\>

Conditions contracts.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getConditions](AgreementTemplate.md#getconditions)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L171)

___

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getContract](AgreementTemplate.md#getcontract)

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

[AgreementTemplate](AgreementTemplate.md).[getFromAddress](AgreementTemplate.md#getfromaddress)

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

[AgreementTemplate](AgreementTemplate.md).[getInputsOfMethod](AgreementTemplate.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:50](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L50)

___

### getServiceAgreementTemplate

▸ `Abstract` **getServiceAgreementTemplate**(): `Promise`<`ServiceAgreementTemplate`\>

#### Returns

`Promise`<`ServiceAgreementTemplate`\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getServiceAgreementTemplate](AgreementTemplate.md#getserviceagreementtemplate)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:321](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L321)

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

[AgreementTemplate](AgreementTemplate.md).[getServiceAgreementTemplateConditionByRef](AgreementTemplate.md#getserviceagreementtemplateconditionbyref)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:328](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L328)

___

### getServiceAgreementTemplateConditions

▸ **getServiceAgreementTemplateConditions**(): `Promise`<`ServiceAgreementTemplateCondition`[]\>

#### Returns

`Promise`<`ServiceAgreementTemplateCondition`[]\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getServiceAgreementTemplateConditions](AgreementTemplate.md#getserviceagreementtemplateconditions)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:323](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L323)

___

### getServiceAgreementTemplateDependencies

▸ **getServiceAgreementTemplateDependencies**(): `Promise`<{ `[condition: string]`: `string`[];  }\>

#### Returns

`Promise`<{ `[condition: string]`: `string`[];  }\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getServiceAgreementTemplateDependencies](AgreementTemplate.md#getserviceagreementtemplatedependencies)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:337](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L337)

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

[AgreementTemplate](AgreementTemplate.md).[getSignatureOfMethod](AgreementTemplate.md#getsignatureofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:45](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L45)

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

[AgreementTemplate](AgreementTemplate.md).[init](AgreementTemplate.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L55)

___

### instanceFromDDO

▸ `Optional` `Abstract` **instanceFromDDO**(`agreementIdSeed`, `ddo`, `creator`, `parameters`): `Promise`<[`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`Params`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementIdSeed` | `string` |
| `ddo` | [`DDO`](DDO.md) |
| `creator` | `string` |
| `parameters` | `Params` |

#### Returns

`Promise`<[`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`Params`\>\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[instanceFromDDO](AgreementTemplate.md#instancefromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:200](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L200)

___

### lockConditionIndex

▸ **lockConditionIndex**(): `number`

#### Returns

`number`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[lockConditionIndex](AgreementTemplate.md#lockconditionindex)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L81)

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

[AgreementTemplate](AgreementTemplate.md).[lockTokens](AgreementTemplate.md#locktokens)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:402](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L402)

___

### params

▸ `Abstract` **params**(...`args`): `Params`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Params`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[params](AgreementTemplate.md#params)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:79](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L79)

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

[AgreementTemplate](AgreementTemplate.md).[paymentData](AgreementTemplate.md#paymentdata)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:85](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L85)

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

[AgreementTemplate](AgreementTemplate.md).[printAgreementStatus](AgreementTemplate.md#printagreementstatus)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:443](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L443)

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

[AgreementTemplate](AgreementTemplate.md).[send](AgreementTemplate.md#send)

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

[AgreementTemplate](AgreementTemplate.md).[sendFrom](AgreementTemplate.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:97](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L97)

___

### service

▸ `Abstract` **service**(): `ServiceType`

#### Returns

`ServiceType`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[service](AgreementTemplate.md#service)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:207](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L207)

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

[AgreementTemplate](AgreementTemplate.md).[setInstanceConfig](AgreementTemplate.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:176](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L176)

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

[AgreementTemplate](AgreementTemplate.md).[standardContext](AgreementTemplate.md#standardcontext)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:209](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L209)

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

[AgreementTemplate](AgreementTemplate.md).[addressesStatic](AgreementTemplate.md#addressesstatic)

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

[AgreementTemplate](AgreementTemplate.md).[findSignerStatic](AgreementTemplate.md#findsignerstatic)

#### Defined in

[src/Instantiable.abstract.ts:116](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L116)

___

### getInstance

▸ `Static` **getInstance**<`Params`\>(`config`, `templateContractName`, `templateClass`, `optional?`): `Promise`<`any`\>

#### Type parameters

| Name |
| :------ |
| `Params` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config` | `InstantiableConfig` | `undefined` |
| `templateContractName` | `string` | `undefined` |
| `templateClass` | `any` | `undefined` |
| `optional` | `boolean` | `false` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getInstance](AgreementTemplate.md#getinstance)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:62](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L62)

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

[AgreementTemplate](AgreementTemplate.md).[setInstanceConfig](AgreementTemplate.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:167](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L167)
