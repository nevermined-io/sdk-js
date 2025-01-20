[@nevermined-io/sdk - v3.0.48](../code-reference.md) / ServiceNFTSales

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

[src/types/DDOTypes.ts:787](https://github.com/nevermined-io/sdk-js/blob/1ce5860917b7655d893b7f6c0b24536829a7b839/src/types/DDOTypes.ts#L787)

---

### index

• **index**: `number`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[index](ServiceCommon.md#index)

#### Defined in

[src/types/DDOTypes.ts:682](https://github.com/nevermined-io/sdk-js/blob/1ce5860917b7655d893b7f6c0b24536829a7b839/src/types/DDOTypes.ts#L682)

---

### serviceEndpoint

• `Optional` **serviceEndpoint**: `string`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[serviceEndpoint](ServiceCommon.md#serviceendpoint)

#### Defined in

[src/types/DDOTypes.ts:683](https://github.com/nevermined-io/sdk-js/blob/1ce5860917b7655d893b7f6c0b24536829a7b839/src/types/DDOTypes.ts#L683)

---

### templateId

• `Optional` **templateId**: `string`

#### Overrides

[ServiceCommon](ServiceCommon.md).[templateId](ServiceCommon.md#templateid)

#### Defined in

[src/types/DDOTypes.ts:786](https://github.com/nevermined-io/sdk-js/blob/1ce5860917b7655d893b7f6c0b24536829a7b839/src/types/DDOTypes.ts#L786)

---

### type

• **type**: `"nft-sales"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/types/DDOTypes.ts:785](https://github.com/nevermined-io/sdk-js/blob/1ce5860917b7655d893b7f6c0b24536829a7b839/src/types/DDOTypes.ts#L785)
