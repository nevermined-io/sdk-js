[@nevermined-io/sdk](../code-reference.md) / NFTSalesTemplate

# Class: NFTSalesTemplate

## Hierarchy

- [`BaseTemplate`](BaseTemplate.md)<`NFTSalesTemplateParams`, [`ServiceNFTSales`](../interfaces/ServiceNFTSales.md)\>

  ↳ **`NFTSalesTemplate`**

## Table of contents

### Constructors

- [constructor](NFTSalesTemplate.md#constructor)

### Properties

- [address](NFTSalesTemplate.md#address)
- [contract](NFTSalesTemplate.md#contract)
- [contractName](NFTSalesTemplate.md#contractname)
- [events](NFTSalesTemplate.md#events)
- [version](NFTSalesTemplate.md#version)

### Accessors

- [artifactsFolder](NFTSalesTemplate.md#artifactsfolder)
- [circuitsFolder](NFTSalesTemplate.md#circuitsfolder)
- [config](NFTSalesTemplate.md#config)
- [instanceConfig](NFTSalesTemplate.md#instanceconfig)
- [instantiableConfig](NFTSalesTemplate.md#instantiableconfig)
- [logger](NFTSalesTemplate.md#logger)
- [nevermined](NFTSalesTemplate.md#nevermined)
- [web3](NFTSalesTemplate.md#web3)

### Methods

- [accept](NFTSalesTemplate.md#accept)
- [agreementId](NFTSalesTemplate.md#agreementid)
- [call](NFTSalesTemplate.md#call)
- [conditions](NFTSalesTemplate.md#conditions)
- [createAgreement](NFTSalesTemplate.md#createagreement)
- [createAgreementAndPay](NFTSalesTemplate.md#createagreementandpay)
- [createAgreementFromDDO](NFTSalesTemplate.md#createagreementfromddo)
- [createAgreementWithPaymentFromDDO](NFTSalesTemplate.md#createagreementwithpaymentfromddo)
- [createService](NFTSalesTemplate.md#createservice)
- [description](NFTSalesTemplate.md#description)
- [extraGen](NFTSalesTemplate.md#extragen)
- [getAgreementCreatedEvent](NFTSalesTemplate.md#getagreementcreatedevent)
- [getAgreementData](NFTSalesTemplate.md#getagreementdata)
- [getAgreementIdsFromDDO](NFTSalesTemplate.md#getagreementidsfromddo)
- [getAgreementStatus](NFTSalesTemplate.md#getagreementstatus)
- [getAgreementsForDID](NFTSalesTemplate.md#getagreementsfordid)
- [getConditionTypes](NFTSalesTemplate.md#getconditiontypes)
- [getConditions](NFTSalesTemplate.md#getconditions)
- [getFromAddress](NFTSalesTemplate.md#getfromaddress)
- [getInputsOfMethod](NFTSalesTemplate.md#getinputsofmethod)
- [getParamsFromService](NFTSalesTemplate.md#getparamsfromservice)
- [getServiceAgreementTemplate](NFTSalesTemplate.md#getserviceagreementtemplate)
- [getServiceAgreementTemplateConditionByRef](NFTSalesTemplate.md#getserviceagreementtemplateconditionbyref)
- [getServiceAgreementTemplateConditions](NFTSalesTemplate.md#getserviceagreementtemplateconditions)
- [getServiceAgreementTemplateDependencies](NFTSalesTemplate.md#getserviceagreementtemplatedependencies)
- [getSignatureOfMethod](NFTSalesTemplate.md#getsignatureofmethod)
- [init](NFTSalesTemplate.md#init)
- [instanceFromDDO](NFTSalesTemplate.md#instancefromddo)
- [lockConditionIndex](NFTSalesTemplate.md#lockconditionindex)
- [lockTokens](NFTSalesTemplate.md#locktokens)
- [name](NFTSalesTemplate.md#name)
- [params](NFTSalesTemplate.md#params)
- [paramsGen](NFTSalesTemplate.md#paramsgen)
- [paymentData](NFTSalesTemplate.md#paymentdata)
- [printAgreementStatus](NFTSalesTemplate.md#printagreementstatus)
- [process](NFTSalesTemplate.md#process)
- [send](NFTSalesTemplate.md#send)
- [sendFrom](NFTSalesTemplate.md#sendfrom)
- [service](NFTSalesTemplate.md#service)
- [serviceEndpoint](NFTSalesTemplate.md#serviceendpoint)
- [setInstanceConfig](NFTSalesTemplate.md#setinstanceconfig)
- [standardContext](NFTSalesTemplate.md#standardcontext)
- [track](NFTSalesTemplate.md#track)
- [validateAgreement](NFTSalesTemplate.md#validateagreement)
- [getInstance](NFTSalesTemplate.md#getinstance)
- [setInstanceConfig](NFTSalesTemplate.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new NFTSalesTemplate**(`contractName`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `contractName` | `string` |

#### Inherited from

[BaseTemplate](BaseTemplate.md).[constructor](BaseTemplate.md#constructor)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:68](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L68)

## Properties

### address

• **address**: `string`

#### Inherited from

[BaseTemplate](BaseTemplate.md).[address](BaseTemplate.md#address)

#### Defined in

[src/keeper/contracts/ContractBase.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L32)

---

### contract

• **contract**: `BaseContract` = `null`

#### Inherited from

[BaseTemplate](BaseTemplate.md).[contract](BaseTemplate.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L29)

---

### contractName

• `Readonly` **contractName**: `string`

#### Inherited from

[BaseTemplate](BaseTemplate.md).[contractName](BaseTemplate.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L28)

---

### events

• **events**: [`ContractEvent`](ContractEvent.md) \| [`SubgraphEvent`](SubgraphEvent.md) = `null`

#### Inherited from

[BaseTemplate](BaseTemplate.md).[events](BaseTemplate.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L30)

---

### version

• **version**: `string`

#### Inherited from

[BaseTemplate](BaseTemplate.md).[version](BaseTemplate.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L31)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

BaseTemplate.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

BaseTemplate.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

BaseTemplate.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

BaseTemplate.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

BaseTemplate.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

BaseTemplate.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

BaseTemplate.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

BaseTemplate.web3

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

#### Inherited from

[BaseTemplate](BaseTemplate.md).[accept](BaseTemplate.md#accept)

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

[BaseTemplate](BaseTemplate.md).[agreementId](BaseTemplate.md#agreementid)

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

[BaseTemplate](BaseTemplate.md).[call](BaseTemplate.md#call)

#### Defined in

[src/keeper/contracts/ContractBase.ts:328](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L328)

---

### conditions

▸ **conditions**(): [[`LockPaymentCondition`](LockPaymentCondition.md), [`TransferNFTCondition`](TransferNFTCondition.md), [`EscrowPaymentCondition`](EscrowPaymentCondition.md)]

#### Returns

[[`LockPaymentCondition`](LockPaymentCondition.md), [`TransferNFTCondition`](TransferNFTCondition.md), [`EscrowPaymentCondition`](EscrowPaymentCondition.md)]

#### Overrides

[BaseTemplate](BaseTemplate.md).[conditions](BaseTemplate.md#conditions)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:85](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L85)

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

[BaseTemplate](BaseTemplate.md).[createAgreement](BaseTemplate.md#createagreement)

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

[BaseTemplate](BaseTemplate.md).[createAgreementAndPay](BaseTemplate.md#createagreementandpay)

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
| `parameters`      | `NFTSalesTemplateParams`                        |             |
| `consumer`        | [`Account`](Account.md)                         | -           |
| `from`            | [`Account`](Account.md)                         | -           |
| `timeOuts?`       | `number`[]                                      | -           |
| `txParams?`       | [`TxParameters`](../interfaces/TxParameters.md) | -           |

#### Returns

`Promise`<`string`\>

true if the call was successful.

#### Inherited from

[BaseTemplate](BaseTemplate.md).[createAgreementFromDDO](BaseTemplate.md#createagreementfromddo)

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
| `parameters`       | `NFTSalesTemplateParams`                                                              |
| `consumer`         | [`Account`](Account.md)                                                               |
| `from`             | [`Account`](Account.md)                                                               |
| `txParams?`        | [`TxParameters`](../interfaces/TxParameters.md)                                       |
| `observer?`        | (`orderProgressStep`: [`OrderProgressStep`](../enums/OrderProgressStep.md)) => `void` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[BaseTemplate](BaseTemplate.md).[createAgreementWithPaymentFromDDO](BaseTemplate.md#createagreementwithpaymentfromddo)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:252](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L252)

---

### createService

▸ **createService**(`publisher`, `metadata`, `serviceAttributes`, `nftAttributes?`, `priceData?`): [`ServiceNFTSales`](../interfaces/ServiceNFTSales.md)

#### Parameters

| Name                | Type                                                                          |
| :------------------ | :---------------------------------------------------------------------------- |
| `publisher`         | [`Account`](Account.md)                                                       |
| `metadata`          | [`MetaData`](../interfaces/MetaData.md)                                       |
| `serviceAttributes` | [`ServiceAttributes`](../interfaces/ServiceAttributes.md)                     |
| `nftAttributes?`    | [`NFTAttributes`](NFTAttributes.md)                                           |
| `priceData?`        | [`PricedMetadataInformation`](../code-reference.md#pricedmetadatainformation) |

#### Returns

[`ServiceNFTSales`](../interfaces/ServiceNFTSales.md)

#### Inherited from

[BaseTemplate](BaseTemplate.md).[createService](BaseTemplate.md#createservice)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L35)

---

### description

▸ **description**(): `string`

#### Returns

`string`

#### Overrides

[BaseTemplate](BaseTemplate.md).[description](BaseTemplate.md#description)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L39)

---

### extraGen

▸ **extraGen**(`_params`): `Promise`<`any`\>

#### Parameters

| Name      | Type                                                    |
| :-------- | :------------------------------------------------------ |
| `_params` | [`ValidationParams`](../interfaces/ValidationParams.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[BaseTemplate](BaseTemplate.md).[extraGen](BaseTemplate.md#extragen)

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

[BaseTemplate](BaseTemplate.md).[getAgreementCreatedEvent](BaseTemplate.md#getagreementcreatedevent)

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

#### Inherited from

[BaseTemplate](BaseTemplate.md).[getAgreementData](BaseTemplate.md#getagreementdata)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:21](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L21)

---

### getAgreementIdsFromDDO

▸ **getAgreementIdsFromDDO**(`agreementId`, `ddo`, `creator`, `params`): `Promise`<`string`[]\>

Get agreement conditions IDs.

#### Parameters

| Name          | Type                     | Description   |
| :------------ | :----------------------- | :------------ |
| `agreementId` | `string`                 | Agreement ID. |
| `ddo`         | [`DDO`](DDO.md)          | DDO.          |
| `creator`     | `string`                 | -             |
| `params`      | `NFTSalesTemplateParams` | -             |

#### Returns

`Promise`<`string`[]\>

The condition IDs.

#### Inherited from

[BaseTemplate](BaseTemplate.md).[getAgreementIdsFromDDO](BaseTemplate.md#getagreementidsfromddo)

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

[BaseTemplate](BaseTemplate.md).[getAgreementStatus](BaseTemplate.md#getagreementstatus)

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

[BaseTemplate](BaseTemplate.md).[getAgreementsForDID](BaseTemplate.md#getagreementsfordid)

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

[BaseTemplate](BaseTemplate.md).[getConditionTypes](BaseTemplate.md#getconditiontypes)

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

[BaseTemplate](BaseTemplate.md).[getConditions](BaseTemplate.md#getconditions)

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

[BaseTemplate](BaseTemplate.md).[getFromAddress](BaseTemplate.md#getfromaddress)

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

[BaseTemplate](BaseTemplate.md).[getInputsOfMethod](BaseTemplate.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:44](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L44)

---

### getParamsFromService

▸ **getParamsFromService**(`consumerId`, `nftAmount`, `service`): `Promise`<`NFTSalesTemplateParams`\>

#### Parameters

| Name         | Type                                                  |
| :----------- | :---------------------------------------------------- |
| `consumerId` | `string`                                              |
| `nftAmount`  | `bigint`                                              |
| `service`    | [`ServiceNFTSales`](../interfaces/ServiceNFTSales.md) |

#### Returns

`Promise`<`NFTSalesTemplateParams`\>

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:54](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L54)

---

### getServiceAgreementTemplate

▸ **getServiceAgreementTemplate**(): [`ServiceAgreementTemplate`](../interfaces/ServiceAgreementTemplate.md)

#### Returns

[`ServiceAgreementTemplate`](../interfaces/ServiceAgreementTemplate.md)

#### Overrides

[BaseTemplate](BaseTemplate.md).[getServiceAgreementTemplate](BaseTemplate.md#getserviceagreementtemplate)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:136](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L136)

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

[BaseTemplate](BaseTemplate.md).[getServiceAgreementTemplateConditionByRef](BaseTemplate.md#getserviceagreementtemplateconditionbyref)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:329](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L329)

---

### getServiceAgreementTemplateConditions

▸ **getServiceAgreementTemplateConditions**(): [`ServiceAgreementTemplateCondition`](../interfaces/ServiceAgreementTemplateCondition.md)[]

#### Returns

[`ServiceAgreementTemplateCondition`](../interfaces/ServiceAgreementTemplateCondition.md)[]

#### Inherited from

[BaseTemplate](BaseTemplate.md).[getServiceAgreementTemplateConditions](BaseTemplate.md#getserviceagreementtemplateconditions)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:324](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L324)

---

### getServiceAgreementTemplateDependencies

▸ **getServiceAgreementTemplateDependencies**(): `Promise`<{ `[condition: string]`: `string`[]; }\>

#### Returns

`Promise`<{ `[condition: string]`: `string`[]; }\>

#### Inherited from

[BaseTemplate](BaseTemplate.md).[getServiceAgreementTemplateDependencies](BaseTemplate.md#getserviceagreementtemplatedependencies)

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

[BaseTemplate](BaseTemplate.md).[getSignatureOfMethod](BaseTemplate.md#getsignatureofmethod)

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

[BaseTemplate](BaseTemplate.md).[init](BaseTemplate.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:49](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L49)

---

### instanceFromDDO

▸ **instanceFromDDO**(`agreementIdSeed`, `ddo`, `creator`, `parameters`, `serviceIndex?`): `Promise`<[`AgreementInstance`](../interfaces/AgreementInstance.md)<`NFTSalesTemplateParams`\>\>

#### Parameters

| Name              | Type                     |
| :---------------- | :----------------------- |
| `agreementIdSeed` | `string`                 |
| `ddo`             | [`DDO`](DDO.md)          |
| `creator`         | `string`                 |
| `parameters`      | `NFTSalesTemplateParams` |
| `serviceIndex?`   | `number`                 |

#### Returns

`Promise`<[`AgreementInstance`](../interfaces/AgreementInstance.md)<`NFTSalesTemplateParams`\>\>

#### Overrides

[BaseTemplate](BaseTemplate.md).[instanceFromDDO](BaseTemplate.md#instancefromddo)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:91](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L91)

---

### lockConditionIndex

▸ **lockConditionIndex**(): `number`

#### Returns

`number`

#### Overrides

[BaseTemplate](BaseTemplate.md).[lockConditionIndex](BaseTemplate.md#lockconditionindex)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L81)

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

[BaseTemplate](BaseTemplate.md).[lockTokens](BaseTemplate.md#locktokens)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:393](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L393)

---

### name

▸ **name**(): `string`

#### Returns

`string`

#### Overrides

[BaseTemplate](BaseTemplate.md).[name](BaseTemplate.md#name)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:36](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L36)

---

### params

▸ **params**(`consumerId`, `nftAmount`, `duration?`, `expiration?`, `providerId?`, `nftTransfer?`): `NFTSalesTemplateParams`

#### Parameters

| Name           | Type      |
| :------------- | :-------- |
| `consumerId`   | `string`  |
| `nftAmount`    | `bigint`  |
| `duration?`    | `number`  |
| `expiration?`  | `number`  |
| `providerId?`  | `string`  |
| `nftTransfer?` | `boolean` |

#### Returns

`NFTSalesTemplateParams`

#### Overrides

[BaseTemplate](BaseTemplate.md).[params](BaseTemplate.md#params)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:43](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L43)

---

### paramsGen

▸ **paramsGen**(`«destructured»`): `Promise`<`NFTSalesTemplateParams`\>

Specialize params

#### Parameters

| Name             | Type                                                    | Description        |
| :--------------- | :------------------------------------------------------ | :----------------- |
| `«destructured»` | [`ValidationParams`](../interfaces/ValidationParams.md) | Generic parameters |

#### Returns

`Promise`<`NFTSalesTemplateParams`\>

#### Overrides

[BaseTemplate](BaseTemplate.md).[paramsGen](BaseTemplate.md#paramsgen)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:72](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L72)

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

[BaseTemplate](BaseTemplate.md).[paymentData](BaseTemplate.md#paymentdata)

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

[BaseTemplate](BaseTemplate.md).[printAgreementStatus](BaseTemplate.md#printagreementstatus)

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

#### Inherited from

[BaseTemplate](BaseTemplate.md).[process](BaseTemplate.md#process)

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

[BaseTemplate](BaseTemplate.md).[send](BaseTemplate.md#send)

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

[BaseTemplate](BaseTemplate.md).[sendFrom](BaseTemplate.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/ContractBase.ts#L88)

---

### service

▸ **service**(): [`ServiceType`](../code-reference.md#servicetype)

#### Returns

[`ServiceType`](../code-reference.md#servicetype)

#### Overrides

[BaseTemplate](BaseTemplate.md).[service](BaseTemplate.md#service)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L28)

---

### serviceEndpoint

▸ **serviceEndpoint**(): `string`

#### Returns

`string`

#### Overrides

[BaseTemplate](BaseTemplate.md).[serviceEndpoint](BaseTemplate.md#serviceendpoint)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L32)

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

[BaseTemplate](BaseTemplate.md).[setInstanceConfig](BaseTemplate.md#setinstanceconfig)

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

[BaseTemplate](BaseTemplate.md).[standardContext](BaseTemplate.md#standardcontext)

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

#### Inherited from

[BaseTemplate](BaseTemplate.md).[track](BaseTemplate.md#track)

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
| `params`       | `NFTSalesTemplateParams`                        |
| `from`         | [`Account`](Account.md)                         |
| `extra`        | `any`                                           |
| `txparams?`    | [`TxParameters`](../interfaces/TxParameters.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

[BaseTemplate](BaseTemplate.md).[validateAgreement](BaseTemplate.md#validateagreement)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:125](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L125)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`NFTSalesTemplate`](NFTSalesTemplate.md)\>

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`Promise`<[`NFTSalesTemplate`](NFTSalesTemplate.md)\>

#### Overrides

[BaseTemplate](BaseTemplate.md).[getInstance](BaseTemplate.md#getinstance)

#### Defined in

[src/keeper/contracts/templates/NFTSalesTemplate.ts:24](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/templates/NFTSalesTemplate.ts#L24)

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

[BaseTemplate](BaseTemplate.md).[setInstanceConfig](BaseTemplate.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
