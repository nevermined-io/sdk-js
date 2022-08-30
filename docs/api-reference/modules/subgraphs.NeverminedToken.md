[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / NeverminedToken

# Namespace: NeverminedToken

[subgraphs](subgraphs.md).NeverminedToken

## Table of contents

### Type Aliases

- [ApprovalArgs](subgraphs.NeverminedToken.md#approvalargs)
- [ApprovalFields](subgraphs.NeverminedToken.md#approvalfields)
- [ApprovalFilter](subgraphs.NeverminedToken.md#approvalfilter)
- [ApprovalResult](subgraphs.NeverminedToken.md#approvalresult)
- [InitializedArgs](subgraphs.NeverminedToken.md#initializedargs)
- [InitializedFields](subgraphs.NeverminedToken.md#initializedfields)
- [InitializedFilter](subgraphs.NeverminedToken.md#initializedfilter)
- [InitializedResult](subgraphs.NeverminedToken.md#initializedresult)
- [MultiQueryOptions](subgraphs.NeverminedToken.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.NeverminedToken.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.NeverminedToken.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.NeverminedToken.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.NeverminedToken.md#ownershiptransferredresult)
- [RoleAdminChangedArgs](subgraphs.NeverminedToken.md#roleadminchangedargs)
- [RoleAdminChangedFields](subgraphs.NeverminedToken.md#roleadminchangedfields)
- [RoleAdminChangedFilter](subgraphs.NeverminedToken.md#roleadminchangedfilter)
- [RoleAdminChangedResult](subgraphs.NeverminedToken.md#roleadminchangedresult)
- [RoleGrantedArgs](subgraphs.NeverminedToken.md#rolegrantedargs)
- [RoleGrantedFields](subgraphs.NeverminedToken.md#rolegrantedfields)
- [RoleGrantedFilter](subgraphs.NeverminedToken.md#rolegrantedfilter)
- [RoleGrantedResult](subgraphs.NeverminedToken.md#rolegrantedresult)
- [RoleRevokedArgs](subgraphs.NeverminedToken.md#rolerevokedargs)
- [RoleRevokedFields](subgraphs.NeverminedToken.md#rolerevokedfields)
- [RoleRevokedFilter](subgraphs.NeverminedToken.md#rolerevokedfilter)
- [RoleRevokedResult](subgraphs.NeverminedToken.md#rolerevokedresult)
- [SingleQueryOptions](subgraphs.NeverminedToken.md#singlequeryoptions)
- [TransferArgs](subgraphs.NeverminedToken.md#transferargs)
- [TransferFields](subgraphs.NeverminedToken.md#transferfields)
- [TransferFilter](subgraphs.NeverminedToken.md#transferfilter)
- [TransferResult](subgraphs.NeverminedToken.md#transferresult)

### Functions

- [getApprovalById](subgraphs.NeverminedToken.md#getapprovalbyid)
- [getApprovals](subgraphs.NeverminedToken.md#getapprovals)
- [getInitializedById](subgraphs.NeverminedToken.md#getinitializedbyid)
- [getInitializeds](subgraphs.NeverminedToken.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.NeverminedToken.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.NeverminedToken.md#getownershiptransferreds)
- [getRoleAdminChangedById](subgraphs.NeverminedToken.md#getroleadminchangedbyid)
- [getRoleAdminChangeds](subgraphs.NeverminedToken.md#getroleadminchangeds)
- [getRoleGrantedById](subgraphs.NeverminedToken.md#getrolegrantedbyid)
- [getRoleGranteds](subgraphs.NeverminedToken.md#getrolegranteds)
- [getRoleRevokedById](subgraphs.NeverminedToken.md#getrolerevokedbyid)
- [getRoleRevokeds](subgraphs.NeverminedToken.md#getrolerevokeds)
- [getTransferById](subgraphs.NeverminedToken.md#gettransferbyid)
- [getTransfers](subgraphs.NeverminedToken.md#gettransfers)

## Type Aliases

### ApprovalArgs

Ƭ **ApprovalArgs**<`K`\>: { [Property in keyof Pick<ApprovalFields, K\>]: ApprovalFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ApprovalResult`](subgraphs.NeverminedToken.md#approvalresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:63

___

### ApprovalFields

Ƭ **ApprovalFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `owner` | ``true`` |
| `spender` | ``true`` |
| `value` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:57

___

### ApprovalFilter

Ƭ **ApprovalFilter**: `Object`

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
| `owner?` | `string` \| ``null`` |
| `owner_contains?` | `string` \| ``null`` |
| `owner_in?` | `string`[] |
| `owner_not?` | `string` \| ``null`` |
| `owner_not_contains?` | `string` \| ``null`` |
| `owner_not_in?` | `string`[] |
| `spender?` | `string` \| ``null`` |
| `spender_contains?` | `string` \| ``null`` |
| `spender_in?` | `string`[] |
| `spender_not?` | `string` \| ``null`` |
| `spender_not_contains?` | `string` \| ``null`` |
| `spender_not_in?` | `string`[] |
| `value?` | `WeiSource` \| ``null`` |
| `value_gt?` | `WeiSource` \| ``null`` |
| `value_gte?` | `WeiSource` \| ``null`` |
| `value_in?` | `WeiSource`[] |
| `value_lt?` | `WeiSource` \| ``null`` |
| `value_lte?` | `WeiSource` \| ``null`` |
| `value_not?` | `WeiSource` \| ``null`` |
| `value_not_in?` | `WeiSource`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:21

___

### ApprovalResult

Ƭ **ApprovalResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `owner` | `string` |
| `spender` | `string` |
| `value` | `Wei` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:51

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NeverminedToken.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:94

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:90

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:68

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:86

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NeverminedToken.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:131

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:126

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:99

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:121

___

### RoleAdminChangedArgs

Ƭ **RoleAdminChangedArgs**<`K`\>: { [Property in keyof Pick<RoleAdminChangedFields, K\>]: RoleAdminChangedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.NeverminedToken.md#roleadminchangedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:176

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:170

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:136

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:164

___

### RoleGrantedArgs

Ƭ **RoleGrantedArgs**<`K`\>: { [Property in keyof Pick<RoleGrantedFields, K\>]: RoleGrantedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.NeverminedToken.md#rolegrantedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:221

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:215

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:181

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:209

___

### RoleRevokedArgs

Ƭ **RoleRevokedArgs**<`K`\>: { [Property in keyof Pick<RoleRevokedFields, K\>]: RoleRevokedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.NeverminedToken.md#rolerevokedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:266

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:260

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:226

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

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:254

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:2

___

### TransferArgs

Ƭ **TransferArgs**<`K`\>: { [Property in keyof Pick<TransferFields, K\>]: TransferFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`TransferResult`](subgraphs.NeverminedToken.md#transferresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:313

___

### TransferFields

Ƭ **TransferFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from` | ``true`` |
| `id` | ``true`` |
| `to` | ``true`` |
| `value` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:307

___

### TransferFilter

Ƭ **TransferFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from?` | `string` \| ``null`` |
| `from_contains?` | `string` \| ``null`` |
| `from_in?` | `string`[] |
| `from_not?` | `string` \| ``null`` |
| `from_not_contains?` | `string` \| ``null`` |
| `from_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `to?` | `string` \| ``null`` |
| `to_contains?` | `string` \| ``null`` |
| `to_in?` | `string`[] |
| `to_not?` | `string` \| ``null`` |
| `to_not_contains?` | `string` \| ``null`` |
| `to_not_in?` | `string`[] |
| `value?` | `WeiSource` \| ``null`` |
| `value_gt?` | `WeiSource` \| ``null`` |
| `value_gte?` | `WeiSource` \| ``null`` |
| `value_in?` | `WeiSource`[] |
| `value_lt?` | `WeiSource` \| ``null`` |
| `value_lte?` | `WeiSource` \| ``null`` |
| `value_not?` | `WeiSource` \| ``null`` |
| `value_not_in?` | `WeiSource`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:271

___

### TransferResult

Ƭ **TransferResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from` | `string` |
| `id` | `string` |
| `to` | `string` |
| `value` | `Wei` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:301

## Functions

### getApprovalById

▸ **getApprovalById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ApprovalResult`](subgraphs.NeverminedToken.md#approvalresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ApprovalResult`](subgraphs.NeverminedToken.md#approvalresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedToken.md#singlequeryoptions) |
| `args` | [`ApprovalArgs`](subgraphs.NeverminedToken.md#approvalargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ApprovalResult`](subgraphs.NeverminedToken.md#approvalresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:66

___

### getApprovals

▸ **getApprovals**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ApprovalResult`](subgraphs.NeverminedToken.md#approvalresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ApprovalResult`](subgraphs.NeverminedToken.md#approvalresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedToken.md#multiqueryoptions)<[`ApprovalFilter`](subgraphs.NeverminedToken.md#approvalfilter), [`ApprovalResult`](subgraphs.NeverminedToken.md#approvalresult)\> |
| `args` | [`ApprovalArgs`](subgraphs.NeverminedToken.md#approvalargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ApprovalResult`](subgraphs.NeverminedToken.md#approvalresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:67

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NeverminedToken.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NeverminedToken.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedToken.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.NeverminedToken.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NeverminedToken.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:97

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NeverminedToken.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NeverminedToken.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedToken.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.NeverminedToken.md#initializedfilter), [`InitializedResult`](subgraphs.NeverminedToken.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.NeverminedToken.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NeverminedToken.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:98

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NeverminedToken.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NeverminedToken.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedToken.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NeverminedToken.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NeverminedToken.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:134

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NeverminedToken.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NeverminedToken.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedToken.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.NeverminedToken.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.NeverminedToken.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NeverminedToken.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NeverminedToken.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:135

___

### getRoleAdminChangedById

▸ **getRoleAdminChangedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NeverminedToken.md#roleadminchangedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.NeverminedToken.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedToken.md#singlequeryoptions) |
| `args` | [`RoleAdminChangedArgs`](subgraphs.NeverminedToken.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NeverminedToken.md#roleadminchangedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:179

___

### getRoleAdminChangeds

▸ **getRoleAdminChangeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NeverminedToken.md#roleadminchangedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.NeverminedToken.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedToken.md#multiqueryoptions)<[`RoleAdminChangedFilter`](subgraphs.NeverminedToken.md#roleadminchangedfilter), [`RoleAdminChangedResult`](subgraphs.NeverminedToken.md#roleadminchangedresult)\> |
| `args` | [`RoleAdminChangedArgs`](subgraphs.NeverminedToken.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NeverminedToken.md#roleadminchangedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:180

___

### getRoleGrantedById

▸ **getRoleGrantedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NeverminedToken.md#rolegrantedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.NeverminedToken.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedToken.md#singlequeryoptions) |
| `args` | [`RoleGrantedArgs`](subgraphs.NeverminedToken.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NeverminedToken.md#rolegrantedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:224

___

### getRoleGranteds

▸ **getRoleGranteds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NeverminedToken.md#rolegrantedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.NeverminedToken.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedToken.md#multiqueryoptions)<[`RoleGrantedFilter`](subgraphs.NeverminedToken.md#rolegrantedfilter), [`RoleGrantedResult`](subgraphs.NeverminedToken.md#rolegrantedresult)\> |
| `args` | [`RoleGrantedArgs`](subgraphs.NeverminedToken.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NeverminedToken.md#rolegrantedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:225

___

### getRoleRevokedById

▸ **getRoleRevokedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NeverminedToken.md#rolerevokedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.NeverminedToken.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedToken.md#singlequeryoptions) |
| `args` | [`RoleRevokedArgs`](subgraphs.NeverminedToken.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NeverminedToken.md#rolerevokedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:269

___

### getRoleRevokeds

▸ **getRoleRevokeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NeverminedToken.md#rolerevokedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.NeverminedToken.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedToken.md#multiqueryoptions)<[`RoleRevokedFilter`](subgraphs.NeverminedToken.md#rolerevokedfilter), [`RoleRevokedResult`](subgraphs.NeverminedToken.md#rolerevokedresult)\> |
| `args` | [`RoleRevokedArgs`](subgraphs.NeverminedToken.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NeverminedToken.md#rolerevokedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:270

___

### getTransferById

▸ **getTransferById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`TransferResult`](subgraphs.NeverminedToken.md#transferresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`TransferResult`](subgraphs.NeverminedToken.md#transferresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedToken.md#singlequeryoptions) |
| `args` | [`TransferArgs`](subgraphs.NeverminedToken.md#transferargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`TransferResult`](subgraphs.NeverminedToken.md#transferresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:316

___

### getTransfers

▸ **getTransfers**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`TransferResult`](subgraphs.NeverminedToken.md#transferresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`TransferResult`](subgraphs.NeverminedToken.md#transferresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedToken.md#multiqueryoptions)<[`TransferFilter`](subgraphs.NeverminedToken.md#transferfilter), [`TransferResult`](subgraphs.NeverminedToken.md#transferresult)\> |
| `args` | [`TransferArgs`](subgraphs.NeverminedToken.md#transferargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`TransferResult`](subgraphs.NeverminedToken.md#transferresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedToken.d.ts:317
