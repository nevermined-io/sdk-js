[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / NFT721SalesWithAccessTemplate

# Namespace: NFT721SalesWithAccessTemplate

[subgraphs](subgraphs.md).NFT721SalesWithAccessTemplate

## Table of contents

### Type Aliases

- [AgreementCreatedArgs](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedargs)
- [AgreementCreatedFields](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedfields)
- [AgreementCreatedFilter](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedfilter)
- [AgreementCreatedResult](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedresult)
- [InitializedArgs](subgraphs.NFT721SalesWithAccessTemplate.md#initializedargs)
- [InitializedFields](subgraphs.NFT721SalesWithAccessTemplate.md#initializedfields)
- [InitializedFilter](subgraphs.NFT721SalesWithAccessTemplate.md#initializedfilter)
- [InitializedResult](subgraphs.NFT721SalesWithAccessTemplate.md#initializedresult)
- [MultiQueryOptions](subgraphs.NFT721SalesWithAccessTemplate.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.NFT721SalesWithAccessTemplate.md#singlequeryoptions)

### Functions

- [getAgreementCreatedById](subgraphs.NFT721SalesWithAccessTemplate.md#getagreementcreatedbyid)
- [getAgreementCreateds](subgraphs.NFT721SalesWithAccessTemplate.md#getagreementcreateds)
- [getInitializedById](subgraphs.NFT721SalesWithAccessTemplate.md#getinitializedbyid)
- [getInitializeds](subgraphs.NFT721SalesWithAccessTemplate.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.NFT721SalesWithAccessTemplate.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.NFT721SalesWithAccessTemplate.md#getownershiptransferreds)

## Type Aliases

### AgreementCreatedArgs

Ƭ **AgreementCreatedArgs**<`K`\>: { [Property in keyof Pick<AgreementCreatedFields, K\>]: AgreementCreatedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`AgreementCreatedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:117

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

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:104

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

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:21

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

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:91

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:148

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:144

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

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:122

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:140

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

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:185

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

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:180

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

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:153

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

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:175

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:2

## Functions

### getAgreementCreatedById

▸ **getAgreementCreatedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`AgreementCreatedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`AgreementCreatedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721SalesWithAccessTemplate.md#singlequeryoptions) |
| `args` | [`AgreementCreatedArgs`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`AgreementCreatedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:120

___

### getAgreementCreateds

▸ **getAgreementCreateds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`AgreementCreatedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`AgreementCreatedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721SalesWithAccessTemplate.md#multiqueryoptions)<[`AgreementCreatedFilter`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedfilter), [`AgreementCreatedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedresult)\> |
| `args` | [`AgreementCreatedArgs`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`AgreementCreatedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#agreementcreatedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:121

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721SalesWithAccessTemplate.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:151

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721SalesWithAccessTemplate.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedfilter), [`InitializedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721SalesWithAccessTemplate.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:152

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721SalesWithAccessTemplate.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:188

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721SalesWithAccessTemplate.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721SalesWithAccessTemplate.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721SalesWithAccessTemplate.d.ts:189
