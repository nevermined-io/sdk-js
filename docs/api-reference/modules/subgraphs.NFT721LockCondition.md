[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / NFT721LockCondition

# Namespace: NFT721LockCondition

[subgraphs](subgraphs.md).NFT721LockCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.NFT721LockCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.NFT721LockCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.NFT721LockCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.NFT721LockCondition.md#fulfilledresult)
- [MultiQueryOptions](subgraphs.NFT721LockCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.NFT721LockCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.NFT721LockCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.NFT721LockCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.NFT721LockCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.NFT721LockCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.NFT721LockCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.NFT721LockCondition.md#getfulfilleds)
- [getOwnershipTransferredById](subgraphs.NFT721LockCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.NFT721LockCondition.md#getownershiptransferreds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFT721LockCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:87

___

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | ``true`` |
| `_amount` | ``true`` |
| `_conditionId` | ``true`` |
| `_did` | ``true`` |
| `_lockAddress` | ``true`` |
| `_nftContractAddress` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:78

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
| `_lockAddress?` | `string` \| ``null`` |
| `_lockAddress_contains?` | `string` \| ``null`` |
| `_lockAddress_in?` | `string`[] |
| `_lockAddress_not?` | `string` \| ``null`` |
| `_lockAddress_not_contains?` | `string` \| ``null`` |
| `_lockAddress_not_in?` | `string`[] |
| `_nftContractAddress?` | `string` \| ``null`` |
| `_nftContractAddress_contains?` | `string` \| ``null`` |
| `_nftContractAddress_in?` | `string`[] |
| `_nftContractAddress_not?` | `string` \| ``null`` |
| `_nftContractAddress_not_contains?` | `string` \| ``null`` |
| `_nftContractAddress_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:21

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | `string` |
| `_amount` | `Wei` |
| `_conditionId` | `string` |
| `_did` | `string` |
| `_lockAddress` | `string` |
| `_nftContractAddress` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:69

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

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721LockCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:124

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

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:119

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

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:92

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

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:114

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:2

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721LockCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFT721LockCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721LockCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.NFT721LockCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721LockCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:90

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721LockCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFT721LockCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721LockCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.NFT721LockCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.NFT721LockCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.NFT721LockCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721LockCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:91

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721LockCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721LockCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721LockCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFT721LockCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721LockCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:127

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721LockCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721LockCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721LockCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.NFT721LockCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.NFT721LockCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFT721LockCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721LockCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721LockCondition.d.ts:128
