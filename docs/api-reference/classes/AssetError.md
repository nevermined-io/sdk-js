[@nevermined-io/sdk - v3.0.26](../code-reference.md) / AssetError

# Class: AssetError

## Hierarchy

- `Error`

  ↳ **`AssetError`**

## Table of contents

### Constructors

- [constructor](AssetError.md#constructor)

### Properties

- [cause](AssetError.md#cause)
- [message](AssetError.md#message)
- [name](AssetError.md#name)
- [stack](AssetError.md#stack)
- [prepareStackTrace](AssetError.md#preparestacktrace)
- [stackTraceLimit](AssetError.md#stacktracelimit)

### Methods

- [captureStackTrace](AssetError.md#capturestacktrace)

## Constructors

### constructor

• **new AssetError**(`message`): [`AssetError`](AssetError.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

[`AssetError`](AssetError.md)

#### Overrides

Error.constructor

#### Defined in

[src/errors/NeverminedErrors.ts:56](https://github.com/nevermined-io/sdk-js/blob/b9a2e4baad1168fba714b11b15863a80548b40de/src/errors/NeverminedErrors.ts#L56)

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
