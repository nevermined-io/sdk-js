[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / DistributeNFTCollateralCondition

# Namespace: DistributeNFTCollateralCondition

[subgraphs](subgraphs.md).DistributeNFTCollateralCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.DistributeNFTCollateralCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.DistributeNFTCollateralCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.DistributeNFTCollateralCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.DistributeNFTCollateralCondition.md#fulfilledresult)
- [MultiQueryOptions](subgraphs.DistributeNFTCollateralCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.DistributeNFTCollateralCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.DistributeNFTCollateralCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.DistributeNFTCollateralCondition.md#getfulfilleds)
- [getOwnershipTransferredById](subgraphs.DistributeNFTCollateralCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.DistributeNFTCollateralCondition.md#getownershiptransferreds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:76

___

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | ``true`` |
| `_conditionId` | ``true`` |
| `_contract` | ``true`` |
| `_did` | ``true`` |
| `_receiver` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:68

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
| `_contract?` | `string` \| ``null`` |
| `_contract_contains?` | `string` \| ``null`` |
| `_contract_in?` | `string`[] |
| `_contract_not?` | `string` \| ``null`` |
| `_contract_not_contains?` | `string` \| ``null`` |
| `_contract_not_in?` | `string`[] |
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

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:20

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | `string` |
| `_conditionId` | `string` |
| `_contract` | `string` |
| `_did` | `string` |
| `_receiver` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:60

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

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:9

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:113

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

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:108

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

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:81

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

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:103

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:1

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DistributeNFTCollateralCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:79

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DistributeNFTCollateralCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.DistributeNFTCollateralCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:80

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DistributeNFTCollateralCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:116

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DistributeNFTCollateralCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.DistributeNFTCollateralCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DistributeNFTCollateralCondition.d.ts:117
