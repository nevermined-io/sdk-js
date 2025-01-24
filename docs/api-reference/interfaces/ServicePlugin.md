[@nevermined-io/sdk - v3.0.49](../code-reference.md) / ServicePlugin

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

[src/types/DDOTypes.ts:855](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/types/DDOTypes.ts#L855)

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

[src/types/DDOTypes.ts:841](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/types/DDOTypes.ts#L841)

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

[src/types/DDOTypes.ts:849](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/types/DDOTypes.ts#L849)

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

[src/types/DDOTypes.ts:857](https://github.com/nevermined-io/sdk-js/blob/46581d70d770c789e0a8545806449cccf988f6aa/src/types/DDOTypes.ts#L857)
