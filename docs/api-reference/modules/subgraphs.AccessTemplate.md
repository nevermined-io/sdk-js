[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / AccessTemplate

# Namespace: AccessTemplate

[subgraphs](subgraphs.md).AccessTemplate

## Table of contents

### Type Aliases

- [AgreementCreatedArgs](subgraphs.AccessTemplate.md#agreementcreatedargs)
- [AgreementCreatedFields](subgraphs.AccessTemplate.md#agreementcreatedfields)
- [AgreementCreatedFilter](subgraphs.AccessTemplate.md#agreementcreatedfilter)
- [AgreementCreatedResult](subgraphs.AccessTemplate.md#agreementcreatedresult)
- [InitializedArgs](subgraphs.AccessTemplate.md#initializedargs)
- [InitializedFields](subgraphs.AccessTemplate.md#initializedfields)
- [InitializedFilter](subgraphs.AccessTemplate.md#initializedfilter)
- [InitializedResult](subgraphs.AccessTemplate.md#initializedresult)
- [MultiQueryOptions](subgraphs.AccessTemplate.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.AccessTemplate.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.AccessTemplate.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.AccessTemplate.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.AccessTemplate.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.AccessTemplate.md#singlequeryoptions)

### Functions

- [getAgreementCreatedById](subgraphs.AccessTemplate.md#getagreementcreatedbyid)
- [getAgreementCreateds](subgraphs.AccessTemplate.md#getagreementcreateds)
- [getInitializedById](subgraphs.AccessTemplate.md#getinitializedbyid)
- [getInitializeds](subgraphs.AccessTemplate.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.AccessTemplate.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.AccessTemplate.md#getownershiptransferreds)

## Type Aliases

### AgreementCreatedArgs

Ƭ **AgreementCreatedArgs**<`K`\>: { [Property in keyof Pick<AgreementCreatedFields, K\>]: AgreementCreatedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`AgreementCreatedResult`](subgraphs.AccessTemplate.md#agreementcreatedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:117

___

### AgreementCreatedFields

Ƭ **AgreementCreatedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_accessConsumer` | ``true`` |
| `_accessProvider` | ``true`` |
| `_agreementId` | ``true`` |
| `_conditionIdSeeds` | ``true`` |
| `_conditionIds` | ``true`` |
| `_creator` | ``true`` |
| `_did` | ``true`` |
| `_idSeed` | ``true`` |
| `_timeLocks` | ``true`` |
| `_timeOuts` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:104

___

### AgreementCreatedFilter

Ƭ **AgreementCreatedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_accessConsumer?` | `string` \| ``null`` |
| `_accessConsumer_contains?` | `string` \| ``null`` |
| `_accessConsumer_in?` | `string`[] |
| `_accessConsumer_not?` | `string` \| ``null`` |
| `_accessConsumer_not_contains?` | `string` \| ``null`` |
| `_accessConsumer_not_in?` | `string`[] |
| `_accessProvider?` | `string` \| ``null`` |
| `_accessProvider_contains?` | `string` \| ``null`` |
| `_accessProvider_in?` | `string`[] |
| `_accessProvider_not?` | `string` \| ``null`` |
| `_accessProvider_not_contains?` | `string` \| ``null`` |
| `_accessProvider_not_in?` | `string`[] |
| `_agreementId?` | `string` \| ``null`` |
| `_agreementId_contains?` | `string` \| ``null`` |
| `_agreementId_in?` | `string`[] |
| `_agreementId_not?` | `string` \| ``null`` |
| `_agreementId_not_contains?` | `string` \| ``null`` |
| `_agreementId_not_in?` | `string`[] |
| `_conditionIdSeeds?` | `string`[] |
| `_conditionIdSeeds_contains?` | `string`[] |
| `_conditionIdSeeds_contains_nocase?` | `string`[] |
| `_conditionIdSeeds_not?` | `string`[] |
| `_conditionIdSeeds_not_contains?` | `string`[] |
| `_conditionIdSeeds_not_contains_nocase?` | `string`[] |
| `_conditionIds?` | `string`[] |
| `_conditionIds_contains?` | `string`[] |
| `_conditionIds_contains_nocase?` | `string`[] |
| `_conditionIds_not?` | `string`[] |
| `_conditionIds_not_contains?` | `string`[] |
| `_conditionIds_not_contains_nocase?` | `string`[] |
| `_creator?` | `string` \| ``null`` |
| `_creator_contains?` | `string` \| ``null`` |
| `_creator_in?` | `string`[] |
| `_creator_not?` | `string` \| ``null`` |
| `_creator_not_contains?` | `string` \| ``null`` |
| `_creator_not_in?` | `string`[] |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `_idSeed?` | `string` \| ``null`` |
| `_idSeed_contains?` | `string` \| ``null`` |
| `_idSeed_in?` | `string`[] |
| `_idSeed_not?` | `string` \| ``null`` |
| `_idSeed_not_contains?` | `string` \| ``null`` |
| `_idSeed_not_in?` | `string`[] |
| `_timeLocks?` | `WeiSource`[] |
| `_timeLocks_contains?` | `WeiSource`[] |
| `_timeLocks_contains_nocase?` | `WeiSource`[] |
| `_timeLocks_not?` | `WeiSource`[] |
| `_timeLocks_not_contains?` | `WeiSource`[] |
| `_timeLocks_not_contains_nocase?` | `WeiSource`[] |
| `_timeOuts?` | `WeiSource`[] |
| `_timeOuts_contains?` | `WeiSource`[] |
| `_timeOuts_contains_nocase?` | `WeiSource`[] |
| `_timeOuts_not?` | `WeiSource`[] |
| `_timeOuts_not_contains?` | `WeiSource`[] |
| `_timeOuts_not_contains_nocase?` | `WeiSource`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:21

___

### AgreementCreatedResult

Ƭ **AgreementCreatedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_accessConsumer` | `string` |
| `_accessProvider` | `string` |
| `_agreementId` | `string` |
| `_conditionIdSeeds` | (`string` \| ``null``)[] |
| `_conditionIds` | (`string` \| ``null``)[] |
| `_creator` | `string` |
| `_did` | `string` |
| `_idSeed` | `string` |
| `_timeLocks` | (`Wei` \| ``null``)[] |
| `_timeOuts` | (`Wei` \| ``null``)[] |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:91

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AccessTemplate.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:148

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:144

___

### InitializedFilter

Ƭ **InitializedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `version?` | `number` \| ``null`` |
| `version_gt?` | `number` \| ``null`` |
| `version_gte?` | `number` \| ``null`` |
| `version_in?` | `number`[] |
| `version_lt?` | `number` \| ``null`` |
| `version_lte?` | `number` \| ``null`` |
| `version_not?` | `number` \| ``null`` |
| `version_not_in?` | `number`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:122

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:140

___

### MultiQueryOptions

Ƭ **MultiQueryOptions**<`T`, `R`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |
| `R` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `first?` | `number` |
| `orderBy?` | keyof `R` |
| `orderDirection?` | ``"asc"`` \| ``"desc"`` |
| `where?` | `T` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AccessTemplate.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:185

___

### OwnershipTransferredFields

Ƭ **OwnershipTransferredFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `newOwner` | ``true`` |
| `previousOwner` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:180

___

### OwnershipTransferredFilter

Ƭ **OwnershipTransferredFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `newOwner?` | `string` \| ``null`` |
| `newOwner_contains?` | `string` \| ``null`` |
| `newOwner_in?` | `string`[] |
| `newOwner_not?` | `string` \| ``null`` |
| `newOwner_not_contains?` | `string` \| ``null`` |
| `newOwner_not_in?` | `string`[] |
| `previousOwner?` | `string` \| ``null`` |
| `previousOwner_contains?` | `string` \| ``null`` |
| `previousOwner_in?` | `string`[] |
| `previousOwner_not?` | `string` \| ``null`` |
| `previousOwner_not_contains?` | `string` \| ``null`` |
| `previousOwner_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:153

___

### OwnershipTransferredResult

Ƭ **OwnershipTransferredResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `newOwner` | `string` |
| `previousOwner` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:175

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:2

## Functions

### getAgreementCreatedById

▸ **getAgreementCreatedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`AgreementCreatedResult`](subgraphs.AccessTemplate.md#agreementcreatedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`AgreementCreatedResult`](subgraphs.AccessTemplate.md#agreementcreatedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AccessTemplate.md#singlequeryoptions) |
| `args` | [`AgreementCreatedArgs`](subgraphs.AccessTemplate.md#agreementcreatedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`AgreementCreatedResult`](subgraphs.AccessTemplate.md#agreementcreatedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:120

___

### getAgreementCreateds

▸ **getAgreementCreateds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`AgreementCreatedResult`](subgraphs.AccessTemplate.md#agreementcreatedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`AgreementCreatedResult`](subgraphs.AccessTemplate.md#agreementcreatedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AccessTemplate.md#multiqueryoptions)<[`AgreementCreatedFilter`](subgraphs.AccessTemplate.md#agreementcreatedfilter), [`AgreementCreatedResult`](subgraphs.AccessTemplate.md#agreementcreatedresult)\> |
| `args` | [`AgreementCreatedArgs`](subgraphs.AccessTemplate.md#agreementcreatedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`AgreementCreatedResult`](subgraphs.AccessTemplate.md#agreementcreatedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:121

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessTemplate.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AccessTemplate.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AccessTemplate.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.AccessTemplate.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessTemplate.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:151

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessTemplate.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AccessTemplate.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AccessTemplate.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.AccessTemplate.md#initializedfilter), [`InitializedResult`](subgraphs.AccessTemplate.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.AccessTemplate.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessTemplate.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:152

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessTemplate.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AccessTemplate.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AccessTemplate.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.AccessTemplate.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessTemplate.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:188

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessTemplate.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AccessTemplate.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AccessTemplate.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.AccessTemplate.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.AccessTemplate.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.AccessTemplate.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessTemplate.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessTemplate.d.ts:189
