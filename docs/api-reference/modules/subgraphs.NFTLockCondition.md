[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / NFTLockCondition

# Namespace: NFTLockCondition

[subgraphs](subgraphs.md).NFTLockCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.NFTLockCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.NFTLockCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.NFTLockCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.NFTLockCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.NFTLockCondition.md#initializedargs)
- [InitializedFields](subgraphs.NFTLockCondition.md#initializedfields)
- [InitializedFilter](subgraphs.NFTLockCondition.md#initializedfilter)
- [InitializedResult](subgraphs.NFTLockCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.NFTLockCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.NFTLockCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.NFTLockCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.NFTLockCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.NFTLockCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.NFTLockCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.NFTLockCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.NFTLockCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.NFTLockCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.NFTLockCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.NFTLockCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.NFTLockCondition.md#getownershiptransferreds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFTLockCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:95

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
| `_receiver` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:85

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

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:21

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
| `_receiver` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:75

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFTLockCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:126

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:122

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

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:100

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:118

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

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFTLockCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:163

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

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:158

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

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:131

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

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:153

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:2

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTLockCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFTLockCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFTLockCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.NFTLockCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTLockCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:98

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTLockCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFTLockCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFTLockCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.NFTLockCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.NFTLockCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.NFTLockCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTLockCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:99

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTLockCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFTLockCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFTLockCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.NFTLockCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTLockCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:129

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTLockCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFTLockCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFTLockCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.NFTLockCondition.md#initializedfilter), [`InitializedResult`](subgraphs.NFTLockCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.NFTLockCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTLockCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:130

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTLockCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFTLockCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFTLockCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFTLockCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTLockCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:166

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTLockCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFTLockCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFTLockCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.NFTLockCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.NFTLockCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFTLockCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTLockCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTLockCondition.d.ts:167
