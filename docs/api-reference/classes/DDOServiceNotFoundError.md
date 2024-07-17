[@nevermined-io/sdk - v3.0.18](../code-reference.md) / DDOServiceNotFoundError

# Class: DDOServiceNotFoundError

## Hierarchy

- [`DDOError`](DDOError.md)

  ↳ **`DDOServiceNotFoundError`**

## Table of contents

### Constructors

- [constructor](DDOServiceNotFoundError.md#constructor)

### Properties

- [cause](DDOServiceNotFoundError.md#cause)
- [message](DDOServiceNotFoundError.md#message)
- [name](DDOServiceNotFoundError.md#name)
- [stack](DDOServiceNotFoundError.md#stack)
- [prepareStackTrace](DDOServiceNotFoundError.md#preparestacktrace)
- [stackTraceLimit](DDOServiceNotFoundError.md#stacktracelimit)

### Methods

- [captureStackTrace](DDOServiceNotFoundError.md#capturestacktrace)

## Constructors

### constructor

• **new DDOServiceNotFoundError**(`serviceType`, `did?`): [`DDOServiceNotFoundError`](DDOServiceNotFoundError.md)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `serviceType` | `string` |
| `did?`        | `string` |

#### Returns

[`DDOServiceNotFoundError`](DDOServiceNotFoundError.md)

#### Overrides

[DDOError](DDOError.md).[constructor](DDOError.md#constructor)

#### Defined in

[src/errors/NeverminedErrors.ts:76](https://github.com/nevermined-io/sdk-js/blob/5a87eb38c1c2c3e15829bd6357608ed347da321e/src/errors/NeverminedErrors.ts#L76)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

[DDOError](DDOError.md).[cause](DDOError.md#cause)

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

---

### message

• **message**: `string`

#### Inherited from

[DDOError](DDOError.md).[message](DDOError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

---

### name

• **name**: `string`

#### Inherited from

[DDOError](DDOError.md).[name](DDOError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

[DDOError](DDOError.md).[stack](DDOError.md#stack)

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

[DDOError](DDOError.md).[prepareStackTrace](DDOError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:28

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[DDOError](DDOError.md).[stackTraceLimit](DDOError.md#stacktracelimit)

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

[DDOError](DDOError.md).[captureStackTrace](DDOError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:21
