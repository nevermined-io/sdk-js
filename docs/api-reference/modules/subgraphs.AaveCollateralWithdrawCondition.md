[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / AaveCollateralWithdrawCondition

# Namespace: AaveCollateralWithdrawCondition

[subgraphs](subgraphs.md).AaveCollateralWithdrawCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.AaveCollateralWithdrawCondition.md#initializedargs)
- [InitializedFields](subgraphs.AaveCollateralWithdrawCondition.md#initializedfields)
- [InitializedFilter](subgraphs.AaveCollateralWithdrawCondition.md#initializedfilter)
- [InitializedResult](subgraphs.AaveCollateralWithdrawCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.AaveCollateralWithdrawCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.AaveCollateralWithdrawCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.AaveCollateralWithdrawCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.AaveCollateralWithdrawCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.AaveCollateralWithdrawCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.AaveCollateralWithdrawCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.AaveCollateralWithdrawCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.AaveCollateralWithdrawCondition.md#getownershiptransferreds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:60

___

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | ``true`` |
| `_conditionId` | ``true`` |
| `_did` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:54

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
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:20

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | `string` |
| `_conditionId` | `string` |
| `_did` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:48

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AaveCollateralWithdrawCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:91

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:87

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

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:65

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:83

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

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:9

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:128

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

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:123

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

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:96

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

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:118

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:1

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AaveCollateralWithdrawCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:63

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AaveCollateralWithdrawCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.AaveCollateralWithdrawCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:64

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.AaveCollateralWithdrawCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AaveCollateralWithdrawCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AaveCollateralWithdrawCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.AaveCollateralWithdrawCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.AaveCollateralWithdrawCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:94

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.AaveCollateralWithdrawCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AaveCollateralWithdrawCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AaveCollateralWithdrawCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.AaveCollateralWithdrawCondition.md#initializedfilter), [`InitializedResult`](subgraphs.AaveCollateralWithdrawCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.AaveCollateralWithdrawCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.AaveCollateralWithdrawCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:95

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AaveCollateralWithdrawCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:131

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AaveCollateralWithdrawCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AaveCollateralWithdrawCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AaveCollateralWithdrawCondition.d.ts:132
