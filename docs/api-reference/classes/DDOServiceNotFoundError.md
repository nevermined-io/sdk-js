[@nevermined-io/sdk](../code-reference.md) / DDOServiceNotFoundError

# Class: DDOServiceNotFoundError

## Hierarchy

- [`DDOError`](DDOError.md)

  ↳ **`DDOServiceNotFoundError`**

## Table of contents

### Constructors

- [constructor](DDOServiceNotFoundError.md#constructor)

### Properties

- [message](DDOServiceNotFoundError.md#message)
- [name](DDOServiceNotFoundError.md#name)
- [stack](DDOServiceNotFoundError.md#stack)
- [prepareStackTrace](DDOServiceNotFoundError.md#preparestacktrace)
- [stackTraceLimit](DDOServiceNotFoundError.md#stacktracelimit)

### Methods

- [captureStackTrace](DDOServiceNotFoundError.md#capturestacktrace)

## Constructors

### constructor

• **new DDOServiceNotFoundError**(`serviceType`, `did?`)

#### Parameters

| Name          | Type                                              |
| :------------ | :------------------------------------------------ |
| `serviceType` | [`ServiceType`](../code-reference.md#servicetype) |
| `did?`        | `string`                                          |

#### Overrides

[DDOError](DDOError.md).[constructor](DDOError.md#constructor)

#### Defined in

[src/errors/DDOError.ts:18](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/errors/DDOError.ts#L18)

## Properties

### message

• **message**: `string`

#### Inherited from

[DDOError](DDOError.md).[message](DDOError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1068

---

### name

• **name**: `string`

#### Inherited from

[DDOError](DDOError.md).[name](DDOError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

[DDOError](DDOError.md).[stack](DDOError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1069

---

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

[DDOError](DDOError.md).[prepareStackTrace](DDOError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[DDOError](DDOError.md).[stackTraceLimit](DDOError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

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

node_modules/@types/node/globals.d.ts:4
