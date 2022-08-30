[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / NFT721Upgradeable

# Namespace: NFT721Upgradeable

[subgraphs](subgraphs.md).NFT721Upgradeable

## Table of contents

### Type Aliases

- [ApprovalArgs](subgraphs.NFT721Upgradeable.md#approvalargs)
- [ApprovalFields](subgraphs.NFT721Upgradeable.md#approvalfields)
- [ApprovalFilter](subgraphs.NFT721Upgradeable.md#approvalfilter)
- [ApprovalForAllArgs](subgraphs.NFT721Upgradeable.md#approvalforallargs)
- [ApprovalForAllFields](subgraphs.NFT721Upgradeable.md#approvalforallfields)
- [ApprovalForAllFilter](subgraphs.NFT721Upgradeable.md#approvalforallfilter)
- [ApprovalForAllResult](subgraphs.NFT721Upgradeable.md#approvalforallresult)
- [ApprovalResult](subgraphs.NFT721Upgradeable.md#approvalresult)
- [InitializedArgs](subgraphs.NFT721Upgradeable.md#initializedargs)
- [InitializedFields](subgraphs.NFT721Upgradeable.md#initializedfields)
- [InitializedFilter](subgraphs.NFT721Upgradeable.md#initializedfilter)
- [InitializedResult](subgraphs.NFT721Upgradeable.md#initializedresult)
- [MultiQueryOptions](subgraphs.NFT721Upgradeable.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.NFT721Upgradeable.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.NFT721Upgradeable.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.NFT721Upgradeable.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.NFT721Upgradeable.md#ownershiptransferredresult)
- [ProxyApprovalArgs](subgraphs.NFT721Upgradeable.md#proxyapprovalargs)
- [ProxyApprovalFields](subgraphs.NFT721Upgradeable.md#proxyapprovalfields)
- [ProxyApprovalFilter](subgraphs.NFT721Upgradeable.md#proxyapprovalfilter)
- [ProxyApprovalResult](subgraphs.NFT721Upgradeable.md#proxyapprovalresult)
- [RoleAdminChangedArgs](subgraphs.NFT721Upgradeable.md#roleadminchangedargs)
- [RoleAdminChangedFields](subgraphs.NFT721Upgradeable.md#roleadminchangedfields)
- [RoleAdminChangedFilter](subgraphs.NFT721Upgradeable.md#roleadminchangedfilter)
- [RoleAdminChangedResult](subgraphs.NFT721Upgradeable.md#roleadminchangedresult)
- [RoleGrantedArgs](subgraphs.NFT721Upgradeable.md#rolegrantedargs)
- [RoleGrantedFields](subgraphs.NFT721Upgradeable.md#rolegrantedfields)
- [RoleGrantedFilter](subgraphs.NFT721Upgradeable.md#rolegrantedfilter)
- [RoleGrantedResult](subgraphs.NFT721Upgradeable.md#rolegrantedresult)
- [RoleRevokedArgs](subgraphs.NFT721Upgradeable.md#rolerevokedargs)
- [RoleRevokedFields](subgraphs.NFT721Upgradeable.md#rolerevokedfields)
- [RoleRevokedFilter](subgraphs.NFT721Upgradeable.md#rolerevokedfilter)
- [RoleRevokedResult](subgraphs.NFT721Upgradeable.md#rolerevokedresult)
- [SingleQueryOptions](subgraphs.NFT721Upgradeable.md#singlequeryoptions)
- [TransferArgs](subgraphs.NFT721Upgradeable.md#transferargs)
- [TransferFields](subgraphs.NFT721Upgradeable.md#transferfields)
- [TransferFilter](subgraphs.NFT721Upgradeable.md#transferfilter)
- [TransferResult](subgraphs.NFT721Upgradeable.md#transferresult)

### Functions

- [getApprovalById](subgraphs.NFT721Upgradeable.md#getapprovalbyid)
- [getApprovalForAllById](subgraphs.NFT721Upgradeable.md#getapprovalforallbyid)
- [getApprovalForAlls](subgraphs.NFT721Upgradeable.md#getapprovalforalls)
- [getApprovals](subgraphs.NFT721Upgradeable.md#getapprovals)
- [getInitializedById](subgraphs.NFT721Upgradeable.md#getinitializedbyid)
- [getInitializeds](subgraphs.NFT721Upgradeable.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.NFT721Upgradeable.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.NFT721Upgradeable.md#getownershiptransferreds)
- [getProxyApprovalById](subgraphs.NFT721Upgradeable.md#getproxyapprovalbyid)
- [getProxyApprovals](subgraphs.NFT721Upgradeable.md#getproxyapprovals)
- [getRoleAdminChangedById](subgraphs.NFT721Upgradeable.md#getroleadminchangedbyid)
- [getRoleAdminChangeds](subgraphs.NFT721Upgradeable.md#getroleadminchangeds)
- [getRoleGrantedById](subgraphs.NFT721Upgradeable.md#getrolegrantedbyid)
- [getRoleGranteds](subgraphs.NFT721Upgradeable.md#getrolegranteds)
- [getRoleRevokedById](subgraphs.NFT721Upgradeable.md#getrolerevokedbyid)
- [getRoleRevokeds](subgraphs.NFT721Upgradeable.md#getrolerevokeds)
- [getTransferById](subgraphs.NFT721Upgradeable.md#gettransferbyid)
- [getTransfers](subgraphs.NFT721Upgradeable.md#gettransfers)

## Type Aliases

### ApprovalArgs

Ƭ **ApprovalArgs**<`K`\>: { [Property in keyof Pick<ApprovalFields, K\>]: ApprovalFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ApprovalResult`](subgraphs.NFT721Upgradeable.md#approvalresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:63

___

### ApprovalFields

Ƭ **ApprovalFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `approved` | ``true`` |
| `id` | ``true`` |
| `owner` | ``true`` |
| `tokenId` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:57

___

### ApprovalFilter

Ƭ **ApprovalFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `approved?` | `string` \| ``null`` |
| `approved_contains?` | `string` \| ``null`` |
| `approved_in?` | `string`[] |
| `approved_not?` | `string` \| ``null`` |
| `approved_not_contains?` | `string` \| ``null`` |
| `approved_not_in?` | `string`[] |
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
| `tokenId?` | `WeiSource` \| ``null`` |
| `tokenId_gt?` | `WeiSource` \| ``null`` |
| `tokenId_gte?` | `WeiSource` \| ``null`` |
| `tokenId_in?` | `WeiSource`[] |
| `tokenId_lt?` | `WeiSource` \| ``null`` |
| `tokenId_lte?` | `WeiSource` \| ``null`` |
| `tokenId_not?` | `WeiSource` \| ``null`` |
| `tokenId_not_in?` | `WeiSource`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:21

___

### ApprovalForAllArgs

Ƭ **ApprovalForAllArgs**<`K`\>: { [Property in keyof Pick<ApprovalForAllFields, K\>]: ApprovalForAllFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ApprovalForAllResult`](subgraphs.NFT721Upgradeable.md#approvalforallresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:106

___

### ApprovalForAllFields

Ƭ **ApprovalForAllFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `approved` | ``true`` |
| `id` | ``true`` |
| `operator` | ``true`` |
| `owner` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:100

___

### ApprovalForAllFilter

Ƭ **ApprovalForAllFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `approved?` | `boolean` \| ``null`` |
| `approved_in?` | `boolean`[] |
| `approved_not?` | `boolean` \| ``null`` |
| `approved_not_in?` | `boolean`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `operator?` | `string` \| ``null`` |
| `operator_contains?` | `string` \| ``null`` |
| `operator_in?` | `string`[] |
| `operator_not?` | `string` \| ``null`` |
| `operator_not_contains?` | `string` \| ``null`` |
| `operator_not_in?` | `string`[] |
| `owner?` | `string` \| ``null`` |
| `owner_contains?` | `string` \| ``null`` |
| `owner_in?` | `string`[] |
| `owner_not?` | `string` \| ``null`` |
| `owner_not_contains?` | `string` \| ``null`` |
| `owner_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:68

___

### ApprovalForAllResult

Ƭ **ApprovalForAllResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `approved` | `boolean` |
| `id` | `string` |
| `operator` | `string` |
| `owner` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:94

___

### ApprovalResult

Ƭ **ApprovalResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `approved` | `string` |
| `id` | `string` |
| `owner` | `string` |
| `tokenId` | `Wei` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:51

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721Upgradeable.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:137

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:133

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:111

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:129

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721Upgradeable.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:174

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:169

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:142

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:164

___

### ProxyApprovalArgs

Ƭ **ProxyApprovalArgs**<`K`\>: { [Property in keyof Pick<ProxyApprovalFields, K\>]: ProxyApprovalFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ProxyApprovalResult`](subgraphs.NFT721Upgradeable.md#proxyapprovalresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:217

___

### ProxyApprovalFields

Ƭ **ProxyApprovalFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `approved` | ``true`` |
| `id` | ``true`` |
| `operator` | ``true`` |
| `sender` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:211

___

### ProxyApprovalFilter

Ƭ **ProxyApprovalFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `approved?` | `boolean` \| ``null`` |
| `approved_in?` | `boolean`[] |
| `approved_not?` | `boolean` \| ``null`` |
| `approved_not_in?` | `boolean`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `operator?` | `string` \| ``null`` |
| `operator_contains?` | `string` \| ``null`` |
| `operator_in?` | `string`[] |
| `operator_not?` | `string` \| ``null`` |
| `operator_not_contains?` | `string` \| ``null`` |
| `operator_not_in?` | `string`[] |
| `sender?` | `string` \| ``null`` |
| `sender_contains?` | `string` \| ``null`` |
| `sender_in?` | `string`[] |
| `sender_not?` | `string` \| ``null`` |
| `sender_not_contains?` | `string` \| ``null`` |
| `sender_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:179

___

### ProxyApprovalResult

Ƭ **ProxyApprovalResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `approved` | `boolean` |
| `id` | `string` |
| `operator` | `string` |
| `sender` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:205

___

### RoleAdminChangedArgs

Ƭ **RoleAdminChangedArgs**<`K`\>: { [Property in keyof Pick<RoleAdminChangedFields, K\>]: RoleAdminChangedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.NFT721Upgradeable.md#roleadminchangedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:262

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:256

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:222

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:250

___

### RoleGrantedArgs

Ƭ **RoleGrantedArgs**<`K`\>: { [Property in keyof Pick<RoleGrantedFields, K\>]: RoleGrantedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.NFT721Upgradeable.md#rolegrantedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:307

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:301

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:267

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:295

___

### RoleRevokedArgs

Ƭ **RoleRevokedArgs**<`K`\>: { [Property in keyof Pick<RoleRevokedFields, K\>]: RoleRevokedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.NFT721Upgradeable.md#rolerevokedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:352

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:346

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:312

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

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:340

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:2

___

### TransferArgs

Ƭ **TransferArgs**<`K`\>: { [Property in keyof Pick<TransferFields, K\>]: TransferFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`TransferResult`](subgraphs.NFT721Upgradeable.md#transferresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:399

___

### TransferFields

Ƭ **TransferFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from` | ``true`` |
| `id` | ``true`` |
| `to` | ``true`` |
| `tokenId` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:393

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
| `tokenId?` | `WeiSource` \| ``null`` |
| `tokenId_gt?` | `WeiSource` \| ``null`` |
| `tokenId_gte?` | `WeiSource` \| ``null`` |
| `tokenId_in?` | `WeiSource`[] |
| `tokenId_lt?` | `WeiSource` \| ``null`` |
| `tokenId_lte?` | `WeiSource` \| ``null`` |
| `tokenId_not?` | `WeiSource` \| ``null`` |
| `tokenId_not_in?` | `WeiSource`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:357

___

### TransferResult

Ƭ **TransferResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from` | `string` |
| `id` | `string` |
| `to` | `string` |
| `tokenId` | `Wei` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:387

## Functions

### getApprovalById

▸ **getApprovalById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ApprovalResult`](subgraphs.NFT721Upgradeable.md#approvalresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ApprovalResult`](subgraphs.NFT721Upgradeable.md#approvalresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721Upgradeable.md#singlequeryoptions) |
| `args` | [`ApprovalArgs`](subgraphs.NFT721Upgradeable.md#approvalargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ApprovalResult`](subgraphs.NFT721Upgradeable.md#approvalresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:66

___

### getApprovalForAllById

▸ **getApprovalForAllById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ApprovalForAllResult`](subgraphs.NFT721Upgradeable.md#approvalforallresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ApprovalForAllResult`](subgraphs.NFT721Upgradeable.md#approvalforallresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721Upgradeable.md#singlequeryoptions) |
| `args` | [`ApprovalForAllArgs`](subgraphs.NFT721Upgradeable.md#approvalforallargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ApprovalForAllResult`](subgraphs.NFT721Upgradeable.md#approvalforallresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:109

___

### getApprovalForAlls

▸ **getApprovalForAlls**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ApprovalForAllResult`](subgraphs.NFT721Upgradeable.md#approvalforallresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ApprovalForAllResult`](subgraphs.NFT721Upgradeable.md#approvalforallresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721Upgradeable.md#multiqueryoptions)<[`ApprovalForAllFilter`](subgraphs.NFT721Upgradeable.md#approvalforallfilter), [`ApprovalForAllResult`](subgraphs.NFT721Upgradeable.md#approvalforallresult)\> |
| `args` | [`ApprovalForAllArgs`](subgraphs.NFT721Upgradeable.md#approvalforallargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ApprovalForAllResult`](subgraphs.NFT721Upgradeable.md#approvalforallresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:110

___

### getApprovals

▸ **getApprovals**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ApprovalResult`](subgraphs.NFT721Upgradeable.md#approvalresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ApprovalResult`](subgraphs.NFT721Upgradeable.md#approvalresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721Upgradeable.md#multiqueryoptions)<[`ApprovalFilter`](subgraphs.NFT721Upgradeable.md#approvalfilter), [`ApprovalResult`](subgraphs.NFT721Upgradeable.md#approvalresult)\> |
| `args` | [`ApprovalArgs`](subgraphs.NFT721Upgradeable.md#approvalargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ApprovalResult`](subgraphs.NFT721Upgradeable.md#approvalresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:67

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721Upgradeable.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721Upgradeable.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721Upgradeable.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.NFT721Upgradeable.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721Upgradeable.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:140

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721Upgradeable.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721Upgradeable.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721Upgradeable.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.NFT721Upgradeable.md#initializedfilter), [`InitializedResult`](subgraphs.NFT721Upgradeable.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.NFT721Upgradeable.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721Upgradeable.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:141

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721Upgradeable.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721Upgradeable.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721Upgradeable.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFT721Upgradeable.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721Upgradeable.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:177

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721Upgradeable.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721Upgradeable.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721Upgradeable.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.NFT721Upgradeable.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.NFT721Upgradeable.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFT721Upgradeable.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721Upgradeable.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:178

___

### getProxyApprovalById

▸ **getProxyApprovalById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ProxyApprovalResult`](subgraphs.NFT721Upgradeable.md#proxyapprovalresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ProxyApprovalResult`](subgraphs.NFT721Upgradeable.md#proxyapprovalresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721Upgradeable.md#singlequeryoptions) |
| `args` | [`ProxyApprovalArgs`](subgraphs.NFT721Upgradeable.md#proxyapprovalargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ProxyApprovalResult`](subgraphs.NFT721Upgradeable.md#proxyapprovalresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:220

___

### getProxyApprovals

▸ **getProxyApprovals**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ProxyApprovalResult`](subgraphs.NFT721Upgradeable.md#proxyapprovalresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ProxyApprovalResult`](subgraphs.NFT721Upgradeable.md#proxyapprovalresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721Upgradeable.md#multiqueryoptions)<[`ProxyApprovalFilter`](subgraphs.NFT721Upgradeable.md#proxyapprovalfilter), [`ProxyApprovalResult`](subgraphs.NFT721Upgradeable.md#proxyapprovalresult)\> |
| `args` | [`ProxyApprovalArgs`](subgraphs.NFT721Upgradeable.md#proxyapprovalargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ProxyApprovalResult`](subgraphs.NFT721Upgradeable.md#proxyapprovalresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:221

___

### getRoleAdminChangedById

▸ **getRoleAdminChangedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NFT721Upgradeable.md#roleadminchangedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.NFT721Upgradeable.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721Upgradeable.md#singlequeryoptions) |
| `args` | [`RoleAdminChangedArgs`](subgraphs.NFT721Upgradeable.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NFT721Upgradeable.md#roleadminchangedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:265

___

### getRoleAdminChangeds

▸ **getRoleAdminChangeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NFT721Upgradeable.md#roleadminchangedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleAdminChangedResult`](subgraphs.NFT721Upgradeable.md#roleadminchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721Upgradeable.md#multiqueryoptions)<[`RoleAdminChangedFilter`](subgraphs.NFT721Upgradeable.md#roleadminchangedfilter), [`RoleAdminChangedResult`](subgraphs.NFT721Upgradeable.md#roleadminchangedresult)\> |
| `args` | [`RoleAdminChangedArgs`](subgraphs.NFT721Upgradeable.md#roleadminchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleAdminChangedResult`](subgraphs.NFT721Upgradeable.md#roleadminchangedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:266

___

### getRoleGrantedById

▸ **getRoleGrantedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NFT721Upgradeable.md#rolegrantedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.NFT721Upgradeable.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721Upgradeable.md#singlequeryoptions) |
| `args` | [`RoleGrantedArgs`](subgraphs.NFT721Upgradeable.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NFT721Upgradeable.md#rolegrantedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:310

___

### getRoleGranteds

▸ **getRoleGranteds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NFT721Upgradeable.md#rolegrantedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleGrantedResult`](subgraphs.NFT721Upgradeable.md#rolegrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721Upgradeable.md#multiqueryoptions)<[`RoleGrantedFilter`](subgraphs.NFT721Upgradeable.md#rolegrantedfilter), [`RoleGrantedResult`](subgraphs.NFT721Upgradeable.md#rolegrantedresult)\> |
| `args` | [`RoleGrantedArgs`](subgraphs.NFT721Upgradeable.md#rolegrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleGrantedResult`](subgraphs.NFT721Upgradeable.md#rolegrantedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:311

___

### getRoleRevokedById

▸ **getRoleRevokedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NFT721Upgradeable.md#rolerevokedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.NFT721Upgradeable.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721Upgradeable.md#singlequeryoptions) |
| `args` | [`RoleRevokedArgs`](subgraphs.NFT721Upgradeable.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NFT721Upgradeable.md#rolerevokedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:355

___

### getRoleRevokeds

▸ **getRoleRevokeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NFT721Upgradeable.md#rolerevokedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`RoleRevokedResult`](subgraphs.NFT721Upgradeable.md#rolerevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721Upgradeable.md#multiqueryoptions)<[`RoleRevokedFilter`](subgraphs.NFT721Upgradeable.md#rolerevokedfilter), [`RoleRevokedResult`](subgraphs.NFT721Upgradeable.md#rolerevokedresult)\> |
| `args` | [`RoleRevokedArgs`](subgraphs.NFT721Upgradeable.md#rolerevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`RoleRevokedResult`](subgraphs.NFT721Upgradeable.md#rolerevokedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:356

___

### getTransferById

▸ **getTransferById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`TransferResult`](subgraphs.NFT721Upgradeable.md#transferresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`TransferResult`](subgraphs.NFT721Upgradeable.md#transferresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721Upgradeable.md#singlequeryoptions) |
| `args` | [`TransferArgs`](subgraphs.NFT721Upgradeable.md#transferargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`TransferResult`](subgraphs.NFT721Upgradeable.md#transferresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:402

___

### getTransfers

▸ **getTransfers**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`TransferResult`](subgraphs.NFT721Upgradeable.md#transferresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`TransferResult`](subgraphs.NFT721Upgradeable.md#transferresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721Upgradeable.md#multiqueryoptions)<[`TransferFilter`](subgraphs.NFT721Upgradeable.md#transferfilter), [`TransferResult`](subgraphs.NFT721Upgradeable.md#transferresult)\> |
| `args` | [`TransferArgs`](subgraphs.NFT721Upgradeable.md#transferargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`TransferResult`](subgraphs.NFT721Upgradeable.md#transferresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721Upgradeable.d.ts:403
