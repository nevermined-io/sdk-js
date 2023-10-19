[@nevermined-io/sdk](../code-reference.md) / ServiceAccess

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

[src/ddo/types.ts:639](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L639)

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

[src/ddo/types.ts:638](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L638)

---

### type

• **type**: `"access"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/ddo/types.ts:637](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L637)
