[@nevermined-io/sdk - v3.0.41](../code-reference.md) / WebService

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

[src/types/DDOTypes.ts:225](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L225)

---

### encryptedAttributes

• `Optional` **encryptedAttributes**: `string`

#### Defined in

[src/types/DDOTypes.ts:219](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L219)

---

### endpoints

• `Optional` **endpoints**: \{ `[verb: string]`: `string`; }[]

List of endpoints available for the service

#### Defined in

[src/types/DDOTypes.ts:209](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L209)

---

### implementsQueryProtocol

• `Optional` **implementsQueryProtocol**: `boolean`

Flag to indicate if the service implements the Nevermined Query Protocol.
See [https://docs.nevermined.io/docs/protocol/query-protocol](https://docs.nevermined.io/docs/protocol/query-protocol)

#### Defined in

[src/types/DDOTypes.ts:245](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L245)

---

### internalAttributes

• `Optional` **internalAttributes**: [`WebServiceInternalAttributes`](WebServiceInternalAttributes.md)

#### Defined in

[src/types/DDOTypes.ts:217](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L217)

---

### isNeverminedHosted

• `Optional` **isNeverminedHosted**: `boolean`

Flag to indicate if the service is hosted by Nevermined infrastructure.
If true, the service/agent will be running using the Nevermined Backend service.

#### Defined in

[src/types/DDOTypes.ts:231](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L231)

---

### openEndpoints

• `Optional` **openEndpoints**: `string`[]

List of open endpoints available for the service. These endpoints are not protected.
This attribute is useful to indicate which endpoints are available for public access (documentation, definitions, etc).

#### Defined in

[src/types/DDOTypes.ts:215](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L215)

---

### queryProtocolVersion

• `Optional` **queryProtocolVersion**: `string`

The version of the Query Protocol implemented by the service.

#### Defined in

[src/types/DDOTypes.ts:250](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L250)

---

### serviceHost

• `Optional` **serviceHost**: `string`

Host of the service where the service is running.
This attribute when is given AND the service is hosted by Nevermined or implements the Query Protocol,
allows to populate automatically the endpoints using the service host.
Example: https://my-service.com or https://backend.nevermined.app

#### Defined in

[src/types/DDOTypes.ts:239](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L239)

---

### type

• `Optional` **type**: `"Other"` \| `"RESTful"` \| `"GrapQL"` \| `"RPC"`

Type of Web service

#### Defined in

[src/types/DDOTypes.ts:204](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/types/DDOTypes.ts#L204)
