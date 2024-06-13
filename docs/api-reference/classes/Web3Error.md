[@nevermined-io/sdk - v3.0.13](../code-reference.md) / Web3Error

# Class: Web3Error

## Hierarchy

- `Error`

  ↳ **`Web3Error`**

## Table of contents

### Constructors

- [constructor](Web3Error.md#constructor)

### Properties

- [cause](Web3Error.md#cause)
- [message](Web3Error.md#message)
- [name](Web3Error.md#name)
- [stack](Web3Error.md#stack)
- [prepareStackTrace](Web3Error.md#preparestacktrace)
- [stackTraceLimit](Web3Error.md#stacktracelimit)

### Methods

- [captureStackTrace](Web3Error.md#capturestacktrace)

## Constructors

### constructor

• **new Web3Error**(`message`): [`Web3Error`](Web3Error.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

[`Web3Error`](Web3Error.md)

#### Overrides

Error.constructor

#### Defined in

[src/errors/NeverminedErrors.ts:26](https://github.com/nevermined-io/sdk-js/blob/0d598e72febf7cfaf48859e35dd566c39e7d5682/src/errors/NeverminedErrors.ts#L26)

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
