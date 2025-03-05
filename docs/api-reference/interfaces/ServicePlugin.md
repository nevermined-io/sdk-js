[@nevermined-io/sdk - v3.1.2-rc1](../code-reference.md) / ServicePlugin

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

[src/types/DDOTypes.ts:858](https://github.com/nevermined-io/sdk-js/blob/a486bcf8f8c4d89a158ad167d49be25a65d17b56/src/types/DDOTypes.ts#L858)

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

[src/types/DDOTypes.ts:844](https://github.com/nevermined-io/sdk-js/blob/a486bcf8f8c4d89a158ad167d49be25a65d17b56/src/types/DDOTypes.ts#L844)

---

### process

▸ **process**(`params`, `from`, `txparams?`): `Promise`\<`void` \| \{ `[key: string]`: `any`; }\>

#### Parameters

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `params`    | [`ValidationParams`](ValidationParams.md) |
| `from`      | [`NvmAccount`](../classes/NvmAccount.md)  |
| `txparams?` | [`TxParameters`](TxParameters.md)         |

#### Returns

`Promise`\<`void` \| \{ `[key: string]`: `any`; }\>

#### Defined in

[src/types/DDOTypes.ts:852](https://github.com/nevermined-io/sdk-js/blob/a486bcf8f8c4d89a158ad167d49be25a65d17b56/src/types/DDOTypes.ts#L852)

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

[src/types/DDOTypes.ts:860](https://github.com/nevermined-io/sdk-js/blob/a486bcf8f8c4d89a158ad167d49be25a65d17b56/src/types/DDOTypes.ts#L860)
