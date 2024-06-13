[@nevermined-io/sdk - v3.0.13](../code-reference.md) / DDOConditionNotFoundError

# Class: DDOConditionNotFoundError

## Hierarchy

- [`DDOError`](DDOError.md)

  ↳ **`DDOConditionNotFoundError`**

## Table of contents

### Constructors

- [constructor](DDOConditionNotFoundError.md#constructor)

### Properties

- [cause](DDOConditionNotFoundError.md#cause)
- [message](DDOConditionNotFoundError.md#message)
- [name](DDOConditionNotFoundError.md#name)
- [stack](DDOConditionNotFoundError.md#stack)
- [prepareStackTrace](DDOConditionNotFoundError.md#preparestacktrace)
- [stackTraceLimit](DDOConditionNotFoundError.md#stacktracelimit)

### Methods

- [captureStackTrace](DDOConditionNotFoundError.md#capturestacktrace)

## Constructors

### constructor

• **new DDOConditionNotFoundError**(`conditionName`): [`DDOConditionNotFoundError`](DDOConditionNotFoundError.md)

#### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `conditionName` | `string` |

#### Returns

[`DDOConditionNotFoundError`](DDOConditionNotFoundError.md)

#### Overrides

[DDOError](DDOError.md).[constructor](DDOError.md#constructor)

#### Defined in

[src/errors/NeverminedErrors.ts:88](https://github.com/nevermined-io/sdk-js/blob/0d598e72febf7cfaf48859e35dd566c39e7d5682/src/errors/NeverminedErrors.ts#L88)

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
