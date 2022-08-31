[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / AccessProofCondition

# Namespace: AccessProofCondition

[subgraphs](subgraphs.md).AccessProofCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.AccessProofCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.AccessProofCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.AccessProofCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.AccessProofCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.AccessProofCondition.md#initializedargs)
- [InitializedFields](subgraphs.AccessProofCondition.md#initializedfields)
- [InitializedFilter](subgraphs.AccessProofCondition.md#initializedfilter)
- [InitializedResult](subgraphs.AccessProofCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.AccessProofCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.AccessProofCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.AccessProofCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.AccessProofCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.AccessProofCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.AccessProofCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.AccessProofCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.AccessProofCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.AccessProofCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.AccessProofCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.AccessProofCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.AccessProofCondition.md#getownershiptransferreds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.AccessProofCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:95

___

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | ``true`` |
| `_buyer` | ``true`` |
| `_cipher` | ``true`` |
| `_conditionId` | ``true`` |
| `_origHash` | ``true`` |
| `_proof` | ``true`` |
| `_provider` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:85

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
| `_buyer?` | `WeiSource`[] |
| `_buyer_contains?` | `WeiSource`[] |
| `_buyer_contains_nocase?` | `WeiSource`[] |
| `_buyer_not?` | `WeiSource`[] |
| `_buyer_not_contains?` | `WeiSource`[] |
| `_buyer_not_contains_nocase?` | `WeiSource`[] |
| `_cipher?` | `WeiSource`[] |
| `_cipher_contains?` | `WeiSource`[] |
| `_cipher_contains_nocase?` | `WeiSource`[] |
| `_cipher_not?` | `WeiSource`[] |
| `_cipher_not_contains?` | `WeiSource`[] |
| `_cipher_not_contains_nocase?` | `WeiSource`[] |
| `_conditionId?` | `string` \| ``null`` |
| `_conditionId_contains?` | `string` \| ``null`` |
| `_conditionId_in?` | `string`[] |
| `_conditionId_not?` | `string` \| ``null`` |
| `_conditionId_not_contains?` | `string` \| ``null`` |
| `_conditionId_not_in?` | `string`[] |
| `_origHash?` | `WeiSource` \| ``null`` |
| `_origHash_gt?` | `WeiSource` \| ``null`` |
| `_origHash_gte?` | `WeiSource` \| ``null`` |
| `_origHash_in?` | `WeiSource`[] |
| `_origHash_lt?` | `WeiSource` \| ``null`` |
| `_origHash_lte?` | `WeiSource` \| ``null`` |
| `_origHash_not?` | `WeiSource` \| ``null`` |
| `_origHash_not_in?` | `WeiSource`[] |
| `_proof?` | `string` \| ``null`` |
| `_proof_contains?` | `string` \| ``null`` |
| `_proof_in?` | `string`[] |
| `_proof_not?` | `string` \| ``null`` |
| `_proof_not_contains?` | `string` \| ``null`` |
| `_proof_not_in?` | `string`[] |
| `_provider?` | `WeiSource`[] |
| `_provider_contains?` | `WeiSource`[] |
| `_provider_contains_nocase?` | `WeiSource`[] |
| `_provider_not?` | `WeiSource`[] |
| `_provider_not_contains?` | `WeiSource`[] |
| `_provider_not_contains_nocase?` | `WeiSource`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:21

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | `string` |
| `_buyer` | (`Wei` \| ``null``)[] |
| `_cipher` | (`Wei` \| ``null``)[] |
| `_conditionId` | `string` |
| `_origHash` | `Wei` |
| `_proof` | `string` |
| `_provider` | (`Wei` \| ``null``)[] |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:75

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AccessProofCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:126

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:122

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

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:100

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:118

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

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AccessProofCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:163

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

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:158

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

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:131

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

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:153

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:2

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.AccessProofCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.AccessProofCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AccessProofCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.AccessProofCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.AccessProofCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:98

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.AccessProofCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.AccessProofCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AccessProofCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.AccessProofCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.AccessProofCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.AccessProofCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.AccessProofCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:99

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessProofCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AccessProofCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AccessProofCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.AccessProofCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessProofCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:129

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessProofCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AccessProofCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AccessProofCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.AccessProofCondition.md#initializedfilter), [`InitializedResult`](subgraphs.AccessProofCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.AccessProofCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.AccessProofCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:130

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessProofCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AccessProofCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AccessProofCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.AccessProofCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessProofCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:166

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessProofCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AccessProofCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AccessProofCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.AccessProofCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.AccessProofCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.AccessProofCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AccessProofCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AccessProofCondition.d.ts:167
