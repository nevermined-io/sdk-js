[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / TransferNFT721Condition

# Namespace: TransferNFT721Condition

[subgraphs](subgraphs.md).TransferNFT721Condition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.TransferNFT721Condition.md#fulfilledargs)
- [FulfilledFields](subgraphs.TransferNFT721Condition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.TransferNFT721Condition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.TransferNFT721Condition.md#fulfilledresult)
- [InitializedArgs](subgraphs.TransferNFT721Condition.md#initializedargs)
- [InitializedFields](subgraphs.TransferNFT721Condition.md#initializedfields)
- [InitializedFilter](subgraphs.TransferNFT721Condition.md#initializedfilter)
- [InitializedResult](subgraphs.TransferNFT721Condition.md#initializedresult)
- [MultiQueryOptions](subgraphs.TransferNFT721Condition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.TransferNFT721Condition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.TransferNFT721Condition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.TransferNFT721Condition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.TransferNFT721Condition.md#ownershiptransferredresult)
- [RoleAdminChangedArgs](subgraphs.TransferNFT721Condition.md#roleadminchangedargs)
- [RoleAdminChangedFields](subgraphs.TransferNFT721Condition.md#roleadminchangedfields)
- [RoleAdminChangedFilter](subgraphs.TransferNFT721Condition.md#roleadminchangedfilter)
- [RoleAdminChangedResult](subgraphs.TransferNFT721Condition.md#roleadminchangedresult)
- [RoleGrantedArgs](subgraphs.TransferNFT721Condition.md#rolegrantedargs)
- [RoleGrantedFields](subgraphs.TransferNFT721Condition.md#rolegrantedfields)
- [RoleGrantedFilter](subgraphs.TransferNFT721Condition.md#rolegrantedfilter)
- [RoleGrantedResult](subgraphs.TransferNFT721Condition.md#rolegrantedresult)
- [RoleRevokedArgs](subgraphs.TransferNFT721Condition.md#rolerevokedargs)
- [RoleRevokedFields](subgraphs.TransferNFT721Condition.md#rolerevokedfields)
- [RoleRevokedFilter](subgraphs.TransferNFT721Condition.md#rolerevokedfilter)
- [RoleRevokedResult](subgraphs.TransferNFT721Condition.md#rolerevokedresult)
- [SingleQueryOptions](subgraphs.TransferNFT721Condition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.TransferNFT721Condition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.TransferNFT721Condition.md#getfulfilleds)
- [getInitializedById](subgraphs.TransferNFT721Condition.md#getinitializedbyid)
- [getInitializeds](subgraphs.TransferNFT721Condition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.TransferNFT721Condition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.TransferNFT721Condition.md#getownershiptransferreds)
- [getRoleAdminChangedById](subgraphs.TransferNFT721Condition.md#getroleadminchangedbyid)
- [getRoleAdminChangeds](subgraphs.TransferNFT721Condition.md#getroleadminchangeds)
- [getRoleGrantedById](subgraphs.TransferNFT721Condition.md#getrolegrantedbyid)
- [getRoleGranteds](subgraphs.TransferNFT721Condition.md#getrolegranteds)
- [getRoleRevokedById](subgraphs.TransferNFT721Condition.md#getrolerevokedbyid)
- [getRoleRevokeds](subgraphs.TransferNFT721Condition.md#getrolerevokeds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.TransferNFT721Condition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:87

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:78

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:21

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:69

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.TransferNFT721Condition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:118

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:114

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:92

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:110

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.TransferNFT721Condition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:155

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:150

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:123

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:145

___

### RoleAdminChangedArgs

Ƭ **RoleAdminChangedArgs**<`K`\>: { [Property in keyof Pick<RoleAdminChangedFields, K\>]: RoleAdminChangedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.TransferNFT721Condition.md#roleadminchangedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:200

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:194

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:160

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:188

___

### RoleGrantedArgs

Ƭ **RoleGrantedArgs**<`K`\>: { [Property in keyof Pick<RoleGrantedFields, K\>]: RoleGrantedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.TransferNFT721Condition.md#rolegrantedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:245

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:239

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:205

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:233

___

### RoleRevokedArgs

Ƭ **RoleRevokedArgs**<`K`\>: { [Property in keyof Pick<RoleRevokedFields, K\>]: RoleRevokedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.TransferNFT721Condition.md#rolerevokedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:290

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:284

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:250

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

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:278

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:2

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferNFT721Condition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.TransferNFT721Condition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFT721Condition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.TransferNFT721Condition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferNFT721Condition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:90

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferNFT721Condition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.TransferNFT721Condition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFT721Condition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.TransferNFT721Condition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.TransferNFT721Condition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.TransferNFT721Condition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.TransferNFT721Condition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:91

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferNFT721Condition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.TransferNFT721Condition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFT721Condition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.TransferNFT721Condition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferNFT721Condition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:121

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferNFT721Condition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.TransferNFT721Condition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFT721Condition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.TransferNFT721Condition.md#initializedfilter), [`InitializedResult`](subgraphs.TransferNFT721Condition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.TransferNFT721Condition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.TransferNFT721Condition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:122

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferNFT721Condition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.TransferNFT721Condition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFT721Condition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.TransferNFT721Condition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferNFT721Condition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:158

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferNFT721Condition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.TransferNFT721Condition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFT721Condition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.TransferNFT721Condition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.TransferNFT721Condition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.TransferNFT721Condition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.TransferNFT721Condition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:159

___

### getRoleAdminChangedById

▸ **getRoleAdminChangedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.TransferNFT721Condition.md#roleadminchangedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.TransferNFT721Condition.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFT721Condition.md#singlequeryoptions) |
| `args` | [`RoleAdminChangedArgs`](subgraphs.TransferNFT721Condition.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.TransferNFT721Condition.md#roleadminchangedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:203

___

### getRoleAdminChangeds

▸ **getRoleAdminChangeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.TransferNFT721Condition.md#roleadminchangedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.TransferNFT721Condition.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFT721Condition.md#multiqueryoptions)<[`RoleAdminChangedFilter`](subgraphs.TransferNFT721Condition.md#roleadminchangedfilter), [`RoleAdminChangedResult`](subgraphs.TransferNFT721Condition.md#roleadminchangedresult)\> |
| `args` | [`RoleAdminChangedArgs`](subgraphs.TransferNFT721Condition.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.TransferNFT721Condition.md#roleadminchangedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:204

___

### getRoleGrantedById

▸ **getRoleGrantedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.TransferNFT721Condition.md#rolegrantedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.TransferNFT721Condition.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFT721Condition.md#singlequeryoptions) |
| `args` | [`RoleGrantedArgs`](subgraphs.TransferNFT721Condition.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.TransferNFT721Condition.md#rolegrantedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:248

___

### getRoleGranteds

▸ **getRoleGranteds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.TransferNFT721Condition.md#rolegrantedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.TransferNFT721Condition.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFT721Condition.md#multiqueryoptions)<[`RoleGrantedFilter`](subgraphs.TransferNFT721Condition.md#rolegrantedfilter), [`RoleGrantedResult`](subgraphs.TransferNFT721Condition.md#rolegrantedresult)\> |
| `args` | [`RoleGrantedArgs`](subgraphs.TransferNFT721Condition.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.TransferNFT721Condition.md#rolegrantedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:249

___

### getRoleRevokedById

▸ **getRoleRevokedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.TransferNFT721Condition.md#rolerevokedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.TransferNFT721Condition.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.TransferNFT721Condition.md#singlequeryoptions) |
| `args` | [`RoleRevokedArgs`](subgraphs.TransferNFT721Condition.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.TransferNFT721Condition.md#rolerevokedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:293

___

### getRoleRevokeds

▸ **getRoleRevokeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.TransferNFT721Condition.md#rolerevokedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.TransferNFT721Condition.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.TransferNFT721Condition.md#multiqueryoptions)<[`RoleRevokedFilter`](subgraphs.TransferNFT721Condition.md#rolerevokedfilter), [`RoleRevokedResult`](subgraphs.TransferNFT721Condition.md#rolerevokedresult)\> |
| `args` | [`RoleRevokedArgs`](subgraphs.TransferNFT721Condition.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.TransferNFT721Condition.md#rolerevokedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/TransferNFT721Condition.d.ts:294
