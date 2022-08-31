[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / Dispenser

# Namespace: Dispenser

[subgraphs](subgraphs.md).Dispenser

## Table of contents

### Type Aliases

- [InitializedArgs](subgraphs.Dispenser.md#initializedargs)
- [InitializedFields](subgraphs.Dispenser.md#initializedfields)
- [InitializedFilter](subgraphs.Dispenser.md#initializedfilter)
- [InitializedResult](subgraphs.Dispenser.md#initializedresult)
- [MultiQueryOptions](subgraphs.Dispenser.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.Dispenser.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.Dispenser.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.Dispenser.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.Dispenser.md#ownershiptransferredresult)
- [RequestFrequencyExceededArgs](subgraphs.Dispenser.md#requestfrequencyexceededargs)
- [RequestFrequencyExceededFields](subgraphs.Dispenser.md#requestfrequencyexceededfields)
- [RequestFrequencyExceededFilter](subgraphs.Dispenser.md#requestfrequencyexceededfilter)
- [RequestFrequencyExceededResult](subgraphs.Dispenser.md#requestfrequencyexceededresult)
- [RequestLimitExceededArgs](subgraphs.Dispenser.md#requestlimitexceededargs)
- [RequestLimitExceededFields](subgraphs.Dispenser.md#requestlimitexceededfields)
- [RequestLimitExceededFilter](subgraphs.Dispenser.md#requestlimitexceededfilter)
- [RequestLimitExceededResult](subgraphs.Dispenser.md#requestlimitexceededresult)
- [SingleQueryOptions](subgraphs.Dispenser.md#singlequeryoptions)

### Functions

- [getInitializedById](subgraphs.Dispenser.md#getinitializedbyid)
- [getInitializeds](subgraphs.Dispenser.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.Dispenser.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.Dispenser.md#getownershiptransferreds)
- [getRequestFrequencyExceededById](subgraphs.Dispenser.md#getrequestfrequencyexceededbyid)
- [getRequestFrequencyExceededs](subgraphs.Dispenser.md#getrequestfrequencyexceededs)
- [getRequestLimitExceededById](subgraphs.Dispenser.md#getrequestlimitexceededbyid)
- [getRequestLimitExceededs](subgraphs.Dispenser.md#getrequestlimitexceededs)

## Type Aliases

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.Dispenser.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:47

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:43

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

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:21

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:39

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

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.Dispenser.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:84

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

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:79

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

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:52

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

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:74

___

### RequestFrequencyExceededArgs

Ƭ **RequestFrequencyExceededArgs**<`K`\>: { [Property in keyof Pick<RequestFrequencyExceededFields, K\>]: RequestFrequencyExceededFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RequestFrequencyExceededResult`](subgraphs.Dispenser.md#requestfrequencyexceededresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:123

___

### RequestFrequencyExceededFields

Ƭ **RequestFrequencyExceededFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `minPeriod` | ``true`` |
| `requester` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:118

___

### RequestFrequencyExceededFilter

Ƭ **RequestFrequencyExceededFilter**: `Object`

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
| `minPeriod?` | `WeiSource` \| ``null`` |
| `minPeriod_gt?` | `WeiSource` \| ``null`` |
| `minPeriod_gte?` | `WeiSource` \| ``null`` |
| `minPeriod_in?` | `WeiSource`[] |
| `minPeriod_lt?` | `WeiSource` \| ``null`` |
| `minPeriod_lte?` | `WeiSource` \| ``null`` |
| `minPeriod_not?` | `WeiSource` \| ``null`` |
| `minPeriod_not_in?` | `WeiSource`[] |
| `requester?` | `string` \| ``null`` |
| `requester_contains?` | `string` \| ``null`` |
| `requester_in?` | `string`[] |
| `requester_not?` | `string` \| ``null`` |
| `requester_not_contains?` | `string` \| ``null`` |
| `requester_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:89

___

### RequestFrequencyExceededResult

Ƭ **RequestFrequencyExceededResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `minPeriod` | `Wei` |
| `requester` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:113

___

### RequestLimitExceededArgs

Ƭ **RequestLimitExceededArgs**<`K`\>: { [Property in keyof Pick<RequestLimitExceededFields, K\>]: RequestLimitExceededFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RequestLimitExceededResult`](subgraphs.Dispenser.md#requestlimitexceededresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:172

___

### RequestLimitExceededFields

Ƭ **RequestLimitExceededFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | ``true`` |
| `id` | ``true`` |
| `maxAmount` | ``true`` |
| `requester` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:166

___

### RequestLimitExceededFilter

Ƭ **RequestLimitExceededFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount?` | `WeiSource` \| ``null`` |
| `amount_gt?` | `WeiSource` \| ``null`` |
| `amount_gte?` | `WeiSource` \| ``null`` |
| `amount_in?` | `WeiSource`[] |
| `amount_lt?` | `WeiSource` \| ``null`` |
| `amount_lte?` | `WeiSource` \| ``null`` |
| `amount_not?` | `WeiSource` \| ``null`` |
| `amount_not_in?` | `WeiSource`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `maxAmount?` | `WeiSource` \| ``null`` |
| `maxAmount_gt?` | `WeiSource` \| ``null`` |
| `maxAmount_gte?` | `WeiSource` \| ``null`` |
| `maxAmount_in?` | `WeiSource`[] |
| `maxAmount_lt?` | `WeiSource` \| ``null`` |
| `maxAmount_lte?` | `WeiSource` \| ``null`` |
| `maxAmount_not?` | `WeiSource` \| ``null`` |
| `maxAmount_not_in?` | `WeiSource`[] |
| `requester?` | `string` \| ``null`` |
| `requester_contains?` | `string` \| ``null`` |
| `requester_in?` | `string`[] |
| `requester_not?` | `string` \| ``null`` |
| `requester_not_contains?` | `string` \| ``null`` |
| `requester_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:128

___

### RequestLimitExceededResult

Ƭ **RequestLimitExceededResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `Wei` |
| `id` | `string` |
| `maxAmount` | `Wei` |
| `requester` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:160

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:2

## Functions

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.Dispenser.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.Dispenser.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.Dispenser.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.Dispenser.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.Dispenser.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:50

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.Dispenser.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.Dispenser.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.Dispenser.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.Dispenser.md#initializedfilter), [`InitializedResult`](subgraphs.Dispenser.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.Dispenser.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.Dispenser.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:51

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.Dispenser.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.Dispenser.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.Dispenser.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.Dispenser.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.Dispenser.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:87

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.Dispenser.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.Dispenser.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.Dispenser.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.Dispenser.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.Dispenser.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.Dispenser.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.Dispenser.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:88

___

### getRequestFrequencyExceededById

▸ **getRequestFrequencyExceededById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RequestFrequencyExceededResult`](subgraphs.Dispenser.md#requestfrequencyexceededresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RequestFrequencyExceededResult`](subgraphs.Dispenser.md#requestfrequencyexceededresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.Dispenser.md#singlequeryoptions) |
| `args` | [`RequestFrequencyExceededArgs`](subgraphs.Dispenser.md#requestfrequencyexceededargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RequestFrequencyExceededResult`](subgraphs.Dispenser.md#requestfrequencyexceededresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:126

___

### getRequestFrequencyExceededs

▸ **getRequestFrequencyExceededs**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RequestFrequencyExceededResult`](subgraphs.Dispenser.md#requestfrequencyexceededresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RequestFrequencyExceededResult`](subgraphs.Dispenser.md#requestfrequencyexceededresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.Dispenser.md#multiqueryoptions)<[`RequestFrequencyExceededFilter`](subgraphs.Dispenser.md#requestfrequencyexceededfilter), [`RequestFrequencyExceededResult`](subgraphs.Dispenser.md#requestfrequencyexceededresult)\> |
| `args` | [`RequestFrequencyExceededArgs`](subgraphs.Dispenser.md#requestfrequencyexceededargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RequestFrequencyExceededResult`](subgraphs.Dispenser.md#requestfrequencyexceededresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:127

___

### getRequestLimitExceededById

▸ **getRequestLimitExceededById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RequestLimitExceededResult`](subgraphs.Dispenser.md#requestlimitexceededresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RequestLimitExceededResult`](subgraphs.Dispenser.md#requestlimitexceededresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.Dispenser.md#singlequeryoptions) |
| `args` | [`RequestLimitExceededArgs`](subgraphs.Dispenser.md#requestlimitexceededargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RequestLimitExceededResult`](subgraphs.Dispenser.md#requestlimitexceededresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:175

___

### getRequestLimitExceededs

▸ **getRequestLimitExceededs**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RequestLimitExceededResult`](subgraphs.Dispenser.md#requestlimitexceededresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RequestLimitExceededResult`](subgraphs.Dispenser.md#requestlimitexceededresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.Dispenser.md#multiqueryoptions)<[`RequestLimitExceededFilter`](subgraphs.Dispenser.md#requestlimitexceededfilter), [`RequestLimitExceededResult`](subgraphs.Dispenser.md#requestlimitexceededresult)\> |
| `args` | [`RequestLimitExceededArgs`](subgraphs.Dispenser.md#requestlimitexceededargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RequestLimitExceededResult`](subgraphs.Dispenser.md#requestlimitexceededresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/Dispenser.d.ts:176
