[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / DIDRegistry

# Namespace: DIDRegistry

[subgraphs](subgraphs.md).DIDRegistry

## Table of contents

### Type Aliases

- [ActedOnBehalfArgs](subgraphs.DIDRegistry.md#actedonbehalfargs)
- [ActedOnBehalfFields](subgraphs.DIDRegistry.md#actedonbehalffields)
- [ActedOnBehalfFilter](subgraphs.DIDRegistry.md#actedonbehalffilter)
- [ActedOnBehalfResult](subgraphs.DIDRegistry.md#actedonbehalfresult)
- [DIDAttributeRegisteredArgs](subgraphs.DIDRegistry.md#didattributeregisteredargs)
- [DIDAttributeRegisteredFields](subgraphs.DIDRegistry.md#didattributeregisteredfields)
- [DIDAttributeRegisteredFilter](subgraphs.DIDRegistry.md#didattributeregisteredfilter)
- [DIDAttributeRegisteredResult](subgraphs.DIDRegistry.md#didattributeregisteredresult)
- [DIDOwnershipTransferredArgs](subgraphs.DIDRegistry.md#didownershiptransferredargs)
- [DIDOwnershipTransferredFields](subgraphs.DIDRegistry.md#didownershiptransferredfields)
- [DIDOwnershipTransferredFilter](subgraphs.DIDRegistry.md#didownershiptransferredfilter)
- [DIDOwnershipTransferredResult](subgraphs.DIDRegistry.md#didownershiptransferredresult)
- [DIDPermissionGrantedArgs](subgraphs.DIDRegistry.md#didpermissiongrantedargs)
- [DIDPermissionGrantedFields](subgraphs.DIDRegistry.md#didpermissiongrantedfields)
- [DIDPermissionGrantedFilter](subgraphs.DIDRegistry.md#didpermissiongrantedfilter)
- [DIDPermissionGrantedResult](subgraphs.DIDRegistry.md#didpermissiongrantedresult)
- [DIDPermissionRevokedArgs](subgraphs.DIDRegistry.md#didpermissionrevokedargs)
- [DIDPermissionRevokedFields](subgraphs.DIDRegistry.md#didpermissionrevokedfields)
- [DIDPermissionRevokedFilter](subgraphs.DIDRegistry.md#didpermissionrevokedfilter)
- [DIDPermissionRevokedResult](subgraphs.DIDRegistry.md#didpermissionrevokedresult)
- [DIDProvenanceDelegateAddedArgs](subgraphs.DIDRegistry.md#didprovenancedelegateaddedargs)
- [DIDProvenanceDelegateAddedFields](subgraphs.DIDRegistry.md#didprovenancedelegateaddedfields)
- [DIDProvenanceDelegateAddedFilter](subgraphs.DIDRegistry.md#didprovenancedelegateaddedfilter)
- [DIDProvenanceDelegateAddedResult](subgraphs.DIDRegistry.md#didprovenancedelegateaddedresult)
- [DIDProvenanceDelegateRemovedArgs](subgraphs.DIDRegistry.md#didprovenancedelegateremovedargs)
- [DIDProvenanceDelegateRemovedFields](subgraphs.DIDRegistry.md#didprovenancedelegateremovedfields)
- [DIDProvenanceDelegateRemovedFilter](subgraphs.DIDRegistry.md#didprovenancedelegateremovedfilter)
- [DIDProvenanceDelegateRemovedResult](subgraphs.DIDRegistry.md#didprovenancedelegateremovedresult)
- [DIDProviderAddedArgs](subgraphs.DIDRegistry.md#didprovideraddedargs)
- [DIDProviderAddedFields](subgraphs.DIDRegistry.md#didprovideraddedfields)
- [DIDProviderAddedFilter](subgraphs.DIDRegistry.md#didprovideraddedfilter)
- [DIDProviderAddedResult](subgraphs.DIDRegistry.md#didprovideraddedresult)
- [DIDProviderRemovedArgs](subgraphs.DIDRegistry.md#didproviderremovedargs)
- [DIDProviderRemovedFields](subgraphs.DIDRegistry.md#didproviderremovedfields)
- [DIDProviderRemovedFilter](subgraphs.DIDRegistry.md#didproviderremovedfilter)
- [DIDProviderRemovedResult](subgraphs.DIDRegistry.md#didproviderremovedresult)
- [DIDRoyaltiesAddedArgs](subgraphs.DIDRegistry.md#didroyaltiesaddedargs)
- [DIDRoyaltiesAddedFields](subgraphs.DIDRegistry.md#didroyaltiesaddedfields)
- [DIDRoyaltiesAddedFilter](subgraphs.DIDRegistry.md#didroyaltiesaddedfilter)
- [DIDRoyaltiesAddedResult](subgraphs.DIDRegistry.md#didroyaltiesaddedresult)
- [DIDRoyaltyRecipientChangedArgs](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedargs)
- [DIDRoyaltyRecipientChangedFields](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedfields)
- [DIDRoyaltyRecipientChangedFilter](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedfilter)
- [DIDRoyaltyRecipientChangedResult](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedresult)
- [InitializedArgs](subgraphs.DIDRegistry.md#initializedargs)
- [InitializedFields](subgraphs.DIDRegistry.md#initializedfields)
- [InitializedFilter](subgraphs.DIDRegistry.md#initializedfilter)
- [InitializedResult](subgraphs.DIDRegistry.md#initializedresult)
- [MultiQueryOptions](subgraphs.DIDRegistry.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.DIDRegistry.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.DIDRegistry.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.DIDRegistry.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.DIDRegistry.md#ownershiptransferredresult)
- [ProvenanceAttributeRegisteredArgs](subgraphs.DIDRegistry.md#provenanceattributeregisteredargs)
- [ProvenanceAttributeRegisteredFields](subgraphs.DIDRegistry.md#provenanceattributeregisteredfields)
- [ProvenanceAttributeRegisteredFilter](subgraphs.DIDRegistry.md#provenanceattributeregisteredfilter)
- [ProvenanceAttributeRegisteredResult](subgraphs.DIDRegistry.md#provenanceattributeregisteredresult)
- [SingleQueryOptions](subgraphs.DIDRegistry.md#singlequeryoptions)
- [UsedArgs](subgraphs.DIDRegistry.md#usedargs)
- [UsedFields](subgraphs.DIDRegistry.md#usedfields)
- [UsedFilter](subgraphs.DIDRegistry.md#usedfilter)
- [UsedResult](subgraphs.DIDRegistry.md#usedresult)
- [WasAssociatedWithArgs](subgraphs.DIDRegistry.md#wasassociatedwithargs)
- [WasAssociatedWithFields](subgraphs.DIDRegistry.md#wasassociatedwithfields)
- [WasAssociatedWithFilter](subgraphs.DIDRegistry.md#wasassociatedwithfilter)
- [WasAssociatedWithResult](subgraphs.DIDRegistry.md#wasassociatedwithresult)
- [WasDerivedFromArgs](subgraphs.DIDRegistry.md#wasderivedfromargs)
- [WasDerivedFromFields](subgraphs.DIDRegistry.md#wasderivedfromfields)
- [WasDerivedFromFilter](subgraphs.DIDRegistry.md#wasderivedfromfilter)
- [WasDerivedFromResult](subgraphs.DIDRegistry.md#wasderivedfromresult)
- [WasGeneratedByArgs](subgraphs.DIDRegistry.md#wasgeneratedbyargs)
- [WasGeneratedByFields](subgraphs.DIDRegistry.md#wasgeneratedbyfields)
- [WasGeneratedByFilter](subgraphs.DIDRegistry.md#wasgeneratedbyfilter)
- [WasGeneratedByResult](subgraphs.DIDRegistry.md#wasgeneratedbyresult)

### Functions

- [getActedOnBehalfById](subgraphs.DIDRegistry.md#getactedonbehalfbyid)
- [getActedOnBehalfs](subgraphs.DIDRegistry.md#getactedonbehalfs)
- [getDIDAttributeRegisteredById](subgraphs.DIDRegistry.md#getdidattributeregisteredbyid)
- [getDIDAttributeRegistereds](subgraphs.DIDRegistry.md#getdidattributeregistereds)
- [getDIDOwnershipTransferredById](subgraphs.DIDRegistry.md#getdidownershiptransferredbyid)
- [getDIDOwnershipTransferreds](subgraphs.DIDRegistry.md#getdidownershiptransferreds)
- [getDIDPermissionGrantedById](subgraphs.DIDRegistry.md#getdidpermissiongrantedbyid)
- [getDIDPermissionGranteds](subgraphs.DIDRegistry.md#getdidpermissiongranteds)
- [getDIDPermissionRevokedById](subgraphs.DIDRegistry.md#getdidpermissionrevokedbyid)
- [getDIDPermissionRevokeds](subgraphs.DIDRegistry.md#getdidpermissionrevokeds)
- [getDIDProvenanceDelegateAddedById](subgraphs.DIDRegistry.md#getdidprovenancedelegateaddedbyid)
- [getDIDProvenanceDelegateAddeds](subgraphs.DIDRegistry.md#getdidprovenancedelegateaddeds)
- [getDIDProvenanceDelegateRemovedById](subgraphs.DIDRegistry.md#getdidprovenancedelegateremovedbyid)
- [getDIDProvenanceDelegateRemoveds](subgraphs.DIDRegistry.md#getdidprovenancedelegateremoveds)
- [getDIDProviderAddedById](subgraphs.DIDRegistry.md#getdidprovideraddedbyid)
- [getDIDProviderAddeds](subgraphs.DIDRegistry.md#getdidprovideraddeds)
- [getDIDProviderRemovedById](subgraphs.DIDRegistry.md#getdidproviderremovedbyid)
- [getDIDProviderRemoveds](subgraphs.DIDRegistry.md#getdidproviderremoveds)
- [getDIDRoyaltiesAddedById](subgraphs.DIDRegistry.md#getdidroyaltiesaddedbyid)
- [getDIDRoyaltiesAddeds](subgraphs.DIDRegistry.md#getdidroyaltiesaddeds)
- [getDIDRoyaltyRecipientChangedById](subgraphs.DIDRegistry.md#getdidroyaltyrecipientchangedbyid)
- [getDIDRoyaltyRecipientChangeds](subgraphs.DIDRegistry.md#getdidroyaltyrecipientchangeds)
- [getInitializedById](subgraphs.DIDRegistry.md#getinitializedbyid)
- [getInitializeds](subgraphs.DIDRegistry.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.DIDRegistry.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.DIDRegistry.md#getownershiptransferreds)
- [getProvenanceAttributeRegisteredById](subgraphs.DIDRegistry.md#getprovenanceattributeregisteredbyid)
- [getProvenanceAttributeRegistereds](subgraphs.DIDRegistry.md#getprovenanceattributeregistereds)
- [getUsedById](subgraphs.DIDRegistry.md#getusedbyid)
- [getUseds](subgraphs.DIDRegistry.md#getuseds)
- [getWasAssociatedWithById](subgraphs.DIDRegistry.md#getwasassociatedwithbyid)
- [getWasAssociatedWiths](subgraphs.DIDRegistry.md#getwasassociatedwiths)
- [getWasDerivedFromById](subgraphs.DIDRegistry.md#getwasderivedfrombyid)
- [getWasDerivedFroms](subgraphs.DIDRegistry.md#getwasderivedfroms)
- [getWasGeneratedByById](subgraphs.DIDRegistry.md#getwasgeneratedbybyid)
- [getWasGeneratedBys](subgraphs.DIDRegistry.md#getwasgeneratedbys)

## Type Aliases

### ActedOnBehalfArgs

Ƭ **ActedOnBehalfArgs**<`K`\>: { [Property in keyof Pick<ActedOnBehalfFields, K\>]: ActedOnBehalfFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ActedOnBehalfResult`](subgraphs.DIDRegistry.md#actedonbehalfresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:109

___

### ActedOnBehalfFields

Ƭ **ActedOnBehalfFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | ``true`` |
| `_attributes` | ``true`` |
| `_blockNumberUpdated` | ``true`` |
| `_delegateAgentId` | ``true`` |
| `_entityDid` | ``true`` |
| `_responsibleAgentId` | ``true`` |
| `id` | ``true`` |
| `provId` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:99

___

### ActedOnBehalfFilter

Ƭ **ActedOnBehalfFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId?` | `string` \| ``null`` |
| `_activityId_contains?` | `string` \| ``null`` |
| `_activityId_in?` | `string`[] |
| `_activityId_not?` | `string` \| ``null`` |
| `_activityId_not_contains?` | `string` \| ``null`` |
| `_activityId_not_in?` | `string`[] |
| `_attributes?` | `string` \| ``null`` |
| `_attributes_contains?` | `string` \| ``null`` |
| `_attributes_contains_nocase?` | `string` \| ``null`` |
| `_attributes_ends_with?` | `string` \| ``null`` |
| `_attributes_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_gt?` | `string` \| ``null`` |
| `_attributes_gte?` | `string` \| ``null`` |
| `_attributes_in?` | `string`[] |
| `_attributes_lt?` | `string` \| ``null`` |
| `_attributes_lte?` | `string` \| ``null`` |
| `_attributes_not?` | `string` \| ``null`` |
| `_attributes_not_contains?` | `string` \| ``null`` |
| `_attributes_not_contains_nocase?` | `string` \| ``null`` |
| `_attributes_not_ends_with?` | `string` \| ``null`` |
| `_attributes_not_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_not_in?` | `string`[] |
| `_attributes_not_starts_with?` | `string` \| ``null`` |
| `_attributes_not_starts_with_nocase?` | `string` \| ``null`` |
| `_attributes_starts_with?` | `string` \| ``null`` |
| `_attributes_starts_with_nocase?` | `string` \| ``null`` |
| `_blockNumberUpdated?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_in?` | `WeiSource`[] |
| `_blockNumberUpdated_lt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_lte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not_in?` | `WeiSource`[] |
| `_delegateAgentId?` | `string` \| ``null`` |
| `_delegateAgentId_contains?` | `string` \| ``null`` |
| `_delegateAgentId_in?` | `string`[] |
| `_delegateAgentId_not?` | `string` \| ``null`` |
| `_delegateAgentId_not_contains?` | `string` \| ``null`` |
| `_delegateAgentId_not_in?` | `string`[] |
| `_entityDid?` | `string` \| ``null`` |
| `_entityDid_contains?` | `string` \| ``null`` |
| `_entityDid_in?` | `string`[] |
| `_entityDid_not?` | `string` \| ``null`` |
| `_entityDid_not_contains?` | `string` \| ``null`` |
| `_entityDid_not_in?` | `string`[] |
| `_responsibleAgentId?` | `string` \| ``null`` |
| `_responsibleAgentId_contains?` | `string` \| ``null`` |
| `_responsibleAgentId_in?` | `string`[] |
| `_responsibleAgentId_not?` | `string` \| ``null`` |
| `_responsibleAgentId_not_contains?` | `string` \| ``null`` |
| `_responsibleAgentId_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `provId?` | `string` \| ``null`` |
| `provId_contains?` | `string` \| ``null`` |
| `provId_in?` | `string`[] |
| `provId_not?` | `string` \| ``null`` |
| `provId_not_contains?` | `string` \| ``null`` |
| `provId_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:21

___

### ActedOnBehalfResult

Ƭ **ActedOnBehalfResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | `string` |
| `_attributes` | `string` |
| `_blockNumberUpdated` | `Wei` |
| `_delegateAgentId` | `string` |
| `_entityDid` | `string` |
| `_responsibleAgentId` | `string` |
| `id` | `string` |
| `provId` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:89

___

### DIDAttributeRegisteredArgs

Ƭ **DIDAttributeRegisteredArgs**<`K`\>: { [Property in keyof Pick<DIDAttributeRegisteredFields, K\>]: DIDAttributeRegisteredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDAttributeRegisteredResult`](subgraphs.DIDRegistry.md#didattributeregisteredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:194

___

### DIDAttributeRegisteredFields

Ƭ **DIDAttributeRegisteredFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_blockNumberUpdated` | ``true`` |
| `_checksum` | ``true`` |
| `_did` | ``true`` |
| `_lastUpdatedBy` | ``true`` |
| `_owner` | ``true`` |
| `_value` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:185

___

### DIDAttributeRegisteredFilter

Ƭ **DIDAttributeRegisteredFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_blockNumberUpdated?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_in?` | `WeiSource`[] |
| `_blockNumberUpdated_lt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_lte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not_in?` | `WeiSource`[] |
| `_checksum?` | `string` \| ``null`` |
| `_checksum_contains?` | `string` \| ``null`` |
| `_checksum_in?` | `string`[] |
| `_checksum_not?` | `string` \| ``null`` |
| `_checksum_not_contains?` | `string` \| ``null`` |
| `_checksum_not_in?` | `string`[] |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `_lastUpdatedBy?` | `string` \| ``null`` |
| `_lastUpdatedBy_contains?` | `string` \| ``null`` |
| `_lastUpdatedBy_in?` | `string`[] |
| `_lastUpdatedBy_not?` | `string` \| ``null`` |
| `_lastUpdatedBy_not_contains?` | `string` \| ``null`` |
| `_lastUpdatedBy_not_in?` | `string`[] |
| `_owner?` | `string` \| ``null`` |
| `_owner_contains?` | `string` \| ``null`` |
| `_owner_in?` | `string`[] |
| `_owner_not?` | `string` \| ``null`` |
| `_owner_not_contains?` | `string` \| ``null`` |
| `_owner_not_in?` | `string`[] |
| `_value?` | `string` \| ``null`` |
| `_value_contains?` | `string` \| ``null`` |
| `_value_contains_nocase?` | `string` \| ``null`` |
| `_value_ends_with?` | `string` \| ``null`` |
| `_value_ends_with_nocase?` | `string` \| ``null`` |
| `_value_gt?` | `string` \| ``null`` |
| `_value_gte?` | `string` \| ``null`` |
| `_value_in?` | `string`[] |
| `_value_lt?` | `string` \| ``null`` |
| `_value_lte?` | `string` \| ``null`` |
| `_value_not?` | `string` \| ``null`` |
| `_value_not_contains?` | `string` \| ``null`` |
| `_value_not_contains_nocase?` | `string` \| ``null`` |
| `_value_not_ends_with?` | `string` \| ``null`` |
| `_value_not_ends_with_nocase?` | `string` \| ``null`` |
| `_value_not_in?` | `string`[] |
| `_value_not_starts_with?` | `string` \| ``null`` |
| `_value_not_starts_with_nocase?` | `string` \| ``null`` |
| `_value_starts_with?` | `string` \| ``null`` |
| `_value_starts_with_nocase?` | `string` \| ``null`` |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:114

___

### DIDAttributeRegisteredResult

Ƭ **DIDAttributeRegisteredResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_blockNumberUpdated` | `Wei` |
| `_checksum` | `string` |
| `_did` | `string` |
| `_lastUpdatedBy` | `string` |
| `_owner` | `string` |
| `_value` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:176

___

### DIDOwnershipTransferredArgs

Ƭ **DIDOwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<DIDOwnershipTransferredFields, K\>]: DIDOwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDOwnershipTransferredResult`](subgraphs.DIDRegistry.md#didownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:239

___

### DIDOwnershipTransferredFields

Ƭ **DIDOwnershipTransferredFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did` | ``true`` |
| `_newOwner` | ``true`` |
| `_previousOwner` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:233

___

### DIDOwnershipTransferredFilter

Ƭ **DIDOwnershipTransferredFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `_newOwner?` | `string` \| ``null`` |
| `_newOwner_contains?` | `string` \| ``null`` |
| `_newOwner_in?` | `string`[] |
| `_newOwner_not?` | `string` \| ``null`` |
| `_newOwner_not_contains?` | `string` \| ``null`` |
| `_newOwner_not_in?` | `string`[] |
| `_previousOwner?` | `string` \| ``null`` |
| `_previousOwner_contains?` | `string` \| ``null`` |
| `_previousOwner_in?` | `string`[] |
| `_previousOwner_not?` | `string` \| ``null`` |
| `_previousOwner_not_contains?` | `string` \| ``null`` |
| `_previousOwner_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:199

___

### DIDOwnershipTransferredResult

Ƭ **DIDOwnershipTransferredResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did` | `string` |
| `_newOwner` | `string` |
| `_previousOwner` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:227

___

### DIDPermissionGrantedArgs

Ƭ **DIDPermissionGrantedArgs**<`K`\>: { [Property in keyof Pick<DIDPermissionGrantedFields, K\>]: DIDPermissionGrantedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDPermissionGrantedResult`](subgraphs.DIDRegistry.md#didpermissiongrantedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:284

___

### DIDPermissionGrantedFields

Ƭ **DIDPermissionGrantedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did` | ``true`` |
| `_grantee` | ``true`` |
| `_owner` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:278

___

### DIDPermissionGrantedFilter

Ƭ **DIDPermissionGrantedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `_grantee?` | `string` \| ``null`` |
| `_grantee_contains?` | `string` \| ``null`` |
| `_grantee_in?` | `string`[] |
| `_grantee_not?` | `string` \| ``null`` |
| `_grantee_not_contains?` | `string` \| ``null`` |
| `_grantee_not_in?` | `string`[] |
| `_owner?` | `string` \| ``null`` |
| `_owner_contains?` | `string` \| ``null`` |
| `_owner_in?` | `string`[] |
| `_owner_not?` | `string` \| ``null`` |
| `_owner_not_contains?` | `string` \| ``null`` |
| `_owner_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:244

___

### DIDPermissionGrantedResult

Ƭ **DIDPermissionGrantedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did` | `string` |
| `_grantee` | `string` |
| `_owner` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:272

___

### DIDPermissionRevokedArgs

Ƭ **DIDPermissionRevokedArgs**<`K`\>: { [Property in keyof Pick<DIDPermissionRevokedFields, K\>]: DIDPermissionRevokedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDPermissionRevokedResult`](subgraphs.DIDRegistry.md#didpermissionrevokedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:329

___

### DIDPermissionRevokedFields

Ƭ **DIDPermissionRevokedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did` | ``true`` |
| `_grantee` | ``true`` |
| `_owner` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:323

___

### DIDPermissionRevokedFilter

Ƭ **DIDPermissionRevokedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `_grantee?` | `string` \| ``null`` |
| `_grantee_contains?` | `string` \| ``null`` |
| `_grantee_in?` | `string`[] |
| `_grantee_not?` | `string` \| ``null`` |
| `_grantee_not_contains?` | `string` \| ``null`` |
| `_grantee_not_in?` | `string`[] |
| `_owner?` | `string` \| ``null`` |
| `_owner_contains?` | `string` \| ``null`` |
| `_owner_in?` | `string`[] |
| `_owner_not?` | `string` \| ``null`` |
| `_owner_not_contains?` | `string` \| ``null`` |
| `_owner_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:289

___

### DIDPermissionRevokedResult

Ƭ **DIDPermissionRevokedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did` | `string` |
| `_grantee` | `string` |
| `_owner` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:317

___

### DIDProvenanceDelegateAddedArgs

Ƭ **DIDProvenanceDelegateAddedArgs**<`K`\>: { [Property in keyof Pick<DIDProvenanceDelegateAddedFields, K\>]: DIDProvenanceDelegateAddedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProvenanceDelegateAddedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:366

___

### DIDProvenanceDelegateAddedFields

Ƭ **DIDProvenanceDelegateAddedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_delegate` | ``true`` |
| `_did` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:361

___

### DIDProvenanceDelegateAddedFilter

Ƭ **DIDProvenanceDelegateAddedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_delegate?` | `string` \| ``null`` |
| `_delegate_contains?` | `string` \| ``null`` |
| `_delegate_in?` | `string`[] |
| `_delegate_not?` | `string` \| ``null`` |
| `_delegate_not_contains?` | `string` \| ``null`` |
| `_delegate_not_in?` | `string`[] |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:334

___

### DIDProvenanceDelegateAddedResult

Ƭ **DIDProvenanceDelegateAddedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_delegate` | `string` |
| `_did` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:356

___

### DIDProvenanceDelegateRemovedArgs

Ƭ **DIDProvenanceDelegateRemovedArgs**<`K`\>: { [Property in keyof Pick<DIDProvenanceDelegateRemovedFields, K\>]: DIDProvenanceDelegateRemovedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProvenanceDelegateRemovedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:409

___

### DIDProvenanceDelegateRemovedFields

Ƭ **DIDProvenanceDelegateRemovedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_delegate` | ``true`` |
| `_did` | ``true`` |
| `id` | ``true`` |
| `state` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:403

___

### DIDProvenanceDelegateRemovedFilter

Ƭ **DIDProvenanceDelegateRemovedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_delegate?` | `string` \| ``null`` |
| `_delegate_contains?` | `string` \| ``null`` |
| `_delegate_in?` | `string`[] |
| `_delegate_not?` | `string` \| ``null`` |
| `_delegate_not_contains?` | `string` \| ``null`` |
| `_delegate_not_in?` | `string`[] |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `state?` | `boolean` \| ``null`` |
| `state_in?` | `boolean`[] |
| `state_not?` | `boolean` \| ``null`` |
| `state_not_in?` | `boolean`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:371

___

### DIDProvenanceDelegateRemovedResult

Ƭ **DIDProvenanceDelegateRemovedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_delegate` | `string` |
| `_did` | `string` |
| `id` | `string` |
| `state` | `boolean` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:397

___

### DIDProviderAddedArgs

Ƭ **DIDProviderAddedArgs**<`K`\>: { [Property in keyof Pick<DIDProviderAddedFields, K\>]: DIDProviderAddedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProviderAddedResult`](subgraphs.DIDRegistry.md#didprovideraddedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:446

___

### DIDProviderAddedFields

Ƭ **DIDProviderAddedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did` | ``true`` |
| `_provider` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:441

___

### DIDProviderAddedFilter

Ƭ **DIDProviderAddedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `_provider?` | `string` \| ``null`` |
| `_provider_contains?` | `string` \| ``null`` |
| `_provider_in?` | `string`[] |
| `_provider_not?` | `string` \| ``null`` |
| `_provider_not_contains?` | `string` \| ``null`` |
| `_provider_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:414

___

### DIDProviderAddedResult

Ƭ **DIDProviderAddedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did` | `string` |
| `_provider` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:436

___

### DIDProviderRemovedArgs

Ƭ **DIDProviderRemovedArgs**<`K`\>: { [Property in keyof Pick<DIDProviderRemovedFields, K\>]: DIDProviderRemovedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProviderRemovedResult`](subgraphs.DIDRegistry.md#didproviderremovedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:489

___

### DIDProviderRemovedFields

Ƭ **DIDProviderRemovedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did` | ``true`` |
| `_provider` | ``true`` |
| `id` | ``true`` |
| `state` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:483

___

### DIDProviderRemovedFilter

Ƭ **DIDProviderRemovedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `_provider?` | `string` \| ``null`` |
| `_provider_contains?` | `string` \| ``null`` |
| `_provider_in?` | `string`[] |
| `_provider_not?` | `string` \| ``null`` |
| `_provider_not_contains?` | `string` \| ``null`` |
| `_provider_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `state?` | `boolean` \| ``null`` |
| `state_in?` | `boolean`[] |
| `state_not?` | `boolean` \| ``null`` |
| `state_not_in?` | `boolean`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:451

___

### DIDProviderRemovedResult

Ƭ **DIDProviderRemovedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_did` | `string` |
| `_provider` | `string` |
| `id` | `string` |
| `state` | `boolean` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:477

___

### DIDRoyaltiesAddedArgs

Ƭ **DIDRoyaltiesAddedArgs**<`K`\>: { [Property in keyof Pick<DIDRoyaltiesAddedFields, K\>]: DIDRoyaltiesAddedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDRoyaltiesAddedResult`](subgraphs.DIDRegistry.md#didroyaltiesaddedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:526

___

### DIDRoyaltiesAddedFields

Ƭ **DIDRoyaltiesAddedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addr` | ``true`` |
| `did` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:521

___

### DIDRoyaltiesAddedFilter

Ƭ **DIDRoyaltiesAddedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addr?` | `string` \| ``null`` |
| `addr_contains?` | `string` \| ``null`` |
| `addr_in?` | `string`[] |
| `addr_not?` | `string` \| ``null`` |
| `addr_not_contains?` | `string` \| ``null`` |
| `addr_not_in?` | `string`[] |
| `did?` | `string` \| ``null`` |
| `did_contains?` | `string` \| ``null`` |
| `did_in?` | `string`[] |
| `did_not?` | `string` \| ``null`` |
| `did_not_contains?` | `string` \| ``null`` |
| `did_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:494

___

### DIDRoyaltiesAddedResult

Ƭ **DIDRoyaltiesAddedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addr` | `string` |
| `did` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:516

___

### DIDRoyaltyRecipientChangedArgs

Ƭ **DIDRoyaltyRecipientChangedArgs**<`K`\>: { [Property in keyof Pick<DIDRoyaltyRecipientChangedFields, K\>]: DIDRoyaltyRecipientChangedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDRoyaltyRecipientChangedResult`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:563

___

### DIDRoyaltyRecipientChangedFields

Ƭ **DIDRoyaltyRecipientChangedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addr` | ``true`` |
| `did` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:558

___

### DIDRoyaltyRecipientChangedFilter

Ƭ **DIDRoyaltyRecipientChangedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addr?` | `string` \| ``null`` |
| `addr_contains?` | `string` \| ``null`` |
| `addr_in?` | `string`[] |
| `addr_not?` | `string` \| ``null`` |
| `addr_not_contains?` | `string` \| ``null`` |
| `addr_not_in?` | `string`[] |
| `did?` | `string` \| ``null`` |
| `did_contains?` | `string` \| ``null`` |
| `did_in?` | `string`[] |
| `did_not?` | `string` \| ``null`` |
| `did_not_contains?` | `string` \| ``null`` |
| `did_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:531

___

### DIDRoyaltyRecipientChangedResult

Ƭ **DIDRoyaltyRecipientChangedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addr` | `string` |
| `did` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:553

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.DIDRegistry.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:594

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:590

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

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:568

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:586

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

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.DIDRegistry.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:631

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

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:626

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

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:599

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

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:621

___

### ProvenanceAttributeRegisteredArgs

Ƭ **ProvenanceAttributeRegisteredArgs**<`K`\>: { [Property in keyof Pick<ProvenanceAttributeRegisteredFields, K\>]: ProvenanceAttributeRegisteredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ProvenanceAttributeRegisteredResult`](subgraphs.DIDRegistry.md#provenanceattributeregisteredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:742

___

### ProvenanceAttributeRegisteredFields

Ƭ **ProvenanceAttributeRegisteredFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | ``true`` |
| `_agentId` | ``true`` |
| `_agentInvolvedId` | ``true`` |
| `_attributes` | ``true`` |
| `_blockNumberUpdated` | ``true`` |
| `_did` | ``true`` |
| `_method` | ``true`` |
| `_relatedDid` | ``true`` |
| `id` | ``true`` |
| `provId` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:730

___

### ProvenanceAttributeRegisteredFilter

Ƭ **ProvenanceAttributeRegisteredFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId?` | `string` \| ``null`` |
| `_activityId_contains?` | `string` \| ``null`` |
| `_activityId_in?` | `string`[] |
| `_activityId_not?` | `string` \| ``null`` |
| `_activityId_not_contains?` | `string` \| ``null`` |
| `_activityId_not_in?` | `string`[] |
| `_agentId?` | `string` \| ``null`` |
| `_agentId_contains?` | `string` \| ``null`` |
| `_agentId_in?` | `string`[] |
| `_agentId_not?` | `string` \| ``null`` |
| `_agentId_not_contains?` | `string` \| ``null`` |
| `_agentId_not_in?` | `string`[] |
| `_agentInvolvedId?` | `string` \| ``null`` |
| `_agentInvolvedId_contains?` | `string` \| ``null`` |
| `_agentInvolvedId_in?` | `string`[] |
| `_agentInvolvedId_not?` | `string` \| ``null`` |
| `_agentInvolvedId_not_contains?` | `string` \| ``null`` |
| `_agentInvolvedId_not_in?` | `string`[] |
| `_attributes?` | `string` \| ``null`` |
| `_attributes_contains?` | `string` \| ``null`` |
| `_attributes_contains_nocase?` | `string` \| ``null`` |
| `_attributes_ends_with?` | `string` \| ``null`` |
| `_attributes_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_gt?` | `string` \| ``null`` |
| `_attributes_gte?` | `string` \| ``null`` |
| `_attributes_in?` | `string`[] |
| `_attributes_lt?` | `string` \| ``null`` |
| `_attributes_lte?` | `string` \| ``null`` |
| `_attributes_not?` | `string` \| ``null`` |
| `_attributes_not_contains?` | `string` \| ``null`` |
| `_attributes_not_contains_nocase?` | `string` \| ``null`` |
| `_attributes_not_ends_with?` | `string` \| ``null`` |
| `_attributes_not_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_not_in?` | `string`[] |
| `_attributes_not_starts_with?` | `string` \| ``null`` |
| `_attributes_not_starts_with_nocase?` | `string` \| ``null`` |
| `_attributes_starts_with?` | `string` \| ``null`` |
| `_attributes_starts_with_nocase?` | `string` \| ``null`` |
| `_blockNumberUpdated?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_in?` | `WeiSource`[] |
| `_blockNumberUpdated_lt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_lte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not_in?` | `WeiSource`[] |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `_method?` | `number` \| ``null`` |
| `_method_gt?` | `number` \| ``null`` |
| `_method_gte?` | `number` \| ``null`` |
| `_method_in?` | `number`[] |
| `_method_lt?` | `number` \| ``null`` |
| `_method_lte?` | `number` \| ``null`` |
| `_method_not?` | `number` \| ``null`` |
| `_method_not_in?` | `number`[] |
| `_relatedDid?` | `string` \| ``null`` |
| `_relatedDid_contains?` | `string` \| ``null`` |
| `_relatedDid_in?` | `string`[] |
| `_relatedDid_not?` | `string` \| ``null`` |
| `_relatedDid_not_contains?` | `string` \| ``null`` |
| `_relatedDid_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `provId?` | `string` \| ``null`` |
| `provId_contains?` | `string` \| ``null`` |
| `provId_in?` | `string`[] |
| `provId_not?` | `string` \| ``null`` |
| `provId_not_contains?` | `string` \| ``null`` |
| `provId_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:636

___

### ProvenanceAttributeRegisteredResult

Ƭ **ProvenanceAttributeRegisteredResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | `string` |
| `_agentId` | `string` |
| `_agentInvolvedId` | `string` |
| `_attributes` | `string` |
| `_blockNumberUpdated` | `Wei` |
| `_did` | `string` |
| `_method` | `number` |
| `_relatedDid` | `string` |
| `id` | `string` |
| `provId` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:718

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:2

___

### UsedArgs

Ƭ **UsedArgs**<`K`\>: { [Property in keyof Pick<UsedFields, K\>]: UsedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`UsedResult`](subgraphs.DIDRegistry.md#usedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:827

___

### UsedFields

Ƭ **UsedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | ``true`` |
| `_agentId` | ``true`` |
| `_attributes` | ``true`` |
| `_blockNumberUpdated` | ``true`` |
| `_did` | ``true`` |
| `id` | ``true`` |
| `provId` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:818

___

### UsedFilter

Ƭ **UsedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId?` | `string` \| ``null`` |
| `_activityId_contains?` | `string` \| ``null`` |
| `_activityId_in?` | `string`[] |
| `_activityId_not?` | `string` \| ``null`` |
| `_activityId_not_contains?` | `string` \| ``null`` |
| `_activityId_not_in?` | `string`[] |
| `_agentId?` | `string` \| ``null`` |
| `_agentId_contains?` | `string` \| ``null`` |
| `_agentId_in?` | `string`[] |
| `_agentId_not?` | `string` \| ``null`` |
| `_agentId_not_contains?` | `string` \| ``null`` |
| `_agentId_not_in?` | `string`[] |
| `_attributes?` | `string` \| ``null`` |
| `_attributes_contains?` | `string` \| ``null`` |
| `_attributes_contains_nocase?` | `string` \| ``null`` |
| `_attributes_ends_with?` | `string` \| ``null`` |
| `_attributes_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_gt?` | `string` \| ``null`` |
| `_attributes_gte?` | `string` \| ``null`` |
| `_attributes_in?` | `string`[] |
| `_attributes_lt?` | `string` \| ``null`` |
| `_attributes_lte?` | `string` \| ``null`` |
| `_attributes_not?` | `string` \| ``null`` |
| `_attributes_not_contains?` | `string` \| ``null`` |
| `_attributes_not_contains_nocase?` | `string` \| ``null`` |
| `_attributes_not_ends_with?` | `string` \| ``null`` |
| `_attributes_not_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_not_in?` | `string`[] |
| `_attributes_not_starts_with?` | `string` \| ``null`` |
| `_attributes_not_starts_with_nocase?` | `string` \| ``null`` |
| `_attributes_starts_with?` | `string` \| ``null`` |
| `_attributes_starts_with_nocase?` | `string` \| ``null`` |
| `_blockNumberUpdated?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_in?` | `WeiSource`[] |
| `_blockNumberUpdated_lt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_lte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not_in?` | `WeiSource`[] |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `provId?` | `string` \| ``null`` |
| `provId_contains?` | `string` \| ``null`` |
| `provId_in?` | `string`[] |
| `provId_not?` | `string` \| ``null`` |
| `provId_not_contains?` | `string` \| ``null`` |
| `provId_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:747

___

### UsedResult

Ƭ **UsedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | `string` |
| `_agentId` | `string` |
| `_attributes` | `string` |
| `_blockNumberUpdated` | `Wei` |
| `_did` | `string` |
| `id` | `string` |
| `provId` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:809

___

### WasAssociatedWithArgs

Ƭ **WasAssociatedWithArgs**<`K`\>: { [Property in keyof Pick<WasAssociatedWithFields, K\>]: WasAssociatedWithFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`WasAssociatedWithResult`](subgraphs.DIDRegistry.md#wasassociatedwithresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:912

___

### WasAssociatedWithFields

Ƭ **WasAssociatedWithFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | ``true`` |
| `_agentId` | ``true`` |
| `_attributes` | ``true`` |
| `_blockNumberUpdated` | ``true`` |
| `_entityDid` | ``true`` |
| `id` | ``true`` |
| `provId` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:903

___

### WasAssociatedWithFilter

Ƭ **WasAssociatedWithFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId?` | `string` \| ``null`` |
| `_activityId_contains?` | `string` \| ``null`` |
| `_activityId_in?` | `string`[] |
| `_activityId_not?` | `string` \| ``null`` |
| `_activityId_not_contains?` | `string` \| ``null`` |
| `_activityId_not_in?` | `string`[] |
| `_agentId?` | `string` \| ``null`` |
| `_agentId_contains?` | `string` \| ``null`` |
| `_agentId_in?` | `string`[] |
| `_agentId_not?` | `string` \| ``null`` |
| `_agentId_not_contains?` | `string` \| ``null`` |
| `_agentId_not_in?` | `string`[] |
| `_attributes?` | `string` \| ``null`` |
| `_attributes_contains?` | `string` \| ``null`` |
| `_attributes_contains_nocase?` | `string` \| ``null`` |
| `_attributes_ends_with?` | `string` \| ``null`` |
| `_attributes_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_gt?` | `string` \| ``null`` |
| `_attributes_gte?` | `string` \| ``null`` |
| `_attributes_in?` | `string`[] |
| `_attributes_lt?` | `string` \| ``null`` |
| `_attributes_lte?` | `string` \| ``null`` |
| `_attributes_not?` | `string` \| ``null`` |
| `_attributes_not_contains?` | `string` \| ``null`` |
| `_attributes_not_contains_nocase?` | `string` \| ``null`` |
| `_attributes_not_ends_with?` | `string` \| ``null`` |
| `_attributes_not_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_not_in?` | `string`[] |
| `_attributes_not_starts_with?` | `string` \| ``null`` |
| `_attributes_not_starts_with_nocase?` | `string` \| ``null`` |
| `_attributes_starts_with?` | `string` \| ``null`` |
| `_attributes_starts_with_nocase?` | `string` \| ``null`` |
| `_blockNumberUpdated?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_in?` | `WeiSource`[] |
| `_blockNumberUpdated_lt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_lte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not_in?` | `WeiSource`[] |
| `_entityDid?` | `string` \| ``null`` |
| `_entityDid_contains?` | `string` \| ``null`` |
| `_entityDid_in?` | `string`[] |
| `_entityDid_not?` | `string` \| ``null`` |
| `_entityDid_not_contains?` | `string` \| ``null`` |
| `_entityDid_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `provId?` | `string` \| ``null`` |
| `provId_contains?` | `string` \| ``null`` |
| `provId_in?` | `string`[] |
| `provId_not?` | `string` \| ``null`` |
| `provId_not_contains?` | `string` \| ``null`` |
| `provId_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:832

___

### WasAssociatedWithResult

Ƭ **WasAssociatedWithResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | `string` |
| `_agentId` | `string` |
| `_attributes` | `string` |
| `_blockNumberUpdated` | `Wei` |
| `_entityDid` | `string` |
| `id` | `string` |
| `provId` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:894

___

### WasDerivedFromArgs

Ƭ **WasDerivedFromArgs**<`K`\>: { [Property in keyof Pick<WasDerivedFromFields, K\>]: WasDerivedFromFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`WasDerivedFromResult`](subgraphs.DIDRegistry.md#wasderivedfromresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:1005

___

### WasDerivedFromFields

Ƭ **WasDerivedFromFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | ``true`` |
| `_agentId` | ``true`` |
| `_attributes` | ``true`` |
| `_blockNumberUpdated` | ``true`` |
| `_newEntityDid` | ``true`` |
| `_usedEntityDid` | ``true`` |
| `id` | ``true`` |
| `provId` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:995

___

### WasDerivedFromFilter

Ƭ **WasDerivedFromFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId?` | `string` \| ``null`` |
| `_activityId_contains?` | `string` \| ``null`` |
| `_activityId_in?` | `string`[] |
| `_activityId_not?` | `string` \| ``null`` |
| `_activityId_not_contains?` | `string` \| ``null`` |
| `_activityId_not_in?` | `string`[] |
| `_agentId?` | `string` \| ``null`` |
| `_agentId_contains?` | `string` \| ``null`` |
| `_agentId_in?` | `string`[] |
| `_agentId_not?` | `string` \| ``null`` |
| `_agentId_not_contains?` | `string` \| ``null`` |
| `_agentId_not_in?` | `string`[] |
| `_attributes?` | `string` \| ``null`` |
| `_attributes_contains?` | `string` \| ``null`` |
| `_attributes_contains_nocase?` | `string` \| ``null`` |
| `_attributes_ends_with?` | `string` \| ``null`` |
| `_attributes_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_gt?` | `string` \| ``null`` |
| `_attributes_gte?` | `string` \| ``null`` |
| `_attributes_in?` | `string`[] |
| `_attributes_lt?` | `string` \| ``null`` |
| `_attributes_lte?` | `string` \| ``null`` |
| `_attributes_not?` | `string` \| ``null`` |
| `_attributes_not_contains?` | `string` \| ``null`` |
| `_attributes_not_contains_nocase?` | `string` \| ``null`` |
| `_attributes_not_ends_with?` | `string` \| ``null`` |
| `_attributes_not_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_not_in?` | `string`[] |
| `_attributes_not_starts_with?` | `string` \| ``null`` |
| `_attributes_not_starts_with_nocase?` | `string` \| ``null`` |
| `_attributes_starts_with?` | `string` \| ``null`` |
| `_attributes_starts_with_nocase?` | `string` \| ``null`` |
| `_blockNumberUpdated?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_in?` | `WeiSource`[] |
| `_blockNumberUpdated_lt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_lte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not_in?` | `WeiSource`[] |
| `_newEntityDid?` | `string` \| ``null`` |
| `_newEntityDid_contains?` | `string` \| ``null`` |
| `_newEntityDid_in?` | `string`[] |
| `_newEntityDid_not?` | `string` \| ``null`` |
| `_newEntityDid_not_contains?` | `string` \| ``null`` |
| `_newEntityDid_not_in?` | `string`[] |
| `_usedEntityDid?` | `string` \| ``null`` |
| `_usedEntityDid_contains?` | `string` \| ``null`` |
| `_usedEntityDid_in?` | `string`[] |
| `_usedEntityDid_not?` | `string` \| ``null`` |
| `_usedEntityDid_not_contains?` | `string` \| ``null`` |
| `_usedEntityDid_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `provId?` | `string` \| ``null`` |
| `provId_contains?` | `string` \| ``null`` |
| `provId_in?` | `string`[] |
| `provId_not?` | `string` \| ``null`` |
| `provId_not_contains?` | `string` \| ``null`` |
| `provId_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:917

___

### WasDerivedFromResult

Ƭ **WasDerivedFromResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | `string` |
| `_agentId` | `string` |
| `_attributes` | `string` |
| `_blockNumberUpdated` | `Wei` |
| `_newEntityDid` | `string` |
| `_usedEntityDid` | `string` |
| `id` | `string` |
| `provId` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:985

___

### WasGeneratedByArgs

Ƭ **WasGeneratedByArgs**<`K`\>: { [Property in keyof Pick<WasGeneratedByFields, K\>]: WasGeneratedByFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`WasGeneratedByResult`](subgraphs.DIDRegistry.md#wasgeneratedbyresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:1090

___

### WasGeneratedByFields

Ƭ **WasGeneratedByFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | ``true`` |
| `_agentId` | ``true`` |
| `_attributes` | ``true`` |
| `_blockNumberUpdated` | ``true`` |
| `_did` | ``true`` |
| `id` | ``true`` |
| `provId` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:1081

___

### WasGeneratedByFilter

Ƭ **WasGeneratedByFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId?` | `string` \| ``null`` |
| `_activityId_contains?` | `string` \| ``null`` |
| `_activityId_in?` | `string`[] |
| `_activityId_not?` | `string` \| ``null`` |
| `_activityId_not_contains?` | `string` \| ``null`` |
| `_activityId_not_in?` | `string`[] |
| `_agentId?` | `string` \| ``null`` |
| `_agentId_contains?` | `string` \| ``null`` |
| `_agentId_in?` | `string`[] |
| `_agentId_not?` | `string` \| ``null`` |
| `_agentId_not_contains?` | `string` \| ``null`` |
| `_agentId_not_in?` | `string`[] |
| `_attributes?` | `string` \| ``null`` |
| `_attributes_contains?` | `string` \| ``null`` |
| `_attributes_contains_nocase?` | `string` \| ``null`` |
| `_attributes_ends_with?` | `string` \| ``null`` |
| `_attributes_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_gt?` | `string` \| ``null`` |
| `_attributes_gte?` | `string` \| ``null`` |
| `_attributes_in?` | `string`[] |
| `_attributes_lt?` | `string` \| ``null`` |
| `_attributes_lte?` | `string` \| ``null`` |
| `_attributes_not?` | `string` \| ``null`` |
| `_attributes_not_contains?` | `string` \| ``null`` |
| `_attributes_not_contains_nocase?` | `string` \| ``null`` |
| `_attributes_not_ends_with?` | `string` \| ``null`` |
| `_attributes_not_ends_with_nocase?` | `string` \| ``null`` |
| `_attributes_not_in?` | `string`[] |
| `_attributes_not_starts_with?` | `string` \| ``null`` |
| `_attributes_not_starts_with_nocase?` | `string` \| ``null`` |
| `_attributes_starts_with?` | `string` \| ``null`` |
| `_attributes_starts_with_nocase?` | `string` \| ``null`` |
| `_blockNumberUpdated?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_gte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_in?` | `WeiSource`[] |
| `_blockNumberUpdated_lt?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_lte?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not?` | `WeiSource` \| ``null`` |
| `_blockNumberUpdated_not_in?` | `WeiSource`[] |
| `_did?` | `string` \| ``null`` |
| `_did_contains?` | `string` \| ``null`` |
| `_did_in?` | `string`[] |
| `_did_not?` | `string` \| ``null`` |
| `_did_not_contains?` | `string` \| ``null`` |
| `_did_not_in?` | `string`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |
| `provId?` | `string` \| ``null`` |
| `provId_contains?` | `string` \| ``null`` |
| `provId_in?` | `string`[] |
| `provId_not?` | `string` \| ``null`` |
| `provId_not_contains?` | `string` \| ``null`` |
| `provId_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:1010

___

### WasGeneratedByResult

Ƭ **WasGeneratedByResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_activityId` | `string` |
| `_agentId` | `string` |
| `_attributes` | `string` |
| `_blockNumberUpdated` | `Wei` |
| `_did` | `string` |
| `id` | `string` |
| `provId` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:1072

## Functions

### getActedOnBehalfById

▸ **getActedOnBehalfById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ActedOnBehalfResult`](subgraphs.DIDRegistry.md#actedonbehalfresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ActedOnBehalfResult`](subgraphs.DIDRegistry.md#actedonbehalfresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`ActedOnBehalfArgs`](subgraphs.DIDRegistry.md#actedonbehalfargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ActedOnBehalfResult`](subgraphs.DIDRegistry.md#actedonbehalfresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:112

___

### getActedOnBehalfs

▸ **getActedOnBehalfs**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ActedOnBehalfResult`](subgraphs.DIDRegistry.md#actedonbehalfresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ActedOnBehalfResult`](subgraphs.DIDRegistry.md#actedonbehalfresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`ActedOnBehalfFilter`](subgraphs.DIDRegistry.md#actedonbehalffilter), [`ActedOnBehalfResult`](subgraphs.DIDRegistry.md#actedonbehalfresult)\> |
| `args` | [`ActedOnBehalfArgs`](subgraphs.DIDRegistry.md#actedonbehalfargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ActedOnBehalfResult`](subgraphs.DIDRegistry.md#actedonbehalfresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:113

___

### getDIDAttributeRegisteredById

▸ **getDIDAttributeRegisteredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDAttributeRegisteredResult`](subgraphs.DIDRegistry.md#didattributeregisteredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDAttributeRegisteredResult`](subgraphs.DIDRegistry.md#didattributeregisteredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`DIDAttributeRegisteredArgs`](subgraphs.DIDRegistry.md#didattributeregisteredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDAttributeRegisteredResult`](subgraphs.DIDRegistry.md#didattributeregisteredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:197

___

### getDIDAttributeRegistereds

▸ **getDIDAttributeRegistereds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDAttributeRegisteredResult`](subgraphs.DIDRegistry.md#didattributeregisteredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDAttributeRegisteredResult`](subgraphs.DIDRegistry.md#didattributeregisteredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`DIDAttributeRegisteredFilter`](subgraphs.DIDRegistry.md#didattributeregisteredfilter), [`DIDAttributeRegisteredResult`](subgraphs.DIDRegistry.md#didattributeregisteredresult)\> |
| `args` | [`DIDAttributeRegisteredArgs`](subgraphs.DIDRegistry.md#didattributeregisteredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDAttributeRegisteredResult`](subgraphs.DIDRegistry.md#didattributeregisteredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:198

___

### getDIDOwnershipTransferredById

▸ **getDIDOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDOwnershipTransferredResult`](subgraphs.DIDRegistry.md#didownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDOwnershipTransferredResult`](subgraphs.DIDRegistry.md#didownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`DIDOwnershipTransferredArgs`](subgraphs.DIDRegistry.md#didownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDOwnershipTransferredResult`](subgraphs.DIDRegistry.md#didownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:242

___

### getDIDOwnershipTransferreds

▸ **getDIDOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDOwnershipTransferredResult`](subgraphs.DIDRegistry.md#didownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDOwnershipTransferredResult`](subgraphs.DIDRegistry.md#didownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`DIDOwnershipTransferredFilter`](subgraphs.DIDRegistry.md#didownershiptransferredfilter), [`DIDOwnershipTransferredResult`](subgraphs.DIDRegistry.md#didownershiptransferredresult)\> |
| `args` | [`DIDOwnershipTransferredArgs`](subgraphs.DIDRegistry.md#didownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDOwnershipTransferredResult`](subgraphs.DIDRegistry.md#didownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:243

___

### getDIDPermissionGrantedById

▸ **getDIDPermissionGrantedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDPermissionGrantedResult`](subgraphs.DIDRegistry.md#didpermissiongrantedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDPermissionGrantedResult`](subgraphs.DIDRegistry.md#didpermissiongrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`DIDPermissionGrantedArgs`](subgraphs.DIDRegistry.md#didpermissiongrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDPermissionGrantedResult`](subgraphs.DIDRegistry.md#didpermissiongrantedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:287

___

### getDIDPermissionGranteds

▸ **getDIDPermissionGranteds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDPermissionGrantedResult`](subgraphs.DIDRegistry.md#didpermissiongrantedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDPermissionGrantedResult`](subgraphs.DIDRegistry.md#didpermissiongrantedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`DIDPermissionGrantedFilter`](subgraphs.DIDRegistry.md#didpermissiongrantedfilter), [`DIDPermissionGrantedResult`](subgraphs.DIDRegistry.md#didpermissiongrantedresult)\> |
| `args` | [`DIDPermissionGrantedArgs`](subgraphs.DIDRegistry.md#didpermissiongrantedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDPermissionGrantedResult`](subgraphs.DIDRegistry.md#didpermissiongrantedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:288

___

### getDIDPermissionRevokedById

▸ **getDIDPermissionRevokedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDPermissionRevokedResult`](subgraphs.DIDRegistry.md#didpermissionrevokedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDPermissionRevokedResult`](subgraphs.DIDRegistry.md#didpermissionrevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`DIDPermissionRevokedArgs`](subgraphs.DIDRegistry.md#didpermissionrevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDPermissionRevokedResult`](subgraphs.DIDRegistry.md#didpermissionrevokedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:332

___

### getDIDPermissionRevokeds

▸ **getDIDPermissionRevokeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDPermissionRevokedResult`](subgraphs.DIDRegistry.md#didpermissionrevokedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDPermissionRevokedResult`](subgraphs.DIDRegistry.md#didpermissionrevokedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`DIDPermissionRevokedFilter`](subgraphs.DIDRegistry.md#didpermissionrevokedfilter), [`DIDPermissionRevokedResult`](subgraphs.DIDRegistry.md#didpermissionrevokedresult)\> |
| `args` | [`DIDPermissionRevokedArgs`](subgraphs.DIDRegistry.md#didpermissionrevokedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDPermissionRevokedResult`](subgraphs.DIDRegistry.md#didpermissionrevokedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:333

___

### getDIDProvenanceDelegateAddedById

▸ **getDIDProvenanceDelegateAddedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDProvenanceDelegateAddedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProvenanceDelegateAddedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`DIDProvenanceDelegateAddedArgs`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDProvenanceDelegateAddedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:369

___

### getDIDProvenanceDelegateAddeds

▸ **getDIDProvenanceDelegateAddeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDProvenanceDelegateAddedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProvenanceDelegateAddedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`DIDProvenanceDelegateAddedFilter`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedfilter), [`DIDProvenanceDelegateAddedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedresult)\> |
| `args` | [`DIDProvenanceDelegateAddedArgs`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDProvenanceDelegateAddedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateaddedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:370

___

### getDIDProvenanceDelegateRemovedById

▸ **getDIDProvenanceDelegateRemovedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDProvenanceDelegateRemovedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProvenanceDelegateRemovedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`DIDProvenanceDelegateRemovedArgs`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDProvenanceDelegateRemovedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:412

___

### getDIDProvenanceDelegateRemoveds

▸ **getDIDProvenanceDelegateRemoveds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDProvenanceDelegateRemovedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProvenanceDelegateRemovedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`DIDProvenanceDelegateRemovedFilter`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedfilter), [`DIDProvenanceDelegateRemovedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedresult)\> |
| `args` | [`DIDProvenanceDelegateRemovedArgs`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDProvenanceDelegateRemovedResult`](subgraphs.DIDRegistry.md#didprovenancedelegateremovedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:413

___

### getDIDProviderAddedById

▸ **getDIDProviderAddedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDProviderAddedResult`](subgraphs.DIDRegistry.md#didprovideraddedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProviderAddedResult`](subgraphs.DIDRegistry.md#didprovideraddedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`DIDProviderAddedArgs`](subgraphs.DIDRegistry.md#didprovideraddedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDProviderAddedResult`](subgraphs.DIDRegistry.md#didprovideraddedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:449

___

### getDIDProviderAddeds

▸ **getDIDProviderAddeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDProviderAddedResult`](subgraphs.DIDRegistry.md#didprovideraddedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProviderAddedResult`](subgraphs.DIDRegistry.md#didprovideraddedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`DIDProviderAddedFilter`](subgraphs.DIDRegistry.md#didprovideraddedfilter), [`DIDProviderAddedResult`](subgraphs.DIDRegistry.md#didprovideraddedresult)\> |
| `args` | [`DIDProviderAddedArgs`](subgraphs.DIDRegistry.md#didprovideraddedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDProviderAddedResult`](subgraphs.DIDRegistry.md#didprovideraddedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:450

___

### getDIDProviderRemovedById

▸ **getDIDProviderRemovedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDProviderRemovedResult`](subgraphs.DIDRegistry.md#didproviderremovedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProviderRemovedResult`](subgraphs.DIDRegistry.md#didproviderremovedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`DIDProviderRemovedArgs`](subgraphs.DIDRegistry.md#didproviderremovedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDProviderRemovedResult`](subgraphs.DIDRegistry.md#didproviderremovedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:492

___

### getDIDProviderRemoveds

▸ **getDIDProviderRemoveds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDProviderRemovedResult`](subgraphs.DIDRegistry.md#didproviderremovedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDProviderRemovedResult`](subgraphs.DIDRegistry.md#didproviderremovedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`DIDProviderRemovedFilter`](subgraphs.DIDRegistry.md#didproviderremovedfilter), [`DIDProviderRemovedResult`](subgraphs.DIDRegistry.md#didproviderremovedresult)\> |
| `args` | [`DIDProviderRemovedArgs`](subgraphs.DIDRegistry.md#didproviderremovedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDProviderRemovedResult`](subgraphs.DIDRegistry.md#didproviderremovedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:493

___

### getDIDRoyaltiesAddedById

▸ **getDIDRoyaltiesAddedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDRoyaltiesAddedResult`](subgraphs.DIDRegistry.md#didroyaltiesaddedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDRoyaltiesAddedResult`](subgraphs.DIDRegistry.md#didroyaltiesaddedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`DIDRoyaltiesAddedArgs`](subgraphs.DIDRegistry.md#didroyaltiesaddedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDRoyaltiesAddedResult`](subgraphs.DIDRegistry.md#didroyaltiesaddedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:529

___

### getDIDRoyaltiesAddeds

▸ **getDIDRoyaltiesAddeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDRoyaltiesAddedResult`](subgraphs.DIDRegistry.md#didroyaltiesaddedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDRoyaltiesAddedResult`](subgraphs.DIDRegistry.md#didroyaltiesaddedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`DIDRoyaltiesAddedFilter`](subgraphs.DIDRegistry.md#didroyaltiesaddedfilter), [`DIDRoyaltiesAddedResult`](subgraphs.DIDRegistry.md#didroyaltiesaddedresult)\> |
| `args` | [`DIDRoyaltiesAddedArgs`](subgraphs.DIDRegistry.md#didroyaltiesaddedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDRoyaltiesAddedResult`](subgraphs.DIDRegistry.md#didroyaltiesaddedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:530

___

### getDIDRoyaltyRecipientChangedById

▸ **getDIDRoyaltyRecipientChangedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDRoyaltyRecipientChangedResult`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDRoyaltyRecipientChangedResult`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`DIDRoyaltyRecipientChangedArgs`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDRoyaltyRecipientChangedResult`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:566

___

### getDIDRoyaltyRecipientChangeds

▸ **getDIDRoyaltyRecipientChangeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`DIDRoyaltyRecipientChangedResult`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`DIDRoyaltyRecipientChangedResult`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`DIDRoyaltyRecipientChangedFilter`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedfilter), [`DIDRoyaltyRecipientChangedResult`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedresult)\> |
| `args` | [`DIDRoyaltyRecipientChangedArgs`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`DIDRoyaltyRecipientChangedResult`](subgraphs.DIDRegistry.md#didroyaltyrecipientchangedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:567

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.DIDRegistry.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.DIDRegistry.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.DIDRegistry.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.DIDRegistry.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:597

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.DIDRegistry.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.DIDRegistry.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.DIDRegistry.md#initializedfilter), [`InitializedResult`](subgraphs.DIDRegistry.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.DIDRegistry.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.DIDRegistry.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:598

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.DIDRegistry.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.DIDRegistry.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.DIDRegistry.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.DIDRegistry.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:634

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.DIDRegistry.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.DIDRegistry.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.DIDRegistry.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.DIDRegistry.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.DIDRegistry.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.DIDRegistry.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:635

___

### getProvenanceAttributeRegisteredById

▸ **getProvenanceAttributeRegisteredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ProvenanceAttributeRegisteredResult`](subgraphs.DIDRegistry.md#provenanceattributeregisteredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ProvenanceAttributeRegisteredResult`](subgraphs.DIDRegistry.md#provenanceattributeregisteredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`ProvenanceAttributeRegisteredArgs`](subgraphs.DIDRegistry.md#provenanceattributeregisteredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ProvenanceAttributeRegisteredResult`](subgraphs.DIDRegistry.md#provenanceattributeregisteredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:745

___

### getProvenanceAttributeRegistereds

▸ **getProvenanceAttributeRegistereds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ProvenanceAttributeRegisteredResult`](subgraphs.DIDRegistry.md#provenanceattributeregisteredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ProvenanceAttributeRegisteredResult`](subgraphs.DIDRegistry.md#provenanceattributeregisteredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`ProvenanceAttributeRegisteredFilter`](subgraphs.DIDRegistry.md#provenanceattributeregisteredfilter), [`ProvenanceAttributeRegisteredResult`](subgraphs.DIDRegistry.md#provenanceattributeregisteredresult)\> |
| `args` | [`ProvenanceAttributeRegisteredArgs`](subgraphs.DIDRegistry.md#provenanceattributeregisteredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ProvenanceAttributeRegisteredResult`](subgraphs.DIDRegistry.md#provenanceattributeregisteredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:746

___

### getUsedById

▸ **getUsedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`UsedResult`](subgraphs.DIDRegistry.md#usedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`UsedResult`](subgraphs.DIDRegistry.md#usedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`UsedArgs`](subgraphs.DIDRegistry.md#usedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`UsedResult`](subgraphs.DIDRegistry.md#usedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:830

___

### getUseds

▸ **getUseds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`UsedResult`](subgraphs.DIDRegistry.md#usedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`UsedResult`](subgraphs.DIDRegistry.md#usedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`UsedFilter`](subgraphs.DIDRegistry.md#usedfilter), [`UsedResult`](subgraphs.DIDRegistry.md#usedresult)\> |
| `args` | [`UsedArgs`](subgraphs.DIDRegistry.md#usedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`UsedResult`](subgraphs.DIDRegistry.md#usedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:831

___

### getWasAssociatedWithById

▸ **getWasAssociatedWithById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`WasAssociatedWithResult`](subgraphs.DIDRegistry.md#wasassociatedwithresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`WasAssociatedWithResult`](subgraphs.DIDRegistry.md#wasassociatedwithresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`WasAssociatedWithArgs`](subgraphs.DIDRegistry.md#wasassociatedwithargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`WasAssociatedWithResult`](subgraphs.DIDRegistry.md#wasassociatedwithresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:915

___

### getWasAssociatedWiths

▸ **getWasAssociatedWiths**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`WasAssociatedWithResult`](subgraphs.DIDRegistry.md#wasassociatedwithresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`WasAssociatedWithResult`](subgraphs.DIDRegistry.md#wasassociatedwithresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`WasAssociatedWithFilter`](subgraphs.DIDRegistry.md#wasassociatedwithfilter), [`WasAssociatedWithResult`](subgraphs.DIDRegistry.md#wasassociatedwithresult)\> |
| `args` | [`WasAssociatedWithArgs`](subgraphs.DIDRegistry.md#wasassociatedwithargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`WasAssociatedWithResult`](subgraphs.DIDRegistry.md#wasassociatedwithresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:916

___

### getWasDerivedFromById

▸ **getWasDerivedFromById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`WasDerivedFromResult`](subgraphs.DIDRegistry.md#wasderivedfromresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`WasDerivedFromResult`](subgraphs.DIDRegistry.md#wasderivedfromresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`WasDerivedFromArgs`](subgraphs.DIDRegistry.md#wasderivedfromargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`WasDerivedFromResult`](subgraphs.DIDRegistry.md#wasderivedfromresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:1008

___

### getWasDerivedFroms

▸ **getWasDerivedFroms**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`WasDerivedFromResult`](subgraphs.DIDRegistry.md#wasderivedfromresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`WasDerivedFromResult`](subgraphs.DIDRegistry.md#wasderivedfromresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`WasDerivedFromFilter`](subgraphs.DIDRegistry.md#wasderivedfromfilter), [`WasDerivedFromResult`](subgraphs.DIDRegistry.md#wasderivedfromresult)\> |
| `args` | [`WasDerivedFromArgs`](subgraphs.DIDRegistry.md#wasderivedfromargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`WasDerivedFromResult`](subgraphs.DIDRegistry.md#wasderivedfromresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:1009

___

### getWasGeneratedByById

▸ **getWasGeneratedByById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`WasGeneratedByResult`](subgraphs.DIDRegistry.md#wasgeneratedbyresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`WasGeneratedByResult`](subgraphs.DIDRegistry.md#wasgeneratedbyresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.DIDRegistry.md#singlequeryoptions) |
| `args` | [`WasGeneratedByArgs`](subgraphs.DIDRegistry.md#wasgeneratedbyargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`WasGeneratedByResult`](subgraphs.DIDRegistry.md#wasgeneratedbyresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:1093

___

### getWasGeneratedBys

▸ **getWasGeneratedBys**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`WasGeneratedByResult`](subgraphs.DIDRegistry.md#wasgeneratedbyresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`WasGeneratedByResult`](subgraphs.DIDRegistry.md#wasgeneratedbyresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.DIDRegistry.md#multiqueryoptions)<[`WasGeneratedByFilter`](subgraphs.DIDRegistry.md#wasgeneratedbyfilter), [`WasGeneratedByResult`](subgraphs.DIDRegistry.md#wasgeneratedbyresult)\> |
| `args` | [`WasGeneratedByArgs`](subgraphs.DIDRegistry.md#wasgeneratedbyargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`WasGeneratedByResult`](subgraphs.DIDRegistry.md#wasgeneratedbyresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/DIDRegistry.d.ts:1094
