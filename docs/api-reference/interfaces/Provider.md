[@nevermined-io/sdk](../code-reference.md) / Provider

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

[src/ddo/types.ts:19](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L19)

---

### environment

• **environment**: `Object`

#### Type declaration

| Name                  | Type                                                                                                                                                                               |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cluster`             | { `type`: `string` ; `url`: `string` }                                                                                                                                             |
| `cluster.type`        | `string`                                                                                                                                                                           |
| `cluster.url`         | `string`                                                                                                                                                                           |
| `supportedContainers` | { `checksum`: `string` ; `image`: `string` ; `tag`: `string` }[]                                                                                                                   |
| `supportedServers`    | { `cpu`: `string` ; `disk`: `string` ; `gpu`: `string` ; `maxExecutionTime`: `number` ; `memory`: `string` ; `price`: `string` ; `serverId`: `string` ; `serverType`: `string` }[] |

#### Defined in

[src/ddo/types.ts:20](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L20)

---

### type

• **type**: `string`

#### Defined in

[src/ddo/types.ts:18](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/ddo/types.ts#L18)
