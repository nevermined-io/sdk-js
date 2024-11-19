[@nevermined-io/sdk - v3.0.43](../code-reference.md) / DDOServiceAlreadyExists

# Class: DDOServiceAlreadyExists

## Hierarchy

- [`DDOError`](DDOError.md)

  ↳ **`DDOServiceAlreadyExists`**

## Table of contents

### Constructors

- [constructor](DDOServiceAlreadyExists.md#constructor)

### Properties

- [cause](DDOServiceAlreadyExists.md#cause)
- [message](DDOServiceAlreadyExists.md#message)
- [name](DDOServiceAlreadyExists.md#name)
- [stack](DDOServiceAlreadyExists.md#stack)
- [prepareStackTrace](DDOServiceAlreadyExists.md#preparestacktrace)
- [stackTraceLimit](DDOServiceAlreadyExists.md#stacktracelimit)

### Methods

- [captureStackTrace](DDOServiceAlreadyExists.md#capturestacktrace)

## Constructors

### constructor

• **new DDOServiceAlreadyExists**(`serviceType`, `index`): [`DDOServiceAlreadyExists`](DDOServiceAlreadyExists.md)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `serviceType` | `string` |
| `index`       | `number` |

#### Returns

[`DDOServiceAlreadyExists`](DDOServiceAlreadyExists.md)

#### Overrides

[DDOError](DDOError.md).[constructor](DDOError.md#constructor)

#### Defined in

[src/errors/NeverminedErrors.ts:82](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/errors/NeverminedErrors.ts#L82)

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
