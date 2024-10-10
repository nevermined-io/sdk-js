[@nevermined-io/sdk - v3.0.40](../code-reference.md) / DDOError

# Class: DDOError

## Hierarchy

- `Error`

  ↳ **`DDOError`**

  ↳↳ [`DDOServiceNotFoundError`](DDOServiceNotFoundError.md)

  ↳↳ [`DDOServiceAlreadyExists`](DDOServiceAlreadyExists.md)

  ↳↳ [`DDOConditionNotFoundError`](DDOConditionNotFoundError.md)

  ↳↳ [`DDOParamNotFoundError`](DDOParamNotFoundError.md)

  ↳↳ [`DDOPriceNotFoundError`](DDOPriceNotFoundError.md)

## Table of contents

### Constructors

- [constructor](DDOError.md#constructor)

### Properties

- [cause](DDOError.md#cause)
- [message](DDOError.md#message)
- [name](DDOError.md#name)
- [stack](DDOError.md#stack)
- [prepareStackTrace](DDOError.md#preparestacktrace)
- [stackTraceLimit](DDOError.md#stacktracelimit)

### Methods

- [captureStackTrace](DDOError.md#capturestacktrace)

## Constructors

### constructor

• **new DDOError**(`message`, `did?`): [`DDOError`](DDOError.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |
| `did?`    | `string` |

#### Returns

[`DDOError`](DDOError.md)

#### Overrides

Error.constructor

#### Defined in

[src/errors/NeverminedErrors.ts:62](https://github.com/nevermined-io/sdk-js/blob/6b091f939fe86d73745b456817747b1f06834a7b/src/errors/NeverminedErrors.ts#L62)

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
