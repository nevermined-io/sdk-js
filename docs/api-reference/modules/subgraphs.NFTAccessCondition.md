[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / NFTAccessCondition

# Namespace: NFTAccessCondition

[subgraphs](subgraphs.md).NFTAccessCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.NFTAccessCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.NFTAccessCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.NFTAccessCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.NFTAccessCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.NFTAccessCondition.md#initializedargs)
- [InitializedFields](subgraphs.NFTAccessCondition.md#initializedfields)
- [InitializedFilter](subgraphs.NFTAccessCondition.md#initializedfilter)
- [InitializedResult](subgraphs.NFTAccessCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.NFTAccessCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.NFTAccessCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.NFTAccessCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.NFTAccessCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.NFTAccessCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.NFTAccessCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.NFTAccessCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.NFTAccessCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.NFTAccessCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.NFTAccessCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.NFTAccessCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.NFTAccessCondition.md#getownershiptransferreds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFTAccessCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:68

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

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:61

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

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:20

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

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:54

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFTAccessCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:99

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:95

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

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:73

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:91

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

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:9

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFTAccessCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:136

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

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:131

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

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:104

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

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:126

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:1

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTAccessCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFTAccessCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFTAccessCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.NFTAccessCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTAccessCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:71

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTAccessCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFTAccessCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFTAccessCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.NFTAccessCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.NFTAccessCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.NFTAccessCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTAccessCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:72

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTAccessCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFTAccessCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFTAccessCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.NFTAccessCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTAccessCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:102

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTAccessCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFTAccessCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFTAccessCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.NFTAccessCondition.md#initializedfilter), [`InitializedResult`](subgraphs.NFTAccessCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.NFTAccessCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTAccessCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:103

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTAccessCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFTAccessCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFTAccessCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFTAccessCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTAccessCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:139

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTAccessCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFTAccessCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFTAccessCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.NFTAccessCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.NFTAccessCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFTAccessCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTAccessCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTAccessCondition.d.ts:140
