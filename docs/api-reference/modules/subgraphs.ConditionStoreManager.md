[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / ConditionStoreManager

# Namespace: ConditionStoreManager

[subgraphs](subgraphs.md).ConditionStoreManager

## Table of contents

### Type Aliases

- [ConditionCreatedArgs](subgraphs.ConditionStoreManager.md#conditioncreatedargs)
- [ConditionCreatedFields](subgraphs.ConditionStoreManager.md#conditioncreatedfields)
- [ConditionCreatedFilter](subgraphs.ConditionStoreManager.md#conditioncreatedfilter)
- [ConditionCreatedResult](subgraphs.ConditionStoreManager.md#conditioncreatedresult)
- [ConditionUpdatedArgs](subgraphs.ConditionStoreManager.md#conditionupdatedargs)
- [ConditionUpdatedFields](subgraphs.ConditionStoreManager.md#conditionupdatedfields)
- [ConditionUpdatedFilter](subgraphs.ConditionStoreManager.md#conditionupdatedfilter)
- [ConditionUpdatedResult](subgraphs.ConditionStoreManager.md#conditionupdatedresult)
- [InitializedArgs](subgraphs.ConditionStoreManager.md#initializedargs)
- [InitializedFields](subgraphs.ConditionStoreManager.md#initializedfields)
- [InitializedFilter](subgraphs.ConditionStoreManager.md#initializedfilter)
- [InitializedResult](subgraphs.ConditionStoreManager.md#initializedresult)
- [MultiQueryOptions](subgraphs.ConditionStoreManager.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.ConditionStoreManager.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.ConditionStoreManager.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.ConditionStoreManager.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.ConditionStoreManager.md#ownershiptransferredresult)
- [RoleAdminChangedArgs](subgraphs.ConditionStoreManager.md#roleadminchangedargs)
- [RoleAdminChangedFields](subgraphs.ConditionStoreManager.md#roleadminchangedfields)
- [RoleAdminChangedFilter](subgraphs.ConditionStoreManager.md#roleadminchangedfilter)
- [RoleAdminChangedResult](subgraphs.ConditionStoreManager.md#roleadminchangedresult)
- [RoleGrantedArgs](subgraphs.ConditionStoreManager.md#rolegrantedargs)
- [RoleGrantedFields](subgraphs.ConditionStoreManager.md#rolegrantedfields)
- [RoleGrantedFilter](subgraphs.ConditionStoreManager.md#rolegrantedfilter)
- [RoleGrantedResult](subgraphs.ConditionStoreManager.md#rolegrantedresult)
- [RoleRevokedArgs](subgraphs.ConditionStoreManager.md#rolerevokedargs)
- [RoleRevokedFields](subgraphs.ConditionStoreManager.md#rolerevokedfields)
- [RoleRevokedFilter](subgraphs.ConditionStoreManager.md#rolerevokedfilter)
- [RoleRevokedResult](subgraphs.ConditionStoreManager.md#rolerevokedresult)
- [SingleQueryOptions](subgraphs.ConditionStoreManager.md#singlequeryoptions)

### Functions

- [getConditionCreatedById](subgraphs.ConditionStoreManager.md#getconditioncreatedbyid)
- [getConditionCreateds](subgraphs.ConditionStoreManager.md#getconditioncreateds)
- [getConditionUpdatedById](subgraphs.ConditionStoreManager.md#getconditionupdatedbyid)
- [getConditionUpdateds](subgraphs.ConditionStoreManager.md#getconditionupdateds)
- [getInitializedById](subgraphs.ConditionStoreManager.md#getinitializedbyid)
- [getInitializeds](subgraphs.ConditionStoreManager.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.ConditionStoreManager.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.ConditionStoreManager.md#getownershiptransferreds)
- [getRoleAdminChangedById](subgraphs.ConditionStoreManager.md#getroleadminchangedbyid)
- [getRoleAdminChangeds](subgraphs.ConditionStoreManager.md#getroleadminchangeds)
- [getRoleGrantedById](subgraphs.ConditionStoreManager.md#getrolegrantedbyid)
- [getRoleGranteds](subgraphs.ConditionStoreManager.md#getrolegranteds)
- [getRoleRevokedById](subgraphs.ConditionStoreManager.md#getrolerevokedbyid)
- [getRoleRevokeds](subgraphs.ConditionStoreManager.md#getrolerevokeds)

## Type Aliases

### ConditionCreatedArgs

Ƭ **ConditionCreatedArgs**<`K`\>: { [Property in keyof Pick<ConditionCreatedFields, K\>]: ConditionCreatedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ConditionCreatedResult`](subgraphs.ConditionStoreManager.md#conditioncreatedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:52

___

### ConditionCreatedFields

Ƭ **ConditionCreatedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_typeRef` | ``true`` |
| `_who` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:47

___

### ConditionCreatedFilter

Ƭ **ConditionCreatedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_typeRef?` | `string` \| ``null`` |
| `_typeRef_contains?` | `string` \| ``null`` |
| `_typeRef_in?` | `string`[] |
| `_typeRef_not?` | `string` \| ``null`` |
| `_typeRef_not_contains?` | `string` \| ``null`` |
| `_typeRef_not_in?` | `string`[] |
| `_who?` | `string` \| ``null`` |
| `_who_contains?` | `string` \| ``null`` |
| `_who_in?` | `string`[] |
| `_who_not?` | `string` \| ``null`` |
| `_who_not_contains?` | `string` \| ``null`` |
| `_who_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:20

___

### ConditionCreatedResult

Ƭ **ConditionCreatedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_typeRef` | `string` |
| `_who` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:42

___

### ConditionUpdatedArgs

Ƭ **ConditionUpdatedArgs**<`K`\>: { [Property in keyof Pick<ConditionUpdatedFields, K\>]: ConditionUpdatedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ConditionUpdatedResult`](subgraphs.ConditionStoreManager.md#conditionupdatedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:99

___

### ConditionUpdatedFields

Ƭ **ConditionUpdatedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_state` | ``true`` |
| `_typeRef` | ``true`` |
| `_who` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:93

___

### ConditionUpdatedFilter

Ƭ **ConditionUpdatedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_state?` | `number` \| ``null`` |
| `_state_gt?` | `number` \| ``null`` |
| `_state_gte?` | `number` \| ``null`` |
| `_state_in?` | `number`[] |
| `_state_lt?` | `number` \| ``null`` |
| `_state_lte?` | `number` \| ``null`` |
| `_state_not?` | `number` \| ``null`` |
| `_state_not_in?` | `number`[] |
| `_typeRef?` | `string` \| ``null`` |
| `_typeRef_contains?` | `string` \| ``null`` |
| `_typeRef_in?` | `string`[] |
| `_typeRef_not?` | `string` \| ``null`` |
| `_typeRef_not_contains?` | `string` \| ``null`` |
| `_typeRef_not_in?` | `string`[] |
| `_who?` | `string` \| ``null`` |
| `_who_contains?` | `string` \| ``null`` |
| `_who_in?` | `string`[] |
| `_who_not?` | `string` \| ``null`` |
| `_who_not_contains?` | `string` \| ``null`` |
| `_who_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:57

___

### ConditionUpdatedResult

Ƭ **ConditionUpdatedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_state` | `number` |
| `_typeRef` | `string` |
| `_who` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:87

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.ConditionStoreManager.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:130

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:126

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:104

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:122

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:9

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.ConditionStoreManager.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:167

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:162

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:135

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:157

___

### RoleAdminChangedArgs

Ƭ **RoleAdminChangedArgs**<`K`\>: { [Property in keyof Pick<RoleAdminChangedFields, K\>]: RoleAdminChangedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.ConditionStoreManager.md#roleadminchangedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:212

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:206

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:172

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:200

___

### RoleGrantedArgs

Ƭ **RoleGrantedArgs**<`K`\>: { [Property in keyof Pick<RoleGrantedFields, K\>]: RoleGrantedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.ConditionStoreManager.md#rolegrantedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:257

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:251

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:217

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:245

___

### RoleRevokedArgs

Ƭ **RoleRevokedArgs**<`K`\>: { [Property in keyof Pick<RoleRevokedFields, K\>]: RoleRevokedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.ConditionStoreManager.md#rolerevokedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:302

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:296

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:262

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

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:290

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:1

## Functions

### getConditionCreatedById

▸ **getConditionCreatedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ConditionCreatedResult`](subgraphs.ConditionStoreManager.md#conditioncreatedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ConditionCreatedResult`](subgraphs.ConditionStoreManager.md#conditioncreatedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.ConditionStoreManager.md#singlequeryoptions) |
| `args` | [`ConditionCreatedArgs`](subgraphs.ConditionStoreManager.md#conditioncreatedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ConditionCreatedResult`](subgraphs.ConditionStoreManager.md#conditioncreatedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:55

___

### getConditionCreateds

▸ **getConditionCreateds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ConditionCreatedResult`](subgraphs.ConditionStoreManager.md#conditioncreatedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ConditionCreatedResult`](subgraphs.ConditionStoreManager.md#conditioncreatedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.ConditionStoreManager.md#multiqueryoptions)<[`ConditionCreatedFilter`](subgraphs.ConditionStoreManager.md#conditioncreatedfilter), [`ConditionCreatedResult`](subgraphs.ConditionStoreManager.md#conditioncreatedresult)\> |
| `args` | [`ConditionCreatedArgs`](subgraphs.ConditionStoreManager.md#conditioncreatedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ConditionCreatedResult`](subgraphs.ConditionStoreManager.md#conditioncreatedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:56

___

### getConditionUpdatedById

▸ **getConditionUpdatedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ConditionUpdatedResult`](subgraphs.ConditionStoreManager.md#conditionupdatedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ConditionUpdatedResult`](subgraphs.ConditionStoreManager.md#conditionupdatedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.ConditionStoreManager.md#singlequeryoptions) |
| `args` | [`ConditionUpdatedArgs`](subgraphs.ConditionStoreManager.md#conditionupdatedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ConditionUpdatedResult`](subgraphs.ConditionStoreManager.md#conditionupdatedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:102

___

### getConditionUpdateds

▸ **getConditionUpdateds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ConditionUpdatedResult`](subgraphs.ConditionStoreManager.md#conditionupdatedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ConditionUpdatedResult`](subgraphs.ConditionStoreManager.md#conditionupdatedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.ConditionStoreManager.md#multiqueryoptions)<[`ConditionUpdatedFilter`](subgraphs.ConditionStoreManager.md#conditionupdatedfilter), [`ConditionUpdatedResult`](subgraphs.ConditionStoreManager.md#conditionupdatedresult)\> |
| `args` | [`ConditionUpdatedArgs`](subgraphs.ConditionStoreManager.md#conditionupdatedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ConditionUpdatedResult`](subgraphs.ConditionStoreManager.md#conditionupdatedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:103

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.ConditionStoreManager.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.ConditionStoreManager.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.ConditionStoreManager.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.ConditionStoreManager.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.ConditionStoreManager.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:133

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.ConditionStoreManager.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.ConditionStoreManager.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.ConditionStoreManager.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.ConditionStoreManager.md#initializedfilter), [`InitializedResult`](subgraphs.ConditionStoreManager.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.ConditionStoreManager.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.ConditionStoreManager.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:134

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.ConditionStoreManager.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.ConditionStoreManager.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.ConditionStoreManager.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.ConditionStoreManager.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.ConditionStoreManager.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:170

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.ConditionStoreManager.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.ConditionStoreManager.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.ConditionStoreManager.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.ConditionStoreManager.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.ConditionStoreManager.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.ConditionStoreManager.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.ConditionStoreManager.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:171

___

### getRoleAdminChangedById

▸ **getRoleAdminChangedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.ConditionStoreManager.md#roleadminchangedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.ConditionStoreManager.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.ConditionStoreManager.md#singlequeryoptions) |
| `args` | [`RoleAdminChangedArgs`](subgraphs.ConditionStoreManager.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.ConditionStoreManager.md#roleadminchangedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:215

___

### getRoleAdminChangeds

▸ **getRoleAdminChangeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.ConditionStoreManager.md#roleadminchangedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.ConditionStoreManager.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.ConditionStoreManager.md#multiqueryoptions)<[`RoleAdminChangedFilter`](subgraphs.ConditionStoreManager.md#roleadminchangedfilter), [`RoleAdminChangedResult`](subgraphs.ConditionStoreManager.md#roleadminchangedresult)\> |
| `args` | [`RoleAdminChangedArgs`](subgraphs.ConditionStoreManager.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.ConditionStoreManager.md#roleadminchangedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:216

___

### getRoleGrantedById

▸ **getRoleGrantedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.ConditionStoreManager.md#rolegrantedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.ConditionStoreManager.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.ConditionStoreManager.md#singlequeryoptions) |
| `args` | [`RoleGrantedArgs`](subgraphs.ConditionStoreManager.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.ConditionStoreManager.md#rolegrantedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:260

___

### getRoleGranteds

▸ **getRoleGranteds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.ConditionStoreManager.md#rolegrantedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.ConditionStoreManager.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.ConditionStoreManager.md#multiqueryoptions)<[`RoleGrantedFilter`](subgraphs.ConditionStoreManager.md#rolegrantedfilter), [`RoleGrantedResult`](subgraphs.ConditionStoreManager.md#rolegrantedresult)\> |
| `args` | [`RoleGrantedArgs`](subgraphs.ConditionStoreManager.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.ConditionStoreManager.md#rolegrantedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:261

___

### getRoleRevokedById

▸ **getRoleRevokedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.ConditionStoreManager.md#rolerevokedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.ConditionStoreManager.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.ConditionStoreManager.md#singlequeryoptions) |
| `args` | [`RoleRevokedArgs`](subgraphs.ConditionStoreManager.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.ConditionStoreManager.md#rolerevokedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:305

___

### getRoleRevokeds

▸ **getRoleRevokeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.ConditionStoreManager.md#rolerevokedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.ConditionStoreManager.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.ConditionStoreManager.md#multiqueryoptions)<[`RoleRevokedFilter`](subgraphs.ConditionStoreManager.md#rolerevokedfilter), [`RoleRevokedResult`](subgraphs.ConditionStoreManager.md#rolerevokedresult)\> |
| `args` | [`RoleRevokedArgs`](subgraphs.ConditionStoreManager.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.ConditionStoreManager.md#rolerevokedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/ConditionStoreManager.d.ts:306
