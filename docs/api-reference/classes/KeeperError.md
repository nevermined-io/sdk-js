[@nevermined-io/sdk - v3.0.23](../code-reference.md) / KeeperError

# Class: KeeperError

## Hierarchy

- `Error`

  ↳ **`KeeperError`**

## Table of contents

### Constructors

- [constructor](KeeperError.md#constructor)

### Properties

- [cause](KeeperError.md#cause)
- [message](KeeperError.md#message)
- [name](KeeperError.md#name)
- [stack](KeeperError.md#stack)
- [prepareStackTrace](KeeperError.md#preparestacktrace)
- [stackTraceLimit](KeeperError.md#stacktracelimit)

### Methods

- [captureStackTrace](KeeperError.md#capturestacktrace)

## Constructors

### constructor

• **new KeeperError**(`message`): [`KeeperError`](KeeperError.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

[`KeeperError`](KeeperError.md)

#### Overrides

Error.constructor

#### Defined in

[src/errors/NeverminedErrors.ts:20](https://github.com/nevermined-io/sdk-js/blob/1cda883adfb801658f47efa6d7c6cc8f9f8998da/src/errors/NeverminedErrors.ts#L20)

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
