[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / WhitelistingCondition

# Namespace: WhitelistingCondition

[subgraphs](subgraphs.md).WhitelistingCondition

## Table of contents

### Type Aliases

- [InitializedArgs](subgraphs.WhitelistingCondition.md#initializedargs)
- [InitializedFields](subgraphs.WhitelistingCondition.md#initializedfields)
- [InitializedFilter](subgraphs.WhitelistingCondition.md#initializedfilter)
- [InitializedResult](subgraphs.WhitelistingCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.WhitelistingCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.WhitelistingCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.WhitelistingCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.WhitelistingCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.WhitelistingCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.WhitelistingCondition.md#singlequeryoptions)

### Functions

- [getInitializedById](subgraphs.WhitelistingCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.WhitelistingCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.WhitelistingCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.WhitelistingCondition.md#getownershiptransferreds)

## Type Aliases

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.WhitelistingCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:46

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:42

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

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:20

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:38

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

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:9

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.WhitelistingCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:83

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

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:78

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

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:51

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

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:73

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:1

## Functions

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.WhitelistingCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.WhitelistingCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.WhitelistingCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.WhitelistingCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.WhitelistingCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:49

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.WhitelistingCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.WhitelistingCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.WhitelistingCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.WhitelistingCondition.md#initializedfilter), [`InitializedResult`](subgraphs.WhitelistingCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.WhitelistingCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.WhitelistingCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:50

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.WhitelistingCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.WhitelistingCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.WhitelistingCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.WhitelistingCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.WhitelistingCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:86

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.WhitelistingCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.WhitelistingCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.WhitelistingCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.WhitelistingCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.WhitelistingCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.WhitelistingCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.WhitelistingCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/WhitelistingCondition.d.ts:87
