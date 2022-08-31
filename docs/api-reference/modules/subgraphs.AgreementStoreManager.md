[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / AgreementStoreManager

# Namespace: AgreementStoreManager

[subgraphs](subgraphs.md).AgreementStoreManager

## Table of contents

### Type Aliases

- [InitializedArgs](subgraphs.AgreementStoreManager.md#initializedargs)
- [InitializedFields](subgraphs.AgreementStoreManager.md#initializedfields)
- [InitializedFilter](subgraphs.AgreementStoreManager.md#initializedfilter)
- [InitializedResult](subgraphs.AgreementStoreManager.md#initializedresult)
- [MultiQueryOptions](subgraphs.AgreementStoreManager.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.AgreementStoreManager.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.AgreementStoreManager.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.AgreementStoreManager.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.AgreementStoreManager.md#ownershiptransferredresult)
- [RoleAdminChangedArgs](subgraphs.AgreementStoreManager.md#roleadminchangedargs)
- [RoleAdminChangedFields](subgraphs.AgreementStoreManager.md#roleadminchangedfields)
- [RoleAdminChangedFilter](subgraphs.AgreementStoreManager.md#roleadminchangedfilter)
- [RoleAdminChangedResult](subgraphs.AgreementStoreManager.md#roleadminchangedresult)
- [RoleGrantedArgs](subgraphs.AgreementStoreManager.md#rolegrantedargs)
- [RoleGrantedFields](subgraphs.AgreementStoreManager.md#rolegrantedfields)
- [RoleGrantedFilter](subgraphs.AgreementStoreManager.md#rolegrantedfilter)
- [RoleGrantedResult](subgraphs.AgreementStoreManager.md#rolegrantedresult)
- [RoleRevokedArgs](subgraphs.AgreementStoreManager.md#rolerevokedargs)
- [RoleRevokedFields](subgraphs.AgreementStoreManager.md#rolerevokedfields)
- [RoleRevokedFilter](subgraphs.AgreementStoreManager.md#rolerevokedfilter)
- [RoleRevokedResult](subgraphs.AgreementStoreManager.md#rolerevokedresult)
- [SingleQueryOptions](subgraphs.AgreementStoreManager.md#singlequeryoptions)

### Functions

- [getInitializedById](subgraphs.AgreementStoreManager.md#getinitializedbyid)
- [getInitializeds](subgraphs.AgreementStoreManager.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.AgreementStoreManager.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.AgreementStoreManager.md#getownershiptransferreds)
- [getRoleAdminChangedById](subgraphs.AgreementStoreManager.md#getroleadminchangedbyid)
- [getRoleAdminChangeds](subgraphs.AgreementStoreManager.md#getroleadminchangeds)
- [getRoleGrantedById](subgraphs.AgreementStoreManager.md#getrolegrantedbyid)
- [getRoleGranteds](subgraphs.AgreementStoreManager.md#getrolegranteds)
- [getRoleRevokedById](subgraphs.AgreementStoreManager.md#getrolerevokedbyid)
- [getRoleRevokeds](subgraphs.AgreementStoreManager.md#getrolerevokeds)

## Type Aliases

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AgreementStoreManager.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:46

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:42

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:20

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:38

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:9

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AgreementStoreManager.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:83

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:78

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:51

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:73

___

### RoleAdminChangedArgs

Ƭ **RoleAdminChangedArgs**<`K`\>: { [Property in keyof Pick<RoleAdminChangedFields, K\>]: RoleAdminChangedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.AgreementStoreManager.md#roleadminchangedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:128

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:122

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:88

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:116

___

### RoleGrantedArgs

Ƭ **RoleGrantedArgs**<`K`\>: { [Property in keyof Pick<RoleGrantedFields, K\>]: RoleGrantedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.AgreementStoreManager.md#rolegrantedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:173

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:167

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:133

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:161

___

### RoleRevokedArgs

Ƭ **RoleRevokedArgs**<`K`\>: { [Property in keyof Pick<RoleRevokedFields, K\>]: RoleRevokedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.AgreementStoreManager.md#rolerevokedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:218

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:212

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:178

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

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:206

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:1

## Functions

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.AgreementStoreManager.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AgreementStoreManager.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AgreementStoreManager.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.AgreementStoreManager.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.AgreementStoreManager.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:49

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.AgreementStoreManager.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.AgreementStoreManager.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AgreementStoreManager.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.AgreementStoreManager.md#initializedfilter), [`InitializedResult`](subgraphs.AgreementStoreManager.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.AgreementStoreManager.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.AgreementStoreManager.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:50

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AgreementStoreManager.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AgreementStoreManager.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AgreementStoreManager.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.AgreementStoreManager.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AgreementStoreManager.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:86

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AgreementStoreManager.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.AgreementStoreManager.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AgreementStoreManager.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.AgreementStoreManager.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.AgreementStoreManager.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.AgreementStoreManager.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.AgreementStoreManager.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:87

___

### getRoleAdminChangedById

▸ **getRoleAdminChangedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.AgreementStoreManager.md#roleadminchangedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.AgreementStoreManager.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AgreementStoreManager.md#singlequeryoptions) |
| `args` | [`RoleAdminChangedArgs`](subgraphs.AgreementStoreManager.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.AgreementStoreManager.md#roleadminchangedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:131

___

### getRoleAdminChangeds

▸ **getRoleAdminChangeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.AgreementStoreManager.md#roleadminchangedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.AgreementStoreManager.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AgreementStoreManager.md#multiqueryoptions)<[`RoleAdminChangedFilter`](subgraphs.AgreementStoreManager.md#roleadminchangedfilter), [`RoleAdminChangedResult`](subgraphs.AgreementStoreManager.md#roleadminchangedresult)\> |
| `args` | [`RoleAdminChangedArgs`](subgraphs.AgreementStoreManager.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.AgreementStoreManager.md#roleadminchangedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:132

___

### getRoleGrantedById

▸ **getRoleGrantedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.AgreementStoreManager.md#rolegrantedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.AgreementStoreManager.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AgreementStoreManager.md#singlequeryoptions) |
| `args` | [`RoleGrantedArgs`](subgraphs.AgreementStoreManager.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.AgreementStoreManager.md#rolegrantedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:176

___

### getRoleGranteds

▸ **getRoleGranteds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.AgreementStoreManager.md#rolegrantedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.AgreementStoreManager.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AgreementStoreManager.md#multiqueryoptions)<[`RoleGrantedFilter`](subgraphs.AgreementStoreManager.md#rolegrantedfilter), [`RoleGrantedResult`](subgraphs.AgreementStoreManager.md#rolegrantedresult)\> |
| `args` | [`RoleGrantedArgs`](subgraphs.AgreementStoreManager.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.AgreementStoreManager.md#rolegrantedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:177

___

### getRoleRevokedById

▸ **getRoleRevokedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.AgreementStoreManager.md#rolerevokedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.AgreementStoreManager.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.AgreementStoreManager.md#singlequeryoptions) |
| `args` | [`RoleRevokedArgs`](subgraphs.AgreementStoreManager.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.AgreementStoreManager.md#rolerevokedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:221

___

### getRoleRevokeds

▸ **getRoleRevokeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.AgreementStoreManager.md#rolerevokedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.AgreementStoreManager.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.AgreementStoreManager.md#multiqueryoptions)<[`RoleRevokedFilter`](subgraphs.AgreementStoreManager.md#rolerevokedfilter), [`RoleRevokedResult`](subgraphs.AgreementStoreManager.md#rolerevokedresult)\> |
| `args` | [`RoleRevokedArgs`](subgraphs.AgreementStoreManager.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.AgreementStoreManager.md#rolerevokedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/AgreementStoreManager.d.ts:222
