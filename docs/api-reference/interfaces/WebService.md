[@nevermined-io/sdk - v3.0.22](../code-reference.md) / WebService

# Interface: WebService

Interface describing an asset of type `service`

## Table of contents

### Properties

- [chargeType](WebService.md#chargetype)
- [encryptedAttributes](WebService.md#encryptedattributes)
- [endpoints](WebService.md#endpoints)
- [internalAttributes](WebService.md#internalattributes)
- [openEndpoints](WebService.md#openendpoints)
- [type](WebService.md#type)

## Properties

### chargeType

• `Optional` **chargeType**: [`ChargeType`](../enums/ChargeType.md)

#### Defined in

[src/types/DDOTypes.ts:206](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/types/DDOTypes.ts#L206)

---

### encryptedAttributes

• `Optional` **encryptedAttributes**: `string`

#### Defined in

[src/types/DDOTypes.ts:204](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/types/DDOTypes.ts#L204)

---

### endpoints

• `Optional` **endpoints**: \{ `[verb: string]`: `string`; }[]

#### Defined in

[src/types/DDOTypes.ts:198](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/types/DDOTypes.ts#L198)

---

### internalAttributes

• `Optional` **internalAttributes**: [`WebServiceInternalAttributes`](WebServiceInternalAttributes.md)

#### Defined in

[src/types/DDOTypes.ts:202](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/types/DDOTypes.ts#L202)

---

### openEndpoints

• `Optional` **openEndpoints**: `string`[]

#### Defined in

[src/types/DDOTypes.ts:200](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/types/DDOTypes.ts#L200)

---

### type

• `Optional` **type**: `"Other"` \| `"RESTful"` \| `"GrapQL"` \| `"RPC"`

#### Defined in

[src/types/DDOTypes.ts:196](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/types/DDOTypes.ts#L196)
