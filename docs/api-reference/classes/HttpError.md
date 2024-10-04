[@nevermined-io/sdk - v3.0.38](../code-reference.md) / HttpError

# Class: HttpError

## Hierarchy

- `Error`

  ↳ **`HttpError`**

## Table of contents

### Constructors

- [constructor](HttpError.md#constructor)

### Properties

- [cause](HttpError.md#cause)
- [message](HttpError.md#message)
- [name](HttpError.md#name)
- [stack](HttpError.md#stack)
- [prepareStackTrace](HttpError.md#preparestacktrace)
- [stackTraceLimit](HttpError.md#stacktracelimit)

### Methods

- [captureStackTrace](HttpError.md#capturestacktrace)

## Constructors

### constructor

• **new HttpError**(`message`, `code`): [`HttpError`](HttpError.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |
| `code`    | `number` |

#### Returns

[`HttpError`](HttpError.md)

#### Overrides

Error.constructor

#### Defined in

[src/errors/NeverminedErrors.ts:14](https://github.com/nevermined-io/sdk-js/blob/19fc2a94ba4543472977483f1df808804d5fb1b7/src/errors/NeverminedErrors.ts#L14)

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
