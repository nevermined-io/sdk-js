[@nevermined-io/sdk - v3.0.37](../code-reference.md) / NeverminedNodeError

# Class: NeverminedNodeError

## Hierarchy

- `Error`

  ↳ **`NeverminedNodeError`**

## Table of contents

### Constructors

- [constructor](NeverminedNodeError.md#constructor)

### Properties

- [cause](NeverminedNodeError.md#cause)
- [message](NeverminedNodeError.md#message)
- [name](NeverminedNodeError.md#name)
- [stack](NeverminedNodeError.md#stack)
- [prepareStackTrace](NeverminedNodeError.md#preparestacktrace)
- [stackTraceLimit](NeverminedNodeError.md#stacktracelimit)

### Methods

- [captureStackTrace](NeverminedNodeError.md#capturestacktrace)

## Constructors

### constructor

• **new NeverminedNodeError**(`message`): [`NeverminedNodeError`](NeverminedNodeError.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

[`NeverminedNodeError`](NeverminedNodeError.md)

#### Overrides

Error.constructor

#### Defined in

[src/errors/NeverminedErrors.ts:2](https://github.com/nevermined-io/sdk-js/blob/414db5fba135665acbeecfc29b3292c8e9044af7/src/errors/NeverminedErrors.ts#L2)

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
