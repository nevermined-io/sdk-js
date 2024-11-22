[@nevermined-io/sdk - v3.0.44](../code-reference.md) / NFTError

# Class: NFTError

## Hierarchy

- `Error`

  ↳ **`NFTError`**

  ↳↳ [`DynamicCreditsOverLimit`](DynamicCreditsOverLimit.md)

  ↳↳ [`DynamicCreditsUnderLimit`](DynamicCreditsUnderLimit.md)

## Table of contents

### Constructors

- [constructor](NFTError.md#constructor)

### Properties

- [cause](NFTError.md#cause)
- [message](NFTError.md#message)
- [name](NFTError.md#name)
- [stack](NFTError.md#stack)
- [prepareStackTrace](NFTError.md#preparestacktrace)
- [stackTraceLimit](NFTError.md#stacktracelimit)

### Methods

- [captureStackTrace](NFTError.md#capturestacktrace)

## Constructors

### constructor

• **new NFTError**(`message`): [`NFTError`](NFTError.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

[`NFTError`](NFTError.md)

#### Overrides

Error.constructor

#### Defined in

[src/errors/NeverminedErrors.ts:38](https://github.com/nevermined-io/sdk-js/blob/73bbd7adf913370f1a2da0a0873209115a3fbd62/src/errors/NeverminedErrors.ts#L38)

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
