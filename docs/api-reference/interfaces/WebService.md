[@nevermined-io/sdk - v3.0.37](../code-reference.md) / WebService

# Interface: WebService

Interface describing an asset of type `service`

## Table of contents

### Properties

- [chargeType](WebService.md#chargetype)
- [encryptedAttributes](WebService.md#encryptedattributes)
- [endpoints](WebService.md#endpoints)
- [implementsQueryProtocol](WebService.md#implementsqueryprotocol)
- [internalAttributes](WebService.md#internalattributes)
- [isNeverminedHosted](WebService.md#isneverminedhosted)
- [openEndpoints](WebService.md#openendpoints)
- [queryProtocolVersion](WebService.md#queryprotocolversion)
- [serviceHost](WebService.md#servicehost)
- [type](WebService.md#type)

## Properties

### chargeType

• `Optional` **chargeType**: [`ChargeType`](../enums/ChargeType.md)

The type of charge for the service (fixed or dymanic).
If fixed the amount of credits to charge will be always the same.

#### Defined in

[src/types/DDOTypes.ts:231](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L231)

---

### encryptedAttributes

• `Optional` **encryptedAttributes**: `string`

#### Defined in

[src/types/DDOTypes.ts:225](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L225)

---

### endpoints

• `Optional` **endpoints**: \{ `[verb: string]`: `string`; }[]

List of endpoints available for the service

#### Defined in

[src/types/DDOTypes.ts:215](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L215)

---

### implementsQueryProtocol

• `Optional` **implementsQueryProtocol**: `boolean`

Flag to indicate if the service implements the Nevermined Query Protocol.
See [https://docs.nevermined.io/docs/protocol/query-protocol](https://docs.nevermined.io/docs/protocol/query-protocol)

#### Defined in

[src/types/DDOTypes.ts:251](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L251)

---

### internalAttributes

• `Optional` **internalAttributes**: [`WebServiceInternalAttributes`](WebServiceInternalAttributes.md)

#### Defined in

[src/types/DDOTypes.ts:223](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L223)

---

### isNeverminedHosted

• `Optional` **isNeverminedHosted**: `boolean`

Flag to indicate if the service is hosted by Nevermined infrastructure.
If true, the service/agent will be running using the Nevermined Backend service.

#### Defined in

[src/types/DDOTypes.ts:237](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L237)

---

### openEndpoints

• `Optional` **openEndpoints**: `string`[]

List of open endpoints available for the service. These endpoints are not protected.
This attribute is useful to indicate which endpoints are available for public access (documentation, definitions, etc).

#### Defined in

[src/types/DDOTypes.ts:221](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L221)

---

### queryProtocolVersion

• `Optional` **queryProtocolVersion**: `string`

The version of the Query Protocol implemented by the service.

#### Defined in

[src/types/DDOTypes.ts:256](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L256)

---

### serviceHost

• `Optional` **serviceHost**: `string`

Host of the service where the service is running.
This attribute when is given AND the service is hosted by Nevermined or implements the Query Protocol,
allows to populate automatically the endpoints using the service host.
Example: https://my-service.com or https://backend.nevermined.app

#### Defined in

[src/types/DDOTypes.ts:245](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L245)

---

### type

• `Optional` **type**: `"Other"` \| `"RESTful"` \| `"GrapQL"` \| `"RPC"`

Type of Web service

#### Defined in

[src/types/DDOTypes.ts:210](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/types/DDOTypes.ts#L210)
