[@nevermined-io/sdk](../code-reference.md) / [subgraphs](subgraphs.md) / NFTHolderCondition

# Namespace: NFTHolderCondition

[subgraphs](subgraphs.md).NFTHolderCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.NFTHolderCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.NFTHolderCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.NFTHolderCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.NFTHolderCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.NFTHolderCondition.md#initializedargs)
- [InitializedFields](subgraphs.NFTHolderCondition.md#initializedfields)
- [InitializedFilter](subgraphs.NFTHolderCondition.md#initializedfilter)
- [InitializedResult](subgraphs.NFTHolderCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.NFTHolderCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.NFTHolderCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.NFTHolderCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.NFTHolderCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.NFTHolderCondition.md#ownershiptransferredresult)
- [SingleQueryOptions](subgraphs.NFTHolderCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.NFTHolderCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.NFTHolderCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.NFTHolderCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.NFTHolderCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.NFTHolderCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.NFTHolderCondition.md#getownershiptransferreds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type                                                                               |
| :--- | :--------------------------------------------------------------------------------- |
| `K`  | extends keyof [`FulfilledResult`](subgraphs.NFTHolderCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:79

---

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name           | Type   |
| :------------- | :----- |
| `_address`     | `true` |
| `_agreementId` | `true` |
| `_amount`      | `true` |
| `_conditionId` | `true` |
| `_did`         | `true` |
| `id`           | `true` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:71

---

### FulfilledFilter

Ƭ **FulfilledFilter**: `Object`

#### Type declaration

| Name                         | Type                  |
| :--------------------------- | :-------------------- |
| `_address?`                  | `string` \| `null`    |
| `_address_contains?`         | `string` \| `null`    |
| `_address_in?`               | `string`[]            |
| `_address_not?`              | `string` \| `null`    |
| `_address_not_contains?`     | `string` \| `null`    |
| `_address_not_in?`           | `string`[]            |
| `_agreementId?`              | `string` \| `null`    |
| `_agreementId_contains?`     | `string` \| `null`    |
| `_agreementId_in?`           | `string`[]            |
| `_agreementId_not?`          | `string` \| `null`    |
| `_agreementId_not_contains?` | `string` \| `null`    |
| `_agreementId_not_in?`       | `string`[]            |
| `_amount?`                   | `WeiSource` \| `null` |
| `_amount_gt?`                | `WeiSource` \| `null` |
| `_amount_gte?`               | `WeiSource` \| `null` |
| `_amount_in?`                | `WeiSource`[]         |
| `_amount_lt?`                | `WeiSource` \| `null` |
| `_amount_lte?`               | `WeiSource` \| `null` |
| `_amount_not?`               | `WeiSource` \| `null` |
| `_amount_not_in?`            | `WeiSource`[]         |
| `_conditionId?`              | `string` \| `null`    |
| `_conditionId_contains?`     | `string` \| `null`    |
| `_conditionId_in?`           | `string`[]            |
| `_conditionId_not?`          | `string` \| `null`    |
| `_conditionId_not_contains?` | `string` \| `null`    |
| `_conditionId_not_in?`       | `string`[]            |
| `_did?`                      | `string` \| `null`    |
| `_did_contains?`             | `string` \| `null`    |
| `_did_in?`                   | `string`[]            |
| `_did_not?`                  | `string` \| `null`    |
| `_did_not_contains?`         | `string` \| `null`    |
| `_did_not_in?`               | `string`[]            |
| `id?`                        | `string` \| `null`    |
| `id_gt?`                     | `string` \| `null`    |
| `id_gte?`                    | `string` \| `null`    |
| `id_in?`                     | `string`[]            |
| `id_lt?`                     | `string` \| `null`    |
| `id_lte?`                    | `string` \| `null`    |
| `id_not?`                    | `string` \| `null`    |
| `id_not_in?`                 | `string`[]            |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:21

---

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name           | Type     |
| :------------- | :------- |
| `_address`     | `string` |
| `_agreementId` | `string` |
| `_amount`      | `Wei`    |
| `_conditionId` | `string` |
| `_did`         | `string` |
| `id`           | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:63

---

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type                                                                                   |
| :--- | :------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`InitializedResult`](subgraphs.NFTHolderCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:110

---

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name      | Type   |
| :-------- | :----- |
| `id`      | `true` |
| `version` | `true` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:106

---

### InitializedFilter

Ƭ **InitializedFilter**: `Object`

#### Type declaration

| Name              | Type               |
| :---------------- | :----------------- |
| `id?`             | `string` \| `null` |
| `id_gt?`          | `string` \| `null` |
| `id_gte?`         | `string` \| `null` |
| `id_in?`          | `string`[]         |
| `id_lt?`          | `string` \| `null` |
| `id_lte?`         | `string` \| `null` |
| `id_not?`         | `string` \| `null` |
| `id_not_in?`      | `string`[]         |
| `version?`        | `number` \| `null` |
| `version_gt?`     | `number` \| `null` |
| `version_gte?`    | `number` \| `null` |
| `version_in?`     | `number`[]         |
| `version_lt?`     | `number` \| `null` |
| `version_lte?`    | `number` \| `null` |
| `version_not?`    | `number` \| `null` |
| `version_not_in?` | `number`[]         |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:84

---

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `id`      | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:102

---

### MultiQueryOptions

Ƭ **MultiQueryOptions**<`T`, `R`\>: `Object`

#### Type parameters

| Name |
| :--- |
| `T`  |
| `R`  |

#### Type declaration

| Name              | Type                                           |
| :---------------- | :--------------------------------------------- |
| `block?`          | { `number`: `number` } \| { `hash`: `string` } |
| `first?`          | `number`                                       |
| `orderBy?`        | keyof `R`                                      |
| `orderDirection?` | `"asc"` \| `"desc"`                            |
| `where?`          | `T`                                            |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:10

---

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type                                                                                                     |
| :--- | :------------------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`OwnershipTransferredResult`](subgraphs.NFTHolderCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:147

---

### OwnershipTransferredFields

Ƭ **OwnershipTransferredFields**: `Object`

#### Type declaration

| Name            | Type   |
| :-------------- | :----- |
| `id`            | `true` |
| `newOwner`      | `true` |
| `previousOwner` | `true` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:142

---

### OwnershipTransferredFilter

Ƭ **OwnershipTransferredFilter**: `Object`

#### Type declaration

| Name                          | Type               |
| :---------------------------- | :----------------- |
| `id?`                         | `string` \| `null` |
| `id_gt?`                      | `string` \| `null` |
| `id_gte?`                     | `string` \| `null` |
| `id_in?`                      | `string`[]         |
| `id_lt?`                      | `string` \| `null` |
| `id_lte?`                     | `string` \| `null` |
| `id_not?`                     | `string` \| `null` |
| `id_not_in?`                  | `string`[]         |
| `newOwner?`                   | `string` \| `null` |
| `newOwner_contains?`          | `string` \| `null` |
| `newOwner_in?`                | `string`[]         |
| `newOwner_not?`               | `string` \| `null` |
| `newOwner_not_contains?`      | `string` \| `null` |
| `newOwner_not_in?`            | `string`[]         |
| `previousOwner?`              | `string` \| `null` |
| `previousOwner_contains?`     | `string` \| `null` |
| `previousOwner_in?`           | `string`[]         |
| `previousOwner_not?`          | `string` \| `null` |
| `previousOwner_not_contains?` | `string` \| `null` |
| `previousOwner_not_in?`       | `string`[]         |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:115

---

### OwnershipTransferredResult

Ƭ **OwnershipTransferredResult**: `Object`

#### Type declaration

| Name            | Type     |
| :-------------- | :------- |
| `id`            | `string` |
| `newOwner`      | `string` |
| `previousOwner` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:137

---

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name     | Type                                           |
| :------- | :--------------------------------------------- |
| `block?` | { `number`: `number` } \| { `hash`: `string` } |
| `id`     | `string`                                       |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:2

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTHolderCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type                                                                               |
| :--- | :--------------------------------------------------------------------------------- |
| `K`  | extends keyof [`FulfilledResult`](subgraphs.NFTHolderCondition.md#fulfilledresult) |

#### Parameters

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `url`     | `string`                                                                   |
| `options` | [`SingleQueryOptions`](subgraphs.NFTHolderCondition.md#singlequeryoptions) |
| `args`    | [`FulfilledArgs`](subgraphs.NFTHolderCondition.md#fulfilledargs)<`K`\>     |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTHolderCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:82

---

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTHolderCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type                                                                               |
| :--- | :--------------------------------------------------------------------------------- |
| `K`  | extends keyof [`FulfilledResult`](subgraphs.NFTHolderCondition.md#fulfilledresult) |

#### Parameters

| Name      | Type                                                                                                                                                                                                                  |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`     | `string`                                                                                                                                                                                                              |
| `options` | [`MultiQueryOptions`](subgraphs.NFTHolderCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.NFTHolderCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.NFTHolderCondition.md#fulfilledresult)\> |
| `args`    | [`FulfilledArgs`](subgraphs.NFTHolderCondition.md#fulfilledargs)<`K`\>                                                                                                                                                |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFTHolderCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:83

---

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTHolderCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type                                                                                   |
| :--- | :------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`InitializedResult`](subgraphs.NFTHolderCondition.md#initializedresult) |

#### Parameters

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `url`     | `string`                                                                   |
| `options` | [`SingleQueryOptions`](subgraphs.NFTHolderCondition.md#singlequeryoptions) |
| `args`    | [`InitializedArgs`](subgraphs.NFTHolderCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTHolderCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:113

---

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTHolderCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type                                                                                   |
| :--- | :------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`InitializedResult`](subgraphs.NFTHolderCondition.md#initializedresult) |

#### Parameters

| Name      | Type                                                                                                                                                                                                                          |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`     | `string`                                                                                                                                                                                                                      |
| `options` | [`MultiQueryOptions`](subgraphs.NFTHolderCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.NFTHolderCondition.md#initializedfilter), [`InitializedResult`](subgraphs.NFTHolderCondition.md#initializedresult)\> |
| `args`    | [`InitializedArgs`](subgraphs.NFTHolderCondition.md#initializedargs)<`K`\>                                                                                                                                                    |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFTHolderCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:114

---

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTHolderCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type                                                                                                     |
| :--- | :------------------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`OwnershipTransferredResult`](subgraphs.NFTHolderCondition.md#ownershiptransferredresult) |

#### Parameters

| Name      | Type                                                                                         |
| :-------- | :------------------------------------------------------------------------------------------- |
| `url`     | `string`                                                                                     |
| `options` | [`SingleQueryOptions`](subgraphs.NFTHolderCondition.md#singlequeryoptions)                   |
| `args`    | [`OwnershipTransferredArgs`](subgraphs.NFTHolderCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTHolderCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:150

---

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTHolderCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type                                                                                                     |
| :--- | :------------------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`OwnershipTransferredResult`](subgraphs.NFTHolderCondition.md#ownershiptransferredresult) |

#### Parameters

| Name      | Type                                                                                                                                                                                                                                                              |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`     | `string`                                                                                                                                                                                                                                                          |
| `options` | [`MultiQueryOptions`](subgraphs.NFTHolderCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.NFTHolderCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.NFTHolderCondition.md#ownershiptransferredresult)\> |
| `args`    | [`OwnershipTransferredArgs`](subgraphs.NFTHolderCondition.md#ownershiptransferredargs)<`K`\>                                                                                                                                                                      |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFTHolderCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFTHolderCondition.d.ts:151
