[@nevermined-io/sdk](../code-reference.md) / ServicePlugin

# Interface: ServicePlugin<T\>

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

▸ **accept**(`params`): `Promise`<`boolean`\>

#### Parameters

| Name     | Type                                      |
| :------- | :---------------------------------------- |
| `params` | [`ValidationParams`](ValidationParams.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/ddo/types.ts:761](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L761)

---

### createService

▸ **createService**(`publisher`, `metadata`, `serviceAttributes`, `nftAttributes`, `pricedData?`): `T`

#### Parameters

| Name                | Type                                                                          |
| :------------------ | :---------------------------------------------------------------------------- |
| `publisher`         | [`Account`](../classes/Account.md)                                            |
| `metadata`          | [`MetaData`](MetaData.md)                                                     |
| `serviceAttributes` | [`ServiceAttributes`](ServiceAttributes.md)                                   |
| `nftAttributes`     | [`NFTAttributes`](../classes/NFTAttributes.md)                                |
| `pricedData?`       | [`PricedMetadataInformation`](../code-reference.md#pricedmetadatainformation) |

#### Returns

`T`

#### Defined in

[src/ddo/types.ts:751](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L751)

---

### process

▸ **process**(`params`, `from`, `txparams?`): `Promise`<`void`\>

#### Parameters

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `params`    | [`ValidationParams`](ValidationParams.md) |
| `from`      | [`Account`](../classes/Account.md)        |
| `txparams?` | [`TxParameters`](TxParameters.md)         |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/ddo/types.ts:759](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L759)

---

### track

▸ **track**(`params`, `from`, `txparams?`): `Promise`<`boolean`\>

#### Parameters

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `params`    | [`ValidationParams`](ValidationParams.md) |
| `from`      | [`Account`](../classes/Account.md)        |
| `txparams?` | [`TxParameters`](TxParameters.md)         |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/ddo/types.ts:763](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L763)
