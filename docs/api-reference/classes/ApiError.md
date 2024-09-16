[@nevermined-io/sdk - v3.0.33](../code-reference.md) / ApiError

# Class: ApiError

## Hierarchy

- `Error`

  ↳ **`ApiError`**

## Table of contents

### Constructors

- [constructor](ApiError.md#constructor)

### Properties

- [cause](ApiError.md#cause)
- [message](ApiError.md#message)
- [name](ApiError.md#name)
- [stack](ApiError.md#stack)
- [prepareStackTrace](ApiError.md#preparestacktrace)
- [stackTraceLimit](ApiError.md#stacktracelimit)

### Methods

- [captureStackTrace](ApiError.md#capturestacktrace)

## Constructors

### constructor

• **new ApiError**(`message`): [`ApiError`](ApiError.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

[`ApiError`](ApiError.md)

#### Overrides

Error.constructor

#### Defined in

[src/errors/NeverminedErrors.ts:32](https://github.com/nevermined-io/sdk-js/blob/52fd1167668ed7223a94e3de0b05f43aa729e3f8/src/errors/NeverminedErrors.ts#L32)

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
