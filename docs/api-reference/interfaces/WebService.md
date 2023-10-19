[@nevermined-io/sdk](../code-reference.md) / WebService

# Interface: WebService

Interface describing an asset of type `service`

## Table of contents

### Properties

- [encryptedAttributes](WebService.md#encryptedattributes)
- [endpoints](WebService.md#endpoints)
- [internalAttributes](WebService.md#internalattributes)
- [openEndpoints](WebService.md#openendpoints)
- [type](WebService.md#type)

## Properties

### encryptedAttributes

• `Optional` **encryptedAttributes**: `string`

#### Defined in

[src/ddo/types.ts:194](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L194)

---

### endpoints

• `Optional` **endpoints**: { `[verb: string]`: `string`; }[]

#### Defined in

[src/ddo/types.ts:188](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L188)

---

### internalAttributes

• `Optional` **internalAttributes**: [`WebServiceInternalAttributes`](WebServiceInternalAttributes.md)

#### Defined in

[src/ddo/types.ts:192](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L192)

---

### openEndpoints

• `Optional` **openEndpoints**: `string`[]

#### Defined in

[src/ddo/types.ts:190](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L190)

---

### type

• `Optional` **type**: `"Other"` \| `"RESTful"` \| `"GrapQL"` \| `"RPC"`

#### Defined in

[src/ddo/types.ts:186](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L186)
