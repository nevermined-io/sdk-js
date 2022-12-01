[@nevermined-io/nevermined-sdk-js](../code-reference.md) / utils

# Namespace: utils

## Table of contents

### References

- [LoggerInstance](utils.md#loggerinstance)

### Enumerations

- [LogLevel](../enums/utils.LogLevel.md)
- [OrderProgressStep](../enums/utils.OrderProgressStep.md)

### Classes

- [Logger](../classes/utils.Logger.md)
- [SubscribableObserver](../classes/utils.SubscribableObserver.md)
- [SubscribablePromise](../classes/utils.SubscribablePromise.md)

### Variables

- [ZeroAddress](utils.md#zeroaddress)

### Functions

- [didPrefixed](utils.md#didprefixed)
- [didTransformer](utils.md#didtransformer)
- [didZeroX](utils.md#didzerox)
- [eventToObject](utils.md#eventtoobject)
- [fillConditionsWithDDO](utils.md#fillconditionswithddo)
- [findServiceConditionByName](utils.md#findserviceconditionbyname)
- [generateId](utils.md#generateid)
- [getAssetRewardsFromDDOByService](utils.md#getassetrewardsfromddobyservice)
- [getAssetRewardsFromService](utils.md#getassetrewardsfromservice)
- [getDIDFromService](utils.md#getdidfromservice)
- [getNftAmountFromService](utils.md#getnftamountfromservice)
- [getNftHolderFromService](utils.md#getnftholderfromservice)
- [makeAccounts](utils.md#makeaccounts)
- [makeBuffer](utils.md#makebuffer)
- [noDidPrefixed](utils.md#nodidprefixed)
- [noZeroX](utils.md#nozerox)
- [objectPromiseAll](utils.md#objectpromiseall)
- [setAssetRewardsFromDDOByService](utils.md#setassetrewardsfromddobyservice)
- [setNFTRewardsFromDDOByService](utils.md#setnftrewardsfromddobyservice)
- [zeroX](utils.md#zerox)
- [zeroXTransformer](utils.md#zeroxtransformer)

## References

### LoggerInstance

Renames and re-exports [Logger](../code-reference.md#logger)

## Variables

### ZeroAddress

• `Const` **ZeroAddress**: ``"0x0000000000000000000000000000000000000000"``

#### Defined in

[src/utils/ConversionTypeHelpers.ts:53](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/ConversionTypeHelpers.ts#L53)

## Functions

### didPrefixed

▸ **didPrefixed**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/ConversionTypeHelpers.ts:17](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/ConversionTypeHelpers.ts#L17)

___

### didTransformer

▸ **didTransformer**(`input?`, `prefixOutput`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `string` | `''` |
| `prefixOutput` | `boolean` | `undefined` |

#### Returns

`string`

#### Defined in

[src/utils/ConversionTypeHelpers.ts:20](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/ConversionTypeHelpers.ts#L20)

___

### didZeroX

▸ **didZeroX**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/ConversionTypeHelpers.ts:30](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/ConversionTypeHelpers.ts#L30)

___

### eventToObject

▸ **eventToObject**(`event`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `any` |

#### Returns

`any`

#### Defined in

[src/utils/Events.ts:1](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/Events.ts#L1)

___

### fillConditionsWithDDO

▸ **fillConditionsWithDDO**(`conditions`, `ddo`, `assetRewards?`, `erc20TokenContract?`, `nftTokenContract?`, `nftHolder?`, `nftAmount?`, `nftTransfer?`, `duration?`): `ServiceAgreementTemplateCondition`[]

Fill some static parameters that depends on the metadata.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `conditions` | `ServiceAgreementTemplateCondition`[] | `undefined` | Conditions to fill. |
| `ddo` | [`DDO`](../classes/DDO.md) | `undefined` | DDO related to this conditions. |
| `assetRewards` | `default` | `undefined` | Rewards distribution |
| `erc20TokenContract?` | `string` | `undefined` | Number of nfts to handle |
| `nftTokenContract?` | `string` | `undefined` | Number of nfts to handle |
| `nftHolder?` | `string` | `undefined` | - |
| `nftAmount?` | `default` | `undefined` | Number of nfts to handle |
| `nftTransfer` | `boolean` | `false` | - |
| `duration` | `number` | `0` | - |

#### Returns

`ServiceAgreementTemplateCondition`[]

Filled conditions.

#### Defined in

[src/utils/DDOHelpers.ts:71](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/DDOHelpers.ts#L71)

___

### findServiceConditionByName

▸ **findServiceConditionByName**(`service`, `name`): `ServiceAgreementTemplateCondition`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `ServiceCommon` |
| `name` | `ConditionType` |

#### Returns

`ServiceAgreementTemplateCondition`

#### Defined in

[src/utils/DDOHelpers.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/DDOHelpers.ts#L100)

___

### generateId

▸ **generateId**(`length?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `length` | `number` | `64` |

#### Returns

`string`

#### Defined in

[src/utils/GeneratorHelpers.ts:3](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/GeneratorHelpers.ts#L3)

___

### getAssetRewardsFromDDOByService

▸ **getAssetRewardsFromDDOByService**(`ddo`, `service`): `AssetRewards`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ddo` | [`DDO`](../classes/DDO.md) |
| `service` | `ServiceType` |

#### Returns

`AssetRewards`

#### Defined in

[src/utils/DDOHelpers.ts:109](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/DDOHelpers.ts#L109)

___

### getAssetRewardsFromService

▸ **getAssetRewardsFromService**(`service`): `AssetRewards`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `ServiceCommon` |

#### Returns

`AssetRewards`

#### Defined in

[src/utils/DDOHelpers.ts:148](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/DDOHelpers.ts#L148)

___

### getDIDFromService

▸ **getDIDFromService**(`service`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `ServiceCommon` |

#### Returns

`string`

#### Defined in

[src/utils/DDOHelpers.ts:167](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/DDOHelpers.ts#L167)

___

### getNftAmountFromService

▸ **getNftAmountFromService**(`service`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `ServiceCommon` |

#### Returns

`BigNumber`

#### Defined in

[src/utils/DDOHelpers.ts:179](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/DDOHelpers.ts#L179)

___

### getNftHolderFromService

▸ **getNftHolderFromService**(`service`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `ServiceCommon` |

#### Returns

`string`

#### Defined in

[src/utils/DDOHelpers.ts:173](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/DDOHelpers.ts#L173)

___

### makeAccounts

▸ **makeAccounts**(`seedphrase`): `ethers.Wallet`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `seedphrase` | `string` |

#### Returns

`ethers.Wallet`[]

#### Defined in

[src/utils/MakeAccounts.ts:4](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/MakeAccounts.ts#L4)

___

### makeBuffer

▸ **makeBuffer**(`a`, `b`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`Buffer`

#### Defined in

[src/utils/index.ts:12](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/index.ts#L12)

___

### noDidPrefixed

▸ **noDidPrefixed**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/ConversionTypeHelpers.ts:18](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/ConversionTypeHelpers.ts#L18)

___

### noZeroX

▸ **noZeroX**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/ConversionTypeHelpers.ts:5](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/ConversionTypeHelpers.ts#L5)

___

### objectPromiseAll

▸ **objectPromiseAll**(`obj`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/utils/PromiseResolver.ts:11](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/PromiseResolver.ts#L11)

___

### setAssetRewardsFromDDOByService

▸ **setAssetRewardsFromDDOByService**(`ddo`, `serviceType`, `rewards`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ddo` | [`DDO`](../classes/DDO.md) |
| `serviceType` | `ServiceType` |
| `rewards` | `default` |

#### Returns

`void`

#### Defined in

[src/utils/DDOHelpers.ts:132](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/DDOHelpers.ts#L132)

___

### setNFTRewardsFromDDOByService

▸ **setNFTRewardsFromDDOByService**(`ddo`, `serviceType`, `rewards`, `holderAddress`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ddo` | [`DDO`](../classes/DDO.md) |
| `serviceType` | `ServiceType` |
| `rewards` | `default` |
| `holderAddress` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/DDOHelpers.ts:116](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/DDOHelpers.ts#L116)

___

### zeroX

▸ **zeroX**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/ConversionTypeHelpers.ts:4](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/ConversionTypeHelpers.ts#L4)

___

### zeroXTransformer

▸ **zeroXTransformer**(`input?`, `zeroOutput`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `string` | `''` |
| `zeroOutput` | `boolean` | `undefined` |

#### Returns

`string`

#### Defined in

[src/utils/ConversionTypeHelpers.ts:7](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/ConversionTypeHelpers.ts#L7)
