[@nevermined-io/sdk - v3.0.41](../code-reference.md) / DynamicCreditsOverLimit

# Class: DynamicCreditsOverLimit

## Hierarchy

- [`NFTError`](NFTError.md)

  ↳ **`DynamicCreditsOverLimit`**

## Table of contents

### Constructors

- [constructor](DynamicCreditsOverLimit.md#constructor)

### Properties

- [cause](DynamicCreditsOverLimit.md#cause)
- [message](DynamicCreditsOverLimit.md#message)
- [name](DynamicCreditsOverLimit.md#name)
- [stack](DynamicCreditsOverLimit.md#stack)
- [prepareStackTrace](DynamicCreditsOverLimit.md#preparestacktrace)
- [stackTraceLimit](DynamicCreditsOverLimit.md#stacktracelimit)

### Methods

- [captureStackTrace](DynamicCreditsOverLimit.md#capturestacktrace)

## Constructors

### constructor

• **new DynamicCreditsOverLimit**(`message`): [`DynamicCreditsOverLimit`](DynamicCreditsOverLimit.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

[`DynamicCreditsOverLimit`](DynamicCreditsOverLimit.md)

#### Overrides

[NFTError](NFTError.md).[constructor](NFTError.md#constructor)

#### Defined in

[src/errors/NeverminedErrors.ts:44](https://github.com/nevermined-io/sdk-js/blob/3e552f889871135260309ba0e332abffa92609ef/src/errors/NeverminedErrors.ts#L44)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

[NFTError](NFTError.md).[cause](NFTError.md#cause)

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

---

### message

• **message**: `string`

#### Inherited from

[NFTError](NFTError.md).[message](NFTError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

---

### name

• **name**: `string`

#### Inherited from

[NFTError](NFTError.md).[name](NFTError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

[NFTError](NFTError.md).[stack](NFTError.md#stack)

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

[NFTError](NFTError.md).[prepareStackTrace](NFTError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:28

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[NFTError](NFTError.md).[stackTraceLimit](NFTError.md#stacktracelimit)

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

[NFTError](NFTError.md).[captureStackTrace](NFTError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:21
