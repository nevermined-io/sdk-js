[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / EscrowPaymentCondition

# Namespace: EscrowPaymentCondition

[subgraphs](subgraphs.md).EscrowPaymentCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.EscrowPaymentCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.EscrowPaymentCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.EscrowPaymentCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.EscrowPaymentCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.EscrowPaymentCondition.md#initializedargs)
- [InitializedFields](subgraphs.EscrowPaymentCondition.md#initializedfields)
- [InitializedFilter](subgraphs.EscrowPaymentCondition.md#initializedfilter)
- [InitializedResult](subgraphs.EscrowPaymentCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.EscrowPaymentCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.EscrowPaymentCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.EscrowPaymentCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.EscrowPaymentCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.EscrowPaymentCondition.md#ownershiptransferredresult)
- [ReceivedArgs](subgraphs.EscrowPaymentCondition.md#receivedargs)
- [ReceivedFields](subgraphs.EscrowPaymentCondition.md#receivedfields)
- [ReceivedFilter](subgraphs.EscrowPaymentCondition.md#receivedfilter)
- [ReceivedResult](subgraphs.EscrowPaymentCondition.md#receivedresult)
- [SingleQueryOptions](subgraphs.EscrowPaymentCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.EscrowPaymentCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.EscrowPaymentCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.EscrowPaymentCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.EscrowPaymentCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.EscrowPaymentCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.EscrowPaymentCondition.md#getownershiptransferreds)
- [getReceivedById](subgraphs.EscrowPaymentCondition.md#getreceivedbyid)
- [getReceiveds](subgraphs.EscrowPaymentCondition.md#getreceiveds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.EscrowPaymentCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:77

___

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | ``true`` |
| `_amounts` | ``true`` |
| `_conditionId` | ``true`` |
| `_receivers` | ``true`` |
| `_tokenAddress` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:69

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
| `_amounts?` | `WeiSource`[] |
| `_amounts_contains?` | `WeiSource`[] |
| `_amounts_contains_nocase?` | `WeiSource`[] |
| `_amounts_not?` | `WeiSource`[] |
| `_amounts_not_contains?` | `WeiSource`[] |
| `_amounts_not_contains_nocase?` | `WeiSource`[] |
| `_conditionId?` | `string` \| ``null`` |
| `_conditionId_contains?` | `string` \| ``null`` |
| `_conditionId_in?` | `string`[] |
| `_conditionId_not?` | `string` \| ``null`` |
| `_conditionId_not_contains?` | `string` \| ``null`` |
| `_conditionId_not_in?` | `string`[] |
| `_receivers?` | `string`[] |
| `_receivers_contains?` | `string`[] |
| `_receivers_contains_nocase?` | `string`[] |
| `_receivers_not?` | `string`[] |
| `_receivers_not_contains?` | `string`[] |
| `_receivers_not_contains_nocase?` | `string`[] |
| `_tokenAddress?` | `string` \| ``null`` |
| `_tokenAddress_contains?` | `string` \| ``null`` |
| `_tokenAddress_in?` | `string`[] |
| `_tokenAddress_not?` | `string` \| ``null`` |
| `_tokenAddress_not_contains?` | `string` \| ``null`` |
| `_tokenAddress_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:21

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | `string` |
| `_amounts` | (`Wei` \| ``null``)[] |
| `_conditionId` | `string` |
| `_receivers` | (`string` \| ``null``)[] |
| `_tokenAddress` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:61

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.EscrowPaymentCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:108

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:104

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

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:82

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:100

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

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:145

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

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:140

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

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:113

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

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:135

___

### ReceivedArgs

Ƭ **ReceivedArgs**<`K`\>: { [Property in keyof Pick<ReceivedFields, K\>]: ReceivedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ReceivedResult`](subgraphs.EscrowPaymentCondition.md#receivedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:184

___

### ReceivedFields

Ƭ **ReceivedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_from` | ``true`` |
| `_value` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:179

___

### ReceivedFilter

Ƭ **ReceivedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_from?` | `string` \| ``null`` |
| `_from_contains?` | `string` \| ``null`` |
| `_from_in?` | `string`[] |
| `_from_not?` | `string` \| ``null`` |
| `_from_not_contains?` | `string` \| ``null`` |
| `_from_not_in?` | `string`[] |
| `_value?` | `WeiSource` \| ``null`` |
| `_value_gt?` | `WeiSource` \| ``null`` |
| `_value_gte?` | `WeiSource` \| ``null`` |
| `_value_in?` | `WeiSource`[] |
| `_value_lt?` | `WeiSource` \| ``null`` |
| `_value_lte?` | `WeiSource` \| ``null`` |
| `_value_not?` | `WeiSource` \| ``null`` |
| `_value_not_in?` | `WeiSource`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:150

___

### ReceivedResult

Ƭ **ReceivedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_from` | `string` |
| `_value` | `Wei` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:174

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:2

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.EscrowPaymentCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.EscrowPaymentCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.EscrowPaymentCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.EscrowPaymentCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.EscrowPaymentCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:80

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.EscrowPaymentCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.EscrowPaymentCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.EscrowPaymentCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.EscrowPaymentCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.EscrowPaymentCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.EscrowPaymentCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.EscrowPaymentCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:81

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.EscrowPaymentCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.EscrowPaymentCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.EscrowPaymentCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.EscrowPaymentCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.EscrowPaymentCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:111

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.EscrowPaymentCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.EscrowPaymentCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.EscrowPaymentCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.EscrowPaymentCondition.md#initializedfilter), [`InitializedResult`](subgraphs.EscrowPaymentCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.EscrowPaymentCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.EscrowPaymentCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:112

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.EscrowPaymentCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:148

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.EscrowPaymentCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.EscrowPaymentCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:149

___

### getReceivedById

▸ **getReceivedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ReceivedResult`](subgraphs.EscrowPaymentCondition.md#receivedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ReceivedResult`](subgraphs.EscrowPaymentCondition.md#receivedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.EscrowPaymentCondition.md#singlequeryoptions) |
| `args` | [`ReceivedArgs`](subgraphs.EscrowPaymentCondition.md#receivedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ReceivedResult`](subgraphs.EscrowPaymentCondition.md#receivedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:187

___

### getReceiveds

▸ **getReceiveds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ReceivedResult`](subgraphs.EscrowPaymentCondition.md#receivedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ReceivedResult`](subgraphs.EscrowPaymentCondition.md#receivedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.EscrowPaymentCondition.md#multiqueryoptions)<[`ReceivedFilter`](subgraphs.EscrowPaymentCondition.md#receivedfilter), [`ReceivedResult`](subgraphs.EscrowPaymentCondition.md#receivedresult)\> |
| `args` | [`ReceivedArgs`](subgraphs.EscrowPaymentCondition.md#receivedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ReceivedResult`](subgraphs.EscrowPaymentCondition.md#receivedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/EscrowPaymentCondition.d.ts:188
