[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / LockPaymentCondition

# Namespace: LockPaymentCondition

[subgraphs](subgraphs.md).LockPaymentCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.LockPaymentCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.LockPaymentCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.LockPaymentCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.LockPaymentCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.LockPaymentCondition.md#initializedargs)
- [InitializedFields](subgraphs.LockPaymentCondition.md#initializedfields)
- [InitializedFilter](subgraphs.LockPaymentCondition.md#initializedfilter)
- [InitializedResult](subgraphs.LockPaymentCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.LockPaymentCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.LockPaymentCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.LockPaymentCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.LockPaymentCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.LockPaymentCondition.md#ownershiptransferredresult)
- [RoleAdminChangedArgs](subgraphs.LockPaymentCondition.md#roleadminchangedargs)
- [RoleAdminChangedFields](subgraphs.LockPaymentCondition.md#roleadminchangedfields)
- [RoleAdminChangedFilter](subgraphs.LockPaymentCondition.md#roleadminchangedfilter)
- [RoleAdminChangedResult](subgraphs.LockPaymentCondition.md#roleadminchangedresult)
- [RoleGrantedArgs](subgraphs.LockPaymentCondition.md#rolegrantedargs)
- [RoleGrantedFields](subgraphs.LockPaymentCondition.md#rolegrantedfields)
- [RoleGrantedFilter](subgraphs.LockPaymentCondition.md#rolegrantedfilter)
- [RoleGrantedResult](subgraphs.LockPaymentCondition.md#rolegrantedresult)
- [RoleRevokedArgs](subgraphs.LockPaymentCondition.md#rolerevokedargs)
- [RoleRevokedFields](subgraphs.LockPaymentCondition.md#rolerevokedfields)
- [RoleRevokedFilter](subgraphs.LockPaymentCondition.md#rolerevokedfilter)
- [RoleRevokedResult](subgraphs.LockPaymentCondition.md#rolerevokedresult)
- [SingleQueryOptions](subgraphs.LockPaymentCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.LockPaymentCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.LockPaymentCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.LockPaymentCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.LockPaymentCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.LockPaymentCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.LockPaymentCondition.md#getownershiptransferreds)
- [getRoleAdminChangedById](subgraphs.LockPaymentCondition.md#getroleadminchangedbyid)
- [getRoleAdminChangeds](subgraphs.LockPaymentCondition.md#getroleadminchangeds)
- [getRoleGrantedById](subgraphs.LockPaymentCondition.md#getrolegrantedbyid)
- [getRoleGranteds](subgraphs.LockPaymentCondition.md#getrolegranteds)
- [getRoleRevokedById](subgraphs.LockPaymentCondition.md#getrolerevokedbyid)
- [getRoleRevokeds](subgraphs.LockPaymentCondition.md#getrolerevokeds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.LockPaymentCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:93

___

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | ``true`` |
| `_amounts` | ``true`` |
| `_conditionId` | ``true`` |
| `_did` | ``true`` |
| `_receivers` | ``true`` |
| `_rewardAddress` | ``true`` |
| `_tokenAddress` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:83

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
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `_receivers?` | `string`[] |
| `_receivers_contains?` | `string`[] |
| `_receivers_contains_nocase?` | `string`[] |
| `_receivers_not?` | `string`[] |
| `_receivers_not_contains?` | `string`[] |
| `_receivers_not_contains_nocase?` | `string`[] |
| `_rewardAddress?` | `string` \| ``null`` |
| `_rewardAddress_contains?` | `string` \| ``null`` |
| `_rewardAddress_in?` | `string`[] |
| `_rewardAddress_not?` | `string` \| ``null`` |
| `_rewardAddress_not_contains?` | `string` \| ``null`` |
| `_rewardAddress_not_in?` | `string`[] |
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

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:21

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | `string` |
| `_amounts` | (`Wei` \| ``null``)[] |
| `_conditionId` | `string` |
| `_did` | `string` |
| `_receivers` | (`string` \| ``null``)[] |
| `_rewardAddress` | `string` |
| `_tokenAddress` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:73

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.LockPaymentCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:124

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:120

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

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:98

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:116

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

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.LockPaymentCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:161

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

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:156

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

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:129

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

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:151

___

### RoleAdminChangedArgs

Ƭ **RoleAdminChangedArgs**<`K`\>: { [Property in keyof Pick<RoleAdminChangedFields, K\>]: RoleAdminChangedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.LockPaymentCondition.md#roleadminchangedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:206

___

### RoleAdminChangedFields

Ƭ **RoleAdminChangedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `newAdminRole` | ``true`` |
| `previousAdminRole` | ``true`` |
| `role` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:200

___

### RoleAdminChangedFilter

Ƭ **RoleAdminChangedFilter**: `Object`

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
| `newAdminRole?` | `string` \| ``null`` |
| `newAdminRole_contains?` | `string` \| ``null`` |
| `newAdminRole_in?` | `string`[] |
| `newAdminRole_not?` | `string` \| ``null`` |
| `newAdminRole_not_contains?` | `string` \| ``null`` |
| `newAdminRole_not_in?` | `string`[] |
| `previousAdminRole?` | `string` \| ``null`` |
| `previousAdminRole_contains?` | `string` \| ``null`` |
| `previousAdminRole_in?` | `string`[] |
| `previousAdminRole_not?` | `string` \| ``null`` |
| `previousAdminRole_not_contains?` | `string` \| ``null`` |
| `previousAdminRole_not_in?` | `string`[] |
| `role?` | `string` \| ``null`` |
| `role_contains?` | `string` \| ``null`` |
| `role_in?` | `string`[] |
| `role_not?` | `string` \| ``null`` |
| `role_not_contains?` | `string` \| ``null`` |
| `role_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:166

___

### RoleAdminChangedResult

Ƭ **RoleAdminChangedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `newAdminRole` | `string` |
| `previousAdminRole` | `string` |
| `role` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:194

___

### RoleGrantedArgs

Ƭ **RoleGrantedArgs**<`K`\>: { [Property in keyof Pick<RoleGrantedFields, K\>]: RoleGrantedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.LockPaymentCondition.md#rolegrantedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:251

___

### RoleGrantedFields

Ƭ **RoleGrantedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account` | ``true`` |
| `id` | ``true`` |
| `role` | ``true`` |
| `sender` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:245

___

### RoleGrantedFilter

Ƭ **RoleGrantedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account?` | `string` \| ``null`` |
| `account_contains?` | `string` \| ``null`` |
| `account_in?` | `string`[] |
| `account_not?` | `string` \| ``null`` |
| `account_not_contains?` | `string` \| ``null`` |
| `account_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `role?` | `string` \| ``null`` |
| `role_contains?` | `string` \| ``null`` |
| `role_in?` | `string`[] |
| `role_not?` | `string` \| ``null`` |
| `role_not_contains?` | `string` \| ``null`` |
| `role_not_in?` | `string`[] |
| `sender?` | `string` \| ``null`` |
| `sender_contains?` | `string` \| ``null`` |
| `sender_in?` | `string`[] |
| `sender_not?` | `string` \| ``null`` |
| `sender_not_contains?` | `string` \| ``null`` |
| `sender_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:211

___

### RoleGrantedResult

Ƭ **RoleGrantedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `id` | `string` |
| `role` | `string` |
| `sender` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:239

___

### RoleRevokedArgs

Ƭ **RoleRevokedArgs**<`K`\>: { [Property in keyof Pick<RoleRevokedFields, K\>]: RoleRevokedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.LockPaymentCondition.md#rolerevokedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:296

___

### RoleRevokedFields

Ƭ **RoleRevokedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account` | ``true`` |
| `id` | ``true`` |
| `role` | ``true`` |
| `sender` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:290

___

### RoleRevokedFilter

Ƭ **RoleRevokedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account?` | `string` \| ``null`` |
| `account_contains?` | `string` \| ``null`` |
| `account_in?` | `string`[] |
| `account_not?` | `string` \| ``null`` |
| `account_not_contains?` | `string` \| ``null`` |
| `account_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `role?` | `string` \| ``null`` |
| `role_contains?` | `string` \| ``null`` |
| `role_in?` | `string`[] |
| `role_not?` | `string` \| ``null`` |
| `role_not_contains?` | `string` \| ``null`` |
| `role_not_in?` | `string`[] |
| `sender?` | `string` \| ``null`` |
| `sender_contains?` | `string` \| ``null`` |
| `sender_in?` | `string`[] |
| `sender_not?` | `string` \| ``null`` |
| `sender_not_contains?` | `string` \| ``null`` |
| `sender_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:256

___

### RoleRevokedResult

Ƭ **RoleRevokedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `id` | `string` |
| `role` | `string` |
| `sender` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:284

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:2

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.LockPaymentCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.LockPaymentCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.LockPaymentCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.LockPaymentCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.LockPaymentCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:96

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.LockPaymentCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.LockPaymentCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.LockPaymentCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.LockPaymentCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.LockPaymentCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.LockPaymentCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.LockPaymentCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:97

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.LockPaymentCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.LockPaymentCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.LockPaymentCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.LockPaymentCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.LockPaymentCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:127

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.LockPaymentCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.LockPaymentCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.LockPaymentCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.LockPaymentCondition.md#initializedfilter), [`InitializedResult`](subgraphs.LockPaymentCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.LockPaymentCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.LockPaymentCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:128

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.LockPaymentCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.LockPaymentCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.LockPaymentCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.LockPaymentCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.LockPaymentCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:164

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.LockPaymentCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.LockPaymentCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.LockPaymentCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.LockPaymentCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.LockPaymentCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.LockPaymentCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.LockPaymentCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:165

___

### getRoleAdminChangedById

▸ **getRoleAdminChangedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.LockPaymentCondition.md#roleadminchangedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.LockPaymentCondition.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.LockPaymentCondition.md#singlequeryoptions) |
| `args` | [`RoleAdminChangedArgs`](subgraphs.LockPaymentCondition.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.LockPaymentCondition.md#roleadminchangedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:209

___

### getRoleAdminChangeds

▸ **getRoleAdminChangeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.LockPaymentCondition.md#roleadminchangedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.LockPaymentCondition.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.LockPaymentCondition.md#multiqueryoptions)<[`RoleAdminChangedFilter`](subgraphs.LockPaymentCondition.md#roleadminchangedfilter), [`RoleAdminChangedResult`](subgraphs.LockPaymentCondition.md#roleadminchangedresult)\> |
| `args` | [`RoleAdminChangedArgs`](subgraphs.LockPaymentCondition.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.LockPaymentCondition.md#roleadminchangedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:210

___

### getRoleGrantedById

▸ **getRoleGrantedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.LockPaymentCondition.md#rolegrantedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.LockPaymentCondition.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.LockPaymentCondition.md#singlequeryoptions) |
| `args` | [`RoleGrantedArgs`](subgraphs.LockPaymentCondition.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.LockPaymentCondition.md#rolegrantedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:254

___

### getRoleGranteds

▸ **getRoleGranteds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.LockPaymentCondition.md#rolegrantedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.LockPaymentCondition.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.LockPaymentCondition.md#multiqueryoptions)<[`RoleGrantedFilter`](subgraphs.LockPaymentCondition.md#rolegrantedfilter), [`RoleGrantedResult`](subgraphs.LockPaymentCondition.md#rolegrantedresult)\> |
| `args` | [`RoleGrantedArgs`](subgraphs.LockPaymentCondition.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.LockPaymentCondition.md#rolegrantedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:255

___

### getRoleRevokedById

▸ **getRoleRevokedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.LockPaymentCondition.md#rolerevokedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.LockPaymentCondition.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.LockPaymentCondition.md#singlequeryoptions) |
| `args` | [`RoleRevokedArgs`](subgraphs.LockPaymentCondition.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.LockPaymentCondition.md#rolerevokedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:299

___

### getRoleRevokeds

▸ **getRoleRevokeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.LockPaymentCondition.md#rolerevokedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.LockPaymentCondition.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.LockPaymentCondition.md#multiqueryoptions)<[`RoleRevokedFilter`](subgraphs.LockPaymentCondition.md#rolerevokedfilter), [`RoleRevokedResult`](subgraphs.LockPaymentCondition.md#rolerevokedresult)\> |
| `args` | [`RoleRevokedArgs`](subgraphs.LockPaymentCondition.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.LockPaymentCondition.md#rolerevokedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/LockPaymentCondition.d.ts:300
