[@nevermined-io/sdk - v3.0.36](../code-reference.md) / Provider

# Interface: Provider

## Table of contents

### Properties

- [description](Provider.md#description)
- [environment](Provider.md#environment)
- [type](Provider.md#type)

## Properties

### description

• **description**: `string`

#### Defined in

[src/types/DDOTypes.ts:14](https://github.com/nevermined-io/sdk-js/blob/112a8a40d591ba6fa5736c0c11ad1e067b7b9663/src/types/DDOTypes.ts#L14)

---

### environment

• **environment**: `Object`

#### Type declaration

| Name                  | Type                                                                                                                                                                                |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cluster`             | \{ `type`: `string` ; `url`: `string` }                                                                                                                                             |
| `cluster.type`        | `string`                                                                                                                                                                            |
| `cluster.url`         | `string`                                                                                                                                                                            |
| `supportedContainers` | \{ `checksum`: `string` ; `image`: `string` ; `tag`: `string` }[]                                                                                                                   |
| `supportedServers`    | \{ `cpu`: `string` ; `disk`: `string` ; `gpu`: `string` ; `maxExecutionTime`: `number` ; `memory`: `string` ; `price`: `string` ; `serverId`: `string` ; `serverType`: `string` }[] |

#### Defined in

[src/types/DDOTypes.ts:15](https://github.com/nevermined-io/sdk-js/blob/112a8a40d591ba6fa5736c0c11ad1e067b7b9663/src/types/DDOTypes.ts#L15)

---

### type

• **type**: `string`

#### Defined in

[src/types/DDOTypes.ts:13](https://github.com/nevermined-io/sdk-js/blob/112a8a40d591ba6fa5736c0c11ad1e067b7b9663/src/types/DDOTypes.ts#L13)
