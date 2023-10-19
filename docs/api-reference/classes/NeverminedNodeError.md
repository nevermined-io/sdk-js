[@nevermined-io/sdk](../code-reference.md) / NeverminedNodeError

# Class: NeverminedNodeError

## Hierarchy

- `Error`

  ↳ **`NeverminedNodeError`**

## Table of contents

### Constructors

- [constructor](NeverminedNodeError.md#constructor)

### Properties

- [message](NeverminedNodeError.md#message)
- [name](NeverminedNodeError.md#name)
- [stack](NeverminedNodeError.md#stack)
- [prepareStackTrace](NeverminedNodeError.md#preparestacktrace)
- [stackTraceLimit](NeverminedNodeError.md#stacktracelimit)

### Methods

- [captureStackTrace](NeverminedNodeError.md#capturestacktrace)

## Constructors

### constructor

• **new NeverminedNodeError**(`message`)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/errors/NeverminedNodeError.ts:2](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/errors/NeverminedNodeError.ts#L2)

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
