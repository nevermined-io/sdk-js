[@nevermined-io/sdk - v3.0.19](../code-reference.md) / ServiceAccess

# Interface: ServiceAccess

## Hierarchy

- [`ServiceCommon`](ServiceCommon.md)

- [`PricedMetadataInformation`](../code-reference.md#pricedmetadatainformation)

  ↳ **`ServiceAccess`**

## Table of contents

### Properties

- [attributes](ServiceAccess.md#attributes)
- [index](ServiceAccess.md#index)
- [serviceEndpoint](ServiceAccess.md#serviceendpoint)
- [templateId](ServiceAccess.md#templateid)
- [type](ServiceAccess.md#type)

## Properties

### attributes

• **attributes**: `Object`

#### Type declaration

| Name                                             | Type                                                                                                              |
| :----------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `additionalInformation`                          | \{ `description`: `string` ; `priceHighestDenomination`: `number` }                                               |
| `additionalInformation.description`              | `string`                                                                                                          |
| `additionalInformation.priceHighestDenomination` | `number`                                                                                                          |
| `main`                                           | \{ `creator`: `string` ; `datePublished`: `string` ; `name`: `string` ; `price`: `string` ; `timeout`: `number` } |
| `main.creator`                                   | `string`                                                                                                          |
| `main.datePublished`                             | `string`                                                                                                          |
| `main.name`                                      | `string`                                                                                                          |
| `main.price`                                     | `string`                                                                                                          |
| `main.timeout`                                   | `number`                                                                                                          |
| `serviceAgreementTemplate?`                      | [`ServiceAgreementTemplate`](ServiceAgreementTemplate.md)                                                         |

#### Overrides

[ServiceCommon](ServiceCommon.md).[attributes](ServiceCommon.md#attributes)

#### Defined in

[src/types/DDOTypes.ts:683](https://github.com/nevermined-io/sdk-js/blob/065f3decbaad4f3943ea9ea3e7eade094f617f96/src/types/DDOTypes.ts#L683)

---

### index

• **index**: `number`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[index](ServiceCommon.md#index)

#### Defined in

[src/types/DDOTypes.ts:636](https://github.com/nevermined-io/sdk-js/blob/065f3decbaad4f3943ea9ea3e7eade094f617f96/src/types/DDOTypes.ts#L636)

---

### serviceEndpoint

• `Optional` **serviceEndpoint**: `string`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[serviceEndpoint](ServiceCommon.md#serviceendpoint)

#### Defined in

[src/types/DDOTypes.ts:637](https://github.com/nevermined-io/sdk-js/blob/065f3decbaad4f3943ea9ea3e7eade094f617f96/src/types/DDOTypes.ts#L637)

---

### templateId

• `Optional` **templateId**: `string`

#### Overrides

[ServiceCommon](ServiceCommon.md).[templateId](ServiceCommon.md#templateid)

#### Defined in

[src/types/DDOTypes.ts:682](https://github.com/nevermined-io/sdk-js/blob/065f3decbaad4f3943ea9ea3e7eade094f617f96/src/types/DDOTypes.ts#L682)

---

### type

• **type**: `"access"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/types/DDOTypes.ts:681](https://github.com/nevermined-io/sdk-js/blob/065f3decbaad4f3943ea9ea3e7eade094f617f96/src/types/DDOTypes.ts#L681)
