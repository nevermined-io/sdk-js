[@nevermined-io/sdk - v3.0.35](../code-reference.md) / WebService

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
- [type](WebService.md#type)

## Properties

### chargeType

• `Optional` **chargeType**: [`ChargeType`](../enums/ChargeType.md)

The type of charge for the service (fixed or dymanic).
If fixed the amount of credits to charge will be always the same.

#### Defined in

[src/types/DDOTypes.ts:220](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L220)

---

### encryptedAttributes

• `Optional` **encryptedAttributes**: `string`

#### Defined in

[src/types/DDOTypes.ts:214](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L214)

---

### endpoints

• `Optional` **endpoints**: \{ `[verb: string]`: `string`; }[]

List of endpoints available for the service

#### Defined in

[src/types/DDOTypes.ts:204](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L204)

---

### implementsQueryProtocol

• `Optional` **implementsQueryProtocol**: `boolean`

Flag to indicate if the service implements the Nevermined Query Protocol.
See [https://docs.nevermined.io/docs/protocol/query-protocol](https://docs.nevermined.io/docs/protocol/query-protocol)

#### Defined in

[src/types/DDOTypes.ts:232](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L232)

---

### internalAttributes

• `Optional` **internalAttributes**: [`WebServiceInternalAttributes`](WebServiceInternalAttributes.md)

#### Defined in

[src/types/DDOTypes.ts:212](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L212)

---

### isNeverminedHosted

• `Optional` **isNeverminedHosted**: `boolean`

Flag to indicate if the service is hosted by Nevermined infrastructure.
If true, the service/agent will be running using the Nevermined Backend service.

#### Defined in

[src/types/DDOTypes.ts:226](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L226)

---

### openEndpoints

• `Optional` **openEndpoints**: `string`[]

List of open endpoints available for the service. These endpoints are not protected.
This attribute is useful to indicate which endpoints are available for public access (documentation, definitions, etc).

#### Defined in

[src/types/DDOTypes.ts:210](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L210)

---

### queryProtocolVersion

• `Optional` **queryProtocolVersion**: `string`

The version of the Query Protocol implemented by the service.

#### Defined in

[src/types/DDOTypes.ts:237](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L237)

---

### type

• `Optional` **type**: `"Other"` \| `"RESTful"` \| `"GrapQL"` \| `"RPC"`

Type of Web service

#### Defined in

[src/types/DDOTypes.ts:199](https://github.com/nevermined-io/sdk-js/blob/1c4dd664ca2801e7971e95af825f688095366860/src/types/DDOTypes.ts#L199)
