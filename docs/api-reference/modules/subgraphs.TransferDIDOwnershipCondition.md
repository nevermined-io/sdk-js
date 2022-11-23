[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / TransferDIDOwnershipCondition

# Namespace: TransferDIDOwnershipCondition

[subgraphs](subgraphs.md).TransferDIDOwnershipCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.TransferDIDOwnershipCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.TransferDIDOwnershipCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.TransferDIDOwnershipCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.TransferDIDOwnershipCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.TransferDIDOwnershipCondition.md#initializedargs)
- [InitializedFields](subgraphs.TransferDIDOwnershipCondition.md#initializedfields)
- [InitializedFilter](subgraphs.TransferDIDOwnershipCondition.md#initializedfilter)
- [InitializedResult](subgraphs.TransferDIDOwnershipCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.TransferDIDOwnershipCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.TransferDIDOwnershipCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.TransferDIDOwnershipCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.TransferDIDOwnershipCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.TransferDIDOwnershipCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.TransferDIDOwnershipCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.TransferDIDOwnershipCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.TransferDIDOwnershipCondition.md#getownershiptransferreds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:68

___

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | ``true`` |
| `_conditionId` | ``true`` |
| `_did` | ``true`` |
| `_receiver` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:61

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
| `_receiver?` | `string` \| ``null`` |
| `_receiver_contains?` | `string` \| ``null`` |
| `_receiver_in?` | `string`[] |
| `_receiver_not?` | `string` \| ``null`` |
| `_receiver_not_contains?` | `string` \| ``null`` |
| `_receiver_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:20

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | `string` |
| `_conditionId` | `string` |
| `_did` | `string` |
| `_receiver` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:54

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.TransferDIDOwnershipCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:99

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:95

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

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:73

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:91

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

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:9

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:136

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

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:131

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

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:104

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

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:126

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:1

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferDIDOwnershipCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:71

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferDIDOwnershipCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferDIDOwnershipCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:72

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferDIDOwnershipCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.TransferDIDOwnershipCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferDIDOwnershipCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.TransferDIDOwnershipCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferDIDOwnershipCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:102

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferDIDOwnershipCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.TransferDIDOwnershipCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferDIDOwnershipCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.TransferDIDOwnershipCondition.md#initializedfilter), [`InitializedResult`](subgraphs.TransferDIDOwnershipCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.TransferDIDOwnershipCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferDIDOwnershipCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:103

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferDIDOwnershipCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:139

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferDIDOwnershipCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferDIDOwnershipCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferDIDOwnershipCondition.d.ts:140
