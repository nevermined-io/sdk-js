[@nevermined-io/sdk - v3.0.23-rc0](../code-reference.md) / ServiceNFTSales

# Interface: ServiceNFTSales

## Hierarchy

- [`ServiceCommon`](ServiceCommon.md)

- [`PricedMetadataInformation`](../code-reference.md#pricedmetadatainformation)

  ↳ **`ServiceNFTSales`**

## Table of contents

### Properties

- [attributes](ServiceNFTSales.md#attributes)
- [index](ServiceNFTSales.md#index)
- [serviceEndpoint](ServiceNFTSales.md#serviceendpoint)
- [templateId](ServiceNFTSales.md#templateid)
- [type](ServiceNFTSales.md#type)

## Properties

### attributes

• **attributes**: `Object`

#### Type declaration

| Name                                             | Type                                                                                                                                                                                                                                                                                                                        |
| :----------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `additionalInformation`                          | \{ `description`: `string` ; `priceHighestDenomination`: `number` }                                                                                                                                                                                                                                                         |
| `additionalInformation.description`              | `string`                                                                                                                                                                                                                                                                                                                    |
| `additionalInformation.priceHighestDenomination` | `number`                                                                                                                                                                                                                                                                                                                    |
| `main`                                           | \{ `creator`: `string` ; `datePublished`: `string` ; `ercType`: [`ERCType`](../enums/ERCType.md) ; `name`: `string` ; `nftAttributes?`: [`NFTServiceAttributes`](../classes/NFTServiceAttributes.md) ; `nftType`: [`NeverminedNFTType`](../code-reference.md#neverminednfttype) ; `price`: `string` ; `timeout`: `number` } |
| `main.creator`                                   | `string`                                                                                                                                                                                                                                                                                                                    |
| `main.datePublished`                             | `string`                                                                                                                                                                                                                                                                                                                    |
| `main.ercType`                                   | [`ERCType`](../enums/ERCType.md)                                                                                                                                                                                                                                                                                            |
| `main.name`                                      | `string`                                                                                                                                                                                                                                                                                                                    |
| `main.nftAttributes?`                            | [`NFTServiceAttributes`](../classes/NFTServiceAttributes.md)                                                                                                                                                                                                                                                                |
| `main.nftType`                                   | [`NeverminedNFTType`](../code-reference.md#neverminednfttype)                                                                                                                                                                                                                                                               |
| `main.price`                                     | `string`                                                                                                                                                                                                                                                                                                                    |
| `main.timeout`                                   | `number`                                                                                                                                                                                                                                                                                                                    |
| `serviceAgreementTemplate?`                      | [`ServiceAgreementTemplate`](ServiceAgreementTemplate.md)                                                                                                                                                                                                                                                                   |

#### Overrides

[ServiceCommon](ServiceCommon.md).[attributes](ServiceCommon.md#attributes)

#### Defined in

[src/types/DDOTypes.ts:741](https://github.com/nevermined-io/sdk-js/blob/0917aa7cdaec3f72007eb6710fe0bd1232cfb930/src/types/DDOTypes.ts#L741)

---

### index

• **index**: `number`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[index](ServiceCommon.md#index)

#### Defined in

[src/types/DDOTypes.ts:636](https://github.com/nevermined-io/sdk-js/blob/0917aa7cdaec3f72007eb6710fe0bd1232cfb930/src/types/DDOTypes.ts#L636)

---

### serviceEndpoint

• `Optional` **serviceEndpoint**: `string`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[serviceEndpoint](ServiceCommon.md#serviceendpoint)

#### Defined in

[src/types/DDOTypes.ts:637](https://github.com/nevermined-io/sdk-js/blob/0917aa7cdaec3f72007eb6710fe0bd1232cfb930/src/types/DDOTypes.ts#L637)

---

### templateId

• `Optional` **templateId**: `string`

#### Overrides

[ServiceCommon](ServiceCommon.md).[templateId](ServiceCommon.md#templateid)

#### Defined in

[src/types/DDOTypes.ts:740](https://github.com/nevermined-io/sdk-js/blob/0917aa7cdaec3f72007eb6710fe0bd1232cfb930/src/types/DDOTypes.ts#L740)

---

### type

• **type**: `"nft-sales"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/types/DDOTypes.ts:739](https://github.com/nevermined-io/sdk-js/blob/0917aa7cdaec3f72007eb6710fe0bd1232cfb930/src/types/DDOTypes.ts#L739)
