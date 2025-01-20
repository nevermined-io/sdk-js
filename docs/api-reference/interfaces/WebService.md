[@nevermined-io/sdk - v3.0.47](../code-reference.md) / WebService

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

[src/types/DDOTypes.ts:226](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L226)

---

### encryptedAttributes

• `Optional` **encryptedAttributes**: `string`

#### Defined in

[src/types/DDOTypes.ts:220](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L220)

---

### endpoints

• `Optional` **endpoints**: \{ `[verb: string]`: `string`; }[]

List of endpoints available for the service

#### Defined in

[src/types/DDOTypes.ts:210](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L210)

---

### implementsQueryProtocol

• `Optional` **implementsQueryProtocol**: `boolean`

Flag to indicate if the service implements the Nevermined Query Protocol.
See [https://docs.nevermined.io/docs/protocol/query-protocol](https://docs.nevermined.io/docs/protocol/query-protocol)

#### Defined in

[src/types/DDOTypes.ts:246](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L246)

---

### internalAttributes

• `Optional` **internalAttributes**: [`WebServiceInternalAttributes`](WebServiceInternalAttributes.md)

#### Defined in

[src/types/DDOTypes.ts:218](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L218)

---

### isNeverminedHosted

• `Optional` **isNeverminedHosted**: `boolean`

Flag to indicate if the service is hosted by Nevermined infrastructure.
If true, the service/agent will be running using the Nevermined Backend service.

#### Defined in

[src/types/DDOTypes.ts:232](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L232)

---

### openEndpoints

• `Optional` **openEndpoints**: `string`[]

List of open endpoints available for the service. These endpoints are not protected.
This attribute is useful to indicate which endpoints are available for public access (documentation, definitions, etc).

#### Defined in

[src/types/DDOTypes.ts:216](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L216)

---

### queryProtocolVersion

• `Optional` **queryProtocolVersion**: `string`

The version of the Query Protocol implemented by the service.

#### Defined in

[src/types/DDOTypes.ts:251](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L251)

---

### serviceHost

• `Optional` **serviceHost**: `string`

Host of the service where the service is running.
This attribute when is given AND the service is hosted by Nevermined or implements the Query Protocol,
allows to populate automatically the endpoints using the service host.
Example: https://my-service.com or https://backend.nevermined.app

#### Defined in

[src/types/DDOTypes.ts:240](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L240)

---

### type

• `Optional` **type**: `"Other"` \| `"RESTful"` \| `"GrapQL"` \| `"RPC"`

Type of Web service

#### Defined in

[src/types/DDOTypes.ts:205](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/types/DDOTypes.ts#L205)
