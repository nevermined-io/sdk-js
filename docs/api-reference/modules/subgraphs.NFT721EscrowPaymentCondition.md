[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [subgraphs](subgraphs.md) / NFT721EscrowPaymentCondition

# Namespace: NFT721EscrowPaymentCondition

[subgraphs](subgraphs.md).NFT721EscrowPaymentCondition

## Table of contents

### Type Aliases

- [FulfilledArgs](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledargs)
- [FulfilledFields](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledfields)
- [FulfilledFilter](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledfilter)
- [FulfilledResult](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledresult)
- [InitializedArgs](subgraphs.NFT721EscrowPaymentCondition.md#initializedargs)
- [InitializedFields](subgraphs.NFT721EscrowPaymentCondition.md#initializedfields)
- [InitializedFilter](subgraphs.NFT721EscrowPaymentCondition.md#initializedfilter)
- [InitializedResult](subgraphs.NFT721EscrowPaymentCondition.md#initializedresult)
- [MultiQueryOptions](subgraphs.NFT721EscrowPaymentCondition.md#multiqueryoptions)
- [OwnershipTransferredArgs](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredargs)
- [OwnershipTransferredFields](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredfields)
- [OwnershipTransferredFilter](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredfilter)
- [OwnershipTransferredResult](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredresult)
- [ReceivedArgs](subgraphs.NFT721EscrowPaymentCondition.md#receivedargs)
- [ReceivedFields](subgraphs.NFT721EscrowPaymentCondition.md#receivedfields)
- [ReceivedFilter](subgraphs.NFT721EscrowPaymentCondition.md#receivedfilter)
- [ReceivedResult](subgraphs.NFT721EscrowPaymentCondition.md#receivedresult)
- [SingleQueryOptions](subgraphs.NFT721EscrowPaymentCondition.md#singlequeryoptions)

### Functions

- [getFulfilledById](subgraphs.NFT721EscrowPaymentCondition.md#getfulfilledbyid)
- [getFulfilleds](subgraphs.NFT721EscrowPaymentCondition.md#getfulfilleds)
- [getInitializedById](subgraphs.NFT721EscrowPaymentCondition.md#getinitializedbyid)
- [getInitializeds](subgraphs.NFT721EscrowPaymentCondition.md#getinitializeds)
- [getOwnershipTransferredById](subgraphs.NFT721EscrowPaymentCondition.md#getownershiptransferredbyid)
- [getOwnershipTransferreds](subgraphs.NFT721EscrowPaymentCondition.md#getownershiptransferreds)
- [getReceivedById](subgraphs.NFT721EscrowPaymentCondition.md#getreceivedbyid)
- [getReceiveds](subgraphs.NFT721EscrowPaymentCondition.md#getreceiveds)

## Type Aliases

### FulfilledArgs

Ƭ **FulfilledArgs**<`K`\>: { [Property in keyof Pick<FulfilledFields, K\>]: FulfilledFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:87

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
| `_tokenAddress` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:78

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
| `_amounts?` | `WeiSource` \| ``null`` |
| `_amounts_gt?` | `WeiSource` \| ``null`` |
| `_amounts_gte?` | `WeiSource` \| ``null`` |
| `_amounts_in?` | `WeiSource`[] |
| `_amounts_lt?` | `WeiSource` \| ``null`` |
| `_amounts_lte?` | `WeiSource` \| ``null`` |
| `_amounts_not?` | `WeiSource` \| ``null`` |
| `_amounts_not_in?` | `WeiSource`[] |
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
| `_receivers?` | `string` \| ``null`` |
| `_receivers_contains?` | `string` \| ``null`` |
| `_receivers_in?` | `string`[] |
| `_receivers_not?` | `string` \| ``null`` |
| `_receivers_not_contains?` | `string` \| ``null`` |
| `_receivers_not_in?` | `string`[] |
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

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:21

___

### FulfilledResult

Ƭ **FulfilledResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_agreementId` | `string` |
| `_amounts` | `Wei` |
| `_conditionId` | `string` |
| `_did` | `string` |
| `_receivers` | `string` |
| `_tokenAddress` | `string` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:69

___

### InitializedArgs

Ƭ **InitializedArgs**<`K`\>: { [Property in keyof Pick<InitializedFields, K\>]: InitializedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721EscrowPaymentCondition.md#initializedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:118

___

### InitializedFields

Ƭ **InitializedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | ``true`` |
| `version` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:114

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

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:92

___

### InitializedResult

Ƭ **InitializedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version` | `number` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:110

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

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:10

___

### OwnershipTransferredArgs

Ƭ **OwnershipTransferredArgs**<`K`\>: { [Property in keyof Pick<OwnershipTransferredFields, K\>]: OwnershipTransferredFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:155

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

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:150

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

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:123

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

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:145

___

### ReceivedArgs

Ƭ **ReceivedArgs**<`K`\>: { [Property in keyof Pick<ReceivedFields, K\>]: ReceivedFields[Property] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ReceivedResult`](subgraphs.NFT721EscrowPaymentCondition.md#receivedresult) |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:194

___

### ReceivedFields

Ƭ **ReceivedFields**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_from` | ``true`` |
| `_value` | ``true`` |
| `id` | ``true`` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:189

___

### ReceivedFilter

Ƭ **ReceivedFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_from?` | `string` \| ``null`` |
| `_from_contains?` | `string` \| ``null`` |
| `_from_in?` | `string`[] |
| `_from_not?` | `string` \| ``null`` |
| `_from_not_contains?` | `string` \| ``null`` |
| `_from_not_in?` | `string`[] |
| `_value?` | `WeiSource` \| ``null`` |
| `_value_gt?` | `WeiSource` \| ``null`` |
| `_value_gte?` | `WeiSource` \| ``null`` |
| `_value_in?` | `WeiSource`[] |
| `_value_lt?` | `WeiSource` \| ``null`` |
| `_value_lte?` | `WeiSource` \| ``null`` |
| `_value_not?` | `WeiSource` \| ``null`` |
| `_value_not_in?` | `WeiSource`[] |
| `id?` | `string` \| ``null`` |
| `id_gt?` | `string` \| ``null`` |
| `id_gte?` | `string` \| ``null`` |
| `id_in?` | `string`[] |
| `id_lt?` | `string` \| ``null`` |
| `id_lte?` | `string` \| ``null`` |
| `id_not?` | `string` \| ``null`` |
| `id_not_in?` | `string`[] |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:160

___

### ReceivedResult

Ƭ **ReceivedResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_from` | `string` |
| `_value` | `Wei` |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:184

___

### SingleQueryOptions

Ƭ **SingleQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block?` | { `number`: `number`  } \| { `hash`: `string`  } |
| `id` | `string` |

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:2

## Functions

### getFulfilledById

▸ **getFulfilledById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721EscrowPaymentCondition.md#singlequeryoptions) |
| `args` | [`FulfilledArgs`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:90

___

### getFulfilleds

▸ **getFulfilleds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`FulfilledResult`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721EscrowPaymentCondition.md#multiqueryoptions)<[`FulfilledFilter`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledfilter), [`FulfilledResult`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledresult)\> |
| `args` | [`FulfilledArgs`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`FulfilledResult`](subgraphs.NFT721EscrowPaymentCondition.md#fulfilledresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:91

___

### getInitializedById

▸ **getInitializedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721EscrowPaymentCondition.md#initializedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721EscrowPaymentCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721EscrowPaymentCondition.md#singlequeryoptions) |
| `args` | [`InitializedArgs`](subgraphs.NFT721EscrowPaymentCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721EscrowPaymentCondition.md#initializedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:121

___

### getInitializeds

▸ **getInitializeds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721EscrowPaymentCondition.md#initializedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`InitializedResult`](subgraphs.NFT721EscrowPaymentCondition.md#initializedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721EscrowPaymentCondition.md#multiqueryoptions)<[`InitializedFilter`](subgraphs.NFT721EscrowPaymentCondition.md#initializedfilter), [`InitializedResult`](subgraphs.NFT721EscrowPaymentCondition.md#initializedresult)\> |
| `args` | [`InitializedArgs`](subgraphs.NFT721EscrowPaymentCondition.md#initializedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`InitializedResult`](subgraphs.NFT721EscrowPaymentCondition.md#initializedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:122

___

### getOwnershipTransferredById

▸ **getOwnershipTransferredById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721EscrowPaymentCondition.md#singlequeryoptions) |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:158

___

### getOwnershipTransferreds

▸ **getOwnershipTransferreds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`OwnershipTransferredResult`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721EscrowPaymentCondition.md#multiqueryoptions)<[`OwnershipTransferredFilter`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredfilter), [`OwnershipTransferredResult`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredresult)\> |
| `args` | [`OwnershipTransferredArgs`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`OwnershipTransferredResult`](subgraphs.NFT721EscrowPaymentCondition.md#ownershiptransferredresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:159

___

### getReceivedById

▸ **getReceivedById**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ReceivedResult`](subgraphs.NFT721EscrowPaymentCondition.md#receivedresult), `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ReceivedResult`](subgraphs.NFT721EscrowPaymentCondition.md#receivedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`SingleQueryOptions`](subgraphs.NFT721EscrowPaymentCondition.md#singlequeryoptions) |
| `args` | [`ReceivedArgs`](subgraphs.NFT721EscrowPaymentCondition.md#receivedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ReceivedResult`](subgraphs.NFT721EscrowPaymentCondition.md#receivedresult), `K`\>\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:197

___

### getReceiveds

▸ **getReceiveds**<`K`\>(`url`, `options`, `args`): `Promise`<`Pick`<[`ReceivedResult`](subgraphs.NFT721EscrowPaymentCondition.md#receivedresult), `K`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`ReceivedResult`](subgraphs.NFT721EscrowPaymentCondition.md#receivedresult) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | [`MultiQueryOptions`](subgraphs.NFT721EscrowPaymentCondition.md#multiqueryoptions)<[`ReceivedFilter`](subgraphs.NFT721EscrowPaymentCondition.md#receivedfilter), [`ReceivedResult`](subgraphs.NFT721EscrowPaymentCondition.md#receivedresult)\> |
| `args` | [`ReceivedArgs`](subgraphs.NFT721EscrowPaymentCondition.md#receivedargs)<`K`\> |

#### Returns

`Promise`<`Pick`<[`ReceivedResult`](subgraphs.NFT721EscrowPaymentCondition.md#receivedresult), `K`\>[]\>

#### Defined in

node_modules/@nevermined-io/subgraphs/build/NFT721EscrowPaymentCondition.d.ts:198
