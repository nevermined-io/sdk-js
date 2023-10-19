[@nevermined-io/sdk](../code-reference.md) / ServiceNFTAccess

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

| Name                                | Type                                                                                                                                                                                                                  |
| :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `additionalInformation`             | { `description`: `string` }                                                                                                                                                                                           |
| `additionalInformation.description` | `string`                                                                                                                                                                                                              |
| `main`                              | { `creator`: `string` ; `datePublished`: `string` ; `ercType`: [`ERCType`](../enums/ERCType.md) ; `name`: `string` ; `nftType`: [`NeverminedNFTType`](../code-reference.md#neverminednfttype) ; `timeout`: `number` } |
| `main.creator`                      | `string`                                                                                                                                                                                                              |
| `main.datePublished`                | `string`                                                                                                                                                                                                              |
| `main.ercType`                      | [`ERCType`](../enums/ERCType.md)                                                                                                                                                                                      |
| `main.name`                         | `string`                                                                                                                                                                                                              |
| `main.nftType`                      | [`NeverminedNFTType`](../code-reference.md#neverminednfttype)                                                                                                                                                         |
| `main.timeout`                      | `number`                                                                                                                                                                                                              |
| `serviceAgreementTemplate?`         | [`ServiceAgreementTemplate`](ServiceAgreementTemplate.md)                                                                                                                                                             |

#### Overrides

[ServiceCommon](ServiceCommon.md).[attributes](ServiceCommon.md#attributes)

#### Defined in

[src/ddo/types.ts:677](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L677)

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

[src/ddo/types.ts:676](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L676)

---

### type

• **type**: `"nft-access"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/ddo/types.ts:675](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L675)
