[@nevermined-io/sdk](../code-reference.md) / Web3Error

# Class: Web3Error

## Hierarchy

- `Error`

  ↳ **`Web3Error`**

## Table of contents

### Constructors

- [constructor](Web3Error.md#constructor)

### Properties

- [message](Web3Error.md#message)
- [name](Web3Error.md#name)
- [stack](Web3Error.md#stack)
- [prepareStackTrace](Web3Error.md#preparestacktrace)
- [stackTraceLimit](Web3Error.md#stacktracelimit)

### Methods

- [captureStackTrace](Web3Error.md#capturestacktrace)

## Constructors

### constructor

• **new Web3Error**(`message`)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/errors/Web3Error.ts:2](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/errors/Web3Error.ts#L2)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1068

---

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

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

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

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

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
