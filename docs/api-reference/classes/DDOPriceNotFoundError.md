[@nevermined-io/sdk - v3.0.44](../code-reference.md) / DDOPriceNotFoundError

# Class: DDOPriceNotFoundError

## Hierarchy

- [`DDOError`](DDOError.md)

  ↳ **`DDOPriceNotFoundError`**

## Table of contents

### Constructors

- [constructor](DDOPriceNotFoundError.md#constructor)

### Properties

- [cause](DDOPriceNotFoundError.md#cause)
- [message](DDOPriceNotFoundError.md#message)
- [name](DDOPriceNotFoundError.md#name)
- [stack](DDOPriceNotFoundError.md#stack)
- [prepareStackTrace](DDOPriceNotFoundError.md#preparestacktrace)
- [stackTraceLimit](DDOPriceNotFoundError.md#stacktracelimit)

### Methods

- [captureStackTrace](DDOPriceNotFoundError.md#capturestacktrace)

## Constructors

### constructor

• **new DDOPriceNotFoundError**(`serviceType`, `did?`): [`DDOPriceNotFoundError`](DDOPriceNotFoundError.md)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `serviceType` | `string` |
| `did?`        | `string` |

#### Returns

[`DDOPriceNotFoundError`](DDOPriceNotFoundError.md)

#### Overrides

[DDOError](DDOError.md).[constructor](DDOError.md#constructor)

#### Defined in

[src/errors/NeverminedErrors.ts:100](https://github.com/nevermined-io/sdk-js/blob/73bbd7adf913370f1a2da0a0873209115a3fbd62/src/errors/NeverminedErrors.ts#L100)

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
