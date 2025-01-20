[@nevermined-io/sdk - v3.0.47](../code-reference.md) / ServiceCompute

# Interface: ServiceCompute

## Hierarchy

- [`ServiceCommon`](ServiceCommon.md)

- [`PricedMetadataInformation`](../code-reference.md#pricedmetadatainformation)

  ↳ **`ServiceCompute`**

## Table of contents

### Properties

- [attributes](ServiceCompute.md#attributes)
- [index](ServiceCompute.md#index)
- [serviceEndpoint](ServiceCompute.md#serviceendpoint)
- [templateId](ServiceCompute.md#templateid)
- [type](ServiceCompute.md#type)

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

[src/types/DDOTypes.ts:748](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L748)

---

### index

• **index**: `number`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[index](ServiceCommon.md#index)

#### Defined in

[src/types/DDOTypes.ts:682](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L682)

---

### serviceEndpoint

• `Optional` **serviceEndpoint**: `string`

#### Inherited from

[ServiceCommon](ServiceCommon.md).[serviceEndpoint](ServiceCommon.md#serviceendpoint)

#### Defined in

[src/types/DDOTypes.ts:683](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L683)

---

### templateId

• `Optional` **templateId**: `string`

#### Overrides

[ServiceCommon](ServiceCommon.md).[templateId](ServiceCommon.md#templateid)

#### Defined in

[src/types/DDOTypes.ts:747](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L747)

---

### type

• **type**: `"compute"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/types/DDOTypes.ts:746](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L746)
