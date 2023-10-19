[@nevermined-io/sdk](../code-reference.md) / ServiceAaveCredit

# Interface: ServiceAaveCredit

## Hierarchy

- [`ServiceCommon`](ServiceCommon.md)

  ↳ **`ServiceAaveCredit`**

## Table of contents

### Properties

- [attributes](ServiceAaveCredit.md#attributes)
- [index](ServiceAaveCredit.md#index)
- [serviceEndpoint](ServiceAaveCredit.md#serviceendpoint)
- [templateId](ServiceAaveCredit.md#templateid)
- [type](ServiceAaveCredit.md#type)

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

[src/keeper/contracts/defi/Service.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/defi/Service.ts#L30)

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

[src/keeper/contracts/defi/Service.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/defi/Service.ts#L29)

---

### type

• **type**: `"aave-credit"`

#### Overrides

[ServiceCommon](ServiceCommon.md).[type](ServiceCommon.md#type)

#### Defined in

[src/keeper/contracts/defi/Service.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/keeper/contracts/defi/Service.ts#L28)
