[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / TransferNFTCondition

# Namespace: TransferNFTCondition

[subgraphs](subgraphs.md).TransferNFTCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.TransferNFTCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.TransferNFTCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.TransferNFTCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.TransferNFTCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.TransferNFTCondition.md#initializedargs)
- [InitializedFields](subgraphs.TransferNFTCondition.md#initializedfields)
- [InitializedFilter](subgraphs.TransferNFTCondition.md#initializedfilter)
- [InitializedResult](subgraphs.TransferNFTCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.TransferNFTCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.TransferNFTCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.TransferNFTCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.TransferNFTCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.TransferNFTCondition.md#ownershiptransferredresult)
- [RoleAdminChangedArgs](subgraphs.TransferNFTCondition.md#roleadminchangedargs)
- [RoleAdminChangedFields](subgraphs.TransferNFTCondition.md#roleadminchangedfields)
- [RoleAdminChangedFilter](subgraphs.TransferNFTCondition.md#roleadminchangedfilter)
- [RoleAdminChangedResult](subgraphs.TransferNFTCondition.md#roleadminchangedresult)
- [RoleGrantedArgs](subgraphs.TransferNFTCondition.md#rolegrantedargs)
- [RoleGrantedFields](subgraphs.TransferNFTCondition.md#rolegrantedfields)
- [RoleGrantedFilter](subgraphs.TransferNFTCondition.md#rolegrantedfilter)
- [RoleGrantedResult](subgraphs.TransferNFTCondition.md#rolegrantedresult)
- [RoleRevokedArgs](subgraphs.TransferNFTCondition.md#rolerevokedargs)
- [RoleRevokedFields](subgraphs.TransferNFTCondition.md#rolerevokedfields)
- [RoleRevokedFilter](subgraphs.TransferNFTCondition.md#rolerevokedfilter)
- [RoleRevokedResult](subgraphs.TransferNFTCondition.md#rolerevokedresult)
- [SingleQueryOptions](subgraphs.TransferNFTCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.TransferNFTCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.TransferNFTCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.TransferNFTCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.TransferNFTCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.TransferNFTCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.TransferNFTCondition.md#getownershiptransferreds)
- [getRoleAdminChangedById](subgraphs.TransferNFTCondition.md#getroleadminchangedbyid)
- [getRoleAdminChangeds](subgraphs.TransferNFTCondition.md#getroleadminchangeds)
- [getRoleGrantedById](subgraphs.TransferNFTCondition.md#getrolegrantedbyid)
- [getRoleGranteds](subgraphs.TransferNFTCondition.md#getrolegranteds)
- [getRoleRevokedById](subgraphs.TransferNFTCondition.md#getrolerevokedbyid)
- [getRoleRevokeds](subgraphs.TransferNFTCondition.md#getrolerevokeds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.TransferNFTCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:87

___

### FulfilledFields

Ƭ **FulfilledFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | ``true`` |
| `_amount` | ``true`` |
| `_conditionId` | ``true`` |
| `_contract` | ``true`` |
| `_did` | ``true`` |
| `_receiver` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:78

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
| `_amount?` | `WeiSource` \| ``null`` |
| `_amount_gt?` | `WeiSource` \| ``null`` |
| `_amount_gte?` | `WeiSource` \| ``null`` |
| `_amount_in?` | `WeiSource`[] |
| `_amount_lt?` | `WeiSource` \| ``null`` |
| `_amount_lte?` | `WeiSource` \| ``null`` |
| `_amount_not?` | `WeiSource` \| ``null`` |
| `_amount_not_in?` | `WeiSource`[] |
| `_conditionId?` | `string` \| ``null`` |
| `_conditionId_contains?` | `string` \| ``null`` |
| `_conditionId_in?` | `string`[] |
| `_conditionId_not?` | `string` \| ``null`` |
| `_conditionId_not_contains?` | `string` \| ``null`` |
| `_conditionId_not_in?` | `string`[] |
| `_contract?` | `string` \| ``null`` |
| `_contract_contains?` | `string` \| ``null`` |
| `_contract_in?` | `string`[] |
| `_contract_not?` | `string` \| ``null`` |
| `_contract_not_contains?` | `string` \| ``null`` |
| `_contract_not_in?` | `string`[] |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `_receiver?` | `string` \| ``null`` |
| `_receiver_contains?` | `string` \| ``null`` |
| `_receiver_in?` | `string`[] |
| `_receiver_not?` | `string` \| ``null`` |
| `_receiver_not_contains?` | `string` \| ``null`` |
| `_receiver_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:21

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | `string` |
| `_amount` | `Wei` |
| `_conditionId` | `string` |
| `_contract` | `string` |
| `_did` | `string` |
| `_receiver` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:69

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.TransferNFTCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:118

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:114

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:92

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:110

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.TransferNFTCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:155

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:150

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:123

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:145

___

### RoleAdminChangedArgs

Ƭ **RoleAdminChangedArgs**<`K`\>: { [Property in keyof Pick<RoleAdminChangedFields, K\>]: RoleAdminChangedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.TransferNFTCondition.md#roleadminchangedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:200

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:194

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:160

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:188

___

### RoleGrantedArgs

Ƭ **RoleGrantedArgs**<`K`\>: { [Property in keyof Pick<RoleGrantedFields, K\>]: RoleGrantedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.TransferNFTCondition.md#rolegrantedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:245

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:239

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:205

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:233

___

### RoleRevokedArgs

Ƭ **RoleRevokedArgs**<`K`\>: { [Property in keyof Pick<RoleRevokedFields, K\>]: RoleRevokedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.TransferNFTCondition.md#rolerevokedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:290

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:284

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:250

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

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:278

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:2

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferNFTCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.TransferNFTCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFTCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.TransferNFTCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferNFTCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:90

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferNFTCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.TransferNFTCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFTCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.TransferNFTCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.TransferNFTCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.TransferNFTCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferNFTCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:91

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferNFTCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.TransferNFTCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFTCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.TransferNFTCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferNFTCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:121

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferNFTCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.TransferNFTCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFTCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.TransferNFTCondition.md#initializedfilter), [`InitializedResult`](subgraphs.TransferNFTCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.TransferNFTCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferNFTCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:122

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferNFTCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.TransferNFTCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFTCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.TransferNFTCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferNFTCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:158

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferNFTCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.TransferNFTCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFTCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.TransferNFTCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.TransferNFTCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.TransferNFTCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferNFTCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:159

___

### getRoleAdminChangedById

▸ **getRoleAdminChangedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.TransferNFTCondition.md#roleadminchangedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.TransferNFTCondition.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFTCondition.md#singlequeryoptions) |
| `args` | [`RoleAdminChangedArgs`](subgraphs.TransferNFTCondition.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.TransferNFTCondition.md#roleadminchangedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:203

___

### getRoleAdminChangeds

▸ **getRoleAdminChangeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.TransferNFTCondition.md#roleadminchangedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.TransferNFTCondition.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFTCondition.md#multiqueryoptions)<[`RoleAdminChangedFilter`](subgraphs.TransferNFTCondition.md#roleadminchangedfilter), [`RoleAdminChangedResult`](subgraphs.TransferNFTCondition.md#roleadminchangedresult)\> |
| `args` | [`RoleAdminChangedArgs`](subgraphs.TransferNFTCondition.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.TransferNFTCondition.md#roleadminchangedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:204

___

### getRoleGrantedById

▸ **getRoleGrantedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.TransferNFTCondition.md#rolegrantedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.TransferNFTCondition.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFTCondition.md#singlequeryoptions) |
| `args` | [`RoleGrantedArgs`](subgraphs.TransferNFTCondition.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.TransferNFTCondition.md#rolegrantedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:248

___

### getRoleGranteds

▸ **getRoleGranteds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.TransferNFTCondition.md#rolegrantedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.TransferNFTCondition.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFTCondition.md#multiqueryoptions)<[`RoleGrantedFilter`](subgraphs.TransferNFTCondition.md#rolegrantedfilter), [`RoleGrantedResult`](subgraphs.TransferNFTCondition.md#rolegrantedresult)\> |
| `args` | [`RoleGrantedArgs`](subgraphs.TransferNFTCondition.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.TransferNFTCondition.md#rolegrantedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:249

___

### getRoleRevokedById

▸ **getRoleRevokedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.TransferNFTCondition.md#rolerevokedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.TransferNFTCondition.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFTCondition.md#singlequeryoptions) |
| `args` | [`RoleRevokedArgs`](subgraphs.TransferNFTCondition.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.TransferNFTCondition.md#rolerevokedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:293

___

### getRoleRevokeds

▸ **getRoleRevokeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.TransferNFTCondition.md#rolerevokedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.TransferNFTCondition.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFTCondition.md#multiqueryoptions)<[`RoleRevokedFilter`](subgraphs.TransferNFTCondition.md#rolerevokedfilter), [`RoleRevokedResult`](subgraphs.TransferNFTCondition.md#rolerevokedresult)\> |
| `args` | [`RoleRevokedArgs`](subgraphs.TransferNFTCondition.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.TransferNFTCondition.md#rolerevokedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFTCondition.d.ts:294
