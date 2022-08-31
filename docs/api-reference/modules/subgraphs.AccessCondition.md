[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / AccessCondition

# Namespace: AccessCondition

[subgraphs](subgraphs.md).AccessCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.AccessCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.AccessCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.AccessCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.AccessCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.AccessCondition.md#initializedargs)
- [InitializedFields](subgraphs.AccessCondition.md#initializedfields)
- [InitializedFilter](subgraphs.AccessCondition.md#initializedfilter)
- [InitializedResult](subgraphs.AccessCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.AccessCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.AccessCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.AccessCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.AccessCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.AccessCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.AccessCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.AccessCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.AccessCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.AccessCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.AccessCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.AccessCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.AccessCondition.md#getownershiptransferreds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.AccessCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:68

___

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | ``true`` |
| `_conditionId` | ``true`` |
| `_documentId` | ``true`` |
| `_grantee` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:61

___

### FulfilledFilter

Ƭ **FulfilledFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId?` | `string` \| ``null`` |
| `_agreementId_contains?` | `string` \| ``null`` |
| `_agreementId_in?` | `string`[] |
| `_agreementId_not?` | `string` \| ``null`` |
| `_agreementId_not_contains?` | `string` \| ``null`` |
| `_agreementId_not_in?` | `string`[] |
| `_conditionId?` | `string` \| ``null`` |
| `_conditionId_contains?` | `string` \| ``null`` |
| `_conditionId_in?` | `string`[] |
| `_conditionId_not?` | `string` \| ``null`` |
| `_conditionId_not_contains?` | `string` \| ``null`` |
| `_conditionId_not_in?` | `string`[] |
| `_documentId?` | `string` \| ``null`` |
| `_documentId_contains?` | `string` \| ``null`` |
| `_documentId_in?` | `string`[] |
| `_documentId_not?` | `string` \| ``null`` |
| `_documentId_not_contains?` | `string` \| ``null`` |
| `_documentId_not_in?` | `string`[] |
| `_grantee?` | `string` \| ``null`` |
| `_grantee_contains?` | `string` \| ``null`` |
| `_grantee_in?` | `string`[] |
| `_grantee_not?` | `string` \| ``null`` |
| `_grantee_not_contains?` | `string` \| ``null`` |
| `_grantee_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:20

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | `string` |
| `_conditionId` | `string` |
| `_documentId` | `string` |
| `_grantee` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:54

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AccessCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:99

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:95

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

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:73

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:91

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

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:9

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AccessCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:136

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

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:131

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

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:104

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

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:126

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:1

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.AccessCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.AccessCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AccessCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.AccessCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.AccessCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:71

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.AccessCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.AccessCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AccessCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.AccessCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.AccessCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.AccessCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.AccessCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:72

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AccessCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AccessCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.AccessCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:102

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AccessCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AccessCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.AccessCondition.md#initializedfilter), [`InitializedResult`](subgraphs.AccessCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.AccessCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:103

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AccessCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AccessCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.AccessCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:139

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AccessCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AccessCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.AccessCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.AccessCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.AccessCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessCondition.d.ts:140
