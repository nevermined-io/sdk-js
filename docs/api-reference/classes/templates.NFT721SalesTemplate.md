[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [templates](../modules/templates.md) / NFT721SalesTemplate

# Class: NFT721SalesTemplate

[templates](../modules/templates.md).NFT721SalesTemplate

## Hierarchy

- [`BaseTemplate`](templates.BaseTemplate.md)<`NFT721SalesTemplateParams`\>

  ↳ **`NFT721SalesTemplate`**

## Table of contents

### Constructors

- [constructor](templates.NFT721SalesTemplate.md#constructor)

### Properties

- [contract](templates.NFT721SalesTemplate.md#contract)
- [contractName](templates.NFT721SalesTemplate.md#contractname)
- [events](templates.NFT721SalesTemplate.md#events)
- [version](templates.NFT721SalesTemplate.md#version)

### Accessors

- [address](templates.NFT721SalesTemplate.md#address)
- [artifactsFolder](templates.NFT721SalesTemplate.md#artifactsfolder)
- [config](templates.NFT721SalesTemplate.md#config)
- [instanceConfig](templates.NFT721SalesTemplate.md#instanceconfig)
- [instantiableConfig](templates.NFT721SalesTemplate.md#instantiableconfig)
- [logger](templates.NFT721SalesTemplate.md#logger)
- [nevermined](templates.NFT721SalesTemplate.md#nevermined)
- [web3](templates.NFT721SalesTemplate.md#web3)

### Methods

- [addresses](templates.NFT721SalesTemplate.md#addresses)
- [agreementId](templates.NFT721SalesTemplate.md#agreementid)
- [call](templates.NFT721SalesTemplate.md#call)
- [checkExists](templates.NFT721SalesTemplate.md#checkexists)
- [createAgreement](templates.NFT721SalesTemplate.md#createagreement)
- [createAgreementAndPay](templates.NFT721SalesTemplate.md#createagreementandpay)
- [createAgreementFromDDO](templates.NFT721SalesTemplate.md#createagreementfromddo)
- [createAgreementWithPaymentFromDDO](templates.NFT721SalesTemplate.md#createagreementwithpaymentfromddo)
- [findSigner](templates.NFT721SalesTemplate.md#findsigner)
- [getAddress](templates.NFT721SalesTemplate.md#getaddress)
- [getAgreementCreatedEvent](templates.NFT721SalesTemplate.md#getagreementcreatedevent)
- [getAgreementData](templates.NFT721SalesTemplate.md#getagreementdata)
- [getAgreementIdsFromDDO](templates.NFT721SalesTemplate.md#getagreementidsfromddo)
- [getAgreementStatus](templates.NFT721SalesTemplate.md#getagreementstatus)
- [getAgreementsForDID](templates.NFT721SalesTemplate.md#getagreementsfordid)
- [getConditionTypes](templates.NFT721SalesTemplate.md#getconditiontypes)
- [getConditions](templates.NFT721SalesTemplate.md#getconditions)
- [getContract](templates.NFT721SalesTemplate.md#getcontract)
- [getFromAddress](templates.NFT721SalesTemplate.md#getfromaddress)
- [getInputsOfMethod](templates.NFT721SalesTemplate.md#getinputsofmethod)
- [getServiceAgreementTemplate](templates.NFT721SalesTemplate.md#getserviceagreementtemplate)
- [getServiceAgreementTemplateConditionByRef](templates.NFT721SalesTemplate.md#getserviceagreementtemplateconditionbyref)
- [getServiceAgreementTemplateConditions](templates.NFT721SalesTemplate.md#getserviceagreementtemplateconditions)
- [getServiceAgreementTemplateDependencies](templates.NFT721SalesTemplate.md#getserviceagreementtemplatedependencies)
- [getSignatureOfMethod](templates.NFT721SalesTemplate.md#getsignatureofmethod)
- [init](templates.NFT721SalesTemplate.md#init)
- [instanceFromDDO](templates.NFT721SalesTemplate.md#instancefromddo)
- [lockConditionIndex](templates.NFT721SalesTemplate.md#lockconditionindex)
- [lockTokens](templates.NFT721SalesTemplate.md#locktokens)
- [params](templates.NFT721SalesTemplate.md#params)
- [paymentData](templates.NFT721SalesTemplate.md#paymentdata)
- [printAgreementStatus](templates.NFT721SalesTemplate.md#printagreementstatus)
- [send](templates.NFT721SalesTemplate.md#send)
- [sendFrom](templates.NFT721SalesTemplate.md#sendfrom)
- [service](templates.NFT721SalesTemplate.md#service)
- [setInstanceConfig](templates.NFT721SalesTemplate.md#setinstanceconfig)
- [standardContext](templates.NFT721SalesTemplate.md#standardcontext)
- [addressesStatic](templates.NFT721SalesTemplate.md#addressesstatic)
- [findSignerStatic](templates.NFT721SalesTemplate.md#findsignerstatic)
- [getInstance](templates.NFT721SalesTemplate.md#getinstance)
- [setInstanceConfig](templates.NFT721SalesTemplate.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new NFT721SalesTemplate**(`contractName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[constructor](templates.BaseTemplate.md#constructor)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:75](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L75)

## Properties

### contract

• **contract**: `Contract` = `null`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[contract](templates.BaseTemplate.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L24)

___

### contractName

• **contractName**: `string`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[contractName](templates.BaseTemplate.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L23)

___

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[events](templates.BaseTemplate.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L25)

___

### version

• **version**: `string`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[version](templates.BaseTemplate.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

BaseTemplate.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L28)

___

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

BaseTemplate.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

BaseTemplate.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

BaseTemplate.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

BaseTemplate.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

BaseTemplate.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

BaseTemplate.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

BaseTemplate.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L63)

## Methods

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[addresses](templates.BaseTemplate.md#addresses)

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

[BaseTemplate](templates.BaseTemplate.md).[agreementId](templates.BaseTemplate.md#agreementid)

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

[BaseTemplate](templates.BaseTemplate.md).[call](templates.BaseTemplate.md#call)

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

[BaseTemplate](templates.BaseTemplate.md).[checkExists](templates.BaseTemplate.md#checkexists)

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

[BaseTemplate](templates.BaseTemplate.md).[createAgreement](templates.BaseTemplate.md#createagreement)

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

[BaseTemplate](templates.BaseTemplate.md).[createAgreementAndPay](templates.BaseTemplate.md#createagreementandpay)

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
| `parameters` | `NFT721SalesTemplateParams` |  |
| `consumer` | [`Account`](Account.md) | - |
| `from` | [`Account`](Account.md) | - |
| `timeOuts?` | `number`[] | - |
| `params?` | `TxParameters` | - |

#### Returns

`Promise`<`string`\>

Success.

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[createAgreementFromDDO](templates.BaseTemplate.md#createagreementfromddo)

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
| `parameters` | `NFT721SalesTemplateParams` |
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

[BaseTemplate](templates.BaseTemplate.md).[findSigner](templates.BaseTemplate.md#findsigner)

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L105)

___

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAddress](templates.BaseTemplate.md#getaddress)

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

[BaseTemplate](templates.BaseTemplate.md).[getAgreementCreatedEvent](templates.BaseTemplate.md#getagreementcreatedevent)

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

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAgreementData](templates.BaseTemplate.md#getagreementdata)

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
| `params` | `NFT721SalesTemplateParams` | - |

#### Returns

`Promise`<`string`[]\>

Condition IDs.

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAgreementIdsFromDDO](templates.BaseTemplate.md#getagreementidsfromddo)

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

[BaseTemplate](templates.BaseTemplate.md).[getAgreementStatus](templates.BaseTemplate.md#getagreementstatus)

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

[BaseTemplate](templates.BaseTemplate.md).[getAgreementsForDID](templates.BaseTemplate.md#getagreementsfordid)

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

[BaseTemplate](templates.BaseTemplate.md).[getConditionTypes](templates.BaseTemplate.md#getconditiontypes)

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

[BaseTemplate](templates.BaseTemplate.md).[getConditions](templates.BaseTemplate.md#getconditions)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L171)

___

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getContract](templates.BaseTemplate.md#getcontract)

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

[BaseTemplate](templates.BaseTemplate.md).[getFromAddress](templates.BaseTemplate.md#getfromaddress)

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

[BaseTemplate](templates.BaseTemplate.md).[getInputsOfMethod](templates.BaseTemplate.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:50](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L50)

___

### getServiceAgreementTemplate

▸ **getServiceAgreementTemplate**(): `Promise`<`ServiceAgreementTemplate`\>

#### Returns

`Promise`<`ServiceAgreementTemplate`\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[getServiceAgreementTemplate](templates.BaseTemplate.md#getserviceagreementtemplate)

#### Defined in

[src/keeper/contracts/templates/NFT721SalesTemplate.ts:81](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/NFT721SalesTemplate.ts#L81)

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

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:328](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L328)

___

### getServiceAgreementTemplateConditions

▸ **getServiceAgreementTemplateConditions**(): `Promise`<`ServiceAgreementTemplateCondition`[]\>

#### Returns

`Promise`<`ServiceAgreementTemplateCondition`[]\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getServiceAgreementTemplateConditions](templates.BaseTemplate.md#getserviceagreementtemplateconditions)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:323](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L323)

___

### getServiceAgreementTemplateDependencies

▸ **getServiceAgreementTemplateDependencies**(): `Promise`<{ `[condition: string]`: `string`[];  }\>

#### Returns

`Promise`<{ `[condition: string]`: `string`[];  }\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getServiceAgreementTemplateDependencies](templates.BaseTemplate.md#getserviceagreementtemplatedependencies)

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

[BaseTemplate](templates.BaseTemplate.md).[getSignatureOfMethod](templates.BaseTemplate.md#getsignatureofmethod)

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

[BaseTemplate](templates.BaseTemplate.md).[init](templates.BaseTemplate.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L55)

___

### instanceFromDDO

▸ **instanceFromDDO**(`agreementIdSeed`, `ddo`, `creator`, `parameters`): `Promise`<[`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`NFT721SalesTemplateParams`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementIdSeed` | `string` |
| `ddo` | [`DDO`](DDO.md) |
| `creator` | `string` |
| `parameters` | `NFT721SalesTemplateParams` |

#### Returns

`Promise`<[`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`NFT721SalesTemplateParams`\>\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[instanceFromDDO](templates.BaseTemplate.md#instancefromddo)

#### Defined in

[src/keeper/contracts/templates/NFT721SalesTemplate.ts:38](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/NFT721SalesTemplate.ts#L38)

___

### lockConditionIndex

▸ **lockConditionIndex**(): `number`

#### Returns

`number`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[lockConditionIndex](templates.BaseTemplate.md#lockconditionindex)

#### Defined in

[src/keeper/contracts/templates/NFT721SalesTemplate.ts:34](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/NFT721SalesTemplate.ts#L34)

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

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:402](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L402)

___

### params

▸ **params**(`consumerId`, `expiration?`): `NFT721SalesTemplateParams`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `consumerId` | `string` | `undefined` |
| `expiration` | `number` | `0` |

#### Returns

`NFT721SalesTemplateParams`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[params](templates.BaseTemplate.md#params)

#### Defined in

[src/keeper/contracts/templates/NFT721SalesTemplate.ts:30](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/NFT721SalesTemplate.ts#L30)

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

[BaseTemplate](templates.BaseTemplate.md).[printAgreementStatus](templates.BaseTemplate.md#printagreementstatus)

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

[BaseTemplate](templates.BaseTemplate.md).[send](templates.BaseTemplate.md#send)

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

[BaseTemplate](templates.BaseTemplate.md).[sendFrom](templates.BaseTemplate.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:97](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/ContractBase.ts#L97)

___

### service

▸ **service**(): `ServiceType`

#### Returns

`ServiceType`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[service](templates.BaseTemplate.md#service)

#### Defined in

[src/keeper/contracts/templates/NFT721SalesTemplate.ts:26](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/NFT721SalesTemplate.ts#L26)

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

[BaseTemplate](templates.BaseTemplate.md).[standardContext](templates.BaseTemplate.md#standardcontext)

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

[BaseTemplate](templates.BaseTemplate.md).[addressesStatic](templates.BaseTemplate.md#addressesstatic)

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

[BaseTemplate](templates.BaseTemplate.md).[findSignerStatic](templates.BaseTemplate.md#findsignerstatic)

#### Defined in

[src/Instantiable.abstract.ts:116](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L116)

___

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`NFT721SalesTemplate`](templates.NFT721SalesTemplate.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`Promise`<[`NFT721SalesTemplate`](templates.NFT721SalesTemplate.md)\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[getInstance](templates.BaseTemplate.md#getinstance)

#### Defined in

[src/keeper/contracts/templates/NFT721SalesTemplate.ts:15](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/keeper/contracts/templates/NFT721SalesTemplate.ts#L15)

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

[src/Instantiable.abstract.ts:167](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L167)
