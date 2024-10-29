[@nevermined-io/sdk - v3.0.41](../code-reference.md) / ServiceNFTAccess

# Interface: ServiceNFTAccess

## Hierarchy

- [`ServiceCommon`](ServiceCommon.md)

  ↳ **`ServiceNFTAccess`**

## Table of contents

### Properties

- [attributes](ServiceNFTAccess.md#attributes)
- [index](ServiceNFTAccess.md#index)
- [serviceEndpoint](ServiceNFTAccess.md#serviceendpoint)
- [templateId](ServiceNFTAccess.md#templateid)
- [type](ServiceNFTAccess.md#type)

## Properties

### attributes

• **attributes**: `Object`

#### Type declaration

| Name                                | Type                                                                                                                                                                                                                                                                                                    |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `additionalInformation`             | \{ `description`: `string` }                                                                                                                                                                                                                                                                            |
| `additionalInformation.description` | `string`                                                                                                                                                                                                                                                                                                |
| `main`                              | \{ `creator`: `string` ; `datePublished`: `string` ; `ercType`: [`ERCType`](../enums/ERCType.md) ; `name`: `string` ; `nftAttributes?`: [`NFTServiceAttributes`](../classes/NFTServiceAttributes.md) ; `nftType`: [`NeverminedNFTType`](../code-reference.md#neverminednfttype) ; `timeout`: `number` } |
| `main.creator`                      | `string`                                                                                                                                                                                                                                                                                                |
| `main.datePublished`                | `string`                                                                                                                                                                                                                                                                                                |
| `main.ercType`                      | [`ERCType`](../enums/ERCType.md)                                                                                                                                                                                                                                                                        |
| `main.name`                         | `string`                                                                                                                                                                                                                                                                                                |
| `main.nftAttributes?`               | [`NFTServiceAttributes`](../classes/NFTServiceAttributes.md)                                                                                                                                                                                                                                            |
| `main.nftType`                      | [`NeverminedNFTType`](../code-reference.md#neverminednfttype)                                                                                                                                                                                                                                           |
| `main.timeout`                      | `number`                                                                                                                                                                                                                                                                                                |
| `serviceAgreementTemplate?`         | [`ServiceAgreementTemplate`](ServiceAgreementTemplate.md)                                                                                                                                                                                                                                               |

#### Overrides

[ServiceCommon](ServiceCommon.md).[attributes](ServiceCommon.md#attributes)

#### Defined in

[src/types/DDOTypes.ts:766](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L766)

---

### index

• **index**: `number`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[index](ServiceCommon.md#index)

#### Defined in

[src/types/DDOTypes.ts:681](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L681)

---

### serviceEndpoint

• `Optional` **serviceEndpoint**: `string`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[serviceEndpoint](ServiceCommon.md#serviceendpoint)

#### Defined in

[src/types/DDOTypes.ts:682](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L682)

---

### templateId

• `Optional` **templateId**: `string`

#### Overrides

[ServiceCommon](ServiceCommon.md).[templateId](ServiceCommon.md#templateid)

#### Defined in

[src/types/DDOTypes.ts:765](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L765)

---

### type

• **type**: `"nft-access"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/types/DDOTypes.ts:764](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L764)
