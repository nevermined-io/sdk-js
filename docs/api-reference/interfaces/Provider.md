[@nevermined-io/sdk - v3.0.44](../code-reference.md) / Provider

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

[src/types/DDOTypes.ts:14](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/types/DDOTypes.ts#L14)

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

[src/types/DDOTypes.ts:15](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/types/DDOTypes.ts#L15)

---

### type

• **type**: `string`

#### Defined in

[src/types/DDOTypes.ts:13](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/types/DDOTypes.ts#L13)
