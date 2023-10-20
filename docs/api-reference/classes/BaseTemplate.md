[@nevermined-io/sdk](../code-reference.md) / BaseTemplate

# Class: BaseTemplate<Params, S\>

## Type parameters

| Name     | Type                                              |
| :------- | :------------------------------------------------ |
| `Params` | `Params`                                          |
| `S`      | extends [`Service`](../code-reference.md#service) |

## Hierarchy

- [`AgreementTemplate`](AgreementTemplate.md)<`Params`\>

  ↳ **`BaseTemplate`**

  ↳↳ [`AaveCreditTemplate`](AaveCreditTemplate.md)

  ↳↳ [`AccessTemplate`](AccessTemplate.md)

  ↳↳ [`EscrowComputeExecutionTemplate`](EscrowComputeExecutionTemplate.md)

  ↳↳ [`DIDSalesTemplate`](DIDSalesTemplate.md)

  ↳↳ [`NFTAccessTemplate`](NFTAccessTemplate.md)

  ↳↳ [`NFT721AccessTemplate`](NFT721AccessTemplate.md)

  ↳↳ [`NFTSalesTemplate`](NFTSalesTemplate.md)

  ↳↳ [`NFT721SalesTemplate`](NFT721SalesTemplate.md)

## Implements

- [`ServicePlugin`](../interfaces/ServicePlugin.md)<`S`\>

## Table of contents

### Constructors

- [constructor](BaseTemplate.md#constructor)

### Properties

- [address](BaseTemplate.md#address)
- [contract](BaseTemplate.md#contract)
- [contractName](BaseTemplate.md#contractname)
- [events](BaseTemplate.md#events)
- [version](BaseTemplate.md#version)

### Accessors

- [artifactsFolder](BaseTemplate.md#artifactsfolder)
- [circuitsFolder](BaseTemplate.md#circuitsfolder)
- [config](BaseTemplate.md#config)
- [instanceConfig](BaseTemplate.md#instanceconfig)
- [instantiableConfig](BaseTemplate.md#instantiableconfig)
- [logger](BaseTemplate.md#logger)
- [nevermined](BaseTemplate.md#nevermined)
- [web3](BaseTemplate.md#web3)

### Methods

- [accept](BaseTemplate.md#accept)
- [agreementId](BaseTemplate.md#agreementid)
- [call](BaseTemplate.md#call)
- [conditions](BaseTemplate.md#conditions)
- [createAgreement](BaseTemplate.md#createagreement)
- [createAgreementAndPay](BaseTemplate.md#createagreementandpay)
- [createAgreementFromDDO](BaseTemplate.md#createagreementfromddo)
- [createAgreementWithPaymentFromDDO](BaseTemplate.md#createagreementwithpaymentfromddo)
- [createService](BaseTemplate.md#createservice)
- [description](BaseTemplate.md#description)
- [extraGen](BaseTemplate.md#extragen)
- [getAgreementCreatedEvent](BaseTemplate.md#getagreementcreatedevent)
- [getAgreementData](BaseTemplate.md#getagreementdata)
- [getAgreementIdsFromDDO](BaseTemplate.md#getagreementidsfromddo)
- [getAgreementStatus](BaseTemplate.md#getagreementstatus)
- [getAgreementsForDID](BaseTemplate.md#getagreementsfordid)
- [getConditionTypes](BaseTemplate.md#getconditiontypes)
- [getConditions](BaseTemplate.md#getconditions)
- [getFromAddress](BaseTemplate.md#getfromaddress)
- [getInputsOfMethod](BaseTemplate.md#getinputsofmethod)
- [getServiceAgreementTemplate](BaseTemplate.md#getserviceagreementtemplate)
- [getServiceAgreementTemplateConditionByRef](BaseTemplate.md#getserviceagreementtemplateconditionbyref)
- [getServiceAgreementTemplateConditions](BaseTemplate.md#getserviceagreementtemplateconditions)
- [getServiceAgreementTemplateDependencies](BaseTemplate.md#getserviceagreementtemplatedependencies)
- [getSignatureOfMethod](BaseTemplate.md#getsignatureofmethod)
- [init](BaseTemplate.md#init)
- [instanceFromDDO](BaseTemplate.md#instancefromddo)
- [lockConditionIndex](BaseTemplate.md#lockconditionindex)
- [lockTokens](BaseTemplate.md#locktokens)
- [name](BaseTemplate.md#name)
- [params](BaseTemplate.md#params)
- [paramsGen](BaseTemplate.md#paramsgen)
- [paymentData](BaseTemplate.md#paymentdata)
- [printAgreementStatus](BaseTemplate.md#printagreementstatus)
- [process](BaseTemplate.md#process)
- [send](BaseTemplate.md#send)
- [sendFrom](BaseTemplate.md#sendfrom)
- [service](BaseTemplate.md#service)
- [serviceEndpoint](BaseTemplate.md#serviceendpoint)
- [setInstanceConfig](BaseTemplate.md#setinstanceconfig)
- [standardContext](BaseTemplate.md#standardcontext)
- [track](BaseTemplate.md#track)
- [validateAgreement](BaseTemplate.md#validateagreement)
- [getInstance](BaseTemplate.md#getinstance)
- [setInstanceConfig](BaseTemplate.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new BaseTemplate**<`Params`, `S`\>(`contractName`)

#### Type parameters

| Name     | Type                                                      |
| :------- | :-------------------------------------------------------- |
| `Params` | `Params`                                                  |
| `S`      | extends [`ServiceCommon`](../interfaces/ServiceCommon.md) |

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[constructor](AgreementTemplate.md#constructor)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:68](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L68)

## Properties

### address

• **address**: `string`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[address](AgreementTemplate.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[contract](AgreementTemplate.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[contractName](AgreementTemplate.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[events](AgreementTemplate.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[version](AgreementTemplate.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

AgreementTemplate.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

AgreementTemplate.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

AgreementTemplate.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

AgreementTemplate.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

AgreementTemplate.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

AgreementTemplate.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

AgreementTemplate.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

AgreementTemplate.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### accept

▸ **accept**(`_params`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type                                                    |
| :-------- | :------------------------------------------------------ |
| `_params` | [`ValidationParams`](../interfaces/ValidationParams.md) |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

[ServicePlugin](../interfaces/ServicePlugin.md).[accept](../interfaces/ServicePlugin.md#accept)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:98](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L98)

---

### agreementId

▸ **agreementId**(`agreementIdSeed`, `creator`): `Promise`<`string`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `agreementIdSeed` | `string` |
| `creator`         | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[agreementId](AgreementTemplate.md#agreementid)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:213](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L213)

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

[AgreementTemplate](AgreementTemplate.md).[call](AgreementTemplate.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:328](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L328)

---

### conditions

▸ `Abstract` **conditions**(): [`Condition`](Condition.md)<`any`, `any`\>[]

#### Returns

[`Condition`](Condition.md)<`any`, `any`\>[]

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L29)

---

### createAgreement

▸ **createAgreement**(`agreementId`, `did`, `conditionIds`, `timeLocks`, `timeOuts`, `extraArgs`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `agreementId`  | `string`                                        |
| `did`          | `string`                                        |
| `conditionIds` | `string`[]                                      |
| `timeLocks`    | `number`[]                                      |
| `timeOuts`     | `number`[]                                      |
| `extraArgs`    | `any`[]                                         |
| `from?`        | [`Account`](Account.md)                         |
| `txParams?`    | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[createAgreement](AgreementTemplate.md#createagreement)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L90)

---

### createAgreementAndPay

▸ **createAgreementAndPay**(`agreementId`, `did`, `conditionIds`, `timeLocks`, `timeOuts`, `accessConsumer`, `condIdx`, `rewardAddress`, `tokenAddress`, `amounts`, `receivers`, `from?`, `txParams?`): `Promise`<`ContractTransactionReceipt`\>

#### Parameters

| Name             | Type                                            |
| :--------------- | :---------------------------------------------- |
| `agreementId`    | `string`                                        |
| `did`            | `string`                                        |
| `conditionIds`   | `string`[]                                      |
| `timeLocks`      | `number`[]                                      |
| `timeOuts`       | `number`[]                                      |
| `accessConsumer` | `string`                                        |
| `condIdx`        | `number`                                        |
| `rewardAddress`  | `string`                                        |
| `tokenAddress`   | `string`                                        |
| `amounts`        | `bigint`[]                                      |
| `receivers`      | `string`[]                                      |
| `from?`          | [`Account`](Account.md)                         |
| `txParams?`      | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`ContractTransactionReceipt`\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[createAgreementAndPay](AgreementTemplate.md#createagreementandpay)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L115)

---

### createAgreementFromDDO

▸ **createAgreementFromDDO**(`agreementIdSeed`, `ddo`, `parameters`, `consumer`, `from`, `timeOuts?`, `txParams?`): `Promise`<`string`\>

Create a new agreement using the data of a DDO.

#### Parameters

| Name              | Type                                            | Description |
| :---------------- | :---------------------------------------------- | :---------- |
| `agreementIdSeed` | `string`                                        | -           |
| `ddo`             | [`DDO`](DDO.md)                                 | DDO.        |
| `parameters`      | `Params`                                        |             |
| `consumer`        | [`Account`](Account.md)                         | -           |
| `from`            | [`Account`](Account.md)                         | -           |
| `timeOuts?`       | `number`[]                                      | -           |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md) | -           |

#### Returns

`Promise`<`string`\>

true if the call was successful.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[createAgreementFromDDO](AgreementTemplate.md#createagreementfromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:222](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L222)

---

### createAgreementWithPaymentFromDDO

▸ **createAgreementWithPaymentFromDDO**(`agreementIdSeed`, `ddo`, `serviceReference`, `parameters`, `consumer`, `from`, `txParams?`, `observer?`): `Promise`<`string`\>

#### Parameters

| Name               | Type                                                                                  |
| :----------------- | :------------------------------------------------------------------------------------ |
| `agreementIdSeed`  | `string`                                                                              |
| `ddo`              | [`DDO`](DDO.md)                                                                       |
| `serviceReference` | `number` \| [`ServiceType`](../code-reference.md#servicetype)                         |
| `parameters`       | `Params`                                                                              |
| `consumer`         | [`Account`](Account.md)                                                               |
| `from`             | [`Account`](Account.md)                                                               |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)                                       |
| `observer?`        | (`orderProgressStep`: [`OrderProgressStep`](../enums/OrderProgressStep.md)) => `void` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[createAgreementWithPaymentFromDDO](AgreementTemplate.md#createagreementwithpaymentfromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:252](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L252)

---

### createService

▸ **createService**(`publisher`, `metadata`, `serviceAttributes`, `nftAttributes?`, `priceData?`): `S`

#### Parameters

| Name                | Type                                                                          |
| :------------------ | :---------------------------------------------------------------------------- |
| `publisher`         | [`Account`](Account.md)                                                       |
| `metadata`          | [`MetaData`](../interfaces/MetaData.md)                                       |
| `serviceAttributes` | [`ServiceAttributes`](../interfaces/ServiceAttributes.md)                     |
| `nftAttributes?`    | [`NFTAttributes`](NFTAttributes.md)                                           |
| `priceData?`        | [`PricedMetadataInformation`](../code-reference.md#pricedmetadatainformation) |

#### Returns

`S`

#### Implementation of

[ServicePlugin](../interfaces/ServicePlugin.md).[createService](../interfaces/ServicePlugin.md#createservice)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L35)

---

### description

▸ `Abstract` **description**(): `string`

#### Returns

`string`

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L28)

---

### extraGen

▸ **extraGen**(`_params`): `Promise`<`any`\>

#### Parameters

| Name      | Type                                                    |
| :-------- | :------------------------------------------------------ |
| `_params` | [`ValidationParams`](../interfaces/ValidationParams.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:94](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L94)

---

### getAgreementCreatedEvent

▸ **getAgreementCreatedEvent**(`agreementId`): `Promise`<`any`[]\>

Generates and returns the agreement creation event.

#### Parameters

| Name          | Type     | Description   |
| :------------ | :------- | :------------ |
| `agreementId` | `string` | Agreement ID. |

#### Returns

`Promise`<`any`[]\>

Agreement created event.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getAgreementCreatedEvent](AgreementTemplate.md#getagreementcreatedevent)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:459](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L459)

---

### getAgreementData

▸ **getAgreementData**(`agreementId`): `Promise`<{ `accessConsumer`: `string` ; `accessProvider`: `string` }\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `agreementId` | `string` |

#### Returns

`Promise`<{ `accessConsumer`: `string` ; `accessProvider`: `string` }\>

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:21](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L21)

---

### getAgreementIdsFromDDO

▸ **getAgreementIdsFromDDO**(`agreementId`, `ddo`, `creator`, `params`): `Promise`<`string`[]\>

Get agreement conditions IDs.

#### Parameters

| Name          | Type            | Description   |
| :------------ | :-------------- | :------------ |
| `agreementId` | `string`        | Agreement ID. |
| `ddo`         | [`DDO`](DDO.md) | DDO.          |
| `creator`     | `string`        | -             |
| `params`      | `Params`        | -             |

#### Returns

`Promise`<`string`[]\>

The condition IDs.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getAgreementIdsFromDDO](AgreementTemplate.md#getagreementidsfromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:180](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L180)

---

### getAgreementStatus

▸ **getAgreementStatus**(`agreementId`): `Promise`<`false` \| [`AgreementConditionsStatus`](../interfaces/AgreementConditionsStatus.md)\>

Returns the status of the conditions.

#### Parameters

| Name          | Type     | Description   |
| :------------ | :------- | :------------ |
| `agreementId` | `string` | Agreement ID. |

#### Returns

`Promise`<`false` \| [`AgreementConditionsStatus`](../interfaces/AgreementConditionsStatus.md)\>

The conditions status.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getAgreementStatus](AgreementTemplate.md#getagreementstatus)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:346](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L346)

---

### getAgreementsForDID

▸ **getAgreementsForDID**(`did`): `Promise`<`string`[]\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `did` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getAgreementsForDID](AgreementTemplate.md#getagreementsfordid)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:485](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L485)

---

### getConditionTypes

▸ **getConditionTypes**(): `Promise`<`string`[]\>

Conditions address list.

#### Returns

`Promise`<`string`[]\>

A list of condition addresses.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getConditionTypes](AgreementTemplate.md#getconditiontypes)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:154](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L154)

---

### getConditions

▸ **getConditions**(): `Promise`<[`ConditionSmall`](ConditionSmall.md)[]\>

List of condition contracts.

#### Returns

`Promise`<[`ConditionSmall`](ConditionSmall.md)[]\>

A list of condition contracts.

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getConditions](AgreementTemplate.md#getconditions)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:165](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L165)

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

[AgreementTemplate](AgreementTemplate.md).[getFromAddress](AgreementTemplate.md#getfromaddress)

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

[AgreementTemplate](AgreementTemplate.md).[getInputsOfMethod](AgreementTemplate.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:44](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L44)

---

### getServiceAgreementTemplate

▸ `Abstract` **getServiceAgreementTemplate**(): [`ServiceAgreementTemplate`](../interfaces/ServiceAgreementTemplate.md)

#### Returns

[`ServiceAgreementTemplate`](../interfaces/ServiceAgreementTemplate.md)

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getServiceAgreementTemplate](AgreementTemplate.md#getserviceagreementtemplate)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:322](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L322)

---

### getServiceAgreementTemplateConditionByRef

▸ **getServiceAgreementTemplateConditionByRef**(`ref`): `Promise`<[`ConditionSmall`](ConditionSmall.md)\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `ref` | `string` |

#### Returns

`Promise`<[`ConditionSmall`](ConditionSmall.md)\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getServiceAgreementTemplateConditionByRef](AgreementTemplate.md#getserviceagreementtemplateconditionbyref)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:329](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L329)

---

### getServiceAgreementTemplateConditions

▸ **getServiceAgreementTemplateConditions**(): [`ServiceAgreementTemplateCondition`](../interfaces/ServiceAgreementTemplateCondition.md)[]

#### Returns

[`ServiceAgreementTemplateCondition`](../interfaces/ServiceAgreementTemplateCondition.md)[]

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getServiceAgreementTemplateConditions](AgreementTemplate.md#getserviceagreementtemplateconditions)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:324](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L324)

---

### getServiceAgreementTemplateDependencies

▸ **getServiceAgreementTemplateDependencies**(): `Promise`<{ `[condition: string]`: `string`[]; }\>

#### Returns

`Promise`<{ `[condition: string]`: `string`[]; }\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getServiceAgreementTemplateDependencies](AgreementTemplate.md#getserviceagreementtemplatedependencies)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:336](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L336)

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

[AgreementTemplate](AgreementTemplate.md).[getSignatureOfMethod](AgreementTemplate.md#getsignatureofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L39)

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

[AgreementTemplate](AgreementTemplate.md).[init](AgreementTemplate.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:49](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L49)

---

### instanceFromDDO

▸ `Optional` `Abstract` **instanceFromDDO**(`agreementIdSeed`, `ddo`, `creator`, `parameters`, `serviceIndex?`): `Promise`<[`AgreementInstance`](../interfaces/AgreementInstance.md)<`Params`\>\>

#### Parameters

| Name              | Type            |
| :---------------- | :-------------- |
| `agreementIdSeed` | `string`        |
| `ddo`             | [`DDO`](DDO.md) |
| `creator`         | `string`        |
| `parameters`      | `Params`        |
| `serviceIndex?`   | `number`        |

#### Returns

`Promise`<[`AgreementInstance`](../interfaces/AgreementInstance.md)<`Params`\>\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[instanceFromDDO](AgreementTemplate.md#instancefromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:190](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L190)

---

### lockConditionIndex

▸ **lockConditionIndex**(): `number`

#### Returns

`number`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[lockConditionIndex](AgreementTemplate.md#lockconditionindex)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:74](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L74)

---

### lockTokens

▸ **lockTokens**(`tokenAddress`, `amounts`, `from`, `txParams`): `Promise`<`void`\>

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `tokenAddress` | `any`                                           |
| `amounts`      | `any`                                           |
| `from`         | [`Account`](Account.md)                         |
| `txParams`     | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[lockTokens](AgreementTemplate.md#locktokens)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:393](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L393)

---

### name

▸ `Abstract` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:27](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L27)

---

### params

▸ `Abstract` **params**(`...args`): `Params`

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`Params`

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[params](AgreementTemplate.md#params)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:72](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L72)

---

### paramsGen

▸ `Abstract` **paramsGen**(`params`): `Promise`<`Params`\>

Specialize params

#### Parameters

| Name     | Type                                                    | Description        |
| :------- | :------------------------------------------------------ | :----------------- |
| `params` | [`ValidationParams`](../interfaces/ValidationParams.md) | Generic parameters |

#### Returns

`Promise`<`Params`\>

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:92](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L92)

---

### paymentData

▸ **paymentData**(`service`): `Promise`<[`PaymentData`](../interfaces/PaymentData.md)\>

#### Parameters

| Name      | Type                                              |
| :-------- | :------------------------------------------------ |
| `service` | [`ServiceCommon`](../interfaces/ServiceCommon.md) |

#### Returns

`Promise`<[`PaymentData`](../interfaces/PaymentData.md)\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[paymentData](AgreementTemplate.md#paymentdata)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:78](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L78)

---

### printAgreementStatus

▸ **printAgreementStatus**(`agreementId`): `Promise`<`void`\>

Prints the agreement status.

#### Parameters

| Name          | Type     | Description   |
| :------------ | :------- | :------------ |
| `agreementId` | `string` | Agreement ID. |

#### Returns

`Promise`<`void`\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[printAgreementStatus](AgreementTemplate.md#printagreementstatus)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:429](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L429)

---

### process

▸ **process**(`params`, `from`, `txparams?`): `Promise`<`void`\>

#### Parameters

| Name        | Type                                                    |
| :---------- | :------------------------------------------------------ |
| `params`    | [`ValidationParams`](../interfaces/ValidationParams.md) |
| `from`      | [`Account`](Account.md)                                 |
| `txparams?` | [`TxParameters`](../interfaces/TxParameters.md)         |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ServicePlugin](../interfaces/ServicePlugin.md).[process](../interfaces/ServicePlugin.md#process)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:110](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L110)

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

[AgreementTemplate](AgreementTemplate.md).[send](AgreementTemplate.md#send)

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

[AgreementTemplate](AgreementTemplate.md).[sendFrom](AgreementTemplate.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L88)

---

### service

▸ `Abstract` **service**(): [`ServiceType`](../code-reference.md#servicetype)

#### Returns

[`ServiceType`](../code-reference.md#servicetype)

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[service](AgreementTemplate.md#service)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:198](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L198)

---

### serviceEndpoint

▸ **serviceEndpoint**(): `string`

#### Returns

`string`

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L31)

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

[AgreementTemplate](AgreementTemplate.md).[setInstanceConfig](AgreementTemplate.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### standardContext

▸ **standardContext**(`ddo`, `creator`, `serviceIndex?`): [`ConditionContext`](../interfaces/ConditionContext.md)

#### Parameters

| Name            | Type            |
| :-------------- | :-------------- |
| `ddo`           | [`DDO`](DDO.md) |
| `creator`       | `string`        |
| `serviceIndex?` | `number`        |

#### Returns

[`ConditionContext`](../interfaces/ConditionContext.md)

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[standardContext](AgreementTemplate.md#standardcontext)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:200](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L200)

---

### track

▸ **track**(`_params`, `_from`, `_txparams?`): `Promise`<`boolean`\>

#### Parameters

| Name         | Type                                                    |
| :----------- | :------------------------------------------------------ |
| `_params`    | [`ValidationParams`](../interfaces/ValidationParams.md) |
| `_from`      | [`Account`](Account.md)                                 |
| `_txparams?` | [`TxParameters`](../interfaces/TxParameters.md)         |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

[ServicePlugin](../interfaces/ServicePlugin.md).[track](../interfaces/ServicePlugin.md#track)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:102](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L102)

---

### validateAgreement

▸ **validateAgreement**(`agreement_id`, `did`, `params`, `from`, `extra?`, `txparams?`): `Promise`<`void`\>

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `agreement_id` | `string`                                        |
| `did`          | `string`                                        |
| `params`       | `Params`                                        |
| `from`         | [`Account`](Account.md)                         |
| `extra`        | `any`                                           |
| `txparams?`    | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:125](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L125)

---

### getInstance

▸ `Static` **getInstance**<`Params`\>(`config`, `templateContractName`, `templateClass`, `optional?`): `Promise`<`any`\>

#### Type parameters

| Name     |
| :------- |
| `Params` |

#### Parameters

| Name                   | Type                                                        | Default value |
| :--------------------- | :---------------------------------------------------------- | :------------ |
| `config`               | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | `undefined`   |
| `templateContractName` | `string`                                                    | `undefined`   |
| `templateClass`        | `any`                                                       | `undefined`   |
| `optional`             | `boolean`                                                   | `false`       |

#### Returns

`Promise`<`any`\>

#### Inherited from

[AgreementTemplate](AgreementTemplate.md).[getInstance](AgreementTemplate.md#getinstance)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:55](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L55)

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

[AgreementTemplate](AgreementTemplate.md).[setInstanceConfig](AgreementTemplate.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
