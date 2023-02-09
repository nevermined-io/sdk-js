[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / NeverminedConfig

# Namespace: NeverminedConfig

[subgraphs](subgraphs.md).NeverminedConfig

## Table of contents

### Type Aliases

- [InitializedArgs](subgraphs.NeverminedConfig.md#initializedargs)
- [InitializedFields](subgraphs.NeverminedConfig.md#initializedfields)
- [InitializedFilter](subgraphs.NeverminedConfig.md#initializedfilter)
- [InitializedResult](subgraphs.NeverminedConfig.md#initializedresult)
- [MultiQueryOptions](subgraphs.NeverminedConfig.md#multiqueryoptions)
- [NeverminedConfigChangeArgs](subgraphs.NeverminedConfig.md#neverminedconfigchangeargs)
- [NeverminedConfigChangeFields](subgraphs.NeverminedConfig.md#neverminedconfigchangefields)
- [NeverminedConfigChangeFilter](subgraphs.NeverminedConfig.md#neverminedconfigchangefilter)
- [NeverminedConfigChangeResult](subgraphs.NeverminedConfig.md#neverminedconfigchangeresult)
- [OwnershipTransferredArgs](subgraphs.NeverminedConfig.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.NeverminedConfig.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.NeverminedConfig.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.NeverminedConfig.md#ownershiptransferredresult)
- [RoleAdminChangedArgs](subgraphs.NeverminedConfig.md#roleadminchangedargs)
- [RoleAdminChangedFields](subgraphs.NeverminedConfig.md#roleadminchangedfields)
- [RoleAdminChangedFilter](subgraphs.NeverminedConfig.md#roleadminchangedfilter)
- [RoleAdminChangedResult](subgraphs.NeverminedConfig.md#roleadminchangedresult)
- [RoleGrantedArgs](subgraphs.NeverminedConfig.md#rolegrantedargs)
- [RoleGrantedFields](subgraphs.NeverminedConfig.md#rolegrantedfields)
- [RoleGrantedFilter](subgraphs.NeverminedConfig.md#rolegrantedfilter)
- [RoleGrantedResult](subgraphs.NeverminedConfig.md#rolegrantedresult)
- [RoleRevokedArgs](subgraphs.NeverminedConfig.md#rolerevokedargs)
- [RoleRevokedFields](subgraphs.NeverminedConfig.md#rolerevokedfields)
- [RoleRevokedFilter](subgraphs.NeverminedConfig.md#rolerevokedfilter)
- [RoleRevokedResult](subgraphs.NeverminedConfig.md#rolerevokedresult)
- [SingleQueryOptions](subgraphs.NeverminedConfig.md#singlequeryoptions)

### Functions

- [getInitializedById](subgraphs.NeverminedConfig.md#getinitializedbyid)
- [getInitializeds](subgraphs.NeverminedConfig.md#getinitializeds)
- [getNeverminedConfigChangeById](subgraphs.NeverminedConfig.md#getneverminedconfigchangebyid)
- [getNeverminedConfigChanges](subgraphs.NeverminedConfig.md#getneverminedconfigchanges)
- [getOwnershipTransferredById](subgraphs.NeverminedConfig.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.NeverminedConfig.md#getownershiptransferreds)
- [getRoleAdminChangedById](subgraphs.NeverminedConfig.md#getroleadminchangedbyid)
- [getRoleAdminChangeds](subgraphs.NeverminedConfig.md#getroleadminchangeds)
- [getRoleGrantedById](subgraphs.NeverminedConfig.md#getrolegrantedbyid)
- [getRoleGranteds](subgraphs.NeverminedConfig.md#getrolegranteds)
- [getRoleRevokedById](subgraphs.NeverminedConfig.md#getrolerevokedbyid)
- [getRoleRevokeds](subgraphs.NeverminedConfig.md#getrolerevokeds)

## Type Aliases

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| `K`  | extends keyof [`InitializedResult`](subgraphs.NeverminedConfig.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:46

---

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name      | Type   |
| :-------- | :----- |
| `id`      | `true` |
| `version` | `true` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:42

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

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:20

---

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `id`      | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:38

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

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:9

---

### NeverminedConfigChangeArgs

Ƭ **NeverminedConfigChangeArgs**<`K`\>: { [Property in keyof Pick<NeverminedConfigChangeFields, K\>]: NeverminedConfigChangeFields[Property] }

#### Type parameters

| Name | Type                                                                                                       |
| :--- | :--------------------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`NeverminedConfigChangeResult`](subgraphs.NeverminedConfig.md#neverminedconfigchangeresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:83

---

### NeverminedConfigChangeFields

Ƭ **NeverminedConfigChangeFields**: `Object`

#### Type declaration

| Name          | Type   |
| :------------ | :----- |
| `_parameter`  | `true` |
| `_whoChanged` | `true` |
| `id`          | `true` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:78

---

### NeverminedConfigChangeFilter

Ƭ **NeverminedConfigChangeFilter**: `Object`

#### Type declaration

| Name                        | Type               |
| :-------------------------- | :----------------- |
| `_parameter?`               | `string` \| `null` |
| `_parameter_contains?`      | `string` \| `null` |
| `_parameter_in?`            | `string`[]         |
| `_parameter_not?`           | `string` \| `null` |
| `_parameter_not_contains?`  | `string` \| `null` |
| `_parameter_not_in?`        | `string`[]         |
| `_whoChanged?`              | `string` \| `null` |
| `_whoChanged_contains?`     | `string` \| `null` |
| `_whoChanged_in?`           | `string`[]         |
| `_whoChanged_not?`          | `string` \| `null` |
| `_whoChanged_not_contains?` | `string` \| `null` |
| `_whoChanged_not_in?`       | `string`[]         |
| `id?`                       | `string` \| `null` |
| `id_gt?`                    | `string` \| `null` |
| `id_gte?`                   | `string` \| `null` |
| `id_in?`                    | `string`[]         |
| `id_lt?`                    | `string` \| `null` |
| `id_lte?`                   | `string` \| `null` |
| `id_not?`                   | `string` \| `null` |
| `id_not_in?`                | `string`[]         |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:51

---

### NeverminedConfigChangeResult

Ƭ **NeverminedConfigChangeResult**: `Object`

#### Type declaration

| Name          | Type     |
| :------------ | :------- |
| `_parameter`  | `string` |
| `_whoChanged` | `string` |
| `id`          | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:73

---

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type                                                                                                   |
| :--- | :----------------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`OwnershipTransferredResult`](subgraphs.NeverminedConfig.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:120

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

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:115

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

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:88

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

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:110

---

### RoleAdminChangedArgs

Ƭ **RoleAdminChangedArgs**<`K`\>: { [Property in keyof Pick<RoleAdminChangedFields, K\>]: RoleAdminChangedFields[Property] }

#### Type parameters

| Name | Type                                                                                           |
| :--- | :--------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`RoleAdminChangedResult`](subgraphs.NeverminedConfig.md#roleadminchangedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:165

---

### RoleAdminChangedFields

Ƭ **RoleAdminChangedFields**: `Object`

#### Type declaration

| Name                | Type   |
| :------------------ | :----- |
| `id`                | `true` |
| `newAdminRole`      | `true` |
| `previousAdminRole` | `true` |
| `role`              | `true` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:159

---

### RoleAdminChangedFilter

Ƭ **RoleAdminChangedFilter**: `Object`

#### Type declaration

| Name                              | Type               |
| :-------------------------------- | :----------------- |
| `id?`                             | `string` \| `null` |
| `id_gt?`                          | `string` \| `null` |
| `id_gte?`                         | `string` \| `null` |
| `id_in?`                          | `string`[]         |
| `id_lt?`                          | `string` \| `null` |
| `id_lte?`                         | `string` \| `null` |
| `id_not?`                         | `string` \| `null` |
| `id_not_in?`                      | `string`[]         |
| `newAdminRole?`                   | `string` \| `null` |
| `newAdminRole_contains?`          | `string` \| `null` |
| `newAdminRole_in?`                | `string`[]         |
| `newAdminRole_not?`               | `string` \| `null` |
| `newAdminRole_not_contains?`      | `string` \| `null` |
| `newAdminRole_not_in?`            | `string`[]         |
| `previousAdminRole?`              | `string` \| `null` |
| `previousAdminRole_contains?`     | `string` \| `null` |
| `previousAdminRole_in?`           | `string`[]         |
| `previousAdminRole_not?`          | `string` \| `null` |
| `previousAdminRole_not_contains?` | `string` \| `null` |
| `previousAdminRole_not_in?`       | `string`[]         |
| `role?`                           | `string` \| `null` |
| `role_contains?`                  | `string` \| `null` |
| `role_in?`                        | `string`[]         |
| `role_not?`                       | `string` \| `null` |
| `role_not_contains?`              | `string` \| `null` |
| `role_not_in?`                    | `string`[]         |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:125

---

### RoleAdminChangedResult

Ƭ **RoleAdminChangedResult**: `Object`

#### Type declaration

| Name                | Type     |
| :------------------ | :------- |
| `id`                | `string` |
| `newAdminRole`      | `string` |
| `previousAdminRole` | `string` |
| `role`              | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:153

---

### RoleGrantedArgs

Ƭ **RoleGrantedArgs**<`K`\>: { [Property in keyof Pick<RoleGrantedFields, K\>]: RoleGrantedFields[Property] }

#### Type parameters

| Name | Type                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| `K`  | extends keyof [`RoleGrantedResult`](subgraphs.NeverminedConfig.md#rolegrantedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:210

---

### RoleGrantedFields

Ƭ **RoleGrantedFields**: `Object`

#### Type declaration

| Name      | Type   |
| :-------- | :----- |
| `account` | `true` |
| `id`      | `true` |
| `role`    | `true` |
| `sender`  | `true` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:204

---

### RoleGrantedFilter

Ƭ **RoleGrantedFilter**: `Object`

#### Type declaration

| Name                    | Type               |
| :---------------------- | :----------------- |
| `account?`              | `string` \| `null` |
| `account_contains?`     | `string` \| `null` |
| `account_in?`           | `string`[]         |
| `account_not?`          | `string` \| `null` |
| `account_not_contains?` | `string` \| `null` |
| `account_not_in?`       | `string`[]         |
| `id?`                   | `string` \| `null` |
| `id_gt?`                | `string` \| `null` |
| `id_gte?`               | `string` \| `null` |
| `id_in?`                | `string`[]         |
| `id_lt?`                | `string` \| `null` |
| `id_lte?`               | `string` \| `null` |
| `id_not?`               | `string` \| `null` |
| `id_not_in?`            | `string`[]         |
| `role?`                 | `string` \| `null` |
| `role_contains?`        | `string` \| `null` |
| `role_in?`              | `string`[]         |
| `role_not?`             | `string` \| `null` |
| `role_not_contains?`    | `string` \| `null` |
| `role_not_in?`          | `string`[]         |
| `sender?`               | `string` \| `null` |
| `sender_contains?`      | `string` \| `null` |
| `sender_in?`            | `string`[]         |
| `sender_not?`           | `string` \| `null` |
| `sender_not_contains?`  | `string` \| `null` |
| `sender_not_in?`        | `string`[]         |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:170

---

### RoleGrantedResult

Ƭ **RoleGrantedResult**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `account` | `string` |
| `id`      | `string` |
| `role`    | `string` |
| `sender`  | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:198

---

### RoleRevokedArgs

Ƭ **RoleRevokedArgs**<`K`\>: { [Property in keyof Pick<RoleRevokedFields, K\>]: RoleRevokedFields[Property] }

#### Type parameters

| Name | Type                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| `K`  | extends keyof [`RoleRevokedResult`](subgraphs.NeverminedConfig.md#rolerevokedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:255

---

### RoleRevokedFields

Ƭ **RoleRevokedFields**: `Object`

#### Type declaration

| Name      | Type   |
| :-------- | :----- |
| `account` | `true` |
| `id`      | `true` |
| `role`    | `true` |
| `sender`  | `true` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:249

---

### RoleRevokedFilter

Ƭ **RoleRevokedFilter**: `Object`

#### Type declaration

| Name                    | Type               |
| :---------------------- | :----------------- |
| `account?`              | `string` \| `null` |
| `account_contains?`     | `string` \| `null` |
| `account_in?`           | `string`[]         |
| `account_not?`          | `string` \| `null` |
| `account_not_contains?` | `string` \| `null` |
| `account_not_in?`       | `string`[]         |
| `id?`                   | `string` \| `null` |
| `id_gt?`                | `string` \| `null` |
| `id_gte?`               | `string` \| `null` |
| `id_in?`                | `string`[]         |
| `id_lt?`                | `string` \| `null` |
| `id_lte?`               | `string` \| `null` |
| `id_not?`               | `string` \| `null` |
| `id_not_in?`            | `string`[]         |
| `role?`                 | `string` \| `null` |
| `role_contains?`        | `string` \| `null` |
| `role_in?`              | `string`[]         |
| `role_not?`             | `string` \| `null` |
| `role_not_contains?`    | `string` \| `null` |
| `role_not_in?`          | `string`[]         |
| `sender?`               | `string` \| `null` |
| `sender_contains?`      | `string` \| `null` |
| `sender_in?`            | `string`[]         |
| `sender_not?`           | `string` \| `null` |
| `sender_not_contains?`  | `string` \| `null` |
| `sender_not_in?`        | `string`[]         |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:215

---

### RoleRevokedResult

Ƭ **RoleRevokedResult**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `account` | `string` |
| `id`      | `string` |
| `role`    | `string` |
| `sender`  | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:243

---

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name     | Type                                           |
| :------- | :--------------------------------------------- |
| `block?` | { `number`: `number` } \| { `hash`: `string` } |
| `id`     | `string`                                       |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:1

## Functions

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NeverminedConfig.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| `K`  | extends keyof [`InitializedResult`](subgraphs.NeverminedConfig.md#initializedresult) |

#### Parameters

| Name      | Type                                                                     |
| :-------- | :----------------------------------------------------------------------- |
| `url`     | `string`                                                                 |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedConfig.md#singlequeryoptions) |
| `args`    | [`InitializedArgs`](subgraphs.NeverminedConfig.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NeverminedConfig.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:49

---

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NeverminedConfig.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| `K`  | extends keyof [`InitializedResult`](subgraphs.NeverminedConfig.md#initializedresult) |

#### Parameters

| Name      | Type                                                                                                                                                                                                                    |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`     | `string`                                                                                                                                                                                                                |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedConfig.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.NeverminedConfig.md#initializedfilter), [`InitializedResult`](subgraphs.NeverminedConfig.md#initializedresult)\> |
| `args`    | [`InitializedArgs`](subgraphs.NeverminedConfig.md#initializedargs)<`K`\>                                                                                                                                                |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NeverminedConfig.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:50

---

### getNeverminedConfigChangeById

▸ **getNeverminedConfigChangeById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`NeverminedConfigChangeResult`](subgraphs.NeverminedConfig.md#neverminedconfigchangeresult), `K`\>\>

#### Type parameters

| Name | Type                                                                                                       |
| :--- | :--------------------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`NeverminedConfigChangeResult`](subgraphs.NeverminedConfig.md#neverminedconfigchangeresult) |

#### Parameters

| Name      | Type                                                                                           |
| :-------- | :--------------------------------------------------------------------------------------------- |
| `url`     | `string`                                                                                       |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedConfig.md#singlequeryoptions)                       |
| `args`    | [`NeverminedConfigChangeArgs`](subgraphs.NeverminedConfig.md#neverminedconfigchangeargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`NeverminedConfigChangeResult`](subgraphs.NeverminedConfig.md#neverminedconfigchangeresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:86

---

### getNeverminedConfigChanges

▸ **getNeverminedConfigChanges**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`NeverminedConfigChangeResult`](subgraphs.NeverminedConfig.md#neverminedconfigchangeresult), `K`\>[]\>

#### Type parameters

| Name | Type                                                                                                       |
| :--- | :--------------------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`NeverminedConfigChangeResult`](subgraphs.NeverminedConfig.md#neverminedconfigchangeresult) |

#### Parameters

| Name      | Type                                                                                                                                                                                                                                                                |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `url`     | `string`                                                                                                                                                                                                                                                            |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedConfig.md#multiqueryoptions)<[`NeverminedConfigChangeFilter`](subgraphs.NeverminedConfig.md#neverminedconfigchangefilter), [`NeverminedConfigChangeResult`](subgraphs.NeverminedConfig.md#neverminedconfigchangeresult)\> |
| `args`    | [`NeverminedConfigChangeArgs`](subgraphs.NeverminedConfig.md#neverminedconfigchangeargs)<`K`\>                                                                                                                                                                      |

#### Returns

`Promise`<`Pick`<[`NeverminedConfigChangeResult`](subgraphs.NeverminedConfig.md#neverminedconfigchangeresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:87

---

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NeverminedConfig.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type                                                                                                   |
| :--- | :----------------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`OwnershipTransferredResult`](subgraphs.NeverminedConfig.md#ownershiptransferredresult) |

#### Parameters

| Name      | Type                                                                                       |
| :-------- | :----------------------------------------------------------------------------------------- |
| `url`     | `string`                                                                                   |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedConfig.md#singlequeryoptions)                   |
| `args`    | [`OwnershipTransferredArgs`](subgraphs.NeverminedConfig.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NeverminedConfig.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:123

---

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NeverminedConfig.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type                                                                                                   |
| :--- | :----------------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`OwnershipTransferredResult`](subgraphs.NeverminedConfig.md#ownershiptransferredresult) |

#### Parameters

| Name      | Type                                                                                                                                                                                                                                                        |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`     | `string`                                                                                                                                                                                                                                                    |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedConfig.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.NeverminedConfig.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.NeverminedConfig.md#ownershiptransferredresult)\> |
| `args`    | [`OwnershipTransferredArgs`](subgraphs.NeverminedConfig.md#ownershiptransferredargs)<`K`\>                                                                                                                                                                  |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NeverminedConfig.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:124

---

### getRoleAdminChangedById

▸ **getRoleAdminChangedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NeverminedConfig.md#roleadminchangedresult), `K`\>\>

#### Type parameters

| Name | Type                                                                                           |
| :--- | :--------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`RoleAdminChangedResult`](subgraphs.NeverminedConfig.md#roleadminchangedresult) |

#### Parameters

| Name      | Type                                                                               |
| :-------- | :--------------------------------------------------------------------------------- |
| `url`     | `string`                                                                           |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedConfig.md#singlequeryoptions)           |
| `args`    | [`RoleAdminChangedArgs`](subgraphs.NeverminedConfig.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NeverminedConfig.md#roleadminchangedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:168

---

### getRoleAdminChangeds

▸ **getRoleAdminChangeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NeverminedConfig.md#roleadminchangedresult), `K`\>[]\>

#### Type parameters

| Name | Type                                                                                           |
| :--- | :--------------------------------------------------------------------------------------------- |
| `K`  | extends keyof [`RoleAdminChangedResult`](subgraphs.NeverminedConfig.md#roleadminchangedresult) |

#### Parameters

| Name      | Type                                                                                                                                                                                                                                        |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `url`     | `string`                                                                                                                                                                                                                                    |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedConfig.md#multiqueryoptions)<[`RoleAdminChangedFilter`](subgraphs.NeverminedConfig.md#roleadminchangedfilter), [`RoleAdminChangedResult`](subgraphs.NeverminedConfig.md#roleadminchangedresult)\> |
| `args`    | [`RoleAdminChangedArgs`](subgraphs.NeverminedConfig.md#roleadminchangedargs)<`K`\>                                                                                                                                                          |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NeverminedConfig.md#roleadminchangedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:169

---

### getRoleGrantedById

▸ **getRoleGrantedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NeverminedConfig.md#rolegrantedresult), `K`\>\>

#### Type parameters

| Name | Type                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| `K`  | extends keyof [`RoleGrantedResult`](subgraphs.NeverminedConfig.md#rolegrantedresult) |

#### Parameters

| Name      | Type                                                                     |
| :-------- | :----------------------------------------------------------------------- |
| `url`     | `string`                                                                 |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedConfig.md#singlequeryoptions) |
| `args`    | [`RoleGrantedArgs`](subgraphs.NeverminedConfig.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NeverminedConfig.md#rolegrantedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:213

---

### getRoleGranteds

▸ **getRoleGranteds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NeverminedConfig.md#rolegrantedresult), `K`\>[]\>

#### Type parameters

| Name | Type                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| `K`  | extends keyof [`RoleGrantedResult`](subgraphs.NeverminedConfig.md#rolegrantedresult) |

#### Parameters

| Name      | Type                                                                                                                                                                                                                    |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`     | `string`                                                                                                                                                                                                                |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedConfig.md#multiqueryoptions)<[`RoleGrantedFilter`](subgraphs.NeverminedConfig.md#rolegrantedfilter), [`RoleGrantedResult`](subgraphs.NeverminedConfig.md#rolegrantedresult)\> |
| `args`    | [`RoleGrantedArgs`](subgraphs.NeverminedConfig.md#rolegrantedargs)<`K`\>                                                                                                                                                |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NeverminedConfig.md#rolegrantedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:214

---

### getRoleRevokedById

▸ **getRoleRevokedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NeverminedConfig.md#rolerevokedresult), `K`\>\>

#### Type parameters

| Name | Type                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| `K`  | extends keyof [`RoleRevokedResult`](subgraphs.NeverminedConfig.md#rolerevokedresult) |

#### Parameters

| Name      | Type                                                                     |
| :-------- | :----------------------------------------------------------------------- |
| `url`     | `string`                                                                 |
| `options` | [`SingleQueryOptions`](subgraphs.NeverminedConfig.md#singlequeryoptions) |
| `args`    | [`RoleRevokedArgs`](subgraphs.NeverminedConfig.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NeverminedConfig.md#rolerevokedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:258

---

### getRoleRevokeds

▸ **getRoleRevokeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NeverminedConfig.md#rolerevokedresult), `K`\>[]\>

#### Type parameters

| Name | Type                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| `K`  | extends keyof [`RoleRevokedResult`](subgraphs.NeverminedConfig.md#rolerevokedresult) |

#### Parameters

| Name      | Type                                                                                                                                                                                                                    |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`     | `string`                                                                                                                                                                                                                |
| `options` | [`MultiQueryOptions`](subgraphs.NeverminedConfig.md#multiqueryoptions)<[`RoleRevokedFilter`](subgraphs.NeverminedConfig.md#rolerevokedfilter), [`RoleRevokedResult`](subgraphs.NeverminedConfig.md#rolerevokedresult)\> |
| `args`    | [`RoleRevokedArgs`](subgraphs.NeverminedConfig.md#rolerevokedargs)<`K`\>                                                                                                                                                |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NeverminedConfig.md#rolerevokedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NeverminedConfig.d.ts:259
