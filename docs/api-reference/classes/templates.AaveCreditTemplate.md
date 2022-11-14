[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [templates](../modules/templates.md) / AaveCreditTemplate

# Class: AaveCreditTemplate

[templates](../modules/templates.md).AaveCreditTemplate

## Hierarchy

- [`BaseTemplate`](templates.BaseTemplate.md)<`AaveCreditTemplateParams`, `ServiceAaveCredit`\>

  ↳ **`AaveCreditTemplate`**

## Table of contents

### Constructors

- [constructor](templates.AaveCreditTemplate.md#constructor)

### Properties

- [aaveConfig](templates.AaveCreditTemplate.md#aaveconfig)
- [contract](templates.AaveCreditTemplate.md#contract)
- [contractName](templates.AaveCreditTemplate.md#contractname)
- [events](templates.AaveCreditTemplate.md#events)
- [version](templates.AaveCreditTemplate.md#version)

### Accessors

- [address](templates.AaveCreditTemplate.md#address)
- [artifactsFolder](templates.AaveCreditTemplate.md#artifactsfolder)
- [config](templates.AaveCreditTemplate.md#config)
- [instanceConfig](templates.AaveCreditTemplate.md#instanceconfig)
- [instantiableConfig](templates.AaveCreditTemplate.md#instantiableconfig)
- [logger](templates.AaveCreditTemplate.md#logger)
- [nevermined](templates.AaveCreditTemplate.md#nevermined)
- [web3](templates.AaveCreditTemplate.md#web3)

### Methods

- [\_createAgreement](templates.AaveCreditTemplate.md#_createagreement)
- [accept](templates.AaveCreditTemplate.md#accept)
- [addresses](templates.AaveCreditTemplate.md#addresses)
- [agreementId](templates.AaveCreditTemplate.md#agreementid)
- [call](templates.AaveCreditTemplate.md#call)
- [checkExists](templates.AaveCreditTemplate.md#checkexists)
- [conditions](templates.AaveCreditTemplate.md#conditions)
- [createAgreement](templates.AaveCreditTemplate.md#createagreement)
- [createAgreementAndDeployVault](templates.AaveCreditTemplate.md#createagreementanddeployvault)
- [createAgreementAndPay](templates.AaveCreditTemplate.md#createagreementandpay)
- [createAgreementFromDDO](templates.AaveCreditTemplate.md#createagreementfromddo)
- [createAgreementWithPaymentFromDDO](templates.AaveCreditTemplate.md#createagreementwithpaymentfromddo)
- [createService](templates.AaveCreditTemplate.md#createservice)
- [deployVault](templates.AaveCreditTemplate.md#deployvault)
- [description](templates.AaveCreditTemplate.md#description)
- [extraGen](templates.AaveCreditTemplate.md#extragen)
- [findSigner](templates.AaveCreditTemplate.md#findsigner)
- [getAddress](templates.AaveCreditTemplate.md#getaddress)
- [getAgreementCreatedEvent](templates.AaveCreditTemplate.md#getagreementcreatedevent)
- [getAgreementData](templates.AaveCreditTemplate.md#getagreementdata)
- [getAgreementDid](templates.AaveCreditTemplate.md#getagreementdid)
- [getAgreementIdsFromDDO](templates.AaveCreditTemplate.md#getagreementidsfromddo)
- [getAgreementStatus](templates.AaveCreditTemplate.md#getagreementstatus)
- [getAgreementVaultAddress](templates.AaveCreditTemplate.md#getagreementvaultaddress)
- [getAgreementsForDID](templates.AaveCreditTemplate.md#getagreementsfordid)
- [getConditionTypes](templates.AaveCreditTemplate.md#getconditiontypes)
- [getConditions](templates.AaveCreditTemplate.md#getconditions)
- [getContract](templates.AaveCreditTemplate.md#getcontract)
- [getFromAddress](templates.AaveCreditTemplate.md#getfromaddress)
- [getInputsOfMethod](templates.AaveCreditTemplate.md#getinputsofmethod)
- [getServiceAgreementTemplate](templates.AaveCreditTemplate.md#getserviceagreementtemplate)
- [getServiceAgreementTemplateConditionByRef](templates.AaveCreditTemplate.md#getserviceagreementtemplateconditionbyref)
- [getServiceAgreementTemplateConditions](templates.AaveCreditTemplate.md#getserviceagreementtemplateconditions)
- [getServiceAgreementTemplateDependencies](templates.AaveCreditTemplate.md#getserviceagreementtemplatedependencies)
- [getSignatureOfMethod](templates.AaveCreditTemplate.md#getsignatureofmethod)
- [init](templates.AaveCreditTemplate.md#init)
- [instanceFromDDO](templates.AaveCreditTemplate.md#instancefromddo)
- [lockConditionIndex](templates.AaveCreditTemplate.md#lockconditionindex)
- [lockTokens](templates.AaveCreditTemplate.md#locktokens)
- [name](templates.AaveCreditTemplate.md#name)
- [params](templates.AaveCreditTemplate.md#params)
- [paramsGen](templates.AaveCreditTemplate.md#paramsgen)
- [paymentData](templates.AaveCreditTemplate.md#paymentdata)
- [printAgreementStatus](templates.AaveCreditTemplate.md#printagreementstatus)
- [process](templates.AaveCreditTemplate.md#process)
- [send](templates.AaveCreditTemplate.md#send)
- [sendFrom](templates.AaveCreditTemplate.md#sendfrom)
- [service](templates.AaveCreditTemplate.md#service)
- [serviceEndpoint](templates.AaveCreditTemplate.md#serviceendpoint)
- [setInstanceConfig](templates.AaveCreditTemplate.md#setinstanceconfig)
- [standardContext](templates.AaveCreditTemplate.md#standardcontext)
- [validateAgreement](templates.AaveCreditTemplate.md#validateagreement)
- [addressesStatic](templates.AaveCreditTemplate.md#addressesstatic)
- [findSignerStatic](templates.AaveCreditTemplate.md#findsignerstatic)
- [getInstance](templates.AaveCreditTemplate.md#getinstance)
- [setInstanceConfig](templates.AaveCreditTemplate.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new AaveCreditTemplate**(`contractName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[constructor](templates.BaseTemplate.md#constructor)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:75](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L75)

## Properties

### aaveConfig

• **aaveConfig**: `AaveConfig`

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:52](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L52)

___

### contract

• **contract**: `Contract` = `null`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[contract](templates.BaseTemplate.md#contract)

#### Defined in

[src/keeper/contracts/ContractBase.ts:24](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L24)

___

### contractName

• **contractName**: `string`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[contractName](templates.BaseTemplate.md#contractname)

#### Defined in

[src/keeper/contracts/ContractBase.ts:23](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L23)

___

### events

• **events**: [`ContractEvent`](events.ContractEvent.md) \| [`SubgraphEvent`](events.SubgraphEvent.md) = `null`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[events](templates.BaseTemplate.md#events)

#### Defined in

[src/keeper/contracts/ContractBase.ts:25](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L25)

___

### version

• **version**: `string`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[version](templates.BaseTemplate.md#version)

#### Defined in

[src/keeper/contracts/ContractBase.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Inherited from

BaseTemplate.address

#### Defined in

[src/keeper/contracts/ContractBase.ts:28](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L28)

___

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

BaseTemplate.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

BaseTemplate.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

BaseTemplate.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

BaseTemplate.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

BaseTemplate.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

BaseTemplate.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

BaseTemplate.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L63)

## Methods

### \_createAgreement

▸ `Private` **_createAgreement**(`agreementIdSeed`, `ddo`, `vaultAddress`, `nftTokenContract`, `nftAmount`, `collateralToken`, `collateralAmount`, `delegatedToken`, `delegatedAmount`, `interestRateMode`, `timeLocks`, `timeOuts`, `txParams?`, `from?`): `Promise`<[`ContractReceipt`, [`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`AaveCreditTemplateParams`\>]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementIdSeed` | `string` |
| `ddo` | [`DDO`](DDO.md) |
| `vaultAddress` | `string` |
| `nftTokenContract` | `string` |
| `nftAmount` | `number` |
| `collateralToken` | `string` |
| `collateralAmount` | `number` |
| `delegatedToken` | `string` |
| `delegatedAmount` | `number` |
| `interestRateMode` | `number` |
| `timeLocks` | `number`[] |
| `timeOuts` | `number`[] |
| `txParams?` | `TxParameters` |
| `from?` | [`Account`](Account.md) |

#### Returns

`Promise`<[`ContractReceipt`, [`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`AaveCreditTemplateParams`\>]\>

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:102](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L102)

___

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

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:112](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L112)

___

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[addresses](templates.BaseTemplate.md#addresses)

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

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[agreementId](templates.BaseTemplate.md#agreementid)

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

[BaseTemplate](templates.BaseTemplate.md).[call](templates.BaseTemplate.md#call)

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

[BaseTemplate](templates.BaseTemplate.md).[checkExists](templates.BaseTemplate.md#checkexists)

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L44)

___

### conditions

▸ **conditions**(): [[`NFT721LockCondition`](conditions.NFT721LockCondition.md), [`AaveCollateralDepositCondition`](conditions.AaveCollateralDepositCondition.md), [`AaveBorrowCondition`](conditions.AaveBorrowCondition.md), [`AaveRepayCondition`](conditions.AaveRepayCondition.md), [`AaveCollateralWithdrawCondition`](conditions.AaveCollateralWithdrawCondition.md), [`DistributeNFTCollateralCondition`](conditions.DistributeNFTCollateralCondition.md)]

#### Returns

[[`NFT721LockCondition`](conditions.NFT721LockCondition.md), [`AaveCollateralDepositCondition`](conditions.AaveCollateralDepositCondition.md), [`AaveBorrowCondition`](conditions.AaveBorrowCondition.md), [`AaveRepayCondition`](conditions.AaveRepayCondition.md), [`AaveCollateralWithdrawCondition`](conditions.AaveCollateralWithdrawCondition.md), [`DistributeNFTCollateralCondition`](conditions.DistributeNFTCollateralCondition.md)]

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[conditions](templates.BaseTemplate.md#conditions)

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:285](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L285)

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

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L99)

___

### createAgreementAndDeployVault

▸ **createAgreementAndDeployVault**(`agreementIdSeed`, `ddo`, `nftTokenContract`, `nftAmount`, `collateralToken`, `collateralAmount`, `delegatedToken`, `delegatedAmount`, `interestRateMode`, `borrower`, `lender`, `timeLocks`, `timeOuts`, `txParams?`, `from?`): `Promise`<[`ContractReceipt`, `string`, [`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`AaveCreditTemplateParams`\>]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementIdSeed` | `string` |
| `ddo` | [`DDO`](DDO.md) |
| `nftTokenContract` | `string` |
| `nftAmount` | `number` |
| `collateralToken` | `string` |
| `collateralAmount` | `number` |
| `delegatedToken` | `string` |
| `delegatedAmount` | `number` |
| `interestRateMode` | `number` |
| `borrower` | `string` |
| `lender` | `string` |
| `timeLocks` | `number`[] |
| `timeOuts` | `number`[] |
| `txParams?` | `TxParameters` |
| `from?` | [`Account`](Account.md) |

#### Returns

`Promise`<[`ContractReceipt`, `string`, [`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`AaveCreditTemplateParams`\>]\>

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:155](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L155)

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
| `parameters` | `AaveCreditTemplateParams` |  |
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

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:225](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L225)

___

### createAgreementWithPaymentFromDDO

▸ **createAgreementWithPaymentFromDDO**(`agreementIdSeed`, `ddo`, `parameters`, `consumer`, `from`, `timeOuts?`, `txParams?`, `observer?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementIdSeed` | `string` |
| `ddo` | [`DDO`](DDO.md) |
| `parameters` | `AaveCreditTemplateParams` |
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

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:255](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L255)

___

### createService

▸ **createService**(`publisher`, `metadata`, `assetRewards?`, `erc20TokenAddress?`, `priced?`): `Promise`<`ServiceAaveCredit`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `publisher` | [`Account`](Account.md) | `undefined` |
| `metadata` | [`MetaData`](../interfaces/MetaData.md) | `undefined` |
| `assetRewards?` | `default` | `undefined` |
| `erc20TokenAddress?` | `string` | `undefined` |
| `priced` | `boolean` | `false` |

#### Returns

`Promise`<`ServiceAaveCredit`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[createService](templates.BaseTemplate.md#createservice)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:65](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L65)

___

### deployVault

▸ **deployVault**(`lendingPool`, `dataProvider`, `weth`, `agreementFee`, `treasuryAddress`, `borrower`, `lender`, `from`): `Promise`<`string`\>

Deploy a new credit vault that is required to facilitate an Aave credit agreement

#### Parameters

| Name | Type |
| :------ | :------ |
| `lendingPool` | `string` |
| `dataProvider` | `string` |
| `weth` | `string` |
| `agreementFee` | `number` |
| `treasuryAddress` | `string` |
| `borrower` | `string` |
| `lender` | `string` |
| `from` | `string` |

#### Returns

`Promise`<`string`\>

Agreement ID.

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:207](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L207)

___

### description

▸ **description**(): `string`

#### Returns

`string`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[description](templates.BaseTemplate.md#description)

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:49](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L49)

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

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:108](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L108)

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

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

___

### getAddress

▸ **getAddress**(): `string`

#### Returns

`string`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAddress](templates.BaseTemplate.md#getaddress)

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

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAgreementCreatedEvent](templates.BaseTemplate.md#getagreementcreatedevent)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:469](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L469)

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

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:21](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L21)

___

### getAgreementDid

▸ **getAgreementDid**(`agreementId`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:318](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L318)

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
| `params` | `AaveCreditTemplateParams` | - |

#### Returns

`Promise`<`string`[]\>

The condition IDs.

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAgreementIdsFromDDO](templates.BaseTemplate.md#getagreementidsfromddo)

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

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getAgreementStatus](templates.BaseTemplate.md#getagreementstatus)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:343](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L343)

___

### getAgreementVaultAddress

▸ **getAgreementVaultAddress**(`agreementId`, `from`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementId` | `string` |
| `from` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:311](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L311)

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

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:496](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L496)

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

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:163](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L163)

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

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L171)

___

### getContract

▸ **getContract**(): `Contract`

#### Returns

`Contract`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getContract](templates.BaseTemplate.md#getcontract)

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

[BaseTemplate](templates.BaseTemplate.md).[getFromAddress](templates.BaseTemplate.md#getfromaddress)

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

[BaseTemplate](templates.BaseTemplate.md).[getInputsOfMethod](templates.BaseTemplate.md#getinputsofmethod)

#### Defined in

[src/keeper/contracts/ContractBase.ts:50](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L50)

___

### getServiceAgreementTemplate

▸ **getServiceAgreementTemplate**(): `Promise`<`ServiceAgreementTemplate`\>

#### Returns

`Promise`<`ServiceAgreementTemplate`\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[getServiceAgreementTemplate](templates.BaseTemplate.md#getserviceagreementtemplate)

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:98](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L98)

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

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:324](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L324)

___

### getServiceAgreementTemplateConditions

▸ **getServiceAgreementTemplateConditions**(): `Promise`<`ServiceAgreementTemplateCondition`[]\>

#### Returns

`Promise`<`ServiceAgreementTemplateCondition`[]\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getServiceAgreementTemplateConditions](templates.BaseTemplate.md#getserviceagreementtemplateconditions)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:319](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L319)

___

### getServiceAgreementTemplateDependencies

▸ **getServiceAgreementTemplateDependencies**(): `Promise`<{ `[condition: string]`: `string`[];  }\>

#### Returns

`Promise`<{ `[condition: string]`: `string`[];  }\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[getServiceAgreementTemplateDependencies](templates.BaseTemplate.md#getserviceagreementtemplatedependencies)

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

[BaseTemplate](templates.BaseTemplate.md).[getSignatureOfMethod](templates.BaseTemplate.md#getsignatureofmethod)

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

[BaseTemplate](templates.BaseTemplate.md).[init](templates.BaseTemplate.md#init)

#### Defined in

[src/keeper/contracts/ContractBase.ts:55](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L55)

___

### instanceFromDDO

▸ **instanceFromDDO**(`agreementIdSeed`, `ddo`, `creator`, `parameters`): `Promise`<[`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`AaveCreditTemplateParams`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreementIdSeed` | `string` |
| `ddo` | [`DDO`](DDO.md) |
| `creator` | `string` |
| `parameters` | `AaveCreditTemplateParams` |

#### Returns

`Promise`<[`AgreementInstance`](../interfaces/templates.AgreementInstance.md)<`AaveCreditTemplateParams`\>\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[instanceFromDDO](templates.BaseTemplate.md#instancefromddo)

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:233](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L233)

___

### lockConditionIndex

▸ **lockConditionIndex**(): `number`

#### Returns

`number`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[lockConditionIndex](templates.BaseTemplate.md#lockconditionindex)

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

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[lockTokens](templates.BaseTemplate.md#locktokens)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:398](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L398)

___

### name

▸ **name**(): `string`

#### Returns

`string`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[name](templates.BaseTemplate.md#name)

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:46](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L46)

___

### params

▸ **params**(`vaultAddress`, `nftContractAddress`, `nftAmount`, `collateralAsset`, `collateralAmount`, `delegatedAsset`, `delegatedAmount`, `interestRateMode`): `AaveCreditTemplateParams`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultAddress` | `string` |
| `nftContractAddress` | `string` |
| `nftAmount` | `number` |
| `collateralAsset` | `string` |
| `collateralAmount` | `string` |
| `delegatedAsset` | `string` |
| `delegatedAmount` | `string` |
| `interestRateMode` | `number` |

#### Returns

`AaveCreditTemplateParams`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[params](templates.BaseTemplate.md#params)

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:71](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L71)

___

### paramsGen

▸ **paramsGen**(`_params`): `Promise`<`AaveCreditTemplateParams`\>

Specialize params

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_params` | `ValidationParams` | Generic parameters |

#### Returns

`Promise`<`AaveCreditTemplateParams`\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[paramsGen](templates.BaseTemplate.md#paramsgen)

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:43](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L43)

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

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[printAgreementStatus](templates.BaseTemplate.md#printagreementstatus)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:439](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L439)

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

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:116](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L116)

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

[BaseTemplate](templates.BaseTemplate.md).[sendFrom](templates.BaseTemplate.md#sendfrom)

#### Defined in

[src/keeper/contracts/ContractBase.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/ContractBase.ts#L97)

___

### service

▸ **service**(): `ServiceType`

#### Returns

`ServiceType`

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[service](templates.BaseTemplate.md#service)

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:67](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L67)

___

### serviceEndpoint

▸ **serviceEndpoint**(): `ServiceType`

#### Returns

`ServiceType`

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[serviceEndpoint](templates.BaseTemplate.md#serviceendpoint)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:31](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L31)

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

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[standardContext](templates.BaseTemplate.md#standardcontext)

#### Defined in

[src/keeper/contracts/templates/AgreementTemplate.abstract.ts:207](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/AgreementTemplate.abstract.ts#L207)

___

### validateAgreement

▸ **validateAgreement**(`agreement_id`, `did`, `params`, `from`, `extra?`, `txparams?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `agreement_id` | `string` |
| `did` | `string` |
| `params` | `AaveCreditTemplateParams` |
| `from` | [`Account`](Account.md) |
| `extra` | `any` |
| `txparams?` | `TxParameters` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[BaseTemplate](templates.BaseTemplate.md).[validateAgreement](templates.BaseTemplate.md#validateagreement)

#### Defined in

[src/keeper/contracts/templates/BaseTemplate.abstract.ts:131](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/templates/BaseTemplate.abstract.ts#L131)

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

[BaseTemplate](templates.BaseTemplate.md).[findSignerStatic](templates.BaseTemplate.md#findsignerstatic)

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

___

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`AaveCreditTemplate`](templates.AaveCreditTemplate.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`Promise`<[`AaveCreditTemplate`](templates.AaveCreditTemplate.md)\>

#### Overrides

[BaseTemplate](templates.BaseTemplate.md).[getInstance](templates.BaseTemplate.md#getinstance)

#### Defined in

[src/keeper/contracts/defi/AaveCreditTemplate.ts:54](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/keeper/contracts/defi/AaveCreditTemplate.ts#L54)

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

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
