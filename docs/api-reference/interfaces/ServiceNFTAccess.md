[@nevermined-io/sdk - v3.0.32](../code-reference.md) / ServiceNFTAccess

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

[src/types/DDOTypes.ts:722](https://github.com/nevermined-io/sdk-js/blob/aebb2d7041e6f22aa25122a9a516bc8a7030d8ab/src/types/DDOTypes.ts#L722)

---

### index

• **index**: `number`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[index](ServiceCommon.md#index)

#### Defined in

[src/types/DDOTypes.ts:637](https://github.com/nevermined-io/sdk-js/blob/aebb2d7041e6f22aa25122a9a516bc8a7030d8ab/src/types/DDOTypes.ts#L637)

---

### serviceEndpoint

• `Optional` **serviceEndpoint**: `string`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[serviceEndpoint](ServiceCommon.md#serviceendpoint)

#### Defined in

[src/types/DDOTypes.ts:638](https://github.com/nevermined-io/sdk-js/blob/aebb2d7041e6f22aa25122a9a516bc8a7030d8ab/src/types/DDOTypes.ts#L638)

---

### templateId

• `Optional` **templateId**: `string`

#### Overrides

[ServiceCommon](ServiceCommon.md).[templateId](ServiceCommon.md#templateid)

#### Defined in

[src/types/DDOTypes.ts:721](https://github.com/nevermined-io/sdk-js/blob/aebb2d7041e6f22aa25122a9a516bc8a7030d8ab/src/types/DDOTypes.ts#L721)

---

### type

• **type**: `"nft-access"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/types/DDOTypes.ts:720](https://github.com/nevermined-io/sdk-js/blob/aebb2d7041e6f22aa25122a9a516bc8a7030d8ab/src/types/DDOTypes.ts#L720)
