[@nevermined-io/sdk - v3.0.33](../code-reference.md) / ServicePlugin

# Interface: ServicePlugin\<T\>

## Type parameters

| Name | Type                                              |
| :--- | :------------------------------------------------ |
| `T`  | extends [`Service`](../code-reference.md#service) |

## Implemented by

- [`AccessService`](../classes/AccessService.md)
- [`BaseTemplate`](../classes/BaseTemplate.md)
- [`NFTAccessService`](../classes/NFTAccessService.md)
- [`NFTSalesService`](../classes/NFTSalesService.md)

## Table of contents

### Methods

- [accept](ServicePlugin.md#accept)
- [createService](ServicePlugin.md#createservice)
- [process](ServicePlugin.md#process)
- [track](ServicePlugin.md#track)

## Methods

### accept

▸ **accept**(`params`): `Promise`\<`boolean`\>

#### Parameters

| Name     | Type                                      |
| :------- | :---------------------------------------- |
| `params` | [`ValidationParams`](ValidationParams.md) |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/types/DDOTypes.ts:806](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/types/DDOTypes.ts#L806)

---

### createService

▸ **createService**(`publisher`, `metadata`, `serviceAttributes`, `nftAttributes?`, `pricedData?`): `T`

#### Parameters

| Name                | Type                                                                          |
| :------------------ | :---------------------------------------------------------------------------- |
| `publisher`         | [`NvmAccount`](../classes/NvmAccount.md)                                      |
| `metadata`          | [`MetaData`](MetaData.md)                                                     |
| `serviceAttributes` | [`ServiceAttributes`](ServiceAttributes.md)                                   |
| `nftAttributes?`    | [`NFTAttributes`](../classes/NFTAttributes.md)                                |
| `pricedData?`       | [`PricedMetadataInformation`](../code-reference.md#pricedmetadatainformation) |

#### Returns

`T`

#### Defined in

[src/types/DDOTypes.ts:796](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/types/DDOTypes.ts#L796)

---

### process

▸ **process**(`params`, `from`, `txparams?`): `Promise`\<`void`\>

#### Parameters

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `params`    | [`ValidationParams`](ValidationParams.md) |
| `from`      | [`NvmAccount`](../classes/NvmAccount.md)  |
| `txparams?` | [`TxParameters`](TxParameters.md)         |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/DDOTypes.ts:804](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/types/DDOTypes.ts#L804)

---

### track

▸ **track**(`params`, `from`, `txparams?`): `Promise`\<`boolean`\>

#### Parameters

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `params`    | [`ValidationParams`](ValidationParams.md) |
| `from`      | [`NvmAccount`](../classes/NvmAccount.md)  |
| `txparams?` | [`TxParameters`](TxParameters.md)         |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/types/DDOTypes.ts:808](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/types/DDOTypes.ts#L808)
