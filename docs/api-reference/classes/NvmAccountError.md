[@nevermined-io/sdk - v3.0.33](../code-reference.md) / NvmAccountError

# Class: NvmAccountError

## Hierarchy

- `Error`

  ↳ **`NvmAccountError`**

## Table of contents

### Constructors

- [constructor](NvmAccountError.md#constructor)

### Properties

- [cause](NvmAccountError.md#cause)
- [message](NvmAccountError.md#message)
- [name](NvmAccountError.md#name)
- [stack](NvmAccountError.md#stack)
- [prepareStackTrace](NvmAccountError.md#preparestacktrace)
- [stackTraceLimit](NvmAccountError.md#stacktracelimit)

### Methods

- [captureStackTrace](NvmAccountError.md#capturestacktrace)

## Constructors

### constructor

• **new NvmAccountError**(`message`): [`NvmAccountError`](NvmAccountError.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

[`NvmAccountError`](NvmAccountError.md)

#### Overrides

Error.constructor

#### Defined in

[src/errors/NeverminedErrors.ts:106](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/errors/NeverminedErrors.ts#L106)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

---

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

---

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1078

---

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:28

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:30

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:21
