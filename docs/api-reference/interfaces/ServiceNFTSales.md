[@nevermined-io/sdk](../code-reference.md) / ServiceNFTSales

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

| Name                                             | Type                                                                                                                                                                                                                                      |
| :----------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `additionalInformation`                          | { `description`: `string` ; `priceHighestDenomination`: `number` }                                                                                                                                                                        |
| `additionalInformation.description`              | `string`                                                                                                                                                                                                                                  |
| `additionalInformation.priceHighestDenomination` | `number`                                                                                                                                                                                                                                  |
| `main`                                           | { `creator`: `string` ; `datePublished`: `string` ; `ercType`: [`ERCType`](../enums/ERCType.md) ; `name`: `string` ; `nftType`: [`NeverminedNFTType`](../code-reference.md#neverminednfttype) ; `price`: `string` ; `timeout`: `number` } |
| `main.creator`                                   | `string`                                                                                                                                                                                                                                  |
| `main.datePublished`                             | `string`                                                                                                                                                                                                                                  |
| `main.ercType`                                   | [`ERCType`](../enums/ERCType.md)                                                                                                                                                                                                          |
| `main.name`                                      | `string`                                                                                                                                                                                                                                  |
| `main.nftType`                                   | [`NeverminedNFTType`](../code-reference.md#neverminednfttype)                                                                                                                                                                             |
| `main.price`                                     | `string`                                                                                                                                                                                                                                  |
| `main.timeout`                                   | `number`                                                                                                                                                                                                                                  |
| `serviceAgreementTemplate?`                      | [`ServiceAgreementTemplate`](ServiceAgreementTemplate.md)                                                                                                                                                                                 |

#### Overrides

[ServiceCommon](ServiceCommon.md).[attributes](ServiceCommon.md#attributes)

#### Defined in

[src/ddo/types.ts:696](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L696)

---

### index

• **index**: `number`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[index](ServiceCommon.md#index)

#### Defined in

[src/ddo/types.ts:592](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L592)

---

### serviceEndpoint

• `Optional` **serviceEndpoint**: `string`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[serviceEndpoint](ServiceCommon.md#serviceendpoint)

#### Defined in

[src/ddo/types.ts:593](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L593)

---

### templateId

• `Optional` **templateId**: `string`

#### Overrides

[ServiceCommon](ServiceCommon.md).[templateId](ServiceCommon.md#templateid)

#### Defined in

[src/ddo/types.ts:695](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L695)

---

### type

• **type**: `"nft-sales"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/ddo/types.ts:694](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L694)
