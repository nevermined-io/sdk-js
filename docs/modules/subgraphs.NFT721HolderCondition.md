[@nevermined-io/nevermined-sdk-js](../README.md) / [Exports](../modules.md) / [subgraphs](subgraphs.md) / NFT721HolderCondition

# Namespace: NFT721HolderCondition

[subgraphs](subgraphs.md).NFT721HolderCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.NFT721HolderCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.NFT721HolderCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.NFT721HolderCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.NFT721HolderCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.NFT721HolderCondition.md#initializedargs)
- [InitializedFields](subgraphs.NFT721HolderCondition.md#initializedfields)
- [InitializedFilter](subgraphs.NFT721HolderCondition.md#initializedfilter)
- [InitializedResult](subgraphs.NFT721HolderCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.NFT721HolderCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.NFT721HolderCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.NFT721HolderCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.NFT721HolderCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.NFT721HolderCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.NFT721HolderCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.NFT721HolderCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.NFT721HolderCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.NFT721HolderCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.NFT721HolderCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.NFT721HolderCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.NFT721HolderCondition.md#getownershiptransferreds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFT721HolderCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:79

___

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_address` | ``true`` |
| `_agreementId` | ``true`` |
| `_amount` | ``true`` |
| `_conditionId` | ``true`` |
| `_did` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:71

___

### FulfilledFilter

Ƭ **FulfilledFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_address?` | `string` \| ``null`` |
| `_address_contains?` | `string` \| ``null`` |
| `_address_in?` | `string`[] |
| `_address_not?` | `string` \| ``null`` |
| `_address_not_contains?` | `string` \| ``null`` |
| `_address_not_in?` | `string`[] |
| `_agreementId?` | `string` \| ``null`` |
| `_agreementId_contains?` | `string` \| ``null`` |
| `_agreementId_in?` | `string`[] |
| `_agreementId_not?` | `string` \| ``null`` |
| `_agreementId_not_contains?` | `string` \| ``null`` |
| `_agreementId_not_in?` | `string`[] |
| `_amount?` | `WeiSource` \| ``null`` |
| `_amount_gt?` | `WeiSource` \| ``null`` |
| `_amount_gte?` | `WeiSource` \| ``null`` |
| `_amount_in?` | `WeiSource`[] |
| `_amount_lt?` | `WeiSource` \| ``null`` |
| `_amount_lte?` | `WeiSource` \| ``null`` |
| `_amount_not?` | `WeiSource` \| ``null`` |
| `_amount_not_in?` | `WeiSource`[] |
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

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:21

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_address` | `string` |
| `_agreementId` | `string` |
| `_amount` | `Wei` |
| `_conditionId` | `string` |
| `_did` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:63

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721HolderCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:110

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:106

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

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:84

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:102

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

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721HolderCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:147

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

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:142

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

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:115

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

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:137

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:2

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721HolderCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFT721HolderCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721HolderCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.NFT721HolderCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721HolderCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:82

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721HolderCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFT721HolderCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721HolderCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.NFT721HolderCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.NFT721HolderCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.NFT721HolderCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721HolderCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:83

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721HolderCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721HolderCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721HolderCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.NFT721HolderCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721HolderCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:113

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721HolderCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721HolderCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721HolderCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.NFT721HolderCondition.md#initializedfilter), [`InitializedResult`](subgraphs.NFT721HolderCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.NFT721HolderCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721HolderCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:114

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721HolderCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721HolderCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721HolderCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFT721HolderCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721HolderCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:150

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721HolderCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721HolderCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721HolderCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.NFT721HolderCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.NFT721HolderCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFT721HolderCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721HolderCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721HolderCondition.d.ts:151
