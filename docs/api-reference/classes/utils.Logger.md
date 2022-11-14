[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [utils](../modules/utils.md) / Logger

# Class: Logger

[utils](../modules/utils.md).Logger

## Table of contents

### Constructors

- [constructor](utils.Logger.md#constructor)

### Properties

- [logLevel](utils.Logger.md#loglevel)

### Methods

- [bypass](utils.Logger.md#bypass)
- [debug](utils.Logger.md#debug)
- [dispatch](utils.Logger.md#dispatch)
- [error](utils.Logger.md#error)
- [log](utils.Logger.md#log)
- [setLevel](utils.Logger.md#setlevel)
- [warn](utils.Logger.md#warn)

## Constructors

### constructor

• **new Logger**(`logLevel?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `logLevel` | [`LogLevel`](../enums/utils.LogLevel.md) | `LogLevel.Warn` |

#### Defined in

[src/utils/Logger.ts:10](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/Logger.ts#L10)

## Properties

### logLevel

• `Private` **logLevel**: [`LogLevel`](../enums/utils.LogLevel.md) = `LogLevel.Warn`

#### Defined in

[src/utils/Logger.ts:10](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/Logger.ts#L10)

## Methods

### bypass

▸ **bypass**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/utils/Logger.ts:16](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/Logger.ts#L16)

___

### debug

▸ **debug**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/utils/Logger.ts:20](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/Logger.ts#L20)

___

### dispatch

▸ `Private` **dispatch**(`verb`, `level`, ...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `verb` | `string` |
| `level` | [`LogLevel`](../enums/utils.LogLevel.md) |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/utils/Logger.ts:36](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/Logger.ts#L36)

___

### error

▸ **error**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/utils/Logger.ts:32](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/Logger.ts#L32)

___

### log

▸ **log**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/utils/Logger.ts:24](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/Logger.ts#L24)

___

### setLevel

▸ **setLevel**(`logLevel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `logLevel` | [`LogLevel`](../enums/utils.LogLevel.md) |

#### Returns

`void`

#### Defined in

[src/utils/Logger.ts:12](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/Logger.ts#L12)

___

### warn

▸ **warn**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/utils/Logger.ts:28](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/Logger.ts#L28)
