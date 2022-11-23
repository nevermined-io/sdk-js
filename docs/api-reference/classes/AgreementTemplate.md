[@nevermined-io/nevermined-sdk-js](../code-reference.md) / AgreementTemplate

# Class: AgreementTemplate<Params\>

## Type parameters

| Name |
| :------ |
| `Params` |

## Hierarchy

- `ContractBase`

  ↳ **`AgreementTemplate`**

  ↳↳ [`BaseTemplate`](templates.BaseTemplate.md)

## Table of contents

### Constructors

- [constructor](AgreementTemplate.md#constructor)

### Properties

- [contract](AgreementTemplate.md#contract)
- [contractName](AgreementTemplate.md#contractname)
- [events](AgreementTemplate.md#events)
- [version](AgreementTemplate.md#version)

### Accessors

- [address](AgreementTemplate.md#address)
- [artifactsFolder](AgreementTemplate.md#artifactsfolder)
- [config](AgreementTemplate.md#config)
- [instanceConfig](AgreementTemplate.md#instanceconfig)
- [instantiableConfig](AgreementTemplate.md#instantiableconfig)
- [logger](AgreementTemplate.md#logger)
- [nevermined](AgreementTemplate.md#nevermined)
- [web3](AgreementTemplate.md#web3)

### Methods

- [addresses](AgreementTemplate.md#addresses)
- [agreementId](AgreementTemplate.md#agreementid)
- [call](AgreementTemplate.md#call)
- [checkExists](AgreementTemplate.md#checkexists)
- [createAgreement](AgreementTemplate.md#createagreement)
- [createAgreementAndPay](AgreementTemplate.md#createagreementandpay)
- [createAgreementFromDDO](AgreementTemplate.md#createagreementfromddo)
- [createAgreementWithPaymentFromDDO](AgreementTemplate.md#createagreementwithpaymentfromddo)
- [findSigner](AgreementTemplate.md#findsigner)
- [getAddress](AgreementTemplate.md#getaddress)
- [getAgreementCreatedEvent](AgreementTemplate.md#getagreementcreatedevent)
- [getAgreementIdsFromDDO](AgreementTemplate.md#getagreementidsfromddo)
- [getAgreementStatus](AgreementTemplate.md#getagreementstatus)
- [getAgreementsForDID](AgreementTemplate.md#getagreementsfordid)
- [getConditionTypes](AgreementTemplate.md#getconditiontypes)
- [getConditions](AgreementTemplate.md#getconditions)
- [getContract](AgreementTemplate.md#getcontract)
- [getFromAddress](AgreementTemplate.md#getfromaddress)
- [getInputsOfMethod](AgreementTemplate.md#getinputsofmethod)
- [getServiceAgreementTemplate](AgreementTemplate.md#getserviceagreementtemplate)
- [getServiceAgreementTemplateConditionByRef](AgreementTemplate.md#getserviceagreementtemplateconditionbyref)
- [getServiceAgreementTemplateConditions](AgreementTemplate.md#getserviceagreementtemplateconditions)
- [getServiceAgreementTemplateDependencies](AgreementTemplate.md#getserviceagreementtemplatedependencies)
- [getSignatureOfMethod](AgreementTemplate.md#getsignatureofmethod)
- [init](AgreementTemplate.md#init)
- [instanceFromDDO](AgreementTemplate.md#instancefromddo)
- [lockConditionIndex](AgreementTemplate.md#lockconditionindex)
- [lockTokens](AgreementTemplate.md#locktokens)
- [params](AgreementTemplate.md#params)
- [paymentData](AgreementTemplate.md#paymentdata)
- [printAgreementStatus](AgreementTemplate.md#printagreementstatus)
- [send](AgreementTemplate.md#send)
- [sendFrom](AgreementTemplate.md#sendfrom)
- [service](AgreementTemplate.md#service)
- [setInstanceConfig](AgreementTemplate.md#setinstanceconfig)
- [standardContext](AgreementTemplate.md#standardcontext)
- [addressesStatic](AgreementTemplate.md#addressesstatic)
- [findSignerStatic](AgreementTemplate.md#findsignerstatic)
- [getInstance](AgreementTemplate.md#getinstance)
- [setInstanceConfig](AgreementTemplate.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new AgreementTemplate**<`Params`\>(`contractName`)

#### Type parameters

| Name |
| :------ |
| `Params` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |

#### Overrides

ContractBase.constructor

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:75](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L75)

## Properties

### contract

• **contract**: `Contract` = `null`

#### Inherited from

ContractBase.contract

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L24)

___

### contractName

• **contractName**: `string`

#### Inherited from

ContractBase.contractName

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L23)

___

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

ContractBase.events

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L25)

___

### version

• **version**: `string`

#### Inherited from

ContractBase.version

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

ContractBase.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L28)

___

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

ContractBase.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

ContractBase.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

ContractBase.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

ContractBase.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

ContractBase.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

ContractBase.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

ContractBase.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L63)

## Methods

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

ContractBase.addresses

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L129)

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

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:213](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L213)

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

ContractBase.call

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

ContractBase.checkExists

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L44)

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

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L99)

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

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:124](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L124)

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

true if the call was successful.

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:225](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L225)

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

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:255](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L255)

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

ContractBase.findSigner

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

___

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

ContractBase.getAddress

#### Defined in

[src/keeper/contracts/ContractBase.ts:41](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L41)

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

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:469](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L469)

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

The condition IDs.

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:183](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L183)

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

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:343](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L343)

___

### getAgreementsForDID

▸ **getAgreementsForDID**(`did`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:496](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L496)

___

### getConditionTypes

▸ **getConditionTypes**(): `Promise`<`string`[]\>

Conditions address list.

#### Returns

`Promise`<`string`[]\>

A list of condition addresses.

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:163](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L163)

___

### getConditions

▸ **getConditions**(): `Promise`<[`ConditionSmall`](conditions.ConditionSmall.md)[]\>

List of condition contracts.

#### Returns

`Promise`<[`ConditionSmall`](conditions.ConditionSmall.md)[]\>

A list of condition contracts.

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L171)

___

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

ContractBase.getContract

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

ContractBase.getFromAddress

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

ContractBase.getInputsOfMethod

#### Defined in

[src/keeper/contracts/ContractBase.ts:50](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L50)

___

### getServiceAgreementTemplate

▸ `Abstract` **getServiceAgreementTemplate**(): `Promise`<`ServiceAgreementTemplate`\>

#### Returns

`Promise`<`ServiceAgreementTemplate`\>

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:317](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L317)

___

### getServiceAgreementTemplateConditionByRef

▸ **getServiceAgreementTemplateConditionByRef**(`ref`): `Promise`<[`ConditionSmall`](conditions.ConditionSmall.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `string` |

#### Returns

`Promise`<[`ConditionSmall`](conditions.ConditionSmall.md)\>

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:324](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L324)

___

### getServiceAgreementTemplateConditions

▸ **getServiceAgreementTemplateConditions**(): `Promise`<`ServiceAgreementTemplateCondition`[]\>

#### Returns

`Promise`<`ServiceAgreementTemplateCondition`[]\>

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:319](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L319)

___

### getServiceAgreementTemplateDependencies

▸ **getServiceAgreementTemplateDependencies**(): `Promise`<{ `[condition: string]`: `string`[];  }\>

#### Returns

`Promise`<{ `[condition: string]`: `string`[];  }\>

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:333](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L333)

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

ContractBase.getSignatureOfMethod

#### Defined in

[src/keeper/contracts/ContractBase.ts:45](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L45)

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

ContractBase.init

#### Defined in

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L55)

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

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:198](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L198)

___

### lockConditionIndex

▸ **lockConditionIndex**(): `number`

#### Returns

`number`

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L81)

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

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:398](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L398)

___

### params

▸ `Abstract` **params**(...`args`): `Params`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Params`

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:79](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L79)

___

### paymentData

▸ **paymentData**(`service`): [`PaymentData`](../interfaces/templates.PaymentData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `ServiceCommon` |

#### Returns

[`PaymentData`](../interfaces/templates.PaymentData.md)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:85](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L85)

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

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:439](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L439)

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

ContractBase.send

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

ContractBase.sendFrom

#### Defined in

[src/keeper/contracts/ContractBase.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L97)

___

### service

▸ `Abstract` **service**(): `ServiceType`

#### Returns

`ServiceType`

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:205](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L205)

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

ContractBase.setInstanceConfig

#### Defined in

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L171)

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

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:207](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L207)

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

ContractBase.addressesStatic

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

ContractBase.findSignerStatic

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

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

#### Overrides

ContractBase.getInstance

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:62](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L62)

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

ContractBase.setInstanceConfig

#### Defined in

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
