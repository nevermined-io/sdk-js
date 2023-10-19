[@nevermined-io/sdk](../code-reference.md) / ServiceCompute

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

| Name                                             | Type                                                                                                             |
| :----------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `additionalInformation`                          | { `description`: `string` ; `priceHighestDenomination`: `number` }                                               |
| `additionalInformation.description`              | `string`                                                                                                         |
| `additionalInformation.priceHighestDenomination` | `number`                                                                                                         |
| `main`                                           | { `creator`: `string` ; `datePublished`: `string` ; `name`: `string` ; `price`: `string` ; `timeout`: `number` } |
| `main.creator`                                   | `string`                                                                                                         |
| `main.datePublished`                             | `string`                                                                                                         |
| `main.name`                                      | `string`                                                                                                         |
| `main.price`                                     | `string`                                                                                                         |
| `main.timeout`                                   | `number`                                                                                                         |
| `serviceAgreementTemplate?`                      | [`ServiceAgreementTemplate`](ServiceAgreementTemplate.md)                                                        |

#### Overrides

[ServiceCommon](ServiceCommon.md).[attributes](ServiceCommon.md#attributes)

#### Defined in

[src/ddo/types.ts:658](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L658)

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

[src/ddo/types.ts:657](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L657)

---

### type

• **type**: `"compute"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/ddo/types.ts:656](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L656)
